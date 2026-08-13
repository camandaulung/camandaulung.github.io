/* ===== js/data-balance.js ===== */
/* data-balance.js — TỆP SINH TỰ ĐỘNG, ĐỪNG SỬA TAY
 *
 * Nguồn sự thật là  balance/sky-chicken-balance.xlsx
 * Sửa Excel xong chạy:  npm run balance
 * (tương đương: python tools/balance-xlsx-to-js.py)
 *
 * Tệp này nạp TRƯỚC mọi tệp khác. Các tệp dữ liệu đọc số ở đây qua SC.bal(),
 * thiếu khoá nào thì tự dùng số mặc định viết cứng trong chính tệp đó — nên xoá
 * mất tệp này game vẫn chạy đúng như cũ.
 */

window.SC = window.SC || {};

SC.BALANCE = {
  "upgrades": {
    "hp": {"max": 10, "costs": [40, 62, 96, 149, 231, 358, 555, 860, 1333, 2066]},
    "dmg": {"max": 10, "costs": [50, 78, 121, 187, 290, 450, 697, 1080, 1674, 2595]},
    "rate": {"max": 8, "costs": [45, 70, 108, 168, 260, 403, 625, 969]},
    "wpn": {"max": 4, "costs": [280, 620, 1350, 2150]},
    "shield": {"max": 8, "costs": [60, 93, 144, 223, 346, 536, 831, 1288]},
    "wing": {"max": 5, "costs": [180, 330, 600, 900, 1150]},
    "gold": {"max": 10, "costs": [55, 85, 132, 205, 318, 493, 764, 1184, 1835, 2844]}
  },
  "power": {
    "weight": {"dmg": 0.28, "wpn": 0.24, "wing": 0.17, "rate": 0.15, "hp": 0.09, "shield": 0.07},
    "scale": {"den": 0.9, "hp": 1.6, "dmg": 1, "fire": 0.8, "spd": 0.45, "orbit": 1.6}
  },
  "enemies": {
    "chick": {"hp": 3, "r": 15, "spd": 62, "score": 10, "drop": 0.3, "fire": 0, "move": "sine"},
    "hen": {"hp": 10, "r": 22, "spd": 44, "score": 26, "drop": 0.48, "fire": 2.1, "move": "hover"},
    "egg": {"hp": 2, "r": 12, "spd": 118, "score": 6, "drop": 0.18, "fire": 0, "move": "drop"},
    "dive": {"hp": 6, "r": 17, "spd": 92, "score": 20, "drop": 0.34, "fire": 0, "move": "dive"},
    "ufo": {"hp": 14, "r": 20, "spd": 40, "score": 34, "drop": 0.55, "fire": 1.5, "move": "strafe"},
    "tank": {"hp": 34, "r": 28, "spd": 26, "score": 58, "drop": 0.8, "fire": 2.6, "move": "push"}
  },
  "items": [
    {"k": "coin", "w": 44, "c": "#ffd23f", "ic": "◈"},
    {"k": "power", "w": 20, "c": "#ff8a2b", "ic": "⚡"},
    {"k": "heal", "w": 13, "c": "#4dff9f", "ic": "✚"},
    {"k": "shield", "w": 11, "c": "#3fe0ff", "ic": "◇"},
    {"k": "bomb", "w": 7, "c": "#ff3b5c", "ic": "✺"},
    {"k": "gem", "w": 5, "c": "#c58cff", "ic": "★"}
  ],
  "levels": {
    "density": 1.4,
    "levelsPerBiome": 6,
    "chunk": [{"name": "SIÊU DỄ", "mul": 0.68}, {"name": "VỪA", "mul": 0.95}, {"name": "KHÓ", "mul": 1.3}, {"name": "DỄ", "mul": 0.82}, {"name": "KHÁ KHÓ", "mul": 1.15}, {"name": "SIÊU KHÓ", "mul": 1.62}],
    "waveCurve": {"normal": [0.62, 0.88, 1.2, 1.55], "boss": [0.75, 1.05, 1.4]},
    "curve": {"perWaveBase": 9, "perWaveStep": 0.42, "hpStep": 0.167, "hpChunkFactor": 0.45, "spdStep": 0.02, "fireStep": 0.033, "fireChunkFactor": 0.5, "bossHPFinal": 1500, "bossHPMini": 1000, "bossHPStep": 0.335, "startWeaponEvery": 7, "startWeaponCap": 4, "wavesNormal": 4, "wavesBoss": 3}
  },
  "player": {
    "playerHP": 100,
    "playerRadius": 19,
    "playerFollow": 0.34,
    "iFrame": 0.9,
    "fireBase": 0.14,
    "maxWeapon": 10,
    "comboWindow": 1.6,
    "maxCombo": 10,
    "lootSpeed": 380,
    "touchSens": 1.18
  },
  "reward": {
    "clearBonusBase": 12,
    "clearBonusPerStar": 12
  }
};

/* Đọc một giá trị theo đường dẫn "levels.curve.hpStep"; thiếu thì trả về mặc định.
   Nhờ vậy thêm khoá mới vào Excel không bắt buộc phải sửa mã, và ngược lại. */
SC.bal = function (path, def) {
  let v = SC.BALANCE;
  for (const k of path.split('.')) {
    if (v === null || typeof v !== 'object' || !(k in v)) return def;
    v = v[k];
  }
  return v === undefined ? def : v;
};

;
/* ===== js/core-config.js ===== */
/* core-config.js — hằng số toàn cục + tiện ích toán học dùng chung */
window.SC = window.SC || {};

SC.W = 540;   // bề ngang ảo — cố định để gameplay đồng nhất mọi thiết bị
SC.H = 960;   // chiều cao ảo — SC.View.layout() tính lại theo tỉ lệ màn hình

SC.CFG = {
  touchSens: 1.18,          // hệ số kéo khi chơi bằng cảm ứng (kéo tương đối)
  fxScale: 1,               // hệ số số lượng hạt hiệu ứng (giảm còn 0.65 trên mobile)
  playerFollow: 0.34,       // độ mượt khi máy bay bám con trỏ (lerp)
  playerRadius: 19,
  playerHP: 100,
  iFrame: 0.9,              // thời gian bất tử sau khi trúng đòn (giây)
  autoLootRadius: 9999,     // auto loot: hút item toàn màn hình
  lootSpeed: 380,
  fireBase: 0.14,           // giãn cách bắn cơ bản (giây)
  maxWeapon: 8,
  comboWindow: 1.6,         // thời gian giữ combo giữa 2 lần hạ địch
  maxCombo: 8
};

/* Số ở trên là mặc định; bảng cân bằng trong Excel (js/data-balance.js) đè lên.
   Không có tệp cân bằng thì game vẫn chạy đúng bằng số mặc định. */
if (SC.bal) Object.assign(SC.CFG, SC.bal('player', {}));

/* ---------- tiện ích toán ---------- */
SC.rnd   = (a, b) => a + Math.random() * (b - a);
SC.rndi  = (a, b) => Math.floor(SC.rnd(a, b + 1));
SC.pick  = arr => arr[Math.floor(Math.random() * arr.length)];
SC.clamp = (v, a, b) => v < a ? a : v > b ? b : v;
SC.lerp  = (a, b, t) => a + (b - a) * t;
SC.dist2 = (ax, ay, bx, by) => { const dx = ax - bx, dy = ay - by; return dx * dx + dy * dy; };
SC.angTo = (ax, ay, bx, by) => Math.atan2(by - ay, bx - ax);

/* Kiểm tra va chạm hai hình tròn */
SC.hit = (a, b) => SC.dist2(a.x, a.y, b.x, b.y) < (a.r + b.r) * (a.r + b.r);

/* Bộ đếm dùng cho hiệu ứng rung màn hình */
SC.shake = { t: 0, power: 0 };
SC.addShake = (power, time) => {
  // chặn ngay từ gốc khi người chơi tắt trong tuỳ chọn — chơi lâu rung nhiều rất mỏi mắt
  if (SC.Settings && !SC.Settings.shake) return;
  if (power > SC.shake.power) SC.shake.power = power;
  SC.shake.t = Math.max(SC.shake.t, time);
};

;
/* ===== js/config-firebase.js ===== */
/* config-firebase.js — khai báo dự án Firebase
 *
 * ĐỂ TRỐNG apiKey = game chạy bình thường ở chế độ ẩn danh: nút đăng nhập mở bảng
 * hướng dẫn thay vì gọi Google, bảng xếp hạng rơi về bảng nội bộ 3 hồ sơ, tiến độ
 * vẫn lưu trong máy. Không có gì vỡ.
 *
 * Dự án đang dùng: minigame-5d3ee (gói Spark, miễn phí)
 *
 * Đoạn Config của Firebase còn có storageBucket, messagingSenderId, measurementId —
 * game không dùng tới (chỉ cần Auth + Firestore) nên không chép vào cho gọn.
 *
 * Ba việc phải làm trên Console trước khi đăng nhập chạy được:
 *   1. Authentication > Sign-in method > bật Google
 *   2. Authentication > Settings > Authorized domains > thêm camandaulung.github.io
 *      (thiếu bước này sẽ lỗi auth/unauthorized-domain)
 *   3. Firestore Database > tạo mới > Rules > dán nội dung firestore.rules
 *      (thiếu bước này thì đăng nhập được nhưng không lưu/xếp hạng được)
 *
 * apiKey của Firebase là khoá CÔNG KHAI, để trong mã nguồn là đúng thiết kế —
 * chặn truy cập là việc của luật Firestore, không phải của việc giấu khoá.
 */

SC.FB_CONFIG = {
  apiKey: 'AIzaSyB73g3D3zRgvfAFX4KCKkEjgVACM93YtbY',
  projectId: 'minigame-5d3ee',
  appId: '1:1098790709614:web:7758724fb27ca7cd80f97f',
  // suy ra từ projectId, chỉ điền tay khi dùng tên miền tuỳ chỉnh
  authDomain: 'minigame-5d3ee.firebaseapp.com'
};

;
/* ===== js/data-biomes.js ===== */
/* data-biomes.js — 10 vùng chiến, mỗi vùng 10 map và một trùm riêng
 *
 * `boss` là khoá tạo hình trong entity-boss-art.js, `bossName` là tên hiển thị.
 * `atk` chọn bộ chiêu riêng cho trùm vùng đó (xem entity-boss.js). */

SC.BIOMES = [
  {
    id: 'farm', name: 'ĐỒNG QUÊ',
    sky: ['#3ba7e8', '#8fd8ff', '#d9f2ff'], far: '#2f6fa8', near: '#1d4a75',
    cloud: '#ffffff', star: 0, hue: 40,
    pool: ['chick', 'hen', 'egg'],
    boss: 'hen', bossName: 'GÀ CHÚA MẸ', atk: ['ring', 'charge', 'eggRain', 'minions', 'aimed', 'punch'],
    elite: 'scarecrow', eliteName: 'BÙ NHÌN SẮT'
  },
  {
    id: 'dune', name: 'SA MẠC HOÀNG HÔN',
    sky: ['#f2703c', '#ffb26b', '#ffe6b0'], far: '#a8452e', near: '#6d2a25',
    cloud: '#ffd9b0', star: 0, hue: 22,
    pool: ['chick', 'hen', 'dive', 'egg'],
    boss: 'eagle', bossName: 'ĐẠI BÀNG CÁT', atk: ['aimed', 'charge', 'minions', 'sweep', 'ring', 'blind'],
    elite: 'scorpion', eliteName: 'BỌ CẠP CÁT'
  },
  {
    id: 'frost', name: 'ĐỈNH BĂNG GIÁ',
    sky: ['#0e3a63', '#2f7fb8', '#bfe9ff'], far: '#1d5f8f', near: '#0e3554',
    cloud: '#e8fbff', star: .3, hue: 190,
    pool: ['chick', 'dive', 'ufo', 'hen'],
    boss: 'penguin', bossName: 'PENGUIN-X', atk: ['spread', 'boomerang', 'minions', 'ring', 'aimed', 'charge'],
    elite: 'iceBear', eliteName: 'GẤU BĂNG CƠ KHÍ'
  },
  {
    id: 'toxic', name: 'RỪNG ĐỘC',
    sky: ['#0b2a1c', '#1c6b3f', '#7fe0a0'], far: '#146b3d', near: '#0a2417',
    cloud: '#9dffc8', star: .15, hue: 130,
    pool: ['hen', 'ufo', 'tank', 'dive'],
    boss: 'spider', bossName: 'MẸ NHỆN NHỰA', atk: ['minions', 'blind', 'eggRain', 'spread', 'aimed', 'boomerang'],
    elite: 'wasp', eliteName: 'ONG CHÚA ĐỘC'
  },
  {
    id: 'magma', name: 'LÕI NÚI LỬA',
    sky: ['#2a0708', '#7d1a12', '#ff7a2f'], far: '#5a1410', near: '#2a0a09',
    cloud: '#ff9d5c', star: .1, hue: 12,
    pool: ['dive', 'tank', 'ufo', 'hen'],
    boss: 'phoenix', bossName: 'PHƯỢNG DUNG NHAM', atk: ['ring', 'rocket', 'aimed', 'sweep', 'minions', 'charge'],
    elite: 'golem', eliteName: 'CỰ THẠCH DUNG NHAM'
  },
  {
    id: 'ocean', name: 'VỰC SÂU ĐẠI DƯƠNG',
    sky: ['#01283f', '#026e8f', '#7fe3e8'], far: '#014c66', near: '#01212f',
    cloud: '#a9f0ff', star: .05, hue: 185,
    pool: ['ufo', 'hen', 'dive', 'tank'],
    boss: 'octopus', bossName: 'BẠCH TUỘC THÉP', atk: ['sweep', 'punch', 'minions', 'eggRain', 'ring', 'boomerang'],
    elite: 'shark', eliteName: 'CÁ MẬP SẮT'
  },
  {
    id: 'neon', name: 'THÀNH PHỐ NEON',
    sky: ['#12002e', '#4b0f7a', '#ff53c8'], far: '#2b0a5c', near: '#12002e',
    cloud: '#ff8ae0', star: .55, hue: 305,
    pool: ['ufo', 'dive', 'tank', 'chick'],
    boss: 'neonRooster', bossName: 'GÀ MÁY NEON', atk: ['spread', 'blink', 'ring', 'aimed', 'sweep', 'rocket'],
    elite: 'droneEye', eliteName: 'DRONE GIÁM SÁT'
  },
  {
    id: 'scrap', name: 'NGHĨA ĐỊA SẮT',
    sky: ['#2a2118', '#6b5a3f', '#c9b184'], far: '#4a3d2a', near: '#221a12',
    cloud: '#d8c69c', star: .1, hue: 42,
    pool: ['tank', 'ufo', 'dive', 'hen'],
    boss: 'scrapDragon', bossName: 'RỒNG SẮT VỤN', atk: ['minions', 'boomerang', 'ring', 'sweep', 'spread', 'rocket'],
    elite: 'crusher', eliteName: 'MÁY NGHIỀN'
  },
  {
    id: 'storm', name: 'TẦNG BÌNH LƯU',
    sky: ['#1b2440', '#41577f', '#9fb6d8'], far: '#2c3c5e', near: '#151c30',
    cloud: '#dce8ff', star: .35, hue: 210,
    pool: ['dive', 'ufo', 'chick', 'tank'],
    boss: 'stormEye', bossName: 'MẮT BÃO', atk: ['ring', 'blink', 'sweep', 'spread', 'aimed', 'blind'],
    elite: 'thunderbird', eliteName: 'CHIM SẤM'
  },
  {
    id: 'void', name: 'VÙNG HƯ KHÔNG',
    sky: ['#05030f', '#1b1040', '#5b2ea8'], far: '#241255', near: '#0d0726',
    cloud: '#b98bff', star: 1, hue: 275,
    pool: ['ufo', 'tank', 'dive', 'chick'],
    boss: 'voidEgg', bossName: 'TRỨNG HƯ KHÔNG', atk: ['ring', 'blink', 'eggRain', 'punch', 'spread', 'minions'],
    elite: 'voidPrism', eliteName: 'LĂNG TRỤ HƯ KHÔNG'
  }
];

;
/* ===== js/data-levels.js ===== */
/* data-levels.js — 100 map: 10 vùng × 10 map, mỗi vùng có trùm riêng
 *
 * Trong mỗi vùng: map 5 gặp trùm nhỏ (hộ vệ), map 10 gặp trùm chính của vùng.
 * Nhờ vậy nhịp "cụm 5" vẫn giữ nguyên mà mỗi vùng vẫn có màn kết đáng nhớ. */

/* Đội hình xuất hiện của mỗi wave */
SC.FORMATIONS = ['line', 'vee', 'arc', 'swarm', 'sides', 'rain'];

/* Mọi con số dưới đây đều chỉnh được trong balance/sky-chicken-balance.xlsx */

/* Nhịp độ khó trong mỗi vùng 6 map.
   Hai đỉnh mỗi vùng: map 3 gặp elite, map 6 gặp trùm chính — nghỉ một nhịp ở map 4
   rồi dốc lên lại, nên vùng nào cũng có hai lần cao trào thay vì một. */
SC.CHUNK = SC.bal('levels.chunk', [
  { name: 'SIÊU DỄ',  mul: 0.68 },
  { name: 'VỪA',      mul: 0.95 },
  { name: 'KHÓ',      mul: 1.30 },   // elite
  { name: 'DỄ',       mul: 0.82 },
  { name: 'KHÁ KHÓ',  mul: 1.15 },
  { name: 'SIÊU KHÓ', mul: 1.62 }    // trùm vùng
]);

/* Cường độ từng wave trong một map: thưa → vừa → dày → dồn dập */
SC.WAVE_CURVE = SC.bal('levels.waveCurve', {
  normal: [0.62, 0.88, 1.20, 1.55],
  boss:   [0.75, 1.05, 1.40]         // 3 wave rồi tới trùm
});

SC.LEVELS_PER_BIOME = SC.bal('levels.levelsPerBiome', 10);

/* Núm chỉnh độ khó tổng thể, tác động qua mật độ quái.
   1.2 = đông hơn 20% so với bản cân bằng đầu — vừa nâng độ khó vừa cho cảm giác
   "gặt" đã tay hơn, thay vì làm quái trâu bò khó chịu. */
SC.DENSITY = SC.bal('levels.density', 1.2);

/* Các hệ số của đường cong độ khó theo số map.
   Để trên SC chứ không dùng biến rời: build.mjs nối 46 tệp vào chung một phạm vi
   nên một cái `const` trùng tên ở tệp khác là vỡ cả bản dựng. */
SC.CURVE = SC.bal('levels.curve', {});
SC.cv = (k, d) => (SC.CURVE[k] === undefined ? d : SC.CURVE[k]);

SC.LEVELS = (() => {
  const out = [];
  const N = SC.LEVELS_PER_BIOME;

  for (let i = 1; i <= SC.BIOMES.length * N; i++) {
    const bi = Math.floor((i - 1) / N);        // vùng
    const step = (i - 1) % N;                  // vị trí trong vùng (0..N-1)
    const chunk = SC.CHUNK[step % SC.CHUNK.length];
    const cm = chunk.mul;

    // Elite đứng ở giữa vùng, trùm chính ở map cuối vùng — suy ra từ số map mỗi
    // vùng chứ không chép cứng, để đổi levelsPerBiome trong Excel là chạy ngay.
    const isMini = step === Math.floor(N / 2) - 1;
    const isFinal = step === N - 1;
    const isBoss = isMini || isFinal;

    // Mật độ chịu ảnh hưởng mạnh của nhịp cụm; máu và tốc bắn chỉ chịu một phần
    // để map "siêu khó" đông quái chứ không biến thành bao cát trâu bò.
    const hpChunk = 1 + (cm - 1) * SC.cv('hpChunkFactor', 0.45);
    const fireChunk = 1 + (cm - 1) * SC.cv('fireChunkFactor', 0.5);
    const b = SC.BIOMES[bi];

    out.push({
      id: i,
      biome: bi,
      stage: step + 1,                          // số thứ tự trong vùng
      name: b.name + ' ' + (step + 1),
      chunk: chunk.name,
      boss: isBoss,
      finalBoss: isFinal,
      // map đuôi 5 gặp quái tinh nhuệ của vùng: tạo hình riêng, mạnh kém trùm một bậc
      bossArt: isFinal ? b.boss : b.elite,
      bossName: isFinal ? b.bossName : b.eliteName,
      // elite chỉ dùng 3 trong 4 chiêu của vùng nên đòn thế cũng nhẹ hơn
      bossAtk: isFinal ? b.atk : b.atk.slice(0, 3),
      waves: isBoss ? SC.cv('wavesBoss', 3) : SC.cv('wavesNormal', 4),
      perWave: Math.round((SC.cv('perWaveBase', 7) + i * SC.cv('perWaveStep', 0.22)) * cm * SC.DENSITY),
      pool: b.pool,
      hpMul: +((1 + (i - 1) * SC.cv('hpStep', 0.09)) * hpChunk).toFixed(2),
      spdMul: +(1 + (i - 1) * SC.cv('spdStep', 0.012)).toFixed(2),
      fireMul: +((1 + (i - 1) * SC.cv('fireStep', 0.018)) * fireChunk).toFixed(2),
      bossHP: isBoss ? Math.round(
        (isFinal ? SC.cv('bossHPFinal', 1400) : SC.cv('bossHPMini', 1000))
        * (1 + (i - 1) * SC.cv('bossHPStep', 0.075))) : 0,
      // vũ khí sẵn có khi vào màn; cứ 12 map lên 1 cấp, tối đa +4
      startWeapon: 1 + Math.min(SC.cv('startWeaponCap', 4),
        Math.floor(i / SC.cv('startWeaponEvery', 12)))
    });
  }
  return out;
})();

SC.TOTAL_LEVELS = SC.LEVELS.length;
SC.TOTAL_STARS = SC.TOTAL_LEVELS * 3;

/* ---------- thông số từng loại quái ---------- */
SC.ENEMY_DEF = SC.bal('enemies', {
  chick: { hp: 3,  r: 15, spd: 62,  score: 10,  drop: .30, fire: 0,    move: 'sine'  },
  hen:   { hp: 10, r: 22, spd: 44,  score: 26,  drop: .48, fire: 2.1,  move: 'hover' },
  egg:   { hp: 2,  r: 12, spd: 118, score: 6,   drop: .18, fire: 0,    move: 'drop'  },
  dive:  { hp: 6,  r: 17, spd: 92,  score: 20,  drop: .34, fire: 0,    move: 'dive'  },
  ufo:   { hp: 14, r: 20, spd: 40,  score: 34,  drop: .55, fire: 1.5,  move: 'strafe'},
  tank:  { hp: 34, r: 28, spd: 26,  score: 58,  drop: .80, fire: 2.6,  move: 'push'  }
});

/* ---------- vật phẩm rơi (auto loot sẽ tự hút về máy bay) ---------- */
SC.ITEM_DEF = SC.bal('items', [
  { k:'coin',  w:44, c:'#ffd23f', ic:'◈' },
  { k:'power', w:20, c:'#ff8a2b', ic:'⚡' },
  { k:'heal',  w:13, c:'#4dff9f', ic:'✚' },
  { k:'shield',w:11, c:'#3fe0ff', ic:'◇' },
  { k:'bomb',  w:7,  c:'#ff3b5c', ic:'✺' },
  { k:'gem',   w:5,  c:'#c58cff', ic:'★' }
]);

;
/* ===== js/data-upgrades.js ===== */
/* data-upgrades.js — bảng 7 dòng nâng cấp vĩnh viễn mua bằng vàng
 *
 * Trần và giá tính cho chiến dịch 100 map: một vòng chơi thu được ~14.900 vàng,
 * cả cây tốn ~30.000 nên phải đi khoảng 2 vòng mới max hết.
 * costs[i] = giá để lên cấp i+1, tăng ~1.55 lần mỗi cấp. */

SC.UPGRADES = [
  {
    key: 'hp', ic: '❤', name: 'GIÁP',
    max: 10, costs: [40, 62, 96, 149, 231, 358, 555, 860, 1333, 2066],
    desc: l => l ? `+${l * 25} máu tối đa` : 'Tăng máu tối đa'
  },
  {
    key: 'dmg', ic: '⚔', name: 'HỎA LỰC',
    max: 10, costs: [50, 78, 121, 187, 290, 450, 697, 1080, 1674, 2595],
    desc: l => l ? `+${l} sát thương mỗi viên` : 'Tăng sát thương mỗi viên đạn'
  },
  {
    key: 'rate', ic: '⚡', name: 'TỐC ĐỘ BẮN',
    max: 8, costs: [45, 70, 108, 168, 260, 403, 625, 969],
    desc: l => l ? `Bắn nhanh hơn ${l * 6}%` : 'Giảm giãn cách giữa hai loạt đạn'
  },
  {
    /* Dòng này từng là món hời nhất bảng: đo ở map 30 với cùng mức vàng, nó vừa clear
       nhanh nhất (33.5s so với 45.3s của bản trắng) vừa ăn ít đòn nhất (2.3 so với 8.7)
       — vì một cấp vũ khí ăn ba lần một lúc: thêm tia đạn, mỗi viên đau hơn, lại bắn
       nhanh hơn. Ba lần nhân nhau nên +5 cấp là gần 18 lần sát thương mỗi giây.
       Chữa bằng cách rút trần 6 -> 4 và tăng giá gấp đôi mỗi cấp, KHÔNG đụng vào công
       thức cấp vũ khí: cấp vũ khí còn nhặt được trong màn, sửa ở đó là làm khó lây cả
       người không mua nâng cấp (đo thử: bản trắng chậm thêm 33%). */
    key: 'wpn', ic: '✦', name: 'VŨ KHÍ KHỞI ĐẦU',
    max: 4, costs: [280, 620, 1350, 2150],
    desc: l => l ? `Vào màn với vũ khí +${l} cấp` : 'Vào màn đã có sẵn vũ khí mạnh hơn'
  },
  {
    key: 'shield', ic: '◇', name: 'KHIÊN NĂNG LƯỢNG',
    max: 8, costs: [60, 93, 144, 223, 346, 536, 831, 1288],
    desc: l => l ? `Vào màn có khiên, +${l * 15} độ bền` : 'Vào màn đã có sẵn khiên'
  },
  {
    /* Máy bay phụ giờ biết ngắm (trước bắn thẳng đứng nên trượt gần hết) — hoá ra
       lại thành món rẻ nhất bảng, nên phải lên giá cho tương xứng. */
    key: 'wing', ic: '✈', name: 'PHI ĐỘI',
    max: 5, costs: [180, 330, 600, 900, 1150],
    desc: l => l === 0 ? 'Máy bay phụ bay kèm bắn phụ trợ'
      : l === 1 ? '1 máy bay phụ'
      : l === 2 ? '2 máy bay phụ'
      : l === 3 ? '2 máy bay phụ, bắn nhanh hơn 35%'
      : l === 4 ? '3 máy bay phụ, bắn nhanh hơn 35%'
      : '4 máy bay phụ, bắn nhanh hơn 35%'
  },
  {
    key: 'gold', ic: '◈', name: 'THU VÀNG',
    max: 10, costs: [55, 85, 132, 205, 318, 493, 764, 1184, 1835, 2844],
    desc: l => l ? `+${l * 12}% vàng nhận được` : 'Nhận thêm vàng sau mỗi màn'
  }
];

/* Trần và giá lấy từ bảng cân bằng Excel nếu có (xem js/data-balance.js) */
for (const u of SC.UPGRADES) {
  const b = SC.bal ? SC.bal('upgrades.' + u.key, null) : null;
  if (!b) continue;
  if (b.max) u.max = b.max;
  if (b.costs && b.costs.length) u.costs = b.costs.slice(0, u.max);
}

/* Thưởng vàng khi hoàn thành màn: càng nhiều sao càng nhiều */
SC.CLEAR_BONUS = stars =>
  SC.bal('reward.clearBonusBase', 12) + stars * SC.bal('reward.clearBonusPerStar', 12);

;
/* ===== js/data-missions.js ===== */
/* data-missions.js — kho nhiệm vụ phụ; mỗi map bốc 3 cái, hoàn thành bao nhiêu được bấy nhiêu sao
 *
 * `arg(id)` tính ngưỡng theo số thứ tự map nên map càng cao yêu cầu càng nặng.
 * `check(g, p, n)`: g = SC.Game, p = máy bay, n = ngưỡng. */

SC.MISSION_POOL = [
  {
    id: 'clear', ic: '✧',
    arg: () => 0,
    label: () => 'Không để con nào thoát',
    check: g => g.stats.escaped === 0
  },
  {
    id: 'perfect', ic: '♥',
    arg: () => 0,
    label: () => 'Không trúng đòn nào',
    check: (g, p) => p.damaged === 0
  },
  {
    id: 'hp', ic: '✚',
    arg: id => id >= 50 ? 60 : 50,
    label: n => `Kết thúc còn trên ${n}% máu`,
    check: (g, p, n) => p.hp >= p.hpMax * n / 100
  },
  {
    id: 'gold', ic: '◈',
    arg: id => 6 + Math.round(id * 0.62),
    label: n => `Nhặt ${n} vàng trong màn`,
    check: (g, p, n) => g.coin >= n
  },
  {
    // combo tối đa của game là 8 nên ngưỡng phải nằm dưới mức đó
    id: 'combo', ic: '✷',
    arg: id => Math.min(SC.CFG.maxCombo - 1, 5 + Math.floor(id / 34)),
    label: n => `Đạt chuỗi combo x${n}`,
    check: (g, p, n) => g.stats.maxCombo >= n
  },
  {
    // Chính xác = tỉ lệ LOẠT bắn có ít nhất 1 viên trúng, chỉ tính những loạt
    // bắn ra khi đang có địch trên màn. Map 1-4 quá thưa địch nên chỉ số nhiễu,
    // vì vậy nhiệm vụ này chỉ xuất hiện từ map 5.
    // map mở đầu mỗi cụm rất thưa địch nên ít cơ hội bắn trúng -> hạ ngưỡng
    id: 'acc', ic: '◎', min: 5,
    arg: id => 55 + Math.floor(id / 30) * 5 - ((id - 1) % 5 === 0 ? 10 : 0),
    label: n => `Độ chính xác từ ${n}%`,
    check: (g, p, n) => p.shots && (p.hits / p.shots * 100) >= n
  },
  {
    id: 'rescue', ic: '☺',
    arg: id => 2 + Math.floor(id / 25),
    label: n => `Cứu ${n} phi công rơi`,
    check: (g, p, n) => g.stats.rescued >= n
  },
  {
    // Mốc bám theo thời gian dọn màn đo được (~25-48s). Map boss được cộng thêm
    // vì đánh trùm tốn thêm khoảng 15 giây.
    id: 'fast', ic: '⏱',
    arg: id => 34 + Math.round(id * 0.22) + (id % 5 === 0 ? 14 : 0),
    label: n => `Hoàn thành dưới ${n} giây`,
    check: (g, p, n) => g.stats.time <= n
  }
];

;
/* ===== js/system-upgrades.js ===== */
/* system-upgrades.js — trạng thái nâng cấp vĩnh viễn và cách chúng tác động vào ván chơi
 *
 * Cấp độ lưu trong SC.UI.progress.upg (cùng chỗ với sao và vàng nên tự vào localStorage). */

SC.Upg = {
  def(key) { return SC.UPGRADES.find(u => u.key === key); },

  /* cấp hiện tại của một dòng nâng cấp */
  lv(key) {
    const p = SC.UI.progress;
    return (p.upg && p.upg[key]) || 0;
  },

  /* giá lên cấp kế tiếp, null nếu đã kịch trần */
  cost(key) {
    const d = this.def(key), l = this.lv(key);
    return l >= d.max ? null : d.costs[l];
  },

  maxed(key) { return this.lv(key) >= this.def(key).max; },

  canBuy(key) {
    const c = this.cost(key);
    return c !== null && SC.UI.progress.coin >= c;
  },

  buy(key) {
    if (!this.canBuy(key)) return false;
    const p = SC.UI.progress;
    p.coin -= this.cost(key);
    if (!p.upg) p.upg = {};
    p.upg[key] = this.lv(key) + 1;
    SC.UI.save();
    return true;
  },

  /* ---------- tác động lên ván chơi ---------- */
  hpBonus()      { return this.lv('hp') * 25; },
  dmgBonus()     { return this.lv('dmg'); },
  rateMul()      { return 1 - this.lv('rate') * 0.06; },   // nhân vào giãn cách bắn
  weaponBonus()  { return this.lv('wpn'); },
  shieldBonus()  { return this.lv('shield') * 15; },
  startShield()  { return this.lv('shield') > 0; },
  goldMul()      { return 1 + this.lv('gold') * 0.12; },

  /* phi đội: 1 → 2 → 2 (bắn nhanh) → 3 → 4 chiếc */
  wingCount() {
    const l = this.lv('wing');
    return l >= 5 ? 4 : l >= 4 ? 3 : Math.min(2, l);
  },
  wingFireRate() { return this.lv('wing') >= 3 ? 0.17 : 0.26; },
  wingDamage()   { return 2 + this.dmgBonus(); },

  /* tổng số cấp đã mua — dùng để khoe trên nút vào cửa hàng */
  totalLevels() {
    return SC.UPGRADES.reduce((s, u) => s + this.lv(u.key), 0);
  },
  totalMax() {
    return SC.UPGRADES.reduce((s, u) => s + u.max, 0);
  },

  /* còn mua nổi món nào không -> chấm đỏ nhắc trên nút cửa hàng */
  anyAffordable() {
    return SC.UPGRADES.some(u => this.canBuy(u.key));
  }
};

;
/* ===== js/system-power.js ===== */
/* system-power.js — Lực chiến và độ khó co giãn theo lực chiến
 *
 * VẤN ĐỀ: cân bằng cũ tính theo số map, không tính tới việc người chơi nâng cấp.
 * Nâng hết cây thì sát thương gấp ~2.7 lần, máu gấp 3.5 lần, bắn nhanh gần gấp đôi,
 * thêm 4 máy bay phụ — trong khi quái vẫn y nguyên. Kết quả: nâng cấp xong là
 * cày map không còn thử thách nào.
 *
 * CÁCH GIẢI: quy các cấp nâng cấp thành một chỉ số LỰC CHIẾN 0-100, rồi cho quái
 * mạnh lên theo. Quan trọng: quái chỉ mạnh lên bằng ~60% mức người chơi mạnh lên,
 * nên nâng cấp vẫn đáng giá — người chơi vẫn thấy mình khoẻ hơn, chỉ là không còn
 * cày như đi dạo.
 *
 * Dòng THU VÀNG cố ý KHÔNG tính vào lực chiến: nó không tăng sức đánh, tính vào
 * thì hoá ra mua nó lại bị phạt.
 */

