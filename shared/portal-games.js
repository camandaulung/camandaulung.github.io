/* portal-games.js — danh sach game, MOT cho khai bao duy nhat
 *
 * Truoc day ten game nam rai rac: trang danh sach, trang ho so, luat Firestore, ma
 * tung game. Them mot game la phai nho sua du bon cho — chac chan co lan quen mot.
 *
 * Trang danh sach va trang ho so DOC TU DAY thay vi viet cung. Them game = them mot
 * dong o day.
 */

window.Portal = window.Portal || {};

/* `thuMuc` la TEN THU MUC TRAN, khong phai duong dan san.
 *
 * Ban truoc ghi './SkyChicken/'. Duong dan do dung o trang danh sach (dat tai /game/)
 * nhung SAI o trang ho so (/game/me/): './SkyChicken/' ra '/game/me/SkyChicken/'.
 * Duong dan chi dung khi biet trang goi dang dung o dau, ma file khai bao thi khong
 * biet — nen no chi giu ten, con trang tu ghep tien to cua minh. */
Portal.GAMES = [
  {
    id: 'skychicken',
    ten: 'Sky Chicken',
    bieuTuong: '🐔',
    thuMuc: 'SkyChicken',
    scoreDoc: 'scores',
    /* Cac tieu chi xep hang. `dir: 'asc'` cho thoi gian — cang nho cang tot.
     *
     * `chinh: true` la tieu chi DUY NHAT duoc hoi thu hang tren may chu. Hoi ca ba la
     * ba luot dem cho moi game; nhan voi so game thi mot lan mo ho so ton hang chuc
     * luot doc, trong khi hai tieu chi kia chi de xem. */
    tieuChi: [
      { khoa: 'highestLevel', nhan: 'Màn cao nhất', chinh: true },
      { khoa: 'totalStars',   nhan: 'Tổng sao' },
      { khoa: 'bestTime',     nhan: 'Thời gian', dir: 'asc', donVi: 'giây' }
    ]
  },
  {
    id: 'chess',
    ten: 'Cờ vua với mèo',
    bieuTuong: '♟',
    thuMuc: 'chess',
    scoreDoc: 'chessScores',
    tieuChi: [
      { khoa: 'bestEloBeaten', nhan: 'Mức cao nhất đã thắng' },
      /* Diem meo lam tieu chi chinh chu khong phai muc Elo: no thuong ca nguoi choi
         BEN chu khong chi nguoi GIOI, nen bang xep hang co nhieu nguoi hon. */
      { khoa: 'catPoints',     nhan: 'Điểm mèo', chinh: true },
      { khoa: 'bestStreak',    nhan: 'Chuỗi thắng' }
    ]
  }
];

Portal.gameById = id => Portal.GAMES.find(g => g.id === id) || null;

/* Duong dan tu MOT GAME sang trang ho so, hoac null khi khong co portal.
 *
 * Tra null thi game PHAI AN nut di. Mot nut dan toi trang 404 con te hon la khong co
 * nut — nguoi choi bam xong khong hieu minh vua lam hong cai gi.
 *
 * CACH NHAN BIET: xem thu muc dang dung co PHAI ten thu muc trong portal khong.
 *
 *   camandaulung.github.io/game/chess/   -> 'chess' co trong bang  -> ../me/
 *   localhost/games/sky-chicken-invader/ -> ten thu muc ma nguon    -> null
 *   localhost:8123/                      -> o goc                   -> null
 *   file://...                           -> khong co portal         -> null
 *
 * Ban dau chi kiem "co thu muc cha khong". Nhung o may dev, Sky Chicken chay tai
 * /games/sky-chicken-invader/ — VAN co thu muc cha, nen no sinh ra lien ket toi
 * /games/me/ la trang khong ton tai. So voi bang ten thu muc thi phan biet duoc
 * dung ban da deploy voi ban dang sua, ma khong phai hoi mang.
 */
Portal.THU_MUC_HO_SO = 'me';

Portal.duongDanHoSo = function () {
  if (location.protocol === 'file:') return null;

  const parts = location.pathname.split('/').filter(Boolean);
  if (parts.length && parts[parts.length - 1].indexOf('.') >= 0) parts.pop();
  if (!parts.length) return null;

  const thuMuc = parts[parts.length - 1];
  if (thuMuc === Portal.THU_MUC_HO_SO) return null;        // chinh no la trang ho so
  if (!Portal.GAMES.some(g => g.thuMuc === thuMuc)) return null;

  return '../' + Portal.THU_MUC_HO_SO + '/';
};
