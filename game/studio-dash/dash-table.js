// Hai bảng: từng năm của một chiến lược (cũng là "bản bảng" cho người không đọc được màu), và so sánh 5 chiến lược.
// Ô lệch mục tiêu có ▲ + chữ đậm, không chỉ đổi màu.
import { money, num, pct, spread } from './dash-format.js';
import { STRATS, order } from './dash-sections.js';

const mark = (bad, text) => (bad ? `<td class="off">▲ ${text}</td>` : `<td>${text}</td>`);
const outside = (v, lo, hi) => v != null && (v < lo || v > hi);

export function yearTable(el, S, st, th) {
  const T = S.targets;
  const head = ['Năm', 'Còn chơi', 'Doanh thu p50', 'p10 – p90', 'Lợi nhuận p50', 'Lỗ', 'Đạt mục tiêu', 'Tiền p50', 'Người', 'Lương / người', 'Thăng cấp / người',
    'Cấp ≥ 5', 'Cấp ≥ 6', 'Ghế BOD', 'Game / trần', 'Chạm trần', 'Cty con', 'Thị phần', 'Quyết định', 'Nhiệm vụ xong'];
  const body = st.years.map((r) => {
    const thin = r.alive < r.of * th.minAlive / 100;
    const path = T.revenuePath[r.cal];
    const revOff = path && outside(r.rev.p50 / 1e9, path[0] * (1 - th.revTol / 100), path[1] * (1 + th.revTol / 100));
    const hitOff = r.y >= T.hitYears[0] && r.y <= T.hitYears[1] && outside(r.hitPct * 100, th.hitLo, th.hitHi);
    const lossOff = r.y >= T.lateLossFrom && outside(r.lossPct * 100, th.lossLo, th.lossHi);
    return `<tr${thin ? ' class="dim" title="Ít studio còn chơi — số không đại diện"' : ''}><td><b>${r.cal}</b> <span class="dim">#${r.y}</span></td><td>${r.alive}/${r.of}</td>` +
      mark(revOff, money(r.rev.p50)) + `<td class="dim">${spread(r.rev)}</td><td>${money(r.profit)}</td>` + mark(lossOff, pct(r.lossPct)) + mark(hitOff, pct(r.hitPct)) +
      `<td>${money(r.cash.p50)}</td><td>${num(r.staff, 0)}</td><td>${money(r.payHead)}</td><td>${num(r.promoPerHead, 2)}</td><td>${num(r.lv5, 0)}</td><td>${num(r.lv6, 0)}</td>` +
      `<td>${num(r.seats, 0)}/${num(r.seatCap, 0)}</td><td>${num(r.slots, 0)}/${num(r.slotCap, 0)}</td><td>${pct(r.atCapPct)}</td><td>${num(r.subsActive, 0)}</td>` +
      `<td>${pct(r.rivalShare, 1)}</td><td>${num(r.decisions, 0)}</td><td>${pct(r.missionsDone)}</td></tr>`;
  }).join('');
  el.innerHTML = `<thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${body}</tbody>`;
}

export function compareTable(el, S, th) {
  const head = ['Chiến lược', 'Studio', 'Thắng', 'Năm thắng p50', 'Chết', 'Năm chết p50', 'Lãi lần đầu (tháng)', `Năm lỗ từ năm ${S.targets.lateLossFrom}`,
    'Đạt mục tiêu năm (TB)', 'Game ra / studio', 'Hit / thường / flop', 'Lương / chi phí', 'Tiền thấp nhất p10', 'Lỗi sim'];
  const body = order(S).map((k) => {
    const st = S.strategies[k];
    const o = st.outcomes, dead = (o['bankrupt-cash'] ?? 0) + (o['dissolved-loss-years'] ?? 0);
    const kinds = st.games.kinds, all = (kinds.hit ?? 0) + (kinds.average ?? 0) + (kinds.flop ?? 0);
    const share = (x) => pct(all ? (x ?? 0) / all : null);
    return `<tr><td><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${STRATS[k]?.color ?? 'var(--other)'};margin-right:6px"></i><b>${STRATS[k]?.name ?? k}</b></td>` +
      `<td>${st.n}</td><td>${pct(st.winPct)}</td>` + mark(st.winYear.p50 != null && outside(st.winYear.p50, th.winLo, th.winHi), st.winYear.p50 ?? '–') +
      `<td>${pct(dead / st.n)}</td><td>${st.deathYear.p50 ? Math.round(st.deathYear.p50) : '–'}</td><td>${st.firstProfit.medianMonth ?? '–'}</td>` +
      mark(outside((st.late.lossLate ?? NaN) * 100, th.lossLo, th.lossHi), pct(st.late.lossLate)) + mark(outside((st.late.hitMean ?? NaN) * 100, th.hitLo, th.hitHi), pct(st.late.hitMean)) +
      `<td>${num(st.games.releasesPerRun, 0)}</td><td>${share(kinds.hit)} / ${share(kinds.average)} / ${share(kinds.flop)}</td><td>${num(st.payrollShare, 0)}%</td>` +
      `<td>${money(st.cash.minP10)}</td>` + mark(st.health.simErrors > 0, st.health.simErrors) + '</tr>';
  }).join('');
  el.innerHTML = `<thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${body}</tbody>`;
}
