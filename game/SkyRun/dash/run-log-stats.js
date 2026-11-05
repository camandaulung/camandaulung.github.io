const nt = /^\d{4}-\d{2}-\d{2}\.(v|hg|mc|fp)\d{1,3}$/, $ = (t) => new Date(t + 252e5).toISOString().slice(0, 10);
const et = /* @__PURE__ */ new Set(["route", "rv", "sv", "alt", "dist", "dur", "score", "crash", "tainted"]), rt = /^[A-Za-z][A-Za-z0-9_]{0,31}$/, st = /^[a-z][a-z-]{0,15}$/, N = (t) => typeof t == "number" && Number.isFinite(t), R = (t, r, e) => Math.min(e, Math.max(r, t)), B = (t) => N(t) ? R(Math.round(t), 1, 9999) : 1;
function F(t, r) {
  if (t === null || typeof t == "boolean") return t;
  if (typeof t == "number") return Number.isFinite(t) ? R(Math.round(t * 1e3) / 1e3, -1e9, 1e9) : null;
  if (typeof t == "string") return t.replace(/[\u0000-\u001f<>]/g, "").slice(0, 64);
  if (typeof t != "object" || r >= 4) return null;
  if (Array.isArray(t)) return t.slice(0, 32).map((a) => F(a, r + 1));
  const e = {};
  let s = 0;
  for (const [a, u] of Object.entries(t))
    r === 0 && et.has(a) || !rt.test(a) || ++s > 48 || (e[a] = F(u, r + 1));
  return e;
}
function ot(t) {
  const r = typeof t.route == "string" ? t.route : "";
  if (!nt.test(r)) return "route";
  if (!N(t.dist) || !N(t.dur) || !N(t.score)) return "fields";
  const e = R(Math.round(t.dist * 10) / 10, 0, 1e6), s = R(Math.round(t.dur * 100) / 100, 0, 36e3), a = t.tainted === !0 || e > s * 110 + 50;
  return {
    route: r,
    rv: B(t.rv),
    sv: B(t.sv),
    alt: t.alt === !0,
    dist: e,
    dur: s,
    score: R(Math.round(t.score), 0, 1e9),
    crash: typeof t.crash == "string" && st.test(t.crash) ? t.crash : null,
    tainted: a,
    detail: JSON.stringify(F(t, 0))
  };
}
const g = (t) => t && typeof t == "object" && !Array.isArray(t) ? t : {}, x = (t) => typeof t == "number" && Number.isFinite(t) ? t : null, b = (t) => x(t) ?? 0, O = (t) => typeof t == "string" && t ? t : null, Z = (t, r) => {
  const e = O(g(r).zone);
  return e && (t >= 3e3 ? `fp-${e}` : t >= 2e3 ? `mc-${e}` : e);
}, j = (t) => Object.values(g(t)).reduce((r, e) => r + Math.max(0, b(e)), 0), k = (t, r = 4) => Math.round(t * 10 ** r) / 10 ** r, S = (t, r, e = 4) => r > 0 ? k(t / r, e) : null;
function it(t, r) {
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
function z(t) {
  if (!t.length) return null;
  const r = [...t].sort((s, a) => s - a), e = r.length >> 1;
  return k(r.length % 2 ? r[e] : (r[e - 1] + r[e]) / 2, 3);
}
function I(t, r, e = 12) {
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
function G(t) {
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
function w(t, r) {
  const e = /* @__PURE__ */ new Map();
  for (const s of t) {
    const a = r(s), u = e.get(a);
    u ? u.push(s) : e.set(a, [s]);
  }
  return e;
}
const E = 500, at = 3e4, _ = ["low", "zero", "high", "thermal"], K = Array.from({ length: 13 }, (t, r) => k(r * 0.1, 1)), Y = (t) => {
  const r = /* @__PURE__ */ new Map();
  for (const e of t) {
    const s = r.get(e.rv);
    s ? s.push(e) : r.set(e.rv, [e]);
  }
  return [...r].sort((e, s) => e[0] - s[0]);
};
function ct(t) {
  const r = t.reduce((s, a) => Math.max(s, a.dist), 0), e = Math.min(at, Math.ceil(r / E) * E) / E + 1;
  return {
    step: E,
    byRv: Y(t).map(([s, a]) => {
      const u = new Array(e).fill(0);
      for (const n of a) u[Math.min(e - 1, Math.floor(n.dist / E))]++;
      for (let n = e - 2; n >= 0; n--) u[n] += u[n + 1];
      return { rv: s, runs: a.length, alive: u.map((n) => k(n / a.length)) };
    })
  };
}
function ut(t) {
  const r = [], e = [
    "gorge",
    "mouth",
    "valley",
    "village",
    "rim",
    "dive",
    "river",
    "cave",
    "climb",
    "gate",
    "mc-valley",
    "mc-dive",
    "mc-river",
    "mc-climb",
    "mc-village",
    "mc-gate",
    "fp-gorge",
    "fp-river",
    "fp-valley"
  ], s = [..._], a = [], u = [];
  let n = 0;
  const o = (h, p, f) => {
    const y = h[p] ??= [];
    y[f] = (y[f] ?? 0) + 1;
  };
  for (const h of t) {
    if (!h.crash) continue;
    const p = I(r, h.crash), f = g(h.d.death), y = Z(h.rv, f), T = O(f.tier);
    if (p < 0 || !y && !T) {
      n++;
      continue;
    }
    y && o(a, p, I(e, y)), T && o(u, p, I(s, T));
  }
  const l = (h, p) => r.map((f, y) => Array.from({ length: p }, (T, tt) => h[y]?.[tt] ?? 0)), i = l(a, e.length), c = l(u, s.length), d = r.map((h, p) => p).sort((h, p) => D(i[p]) + D(c[p]) - D(i[h]) - D(c[h])), m = e.map((h, p) => i.some((f) => f[p] > 0)), M = (h) => h.filter((p, f) => m[f]);
  return {
    kinds: d.map((h) => r[h]),
    zones: M(e),
    tiers: s,
    byZone: d.map((h) => M(i[h])),
    byTier: d.map((h) => c[h]),
    noDetail: n
  };
}
const D = (t) => t.reduce((r, e) => r + e, 0);
function lt(t) {
  return Y(t).map(([r, e]) => {
    const s = Object.fromEntries(_.map((i) => [i, 0]));
    let a = 0, u = 0, n = !1, o = 0;
    for (const i of e) {
      const c = g(i.d.tiers);
      for (const m of _) s[m] += Math.max(0, b(c[m]));
      a += Math.max(0, b(i.d.bridgesFromLow));
      const d = x(i.d.bridges);
      d !== null && (n = !0, u += Math.max(0, d)), o += i.dist / 1e3;
    }
    const l = j(s);
    return {
      rv: r,
      runs: e.length,
      seconds: Object.fromEntries(_.map((i) => [i, k(s[i], 1)])),
      share: Object.fromEntries(_.map((i) => [i, S(s[i], l)])),
      bridgesFromLow: a,
      bridges: n ? u : null,
      freeShare: n ? S(a, u) : null,
      fromLowPerKm: S(a, o, 3)
    };
  });
}
function dt(t) {
  const r = (s, a) => {
    const u = [...a], n = [];
    for (const o of t) {
      const l = g(o.d.lead), i = x(l.p10), c = s(o);
      if (!c || i === null || b(l.n) <= 0) continue;
      const d = I(u, c, 8);
      d >= 0 && (n[d] ??= []).push(i);
    }
    return u.map((o, l) => {
      const i = n[l] ?? [], c = new Array(K.length).fill(0);
      for (const d of i) c[Math.max(0, Math.min(K.length - 1, Math.floor(d * 10 + 1e-9)))]++;
      return { key: o, n: i.length, counts: c, median: z(i) };
    }).filter((o) => o.n > 0);
  }, e = (s) => g(s.d.device);
  return {
    edges: K,
    byTier: r((s) => O(e(s).tier), ["high", "mid", "low"]),
    byInput: r((s) => O(e(s).input), ["touch", "key", "mixed"])
  };
}
const v = 250, ft = 15e3, X = [0.25, 0.5, 0.75, 0.95], U = 10, ht = 10, J = (t) => [...w(t, (r) => r.run.rv)].filter(([, r]) => r.length >= ht).sort((r, e) => e[1].length - r[1].length || r[0] - e[0]);
function pt(t) {
  return [...w(t, (r) => r.run.pid).values()].map((r) => {
    const e = [...r].sort((a, u) => a.idx - u.idx);
    let s = 0;
    return e.forEach((a, u) => a.run.dist > e[s].run.dist && (s = u)), { best: e[s].run.dist, runs: e.length, since: e.length - 1 - s };
  });
}
function mt(t) {
  return J(t).map(([r, e]) => {
    const s = Math.floor(Math.min(ft, Math.max(...e.map((c) => c.run.dist))) / v) + 1, a = (c) => Math.min(s - 1, Math.floor(c / v)), u = Array.from({ length: s }, () => ({ end: 0, deaths: 0, quits: 0, known: 0, left: 0, stuck: 0, zones: [], kinds: [] }));
    for (const c of e) {
      const d = u[a(c.run.dist)];
      if (d.end++, !c.death) {
        d.left++;
        continue;
      }
      d.deaths++, d.zones.push(Z(c.run.rv, c.run.d.death)), d.kinds.push(c.run.crash), c.quit !== null && (d.known++, c.quit && d.quits++);
    }
    const n = pt(e), o = n.filter((c) => c.since >= U);
    for (const c of o) u[a(c.best)].stuck++;
    let l = 0;
    const i = u.map((c) => c.end).reverse().map((c) => l += c).reverse();
    return {
      rv: r,
      runs: e.length,
      players: n.length,
      seg: v,
      runP: L(e.map((c) => c.run.dist), X, 0),
      bestP: L(n.map((c) => c.best), X, 0),
      stuck: { players: o.length, eligible: n.filter((c) => c.runs > U).length, runs: U },
      segs: u.map((c, d) => ({
        from: d * v,
        reach: i[d],
        deaths: c.deaths,
        rate: S(c.deaths, i[d], 3),
        known: c.known,
        quits: c.quits,
        left: c.left,
        stuck: c.stuck,
        zone: G(c.zones),
        kind: G(c.kinds)
      }))
    };
  });
}
const V = 10 * 6e4;
function gt(t, r, e) {
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
      const d = n[c + 1], m = d ? d.at - d.dur * 1e3 - i.at >= V : r - i.at >= V ? !0 : null, M = l.get(i.rv) ?? 0;
      a.push({ run: i.run, idx: o + c + 1, total: o + n.length, quit: m, bestBefore: M, death: !!i.run.crash }), l.set(i.rv, Math.max(M, i.dist));
    });
  }
  return a.sort((u, n) => u.run.at - n.run.at || (u.run.pid < n.run.pid ? -1 : u.run.pid > n.run.pid ? 1 : u.idx - n.idx));
}
const yt = [["1", 1, 1], ["2–5", 2, 5], ["6–20", 6, 20], ["21–50", 21, 50], ["51+", 51, 1e9]], Mt = 10;
function A(t) {
  let r = 0, e = 0;
  for (const s of t)
    s.quit !== null && (r++, s.quit && e++);
  return { n: t.length, known: r, quits: e, rate: S(e, r, 3) };
}
function St(t) {
  return t.bestBefore <= 0 ? "first" : t.run.dist > t.bestBefore ? "pb" : t.run.dist >= t.bestBefore / 2 ? "near" : "far";
}
function H(t, r) {
  return [...w(t, r)].filter(([e]) => e !== null).map(([e, s]) => ({ key: e, ...A(s) })).sort((e, s) => s.quits - e.quits || s.n - e.n || (e.key < s.key ? -1 : 1));
}
function vt(t) {
  const r = t.filter((n) => n.death), e = t.filter((n) => !n.death), s = t.filter((n) => n.idx === 1), a = (n) => Z(n.run.rv, n.run.d.death), u = [...w(r, (n) => `${n.run.rv}:${Math.floor(n.run.dist / v)}`).values()].map((n) => ({
    rv: n[0].run.rv,
    from: Math.floor(n[0].run.dist / v) * v,
    ...A(n),
    zone: G(n.map(a)),
    kind: G(n.map((o) => o.run.crash))
  })).sort((n, o) => o.quits - n.quits || o.n - n.n || n.rv - o.rv || n.from - o.from).slice(0, Mt);
  return {
    gapMin: V / 6e4,
    seg: v,
    deaths: A(r),
    /** Bỏ ngay sau ván ĐẦU TIÊN (ván 1 của người chơi, kết thúc kiểu gì cũng tính). */
    firstRun: A(s),
    /** Ván không rơi mà bỏ giữa chừng: "Bỏ ván" ở bảng tạm dừng / rời trang lúc đang bay (log từ 03/11). */
    midRun: { abandon: e.filter((n) => n.run.d.end === "abandon").length, close: e.filter((n) => n.run.d.end === "close").length, ...A(e) },
    byIdx: yt.map(([n, o, l]) => ({ key: n, ...A(r.filter((i) => i.idx >= o && i.idx <= l)) })),
    byOutcome: ["first", "pb", "near", "far"].map((n) => ({ key: n, ...A(r.filter((o) => St(o) === n)) })),
    byZone: H(r, a),
    byKind: H(r, (n) => n.run.crash),
    spots: u
  };
}
const bt = [[1, 1], [2, 2], [3, 3], [4, 5], [6, 10], [11, 20], [21, 35], [36, 50], [51, 100], [101, 1e9]], q = 20, C = [500, 1e3, 2e3, 3e3, 5e3, 8e3, 12e3];
function kt(t) {
  return J(t).map(([r, e]) => {
    const s = /* @__PURE__ */ new Map(), a = new Map(C.map((o) => [o, []])), u = w(e, (o) => o.run.pid);
    for (const o of u.values()) {
      let l = 0;
      const i = /* @__PURE__ */ new Set();
      for (const c of [...o].sort((d, m) => d.idx - m.idx)) {
        l = Math.max(l, c.run.dist), s.set(c, l);
        for (const d of C)
          l >= d && !i.has(d) && (i.add(d), a.get(d).push(c.idx));
      }
    }
    const n = bt.map(([o, l]) => {
      const i = e.filter((f) => f.idx >= o && f.idx <= l), c = l <= q ? i.filter((f) => f.total >= q) : [], d = i.reduce((f, y) => f + y.run.dist / 1e3, 0), m = i.map((f) => g(f.run.d.lead)).filter((f) => b(f.n) > 0).map((f) => x(f.p10)).filter((f) => f !== null), [M, h, p] = L(i.map((f) => f.run.dist), [0.25, 0.5, 0.75], 0);
      return {
        lo: o,
        hi: l,
        runs: i.length,
        players: new Set(i.map((f) => f.run.pid)).size,
        p25: M,
        p50: h,
        p75: p,
        best50: z(i.map((f) => s.get(f))),
        cohort50: c.length ? z(c.map((f) => f.run.dist)) : null,
        cohortRuns: c.length,
        hurtsPerKm: S(i.reduce((f, y) => f + Math.max(0, b(y.run.d.hurts)), 0), d, 2),
        lead50: z(m)
      };
    }).filter((o) => o.runs > 0);
    return {
      rv: r,
      runs: e.length,
      players: u.size,
      cohortMin: q,
      cohortPlayers: [...u.values()].filter((o) => o[0].total >= q).length,
      byIdx: n,
      milestones: C.map((o) => {
        const [l, i, c] = L(a.get(o), [0.25, 0.5, 0.75], 0);
        return { m: o, reached: a.get(o).length, of: u.size, i25: l, i50: i, i75: c };
      })
    };
  });
}
const P = ["meters", "lantern", "nearMiss", "gust", "boost"], wt = 864e5, At = 200, Q = (t) => [...t].sort((r, e) => r[0] - e[0]);
function xt(t) {
  const r = Q(w(t.filter((e) => P.some((s) => x(g(e.d.parts)[s]) !== null)), (e) => e.sv));
  return {
    target: [0.25, 0.35],
    bySv: r.map(([e, s]) => {
      const a = Object.fromEntries(P.map((n) => [n, s.reduce((o, l) => o + Math.max(0, b(g(l.d.parts)[n])), 0)])), u = j(a);
      return {
        sv: e,
        runs: s.length,
        avgScore: Math.round(s.reduce((n, o) => n + o.score, 0) / s.length),
        parts: Object.fromEntries(P.map((n) => [n, Math.round(a[n])])),
        share: Object.fromEntries(P.map((n) => [n, S(a[n], u)]))
      };
    })
  };
}
function Et(t) {
  return {
    target: 0.4,
    bySv: Q(w(t, (r) => r.sv)).map(([r, e]) => {
      const s = /* @__PURE__ */ new Map();
      for (const n of e) {
        const o = s.get(n.pid);
        (!o || n.score > o.score || n.score === o.score && n.at < o.at) && s.set(n.pid, n);
      }
      const a = [...s.values()].sort((n, o) => o.score - n.score || n.at - o.at).map((n, o) => {
        const l = g(n.d.lanterns);
        return { name: n.name, score: n.score, dist: Math.round(n.dist), rank: o + 1, pick: S(j(l.taken), j(l.spawned), 3) };
      }), u = a.filter((n) => n.pick !== null);
      return { sv: r, n: a.length, pearson: it(u.map((n) => n.pick), u.map((n) => -n.rank)), players: a.slice(0, At) };
    })
  };
}
function _t(t) {
  const r = (n, o) => {
    const l = o.filter((d) => d.crash).length, i = o.reduce((d, m) => d + m.dist / 1e3, 0), c = o.filter((d) => d.crash && g(d.d.ghosts).deathNear === !0).length;
    return { key: n, runs: o.length, deaths: l, km: k(i, 1), perKm: S(l, i, 3), medianDist: z(o.map((d) => d.dist)), nearShare: S(c, l, 3) };
  }, e = t.filter((n) => x(g(n.d.ghosts).shown) !== null), s = (n) => b(g(n.d.ghosts).shown) > 0, a = (n) => g(n.d.ghosts).deathNear === !0, u = w(t, (n) => O(g(n.d.prefs).ghosts));
  return {
    groups: [
      r("near", e.filter((n) => s(n) && a(n))),
      r("far", e.filter((n) => s(n) && !a(n))),
      r("none", e.filter((n) => !s(n)))
    ],
    bySetting: ["on", "dim", "off"].map((n) => r(n, u.get(n) ?? []))
  };
}
function Rt(t, r) {
  const e = [];
  for (let s = Date.parse(`${t}T00:00:00Z`), a = Date.parse(`${r}T00:00:00Z`); s <= a; s += wt)
    e.push(new Date(s).toISOString().slice(0, 10));
  return e;
}
function zt(t, r) {
  const e = [], s = [], a = new Map(Rt(r.from, r.to).map((o) => [o, { day: o, runs: 0, players: /* @__PURE__ */ new Set(), tainted: 0 }]));
  let u = 0;
  for (const { detail: o, tainted: l, ...i } of t) {
    const c = a.get(i.day);
    if (l) {
      u++, c && c.tainted++, s.push({ pid: i.pid, at: i.at, dur: i.dur, rv: i.rv, dist: i.dist, run: null });
      continue;
    }
    let d = {};
    try {
      d = g(JSON.parse(o));
    } catch {
    }
    const m = { ...i, d };
    e.push(m), s.push({ pid: i.pid, at: i.at, dur: i.dur, rv: i.rv, dist: i.dist, run: m }), c && (c.runs++, c.players.add(i.pid));
  }
  const n = gt(s, r.now, r.prior);
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
    stuck: mt(n),
    skill: kt(n),
    quits: vt(n),
    score: xt(e),
    lanternRank: Et(e),
    survival: { ...ct(e), causes: ut(e) },
    tiers: { byRv: lt(e) },
    lead: dt(e),
    daily: [...a.values()].map((o) => ({ day: o.day, runs: o.runs, players: o.players.size, tainted: o.tainted })),
    ghosts: _t(e),
    recent: r.recent
  };
}
const W = 864e5, Ot = 30, Dt = (t, r) => Date.parse(`${$(r - (t - 1) * W)}T00:00:00+07:00`);
function Tt(t) {
  const r = t.at;
  if (typeof r != "number" || !Number.isFinite(r)) return null;
  let e = {};
  try {
    const p = JSON.parse(String(t.detail ?? "{}"));
    p && typeof p == "object" && !Array.isArray(p) && (e = p);
  } catch {
  }
  const { route: s, rv: a, sv: u, alt: n, dist: o, dur: l, score: i, crash: c, tainted: d } = t, m = ot({ ...e, route: s, rv: a, sv: u, alt: n, dist: o, dur: l, score: i, crash: c, tainted: d });
  if (typeof m == "string") return null;
  const M = typeof t.pk == "string" ? t.pk.replace(/[^a-z0-9]/g, "").slice(0, 16) : "", h = `${t.ch === "dev" ? "Dev" : "Khách"} ${M.slice(0, 4) || "?"}`;
  return { ...m, at: r, day: $(r), pid: M, name: h, alt: m.alt ? 1 : 0, tainted: m.tainted ? 1 : 0 };
}
function qt(t, r, e) {
  const s = $(e), a = $(e - (r - 1) * W), u = [];
  for (const o of t) {
    const l = Tt(o);
    l && l.day >= a && l.day <= s && u.push(l);
  }
  const n = u.slice(0, Ot).map((o) => ({ name: o.name, dist: o.dist, score: o.score, crash: o.crash, at: o.at, tainted: o.tainted === 1 }));
  return zt(u, { days: r, from: a, to: s, now: e, recent: n });
}
export {
  Dt as sinceMs,
  qt as statsFromRows,
  Tt as toRawRun
};