SC.Power = {
  /* Trọng số ĐO ĐƯỢC, không phải ước lượng: tắt co giãn độ khó rồi cho bot chơi map 30
     với từng dòng nâng cấp max riêng lẻ, lấy √(nhanh hơn mấy lần × ít ăn đòn mấy lần).
     Kết quả (lần mạnh hơn bản trắng): dmg 2.54 · wpn 2.29 · wing 1.92 · rate 1.80 ·
     hp 1.12 · shield 1.11 · gold 0.99.

     Hai chỗ chỉnh tay so với số đo:
     - GIÁP và KHIÊN được nâng lên sàn 0.09/0.07 thay vì 0.02: bot trong mô phỏng gần
       như không chết nên máu với nó chỉ là con số, còn người thật thì máu là mạng.
     - THU VÀNG để 0: nó không tăng sức đánh, tính vào thì mua nó lại bị phạt. */
  W: SC.bal('power.weight', { dmg: 0.28, wpn: 0.24, wing: 0.17, rate: 0.15, hp: 0.09, shield: 0.07 }),

  /* Biên độ co giãn độ khó, cũng chỉnh được trong Excel */
  S: SC.bal('power.scale', { den: 0.90, hp: 1.60, dmg: 1.00, fire: 0.80, spd: 0.45, orbit: 1.60 }),

  /* Trần của mỗi dòng đọc thẳng từ bảng nâng cấp — có lần sửa trần VŨ KHÍ 6 -> 4 mà
     quên chỗ này, thành ra mua max vẫn bị chấm 9/14 điểm. Đừng chép cứng lần nữa. */
  _max(k) {
    const d = SC.UPGRADES.find(u => u.key === k);
    return d ? d.max : 1;
  },

  /* Lực chiến 0-100 */
  total() {
    let s = 0;
    for (const k in this.W) s += this.W[k] * (SC.Upg.lv(k) / this._max(k));
    return Math.round(100 * s);
  },

  /* 0..1 — dùng nội bộ để nội suy các hệ số bên dưới */
  _t() { return SC.clamp(this.total() / 100, 0, 1); },

  /* ---------- các mặt độ khó co giãn theo lực chiến ----------
     Hệ số chọn từ đo đạc: nâng hết cây thì sát thương tổng của người chơi tăng
     khoảng 7 lần, nên tổng máu quái phải tăng cỡ 5 lần (mật độ 1.9 × máu 2.6)
     thì màn chơi mới không thành đi dạo, mà vẫn để người chơi thấy mình khoẻ hơn. */
  den()   { return 1 + this._t() * this.S.den; },    // mật độ quái   -> 1.9x
  hp()    { return 1 + this._t() * this.S.hp; },     // máu quái      -> 2.6x
  dmg()   { return 1 + this._t() * this.S.dmg; },    // sát thương    -> 2.0x
  fire()  { return 1 + this._t() * this.S.fire; },   // nhịp bắn      -> 1.8x
  spd()   { return 1 + this._t() * this.S.spd; },    // tốc độ di chuyển
  orbit() { return this._t() * this.S.orbit; },      // độ cong đạn địch (rad/giây)

  /* Bậc danh hiệu — để ở một chỗ duy nhất vì cả rank() lẫn next() đều đọc,
     và lobby dùng next() để nhắc "còn mấy điểm nữa lên hạng". */
  TIERS: [[0, 'TÂN BINH'], [25, 'CỨNG CÁP'], [45, 'THIỆN CHIẾN'], [65, 'TINH NHUỆ'], [85, 'HUYỀN THOẠI']],

  /* Nhãn hiển thị cho người chơi */
  rank() {
    const p = this.total();
    let name = this.TIERS[0][1];
    for (const [need, n] of this.TIERS) if (p >= need) name = n;
    return name;
  },

  /* Bậc kế tiếp: { need, name } — trả null khi đã ở bậc cao nhất */
  next() {
    const p = this.total();
    for (const [need, name] of this.TIERS) if (p < need) return { need: need - p, name };
    return null;
  }
};

;
/* ===== js/system-missions.js ===== */
/* system-missions.js — chọn 3 nhiệm vụ cho mỗi map và chấm điểm cuối màn
 *
 * Bốc bằng bộ sinh số giả ngẫu nhiên có hạt giống = số map, nên map nào cũng
 * luôn ra đúng 3 nhiệm vụ đó ở mọi lần chơi — người chơi mới cày lại được. */

SC.Missions = {
  active: [],     // 3 nhiệm vụ của map đang chơi: {def, n}

  /* bộ sinh ngẫu nhiên tuyến tính đơn giản, cùng hạt giống cho cùng kết quả */
  _rng(seed) {
    let s = seed * 9301 + 49297;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  },

  /* 3 nhiệm vụ cố định của một map */
  forLevel(id) {
    const rand = this._rng(id + 7);
    // một số nhiệm vụ chỉ hợp lý từ map nhất định trở đi (xem `min` trong bảng)
    const pool = SC.MISSION_POOL.filter(d => !d.min || id >= d.min);
    for (let i = pool.length - 1; i > 0; i--) {          // xáo trộn Fisher-Yates
      const j = Math.floor(rand() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, 3).map(def => ({ def, n: def.arg(id) }));
  },

  start(levelId) {
    this.active = this.forLevel(levelId);
    return this.active;
  },

  /* map này có nhiệm vụ cứu phi công không -> quyết định có thả dù hay không */
  rescueTarget() {
    const m = this.active.find(m => m.def.id === 'rescue');
    return m ? m.n : 0;
  },

  /* mốc giây của nhiệm vụ tính giờ, 0 nếu map không có nhiệm vụ này */
  timeTarget() {
    const m = this.active.find(m => m.def.id === 'fast');
    return m ? m.n : 0;
  },

  /* chấm từng nhiệm vụ, trả về danh sách kèm kết quả đạt/không */
  evaluate(g) {
    return this.active.map(m => ({
      def: m.def,
      n: m.n,
      text: m.def.label(m.n),
      done: !!m.def.check(g, g.player, m.n)
    }));
  },

  /* số sao = số nhiệm vụ hoàn thành */
  countDone(g) {
    return this.evaluate(g).filter(r => r.done).length;
  }
};

;
/* ===== js/system-viewport.js ===== */
/* system-viewport.js — co giãn đa nền tảng: chiều cao ảo động, DPR, safe-area, xoay máy
 *
 * Bề ngang ảo luôn = 540 để cân bằng gameplay giống nhau trên mọi máy;
 * chiều cao ảo (SC.H) giãn theo tỉ lệ màn hình nên điện thoại dài không bị viền đen. */

SC.View = {
  scale: 1,        // px CSS trên 1 đơn vị ảo
  cssW: 540, cssH: 960,
  dpr: 1,
  safe: { top: 0, bottom: 0 },   // safe-area quy đổi sang đơn vị ảo
  touch: false,                  // thiết bị cảm ứng (pointer thô)
  landscape: false,
  onResize: null,                // callback cho game (dựng lại nền…)

  init() {
    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.stage = document.getElementById('stage');
    this.ui = document.getElementById('ui');
    this.rotate = document.getElementById('rotateHint');
    this.touch = window.matchMedia('(pointer: coarse)').matches;
    document.body.classList.toggle('is-touch', this.touch);
    if (this.touch) SC.CFG.fxScale = 0.65;      // bớt hạt hiệu ứng cho máy yếu

    const relayout = () => this.layout();
    window.addEventListener('resize', relayout);
    window.addEventListener('orientationchange', () => setTimeout(relayout, 120));
    if (window.visualViewport) window.visualViewport.addEventListener('resize', relayout);
    this.layout();
  },

  /* Đọc safe-area (tai thỏ / thanh gạt) qua phần tử dò */
  _readSafe() {
    let probe = document.getElementById('safeProbe');
    if (!probe) {
      probe = document.createElement('div');
      probe.id = 'safeProbe';
      document.body.appendChild(probe);
    }
    const cs = getComputedStyle(probe);
    return { top: parseFloat(cs.paddingTop) || 0, bottom: parseFloat(cs.paddingBottom) || 0 };
  },

  /* Kiểm tra kích thước cửa sổ mỗi khung hình — bắt được cả trường hợp
     khung xem bị ẩn lúc tải (innerWidth = 0) rồi mới hiện ra sau. */
  poll() {
    const vw = Math.round(window.innerWidth);
    const vh = Math.round(window.visualViewport ? window.visualViewport.height : window.innerHeight);
    if (vw !== this._vw || vh !== this._vh) this.layout();
  },

  layout() {
    const vw = Math.round(window.innerWidth);
    const vh = Math.round(window.visualViewport ? window.visualViewport.height : window.innerHeight);
    if (!vw || !vh) return;              // cửa sổ chưa có kích thước: chờ lần sau
    this._vw = vw; this._vh = vh;
    const ratio = vh / vw;

    this.landscape = ratio < 1;
    // điện thoại cầm ngang: nhắc xoay dọc thay vì ép khung bé xíu
    this.rotated = this.touch && ratio < 0.95;
    if (this.rotate) this.rotate.classList.toggle('show', this.rotated);

    let aspect, cssW, cssH;
    if (ratio < 1.35) {
      // màn hình ngang (desktop): khung dọc 9:16 căn giữa
      aspect = 16 / 9;
      cssH = vh; cssW = Math.round(cssH / aspect);
    } else {
      // màn hình dọc: lấp đầy, giới hạn 2.3 để máy siêu dài không bị kéo quá
      aspect = Math.min(ratio, 2.3);
      cssW = vw; cssH = Math.round(cssW * aspect);
      if (cssH > vh) { cssH = vh; cssW = Math.round(cssH / aspect); }
    }

    SC.H = Math.round(SC.W * aspect);
    this.cssW = cssW; this.cssH = cssH;
    this.scale = cssW / SC.W;
    // chặn DPR trên máy cảm ứng để đỡ tốn GPU (màn 3x vẽ gấp 2.25 lần số điểm ảnh)
    this.dpr = Math.min(window.devicePixelRatio || 1, this.touch ? 2 : 2.5);

    // khung sân khấu
    this.stage.style.width = cssW + 'px';
    this.stage.style.height = cssH + 'px';

    // canvas: backing store theo DPR, vẽ bằng toạ độ ảo
    this.canvas.width = Math.round(cssW * this.dpr);
    this.canvas.height = Math.round(cssH * this.dpr);
    this.canvas.style.width = cssW + 'px';
    this.canvas.style.height = cssH + 'px';

    // lớp UI: giữ nguyên kích thước ảo rồi scale để khớp canvas
    this.ui.style.width = SC.W + 'px';
    this.ui.style.height = SC.H + 'px';
    this.ui.style.transform = 'scale(' + this.scale + ')';

    const s = this._readSafe();
    this.safe.top = s.top / this.scale;
    this.safe.bottom = s.bottom / this.scale;
    this.ui.style.setProperty('--safe-top', this.safe.top + 'px');
    this.ui.style.setProperty('--safe-bottom', this.safe.bottom + 'px');

    if (this.onResize) this.onResize();
  },

  /* Đặt hệ toạ độ vẽ về đơn vị ảo (gọi đầu mỗi khung hình) */
  apply(ctx) {
    const k = this.scale * this.dpr;
    ctx.setTransform(k, 0, 0, k, 0, 0);
  },

  /* Toạ độ màn hình -> toạ độ ảo */
  toWorld(clientX, clientY) {
    const r = this.canvas.getBoundingClientRect();
    return [(clientX - r.left) / r.width * SC.W, (clientY - r.top) / r.height * SC.H];
  },

  /* iPhone Safari không hỗ trợ Fullscreen API -> nút sẽ bị ẩn thay vì bấm không ăn */
  canFullscreen() {
    const e = document.documentElement;
    return !!(e.requestFullscreen || e.webkitRequestFullscreen);
  },

  toggleFullscreen() {
    const d = document;
    const on = d.fullscreenElement || d.webkitFullscreenElement;
    const fn = on ? (d.exitFullscreen || d.webkitExitFullscreen)
                  : (d.documentElement.requestFullscreen || d.documentElement.webkitRequestFullscreen);
    if (!fn) return;
    const r = fn.call(on ? d : d.documentElement);
    if (r && r.catch) r.catch(() => {});
  }
};

;
/* ===== js/system-input.js ===== */
/* system-input.js — điều khiển đa nền tảng qua Pointer Events
 *
 * Chuột / bút: máy bay bám thẳng con trỏ (tuyệt đối).
 * Cảm ứng: kéo tương đối kiểu Sky Force — ngón tay đặt đâu cũng được,
 * máy bay dịch theo quãng kéo nên không bị ngón tay che. */

SC.Input = {
  mode: 'absolute',     // 'absolute' (chuột) | 'relative' (cảm ứng)
  dragging: false,
  ax: 0, ay: 0,         // điểm neo lúc đặt ngón
  sx: 0, sy: 0,         // vị trí máy bay lúc đặt ngón
  active: null,         // pointerId đang giữ

  init(canvas, game) {
    this.game = game;
    const opt = { passive: false };

    canvas.addEventListener('pointerdown', e => this._down(e), opt);
    canvas.addEventListener('pointermove', e => this._move(e), opt);
    canvas.addEventListener('pointerup', e => this._up(e), opt);
    canvas.addEventListener('pointercancel', e => this._up(e), opt);
    canvas.addEventListener('pointerleave', e => this._up(e), opt);
    // chặn menu giữ lâu & cuộn trang trên mobile
    canvas.addEventListener('contextmenu', e => e.preventDefault());
    canvas.addEventListener('touchstart', e => e.preventDefault(), opt);

    // Bàn phím: Esc / P / Space đều bật tắt tạm dừng khi chơi trên máy tính.
    // Space phải chặn hành vi mặc định, nếu không trang sẽ cuộn xuống.
    window.addEventListener('keydown', e => {
      const k = e.key;
      const laPause = k === 'Escape' || k === 'p' || k === 'P' || k === ' ' || k === 'Spacebar';
      if (!laPause) return;
      if (game.state !== 'play' && game.state !== 'pause') return;
      e.preventDefault();
      game.pause(game.state === 'play');
    }, { passive: false });

    // rời tab / khoá máy -> tự tạm dừng để không chết oan
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && game.state === 'play') game.pause(true);
    });
    window.addEventListener('blur', () => { if (game.state === 'play') game.pause(true); });
  },

  _down(e) {
    if (this.game.state !== 'play') return;
    this.mode = e.pointerType === 'touch' ? 'relative' : 'absolute';
    this.active = e.pointerId;
    e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId);

    const [x, y] = SC.View.toWorld(e.clientX, e.clientY);
    const p = this.game.player;
    this.ax = x; this.ay = y;
    this.sx = p.x; this.sy = p.y;
    this.dragging = true;
    if (this.mode === 'absolute') p.setTarget(x, y);
    e.preventDefault();
  },

  _move(e) {
    if (this.game.state !== 'play') return;
    const p = this.game.player;
    const [x, y] = SC.View.toWorld(e.clientX, e.clientY);

    if (e.pointerType === 'touch') {
      if (!this.dragging || e.pointerId !== this.active) return;
      const k = SC.CFG.touchSens;
      const wantX = this.sx + (x - this.ax) * k, wantY = this.sy + (y - this.ay) * k;
      p.setTarget(wantX, wantY);
      // chạm mép thì neo lại để quãng kéo thừa không bị tích luỹ
      if (p.tx !== wantX || p.ty !== wantY) {
        this.ax = x; this.ay = y; this.sx = p.tx; this.sy = p.ty;
      }
    } else {
      this.mode = 'absolute';
      p.setTarget(x, y);
    }
    e.preventDefault();
  },

  _up(e) {
    if (e.pointerId === this.active) { this.dragging = false; this.active = null; }
  },

  /* rung nhẹ khi trúng đòn / nổ bom (bỏ qua nếu máy không hỗ trợ) */
  vibrate(ms) {
    if (SC.View.touch && navigator.vibrate) navigator.vibrate(ms);
  }
};

;
/* ===== js/system-audio.js ===== */
/* system-audio.js — âm thanh tổng hợp bằng WebAudio, không cần file asset nào
 *
 * Trình duyệt chặn phát tiếng trước khi người dùng tương tác, nên AudioContext
 * chỉ được tạo/mở khoá ở lần chạm hoặc bấm phím đầu tiên. */

SC.Audio = {
  KEY: 'skychicken.audio.v1',
  ctx: null, master: null, sfxBus: null, musBus: null,
  noiseBuf: null,
  sfxOn: true, musOn: true,
  _lastShot: 0, _lastHit: 0,

  init() {
    try {
      const s = JSON.parse(localStorage.getItem(this.KEY) || '{}');
      if (typeof s.sfx === 'boolean') this.sfxOn = s.sfx;
      if (typeof s.mus === 'boolean') this.musOn = s.mus;
    } catch (e) { /* localStorage bị chặn thì dùng mặc định */ }

    const unlock = () => { this._ensure(); if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); };
    ['pointerdown', 'keydown', 'touchstart'].forEach(e =>
      window.addEventListener(e, unlock, { passive: true }));

    // rời tab thì tắt tiếng cho lịch sự
    document.addEventListener('visibilitychange', () => {
      if (!this.ctx) return;
      document.hidden ? this.ctx.suspend() : this.ctx.resume();
    });
  },

  _ensure() {
    if (this.ctx) return this.ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    this.buildGraph(new AC());
    return this.ctx;
  },

  /* Dựng chuỗi xử lý: sfx/nhạc -> master -> nén đỉnh -> loa.
     Tách riêng để test offline dùng lại đúng chuỗi này. */
  buildGraph(ctx) {
    this.ctx = ctx;

    // nén đỉnh: nhiều tiếng nổ trùng nhau vẫn không bị rè
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -10;
    comp.knee.value = 12;
    comp.ratio.value = 12;
    comp.attack.value = 0.003;
    comp.release.value = 0.15;
    comp.connect(ctx.destination);

    this.master = ctx.createGain();
    this.master.gain.value = 0.85;
    this.master.connect(comp);

    this.sfxBus = ctx.createGain();
    this.sfxBus.gain.value = this.sfxOn ? 1 : 0;
    this.sfxBus.connect(this.master);

    this.musBus = ctx.createGain();
    this.musBus.gain.value = this.musOn ? 0.42 : 0;
    this.musBus.connect(this.master);

    // 1 giây nhiễu trắng dùng lại cho mọi tiếng nổ / xì
    const n = ctx.sampleRate;
    this.noiseBuf = ctx.createBuffer(1, n, n);
    const d = this.noiseBuf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;

    return ctx;
  },

  setSfx(on) {
    this.sfxOn = on;
    if (this.sfxBus) this.sfxBus.gain.value = on ? 1 : 0;
    this._save();
  },
  setMus(on) {
    this.musOn = on;
    if (this.musBus) this.musBus.gain.value = on ? 0.42 : 0;
    this._save();
  },
  _save() {
    try { localStorage.setItem(this.KEY, JSON.stringify({ sfx: this.sfxOn, mus: this.musOn })); } catch (e) {}
  },

  /* ---------- khối tạo tiếng cơ bản ---------- */

  /* một nốt dao động, có thể trượt cao độ */
  tone(freq, dur, vol, type, freqTo, bus) {
    const c = this._ensure();
    if (!c || (!this.sfxOn && bus !== this.musBus)) return;
    const t = c.currentTime;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || 'square';
    o.frequency.setValueAtTime(freq, t);
    if (freqTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, freqTo), t + dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + Math.min(0.012, dur * 0.3));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(bus || this.sfxBus);
    o.start(t); o.stop(t + dur + 0.02);
  },

  /* tiếng nhiễu qua bộ lọc — dùng cho nổ, xì, hat */
  noise(dur, vol, cutoff, cutoffTo) {
    const c = this._ensure();
    if (!c || !this.sfxOn) return;
    const t = c.currentTime;
    const s = c.createBufferSource(), g = c.createGain(), f = c.createBiquadFilter();
    s.buffer = this.noiseBuf;
    s.playbackRate.value = 1;
    f.type = 'lowpass';
    f.frequency.setValueAtTime(cutoff, t);
    if (cutoffTo) f.frequency.exponentialRampToValueAtTime(Math.max(60, cutoffTo), t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(this.sfxBus);
    s.start(t); s.stop(t + dur + 0.02);
  },

  /* chuỗi nốt rời — dùng cho fanfare thắng/thua */
  seq(notes, step, vol, type) {
    const c = this._ensure();
    if (!c) return;
    notes.forEach((f, i) => setTimeout(() => this.tone(f, step * 1.6, vol, type), i * step * 1000));
  },

  /* ---------- hiệu ứng trong game ---------- */

  shoot() {
    const now = performance.now();
    if (now - this._lastShot < 70) return;       // bắn tự động rất dày, phải chặn bớt
    this._lastShot = now;
    this.tone(880, 0.07, 0.12, 'square', 420);
  },
  hit() {
    const now = performance.now();
    if (now - this._lastHit < 45) return;
    this._lastHit = now;
    this.noise(0.05, 0.11, 3800, 900);
  },
  explode(big) {
    this.noise(big ? 0.9 : 0.3, big ? 0.5 : 0.34, big ? 2600 : 2000, 120);
    this.tone(big ? 110 : 190, big ? 0.6 : 0.24, big ? 0.35 : 0.24, 'sine', big ? 32 : 60);
  },
  hurt() {
    this.tone(300, 0.28, 0.22, 'sawtooth', 90);
    this.noise(0.2, 0.16, 1400, 200);
  },
  coin()   { this.tone(1450, 0.07, 0.1, 'triangle'); this.tone(2100, 0.09, 0.08, 'triangle'); },
  gem()    { this.seq([1320, 1760, 2200], 0.055, 0.07, 'triangle'); },
  power()  { this.seq([520, 700, 880, 1170], 0.055, 0.1, 'square'); },
  heal()   { this.seq([660, 990], 0.08, 0.09, 'sine'); },
  shield() { this.tone(300, 0.4, 0.11, 'sine', 1300); this.noise(0.3, 0.06, 900, 4000); },
  bomb()   { this.noise(1.1, 0.55, 3200, 80); this.tone(160, 0.9, 0.4, 'sine', 28); },
  wave()   { this.seq([520, 780], 0.09, 0.09, 'triangle'); },
  alarm()  { this.seq([233, 175, 233, 175], 0.16, 0.15, 'sawtooth'); },
  win()    { this.seq([523, 659, 784, 1047, 1319], 0.11, 0.13, 'triangle'); },
  lose()   { this.seq([440, 370, 294, 220], 0.16, 0.13, 'sawtooth'); },
  click()  { this.tone(760, 0.045, 0.06, 'square', 620); }
};

;
/* ===== js/system-music.js ===== */
/* system-music.js — nhạc nền sinh tự động theo biome (bass + arp + hat)
 *
 * Không dùng file nhạc: mỗi biome có gam, cao độ gốc và nhịp riêng nên 6 vùng
 * nghe khác nhau mà vẫn nhẹ. Bộ lập lịch nhìn trước 0.3s cho khỏi giật. */

SC.Music = {
  playing: false,
  timer: null,
  next: 0,      // thời điểm (giây, theo AudioContext) của bước kế tiếp
  step: 0,
  cfg: null,

  /* gam & nhịp cho 6 biome — theo thứ tự SC.BIOMES */
  PRESET: [
    { root: 220.00, scale: [0, 4, 7, 11, 12, 7], bpm: 104, wave: 'triangle' }, // đồng quê — trưởng, vui
    { root: 196.00, scale: [0, 3, 5, 7, 10, 7],  bpm: 112, wave: 'square'   }, // sa mạc — blues
    { root: 174.61, scale: [0, 2, 3, 7, 10, 12], bpm: 96,  wave: 'sine'     }, // băng giá — thứ, lạnh
    { root: 164.81, scale: [0, 2, 3, 5, 8, 10],  bpm: 118, wave: 'sawtooth' }, // rừng độc — bí ẩn
    { root: 146.83, scale: [0, 1, 5, 6, 8, 11],  bpm: 132, wave: 'sawtooth' }, // núi lửa — căng
    { root: 130.81, scale: [0, 3, 6, 7, 10, 13], bpm: 124, wave: 'square'   }  // hư không — nghịch tai
  ],

  semitone(root, n) { return root * Math.pow(2, n / 12); },

  start(biomeId) {
    const c = SC.Audio._ensure();
    if (!c) return;
    this.cfg = this.PRESET[biomeId] || this.PRESET[0];
    this.step = 0;
    this.next = c.currentTime + 0.08;
    if (!this.playing) {
      this.playing = true;
      this.timer = setInterval(() => this._schedule(), 90);
    }
  },

  stop() {
    this.playing = false;
    clearInterval(this.timer);
    this.timer = null;
  },

  /* Lịch trước các bước rơi vào cửa sổ 0.3s tới */
  _schedule() {
    const A = SC.Audio, c = A.ctx;
    if (!c || !this.playing) return;
    const spb = 60 / this.cfg.bpm, stepDur = spb / 2;   // mỗi bước = nửa phách

    while (this.next < c.currentTime + 0.3) {
      this._playStep(this.next, stepDur);
      this.next += stepDur;
      this.step++;
    }
  },

  _playStep(t, dur) {
    const A = SC.Audio, c = A.ctx, cfg = this.cfg;
    const s = this.step, bar = s % 16;

    // bass: rơi vào phách 1 và 3 của mỗi ô nhịp
    if (bar % 4 === 0) {
      const deg = (s >> 4) % cfg.scale.length;
      this._note(t, this.semitone(cfg.root, cfg.scale[deg]) / 2, dur * 1.9, 0.16, 'sine');
    }
    // arp: chạy lên gam, bỏ qua vài bước cho thoáng
    if (bar % 2 === 0 && bar !== 6 && bar !== 14) {
      const deg = (s * 3) % cfg.scale.length;
      const oct = bar >= 8 ? 2 : 1;
      this._note(t, this.semitone(cfg.root, cfg.scale[deg]) * oct, dur * 0.85, 0.055, cfg.wave);
    }
    // hat: nhấn ngoài phách
    if (bar % 4 === 2) this._hat(t, 0.03);
  },

  _note(t, freq, dur, vol, type) {
    const A = SC.Audio, c = A.ctx;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(A.musBus);
    o.start(t); o.stop(t + dur + 0.02);
  },

  _hat(t, vol) {
    const A = SC.Audio, c = A.ctx;
    const s = c.createBufferSource(), g = c.createGain(), f = c.createBiquadFilter();
    s.buffer = A.noiseBuf;
    f.type = 'highpass'; f.frequency.value = 7000;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    s.connect(f); f.connect(g); g.connect(A.musBus);
    s.start(t); s.stop(t + 0.07);
  }
};

;
/* ===== js/util-draw.js ===== */
/* util-draw.js — hàm vẽ dùng lại: hình sao, hào quang, thân gà, thân máy bay */

SC.draw = {
  /* Kho sprite hào quang: vẽ sẵn gradient ra canvas phụ rồi dùng lại.
     Tạo gradient mỗi khung hình rất tốn CPU trên điện thoại. */
  _glowCache: {},
  _glowSprite(color) {
    let c = this._glowCache[color];
    if (!c) {
      c = document.createElement('canvas');
      c.width = c.height = 64;
      const g = c.getContext('2d');
      const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      rg.addColorStop(0, color);
      rg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = rg;
      g.fillRect(0, 0, 64, 64);
      this._glowCache[color] = c;
    }
    return c;
  },

  /* vòng sáng mềm quanh một điểm */
  glow(ctx, x, y, r, color, alpha = 0.5) {
    const s = this._glowSprite(color);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.globalCompositeOperation = 'lighter';
    ctx.drawImage(s, x - r, y - r, r * 2, r * 2);
    ctx.restore();
  },

  /* Viền tối dùng chung cho mọi quái.
     Lý do: quái sáng màu trên nền trời sáng (đồng quê, sa mạc) đo được tương phản
     chỉ 1.0-1.4:1, tức gần như tàng hình. Viền tối giữ hình đọc được ở mọi nền. */
  ink(ctx, w = 2.2) {
    ctx.strokeStyle = 'rgba(10,16,32,.88)';
    ctx.lineWidth = w;
    ctx.lineJoin = 'round';
  },

  /* Gradient tạo khối nổi, nguồn sáng chếch trên trái */
  shade(ctx, rx, ry, base, light) {
    const g = ctx.createRadialGradient(-rx * .38, -ry * .45, ry * .08, 0, 0, Math.max(rx, ry) * 1.3);
    g.addColorStop(0, light);
    g.addColorStop(1, base);
    return g;
  },

  /* Vệt sáng viền trên — tách quái khỏi nền tối, bù cho viền tối ở nền sáng */
  rim(ctx, rx, ry) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,.5)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx * .82, ry * .82, 0, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();
    ctx.restore();
  },

  star(ctx, x, y, r, spikes = 5) {
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const rad = i % 2 ? r * 0.45 : r;
      const a = (Math.PI / spikes) * i - Math.PI / 2;
      i ? ctx.lineTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad)
        : ctx.moveTo(x + Math.cos(a) * rad, y + Math.sin(a) * rad);
    }
    ctx.closePath();
  },

  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  },

  /* thân "gà" cách điệu — dùng cho chick / hen / boss */
  chicken(ctx, r, body, comb, flap) {
    this.ink(ctx, r * 0.13);

    // bóng đổ nhẹ dưới thân cho có chiều sâu
    ctx.fillStyle = 'rgba(8,14,30,.28)';
    ctx.beginPath(); ctx.ellipse(0, r * 0.5, r * 0.86, r * 0.62, 0, 0, 6.283); ctx.fill();

    // cánh vỗ
    ctx.fillStyle = comb;
    ctx.save(); ctx.rotate(flap * 0.5);
    ctx.beginPath(); ctx.ellipse(-r * 0.95, 0, r * 0.55, r * 0.3, 0, 0, 6.283);
    ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.rotate(-flap * 0.5);
    ctx.beginPath(); ctx.ellipse(r * 0.95, 0, r * 0.55, r * 0.3, 0, 0, 6.283);
    ctx.fill(); ctx.stroke(); ctx.restore();

    // mào — vẽ trước thân để phần chân mào bị thân che, trông liền khối hơn
    ctx.fillStyle = comb;
    ctx.beginPath(); ctx.arc(-r * 0.22, -r * 0.9, r * 0.2, 0, 6.283);
    ctx.arc(r * 0.1, -r * 1.0, r * 0.22, 0, 6.283);
    ctx.fill(); ctx.stroke();

    // thân: khối tròn có nguồn sáng chếch trên trái
    ctx.fillStyle = this.shade(ctx, r * 0.9, r, body, '#ffffff');
    ctx.beginPath(); ctx.ellipse(0, 0, r * 0.9, r, 0, 0, 6.283);
    ctx.fill(); ctx.stroke();
    this.rim(ctx, r * 0.9, r);

    // mắt
    ctx.fillStyle = '#1a1a22';
    ctx.beginPath(); ctx.arc(-r * 0.32, -r * 0.12, r * 0.13, 0, 6.283);
    ctx.arc(r * 0.32, -r * 0.12, r * 0.13, 0, 6.283); ctx.fill();
    // mỏ
    ctx.fillStyle = '#ffa62b';
    ctx.beginPath(); ctx.moveTo(-r * 0.2, r * 0.22); ctx.lineTo(r * 0.2, r * 0.22);
    ctx.lineTo(0, r * 0.56); ctx.closePath(); ctx.fill(); ctx.stroke();
  },

  /* thân máy bay chiến đấu của người chơi */
  fighter(ctx, r, tilt, tier) {
    const w = r * 1.5, h = r * 1.9;
    ctx.save(); ctx.rotate(tilt * 0.32);
    // viền tối giúp máy bay nổi bật trên nền sáng
    ctx.strokeStyle = '#16294a'; ctx.lineWidth = 2; ctx.lineJoin = 'round';
    // cánh
    ctx.fillStyle = '#89b4e8';
    ctx.beginPath();
    ctx.moveTo(0, -h * 0.1); ctx.lineTo(-w, h * 0.35); ctx.lineTo(-w * 0.55, h * 0.72);
    ctx.lineTo(0, h * 0.45); ctx.lineTo(w * 0.55, h * 0.72); ctx.lineTo(w, h * 0.35);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    // thân chính
    const g = ctx.createLinearGradient(0, -h, 0, h);
    g.addColorStop(0, '#ffffff'); g.addColorStop(0.5, '#cfe6ff'); g.addColorStop(1, '#6f9ad4');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, -h); ctx.quadraticCurveTo(r * 0.62, -h * 0.1, r * 0.5, h * 0.75);
    ctx.lineTo(-r * 0.5, h * 0.75); ctx.quadraticCurveTo(-r * 0.62, -h * 0.1, 0, -h);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    // buồng lái
    ctx.fillStyle = 'rgba(90,225,255,.92)';
    ctx.beginPath(); ctx.ellipse(0, -h * 0.28, r * 0.26, r * 0.46, 0, 0, 6.283); ctx.fill();
    // sọc nâng cấp theo cấp vũ khí
    ctx.fillStyle = tier > 4 ? '#ffd23f' : '#ff7a1a';
    ctx.fillRect(-r * 0.42, h * 0.2, r * 0.84, 3);
    ctx.restore();
  }
};

;
/* ===== js/system-particles.js ===== */
/* system-particles.js — hạt hiệu ứng (nổ, lông gà, tia lửa) + số điểm bay lên */

SC.FX = {
  parts: [],
  texts: [],

  clear() { this.parts.length = 0; this.texts.length = 0; },

  /* vụ nổ tròn */
  burst(x, y, color, count = 14, power = 220, size = 3) {
    count = Math.round(count * SC.CFG.fxScale);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * 6.283, s = SC.rnd(0.25, 1) * power;
      this.parts.push({
        x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s,
        life: SC.rnd(0.28, 0.7), max: 0.7, c: color,
        s: SC.rnd(size * 0.5, size * 1.6), g: 120, spin: 0, rot: 0
      });
    }
  },

  /* lông gà rơi lả tả khi hạ quái */
  feathers(x, y, color, count = 6) {
    count = Math.round(count * SC.CFG.fxScale);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * 6.283, s = SC.rnd(30, 120);
      this.parts.push({
        x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 30,
        life: SC.rnd(0.7, 1.3), max: 1.3, c: color,
        s: SC.rnd(3, 5.5), g: 210, spin: SC.rnd(-8, 8), rot: 0, feather: 1
      });
    }
  },

  /* khói động cơ */
  trail(x, y, color) {
    this.parts.push({
      x, y, vx: SC.rnd(-14, 14), vy: SC.rnd(70, 150),
      life: 0.3, max: 0.3, c: color, s: SC.rnd(2, 4), g: 0, spin: 0, rot: 0
    });
  },

  text(x, y, str, color) {
    this.texts.push({ x, y, str, c: color, life: 0.85, max: 0.85 });
  },

  update(dt) {
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const p = this.parts[i];
      p.life -= dt;
      if (p.life <= 0) { this.parts.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.vy += p.g * dt; p.vx *= 0.97; p.vy *= 0.985;
      p.rot += p.spin * dt;
    }
    for (let i = this.texts.length - 1; i >= 0; i--) {
      const t = this.texts[i];
      t.life -= dt; t.y -= 42 * dt;
      if (t.life <= 0) this.texts.splice(i, 1);
    }
  },

  render(ctx) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const p of this.parts) {
      const a = SC.clamp(p.life / p.max, 0, 1);
      ctx.globalAlpha = a;
      ctx.fillStyle = p.c;
      if (p.feather) {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.beginPath(); ctx.ellipse(0, 0, p.s * 1.8, p.s * 0.7, 0, 0, 6.283); ctx.fill();
        ctx.restore();
      } else {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.s * a, 0, 6.283); ctx.fill();
      }
    }
    ctx.restore();

    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '700 14px Segoe UI, sans-serif';
    for (const t of this.texts) {
      ctx.globalAlpha = SC.clamp(t.life / t.max, 0, 1);
      ctx.fillStyle = t.c;
      ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = 3;
      ctx.strokeText(t.str, t.x, t.y);
      ctx.fillText(t.str, t.x, t.y);
    }
    ctx.restore();
  }
};

;
/* ===== js/system-screen-fx.js ===== */
/* system-screen-fx.js — hiệu ứng phủ toàn màn hình: chớp sáng và bong bóng kiểu truyện tranh
 *
 * Vẽ SAU cùng và nằm ngoài phép rung màn hình: chớp sáng mà rung theo thì thành nhoè,
 * còn chữ thì phải đứng yên mới đọc kịp.
 */

