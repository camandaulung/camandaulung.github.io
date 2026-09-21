/* dash-data.js — tải + gộp log trận `runs` cho dashboard cân bằng Sky Chicken
 *
 * Tách khỏi phần vẽ (dash.js): hàm gộp là THUẦN (mảng bản ghi -> số liệu), dễ soi và
 * dễ đổi cách tính mà không đụng biểu đồ.
 */

window.Dash = window.Dash || {};

Dash.Data = {
  LIMIT: 5000,

  /* PHÂN QUYỀN (22/09/2026): chỉ 2 tài khoản quản trị. Chặn THẬT ở luật Firestore
     `runs` (firestore.rules) — danh sách ở đây chỉ để báo lỗi đẹp, sửa thì sửa cả hai. */
  ADMINS: ['ducdm@vng.com.vn', 'minhducdl87@gmail.com'],

  /* người đang đăng nhập (đợi Firebase khôi phục phiên). Phiên ẨN DANH của bản dashboard
     cũ thì đăng xuất luôn — nó nằm chung origin với game trên caman. */
  async user() {
    const fb = await Portal.FB.load();
    const u = await new Promise(res => { const off = fb.authM.onAuthStateChanged(fb.auth, x => { off(); res(x); }); });
    if (u && u.isAnonymous) { await fb.authM.signOut(fb.auth); return null; }
    return u;
  },
  isAdmin(u) { return !!(u && u.emailVerified && this.ADMINS.includes(String(u.email || '').toLowerCase())); },
  async login() {
    const fb = await Portal.FB.load();
    await fb.authM.signInWithPopup(fb.auth, new fb.authM.GoogleAuthProvider());
  },
  async logout() { const fb = await Portal.FB.load(); await fb.authM.signOut(fb.auth); },

  async load(days) {
    const fb = await Portal.FB.load();
    const u = await this.user();
    if (!this.isAdmin(u)) throw Object.assign(new Error('not-admin'), { code: 'not-admin', user: u });
    try { localStorage.setItem('skydash.admin', '1'); } catch (e) {}   // portal hiện nút dashboard
    const { collection, query, where, orderBy, limit, getDocs } = fb.fsM;
    const since = Date.now() - days * 864e5;
    const snap = await Portal.FB.limit(getDocs(query(collection(fb.db, 'runs'),
      where('at', '>=', since), orderBy('at', 'desc'), limit(this.LIMIT))), 'đọc log trận');
    return snap.docs.map(d => d.data());
  },

  avg(a) { return a.length ? a.reduce((s, x) => s + x, 0) / a.length : null; },

  /* rows -> { kpi, levels: Map(lv -> số liệu), waves: {lose theo wave}, hard[] } */
  crunch(rows, opt) {
    // kênh 'test' = bản ghi kiểm luật / QA, không bao giờ tính vào số liệu
    rows = rows.filter(r => r.ch !== 'test');
    const R = rows.filter(r => (!opt.ch || r.ch === opt.ch) && (opt.quit || r.res !== 'quit'));
    const players = new Set(R.map(r => r.pk));
    const wins = R.filter(r => r.res === 'win');
    const kpi = {
      runs: R.length, players: players.size,
      win: R.length ? wins.length / R.length : 0,
      time: this.avg(R.map(r => r.t)),
      quit: rows.length ? rows.filter(r => r.res === 'quit' && (!opt.ch || r.ch === opt.ch)).length
        / rows.filter(r => !opt.ch || r.ch === opt.ch).length : 0,
      maxLv: R.reduce((m, r) => Math.max(m, r.lv), 0)
    };

    const levels = new Map();
    for (const r of R) {
      // vòng vô tận gộp theo vòng: "V2" = map 61-120…
      const key = r.cyc > 0 ? 'V' + (r.cyc + 1) : r.lv;
      if (!levels.has(key)) levels.set(key, { key, lv: r.cyc > 0 ? 60 + r.cyc * 1000 : r.lv,
        chunk: r.cyc > 0 ? 'VÔ TẬN' : r.chunk, runs: [], pk: new Set() });
      const L = levels.get(key);
      L.runs.push(r); L.pk.add(r.pk);
    }
    const out = [...levels.values()].sort((a, b) => a.lv - b.lv).map(L => {
      const w = L.runs.filter(r => r.res === 'win');
      return {
        key: L.key, chunk: L.chunk, n: L.runs.length, players: L.pk.size,
        win: w.length / L.runs.length,
        quit: L.runs.filter(r => r.res === 'quit').length / L.runs.length,
        tWin: this.avg(w.map(r => r.t)), hpWin: this.avg(w.map(r => r.hp)),
        hits: this.avg(L.runs.map(r => r.hits)), bombs: this.avg(L.runs.map(r => r.bombs)),
        esc: this.avg(L.runs.map(r => r.esc)), pw: this.avg(L.runs.map(r => r.pwShow)),
        evo: this.avg(L.runs.map(r => r.evo))
      };
    });

    const waves = {};
    for (const r of R) if (r.res === 'lose') {
      const k = r.bossUp ? 'TRÙM' : 'Wave ' + (r.wave || 0);
      waves[k] = (waves[k] || 0) + 1;
    }
    const hard = out.filter(l => l.n >= 5).sort((a, b) => a.win - b.win).slice(0, 10);
    return { kpi, levels: out, waves, hard, bomb: this.bomb(R, out) };
  },

  /* SỨC MẠNH BOM (log v2+, 22/09/2026). Chỉ tính bản ghi có số sát thương (v>=2).
     - % sát thương / % hạ gục: tổng do bom ÷ tổng cả trận (cộng dồn, không trung bình tỉ lệ)
     - góp vào chiến thắng: tỉ lệ thắng trận CÓ bom − trận KHÔNG bom (điểm %), và % trận
       thắng có bom CỨU NGUY (nổ lúc máu < 35%). Chênh lệch có nhiễu: trận dài nhặt được
       nhiều bom hơn — đọc cùng số trận, đừng đọc một mình. */
  bomb(R) {
    const B = R.filter(r => r.v >= 2);
    const sum = (a, k) => a.reduce((s, r) => s + (r[k] || 0), 0);
    const wr = a => (a.length ? a.filter(r => r.res === 'win').length / a.length : null);
    const withB = B.filter(r => r.bombs > 0), noB = B.filter(r => !r.bombs);
    const wins = B.filter(r => r.res === 'win');
    const kpi = {
      n: B.length,
      dmgPct: sum(B, 'dmg') ? sum(B, 'bDmg') / sum(B, 'dmg') : null,
      killPct: sum(B, 'kills') ? sum(B, 'bKill') / sum(B, 'kills') : null,
      perRun: this.avg(B.map(r => r.bombs || 0)),
      uplift: withB.length && noB.length ? wr(withB) - wr(noB) : null,
      clutchWin: wins.length ? wins.filter(r => r.bClutch > 0).length / wins.length : null
    };
    const by = new Map();
    for (const r of B) {
      const key = r.cyc > 0 ? 'V' + (r.cyc + 1) : r.lv;
      if (!by.has(key)) by.set(key, { key, ord: r.cyc > 0 ? 60 + r.cyc * 1000 : r.lv, rows: [] });
      by.get(key).rows.push(r);
    }
    const levels = [...by.values()].sort((a, b) => a.ord - b.ord).map(L => {
      const a = L.rows, wb = a.filter(r => r.bombs > 0), nb = a.filter(r => !r.bombs);
      return { key: L.key, n: a.length,
        dmgPct: sum(a, 'dmg') ? sum(a, 'bDmg') / sum(a, 'dmg') : 0,
        killPct: sum(a, 'kills') ? sum(a, 'bKill') / sum(a, 'kills') : 0,
        wrBomb: wr(wb), wrNo: wr(nb), nBomb: wb.length, nNo: nb.length };
    });
    return { kpi, levels };
  }
};
