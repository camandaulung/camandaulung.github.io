// Dựng spec cho từng biểu đồ từ stats.json rồi vẽ bằng dash-charts.js. Mỗi biểu đồ trả lời MỘT câu hỏi chỉnh số.
import { draw } from './dash-charts.js';
import { money, num, pct, spread } from './dash-format.js';

/** Màu cố định theo chiến lược (theo thực thể, không theo thứ hạng) + mô tả bot (50000b-devtools balance-bot-strategies.mjs). */
export const STRATS = {
  smart: { name: 'Smart', color: 'var(--c1)', desc: 'Đóng game lỗ, dồn vốn cho game thắng, dùng đủ hệ late game: BOD, thương vụ, bom tấn, nhiệm vụ, sự kiện. Gần người chơi giỏi nhất — đây là chiến lược để đo mục tiêu.' },
  growth: { name: 'Growth', color: 'var(--c2)', desc: 'Tuyển kín bàn, làm game vừa và lớn, nâng văn phòng và phát hành. Không dùng BOD, thương vụ, bom tấn.' },
  greedy: { name: 'Greedy', color: 'var(--c3)', desc: 'Spam game nhỏ rẻ, quảng cáo nặng, ít người, không sửa lỗi.' },
  cautious: { name: 'Cautious', color: 'var(--c4)', desc: 'Một game nhỏ một lúc, tối đa 3 người, giữ tiền dự phòng.' },
  idle: { name: 'Idle', color: 'var(--c5)', desc: 'Mỗi tháng vào một lần, một game xếp hình nhỏ, không quản lý gì — sàn dưới của độ khó.' },
};
/** Thứ tự hiển thị: Smart trước (chiến lược đo mục tiêu), rồi theo STRATS; chiến lược lạ (thêm sau) xếp cuối. */
export const order = (S) => [...Object.keys(STRATS).filter((k) => S.strategies[k]), ...Object.keys(S.strategies).filter((k) => !STRATS[k])];
/** 9 cấp gộp 5 nhóm theo ghế BOD: ghế sản phẩm cần cấp 5, ghế chuyên môn cần cấp 6 (economy/bod.ts SEATS). */
const LEVEL_GROUPS = [[[0, 1], 'var(--l1)'], [[2, 3], 'var(--l2)'], [[4], 'var(--l3)'], [[5], 'var(--l4)'], [[6, 7, 8], 'var(--l5)']];
const GROUP_COLORS = ['var(--c1)', 'var(--c2)', 'var(--c3)', 'var(--c4)'];

const col = (rows, f) => rows.map((r) => (r ? f(r) : null));
const legend = (id, items) => { document.getElementById(id).innerHTML = items.map(([c, n, k]) => `<span><i class="${k ?? ''}" style="${c ? `background:${c}` : ''}"></i>${n}</span>`).join(''); };

export function levelGroups(defs) {
  return LEVEL_GROUPS.map(([ids, color], k) => ({ ids, color, name: ids.map((i) => defs.levels[i].short).join('–') + (k === 3 ? ' · ghế sản phẩm' : k === 4 ? ' · ghế chuyên môn' : '') }));
}
export function genreGroups(defs) {
  const groups = defs.seats.filter((d) => d.kind === 'product').map((d, k) => ({ name: d.name.replace(/^GĐ\s*/, ''), genres: d.genres, color: GROUP_COLORS[k % 4] }));
  const named = new Set(groups.flatMap((g) => g.genres));
  const rest = defs.genres.map((g) => g.id).filter((id) => !named.has(id));
  return rest.length ? [...groups, { name: 'Khác', genres: rest, color: 'var(--other)' }] : groups;
}

