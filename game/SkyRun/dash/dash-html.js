// Mảnh HTML dùng chung của /dash: thẻ câu hỏi, ô trống, chú giải, bảng (bản bảng của mỗi biểu đồ — tooltip chỉ là
// lớp phụ, số nào cũng phải đọc được không cần rê chuột), tên tiếng Việt cho mã trong log.
import { SERIES, esc, fmt } from './dash-svg.js';

/** Màu theo `rv` — cố định theo luật bay, không theo thứ tự đang hiện (lọc bớt luật thì màu không đổi chủ). */
export const rvColor = (rv) => SERIES[(rv - 1) % SERIES.length];
export const rvName = (rv) => `Luật bay v${rv}`;

export const KIND = { pillar: 'Cột đá', spike: 'Mỏm đá', ridge: 'Sống đá', bridge: 'Cầu phướn' };
export const ZONE = { gorge: 'Khe', mouth: 'Miệng khe', valley: 'Thung lũng', village: 'Làng' };
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
