// Mảnh HTML dùng chung của /dash: thẻ câu hỏi, ô trống, chú giải, bảng (bản bảng của mỗi biểu đồ — tooltip chỉ là
// lớp phụ, số nào cũng phải đọc được không cần rê chuột), tên tiếng Việt cho mã trong log.
import { SERIES, esc, fmt } from './dash-svg.js';

/** Màu theo `rv` — cố định theo luật bay, không theo thứ tự đang hiện (lọc bớt luật thì màu không đổi chủ). Hà Giang
 *  (rv 1000 + n) lệch một nấc, Mù Cang Chải (2000 + n) vào ô còn trống — SERIES 4 màu: ?alt ô 1, v3 ô 2, hg3 ô 0, mc1 ô 3.
 *  Hết ô: Fansipan fp1 chung ô 1 với ?alt (luật thử chưa bật chung, hiếm khi cùng khoảng ngày). */
export const rvColor = (rv) => SERIES[(rv >= 3000 ? rv - 3000 : rv >= 2000 ? rv - 1998 : rv >= 1000 ? rv - 999 : rv - 1) % SERIES.length];
/** rv = map + phiên bản route (src/world/maps.ts logRvBase): 2 = ván thử `?alt`, 1000 + n = Hà Giang `.hgN`,
 *  2000 + n = Mù Cang Chải `.mcN`, 3000 + n = Fansipan `.fpN`. */
export const rvName = (rv) => (rv === 2 ? 'Luật thử ?alt' : rv >= 3000 ? `Fansipan fp${rv - 3000}` : rv >= 2000 ? `Mù Cang Chải mc${rv - 2000}` : rv >= 1000 ? `Hà Giang hg${rv - 1000}` : `Khau Phạ v${rv}`);
/** Số km giữ đủ chữ số cho mốc tròn 50 m (đoạn 250 m: "2,25 km" chứ không làm tròn thành "2,3 km"); số lẻ thì 1 chữ số. */
const kmNum = (m) => fmt(m / 1000, m % 1000 === 0 ? 0 : m % 100 === 0 ? 1 : m % 50 === 0 ? 2 : 1);
export const meters = (m) => (m == null ? '—' : m >= 1000 ? `${kmNum(m)} km` : `${fmt(m)} m`);
export const segText = (from, seg) => (from + seg <= 1000 ? `${fmt(from)}–${fmt(from + seg)} m` : `${kmNum(from)}–${kmNum(from + seg)} km`);

export const KIND = { pillar: 'Cột đá', spike: 'Mỏm đá', ridge: 'Sống đá', bridge: 'Cầu phướn', overhang: 'Mái đá' };
// Vùng Khau Phạ + Hà Giang (src/world/track-layout.ts RunZone). Log Hà Giang có rv 1000 + n (maps.ts logRvBase); Mù Cang
// Chải 2000 + n, mã vùng thêm tiền tố `mc-` ở server (stat-math.ts `deathZone`) — không thì rơi ở suối Nậm Kim thành "Sông Nho Quế".
// Fansipan 3000 + n → `fp-` (chỉ ba đoạn có hàng: cáp treo, suối, nóc mây).
export const ZONE = {
  gorge: 'Khe', mouth: 'Miệng khe', valley: 'Thung lũng', village: 'Làng',
  rim: 'HG · Gờ Mã Pí Lèng', dive: 'HG · Lao Tu Sản', river: 'HG · Sông Nho Quế', cave: 'HG · Hang', climb: 'HG · Leo cột gió', gate: 'HG · Cổng Trời',
  'mc-valley': 'MCC · Ruộng bậc thang', 'mc-dive': 'MCC · Đổ đèo', 'mc-river': 'MCC · Suối Nậm Kim', 'mc-climb': 'MCC · Đồi Mâm Xôi', 'mc-village': 'MCC · Bản',
  'mc-gate': 'MCC · Dốc đá về đỉnh',
  'fp-gorge': 'FP · Cáp treo giữa hai tầng mây', 'fp-river': 'FP · Suối Mường Hoa', 'fp-valley': 'FP · Biển mây',
};
export const FLIGHT = { low: 'Thấp', zero: 'Tầm 0', high: 'Cao', thermal: 'Luồng nhiệt' };
export const DEVICE = { high: 'Máy mạnh', mid: 'Máy vừa', low: 'Máy yếu' };
export const INPUT = { touch: 'Chạm', key: 'Phím', mixed: 'Chạm + phím' };
export const nameOf = (map, k) => map[k] ?? k;

