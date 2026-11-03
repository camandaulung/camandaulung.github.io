// Câu 1 (03/11, anh Đức: "P 25 50 75 95 user mắc kẹt ở đoạn nào"): phân vị kỷ lục / quãng mỗi ván + tỉ lệ rơi từng đoạn
// 250 m, tách theo map + phiên bản route. Số tính ở server/run-log-stats-stuck.ts.
import { KIND, ZONE, card, empty, kpis, meters, nameOf, note, rvName, segText, twin } from './dash-html.js';
import { columns, esc, fmt, pct } from './dash-svg.js';

/** Đoạn có ít ván tới hơn thế thì cột để trống (3/4 ván rơi = 75% chỉ là nhiễu) — bảng số vẫn đủ. */
const MIN_REACH = 8;
const P = ['P25', 'P50', 'P75', 'P95'];

const place = (x) => (x.zone ? `${nameOf(ZONE, x.zone)} · ${nameOf(KIND, x.kind)}` : '—');

function panel(g, w) {
  let last = 0;
  g.segs.forEach((x, i) => x.reach >= MIN_REACH && (last = i));
  const segs = g.segs.slice(0, Math.max(4, last + 2));
  const shown = (x) => x.reach >= MIN_REACH && x.rate != null;
  const chart = columns({
    width: w, height: 180,
    values: segs.map((x) => ({
      value: shown(x) ? x.rate * 100 : 0,
      tip: `${segText(x.from, g.seg)}\n${fmt(x.reach)} ván bay tới · ${fmt(x.deaths)} rơi (${pct(x.rate, 1)})`
        + `${x.zone ? `\nhay rơi: ${place(x)}` : ''}${x.known ? `\nbỏ game sau khi rơi: ${fmt(x.quits)}/${fmt(x.known)}` : ''}`,
    })),
    xText: (i) => fmt(segs[i].from / 1000, segs[i].from % 1000 ? 2 : 0),
    markers: g.bestP.map((v, k) => (v == null || v / g.seg > segs.length ? null : { at: v / g.seg, text: P[k] })).filter(Boolean),
    yFmt: (v) => `${fmt(v)}%`, label: `Tỉ lệ rơi từng đoạn ${rvName(g.rv)}`,
  });
  // "Tường" = đoạn rơi nhiều nhất trong số đoạn đủ ván (≥ 5% số ván cũng phải tới được — đuôi vài ván không tính).
  const floor = Math.max(MIN_REACH, g.runs * 0.05);
  const walls = g.segs.filter((x) => x.reach >= floor && x.rate != null).sort((a, b) => b.rate - a.rate).slice(0, 3)
    .map((x) => `<b>${esc(segText(x.from, g.seg))}</b> rơi ${pct(x.rate)} (${esc(place(x))})`).join(' · ');
  const stuckAt = g.segs.filter((x) => x.stuck).sort((a, b) => b.stuck - a.stuck).slice(0, 3)
    .map((x) => `${esc(segText(x.from, g.seg))} (${fmt(x.stuck)} người)`).join(', ');
  return `<h3 class="rv-head">${esc(`${rvName(g.rv)} · ${fmt(g.runs)} ván · ${fmt(g.players)} người`)}</h3>`
    + kpis(g.bestP.map((v, k) => [meters(v), `${P[k]} kỷ lục mỗi người`]))
    + note(`Quãng mỗi ván: ${g.runP.map((v, k) => `${P[k]} <b>${meters(v)}</b>`).join(' · ')}`)
    + chart
    + (walls ? note(`Tường: ${walls}`) : '')
    + note(g.stuck.eligible
      ? `<b>${fmt(g.stuck.players)}/${fmt(g.stuck.eligible)}</b> người có trên ${g.stuck.runs} ván đã ${g.stuck.runs} ván liền không phá kỷ lục${stuckAt ? ` — kỷ lục dồn ở ${stuckAt}` : ''}.`
      : `Chưa ai có trên ${g.stuck.runs} ván ở đây để biết có kẹt không.`)
    + twin(['Đoạn', 'Bay tới', 'Rơi', '% rơi', 'Bỏ game sau rơi', 'Bỏ giữa ván', 'Người kẹt', 'Hay rơi ở'],
      g.segs.map((x) => [segText(x.from, g.seg), x.reach, x.deaths, pct(x.rate, 1), x.known ? `${fmt(x.quits)}/${fmt(x.known)}` : '—', x.left, x.stuck, place(x)]));
}

export function stuckSection(s, w) {
  const title = '1 · Người chơi kẹt ở đâu?';
  const target = 'P50 kỷ lục = một nửa số người chưa từng bay quá mốc đó · cột vọt lên = "bức tường"';
  const groups = s.stuck ?? [];
  if (!groups.length) return card(title, target, empty('Chưa map nào có từ 10 ván sạch trở lên trong khoảng này.'));
  return card(title, target,
    note('Tách theo map + phiên bản route — đổi bố cục là đổi tường. Cột = % ván rơi trong đoạn 250 m trên số ván bay tới đoạn đó; vạch vàng = phân vị kỷ lục của người chơi.')
    + groups.map((g) => panel(g, w)).join(''));
}
