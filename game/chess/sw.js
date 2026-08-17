/* sw-template.js — khuon service worker, build.mjs dien hai cho __...__ vao
 *
 * Chien luoc: cache-first cho vo ung dung, mang truoc cho phan con lai.
 * Ban moi KHONG tu tai lai giua van — chi bao cho game biet, nguoi choi bam thi
 * moi doi. Bi doi ban giua luc dang danh co la mat van, khong chap nhan duoc.
 *
 * QUAN TRONG: danh sach precache PHAI CO file .wasm cua Stockfish. Thieu no thi
 * mo offline se bay duoc ban co ma meo khong bao gio di — loi kho lan nhat vi
 * trang van trong binh thuong. build.mjs co buoc kiem tra chan dung loi nay.
 */

const VERSION = '2f17dc7c';
const CACHE = 'cat-chess-' + VERSION;
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/style-a63fc1f4.css",
  "./assets/app-ecfcd5e4.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./vendor/stockfish/stockfish-nnue-16-single.js",
  "./vendor/stockfish/stockfish-nnue-16-single.wasm",
  "../../shared/portal-config.js",
  "../../shared/portal-games.js",
  "../../shared/portal-firebase.js",
  "../../shared/portal-auth.js",
  "../../shared/portal-cloud.js",
  "../../shared/portal-rank.js",
  "../../shared/portal-player.js"
];

self.addEventListener('install', ev => {
  /* KHONG goi skipWaiting() o day — va do la chu y.
   *
   * Goi thi ban moi tu chiem quyen ngay, nguoi choi dang giua van co the bi doi
   * ban duoi chan. De no nam CHO (`waiting`) thi game moi kip hien dai bao
   * "co ban moi — Tai lai" va de nguoi choi tu quyet (ui-update-notice.js).
   */
  /* `cache: 'reload'` BAT BUOC — dung bo di.
   *
   * `c.addAll(SHELL)` thuong se lay qua HTTP cache cua trinh duyet. GitHub Pages tra
   * index.html kem `max-age=600`, nen ban moi vua cai co the cache nham index.html CU
   * — trong khi cac file assets/app-<hash>.js thi ten moi nen luon tai tuoi.
   *
   * Ket qua: cache moi = HTML cu + assets moi. HTML cu tro toi ten file da bi xoa ca
   * o cache lan tren may chu -> 404 -> game chet han. DA XAY RA THAT tren ban phat
   * hanh: bam "Tai lai" xong trang trang, va vi cache da nhiem nen tai lai bao nhieu
   * lan cung the.
   *
   * `cache: 'reload'` buoc di thang ra mang, bo qua HTTP cache. */
  ev.waitUntil(caches.open(CACHE).then(
    c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' })))
  ));
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k.startsWith('cat-chess-') && k !== CACHE)
            .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== location.origin) return;   // khong dung vao yeu cau ben ngoai

  /* TRANG (HTML) thi MANG TRUOC, cache chi de du phong khi mat mang.
   *
   * Cac file assets/*-<hash>.* thi cache-first la dung: ten da chua hash noi dung nen
   * khong bao gio doi nghia. Nhung HTML thi ten co dinh, va no la cho DUY NHAT ghi ten
   * cac file kia. Cache-first cho HTML nghia la: mot lan cache nham ban cu la ket vinh
   * vien, vi ban cu tro toi ten file khong con ton tai.
   *
   * Doi lai: moi lan mo trang co mang thi ton mot yeu cau HTML (~4 KB). Re hon nhieu
   * so voi rui ro tren, va offline van chay vi da nga ve cache. */
  if (req.mode === 'navigate') {
    ev.respondWith(
      /* `cache: 'reload'` o day cung BAT BUOC, cung ly do voi buoc precache.
       *
       * `fetch(req)` thuong VAN di qua HTTP cache cua trinh duyet. GitHub Pages dat
       * max-age=600 cho HTML, nen trong 10 phut sau khi phat hanh, "mang truoc" van
       * co the nhan ve index.html CU — tro toi ten file da bi xoa khoi may chu. Dung
       * y nguyen kich ban da gay su co, chi khac duong di. */
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
          // Luu lai nhung gi tai duoc, de lan sau offline van co
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() => {
          // Mat mang va khong co trong cache: neu la trang thi tra trang chu
          if (req.mode === 'navigate') return caches.match('./index.html');
          return new Response('', { status: 504, statusText: 'Mất mạng' });
        });
    })
  );
});

self.addEventListener('message', ev => {
  const d = ev.data;

  /* Nguoi choi da bam "Tai lai" -> ban moi chiem quyen.
   * Trang tu tai lai o su kien `controllerchange` (xem ui-update-notice.js). */
  if (d && d.type === 'SKIP_WAITING') { self.skipWaiting(); return; }

  // Game hoi phien ban dang chay
  if (d === 'version' && ev.source) ev.source.postMessage({ type: 'version', version: VERSION });
});