SC.ScreenFX = {
  fT: 0, fMax: 0, fCol: '255,255,255',
  pops: [],

  clear() { this.fT = 0; this.pops.length = 0; },

  /* chớp sáng cả màn: rgb dạng "255,255,255" */
  flash(rgb, time) {
    this.fCol = rgb || '255,255,255';
    this.fMax = time || 0.28;
    this.fT = this.fMax;
  },

  /* bong bóng nổ kiểu manga giữa màn hình */
  pop(text, col) {
    this.pops.push({ text, col: col || '#ff3b5c', t: 0, life: 0.92, spin: SC.rnd(-0.12, 0.12) });
  },

  update(dt) {
    if (this.fT > 0) this.fT -= dt;
    for (let i = this.pops.length - 1; i >= 0; i--) {
      this.pops[i].t += dt;
      if (this.pops[i].t >= this.pops[i].life) this.pops.splice(i, 1);
    }
  },

  render(ctx) {
    if (this.fT > 0) this._flash(ctx);
    for (const p of this.pops) this._bubble(ctx, p);
  },

  /* Chớp sáng chỉ ở 4 góc, chừa trống khoảng giữa.
     Trước đây phủ trắng cả màn nên chơi lâu rất nhức mắt — mà phần bị xoá trắng lại
     đúng chỗ người chơi đang nhìn. Hắt từ góc vào thì vẫn "nổ" mà không che tầm nhìn. */
  _flash(ctx) {
    const k = this.fT / this.fMax;
    // Hạ dần qua ba lần chỉnh: phủ trắng cả màn -> 4 góc 0.5 -> 4 góc 0.22.
    // Ở mức này nó là "ánh hắt" chứ không còn là chớp, chơi liên tục không mỏi mắt.
    const a = k * k * 0.22;
    const R = Math.min(SC.W, SC.H) * 0.45;        // ôm sát góc, chừa rộng khoảng giữa
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const [cx, cy] of [[0, 0], [SC.W, 0], [0, SC.H], [SC.W, SC.H]]) {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      g.addColorStop(0, `rgba(${this.fCol},${a.toFixed(3)})`);
      g.addColorStop(0.55, `rgba(${this.fCol},${(a * 0.28).toFixed(3)})`);
      g.addColorStop(1, `rgba(${this.fCol},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, SC.W, SC.H);
    }
    ctx.restore();
  },

  /* ---------- một bong bóng ---------- */
  _bubble(ctx, p) {
    const k = p.t / p.life;
    // bung quá đà rồi co lại: 0 -> 1.18 -> 1.0, giữ, rồi phình nhẹ và mờ đi
    let s, a;
    if (k < 0.13)      { s = (k / 0.13) * 1.18;             a = k / 0.13; }
    else if (k < 0.22) { s = 1.18 - ((k - 0.13) / 0.09) * 0.18; a = 1; }
    else if (k < 0.66) { s = 1;                             a = 1; }
    else               { s = 1 + (k - 0.66) / 0.34 * 0.22;  a = 1 - (k - 0.66) / 0.34; }

    const R = SC.W * 0.30 * s;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.translate(SC.W / 2, SC.H * 0.42);
    ctx.rotate(p.spin);

    // vành gai: bán kính so le trong/ngoài, lệch nhẹ theo chỉ số cho ra nét vẽ tay
    const N = 15;
    const path = () => {
      ctx.beginPath();
      for (let i = 0; i < N * 2; i++) {
        const ang = (i / (N * 2)) * 6.283 - 1.571;
        const wob = 1 + Math.sin(i * 2.7) * 0.07;
        const rr = (i % 2 ? 0.66 : 1) * R * wob;
        const x = Math.cos(ang) * rr * 1.12, y = Math.sin(ang) * rr * 0.78;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.closePath();
    };

    // bóng đổ lệch xuống dưới phải
    ctx.save();
    ctx.translate(5, 7); path();
    ctx.fillStyle = 'rgba(8,12,24,.18)'; ctx.fill();
    ctx.restore();

    // Ruột để trong khoảng 70% cho thấy nền phía sau — đặc kín thì mảng trắng to
    // giữa màn nhìn rất thô, lại che mất quái đang bay tới.
    path();
    ctx.fillStyle = 'rgba(255,255,255,.3)';
    ctx.fill();
    ctx.lineJoin = 'round';
    ctx.lineWidth = R * 0.055;
    ctx.strokeStyle = '#0a1020';
    ctx.stroke();

    // vành trong mỏng cùng màu chữ cho ra chất truyện tranh in màu
    ctx.save();
    ctx.scale(0.86, 0.86);
    path();
    ctx.lineWidth = R * 0.03;
    ctx.strokeStyle = p.col;
    ctx.globalAlpha = a * 0.55;
    ctx.stroke();
    ctx.restore();

    // chữ
    const fs = R * 0.46;
    ctx.font = `900 italic ${fs}px ${SC.CFG.fontStack || "'Segoe UI',system-ui,sans-serif"}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    ctx.lineWidth = fs * 0.17;
    ctx.strokeStyle = '#0a1020';
    ctx.strokeText(p.text, 0, 0);
    const g = ctx.createLinearGradient(0, -fs * 0.6, 0, fs * 0.6);
    g.addColorStop(0, '#fff'); g.addColorStop(0.45, p.col); g.addColorStop(1, '#7a0f22');
    ctx.fillStyle = g;
    ctx.fillText(p.text, 0, 0);
    ctx.restore();
  }
};

;
/* ===== js/system-background.js ===== */
/* system-background.js — nền parallax 4 lớp, đổi bảng màu theo biome của map */

SC.BG = {
  biome: null,
  biomeId: 0,
  stars: [],
  clouds: [],
  hills: [],
  scroll: 0,

  /* dựng lại các lớp nền khi màn hình đổi kích thước / xoay máy */
  rebuild() { this.setBiome(this.biomeId); },

  setBiome(bi) {
    this.biomeId = bi;
    this.biome = SC.BIOMES[bi];
    this.scroll = 0;
    this.stars = [];
    this.clouds = [];
    this.hills = [];

    // lớp sao (chỉ hiện ở biome tối)
    const n = Math.round(120 * this.biome.star);
    for (let i = 0; i < n; i++)
      this.stars.push({ x: SC.rnd(0, SC.W), y: SC.rnd(0, SC.H), s: SC.rnd(0.6, 2), sp: SC.rnd(8, 30), tw: SC.rnd(0, 6.28) });

    // lớp mây / bụi
    for (let i = 0; i < 9; i++)
      this.clouds.push({ x: SC.rnd(-60, SC.W + 60), y: SC.rnd(-200, SC.H), s: SC.rnd(50, 140), sp: SC.rnd(22, 60), a: SC.rnd(.08, .22) });

    // 2 dải đồi/địa hình chạy nền
    for (let layer = 0; layer < 2; layer++) {
      const pts = [];
      for (let i = 0; i <= 12; i++) pts.push(SC.rnd(0.25, 1) * (layer ? 74 : 46));
      this.hills.push({ pts, sp: layer ? 26 : 14, color: layer ? this.biome.near : this.biome.far, off: 0 });
    }
  },

  update(dt) {
    this.scroll += dt;
    for (const s of this.stars) { s.y += s.sp * dt; if (s.y > SC.H) { s.y = -4; s.x = SC.rnd(0, SC.W); } s.tw += dt * 3; }
    for (const c of this.clouds) { c.y += c.sp * dt; if (c.y - c.s > SC.H) { c.y = -c.s * 2; c.x = SC.rnd(-60, SC.W + 60); } }
    for (const h of this.hills) h.off += h.sp * dt;
  },

  render(ctx) {
    const b = this.biome;
    // bầu trời gradient
    const g = ctx.createLinearGradient(0, 0, 0, SC.H);
    g.addColorStop(0, b.sky[0]); g.addColorStop(0.55, b.sky[1]); g.addColorStop(1, b.sky[2]);
    ctx.fillStyle = g; ctx.fillRect(0, 0, SC.W, SC.H);

    // sao
    ctx.save();
    for (const s of this.stars) {
      ctx.globalAlpha = 0.35 + Math.sin(s.tw) * 0.3;
      ctx.fillStyle = '#fff';
      ctx.fillRect(s.x, s.y, s.s, s.s);
    }
    ctx.restore();

    // đồi nền cuộn dọc (vẽ 2 bản để nối liền vô tận)
    for (const h of this.hills) {
      const period = SC.H;
      const oy = h.off % period;
      ctx.fillStyle = h.color;
      for (let k = -1; k <= 1; k++) this._hill(ctx, h, oy + k * period);
    }

    // mây / bụi
    ctx.save();
    for (const c of this.clouds) {
      ctx.globalAlpha = c.a;
      ctx.fillStyle = b.cloud;
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.s, c.s * 0.42, 0, 0, 6.283);
      ctx.ellipse(c.x + c.s * 0.55, c.y + c.s * 0.1, c.s * 0.62, c.s * 0.3, 0, 0, 6.283);
      ctx.fill();
    }
    ctx.restore();
  },

  /* vẽ một dải địa hình dạng răng cưa mềm, lặp theo trục dọc */
  _hill(ctx, h, oy) {
    const n = h.pts.length, seg = SC.H / (n - 1);
    ctx.globalAlpha = 0.22;
    ctx.beginPath();
    ctx.moveTo(0, oy);
    for (let i = 0; i < n; i++) ctx.lineTo(h.pts[i], oy + i * seg);
    ctx.lineTo(0, oy + SC.H); ctx.closePath(); ctx.fill();

    ctx.beginPath();
    ctx.moveTo(SC.W, oy);
    for (let i = 0; i < n; i++) ctx.lineTo(SC.W - h.pts[n - 1 - i], oy + i * seg);
    ctx.lineTo(SC.W, oy + SC.H); ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 1;
  }
};

;
/* ===== js/entity-bullet.js ===== */
/* entity-bullet.js — đạn người chơi (kể cả tên lửa dò tìm) và đạn địch */

SC.Bullets = {
  mine: [],   // đạn của người chơi
  foe: [],    // đạn của địch

  clear() { this.mine.length = 0; this.foe.length = 0; },

  spawnMine(x, y, vx, vy, dmg, kind = 'shot') {
    this.mine.push({ x, y, vx, vy, r: kind === 'laser' ? 6 : 4, dmg, kind, life: 3, target: null });
  },

  spawnFoe(x, y, vx, vy, kind = 'egg') {
    this.foe.push({
      x, y, vx, vy, kind, rot: 0,
      r: kind === 'egg' ? 8 : kind === 'rocket' ? 7 : 6,
      // hoả tiễn bay lâu hơn vì lúc đầu nó vọt lên rồi mới vòng xuống
      life: kind === 'rocket' ? 4.5 : 6
    });
  },

  update(dt, enemies, player) {
    /* --- đạn ta --- */
    for (let i = this.mine.length - 1; i >= 0; i--) {
      const b = this.mine[i];
      if (b.kind === 'missile') {
        // tên lửa: khóa mục tiêu gần nhất rồi bẻ lái dần
        if (!b.target || b.target.dead) b.target = SC.Bullets._nearest(b, enemies);
        if (b.target) {
          const want = SC.angTo(b.x, b.y, b.target.x, b.target.y);
          const cur = Math.atan2(b.vy, b.vx);
          let d = want - cur;
          while (d > Math.PI) d -= 6.283; while (d < -Math.PI) d += 6.283;
          const na = cur + SC.clamp(d, -4.5 * dt, 4.5 * dt), sp = 520;
          b.vx = Math.cos(na) * sp; b.vy = Math.sin(na) * sp;
        }
        SC.FX.trail(b.x, b.y, '#ffb45c');
      }
      b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt;
      if (b.life <= 0 || b.y < -30 || b.y > SC.H + 30 || b.x < -30 || b.x > SC.W + 30)
        this.mine.splice(i, 1);
    }

    /* --- đạn địch --- */
    // Lực chiến càng cao thì đạn plasma càng bẻ lái bám theo người chơi. Đây là
    // mặt "khó" duy nhất đòi kỹ năng né thật, không phải chỉ tăng số.
    const orbit = SC.Power.orbit();

    for (let i = this.foe.length - 1; i >= 0; i--) {
      const b = this.foe[i];

      // Hoả tiễn của trùm: bẻ lái mạnh và tăng tốc dần, nhưng bán kính vòng có hạn
      // nên vẫn né được bằng cách cắt ngang mặt nó — không phải đòn không thể tránh.
      if (b.kind === 'rocket') {
        const want = SC.angTo(b.x, b.y, player.x, player.y);
        const cur = Math.atan2(b.vy, b.vx);
        let d = want - cur;
        while (d > Math.PI) d -= 6.283;
        while (d < -Math.PI) d += 6.283;
        const na = cur + SC.clamp(d, -2.4 * dt, 2.4 * dt);
        const sp = Math.min(430, Math.hypot(b.vx, b.vy) + 220 * dt);
        b.vx = Math.cos(na) * sp; b.vy = Math.sin(na) * sp;
        SC.FX.trail(b.x, b.y, '#ff5c7a');
      }

      if (orbit > 0 && b.kind === 'plasma') {
        const want = SC.angTo(b.x, b.y, player.x, player.y);
        const cur = Math.atan2(b.vy, b.vx);
        let d = want - cur;
        while (d > Math.PI) d -= 6.283;
        while (d < -Math.PI) d += 6.283;
        const na = cur + SC.clamp(d, -orbit * dt, orbit * dt);
        const sp = Math.hypot(b.vx, b.vy);
        b.vx = Math.cos(na) * sp; b.vy = Math.sin(na) * sp;
      }

      b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt; b.rot += dt * 6;
      if (b.life <= 0 || b.y > SC.H + 30 || b.y < -60 || b.x < -40 || b.x > SC.W + 40)
        this.foe.splice(i, 1);
    }
  },

  _nearest(b, enemies) {
    let best = null, bd = Infinity;
    for (const e of enemies) {
      if (e.dead) continue;
      const d = SC.dist2(b.x, b.y, e.x, e.y);
      if (d < bd) { bd = d; best = e; }
    }
    return best;
  },

  render(ctx) {
    /* đạn ta */
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (const b of this.mine) {
      if (b.kind === 'missile') {
        ctx.fillStyle = '#ffd23f';
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(Math.atan2(b.vy, b.vx) + Math.PI / 2);
        ctx.fillRect(-2.5, -7, 5, 14); ctx.restore();
        SC.draw.glow(ctx, b.x, b.y, 14, '#ff9a2b', .55);
      } else if (b.kind === 'laser') {
        ctx.fillStyle = 'rgba(120,240,255,.9)';
        ctx.fillRect(b.x - 3, b.y - 16, 6, 32);
        SC.draw.glow(ctx, b.x, b.y, 20, '#3fe0ff', .5);
      } else {
        SC.draw.glow(ctx, b.x, b.y, 15, '#ff8a1f', .65);
        // vẽ lõi đạn ở chế độ thường để giữ đúng màu cam vàng
        ctx.save(); ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#ff9d1f';
        ctx.beginPath(); ctx.ellipse(b.x, b.y + 3, 3, 10, 0, 0, 6.283); ctx.fill();
        ctx.fillStyle = '#fff3c2';
        ctx.beginPath(); ctx.ellipse(b.x, b.y - 2, 1.8, 5, 0, 0, 6.283); ctx.fill();
        ctx.restore();
      }
    }
    ctx.restore();

    /* đạn địch */
    for (const b of this.foe) {
      if (b.kind === 'egg') {
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.rot * .3);
        ctx.fillStyle = '#fff4dc';
        ctx.beginPath(); ctx.ellipse(0, 0, 7, 9.5, 0, 0, 6.283); ctx.fill();
        ctx.fillStyle = 'rgba(210,180,140,.5)';
        ctx.beginPath(); ctx.ellipse(2, 2, 3, 4, 0, 0, 6.283); ctx.fill();
        ctx.restore();
      } else if (b.kind === 'rocket') {
        ctx.save();
        ctx.translate(b.x, b.y); ctx.rotate(Math.atan2(b.vy, b.vx) + Math.PI / 2);
        SC.draw.glow(ctx, 0, 10, 22, '#ffb45c', .7);      // lửa đuôi
        ctx.fillStyle = '#ff5c7a';
        ctx.strokeStyle = 'rgba(10,16,32,.85)'; ctx.lineWidth = 2; ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(0, -13); ctx.lineTo(6, 2); ctx.lineTo(4, 11);
        ctx.lineTo(-4, 11); ctx.lineTo(-6, 2);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#ffe27a';                          // đầu đạn
        ctx.beginPath(); ctx.arc(0, -8, 2.6, 0, 6.283); ctx.fill();
        ctx.restore();
      } else {
        SC.draw.glow(ctx, b.x, b.y, 13, '#ff3b5c', .6);
        ctx.fillStyle = '#ff6b84';
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.283); ctx.fill();
      }
    }
  }
};

;
/* ===== js/entity-item.js ===== */
/* entity-item.js — vật phẩm rơi + cơ chế AUTO LOOT (tự hút về máy bay, không cần chạm) */

SC.Items = {
  list: [],

  clear() { this.list.length = 0; },

  /* chọn loại vật phẩm theo trọng số */
  _roll() {
    const total = SC.ITEM_DEF.reduce((s, d) => s + d.w, 0);
    let r = Math.random() * total;
    for (const d of SC.ITEM_DEF) { r -= d.w; if (r <= 0) return d; }
    return SC.ITEM_DEF[0];
  },

  drop(x, y, forceKind) {
    const def = forceKind ? SC.ITEM_DEF.find(d => d.k === forceKind) : this._roll();
    this.list.push({
      x, y, r: 13, def,
      vx: SC.rnd(-70, 70), vy: SC.rnd(-120, -40),
      born: 0, homing: false, rot: SC.rnd(0, 6.28)
    });
  },

  /* AUTO LOOT: sau 0.25s vật phẩm bay thẳng về phía người chơi rồi tự nhặt */
  update(dt, player, onPick) {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const it = this.list[i];
      it.born += dt; it.rot += dt * 2.2;

      if (!it.homing) {
        it.x += it.vx * dt; it.y += it.vy * dt;
        it.vy += 420 * dt;                     // rơi theo trọng lực một nhịp cho đẹp
        it.vx *= 0.98;
        if (it.born > 0.25) it.homing = true;  // bật auto loot
      } else {
        const a = SC.angTo(it.x, it.y, player.x, player.y);
        const sp = SC.CFG.lootSpeed + it.born * 260;
        it.x += Math.cos(a) * sp * dt;
        it.y += Math.sin(a) * sp * dt;
      }

      if (SC.dist2(it.x, it.y, player.x, player.y) < 26 * 26) {
        onPick(it.def.k, it.x, it.y);
        this.list.splice(i, 1);
        continue;
      }
      if (it.y > SC.H + 60) this.list.splice(i, 1);
    }
  },

  render(ctx) {
    for (const it of this.list) {
      const d = it.def, pulse = 1 + Math.sin(it.born * 8) * 0.08;
      SC.draw.glow(ctx, it.x, it.y, 22 * pulse, d.c, 0.5);
      ctx.save();
      ctx.translate(it.x, it.y);
      ctx.rotate(Math.sin(it.rot) * 0.25);
      ctx.scale(pulse, pulse);

      // viên nang chứa vật phẩm
      ctx.fillStyle = 'rgba(8,14,28,.85)';
      SC.draw.roundRect(ctx, -11, -11, 22, 22, 7); ctx.fill();
      ctx.strokeStyle = d.c; ctx.lineWidth = 2;
      SC.draw.roundRect(ctx, -11, -11, 22, 22, 7); ctx.stroke();

      ctx.fillStyle = d.c;
      ctx.font = '700 13px Segoe UI, sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(d.ic, 0, 1);
      ctx.restore();
    }
  }
};

;
/* ===== js/entity-enemy.js ===== */
/* entity-enemy.js — quái thường: 6 kiểu di chuyển + bắn trả + vẽ nhân vật */

SC.Enemy = function (type, x, y, lv) {
  const d = SC.ENEMY_DEF[type];
  this.type = type; this.def = d;
  this.x = x; this.y = y;
  this.r = d.r;
  // quái mạnh lên theo lực chiến của người chơi (xem system-power.js)
  this.hpMax = Math.round(d.hp * lv.hpMul * SC.Power.hp());
  this.hp = this.hpMax;
  this.spd = d.spd * lv.spdMul * SC.Power.spd();
  this.fireMul = lv.fireMul * SC.Power.fire();
  this.fireT = SC.rnd(0.5, 2) / (d.fire ? this.fireMul : 1);
  this.t = SC.rnd(0, 6.28);
  this.x0 = x;
  this.dead = false;
  this.flash = 0;
  this.flap = 0;
  this.dir = Math.random() < 0.5 ? -1 : 1;
  this.hueShift = SC.rnd(-14, 14);
};

SC.Enemy.prototype.update = function (dt, player, lv) {
  this.t += dt;
  this.flap = Math.sin(this.t * 11);
  if (this.flash > 0) this.flash -= dt;

  switch (this.def.move) {
    case 'sine':                                   // gà con: lượn hình sin
      this.y += this.spd * dt;
      this.x = this.x0 + Math.sin(this.t * 1.9) * 62;
      break;
    case 'hover':                                  // gà mái: xuống rồi lơ lửng ở nửa trên
      this.y += (this.y < SC.H * 0.3 ? this.spd : this.spd * 0.16 + this.retreat()) * dt;
      this.x = this.x0 + Math.sin(this.t * 1.2) * 46;
      break;
    case 'drop':                                   // trứng: rơi thẳng
      this.y += this.spd * dt;
      break;
    case 'dive':                                   // lao thẳng vào người chơi
      if (this.y < SC.H * 0.22) this.y += this.spd * dt;
      else {
        if (!this.locked) { this.locked = SC.angTo(this.x, this.y, player.x, player.y); }
        this.x += Math.cos(this.locked) * this.spd * 2.6 * dt;
        this.y += Math.sin(this.locked) * this.spd * 2.6 * dt;
      }
      break;
    case 'strafe':                                 // UFO: bay ngang qua lại
      this.y += (this.y < SC.H * 0.26 ? this.spd : 8 + this.retreat()) * dt;
      this.x += this.dir * this.spd * 1.5 * dt;
      if (this.x < 40 || this.x > SC.W - 40) this.dir *= -1;
      break;
    case 'push':                                   // tank: đi xuống chậm, lì đòn
      this.y += this.spd * dt;
      this.x += Math.sin(this.t * 0.8) * 22 * dt;
      break;
  }

  // bắn trả
  if (this.def.fire > 0) {
    this.fireT -= dt;
    if (this.fireT <= 0 && this.y > 20 && this.y < SC.H * 0.75) {
      this.fireT = this.def.fire / this.fireMul;
      if (this.type === 'hen') {
        SC.Bullets.spawnFoe(this.x, this.y + this.r, 0, 210, 'egg');
      } else {
        const a = SC.angTo(this.x, this.y, player.x, player.y);
        const n = this.type === 'tank' ? 3 : 1;
        for (let i = 0; i < n; i++) {
          const aa = a + (i - (n - 1) / 2) * 0.22;
          SC.Bullets.spawnFoe(this.x, this.y, Math.cos(aa) * 260, Math.sin(aa) * 260, 'plasma');
        }
      }
    }
  }

  // bay lọt khỏi màn hình: vẫn xoá nhưng đánh dấu để chấm nhiệm vụ "không cho thoát"
  if (this.y > SC.H + 70) { this.dead = true; this.escaped = true; }
};

/* Quái lơ lửng bình thường cứ đứng bắn, nhưng khi màn đã hết wave mà chúng vẫn
   sống thì SC.Waves bật cờ `flee` để chúng rút xuống, tránh kéo dài màn vô tận.
   Chỉ ảnh hưởng phần đuôi màn nên không làm quái thoát hàng loạt giữa trận. */
SC.Enemy.prototype.retreat = function () {
  if (!this.flee) return 0;
  this.fleeT = (this.fleeT || 0) + 0.016;
  return Math.min(this.spd * 2.2, this.fleeT * 90);
};

SC.Enemy.prototype.hurt = function (dmg) {
  this.hp -= dmg;
  this.flash = 0.09;
  return this.hp <= 0;
};

SC.Enemy.prototype.render = function (ctx) {
  const hue = 40 + this.hueShift;
  ctx.save();
  ctx.translate(this.x, this.y);

  if (this.flash > 0) { ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'brightness(2.6)'; }

  switch (this.type) {
    case 'chick': SC.draw.chicken(ctx, this.r, `hsl(${hue},92%,72%)`, '#ff6b4a', this.flap); break;
    case 'hen':   SC.draw.chicken(ctx, this.r, `hsl(${hue - 12},70%,64%)`, '#e33a3a', this.flap * .6); break;
    case 'egg':   this._egg(ctx); break;
    case 'dive':  this._dive(ctx); break;
    case 'ufo':   this._ufo(ctx); break;
    case 'tank':  this._tank(ctx); break;
  }
  ctx.filter = 'none';
  ctx.restore();

  // thanh máu nhỏ cho quái cứng
  if (this.hpMax > 8 && this.hp < this.hpMax) {
    const w = this.r * 2;
    ctx.fillStyle = 'rgba(0,0,0,.5)';
    ctx.fillRect(this.x - w / 2, this.y - this.r - 9, w, 3);
    ctx.fillStyle = '#ff3b5c';
    ctx.fillRect(this.x - w / 2, this.y - this.r - 9, w * (this.hp / this.hpMax), 3);
  }
};

SC.Enemy.prototype._egg = function (ctx) {
  const r = this.r;
  SC.draw.ink(ctx, r * .17);
  ctx.fillStyle = SC.draw.shade(ctx, r * .8, r, '#e8c9a0', '#fffdf6');
  ctx.beginPath(); ctx.ellipse(0, 0, r * .8, r, 0, 0, 6.283);
  ctx.fill(); ctx.stroke();
  SC.draw.rim(ctx, r * .8, r);
  ctx.fillStyle = 'rgba(150,110,70,.35)';                 // đốm vỏ trứng
  ctx.beginPath(); ctx.ellipse(r * .22, r * .25, r * .2, r * .26, 0, 0, 6.283); ctx.fill();
};

SC.Enemy.prototype._dive = function (ctx) {
  const r = this.r;
  ctx.rotate(this.locked ? this.locked - Math.PI / 2 : 0);
  SC.draw.glow(ctx, 0, -r * .5, 18, '#ff5a2b', .5);
  // viền mảnh hơn các quái khác: thân mũi lao hẹp, viền dày sẽ nuốt hết màu cam
  SC.draw.ink(ctx, r * .1);
  const g = ctx.createLinearGradient(-r * .6, -r * .6, r * .6, r);
  g.addColorStop(0, '#ffe0bd'); g.addColorStop(.5, '#ff8a4a'); g.addColorStop(1, '#d94a1e');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(0, r); ctx.lineTo(-r * .85, -r * .6);
  ctx.lineTo(0, -r * .2); ctx.lineTo(r * .85, -r * .6); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#ffd23f';
  ctx.beginPath(); ctx.arc(0, r * .2, r * .3, 0, 6.283); ctx.fill(); ctx.stroke();
};

SC.Enemy.prototype._ufo = function (ctx) {
  const r = this.r;
  SC.draw.glow(ctx, 0, 10, 22, '#4dffd2', .3);
  SC.draw.ink(ctx, r * .13);
  // vòm kính
  ctx.fillStyle = SC.draw.shade(ctx, r * .52, r * .52, '#2aa89a', '#d8fff4');
  ctx.beginPath(); ctx.arc(0, -3, r * .52, Math.PI, 0); ctx.closePath();
  ctx.fill(); ctx.stroke();
  // đĩa bay: tối hơn hẳn trời xanh xám của tầng bình lưu
  const g = ctx.createLinearGradient(0, -r * .4, 0, r * .45);
  g.addColorStop(0, '#cfe0f5'); g.addColorStop(.5, '#7c93b5'); g.addColorStop(1, '#3d4d6b');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.ellipse(0, 3, r, r * .42, 0, 0, 6.283);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#ffd23f';
  for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.arc(i * r * .34, 5, 2.1, 0, 6.283); ctx.fill(); }
};

