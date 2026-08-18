/* sw-template.js — mẫu service worker, build.mjs sẽ thay hai chỗ đánh dấu
 *
 * Khác bản viết tay trước đây ở hai điểm:
 *   - Tên cache lấy theo hash nội dung nên không phải nhớ tăng số bằng tay
 *   - Có kênh nhận lệnh SKIP_WAITING để game hỏi người chơi trước khi tải lại,
 *     thay vì tự đổi bản giữa lúc đang chơi
 */

const CACHE = 'sky-chicken-8967ad80';

const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/style-be05b917.css",
  "./assets/app-4160e857.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./assets/fonts/chakra-petch-600-latin.woff2",
  "./assets/fonts/chakra-petch-600-viet.woff2",
  "./assets/fonts/chakra-petch-700-latin.woff2",
  "./assets/fonts/chakra-petch-700-viet.woff2",
  "../../shared/portal-config.js",
  "../../shared/portal-games.js",
  "../../shared/portal-firebase.js",
  "../../shared/portal-auth.js",
  "../../shared/portal-cloud.js",
  "../../shared/portal-rank.js",
  "../../shared/portal-player.js"
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      // nạp từng file để một file lỗi không làm hỏng cả mẻ
      //
      // `cache: 'reload'` BẮT BUỘC — đừng bỏ đi. `c.add(u)` thường sẽ lấy qua HTTP
      // cache của trình duyệt. GitHub Pages trả index.html kèm `max-age=600`, nên bản
      // mới vừa cài có thể cache nhầm index.html CŨ — trong khi assets/app-<hash>.js
      // tên mới nên luôn tải tươi. Cache mới = HTML cũ + assets mới, mà HTML cũ trỏ
      // tới tên file đã bị xoá cả ở cache lẫn trên máy chủ → 404.
      // Đã xảy ra thật trên bản phát hành của cờ vua.
      .then(c => Promise.all(
        SHELL.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => null))
      ))
    // KHÔNG gọi skipWaiting ở đây: chờ người chơi bấm "tải lại" mới đổi bản
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Game gửi lệnh này khi người chơi đồng ý cập nhật */
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  /* TRANG (HTML) thì MẠNG TRƯỚC, cache chỉ để dự phòng khi mất mạng.
     Các file assets/*-<hash>.* thì stale-while-revalidate là đúng: tên đã chứa hash nội
     dung nên không bao giờ đổi nghĩa. Nhưng HTML thì tên cố định, và nó là chỗ DUY NHẤT
     ghi tên các file kia — trả bản cũ ra là trỏ tới tên file không còn tồn tại. */
  if (req.mode === 'navigate') {
    e.respondWith(
      /* `cache: 'reload'` ở đây cũng BẮT BUỘC, cùng lý do với bước precache. `fetch(req)`
         thường VẪN đi qua HTTP cache của trình duyệt; GitHub Pages đặt max-age=600 cho
         HTML nên trong 10 phút sau khi phát hành, "mạng trước" vẫn có thể nhận về
         index.html CŨ — trỏ tới tên file đã bị xoá khỏi máy chủ. */
      fetch(new Request(req.url, { cache: 'reload', credentials: 'same-origin' }))
        .then(res => {
          if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
          return res;
        })
        .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  // stale-while-revalidate: trả cache ngay cho nhanh, tải bản mới ở nền
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(req).then(cached => {
        const fresh = fetch(req)
          .then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; })
          .catch(() => cached);          // mất mạng: dùng lại bản đã lưu
        return cached || fresh;
      })
    )
  );
});
