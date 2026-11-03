// Biểu đồ SVG vẽ tay cho /dash (không thư viện, không CDN — trang nằm sau SSO, đừng kéo mã ngoài vào). Mọi hàm nhận
// `width` đo từ khung thật rồi trả chuỗi SVG: đặt viewBox cố định rồi co theo màn thì chữ trục ở 375 px còn ~7 px.
// Mọi chuỗi từ dữ liệu (tên SSO) đi qua `esc` — server đã lọc `< >` nhưng trang không dựa vào đó.

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
export const fmt = (v, d = 0) => (v == null ? '—' : Number(v).toLocaleString('vi-VN', { minimumFractionDigits: d, maximumFractionDigits: d }));
export const pct = (v, d = 0) => (v == null ? '—' : `${fmt(v * 100, d)}%`);
export const SERIES = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)'];

const svg = (w, h, label, body) =>
  `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(label)}">${body}</svg>`;
const tipAttr = (t) => (t ? ` data-tip="${esc(t)}"` : '');

/** Thanh 100% chồng, nằm ngang, mỗi dòng một nhóm. `band` [lo, hi] = vùng đích trên trục 0–100% (đọc theo đoạn
 *  ĐẦU TIÊN của thanh — nên đặt đại lượng cần so đích ở đầu). */
export function stackBars({ width, rows, band, label }) {
  const pw = width - 8;
  const rowH = 48;
  const top = band ? 20 : 4;
  const h = top + rows.length * rowH + 22;
  let b = '';
  if (band) b += `<text class="band-label" x="${((band[0] + band[1]) / 2) * pw}" y="${top - 6}" text-anchor="middle">đích</text>`;
  rows.forEach((row, i) => {
    const y = top + i * rowH;
    // Vùng đích chỉ quanh THANH, không trùm dòng nhãn phía trên (trùm thì nhãn nằm trong một ô mờ, đọc như lỗi vẽ).
    if (band) b += `<rect class="band" x="${band[0] * pw}" y="${y + 18}" width="${(band[1] - band[0]) * pw}" height="26" rx="4"/>`;
    b += `<text class="lbl" x="0" y="${y + 14}">${esc(row.label)}</text>`;
    let x = 0;
    for (const p of row.parts) {
      const w = Math.max(0, (p.value ?? 0) * pw);
      if (w < 1) continue;
      // Khe 2 px màu nền giữa các đoạn — tách đoạn bằng khoảng trống, không kẻ viền.
      const gw = Math.max(1, w - 2);
      b += `<rect x="${x}" y="${y + 20}" width="${gw}" height="22" rx="3" fill="${p.color}"${tipAttr(p.tip)}/>`;
      if (gw > 46) b += `<text class="in" x="${x + gw / 2}" y="${y + 35}" text-anchor="middle">${pct(p.value)}</text>`;
      x += w;
    }
  });
  const ay = top + rows.length * rowH + 2;
  for (const t of [0, 0.25, 0.5, 0.75, 1]) {
    b += `<text class="tick" x="${t * pw}" y="${ay + 14}" text-anchor="${t === 0 ? 'start' : t === 1 ? 'end' : 'middle'}">${pct(t)}</text>`;
  }
  return svg(width, h, label, b);
}

/** Lưới ngang + nhãn trục y (trục y luôn từ 0). */
function yGrid(P, pw, ph, max, f) {
  let b = '';
  for (const t of [0, 0.5, 1]) {
    const y = P.t + ph - t * ph;
    b += `<line class="${t ? 'gridline' : 'axis'}" x1="${P.l}" x2="${P.l + pw}" y1="${y}" y2="${y}"/>`;
    b += `<text class="tick" x="${P.l - 6}" y="${y + 4}" text-anchor="end">${f(t * max)}</text>`;
  }
  return b;
}
/** Nhãn trục x thưa đủ để không chồng (~1 nhãn mỗi 56 px). */
function xTicks(P, ph, n, at, text) {
  const every = Math.max(1, Math.ceil(n / Math.max(2, Math.floor((at(n - 1) - at(0)) / 56))));
  let b = '';
  for (let i = 0; i < n; i += every) b += `<text class="tick" x="${at(i)}" y="${P.t + ph + 16}" text-anchor="middle">${esc(text(i))}</text>`;
  return b;
}

