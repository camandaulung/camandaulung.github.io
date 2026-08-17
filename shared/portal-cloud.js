/* portal-cloud.js — dong bo tien do va nop diem, dung chung cho moi game
 *
 * QUY TAC VANG: localStorage luon la ban goc. Dam may chi la ban sao luu.
 * Mat mang, Firebase hong, chua dang nhap — game van choi tron ven nhu cu.
 * KHONG BAO GIO tu ghi de tien do trong may khi hai ben lech nhau: HOI nguoi choi.
 *
 * ===================== RANH GIOI CHUNG / RIENG =====================
 *
 * File nay lo phan MANG: phien, han gio, gom nhieu lan ghi, hang doi khi mat mang,
 * quyet dinh lay ban nao khi xung dot.
 *
 * Game tu lo phan DU LIEU: hinh dang tien do cua no, cach cham diem hai ban tien do,
 * cach nhan tien do tu dam may ve.
 *
 * Neu thay minh sap viet `if (game === 'chess')` trong file nay thi da di sai —
 * cai do thuoc ve adapter cua game. Lam vay thi moi game moi lai phai sua file chung,
 * mat luon cai loi cua viec tach.
 *
 * ===================== ADAPTER GAME PHAI CUNG CAP =====================
 *
 * Portal.Cloud.init({
 *   game:       'chess',            // khoa phan biet, dung cho players/{uid}.games
 *   userDoc:    'chessUsers',       // noi luu tien do day du
 *   scoreDoc:   'chessScores',      // noi luu diem de xep hang
 *   progress:   () => ({...}),      // tien do day du hien tai (ghi vao userDoc)
 *   score:      (hadDoc, fsM) => ({...}),   // cac truong xep hang (ghi vao scoreDoc)
 *                                   //   hadDoc: ban ghi da ton tai chua
 *                                   //   fsM:    module firestore, de dung deleteField()
 *   playerName: () => 'Ten',        // ten hien tren bang xep hang
 *   weight:     p => 0,             // cham diem mot ban tien do de so sanh
 *   isEmpty:    p => true,          // may nay chua choi gi
 *   adopt:      p => {},            // nhan tien do tu dam may ve may
 *   askMerge:   (local, cloud) => Promise<'local'|'cloud'>   // hoi khi xung dot
 * })
 */

window.Portal = window.Portal || {};

