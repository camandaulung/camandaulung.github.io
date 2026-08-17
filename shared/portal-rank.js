/* portal-rank.js — truy van bang xep hang, dung chung cho moi game
 *
 * Hai game truoc day moi ben mot ban truy van gan nhu y het, chi khac ten collection
 * va ten truong sap xep. Gop lai o day, game chi noi "sap theo truong nao".
 *
 * DEM 60 GIAY moi tab: nguoi choi bam qua lai giua cac tab khong ton them luot doc.
 * Goi mien phi cua Firestore tinh theo LUOT DOC, khong phai theo dung luong.
 */

window.Portal = window.Portal || {};

Portal.Rank = (function () {
  const CACHE_MS = 60000;
  const cache = {};          // 'collection:truong:huong' -> { t, rows }

  const key = (col, field, dir) => col + ':' + field + ':' + dir;

  return {
    /* Xoa dem — goi khi diem cua chinh minh vua doi */
    clearCache() { Object.keys(cache).forEach(k => delete cache[k]); },

    /* Top N theo mot truong.
     * dir: 'desc' (mac dinh) hoac 'asc' — thoi gian thi cang nho cang tot.
     */
    async top(col, field, opts) {
      opts = opts || {};
      const dir = opts.dir || 'desc';
      const n = opts.limit || 100;
      const k = key(col, field, dir);

      const c = cache[k];
      if (c && performance.now() - c.t < CACHE_MS) return c.rows;

      const fb = await Portal.FB.load();
      const { collection, query, orderBy, limit, getDocs } = fb.fsM;
      const snap = await Portal.FB.limit(
        getDocs(query(collection(fb.db, col), orderBy(field, dir), limit(n))), 'tải bảng');

      const rows = snap.docs.map((d, i) => Object.assign({ uid: d.id, pos: i + 1 }, d.data()));
      cache[k] = { t: performance.now(), rows };
      return rows;
    },

    /* Thu hang cua mot diem cu the, KHONG phai tai ca bang ve.
     *
     * Firestore co san count() chay phia may chu: dem so nguoi hon minh roi cong 1.
     * Cach nay ton rat it luot doc so voi tai het bang ve roi tu dem.
     *
     * Doi lai: PHAI CO INDEX cho truong do. Thieu index thi Firebase bao loi kem
     * san link tao index — bam vao do la nhanh nhat.
     */
    async positionOf(col, field, value, opts) {
      if (value === null || value === undefined) return null;
      const dir = (opts && opts.dir) || 'desc';
      try {
        const fb = await Portal.FB.load();
        const { collection, query, where, getCountFromServer } = fb.fsM;
        // desc: hon minh = lon hon. asc (thoi gian): hon minh = nho hon.
        const q = query(collection(fb.db, col), where(field, dir === 'desc' ? '>' : '<', value));
        const r = await Portal.FB.limit(getCountFromServer(q), 'đếm thứ hạng');
        return r.data().count + 1;
      } catch (e) {
        console.warn('[portal-rank] không tính được thứ hạng:', Portal.FB.err(e));
        return null;
      }
    }
  };
})();
