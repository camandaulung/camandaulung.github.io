// Câu 6–8 của dashboard: cách bay — đổi điều khiển dọc (phase 04, `rv` 2) có làm chết sớm hơn, tầng thấp có trội,
// người thật có đọc kịp hàng không. Mỗi luật bay một màu cố định (rvColor).
import { DEVICE, FLIGHT, INPUT, ZONE, card, empty, grid, half, heat, legend, meters, nameOf, note, panelTitle, rvColor, rvName, twin } from './dash-html.js';
import { columns, fmt, lines, pct, stackBars } from './dash-svg.js';

export function survivalSection(s, w) {
  const title = '6 · Đổi điều khiển có làm chết sớm hơn không?';
  const target = 'Đích: đường luật mới không nằm dưới đường luật cũ';
  const curves = s.survival.byRv;
  if (!curves.length) return card(title, target, empty());
  const step = s.survival.step;
  const xs = curves[0].alive.map((_, i) => i * step);
  // Vẽ tới mốc cuối còn ≥ 1% ván ở một luật nào đó: đuôi vài ván 30 km ép phần có số thành một góc vuông bên trái.
  // Bảng số bên dưới vẫn đủ mọi mốc.
  let shown = 1;
  xs.forEach((_, i) => curves.some((c) => (c.alive[i] ?? 0) >= 0.01) && (shown = i + 1));
  shown = Math.min(xs.length, Math.max(3, shown + 1));
  const series = curves.map((c) => ({ name: `${rvName(c.rv)} (${fmt(c.runs)} ván)`, color: rvColor(c.rv), values: c.alive.slice(0, shown) }));
  // Mốc "một nửa số ván đã rơi" — con số dễ nói nhất khi so hai luật.
  const half50 = curves.map((c) => {
    const i = c.alive.findIndex((v) => v < 0.5);
    return `${rvName(c.rv)}: nửa số ván rơi trước <b>${i < 0 ? `> ${meters(xs[xs.length - 1])}` : meters(i * step)}</b>`;
  }).join(' · ');
  const cz = s.survival.causes;
  const causes = cz.kinds.length
    ? panelTitle('Rơi vì gì, ở đâu (số ván)') + heat(cz.zones, ZONE, cz.kinds, cz.byZone)
      + panelTitle('Rơi vì gì, đang ở tầng nào') + heat(cz.tiers, FLIGHT, cz.kinds, cz.byTier)
      + (cz.noDetail ? note(`${fmt(cz.noDetail)} ván rơi không có chi tiết chỗ rơi.`) : '')
    : '';
  return card(title, target,
    legend(series.map((x) => [x.name, x.color]))
    + lines({ width: w, xs: xs.slice(0, shown), series, xFmt: meters, yFmt: (v) => pct(v), label: 'Tỉ lệ ván còn bay theo mét' })
    + note(`Trục đứng = % ván còn bay khi tới mốc. ${half50}`)
    + twin(['Mốc', ...curves.map((c) => rvName(c.rv))], xs.map((m, i) => [meters(m), ...curves.map((c) => pct(c.alive[i], 1))]))
    + causes);
}

const TIER_PARTS = [['low', 'var(--s1)'], ['zero', 'var(--s2)'], ['high', 'var(--s3)'], ['thermal', 'var(--s4)']];

export function tierSection(s, w) {
  const title = '7 · Tầng thấp có "miễn phí" quá không?';
  const target = 'Đích: ở tầng thấp < 50% thời gian bay';
  const groups = s.tiers.byRv;
  if (!groups.length) return card(title, target, empty());
  const rows = groups.map((g) => ({
    label: `${rvName(g.rv)} · ${fmt(g.runs)} ván`,
    parts: TIER_PARTS.map(([k, color]) => ({ value: g.share[k], color, tip: `${rvName(g.rv)} · ${FLIGHT[k]}: ${pct(g.share[k], 1)}\n${fmt(g.seconds[k])} giây` })),
  }));
  const bridges = groups.map((g) => `${rvName(g.rv)}: <b>${fmt(g.fromLowPerKm, 2)}</b> cầu/km qua từ tầng thấp`
    + (g.freeShare != null ? ` (${pct(g.freeShare)} số cầu)` : '')).join(' · ');
  return card(title, target,
    legend(TIER_PARTS.map(([k, color]) => [FLIGHT[k], color]))
    + stackBars({ width: w, rows, band: [0, 0.5], label: 'Thời gian theo tầng bay' })
    + note(`Cầu "miễn phí" = qua cầu khi đã ở thấp sẵn ≥ 0,5 s. ${bridges}`)
    + twin(['Luật', 'Ván', ...TIER_PARTS.map(([k]) => FLIGHT[k]), 'Cầu từ thấp'],
      groups.map((g) => [rvName(g.rv), g.runs, ...TIER_PARTS.map(([k]) => `${pct(g.share[k], 1)} (${fmt(g.seconds[k])} s)`), g.bridgesFromLow])));
}

/** Mốc thiết kế: hai hàng sát nhất cách 0,567 s (CLAUDE.md, gate bot-run). Lead p10 dồn dưới mốc = né sát nút. */
const READ_FLOOR = 0.567;

export function leadSection(s, w) {
  const title = '8 · Người thật có đọc kịp hàng chướng ngại không?';
  const target = `Mốc: hàng sát nhất cách ${fmt(READ_FLOOR, 2)} s — lead p10 dồn bên trái vạch là né sát nút`;
  const { edges, byTier, byInput } = s.lead;
  if (!byTier.length && !byInput.length) return card(title, target, empty('Chưa có ván nào có số lead (ván phải qua ít nhất một hàng phải né).'));
  const pw = half(w);
  const binText = (i) => (i === edges.length - 1 ? `≥${fmt(edges[i], 1)}` : fmt(edges[i], 1));
  const panel = (map, g) => `<div>${panelTitle(`${nameOf(map, g.key)} · ${fmt(g.n)} ván · trung vị ${fmt(g.median, 2)} s`)}`
    + columns({
      width: pw, values: g.counts.map((c, i) => ({ value: c, tip: `${nameOf(map, g.key)} · lead p10 ${binText(i)} s: ${fmt(c)} ván` })),
      xText: binText, marker: { at: READ_FLOOR / (edges[1] - edges[0]), text: `${fmt(READ_FLOOR, 2)} s` }, label: `Lead p10 ${nameOf(map, g.key)}`,
    }) + '</div>';
  const head = ['Nhóm', 'Ván', 'Trung vị', ...edges.map((_, i) => binText(i))];
  const rows = [...byTier.map((g) => [nameOf(DEVICE, g.key), g.n, fmt(g.median, 2), ...g.counts]), ...byInput.map((g) => [nameOf(INPUT, g.key), g.n, fmt(g.median, 2), ...g.counts])];
  return card(title, target,
    note('Lead = giây từ lệnh né tới lúc tới hàng (chỉ hàng mà đứng yên thì đâm); p10 = 10% lần né sát nhất của ván.')
    + panelTitle('Theo tầng máy') + grid(w, byTier.map((g) => panel(DEVICE, g)))
    + panelTitle('Theo cách điều khiển') + grid(w, byInput.map((g) => panel(INPUT, g)))
    + twin(head, rows));
}
