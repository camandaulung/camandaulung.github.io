const Q = /^\d{4}-\d{2}-\d{2}\.(v|hg)\d{1,3}$/, I = (t) => new Date(t + 252e5).toISOString().slice(0, 10);
const W = /* @__PURE__ */ new Set(["route", "rv", "sv", "alt", "dist", "dur", "score", "crash", "tainted"]), tt = /^[A-Za-z][A-Za-z0-9_]{0,31}$/, nt = /^[a-z][a-z-]{0,15}$/, P = (t) => typeof t == "number" && Number.isFinite(t), z = (t, r, e) => Math.min(e, Math.max(r, t)), V = (t) => P(t) ? z(Math.round(t), 1, 9999) : 1;
function C(t, r) {
  if (t === null || typeof t == "boolean") return t;
  if (typeof t == "number") return Number.isFinite(t) ? z(Math.round(t * 1e3) / 1e3, -1e9, 1e9) : null;
  if (typeof t == "string") return t.replace(/[\u0000-\u001f<>]/g, "").slice(0, 64);
  if (typeof t != "object" || r >= 4) return null;
  if (Array.isArray(t)) return t.slice(0, 32).map((a) => C(a, r + 1));
  const e = {};
  let s = 0;
  for (const [a, u] of Object.entries(t))
    r === 0 && W.has(a) || !tt.test(a) || ++s > 48 || (e[a] = C(u, r + 1));
  return e;
}
function et(t) {
  const r = typeof t.route == "string" ? t.route : "";
  if (!Q.test(r)) return "route";
  if (!P(t.dist) || !P(t.dur) || !P(t.score)) return "fields";
  const e = z(Math.round(t.dist * 10) / 10, 0, 1e6), s = z(Math.round(t.dur * 100) / 100, 0, 36e3), a = t.tainted === !0 || e > s * 110 + 50;
  return {
    route: r,
    rv: V(t.rv),
    sv: V(t.sv),
    alt: t.alt === !0,
    dist: e,
    dur: s,
    score: z(Math.round(t.score), 0, 1e9),
    crash: typeof t.crash == "string" && nt.test(t.crash) ? t.crash : null,
    tainted: a,
    detail: JSON.stringify(C(t, 0))
  };
}
const m = (t) => t && typeof t == "object" && !Array.isArray(t) ? t : {}, x = (t) => typeof t == "number" && Number.isFinite(t) ? t : null, b = (t) => x(t) ?? 0, A = (t) => typeof t == "string" && t ? t : null, j = (t) => Object.values(m(t)).reduce((r, e) => r + Math.max(0, b(e)), 0), k = (t, r = 4) => Math.round(t * 10 ** r) / 10 ** r, M = (t, r, e = 4) => r > 0 ? k(t / r, e) : null;
function rt(t, r) {
  const e = Math.min(t.length, r.length);
  if (e < 3) return null;
  let s = 0, a = 0;
  for (let l = 0; l < e; l++)
    s += t[l], a += r[l];
  s /= e, a /= e;
  let u = 0, n = 0, o = 0;
  for (let l = 0; l < e; l++) {
    const i = t[l] - s, c = r[l] - a;
    u += i * c, n += i * i, o += c * c;
  }
  return n > 0 && o > 0 ? k(u / Math.sqrt(n * o), 3) : null;
}
function O(t) {
  if (!t.length) return null;
  const r = [...t].sort((s, a) => s - a), e = r.length >> 1;
  return k(r.length % 2 ? r[e] : (r[e - 1] + r[e]) / 2, 3);
}
function N(t, r, e = 12) {
  let s = t.indexOf(r);
  return s < 0 && t.length < e && (s = t.push(r) - 1), s;
}
function L(t, r, e = 1) {
  if (!t.length) return r.map(() => null);
  const s = [...t].sort((a, u) => a - u);
  return r.map((a) => {
    const u = (s.length - 1) * a, n = Math.floor(u);
    return k(s[n] + (s[Math.min(n + 1, s.length - 1)] - s[n]) * (u - n), e);
  });
}
function $(t) {
  const r = /* @__PURE__ */ new Map();
  let e = null;
  for (const s of t) {
    if (!s) continue;
    r.set(s, (r.get(s) ?? 0) + 1);
    const a = r.get(s);
    (!e || a > r.get(e) || a === r.get(e) && s < e) && (e = s);
  }
  return e;
}
function v(t, r) {
  const e = /* @__PURE__ */ new Map();
  for (const s of t) {
    const a = r(s), u = e.get(a);
    u ? u.push(s) : e.set(a, [s]);
  }
  return e;
}
const R = 500, st = 3e4, _ = ["low", "zero", "high", "thermal"], G = Array.from({ length: 13 }, (t, r) => k(r * 0.1, 1)), X = (t) => {
  const r = /* @__PURE__ */ new Map();
  for (const e of t) {
    const s = r.get(e.rv);
    s ? s.push(e) : r.set(e.rv, [e]);
  }
  return [...r].sort((e, s) => e[0] - s[0]);
};
function ot(t) {
  const r = t.reduce((s, a) => Math.max(s, a.dist), 0), e = Math.min(st, Math.ceil(r / R) * R) / R + 1;
  return {
    step: R,
    byRv: X(t).map(([s, a]) => {
      const u = new Array(e).fill(0);
      for (const n of a) u[Math.min(e - 1, Math.floor(n.dist / R))]++;
      for (let n = e - 2; n >= 0; n--) u[n] += u[n + 1];
      return { rv: s, runs: a.length, alive: u.map((n) => k(n / a.length)) };
    })
  };
}
function it(t) {
  const r = [], e = ["gorge", "mouth", "valley", "village", "rim", "dive", "river", "cave", "climb", "gate"], s = [..._], a = [], u = [];
  let n = 0;
  const o = (f, p, y) => {
    const g = f[p] ??= [];
    g[y] = (g[y] ?? 0) + 1;
  };
  for (const f of t) {
    if (!f.crash) continue;
    const p = N(r, f.crash), y = m(f.d.death), g = A(y.zone), h = A(y.tier);
    if (p < 0 || !g && !h) {
      n++;
      continue;
    }
    g && o(a, p, N(e, g)), h && o(u, p, N(s, h));
  }
  const l = (f, p) => r.map((y, g) => Array.from({ length: p }, (h, E) => f[g]?.[E] ?? 0)), i = l(a, e.length), c = l(u, s.length), d = r.map((f, p) => p).sort((f, p) => T(i[p]) + T(c[p]) - T(i[f]) - T(c[f]));
  return {
    kinds: d.map((f) => r[f]),
    zones: e,
    tiers: s,
    byZone: d.map((f) => i[f]),
    byTier: d.map((f) => c[f]),
    noDetail: n
  };
}
const T = (t) => t.reduce((r, e) => r + e, 0);
function at(t) {
  return X(t).map(([r, e]) => {
    const s = Object.fromEntries(_.map((i) => [i, 0]));
    let a = 0, u = 0, n = !1, o = 0;
    for (const i of e) {
      const c = m(i.d.tiers);
      for (const f of _) s[f] += Math.max(0, b(c[f]));
      a += Math.max(0, b(i.d.bridgesFromLow));
      const d = x(i.d.bridges);
      d !== null && (n = !0, u += Math.max(0, d)), o += i.dist / 1e3;
    }
    const l = j(s);
    return {
      rv: r,
      runs: e.length,
      seconds: Object.fromEntries(_.map((i) => [i, k(s[i], 1)])),
      share: Object.fromEntries(_.map((i) => [i, M(s[i], l)])),
      bridgesFromLow: a,
      bridges: n ? u : null,
      freeShare: n ? M(a, u) : null,
      fromLowPerKm: M(a, o, 3)
    };
  });
}
function ct(t) {
  const r = (s, a) => {
    const u = [...a], n = [];
    for (const o of t) {
      const l = m(o.d.lead), i = x(l.p10), c = s(o);
      if (!c || i === null || b(l.n) <= 0) continue;
      const d = N(u, c, 8);
      d >= 0 && (n[d] ??= []).push(i);
    }
    return u.map((o, l) => {
      const i = n[l] ?? [], c = new Array(G.length).fill(0);
      for (const d of i) c[Math.max(0, Math.min(G.length - 1, Math.floor(d * 10 + 1e-9)))]++;
      return { key: o, n: i.length, counts: c, median: O(i) };
    }).filter((o) => o.n > 0);
  }, e = (s) => m(s.d.device);
  return {
    edges: G,
    byTier: r((s) => A(e(s).tier), ["high", "mid", "low"]),
    byInput: r((s) => A(e(s).input), ["touch", "key", "mixed"])
  };
}
const S = 250, ut = 15e3, B = [0.25, 0.5, 0.75, 0.95], K = 10, lt = 10, H = (t) => [...v(t, (r) => r.run.rv)].filter(([, r]) => r.length >= lt).sort((r, e) => e[1].length - r[1].length || r[0] - e[0]);
function dt(t) {
  return [...v(t, (r) => r.run.pid).values()].map((r) => {
    const e = [...r].sort((a, u) => a.idx - u.idx);
    let s = 0;
    return e.forEach((a, u) => a.run.dist > e[s].run.dist && (s = u)), { best: e[s].run.dist, runs: e.length, since: e.length - 1 - s };
  });
}
function ft(t) {
  return H(t).map(([r, e]) => {
    const s = Math.floor(Math.min(ut, Math.max(...e.map((c) => c.run.dist))) / S) + 1, a = (c) => Math.min(s - 1, Math.floor(c / S)), u = Array.from({ length: s }, () => ({ end: 0, deaths: 0, quits: 0, known: 0, left: 0, stuck: 0, zones: [], kinds: [] }));
    for (const c of e) {
      const d = u[a(c.run.dist)];
      if (d.end++, !c.death) {
        d.left++;
        continue;
      }
      d.deaths++, d.zones.push(A(m(c.run.d.death).zone)), d.kinds.push(c.run.crash), c.quit !== null && (d.known++, c.quit && d.quits++);
    }
    const n = dt(e), o = n.filter((c) => c.since >= K);
    for (const c of o) u[a(c.best)].stuck++;
    let l = 0;
    const i = u.map((c) => c.end).reverse().map((c) => l += c).reverse();
    return {
      rv: r,
      runs: e.length,
      players: n.length,
      seg: S,
      runP: L(e.map((c) => c.run.dist), B, 0),
      bestP: L(n.map((c) => c.best), B, 0),
      stuck: { players: o.length, eligible: n.filter((c) => c.runs > K).length, runs: K },
      segs: u.map((c, d) => ({
        from: d * S,
        reach: i[d],
        deaths: c.deaths,
        rate: M(c.deaths, i[d], 3),
        known: c.known,
        quits: c.quits,
        left: c.left,
        stuck: c.stuck,
        zone: $(c.zones),
        kind: $(c.kinds)
      }))
    };
  });
}
const F = 10 * 6e4;
function ht(t, r, e) {
  const s = /* @__PURE__ */ new Map();
  for (const u of t) {
    const n = s.get(u.pid);
    n ? n.push(u) : s.set(u.pid, [u]);
  }
  const a = [];
  for (const [u, n] of s) {
    n.sort((i, c) => i.at - c.at || i.dur - c.dur || i.dist - c.dist);
    const o = e?.get(u) ?? 0, l = /* @__PURE__ */ new Map();
    n.forEach((i, c) => {
      if (!i.run) return;
      const d = n[c + 1], f = d ? d.at - d.dur * 1e3 - i.at >= F : r - i.at >= F ? !0 : null, p = l.get(i.rv) ?? 0;
      a.push({ run: i.run, idx: o + c + 1, total: o + n.length, quit: f, bestBefore: p, death: !!i.run.crash }), l.set(i.rv, Math.max(p, i.dist));
    });
  }
  return a.sort((u, n) => u.run.at - n.run.at || (u.run.pid < n.run.pid ? -1 : u.run.pid > n.run.pid ? 1 : u.idx - n.idx));
}
const pt = [["1", 1, 1], ["2–5", 2, 5], ["6–20", 6, 20], ["21–50", 21, 50], ["51+", 51, 1e9]], mt = 10;
function w(t) {
  let r = 0, e = 0;
  for (const s of t)
    s.quit !== null && (r++, s.quit && e++);
  return { n: t.length, known: r, quits: e, rate: M(e, r, 3) };
}
function gt(t) {
  return t.bestBefore <= 0 ? "first" : t.run.dist > t.bestBefore ? "pb" : t.run.dist >= t.bestBefore / 2 ? "near" : "far";
}
function Z(t, r) {
  return [...v(t, r)].filter(([e]) => e !== null).map(([e, s]) => ({ key: e, ...w(s) })).sort((e, s) => s.quits - e.quits || s.n - e.n || (e.key < s.key ? -1 : 1));
}
function yt(t) {
  const r = t.filter((n) => n.death), e = t.filter((n) => !n.death), s = t.filter((n) => n.idx === 1), a = (n) => A(m(n.run.d.death).zone), u = [...v(r, (n) => `${n.run.rv}:${Math.floor(n.run.dist / S)}`).values()].map((n) => ({
    rv: n[0].run.rv,
    from: Math.floor(n[0].run.dist / S) * S,
    ...w(n),
    zone: $(n.map(a)),
    kind: $(n.map((o) => o.run.crash))
  })).sort((n, o) => o.quits - n.quits || o.n - n.n || n.rv - o.rv || n.from - o.from).slice(0, mt);
  return {
    gapMin: F / 6e4,
    seg: S,
    deaths: w(r),
    /** Bỏ ngay sau ván ĐẦU TIÊN (ván 1 của người chơi, kết thúc kiểu gì cũng tính). */
    firstRun: w(s),
    /** Ván không rơi mà bỏ giữa chừng: "Bỏ ván" ở bảng tạm dừng / rời trang lúc đang bay (log từ 03/11). */
    midRun: { abandon: e.filter((n) => n.run.d.end === "abandon").length, close: e.filter((n) => n.run.d.end === "close").length, ...w(e) },
    byIdx: pt.map(([n, o, l]) => ({ key: n, ...w(r.filter((i) => i.idx >= o && i.idx <= l)) })),
    byOutcome: ["first", "pb", "near", "far"].map((n) => ({ key: n, ...w(r.filter((o) => gt(o) === n)) })),
    byZone: Z(r, a),
    byKind: Z(r, (n) => n.run.crash),
    spots: u
  };
}
const Mt = [[1, 1], [2, 2], [3, 3], [4, 5], [6, 10], [11, 20], [21, 35], [36, 50], [51, 100], [101, 1e9]], D = 20, U = [500, 1e3, 2e3, 3e3, 5e3, 8e3, 12e3];
function St(t) {
  return H(t).map(([r, e]) => {
    const s = /* @__PURE__ */ new Map(), a = new Map(U.map((o) => [o, []])), u = v(e, (o) => o.run.pid);
    for (const o of u.values()) {
      let l = 0;
      const i = /* @__PURE__ */ new Set();
      for (const c of [...o].sort((d, f) => d.idx - f.idx)) {
        l = Math.max(l, c.run.dist), s.set(c, l);
        for (const d of U)
          l >= d && !i.has(d) && (i.add(d), a.get(d).push(c.idx));
      }
    }
    const n = Mt.map(([o, l]) => {
      const i = e.filter((h) => h.idx >= o && h.idx <= l), c = l <= D ? i.filter((h) => h.total >= D) : [], d = i.reduce((h, E) => h + E.run.dist / 1e3, 0), f = i.map((h) => m(h.run.d.lead)).filter((h) => b(h.n) > 0).map((h) => x(h.p10)).filter((h) => h !== null), [p, y, g] = L(i.map((h) => h.run.dist), [0.25, 0.5, 0.75], 0);
      return {
        lo: o,
        hi: l,
        runs: i.length,
        players: new Set(i.map((h) => h.run.pid)).size,
        p25: p,
        p50: y,
        p75: g,
        best50: O(i.map((h) => s.get(h))),
        cohort50: c.length ? O(c.map((h) => h.run.dist)) : null,
        cohortRuns: c.length,
        hurtsPerKm: M(i.reduce((h, E) => h + Math.max(0, b(E.run.d.hurts)), 0), d, 2),
        lead50: O(f)
      };
    }).filter((o) => o.runs > 0);
    return {
      rv: r,
      runs: e.length,
      players: u.size,
      cohortMin: D,
      cohortPlayers: [...u.values()].filter((o) => o[0].total >= D).length,
      byIdx: n,
      milestones: U.map((o) => {
        const [l, i, c] = L(a.get(o), [0.25, 0.5, 0.75], 0);
        return { m: o, reached: a.get(o).length, of: u.size, i25: l, i50: i, i75: c };
      })
    };
  });
}
const q = ["meters", "lantern", "nearMiss", "gust"], bt = 864e5, kt = 200, Y = (t) => [...t].sort((r, e) => r[0] - e[0]);
function vt(t) {
  const r = Y(v(t.filter((e) => q.some((s) => x(m(e.d.parts)[s]) !== null)), (e) => e.sv));
  return {
    target: [0.25, 0.35],
    bySv: r.map(([e, s]) => {
      const a = Object.fromEntries(q.map((n) => [n, s.reduce((o, l) => o + Math.max(0, b(m(l.d.parts)[n])), 0)])), u = j(a);
      return {
        sv: e,
        runs: s.length,
        avgScore: Math.round(s.reduce((n, o) => n + o.score, 0) / s.length),
        parts: Object.fromEntries(q.map((n) => [n, Math.round(a[n])])),
        share: Object.fromEntries(q.map((n) => [n, M(a[n], u)]))
      };
    })
  };
}
function wt(t) {
  return {
    target: 0.4,
    bySv: Y(v(t, (r) => r.sv)).map(([r, e]) => {
      const s = /* @__PURE__ */ new Map();
      for (const n of e) {
        const o = s.get(n.pid);
        (!o || n.score > o.score || n.score === o.score && n.at < o.at) && s.set(n.pid, n);
      }
      const a = [...s.values()].sort((n, o) => o.score - n.score || n.at - o.at).map((n, o) => {
        const l = m(n.d.lanterns);
        return { name: n.name, score: n.score, dist: Math.round(n.dist), rank: o + 1, pick: M(j(l.taken), j(l.spawned), 3) };
      }), u = a.filter((n) => n.pick !== null);
      return { sv: r, n: a.length, pearson: rt(u.map((n) => n.pick), u.map((n) => -n.rank)), players: a.slice(0, kt) };
    })
  };
}
function At(t) {
  const r = (n, o) => {
    const l = o.filter((d) => d.crash).length, i = o.reduce((d, f) => d + f.dist / 1e3, 0), c = o.filter((d) => d.crash && m(d.d.ghosts).deathNear === !0).length;
    return { key: n, runs: o.length, deaths: l, km: k(i, 1), perKm: M(l, i, 3), medianDist: O(o.map((d) => d.dist)), nearShare: M(c, l, 3) };
  }, e = t.filter((n) => x(m(n.d.ghosts).shown) !== null), s = (n) => b(m(n.d.ghosts).shown) > 0, a = (n) => m(n.d.ghosts).deathNear === !0, u = v(t, (n) => A(m(n.d.prefs).ghosts));
  return {
    groups: [
      r("near", e.filter((n) => s(n) && a(n))),
      r("far", e.filter((n) => s(n) && !a(n))),
      r("none", e.filter((n) => !s(n)))
    ],
    bySetting: ["on", "dim", "off"].map((n) => r(n, u.get(n) ?? []))
  };
}
function xt(t, r) {
  const e = [];
  for (let s = Date.parse(`${t}T00:00:00Z`), a = Date.parse(`${r}T00:00:00Z`); s <= a; s += bt)
    e.push(new Date(s).toISOString().slice(0, 10));
  return e;
}
function Et(t, r) {
  const e = [], s = [], a = new Map(xt(r.from, r.to).map((o) => [o, { day: o, runs: 0, players: /* @__PURE__ */ new Set(), tainted: 0 }]));
  let u = 0;
  for (const { detail: o, tainted: l, ...i } of t) {
    const c = a.get(i.day);
    if (l) {
      u++, c && c.tainted++, s.push({ pid: i.pid, at: i.at, dur: i.dur, rv: i.rv, dist: i.dist, run: null });
      continue;
    }
    let d = {};
    try {
      d = m(JSON.parse(o));
    } catch {
    }
    const f = { ...i, d };
    e.push(f), s.push({ pid: i.pid, at: i.at, dur: i.dur, rv: i.rv, dist: i.dist, run: f }), c && (c.runs++, c.players.add(i.pid));
  }
  const n = ht(s, r.now, r.prior);
  return {
    days: r.days,
    from: r.from,
    to: r.to,
    at: r.now,
    runs: t.length,
    used: e.length,
    tainted: u,
    players: new Set(e.map((o) => o.pid)).size,
    altRuns: e.filter((o) => o.alt).length,
    stuck: ft(n),
    skill: St(n),
    quits: yt(n),
    score: vt(e),
    lanternRank: wt(e),
    survival: { ...ot(e), causes: it(e) },
    tiers: { byRv: at(e) },
    lead: ct(e),
    daily: [...a.values()].map((o) => ({ day: o.day, runs: o.runs, players: o.players.size, tainted: o.tainted })),
    ghosts: At(e),
    recent: r.recent
  };
}
const J = 864e5, Rt = 30, zt = (t, r) => Date.parse(`${I(r - (t - 1) * J)}T00:00:00+07:00`);
function _t(t) {
  const r = t.at;
  if (typeof r != "number" || !Number.isFinite(r)) return null;
  let e = {};
  try {
    const g = JSON.parse(String(t.detail ?? "{}"));
    g && typeof g == "object" && !Array.isArray(g) && (e = g);
  } catch {
  }
  const { route: s, rv: a, sv: u, alt: n, dist: o, dur: l, score: i, crash: c, tainted: d } = t, f = et({ ...e, route: s, rv: a, sv: u, alt: n, dist: o, dur: l, score: i, crash: c, tainted: d });
  if (typeof f == "string") return null;
  const p = typeof t.pk == "string" ? t.pk.replace(/[^a-z0-9]/g, "").slice(0, 16) : "", y = `${t.ch === "dev" ? "Dev" : "Khách"} ${p.slice(0, 4) || "?"}`;
  return { ...f, at: r, day: I(r), pid: p, name: y, alt: f.alt ? 1 : 0, tainted: f.tainted ? 1 : 0 };
}
function Ot(t, r, e) {
  const s = I(e), a = I(e - (r - 1) * J), u = [];
  for (const o of t) {
    const l = _t(o);
    l && l.day >= a && l.day <= s && u.push(l);
  }
  const n = u.slice(0, Rt).map((o) => ({ name: o.name, dist: o.dist, score: o.score, crash: o.crash, at: o.at, tainted: o.tainted === 1 }));
  return Et(u, { days: r, from: a, to: s, now: e, recent: n });
}
export {
  zt as sinceMs,
  Ot as statsFromRows,
  _t as toRawRun
};
