// Dashboard cân bằng Studio Tycoon (game 50000b). Đọc stats.json SNAPSHOT nằm cạnh trang: bot chạy sim THẬT của game
// (50000b-devtools scripts/qa/balance-dashboard-data.ts), không có dữ liệu người chơi. Trang tĩnh trên github.io không
// chạy được sim, nên số chỉ mới khi có người chạy lại script và đẩy stats.json mới lên — dòng đầu trang ghi rõ ngày chạy.
import { STRATS, order, renderCharts } from './dash-sections.js';
import { FIELDS, flags, kpis, loadThresholds, saveThresholds } from './dash-flags.js';
import { compareTable, yearTable } from './dash-table.js';
import { money } from './dash-format.js';

const $ = (id) => document.getElementById(id);
let S = null, key = 'smart', th = null;

function header() {
  const g = S.game, p = S.params, d = new Date(S.generatedAt);
  $('range').textContent = `Snapshot ${d.toLocaleString('vi-VN')} · game ${g.commit}${g.dirty ? ' (có sửa chưa commit)' : ''} trên ${g.branch} · ` +
    `${p.seeds} seed × ${p.years} năm × ${p.strategies.length} chiến lược · bắt đầu ${S.settings.startMonth}/${S.settings.startYear} với ${money(S.settings.startCash)}`;
  $('src').innerHTML = order(S).map((k) => `<button data-k="${k}" aria-pressed="${k === key}"><i style="background:${STRATS[k]?.color ?? 'var(--other)'}"></i>${STRATS[k]?.name ?? k}</button>`).join('');
}

function render() {
  const st = S.strategies[key];
  $('note').textContent = `${STRATS[key]?.name ?? key}: ${STRATS[key]?.desc ?? ''}`;
  $('note').className = key === 'smart' ? 'note' : 'note warn';
  if (key !== 'smart') $('note').textContent += ' Mục tiêu của plan đo trên bot Smart; cờ ở chiến lược này chỉ để so.';
  $('kpis').innerHTML = kpis(S, st, th).map(([v, l, s]) => `<div class="kpi"><div class="v">${v}</div><div class="l">${l}</div><div class="s">${s}</div></div>`).join('');
  const fl = flags(S, st, th);
  $('flag-count').textContent = `${fl.filter((f) => !f.ok).length} lệch / ${fl.length} điểm kiểm`;
  $('flags').innerHTML = fl.map((f) => `<li><span class="badge${f.ok ? ' ok' : ''}">${f.ok ? '✓ đạt' : '▲ lệch'}</span><div><span class="what">${f.what}:</span> ${f.text}</div><span class="knob">Núm chỉnh: ${f.knob}</span></li>`).join('');
  // Năm còn quá ít studio chơi (thắng thì dừng, chết thì mất) cho trung vị của 2–3 studio: không vẽ, bảng vẫn hiện mờ.
  const rows = st.years.filter((r) => r.alive >= r.of * th.minAlive / 100);
  renderCharts(S, key, rows, $('tip'));
  yearTable($('years'), S, st, th);
  compareTable($('compare'), S, th);
}

function thresholds() {
  $('thresholds').innerHTML = FIELDS.map(([k, n]) => `<label>${n}<input type="number" data-k="${k}" value="${th[k]}"></label>`).join('');
  $('thresholds').addEventListener('input', (e) => {
    const k = e.target.dataset.k, v = Number(e.target.value);
    if (!k || !Number.isFinite(v)) return;
    th[k] = v;
    saveThresholds(th);
    render();
  });
}

$('src').addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  key = b.dataset.k;
  document.querySelectorAll('#src button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  render();
});
let resizeTimer;
addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => S && render(), 150); });

try {
  const r = await fetch('stats.json', { cache: 'no-store' });
  if (!r.ok) throw new Error(`stats.json ${r.status}`);
  S = await r.json();
  if (!S.strategies[key]) key = order(S)[0];
  th = loadThresholds(S.targets);
  header();
  thresholds();
  render();
} catch (e) {
  $('range').textContent = 'Không tải được số liệu: ' + e.message;
}
