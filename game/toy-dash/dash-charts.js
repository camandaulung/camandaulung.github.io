// Hai biểu đồ SVG viết tay (không thư viện): đường theo màn + cột chồng 100% sao. Hover = tooltip theo cột màn (vùng bấm rộng hơn nét).
const NS = 'http://www.w3.org/2000/svg';
const pct = v => (v == null ? '–' : Math.round(v * 100) + '%');
const M = { l: 40, r: 104, t: 12, b: 28 };

function frame(host, levels, h) {
  const w = Math.max(host.clientWidth, 320);
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  const iw = w - M.l - M.r, ih = h - M.t - M.b;
  const band = iw / Math.max(levels.length, 1);
  const x = i => M.l + band * (i + 0.5);
  const y = v => M.t + ih * (1 - v);
  let g = '';
  for (const t of [0, .25, .5, .75, 1]) {
    g += `<line x1="${M.l}" x2="${w - M.r}" y1="${y(t)}" y2="${y(t)}" stroke="${t ? 'var(--grid)' : 'var(--axis)'}" stroke-width="1"/>` +
      `<text x="${M.l - 8}" y="${y(t) + 4}" text-anchor="end">${t * 100}%</text>`;
  }
  const every = levels.length > 22 ? 2 : 1;
  levels.forEach((l, i) => { if (i % every === 0) g += `<text x="${x(i)}" y="${h - 8}" text-anchor="middle">${l.lv}</text>`; });
  return { svg, w, h, iw, ih, band, x, y, g };
}

// Hover theo cột màn: mỗi cột một rect trong suốt phủ cả chiều cao; tooltip dựng bởi `rows(level)`.
function hover(svg, f, levels, tip, rows) {
  levels.forEach((l, i) => {
    const r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', f.x(i) - f.band / 2); r.setAttribute('y', M.t);
    r.setAttribute('width', f.band); r.setAttribute('height', f.ih); r.setAttribute('fill', 'transparent');
    r.addEventListener('mousemove', e => {
      tip.innerHTML = `<b>Màn ${l.lv}</b>` + rows(l).map(([k, v]) => `<div class="r"><span>${k}</span><span>${v}</span></div>`).join('');
      tip.hidden = false;
      tip.style.left = Math.min(e.clientX + 14, innerWidth - tip.offsetWidth - 8) + 'px';
      tip.style.top = e.clientY + 14 + 'px';
    });
    r.addEventListener('mouseleave', () => { tip.hidden = true; });
    svg.appendChild(r);
  });
}

export function drawLines(host, levels, series, tip) {
  host.replaceChildren();
  if (!levels.length) return;
  const f = frame(host, levels, 300);
  let body = f.g;
  const ends = [];
  for (const s of series) {
    const pts = levels.map((l, i) => [f.x(i), s.get(l)]);
    let d = '', pen = false;
    for (const [px, v] of pts) {
      if (v == null) { pen = false; continue; }
      d += `${pen ? 'L' : 'M'}${px.toFixed(1)} ${f.y(v).toFixed(1)}`; pen = true;
    }
    body += `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
    for (const [px, v] of pts) if (v != null) body += `<circle cx="${px.toFixed(1)}" cy="${f.y(v).toFixed(1)}" r="3.5" fill="${s.color}" stroke="var(--surface)" stroke-width="2"/>`;
    const last = [...pts].reverse().find(p => p[1] != null);
    if (last) ends.push({ s, y: f.y(last[1]) });
  }
  // Nhãn trực tiếp ở đầu phải; đẩy nhau ra ≥ 15 px để không đè khi hai đường gần nhau.
  ends.sort((a, b) => a.y - b.y);
  ends.forEach((e, i) => { if (i && e.y - ends[i - 1].y < 15) e.y = ends[i - 1].y + 15; });
  for (const e of ends) body += `<text class="lbl" x="${f.w - M.r + 10}" y="${e.y + 4}">${e.s.short}</text>`;
  f.svg.innerHTML = body;
  hover(f.svg, f, levels, tip, l => series.map(s => [s.name, pct(s.get(l))]).concat([['Lượt hoàn tất', l.finished]]));
  host.appendChild(f.svg);
}

export function drawStars(host, levels, threshold, tip) {
  host.replaceChildren();
  const ls = levels;
  if (!ls.length) return;
  const f = frame(host, ls, 280);
  let body = f.g;
  const bw = Math.min(f.band * 0.62, 34);
  const cols = ['var(--star3)', 'var(--star2)', 'var(--star1)'];       // từ đáy lên: 3★, 2★, 1★
  ls.forEach((l, i) => {
    const n = l.stars[0] + l.stars[1] + l.stars[2];
    if (!n) return;
    let acc = 0;
    [2, 1, 0].forEach((k, j) => {
      const share = l.stars[k] / n;
      if (!share) return;
      const y0 = f.y(acc + share), hgt = Math.max(f.y(acc) - y0 - 2, 1);   // 2 px khe nền giữa các đoạn
      body += `<rect x="${(f.x(i) - bw / 2).toFixed(1)}" y="${y0.toFixed(1)}" width="${bw.toFixed(1)}" height="${hgt.toFixed(1)}" rx="2" fill="${cols[j]}"/>`;
      acc += share;
    });
    if ((l.star3Share ?? 0) >= threshold && n >= 1) body += `<text class="lbl" x="${f.x(i)}" y="${M.t - 2}" text-anchor="middle">▲</text>`;
  });
  body += `<line x1="${M.l}" x2="${f.w - M.r}" y1="${f.y(threshold)}" y2="${f.y(threshold)}" stroke="var(--flag)" stroke-width="1.5" stroke-dasharray="5 4"/>` +
    `<text class="lbl" x="${f.w - M.r + 10}" y="${f.y(threshold) + 4}">ngưỡng ${Math.round(threshold * 100)}%</text>`;
  f.svg.innerHTML = body;
  hover(f.svg, f, ls, tip, l => [['3★', `${l.stars[2]} (${pct(l.star3Share)})`],
    ['2★', l.stars[1]], ['1★', l.stars[0]], ['Trung vị sao', l.starsMedian ?? '–'], ['Lượt thắng', l.wins]]);
  host.appendChild(f.svg);
}