/** Vẽ mọi biểu đồ của chiến lược `key`. `rows` = các năm còn đủ studio chơi (dash.js lọc theo ngưỡng minAlive). */
export function renderCharts(S, key, rows, tip) {
  const st = S.strategies[key], T = S.targets, c = STRATS[key].color, x = rows.map((r) => String(r.cal));
  const d = (id, spec) => draw(document.getElementById(id), spec, tip);
  const title = (i) => `Năm ${rows[i].cal} · năm thứ ${rows[i].y} · còn chơi ${rows[i].alive}/${rows[i].of}`;
  const idx = (cal) => rows.findIndex((r) => r.cal === cal);
  /** Một ô mục tiêu phủ các cột của năm thứ from..to (năm thứ, không phải năm lịch); không cột nào thì không ô. */
  const span = (from, to, y0, y1) => {
    const ids = rows.map((r, i) => (r.y >= from && r.y <= to ? i : -1)).filter((i) => i >= 0);
    return ids.length ? [{ i: ids[0], i1: ids[ids.length - 1], y0, y1 }] : [];
  };

  const path = Object.entries(T.revenuePath).map(([cal, [lo, hi]]) => ({ i: idx(Number(cal)), y0: lo * 1e9, y1: hi * 1e9 })).filter((b) => b.i >= 0);
  const top = Math.max(S.settings.winRevenue * 2, ...rows.map((r) => r.rev.p90 ?? 0)) * 1.2;
  legend('lg-rev', [[c, 'Doanh thu trung vị'], [c, 'Dải p10–p90', 'band'],['var(--c2)', 'Chi phí trung vị'], [0, 'Đường mục tiêu 2022–2027', 'box'], [0, 'Mốc thắng', 'dash']]);
  d('ch-rev', {
    x, h: 320, label: 'Doanh thu theo năm, thang log', y: { min: 1e8, max: top, log: true, fmt: money },
    bands: [{ color: c, lo: col(rows, (r) => r.rev.p10), hi: col(rows, (r) => r.rev.p90) }],
    lines: [{ name: 'Doanh thu', short: 'Doanh thu', color: c, values: col(rows, (r) => r.rev.p50) }, { name: 'Chi phí', short: 'Chi phí', color: 'var(--c2)', values: col(rows, (r) => r.exp) }],
    boxes: path, refs: [{ y: S.settings.winRevenue, label: `Mốc thắng ${money(S.settings.winRevenue)}/năm` }], title,
    rows: (i) => { const r = rows[i], t = T.revenuePath[r.cal]; return [['Doanh thu p50', money(r.rev.p50)], ['p10 – p90', spread(r.rev)], ['Chi phí p50', money(r.exp)], ['Lợi nhuận p50', money(r.profit)], ...(t ? [['Mục tiêu plan', `${num(t[0], 0)}–${num(t[1], 0)} tỷ`]] : []), ['Tiền cuối năm p50', money(r.cash.p50)]]; },
  });

  const pctY = { min: 0, max: 1, fmt: (v) => pct(v) };
  d('ch-hit', {
    x, h: 240, y: pctY, title, boxes: span(T.hitYears[0], T.hitYears[1], T.hitBand[0], T.hitBand[1]),
    lines: [{ name: 'Đạt mục tiêu năm', color: c, values: col(rows, (r) => r.hitPct) }],
    rows: (i) => [['Đạt mục tiêu năm', pct(rows[i].hitPct)], ['Mục tiêu năm p50', money(rows[i].target)], ['Nhiệm vụ xong', pct(rows[i].missionsDone)], ['Mở rương', pct(rows[i].chestPct)]],
  });
  d('ch-loss', {
    x, h: 240, y: pctY, title, boxes: span(T.lateLossFrom, Infinity, T.lateLossBand[0], T.lateLossBand[1]),
    lines: [{ name: 'Năm lỗ', color: c, values: col(rows, (r) => r.lossPct) }],
    rows: (i) => [['Studio lỗ năm này', pct(rows[i].lossPct)], ['Lợi nhuận p50', money(rows[i].profit)], ['Thưởng / (doanh thu + thưởng)', pct(rows[i].creditShare)], ['Tháng tiền dự phòng', num(rows[i].runway)]],
  });

  const keys = order(S), start = S.settings.startYear;
  const sx = Array.from({ length: S.params.years }, (_, k) => String(start + k));
  legend('lg-surv', [...keys.map((k) => [STRATS[k]?.color ?? 'var(--other)', STRATS[k]?.name ?? k]), [0, `${STRATS[key].name}: đã thắng`, 'dash']]);
  d('ch-surv', {
    x: sx, h: 260, y: pctY, title: (i) => `Cuối năm ${sx[i]} (năm thứ ${i + 1})`,
    lines: [...keys.map((k) => ({ name: STRATS[k]?.name ?? k, short: STRATS[k]?.name ?? k, color: STRATS[k]?.color ?? 'var(--other)', values: S.strategies[k].survival.map((v) => v / 100) })),
      { name: 'Đã thắng', color: c, dash: true, values: st.winPctByYear.map((v) => v / 100) }],
    rows: (i) => [...keys.map((k) => [`${STRATS[k]?.name ?? k} còn sống`, pct(S.strategies[k].survival[i] / 100)]), [`${STRATS[key].name} đã thắng`, pct(st.winPctByYear[i] / 100)]],
  });

  const lv = levelGroups(S.defs);
  legend('lg-levels', lv.map((g) => [g.color, g.name]));
  d('ch-levels', {
    x, h: 260, y: pctY, title, stacks: lv.map((g) => ({ name: g.name, color: g.color, values: col(rows, (r) => g.ids.reduce((a, k) => a + (r.levels[k] ?? 0), 0)) })),
    rows: (i) => { const r = rows[i]; return [...lv.map((g) => [g.name, pct(g.ids.reduce((a, k) => a + (r.levels[k] ?? 0), 0))]).reverse(), ['Nhân sự p50', num(r.staff, 0)], ['Thăng cấp / người / năm', num(r.promoPerHead, 2)], ['Tuyển mới p50', num(r.hires, 0)]]; },
  });

  legend('lg-lead', [['var(--c1)', 'Người cấp ≥ 5'], ['var(--c3)', 'Người cấp ≥ 6'], ['var(--c2)', 'Ghế BOD có người'], [0, 'Số ghế văn phòng cho', 'dash'], ['var(--c5)', 'Công ty con đang chạy']]);
  const leadMax = Math.max(4, ...rows.map((r) => Math.max(r.lv5 ?? 0, r.seatCap ?? 0))) * 1.1;
  d('ch-lead', {
    x, h: 260, y: { min: 0, max: leadMax, fmt: (v) => num(v, 0) }, title,
    lines: [{ name: 'Cấp ≥ 5', short: 'Cấp ≥5', color: 'var(--c1)', values: col(rows, (r) => r.lv5) }, { name: 'Cấp ≥ 6', short: 'Cấp ≥6', color: 'var(--c3)', values: col(rows, (r) => r.lv6) },
      { name: 'Ghế có người', short: 'Ghế', color: 'var(--c2)', values: col(rows, (r) => r.seats) }, { name: 'Ghế tối đa', color: 'var(--muted)', dash: true, values: col(rows, (r) => r.seatCap) },
      { name: 'Công ty con', short: 'Cty con', color: 'var(--c5)', values: col(rows, (r) => r.subsActive) }],
    rows: (i) => { const r = rows[i]; return [['Người cấp ≥ 5 (p50)', num(r.lv5, 0)], ['Người cấp ≥ 6 (p50)', num(r.lv6, 0)], ['Studio có người cấp ≥ 6', pct(r.anyLv6Pct)], ['Ghế BOD (p50)', `${num(r.seats, 0)} / ${num(r.seatCap, 0)}`], ['Ghế lấp (gộp)', pct(r.seatFill)], ['Cấp cao nhất (p50)', num(r.maxLevel, 0)], ['Công ty con (chạy / có)', `${num(r.subsActive, 0)} / ${num(r.subs, 0)}`]]; },
  });

  legend('lg-slots', [[c, 'Game + dự án trong studio'], [0, 'Trần game', 'dash']]);
  d('ch-slots', {
    x, h: 260, y: { min: 0, max: Math.max(...rows.map((r) => r.slotCap ?? 0), 1) * 1.15, fmt: (v) => num(v, 0) }, title,
    lines: [{ name: 'Đang dùng', color: c, values: col(rows, (r) => r.slots) }, { name: 'Trần', color: 'var(--muted)', dash: true, values: col(rows, (r) => r.slotCap) }],
    rows: (i) => [['Game + dự án (p50)', num(rows[i].slots, 0)], ['Trần game (p50)', num(rows[i].slotCap, 0)], ['Studio đang chạm trần', pct(rows[i].atCapPct)], ['Có công ty con', pct(rows[i].anySubPct)]],
  });

  const gg = genreGroups(S.defs), gname = Object.fromEntries(S.defs.genres.map((g) => [g.id, g.name]));
  legend('lg-genre', gg.map((g) => [g.color, g.name]));
  d('ch-genre', {
    x, h: 260, y: pctY, title, stacks: gg.map((g) => ({ name: g.name, color: g.color, values: col(rows, (r) => g.genres.reduce((a, id) => a + (r.genreShare[id] ?? 0), 0)) })),
    rows: (i) => Object.entries(rows[i].genreShare).slice(0, 8).map(([id, v]) => [gname[id] ?? id, pct(v)]),
  });
  d('ch-rival', {
    x, h: 260, y: pctY, title, lines: [{ name: 'Thị phần', color: c, values: col(rows, (r) => r.rivalShare) }],
    rows: (i) => [['Thị phần trong nhóm 6 studio', pct(rows[i].rivalShare, 1)], ['So với đối thủ lớn nhất', `${num(rows[i].vsTopRival, 2)}×`]],
  });

  d('ch-dec', {
    x, h: 240, y: { min: 0, max: Math.max(T.decisionsMin * 1.5, ...rows.map((r) => r.decisions ?? 0)) * 1.1, fmt: (v) => num(v, 0) }, title,
    refs: [{ y: T.decisionsMin, label: `tối thiểu ${T.decisionsMin}` }], lines: [{ name: 'Quyết định', color: c, values: col(rows, (r) => r.decisions) }],
    rows: (i) => [['Quyết định (sự kiện + thương vụ + bom tấn)', num(rows[i].decisions, 0)], ['Thao tác của bot', num(rows[i].botActions, 0)]],
  });
  legend('lg-moves', [['var(--c1)', 'Bom tấn xong'], ['var(--c3)', 'Bom tấn thành công'], ['var(--c2)', 'Mua đối thủ'], ['var(--c5)', 'Công ty con']]);
  d('ch-moves', {
    x, h: 240, y: { min: 0, max: Math.max(3, ...rows.map((r) => Math.max(r.megaDone ?? 0, r.subs ?? 0, r.bought ?? 0))) * 1.15, fmt: (v) => num(v, 0) }, title,
    lines: [{ name: 'Bom tấn xong', short: 'Bom tấn', color: 'var(--c1)', values: col(rows, (r) => r.megaDone) }, { name: 'Thành công', short: 'Thành công', color: 'var(--c3)', values: col(rows, (r) => r.megaOk) },
      { name: 'Mua đối thủ', short: 'Mua', color: 'var(--c2)', values: col(rows, (r) => r.bought) }, { name: 'Công ty con', short: 'Cty con', color: 'var(--c5)', values: col(rows, (r) => r.subs) }],
    rows: (i) => [['Bom tấn xong / thành công (TB)', `${num(rows[i].megaDone)} / ${num(rows[i].megaOk)}`], ['Mua đối thủ (TB)', num(rows[i].bought)], ['Game phần 2 (TB)', num(rows[i].sequels)], ['Công ty con (p50)', num(rows[i].subs, 0)]],
  });
  const p22 = idx(2022);
  d('ch-pay', {
    x, h: 240, y: { min: 0, max: Math.max(T.payHead2022 * 1.5, ...rows.map((r) => r.payHead ?? 0)) * 1.1, fmt: money }, title,
    boxes: p22 >= 0 ? [{ i: p22, y0: T.payHead2022 * 0.85, y1: T.payHead2022 * 1.15 }] : [], lines: [{ name: 'Lương / người', color: c, values: col(rows, (r) => r.payHead) }],
    rows: (i) => [['Lương tháng / người (p50)', money(rows[i].payHead)], ['Kỹ năng TB (p50)', num(rows[i].skill)], ['Nhân sự (p50)', num(rows[i].staff, 0)]],
  });
}
