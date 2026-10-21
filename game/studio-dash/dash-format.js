// Định dạng số kiểu Việt. Tiền LUÔN quy ra tỷ (kể cả hàng chục nghìn tỷ): plan cân bằng của chủ game viết "50.000 tỷ",
// "1.300–1.600 tỷ", nên số trên dashboard phải đọc cùng một đơn vị với plan, không đổi qua lại tỷ / nghìn tỷ.
const NF = {};
const nf = (d) => (NF[d] ??= new Intl.NumberFormat('vi-VN', { maximumFractionDigits: d }));
export const num = (v, d = 1) => (v == null || !Number.isFinite(v) ? '–' : nf(d).format(v));
export const pct = (v, d = 0) => (v == null || !Number.isFinite(v) ? '–' : nf(d).format(v * 100) + '%');
export function money(v) {
  if (v == null || !Number.isFinite(v)) return '–';
  const a = Math.abs(v);
  if (a >= 1e9) return `${num(v / 1e9, a >= 1e10 ? 0 : 1)} tỷ`;
  if (a >= 1e6) return `${num(v / 1e6, 0)} tr`;
  return num(v, 0);
}
export const yearOf = (row) => (row ? String(row.cal) : '–');
/** p10–p90 của một dải {p10, p50, p90}. */
export const spread = (b, f = money) => (b?.p10 == null ? '–' : `${f(b.p10)} – ${f(b.p90)}`);
