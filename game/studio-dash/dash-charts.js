// Một hàm vẽ SVG viết tay (không thư viện, giống toy-dash) cho mọi biểu đồ theo năm: đường (đứt quãng khi thiếu số),
// dải p10–p90, cột chồng, ô mục tiêu, vạch ngưỡng. MỘT trục y — hai đại lượng khác đơn vị thì tách hai biểu đồ.
// spec = { x: nhãn[], h, y: {min, max, log?, fmt}, bands?, stacks?, lines?, refs?, boxes?, title(i), rows(i) }
const NS = 'http://www.w3.org/2000/svg';
const M = { l: 74, r: 92, t: 12, b: 28 };   // trái đủ chỗ cho "100.000 tỷ"

function nice(x) { const p = 10 ** Math.floor(Math.log10(x)); const f = x / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p; }

function yScale(o, top, ih) {
  if (o.log) {
    const lo = Math.log10(o.min), hi = Math.log10(o.max);
    const ticks = [];
    for (let p = Math.ceil(lo); p <= Math.floor(hi); p++) ticks.push(10 ** p);
    return { y: v => top + ih * (1 - (Math.log10(Math.max(v, o.min)) - lo) / (hi - lo)), ticks };
  }
  const step = nice((o.max - o.min) / 4 || 1), ticks = [];
  for (let v = Math.ceil(o.min / step) * step; v <= o.max + step * 1e-6; v += step) ticks.push(+v.toFixed(9));
  return { y: v => top + ih * (1 - (Math.min(Math.max(v, o.min), o.max) - o.min) / (o.max - o.min || 1)), ticks };
}

// Các đoạn liền của một dãy (null = studio đã chết hết / chưa có số): đường và dải không được nối qua chỗ trống.
function runs(n, ok) {
  const out = []; let cur = null;
  for (let i = 0; i < n; i++) { if (ok(i)) (cur ??= []).push(i); else if (cur) { out.push(cur); cur = null; } }
  if (cur) out.push(cur);
  return out;
}

