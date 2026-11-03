// Câu 9–10 + danh sách ván mới nhất: người chơi có quay lại không, bóng ma (đã bớt chói ở phase 01) còn làm rơi không.
import { KIND, card, empty, grid, half, nameOf, note, panelTitle, table, twin } from './dash-html.js';
import { columns, fmt, hbars, pct } from './dash-svg.js';

const dayText = (d) => `${d.slice(8, 10)}/${d.slice(5, 7)}`;

export function dailySection(s, w) {
  const title = '9 · Người chơi có quay lại mỗi ngày không?';
  const target = 'Ván / người chơi mỗi ngày (giờ VN) — hai thước khác nhau nên hai biểu đồ';
  const d = s.daily;
  if (!d.some((x) => x.runs || x.tainted)) return card(title, target, empty());
  const pw = half(w);
  const xText = (i) => dayText(d[i].day);
  const runs = columns({
    width: pw, values: d.map((x) => ({ value: x.runs, tip: `${dayText(x.day)}: ${fmt(x.runs)} ván sạch${x.tainted ? ` (+${fmt(x.tainted)} bẩn)` : ''}` })),
    xText, label: 'Ván mỗi ngày',
  });
  const players = columns({
    width: pw, values: d.map((x) => ({ value: x.players, tip: `${dayText(x.day)}: ${fmt(x.players)} người` })),
    xText, label: 'Người chơi mỗi ngày',
  });
  const per = d.filter((x) => x.players).map((x) => x.runs / x.players);
  const avg = per.length ? per.reduce((a, b) => a + b, 0) / per.length : null;
  return card(title, target,
    grid(w, [`<div>${panelTitle('Ván mỗi ngày')}${runs}</div>`, `<div>${panelTitle('Người chơi mỗi ngày')}${players}</div>`])
    + note(`Trung bình <b>${fmt(avg, 1)}</b> ván mỗi người mỗi ngày có chơi.`)
    + twin(['Ngày', 'Ván', 'Người', 'Ván bẩn'], d.map((x) => [dayText(x.day), x.runs, x.players, x.tainted])));
}

const GROUP = { near: 'Rơi khi có bóng < 15 m', far: 'Có bóng nhưng không gần', none: 'Không có bóng nào' };
const SETTING = { on: '⚙ Bóng ma: Hiện', dim: '⚙ Bóng ma: Mờ', off: '⚙ Bóng ma: Tắt' };

export function ghostSection(s, w) {
  const title = '10 · Bóng ma còn làm người chơi rơi không?';
  const target = 'Đích: số lần rơi / km khi có bóng gần ≈ khi không có bóng';
  const g = s.ghosts;
  const all = [...g.groups, ...g.bySetting];
  if (!all.some((x) => x.runs)) return card(title, target, empty());
  const f = (v) => `${fmt(v, 2)} lần/km`;
  const bar = (map, x) => ({
    label: `${nameOf(map, x.key)} · ${fmt(x.runs)} ván`, value: x.runs ? x.perKm : null,
    tip: `${nameOf(map, x.key)}\n${fmt(x.deaths)} lần rơi / ${fmt(x.km, 1)} km\ntrung vị ${fmt(x.medianDist)} m`,
  });
  const on = g.bySetting.find((x) => x.key === 'on');
  return card(title, target,
    note('Rơi / km thay cho "% chết": ván nào cũng kết thúc bằng rơi, so độ dài trước khi rơi mới thấy bóng có gây chết sớm.')
    + panelTitle('Theo khoảng cách bóng lúc rơi')
    + hbars({ width: w, rows: g.groups.map((x) => bar(GROUP, x)), f, label: 'Rơi mỗi km theo bóng ma' })
    + panelTitle('Theo cài đặt bóng ma')
    + hbars({ width: w, rows: g.bySetting.map((x) => bar(SETTING, x)), f, label: 'Rơi mỗi km theo cài đặt' })
    + (on?.nearShare != null ? note(`Khi để Hiện: <b>${pct(on.nearShare)}</b> lần rơi có bóng ma trong 15 m.`) : '')
    + twin(['Nhóm', 'Ván', 'Lần rơi', 'Km', 'Rơi/km', 'Trung vị (m)', 'Có bóng gần'],
      all.map((x) => [nameOf({ ...GROUP, ...SETTING }, x.key), x.runs, x.deaths, fmt(x.km, 1), fmt(x.perKm, 2), x.medianDist, pct(x.nearShare)])));
}

const when = (ms) => {
  const t = new Date(ms + 7 * 3600_000).toISOString();
  return `${t.slice(11, 16)} ${t.slice(8, 10)}/${t.slice(5, 7)}`;
};

export function recentSection(s) {
  const rows = s.recent.map((r) => [r.name, r.dist, r.score, r.crash ? nameOf(KIND, r.crash) : '—', when(r.at), r.tainted ? 'bẩn' : '']);
  return card('Ván mới nhất', '', rows.length ? table(['Tên', 'Mét', 'Điểm', 'Đâm', 'Lúc (giờ VN)', ''], rows) : empty('Chưa có ván nào.'));
}
