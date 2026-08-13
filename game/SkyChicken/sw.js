/* sw-template.js — mẫu service worker, build.mjs sẽ thay hai chỗ đánh dấu
 *
 * Khác bản viết tay trước đây ở hai điểm:
 *   - Tên cache lấy theo hash nội dung nên không phải nhớ tăng số bằng tay
 *   - Có kênh nhận lệnh SKIP_WAITING để game hỏi người chơi trước khi tải lại,
 *     thay vì tự đổi bản giữa lúc đang chơi
 */

const CACHE = 'sky-chicken-b755d0a6';

const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/style-89ffc7fd.css",
  "./assets/app-2476f6a8.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./assets/fonts/chakra-petch-600-latin.woff2",
  "./assets/fonts/chakra-petch-600-viet.woff2",
  "./assets/fonts/chakra-petch-700-latin.woff2",
  "./assets/fonts/chakra-petch-700-viet.woff2"
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      // nạp từng file để một file lỗi không làm hỏng cả mẻ
      .then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => null))))
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