Portal.Cloud = (function () {
  let A = null;               // adapter cua game
  let dirty = false;
  let timer = 0;
  let hadDoc = false;         // ban ghi tren may da ton tai chua
  let state = 'off';          // off | pull | ok | wait | err

  const subs = [];
  const emit = () => subs.forEach(f => { try { f(state); } catch (e) {} });

  /* Ten hien tren bang xep hang phai duoc CAT NGAN va LOC truoc khi len bang cong khai.
   * Ten do Google tra ve khong co nghia la an toan de do thang vao HTML.
   *
   * Dai ky tu dieu khien PHAI viet bang escape `\x00-\x1F`, dung go ky tu that vao
   * day. Ban truoc go that: nhin trong editor giong het dau cach, nen doc ra thanh
   * `[ -<>]` — dai tu dau cach den `<`, tuc nuot ca chu so. Da co nguoi (chinh la em)
   * chan doan nham vi cho nay. Grep va diff cung khong hien dung.
   *
   * Chuan hoa luon khoang trang: ten Google co the co khoang trang thua o hai dau,
   * cat 40 ky tu xong ma con dinh khoang trang cuoi thi nhin nhu bi cut. */
  function safeName(s) {
    return String(s || 'Người chơi')
      .replace(/[\x00-\x1F<>]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 40) || 'Người chơi';
  }

  const api = {
    state: () => state,
    onState(fn) { subs.push(fn); fn(state); },

    /* Game goi mot lan luc khoi dong */
    init(adapter) {
      A = adapter;
      // Co mang lai thi day phan con no
      window.addEventListener('online', () => { if (dirty) api.markDirty(400); });
      return api;
    },

    ready: () => !!A && Portal.FB.configured(),

    /* Portal.Auth goi vao day moi khi trang thai dang nhap doi */
    onUser(user) {
      clearTimeout(timer);
      if (!A) return;
      if (!user) { state = 'off'; emit(); return; }
      api.pull();
    },

    /* ---------- keo tu dam may ve ---------- */
    async pull() {
      if (!api.ready() || !Portal.Auth.user) return;
      state = 'pull'; emit();
      try {
        const fb = await Portal.FB.load();
        const { doc, getDoc } = fb.fsM;
        const snap = await Portal.FB.limit(
          getDoc(doc(fb.db, A.userDoc, Portal.Auth.user.uid)), 'đọc tiến độ');

        hadDoc = snap.exists();
        const cloud = snap.exists() ? snap.data().progress : null;

        if (!cloud) {                    // tai khoan moi -> lay luon tien do dang choi
          state = 'ok'; emit();
          api.markDirty(0);
          Portal.toast('Đã liên kết tài khoản');
          return;
        }

        const local = A.progress();

        if (A.isEmpty(local)) {
          /* May moi tinh -> lay ve luon, chang co gi de mat.
           * Van phai day len: ban ghi DIEM co the chua ton tai du tien do da co. */
          A.adopt(cloud);
          api.markDirty(0);
        } else if (A.weight(cloud) > A.weight(local)) {
          // Dam may nhieu hon -> HOI, khong bao gio tu de
          const pick = A.askMerge ? await A.askMerge(local, cloud) : 'local';
          if (pick === 'cloud') A.adopt(cloud); else api.markDirty(0);
        } else {
          api.markDirty(0);              // may nay bang hoac nhieu hon -> day len
        }
        state = 'ok'; emit();
      } catch (e) {
        state = 'err'; emit();
        Portal.toast(Portal.FB.err(e));
      }
    },

    /* ---------- day len ---------- */

    /* Ghi ban tom tat xuong MAY, khong dinh gi toi mang va khong can dang nhap.
     *
     * VI SAO CAN: trang ho so `/game/me/` phai hien duoc thanh tich ca khi CHUA DANG
     * NHAP — bat dang nhap moi xem duoc thanh tich cua chinh minh la vo ly. Ma luc do
     * khong co gi tren dam may de doc.
     *
     * Trang do khong the tu doc localStorage cua tung game: moi game mot hinh dang du
     * lieu rieng, lam vay la nhet ma cua game vao trang dung chung, them game moi lai
     * phai sua trang. Nen tung game tu ha xuong day mot ban tom tat CHUNG MOT DANG,
     * dung dung cac truong ma `A.score()` sinh ra — tuc trung khop voi `tieuChi` trong
     * `portal-games.js`.
     */
    snapshotLocal() {
      if (!A || !A.score) return;
      try {
        /* hadDoc = false, fsM = null: nhanh nay khong duoc dung sentinel Firestore.
         * Adapter nao can deleteField() thi voi hadDoc = false no se bo qua nhanh do. */
        const fields = A.score(false, null);
        const plain = {};
        Object.keys(fields).forEach(k => {
          const v = fields[k];
          if (v === null || ['number', 'string', 'boolean'].indexOf(typeof v) >= 0) plain[k] = v;
        });
        localStorage.setItem('portal.summary.' + A.game,
          JSON.stringify({ at: Date.now(), fields: plain }));
      } catch (e) { /* localStorage bi tat / day — chi mat trang ho so, khong vo game */ }
    },

    /* Goi sau moi moc dang luu (het man, xong van, mua nang cap).
     * Gom nhieu lan goi lien nhau lam mot de do ton han muc mien phi. */
    markDirty(delay) {
      /* Ha ban tom tat TRUOC khi kiem dang nhap: nguoi choi an danh cung phai co ho so.
       * De sau cau `return` ben duoi la trang ho so trong tron voi moi nguoi chua dang nhap. */
      api.snapshotLocal();

      if (!api.ready() || !Portal.Auth.user) return;
      dirty = true;
      clearTimeout(timer);
      timer = setTimeout(() => api.push(), delay === undefined ? 3000 : delay);
    },

    async push() {
      if (!dirty || !api.ready() || !Portal.Auth.user) return;
      const u = Portal.Auth.user;
      try {
        const fb = await Portal.FB.load();
        const { doc, setDoc, serverTimestamp } = fb.fsM;
        dirty = false;

        /* Adapter nhan them `fsM`: co game can `deleteField()` de XOA HAN mot truong
         * (Sky Chicken xoa `bestTime` khi chua di het chien dich, de khong lot vao
         * bang toc do). Sentinel do phai lay tu dung module da nap, khong tu che duoc. */
        const fields = A.score(hadDoc, fb.fsM);

        const score = Object.assign(
          { name: safeName(A.playerName ? A.playerName() : u.name), avatar: u.avatar },
          fields,
          { updatedAt: serverTimestamp() }
        );

        await Portal.FB.limit(Promise.all([
          setDoc(doc(fb.db, A.userDoc, u.uid), {
            name: u.name, avatar: u.avatar,
            progress: A.progress(), updatedAt: serverTimestamp()
          }, { merge: true }),
          setDoc(doc(fb.db, A.scoreDoc, u.uid), score, { merge: true })
        ]), 'lưu tiến độ');

        hadDoc = true;
        state = 'ok';
        Portal.Rank.clearCache();        // diem minh doi roi -> bo dem bang xep hang

        /* Ho so chung chi nhan so lieu THUONG. `fields` co the chua sentinel cua
         * Firestore (deleteField) — do la lenh cho Firestore, khong phai gia tri;
         * nhet vao players/{uid}.games se ghi ra thu vo nghia. Loc lay nguyen thuy. */
        if (Portal.Player) {
          const tomTat = {};
          Object.keys(fields).forEach(k => {
            const v = fields[k];
            if (v === null || ['number', 'string', 'boolean'].indexOf(typeof v) >= 0) tomTat[k] = v;
          });
          Portal.Player.touch(A.game, tomTat);
        }
      } catch (e) {
        dirty = true;                    // giu co, co mang lai thi day tiep
        state = 'wait';
        /* Truoc day loi nay im lang hoan toan: nguoi choi tuong da luu, that ra chua. */
        Portal.toast('Chưa lưu được: ' + Portal.FB.err(e));
        console.warn('[portal-cloud] push lỗi:', e);
      }
      emit();
    }
  };

  return api;
})();