/** Đường (y từ 0 tới yMax) trên trục x chung `xs`. Dải trong suốt mỗi mốc x = vùng rê: tip ghi mọi dãy tại mốc đó.
 *  Giá trị null = đứt đường (ô không có số), không kéo về 0 — kéo về 0 là vẽ ra một cú rơi không có thật. */
export function lines({ width, height = 220, xs, series, xFmt, yFmt, yMax = 1, label }) {
  const P = { l: 44, r: 10, t: 10, b: 28 };
  const pw = width - P.l - P.r;
  const ph = height - P.t - P.b;
  const n = xs.length;
  const X = (i) => P.l + (n > 1 ? (i / (n - 1)) * pw : pw / 2);
  const Y = (v) => P.t + ph - (Math.min(v, yMax) / yMax) * ph;
  let b = yGrid(P, pw, ph, yMax, yFmt) + xTicks(P, ph, n, X, (i) => xFmt(xs[i]));
  series.forEach((s) => {
    let pen = 'M';
    const d = s.values.map((v, i) => {
      if (v == null) {
        pen = 'M';
        return '';
      }
      const seg = `${pen}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`;
      pen = 'L';
      return seg;
    }).join('');
    b += `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linejoin="round"/>`;
    // Chấm ở điểm lẻ (hai bên đều null) — đoạn một điểm không có nét nào để thấy.
    s.values.forEach((v, i) => v != null && s.values[i - 1] == null && s.values[i + 1] == null
      && (b += `<circle cx="${X(i).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="3" fill="${s.color}"/>`));
  });
  const step = n > 1 ? pw / (n - 1) : pw;
  for (let i = 0; i < n; i++) {
    const tip = `${xFmt(xs[i])}\n${series.map((s) => `${s.name}: ${yFmt(s.values[i])}`).join('\n')}`;
    b += `<rect class="hit" x="${X(i) - step / 2}" y="${P.t}" width="${step}" height="${ph}"${tipAttr(tip)}/>`;
  }
  return svg(width, height, label, b);
}

/** Chấm: x = hạng (1 bên trái), y = tỉ lệ 0–1. Vòng đệm 2 px màu nền quanh chấm chồng nhau; vùng rê bán kính 11. */
export function scatter({ width, height = 220, points, xMax, xLabel, yFmt, label }) {
  const P = { l: 44, r: 12, t: 10, b: 34 };
  const pw = width - P.l - P.r;
  const ph = height - P.t - P.b;
  const X = (x) => P.l + (xMax > 1 ? ((x - 1) / (xMax - 1)) * pw : pw / 2);
  const Y = (v) => P.t + ph - Math.min(1, v) * ph;
  let b = yGrid(P, pw, ph, 1, yFmt);
  for (const x of [1, Math.round((xMax + 1) / 2), xMax]) b += `<text class="tick" x="${X(x)}" y="${P.t + ph + 16}" text-anchor="middle">${x}</text>`;
  b += `<text class="tick" x="${P.l + pw / 2}" y="${P.t + ph + 31}" text-anchor="middle">${esc(xLabel)}</text>`;
  for (const p of points) b += `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="4.5" fill="var(--s1)" stroke="var(--card)" stroke-width="2"/>`;
  for (const p of points) b += `<circle class="hit" cx="${X(p.x)}" cy="${Y(p.y)}" r="11"${tipAttr(p.tip)}/>`;
  return svg(width, height, label, b);
}

