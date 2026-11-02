// Nguồn số của dashboard trên bản PORTAL (camandaulung.github.io/game/SkyRun/dash/). GitHub Pages không có GET /api/stats
// nên trang đọc dòng thô Firestore `skyRuns` rồi tự tính bằng run-log-stats.js — build.mjs đóng gói từ
// server/run-log-stats-browser.ts, tức CHÍNH parseRun + computeStats của server: hai bản dashboard ra cùng một hình Stats.
// Chặn thật là luật Firestore (CHỈ 2 tài khoản admin đọc được). Đăng nhập Google trên app Firebase MẶC ĐỊNH = phiên chung
// cả portal: đã đăng nhập ở trang danh sách game thì vào đây khỏi đăng nhập lại.
const SHARED = '../../../shared/';
/** Chỉ để báo lỗi đẹp — sửa thì sửa cả firestore.rules (khối skyRuns) + portal/game/index.html (chỗ giấu nút). */
const ADMINS = ['ducdm@vng.com.vn', 'minhducdl87@gmail.com'];
/** ~1 KB/ván: 20k ván ≈ 20 MB tải một lần — quá thì lấy các ván MỚI nhất, như trần MAX_SCAN của server. */
const LIMIT = 20000;
/** Portal.FB.limit chỉ đợi 8 s — đọc vài nghìn dòng qua long-polling lâu hơn thế. */
const READ_TIMEOUT = 45000;

function script(src) {
  return new Promise((ok, fail) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => ok();
    s.onerror = () => fail(new Error(`Không tải được ${src} — mất mạng?`));
    document.head.appendChild(s);
  });
}

let firebase = null;
async function fb() {
  if (!firebase) {
    firebase = (async () => {
      await script(`${SHARED}portal-config.js`);
      await script(`${SHARED}portal-firebase.js`);
      return window.Portal.FB.load();
    })();
    firebase.catch(() => (firebase = null));
  }
  return firebase;
}

function withTimeout(p, ms) {
  return Promise.race([p, new Promise((_, no) => setTimeout(() => no(new Error('Firestore không trả lời — thử lại sau.')), ms))]);
}

/** Dòng đã đọc cho khoảng DÀI nhất từng mở: bấm 30 → 7 ngày tính lại từ bản này (statsFromRows tự lọc ngày), không đọc
 *  lại Firestore — gói Spark chỉ 50k lượt đọc/ngày dùng chung cả portal, mỗi lần bấm bộ lọc tới 20k lượt (review 02/11).
 *  Muốn số mới thì tải lại trang. */
let cache = null;

/** `days` ngày VN tính cả hôm nay; `withDev` = gồm cả ván bản dựng chạy localhost (`?portal`, kênh 'dev'). */
export async function loadPortalStats(days, withDev) {
  const { statsFromRows } = await import('./run-log-stats.js');
  if (!cache || cache.days < days) await readRows(days);
  return statsFromRows(cache.rows.filter((r) => withDev || r.ch !== 'dev'), days, cache.now);
}

async function readRows(days) {
  const f = await fb();
  await f.auth.authStateReady();
  const u = f.auth.currentUser;
  const email = String((u && u.email) || '').toLowerCase();
  if (!u || u.isAnonymous || !u.emailVerified || !ADMINS.includes(email)) {
    const why = u && !u.isAnonymous ? `Tài khoản ${email || '(không email)'} không xem được log — chỉ 2 tài khoản admin.` : 'Đăng nhập Google bằng tài khoản admin để xem log ván.';
    throw Object.assign(new Error(why), { login: () => f.authM.signInWithPopup(f.auth, new f.authM.GoogleAuthProvider()) });
  }
  try {
    localStorage.setItem('skydash.admin', '1');   // cờ chung: trang danh sách game hiện các nút dashboard
  } catch {
    /* chặn localStorage: chỉ là không hiện nút */
  }
  const { sinceMs } = await import('./run-log-stats.js');
  const now = Date.now();
  const { collection, query, where, orderBy, limit, getDocs } = f.fsM;
  // Trần trên khớp luật (`at` ≤ giờ server + 1 giờ): dòng lệch giờ không chiếm chỗ của ván thật trong `limit`.
  const snap = await withTimeout(getDocs(query(collection(f.db, 'skyRuns'), where('at', '>=', sinceMs(days, now)),
    where('at', '<=', now + 3600000), orderBy('at', 'desc'), limit(LIMIT))), READ_TIMEOUT);
  cache = { days, now, rows: snap.docs.map((d) => d.data()) };
}
