// Dashboard Toy Tower: lấy /api/stats, vẽ KPI + 2 biểu đồ + bảng có cờ. Số liệu tính ở server (web/run-stats.mjs);
// ở đây chỉ có NGƯỠNG CẢNH BÁO (chỉnh được, nhớ trong localStorage) và trình bày.
import { drawLines, drawStars } from './dash-charts.js';

const $ = id => document.getElementById(id);
const pct = v => (v == null ? '–' : Math.round(v * 100) + '%');
const num = v => (v == null ? '–' : Number.isInteger(v) ? String(v) : v.toFixed(1));
const KEY = 'toy-dash-thresholds';
const DEFAULTS = { star3: 60, easy: 90, hard: 20, retry: 50, abandon: 25, minN: 10 };
const FIELDS = [
  ['star3', '3★ quá cao từ (% lượt thắng)'], ['easy', 'Quá dễ: win rate từ (%)'], ['hard', 'Quá khó: win rate tới (%)'],
  ['retry', 'Dễ bỏ cuộc: thử lại dưới (%)'], ['abandon', 'Bỏ giữa trận từ (%)'], ['minN', 'Mẫu tối thiểu (lượt hoàn tất)']
];
const COLS = [
  ['lv', 'Màn'], ['finished', 'Lượt'], ['players', 'Người'], ['winRate', 'Win rate'], ['firstTryWin', 'Thắng lần đầu'],
  ['retryRate', 'Thử lại sau thua'], ['recoverRate', 'Vượt sau thua'], ['triesToWinMedian', 'Lượt tới thắng'],
  ['starsMedian', 'Sao (trung vị)'], ['star3Share', '3★'], ['abandonRate', 'Bỏ giữa trận'], ['secsMedian', 'Thời gian thắng'], ['flags', 'Cờ']
];
let th = { ...DEFAULTS };
try { th = { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { /* trình duyệt chặn lưu — dùng mặc định */ }
let src = 'player', data = null, sort = { k: 'lv', dir: 1 };

function flags(l) {
  const out = [];
  if (l.finished < th.minN) return [{ t: `Mẫu ít (${l.finished})`, soft: true }];
  if ((l.star3Share ?? 0) * 100 >= th.star3 && l.wins >= th.minN) out.push({ t: `3★ quá cao ${pct(l.star3Share)}` });
  if (l.winRate * 100 >= th.easy) out.push({ t: 'Quá dễ' });
  if (l.winRate * 100 <= th.hard) out.push({ t: 'Quá khó' });
  if (l.loseUsers >= th.minN / 2 && l.retryRate * 100 < th.retry) out.push({ t: `Thua xong bỏ (${pct(l.retryRate)} thử lại)` });
  if ((l.abandonRate ?? 0) * 100 >= th.abandon) out.push({ t: `Bỏ giữa trận ${pct(l.abandonRate)}` });
  return out;
}

function kpis(o) {
  const items = [
    [o.runs, 'Lượt chơi', `${o.levels} màn có log`], [o.players, 'Người chơi', 'ẩn danh'],
    [pct(o.winRate), 'Win rate', 'thắng / lượt hoàn tất'], [pct(o.firstTryWin), 'Thắng lần đầu', 'cặp người × màn'],
    [pct(o.retryRate), 'Thử lại sau thua', 'còn chơi thêm sau lần thua đầu'], [num(o.starsMedian), 'Trung vị sao', `3★ chiếm ${pct(o.star3Share)} lượt thắng`]
  ];
  $('kpis').innerHTML = items.map(([v, l, s]) => `<div class="kpi"><div class="v">${v}</div><div class="l">${l}</div><div class="s">${s}</div></div>`).join('');
}

function table(levels) {
  const rows = levels.map(l => ({ ...l, flagList: flags(l) }));
  const val = (r, k) => (k === 'flags' ? r.flagList.length : r[k]);
  rows.sort((a, b) => ((val(a, sort.k) ?? -1) - (val(b, sort.k) ?? -1)) * sort.dir);
  const bar = v => (v == null ? '<span class="dim">–</span>' : `<span class="cell">${pct(v)}<span class="bar"><i style="width:${Math.round(v * 100)}%"></i></span></span>`);
  const head = COLS.map(([k, n]) => `<th data-k="${k}"${sort.k === k ? ` aria-sort="${sort.dir > 0 ? 'ascending' : 'descending'}"` : ''}>${n}${sort.k === k ? (sort.dir > 0 ? ' ▲' : ' ▼') : ''}</th>`).join('');
  const body = rows.map(r => `<tr><td><b>${r.lv}</b></td><td>${r.finished}${r.abandons ? ` <span class="dim">(+${r.abandons} bỏ)</span>` : ''}</td><td>${r.players}</td>` +
    `<td>${bar(r.winRate)}</td><td>${bar(r.firstTryWin)}</td><td>${bar(r.retryRate)}</td><td>${pct(r.recoverRate)}</td>` +
    `<td>${num(r.triesToWinMedian)}</td><td>${num(r.starsMedian)}</td><td>${pct(r.star3Share)}</td><td>${pct(r.abandonRate)}</td>` +
    `<td>${r.secsMedian == null ? '–' : r.secsMedian + ' s'}</td>` +
    `<td class="flags">${r.flagList.map(f => `<span class="badge${f.soft ? ' soft' : ''}">${f.soft ? '' : '▲ '}${f.t}</span>`).join('') || '<span class="dim">ổn</span>'}</td></tr>`).join('');
  $('table').innerHTML = `<thead><tr>${head}</tr></thead><tbody>${body}</tbody>`;
  $('table').querySelectorAll('th').forEach(h => h.addEventListener('click', () => {
    sort = { k: h.dataset.k, dir: sort.k === h.dataset.k ? -sort.dir : (h.dataset.k === 'lv' ? 1 : -1) };
    table(data.levels);
  }));
}

function charts() {
  const lv = data.levels, tip = $('tip');
  const series = [
    { name: 'Win rate', short: 'Win rate', color: 'var(--s1)', get: l => l.winRate },
    { name: 'Thắng lần đầu', short: 'Thắng lần đầu', color: 'var(--s2)', get: l => l.firstTryWin },
    { name: 'Thử lại sau thua', short: 'Thử lại', color: 'var(--s3)', get: l => l.retryRate }
  ];
  $('legend-lines').innerHTML = series.map(s => `<span><i style="background:${s.color}"></i>${s.name}</span>`).join('');
  $('legend-stars').innerHTML = [['--star3', '3★'], ['--star2', '2★'], ['--star1', '1★']].map(([c, n]) => `<span><i style="background:var(${c})"></i>${n}</span>`).join('');
  drawLines($('chart-lines'), lv, series, tip);
  drawStars($('chart-stars'), lv, th.star3 / 100, tip);
}

function render() {
  const o = data.overall;
  const from = data.from ? new Date(data.from).toLocaleDateString('vi-VN') : null, to = data.to ? new Date(data.to).toLocaleDateString('vi-VN') : null;
  $('range').textContent = o.runs ? `${o.runs} lượt · ${from === to ? from : `${from} → ${to}`}` : 'Chưa có lượt nào';
  const note = $('note');
  note.hidden = !!o.runs && src !== 'bot';
  if (!o.runs) note.textContent = src === 'player'
    ? `Chưa có log người chơi thật — log chỉ bắt đầu ghi từ bản deploy có tính năng này (trước đó server chỉ giữ sao tốt nhất). ${data.sources.bot ? `Có ${data.sources.bot} lượt bot — bấm "Bot (sim)" để xem thử.` : ''}`
    : 'Không có lượt nào ở nguồn này.';
  else if (src === 'bot') { note.hidden = false; note.textContent = 'Đây là log BOT (sim): dùng để đọc độ khó / sao, KHÔNG phản ánh hành vi thử lại hay lần đầu của người thật.'; }
  kpis(o); charts(); table(data.levels);
}

function thresholds() {
  $('thresholds').innerHTML = FIELDS.map(([k, n]) => `<label>${n}<input type="number" min="0" max="100" data-k="${k}" value="${th[k]}"></label>`).join('');
  $('thresholds').addEventListener('input', e => {
    const k = e.target.dataset.k, v = Number(e.target.value);
    if (!k || !Number.isFinite(v)) return;
    th[k] = v;
    try { localStorage.setItem(KEY, JSON.stringify(th)); } catch { /* không lưu được cũng không sao */ }
    if (data) { charts(); table(data.levels); }
  });
}

// Hai chế độ cùng một mã (MỘT nguồn ở portal/game/toy-dash/):
//  · LIVE  — trang do server game phục vụ (toy-tower.zingplay.dev/dash/, sau SSO): gọi thẳng /api/stats.
//  · SNAPSHOT — trang trên camandaulung.github.io/game/toy-dash/ (tĩnh, KHÔNG với tới server sau SSO): đọc stats.json nằm
//    cạnh trang = {generatedAt, player, bot, all}. Cách có file: mở bản LIVE → "Xuất stats.json" → chép vào thư mục này → đẩy main.
const LIVE = location.pathname.startsWith('/dash');
let snapshot = null;

async function load() {
  try {
    if (LIVE) {
      const r = await fetch('/api/stats?src=' + src, { credentials: 'same-origin', cache: 'no-store' });
      if (!r.ok) throw new Error(r.status);
      data = await r.json();
    } else {
      if (!snapshot) {
        const r = await fetch('stats.json', { cache: 'no-store' });
        if (!r.ok) throw new Error('chưa có stats.json cạnh trang (xem hướng dẫn xuất snapshot)');
        snapshot = await r.json();
      }
      data = snapshot[src];
    }
    render();
    if (!LIVE && snapshot.generatedAt) $('range').textContent += ` · snapshot ${new Date(snapshot.generatedAt).toLocaleString('vi-VN')}`;
  } catch (e) { $('range').textContent = 'Không tải được log: ' + e.message; }
}

// Chỉ ở bản LIVE: tải về đúng file stats.json mà bản portal đọc (số tổng hợp ẩn danh, không email / tên).
function exportButton() {
  if (!LIVE) return;
  const b = document.createElement('button');
  b.textContent = 'Xuất stats.json';
  b.title = 'Tải snapshot (player + bot + all) để chép vào portal/game/toy-dash/';
  b.addEventListener('click', async () => {
    const r = await fetch('/api/snapshot', { credentials: 'same-origin', cache: 'no-store' });
    if (!r.ok) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(await r.blob());
    a.download = 'stats.json';
    a.click();
    URL.revokeObjectURL(a.href);
  });
  $('src').appendChild(b);
}

$('src').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b || !b.dataset.src) return;   // nút "Xuất stats.json" cũng nằm trong #src
  src = b.dataset.src;
  document.querySelectorAll('#src button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  load();
});
let resizeTimer;
addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => data && charts(), 150); });
thresholds();
exportButton();
load();
