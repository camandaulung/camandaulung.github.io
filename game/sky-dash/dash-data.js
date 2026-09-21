/* dash-data.js — tải + gộp log trận `runs` cho dashboard cân bằng Sky Chicken
 *
 * Tách khỏi phần vẽ (dash.js): hàm gộp là THUẦN (mảng bản ghi -> số liệu), dễ soi và
 * dễ đổi cách tính mà không đụng biểu đồ.
 */

window.Dash = window.Dash || {};

Dash.Data = {
  LIMIT: 5000,

  /* Vé ẩn danh riêng cho dashboard: luật `runs` đòi đăng nhập để đọc */
  async load(days) {
    const fb = await Portal.FB.load();
    if (!fb.auth.currentUser) await fb.authM.signInAnonymously(fb.auth);
    const { collection, query, where, orderBy, limit, getDocs } = fb.fsM;
    const since = Date.now() - days * 864e5;
    const snap = await Portal.FB.limit(getDocs(query(collection(fb.db, 'runs'),
      where('at', '>=', since), orderBy('at', 'desc'), limit(this.LIMIT))), 'đọc log trận');
    return snap.docs.map(d => d.data());
  },

  avg(a) { return a.length ? a.reduce((s, x) => s + x, 0) / a.length : null; },

  /* rows -> { kpi, levels: Map(lv -> số liệu), waves: {lose theo wave}, hard[] } */
  crunch(rows, opt) {
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
    return { kpi, levels: out, waves, hard };
  }
};
