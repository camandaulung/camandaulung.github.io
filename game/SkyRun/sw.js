/* sw-template.js — khuôn service worker của bản portal, build.mjs điền hai chỗ __...__ (chép từ games/cat-chess/,
 * giữ nguyên các lớp chống sự cố #2 "cache HTML nhiễm" ở CLAUDE.md gốc).
 *
 * Chiến lược: HTML mạng trước (cache chỉ để dự phòng mất mạng), còn lại cache-first + lưu dần thứ tải được.
 * Precache = vỏ game + người bay + SFX + thoại + ../../shared/ (CI portal kiểm dòng này). NHẠC NỀN (~13 MB, 9 bài) KHÔNG
 * precache: lượt cài sẽ tải hết cả 9 bài dù người chơi chỉ nghe một — bài nào đã phát thì nhánh fetch tự lưu.
 *
 * skipWaiting NGAY (khác cờ mèo, review 02/11): không có thì SW cũ giữ người bay GLB / SFX / shared/ tên cố định của bản
 * CŨ tới khi đóng hết tab, trong khi F5 đã chạy JS MỚI (rig lại người bay = số xương lệch). An toàn vì bản dựng chỉ có gói
 * nạp TĨNH (assets/index-*.js + assets/three-*.js từ 03/11, cùng tải lúc mở trang), không chunk tải lười nào để trang đang
 * chạy hụt; nhạc tên cố định vẫn còn trên server. Thêm import() động thì phải xem lại chỗ này. Cờ mèo
 * không skipWaiting vì đổi bản giữa ván cờ mất ván — ở đây trang đang chạy không bị tải lại, chỉ đổi cache bên dưới.
 */

const VERSION = 'd8265e83';
const CACHE = 'sky-run-' + VERSION;
const SHELL = [
  "./",
  "./assets/index-0WTHFGkU.css",
  "./assets/index-CrDpXpOp.js",
  "./assets/three-Ch2HMgvo.js",
  "./audio/crash.mp3",
  "./audio/dive-whoosh.mp3",
  "./audio/festival-whoosh.mp3",
  "./audio/flare-whoosh.mp3",
  "./audio/game-over.mp3",
  "./audio/lane-whoosh.mp3",
  "./audio/lantern-chime.mp3",
  "./audio/near-miss.mp3",
  "./audio/reveal-stinger.mp3",
  "./audio/run-start.mp3",
  "./audio/shield-hit.mp3",
  "./audio/shield-pickup.mp3",
  "./audio/smoke-hiss.mp3",
  "./audio/thermal-boost.mp3",
  "./audio/voice/bien-may.mp3",
  "./audio/voice/cap-treo.mp3",
  "./audio/voice/cat-canh.mp3",
  "./audio/voice/chang-vang.mp3",
  "./audio/voice/cong-troi.mp3",
  "./audio/voice/cot-gio.mp3",
  "./audio/voice/dem-hoi.mp3",
  "./audio/voice/den-troi-chuoi.mp3",
  "./audio/voice/dinh-fansipan.mp3",
  "./audio/voice/du-cuu.mp3",
  "./audio/voice/du-du-phong.mp3",
  "./audio/voice/dx-bay-kieu-gi.mp3",
  "./audio/voice/dx-de-ma.mp3",
  "./audio/voice/dx-ky-luc-cuoi.mp3",
  "./audio/voice/dx-nhin-duong.mp3",
  "./audio/voice/dx-thap-dung-yen.mp3",
  "./audio/voice/dx-vach-dung-yen.mp3",
  "./audio/voice/ha-canh.mp3",
  "./audio/voice/khe-da.mp3",
  "./audio/voice/khen-ai-can.mp3",
  "./audio/voice/khen-bay-pro.mp3",
  "./audio/voice/khen-dep-lam.mp3",
  "./audio/voice/khen-sat-rat.mp3",
  "./audio/voice/khen-tay-lai-lua.mp3",
  "./audio/voice/ky-luc.mp3",
  "./audio/voice/luong-nhiet.mp3",
  "./audio/voice/ma-pi-leng.mp3",
  "./audio/voice/mat-xoay-may.mp3",
  "./audio/voice/ngan-co-len.mp3",
  "./audio/voice/ngan-da-qua.mp3",
  "./audio/voice/ngan-dep-qua.mp3",
  "./audio/voice/ngan-di-ne.mp3",
  "./audio/voice/ngan-ghe-chua.mp3",
  "./audio/voice/ngan-hay.mp3",
  "./audio/voice/ngan-hu-hon.mp3",
  "./audio/voice/ngan-len-nao.mp3",
  "./audio/voice/ngan-ngon.mp3",
  "./audio/voice/ngan-ngot.mp3",
  "./audio/voice/ngan-nhanh-ghe.mp3",
  "./audio/voice/ngan-oi-khong.mp3",
  "./audio/voice/ngan-oi.mp3",
  "./audio/voice/ngan-rang-len.mp3",
  "./audio/voice/ngan-sat-ghe.mp3",
  "./audio/voice/ngan-them-ne.mp3",
  "./audio/voice/ngan-tiec-ghe.mp3",
  "./audio/voice/ngan-troi-oi.mp3",
  "./audio/voice/ngan-ui-da.mp3",
  "./audio/voice/ngan-ui.mp3",
  "./audio/voice/ngan-wiii.mp3",
  "./audio/voice/ngan-xem-xiu.mp3",
  "./audio/voice/ngan-yeah.mp3",
  "./audio/voice/pk-bay-thoi.mp3",
  "./audio/voice/pk-cay-mat.mp3",
  "./audio/voice/pk-gom-den.mp3",
  "./audio/voice/pk-hu-hon.mp3",
  "./audio/voice/pk-ky-luc-chop.mp3",
  "./audio/voice/pk-len-duong.mp3",
  "./audio/voice/pk-nhanh-qua.mp3",
  "./audio/voice/pk-pha-ky-luc.mp3",
  "./audio/voice/pk-phe-qua.mp3",
  "./audio/voice/pk-quay-len.mp3",
  "./audio/voice/qua-dinh.mp3",
  "./audio/voice/song-nho-que.mp3",
  "./audio/voice/suoi-muong-hoa.mp3",
  "./audio/voice/suot-dep.mp3",
  "./audio/voice/thung-lung.mp3",
  "./audio/voice/tiec-lam-lai.mp3",
  "./audio/voice/tiec-mot-tim.mp3",
  "./audio/voice/tiec-nhay-lai.mp3",
  "./audio/voice/tiec-rot-may.mp3",
  "./audio/voice/tiec-suyt-ky-luc.mp3",
  "./audio/voice/tiec-xem.mp3",
  "./audio/voice/treu-cabin.mp3",
  "./audio/voice/treu-hon-vach.mp3",
  "./audio/voice/treu-khoi-dong.mp3",
  "./audio/voice/treu-lai-nua.mp3",
  "./audio/voice/treu-moi-cat-canh.mp3",
  "./audio/voice/troi-khoi-may.mp3",
  "./audio/voice/vao-hang.mp3",
  "./audio/voice/xuyen-may.mp3",
  "./audio/wind-loop.mp3",
  "./icons/apple-touch-icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-32.png",
  "./index.html",
  "./models/pilot.glb",
  "./ui/logo.webp",
  "./ui/map-fansipan.webp",
  "./ui/map-ha-giang.webp",
  "./ui/map-khau-pha.webp",
  "./ui/map-mu-cang-chai.webp",
  "../../shared/portal-config.js",
  "../../shared/portal-firebase.js"
];

