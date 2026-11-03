// Câu 4–5 của dashboard (1–3 là câu tuning 03/11): điểm đèn trời có đáng ăn không (plan 261102-1428 phase 03 đo bằng hai câu này).
import { card, empty, grid, half, legend, note, panelTitle, twin } from './dash-html.js';
import { fmt, pct, scatter, stackBars } from './dash-svg.js';

// Đèn trời đứng ĐẦU thanh: vùng đích 25–35% đọc thẳng trên trục. Màu theo đại lượng, cố định mọi mùa.
const PARTS = [
  ['lantern', 'Đèn trời', 'var(--s2)'],
  ['meters', 'Mét × hệ số', 'var(--s1)'],
  ['nearMiss', 'Sượt', 'var(--s3)'],
  ['gust', 'Gió xuôi', 'var(--s4)'],
];

export function scoreSection(s, w) {
  const title = '4 · Đèn trời đã chiếm 25–35% điểm chưa?';
  const target = `Đích: đèn ${pct(s.score.target[0])}–${pct(s.score.target[1])} tổng điểm`;
  const groups = s.score.bySv;
  if (!groups.length) return card(title, target, empty());
  const rows = groups.map((g) => ({
    label: `Mùa ${g.sv} · ${fmt(g.runs)} ván · TB ${fmt(g.avgScore)} điểm`,
    parts: PARTS.map(([k, name, color]) => ({ value: g.share[k], color, tip: `Mùa ${g.sv} · ${name}: ${pct(g.share[k], 1)}\n${fmt(g.parts[k])} điểm` })),
  }));
  const [lo, hi] = s.score.target;
  const verdict = groups.map((g) => {
    const v = g.share.lantern;
    const ok = v != null && v >= lo && v <= hi;
    return `Mùa ${g.sv}: đèn <b>${pct(v, 1)}</b> — ${v == null ? 'chưa có số' : ok ? 'trong đích' : v < lo ? 'dưới đích' : 'trên đích'}`;
  }).join(' · ');
  return card(title, target,
    legend(PARTS.map(([, name, color]) => [name, color]))
    + stackBars({ width: w, rows, band: s.score.target, label: 'Phân rã điểm theo mùa' })
    + note(verdict)
    + twin(['Mùa', 'Ván', ...PARTS.map(([, n]) => n), 'TB điểm'],
      groups.map((g) => [`Mùa ${g.sv}`, g.runs, ...PARTS.map(([k]) => `${pct(g.share[k], 1)} (${fmt(g.parts[k])})`), g.avgScore])));
}

export function lanternRankSection(s, w) {
  const title = '5 · Người ham đèn có đứng hạng cao hơn không?';
  const target = `Đích: tương quan r ≥ ${fmt(s.lanternRank.target, 1)} (dương = nhặt nhiều đèn thì hạng cao)`;
  const groups = s.lanternRank.bySv.filter((g) => g.players.length);
  if (!groups.length) return card(title, target, empty());
  const pw = half(w);
  const panels = groups.map((g) => {
    const pts = g.players.filter((p) => p.pick != null).map((p) => ({
      x: p.rank, y: p.pick, tip: `#${p.rank} ${p.name}\n${fmt(p.score)} điểm · ${fmt(p.dist)} m\nnhặt ${pct(p.pick)} đèn`,
    }));
    const r = g.pearson;
    const verdict = r == null ? 'chưa đủ người' : r >= s.lanternRank.target ? 'đạt' : 'chưa đạt';
    return `<div>${panelTitle(`Mùa ${g.sv} · ${fmt(g.n)} người · r = ${r == null ? '—' : fmt(r, 2)} (${verdict})`)}`
      + scatter({ width: pw, points: pts, xMax: Math.max(2, g.players.length), xLabel: 'hạng điểm (ván tốt nhất mỗi người)', yFmt: (v) => pct(v), label: `Hạng vs tỉ lệ nhặt đèn mùa ${g.sv}` })
      + '</div>';
  });
  const last = groups[groups.length - 1];
  return card(title, target,
    note('Mỗi chấm là một người: ván điểm cao nhất trong khoảng ngày; trục đứng = đèn nhặt / đèn đã bay qua.')
    + grid(w, panels)
    + twin(['Mùa', 'Hạng', 'Tên', 'Điểm', 'Mét', 'Nhặt đèn'],
      groups.flatMap((g) => g.players.slice(0, 50).map((p) => [`Mùa ${g.sv}`, p.rank, p.name, p.score, p.dist, pct(p.pick)])))
    + (last.players.length > 50 ? note(`Bảng chỉ hiện 50 người đầu mỗi mùa (mùa ${last.sv} có ${fmt(last.n)}).`) : ''));
}