SC.Enemy.prototype._tank = function (ctx) {
  const r = this.r;
  SC.draw.ink(ctx, r * .1);
  // thân xe: sáng hơn bản cũ và có gờ kim loại, trước đây xám xanh chìm vào nền tối
  const g = ctx.createLinearGradient(0, -r * .8, 0, r * .8);
  g.addColorStop(0, '#c3d2e8'); g.addColorStop(.45, '#7d8ea9'); g.addColorStop(1, '#39465c');
  ctx.fillStyle = g;
  SC.draw.roundRect(ctx, -r, -r * .8, r * 2, r * 1.6, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#2b3a4f';                              // dải giáp tối giữa thân
  ctx.fillRect(-r * .9, -r * .2, r * 1.8, r * .35);
  ctx.fillStyle = '#ff3b5c';
  ctx.beginPath(); ctx.arc(0, -r * .2, r * .3, 0, 6.283); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#8a9ab8';
  ctx.fillRect(-4, r * .6, 8, r * .5);
};

;
/* ===== js/entity-boss-art.js ===== */
/* entity-boss-art.js — bộ điều phối tạo hình trùm + 5 trùm vùng đầu
 *
 * Mỗi hàm vẽ quanh gốc toạ độ (0,0), bán kính thân là r, t là thời gian sống
 * (dùng cho phần động), phase 1..3 để đổi màu khi trùm nổi điên.
 * 5 trùm vùng sau nằm ở entity-boss-art-arcane.js (nạp sau file này). */

SC.BossArt = {
  draw(key, ctx, r, t, phase, hue) {
    // gọi qua .call để hàm vẽ vẫn dùng được _eyes dùng chung
    (this[key] || this.hen).call(this, ctx, r, t, phase, hue);
  },

  /* dùng chung: mắt phát sáng đổi màu theo giai đoạn */
  _eyes(ctx, r, phase, dx, dy, sz) {
    ctx.fillStyle = phase === 3 ? '#ff3b5c' : phase === 2 ? '#ffd23f' : '#8ffcff';
    ctx.beginPath();
    ctx.arc(-dx, dy, sz, 0, 6.283);
    ctx.arc(dx, dy, sz, 0, 6.283);
    ctx.fill();
  },

  /* ĐỒNG QUÊ — gà mẹ khổng lồ đeo mặt nạ chiến đấu */
  hen(ctx, r, t, phase, hue) {
    SC.draw.chicken(ctx, r, `hsl(${hue},80%,62%)`, '#e0342f', Math.sin(t * 5) * .5);
    ctx.fillStyle = 'rgba(20,26,44,.9)';
    SC.draw.roundRect(ctx, -r * .72, -r * .38, r * 1.44, r * .42, 6); ctx.fill();
    this._eyes(ctx, r, phase, r * .35, -r * .17, r * .1);
    ctx.fillStyle = '#5c6b86';
    ctx.fillRect(-r * 1.15, r * .1, 14, 30);
    ctx.fillRect(r * 1.15 - 14, r * .1, 14, 30);
  },

  /* SA MẠC — đại bàng cát sải cánh, lông xoè thành nhiều lớp */
  eagle(ctx, r, t, phase, hue) {
    const f = Math.sin(t * 3) * .22;
    [-1, 1].forEach(s => {
      ctx.save(); ctx.rotate(s * (0.28 + f));
      for (let k = 0; k < 4; k++) {                 // 4 lớp lông dài dần
        const len = r * (1.1 + k * 0.42), w = r * (.3 - k * .04);
        ctx.fillStyle = `hsl(${hue},${68 - k * 6}%,${52 - k * 7}%)`;
        ctx.beginPath();
        ctx.moveTo(s * r * .5, -r * .1 + k * r * .17);
        ctx.quadraticCurveTo(s * len * .7, -r * .35 + k * r * .2, s * len, k * r * .12);
        ctx.lineTo(s * (len - w), k * r * .3 + r * .18);
        ctx.quadraticCurveTo(s * len * .5, k * r * .2, s * r * .5, r * .28 + k * r * .14);
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    });
    ctx.fillStyle = `hsl(${hue},45%,30%)`;           // đuôi xoè
    ctx.beginPath();
    ctx.moveTo(-r * .45, r * .7); ctx.lineTo(r * .45, r * .7);
    ctx.lineTo(r * .22, r * 1.6); ctx.lineTo(0, r * 1.25);
    ctx.lineTo(-r * .22, r * 1.6); ctx.closePath(); ctx.fill();

    ctx.fillStyle = `hsl(${hue},58%,68%)`;           // thân
    ctx.beginPath(); ctx.ellipse(0, r * .1, r * .62, r * .92, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = `hsl(${hue},40%,88%)`;           // đầu trắng kiểu đại bàng
    ctx.beginPath(); ctx.arc(0, -r * .55, r * .52, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#ffb02b';                       // mỏ khoằm
    ctx.beginPath();
    ctx.moveTo(-r * .16, -r * .42); ctx.lineTo(r * .16, -r * .42);
    ctx.quadraticCurveTo(r * .1, r * .12, -r * .04, r * .02);
    ctx.closePath(); ctx.fill();
    this._eyes(ctx, r, phase, r * .26, -r * .68, r * .11);
  },

  /* BĂNG GIÁ — chim cánh cụt cơ khí */
  penguin(ctx, r, t, phase, hue) {
    ctx.fillStyle = '#1b2a3f';
    ctx.beginPath(); ctx.ellipse(0, 0, r * .95, r * 1.05, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#eaf6ff';
    ctx.beginPath(); ctx.ellipse(0, r * .12, r * .62, r * .82, 0, 0, 6.283); ctx.fill();
    [-1, 1].forEach(s => {                           // vây bơi vỗ
      ctx.save(); ctx.rotate(s * (0.5 + Math.sin(t * 4) * .2));
      ctx.fillStyle = '#26405e';
      ctx.beginPath(); ctx.ellipse(s * r * 1.05, r * .1, r * .28, r * .68, 0, 0, 6.283);
      ctx.fill(); ctx.restore();
    });
    ctx.fillStyle = 'rgba(10,20,40,.85)';
    SC.draw.roundRect(ctx, -r * .6, -r * .5, r * 1.2, r * .34, 5); ctx.fill();
    this._eyes(ctx, r, phase, r * .28, -r * .33, r * .11);
    ctx.fillStyle = '#ff9a2b';
    ctx.beginPath(); ctx.moveTo(-r * .18, -r * .05); ctx.lineTo(r * .18, -r * .05);
    ctx.lineTo(0, r * .3); ctx.closePath(); ctx.fill();
  },

  /* RỪNG ĐỘC — nhện nhựa tám chân */
  spider(ctx, r, t, phase, hue) {
    ctx.strokeStyle = `hsl(${hue},60%,32%)`; ctx.lineWidth = r * .13; ctx.lineCap = 'round';
    for (let i = 0; i < 8; i++) {
      const s = i < 4 ? -1 : 1, k = i % 4;
      const a = (0.35 + k * 0.32) * s, bend = Math.sin(t * 4 + i) * .18;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.sin(a) * r * 1.5, Math.cos(a) * r * .5 - r * .2);
      ctx.lineTo(Math.sin(a + bend) * r * 2.1, Math.cos(a) * r * .5 + r * .9);
      ctx.stroke();
    }
    ctx.fillStyle = `hsl(${hue},65%,26%)`;
    ctx.beginPath(); ctx.ellipse(0, r * .25, r * .95, r * .85, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = `hsl(${hue},80%,55%)`;
    ctx.beginPath(); ctx.ellipse(0, -r * .45, r * .62, r * .52, 0, 0, 6.283); ctx.fill();
    this._eyes(ctx, r, phase, r * .3, -r * .5, r * .12);
    this._eyes(ctx, r, phase, r * .48, -r * .28, r * .07);
  },

  /* NÚI LỬA — phượng hoàng dung nham, cánh lửa nhiều tia */
  phoenix(ctx, r, t, phase, hue) {
    const f = Math.sin(t * 6) * .22;
    [-1, 1].forEach(s => {
      ctx.save(); ctx.rotate(s * (0.42 + f));
      for (let k = 0; k < 5; k++) {                 // từng ngọn lửa tách rời
        const len = r * (1.3 + k * 0.28);
        ctx.fillStyle = k % 2 ? '#ff8c1a' : '#ffd23f';
        ctx.beginPath();
        ctx.moveTo(s * r * .45, -r * .25 + k * r * .22);
        ctx.quadraticCurveTo(s * len * .75, -r * .5 + k * r * .3, s * len, k * r * .16);
        ctx.quadraticCurveTo(s * len * .6, k * r * .34 + r * .1, s * r * .45, r * .05 + k * r * .22);
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    });
    SC.draw.glow(ctx, 0, 0, r * 1.9, '#ff7a1a', .6);

    ctx.fillStyle = '#ffcf5c';                       // đuôi lửa dài
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(i * r * .18, r * .7);
      ctx.quadraticCurveTo(i * r * .5, r * 1.3, i * r * .35 + Math.sin(t * 4 + i) * r * .2, r * 1.9);
      ctx.quadraticCurveTo(i * r * .1, r * 1.2, i * r * .18 + r * .16, r * .7);
      ctx.closePath(); ctx.fill();
    }

    const g = ctx.createLinearGradient(0, -r, 0, r);
    g.addColorStop(0, '#ffe9a8'); g.addColorStop(1, '#e03a0a');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.ellipse(0, 0, r * .66, r * .98, 0, 0, 6.283); ctx.fill();

    ctx.fillStyle = '#ffd23f';                       // mào lửa
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath(); ctx.moveTo(i * r * .3, -r * .78);
      ctx.lineTo(i * r * .3 + r * .1, -r * 1.55 - Math.abs(i) * r * .18);
      ctx.lineTo(i * r * .3 + r * .24, -r * .76); ctx.closePath(); ctx.fill();
    }
    ctx.fillStyle = '#ff8c1a';                       // mỏ
    ctx.beginPath(); ctx.moveTo(-r * .16, -r * .1); ctx.lineTo(r * .16, -r * .1);
    ctx.lineTo(0, r * .34); ctx.closePath(); ctx.fill();
    this._eyes(ctx, r, phase, r * .29, -r * .38, r * .12);
  }
};

;
/* ===== js/entity-boss-art-arcane.js ===== */
/* entity-boss-art-arcane.js — tạo hình trùm 5 vùng sau: đại dương, neon,
 * nghĩa địa sắt, bình lưu, hư không.
 *
 * Gộp thêm vào SC.BossArt đã tạo ở entity-boss-art.js nên phải nạp sau file đó. */

Object.assign(SC.BossArt, {

  /* ĐẠI DƯƠNG — bạch tuộc thép */
  octopus(ctx, r, t, phase, hue) {
    ctx.strokeStyle = `hsl(${hue},55%,38%)`; ctx.lineWidth = r * .2; ctx.lineCap = 'round';
    for (let i = 0; i < 6; i++) {
      const x = (i - 2.5) * r * .42;
      ctx.beginPath(); ctx.moveTo(x, r * .3);
      ctx.quadraticCurveTo(x + Math.sin(t * 3 + i) * r * .6, r * 1.1,
        x + Math.sin(t * 3 + i) * r * 1.1, r * 1.7);
      ctx.stroke();
    }
    ctx.fillStyle = `hsl(${hue},50%,55%)`;
    ctx.beginPath(); ctx.ellipse(0, -r * .1, r * 1.05, r * .95, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.22)';
    ctx.beginPath(); ctx.ellipse(-r * .3, -r * .5, r * .3, r * .2, -0.5, 0, 6.283); ctx.fill();
    this._eyes(ctx, r, phase, r * .4, -r * .1, r * .19);
  },

  /* NEON — gà máy neon góc cạnh */
  neonRooster(ctx, r, t, phase, hue) {
    SC.draw.glow(ctx, 0, 0, r * 1.7, `hsl(${hue},95%,60%)`, .5);
    ctx.fillStyle = '#1a0b2e';
    ctx.beginPath();
    ctx.moveTo(0, -r * 1.1); ctx.lineTo(r * .95, -r * .3); ctx.lineTo(r * .7, r * .95);
    ctx.lineTo(-r * .7, r * .95); ctx.lineTo(-r * .95, -r * .3);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = `hsl(${hue},95%,65%)`; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = `hsl(${hue},95%,62%)`;            // mào neon
    for (let i = -1; i <= 1; i++) {
      ctx.fillRect(i * r * .3 - r * .06, -r * 1.5 - Math.abs(i) * r * .12,
        r * .12, r * .45 + Math.abs(i) * r * .12);
    }
    ctx.fillStyle = '#ff2bd0';
    ctx.beginPath(); ctx.moveTo(-r * .2, r * .1); ctx.lineTo(r * .2, r * .1);
    ctx.lineTo(0, r * .5); ctx.closePath(); ctx.fill();
    this._eyes(ctx, r, phase, r * .38, -r * .35, r * .13);
  },

  /* NGHĨA ĐỊA SẮT — đầu rồng ghép từ sắt vụn */
  scrapDragon(ctx, r, t, phase, hue) {
    ctx.fillStyle = '#4a3d2a';                        // sừng
    [-1, 1].forEach(s => {
      ctx.beginPath(); ctx.moveTo(s * r * .45, -r * .75);
      ctx.lineTo(s * r * 1.05, -r * 1.6); ctx.lineTo(s * r * .8, -r * .55);
      ctx.closePath(); ctx.fill();
    });
    ctx.fillStyle = `hsl(${hue},28%,45%)`;
    SC.draw.roundRect(ctx, -r * .95, -r * .85, r * 1.9, r * 1.5, r * .3); ctx.fill();
    ctx.fillStyle = '#2a2118';                        // hàm dưới
    SC.draw.roundRect(ctx, -r * .78, r * .35, r * 1.56, r * .55, 5); ctx.fill();
    ctx.fillStyle = '#d8c69c';                        // răng
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath(); ctx.moveTo(i * r * .22 - r * .07, r * .35);
      ctx.lineTo(i * r * .22 + r * .07, r * .35);
      ctx.lineTo(i * r * .22, r * .62); ctx.closePath(); ctx.fill();
    }
    this._eyes(ctx, r, phase, r * .42, -r * .35, r * .14);
    ctx.fillStyle = 'rgba(255,255,255,.12)';
    ctx.fillRect(-r * .95, -r * .2, r * 1.9, r * .1);
  },

  /* BÌNH LƯU — mắt bão xoáy */
  stormEye(ctx, r, t, phase, hue) {
    ctx.save(); ctx.rotate(t * 1.2);
    for (let k = 0; k < 3; k++) {
      ctx.strokeStyle = `hsla(${hue},60%,${72 - k * 12}%,${.5 - k * .12})`;
      ctx.lineWidth = r * (.34 - k * .07);
      ctx.beginPath();
      ctx.arc(0, 0, r * (1.5 - k * .32), k * 2.1, k * 2.1 + 4.2);
      ctx.stroke();
    }
    ctx.restore();
    ctx.fillStyle = '#101a2e';
    ctx.beginPath(); ctx.arc(0, 0, r * .8, 0, 6.283); ctx.fill();
    ctx.fillStyle = phase === 3 ? '#ff3b5c' : '#9fd8ff';
    ctx.beginPath(); ctx.ellipse(0, 0, r * .5, r * .34, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#05070f';
    ctx.beginPath(); ctx.ellipse(0, 0, r * .17, r * .3, 0, 0, 6.283); ctx.fill();
    SC.draw.glow(ctx, 0, 0, r * 1.2, '#8fd8ff', .4);
  },

  /* HƯ KHÔNG — quả trứng vũ trụ nứt vỡ */
  voidEgg(ctx, r, t, phase, hue) {
    SC.draw.glow(ctx, 0, 0, r * 2, `hsl(${hue},90%,60%)`, .5);
    const g = ctx.createLinearGradient(0, -r * 1.2, 0, r * 1.2);
    g.addColorStop(0, '#2a1358'); g.addColorStop(1, '#0b0520');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.ellipse(0, 0, r * .92, r * 1.18, 0, 0, 6.283); ctx.fill();
    ctx.strokeStyle = `hsl(${hue},95%,${60 + phase * 8}%)`;   // vết nứt phát sáng
    ctx.lineWidth = 3 + phase;
    for (let k = 0; k < 3; k++) {
      ctx.beginPath();
      ctx.moveTo(-r * .8 + k * r * .55, -r * 1.05);
      ctx.lineTo(-r * .45 + k * r * .5, -r * .2 + Math.sin(t * 2 + k) * r * .1);
      ctx.lineTo(-r * .7 + k * r * .6, r * 1.05);
      ctx.stroke();
    }
    ctx.save(); ctx.rotate(-t * .8);
    SC.draw.star(ctx, 0, 0, r * .42, 6);
    ctx.fillStyle = phase === 3 ? '#ff3b5c' : '#e0c8ff'; ctx.fill();
    ctx.restore();
  }
});

;
/* ===== js/entity-boss-art-elite.js ===== */
/* entity-boss-art-elite.js — tạo hình 10 quái tinh nhuệ (elite) ở map đuôi 5
 *
 * Mỗi vùng một con, dáng khác hẳn trùm vùng để người chơi nhìn là biết đây là
 * chặng giữa chứ không phải màn kết. Gộp vào SC.BossArt nên nạp sau file gốc. */

Object.assign(SC.BossArt, {

  /* ĐỒNG QUÊ — bù nhìn sắt canh ruộng */
  scarecrow(ctx, r, t, phase, hue) {
    ctx.strokeStyle = '#6b4a2a'; ctx.lineWidth = r * .17; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-r * 1.3, -r * .1); ctx.lineTo(r * 1.3, -r * .1);
    ctx.moveTo(0, -r * .5); ctx.lineTo(0, r * 1.4); ctx.stroke();
    ctx.fillStyle = '#d9a441';                        // rơm thò ra
    for (let i = -3; i <= 3; i++) {
      ctx.save(); ctx.rotate(i * .22);
      ctx.fillRect(-r * .06, -r * 1.05, r * .12, r * .5); ctx.restore();
    }
    ctx.fillStyle = `hsl(${hue},55%,68%)`;            // đầu bao tải
    ctx.beginPath(); ctx.ellipse(0, -r * .5, r * .68, r * .74, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#2b1d10';                        // nón rộng vành
    ctx.beginPath(); ctx.ellipse(0, -r * 1.05, r * 1.15, r * .2, 0, 0, 6.283); ctx.fill();
    SC.draw.roundRect(ctx, -r * .45, -r * 1.55, r * .9, r * .55, 6); ctx.fill();
    this._eyes(ctx, r, phase, r * .27, -r * .55, r * .13);
    ctx.strokeStyle = '#2b1d10'; ctx.lineWidth = 2;   // miệng khâu chỉ
    ctx.beginPath(); ctx.moveTo(-r * .3, -r * .2); ctx.lineTo(r * .3, -r * .2); ctx.stroke();
  },

  /* SA MẠC — bọ cạp cát nhìn từ trên xuống: càng chĩa trước, đuôi vắt qua đầu */
  scorpion(ctx, r, t, phase, hue) {
    const sway = Math.sin(t * 2.2) * .12;

    ctx.strokeStyle = `hsl(${hue},50%,34%)`; ctx.lineWidth = r * .1; ctx.lineCap = 'round';
    [-1, 1].forEach(s => {                             // 6 chân bò
      for (let k = 0; k < 3; k++) {
        const y = r * (.1 + k * .32);
        ctx.beginPath(); ctx.moveTo(s * r * .35, y);
        ctx.lineTo(s * r * (1.0 + k * .1), y + r * (.2 + Math.sin(t * 5 + k) * .06));
        ctx.stroke();
      }
    });

    // đuôi cuộn vắt lên trên đầu, vẽ bằng các đốt tròn nhỏ dần
    for (let k = 0; k < 6; k++) {
      const a = -1.35 + k * .38 + sway;
      const rad = r * (1.15 - k * .04);
      const x = Math.sin(a) * rad * .8, y = r * .5 - Math.cos(a) * rad;
      ctx.fillStyle = `hsl(${hue},58%,${48 - k * 2}%)`;
      ctx.beginPath(); ctx.arc(x, y, r * (.24 - k * .022), 0, 6.283); ctx.fill();
      if (k === 5) {                                   // ngòi độc ở chót đuôi
        ctx.fillStyle = '#ffd23f';
        ctx.beginPath(); ctx.moveTo(x - r * .13, y);
        ctx.lineTo(x + r * .13, y); ctx.lineTo(x, y - r * .48);
        ctx.closePath(); ctx.fill();
      }
    }

    [-1, 1].forEach(s => {                             // hai càng chĩa lên trước
      ctx.strokeStyle = `hsl(${hue},52%,40%)`; ctx.lineWidth = r * .14;
      ctx.beginPath(); ctx.moveTo(s * r * .3, -r * .2);
      ctx.lineTo(s * r * .78, -r * .68); ctx.stroke();
      ctx.fillStyle = `hsl(${hue},58%,52%)`;           // kìm
      ctx.beginPath();
      ctx.ellipse(s * r * .95, -r * .88, r * .3, r * .17, s * -.7, 0, 6.283); ctx.fill();
      ctx.fillStyle = '#2b1d10';
      ctx.beginPath();
      ctx.ellipse(s * r * 1.12, -r * 1.02, r * .12, r * .05, s * -.7, 0, 6.283); ctx.fill();
    });

    ctx.fillStyle = `hsl(${hue},55%,46%)`;             // thân đốt
    ctx.beginPath(); ctx.ellipse(0, r * .35, r * .46, r * .72, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = `hsl(${hue},60%,58%)`;             // đầu ngực
    ctx.beginPath(); ctx.ellipse(0, -r * .28, r * .42, r * .38, 0, 0, 6.283); ctx.fill();
    this._eyes(ctx, r, phase, r * .17, -r * .34, r * .09);
  },

  /* BĂNG GIÁ — đầu gấu trắng bọc thép */
  iceBear(ctx, r, t, phase, hue) {
    ctx.fillStyle = '#dbeaff';
    [-1, 1].forEach(s => {                             // tai tròn
      ctx.beginPath(); ctx.arc(s * r * .72, -r * .72, r * .3, 0, 6.283); ctx.fill();
    });
    ctx.beginPath(); ctx.ellipse(0, 0, r * .98, r * .9, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#8fb6d8';                         // tấm giáp trán
    SC.draw.roundRect(ctx, -r * .85, -r * .62, r * 1.7, r * .42, 6); ctx.fill();
    ctx.fillStyle = '#f4fbff';                         // mõm
    ctx.beginPath(); ctx.ellipse(0, r * .42, r * .5, r * .36, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#26405e';
    ctx.beginPath(); ctx.ellipse(0, r * .3, r * .16, r * .12, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#cfe6ff';                         // răng nanh
    [-1, 1].forEach(s => {
      ctx.beginPath(); ctx.moveTo(s * r * .18, r * .5);
      ctx.lineTo(s * r * .3, r * .5); ctx.lineTo(s * r * .24, r * .82);
      ctx.closePath(); ctx.fill();
    });
    this._eyes(ctx, r, phase, r * .38, -r * .2, r * .12);
  },

  /* RỪNG ĐỘC — ong chúa mang ngòi độc */
  wasp(ctx, r, t, phase, hue) {
    const f = Math.sin(t * 18) * .3;
    ctx.fillStyle = 'rgba(220,255,240,.4)';            // cánh rung
    [-1, 1].forEach(s => {
      ctx.save(); ctx.rotate(s * (.6 + f));
      ctx.beginPath(); ctx.ellipse(s * r * .9, -r * .5, r * .8, r * .3, 0, 0, 6.283);
      ctx.fill(); ctx.restore();
    });
    ctx.fillStyle = '#ffd23f';                         // bụng vằn
    ctx.beginPath(); ctx.ellipse(0, r * .55, r * .55, r * .85, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#1c1c22';
    for (let k = 0; k < 3; k++) {
      ctx.beginPath();
      ctx.ellipse(0, r * (.25 + k * .38), r * (.53 - k * .1), r * .13, 0, 0, 6.283); ctx.fill();
    }
    ctx.fillStyle = `hsl(${hue},70%,45%)`;             // ngực
    ctx.beginPath(); ctx.ellipse(0, -r * .3, r * .6, r * .5, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#1c1c22';                         // đầu
    ctx.beginPath(); ctx.ellipse(0, -r * .85, r * .42, r * .36, 0, 0, 6.283); ctx.fill();
    this._eyes(ctx, r, phase, r * .22, -r * .88, r * .12);
    ctx.fillStyle = '#8fff9f';                         // ngòi
    ctx.beginPath(); ctx.moveTo(-r * .1, r * 1.3); ctx.lineTo(r * .1, r * 1.3);
    ctx.lineTo(0, r * 1.85); ctx.closePath(); ctx.fill();
  },

  /* NÚI LỬA — cự thạch dung nham: đầu, vai và hai nắm đấm rời nhau */
  golem(ctx, r, t, phase, hue) {
    const bob = Math.sin(t * 2) * r * .05;
    SC.draw.glow(ctx, 0, r * .2, r * 1.7, '#ff6a1a', .45);

    [-1, 1].forEach(s => {                             // nắm đấm đá lơ lửng hai bên
      ctx.fillStyle = '#4a2e26';
      SC.draw.roundRect(ctx, s * r * 1.02 - r * .3, r * .25 - bob * s,
        r * .6, r * .58, r * .16); ctx.fill();
      ctx.fillStyle = '#2a1815';
      ctx.fillRect(s * r * 1.02 - r * .22, r * .5 - bob * s, r * .44, r * .06);
    });

    ctx.fillStyle = '#3a2420';                         // thân khối
    SC.draw.roundRect(ctx, -r * .78, -r * .1, r * 1.56, r * 1.15, r * .2); ctx.fill();
    ctx.fillStyle = '#4a2e26';                         // bờ vai gồ
    SC.draw.roundRect(ctx, -r * .95, -r * .28, r * 1.9, r * .42, r * .18); ctx.fill();

    ctx.strokeStyle = `hsl(${hue},95%,${52 + phase * 6}%)`;   // khe dung nham
    ctx.lineWidth = 3 + phase;
    for (let k = -1; k <= 1; k++) {
      ctx.beginPath();
      ctx.moveTo(k * r * .45 - r * .12, r * .05);
      ctx.lineTo(k * r * .45 + r * .12, r * .5 + Math.sin(t * 3 + k) * r * .05);
      ctx.lineTo(k * r * .45 - r * .06, r * 1.0);
      ctx.stroke();
    }

    ctx.fillStyle = '#5a382c';                         // đầu đá nhỏ hơn thân
    SC.draw.roundRect(ctx, -r * .46, -r * 1.0, r * .92, r * .78, r * .16); ctx.fill();
    ctx.fillStyle = '#120a08';                         // hốc mắt
    SC.draw.roundRect(ctx, -r * .38, -r * .82, r * .76, r * .3, 4); ctx.fill();
    this._eyes(ctx, r, phase, r * .2, -r * .67, r * .11);
  }
});

;
/* ===== js/entity-boss-art-elite-late.js ===== */
/* entity-boss-art-elite-late.js — 5 quái tinh nhuệ của các vùng sau:
 * đại dương, neon, nghĩa địa sắt, bình lưu, hư không. */

Object.assign(SC.BossArt, {

  /* ĐẠI DƯƠNG — cá mập bọc thép */
  shark(ctx, r, t, phase, hue) {
    const sway = Math.sin(t * 3) * .12;
    ctx.fillStyle = `hsl(${hue},40%,42%)`;
    ctx.save(); ctx.rotate(sway);
    ctx.beginPath();                                   // vây lưng
    ctx.moveTo(-r * .1, -r * .8); ctx.lineTo(r * .18, -r * 1.6);
    ctx.lineTo(r * .42, -r * .7); ctx.closePath(); ctx.fill();
    [-1, 1].forEach(s => {                             // vây ngực
      ctx.beginPath();
      ctx.moveTo(s * r * .6, r * .1); ctx.lineTo(s * r * 1.5, r * .7);
      ctx.lineTo(s * r * .55, r * .6); ctx.closePath(); ctx.fill();
    });
    ctx.beginPath(); ctx.ellipse(0, 0, r * .72, r * 1.05, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#e8f4ff';                         // bụng trắng
    ctx.beginPath(); ctx.ellipse(0, r * .25, r * .48, r * .7, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#0d1c28';                         // hàm há
    ctx.beginPath(); ctx.ellipse(0, r * .62, r * .46, r * .3, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#fff';
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath(); ctx.moveTo(i * r * .18 - r * .06, r * .4);
      ctx.lineTo(i * r * .18 + r * .06, r * .4);
      ctx.lineTo(i * r * .18, r * .68); ctx.closePath(); ctx.fill();
    }
    this._eyes(ctx, r, phase, r * .4, -r * .1, r * .11);
    ctx.restore();
  },

  /* NEON — drone giám sát bốn cánh quạt */
  droneEye(ctx, r, t, phase, hue) {
    SC.draw.glow(ctx, 0, 0, r * 1.6, `hsl(${hue},95%,62%)`, .45);
    ctx.strokeStyle = `hsl(${hue},90%,58%)`; ctx.lineWidth = r * .12;
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(sx * r * .95, sy * r * .8); ctx.stroke();
      ctx.save(); ctx.translate(sx * r * .95, sy * r * .8);
      ctx.rotate(t * 22);                              // cánh quạt quay
      ctx.fillStyle = 'rgba(255,170,255,.5)';
      ctx.beginPath(); ctx.ellipse(0, 0, r * .5, r * .07, 0, 0, 6.283); ctx.fill();
      ctx.beginPath(); ctx.ellipse(0, 0, r * .07, r * .5, 0, 0, 6.283); ctx.fill();
      ctx.restore();
    });
    ctx.fillStyle = '#1a0b2e';
    SC.draw.roundRect(ctx, -r * .62, -r * .5, r * 1.24, r * 1, r * .25); ctx.fill();
    ctx.strokeStyle = `hsl(${hue},95%,66%)`; ctx.lineWidth = 2;
    SC.draw.roundRect(ctx, -r * .62, -r * .5, r * 1.24, r * 1, r * .25); ctx.stroke();
    ctx.fillStyle = phase === 3 ? '#ff3b5c' : '#8ffcff';   // ống kính
    ctx.beginPath(); ctx.arc(0, 0, r * .3, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#05070f';
    ctx.beginPath(); ctx.arc(0, 0, r * .13, 0, 6.283); ctx.fill();
  },

  /* NGHĨA ĐỊA SẮT — máy nghiền hai trục */
  crusher(ctx, r, t, phase, hue) {
    ctx.fillStyle = '#3a3125';
    SC.draw.roundRect(ctx, -r * 1.1, -r * .85, r * 2.2, r * 1.3, 8); ctx.fill();
    [-1, 1].forEach(s => {                             // trục nghiền quay
      ctx.save(); ctx.translate(s * r * .5, r * .55); ctx.rotate(t * 4 * s);
      ctx.fillStyle = `hsl(${hue},22%,52%)`;
      ctx.beginPath(); ctx.arc(0, 0, r * .42, 0, 6.283); ctx.fill();
      ctx.fillStyle = '#1c1710';
      for (let k = 0; k < 6; k++) {
        ctx.save(); ctx.rotate(k * 1.047);
        ctx.fillRect(-r * .06, -r * .46, r * .12, r * .2); ctx.restore();
      }
      ctx.restore();
    });
    ctx.fillStyle = '#5a4c36';                         // buồng máy
    SC.draw.roundRect(ctx, -r * .8, -r * .62, r * 1.6, r * .8, 6); ctx.fill();
    ctx.fillStyle = '#d8c69c';
    ctx.fillRect(-r * .8, -r * .18, r * 1.6, r * .08);
    this._eyes(ctx, r, phase, r * .36, -r * .34, r * .13);
  },

  /* BÌNH LƯU — chim sấm cánh tia chớp */
  thunderbird(ctx, r, t, phase, hue) {
    const f = Math.sin(t * 4) * .18;
    ctx.fillStyle = `hsl(${hue},45%,58%)`;
    [-1, 1].forEach(s => {                             // cánh gấp khúc như tia chớp
      ctx.save(); ctx.rotate(s * (.2 + f));
      ctx.beginPath();
      ctx.moveTo(s * r * .4, -r * .3);
      ctx.lineTo(s * r * 1.3, -r * .75); ctx.lineTo(s * r * 1.0, -r * .15);
      ctx.lineTo(s * r * 2.0, -r * .35); ctx.lineTo(s * r * 1.15, r * .6);
      ctx.lineTo(s * r * .45, r * .3);
      ctx.closePath(); ctx.fill(); ctx.restore();
    });
    SC.draw.glow(ctx, 0, 0, r * 1.5, '#9fd8ff', .4);
    ctx.fillStyle = '#2c3c5e';
    ctx.beginPath(); ctx.ellipse(0, 0, r * .58, r * .95, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#ffd23f';                         // mỏ
    ctx.beginPath(); ctx.moveTo(-r * .16, -r * .5); ctx.lineTo(r * .16, -r * .5);
    ctx.lineTo(0, -r * .05); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#8ffcff'; ctx.lineWidth = 3;    // tia điện chạy dọc thân
    ctx.beginPath();
    ctx.moveTo(-r * .18, r * .1); ctx.lineTo(r * .12, r * .4);
    ctx.lineTo(-r * .1, r * .55); ctx.lineTo(r * .16, r * .9); ctx.stroke();
    this._eyes(ctx, r, phase, r * .26, -r * .62, r * .11);
  },

  /* HƯ KHÔNG — lăng trụ hư không xoay chậm */
  voidPrism(ctx, r, t, phase, hue) {
    SC.draw.glow(ctx, 0, 0, r * 1.9, `hsl(${hue},90%,62%)`, .5);
    ctx.save(); ctx.rotate(Math.sin(t * .6) * .35);
    const g = ctx.createLinearGradient(-r, -r, r, r);
    g.addColorStop(0, '#6a3fd0'); g.addColorStop(.5, '#1a0b3a'); g.addColorStop(1, '#3b1c7a');
    ctx.fillStyle = g;
    ctx.beginPath();                                   // khối bát diện
    ctx.moveTo(0, -r * 1.35); ctx.lineTo(r * .9, 0);
    ctx.lineTo(0, r * 1.35); ctx.lineTo(-r * .9, 0);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = `hsl(${hue},95%,${66 + phase * 6}%)`; ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.beginPath();                                   // cạnh trong
    ctx.moveTo(0, -r * 1.35); ctx.lineTo(0, r * 1.35);
    ctx.moveTo(-r * .9, 0); ctx.lineTo(r * .9, 0); ctx.stroke();
    ctx.restore();
    ctx.fillStyle = phase === 3 ? '#ff3b5c' : '#e0c8ff';
    ctx.beginPath(); ctx.ellipse(0, 0, r * .3, r * .18, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#05070f';
    ctx.beginPath(); ctx.ellipse(0, 0, r * .1, r * .14, 0, 0, 6.283); ctx.fill();
  }
});

;
/* ===== js/entity-boss-move.js ===== */
/* entity-boss-move.js — đường đi của trùm khi không đang ra chiêu
 *
 * Trước đây trùm chỉ trượt ngang qua lại ở y=150 suốt trận, nên đánh trùm nào cũng
 * y hệt nhau: dí sát đáy, chĩa lên, giữ nguyên. Giờ máy bay đã biết quay đầu bắn
 * xuống (system-facing.js) nên trùm xuống thấp không còn là đòn bất công — mở ra
 * chỗ cho nó đi khắp bản đồ.
 *
 * Mỗi kiểu đi chạy vài giây rồi đổi. Càng vào giai đoạn sau càng chọn kiểu hung hơn.
 */

SC.BossMove = {
  /* Vùng bay hợp lệ: chừa mép và chừa dải đáy nơi người chơi hay đứng — trùm to
     bằng nửa bề ngang, xuống hẳn đáy là chèn chết người chơi chứ không phải thử thách. */
  bounds(b) {
    return { x0: b.r + 26, x1: SC.W - b.r - 26, y0: 120, y1: SC.H * 0.62 };
  },

  KIỂU: {
    1: ['patrol', 'sway', 'figure8'],
    2: ['patrol', 'figure8', 'dive', 'orbit'],
    3: ['figure8', 'dive', 'orbit', 'corners']
  },

  reset(b) {
    b.mv = 'patrol'; b.mvT = 3.4; b.mvI = 0;
    b.ax = b.x; b.ay = 150;                  // điểm neo của kiểu đang chạy
  },

  update(b, dt, rage, player) {
    b.mvT -= dt;
    if (b.mvT <= 0) this._next(b, player);
    const B = this.bounds(b);
    this['_' + b.mv](b, dt, rage, B, player);
    b.x = SC.clamp(b.x, B.x0, B.x1);
    b.y = SC.clamp(b.y, B.y0, B.y1);
  },

  _next(b, player) {
    const pool = this.KIỂU[b.phase] || this.KIỂU[1];
    let k = pool[Math.floor(Math.random() * pool.length)];
    if (k === b.mv && pool.length > 1) k = pool[(pool.indexOf(k) + 1) % pool.length];
    b.mv = k;
    b.mvT = k === 'corners' ? 3.0 : k === 'dive' ? 2.6 : 4.2;
    b.mvI = 0;
    b.ax = b.x; b.ay = b.y;
    if (k === 'corners' || k === 'dive') b.mvTx = player ? player.x : SC.W / 2;
  },

  /* trượt ngang ở trên cao — kiểu cũ, giữ lại làm nhịp nghỉ */
  _patrol(b, dt, rage, B) {
    b.x += b.dir * 70 * rage * dt;
    if (b.x <= B.x0) b.dir = 1;
    if (b.x >= B.x1) b.dir = -1;
    b.y = SC.lerp(b.y, 150 + Math.sin(b.t * 1.1) * 26, 1 - Math.pow(0.02, dt));
  },

  /* lắc lư quanh chỗ đang đứng, vừa dịch dần sang ngang */
  _sway(b, dt, rage, B) {
    b.x += b.dir * 40 * rage * dt;
    if (b.x <= B.x0) b.dir = 1;
    if (b.x >= B.x1) b.dir = -1;
    b.y = SC.lerp(b.y, 170 + Math.sin(b.t * 2.2) * 52, 1 - Math.pow(0.03, dt));
  },

  /* số 8 nằm ngang, phủ gần hết bề ngang và nửa trên chiều cao */
  _figure8(b, dt, rage, B) {
    b.mvI += dt * 0.85 * rage;
    const cx = (B.x0 + B.x1) / 2, rx = (B.x1 - B.x0) / 2;
    const cy = B.y0 + (B.y1 - B.y0) * 0.35, ry = (B.y1 - B.y0) * 0.32;
    b.x = SC.lerp(b.x, cx + Math.sin(b.mvI) * rx, 1 - Math.pow(0.004, dt));
    b.y = SC.lerp(b.y, cy + Math.sin(b.mvI * 2) * ry, 1 - Math.pow(0.004, dt));
  },

  /* bổ nhào xuống sâu rồi vọt lên — kiểu duy nhất chạm tới nửa dưới màn hình */
  _dive(b, dt, rage, B) {
    b.mvI += dt / 2.6;
    const k = Math.min(1, b.mvI);
    const s = Math.sin(k * Math.PI);                 // xuống rồi lên
    b.y = SC.lerp(B.y0, B.y1, s);
    b.x = SC.lerp(b.ax, b.mvTx || SC.W / 2, Math.min(1, k * 1.4));
  },

  /* lượn vòng tròn quanh nửa trên, bán kính lớn */
  _orbit(b, dt, rage, B) {
    b.mvI += dt * 1.15 * rage;
    const cx = (B.x0 + B.x1) / 2, cy = B.y0 + (B.y1 - B.y0) * 0.34;
    const rx = (B.x1 - B.x0) * 0.42, ry = (B.y1 - B.y0) * 0.3;
    b.x = SC.lerp(b.x, cx + Math.cos(b.mvI) * rx, 1 - Math.pow(0.005, dt));
    b.y = SC.lerp(b.y, cy + Math.sin(b.mvI) * ry, 1 - Math.pow(0.005, dt));
  },

  /* nhảy giữa 4 góc vùng bay, dừng ngắn ở mỗi góc */
  _corners(b, dt, rage, B) {
    b.mvI += dt;
    const step = 0.75 / rage;
    const i = Math.floor(b.mvI / step) % 4;
    const pts = [[B.x0, B.y0], [B.x1, B.y1], [B.x1, B.y0], [B.x0, B.y1]];
    b.x = SC.lerp(b.x, pts[i][0], 1 - Math.pow(0.0015, dt));
    b.y = SC.lerp(b.y, pts[i][1], 1 - Math.pow(0.0015, dt));
  }
};

;
/* ===== js/entity-boss-skills.js ===== */
/* entity-boss-skills.js — 6 chiêu "có kịch bản" của trùm và elite
 *
 * Khác với 6 chiêu cũ (ring/aimed/sweep/spread/eggRain/minions) vốn chỉ là các
 * kiểu rải đạn, nhóm này kéo dài nhiều giây, tự điều khiển thân trùm và buộc
 * người chơi đổi chỗ đứng — đó mới là chỗ tạo ra "trận đấu" thay vì "né mưa đạn".
 *
 * Mỗi chiêu chiếm quyền di chuyển của trùm trong lúc diễn ra: entity-boss.js thấy
 * b.act còn sống thì nhường, hết thì lấy lại đường bay ngang quen thuộc.
 */

SC.BossSkills = {
  LIST: ['charge', 'rocket', 'boomerang', 'blind', 'blink', 'punch'],
  TÊN: {
    charge: 'GỒNG NỘ — LAO TỚI!', rocket: 'HOẢ TIỄN!', boomerang: 'TÁCH THÂN!',
    blind: 'BÓNG TỐI!', blink: 'DỊCH CHUYỂN!', punch: 'THIẾT QUYỀN!'
  },
  splats: [],                                     // vệt mực che màn của chiêu 'blind'

  has(kind) { return this.LIST.indexOf(kind) >= 0; },
  clear() { this.splats.length = 0; },

  start(b, kind, player) {
    const rage = b.phase;                          // giai đoạn càng cao càng dữ
    b.act = { kind, t: 0, step: 0, n: 0 };
    const a = b.act;

    if (kind === 'charge') {
      a.dur = 2.0; a.tx = player.x; a.ty = player.y;
      a.x0 = b.x; a.y0 = b.y;
    } else if (kind === 'rocket') {
      a.dur = 1.5; a.left = 2 + rage; a.gap = 0.26;
    } else if (kind === 'boomerang') {
      a.dur = 1.9;
      a.parts = [{ side: -1 }, { side: 1 }].map(p => ({ side: p.side, x: 0, y: 0, rot: 0 }));
    } else if (kind === 'blind') {
      a.dur = 0.7;
      for (let i = 0; i < 3 + rage; i++) {
        this.splats.push({
          x: SC.rnd(40, SC.W - 40), y: SC.rnd(SC.H * 0.25, SC.H * 0.9),
          r: SC.rnd(70, 130), t: 0, life: 2.6 + rage * 0.5, seed: SC.rnd(0, 6.28)
        });
      }
    } else if (kind === 'blink') {
      a.dur = 0.42 * (2 + rage); a.hops = 2 + rage; a.hop = 0.42;
    } else if (kind === 'punch') {
      a.dur = 0.72 * (1 + rage); a.hit = 0; a.reach = 0; a.ang = 0; a.far = SC.H * 0.6;
    }

    SC.FX.text(b.x, b.y - b.r - 26, this.TÊN[kind], '#ff5c7a');
    SC.Audio.shield();
  },

  /* true = chiêu còn chạy, entity-boss.js đừng đụng vào vị trí trùm */
  tick(b, dt, player) {
    const a = b.act;
    if (!a) return false;
    a.t += dt;
    this['_' + a.kind](b, a, dt, player);
    if (a.t >= a.dur) { b.act = null; return false; }
    return true;
  },

  updateSplats(dt) {
    for (let i = this.splats.length - 1; i >= 0; i--) {
      const s = this.splats[i];
      s.t += dt;
      if (s.t >= s.life) this.splats.splice(i, 1);
    }
  },

  /* ---------- gồng nộ rồi lao thẳng vào người chơi ---------- */
  _charge(b, a, dt, player) {
    const k = a.t / a.dur;
    if (k < 0.42) {                                // gồng: rung tại chỗ, khoá điểm đến
      b.x = a.x0 + SC.rnd(-4, 4); b.y = a.y0 + SC.rnd(-4, 4);
      a.tx = player.x; a.ty = Math.max(player.y, SC.H * 0.5);
      if (Math.random() < 0.5) SC.FX.trail(b.x + SC.rnd(-40, 40), b.y + SC.rnd(-40, 40), '#ff3b5c');
    } else if (k < 0.66) {                         // lao: nhanh, thẳng, không đổi hướng
      const u = (k - 0.42) / 0.24;
      b.x = SC.lerp(a.x0, a.tx, u); b.y = SC.lerp(a.y0, a.ty, u);
      SC.FX.trail(b.x, b.y, '#ff8a5c');
      if (SC.dist2(b.x, b.y, player.x, player.y) < (b.r + player.r) ** 2)
        this._hit(player, 26);
    } else {                                       // rút về chỗ cũ
      const u = (k - 0.66) / 0.34;
      b.x = SC.lerp(a.tx, a.x0, u); b.y = SC.lerp(a.ty, 150, u);
    }
  },

  /* ---------- bắn hoả tiễn dò tìm ---------- */
  _rocket(b, a, dt, player) {
    b.y = 150 + Math.sin(a.t * 2) * 10;
    a.gap -= dt;
    if (a.gap <= 0 && a.left > 0) {
      a.gap = 0.26; a.left--;
      const side = a.left % 2 ? -1 : 1;
      SC.Bullets.spawnFoe(b.x + side * b.r * 0.8, b.y + 10, side * 90, -70, 'rocket');
      SC.Audio.shoot();
    }
  },

  /* ---------- tách hai mảnh thân quăng ra rồi hút về ---------- */
  _boomerang(b, a, dt, player) {
    const k = a.t / a.dur;
    // đi ra rồi về: sin(pi*k) cho quãng 0 -> xa nhất -> 0, khỏi phải chia nhánh
    const spin = a.t * 7;
    for (const p of a.parts) {
      p.rot = spin * p.side;
      // Ngang lệch pha với dọc: mảnh văng ra hai bên, xuống sâu nhất thì CHẬP vào
      // giữa rồi mới vòng về. Nếu hai trục cùng pha thì hai mảnh đi chéo song song,
      // người chơi đứng giữa không bao giờ bị chạm — chiêu thành ra chỉ để ngắm.
      p.x = p.side * Math.sin(6.283 * k) * SC.W * 0.34;
      p.y = Math.sin(Math.PI * k) * SC.H * 0.70 + Math.sin(a.t * 5) * 14;
      const wx = b.x + p.x, wy = b.y + p.y;
      if (SC.dist2(wx, wy, player.x, player.y) < (26 + player.r) ** 2) this._hit(player, 18);
      if (Math.random() < 0.4) SC.FX.trail(wx, wy, '#ffb45c');
    }
  },

  /* ---------- vệt mực che tầm nhìn (chiêu chỉ tạo lúc bắt đầu) ---------- */
  _blind() {},

  /* ---------- biến mất rồi hiện ra chỗ khác, hiện tới đâu bắn tới đó ---------- */
  _blink(b, a, dt, player) {
    const idx = Math.floor(a.t / a.hop);
    const u = (a.t % a.hop) / a.hop;
    b.warp = u < 0.45 ? 1 - u / 0.45 : (u - 0.45) / 0.55;   // 1 -> 0 -> 1: co lại rồi phình ra
    if (idx !== a.step) {
      a.step = idx;
      b.x = SC.rnd(90, SC.W - 90);
      b.y = SC.rnd(120, SC.H * 0.4);
      SC.FX.burst(b.x, b.y, '#c58cff', 26, 300, 3);
      SC.Audio.power();
      const ang = SC.angTo(b.x, b.y, player.x, player.y);
      for (let i = -1; i <= 1; i++)
        SC.Bullets.spawnFoe(b.x, b.y, Math.cos(ang + i * 0.2) * 320, Math.sin(ang + i * 0.2) * 320, 'plasma');
    }
    if (a.t >= a.dur - dt) b.warp = 1;
  },

  /* ---------- nắm đấm co giãn phóng ra cực nhanh ---------- */
  _punch(b, a, dt, player) {
    // Lấy đà 0.29 giây rồi phóng trong 0.09 giây: phải để người chơi kịp thấy tay
    // rụt lại mà dạt sang bên, chứ khoá hướng xong bụp luôn thì không né nổi.
    const cycle = 0.72, k = (a.t % cycle) / cycle;
    const prev = Math.max(0, a.reach);

    if (k < 0.40) {                                 // rụt tay lấy đà + khoá hướng
      a.reach = -0.12 + k;
      if (k < dt * 2) {
        a.ang = SC.angTo(b.x, b.y, player.x, player.y);
        // Tầm với đo theo khoảng cách thật lúc khoá, không lấy theo % chiều cao:
        // màn hình cao thấp khác nhau nên hằng số cố định lúc tới lúc không.
        a.far = Math.min(SC.H * 0.85, Math.hypot(player.x - b.x, player.y - b.y) + 50);
      }
    } else if (k < 0.53) {                          // phóng: 0.09 giây tới nơi
      a.reach = ((k - 0.40) / 0.13) * a.far;
    } else {                                        // thu tay chậm hơn nhiều
      a.reach = a.far * (1 - (k - 0.53) / 0.47);
    }

    // Nắm đấm đi ~180px mỗi khung nên kiểm điểm cuối là nó XUYÊN QUA người chơi giữa
    // hai khung. Phải kiểm cả đoạn vừa quét — và kiểm ở MỌI pha, vì đúng cái khung
    // chuyển từ phóng sang thu mới là lúc tay duỗi hết cỡ.
    if (a.reach > 0 && this._sweep(player, b.x, b.y, a.ang, prev, a.reach, 24))
      this._hit(player, 22);
  },

  /* Người chơi có nằm trên đoạn thẳng mà nắm đấm vừa quét từ r0 tới r1 không.
     Chiếu người chơi lên tia rồi so khoảng cách vuông góc — rẻ hơn nhiều so với
     chia nhỏ khung hình, mà kết quả chính xác tuyệt đối với chuyển động thẳng. */
  _sweep(player, ox, oy, ang, r0, r1, rad) {
    const cx = Math.cos(ang), cy = Math.sin(ang);
    const t = SC.clamp((player.x - ox) * cx + (player.y - oy) * cy, Math.min(r0, r1), Math.max(r0, r1));
    const dx = ox + cx * t - player.x, dy = oy + cy * t - player.y;
    return dx * dx + dy * dy < (rad + player.r) ** 2;
  },

  _hit(player, dmg) {
    if (player.hurt(Math.round(dmg * SC.Power.dmg()))) SC.addShake(14, 0.3);
  }
};

;
/* ===== js/entity-boss-skills-art.js ===== */
/* entity-boss-skills-art.js — phần vẽ của 6 chiêu có kịch bản
 *
 * Tách khỏi entity-boss-skills.js để mỗi tệp giữ đúng một việc: bên kia lo hành vi
 * và sát thương, bên này chỉ lo nét vẽ.
 */

SC.BossSkillArt = {
  /* Vẽ trong hệ toạ độ đã dời về tâm trùm (gọi từ SC.Boss.prototype.render) */
  local(b, ctx) {
    const a = b.act;
    if (!a) return;
    if (a.kind === 'charge')    this._charge(b, a, ctx);
    if (a.kind === 'boomerang') this._boomerang(b, a, ctx);
    if (a.kind === 'punch')     this._punch(b, a, ctx);
  },

  /* gồng nộ: vòng dồn năng lượng siết dần rồi loé lên lúc lao đi */
  _charge(b, a, ctx) {
    const k = a.t / a.dur;
    if (k >= 0.42) return;
    const u = k / 0.42;
    ctx.save();
    ctx.strokeStyle = `rgba(255,59,92,${0.35 + u * 0.55})`;
    ctx.lineWidth = 3 + u * 5;
    ctx.beginPath();
    ctx.arc(0, 0, b.r * (2.4 - u * 1.1), 0, 6.283);
    ctx.stroke();
    // gai đỏ chĩa ra, càng gồng càng dài
    ctx.strokeStyle = `rgba(255,140,90,${0.5 + u * 0.5})`;
    ctx.lineWidth = 3;
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * 6.283 + a.t * 3;
      const r0 = b.r * 1.15, r1 = r0 + 12 + u * 26;
      ctx.beginPath();
      ctx.moveTo(Math.cos(ang) * r0, Math.sin(ang) * r0);
      ctx.lineTo(Math.cos(ang) * r1, Math.sin(ang) * r1);
      ctx.stroke();
    }
    ctx.restore();
  },

  /* hai mảnh thân tách rời, có dây nối về thân chính cho thấy nó sẽ bị hút lại */
  _boomerang(b, a, ctx) {
    for (const p of a.parts) {
      ctx.save();
      ctx.strokeStyle = `hsla(${b.hue},80%,60%,.4)`;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(p.x, p.y); ctx.stroke();

      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      SC.draw.glow(ctx, 0, 0, 40, `hsl(${b.hue},90%,62%)`, .5);
      // mảnh hình lưỡi liềm cho ra dáng "bộ phận bị tách"
      ctx.fillStyle = `hsl(${b.hue},70%,72%)`;
      ctx.strokeStyle = 'rgba(10,16,32,.9)';
      ctx.lineWidth = 3; ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0.5, 5.0);
      ctx.arc(6, 0, 15, 5.0, 0.5, true);
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.restore();
    }
  },

  /* cánh tay co giãn: đốt nối dày dần về phía nắm đấm */
  _punch(b, a, ctx) {
    if (a.reach <= 0) return;
    const ex = Math.cos(a.ang) * a.reach, ey = Math.sin(a.ang) * a.reach;
    ctx.save();
    ctx.lineCap = 'round';

    // Thân tay: viền tối vẽ trước rồi ruột sáng đè lên, dày dần về phía nắm đấm.
    // Cứ mỗi đốt lại có một khớp tròn — đó là thứ làm người xem đọc ra "co giãn"
    // chứ không phải một cây gậy đang dài ra.
    const seg = 8;
    for (const pass of [0, 1]) {
      ctx.strokeStyle = pass ? `hsl(${b.hue},62%,58%)` : 'rgba(10,16,32,.9)';
      for (let i = 1; i <= seg; i++) {
        const t = i / seg;
        ctx.lineWidth = (10 + t * 12) + (pass ? 0 : 6);
        ctx.beginPath();
        ctx.moveTo(ex * (i - 1) / seg, ey * (i - 1) / seg);
        ctx.lineTo(ex * t, ey * t);
        ctx.stroke();
      }
    }
    for (let i = 1; i < seg; i++) {
      const t = i / seg;
      ctx.fillStyle = `hsl(${b.hue},45%,${38 + t * 14}%)`;
      ctx.beginPath();
      ctx.arc(ex * t, ey * t, (10 + t * 12) * 0.62, 0, 6.283);
      ctx.fill();
    }

    // nắm đấm
    ctx.translate(ex, ey);
    ctx.rotate(a.ang + Math.PI / 2);
    SC.draw.glow(ctx, 0, 0, 62, '#ff8a5c', .55);
    ctx.fillStyle = `hsl(${b.hue},65%,70%)`;
    ctx.strokeStyle = 'rgba(10,16,32,.92)';
    ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(-30, -26, 60, 50, 14)
                  : ctx.rect(-30, -26, 60, 50);
    ctx.fill(); ctx.stroke();
    // khớp ngón
    ctx.fillStyle = 'rgba(10,16,32,.5)';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.arc(-15 + i * 15, -14, 5.4, 0, 6.283); ctx.fill();
    }
    // vệt sáng trên cạnh trên cho khối nổi lên
    ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-22, -22); ctx.lineTo(20, -22); ctx.stroke();
    ctx.restore();
  },

  /* ---------- vệt mực che màn: vẽ ở hệ toạ độ màn hình ---------- */
  screen(ctx) {
    const list = SC.BossSkills.splats;
    if (!list.length) return;
    ctx.save();
    for (const s of list) {
      const k = s.t / s.life;
      // bám vào rất nhanh rồi loang ra và tan dần
      const a = k < 0.08 ? k / 0.08 : 1 - (k - 0.08) / 0.92;
      const r = s.r * (0.55 + Math.min(1, k * 3) * 0.45);
      ctx.globalAlpha = a * 0.93;
      ctx.fillStyle = '#0a0d18';
      ctx.beginPath();
      // viền lồi lõm cho ra vệt mực bắn, không phải hình tròn máy móc
      for (let i = 0; i <= 22; i++) {
        const ang = (i / 22) * 6.283;
        const wob = 1 + Math.sin(ang * 3 + s.seed) * 0.18 + Math.sin(ang * 7 + s.seed * 2) * 0.09;
        const x = s.x + Math.cos(ang) * r * wob, y = s.y + Math.sin(ang) * r * wob * 0.82;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      // vài giọt bắn quanh vệt chính
      for (let i = 0; i < 4; i++) {
        const ang = s.seed + i * 1.7, d = r * 1.15;
        ctx.beginPath();
        ctx.arc(s.x + Math.cos(ang) * d, s.y + Math.sin(ang) * d * 0.8, r * 0.14, 0, 6.283);
        ctx.fill();
      }
    }
    ctx.restore();
  }
};

;
/* ===== js/entity-boss.js ===== */
/* entity-boss.js — hành vi trùm: 3 giai đoạn, bộ chiêu riêng theo vùng
 *
 * Tạo hình nằm ở entity-boss-art.js; ở đây chỉ lo di chuyển, đổi giai đoạn và
 * luân phiên các chiêu mà vùng đó được gán (SC.BIOMES[].atk). */

SC.Boss = function (lv) {
  this.isBoss = true;
  this.name = lv.bossName;
  this.art = lv.bossArt;
  this.biome = lv.biome;
  this.hue = SC.BIOMES[lv.biome].hue;
  this.atkList = lv.bossAtk || ['ring', 'aimed', 'eggRain', 'minions'];

  this.x = SC.W / 2; this.y = -140;
  this.r = lv.finalBoss ? 64 : 54;             // elite gọn hơn trùm vùng một chút
  this.hpMax = Math.round(lv.bossHP * SC.Power.hp());   // trùm cũng dày lên theo lực chiến
  this.hp = this.hpMax;
  this.lv = lv;

  this.t = 0; this.flash = 0; this.dead = false;
  this.phase = 1;
  this.entering = true;
  this.atk = 0;          // vị trí trong danh sách chiêu
  this.atkT = 2.2;       // đếm ngược tới chiêu kế
  this.burst = 0;        // số phát còn lại trong chuỗi
  this.burstT = 0;
  this.sweepA = 0;       // góc quét của chiêu 'sweep'
  this.def = { score: lv.finalBoss ? 1400 : 1000, drop: 1 };
  this.dir = 1;
  this.act = null;       // chiêu có kịch bản đang chạy (xem entity-boss-skills.js)
  this.warp = 1;         // 1 = thân bình thường; nhỏ hơn = đang dịch chuyển
  SC.BossMove.reset(this);
};

SC.Boss.prototype.update = function (dt, player) {
  this.t += dt;
  if (this.flash > 0) this.flash -= dt;

  if (this.entering) {                          // màn xuất hiện
    this.y += 110 * dt;
    if (this.y >= 150) { this.y = 150; this.entering = false; }
    return;
  }

  // đổi giai đoạn theo % máu (càng thấp càng hung)
  const p = this.hp / this.hpMax;
  this.phase = p > 0.66 ? 1 : p > 0.33 ? 2 : 3;
  const rage = this.phase === 3 ? 1.55 : this.phase === 2 ? 1.25 : 1;

  // chiêu có kịch bản tự lái thân trùm (lao tới, dịch chuyển, đấm...) -> nhường quyền
  if (SC.BossSkills.tick(this, dt, player)) return;

  SC.BossMove.update(this, dt, rage, player);   // 6 kiểu đi, đổi vài giây một lần

  // vòng luân phiên chiêu thức của vùng
  this.atkT -= dt * rage;
  if (this.atkT <= 0) {
    this.atk = (this.atk + 1) % this.atkList.length;
    this.atkT = 2.6;
    const kind = this.atkList[this.atk];
    if (SC.BossSkills.has(kind)) {               // chiêu kịch bản: giao hẳn cho module kia
      this.burst = 0;
      SC.BossSkills.start(this, kind, player);
      return;
    }
    this.burst = kind === 'ring' ? 5 : kind === 'aimed' ? 3 : kind === 'sweep' ? 9 : 1;
    this.burstT = 0;
    this.sweepA = -0.9;
    if (kind === 'minions') this._minions();
  }

  if (this.burst > 0) {
    this.burstT -= dt;
    if (this.burstT <= 0) {
      this.burstT = 0.24;
      this.burst--;
      const fn = this['_' + this.atkList[this.atk]];
      if (fn) fn.call(this, player);
    }
  }
};

/* ---------- các chiêu ---------- */

/* bắn tỏa tròn */
SC.Boss.prototype._ring = function () {
  const n = 10 + this.phase * 4, off = this.t;
  for (let i = 0; i < n; i++) {
    const a = (6.283 / n) * i + off;
    SC.Bullets.spawnFoe(this.x, this.y, Math.cos(a) * 190, Math.sin(a) * 190, 'plasma');
  }
};

/* bắn chùm nhắm thẳng người chơi */
SC.Boss.prototype._aimed = function (player) {
  const a = SC.angTo(this.x, this.y, player.x, player.y), n = 3 + this.phase;
  for (let i = 0; i < n; i++) {
    const aa = a + (i - (n - 1) / 2) * 0.16;
    SC.Bullets.spawnFoe(this.x, this.y + 30, Math.cos(aa) * 330, Math.sin(aa) * 330, 'plasma');
  }
};

/* quạt quét ngang dần từ trái sang phải */
SC.Boss.prototype._sweep = function () {
  this.sweepA += 0.22;
  const a = Math.PI / 2 + this.sweepA;
  for (let k = 0; k < 2 + this.phase; k++) {
    const sp = 210 + k * 55;
    SC.Bullets.spawnFoe(this.x, this.y + 20, Math.cos(a) * sp, Math.sin(a) * sp, 'plasma');
  }
};

/* nở rộng thành hình nan quạt về phía dưới */
SC.Boss.prototype._spread = function () {
  const n = 7 + this.phase * 3;
  for (let i = 0; i < n; i++) {
    const a = Math.PI / 2 + (i - (n - 1) / 2) * 0.19;
    SC.Bullets.spawnFoe(this.x, this.y + 24, Math.cos(a) * 260, Math.sin(a) * 260, 'plasma');
  }
};

/* mưa trứng phủ kín màn hình */
SC.Boss.prototype._eggRain = function () {
  const n = 5 + this.phase * 2;
  for (let i = 0; i < n; i++) {
    const x = (SC.W / (n + 1)) * (i + 1) + SC.rnd(-16, 16);
    SC.Bullets.spawnFoe(x, this.y + 40, SC.rnd(-30, 30), SC.rnd(180, 260), 'egg');
  }
};

/* gọi quái phụ */
SC.Boss.prototype._minions = function () {
  const n = 2 + this.phase;
  for (let i = 0; i < n; i++) {
    SC.Game.enemies.push(new SC.Enemy(
      this.phase > 1 ? 'dive' : 'chick',
      this.x + SC.rnd(-70, 70), this.y + 20, this.lv));
  }
  SC.FX.text(this.x, this.y - 70, 'GỌI VIỆN BINH!', '#ff8a5c');
};

SC.Boss.prototype.hurt = function (dmg) {
  this.hp -= dmg; this.flash = 0.07;
  return this.hp <= 0;
};

SC.Boss.prototype.render = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  if (this.flash > 0) ctx.filter = 'brightness(2.4)';

  SC.BossSkillArt.local(this, ctx);              // tay, mảnh tách, vòng gồng nộ

  // chiêu dịch chuyển làm thân co lại rồi phình ra
  if (this.warp !== undefined && this.warp < 1) {
    const w = Math.max(0.02, this.warp);
    ctx.scale(w, 1 / (0.4 + w * 0.6));
  }

  SC.draw.glow(ctx, 0, 0, this.r * 2.1, `hsla(${this.hue},90%,60%,.8)`, .35);

  ctx.save(); ctx.rotate(this.t * 0.7);          // vòng giáp xoay
  ctx.strokeStyle = `hsla(${this.hue},95%,70%,.55)`; ctx.lineWidth = 3;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(0, 0, this.r * 1.28, i * 2.1, i * 2.1 + 1.25);
    ctx.stroke();
  }
  ctx.restore();

  SC.BossArt.draw(this.art, ctx, this.r, this.t, this.phase, this.hue);

  ctx.filter = 'none';
  ctx.restore();
};

;
/* ===== js/system-facing.js ===== */
/* system-facing.js — máy bay tự quay đầu bắn ngược khi bay lên trên quái
 *
 * Trước đây súng luôn chĩa lên, nên lỡ lượn lên trên đám quái là mất hẳn hoả lực —
 * người chơi bị ép dính đáy màn hình suốt 100 map. Giờ bay lên trên là máy bay tự
 * lật, xả xuống. Áp dụng cho MỌI map, không phải tính năng riêng của map nào.
 *
 * Hai thứ phải cẩn thận, nếu không sẽ rất khó chịu:
 *   - Phải có vùng chết: quái rải đều trên dưới mà cứ đúng mép là lật thì máy bay
 *     rung như đèn nháy. Dùng NGƯỠNG lệch hẳn cộng thêm thời gian chờ giữa hai lần lật.
 *   - Chỉ đếm quái ĐÁNG BẮN: con đã bay ra ngoài khung hình không được kéo hướng súng.
 */

SC.Facing = {
  GAP: 90,        // quái phải nằm lệch hơn ngần này pixel mới được tính về một phía
  HOLD: 0.35,     // giây tối thiểu giữa hai lần lật
  NEED: 1.6,      // phía kia phải "nặng" gấp ngần này lần mới đảo hướng

  reset(p) { p.face = -1; p.faceT = 0; p.faceAnim = -1; },   // -1 = chĩa lên

  /* Cân trọng lượng mục tiêu hai phía rồi quyết định hướng súng */
  update(dt, p, enemies, boss) {
    p.faceT = (p.faceT || 0) - dt;
    // hoạt ảnh lật: chạy dần tới hướng đích để thân máy bay xoay mượt, không giật
    p.faceAnim = p.faceAnim === undefined ? p.face
      : p.faceAnim + SC.clamp(p.face - p.faceAnim, -6 * dt, 6 * dt);

    let up = 0, down = 0;
    const weigh = e => {
      if (!e || e.dead || e.y < -30 || e.y > SC.H + 30) return;   // ngoài khung -> bỏ
      const d = e.y - p.y;
      // trùm nặng gấp 4 con thường: đang đánh trùm thì đừng để lũ gà con kéo súng đi
      const w = e.isBoss ? 4 : 1;
      if (d < -this.GAP) up += w;
      else if (d > this.GAP) down += w;
    };
    for (const e of enemies) weigh(e);
    if (boss && !boss.dead && enemies.indexOf(boss) < 0) weigh(boss);

    if (p.faceT > 0) return;                       // còn trong thời gian chờ

    const want = p.face;
    if (down > up * this.NEED && down > 0) p.face = 1;
    else if (up > down * this.NEED && up > 0) p.face = -1;

    if (p.face !== want) {
      p.faceT = this.HOLD;
      SC.FX.burst(p.x, p.y, '#7ae0ff', 8, 150, 1.6);   // khói lật để thấy rõ đã quay đầu
    }
  }
};

;
/* ===== js/entity-player.js ===== */
/* entity-player.js — máy bay bám con trỏ chuột, AUTO SHOOT theo cấp vũ khí */

SC.Player = function () {
  this.reset();
};

SC.Player.prototype.reset = function (weapon) {
  this.x = SC.W / 2; this.y = SC.H * 0.78;
  this.tx = this.x; this.ty = this.y;
  this.r = SC.CFG.playerRadius;

  // cộng dồn các nâng cấp vĩnh viễn đã mua ở cửa hàng
  this.hpMax = SC.CFG.playerHP + SC.Upg.hpBonus();
  this.hp = this.hpMax;
  this.shieldMax = 60 + SC.Upg.shieldBonus();
  this.shield = SC.Upg.startShield() ? this.shieldMax : 0;
  this.weapon = Math.min(SC.CFG.maxWeapon, (weapon || 1) + SC.Upg.weaponBonus());
  this.fireT = 0;
  this.inv = 1.2;          // bất tử lúc vào màn
  this.tilt = 0;
  this.t = 0;
  this.dead = false;
  // Độ chính xác tính theo LOẠT bắn, không theo từng viên: bắn tỏa 9 viên mà
  // trúng 1 viên vẫn là một loạt trúng. Đếm từng viên thì súng càng mạnh
  // (càng nhiều tia) chỉ số càng tệ, vô lý.
  this.shots = 0; this.hits = 0;
  this.volley = 0;                 // số thứ tự loạt bắn hiện tại
  this.volleyHit = new Set();      // những loạt đã ghi nhận trúng
  this.damaged = 0;                // số lần trúng đòn, dùng chấm nhiệm vụ "hoàn hảo"
  SC.Facing.reset(this);           // hướng súng: -1 chĩa lên, 1 chĩa xuống
};

/* Con trỏ chuột chính là đích đến của máy bay */
SC.Player.prototype.setTarget = function (x, y) {
  this.tx = SC.clamp(x, 18, SC.W - 18);
  this.ty = SC.clamp(y, 40, SC.H - 24);
};

SC.Player.prototype.update = function (dt) {
  this.t += dt;
  const px = this.x;
  this.x = SC.lerp(this.x, this.tx, 1 - Math.pow(1 - SC.CFG.playerFollow, dt * 60));
  this.y = SC.lerp(this.y, this.ty, 1 - Math.pow(1 - SC.CFG.playerFollow, dt * 60));
  this.tilt = SC.clamp((this.x - px) * 0.12, -1, 1);

  if (this.inv > 0) this.inv -= dt;

  // khói động cơ — thoát ra phía đuôi, nên đảo theo hướng máy bay đang quay
  const f = this.face || -1;
  if (Math.random() < 0.6) SC.FX.trail(this.x + SC.rnd(-5, 5), this.y - f * this.r * 1.2, '#5ad0ff');

  // ---- AUTO SHOOT ----
  this.fireT -= dt;
  if (this.fireT <= 0) {
    this.fireT = SC.CFG.fireBase * (1 - Math.min(0.4, this.weapon * 0.05)) * SC.Upg.rateMul();
    this._fire();
    SC.Audio.shoot();
  }
};

/* Sơ đồ đạn theo cấp vũ khí 1..10 (trần lấy từ SC.CFG.maxWeapon trong bảng cân bằng).
   Nhịp bắn chạm trần giảm 40% từ cấp 8 nên cấp 9-10 phải mạnh lên bằng SỐ TIA và
   hoả tiễn, chứ không phải bằng tốc độ. */
SC.Player.prototype._fire = function () {
  // f = -1 chĩa lên (mặc định), 1 chĩa xuống khi đang bay trên đầu quái.
  // Mọi sơ đồ đạn bên dưới viết theo hướng lên rồi nhân f, khỏi phải chép đôi.
  const f = this.face || -1;
  const w = this.weapon, y = this.y + f * this.r * 1.4;
  const dmg = 2 + Math.floor(w / 2) + SC.Upg.dmgBonus();

  // Cả loạt này tính là MỘT lần bắn. Súng tự động bắn cả khi trời trống,
  // những loạt đó không có gì để trúng nên không tính vào độ chính xác.
  const hasTarget = SC.Game.enemies.some(e => !e.dead && e.y > -20 && e.y < SC.H);
  const vol = hasTarget ? ++this.volley : -1;
  if (hasTarget) this.shots++;

  const shot = (ox, ang, d = dmg, kind = 'shot') => {
    SC.Bullets.spawnMine(this.x + ox, y, Math.sin(ang) * 760, f * Math.cos(ang) * 760, d, kind);
    if (hasTarget) SC.Bullets.mine[SC.Bullets.mine.length - 1].vol = vol;
  };

  if (w === 1) shot(0, 0);
  else if (w === 2) { shot(-8, 0); shot(8, 0); }
  else if (w === 3) { shot(0, 0); shot(-11, -0.13); shot(11, 0.13); }
  else if (w === 4) { shot(-6, -0.05); shot(6, 0.05); shot(-15, -0.2); shot(15, 0.2); }
  else if (w === 5) { shot(0, 0); shot(-8, -0.1); shot(8, 0.1); shot(-17, -0.24); shot(17, 0.24); }
  else if (w === 6) {
    shot(0, 0); shot(-8, -0.1); shot(8, 0.1);
    shot(-19, 0, dmg, 'laser'); shot(19, 0, dmg, 'laser');
  } else if (w === 7) {
    shot(0, 0); shot(-8, -0.1); shot(8, 0.1);
    shot(-19, 0, dmg, 'laser'); shot(19, 0, dmg, 'laser');
    if (this.t % 0.5 < 0.16) { shot(-22, -0.5, dmg * 3, 'missile'); shot(22, 0.5, dmg * 3, 'missile'); }
  } else if (w === 8) {
    shot(0, 0); shot(-7, -0.08); shot(7, 0.08); shot(-15, -0.2); shot(15, 0.2);
    shot(-21, 0, dmg, 'laser'); shot(21, 0, dmg, 'laser');
    if (this.t % 0.4 < 0.16) { shot(-24, -0.55, dmg * 3, 'missile'); shot(24, 0.55, dmg * 3, 'missile'); }
  } else if (w === 9) {
    // Cấp 9: thêm cặp laser ngoài và bắn ngược lên hai bên để dọn quái tạt sườn
    shot(0, 0); shot(-7, -0.08); shot(7, 0.08); shot(-15, -0.2); shot(15, 0.2);
    shot(-21, 0, dmg, 'laser'); shot(21, 0, dmg, 'laser');
    shot(-30, -0.42, dmg, 'laser'); shot(30, 0.42, dmg, 'laser');
    if (this.t % 0.34 < 0.16) { shot(-24, -0.55, dmg * 3, 'missile'); shot(24, 0.55, dmg * 3, 'missile'); }
  } else {
    // Cấp 10 (trần): 4 laser, 5 tia thẳng, hoả tiễn 4 quả gần như liên tục
    shot(0, 0); shot(-7, -0.08); shot(7, 0.08); shot(-15, -0.2); shot(15, 0.2);
    shot(-21, 0, dmg, 'laser'); shot(21, 0, dmg, 'laser');
    shot(-30, -0.42, dmg, 'laser'); shot(30, 0.42, dmg, 'laser');
    if (this.t % 0.28 < 0.16) {
      shot(-24, -0.55, dmg * 3, 'missile'); shot(24, 0.55, dmg * 3, 'missile');
      shot(-12, -0.9, dmg * 3, 'missile'); shot(12, 0.9, dmg * 3, 'missile');
    }
  }
};

/* Nhận sát thương: khiên chịu trước, sau đó mới trừ máu */
SC.Player.prototype.hurt = function (dmg) {
  if (this.inv > 0 || this.dead) return false;
  this.damaged++;
  if (this.shield > 0) {
    this.shield -= dmg * 1.6;
    if (this.shield < 0) this.shield = 0;
    SC.FX.burst(this.x, this.y, '#3fe0ff', 12, 200, 3);
  } else {
    this.hp -= dmg;
    SC.FX.burst(this.x, this.y, '#ff3b5c', 16, 260, 3.4);
  }
  this.inv = SC.CFG.iFrame;
  SC.addShake(9, 0.24);
  SC.Input.vibrate(28);
  SC.Audio.hurt();
  if (this.hp <= 0) { this.hp = 0; this.dead = true; return true; }
  return false;
};

SC.Player.prototype.render = function (ctx) {
  if (this.dead) return;
  const blink = this.inv > 0 && Math.floor(this.t * 20) % 2 === 0;
  ctx.save();
  ctx.globalAlpha = blink ? 0.35 : 1;
  ctx.translate(this.x, this.y);

  // Lật cả thân khi quay đầu bắn xuống. Xoay dần (faceAnim chạy tới face) nên nhìn
  // như máy bay lộn vòng, chứ đảo tức thì thì giật và không hiểu chuyện gì xảy ra.
  ctx.save();
  const fa = this.faceAnim === undefined ? -1 : this.faceAnim;
  ctx.rotate((fa + 1) / 2 * Math.PI);          // -1 -> 0 rad, 1 -> pi

  // lửa động cơ
  const f = 1 + Math.sin(this.t * 30) * 0.22;
  SC.draw.glow(ctx, 0, this.r * 1.5, 20 * f, '#5ad0ff', 0.7);
  ctx.fillStyle = 'rgba(140,230,255,.9)';
  ctx.beginPath();
  ctx.moveTo(-5, this.r * 1.1); ctx.lineTo(0, this.r * (1.5 + f * 0.55)); ctx.lineTo(5, this.r * 1.1);
  ctx.closePath(); ctx.fill();

  SC.draw.fighter(ctx, this.r, this.tilt, this.weapon);
  ctx.restore();

  // vòng khiên
  if (this.shield > 0) {
    ctx.strokeStyle = `rgba(63,224,255,${0.35 + (this.shield / this.shieldMax) * 0.5})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, 0, this.r * 2.1 + Math.sin(this.t * 6) * 2, 0, 6.283); ctx.stroke();
  }
  ctx.restore();

  // dấu ngắm chỉ dành cho chuột, và chỉ hiện khi máy bay còn đang đuổi theo con trỏ
  if (SC.Input.mode !== 'absolute') return;
  const gap = SC.dist2(this.x, this.y, this.tx, this.ty);
  if (gap < 24 * 24) return;
  ctx.save();
  ctx.globalAlpha = SC.clamp((Math.sqrt(gap) - 24) / 40, 0, 1) * 0.55;
  ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.arc(this.tx, this.ty, 12, 0, 6.283); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(this.tx - 18, this.ty); ctx.lineTo(this.tx - 6, this.ty);
  ctx.moveTo(this.tx + 6, this.ty); ctx.lineTo(this.tx + 18, this.ty);
  ctx.stroke();
  ctx.restore();
};

;
/* ===== js/entity-wingman.js ===== */
/* entity-wingman.js — máy bay phụ bay kèm hai bên, tự bắn
 *
 * Mua ở cửa hàng (dòng PHI ĐỘI). Bám theo máy bay chính có độ trễ nên khi lượn
 * gấp chúng đuổi theo thành hình cánh cung. Không nhận sát thương. */

SC.Wingmen = {
  list: [],

  /* dựng đội hình theo cấp nâng cấp hiện tại (tối đa 4 chiếc, xếp thành 2 lớp) */
  spawn(player) {
    this.list.length = 0;
    const count = SC.Upg.wingCount();
    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const ring = Math.floor(i / 2);          // lớp 0 bám sát, lớp 1 dạt ra ngoài
      this.list.push({
        x: player.x + side * (50 + ring * 36), y: player.y + 20,
        side, ring, r: 13, t: SC.rnd(0, 6.28),
        fireT: 0.09 * i        // lệch nhịp cho tiếng bắn đỡ dồn cục
      });
    }
  },

  clear() { this.list.length = 0; },

  update(dt, player) {
    const rate = SC.Upg.wingFireRate();
    const dmg = SC.Upg.wingDamage();

    for (const w of this.list) {
      w.t += dt;
      // vị trí mong muốn: lệch sang hai bên và hơi lùi sau máy bay chính
      const tx = player.x + w.side * (50 + w.ring * 36);
      const ty = player.y + 24 + w.ring * 16 + Math.sin(w.t * 2.4) * 4;
      const k = 1 - Math.pow(1 - 0.14, dt * 60);        // bám trễ hơn máy bay chính
      w.x = SC.lerp(w.x, tx, k);
      w.y = SC.lerp(w.y, ty, k);

      if (Math.random() < 0.25) SC.FX.trail(w.x, w.y + 10, '#7ae0ff');

      w.fireT -= dt;
      if (w.fireT <= 0) {
        w.fireT = rate;
        const f = player.face || -1;              // bám hướng súng của máy bay chính
        const a = this._aim(w, f);
        SC.Bullets.spawnMine(w.x, w.y + f * w.r, Math.sin(a) * 720, f * Math.cos(a) * 720, dmg, 'shot');
        // đánh dấu đạn phi đội: không tính vào độ chính xác, nếu không mua
        // phi đội lại thành ra khó đạt nhiệm vụ "độ chính xác" hơn
        SC.Bullets.mine[SC.Bullets.mine.length - 1].wing = true;
      }
    }
  },

  /* Góc bắn của một chiếc phụ.
     Trước đây chúng bắn thẳng đứng, mà chúng bay lệch 50-86px sang hai bên nên đạn
     đi trọn hai làn trống — đo ra dòng PHI ĐỘI gần như không rút ngắn thời gian màn
     nào cả, mua xong chỉ tổ bị quái mạnh lên theo lực chiến. Giờ chúng ngắm mục tiêu
     gần nhất, giới hạn 35° để vẫn ra dáng máy bay hộ tống chứ không xoay như pháo. */
  _aim(w, f) {
    let best = null, bd = Infinity;
    const cands = SC.Game.boss && !SC.Game.boss.dead ? [SC.Game.boss] : SC.Game.enemies;
    for (const e of cands) {
      // chỉ ngắm con nằm về phía đang chĩa súng; con sau lưng để lượt sau
      if (e.dead || (f < 0 ? e.y > w.y : e.y < w.y)) continue;
      const d = SC.dist2(w.x, w.y, e.x, e.y);
      if (d < bd) { bd = d; best = e; }
    }
    if (!best) return 0;
    return SC.clamp(Math.atan2(best.x - w.x, f * (best.y - w.y)), -0.61, 0.61);
  },

  render(ctx) {
    for (const w of this.list) {
      const r = w.r;
      ctx.save();
      ctx.translate(w.x, w.y);

      // lửa động cơ
      const f = 1 + Math.sin(w.t * 26) * 0.25;
      SC.draw.glow(ctx, 0, r * 1.15, 13 * f, '#5ad0ff', 0.6);

      // viền mảnh: thân chỉ ~26px trên màn nên viền dày sẽ nuốt hết phần sáng
      ctx.strokeStyle = '#16294a'; ctx.lineWidth = 1; ctx.lineJoin = 'round';

      // cánh
      ctx.fillStyle = '#89b4e8';
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.15); ctx.lineTo(-r * 1.15, r * 0.5);
      ctx.lineTo(0, r * 0.32); ctx.lineTo(r * 1.15, r * 0.5);
      ctx.closePath(); ctx.fill(); ctx.stroke();

      // thân, cùng tông sáng với máy bay chính cho dễ nhận ra là phe ta
      const g = ctx.createLinearGradient(0, -r * 1.6, 0, r);
      g.addColorStop(0, '#ffffff'); g.addColorStop(0.55, '#cfe6ff'); g.addColorStop(1, '#6f9ad4');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.6); ctx.quadraticCurveTo(r * 0.5, -r * 0.2, r * 0.4, r * 0.7);
      ctx.lineTo(-r * 0.4, r * 0.7); ctx.quadraticCurveTo(-r * 0.5, -r * 0.2, 0, -r * 1.6);
      ctx.closePath(); ctx.fill(); ctx.stroke();

      // buồng lái
      ctx.fillStyle = 'rgba(90,225,255,.92)';
      ctx.beginPath(); ctx.ellipse(0, -r * 0.45, r * 0.22, r * 0.4, 0, 0, 6.283); ctx.fill();
      ctx.restore();
    }
  }
};

;
/* ===== js/entity-rescue.js ===== */
/* entity-rescue.js — phi công nhảy dù cần được cứu
 *
 * Khác vật phẩm thường: KHÔNG tự hút về máy bay. Người chơi phải tự lái tới
 * đón, nên phải cân nhắc có dám bỏ vị trí an toàn hay không. Rơi khỏi màn là mất. */

SC.Rescue = {
  list: [],
  toSpawn: 0,      // số dù còn phải thả
  timer: 0,        // đếm ngược tới lần thả kế tiếp
  hurry: false,    // hết quái rồi: thả nhanh và rơi nhanh cho khỏi bắt đợi

  /* need = số phi công nhiệm vụ yêu cầu; luôn thả dư 1 cho dễ thở */
  start(need) {
    this.list.length = 0;
    this.toSpawn = need > 0 ? need + 1 : 0;
    this.timer = 4;
    this.hurry = false;
  },

  clear() { this.list.length = 0; this.toSpawn = 0; this.hurry = false; },

  /* Waves gọi mỗi khi mở wave mới.
     Trước đây dù thả theo đồng hồ cố định 13 giây nên chiếc cuối thường rơi lúc
     đã dọn sạch quái — đo được nửa màn đứng không. Gắn vào nhịp wave thì dù
     luôn xuất hiện giữa lúc đang đánh. */
  onWave() {
    if (this.toSpawn > 0) this.timer = 0.6;
  },

  _tha() {
    this.toSpawn--;
    this.list.push({
      x: SC.rnd(70, SC.W - 70), y: -40, r: 16,
      t: SC.rnd(0, 6.28), sway: SC.rnd(24, 44), saved: false
    });
    SC.UI.toast('CÓ PHI CÔNG RƠI!');
    SC.Audio.wave();
  },

  update(dt, player, onRescue) {
    const fall = this.hurry ? 200 : 58;

    // thả dù rải rác trong màn
    if (this.toSpawn > 0) {
      this.timer -= dt;
      if (this.timer <= 0) {
        this.timer = this.hurry ? 0.6 : 9;
        this._tha();
      }
    }

    for (let i = this.list.length - 1; i >= 0; i--) {
      const p = this.list[i];
      p.t += dt;
      p.y += fall * dt;                                // dù rơi chậm
      p.x += Math.sin(p.t * 1.3) * p.sway * dt;
      p.x = SC.clamp(p.x, 26, SC.W - 26);

      // phải chạm tận nơi mới cứu được
      if (SC.dist2(p.x, p.y, player.x, player.y) < 34 * 34) {
        onRescue(p.x, p.y);
        this.list.splice(i, 1);
        continue;
      }
      if (p.y > SC.H + 40) {                           // rơi mất
        SC.UI.toast('MẤT MỘT PHI CÔNG');
        this.list.splice(i, 1);
      }
    }
  },

  render(ctx) {
    for (const p of this.list) {
      const sway = Math.sin(p.t * 1.3) * 0.18;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(sway);

      // vòng sáng cho dễ thấy giữa đạn lửa
      SC.draw.glow(ctx, 0, 0, 34, '#4dff9f', 0.4);

      // dù
      ctx.fillStyle = '#ff6b6b';
      ctx.beginPath(); ctx.arc(0, -14, 20, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#ffd9d9';
      ctx.beginPath(); ctx.arc(0, -14, 20, Math.PI, Math.PI * 1.34); ctx.fill();
      ctx.beginPath(); ctx.arc(0, -14, 20, Math.PI * 1.66, 0); ctx.fill();

      // dây dù
      ctx.strokeStyle = 'rgba(255,255,255,.65)'; ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(-18, -13); ctx.lineTo(-4, 4);
      ctx.moveTo(18, -13); ctx.lineTo(4, 4);
      ctx.stroke();

      // người
      ctx.fillStyle = '#ffd9a8';
      ctx.beginPath(); ctx.arc(0, 8, 6, 0, 6.283); ctx.fill();
      ctx.fillStyle = '#2f6fa8';
      SC.draw.roundRect(ctx, -5.5, 12, 11, 11, 3); ctx.fill();
      ctx.fillStyle = '#1a1a22';
      ctx.beginPath(); ctx.arc(-2.2, 7, 1.3, 0, 6.283); ctx.arc(2.2, 7, 1.3, 0, 6.283); ctx.fill();

      ctx.restore();
    }
  }
};

;
/* ===== js/system-waves.js ===== */
/* system-waves.js — điều phối wave: nhịp thưa → vừa → dày → dồn dập → boss
 *
 * Điểm mấu chốt giữ mật độ: KHÔNG đợi dọn sạch mới sang wave sau. Chỉ cần
 * gần hết (hoặc quá lâu) là wave kế đã ập tới, nên màn hình luôn có việc để làm
 * thay vì đứng chờ một con lạc đàn bay xuống. */

SC.Waves = {
  lv: null,
  index: 0,        // wave hiện tại (0-based)
  total: 0,
  curve: null,     // cường độ từng wave
  timer: 0,        // nhịp thở tối thiểu trước wave kế
  sinceWave: 0,    // đã bao lâu kể từ lúc wave hiện tại đổ quân
  lastCount: 0,    // số quái của wave vừa thả
  spawning: false,
  queue: [],       // hàng chờ sinh quái từng con cho mượt
  bossSpawned: false,
  done: false,

  start(lv) {
    this.lv = lv;
    this.curve = lv.boss ? SC.WAVE_CURVE.boss : SC.WAVE_CURVE.normal;
    this.index = 0;
    this.total = this.curve.length;
    this.timer = 1.2;
    this.sinceWave = 0;
    this.lastCount = 0;
    this.queue.length = 0;
    this.spawning = false;
    this.bossSpawned = false;
    this.done = false;
  },

  /* cường độ của wave sắp tới (1-based index) */
  intensity() {
    return this.curve[Math.min(this.index, this.curve.length - 1)] || 1;
  },

  /* xếp một wave vào hàng chờ; cường độ càng cao càng đông và ra càng nhanh */
  _buildWave() {
    const lv = this.lv;
    const inten = this.curve[this.index - 1];
    // mật độ cộng thêm theo lực chiến — người khoẻ thì quái phải đông hơn
    const n = Math.max(4, Math.round(lv.perWave * inten * SC.Power.den()));
    const rush = inten >= 1.35;                 // wave dồn dập
    const gap = rush ? 0.055 : 0.1;             // giãn cách nhả từng con
    this.queue.length = 0;

    // wave dồn dập trộn hai đội hình cho rối rắm hơn
    const forms = rush
      ? [SC.pick(SC.FORMATIONS), SC.pick(SC.FORMATIONS)]
      : [SC.pick(SC.FORMATIONS)];

    forms.forEach((form, fi) => {
      const cnt = Math.round(n / forms.length);
      const type = SC.pick(lv.pool);
      for (let i = 0; i < cnt; i++) {
        const spot = this._place(form, i, cnt);
        // pha trộn thêm 1 loại quái khác cho đa dạng
        const t = (i % 4 === 3 && lv.pool.length > 1) ? SC.pick(lv.pool) : type;
        this.queue.push({
          t,
          x: SC.clamp(spot.x, 32, SC.W - 32),
          y: spot.y,
          delay: fi * 0.5 + i * gap
        });
      }
    });

    this.lastCount = this.queue.length;
    this.spawning = true;
    this.sinceWave = 0;
  },

  /* toạ độ xuất hiện theo đội hình */
  _place(form, i, n) {
    const half = (n - 1) / 2;
    switch (form) {
      case 'line':  return { x: (SC.W / (n + 1)) * (i + 1), y: -40 };
      case 'vee':   return { x: SC.W / 2 + (i - half) * 46, y: -40 - Math.abs(i - half) * 30 };
      case 'arc':   return {
        x: SC.W / 2 + Math.sin((i / Math.max(1, n - 1) - .5) * 2.4) * 190,
        y: -40 - Math.cos((i / Math.max(1, n - 1) - .5) * 2.4) * 60
      };
      case 'swarm': return { x: SC.rnd(50, SC.W - 50), y: SC.rnd(-190, -40) };
      case 'sides': return { x: i % 2 ? SC.rnd(SC.W - 110, SC.W - 40) : SC.rnd(40, 110), y: -40 };
      default:      return { x: SC.rnd(40, SC.W - 40), y: -40 };   // 'rain'
    }
  },

  update(dt, enemies) {
    if (this.done) return;
    const lv = this.lv;

    // đang nhả quái trong hàng chờ
    if (this.spawning) {
      for (let i = this.queue.length - 1; i >= 0; i--) {
        const q = this.queue[i];
        q.delay -= dt;
        if (q.delay <= 0) {
          enemies.push(new SC.Enemy(q.t, q.x, q.y, lv));
          this.queue.splice(i, 1);
        }
      }
      if (!this.queue.length) this.spawning = false;
      return;
    }

    this.sinceWave += dt;
    this.timer -= dt;

    if (this.index < this.total) {
      // sang wave kế khi đã dọn gần hết, hoặc chờ quá lâu thì cứ đổ tiếp
      const nearlyClear = enemies.length <= Math.max(1, Math.floor(this.lastCount * 0.3));
      const waitedLong = this.sinceWave >= 9;
      if (this.timer > 0) return;
      if (!nearlyClear && !waitedLong) return;

      this.index++;
      this._buildWave();
      SC.Rescue.onWave();                     // thả dù cùng nhịp wave, tránh đứng chờ
      this.timer = 0.7;                       // nhịp thở ngắn giữa hai wave
      SC.UI.setWave(this.index, this.total + (lv.boss ? 1 : 0));
      if (this.index > 1) {
        SC.UI.toast(this.intensity() >= 1.35 ? 'DỒN DẬP!' : 'WAVE ' + this.index);
        SC.Audio.wave();
      }
      return;
    }

    // Hết wave mà còn sót vài con: chờ một nhịp rồi ép chúng rút xuống, nếu
    // không một con lơ lửng có thể treo màn chơi rất lâu.
    if (enemies.length > 0) {
      if (this.sinceWave > 6) for (const e of enemies) if (!e.isBoss) e.flee = true;
      return;
    }

    if (lv.boss && !this.bossSpawned) {
      this.bossSpawned = true;

      // Tiếp tế trước trận trùm: map thấp người chơi mới vũ khí cấp 1, sát thương
      // quá yếu nên trận trùm kéo lê. Thả sẵn 2 gói nâng vũ khí cho công bằng.
      SC.Items.drop(SC.W * 0.35, 80, 'power');
      SC.Items.drop(SC.W * 0.65, 80, 'power');

      const boss = new SC.Boss(lv);
      enemies.push(boss);
      SC.Game.boss = boss;
      SC.UI.showBoss(lv.bossName);
      SC.UI.toast('CẢNH BÁO — ' + lv.bossName, true);
      SC.addShake(12, 0.6);
      SC.Audio.alarm();
      SC.UI.setWave(this.total + 1, this.total + 1);
    } else {
      this.done = true;
    }
  }
};

;
/* ===== js/system-combat.js ===== */
/* system-combat.js — va chạm, tính điểm khi hạ quái và xử lý vật phẩm nhặt được
 *
 * Tách khỏi main.js để vòng lặp game chỉ còn lo điều phối trạng thái.
 * Mọi hàm ở đây nhận `g` là SC.Game. */

SC.Combat = {

  /* ---------- va chạm ---------- */
  collide(g) {
    const p = g.player;

    // đạn ta ↔ quái
    for (let i = SC.Bullets.mine.length - 1; i >= 0; i--) {
      const b = SC.Bullets.mine[i];
      for (const e of g.enemies) {
        if (e.dead || !SC.hit(b, e)) continue;
        // mỗi loạt bắn chỉ ghi nhận trúng một lần; đạn phi đội không có số loạt
        // nên tự động nằm ngoài cách tính độ chính xác
        if (b.vol !== undefined && !p.volleyHit.has(b.vol)) {
          p.volleyHit.add(b.vol);
          p.hits++;
        }
        SC.FX.burst(b.x, b.y, '#ffe28a', 5, 130, 2);
        SC.Audio.hit();
        if (e.hurt(b.dmg)) this.killEnemy(g, e);
        if (b.kind === 'missile') { SC.FX.burst(b.x, b.y, '#ff9a2b', 20, 300, 4); SC.addShake(5, .16); }
        SC.Bullets.mine.splice(i, 1);
        break;
      }
    }

    // đạn địch ↔ ta
    for (let i = SC.Bullets.foe.length - 1; i >= 0; i--) {
      const b = SC.Bullets.foe[i];
      if (p.dead || !SC.hit(b, { x: p.x, y: p.y, r: p.r * 0.8 })) continue;
      SC.Bullets.foe.splice(i, 1);
      p.hurt(Math.round((b.kind === 'egg' ? 8 : 12) * SC.Power.dmg()));
    }

    // thân quái ↔ ta
    for (const e of g.enemies) {
      if (e.dead || p.dead) continue;
      if (SC.hit({ x: p.x, y: p.y, r: p.r * 0.85 }, e)) {
        p.hurt(Math.round((e.isBoss ? 22 : 14) * SC.Power.dmg()));
        if (!e.isBoss && e.hurt(9999)) this.killEnemy(g, e);
      }
    }
  },

  /* ---------- hạ gục quái ---------- */
  killEnemy(g, e) {
    e.dead = true;
    g.kills++;

    // combo tăng dần khi hạ liên tiếp trong khoảng thời gian ngắn
    g.comboT = SC.CFG.comboWindow;
    g.combo = Math.min(SC.CFG.maxCombo, g.combo + 1);
    if (g.combo > g.stats.maxCombo) g.stats.maxCombo = g.combo;
    SC.UI.setCombo(g.combo);

    const gain = Math.round(e.def.score * g.combo * 0.6);
    g.score += gain;
    SC.FX.text(e.x, e.y - 12, '+' + gain, g.combo > 3 ? '#ffd23f' : '#fff');

    const col = e.isBoss ? '#ff8a2b' : '#ffe28a';
    SC.FX.burst(e.x, e.y, col, e.isBoss ? 70 : 18, e.isBoss ? 420 : 250, e.isBoss ? 6 : 3.4);
    SC.FX.feathers(e.x, e.y, '#fff6d8', e.isBoss ? 24 : 7);
    SC.addShake(e.isBoss ? 26 : 5, e.isBoss ? .8 : .12);
    SC.Audio.explode(e.isBoss);
    if (e.isBoss) SC.Input.vibrate(90);

    if (e.isBoss) {
      for (let i = 0; i < 16; i++)
        SC.Items.drop(e.x + SC.rnd(-60, 60), e.y + SC.rnd(-30, 30), i % 4 === 0 ? 'gem' : 'coin');
      SC.UI.toast('HẠ GỤC ' + e.name, true);
    } else if (Math.random() < e.def.drop) {
      SC.Items.drop(e.x, e.y);
    }
  },

  /* ---------- nhặt vật phẩm (auto loot) ---------- */
  pickup(g, kind, x, y) {
    const p = g.player;
    switch (kind) {
      case 'coin':  g.coin += 3;  g.score += 5;  SC.FX.text(x, y, '+3◈', '#ffd23f');  SC.Audio.coin(); break;
      case 'gem':   g.coin += 15; g.score += 50; SC.FX.text(x, y, '+15◈', '#c58cff'); SC.Audio.gem(); break;
      case 'power':
        if (p.weapon < SC.CFG.maxWeapon) {
          p.weapon++; SC.UI.setWeapon(p.weapon);
          SC.FX.text(x, y, 'VŨ KHÍ ' + p.weapon, '#ff8a2b'); SC.UI.toast('NÂNG CẤP VŨ KHÍ ' + p.weapon);
        } else { g.score += 120; SC.FX.text(x, y, '+120', '#ff8a2b'); }
        SC.Audio.power();
        break;
      case 'heal':   p.hp = Math.min(p.hpMax, p.hp + 22); SC.FX.text(x, y, '+22 HP', '#4dff9f'); SC.Audio.heal(); break;
      case 'shield': p.shield = p.shieldMax; SC.FX.text(x, y, 'KHIÊN', '#3fe0ff'); SC.Audio.shield(); break;
      case 'bomb':   this.bomb(g); break;
    }
    SC.FX.burst(x, y, '#ffffff', 6, 120, 2);
  },

  /* ---------- cứu được một phi công ---------- */
  rescue(g, x, y) {
    g.stats.rescued++;
    g.coin += 5;
    g.score += 150;
    SC.FX.text(x, y - 16, 'ĐÃ CỨU! +5◈', '#4dff9f');
    SC.FX.burst(x, y, '#4dff9f', 22, 240, 3.4);
    SC.Audio.heal();
    SC.Input.vibrate(35);
    SC.UI.setRescue(g.stats.rescued, SC.Missions.rescueTarget());
  },

  /* bom: quét sạch đạn địch + gây sát thương diện rộng */
  bomb(g) {
    SC.Bullets.foe.length = 0;
    SC.addShake(20, .5);
    SC.Input.vibrate(60);
    SC.Audio.bomb();
    SC.FX.burst(g.player.x, g.player.y, '#ff3b5c', 60, 520, 5);
    // cả màn chớp trắng rồi chữ BOM nổ ra trong bong bóng kiểu truyện tranh
    SC.ScreenFX.flash('255,240,220', 0.22);
    SC.ScreenFX.pop('BOM!', '#ff3b5c');
    for (const e of g.enemies) if (!e.dead && e.hurt(e.isBoss ? 160 : 60)) this.killEnemy(g, e);
  }
};

;
/* ===== js/system-renderer.js ===== */
/* system-renderer.js — thứ tự vẽ một khung hình
 *
 * Tách khỏi main.js để chỗ nào vẽ trước vẽ sau nhìn là thấy ngay. */

SC.Renderer = {
  draw(g) {
    const ctx = g.ctx;
    SC.View.apply(ctx);            // đưa hệ toạ độ về đơn vị ảo (đã tính DPR)

    ctx.save();
    if (SC.shake.t > 0) {          // rung màn hình
      const s = SC.shake.power * SC.shake.t;
      ctx.translate(SC.rnd(-s, s), SC.rnd(-s, s));
    }

    SC.BG.render(ctx);

    // Ở lobby: máy bay đứng chờ, vẽ ngay trên nền và dưới lớp UI của DOM
    if (g.state === 'menu') SC.LobbyShip.render(ctx);

    if (g.state !== 'menu') {
      SC.Items.render(ctx);        // vật phẩm nằm dưới cùng
      SC.Rescue.render(ctx);
      for (const e of g.enemies) e.render(ctx);
      SC.Bullets.render(ctx);
      SC.Wingmen.render(ctx);
      g.player.render(ctx);        // máy bay chính vẽ trên phi đội
      SC.FX.render(ctx);           // hạt và số điểm nằm trên hết
    }
    ctx.restore();

    // vệt mực của chiêu làm mù: che tầm nhìn nên phải nằm trên quái và đạn,
    // nhưng dưới viền tối và dưới chữ để người chơi còn đọc được thông báo
    if (g.state !== 'menu') SC.BossSkillArt.screen(ctx);

    this._vignette(ctx);
    SC.ScreenFX.render(ctx);      // ngoài phép rung: chớp sáng và chữ phải đứng yên
  },

  /* viền tối quanh khung hình cho có chiều sâu */
  _vignette(ctx) {
    const v = ctx.createRadialGradient(
      SC.W / 2, SC.H / 2, SC.H * 0.32,
      SC.W / 2, SC.H / 2, SC.H * 0.72
    );
    v.addColorStop(0, 'rgba(0,0,0,0)');
    v.addColorStop(1, 'rgba(0,0,0,.55)');
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, SC.W, SC.H);
  }
};

;
/* ===== js/ui-audio-controls.js ===== */
/* ui-audio-controls.js — nhóm nút bật/tắt âm thanh
 *
 * Có 5 nút cùng điều khiển 2 công tắc: hiệu ứng và nhạc nền.
 * Cặp ở menu, cặp trùng ở màn tạm dừng, thêm 1 nút tắt nhanh trên HUD. */

SC.AudioUI = {
  bind(on) {
    on('btnSfx', () => this.toggleSfx());
    on('btnSfx2', () => this.toggleSfx());
    on('btnMus', () => this.toggleMus());
    on('btnMus2', () => this.toggleMus());
    on('btnMute', () => this.toggleAll());
    this.sync();
  },

  toggleSfx() {
    SC.Audio.setSfx(!SC.Audio.sfxOn);
    this.sync();
  },

  toggleMus() {
    SC.Audio.setMus(!SC.Audio.musOn);
    if (SC.Audio.musOn && SC.Game.state === 'play') SC.Music.start(SC.Game.lv.biome);
    else if (!SC.Audio.musOn) SC.Music.stop();
    this.sync();
  },

  /* nút loa trên HUD: đang có tiếng thì tắt hết, đang im thì bật lại hết */
  toggleAll() {
    const wasOn = SC.Audio.sfxOn || SC.Audio.musOn;
    SC.Audio.setSfx(!wasOn);
    SC.Audio.setMus(!wasOn);
    if (!wasOn && SC.Game.state === 'play') SC.Music.start(SC.Game.lv.biome);
    else SC.Music.stop();
    this.sync();
  },

  /* Đồng bộ trạng thái mọi nút.
     Chỉ bật/tắt class .off — icon (2 bản on/off) và nhãn đã nằm sẵn trong HTML,
     CSS .ic-swap lo việc đổi hình. Ghi textContent ở đây là xoá sạch cả icon lẫn chữ. */
  sync() {
    const set = (id, isOn) => {
      const b = document.getElementById(id);
      if (b) b.classList.toggle('off', !isOn);
    };
    set('btnSfx', SC.Audio.sfxOn);
    set('btnSfx2', SC.Audio.sfxOn);
    set('btnMus', SC.Audio.musOn);
    set('btnMus2', SC.Audio.musOn);
    set('btnMute', SC.Audio.sfxOn || SC.Audio.musOn);
  }
};

;
/* ===== js/ui-settings.js ===== */
/* ui-settings.js — tuỳ chọn của người chơi: rung màn hình, toàn màn hình, xoá tiến độ
 *
 * Rung màn hình để riêng khỏi tiến độ (không đồng bộ lên đám mây) vì nó là sở thích
 * của từng máy: cùng một tài khoản, chơi màn hình lớn với chơi điện thoại cảm giác
 * khác hẳn nhau.
 */

SC.Settings = {
  KEY: 'skychicken.settings',
  shake: true,

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      // chỉ nhận đúng khoá mình biết, tránh dữ liệu hỏng đè lên hàm của module
      if (raw) { const o = JSON.parse(raw); if (typeof o.shake === 'boolean') this.shake = o.shake; }
    } catch (e) { /* localStorage bị chặn thì dùng mặc định */ }
  },

  save() {
    try { localStorage.setItem(this.KEY, JSON.stringify({ shake: this.shake })); } catch (e) {}
  },

  bind(on) {
    on('btnShake', () => this.toggleShake());
    on('btnShake2', () => this.toggleShake());
    on('btnFull', () => SC.View.toggleFullscreen());
    on('btnReset', () => this.reset());

    // Màn cài đặt: gom hết chrome của app ra khỏi lobby (âm thanh, rung, màn hình,
    // tài khoản, xoá tiến độ) để lobby chỉ còn việc chơi.
    on('btnOptions', () => SC.UI.show('options'));
    on('btnOptionsBack', () => { SC.UI.show('menu'); SC.UI.syncMenu(); });

    // nhãn nút toàn màn hình phải theo trạng thái THẬT, kể cả khi bấm F11 hay Esc
    const sync = () => this.syncFullscreen();
    document.addEventListener('fullscreenchange', sync);
    document.addEventListener('webkitfullscreenchange', sync);
    if (!SC.View.canFullscreen()) document.getElementById('btnFull').style.display = 'none';
    sync();
    this.sync();
  },

  toggleShake() {
    this.shake = !this.shake;
    this.save();
    this.sync();
    if (!this.shake) { SC.shake.t = 0; SC.shake.power = 0; }   // dừng ngay, không đợi tắt dần
    SC.UI.toast(this.shake ? 'RUNG MÀN HÌNH: BẬT' : 'RUNG MÀN HÌNH: TẮT');
  },

  /* Chỉ đổi class, KHÔNG ghi đè textContent: nhãn và icon SVG nằm sẵn trong HTML,
     ghi textContent là xoá mất luôn cả hai (bài học từ bản dùng emoji). */
  sync() {
    for (const id of ['btnShake', 'btnShake2']) {
      const b = document.getElementById(id);
      if (b) b.classList.toggle('off', !this.shake);
    }
  },

  syncFullscreen() {
    const b = document.getElementById('btnFull');
    if (!b) return;
    const full = !!(document.fullscreenElement || document.webkitFullscreenElement);
    b.classList.toggle('off', full);            // .off ở đây = đang toàn màn hình -> icon thu nhỏ
    const lb = document.getElementById('btnFullLabel');
    if (lb) lb.textContent = full ? 'CỬA SỔ' : 'TOÀN MÀN HÌNH';
  },

  reset() {
    // nói rõ xoá của hồ sơ NÀO — máy có tới 3 hồ sơ, xoá nhầm là mất cả trăm màn
    if (!confirm(`Xóa toàn bộ tiến độ, vàng và nâng cấp của hồ sơ "${SC.Profiles.cur().name}"?`)) return;
    SC.UI.progress = { stars: {}, unlocked: 1, coin: 0, upg: {}, missions: {}, times: {} };
    SC.UI.save();
    SC.UI.buildMapList();
    SC.UI.syncMenu();
    SC.Cloud.markDirty(0);       // đã đăng nhập thì đám mây cũng phải theo
  }
};

;
/* ===== js/ui-menu-card.js ===== */
/* ui-menu-card.js — thẻ xuất kích ở lobby
 *
 * Trước đây menu chỉ nói được 5 con số trần trụi, trong khi dữ liệu để lobby "có chất"
 * đã nằm sẵn trong game từ lâu mà không ai lấy ra: danh hiệu phi công (SC.Power.rank),
 * tên trùm sắp gặp (lv.bossName), vị trí trong vùng (lv.stage), nhãn độ khó (lv.chunk),
 * màu của vùng (biome.hue). Tệp này kéo hết chúng ra mặt tiền.
 *
 * Nó cũng là chỗ quyết định MÀU của cả lobby: gán --tint theo vùng sắp tới, và đặt
 * nền parallax của canvas về đúng biome đó — nên mở game lên là thấy cảnh nơi mình
 * sắp bay tới, không phải cánh đồng của màn 1.
 */

SC.MenuCard = {
  _prev: {},        // giá trị lần trước -> chỉ chạy hiệu ứng đếm khi số THỰC SỰ đổi

  sync(ui) {
    const id = s => document.getElementById(s);
    const set = (s, v) => { const e = id(s); if (e) e.textContent = v; };

    const next = Math.min(SC.TOTAL_LEVELS, ui.progress.unlocked);
    const lv = SC.LEVELS[next - 1];
    if (!lv) return;
    const biome = SC.BIOMES[lv.biome];
    const per = SC.LEVELS_PER_BIOME;

    /* ---------- màu của cả lobby theo vùng sắp tới ---------- */
    // Dùng đúng công thức của bản đồ hành trình (ui-map-select.js) nên hai màn cùng hệ màu
    const menu = id('scrMenu');
    if (menu) menu.style.setProperty('--tint', `hsl(${biome.hue},70%,62%)`);
    this.syncBiome(lv);

    /* ---------- lời dẫn + chặng ---------- */
    const done = Object.prototype.hasOwnProperty.call(ui.progress.stars, lv.id);
    set('nowLabel', done ? 'CHƠI TIẾP' : next === 1 ? 'BẮT ĐẦU HÀNH TRÌNH' : 'CHẶNG TIẾP THEO');
    set('nowMap', 'MÀN ' + String(lv.id).padStart(2, '0'));
    set('nowBiome', `${biome.name} · ${lv.stage}/${per}`);

    // nhãn độ khó của chặng, tô đỏ ở hai đỉnh cao trào của vùng
    const chunk = id('nowChunk');
    if (chunk) {
      chunk.textContent = lv.chunk || '';
      chunk.classList.toggle('hard', !!lv.boss);
    }

    // tên trùm: chỉ hiện ở chặng thật sự có trùm, còn lại giấu hẳn cho đỡ ồn
    const foe = id('nowFoe');
    if (foe) {
      foe.classList.toggle('hidden', !lv.boss);
      if (lv.boss) foe.textContent = (lv.finalBoss ? 'TRÙM VÙNG · ' : 'ELITE · ') + lv.bossName;
    }
    const card = id('menuNow');
    if (card) card.classList.toggle('boss', !!lv.boss);

    /* ---------- tiến độ sao ---------- */
    const star = ui.totalStar();
    set('nowStars', star);
    set('nowStarMax', SC.TOTAL_STARS);
    const fill = id('nowStarFill');
    if (fill) fill.style.width = (star / SC.TOTAL_STARS * 100).toFixed(1) + '%';

    /* ---------- ví + sức mạnh ---------- */
    this._count('nowPower', SC.Power.total());
    this._count('menuCoin', ui.progress.coin);
    set('nowUpg', SC.Upg.totalLevels());
    set('nowUpgMax', SC.Upg.totalMax());

    const badge = id('shopBadge');
    if (badge) badge.className = SC.Upg.anyAffordable() ? 'dot' : '';

    // dòng phụ dưới logo: số map lấy từ dữ liệu, đổi levelsPerBiome trong Excel là tự đúng
    set('logoTag', `${SC.TOTAL_LEVELS} MAPS · AUTO FIRE · AUTO LOOT`);

    this.hookLine(ui, lv, biome, per);
    SC.AuthPanel.sync();          // thẻ hồ sơ + danh hiệu + trạng thái đăng nhập
  },

  /* Nền lobby lấy đúng cảnh của vùng sắp tới. Gọi lại mỗi lần sync vì đổi hồ sơ
     hay xoá tiến độ đều làm chặng kế nhảy sang vùng khác. */
  syncBiome(lv) {
    if (SC.Game && SC.Game.state === 'menu' && SC.BG.biomeId !== lv.biome) SC.BG.setBiome(lv.biome);
  },

  /* ---------- dòng nhắc động ----------
     Lấy dòng ĐẦU TIÊN khớp, không có gì đáng nói thì ẩn hẳn — thà im lặng còn hơn
     hiện một câu chung chung mà lần nào mở game cũng thấy y hệt. */
  hookLine(ui, lv, biome, per) {
    const el = document.getElementById('lobbyHook');
    if (!el) return;
    const msg = this._pickHook(ui, lv, biome, per);
    el.classList.toggle('hidden', !msg);
    if (msg) el.innerHTML = msg;
  },

  _pickHook(ui, lv, biome, per) {
    const esc = s => SC.Rank.esc(String(s));

    // 1. sắp tới trùm vùng — chỉ nhắc khi chặng này CHƯA phải trùm (thẻ đã nói rồi)
    if (!lv.boss) {
      const left = per - lv.stage;
      if (left > 0 && left <= 2)
        return `Còn <b>${left}</b> chặng nữa gặp <b>${esc(biome.bossName)}</b>`;
    }

    // 2. sắp lên danh hiệu
    const nx = SC.Power.next();
    if (nx && nx.need <= 8) return `Còn <b>${nx.need}</b> lực chiến nữa lên <b>${esc(nx.name)}</b>`;

    // 3. hồ sơ khác trên máy đang đi trước mình
    const me = ui.progress.unlocked;
    const ahead = SC.Profiles.summaries()
      .filter(p => !p.isMe && p.level > me)
      .sort((a, b) => b.level - a.level)[0];
    if (ahead) return `<b>${esc(ahead.name)}</b> đã tới màn <b>${ahead.level}</b>`;

    // 4. đủ vàng nâng cấp -> gọi tên món rẻ nhất mua được cho cụ thể
    const buyable = SC.UPGRADES
      .filter(u => SC.Upg.canBuy(u.key))
      .sort((a, b) => SC.Upg.cost(a.key) - SC.Upg.cost(b.key))[0];
    if (buyable) return `Đủ vàng nâng <b>${esc(buyable.name)}</b>`;

    return '';
  },

  /* Đếm lên khi số đổi — cho cảm giác vừa kiếm được, không phải con số chết.
     Chỉ chạy khi giá trị khác lần trước, nếu không mỗi lần về menu lại đếm lại. */
  _count(elId, target) {
    const el = document.getElementById(elId);
    if (!el) return;
    const from = this._prev[elId];
    this._prev[elId] = target;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (from === undefined || from === target || reduce) { el.textContent = target; return; }

    clearInterval(el._countT);
    const t0 = performance.now(), span = 450, d = target - from;
    el._countT = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / span);
      el.textContent = Math.round(from + d * (1 - Math.pow(1 - k, 3)));   // ease-out
      if (k >= 1) clearInterval(el._countT);
    }, 32);
  }
};

;
/* ===== js/ui-result.js ===== */
/* ui-result.js — bảng kết quả sau mỗi màn
 *
 * Trước đây phần vàng nhồi cả công thức vào một dòng
 * ("Vàng (30 nhặt + 48 thưởng · +72%)  +134") — chữ bị gãy dòng và người chơi
 * không hiểu con số ở đâu ra. Nay tách mỗi khoản một dòng, tổng nằm riêng dưới cùng.
 * Cũng bổ sung số màn vừa hoàn thành: trước đây bảng không nói mình vừa chơi map nào. */

SC.Result = {
  show(ui, win, r) {
    const id = s => document.getElementById(s);
    const lv = SC.LEVELS[SC.Game.levelId - 1];

    id('resTitle').textContent = win ? 'HOÀN THÀNH' : 'THẤT BẠI';
    id('resTitle').style.color = win ? 'var(--acc)' : 'var(--dan)';

    // Màn vừa chơi. Dùng tên vùng chứ không dùng lv.name vì lv.name đã kèm số
    // thứ tự trong vùng, ghép vào thành "MÀN 15 · SA MẠC HOÀNG HÔN 5" thừa và gãy dòng.
    id('resLevel').textContent = 'MÀN ' + String(lv.id).padStart(2, '0')
      + ' · ' + SC.BIOMES[lv.biome].name
      + (lv.finalBoss ? ' · TRÙM VÙNG' : lv.boss ? ' · ELITE' : '');

    [...id('resStars').children].forEach((s, i) => s.classList.toggle('on', win && i < r.stars));

    id('resMissions').innerHTML = r.missions.map(m => `
      <li class="${win && m.done ? 'ok' : 'no'}">
        <span class="m-ic">${m.def.ic}</span>${m.text}
        <b>${win && m.done ? '✓' : '✗'}</b>
      </li>`).join('');

    id('resScore').textContent = r.score;
    id('resKill').textContent = r.kills;
    id('resAcc').textContent = r.acc + '%';

    id('resGold').innerHTML = this._goldRows(win, r);

    ui.el.btnResNext.style.display = (win && SC.Game.levelId < SC.TOTAL_LEVELS) ? '' : 'none';
    id('btnResShop').classList.toggle('glow', SC.Upg.anyAffordable());

    ui.syncMenu();
    ui.showOverlay('result');
  },

  /* Bóc tách từng khoản vàng thành các dòng riêng cho dễ đọc */
  _goldRows(win, r) {
    const row = (ten, gt, lop) => `<li class="${lop || ''}"><span>${ten}</span><b>${gt}</b></li>`;

    if (!win) return row('Vàng nhặt được', '+' + r.gold, 'tong');

    const out = [row('Vàng nhặt trong màn', '+' + r.coin)];
    out.push(row(`Thưởng hoàn thành (${r.stars} sao)`, '+' + r.bonus));

    // phần do dòng nâng cấp THU VÀNG sinh ra
    const themDoNangCap = r.gold - r.coin - r.bonus;
    if (themDoNangCap > 0) {
      out.push(row(`Thu vàng +${Math.round((r.mul - 1) * 100)}%`, '+' + themDoNangCap));
    }
    out.push(row('TỔNG NHẬN', '+' + r.gold, 'tong'));
    return out.join('');
  }
};

;
/* ===== js/system-profiles.js ===== */
/* system-profiles.js — 3 hồ sơ chơi trên cùng một máy
 *
 * Vì sao có: một nhà mấy người chơi chung máy, hoặc một người muốn thử build khác
 * mà không đập tiến độ đang cày. Mỗi hồ sơ có kho tiến độ riêng hoàn toàn.
 *
 * Hồ sơ là danh tính CỤC BỘ, khác với đăng nhập Google (danh tính đám mây). Đăng
 * nhập Google chỉ gắn thêm sao lưu và bảng xếp hạng cho hồ sơ đang mở.
 */

SC.Profiles = {
  KEY: 'skychicken.profiles',
  MAX: 3,
  OLD_KEY: 'skychicken.progress.v1',        // kho tiến độ thời chưa có hồ sơ

  AVATARS: ['🐔', '🦅', '🐧', '🦉', '🐤', '🦜', '🐦', '🦆'],

  list: [],        // [{ id, name, avatar }]
  active: 0,       // vị trí trong list

  /* khoá localStorage chứa tiến độ của một hồ sơ */
  keyOf(id) { return this.OLD_KEY + '.' + id; },
  saveKey() { return this.keyOf(this.cur().id); },
  cur() { return this.list[this.active] || this.list[0]; },
  full() { return this.list.length >= this.MAX; },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (raw) {
        const o = JSON.parse(raw);
        this.list = Array.isArray(o.list) ? o.list.slice(0, this.MAX) : [];
        this.active = Math.min(o.active || 0, Math.max(0, this.list.length - 1));
      }
    } catch (e) { /* localStorage bị chặn -> chơi với hồ sơ mặc định trong bộ nhớ */ }

    if (!this.list.length) this._firstRun();
  },

  /* Lần đầu chạy bản có hồ sơ: dựng hồ sơ 1 và KÉO THEO tiến độ cũ.
     Người đang cày dở mà mất sạch vì bản cập nhật là chuyện không chấp nhận được. */
  _firstRun() {
    this.list = [{ id: 1, name: 'PHI CÔNG 1', avatar: this.AVATARS[0] }];
    this.active = 0;
    try {
      const old = localStorage.getItem(this.OLD_KEY);
      if (old && !localStorage.getItem(this.keyOf(1))) localStorage.setItem(this.keyOf(1), old);
    } catch (e) {}
    this.save();
  },

  save() {
    try {
      localStorage.setItem(this.KEY, JSON.stringify({ list: this.list, active: this.active }));
    } catch (e) {}
  },

  /* tiến độ của một hồ sơ bất kỳ — dùng để vẽ vị trí người khác trên bản đồ */
  progressOf(id) {
    try {
      const raw = localStorage.getItem(this.keyOf(id));
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  },

  /* tóm tắt mọi hồ sơ: chặng đang đứng, tổng sao, vàng */
  summaries() {
    return this.list.map((p, i) => {
      const pr = this.progressOf(p.id) || {};
      const stars = Object.values(pr.stars || {}).reduce((a, b) => a + b, 0);
      return {
        idx: i, id: p.id, name: p.name, avatar: p.avatar, isMe: i === this.active,
        level: Math.min(SC.TOTAL_LEVELS, pr.unlocked || 1),
        stars, coin: pr.coin || 0,
        cleared: Object.keys(pr.stars || {}).length
      };
    });
  },

  create(name, avatar) {
    if (this.full()) return false;
    const id = Math.max(0, ...this.list.map(p => p.id)) + 1;
    this.list.push({ id, name: (name || 'PHI CÔNG').slice(0, 14), avatar: avatar || this.AVATARS[0] });
    this.active = this.list.length - 1;
    this.save();
    return true;
  },

  select(i) {
    if (i < 0 || i >= this.list.length || i === this.active) return false;
    this.active = i;
    this.save();
    return true;
  },

  remove(i) {
    if (this.list.length <= 1) return false;         // luôn phải còn ít nhất một hồ sơ
    const [gone] = this.list.splice(i, 1);
    try { localStorage.removeItem(this.keyOf(gone.id)); } catch (e) {}
    if (this.active >= this.list.length) this.active = this.list.length - 1;
    else if (i < this.active) this.active--;
    this.save();
    return true;
  }
};

;
/* ===== js/ui-profile-panel.js ===== */
/* ui-profile-panel.js — màn hình chọn / tạo / xoá hồ sơ (tối đa 3) */

SC.ProfileUI = {
  pickAvatar: 0,

  init(on) {
    on('btnProfile', () => { SC.UI.show('profile'); this.build(); });
    on('btnProfileBack', () => { SC.UI.show('menu'); SC.UI.syncMenu(); });

    document.getElementById('profList').addEventListener('click', e => {
      const row = e.target.closest('[data-idx]');
      if (!row) return;
      const i = +row.dataset.idx;
      SC.Audio.click();
      if (e.target.closest('.prof-del')) this.remove(i);
      else this.select(i);
    });

    document.getElementById('avaPick').addEventListener('click', e => {
      const b = e.target.closest('button[data-a]');
      if (!b) return;
      SC.Audio.click();
      this.pickAvatar = +b.dataset.a;
      this.build();
    });

    on('btnProfNew', () => this.create());
  },

  build() {
    const list = document.getElementById('profList');
    const rows = SC.Profiles.summaries();

    list.innerHTML = rows.map(p => `
      <div class="prof-row${p.isMe ? ' me' : ''}" data-idx="${p.idx}">
        <span class="prof-ava">${p.avatar}</span>
        <div class="prof-mid">
          <b>${SC.Rank.esc(p.name)}${p.isMe ? ' <em>đang chơi</em>' : ''}</b>
          <span>Màn ${p.level} · ★${p.stars} · ◈${p.coin}</span>
        </div>
        ${rows.length > 1 ? '<button class="prof-del" title="Xoá hồ sơ">🗑</button>' : ''}
      </div>`).join('');

    // khu tạo hồ sơ mới chỉ hiện khi còn chỗ
    const box = document.getElementById('profNewBox');
    box.classList.toggle('hidden', SC.Profiles.full());
    document.getElementById('profFull').classList.toggle('hidden', !SC.Profiles.full());

    document.getElementById('avaPick').innerHTML = SC.Profiles.AVATARS
      .map((a, i) => `<button data-a="${i}"${i === this.pickAvatar ? ' class="on"' : ''}>${a}</button>`)
      .join('');
  },

  select(i) {
    if (!SC.Profiles.select(i)) return;
    this._reloadProgress();
    SC.UI.toast('HỒ SƠ: ' + SC.Profiles.cur().name);
    this.build();
  },

  create() {
    const name = (document.getElementById('profName').value || '').trim();
    if (!name) { SC.UI.toast('NHẬP TÊN PHI CÔNG'); return; }
    SC.Audio.click();
    SC.Profiles.create(name, SC.Profiles.AVATARS[this.pickAvatar]);
    document.getElementById('profName').value = '';
    this._reloadProgress();
    SC.UI.toast('ĐÃ TẠO HỒ SƠ');
    this.build();
  },

  remove(i) {
    const p = SC.Profiles.summaries()[i];
    if (!confirm(`Xoá hồ sơ "${p.name}" (màn ${p.level}, ★${p.stars})? Không khôi phục được.`)) return;
    const wasMe = p.isMe;
    SC.Profiles.remove(i);
    if (wasMe) this._reloadProgress();     // đang đứng ở hồ sơ vừa xoá -> nạp hồ sơ mới
    this.build();
    SC.UI.syncMenu();
  },

  /* Đổi hồ sơ = đổi kho tiến độ. Phải nạp lại và dựng lại mọi thứ đang hiển thị. */
  _reloadProgress() {
    SC.UI.progress = { stars: {}, unlocked: 1, coin: 0, upg: {}, missions: {}, times: {} };
    SC.UI.load();
    SC.UI.buildMapList();
    SC.UI.syncMenu();
  }
};

;
/* ===== js/system-firebase.js ===== */
/* system-firebase.js — nạp SDK Firebase theo kiểu lười, dùng chung cho auth và cloud
 *
 * Vì sao nạp lười bằng import() động thay vì thẻ <script>:
 *   - Người chơi ẩn danh (đa số) không phải tải thêm ~200KB SDK nào cả.
 *   - Bộ nối file của build.mjs chạy ở chế độ sloppy với biến toàn cục SC; import()
 *     động vẫn dùng được trong script thường nên không phải đổi kiến trúc.
 *   - Mất mạng thì import() ném lỗi, bắt lại là xong — game vẫn chơi được offline.
 */

SC.FB = {
  SDK: 'https://www.gstatic.com/firebasejs/10.12.5',

  /* đã khai báo dự án chưa — chưa thì toàn bộ tính năng đám mây tự ẩn đi */
  configured() {
    const c = SC.FB_CONFIG;
    return !!(c && c.apiKey && c.projectId && c.appId);
  },

  _p: null,

  /* Trả Promise gói {auth, db, authM, fsM}. Gọi bao nhiêu lần cũng chỉ nạp một lần. */
  load() {
    if (this._p) return this._p;
    if (!this.configured()) return Promise.reject(new Error('Chưa cấu hình Firebase'));

    this._p = (async () => {
      const [appM, authM, fsM] = await Promise.all([
        import(`${this.SDK}/firebase-app.js`),
        import(`${this.SDK}/firebase-auth.js`),
        import(`${this.SDK}/firebase-firestore.js`)
      ]);
      const app = appM.initializeApp(SC.FB_CONFIG);
      return { app, authM, fsM, auth: authM.getAuth(app), db: fsM.getFirestore(app) };
    })();

    // hỏng (mất mạng, CDN chặn) thì xoá cache để lần sau còn thử lại được
    this._p.catch(() => { this._p = null; });
    return this._p;
  },

  /* Đổi mã lỗi Firebase thành câu tiếng Việt người chơi hiểu được */
  err(e) {
    const c = (e && e.code) || '';
    if (c.includes('popup-closed') || c.includes('cancelled-popup')) return 'Đã huỷ đăng nhập';
    if (c.includes('network')) return 'Mất kết nối mạng';
    if (c.includes('unauthorized-domain')) return 'Tên miền chưa được cấp phép';
    if (c.includes('permission-denied')) return 'Không có quyền ghi dữ liệu';
    if (c.includes('unavailable')) return 'Máy chủ bận, thử lại sau';
    return 'Lỗi kết nối, thử lại sau';
  }
};

;
/* ===== js/system-auth.js ===== */
/* system-auth.js — đăng nhập Google, tách riêng khỏi UI
 *
 * Nguyên tắc: KHÔNG bắt đăng nhập mới chơi được. Vào là chơi ngay, đăng nhập chỉ
 * cần khi muốn lên bảng xếp hạng hoặc giữ tiến độ khi đổi máy.
 *
 * Mẹo tiết kiệm: chỉ nạp SDK khi người chơi từng đăng nhập (cờ trong localStorage)
 * hoặc khi bấm nút. Người chơi ẩn danh không tải thêm byte nào.
 */

SC.Auth = {
  FLAG: 'skychicken.signedin',
  user: null,          // { uid, name, avatar } hoặc null
  busy: false,
  msg: '',             // thông báo lỗi gần nhất, để UI hiện ra
  _subs: [],
  _attached: false,

  available() { return SC.FB.configured(); },

  /* UI đăng ký ở đây; gọi luôn một lần để vẽ trạng thái ban đầu */
  onChange(fn) { this._subs.push(fn); fn(this.user); },
  _emit() { for (const f of this._subs) f(this.user); },

  /* Gọi lúc khởi động. Chưa từng đăng nhập thì không đụng gì tới mạng. */
  async init() {
    if (!this.available()) return;
    if (!localStorage.getItem(this.FLAG)) return;
    this.busy = true; this._emit();
    try { await this._attach(); }
    catch (e) { this.msg = SC.FB.err(e); }
    finally { this.busy = false; this._emit(); }
  },

  /* Nối vào luồng trạng thái đăng nhập của Firebase (chỉ một lần) */
  async _attach() {
    if (this._attached) return SC.FB.load();
    const fb = await SC.FB.load();
    this._attached = true;

    // iOS Safari hay chặn popup nên có nhánh redirect; kết quả rơi về đây
    await fb.authM.getRedirectResult(fb.auth).catch(() => {});

    fb.authM.onAuthStateChanged(fb.auth, u => {
      this.user = u ? {
        uid: u.uid,
        name: u.displayName || 'Phi công',
        avatar: u.photoURL || ''
      } : null;

      if (this.user) localStorage.setItem(this.FLAG, '1');
      else localStorage.removeItem(this.FLAG);

      this.busy = false;
      this._emit();
      SC.Cloud.onUser(this.user);        // kéo/đẩy tiến độ
    });
    return fb;
  },

  async login() {
    if (this.busy) return;
    this.busy = true; this.msg = ''; this._emit();
    try {
      const fb = await this._attach();
      const prov = new fb.authM.GoogleAuthProvider();
      try {
        await fb.authM.signInWithPopup(fb.auth, prov);
      } catch (e) {
        // popup bị chặn (iOS, trình duyệt trong app) -> chuyển hẳn sang redirect
        const c = (e && e.code) || '';
        if (c.includes('popup-blocked') || c.includes('operation-not-supported')) {
          await fb.authM.signInWithRedirect(fb.auth, prov);
          return;                        // trang sẽ tự tải lại
        }
        throw e;
      }
    } catch (e) {
      this.msg = SC.FB.err(e);
      this.busy = false;
      this._emit();
      if (this.msg) SC.UI.toast(this.msg);
    }
  },

  async logout() {
    if (this.busy || !this.user) return;
    this.busy = true; this._emit();
    try {
      const fb = await SC.FB.load();
      await fb.authM.signOut(fb.auth);
      SC.UI.toast('ĐÃ ĐĂNG XUẤT');
    } catch (e) {
      this.msg = SC.FB.err(e);
      SC.UI.toast(this.msg);
    } finally {
      this.busy = false;
      this._emit();
    }
  }
};

;
/* ===== js/system-cloud-save.js ===== */
/* system-cloud-save.js — sao lưu tiến độ và nộp điểm xếp hạng
 *
 * QUY TẮC VÀNG: localStorage luôn là bản gốc. Đám mây chỉ là bản sao lưu.
 * Mất mạng, Firebase hỏng, chưa đăng nhập — game vẫn chơi trọn vẹn như cũ.
 * Không bao giờ tự ghi đè tiến độ trong máy khi hai bên lệch nhau: hỏi người chơi.
 *
 * Ghi lên đám mây chỉ ở hai thời điểm (đỡ tốn hạn mức miễn phí):
 *   - kết thúc một màn
 *   - mua nâng cấp
 */

SC.Cloud = {
  state: 'off',        // off | pull | ok | wait | err   (UI đọc để hiện chấm trạng thái)
  _timer: 0,
  _dirty: false,
  _rank: {},           // đệm kết quả bảng xếp hạng: { tab: {t, rows} }

  /* ---------- số liệu rút ra từ tiến độ ---------- */
  stats() {
    const p = SC.UI.progress;
    const times = p.times || {};
    let sum = 0, cleared = 0;
    for (let i = 1; i <= SC.TOTAL_LEVELS; i++) {
      if (times[i] > 0) { sum += times[i]; cleared++; }
    }
    return {
      highestLevel: Math.min(SC.TOTAL_LEVELS, p.unlocked || 1),
      totalStars: SC.UI.totalStar(),
      cleared,
      // chỉ tính "thời gian hoàn thành" khi đã qua đủ 100 màn, so kèo mới công bằng
      campaignTime: cleared >= SC.TOTAL_LEVELS ? Math.round(sum) : null
    };
  },

  /* điểm để so hai bản tiến độ — sao trước, rồi màn, rồi vàng */
  _weight(p) {
    if (!p) return -1;
    const st = Object.values(p.stars || {}).reduce((a, b) => a + b, 0);
    return st * 1e6 + (p.unlocked || 1) * 1e3 + Math.min(999, (p.coin || 0) / 100);
  },

  /* Máy chưa chơi gì. Phải xét riêng chứ không dựa vào _weight: tiến độ mới tinh
     vẫn có unlocked = 1 nên điểm khác 0, dễ bị hiểu nhầm là "có tiến độ". */
  _empty(p) {
    return !p || ((p.unlocked || 1) <= 1 && !Object.keys(p.stars || {}).length);
  },

  /* ---------- vòng đời ---------- */
  onUser(user) {
    clearTimeout(this._timer);
    if (!user) { this.state = 'off'; SC.AuthPanel.sync(); return; }
    this.pull();
  },

  async pull() {
    this.state = 'pull'; SC.AuthPanel.sync();
    try {
      const fb = await SC.FB.load();
      const { doc, getDoc } = fb.fsM;
      const snap = await getDoc(doc(fb.db, 'users', SC.Auth.user.uid));
      const cloud = snap.exists() ? snap.data().progress : null;

      if (!cloud) {                       // tài khoản mới -> lấy luôn tiến độ đang chơi
        this.state = 'ok'; this.markDirty(0);
        SC.UI.toast('ĐÃ LIÊN KẾT TÀI KHOẢN');
        return;
      }

      const local = SC.UI.progress;
      const wc = this._weight(cloud), wl = this._weight(local);

      if (this._empty(local)) {           // máy mới -> lấy về luôn, chẳng có gì để mất
        this.adopt(cloud);
      } else if (wc > wl) {               // đám mây nhiều hơn -> HỎI, không bao giờ tự đè
        const pick = await SC.AuthPanel.askMerge(local, cloud);
        pick === 'cloud' ? this.adopt(cloud) : this.markDirty(0);
      } else {
        this.markDirty(0);                // máy này bằng hoặc nhiều hơn -> đẩy lên
      }
      this.state = 'ok'; SC.AuthPanel.sync();
    } catch (e) {
      this.state = 'err'; SC.AuthPanel.sync();
      SC.UI.toast(SC.FB.err(e));
    }
  },

  /* nhận tiến độ từ đám mây về máy */
  adopt(cloud) {
    SC.UI.progress = Object.assign(
      { stars: {}, unlocked: 1, coin: 0, upg: {}, missions: {}, times: {} }, cloud);
    SC.UI.save();
    SC.UI.buildMapList();
    SC.UI.syncMenu();
    SC.UI.toast('ĐÃ TẢI TIẾN ĐỘ VỀ');
  },

  /* ---------- đẩy lên ---------- */

  /* gọi sau khi hết màn / mua nâng cấp; gộp nhiều lần gọi liền nhau làm một */
  markDirty(delay) {
    if (!SC.Auth.user || !SC.FB.configured()) return;
    this._dirty = true;
    clearTimeout(this._timer);
    this._timer = setTimeout(() => this.push(), delay === undefined ? 3000 : delay);
  },

  async push() {
    if (!this._dirty || !SC.Auth.user) return;
    const u = SC.Auth.user, s = this.stats();
    try {
      const fb = await SC.FB.load();
      const { doc, setDoc, serverTimestamp, deleteField } = fb.fsM;
      this._dirty = false;

      await Promise.all([
        setDoc(doc(fb.db, 'users', u.uid), {
          name: u.name, avatar: u.avatar,
          progress: SC.UI.progress, updatedAt: serverTimestamp()
        }, { merge: true }),
        setDoc(doc(fb.db, 'scores', u.uid), {
          name: u.name, avatar: u.avatar,
          highestLevel: s.highestLevel, totalStars: s.totalStars,
          // chưa đi hết 100 màn thì XOÁ hẳn trường này -> không lọt vào bảng tốc độ
          bestTime: s.campaignTime === null ? deleteField() : s.campaignTime,
          updatedAt: serverTimestamp()
        }, { merge: true })
      ]);
      this.state = 'ok';
      this._rank = {};                    // điểm mình đổi rồi -> bỏ đệm bảng xếp hạng
    } catch (e) {
      this._dirty = true;                 // giữ cờ, có mạng lại thì đẩy tiếp
      this.state = 'wait';
      window.addEventListener('online', () => this.markDirty(400), { once: true });
    }
    SC.AuthPanel.sync();
  },

  /* ---------- bảng xếp hạng ---------- */
  ORDER: {
    level: ['highestLevel', 'desc'],
    time: ['bestTime', 'asc'],
    stars: ['totalStars', 'desc']
  },

  /* Đệm 60 giây cho mỗi tab: người chơi bấm qua lại không tốn thêm lượt đọc */
  async rank(tab) {
    const c = this._rank[tab];
    if (c && performance.now() - c.t < 60000) return c.rows;

    const fb = await SC.FB.load();
    const { collection, query, orderBy, limit, getDocs } = fb.fsM;
    const [field, dir] = this.ORDER[tab];
    const snap = await getDocs(
      query(collection(fb.db, 'scores'), orderBy(field, dir), limit(100)));

    const rows = snap.docs.map((d, i) => Object.assign({ uid: d.id, pos: i + 1 }, d.data()));
    this._rank[tab] = { t: performance.now(), rows };
    return rows;
  }
};

;
/* ===== js/ui-auth-panel.js ===== */
/* ui-auth-panel.js — khối đăng nhập ở menu và hộp thoại chọn tiến độ khi lệch nhau */

SC.AuthPanel = {
  _resolve: null,

  init(on) {
    // Chưa khai báo Firebase thì vẫn hiện nút, chỉ đổi nhãn và nói rõ còn thiếu gì.
    // Giấu đi thì người dựng game không biết tính năng có tồn tại hay không.
    if (!SC.FB.configured()) {
      // Bấm vào thì mở bảng hướng dẫn từng bước, đừng chỉ nháy một dòng thông báo
      // rồi thôi — người bấm cần biết còn thiếu đúng những gì.
      on('btnLogin', () => SC.UI.showOverlay('setup'));
      on('btnSetupClose', () => SC.UI.hideOverlay('setup'));
      this.sync();
      return;
    }

    on('btnLogin', () => SC.Auth.login());
    on('btnLogout', () => SC.Auth.logout());

    SC.Auth.onChange(() => this.sync());
    SC.Auth.init();
  },

  /* vẽ lại khối đăng nhập theo trạng thái hiện tại */
  sync() {
    const id = s => document.getElementById(s);
    const login = id('btnLogin'), user = id('authUser');
    if (!login || !user) return;

    // thẻ hồ sơ đang chơi (danh tính cục bộ, luôn có kể cả chưa đăng nhập)
    // Kèm danh hiệu theo lực chiến (SC.Power.rank) — nâng cấp xong quay ra lobby là
    // thấy mình vừa lên hạng, thay vì chỉ thấy một con số nhích lên.
    const cur = SC.Profiles.cur();
    const chip = id('btnProfile');
    if (chip && cur) chip.innerHTML =
      `<span>${cur.avatar}</span>` +
      `<span class="prof-txt"><b>${SC.Rank.esc(cur.name)}</b>` +
      `<i class="prof-rank">${SC.Power.rank()}</i></span><em>ĐỔI</em>`;

    const u = SC.Auth.user, busy = SC.Auth.busy;
    login.classList.toggle('hidden', !!u);
    user.classList.toggle('hidden', !u);
    login.disabled = busy;
    login.textContent = busy ? 'ĐANG XỬ LÝ…' : 'ĐĂNG NHẬP GOOGLE';

    if (u) {
      id('authName').textContent = u.name;
      const av = id('authAvatar');
      av.src = u.avatar || '';
      av.classList.toggle('hidden', !u.avatar);

      // chấm nhỏ cho biết tiến độ đã lên mây chưa
      const dot = id('syncDot');
      const S = { pull: ['đang tải…', 'sync'], ok: ['đã lưu đám mây', 'ok'],
                  wait: ['chờ mạng', 'wait'], err: ['lỗi đồng bộ', 'err'] };
      const [tip, cls] = S[SC.Cloud.state] || ['', ''];
      dot.className = 'sync-dot ' + cls;
      dot.title = tip;
    }
  },

  /* ---------- hộp thoại: giữ bản nào ---------- *
     Chỉ hiện khi tiến độ trên mây NHIỀU HƠN trong máy. Không bao giờ tự quyết. */
  askMerge(local, cloud) {
    const id = s => document.getElementById(s);
    const sum = p => Object.values(p.stars || {}).reduce((a, b) => a + b, 0);
    const line = p => `Màn ${Math.min(SC.TOTAL_LEVELS, p.unlocked || 1)} · ★${sum(p)} · ◈${p.coin || 0}`;

    // đang có hộp thoại chờ (đăng nhập lại liên tục) -> chốt bản cũ, đừng bỏ lửng lời hứa
    if (this._resolve) this.pick('local');

    id('mergeLocal').textContent = line(local);
    id('mergeCloud').textContent = line(cloud);
    SC.UI.showOverlay('merge');

    return new Promise(res => { this._resolve = res; });
  },

  pick(which) {
    SC.UI.hideOverlay('merge');
    const r = this._resolve;
    this._resolve = null;
    if (r) r(which);
  }
};

;
/* ===== js/ui-rank.js ===== */
/* ui-rank.js — bảng xếp hạng 3 tab: màn cao nhất, tốc độ, tổng sao
 *
 * Xem được cả khi chưa đăng nhập (luật Firestore cho đọc công khai) — thấy người
 * khác đứng đâu chính là lý do để người chơi muốn đăng nhập ghi tên mình lên.
 */

SC.Rank = {
  tab: 'level',
  TABS: [
    { k: 'level', label: 'MÀN CAO NHẤT', val: r => 'Màn ' + (r.highestLevel || 1) },
    { k: 'time',  label: 'TỐC ĐỘ',       val: r => SC.Rank.time(r.bestTime) },
    { k: 'stars', label: 'TỔNG SAO',     val: r => '★ ' + (r.totalStars || 0) }
  ],

  EMPTY: {
    level: 'Chưa có ai trên bảng',
    time: 'Chưa ai đi hết 100 màn',
    stars: 'Chưa có ai trên bảng'
  },

  time(s) {
    if (!s && s !== 0) return '—';
    const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, ss = Math.floor(s % 60);
    const pad = n => String(n).padStart(2, '0');
    return h ? `${h}:${pad(m)}:${pad(ss)}` : `${m}:${pad(ss)}`;
  },

  init(on) {
    on('btnRank', () => { SC.UI.show('rank'); this.open('level'); });
    on('btnRankBack', () => { SC.UI.show('menu'); SC.UI.syncMenu(); });

    document.getElementById('rankTabs').addEventListener('click', e => {
      const b = e.target.closest('button[data-tab]');
      if (b) { SC.Audio.click(); this.open(b.dataset.tab); }
    });
  },

  open(tab) {
    this.tab = tab;
    for (const b of document.querySelectorAll('#rankTabs button'))
      b.classList.toggle('on', b.dataset.tab === tab);
    this.load();
  },

  /* Bảng của riêng máy này: 3 hồ sơ đua nhau. Luôn có sẵn, không cần mạng.
     Đây cũng là thứ hiện ra khi chưa khai báo Firebase — thà có bảng thật của
     3 hồ sơ còn hơn một màn hình trống báo "chưa cấu hình". */
  localRows() {
    const [field, dir] = SC.Cloud.ORDER[this.tab];   // bảng sắp xếp nằm ở SC.Cloud
    return SC.Profiles.summaries()
      .map(p => ({
        uid: 'local:' + p.id, name: p.name, avatar: '', emoji: p.avatar, me: p.isMe,
        highestLevel: p.level, totalStars: p.stars,
        // thời gian chiến dịch chỉ tính khi hồ sơ đó đã đi hết 100 màn
        bestTime: p.cleared >= SC.TOTAL_LEVELS ? this._timeOf(p.id) : undefined
      }))
      .filter(r => r[field] !== undefined)
      .sort((a, b) => dir === 'desc' ? b[field] - a[field] : a[field] - b[field])
      .map((r, i) => Object.assign(r, { pos: i + 1 }));
  },

  _timeOf(id) {
    const pr = SC.Profiles.progressOf(id) || {};
    const t = pr.times || {};
    let s = 0;
    for (let i = 1; i <= SC.TOTAL_LEVELS; i++) s += t[i] || 0;
    return Math.round(s);
  },

  async load() {
    const wrap = document.getElementById('rankList');
    const tab = this.tab;

    // chưa khai báo máy chủ -> bảng nội bộ, khỏi phải chờ mạng
    if (!SC.FB.configured()) { this.render(this.localRows(), true); return; }

    wrap.innerHTML = '<p class="rank-note">Đang tải…</p>';
    try {
      const rows = await SC.Cloud.rank(tab);
      if (tab !== this.tab) return;                 // người chơi đã đổi tab
      this.render(rows);
    } catch (e) {
      // mất mạng / máy chủ lỗi: vẫn còn bảng nội bộ để xem
      if (tab === this.tab) this.render(this.localRows(), true, SC.FB.err(e));
    }
  },

  render(rows, isLocal, err) {
    const wrap = document.getElementById('rankList');
    const t = this.TABS.find(x => x.k === this.tab);
    const me = SC.Auth.user;

    const banner = isLocal
      ? `<p class="rank-note small">${err ? this.esc(err) + ' — ' : ''}Bảng của máy này (3 hồ sơ). Đăng nhập để đua toàn cầu.</p>`
      : '';

    if (!rows.length) {
      wrap.innerHTML = banner + `<p class="rank-note">${this.EMPTY[this.tab]}</p>`;
    } else {
      wrap.innerHTML = banner + rows.map(r => `
        <div class="rank-row${r.me || (me && r.uid === me.uid) ? ' me' : ''}">
          <span class="rank-pos${r.pos <= 3 ? ' top' : ''}">${r.pos}</span>
          ${r.emoji ? `<span class="rank-av emo">${r.emoji}</span>`
            : r.avatar ? `<img class="rank-av" src="${this.esc(r.avatar)}" alt="">`
            : '<span class="rank-av"></span>'}
          <span class="rank-name">${this.esc(r.name || 'Phi công')}</span>
          <b class="rank-val">${t.val(r)}</b>
        </div>`).join('');
    }

    // Dòng của mình: chưa đăng nhập thì mời đăng nhập, ngoài top 100 thì vẫn cho thấy số của mình
    const foot = document.getElementById('rankMe');
    if (isLocal) {
      foot.className = 'rank-me hidden';
    } else if (!me) {
      foot.className = 'rank-me hint-row';
      foot.innerHTML = 'Đăng nhập để ghi tên mình lên bảng';
    } else if (rows.some(r => r.uid === me.uid)) {
      foot.className = 'rank-me hidden';
    } else {
      const s = SC.Cloud.stats();
      const mine = { highestLevel: s.highestLevel, totalStars: s.totalStars, bestTime: s.campaignTime };
      foot.className = 'rank-me';
      foot.innerHTML = `<span class="rank-pos">—</span>
        <span class="rank-name">${this.esc(me.name)} (bạn)</span>
        <b class="rank-val">${t.val(mine)}</b>`;
    }
  },

  /* tên lấy từ tài khoản Google của người khác -> luôn phải thoát ký tự */
  esc(s) {
    return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }
};

;
/* ===== js/ui-map-select.js ===== */
/* ui-map-select.js — bản đồ hành trình (saga): 10 vùng, mỗi vùng 10 chặng
 *
 * Các chặng nằm zigzag theo hình sin và được nối bằng một đường SVG, thay cho
 * lưới ô vuông cũ. Mỗi vùng là một khối riêng, đầu và cuối khối cùng toạ độ x
 * nên nhìn liền mạch như một con đường chạy suốt. */

SC.MapSelect = {
  NODE_GAP: 108,      // khoảng cách dọc giữa hai chặng (đơn vị ảo)
  AMP: 150,           // biên độ zigzag
  TOP: 62,            // chừa lề trên để nút không nhô ra khỏi dải nền của vùng

  build(ui) {
    const wrap = ui.el.mapList;
    wrap.innerHTML = '';
    const per = SC.LEVELS_PER_BIOME;

    // Ai đang đứng ở chặng nào — gom trước theo số màn để lát vẽ vào đúng nút.
    // Xếp nhiều người cùng một chặng thành hàng ngang cho khỏi chồng lên nhau.
    this.pins = {};
    for (const p of SC.Profiles.summaries()) {
      if (p.isMe) continue;                       // mình đã có nút "next" đánh dấu rồi
      (this.pins[p.level] = this.pins[p.level] || []).push(p);
    }

    SC.BIOMES.forEach((b, bi) => {
      const levels = SC.LEVELS.slice(bi * per, (bi + 1) * per);
      wrap.appendChild(this._region(ui, b, bi, levels));
    });

    ui.el.totalStars.textContent = ui.totalStar();
    const mx = document.getElementById('maxStars');
    if (mx) mx.textContent = SC.TOTAL_STARS;

    this.scrollToCurrent(wrap);
  },

  /* Bản đồ 100 chặng dài hơn chục màn hình, nên mở ra là nhảy thẳng tới
     chặng đang chơi dở thay vì bắt cuộn từ đầu. */
  scrollToCurrent(wrap) {
    const node = wrap.querySelector('.saga-node.next')
      || wrap.querySelectorAll('.saga-node.done:not(.lock)')[0]
      || wrap.querySelector('.saga-node');
    if (!node) return;
    wrap.scrollTop = Math.max(0, node.offsetTop + node.parentElement.offsetTop
      - wrap.clientHeight / 2);
  },

  /* toạ độ x của chặng thứ k trong vùng (0..per-1) */
  _x(k) {
    return 270 + Math.sin(k * 0.72) * this.AMP;
  },

  _region(ui, biome, bi, levels) {
    const per = levels.length;
    const box = document.createElement('div');
    box.className = 'saga-region';
    box.style.setProperty('--tint', `hsl(${biome.hue},70%,60%)`);
    // nền lấy đúng bảng màu trời của vùng, cuộn qua là thấy đổi cảnh
    box.style.setProperty('--sky0', biome.sky[0]);
    box.style.setProperty('--sky1', biome.sky[1]);
    box.style.setProperty('--sky2', biome.sky[2]);

    const stars = levels.reduce((s, lv) => s + (ui.progress.stars[lv.id] || 0), 0);
    const open = levels.some(lv => lv.id <= ui.progress.unlocked);

    const head = document.createElement('div');
    head.className = 'saga-head' + (open ? '' : ' lock');
    head.innerHTML = `<b>${biome.name}</b>
      <span>${open ? `★ ${stars}/${per * 3}`
        : '<svg class="ic" aria-hidden="true"><use href="#i-lock"/></svg> CHƯA MỞ'}</span>`;
    box.appendChild(head);

    const path = document.createElement('div');
    path.className = 'saga-path';
    path.style.height = (per * this.NODE_GAP + this.TOP + 34) + 'px';
    path.appendChild(this._trail(per));
    levels.forEach((lv, k) => path.appendChild(this._node(ui, lv, k)));
    box.appendChild(path);
    return box;
  },

  /* đường nối các chặng, vẽ bằng SVG cho mượt */
  _trail(per) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'saga-trail');
    svg.setAttribute('viewBox', `0 0 540 ${per * this.NODE_GAP + this.TOP + 34}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    let d = '';
    for (let k = 0; k < per; k++) {
      const x = this._x(k), y = this.TOP + k * this.NODE_GAP;
      d += (k ? ' L' : 'M') + x.toFixed(1) + ' ' + y;
    }
    svg.innerHTML = `<path d="${d}" fill="none" stroke="currentColor"
      stroke-width="7" stroke-linecap="round" stroke-dasharray="2 16"/>`;
    return svg;
  },

  _node(ui, lv, k) {
    const st = ui.progress.stars[lv.id] || 0;
    const cleared = Object.prototype.hasOwnProperty.call(ui.progress.stars, lv.id);
    const locked = lv.id > ui.progress.unlocked;
    const next = lv.id === ui.progress.unlocked && !cleared;

    const el = document.createElement('button');
    el.className = 'saga-node'
      + (locked ? ' lock' : '')
      + (cleared ? ' done' : '')
      + (next ? ' next' : '')
      + (lv.finalBoss ? ' final' : lv.boss ? ' boss' : '');
    el.style.left = this._x(k) + 'px';
    el.style.top = (this.TOP + k * this.NODE_GAP) + 'px';

    el.innerHTML = `
      <span class="sn-num">${locked
        ? '<svg class="ic" aria-hidden="true"><use href="#i-lock"/></svg>' : lv.stage}</span>
      ${lv.boss ? `<span class="sn-tag">${lv.finalBoss ? 'TRÙM VÙNG' : 'ELITE'}</span>` : ''}
      ${locked ? '' : `<span class="sn-star">${'★'.repeat(st)}${'☆'.repeat(3 - st)}</span>`}`;

    if (!locked) el.onclick = () => { SC.Audio.click(); SC.Brief.open(lv.id); };

    const here = this.pins[lv.id];
    if (here) el.appendChild(this._pins(here));
    return el;
  },

  /* Avatar của những hồ sơ khác đang đứng ở chặng này.
     Chặng bị khoá với mình vẫn hiện được — thấy người khác đi trước tới đâu chính
     là thứ khiến bản đồ có cảm giác đang đua chứ không phải chơi một mình. */
  _pins(people) {
    const box = document.createElement('span');
    box.className = 'sn-pins';
    box.innerHTML = people.map(p =>
      `<i title="${SC.Rank.esc(p.name)} — màn ${p.level}, ★${p.stars}">${p.avatar}</i>`).join('');
    return box;
  }
};

;
/* ===== js/ui-brief.js ===== */
/* ui-brief.js — bảng thông tin map: xem trước 3 nhiệm vụ trước khi xuất kích
 *
 * Nhiệm vụ nào đã đạt ở lần chơi trước sẽ được đánh dấu, nên nhìn là biết
 * còn thiếu sao nào mà cày lại. */

SC.Brief = {
  id: 1,

  init(on) {
    on('btnBriefBack', () => SC.UI.hideOverlay('brief'));
    on('btnBriefGo', () => {
      SC.UI.hideOverlay('brief');
      SC.Game.startLevel(this.id);
    });
  },

  open(id) {
    this.id = id;
    const lv = SC.LEVELS[id - 1];
    const missions = SC.Missions.forLevel(id);
    const done = SC.UI.missionFlags(id);
    const earned = done.reduce((a, b) => a + b, 0);

    document.getElementById('briefBiome').textContent = SC.BIOMES[lv.biome].name
      + (lv.finalBoss ? ' · TRÙM VÙNG' : lv.boss ? ' · ELITE' : '');
    document.getElementById('briefTitle').textContent = 'MAP ' + String(id).padStart(2, '0');
    // map có trùm thì khoe luôn tên đối thủ
    document.getElementById('briefFoe').textContent = lv.boss ? '☠ ' + lv.bossName : '';
    document.getElementById('briefStarTxt').textContent = earned + '/3';

    [...document.getElementById('briefStars').children]
      .forEach((s, i) => s.classList.toggle('on', i < earned));

    document.getElementById('briefMissions').innerHTML = missions.map((m, i) => `
      <li class="${done[i] ? 'ok' : 'no'}">
        <span class="m-ic">${m.def.ic}</span>${m.def.label(m.n)}
        <b>${done[i] ? '✓' : '—'}</b>
      </li>`).join('');

    document.getElementById('btnBriefGo').textContent = earned ? 'CHƠI LẠI' : 'XUẤT KÍCH';
    SC.UI.showOverlay('brief');
  }
};

;
/* ===== js/ui-shop.js ===== */
/* ui-shop.js — màn hình cửa hàng nâng cấp: dựng danh sách, mua, đồng bộ hiển thị */

SC.Shop = {
  init(on) {
    on('btnShop', () => { SC.UI.show('shop'); this.build(); });
    on('btnShop2', () => { SC.UI.show('shop'); this.build(); });
    on('btnResShop', () => { SC.Game.quitToMenu(); SC.UI.show('shop'); this.build(); });
    on('btnShopBack', () => { SC.UI.show('menu'); SC.UI.syncMenu(); });
  },

  /* dựng lại toàn bộ danh sách nâng cấp */
  build() {
    const wrap = document.getElementById('shopList');
    wrap.innerHTML = '';

    for (const u of SC.UPGRADES) {
      const lv = SC.Upg.lv(u.key);
      const cost = SC.Upg.cost(u.key);
      const maxed = SC.Upg.maxed(u.key);
      const afford = SC.Upg.canBuy(u.key);

      const row = document.createElement('div');
      row.className = 'shop-row' + (maxed ? ' maxed' : '');
      row.innerHTML = `
        <div class="shop-ic">${u.ic}</div>
        <div class="shop-mid">
          <div class="shop-name">${u.name}</div>
          <div class="shop-pips">${
            Array.from({ length: u.max }, (_, i) => `<i class="${i < lv ? 'on' : ''}"></i>`).join('')
          }</div>
          <div class="shop-desc">${u.desc(lv)}</div>
        </div>
        <button class="shop-buy${maxed ? ' done' : afford ? '' : ' poor'}">${
          maxed ? 'TỐI ĐA' : '◈ ' + cost
        }</button>`;

      if (!maxed) {
        row.querySelector('.shop-buy').onclick = () => this.buy(u.key);
      }
      wrap.appendChild(row);
    }

    document.getElementById('shopCoin').textContent = SC.UI.progress.coin;

    // Lực chiến: cho người chơi thấy mình mạnh cỡ nào, và hiểu vì sao quái
    // cũng rắn lên theo (xem system-power.js)
    const pw = document.getElementById('shopPower');
    if (pw) {
      pw.querySelector('b').textContent = SC.Power.total();
      pw.title = 'Lực chiến — ' + SC.Power.rank();
    }
  },

  buy(key) {
    if (SC.Upg.buy(key)) {
      SC.Audio.power();
      SC.Cloud.markDirty();                    // vàng đã tiêu -> sao lưu ngay
      SC.UI.toast('NÂNG CẤP ' + SC.Upg.def(key).name);
    } else {
      SC.Audio.lose();                         // không đủ vàng
      SC.UI.toast('KHÔNG ĐỦ VÀNG');
    }
    this.build();
    SC.UI.syncMenu();
  }
};

;
/* ===== js/ui-lobby-ship.js ===== */
/* ui-lobby-ship.js — máy bay của người chơi đứng chờ ở lobby
 *
 * Vì sao có: mở game lên mà không thấy chiếc máy bay mình đang cày để nâng cấp thì
 * lobby chỉ là một cái menu. Ở đây nó hiện ngay giữa màn, mang đúng cấp vũ khí sẽ
 * vào trận và đúng số máy bay phụ đã mua — nên mua PHI ĐỘI xong quay ra là thấy liền.
 *
 * Không dựng SC.Player: chỉ mượn SC.draw.fighter() để vẽ, nên không có va chạm,
 * không bắn, không đụng gì tới trạng thái ván chơi.
 */

SC.LobbyShip = {
  y: 0,               // tâm sân bay, đơn vị khung ảo — layout() tính lại
  ready: false,

  /* Đọc vị trí ô .lobby-stage. #ui có kích thước đúng bằng khung ảo (system-viewport.js)
     nên offsetTop/offsetHeight của phần tử con CHÍNH LÀ toạ độ ảo, khỏi quy đổi. */
  layout() {
    const el = document.getElementById('shipStage');
    if (!el || !el.offsetHeight) { this.ready = false; return; }
    this.y = el.offsetTop + el.offsetHeight / 2;
    this.ready = true;
  },

  /* Cấp vũ khí sẽ mang vào chặng kế = vũ khí khởi đầu của map + nâng cấp đã mua */
  _weapon() {
    const next = Math.min(SC.TOTAL_LEVELS, SC.UI.progress.unlocked);
    const lv = SC.LEVELS[next - 1];
    return Math.min(SC.CFG.maxWeapon, (lv ? lv.startWeapon : 1) + SC.Upg.weaponBonus());
  },

  render(ctx) {
    if (!this.ready) this.layout();
    if (!this.ready) return;

    // Người dùng bật "giảm chuyển động" thì đứng yên, vẫn thấy đủ máy bay
    const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = still ? 0 : performance.now() / 1000;

    const cx = SC.W / 2;
    const cy = this.y + (still ? 0 : Math.sin(t * 1.6) * 5);
    const r = SC.CFG.playerRadius * 1.35;      // to hơn lúc chơi cho ra dáng ảnh chân dung
    const tilt = still ? 0 : Math.sin(t * 0.9) * 0.22;

    // phi đội bay kèm, vẽ trước để nằm dưới máy bay chính
    const wing = SC.Upg.wingCount();
    for (let i = 0; i < wing; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const ring = Math.floor(i / 2);
      const wx = cx + side * (54 + ring * 34);
      const wy = cy + 30 + ring * 16 + (still ? 0 : Math.sin(t * 2.2 + i) * 4);
      this._one(ctx, wx, wy, r * 0.62, tilt * 0.6, 1);
    }

    this._one(ctx, cx, cy, r, tilt, this._weapon());
  },

  /* một chiếc: lửa động cơ + thân, dùng chung bộ vẽ với lúc chơi */
  _one(ctx, x, y, r, tilt, weapon) {
    ctx.save();
    ctx.translate(x, y);
    const f = 1 + Math.sin(performance.now() / 1000 * 30) * 0.22;
    SC.draw.glow(ctx, 0, r * 1.5, 18 * f, '#5ad0ff', 0.55);
    ctx.fillStyle = 'rgba(140,230,255,.9)';
    ctx.beginPath();
    ctx.moveTo(-5, r * 1.1); ctx.lineTo(0, r * (1.5 + f * 0.5)); ctx.lineTo(5, r * 1.1);
    ctx.closePath(); ctx.fill();
    SC.draw.fighter(ctx, r, tilt, weapon);
    ctx.restore();
  }
};

;
/* ===== js/ui-screens.js ===== */
/* ui-screens.js — quản lý màn hình DOM: menu, chọn map, HUD, tạm dừng, kết quả + lưu tiến độ */

SC.UI = {
  el: {},
  SAVE_KEY: 'skychicken.progress.v1',
  // missions[id] = [0/1, 0/1, 0/1] — nhiệm vụ nào đã từng đạt thì giữ luôn
  // times[id] = giây của lần qua màn nhanh nhất -> dùng cho bảng xếp hạng tốc độ
  progress: { stars: {}, unlocked: 1, coin: 0, upg: {}, missions: {}, times: {} },

  init() {
    const id = s => document.getElementById(s);
    this.el = {
      hud: id('hud'), menu: id('scrMenu'), maps: id('scrMaps'),
      pause: id('scrPause'), result: id('scrResult'), shop: id('scrShop'), brief: id('scrBrief'),
      rank: id('scrRank'), merge: id('scrMerge'), profile: id('scrProfile'), setup: id('scrSetup'),
      options: id('scrOptions'),
      hpFill: id('hpFill'), shFill: id('shFill'),
      score: id('hudScore'), coin: id('hudCoin'), level: id('hudLevel'),
      waveFill: id('waveFill'), waveTxt: id('waveTxt'),
      bossBar: id('bossBar'), bossFill: id('bossFill'), bossName: id('bossName'),
      wpnPips: id('wpnPips'), comboBox: id('comboBox'), comboVal: id('comboVal'), timer: id('hudTimer'),
      toastZone: id('toastZone'), mapList: id('mapList'), totalStars: id('totalStars'),
      resTitle: id('resTitle'), resStars: id('resStars'), resScore: id('resScore'),
      resKill: id('resKill'), resCoin: id('resCoin'), resAcc: id('resAcc'),
      btnResNext: id('btnResNext')
    };

    for (let i = 0; i < SC.CFG.maxWeapon; i++) this.el.wpnPips.appendChild(document.createElement('i'));

    // hướng dẫn điều khiển theo thiết bị đang dùng
    if (SC.View.touch)
      id('menuHint').innerHTML = 'Chạm & <b>kéo</b> bất kỳ đâu để lái · Tự bắn · Tự nhặt đồ';

    SC.Settings.load();
    SC.Profiles.load();      // phải trước load(): nó quyết định đọc kho tiến độ nào
    this.load();
    this.buildMapList();
    this.bind();
  },

  bind() {
    const on = (id, fn) => document.getElementById(id).addEventListener('click', () => {
      SC.Audio.click();
      fn();
    });
    on('btnPlay', () => SC.Game.startLevel(this.progress.unlocked));
    on('btnMaps', () => { this.show('maps'); this.buildMapList(); });
    on('btnMapsBack', () => this.show('menu'));
    on('btnPause', () => SC.Game.pause(true));
    on('btnResume', () => SC.Game.pause(false));
    on('btnRestart', () => SC.Game.startLevel(SC.Game.levelId));
    on('btnQuit', () => SC.Game.quitToMenu());
    on('btnResRetry', () => SC.Game.startLevel(SC.Game.levelId));
    on('btnResNext', () => SC.Game.startLevel(Math.min(SC.TOTAL_LEVELS, SC.Game.levelId + 1)));
    on('btnResMenu', () => { SC.Game.quitToMenu(); this.show('maps'); this.buildMapList(); });
    on('btnInstall', () => SC.PWA.install());
    on('btnUpdate', () => SC.PWA.applyUpdate());
    on('btnMergeCloud', () => SC.AuthPanel.pick('cloud'));
    on('btnMergeLocal', () => SC.AuthPanel.pick('local'));

    SC.AudioUI.bind(on);
    SC.Settings.bind(on);
    SC.Shop.init(on);
    SC.Brief.init(on);
    SC.Rank.init(on);
    SC.ProfileUI.init(on);
    SC.AuthPanel.init(on);
    SC.PortalNav.init(on);
    this.syncMenu();
  },

  /* ---------- nhiệm vụ đã đạt của một map ---------- */
  missionFlags(id) {
    return (this.progress.missions && this.progress.missions[id]) || [0, 0, 0];
  },

  /* gộp kết quả lần chơi này vào những gì đã đạt trước đó */
  saveMissions(id, results) {
    if (!this.progress.missions) this.progress.missions = {};
    const prev = this.missionFlags(id);
    this.progress.missions[id] = results.map((r, i) => (r.done || prev[i]) ? 1 : 0);
    return this.progress.missions[id].reduce((a, b) => a + b, 0);
  },

  /* thẻ tóm tắt tiến độ ở menu — chi tiết trong ui-menu-card.js */
  syncMenu() { SC.MenuCard.sync(this); },

  /* ---------- điều hướng màn hình ---------- */
  show(which) {
    for (const k of ['menu', 'maps', 'pause', 'result', 'shop', 'brief', 'rank', 'profile', 'options'])
      this.el[k].classList.add('hidden');
    this.el.hud.classList.toggle('hidden', which !== 'game');
    if (this.el[which]) this.el[which].classList.remove('hidden');

    // Băng PWA chỉ mời cài/cập nhật lúc đang ở lobby, không chen ngang màn chơi
    const pwa = document.getElementById('pwaBanner');
    if (pwa) pwa.classList.toggle('hidden', which !== 'menu' || !SC.PWA.anyOffer());

    // máy bay ở lobby cần biết ô sân nằm đâu, đo sau khi màn đã hiện
    if (which === 'menu' && SC.LobbyShip) SC.LobbyShip.layout();
  },
  showOverlay(which) { this.el[which].classList.remove('hidden'); },
  hideOverlay(which) { this.el[which].classList.add('hidden'); },

  /* ---------- lưu / đọc tiến độ ---------- */
  /* Mỗi hồ sơ có kho riêng — xem system-profiles.js */
  key() { return SC.Profiles.saveKey(); },
  load() {
    try {
      const raw = localStorage.getItem(this.key());
      if (raw) this.progress = Object.assign(this.progress, JSON.parse(raw));
    } catch (e) { /* bỏ qua nếu localStorage bị chặn */ }
  },
  save() {
    try { localStorage.setItem(this.key(), JSON.stringify(this.progress)); } catch (e) {}
  },
  totalStar() {
    return Object.values(this.progress.stars).reduce((a, b) => a + b, 0);
  },

  /* ---------- bản đồ hành trình ---------- */
  buildMapList() { SC.MapSelect.build(this); },

  /* ---------- cập nhật HUD ---------- */
  setHP(v, max, sh, shMax) {
    this.el.hpFill.style.width = (v / max * 100) + '%';
    this.el.shFill.style.width = (sh / shMax * 100) + '%';
  },
  setStats(score, coin) {
    this.el.score.textContent = score;
    this.el.coin.textContent = coin;
  },
  setLevel(id) { this.el.level.textContent = String(id).padStart(2, '0'); },
  setWave(i, total) {
    this.el.waveFill.style.width = (i / total * 100) + '%';
    this.el.waveTxt.textContent = `WAVE ${i}/${total}`;
  },
  setWeapon(w) {
    [...this.el.wpnPips.children].forEach((p, i) => p.classList.toggle('on', i < w));
  },
  setCombo(c) {
    this.el.comboBox.classList.toggle('hidden', c < 2);
    this.el.comboVal.textContent = c;
  },
  showBoss(name) {
    this.el.bossBar.classList.remove('hidden');
    this.el.bossName.textContent = name;
    this.el.bossFill.style.width = '100%';
  },
  setBossHP(p) { this.el.bossFill.style.width = (p * 100) + '%'; },
  hideBoss() { this.el.bossBar.classList.add('hidden'); },

  /* ---------- nhiệm vụ phụ ---------- */

  /* bảng nhiệm vụ hiện lúc vào màn rồi tự tắt */
  showMissions(missions, rescueNeed) {
    const panel = document.getElementById('missionPanel');
    const list = document.getElementById('missionList');
    list.innerHTML = missions
      .map(m => `<li><span class="m-ic">${m.def.ic}</span>${m.def.label(m.n)}</li>`).join('');

    panel.classList.remove('hidden');
    clearTimeout(this._missionT);
    this._missionT = setTimeout(() => panel.classList.add('hidden'), 3400);

    this.setRescue(0, rescueNeed);
  },

  /* Đồng hồ góc dưới phải. Map có nhiệm vụ tính giờ thì hiện luôn mốc cần đạt
     và chuyển đỏ khi đã quá giờ. */
  setTimer(sec, target) {
    const el = this.el.timer;
    const s = Math.floor(sec);
    el.querySelector('b').textContent = target ? `${s}s / ${target}s` : `${s}s`;
    el.classList.toggle('over', !!target && sec > target);
    el.classList.toggle('near', !!target && sec > target * 0.8 && sec <= target);
  },

  /* ô đếm phi công trên HUD, chỉ hiện ở map có nhiệm vụ cứu */
  setRescue(done, need) {
    const el = document.getElementById('hudRescue');
    el.classList.toggle('hidden', !need);
    // thả dư 1 dù nên cứu vượt yêu cầu là bình thường, chỉ hiển thị tối đa bằng chỉ tiêu
    if (need) el.querySelector('b').textContent = Math.min(done, need) + '/' + need;
  },

  toast(msg, big) {
    const d = document.createElement('div');
    d.className = 'toast' + (big ? ' big' : '');
    d.textContent = msg;
    this.el.toastZone.appendChild(d);
    setTimeout(() => d.remove(), 1150);
  },

  /* bảng kết quả — chi tiết trong ui-result.js */
  showResult(win, r) { SC.Result.show(this, win, r); }
};

;
/* ===== js/system-pwa.js ===== */
/* system-pwa.js — đăng ký service worker + nút "cài về máy"
 *
 * Service Worker chỉ chạy trên http/https, mở bằng file:// sẽ bỏ qua êm. */

SC.PWA = {
  deferred: null,     // sự kiện beforeinstallprompt để hiện nút cài sau

  register() {
    // ?nosw = tắt service worker khi đang sửa code cho khỏi dính bản cache cũ
    const dev = location.search.indexOf('nosw') >= 0;
    if (dev && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()));
      caches.keys().then(ks => ks.forEach(k => caches.delete(k)));
      return;
    }
    const ok = 'serviceWorker' in navigator &&
      (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1');
    if (ok) {
      navigator.serviceWorker.register('sw.js')
        .then(reg => this._watchUpdate(reg))
        .catch(() => {});

      // bản mới đã tiếp quản -> tải lại một lần duy nhất
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this._reloading) return;
        this._reloading = true;
        location.reload();
      });
    }

    // Chrome/Edge: chặn hộp thoại mặc định, tự hiện nút trong menu
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this.deferred = e;
      this.showButton(true);
    });

    window.addEventListener('appinstalled', () => {
      this.deferred = null;
      this.showButton(false);
    });
  },

  /* Rình bản mới. Không tự đổi bản giữa lúc đang chơi — chỉ mời, người chơi
     bấm mới tải lại. Nút hiện ở menu chứ không chen ngang màn chơi. */
  _watchUpdate(reg) {
    const offer = worker => {
      this.waiting = worker;
      const b = document.getElementById('btnUpdate');
      if (b) b.classList.remove('hidden');
      this.syncBanner();
      if (SC.Game.state === 'menu') SC.UI.toast('CÓ BẢN CẬP NHẬT MỚI');
    };

    if (reg.waiting && navigator.serviceWorker.controller) offer(reg.waiting);

    reg.addEventListener('updatefound', () => {
      const nw = reg.installing;
      if (!nw) return;
      nw.addEventListener('statechange', () => {
        // có controller cũ nghĩa là đây là bản cập nhật, không phải cài lần đầu
        if (nw.state === 'installed' && navigator.serviceWorker.controller) offer(nw);
      });
    });
  },

  /* Người chơi đồng ý cập nhật */
  applyUpdate() {
    if (!this.waiting) { location.reload(); return; }
    this.waiting.postMessage({ type: 'SKIP_WAITING' });
  },

  showButton(show) {
    const b = document.getElementById('btnInstall');
    if (b) b.classList.toggle('hidden', !show);
    this.syncBanner();
  },

  /* Có lời mời nào đang treo không (cài về máy / có bản mới)? */
  anyOffer() {
    const vis = id => {
      const b = document.getElementById(id);
      return !!b && !b.classList.contains('hidden');
    };
    return vis('btnInstall') || vis('btnUpdate');
  },

  /* Băng thông báo trượt lên từ đáy: chỉ hiện ở lobby và chỉ khi có việc để mời.
     Trước đây hai nút này nằm cố định giữa menu, xuất hiện bất chợt là đẩy layout. */
  syncBanner() {
    const bar = document.getElementById('pwaBanner');
    if (!bar) return;
    const atMenu = !SC.Game || SC.Game.state === 'menu';
    bar.classList.toggle('hidden', !atMenu || !this.anyOffer());
  },

  /* Bấm nút cài: bật lại hộp thoại đã chặn ở trên */
  install() {
    if (!this.deferred) return;
    this.deferred.prompt();
    this.deferred.userChoice.finally(() => {
      this.deferred = null;
      this.showButton(false);
    });
  },

  /* Đang chạy dạng ứng dụng đã cài (không có thanh địa chỉ)? */
  installed() {
    return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  }
};

;
/* ===== js/ui-portal-nav.js ===== */
/* ui-portal-nav.js — nút quay về portal minigame
 *
 * "Smart" ở chỗ chỉ hiện khi thật sự có portal để quay về:
 *   - Đang chạy ở thư mục con (vd /Game/SkyChicken/) -> portal là thư mục cha
 *   - Chạy ở gốc (localhost lúc dev) -> không có portal, ẩn nút
 *   - Đã cài về máy dạng ứng dụng riêng -> người chơi mở thẳng game, không
 *     đi qua portal, nên cũng ẩn cho đỡ rối
 */

SC.PortalNav = {
  url: null,

  init(on) {
    this.url = this._detect();
    const btn = document.getElementById('btnPortal');
    if (!btn) return;

    if (!this.url) { btn.classList.add('hidden'); return; }
    btn.classList.remove('hidden');
    on('btnPortal', () => this.go());
  },

  /* Trả về địa chỉ portal, hoặc null nếu không có */
  _detect() {
    if (SC.PWA.installed()) return null;              // đã cài riêng thì không có portal

    // Bỏ phần tên file nếu có (vd .../SkyChicken/index.html)
    let dir = location.pathname.replace(/[^/]*$/, '');
    const parts = dir.split('/').filter(Boolean);      // vd ['Game','SkyChicken']
    if (parts.length < 1) return null;                 // đang ở gốc, không có cha

    parts.pop();                                       // bỏ thư mục của game
    return '/' + (parts.length ? parts.join('/') + '/' : '');
  },

  go() {
    if (!this.url) return;
    // Nếu người chơi vào game từ portal thì lùi lại giữ được vị trí cuộn của portal
    if (document.referrer && document.referrer.indexOf(location.origin + this.url) === 0) {
      history.back();
    } else {
      location.href = this.url;
    }
  }
};

;
/* ===== js/main.js ===== */
/* main.js — vòng lặp game, nhập chuột, va chạm, dòng chảy màn chơi */

SC.Game = {
  canvas: null, ctx: null,
  state: 'menu',          // menu | play | pause | result
  levelId: 1, lv: null,
  player: null, enemies: [], boss: null,
  score: 0, coin: 0, kills: 0, spawned: 0,
  combo: 1, comboT: 0,
  last: 0, endT: 0,
  stats: { escaped: 0, maxCombo: 1, rescued: 0, time: 0 },   // số liệu chấm nhiệm vụ

  init() {
    SC.View.init();
    this.canvas = SC.View.canvas;
    this.ctx = SC.View.ctx;
    this.player = new SC.Player();
    SC.BG.setBiome(0);

    // đổi kích thước / xoay máy: dựng lại nền, kéo máy bay về trong khung
    SC.View.onResize = () => {
      SC.BG.rebuild();
      this.player.setTarget(this.player.tx, this.player.ty);
      // khung ảo đổi chiều cao -> ô sân bay ở lobby nằm chỗ khác, phải đo lại
      SC.LobbyShip.layout();
      // xoay ngang máy -> tạm dừng, tránh chết oan khi màn hình bị che
      if (SC.View.rotated && this.state === 'play') this.pause(true);
    };

    SC.Audio.init();
    SC.UI.init();
    SC.Input.init(this.canvas, this);
    SC.PWA.register();
    SC.UI.show('menu');
    this.last = performance.now();
    requestAnimationFrame(t => this.loop(t));
  },

  /* ---------- vào màn ---------- */
  startLevel(id) {
    this.levelId = id;
    this.lv = SC.LEVELS[id - 1];
    this.enemies.length = 0; this.boss = null;
    SC.Bullets.clear(); SC.Items.clear(); SC.FX.clear();
    SC.ScreenFX.clear(); SC.BossSkills.clear();
    this.score = 0; this.coin = 0; this.kills = 0; this.spawned = 0;
    this.combo = 1; this.comboT = 0; this.endT = 0;
    this.stats = { escaped: 0, maxCombo: 1, rescued: 0, time: 0 };

    this.player.reset(this.lv.startWeapon);
    SC.Wingmen.spawn(this.player);
    SC.BG.setBiome(this.lv.biome);
    SC.Waves.start(this.lv);
    SC.Music.start(this.lv.biome);

    // 3 nhiệm vụ cố định của map; chỉ thả dù khi có nhiệm vụ cứu phi công
    const missions = SC.Missions.start(id);
    SC.Rescue.start(SC.Missions.rescueTarget());
    SC.UI.showMissions(missions, SC.Missions.rescueTarget());

    SC.UI.show('game');
    SC.UI.hideOverlay('pause'); SC.UI.hideOverlay('result');
    SC.UI.hideBoss();
    SC.UI.setLevel(id); SC.UI.setWave(0, this.lv.waves + (this.lv.boss ? 1 : 0));
    SC.UI.setWeapon(this.player.weapon); SC.UI.setCombo(1);
    SC.UI.toast(this.lv.name, true);
    // lần đầu chơi bằng cảm ứng: nhắc cách lái
    if (SC.View.touch && !this.taughtTouch) {
      this.taughtTouch = true;
      setTimeout(() => SC.UI.toast('CHẠM & KÉO ĐỂ LÁI'), 1200);
    }
    this.state = 'play';
  },

  pause(on) {
    if (on) { this.state = 'pause'; SC.UI.showOverlay('pause'); SC.Music.stop(); }
    else { this.state = 'play'; SC.UI.hideOverlay('pause'); SC.Music.start(this.lv.biome); }
  },

  quitToMenu() {
    this.state = 'menu';
    SC.Music.stop();
    SC.Rescue.clear();
    SC.Wingmen.clear();
    document.getElementById('missionPanel').classList.add('hidden');
    SC.UI.show('menu');
    SC.UI.syncMenu();
  },

  /* ---------- vòng lặp chính ---------- */
  loop(now) {
    const dt = Math.min(0.033, (now - this.last) / 1000);
    this.last = now;
    SC.View.poll();
    if (this.state === 'play') this.update(dt);
    else SC.BG.update(dt);        // nền vẫn chạy ở menu / pause cho sinh động
    this.render(dt);
    requestAnimationFrame(t => this.loop(t));
  },

  update(dt) {
    const p = this.player;
    this.stats.time += dt;
    SC.BG.update(dt);
    // quyết hướng súng TRƯỚC khi bắn, nếu không loạt đạn của khung này còn dùng hướng cũ
    SC.Facing.update(dt, p, this.enemies, this.boss);
    p.update(dt);
    SC.Wingmen.update(dt, p);
    SC.Waves.update(dt, this.enemies);

    for (const e of this.enemies) e.update(dt, p, this.lv);
    SC.Bullets.update(dt, this.enemies, p);
    SC.Items.update(dt, p, (k, x, y) => SC.Combat.pickup(this, k, x, y));
    SC.Rescue.update(dt, p, (x, y) => SC.Combat.rescue(this, x, y));
    SC.FX.update(dt);
    SC.ScreenFX.update(dt);
    SC.BossSkills.updateSplats(dt);   // vệt mực tan dần kể cả khi trùm đã chết
    SC.Combat.collide(this);

    // hết combo theo thời gian
    if (this.comboT > 0) { this.comboT -= dt; if (this.comboT <= 0 && this.combo > 1) { this.combo = 1; SC.UI.setCombo(1); } }

    // dọn quái đã chết, đếm riêng con nào thoát khỏi màn hình
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      if (!e.dead) continue;
      if (e.escaped) this.stats.escaped++;
      this.enemies.splice(i, 1);
    }

    if (this.boss) {
      if (this.boss.dead) { this.boss = null; SC.UI.hideBoss(); }
      else SC.UI.setBossHP(Math.max(0, this.boss.hp / this.boss.hpMax));
    }

    SC.UI.setHP(p.hp, p.hpMax, p.shield, p.shieldMax);
    SC.UI.setStats(this.score, this.coin);
    SC.UI.setTimer(this.stats.time, SC.Missions.timeTarget());

    // rung màn hình giảm dần
    if (SC.shake.t > 0) { SC.shake.t -= dt; if (SC.shake.t <= 0) SC.shake.power = 0; }

    // điều kiện kết thúc — chờ dù cuối rơi xong mới tính là hết màn
    const rescuePending = SC.Rescue.list.length > 0 || SC.Rescue.toSpawn > 0;
    // hết quái thì dù thả nhanh và rơi nhanh, khỏi bắt người chơi đứng đợi
    if (SC.Waves.done && rescuePending) SC.Rescue.hurry = true;
    if (p.dead) { this.endT += dt; if (this.endT > 1.1) this.finish(false); }
    else if (SC.Waves.done && !this.enemies.length && !rescuePending) {
      this.endT += dt;
      if (this.endT > 1.1) this.finish(true);
    }
  },

  /* ---------- kết thúc màn ---------- */
  finish(win) {
    this.state = 'result';
    SC.Music.stop();
    win ? SC.Audio.win() : SC.Audio.lose();
    const p = this.player;
    const acc = p.shots ? Math.round(p.hits / p.shots * 100) : 0;
    // sao = số nhiệm vụ phụ hoàn thành (chỉ tính khi thắng)
    const missions = SC.Missions.evaluate(this);
    let stars = 0, bonus = 0;
    const mul = SC.Upg.goldMul();
    // thua vẫn giữ vàng nhặt được, nhưng không có thưởng và không nhân hệ số
    let gold = this.coin;

    if (win) {
      stars = missions.filter(m => m.done).length;
      bonus = SC.CLEAR_BONUS(stars);
      gold = Math.round((this.coin + bonus) * mul);

      // sao của map cộng dồn qua nhiều lần chơi: cày lại để lấy nốt nhiệm vụ còn thiếu
      SC.UI.progress.stars[this.levelId] = SC.UI.saveMissions(this.levelId, missions);
      SC.UI.progress.unlocked =
        Math.max(SC.UI.progress.unlocked, Math.min(SC.TOTAL_LEVELS, this.levelId + 1));

      // giữ lần qua màn nhanh nhất -> cộng lại thành thời gian chiến dịch cho bảng xếp hạng
      if (!SC.UI.progress.times) SC.UI.progress.times = {};
      const t = SC.UI.progress.times, sec = Math.round(this.stats.time);
      if (!t[this.levelId] || sec < t[this.levelId]) t[this.levelId] = sec;

      SC.UI.buildMapList();
    }

    SC.UI.progress.coin += gold;
    SC.UI.save();
    SC.Cloud.markDirty();          // sao lưu đám mây nếu đã đăng nhập
    SC.UI.showResult(win, {
      stars, score: this.score, kills: this.kills, acc,
      coin: this.coin, bonus, mul, gold, missions
    });
  },

  render() { SC.Renderer.draw(this); }
};

SC.Game.init();

;