/* `cache: 'reload'` BẮT BUỘC cho HTML + shared/ (tên cố định): GitHub Pages trả max-age=600, addAll thường đọc HTTP cache
 * → cache mới = HTML CŨ + gói JS mới → 404 → trắng trang (sự cố thật ở cờ mèo). Media .glb/.mp3 dùng 'no-cache': hỏi lại
 * server bằng ETag — trang vừa tải người bay 2 MB + SFX ngay trước lượt cài thì server trả 304, không tải lần hai trên 4G;
 * đọc thẳng HTTP cache (max-age 600) thì deploy trong 10 phút là đóng băng byte CŨ vào cache của bản MỚI. */
const fresh = u => new Request(u, { cache: /\.(glb|mp3)$/.test(u) ? 'no-cache' : 'reload' });

self.addEventListener('install', ev => {
  ev.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(fresh))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('sky-run-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;            // Firebase, font Google: không đụng
  /* Dashboard /dash nằm TRONG phạm vi SW này nhưng file tên cố định không hash — cache-first là trang tune kẹt bản cũ
     tới lần SW đổi phiên bản. Để nó đi thẳng mạng (cả `/dash` không gạch chéo: GitHub Pages 301 sang `/dash/`).
     /api/ + /healthz: chỉ bản zingplay có — lỡ sw.js lọt sang đó (dist/ dùng chung, xem pack-deploy.mjs) thì BXH / bóng ma
     / ping SSO KHÔNG được thành cache-first đứng im mãi. */
  if (/\/dash(\/|$)|\/api\/|\/healthz$/.test(url.pathname)) return;

  if (req.mode === 'navigate') {
    ev.respondWith(
      // `cache: 'reload'` ở đây cũng bắt buộc — cùng lý do với lượt precache (HTML max-age=600).
      fetch(new Request(req.url, { cache: 'reload', credentials: 'same-origin' }))
        .then(res => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  ev.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;
      return fetch(req)
        .then(res => {
          // Lưu thứ tải được (bài nhạc đã phát, gói lazy) — lần sau mất mạng vẫn có.
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() => new Response('', { status: 504, statusText: 'Mất mạng' }));
    })
  );
});