/** Mỗi câu hỏi một thẻ: tiêu đề = câu hỏi một dòng, viên vàng = đích / mốc để đọc biểu đồ. */
export const card = (title, target, body) =>
  `<section class="card"><h2>${esc(title)}</h2>${target ? `<div class="target">${esc(target)}</div>` : ''}${body}</section>`;
export const empty = (msg = 'Chưa có ván nào trong khoảng ngày này.') => `<p class="empty">${esc(msg)}</p>`;
export const legend = (items) =>
  `<div class="legend">${items.map(([name, color]) => `<span><i style="background:${color}"></i>${esc(name)}</span>`).join('')}</div>`;
export const panelTitle = (t) => `<p class="panel-title">${esc(t)}</p>`;
/** Hàng ô số lớn trong một thẻ: [[giá trị, chú thích], …]. */
export const kpis = (items) => `<div class="kpis">${items.map(([v, t]) => `<div><b>${esc(v)}</b><span>${esc(t)}</span></div>`).join('')}</div>`;
export const note = (html) => `<p class="note">${html}</p>`;

/** Bảng: ô là chuỗi / số (tự thoát), hoặc { v, style } cho ô tô màu. */
export function table(head, rows, cls = '') {
  const cell = (c, tag) => {
    if (c && typeof c === 'object') return `<${tag} class="heat" style="${c.style}">${esc(typeof c.v === 'number' ? fmt(c.v) : c.v)}</${tag}>`;
    return `<${tag}>${esc(typeof c === 'number' ? fmt(c) : c ?? '—')}</${tag}>`;
  };
  return `<div class="scroll"><table class="${cls}"><thead><tr>${head.map((h) => cell(h, 'th')).join('')}</tr></thead>`
    + `<tbody>${rows.map((r) => `<tr>${r.map((c) => cell(c, 'td')).join('')}</tr>`).join('')}</tbody></table></div>`;
}
export const twin = (head, rows) => `<details class="twin"><summary>Bảng số</summary>${table(head, rows)}</details>`;

/** Bảng nhiệt [loại][cột]: một sắc xanh, đậm theo số ván (thang tuần tự — không cầu vồng). */
export function heat(cols, colNames, kinds, m) {
  const max = Math.max(1, ...m.flat());
  const rows = kinds.map((k, i) => {
    const row = m[i] ?? [];
    return [nameOf(KIND, k), ...cols.map((_, c) => {
      const v = row[c] ?? 0;
      return { v, style: v ? `background: rgba(57, 135, 229, ${(0.1 + (0.62 * v) / max).toFixed(2)})` : '' };
    }), row.reduce((s, v) => s + v, 0)];
  });
  return table(['Loại', ...cols.map((c) => nameOf(colNames, c)), 'Tổng'], rows);
}

/** Bề rộng một ô khi chia hai cột (≥ 560 px, khe 18 px) — `grid` đặt đúng số cột đó, không để CSS tự đoán theo màn
 *  (khung tính theo bề rộng THẺ, media query thì theo bề rộng cửa sổ → lệch là SVG tràn ô). */
export const half = (w) => (w >= 560 ? Math.floor((w - 18) / 2) : w);
export const grid = (w, panels) =>
  `<div class="grid2" style="grid-template-columns: repeat(${w >= 560 ? 2 : 1}, minmax(0, 1fr))">${panels.join('')}</div>`;