/** Cột đứng một dãy (histogram, đếm theo ngày). `marker` = { at: vị trí theo ô (có phần lẻ), text } — vạch mốc vàng;
 *  `markers` = nhiều vạch (P25/50/75/95), nhãn so le hai hàng để hai mốc sát nhau không đè chữ. `yFmt` = chữ trục y. */
export function columns({ width, height = 150, values, xText, marker, markers, yFmt = (v) => fmt(v), color = 'var(--s1)', label }) {
  const ms = markers ?? (marker ? [marker] : []);
  const P = { l: 36, r: 8, t: ms.length > 1 ? 30 : ms.length ? 18 : 8, b: 24 };
  const pw = width - P.l - P.r;
  const ph = height - P.t - P.b;
  const n = values.length;
  const slot = pw / Math.max(1, n);
  const max = Math.max(1, ...values.map((v) => v.value));
  let b = yGrid(P, pw, ph, max, yFmt);
  values.forEach((v, i) => {
    const hgt = (v.value / max) * ph;
    if (hgt > 0) b += `<rect x="${P.l + i * slot + 1}" y="${P.t + ph - hgt}" width="${Math.max(1, slot - 2)}" height="${hgt}" rx="2" fill="${color}"/>`;
    b += `<rect class="hit" x="${P.l + i * slot}" y="${P.t}" width="${slot}" height="${ph}"${tipAttr(v.tip)}/>`;
  });
  b += xTicks(P, ph, n, (i) => P.l + (i + 0.5) * slot, xText);
  ms.forEach((m, k) => {
    const x = P.l + m.at * slot;
    const y = P.t - 6 - (ms.length > 1 && k % 2 ? 12 : 0);
    b += `<line class="marker" x1="${x}" x2="${x}" y1="${y + 2}" y2="${P.t + ph}"/>`;
    b += `<text class="marker-label" x="${x + 4}" y="${y}">${esc(m.text)}</text>`;
  });
  return svg(width, height, label, b);
}

/** Thanh ngang một dãy, nhãn trên thanh, số ở đầu thanh (ngoài thanh — số nằm trong thanh ngắn thì bị cắt). */
export function hbars({ width, rows, f, label }) {
  const rowH = 44;
  const pw = width - 64;
  const max = Math.max(1e-9, ...rows.map((r) => r.value ?? 0));
  let b = '';
  rows.forEach((r, i) => {
    const y = i * rowH;
    const w = r.value == null ? 0 : Math.max(2, (r.value / max) * pw);
    b += `<text class="lbl" x="0" y="${y + 14}">${esc(r.label)}</text>`;
    b += `<rect x="0" y="${y + 20}" width="${w}" height="18" rx="3" fill="${r.color ?? 'var(--s1)'}"${tipAttr(r.tip)}/>`;
    b += `<text class="val" x="${w + 6}" y="${y + 33}">${r.value == null ? 'chưa có' : f(r.value)}</text>`;
  });
  return svg(width, rows.length * rowH + 4, label, b);
}

/** Một tooltip dùng chung: rê chuột / chạm vào phần tử có `data-tip`. Chỉ là lớp phụ — số nào cũng có trong bảng. */
export function initTips(root) {
  const tip = document.createElement('div');
  tip.className = 'tip';
  tip.hidden = true;
  document.body.append(tip);
  const show = (e) => {
    const el = e.target.closest?.('[data-tip]');
    if (!el || !root.contains(el)) return void (tip.hidden = true);
    tip.textContent = el.getAttribute('data-tip');
    tip.hidden = false;
    const r = tip.getBoundingClientRect();
    tip.style.left = `${Math.max(8, Math.min(innerWidth - r.width - 8, e.clientX + 12))}px`;
    tip.style.top = `${Math.max(8, Math.min(innerHeight - r.height - 8, e.clientY + 14))}px`;
  };
  root.addEventListener('pointermove', show);
  root.addEventListener('pointerdown', show);
  root.addEventListener('pointerleave', () => (tip.hidden = true));
  addEventListener('scroll', () => (tip.hidden = true), { passive: true });
}
