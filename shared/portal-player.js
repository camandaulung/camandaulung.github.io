/* portal-player.js — danh tinh dung chung ca cong game
 *
 * Truoc day moi game mot collection roi, khong co cho nao noi "nguoi nay la ai tren
 * ca cong". Them MOT lop danh tinh ben canh, KHONG dung vao phan rieng cua tung game.
 *
 *   players/{uid}          <- MOI: danh tinh chung
 *     name, avatar, joinedAt, lastSeenAt
 *     games: { skychicken: {...tom tat...}, chess: {...} }
 *
 *   users/, scores/        <- GIU NGUYEN (Sky Chicken)
 *   chessUsers/, chessScores/  <- GIU NGUYEN (co vua)
 *
 * VI SAO KHONG GOP HET VAO MOT CHO: gop lai la phai migration du lieu dang chay —
 * rui ro cao, loi ich thap. Them mot lop ben canh thi khong dung gi toi cai dang chay.
 *
 * `games.{ten}` chi chua TOM TAT (vai con so de hien o ho so), khong phai ban sao
 * day du. Chi tiet van nam o collection rieng. Chep day du sang hai noi la chac chan
 * co ngay lech nhau — va luc do khong biet ben nao dung.
 */

window.Portal = window.Portal || {};

Portal.Player = (function () {
  let writing = false;

  return {
    /* Ghi tom tat cua mot game vao ho so chung.
     * Goi sau khi ket thuc mot van/man, cung nhip voi Portal.Cloud.push().
     */
    async touch(game, tomTat) {
      if (!Portal.FB.configured() || !Portal.Auth.user) return;
      if (writing) return;                  // gom lai, khong ghi don
      writing = true;
      try {
        const fb = await Portal.FB.load();
        const { doc, setDoc, serverTimestamp } = fb.fsM;
        const u = Portal.Auth.user;

        const data = {
          name: u.name, avatar: u.avatar,
          lastSeenAt: serverTimestamp(),
          games: {}
        };
        data.games[game] = Object.assign({}, tomTat, { at: Date.now() });

        await Portal.FB.limit(
          setDoc(doc(fb.db, 'players', u.uid), data, { merge: true }), 'ghi hồ sơ');
      } catch (e) {
        // Ho so chung chi de HIEN — hong thi khong duoc lam vo luong choi
        console.warn('[portal-player] không ghi được hồ sơ:', Portal.FB.err(e));
      } finally {
        writing = false;
      }
    },

    /* Doc ho so cua mot nguoi. Khong truyen uid thi lay cua chinh minh. */
    async get(uid) {
      const id = uid || (Portal.Auth.user && Portal.Auth.user.uid);
      if (!id || !Portal.FB.configured()) return null;
      try {
        const fb = await Portal.FB.load();
        const { doc, getDoc } = fb.fsM;
        const snap = await Portal.FB.limit(getDoc(doc(fb.db, 'players', id)), 'đọc hồ sơ');
        return snap.exists() ? snap.data() : null;
      } catch (e) {
        console.warn('[portal-player] không đọc được hồ sơ:', Portal.FB.err(e));
        return null;
      }
    }
  };
})();
