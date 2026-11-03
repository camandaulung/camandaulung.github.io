const Z = /^\d{4}-\d{2}-\d{2}\.(v|hg)\d{1,3}$/, T = (t) => new Date(t + 252e5).toISOString().slice(0, 10);
const G = /* @__PURE__ */ new Set(["route", "rv", "sv", "alt", "dist", "dur", "score", "crash", "tainted"]), K = /^[A-Za-z][A-Za-z0-9_]{0,31}$/, C = /^[a-z][a-z-]{0,15}$/, O = (t) => typeof t == "number" && Number.isFinite(t), v = (t, n, e) => Math.min(e, Math.max(n, t)), N = (t) => O(t) ? v(Math.round(t), 1, 9999) : 1;
function x(t, n) {
  if (t === null || typeof t == "boolean") return t;
  if (typeof t == "number") return Number.isFinite(t) ? v(Math.round(t * 1e3) / 1e3, -1e9, 1e9) : null;
  if (typeof t == "string") return t.replace(/[\u0000-\u001f<>]/g, "").slice(0, 64);
  if (typeof t != "object" || n >= 4) return null;
  if (Array.isArray(t)) return t.slice(0, 32).map((o) => x(o, n + 1));
  const e = {};
  let r = 0;
  for (const [o, c] of Object.entries(t))
    n === 0 && G.has(o) || !K.test(o) || ++r > 48 || (e[o] = x(c, n + 1));
  return e;
}
function U(t) {
  const n = typeof t.route == "string" ? t.route : "";
  if (!Z.test(n)) return "route";
  if (!O(t.dist) || !O(t.dur) || !O(t.score)) return "fields";
  const e = v(Math.round(t.dist * 10) / 10, 0, 1e6), r = v(Math.round(t.dur * 100) / 100, 0, 36e3), o = t.tainted === !0 || e > r * 110 + 50;
  return {
    route: n,
    rv: N(t.rv),
    sv: N(t.sv),
    alt: t.alt === !0,
    dist: e,
    dur: r,
    score: v(Math.round(t.score), 0, 1e9),
    crash: typeof t.crash == "string" && C.test(t.crash) ? t.crash : null,
    tainted: o,
    detail: JSON.stringify(x(t, 0))
  };
}
const m = (t) => t && typeof t == "object" && !Array.isArray(t) ? t : {}, E = (t) => typeof t == "number" && Number.isFinite(t) ? t : null, S = (t) => E(t) ?? 0, w = (t) => typeof t == "string" && t ? t : null, j = (t) => Object.values(m(t)).reduce((n, e) => n + Math.max(0, S(e)), 0), M = (t, n = 4) => Math.round(t * 10 ** n) / 10 ** n, y = (t, n, e = 4) => n > 0 ? M(t / n, e) : null;
function X(t, n) {
  const e = Math.min(t.length, n.length);
  if (e < 3) return null;
  let r = 0, o = 0;
  for (let i = 0; i < e; i++)
    r += t[i], o += n[i];
  r /= e, o /= e;
  let c = 0, s = 0, a = 0;
  for (let i = 0; i < e; i++) {
    const l = t[i] - r, d = n[i] - o;
    c += l * d, s += l * l, a += d * d;
  }
  return s > 0 && a > 0 ? M(c / Math.sqrt(s * a), 3) : null;
}
function $(t) {
  if (!t.length) return null;
  const n = [...t].sort((r, o) => r - o), e = n.length >> 1;
  return M(n.length % 2 ? n[e] : (n[e - 1] + n[e]) / 2, 3);
}
function _(t, n, e = 12) {
  let r = t.indexOf(n);
  return r < 0 && t.length < e && (r = t.push(n) - 1), r;
}
const b = 500, Y = 3e4, A = ["low", "zero", "high", "thermal"], z = Array.from({ length: 13 }, (t, n) => M(n * 0.1, 1)), F = (t) => {
  const n = /* @__PURE__ */ new Map();
  for (const e of t) {
    const r = n.get(e.rv);
    r ? r.push(e) : n.set(e.rv, [e]);
  }
  return [...n].sort((e, r) => e[0] - r[0]);
};
function H(t) {
  const n = t.reduce((r, o) => Math.max(r, o.dist), 0), e = Math.min(Y, Math.ceil(n / b) * b) / b + 1;
  return {
    step: b,
    byRv: F(t).map(([r, o]) => {
      const c = new Array(e).fill(0);
      for (const s of o) c[Math.min(e - 1, Math.floor(s.dist / b))]++;
      for (let s = e - 2; s >= 0; s--) c[s] += c[s + 1];
      return { rv: r, runs: o.length, alive: c.map((s) => M(s / o.length)) };
    })
  };
}
function J(t) {
  const n = [], e = ["gorge", "mouth", "valley", "village", "rim", "dive", "river", "cave", "climb", "gate"], r = [...A], o = [], c = [];
  let s = 0;
  const a = (u, h, g) => {
    const p = u[h] ??= [];
    p[g] = (p[g] ?? 0) + 1;
  };
  for (const u of t) {
    if (!u.crash) continue;
    const h = _(n, u.crash), g = m(u.d.death), p = w(g.zone), R = w(g.tier);
    if (h < 0 || !p && !R) {
      s++;
      continue;
    }
    p && a(o, h, _(e, p)), R && a(c, h, _(r, R));
  }
  const i = (u, h) => n.map((g, p) => Array.from({ length: h }, (R, P) => u[p]?.[P] ?? 0)), l = i(o, e.length), d = i(c, r.length), f = n.map((u, h) => h).sort((u, h) => D(l[h]) + D(d[h]) - D(l[u]) - D(d[u]));
  return {
    kinds: f.map((u) => n[u]),
    zones: e,
    tiers: r,
    byZone: f.map((u) => l[u]),
    byTier: f.map((u) => d[u]),
    noDetail: s
  };
}
const D = (t) => t.reduce((n, e) => n + e, 0);
function B(t) {
  return F(t).map(([n, e]) => {
    const r = Object.fromEntries(A.map((l) => [l, 0]));
    let o = 0, c = 0, s = !1, a = 0;
    for (const l of e) {
      const d = m(l.d.tiers);
      for (const u of A) r[u] += Math.max(0, S(d[u]));
      o += Math.max(0, S(l.d.bridgesFromLow));
      const f = E(l.d.bridges);
      f !== null && (s = !0, c += Math.max(0, f)), a += l.dist / 1e3;
    }
    const i = j(r);
    return {
      rv: n,
      runs: e.length,
      seconds: Object.fromEntries(A.map((l) => [l, M(r[l], 1)])),
      share: Object.fromEntries(A.map((l) => [l, y(r[l], i)])),
      bridgesFromLow: o,
      bridges: s ? c : null,
      freeShare: s ? y(o, c) : null,
      fromLowPerKm: y(o, a, 3)
    };
  });
}
function q(t) {
  const n = (r, o) => {
    const c = [...o], s = [];
    for (const a of t) {
      const i = m(a.d.lead), l = E(i.p10), d = r(a);
      if (!d || l === null || S(i.n) <= 0) continue;
      const f = _(c, d, 8);
      f >= 0 && (s[f] ??= []).push(l);
    }
    return c.map((a, i) => {
      const l = s[i] ?? [], d = new Array(z.length).fill(0);
      for (const f of l) d[Math.max(0, Math.min(z.length - 1, Math.floor(f * 10 + 1e-9)))]++;
      return { key: a, n: l.length, counts: d, median: $(l) };
    }).filter((a) => a.n > 0);
  }, e = (r) => m(r.d.device);
  return {
    edges: z,
    byTier: n((r) => w(e(r).tier), ["high", "mid", "low"]),
    byInput: n((r) => w(e(r).input), ["touch", "key", "mixed"])
  };
}
const k = ["meters", "lantern", "nearMiss", "gust"], Q = 864e5, W = 200, L = (t, n) => {
  const e = /* @__PURE__ */ new Map();
  for (const r of t) {
    const o = n(r), c = e.get(o);
    c ? c.push(r) : e.set(o, [r]);
  }
  return e;
}, I = (t) => [...t].sort((n, e) => n[0] - e[0]);
function tt(t) {
  const n = I(L(t.filter((e) => k.some((r) => E(m(e.d.parts)[r]) !== null)), (e) => e.sv));
  return {
    target: [0.25, 0.35],
    bySv: n.map(([e, r]) => {
      const o = Object.fromEntries(k.map((s) => [s, r.reduce((a, i) => a + Math.max(0, S(m(i.d.parts)[s])), 0)])), c = j(o);
      return {
        sv: e,
        runs: r.length,
        avgScore: Math.round(r.reduce((s, a) => s + a.score, 0) / r.length),
        parts: Object.fromEntries(k.map((s) => [s, Math.round(o[s])])),
        share: Object.fromEntries(k.map((s) => [s, y(o[s], c)]))
      };
    })
  };
}
function et(t) {
  return {
    target: 0.4,
    bySv: I(L(t, (n) => n.sv)).map(([n, e]) => {
      const r = /* @__PURE__ */ new Map();
      for (const s of e) {
        const a = r.get(s.pid);
        (!a || s.score > a.score || s.score === a.score && s.at < a.at) && r.set(s.pid, s);
      }
      const o = [...r.values()].sort((s, a) => a.score - s.score || s.at - a.at).map((s, a) => {
        const i = m(s.d.lanterns);
        return { name: s.name, score: s.score, dist: Math.round(s.dist), rank: a + 1, pick: y(j(i.taken), j(i.spawned), 3) };
      }), c = o.filter((s) => s.pick !== null);
      return { sv: n, n: o.length, pearson: X(c.map((s) => s.pick), c.map((s) => -s.rank)), players: o.slice(0, W) };
    })
  };
}
function nt(t) {
  const n = (s, a) => {
    const i = a.filter((f) => f.crash).length, l = a.reduce((f, u) => f + u.dist / 1e3, 0), d = a.filter((f) => f.crash && m(f.d.ghosts).deathNear === !0).length;
    return { key: s, runs: a.length, deaths: i, km: M(l, 1), perKm: y(i, l, 3), medianDist: $(a.map((f) => f.dist)), nearShare: y(d, i, 3) };
  }, e = t.filter((s) => E(m(s.d.ghosts).shown) !== null), r = (s) => S(m(s.d.ghosts).shown) > 0, o = (s) => m(s.d.ghosts).deathNear === !0, c = L(t, (s) => w(m(s.d.prefs).ghosts));
  return {
    groups: [
      n("near", e.filter((s) => r(s) && o(s))),
      n("far", e.filter((s) => r(s) && !o(s))),
      n("none", e.filter((s) => !r(s)))
    ],
    bySetting: ["on", "dim", "off"].map((s) => n(s, c.get(s) ?? []))
  };
}
function st(t, n) {
  const e = [];
  for (let r = Date.parse(`${t}T00:00:00Z`), o = Date.parse(`${n}T00:00:00Z`); r <= o; r += Q)
    e.push(new Date(r).toISOString().slice(0, 10));
  return e;
}
function rt(t, n) {
  const e = [], r = new Map(st(n.from, n.to).map((c) => [c, { day: c, runs: 0, players: /* @__PURE__ */ new Set(), tainted: 0 }]));
  let o = 0;
  for (const { detail: c, tainted: s, ...a } of t) {
    const i = r.get(a.day);
    if (s) {
      o++, i && i.tainted++;
      continue;
    }
    let l = {};
    try {
      l = m(JSON.parse(c));
    } catch {
    }
    e.push({ ...a, d: l }), i && (i.runs++, i.players.add(a.pid));
  }
  return {
    days: n.days,
    from: n.from,
    to: n.to,
    at: n.now,
    runs: t.length,
    used: e.length,
    tainted: o,
    players: new Set(e.map((c) => c.pid)).size,
    altRuns: e.filter((c) => c.alt).length,
    score: tt(e),
    lanternRank: et(e),
    survival: { ...H(e), causes: J(e) },
    tiers: { byRv: B(e) },
    lead: q(e),
    daily: [...r.values()].map((c) => ({ day: c.day, runs: c.runs, players: c.players.size, tainted: c.tainted })),
    ghosts: nt(e),
    recent: n.recent
  };
}
const V = 864e5, ot = 30, ct = (t, n) => Date.parse(`${T(n - (t - 1) * V)}T00:00:00+07:00`);
function at(t) {
  const n = t.at;
  if (typeof n != "number" || !Number.isFinite(n)) return null;
  let e = {};
  try {
    const p = JSON.parse(String(t.detail ?? "{}"));
    p && typeof p == "object" && !Array.isArray(p) && (e = p);
  } catch {
  }
  const { route: r, rv: o, sv: c, alt: s, dist: a, dur: i, score: l, crash: d, tainted: f } = t, u = U({ ...e, route: r, rv: o, sv: c, alt: s, dist: a, dur: i, score: l, crash: d, tainted: f });
  if (typeof u == "string") return null;
  const h = typeof t.pk == "string" ? t.pk.replace(/[^a-z0-9]/g, "").slice(0, 16) : "", g = `${t.ch === "dev" ? "Dev" : "Khách"} ${h.slice(0, 4) || "?"}`;
  return { ...u, at: n, day: T(n), pid: h, name: g, alt: u.alt ? 1 : 0, tainted: u.tainted ? 1 : 0 };
}
function it(t, n, e) {
  const r = T(e), o = T(e - (n - 1) * V), c = [];
  for (const a of t) {
    const i = at(a);
    i && i.day >= o && i.day <= r && c.push(i);
  }
  const s = c.slice(0, ot).map((a) => ({ name: a.name, dist: a.dist, score: a.score, crash: a.crash, at: a.at, tainted: a.tainted === 1 }));
  return rt(c, { days: n, from: o, to: r, now: e, recent: s });
}
export {
  ct as sinceMs,
  it as statsFromRows,
  at as toRawRun
};
