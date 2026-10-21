// Ô KPI + danh sách cờ "đạt / lệch" so với mục tiêu của plan cân bằng (50000b plans/261016-late-game/plan.md).
// Mỗi cờ kèm NÚM CHỈNH (file / setting của game) — dashboard để chỉnh số, nên lệch thì phải chỉ được chỗ vặn.
import { money, num, pct } from './dash-format.js';

const KEY = 'studio-dash-thresholds';
export const FIELDS = [
  ['winLo', 'Năm thắng sớm nhất'], ['winHi', 'Năm thắng muộn nhất'], ['winMin', 'Studio thắng ít nhất (%)'],
  ['hitLo', 'Đạt mục tiêu năm từ (%)'], ['hitHi', 'đến (%)'], ['lossLo', 'Năm lỗ late từ (%)'], ['lossHi', 'đến (%)'],
  ['decMin', 'Quyết định / năm tối thiểu'], ['checkYear', 'Năm thứ để soi BOD / trần'], ['seatMin', 'Ghế BOD lấp ít nhất (%)'],
  ['capMax', 'Chạm trần game nhiều nhất (%)'], ['revTol', 'Lệch đường doanh thu cho phép (%)'], ['payTol', 'Lệch lương 2022 cho phép (%)'],
  ['minAlive', 'Ẩn năm còn dưới (% studio)'],
];
export function loadThresholds(T) {
  const d = { winLo: T.winYear[0], winHi: T.winYear[1], winMin: 50, hitLo: T.hitBand[0] * 100, hitHi: T.hitBand[1] * 100, lossLo: T.lateLossBand[0] * 100, lossHi: T.lateLossBand[1] * 100,
    decMin: T.decisionsMin, checkYear: 12, seatMin: 50, capMax: 80, revTol: 15, payTol: 15, minAlive: 30 };
  try { return { ...d, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return d; }   // trình duyệt chặn lưu → mặc định
}
export const saveThresholds = (th) => { try { localStorage.setItem(KEY, JSON.stringify(th)); } catch { /* không lưu được cũng không sao */ } };

const inRange = (v, lo, hi) => v != null && v >= lo && v <= hi;
/** Bất thường recorder đo lệch với game hiện tại: ghi kèm để biết, không tính lệch. */
const INFO = new Map([
  ['save-near-64KB-cap', 'JSON thô của state; save cloud được nén (economy/save-packing.ts)'],
  ['slots-over-cap', 'recorder so với maxGames tĩnh; trần thật tăng theo AI + công ty con (deals.ts gameCap)'],
]);

export function flags(S, st, th) {
  const T = S.targets, at = st.years.find((r) => r.y === th.checkYear), out = [];
  const add = (ok, what, text, knob) => out.push({ ok, what, text, knob });
  const w = st.winYear;
  add(w.p50 != null && inRange(w.p50, th.winLo, th.winHi), 'Năm thắng',
    w.p50 == null ? `chưa studio nào thắng trong ${S.params.years} năm` : `trung vị ${w.p50} (p10–p90 ${w.p10}–${w.p90}), mục tiêu ${th.winLo}–${th.winHi}`,
    'winRevenue (game-settings.json), đà late game: economy/ai-era.ts, deals.ts, mega-project.ts');
  add((st.winPct ?? 0) * 100 >= th.winMin, 'Tỉ lệ thắng', `${pct(st.winPct)} studio thắng (cần ≥ ${th.winMin}%)`, 'như trên + độ khó sống sót: bankruptcyDays, LOSS_YEARS_LIMIT');
  const hy = st.years.filter((r) => r.y >= T.hitYears[0] && r.y <= T.hitYears[1] && r.alive >= r.of * th.minAlive / 100);
  const hin = hy.filter((r) => inRange(r.hitPct * 100, th.hitLo, th.hitHi));
  add(hy.length > 0 && hin.length === hy.length, `Đạt mục tiêu năm, năm ${T.hitYears[0]}–${T.hitYears[1]}`,
    hy.length ? `${hin.length}/${hy.length} năm nằm trong ${th.hitLo}–${th.hitHi}% · TB ${pct(st.late.hitMean)}, thấp nhất ${pct(st.late.hitMin)}, cao nhất ${pct(st.late.hitMax)}` : 'không đủ năm có mẫu',
    'economy/year-target.ts (tăng theo đà năm trước, trần ×1,3, không tăng sau năm trượt)');
  add(inRange((st.late.lossLate ?? -1) * 100, th.lossLo, th.lossHi), `Năm lỗ từ năm ${T.lateLossFrom}`,
    `${pct(st.late.lossLate)} các năm (${st.late.lossLateN} năm-studio), mục tiêu ${th.lossLo}–${th.lossHi}%`, 'maxNetMargin, costScale, taxRate; economy/running-costs.ts, deals.ts (phí công ty con)');
  add((st.late.decisionsMin ?? 0) >= th.decMin, 'Quyết định mỗi năm (late)',
    st.late.decisionsMin == null ? 'không đủ năm có mẫu' : `${st.late.decisionsMin}–${st.late.decisionsMax} mỗi năm (cần ≥ ${th.decMin})`, 'economy/events-deck.ts, studio-events.ts, deals.ts, mega-project.ts');
  const off = Object.entries(T.revenuePath).map(([cal, [lo, hi]]) => ({ cal, lo, hi, r: st.years.find((x) => x.cal === Number(cal)) }))
    .filter((p) => p.r && !inRange(p.r.rev.p50 / 1e9, p.lo * (1 - th.revTol / 100), p.hi * (1 + th.revTol / 100)));
  add(!off.length, 'Đường doanh thu 2022–2027', off.length ? off.map((p) => `${p.cal}: ${money(p.r.rev.p50)} (mục tiêu ${num(p.lo, 0)}–${num(p.hi, 0)})`).join(' · ') : `mọi năm trong dải ±${th.revTol}%`,
    'incomeScale, publishingGrowth, marketDemand; sóng khủng hoảng 2023: economy/industry-waves.ts');
  const p22 = st.years.find((r) => r.cal === 2022);
  add(p22 != null && Math.abs(p22.payHead / T.payHead2022 - 1) * 100 <= th.payTol, 'Lương mỗi người năm 2022',
    p22 ? `${money(p22.payHead)}/tháng, mục tiêu ~${money(T.payHead2022)} ±${th.payTol}%` : 'không có năm 2022', 'marketPayMax, priceInflation; economy/market-pay.ts, STAFF_LEVELS.mult (economy-tables.ts)');
  add(at != null && (at.seatFill ?? 0) * 100 >= th.seatMin, `Ghế BOD năm thứ ${th.checkYear}`,
    at ? `lấp ${pct(at.seatFill)} (p50 ${num(at.seats, 0)}/${num(at.seatCap, 0)}) · studio có người cấp ≥ 6: ${pct(at.anyLv6Pct)} · cấp cao nhất p50: ${num(at.maxLevel, 0)}` : 'không có năm này',
    'thăng cấp: economy/staff-kpi-review.ts (A ≤ 30% số người, ≥ 240 ngày, cách lần trước ≥ 2 năm), minSkill (STAFF_LEVELS); ghế: bod.ts minLevel 5 / 6');
  add(at != null && (at.atCapPct ?? 0) * 100 <= th.capMax, `Trần game năm thứ ${th.checkYear}`,
    at ? `${pct(at.atCapPct)} studio đang chạm trần (p50 ${num(at.slots, 0)}/${num(at.slotCap, 0)}), có công ty con: ${pct(at.anySubPct)}` : 'không có năm này',
    'maxGames, economy/deals.ts (SUB_SLOTS 5 / công ty con, cần GĐ sản phẩm đang làm việc), ai-era.ts output');
  const an = Object.entries(st.health.anomalies), bad = an.filter(([k]) => !INFO.has(k));
  add(!st.health.simErrors && !bad.length, 'Sức khoẻ mô phỏng',
    st.health.simErrors ? `${st.health.simErrors} run lỗi sim: ${st.health.simErrorFirst}`
      : an.length ? an.map(([k, v]) => `${k} ${v.runs} run${INFO.has(k) ? ` (chỉ để biết: ${INFO.get(k)})` : ''}`).join(' · ') : 'không lỗi, không bất thường',
    'scripts/qa/balance-run-recorder.mjs (50000b-devtools) liệt kê từng loại bất thường');
  return out;
}

export function kpis(S, st, th) {
  const at = st.years.find((r) => r.y === th.checkYear), o = st.outcomes, dead = (o['bankrupt-cash'] ?? 0) + (o['dissolved-loss-years'] ?? 0);
  const fp = st.firstProfit;
  return [
    [pct(st.winPct), 'Studio thắng', st.winYear.p50 ? `năm thắng p50 ${st.winYear.p50} (p10–p90 ${st.winYear.p10}–${st.winYear.p90})` : `chưa ai thắng trong ${S.params.years} năm`],
    [pct(dead / st.n), 'Studio chết', `phá sản ${o['bankrupt-cash'] ?? 0} · giải thể ${o['dissolved-loss-years'] ?? 0}${st.deathYear.p50 ? ` · năm chết p50 ${Math.round(st.deathYear.p50)}` : ''}`],
    [pct(st.late.lossLate), `Năm lỗ từ năm ${S.targets.lateLossFrom}`, `mục tiêu ${th.lossLo}–${th.lossHi}%`],
    [pct(st.late.hitMean), 'Đạt mục tiêu năm (TB)', `năm ${S.targets.hitYears.join('–')}, mục tiêu ${th.hitLo}–${th.hitHi}%`],
    [st.late.decisionsMin == null ? '–' : `${st.late.decisionsMin}–${st.late.decisionsMax}`, 'Quyết định / năm (late)', `tối thiểu ${th.decMin}`],
    [at ? `${num(at.seats, 0)}/${num(at.seatCap, 0)}` : '–', `Ghế BOD năm thứ ${th.checkYear}`, at ? `có người cấp ≥ 6: ${pct(at.anyLv6Pct)} studio` : ''],
    [at ? `${num(at.slots, 0)}/${num(at.slotCap, 0)}` : '–', `Game / trần năm thứ ${th.checkYear}`, at ? `chạm trần ${pct(at.atCapPct)} studio` : ''],
    [fp.medianMonth != null ? `tháng ${fp.medianMonth}` : '–', 'Lần đầu có lãi (p50)', `không bao giờ: ${num(fp.neverPct, 0)}%`],
  ];
}
