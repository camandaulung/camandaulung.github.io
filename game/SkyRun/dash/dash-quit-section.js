// Câu 3 (03/11, anh Đức: "đoạn nào hay quit nhất: thua ở chỗ đó xong đóng game luôn"). Bỏ game = sau ván ≥ `gapMin` phút
// không bay lại. Số ở server/run-log-stats-quit.ts. Xếp theo SỐ LẦN bỏ (chỗ mất nhiều người nhất), tỉ lệ ghi kèm — đoạn
// hiếm người tới có tỉ lệ cao vì một hai ván, xếp theo tỉ lệ thì đứng đầu toàn nhiễu.
import { KIND, ZONE, card, empty, grid, half, kpis, nameOf, note, panelTitle, rvName, segText, table } from './dash-html.js';
import { fmt, hbars, pct } from './dash-svg.js';

const OUTCOME = { first: 'Ván đầu ở map này', pb: 'Vừa phá kỷ lục', near: 'Được ≥ nửa kỷ lục', far: 'Dưới nửa kỷ lục' };
const rateRow = (label, x) => ({ label: `${label} · ${fmt(x.known)} ván`, value: x.known ? x.rate : null, tip: `${label}\nbỏ ${fmt(x.quits)}/${fmt(x.known)} ván đã biết kết cục` });
const rateCells = (x) => [x.n, x.quits, x.known ? pct(x.rate, 1) : '—'];

export function quitSection(s, w) {
  const title = '3 · Rơi ở đâu thì người chơi bỏ game?';
  const q = s.quits;
  if (!q || !q.deaths.n) return card(title, '', empty());
  const target = `Bỏ game = rơi xong ${q.gapMin} phút không bay ván nào · ván cuối chưa đủ ${q.gapMin} phút thì chưa tính`;
  const pw = half(w);
  const spots = q.spots.filter((x) => x.quits > 0);
  const mid = q.midRun.abandon + q.midRun.close;
  return card(title, target,
    kpis([
      [pct(q.deaths.rate, 1), `ván rơi xong bỏ game (${fmt(q.deaths.quits)}/${fmt(q.deaths.known)})`],
      [pct(q.firstRun.rate), `người mới bỏ ngay sau ván đầu (${fmt(q.firstRun.quits)}/${fmt(q.firstRun.known)})`],
      [fmt(mid), `ván bỏ giữa chừng — ${fmt(q.midRun.abandon)} "Bỏ ván", ${fmt(q.midRun.close)} đóng tab`],
    ])
    + panelTitle('Chỗ người chơi rơi rồi bỏ game nhiều nhất (map · đoạn 250 m)')
    + (spots.length
      ? hbars({
        width: w, label: 'Chỗ bỏ game nhiều nhất', f: (v) => `${fmt(v)} lần bỏ`,
        rows: spots.map((x) => ({
          label: `${rvName(x.rv)} · ${segText(x.from, q.seg)} · ${nameOf(ZONE, x.zone)} · bỏ ${pct(x.rate)}`, value: x.quits,
          tip: `${fmt(x.quits)}/${fmt(x.known)} lần rơi ở đây rồi bỏ game\nhay rơi vì ${nameOf(KIND, x.kind)}`,
        })),
      })
      : empty('Chưa ai rơi rồi bỏ game trong khoảng này.'))
    + grid(w, [
      `<div>${panelTitle('Theo ván thứ mấy của người chơi')}${hbars({ width: pw, f: (v) => pct(v, 1), label: 'Tỉ lệ bỏ theo ván thứ N', rows: q.byIdx.map((x) => rateRow(`ván ${x.key}`, x)) })}</div>`,
      `<div>${panelTitle('Theo kết quả ván so với kỷ lục')}${hbars({ width: pw, f: (v) => pct(v, 1), label: 'Tỉ lệ bỏ theo kết quả ván', rows: q.byOutcome.map((x) => rateRow(OUTCOME[x.key], x)) })}</div>`,
    ])
    + note('Ván đầu tiên bỏ cao = người mới chưa thấy hay; "dưới nửa kỷ lục" bỏ cao hơn hẳn "vừa phá kỷ lục" = thua ức chế, xem lại đoạn đầu.')
    + grid(w, [
      `<div>${panelTitle('Theo vùng lúc rơi')}${table(['Vùng', 'Rơi', 'Bỏ', '% bỏ'], q.byZone.map((x) => [nameOf(ZONE, x.key), ...rateCells(x)]))}</div>`,
      `<div>${panelTitle('Theo chướng ngại làm rơi')}${table(['Chướng ngại', 'Rơi', 'Bỏ', '% bỏ'], q.byKind.map((x) => [nameOf(KIND, x.key), ...rateCells(x)]))}</div>`,
    ]));
}
