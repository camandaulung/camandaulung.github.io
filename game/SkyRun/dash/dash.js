// Dashboard tune Sky Run (`/dash/`, plan 261102-1428 phase 02): đọc `GET /api/stats` (server/run-log-stats.ts) và vẽ
// 7 câu hỏi. Nằm sau SSO như game — mọi tài khoản zps xem được, trang chỉ có tên SSO, không email.
// `?demo` = số giả `demo-stats.json` (sinh bằng server/test-fixtures/make-demo-stats.ts, CÙNG đường tính của server).
// Bản portal (camandaulung.github.io, hoặc `?portal`): không có server → dash-portal-source.js đọc Firestore `skyRuns`
// (chỉ admin) và tính cùng hình Stats ngay trong trang; `?dev` gồm cả ván bản dựng chạy localhost.
import { dailySection, ghostSection, recentSection } from './dash-player-sections.js';
import { leadSection, survivalSection, tierSection } from './dash-flight-sections.js';
import { lanternRankSection, scoreSection } from './dash-score-sections.js';
import { esc, fmt, initTips } from './dash-svg.js';

const params = new URLSearchParams(location.search);
const demo = params.has('demo');
const portal = /\.github\.io$/.test(location.hostname) || params.has('portal');
const DAYS = [7, 14, 30, 60];
let days = DAYS.includes(Number(params.get('days'))) ? Number(params.get('days')) : 14;
let stats = null;
let drawnWidth = 0;

const root = document.getElementById('root');
const sub = document.getElementById('sub');
const filters = document.getElementById('filters');

const tile = (value, text) => `<div class="tile"><b>${esc(value)}</b><span>${esc(text)}</span></div>`;

function draw() {
  if (!stats) return;
  // Bề rộng TRONG thẻ (thẻ đệm 16 px mỗi bên) — SVG vẽ đúng số px này, không co giãn chữ.
  const w = Math.max(240, root.clientWidth - 32);
  drawnWidth = root.clientWidth;
  const s = stats;
  sub.innerHTML = `${esc(s.from === s.to ? s.to : `${s.from} → ${s.to}`)} (giờ VN)${demo ? '<span class="demo">SỐ GIẢ ?demo</span>' : ''}`;
  root.innerHTML = `<div class="tiles">${tile(fmt(s.used), 'ván sạch')}${tile(fmt(s.players), 'người chơi')}`
    + `${tile(fmt(s.tainted), 'ván bẩn đã loại')}${tile(fmt(s.altRuns), 'ván thử ?alt')}</div>`
    + (s.runs ? '' : '<p class="empty">Chưa có ván nào được log trong khoảng này — chơi một ván rồi tải lại.</p>')
    + [scoreSection, lanternRankSection, survivalSection, tierSection, leadSection, dailySection, ghostSection]
      .map((f) => f(s, w)).join('')
    + recentSection(s);
}

async function fetchStats() {
  if (portal && !demo) {
    const { loadPortalStats } = await import('./dash-portal-source.js');
    return loadPortalStats(days, params.has('dev'));
  }
  const url = demo ? 'demo-stats.json' : `../api/stats?days=${days}`;
  // redirect 'manual': hết phiên SSO thì proxy chuyển hướng sang trang đăng nhập — để fetch tự theo là lỗi mù.
  const r = await fetch(url, { credentials: 'include', cache: 'no-store', redirect: 'manual', headers: { accept: 'application/json' } });
  if (r.type === 'opaqueredirect' || r.status === 401) throw new Error('Phiên đăng nhập đã hết — tải lại trang (F5) để đăng nhập lại.');
  if (!r.ok) throw new Error(`Server trả ${r.status} — thử lại sau.`);
  return r.json();
}

async function load() {
  root.style.opacity = stats ? '0.5' : '';
  try {
    stats = await fetchStats();
    draw();
  } catch (e) {
    // Bản portal chưa đăng nhập admin: lỗi mang sẵn hàm `login` (popup Google phải chạy trong cú bấm của người dùng).
    const login = e && typeof e.login === 'function' ? e.login : null;
    root.innerHTML = `<p class="error">${esc(e instanceof Error ? e.message : String(e))}</p>`
      + (login ? '<p><button type="button" class="login" data-login>Đăng nhập Google</button></p>' : '');
    root.querySelector('[data-login]')?.addEventListener('click', () => login().then(load, (x) => {
      root.querySelector('.error').textContent = `Đăng nhập không xong: ${x && x.code ? x.code : x}`;
    }));
  } finally {
    root.style.opacity = '';
  }
}

function drawFilters() {
  // Số demo là một tệp cố định — bộ lọc ngày không có nghĩa, ẩn đi cho khỏi tưởng đang lọc.
  if (demo) return void (filters.hidden = true);
  filters.innerHTML = DAYS.map((d) => `<button type="button" data-days="${d}" aria-pressed="${d === days}">${d} ngày</button>`).join('');
}
filters.addEventListener('click', (e) => {
  const b = e.target.closest('button[data-days]');
  if (!b) return;
  days = Number(b.dataset.days);
  const u = new URL(location.href);
  u.searchParams.set('days', String(days));
  history.replaceState(null, '', u);
  drawFilters();
  void load();
});

let pending = 0;
addEventListener('resize', () => {
  clearTimeout(pending);
  pending = setTimeout(() => root.clientWidth !== drawnWidth && draw(), 150);
});

initTips(root);
drawFilters();
void load();
