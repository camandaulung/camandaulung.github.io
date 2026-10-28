/* dash-data.js — tải + gộp log ván `chessRuns` cho dashboard Cờ vua với mèo (28/10/2026)
 *
 * Log do games/cat-chess/js/cloud-telemetry.js ghi. Phần gộp (`crunch`) THUẦN: mảng bản ghi → số liệu, không đụng
 * DOM / Firebase — đổi cách tính không đụng biểu đồ, và test được bằng Node (games/cat-chess/tools/test-chess-dash-crunch.mjs).
 */

window.CDash = window.CDash || {};

CDash.Data = {
  LIMIT: 5000,

  /* Chặn THẬT ở luật Firestore `chessRuns` (firestore.rules) — danh sách ở đây chỉ để báo lỗi đẹp, sửa thì sửa cả hai
     (và portal/game/index.html, chỗ giấu nút). */
  ADMINS: ['ducdm@vng.com.vn', 'minhducdl87@gmail.com'],

  /* Tên hiển thị theo id mèo (games/cat-chess/js/data-cat-profiles.js). Chỉ để đọc cho dễ: id lạ vẫn hiện bằng id,
     thứ tự luôn xếp theo Elo trong bản ghi chứ không theo danh sách này. */
  KIND: { checkmate: 'Chiếu hết', resign: 'Xin thua', stalemate: 'Hết nước (pat)', threefold: 'Lặp 3 lần',
    fifty: 'Luật 50 nước', material: 'Không đủ quân', quit: 'Bỏ giữa chừng' },
  NAMES: { trang: 'Trắng', leo: 'Lèo', muc: 'Mực', vang: 'Vàng', tamthe: 'Tam Thể', but: 'Bụt', bao: 'Báo', daika: 'Đại Ka' },

  /* Ngưỡng cờ. MIN_N 10: dưới 10 ván một mèo thì một ván đổi win rate 10 điểm — cờ dựa trên đó là đoán.
     Lệch thứ tự 10 điểm: mèo Elo cao mà người thắng NHIỀU hơn mèo Elo thấp kề dưới = bậc khó bị đảo. */
  MIN_N: 10, EASY: 0.85, HARD: 0.1, QUIT: 0.3, INVERT: 0.1,
  SLOW_MS: 33.4,   // ft95 trên 2 nhịp 60 Hz: khung p95 lỡ ít nhất 1 nhịp khi quân trượt

  async user() {
    const fb = await Portal.FB.load();
    const u = await new Promise(res => { const off = fb.authM.onAuthStateChanged(fb.auth, x => { off(); res(x); }); });
    return u && !u.isAnonymous ? u : null;
  },
  isAdmin(u) { return !!(u && u.emailVerified && this.ADMINS.includes(String(u.email || '').toLowerCase())); },
  async login() { const fb = await Portal.FB.load(); await fb.authM.signInWithPopup(fb.auth, new fb.authM.GoogleAuthProvider()); },
  async logout() { const fb = await Portal.FB.load(); await fb.authM.signOut(fb.auth); },

  async load(days) {
    const fb = await Portal.FB.load();
    const u = await this.user();
    if (!this.isAdmin(u)) throw Object.assign(new Error('not-admin'), { code: 'not-admin', user: u });
    try { localStorage.setItem('skydash.admin', '1'); } catch (e) {}   // cờ chung: portal hiện các nút dashboard
    const { collection, query, where, orderBy, limit, getDocs } = fb.fsM;
    const snap = await Portal.FB.limit(getDocs(query(collection(fb.db, 'chessRuns'),
      where('at', '>=', Date.now() - days * 864e5), orderBy('at', 'desc'), limit(this.LIMIT))), 'đọc log ván');
    return snap.docs.map(d => d.data());
  },

  median(a) {
    if (!a.length) return null;
    const s = a.slice().sort((x, y) => x - y), m = s.length >> 1;
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  },
  pct(a, p) { if (!a.length) return null; const s = a.slice().sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(p * s.length))]; },
  avg(a) { return a.length ? a.reduce((s, x) => s + x, 0) / a.length : null; },
  share(a, fn) { return a.length ? a.filter(fn).length / a.length : null; },
  day(at) { const d = new Date(at); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); },

  /* opt: { ch: '' = mọi kênh trừ 'dev' | 'portal' | 'zingplay' | 'dev', quit: tính ván bỏ vào mẫu số win rate, days }
     Ván bỏ KHÔNG nằm trong số nước / thời gian trung vị: ván bỏ ở nước 2 kéo trung vị xuống, đọc như ván ngắn. */
  crunch(rows, opt) {
    // Lọc cả theo ngày: thu cửa sổ (30 → 7 ngày) thì vẽ lại từ bản đã tải, không tải lại
    const since = Date.now() - (opt.days || 7) * 864e5;
    const base = rows.filter(r => (opt.ch ? r.ch === opt.ch : r.ch !== 'dev') && r.v >= 1 && r.at >= since
      && [r.ply, r.t, r.elo].every(Number.isFinite));
    const fin = base.filter(r => r.res !== 'quit'), R = opt.quit ? base : fin;
    const rate = (A, res) => this.share(A, r => r.res === res);
    const perf = base.filter(r => typeof r.ft95 === 'number');
    const kpi = {
      games: base.length, players: new Set(base.map(r => r.pk)).size, win: rate(R, 'win'), quit: rate(base, 'quit'),
      ply: this.median(fin.map(r => r.ply)), min: this.median(fin.map(r => r.t / 60)),
      hint: this.avg(R.map(r => +r.hint || 0)), undo: this.avg(R.map(r => +r.undo || 0)),
      ft95: this.median(perf.map(r => r.ft95)), slow: this.share(perf, r => r.ft95 > this.SLOW_MS),
      engineFail: base.filter(r => r.ef).length
    };

    const byCat = new Map();
    base.forEach(r => {
      const k = r.cat || 'elo' + r.elo;
      if (!byCat.has(k)) byCat.set(k, []);
      byCat.get(k).push(r);
    });
    const cats = [...byCat].map(([id, A]) => {
      const F = A.filter(r => r.res !== 'quit'), W = opt.quit ? A : F;
      return {
        id, name: this.NAMES[id] || id, elo: this.median(A.map(r => r.elo)), all: A.length, n: W.length,
        players: new Set(A.map(r => r.pk)).size, winRate: rate(W, 'win'),
        mix: { win: rate(A, 'win'), loss: rate(A, 'loss'), draw: rate(A, 'draw'), quit: rate(A, 'quit') },
        count: { win: A.filter(r => r.res === 'win').length, loss: A.filter(r => r.res === 'loss').length,
          draw: A.filter(r => r.res === 'draw').length, quit: A.filter(r => r.res === 'quit').length },
        ply: this.median(F.map(r => r.ply)), min: this.median(F.map(r => r.t / 60)),
        hint: this.avg(W.map(r => +r.hint || 0)), undo: this.avg(W.map(r => +r.undo || 0)),
        blun: this.avg(W.map(r => +r.blun || 0)), mat: this.median(F.map(r => r.mat || 0))
      };
    }).sort((a, b) => a.elo - b.elo);
    cats.forEach((c, i) => { c.flags = this.flags(c, cats[i - 1]); });

    const days = [], counts = {};
    base.forEach(r => { const d = this.day(r.at); counts[d] = counts[d] || {}; counts[d][r.ch] = (counts[d][r.ch] || 0) + 1; });
    for (let i = (opt.days || 7) - 1; i >= 0; i--) { const d = this.day(Date.now() - i * 864e5); days.push({ day: d, by: counts[d] || {} }); }

    const KIND = this.KIND, kindMap = new Map();
    base.forEach(r => {
      const label = (KIND[r.kind] || r.kind || '?') + (r.kind === 'checkmate' ? (r.res === 'win' ? ' · người thắng' : ' · mèo thắng') : '');
      kindMap.set(label, (kindMap.get(label) || 0) + 1);
    });
    const kinds = [...kindMap].map(([label, n]) => ({ label, n, share: n / base.length })).sort((a, b) => b.n - a.n);

    const devMap = new Map();
    perf.forEach(r => {
      const cls = /\/m$/.test(r.dev || '') ? 'Điện thoại' : 'Máy bàn';
      [cls, cls + ' · ' + r.dev].forEach(k => { if (!devMap.has(k)) devMap.set(k, []); devMap.get(k).push(r); });
    });
    const devices = [...devMap].map(([key, A]) => ({
      key, group: !key.includes(' · '), n: A.length, ft50: this.median(A.map(r => r.ft50)), ft95: this.median(A.map(r => r.ft95)),
      p90: this.pct(A.map(r => r.ft95), 0.9), slow: this.share(A, r => r.ft95 > this.SLOW_MS), jank: this.avg(A.map(r => r.jank || 0))
    })).sort((a, b) => (b.group - a.group) || (b.n - a.n));

    const recent = base.slice().sort((a, b) => b.at - a.at).slice(0, 40);
    return { kpi, cats, days, kinds, devices, recent };
  },

  flags(c, below) {
    if (c.n < this.MIN_N) return [{ t: 'Mẫu ít (' + c.n + ')', soft: true }];
    const out = [];
    if (c.winRate >= this.EASY) out.push({ t: 'Quá dễ' });
    if (c.winRate <= this.HARD) out.push({ t: 'Quá khó' });
    if (c.mix.quit >= this.QUIT) out.push({ t: 'Bỏ nhiều' });
    if (below && below.n >= this.MIN_N && c.winRate > below.winRate + this.INVERT) out.push({ t: 'Dễ hơn ' + below.name });
    return out;
  }
};
