/* portal-firebase.js — nap SDK Firebase theo kieu luoi, dung chung cho ca cong game
 *
 * NGUON GOC: gop tu games/sky-chicken-invader/js/system-firebase.js va ban sao cua no
 * o cat-chess. Hai ban giong nhau ~90%. Cac bay xu ly ben duoi da duoc kiem chung
 * tren ban deploy that — dung viet lai tu dau.
 *
 * Vi sao nap luoi bang import() dong thay vi the <script>:
 *   - Nguoi choi an danh (da so) khong phai tai them ~200KB SDK nao ca.
 *   - Bo noi file cua build.mjs chay o che do sloppy voi bien toan cuc; import() dong
 *     van dung duoc trong script thuong nen khong phai doi kien truc.
 *   - Mat mang thi import() nem loi, bat lai la xong — game van choi duoc offline.
 */

window.Portal = window.Portal || {};

Portal.FB = {
  SDK: 'https://www.gstatic.com/firebasejs/10.12.5',

  /* Da khai bao du an chua — chua thi toan bo tinh nang dam may tu an di */
  configured() {
    const c = Portal.CONFIG;
    return !!(c && c.apiKey && c.projectId && c.appId);
  },

  _p: null,

  /* Tra Promise goi {auth, db, authM, fsM}. Goi bao nhieu lan cung chi nap mot lan. */
  load() {
    if (this._p) return this._p;
    if (!this.configured()) return Promise.reject(new Error('Chưa cấu hình Firebase'));

    this._p = (async () => {
      const [appM, authM, fsM] = await Promise.all([
        import(`${this.SDK}/firebase-app.js`),
        import(`${this.SDK}/firebase-auth.js`),
        import(`${this.SDK}/firebase-firestore.js`)
      ]);
      const app = appM.initializeApp(Portal.CONFIG);

      /* Firestore mac dinh noi chuyen bang WebChannel (kenh streaming). Nhieu mang
         cong ty, proxy va ca mot so trinh duyet chan kieu ket noi nay: bieu hien la
         request tra 400 roi SDK cu thu lai, cau truy van TREO vo han chu khong bao
         loi. Do duoc o ban deploy: doc collection treo qua 30 giay.

         Bat tu do de no roi ve long-polling khi WebChannel khong di duoc. */
      let db;
      try {
        db = fsM.initializeFirestore(app, {
          experimentalAutoDetectLongPolling: true,
          useFetchStreams: false
        });
      } catch (e) {
        db = fsM.getFirestore(app);      // da khoi tao o dau do roi thi dung lai
      }

      return { app, authM, fsM, auth: authM.getAuth(app), db };
    })();

    // hong (mat mang, CDN chan) thi xoa cache de lan sau con thu lai duoc
    this._p.catch(() => { this._p = null; });
    return this._p;
  },

  /* Boc han gio quanh moi lenh goi mang.
   *
   * Firestore khi khong di duoc kenh streaming se thu lai am tham va promise KHONG
   * BAO GIO resolve — nguoi choi thay "Dang tai..." dung im vinh vien. Tha bao hong
   * som roi roi ve ban trong may con hon treo.
   */
  TIMEOUT: 8000,
  limit(p, viec) {
    return Promise.race([
      p,
      new Promise((_, rej) => setTimeout(
        () => rej(Object.assign(new Error('Quá hạn ' + (viec || '')), { code: 'timeout' })),
        this.TIMEOUT))
    ]);
  },

  /* Doi ma loi Firebase thanh cau tieng Viet nguoi choi hieu duoc */
  err(e) {
    const c = (e && e.code) || '';
    if (c.includes('popup-closed') || c.includes('cancelled-popup')) return 'Đã huỷ đăng nhập';
    if (c.includes('network')) return 'Mất kết nối mạng';
    if (c.includes('unauthorized-domain')) return 'Tên miền chưa được cấp phép';
    /* `permission-denied` bao cho ca doc lan ghi nen cau chu phai trung tinh.
       Ban truoc viet "khong co quyen GHI du lieu", the la loi doc bang xep hang
       hien ra mot cau noi ve viec ghi — nguoi doc di tim nham cho. */
    if (c.includes('permission-denied')) return 'Luật Firestore chưa cho phép truy cập';
    if (c.includes('unavailable')) return 'Máy chủ bận, thử lại sau';
    /* Han gio cua Portal.FB.limit. Hay gap nhat khi Firestore CHUA DUOC TAO trong
       du an: SDK khong bao loi ma cu thu lai am tham, cau truy van treo vo han. */
    if (c === 'timeout') return 'Máy chủ không phản hồi';
    return 'Lỗi kết nối, thử lại sau';
  },

  /* Firestore co that su dung duoc khong — hoi thang REST API.
     SDK tra ve kho dem cuc bo khi khong noi duoc may chu, nen "doc thanh cong,
     0 ban ghi" KHONG chung minh duoc la Firestore da ton tai. Duong REST thi bao
     thang: chua bat API, chua tao database, hay bi luat chan. */
  async probe(collection) {
    const c = Portal.CONFIG;
    if (!this.configured()) return { ok: false, why: 'Chưa khai báo Firebase' };
    try {
      const r = await fetch(`https://firestore.googleapis.com/v1/projects/${c.projectId}`
        + `/databases/(default)/documents/${collection || 'scores'}?key=${c.apiKey}&pageSize=1`);
      if (r.ok) return { ok: true };
      const d = await r.json().catch(() => ({}));
      return { ok: false, status: r.status, why: (d.error && d.error.message) || 'HTTP ' + r.status };
    } catch (e) {
      return { ok: false, why: e.message };
    }
  }
};
