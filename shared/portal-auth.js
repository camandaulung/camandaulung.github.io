/* portal-auth.js — dang nhap Google, dung chung cho MOI game trong cong
 *
 * NGUON GOC: gop tu system-auth.js cua Sky Chicken va ban sao o cat-chess.
 * Loi giong het nhau, chi khac ten bien toan cuc.
 *
 * NGUYEN TAC: KHONG bat dang nhap moi choi duoc. Vao la choi ngay; dang nhap chi
 * can khi muon len bang xep hang hoac giu tien do khi doi may. Cong minigame ma
 * chan o man dang nhap la mat nguoi choi ngay cau dau.
 *
 * ================== DANG NHAP MOT LAN, MOI GAME DEU BIET ==================
 *
 * Moi game nam tren CUNG mot ten mien (camandaulung.github.io). Firebase Auth luu
 * phien trong IndexedDB THEO ORIGIN, nen cung origin + cung apiKey = CUNG MOT PHIEN.
 * Dang nhap o game A xong mo game B la da dang nhap san. Da kiem chung bang tai
 * khoan that (16/08/2026).
 *
 * CHO DE HONG NHAT khong nam o Firebase ma o cai meo tiet kiem bang thong:
 * moi game truoc day chi nap SDK khi thay CO RIENG cua no trong localStorage
 * (`skychicken.signedin`). Nguoi choi dang nhap o game khac roi mo game nay thi
 * game nay khong thay co, khong nap SDK, nen hien nhu chua dang nhap — du phien
 * van con nguyen.
 *
 * Vi vay co phai DUNG CHUNG: `portal.signedin`. localStorage cung theo origin nen
 * moi game doc duoc. Doi cho nay la mat tinh nang "dang nhap mot lan".
 */

window.Portal = window.Portal || {};

Portal.Auth = {
  FLAG: 'portal.signedin',   // co DUNG CHUNG — xem ghi chu tren, dung doi thanh rieng
  user: null,                // { uid, name, avatar } hoac null
  busy: false,
  msg: '',                   // thong bao loi gan nhat, de UI hien ra
  _subs: [],
  _attached: false,

  available() { return Portal.FB.configured(); },

  /* UI dang ky o day; goi luon mot lan de ve trang thai ban dau */
  onChange(fn) { this._subs.push(fn); fn(this.user); },
  _emit() { for (const f of this._subs) f(this.user); },

  /* Co RIENG cua tung game thoi truoc khi gop. Nguoi choi dang dang nhap o Sky Chicken
   * chi co `skychicken.signedin`; khong chuyen sang co chung thi ban cap nhat dau tien
   * se lam ho thay minh bi dang xuat (phien van con trong IndexedDB, chi la game khong
   * chiu nap SDK de nhin thay). Chuyen mot lan roi thoi. */
  LEGACY_FLAGS: ['skychicken.signedin', 'catchess.signedin'],

  _migrateFlag() {
    try {
      if (localStorage.getItem(this.FLAG)) return;
      for (const k of this.LEGACY_FLAGS) {
        if (localStorage.getItem(k)) { localStorage.setItem(this.FLAG, '1'); return; }
      }
    } catch (e) { /* localStorage bi tat — bo qua, chi mat tien ich */ }
  },

  /* Goi luc khoi dong. Chua tung dang nhap thi khong dung gi toi mang. */
  async init() {
    if (!this.available()) return;
    this._migrateFlag();
    if (!localStorage.getItem(this.FLAG)) return;
    this.busy = true; this._emit();
    try { await this._attach(); }
    catch (e) { this.msg = Portal.FB.err(e); }
    finally { this.busy = false; this._emit(); }
  },

  /* Noi vao luong trang thai dang nhap cua Firebase (chi mot lan) */
  async _attach() {
    if (this._attached) return Portal.FB.load();
    const fb = await Portal.FB.load();
    this._attached = true;

    // iOS Safari hay chan popup nen co nhanh redirect; ket qua roi ve day
    await fb.authM.getRedirectResult(fb.auth).catch(() => {});

    fb.authM.onAuthStateChanged(fb.auth, u => {
      this.user = u ? {
        uid: u.uid,
        name: u.displayName || 'Người chơi',
        avatar: u.photoURL || ''
      } : null;

      if (this.user) localStorage.setItem(this.FLAG, '1');
      else localStorage.removeItem(this.FLAG);

      this.busy = false;
      this._emit();
      // Game nao da dang ky adapter thi duoc bao; chua co thi bo qua
      if (Portal.Cloud && Portal.Cloud.onUser) Portal.Cloud.onUser(this.user);
    });
    return fb;
  },

  async login() {
    if (this.busy) return;
    this.busy = true; this.msg = ''; this._emit();
    try {
      const fb = await this._attach();
      const prov = new fb.authM.GoogleAuthProvider();
      try {
        await fb.authM.signInWithPopup(fb.auth, prov);
      } catch (e) {
        // popup bi chan (iOS, trinh duyet trong app) -> chuyen han sang redirect
        const c = (e && e.code) || '';
        if (c.includes('popup-blocked') || c.includes('operation-not-supported')) {
          await fb.authM.signInWithRedirect(fb.auth, prov);
          return;                        // trang se tu tai lai
        }
        throw e;
      }
    } catch (e) {
      this.msg = Portal.FB.err(e);
      this.busy = false;
      this._emit();
      Portal.toast(this.msg);
    }
  },

  async logout() {
    if (this.busy || !this.user) return;
    this.busy = true; this._emit();
    try {
      const fb = await Portal.FB.load();
      await fb.authM.signOut(fb.auth);
      Portal.toast('Đã đăng xuất');
    } catch (e) {
      this.msg = Portal.FB.err(e);
      Portal.toast(this.msg);
    } finally {
      this.busy = false;
      this._emit();
    }
  }
};

/* Bao ngan cho nguoi choi. Moi game co kieu thong bao rieng (SC.UI.toast, dai bao
 * cua co vua...), nen game tu gan ham cua no vao day luc khoi dong. Chua gan thi
 * ghi ra console chu khong vo. */
Portal.toast = function (text) { console.log('[portal]', text); };