export function draw(host, s, tip) {
  host.replaceChildren();
  const n = s.x.length;
  if (!n) return;
  const labelled = (s.lines ?? []).some((l) => l.short);
  const m = { ...M, r: labelled ? M.r : 18 };
  const w = Math.max(host.clientWidth, 300), h = s.h ?? 260;
  const iw = w - m.l - m.r, ih = h - m.t - m.b, band = iw / n;
  const x = (i) => m.l + band * (i + 0.5);
  const { y, ticks } = yScale(s.y, m.t, ih);
  const fmt = s.y.fmt ?? String;
  let g = '';
  // Ô mục tiêu trải từ cột i tới cột i1 (cùng một dải nhiều năm = MỘT ô, không phải hàng rào ô lẻ).
  for (const b of s.boxes ?? []) {
    const top = y(b.y1), bot = y(b.y0), left = x(b.i) - band / 2 + 1, right = x(b.i1 ?? b.i) + band / 2 - 1;
    g += `<rect x="${left.toFixed(1)}" y="${top.toFixed(1)}" width="${Math.max(right - left, 2).toFixed(1)}" height="${Math.max(bot - top, 2).toFixed(1)}" fill="var(--target)" stroke="var(--axis)" stroke-width="1"/>`;
  }
  ticks.forEach((t, k) => {
    g += `<line x1="${m.l}" x2="${w - m.r}" y1="${y(t).toFixed(1)}" y2="${y(t).toFixed(1)}" stroke="${k || s.y.log ? 'var(--grid)' : 'var(--axis)'}" stroke-width="1"/>` +
      `<text x="${m.l - 8}" y="${(y(t) + 4).toFixed(1)}" text-anchor="end">${fmt(t)}</text>`;
  });
  const every = Math.ceil(n / Math.max(1, Math.floor(iw / 46)));
  s.x.forEach((lab, i) => { if (i % every === 0) g += `<text x="${x(i).toFixed(1)}" y="${h - 8}" text-anchor="middle">${lab}</text>`; });
  for (const b of s.bands ?? []) {
    for (const seg of runs(n, (i) => b.lo[i] != null && b.hi[i] != null)) {
      const up = seg.map((i) => `${x(i).toFixed(1)} ${y(b.hi[i]).toFixed(1)}`), down = [...seg].reverse().map((i) => `${x(i).toFixed(1)} ${y(b.lo[i]).toFixed(1)}`);
      g += `<path d="M${up.join('L')}L${down.join('L')}Z" fill="${b.color}" fill-opacity=".16"/>`;
    }
  }
  if (s.stacks) {
    const bw = Math.min(band * 0.72, 24);
    for (let i = 0; i < n; i++) {
      let acc = 0;
      for (const st of s.stacks) {
        const v = st.values[i];
        if (!v) continue;
        const top = y(acc + v), hgt = Math.max(y(acc) - top - 2, 1);   // 2 px khe nền giữa các đoạn, không viền
        g += `<rect x="${(x(i) - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${hgt.toFixed(1)}" rx="2" fill="${st.color}"/>`;
        acc += v;
      }
    }
  }
  for (const r of s.refs ?? []) {
    g += `<line x1="${m.l}" x2="${w - m.r}" y1="${y(r.y).toFixed(1)}" y2="${y(r.y).toFixed(1)}" stroke="var(--flag)" stroke-width="1.5" stroke-dasharray="5 4"/>` +
      `<text class="lbl" x="${m.l + 6}" y="${(y(r.y) - 5).toFixed(1)}">${r.label}</text>`;
  }
  const ends = [];
  for (const l of s.lines ?? []) {
    for (const seg of runs(n, (i) => l.values[i] != null)) {
      const d = seg.map((i, k) => `${k ? 'L' : 'M'}${x(i).toFixed(1)} ${y(l.values[i]).toFixed(1)}`).join('');
      g += `<path d="${d}" fill="none" stroke="${l.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"${l.dash ? ' stroke-dasharray="6 4"' : ''}/>`;
      if (seg.length === 1) g += `<circle cx="${x(seg[0]).toFixed(1)}" cy="${y(l.values[seg[0]]).toFixed(1)}" r="4" fill="${l.color}" stroke="var(--surface)" stroke-width="2"/>`;
    }
    const last = [...l.values.keys()].reverse().find((i) => l.values[i] != null);
    if (l.short && last != null) ends.push({ l, y: y(l.values[last]) });
  }
  // Nhãn trực tiếp ở mép phải, đẩy nhau ra ≥ 14 px để hai đường sát nhau không đè chữ.
  ends.sort((a, b) => a.y - b.y);
  ends.forEach((e, i) => { if (i && e.y - ends[i - 1].y < 14) e.y = ends[i - 1].y + 14; });
  for (const e of ends) g += `<text class="lbl" x="${w - m.r + 8}" y="${(e.y + 4).toFixed(1)}">${e.l.short}</text>`;
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('role', 'img');
  if (s.label) svg.setAttribute('aria-label', s.label);
  svg.innerHTML = g + `<g class="hover" visibility="hidden"><line y1="${m.t}" y2="${h - m.b}" stroke="var(--axis)" stroke-width="1"/></g>`;
  host.appendChild(svg);
  hover(svg, s, tip, { m, w, h, n, band, x, y });
}

// Rê/chạm theo CỘT năm (vùng bắt rộng hơn nét): vạch dọc + chấm trên từng đường + tooltip do spec.rows(i) dựng.
function hover(svg, s, tip, f) {
  const layer = svg.querySelector('.hover'), cross = layer.querySelector('line');
  const dots = (s.lines ?? []).map((l) => {
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('r', '4.5'); c.setAttribute('fill', l.color); c.setAttribute('stroke', 'var(--surface)'); c.setAttribute('stroke-width', '2');
    layer.appendChild(c);
    return c;
  });
  const move = (e) => {
    const box = svg.getBoundingClientRect();
    const px = ((e.clientX - box.left) / box.width) * f.w;
    const i = Math.floor((px - f.m.l) / f.band);
    if (i < 0 || i >= f.n) { leave(); return; }
    cross.setAttribute('x1', f.x(i)); cross.setAttribute('x2', f.x(i));
    (s.lines ?? []).forEach((l, k) => {
      const v = l.values[i];
      dots[k].setAttribute('visibility', v == null ? 'hidden' : 'visible');
      if (v != null) { dots[k].setAttribute('cx', f.x(i)); dots[k].setAttribute('cy', f.y(v)); }
    });
    layer.setAttribute('visibility', 'visible');
    tip.innerHTML = `<b>${s.title(i)}</b>` + s.rows(i).map(([k, v]) => `<div class="r"><span>${k}</span><span>${v}</span></div>`).join('');
    tip.hidden = false;
    tip.style.left = Math.max(8, Math.min(e.clientX + 14, innerWidth - tip.offsetWidth - 8)) + 'px';
    tip.style.top = Math.min(e.clientY + 14, innerHeight - tip.offsetHeight - 8) + 'px';
  };
  const leave = () => { layer.setAttribute('visibility', 'hidden'); tip.hidden = true; };
  svg.addEventListener('pointermove', move);
  svg.addEventListener('pointerdown', move);
  svg.addEventListener('pointerleave', leave);
}
