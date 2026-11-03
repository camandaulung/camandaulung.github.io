// Câu 2 (03/11, anh Đức: "kĩ năng của người chơi tiến bộ ra sao"): quãng theo ván thứ N (mọi map) + số ván tới mốc km.
// Số ở server/run-log-stats-skill.ts — đọc BẪY ở đầu file đó trước khi kết luận từ đường "mọi người".
import { card, empty, legend, meters, note, rvName, table, twin } from './dash-html.js';
import { esc, fmt, lines } from './dash-svg.js';

const idxText = (b) => (b.hi >= 1e8 ? `${b.lo}+` : b.lo === b.hi ? `${b.lo}` : `${b.lo}–${b.hi}`);
/** Trần trục y tròn theo bậc — đường nằm gọn, nhãn giữa trục ra số dễ đọc. */
function niceMax(vals) {
  const top = Math.max(250, ...vals.filter((v) => v != null));
  const step = top > 6000 ? 2000 : top > 3000 ? 1000 : top > 1500 ? 500 : 250;
  return Math.ceil(top / step) * step;
}

function panel(g, w) {
  const series = [
    { name: 'Trung vị quãng — mọi người', color: 'var(--s1)', values: g.byIdx.map((b) => b.p50) },
    { name: `Trung vị quãng — ${g.cohortPlayers} người có ≥ ${g.cohortMin} ván`, color: 'var(--s2)', values: g.byIdx.map((b) => b.cohort50) },
    { name: 'Kỷ lục đang có (trung vị)', color: 'var(--s4)', values: g.byIdx.map((b) => b.best50) },
  ];
  const chart = lines({
    width: w, xs: g.byIdx.map(idxText), series, xFmt: (x) => `ván ${x}`, yFmt: meters,
    yMax: niceMax(series.flatMap((x) => x.values)), label: `Quãng theo ván thứ N ${rvName(g.rv)}`,
  });
  // Câu trả lời một dòng: CÙNG nhóm người, ô đầu có số → ô cuối có số.
  const co = g.byIdx.filter((b) => b.cohort50 != null);
  const gain = co.length > 1 && co[0].cohort50 > 0
    ? `Cùng nhóm người: ván ${idxText(co[0])} trung vị <b>${meters(co[0].cohort50)}</b> → ván ${idxText(co[co.length - 1])} <b>${meters(co[co.length - 1].cohort50)}</b> (×${fmt(co[co.length - 1].cohort50 / co[0].cohort50, 1)}).`
    : `Chưa đủ người có ≥ ${g.cohortMin} ván để so cùng một nhóm.`;
  const miles = g.milestones.filter((m, i) => m.reached || i === 0 || g.milestones[i - 1].reached);
  return `<h3 class="rv-head">${esc(`${rvName(g.rv)} · ${fmt(g.runs)} ván · ${fmt(g.players)} người`)}</h3>`
    + legend(series.map((x) => [x.name, x.color]))
    + chart
    + note(`Trục ngang = ván thứ N của người chơi, tính mọi map. ${gain}`)
    + table(['Mốc', 'Đã tới', 'Tới ở ván thứ (P25 · trung vị · P75)'],
      miles.map((m) => [meters(m.m), `${fmt(m.reached)}/${fmt(m.of)}`, m.reached ? `${fmt(m.i25)} · ${fmt(m.i50)} · ${fmt(m.i75)}` : '—']))
    + twin(['Ván thứ', 'Ván', 'Người', 'P25', 'Trung vị', 'P75', 'Kỷ lục (TV)', `Nhóm ≥ ${g.cohortMin} (TV)`, 'Quệt/km', 'Lead p10 (TV)'],
      g.byIdx.map((b) => [idxText(b), b.runs, b.players, meters(b.p25), meters(b.p50), meters(b.p75), meters(b.best50), meters(b.cohort50), fmt(b.hurtsPerKm, 2), b.lead50 == null ? '—' : `${fmt(b.lead50, 2)} s`]));
}

export function skillSection(s, w) {
  const title = '2 · Kỹ năng người chơi tiến bộ ra sao?';
  const target = 'Đọc đường "người có ≥ 20 ván" (cùng một nhóm người) — đường "mọi người" đi lên một phần chỉ vì người chơi nhiều vốn đã giỏi';
  const groups = s.skill ?? [];
  if (!groups.length) return card(title, target, empty('Chưa map nào có từ 10 ván sạch trở lên trong khoảng này.'));
  return card(title, target, groups.map((g) => panel(g, w)).join(''));
}
