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
  "tree": {
    "wpn": {"costs": [140, 290, 520, 920, 1600, 2800, 4700, 7800, 12500]},
    "drone": {"costs": [130, 270, 480, 850, 1480, 2600, 4300, 7200, 11500]},
    "shield": {"costs": [110, 240, 480, 920, 1750, 3150]},
    "armor": {"costs": [100, 220, 440, 850, 1600, 2900]}
  },
  "gun": {
    "A": [{"n": 1, "spread": 0, "pierce": 0, "dmgMul": 1, "rateMul": 1}, {"n": 2, "spread": 0, "pierce": 0, "dmgMul": 1, "rateMul": 1}, {"n": 3, "spread": 0.13, "pierce": 0, "dmgMul": 1, "rateMul": 0.96}, {"n": 3, "spread": 0.15, "pierce": 0, "dmgMul": 1.15, "rateMul": 0.92}, {"n": 4, "spread": 0.17, "pierce": 0, "dmgMul": 1.15, "rateMul": 0.88}, {"n": 4, "spread": 0.23, "pierce": 0, "dmgMul": 1.2, "rateMul": 0.82}, {"n": 5, "spread": 0.24, "pierce": 0, "dmgMul": 1.35, "rateMul": 0.8}, {"n": 5, "spread": 0.26, "pierce": 0, "dmgMul": 1.55, "rateMul": 0.78}, {"n": 6, "spread": 0.28, "pierce": 0, "dmgMul": 1.8, "rateMul": 0.75}, {"n": 7, "spread": 0.3, "pierce": 0, "dmgMul": 2.6, "rateMul": 0.73}],
    "B": [{"n": 1, "spread": 0, "pierce": 0, "dmgMul": 1, "rateMul": 1}, {"n": 1, "spread": 0, "pierce": 1, "dmgMul": 1.55, "rateMul": 1.05}, {"n": 1, "spread": 0, "pierce": 2, "dmgMul": 2.1, "rateMul": 1.1}, {"n": 1, "spread": 0, "pierce": 2, "dmgMul": 2.7, "rateMul": 1.12}, {"n": 2, "spread": 0, "pierce": 3, "dmgMul": 2.7, "rateMul": 1.15}, {"n": 2, "spread": 0, "pierce": 4, "dmgMul": 3.3, "rateMul": 1.15}, {"n": 2, "spread": 0, "pierce": 5, "dmgMul": 4.2, "rateMul": 1.12}, {"n": 2, "spread": 0, "pierce": 6, "dmgMul": 5.2, "rateMul": 1.08}, {"n": 3, "spread": 0, "pierce": 7, "dmgMul": 6, "rateMul": 1.05}, {"n": 4, "spread": 0, "pierce": 8, "dmgMul": 6.8, "rateMul": 1.02}],
    "run": {"mul": 0.1, "every": 3}
  },
  "drones": {
    "A": [{"n": 1, "dmg": 2, "rate": 0.34, "pierce": 0}, {"n": 2, "dmg": 2, "rate": 0.32, "pierce": 0}, {"n": 3, "dmg": 2, "rate": 0.3, "pierce": 0}, {"n": 4, "dmg": 2, "rate": 0.28, "pierce": 0}, {"n": 5, "dmg": 2, "rate": 0.27, "pierce": 0}, {"n": 6, "dmg": 2, "rate": 0.25, "pierce": 0}, {"n": 6, "dmg": 3, "rate": 0.24, "pierce": 0}, {"n": 7, "dmg": 3, "rate": 0.22, "pierce": 0}, {"n": 7, "dmg": 4, "rate": 0.2, "pierce": 0}, {"n": 8, "dmg": 5, "rate": 0.18, "pierce": 0}, {"n": 8, "dmg": 6, "rate": 0.16, "pierce": 0}],
    "B": [{"n": 1, "dmg": 2, "rate": 0.34, "pierce": 0}, {"n": 1, "dmg": 8, "rate": 0.6, "pierce": 1}, {"n": 2, "dmg": 8, "rate": 0.6, "pierce": 1}, {"n": 2, "dmg": 11, "rate": 0.6, "pierce": 2}, {"n": 2, "dmg": 13, "rate": 0.58, "pierce": 3}, {"n": 2, "dmg": 15, "rate": 0.55, "pierce": 4}, {"n": 2, "dmg": 20, "rate": 0.52, "pierce": 5}, {"n": 3, "dmg": 22, "rate": 0.5, "pierce": 6}, {"n": 3, "dmg": 28, "rate": 0.46, "pierce": 7}]
  },
  "shield": {
    "A": [{"dur": 60, "rad": 1.8, "regen": 1.5, "dps": 0, "drain": 0, "cost": 0, "mul": 0}, {"dur": 80, "rad": 1.9, "regen": 1.8, "dps": 10, "drain": 8, "cost": 0, "mul": 0}, {"dur": 100, "rad": 2.3, "regen": 2.2, "dps": 14, "drain": 9, "cost": 0, "mul": 0}, {"dur": 120, "rad": 2.5, "regen": 2.6, "dps": 20, "drain": 10, "cost": 0, "mul": 0}, {"dur": 145, "rad": 2.9, "regen": 3, "dps": 26, "drain": 11, "cost": 0, "mul": 0}, {"dur": 175, "rad": 3.2, "regen": 4, "dps": 34, "drain": 9, "cost": 0, "mul": 0}],
    "B": [{"dur": 60, "rad": 1.6, "regen": 1.5, "dps": 0, "drain": 0, "cost": 0, "mul": 0}, {"dur": 80, "rad": 1.6, "regen": 1.8, "dps": 0, "drain": 0, "cost": 9, "mul": 1.2}, {"dur": 100, "rad": 1.7, "regen": 2.2, "dps": 0, "drain": 0, "cost": 8, "mul": 1.4}, {"dur": 120, "rad": 1.7, "regen": 2.6, "dps": 0, "drain": 0, "cost": 7, "mul": 1.8}, {"dur": 145, "rad": 1.8, "regen": 3, "dps": 0, "drain": 0, "cost": 6, "mul": 2.2}, {"dur": 175, "rad": 1.8, "regen": 4, "dps": 0, "drain": 0, "cost": 5, "mul": 2.6}],
    "idle": 3,
    "cap": 0.6
  },
  "armor": {
    "A": [{"hp": 25, "r": 1, "follow": 1, "inv": 0.9, "narrow": 0.68}, {"hp": 70, "r": 1.06, "follow": 0.96, "inv": 0.98, "narrow": 0.64}, {"hp": 115, "r": 1.1, "follow": 0.93, "inv": 1.04, "narrow": 0.61}, {"hp": 160, "r": 1.14, "follow": 0.9, "inv": 1.1, "narrow": 0.58}, {"hp": 205, "r": 1.16, "follow": 0.87, "inv": 1.15, "narrow": 0.56}, {"hp": 250, "r": 1.18, "follow": 0.85, "inv": 1.22, "narrow": 0.55}],
    "B": [{"hp": 25, "r": 1, "follow": 1, "inv": 0.9, "narrow": 0.68}, {"hp": 40, "r": 0.97, "follow": 1.05, "inv": 0.86, "narrow": 0.71}, {"hp": 55, "r": 0.94, "follow": 1.1, "inv": 0.82, "narrow": 0.73}, {"hp": 70, "r": 0.92, "follow": 1.14, "inv": 0.78, "narrow": 0.75}, {"hp": 85, "r": 0.9, "follow": 1.17, "inv": 0.74, "narrow": 0.77}, {"hp": 100, "r": 0.88, "follow": 1.2, "inv": 0.7, "narrow": 0.78}]
  },
  "counterEnemies": {
    "brute": {"hp": 70, "r": 30, "spd": 22, "score": 90, "drop": 0.9, "fire": 0, "move": "brute"},
    "midge": {"hp": 2, "r": 9, "spd": 155, "score": 8, "drop": 0.1, "fire": 0, "move": "midge"},
    "guard": {"hp": 90, "r": 24, "spd": 34, "score": 70, "drop": 0.7, "fire": 1.9, "move": "guard"}
  },
  "counter": {
    "fromLevel": 9,
    "guardFrom": 25,
    "guardMax": 2,
    "arc": 2.75,
    "smallDmg": 7,
    "bruteCut": 0.42
  },
  "upgrades": {
    "gold": {"max": 10, "costs": [55, 85, 132, 205, 318, 493, 764, 1184, 1835, 2844]}
  },
  "power": {
    "scale": {"den": 0.45, "hp": 0.7, "dmg": 0.55, "fire": 0.45, "spd": 0.3, "orbit": 1.1},
    "variant": {"AAA": [1.1, 1.15], "AAB": [1.12, 1.05], "ABA": [1.05, 1.05], "ABB": [1, 1.1], "BAA": [1.05, 0.95], "BAB": [0.95, 1], "BBA": [1.15, 0.9], "BBB": [0.95, 1]}
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
    "curve": {"perWaveBase": 8, "perWaveStep": 0.2, "hpStep": 0.058, "hpChunkFactor": 0.45, "spdStep": 0.02, "fireStep": 0.033, "fireChunkFactor": 0.5, "bossHPFinal": 1500, "bossHPMini": 1000, "bossHPStep": 0.075, "startWeaponEvery": 7, "startWeaponCap": 4, "wavesNormal": 4, "wavesBoss": 3}
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
    "clearBonusBase": 34,
    "clearBonusPerStar": 34,
    "depthStep": 0.05
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
    boss: 'voidEgg', bossName: 'GÀ MẸ HƯ KHÔNG', atk: ['ring', 'blink', 'eggRain', 'punch', 'spread', 'minions'],
    elite: 'voidPrism', eliteName: 'LĂNG TRỤ HƯ KHÔNG'
  }
];

;
/* ===== js/data-levels.js ===== */
/* data-levels.js — 60 map: 10 vùng × 6 map, mỗi vùng có trùm riêng
 *
 * Trong mỗi vùng: map 3 gặp elite (hộ vệ), map 6 gặp trùm chính của vùng — hai lần
 * cao trào mỗi vùng nên nhịp dồn dập hơn hẳn bản 10 map/vùng trước đây.
 * Vị trí hai trận đó suy ra từ levelsPerBiome, không chép cứng. */

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

/* Bể quái của từng map do SC.EnemyPool quyết (mở dần 3 loại -> 22 loại).
   Gán sau vòng dựng map vì hệ mở khoá nạp sau tệp này. */
SC.buildLevelPools = () => {
  for (const L of SC.LEVELS) L.pool = SC.EnemyPool.forLevel(L.id);
};

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
/* ===== js/data-enemy-types.js ===== */
/* data-enemy-types.js — 22 loại quái: máy bay chiến đấu tạo hình theo côn trùng và chim
 *
 * 60 map mà chỉ 6 loại quái thì tới map 20 người chơi đã thuộc lòng mọi thứ. Ở đây mở
 * dần: vào game có 3 loại, cứ 3 map mở thêm 1 loại -> 3 + 19 = 22 loại, loại cuối
 * xuất hiện ở map 58. Nhờ vậy gần như map nào cũng có một thứ chưa từng thấy.
 *
 * Mỗi loại khác nhau ở BA mặt cùng lúc, không chỉ đổi màu:
 *   dáng bay  — sine / hover / drop / dive / strafe / push / hop / weave
 *   tạo hình  — thân côn trùng hoặc thân chim, tham số cánh/đuôi/sừng riêng
 *   đường đạn — laze, mũi tên, hoả tiễn, dội tường, phi tiêu, boomerang, đạn nổ
 *
 * art: [họ, màu, kiểu cánh, kiểu đuôi, sừng]  — xem entity-enemy-art-*.js
 * đạn: [loại, số viên, độ toả, tốc độ]        — xem entity-foe-bullet.js
 */

(function () {
  const T = {};
  /* key, tên, máu, bán kính, tốc độ, điểm, rơi đồ, nhịp bắn (0 = không bắn), dáng bay */
  const add = (key, name, hp, r, spd, score, drop, fire, move, art, blt) => {
    T[key] = { name, hp, r, spd, score, drop, fire, move, art, blt: blt || null };
  };

  // ---- ba loại có sẵn từ map 1 ----
  add('fly',    'GÀ CHIP CHIP',  3,  15, 66,  10, .30, 0,   'sine',   ['ins', 92,  1, 0, 0]);
  add('gnat',   'MUỖI VẰN',      2,  12, 124, 7,  .18, 0,   'drop',   ['ins', 200, 0, 1, 0]);
  add('hornet', 'ONG BẮP CÀY',   10, 21, 46,  26, .46, 2.2, 'hover',  ['ins', 46,  1, 2, 0], ['dart', 1, 0, 300]);

  // ---- mở dần, cứ 3 map một loại ----
  add('beetle', 'GÀ MINION',     26, 26, 30,  48, .70, 0,   'push',   ['ins', 24,  2, 3, 1]);
  add('dfly',   'CHUỒN CHUỒN',   12, 22, 54,  32, .50, 1.7, 'strafe', ['ins', 176, 3, 1, 0], ['laser', 1, 0, 420]);
  add('moth',   'BƯỚM ĐÊM',      8,  20, 58,  24, .40, 0,   'weave',  ['ins', 276, 2, 0, 0]);
  add('sparrow','CHIM SẺ',       7,  17, 96,  22, .34, 0,   'dive',   ['bird', 32, 0, 0, 0]);
  add('locust', 'CHÂU CHẤU',     14, 20, 62,  34, .48, 2.4, 'hop',    ['ins', 74,  1, 1, 0], ['arrow', 1, 0, 380]);
  add('mantis', 'BỌ NGỰA',       20, 23, 44,  44, .56, 2.0, 'hover',  ['ins', 112, 3, 2, 1], ['dart', 3, .28, 280]);
  add('hawk',   'CHIM ƯNG',      18, 24, 88,  46, .55, 2.6, 'dive',   ['bird', 18, 1, 1, 0], ['arrow', 2, .14, 430]);
  add('ffly',   'ĐOM ĐÓM',       11, 18, 70,  30, .44, 2.8, 'sine',   ['ins', 58,  0, 0, 0], ['blast', 1, 0, 240]);
  add('scarab', 'BỌ CÁNH CỨNG',  34, 27, 28,  58, .78, 2.6, 'push',   ['ins', 150, 2, 3, 1], ['bounce', 2, .40, 300]);
  add('vespa',  'ONG VÒ VẼ',     16, 20, 74,  38, .50, 1.6, 'strafe', ['ins', 40,  1, 2, 1], ['dart', 2, .20, 340]);
  add('crow',   'GÀ MÁY',        22, 23, 92,  50, .58, 2.4, 'dive',   ['bird', 260, 2, 2, 0], ['blast', 1, 0, 300]);
  add('cicada', 'VE SẦU',        28, 24, 40,  56, .62, 1.9, 'hover',  ['ins', 128, 3, 1, 0], ['laser', 2, .18, 460]);
  add('owl',    'CÚ MÈO',        32, 26, 38,  64, .70, 3.0, 'hover',  ['bird', 36, 3, 3, 1], ['boomer', 2, .55, 260]);
  add('stag',   'BỌ SỪNG',       46, 29, 26,  76, .84, 3.2, 'push',   ['ins', 12,  2, 3, 1], ['rocket', 1, 0, 200]);
  add('falcon', 'CHIM CẮT',      30, 22, 116, 68, .60, 2.2, 'dive',   ['bird', 200, 1, 1, 1], ['arrow', 3, .12, 520]);
  add('queen',  'ONG CHÚA',      52, 28, 36,  88, .86, 2.0, 'hover',  ['ins', 48,  3, 2, 1], ['dart', 5, .34, 310]);
  add('vulture','KỀN KỀN',       58, 30, 44,  96, .88, 3.0, 'strafe', ['bird', 22, 2, 3, 1], ['rocket', 2, .26, 210]);
  add('scorp',  'BÒ CẠP BAY',    64, 29, 34,  104, .90, 2.6, 'push',  ['ins', 8,   3, 3, 1], ['boomer', 3, .60, 280]);
  add('phoenix','PHƯỢNG LỬA',    72, 31, 52,  120, .92, 1.8, 'weave', ['bird', 6, 3, 3, 1], ['blast', 3, .30, 330]);

  SC.ENEMY_TYPES = T;
  /* Thứ tự mở khoá = thứ tự khai báo ở trên. Ba loại đầu có ngay từ map 1. */
  SC.ENEMY_ORDER = Object.keys(T);
})();

/* Cho phép Excel đè chỉ số từng loại (sheet QuaiMoRong), giữ nguyên tạo hình và đường đạn */
(function () {
  const ov = SC.bal('enemyTypes', null);
  if (!ov) return;
  for (const k in ov) if (SC.ENEMY_TYPES[k]) Object.assign(SC.ENEMY_TYPES[k], ov[k]);
})();

;
/* ===== js/system-enemy-pool.js ===== */
/* system-enemy-pool.js — mở khoá quái dần và chọn đội hình quái cho từng map
 *
 * Luật mở khoá: vào game có 3 loại, cứ 3 map mở thêm 1 loại. Map 58 mở loại thứ 22.
 *
 * Hai mức chọn, cố ý tách rời:
 *   CHUNK (6 map)  6-8 loại — đủ để một vùng có bản sắc riêng
 *   MỘT MAP        3-5 loại lấy từ bể của chunk — đủ rối để phải nhìn, chưa đủ để loạn
 *
 * Bể quái phải TẤT ĐỊNH theo số map: cùng một map thì lần nào cũng gặp đúng bộ đó.
 * Nếu bốc ngẫu nhiên mỗi lần vào màn thì người chơi không học được map, mà không học
 * được thì cày lại chẳng nhanh hơn — mất luôn ý nghĩa của việc chơi lại.
 */

SC.EnemyPool = {
  START: 3,        // số loại có sẵn ở map 1
  EVERY: 3,        // cứ ngần này map mở thêm một loại

  /* Bộ sinh số tất định: cùng hạt giống thì luôn ra cùng dãy số */
  _rng(seed) {
    let s = (seed * 1103515245 + 12345) & 0x7fffffff;
    return () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  },

  /* Số loại đã mở tới map này */
  count(id) {
    return Math.min(SC.ENEMY_ORDER.length,
      this.START + Math.floor((id - 1) / this.EVERY));
  },

  /* Loại vừa mở đúng ở map này, null nếu map đó không mở gì mới */
  justUnlocked(id) {
    if (id === 1 || (id - 1) % this.EVERY !== 0) return null;
    const n = this.count(id);
    return n > this.count(id - 1) ? SC.ENEMY_ORDER[n - 1] : null;
  },

  /* Bể của cả chunk 6 map: 6-8 loại, luôn có 3 loại mới nhất để thứ vừa mở
     không bị bể ngẫu nhiên nuốt mất */
  chunkPool(id) {
    const per = SC.LEVELS_PER_BIOME || 6;
    const ci = Math.floor((id - 1) / per);
    const all = SC.ENEMY_ORDER.slice(0, this.count(ci * per + per));
    const want = Math.min(all.length, 6 + (ci % 3));      // 6, 7 hoặc 8

    const out = all.slice(-3);                            // ba loại mới nhất
    const rest = all.slice(0, -3);
    const rnd = this._rng(ci + 7);
    while (out.length < want && rest.length) {
      out.push(rest.splice(Math.floor(rnd() * rest.length), 1)[0]);
    }
    return out;
  },

  /* Đội hình của một map: 3-5 loại rút từ bể chunk.
     Map nào vừa mở loại mới thì loại đó CHẮC CHẮN có mặt — mở khoá mà không được
     gặp ngay thì người chơi chẳng biết mình vừa mở cái gì. */
  forLevel(id) {
    const pool = this.chunkPool(id).filter(k => SC.ENEMY_ORDER.indexOf(k) < this.count(id));
    if (!pool.length) return SC.ENEMY_ORDER.slice(0, this.START);

    const rnd = this._rng(id * 31 + 5);
    const want = Math.min(pool.length, 3 + Math.floor(rnd() * 3));   // 3, 4 hoặc 5

    const out = [];
    const fresh = this.justUnlocked(id);
    if (fresh && pool.indexOf(fresh) >= 0) out.push(fresh);

    const rest = pool.filter(k => out.indexOf(k) < 0);
    while (out.length < want && rest.length) {
      out.push(rest.splice(Math.floor(rnd() * rest.length), 1)[0]);
    }
    return out;
  },

  /* Tên hiển thị, dùng cho bảng tóm tắt trước màn */
  names(keys) {
    return keys.map(k => (SC.ENEMY_TYPES[k] || {}).name || k);
  }
};

/* Nhập 22 loại vào bảng quái chung rồi gán bể cho từng map.
   Chạy ở đây chứ không ở data-levels.js vì bảng loại quái nạp sau tệp đó. */
Object.assign(SC.ENEMY_DEF, SC.ENEMY_TYPES);
SC.buildLevelPools();

;
/* ===== js/system-endless.js ===== */
/* system-endless.js — vòng vô tận từ map 61 trở đi
 *
 * Hết map 60 thì chiến dịch quay lại từ đầu: map 61 CHÍNH LÀ map 1, chỉ khó hơn.
 * Làm vậy thay vì dựng thêm map mới vì hai lý do:
 *   - 60 map đã có đủ vùng, đủ trùm, đủ nhịp; thêm nữa chỉ là lặp lại mà tốn công
 *   - người chơi ĐÃ THUỘC map 1, nên gặp lại nó ở độ khó gấp mấy lần là một phép đo
 *     rất rõ ràng về việc mình đã mạnh lên bao nhiêu — thứ map mới không làm được
 *
 * Độ khó không chỉ theo số vòng mà còn theo CHỈ SỐ THẬT của người chơi lúc đó: cây
 * kỹ năng giờ nâng được vô hạn cấp, mà lực chiến thì đã chốt trần ở 24 cấp nên quái
 * không tự mạnh theo nữa. Phần chênh lệch đó do đây gánh.
 */

SC.Endless = {
  CYCLE: 0.55,       // mỗi vòng quái khoẻ thêm ngần này
  /* Quái bám theo HOẢ LỰC THẬT của người chơi, mũ 0.6 (bám ~60% mức mạnh lên).
   *
   * Bản trước đếm TỔNG SỐ CẤP của cả bốn nhánh. Đo ra một lỗi thiết kế nặng: nâng
   * khiên và giáp cũng làm quái khoẻ lên, tức là NÂNG THỦ TỰ HẠI MÌNH. Ở cây cấp 16
   * đều bốn nhánh, độ khó nhảy lên ×17 và tỉ lệ thắng đoạn 101-120 rơi xuống 1%.
   *
   * Nay chỉ đo sát thương của súng và drone — đó mới là thứ làm màn chơi tan nhanh,
   * và cũng là thứ duy nhất nên bị đối trọng. Đổ vàng vào phòng thủ giờ luôn có lợi. */
  POW: 0.6,
  DEN: 0.45,         // mật độ quái chỉ tăng bằng 45% mức máu, tránh vỡ khung hình

  /* Vòng thứ mấy: 0 là chiến dịch gốc, 1 là map 61-120... */
  cycle(id) { return Math.floor((id - 1) / SC.TOTAL_LEVELS); },

  /* Map gốc tương ứng: 61 -> 1, 62 -> 2 ... */
  baseId(id) { return ((id - 1) % SC.TOTAL_LEVELS) + 1; },

  active(id) { return id > SC.TOTAL_LEVELS; },

  /* Đã mở vòng vô tận chưa — điều kiện là đã qua map 60 */
  unlocked() { return (SC.UI.progress.unlocked | 0) > SC.TOTAL_LEVELS; },

  /* Sát thương/giây của súng + drone ở một cấp cho trước. Chỉ dùng để so tỉ lệ nên
     không cần con số tuyệt đối chính xác. */
  _dps(lv) {
    const dr = SC.Tree.path('drone') || 'A';
    const d = SC.Tree.tierOf(SC.Drones[dr], SC.clamp(lv, 1, 99));
    return SC.Gun.dps(lv, SC.Tree.path('wpn') || 'A', 1) + d.n * d.dmg / d.rate;
  },

  /* Người chơi đang mạnh gấp mấy lần so với lúc HẾT BẢNG GIÁ (cấp 9).
     Mốc chuẩn là 9 chứ không phải 6: cấp 7-9 vẫn nằm trong chiến dịch bình thường,
     ai đi tới map 61 cũng đã có. Lấy mốc 6 thì người chơi đúng chuẩn đã bị tính là
     "đầu tư quá mức" và ăn ngay ×3 độ khó ở map đầu tiên của vòng vô tận. */
  BASE_LV: 9,

  offense() {
    const lv = Math.max(SC.Tree.lv('wpn'), SC.Tree.lv('drone'));
    if (lv <= this.BASE_LV) return 1;
    return Math.max(1, this._dps(lv) / this._dps(this.BASE_LV));
  },

  /* Hệ số khó của một map trong vòng vô tận */
  mul(id) {
    const c = this.cycle(id);
    if (c <= 0) return 1;
    return (1 + c * this.CYCLE) * Math.pow(this.offense(), this.POW);
  },

  /* SÀN ĐỘ KHÓ của vòng vô tận: pha đường cong gốc với mức khó ở CUỐI chiến dịch.
   *
   * Vấn đề: độ khó gốc của map 1 chỉ bằng 1/6 map 60, nên vừa chật vật qua map 60
   * xong thì map 61-70 lại thành đi dạo — đo được đoạn 41-60 thắng 83% rồi đoạn
   * 61-80 vọt lên 99%, răng cưa đúng chỗ đáng lẽ phải liền mạch.
   *
   * Pha 60% nhịp gốc + 40% sàn phẳng: chỗ nối gần như liền, mà nhịp lên xuống giữa
   * các map trong vòng vẫn còn (map trùm vẫn nặng hơn map thường). */
  BLEND: 0.6,

  _endHp: 0,
  endHp() {
    return this._endHp || (this._endHp = SC.LEVELS[SC.TOTAL_LEVELS - 1].hpMul);
  },

  smooth(v) {
    return v * this.BLEND + this.endHp() * (1 - this.BLEND);
  },

  /* Bản sao của map gốc đã nhân độ khó. Trả thẳng map gốc khi còn trong chiến dịch,
     nên phần lớn thời gian hàm này không tốn gì. */
  level(id) {
    const base = SC.LEVELS[this.baseId(id) - 1];
    if (!this.active(id)) return base;

    const m = this.mul(id), c = this.cycle(id);
    return Object.assign({}, base, {
      id,
      cycle: c,
      name: base.name + ' ✦' + (c + 1),
      hpMul: +(this.smooth(base.hpMul) * m).toFixed(2),
      fireMul: +(base.fireMul * (1 + (m - 1) * 0.5)).toFixed(2),
      spdMul: +(base.spdMul * (1 + (m - 1) * 0.25)).toFixed(2),
      perWave: Math.round(base.perWave * (1 + (m - 1) * this.DEN)),
      bossHP: Math.round(base.bossHP * m),
      // vòng sau vào màn đã có sẵn vũ khí cao hơn, khỏi phải gây dựng lại từ cấp 1
      startWeapon: Math.min(SC.CFG.maxWeapon, base.startWeapon + c * 2),
      // bể quái lấy của map cuối chiến dịch: vòng vô tận thì đủ 22 loại ngay từ đầu
      pool: SC.EnemyPool.forLevel(Math.min(SC.TOTAL_LEVELS, this.baseId(id) + c * 12))
    });
  },

  /* Nhãn ngắn cho lobby và bảng kết quả */
  label(id) {
    return this.active(id)
      ? `VÒNG ${this.cycle(id) + 1} · MÀN ${this.baseId(id)}`
      : 'MÀN ' + String(id).padStart(2, '0');
  }
};

/* Mọi nơi cần dữ liệu map đều đi qua đây thay vì SC.LEVELS[id-1], nhờ vậy vòng vô tận
   không phải vá rải rác ở từng chỗ gọi. */
SC.levelAt = id => SC.Endless.level(id);

;
/* ===== js/data-skill-tree.js ===== */
/* data-skill-tree.js — 4 nhánh kỹ năng, mỗi nhánh 6 cấp và rẽ đôi ở cấp 2
 *
 * Khác hẳn bảng nâng cấp cũ (7 dòng cộng dồn, mua hết là mạnh mọi mặt): ở đây mỗi
 * nhánh bắt phải CHỌN một trong hai hướng, hướng kia khoá lại. Tổ hợp hướng của ba
 * nhánh VŨ KHÍ × PHI ĐỘI × KHIÊN cho ra 8 biến thể — xem js/data-variants.js.
 *
 * Mỗi hướng khai báo hai thứ tách bạch:
 *   good/bad : câu chữ hiện trong hộp thoại rẽ nhánh, phải nói THẬT điểm yếu
 *   tiers[]  : mô tả từng cấp, hiện trên thẻ nhánh
 * Còn CHỈ SỐ thì nằm ở system-gun / system-armor / ... chứ không để đây, vì chúng
 * cần đọc lẫn nhau khi cân bằng.
 *
 * Giá: một vòng chiến dịch 60 map thu ~27.600 vàng.
 *   - Sáu cấp đầu của cả bốn nhánh tốn ~24.900 -> gần đúng một vòng chơi.
 *   - Ba cấp cuối của hai nhánh CÔNG tốn thêm ~48.000 -> khoảng 1,7 vòng nữa.
 * Chia vậy để vòng một đi hết chiến dịch là vừa đủ dựng xong hình hài build, còn
 * việc đủ sức đối đầu trùm cuối là mục tiêu của những vòng sau.
 */

SC.TREE = {
  /* Hai nhánh CÔNG dài 9 cấp, hai nhánh THỦ dừng ở 6.
     Lý do: đo được ở cấp 6 phải bắn không nghỉ 38 giây mới hạ nổi trùm cuối — mà
     trận trùm phải né chiêu liên tục nên thực tế gấp đôi, thành ra lê thê. Ba cấp
     cuối là chặng hậu chiến dịch: đắt, nhưng đúng thứ cần để đối đầu trùm cuối. */
  wpn: {
    ic: '✦', name: 'VŨ KHÍ', short: 'Súng và đường đạn',
    costs: [140, 290, 520, 920, 1600, 2800, 4700, 7800, 12500],
    paths: {
      A: {
        name: 'TRÀN ĐẠN', color: '#ff8a2b',
        good: 'Nhiều tia, dọn quái đông rất nhanh',
        bad: 'Đạn tắt ở lưng màn — phải bay lên gần mới bắn tới',
        tiers: ['1 tia', '2 tia', '3 tia toả rộng', '3 tia, đạn đau hơn',
          '4 tia, bắn nhanh hơn', '4 tia toả rộng, bắn nhanh nhất',
          '5 tia, đạn đau hơn nhiều', '5 tia, nhịp bắn dồn dập', '6 tia, sức mạnh tối đa']
      },
      B: {
        name: 'XUYÊN PHÁ', color: '#5ad0ff',
        good: 'Một tia to xuyên cả hàng, đau nhất khi đánh trùm',
        bad: 'Bắn chậm, chỉ phủ một làn — dễ bị vây từ hai bên',
        tiers: ['1 tia', '1 tia xuyên 1 con', '1 tia xuyên 2 con',
          '1 tia to, đau hơn nhiều', '2 tia xuyên 3 con', '2 tia xuyên 4 con',
          '2 tia xuyên 5 con, đau gấp rưỡi', '2 tia xuyên 6 con', '3 giáo xuyên 7 con']
      }
    }
  },

  drone: {
    ic: '✈', name: 'PHI ĐỘI', short: 'Máy bay hộ tống',
    costs: [130, 270, 480, 850, 1480, 2600, 4300, 7200, 11500],
    paths: {
      A: {
        name: 'BẦY ĐÀN', color: '#7ae0ff',
        good: 'Tới 8 chiếc nhỏ vòng quanh, dọn sạch quái vây quanh mình',
        bad: 'Sát thương lẻ tẻ, gặm trùm rất lâu',
        tiers: ['1 chiếc bay kèm', '2 chiếc vòng quanh', '3 chiếc',
          '4 chiếc, bắn nhanh hơn', '5 chiếc', '6 chiếc, biết lao vào cản quái',
          '6 chiếc, đạn đau gấp rưỡi', '7 chiếc, bắn nhanh hơn', '7 chiếc, đạn đau hơn',
          '8 chiếc, vành drone khép kín', '8 chiếc, sát thương tối đa']
      },
      B: {
        name: 'SÁT THỦ', color: '#c58cff',
        good: '3 chiếc lớn bám mép màn, luôn nhắm con máu cao nhất',
        bad: 'Ít chiếc, không kịp dọn khi quái tràn ra đông',
        tiers: ['1 chiếc bay kèm', '1 chiếc lớn, đạn xuyên', '2 chiếc lớn',
          '2 chiếc, sát thương cao hơn', '2 chiếc quét dọc hai biên', '2 chiếc, đòn xuyên toàn màn',
          '2 chiếc, đạn xuyên 5 con', '3 chiếc lớn', '3 chiếc, sát thương tối đa']
      }
    }
  },

  shield: {
    ic: '◇', name: 'KHIÊN', short: 'Trường năng lượng',
    costs: [110, 240, 480, 920, 1750, 3150],
    paths: {
      A: {
        name: 'TỪ TRƯỜNG', color: '#4dff9f',
        good: 'Vòng khiên rộng dần, tự đốt quái chạm vào — lao vào giữa mà ủi',
        bad: 'Hao bền liên tục khi có quái trong vùng, không đỡ được đạn',
        tiers: ['Vào màn có khiên', 'Khiên đốt quái chạm vào', 'Vòng rộng hơn',
          'Đốt mạnh hơn', 'Vòng rộng nhất', 'Đốt mạnh nhất, hồi bền nhanh']
      },
      B: {
        name: 'PHẢN CHIẾU', color: '#ffd23f',
        good: 'Bật ngược đạn địch đi vào MẶT TRƯỚC, đạn bật lại thành đạn của ta',
        bad: 'Vòng nhỏ, phải chủ động quay mặt về phía đạn mới ăn',
        tiers: ['Vào màn có khiên', 'Bật đạn ở mặt trước', 'Bật được nhiều đạn hơn',
          'Đạn bật lại đau hơn', 'Bật cả hoả tiễn', 'Đạn bật nổ lan']
      }
    }
  },

  armor: {
    ic: '❤', name: 'GIÁP', short: 'Thân vỏ và cảm giác lái',
    costs: [100, 220, 440, 850, 1600, 2900],
    paths: {
      A: {
        name: 'HẠNG NẶNG', color: '#ff5c7a',
        good: 'Máu dày gấp đôi, bất tử sau đòn lâu hơn',
        bad: 'Thân to hơn 18%, bám con trỏ chậm, nghiêng cánh không hẹp được nhiều',
        tiers: ['+25 máu', '+70 máu', '+115 máu', '+160 máu', '+205 máu', '+250 máu, lì đòn']
      },
      B: {
        name: 'CƠ ĐỘNG', color: '#bfe9ff',
        good: 'Thân nhỏ 12%, bám con trỏ rất nhanh, nghiêng cánh lách sâu nhất',
        bad: 'Máu mỏng, bất tử sau đòn ngắn — trúng liên tiếp là chết',
        tiers: ['+25 máu', '+40 máu, thân nhỏ lại', '+55 máu, lái nhanh hơn',
          '+70 máu, lách sâu hơn', '+85 máu', '+100 máu, lách sâu nhất']
      }
    }
  }
};

SC.TREE_KEYS = ['wpn', 'drone', 'shield', 'armor'];

/* Giá lấy từ bảng cân bằng Excel nếu có (sheet CayKyNang -> tree.<khoá>.costs) */
for (const k of SC.TREE_KEYS) {
  const c = SC.bal ? SC.bal('tree.' + k + '.costs', null) : null;
  if (c && c.length) SC.TREE[k].costs = c.slice();
}

/* Nhánh THU VÀNG đứng NGOÀI cây: nó không tạo lối chơi nào, không có hướng để rẽ,
   nên không tính vào biến thể lẫn mốc tiến hoá. Giữ lại vì Anh muốn playtest xong
   mới quyết bỏ hay không — bỏ thì xoá đúng khối này. */
SC.TREE_EXTRA = {
  gold: {
    ic: '◈', name: 'THU VÀNG', max: 10,
    costs: SC.bal ? SC.bal('upgrades.gold.costs',
      [55, 85, 132, 205, 318, 493, 764, 1184, 1835, 2844])
      : [55, 85, 132, 205, 318, 493, 764, 1184, 1835, 2844],
    desc: l => l ? `+${l * 12}% vàng nhận được` : 'Nhận thêm vàng sau mỗi màn'
  }
};

/* Thưởng vàng khi hoàn thành màn: càng nhiều sao càng nhiều */
SC.CLEAR_BONUS = stars =>
  SC.bal('reward.clearBonusBase', 34) + stars * SC.bal('reward.clearBonusPerStar', 34);

/* Hệ số vàng theo ĐỘ SÂU của map.
 *
 * Vì sao cần: giá cây kỹ năng dốc theo cấp, còn vàng thu về thì trước đây phẳng lì —
 * đo được tới map 30 người chơi mới mua nổi 3% cây, trong khi mục tiêu là 80%. Map
 * càng sâu càng nhiều quái và quái càng trâu, nên trả nhiều hơn là hợp lý; đồng thời
 * nó làm việc "quay lại map cũ cày vàng" có lựa chọn thật: cày map sâu nhất đã qua. */
SC.GOLD_DEPTH = id =>
  1 + (Math.min(id, SC.TOTAL_LEVELS || 60) - 1) * SC.bal('reward.depthStep', 0.05);

;
/* ===== js/data-variants.js ===== */
/* data-variants.js — 8 biến thể sinh ra từ tổ hợp VŨ KHÍ × PHI ĐỘI × KHIÊN
 *
 * Khoá là ba chữ cái theo đúng thứ tự đó, ví dụ 'AAB' = tràn đạn + bầy đàn + phản chiếu.
 * GIÁP cố ý không nằm trong khoá: nó đổi dáng vóc và cảm giác lái, nhưng tính vào thì
 * thành 16 biến thể — quá nhiều để làm cho tử tế, và người chơi cũng không nhớ nổi.
 *
 * MỖI BIẾN THỂ PHẢI CÓ MỘT ĐIỂM YẾU NÊU THẲNG. Đó là thứ duy nhất giữ cho không biến
 * thể nào trở thành "đáp án đúng" — mà một khi có đáp án đúng thì cả cây kỹ năng lại
 * quay về đúng vấn đề cũ: không còn quyết định nào để ra.
 */

SC.VARIANTS = {
  AAA: {
    name: 'BÃO ĐẠN', hue: '#ff8a2b',
    tag: 'Cận chiến thuần',
    good: 'Bốn tia toả rộng, sáu drone vây quanh, khiên đốt quái chạm vào',
    bad: 'Tầm đạn ngắn nhất bảng — phải lao vào giữa mới có sát thương'
  },
  AAB: {
    name: 'LƯỚI SÉT', hue: '#bfe9ff',
    tag: 'Xả đạn dây chuyền',
    good: 'Đạn nảy sét sang quái bên cạnh, càng đông càng lời',
    bad: 'Gặp quái đi lẻ thì sét không có chỗ nảy, hoá ra yếu nhất'
  },
  ABA: {
    name: 'MƯA KIM', hue: '#4dff9f',
    tag: 'Xả diện rộng, giữ khoảng cách',
    good: 'Tràn đạn dọn quái, drone sát thủ gặm trùm, từ trường giữ vòng ngoài',
    bad: 'Hai nguồn sát thương đều dở dang, không đỉnh ở mặt nào'
  },
  ABB: {
    name: 'GƯƠNG BẠC', hue: '#ffd23f',
    tag: 'Sống bằng phản đòn',
    good: 'Đạn dội tường phủ góc chết, đạn bật lại thành đạn của mình',
    bad: 'Hết bền khiên là mất sạch lợi thế, trần kỹ năng cao'
  },
  BAA: {
    name: 'XUYÊN PHÁ', hue: '#5ad0ff',
    tag: 'Bắn thẳng, bầy đàn giữ lưng',
    good: 'Giáo xuyên cả cột quái, drone vây quanh dọn phần lọt lưới',
    bad: 'Chỉ phủ một làn — quái tạt sườn là phải lái liên tục'
  },
  BAB: {
    name: 'LÔI TIÊU', hue: '#c58cff',
    tag: 'Cơ động, đạn bám mục tiêu',
    good: 'Đạn dí bẻ lái theo quái, bắn không cần ngắm kỹ',
    bad: 'Bắn chậm, gặp quái đông là không kịp nhịp'
  },
  BBA: {
    name: 'TỬ THẦN', hue: '#ff5c7a',
    tag: 'Chuyên diệt trùm',
    good: 'Sát thương đơn mục tiêu cao nhất bảng, drone luôn nhắm con máu cao nhất',
    bad: 'Quái đông tràn ra là chết ngộp — yếu nhất ở map dọn quái'
  },
  BBB: {
    name: 'HƯ KHÔNG', hue: '#9d7ad0',
    tag: 'Khó dùng nhất, trần kỹ năng cao nhất',
    good: 'Giáo xuyên cộng đạn dội tường, một phát quét được cả hai biên',
    bad: 'Đòi đọc đường đạn và canh góc; chơi ẩu thì đây là biến thể tệ nhất'
  }
};

/* Ba mảnh của khoá, dùng để hé lộ một phần ở sổ tay biến thể (phase 8) */
SC.VARIANT_PARTS = [
  { br: 'wpn', A: 'tràn đạn', B: 'xuyên phá' },
  { br: 'drone', A: 'bầy đàn', B: 'sát thủ' },
  { br: 'shield', A: 'từ trường', B: 'phản chiếu' }
];

;
/* ===== js/data-missions.js ===== */
/* data-missions.js — kho nhiệm vụ phụ; mỗi map bốc 3 cái, hoàn thành bao nhiêu được bấy nhiêu sao
 *
 * `arg(id)` tính ngưỡng theo số thứ tự map nên map càng cao yêu cầu càng nặng.
 * `check(g, p, n)`: g = SC.Game, p = máy bay, n = ngưỡng.
 *
 * `got(g, p)` và `miss(got, n)` phục vụ bảng kết quả: trước đây nhiệm vụ trượt chỉ
 * hiện một dấu ✗, người chơi thua sát nút mà không biết mình thiếu bao nhiêu nên
 * chẳng có lý do gì để bấm chơi lại. `got` trả số ĐO ĐƯỢC, `miss` diễn đạt phần
 * còn thiếu bằng đúng đơn vị của nhiệm vụ đó. */

SC.MISSION_POOL = [
  {
    id: 'clear', ic: '✧',
    arg: () => 0,
    label: () => 'Không để con nào thoát',
    check: g => g.stats.escaped === 0,
    got: g => g.stats.escaped,
    miss: got => `để thoát ${got} con`
  },
  {
    id: 'perfect', ic: '♥',
    arg: () => 0,
    label: () => 'Không trúng đòn nào',
    check: (g, p) => p.damaged === 0,
    got: (g, p) => p.damaged,
    miss: got => `trúng ${got} đòn`
  },
  {
    id: 'hp', ic: '✚',
    arg: id => id >= 50 ? 60 : 50,
    label: n => `Kết thúc còn trên ${n}% máu`,
    check: (g, p, n) => p.hp >= p.hpMax * n / 100,
    got: (g, p) => Math.round(p.hp / p.hpMax * 100),
    miss: (got, n) => `mới có ${got}%, thiếu ${Math.max(1, n - got)}%`
  },
  {
    id: 'gold', ic: '◈',
    arg: id => 6 + Math.round(id * 0.62),
    label: n => `Nhặt ${n} vàng trong màn`,
    check: (g, p, n) => g.coin >= n,
    got: g => g.coin,
    miss: (got, n) => `mới có ${got}, thiếu ${n - got} vàng`
  },
  {
    // combo tối đa của game là 8 nên ngưỡng phải nằm dưới mức đó
    id: 'combo', ic: '✷',
    arg: id => Math.min(SC.CFG.maxCombo - 1, 5 + Math.floor(id / 34)),
    label: n => `Đạt chuỗi combo x${n}`,
    check: (g, p, n) => g.stats.maxCombo >= n,
    got: g => g.stats.maxCombo,
    miss: got => `chuỗi cao nhất mới x${got}`
  },
  {
    // Chính xác = tỉ lệ LOẠT bắn có ít nhất 1 viên trúng, chỉ tính những loạt
    // bắn ra khi đang có địch trên màn. Map 1-4 quá thưa địch nên chỉ số nhiễu,
    // vì vậy nhiệm vụ này chỉ xuất hiện từ map 5.
    // map mở đầu mỗi cụm rất thưa địch nên ít cơ hội bắn trúng -> hạ ngưỡng
    id: 'acc', ic: '◎', min: 5,
    arg: id => 55 + Math.floor(id / 30) * 5 - ((id - 1) % 5 === 0 ? 10 : 0),
    label: n => `Độ chính xác từ ${n}%`,
    check: (g, p, n) => p.shots && (p.hits / p.shots * 100) >= n,
    // Làm tròn GIỐNG dòng "Chính xác" ở bảng kết quả (main.js cũng dùng round).
    // Lệch cách làm tròn thì bảng hiện 50% mà nhiệm vụ lại nói "mới có 49%".
    got: (g, p) => p.shots ? Math.round(p.hits / p.shots * 100) : 0,
    miss: (got, n) => `mới có ${got}%, thiếu ${Math.max(1, n - got)}%`
  },
  {
    id: 'rescue', ic: '🐱',
    arg: id => 2 + Math.floor(id / 25),
    label: n => `Cứu ${n} bé mèo rơi`,
    check: (g, p, n) => g.stats.rescued >= n,
    got: g => g.stats.rescued,
    miss: (got, n) => `mới cứu ${got}, thiếu ${n - got}`
  },
  {
    // Mốc bám theo thời gian dọn màn đo được (~25-48s). Map boss được cộng thêm
    // vì đánh trùm tốn thêm khoảng 15 giây.
    id: 'fast', ic: '⏱',
    arg: id => 34 + Math.round(id * 0.22) + (id % 5 === 0 ? 14 : 0),
    label: n => `Hoàn thành dưới ${n} giây`,
    check: (g, p, n) => g.stats.time <= n,
    // Ngược chiều: số ĐO càng nhỏ càng tốt. Làm tròn giống dòng "Thời gian" ở bảng
    // kết quả, còn phần chênh thì chặn sàn 1 để không ra "chậm 0s" khi lẻ giây.
    got: g => Math.round(g.stats.time),
    miss: (got, n) => `mất ${got}s, chậm ${Math.max(1, got - n)}s`
  }
];

;
/* ===== js/system-tree.js ===== */
/* system-tree.js — trạng thái cây kỹ năng: đọc cấp, mua, rẽ nhánh, tra biến thể
 *
 * Lưu trong hồ sơ đúng hai trường mỗi nhánh:
 *   progress.tree = { wpn: {lv:4, path:'A'}, drone: {...}, shield: {...}, armor: {...} }
 * Mọi thứ khác — biến thể, mốc tiến hoá, hệ số sát thương — đều SUY RA từ đây chứ
 * không lưu, nên sửa bảng cân bằng không bao giờ làm lệch trạng thái đã lưu.
 *
 * Luật rẽ nhánh: mua tới cấp 2 là bị chặn, phải chọn hướng mới mua tiếp được.
 * Đổi hướng vẫn được nhưng tốn gấp 3 số vàng đã đầu tư và nhánh về lại cấp 1 —
 * đủ đau để lần chọn đầu phải nghĩ, mà vẫn có đường quay đầu cho người lỡ tay
 * (cày lại vàng ở map cũ được, nên đây không phải ngõ cụt).
 */

SC.Tree = {
  FORK_LV: 2,          // cấp bắt buộc chọn hướng
  EVO1: 3, EVO2: 6,    // cả 4 nhánh đạt cấp này thì tiến hoá
  REROLL_MUL: 3,       // giá đổi hướng = 3 × số vàng đã đầu tư vào nhánh

  def(key) { return SC.TREE[key]; },

  /* Kho trạng thái, tự dựng khi hồ sơ chưa có */
  _all() {
    const p = SC.UI.progress;
    if (!p.tree) p.tree = {};
    for (const k of SC.TREE_KEYS) if (!p.tree[k]) p.tree[k] = { lv: 0, path: null };
    return p.tree;
  },
  node(key) { return this._all()[key]; },

  /* ---------- cấp vô hạn ----------
   * Hết bảng giá KHÔNG phải là hết đường nâng. Người chơi cày thêm vẫn có chỗ tiêu
   * vàng: giá mỗi cấp tiếp theo nhân thêm GROW, còn chỉ số cộng đúng bằng bước cuối
   * cùng của bảng (cấp 5->6 hoặc 8->9 cộng bao nhiêu thì cấp 9->10 cộng đúng ngần đó).
   *
   * An toàn về cân bằng: lực chiến đã chốt trần ở 24 cấp (system-power.js) nên cấp
   * vượt bảng KHÔNG làm quái mạnh thêm — phần thưởng cho việc cày là sức mạnh thật,
   * còn độ khó thì do vòng vô tận lo (system-endless.js).
   */
  GROW: 1.42,        // giá mỗi cấp vượt bảng nhân thêm ngần này

  lv(key) { return this.node(key).lv; },
  path(key) { return this.node(key).path; },
  /* Số cấp CÓ TRONG BẢNG. Không còn là trần tuyệt đối — xem cost(). */
  max(key) { return SC.TREE[key].costs.length; },
  maxed() { return false; },        // không bao giờ hết đường nâng nữa

  /* Đã vượt qua bảng giá chưa — giao diện dùng để đổi cách hiển thị */
  beyond(key) { return this.lv(key) >= this.max(key); },

  /* Nội suy một mốc chỉ số ở cấp bất kỳ, kể cả vượt bảng.
     Dùng chung cho súng, drone, khiên, giáp nên bốn nơi không thể lệch luật nhau. */
  tierOf(table, lv) {
    const n = table.length;
    if (lv <= n) return table[SC.clamp(lv, 1, n) - 1];
    const last = table[n - 1], prev = table[n - 2] || last;
    const step = lv - n;
    const out = {};
    for (const k in last) {
      out[k] = typeof last[k] === 'number'
        ? last[k] + (last[k] - prev[k]) * step
        : last[k];
    }
    // nhịp bắn không được tiến tới 0 (bắn vô hạn nhanh) — chặn sàn 45% bảng gốc
    if (out.rateMul !== undefined) out.rateMul = Math.max(last.rateMul * 0.45, out.rateMul);
    if (out.rate !== undefined) out.rate = Math.max(last.rate * 0.45, out.rate);
    return out;
  },

  /* Hướng đã bị khoá với hồ sơ này ('B' nếu đã chọn 'A') */
  lockedPath(key) {
    const p = this.path(key);
    return p ? (p === 'A' ? 'B' : 'A') : null;
  },

  /* Đang đứng ở cấp rẽ mà chưa chọn hướng -> chặn mọi thao tác mua */
  needsFork(key) { return this.lv(key) >= this.FORK_LV && !this.path(key); },

  /* Bất kỳ nhánh nào đang chờ chọn hướng: cả màn cây bị khoá cho tới khi chốt */
  pendingFork() { return SC.TREE_KEYS.find(k => this.needsFork(k)) || null; },

  cost(key) {
    if (this.needsFork(key)) return null;
    const c = SC.TREE[key].costs, lv = this.lv(key);
    if (lv < c.length) return c[lv];
    // vượt bảng: giá cấp cuối nhân dồn, làm tròn nghìn cho số đọc dễ chịu
    const over = lv - c.length + 1;
    const raw = c[c.length - 1] * Math.pow(this.GROW, over);
    return Math.round(raw / 100) * 100;
  },

  canBuy(key) {
    const c = this.cost(key);
    return c !== null && SC.UI.progress.coin >= c && !this.pendingFork();
  },

  buy(key) {
    if (!this.canBuy(key)) return false;
    SC.UI.progress.coin -= this.cost(key);
    this.node(key).lv++;
    SC.UI.save();
    return true;
  },

  /* Chốt hướng. Không hoàn tác miễn phí — giao diện đã bắt xác nhận hai lần. */
  fork(key, path) {
    if (!this.needsFork(key) || !SC.TREE[key].paths[path]) return false;
    this.node(key).path = path;
    SC.UI.save();
    return true;
  },

  /* ---------- đổi hướng có trả giá ---------- */

  /* Số vàng đã đổ vào một nhánh (tổng giá các cấp đã mua), tính được cả phần vượt bảng */
  invested(key) {
    const c = SC.TREE[key].costs, lv = this.lv(key);
    let s = 0;
    for (let i = 0; i < Math.min(lv, c.length); i++) s += c[i];
    for (let i = c.length; i < lv; i++)
      s += Math.round(c[c.length - 1] * Math.pow(this.GROW, i - c.length + 1) / 100) * 100;
    return s;
  },

  rerollCost(key) {
    if (!this.path(key)) return null;               // chưa rẽ thì không có gì để đổi
    return this.invested(key) * this.REROLL_MUL;
  },

  canReroll(key) {
    const c = this.rerollCost(key);
    return c !== null && SC.UI.progress.coin >= c && !this.pendingFork();
  },

  /* Trả giá xong thì nhánh về cấp 1, hướng xoá sạch — chọn lại từ đầu */
  reroll(key) {
    if (!this.canReroll(key)) return false;
    SC.UI.progress.coin -= this.rerollCost(key);
    this.node(key).lv = 1;
    this.node(key).path = null;
    SC.UI.save();
    return true;
  },

  /* ---------- xây lại cả cây, MIỄN PHÍ ----------
   *
   * Hoàn 100% vàng đã đầu tư, xoá sạch mọi cấp và mọi hướng.
   *
   * Hoàn 100% vàng đã đầu tư, nhưng TỪ 21/09/2026 CÓ PHÍ LŨY TIẾN (yêu cầu design):
   * miễn phí mãi thì nút reset không có trọng lượng, người chơi đổi build như thay
   * áo trước mỗi map. Phí = 2% tổng vàng (sau khi hoàn) ở lần đầu, mỗi lần reset
   * cộng thêm 2%, trần 30%. Tính trên vàng HIỆN CÓ chứ không trên vàng đầu tư:
   * người mới ít vàng phí rẻ, người giàu reset nhiều thì đau dần — đúng nghĩa
   * "nghĩ kỹ rồi hãy đập". Số lần reset lưu ở progress.resets (theo cloud).
   */
  refundAll() {
    return SC.TREE_KEYS.reduce((s, k) => s + this.invested(k), 0);
  },

  /* % phí cho LẦN RESET KẾ TIẾP: 2% → 4% → … → 30% */
  resetFeePct() {
    return Math.min(0.30, 0.02 * ((SC.UI.progress.resets || 0) + 1));
  },

  /* Phí tính trên TỔNG tài sản sau hoàn (vàng túi + vàng được hoàn), nên không
     bao giờ âm túi: phí ≤ 30% của chính con số vừa cộng vào. */
  resetFee() {
    return Math.round(((SC.UI.progress.coin || 0) + this.refundAll()) * this.resetFeePct());
  },

  rebuild() {
    const back = this.refundAll();
    const p = SC.UI.progress;
    const fee = this.resetFee();     // chốt phí TRƯỚC khi cộng hoàn, đỡ lệch hiển thị
    p.coin += back;
    p.coin = Math.max(0, p.coin - fee);
    p.resets = (p.resets || 0) + 1;
    p.tree = null;
    this._all();
    p.evoSeen = 0;          // tiến hoá dựng lại từ đầu, để lần tới còn được xem diễn
    SC.UI.save();
    return { back, fee };
  },

  /* ---------- suy ra biến thể và mốc tiến hoá ---------- */

  /* Khoá tra 8 biến thể: hướng của VŨ KHÍ × PHI ĐỘI × KHIÊN, ví dụ 'AAB'.
     GIÁP cố ý không tính vào — nó đổi dáng vóc chứ không đổi lối chơi, tính vào
     thì thành 16 biến thể, quá nhiều để làm tử tế. Trả null khi chưa rẽ đủ ba. */
  variant() {
    const a = this.path('wpn'), b = this.path('drone'), c = this.path('shield');
    return (a && b && c) ? a + b + c : null;
  },

  /* 0 chưa tiến hoá · 1 · 2 — điều kiện là CẢ BỐN nhánh cùng đạt mốc, cố ý ép
     nâng đều để mọi biến thể đều có đủ bốn mảnh ghép */
  evo() {
    const low = Math.min(...SC.TREE_KEYS.map(k => this.lv(k)));
    return low >= this.EVO2 ? 2 : low >= this.EVO1 ? 1 : 0;
  },

  /* Còn mấy nhánh nữa thì tới mốc tiến hoá kế tiếp -> thanh tiến độ ở màn cây */
  evoProgress() {
    const e = this.evo();
    if (e >= 2) return null;
    const need = e === 0 ? this.EVO1 : this.EVO2;
    return { evo: e + 1, need, done: SC.TREE_KEYS.filter(k => this.lv(k) >= need).length };
  },

  /* ---------- nhánh THU VÀNG, đứng ngoài cây ---------- */
  goldLv() { const p = SC.UI.progress; return (p.upgGold | 0) || 0; },
  goldCost() {
    const d = SC.TREE_EXTRA.gold, l = this.goldLv();
    return l >= d.max ? null : d.costs[l];
  },
  canBuyGold() {
    const c = this.goldCost();
    return c !== null && SC.UI.progress.coin >= c && !this.pendingFork();
  },
  buyGold() {
    if (!this.canBuyGold()) return false;
    SC.UI.progress.coin -= this.goldCost();
    SC.UI.progress.upgGold = this.goldLv() + 1;
    SC.UI.save();
    return true;
  },

  goldMul() { return 1 + this.goldLv() * 0.12; },

  /* ---------- tổng quan, dùng cho nút lobby và lực chiến ---------- */
  totalLevels() { return SC.TREE_KEYS.reduce((s, k) => s + this.lv(k), 0); },
  totalMax() { return SC.TREE_KEYS.reduce((s, k) => s + this.max(k), 0); },
  anyAffordable() {
    return SC.TREE_KEYS.some(k => this.canBuy(k)) || this.canBuyGold();
  }
};

;
/* ===== js/system-tree-migrate.js ===== */
/* system-tree-migrate.js — chuyển hồ sơ từ bảng nâng cấp cũ sang cây kỹ năng
 *
 * Hồ sơ cũ lưu progress.upg = {hp, dmg, rate, wpn, shield, wing, gold}. Cây mới có
 * hình dạng khác hẳn (rẽ nhánh loại trừ) nên không quy đổi cấp 1-1 được — mà cũng
 * KHÔNG NÊN quy đổi: người chơi cần được tự chọn hướng, đó là toàn bộ điểm của bản này.
 *
 * Cách xử lý: hoàn lại ĐÚNG số vàng đã đầu tư rồi cho chọn lại từ đầu. Không ai mất
 * công cày, và ai cũng được trải nghiệm việc rẽ nhánh.
 *
 * Riêng THU VÀNG giữ nguyên cấp: nó vẫn còn trong bản mới, không có gì để chọn lại.
 *
 * Bảng giá cũ chép cứng ở đây có chủ ý — nó phải sống lâu hơn data-upgrades.js
 * (tệp đó đã xoá), và giá cũ là dữ liệu lịch sử, không được đổi theo bảng cân bằng.
 */

SC.TreeMigrate = {
  OLD_COSTS: {
    hp:     [40, 62, 96, 149, 231, 358, 555, 860, 1333, 2066],
    dmg:    [50, 78, 121, 187, 290, 450, 697, 1080, 1674, 2595],
    rate:   [45, 70, 108, 168, 260, 403, 625, 969],
    wpn:    [280, 620, 1350, 2150, 3400, 5200],   // trần từng là 6 trước khi nerf về 4
    shield: [60, 93, 144, 223, 346, 536, 831, 1288],
    wing:   [180, 330, 600, 900, 1150]
  },

  /* Gọi ngay sau SC.UI.load(). Trả về số vàng đã hoàn, 0 nếu không có gì để chuyển. */
  run() {
    const p = SC.UI.progress;
    if (!p.upg) return 0;                      // hồ sơ mới tinh hoặc đã chuyển rồi

    let refund = 0;
    for (const k in this.OLD_COSTS) {
      const lv = p.upg[k] | 0, c = this.OLD_COSTS[k];
      for (let i = 0; i < lv && i < c.length; i++) refund += c[i];
    }

    // THU VÀNG chuyển thẳng sang kho mới, không hoàn tiền vì nhánh này vẫn còn
    if (p.upg.gold) p.upgGold = Math.max(p.upgGold | 0, p.upg.gold | 0);

    delete p.upg;
    p.coin = (p.coin | 0) + refund;
    p.treeMigrated = 1;                        // để lobby biết mà nhắc một lần
    SC.Tree._all();                            // dựng cây rỗng
    SC.UI.save();
    return refund;
  },

  /* Nhắc một lần ở lobby sau khi chuyển — hiện xong thì xoá cờ */
  notice() {
    const p = SC.UI.progress;
    if (!p.treeMigrated) return;
    delete p.treeMigrated;
    SC.UI.save();
    SC.UI.toast('CÂY KỸ NĂNG ĐÃ ĐỔI MỚI — VÀNG ĐÃ HOÀN LẠI', true);
  }
};

;
/* ===== js/system-tree-stats.js ===== */
/* system-tree-stats.js — quy chỉ số của từng nhánh thành CON SỐ ĐỌC ĐƯỢC
 *
 * Vì sao cần: thẻ nhánh chỉ ghi mô tả kiểu "3 giáo xuyên 7 con · cộng thêm 1 bậc",
 * trong khi giá lên cấp là 25.200 vàng. Người chơi bỏ chừng đó tiền mà không thấy
 * chỉ số nào nhúc nhích thì không có cách nào biết mình mua đúng hay sai — nhất là
 * ở cấp vô hạn, nơi mô tả không còn đổi nữa vì đã hết bảng.
 *
 * Ở đây trả về danh sách {tên, nay, sau} để giao diện vẽ "6.8 → 7.6". Số lấy THẲNG
 * từ chính các bảng mà ván chơi đang dùng (SC.Gun, SC.Drones, SC.Shield, SC.Armor),
 * nên không bao giờ có chuyện bảng nói một đằng trong trận một nẻo.
 */

SC.TreeStats = {
  /* Sát thương mỗi giây của súng ở một cấp — giả định mọi tia đều trúng.
     Dùng cấp vũ khí 1 (chưa nhặt gì trong màn) để so cho công bằng giữa hai mốc. */
  _gunDps(lv) { return SC.Gun.dps(lv, SC.Tree.path('wpn') || 'A', 1); },

  _droneOf(lv) {
    const k = SC.Drones.kind();
    const t = SC.Tree.tierOf(SC.Drones[k], Math.max(1, lv));
    return { n: Math.min(SC.Drones.MAX_N, Math.round(t.n)), dmg: t.dmg, rate: t.rate };
  },

  /* Ba dòng chỉ số của một nhánh: [nhãn, giá trị cấp NAY, giá trị cấp SAU] */
  of(key) {
    const lv = SC.Tree.lv(key);
    const now = Math.max(1, lv), next = lv + 1;
    const r = (v, d) => +v.toFixed(d === undefined ? 1 : d);

    if (key === 'wpn') {
      const a = SC.Tree.tierOf(SC.Gun[SC.Tree.path('wpn') || 'A'], now);
      const b = SC.Tree.tierOf(SC.Gun[SC.Tree.path('wpn') || 'A'], next);
      const out = [
        ['Sát thương/giây', Math.round(this._gunDps(now)), Math.round(this._gunDps(next))],
        ['Số tia', Math.min(SC.Gun.MAX_N, Math.round(a.n)), Math.min(SC.Gun.MAX_N, Math.round(b.n))]
      ];
      if (SC.Tree.path('wpn') === 'B') out.push(['Xuyên', Math.round(a.pierce), Math.round(b.pierce)]);
      else out.push(['Tầm đạn', Math.round(SC.Gun.rangeA() * 100) + '%',
        Math.round(Math.min(SC.Gun.RANGE_MAX, SC.Gun.RANGE_A + Math.max(0, next - 6) * SC.Gun.RANGE_STEP) * 100) + '%']);
      return out;
    }

    if (key === 'drone') {
      const a = this._droneOf(now), b = this._droneOf(next);
      return [
        ['Sát thương/giây', Math.round(a.n * a.dmg / a.rate), Math.round(b.n * b.dmg / b.rate)],
        ['Số chiếc', a.n, b.n],
        ['Sát thương mỗi phát', Math.round(a.dmg), Math.round(b.dmg)]
      ];
    }

    if (key === 'shield') {
      const k = SC.Shield.kind();
      const a = lv < 1 ? null : SC.Shield.tier();
      const b = SC.Tree.tierOf(SC.Shield[k], next);
      const cur = a || { dur: 0, rad: 0, dps: 0, mul: 0 };
      const out = [['Độ bền', Math.round(cur.dur), Math.round(b.dur)]];
      if (k === 'A') {
        out.push(['Sát thương/giây', Math.round(cur.dps), Math.round(b.dps)]);
        out.push(['Bán kính', r(cur.rad) + '×', r(Math.min(4.2, b.rad)) + '×']);
      } else {
        out.push(['Đạn bật lại', r(cur.mul) + '×', r(b.mul) + '×']);
        // giá bật có sàn 1, khớp với sàn đang áp trong SC.Shield.tier()
        out.push(['Giá mỗi lần bật', Math.max(1, Math.round(cur.cost || 0)),
          Math.max(1, Math.round(b.cost))]);
      }
      return out;
    }

    // armor
    const A = SC.Armor[SC.Tree.path('armor') || 'A'];
    const a = lv < 1 ? { hp: 0, r: 1, inv: SC.CFG.iFrame, narrow: 0.68 } : SC.Armor.tier();
    const b = SC.Tree.tierOf(A, next);
    return [
      ['Máu tối đa', SC.CFG.playerHP + Math.round(a.hp), SC.CFG.playerHP + Math.round(b.hp)],
      ['Bất tử sau đòn', r(a.inv, 2) + 's', r(SC.clamp(b.inv, 0.55, 1.8), 2) + 's'],
      ['Lách sâu nhất', Math.round(a.narrow * 100) + '%',
        Math.round(SC.clamp(b.narrow, 0.4, 0.86) * 100) + '%']
    ];
  },

  /* Số đầu tiên trong chuỗi, để so tăng hay giảm ("1.57s" -> 1.57, "50%" -> 50) */
  _num(v) { const m = String(v).match(/-?[\d.]+/); return m ? +m[0] : NaN; },

  /* Dựng HTML ba dòng "nhãn  nay → sau".
     Tô xanh khi TĂNG, tô đỏ khi GIẢM — có chỉ số cố ý đi xuống (giáp hạng nặng càng
     cấp cao càng lách kém), tô xanh hết thì người chơi tưởng cái gì cũng tốt lên. */
  html(key) {
    return '<div class="tree-stats">' + this.of(key).map(([ten, nay, sau]) => {
      const doi = String(nay) !== String(sau);
      const a = this._num(nay), b = this._num(sau);
      const cls = !doi ? '' : (b < a ? ' down' : ' up');
      return `<div class="ts${cls}"><span>${ten}</span>`
        + `<b>${nay}${doi ? ` <i>→</i> ${sau}` : ''}</b></div>`;
    }).join('') + '</div>';
  }
};

;
/* ===== js/system-variant.js ===== */
/* system-variant.js — tra biến thể hiện tại và dựng khoảnh khắc TIẾN HOÁ
 *
 * Tiến hoá phải THẤY ĐƯỢC, không phải một dòng chữ trôi qua: dừng ván 1.2 giây, máy
 * bay loé sáng biến hình, hiện tên biến thể bằng bong bóng manga rồi mới chơi tiếp.
 * Và chỉ dừng khi vừa hết wave — dừng giữa lúc đang bị vây thì thành ức chế.
 */

SC.Variant = {
  key() { return SC.Tree.variant(); },
  def() {
    const k = this.key();
    return k ? SC.VARIANTS[k] : null;
  },
  name() { const d = this.def(); return d ? d.name : 'CHƯA THÀNH HÌNH'; },
  hue() { const d = this.def(); return d ? d.hue : '#8fb8e8'; },

  /* ---------- sổ tay: biến thể nào đã từng mở ---------- */
  seen() {
    const p = SC.UI.progress;
    if (!p.codex) p.codex = {};
    return p.codex;
  },
  /* Gọi khi vào màn. Ghi lại lần đầu gặp để sổ tay có cái mà hé lộ dần. */
  markSeen() {
    const k = this.key();
    if (!k || SC.Tree.evo() < 1) return;
    const c = this.seen();
    if (!c[k]) { c[k] = { runs: 0, best: 0 }; SC.UI.save(); }
    c[k].runs++;
  },

  /* ---------- khoảnh khắc tiến hoá ---------- */
  /* So mốc đã lưu với mốc hiện tại; chênh nhau thì tới lúc diễn. */
  check() {
    const p = SC.UI.progress;
    const now = SC.Tree.evo();
    const was = p.evoSeen | 0;
    if (now <= was) return null;
    p.evoSeen = now;
    SC.UI.save();
    return now;
  },

  /* Xếp hàng chờ diễn, main.js gọi khi hết wave để không cắt ngang lúc đang bị vây */
  pending: 0,
  queue() { const e = this.check(); if (e) this.pending = e; },

  /* Diễn hoạt cảnh: chớp sáng trên nền ván chơi rồi mở màn tiến hoá.
     Trả true nếu vừa bắt đầu diễn — bên gọi có nhiệm vụ dừng ván lại. */
  play() {
    if (!this.pending) return false;
    const evo = this.pending;
    this.pending = 0;
    SC.ScreenFX.flash('255,255,255', 0.5);
    SC.addShake(14, 0.5);
    // chờ chớp sáng tắt bớt rồi mới mở màn, để cú chuyển cảnh không bị chồng lên nhau
    setTimeout(() => SC.Evolution.open(evo), 260);
    return true;
  }
};

;
/* ===== js/system-power.js ===== */
/* system-power.js — Lực chiến và độ khó co giãn theo lực chiến
 *
 * VẤN ĐỀ CŨ: công thức cộng dồn theo BỀ RỘNG (mua nhiều nhánh = điểm cao). Với cây
 * kỹ năng mới thì bề rộng đã bị giới hạn sẵn — ai cũng đúng 4 nhánh, không hơn —
 * nên đo bề rộng là vô nghĩa. Cái thật sự phân biệt người chơi bây giờ là CHIỀU SÂU
 * đầu tư và ĐÃ QUA MẤY MỐC TIẾN HOÁ.
 *
 * Quái vẫn chỉ mạnh lên bằng khoảng 60% mức người chơi mạnh lên, nên nâng cấp vẫn
 * đáng giá — người chơi thấy mình khoẻ hơn, chỉ là không còn cày như đi dạo.
 */

SC.Power = {
  DEPTH: 0.60,      // phần điểm đến từ chiều sâu đầu tư
  EVO: 0.40,        // phần điểm đến từ mốc tiến hoá đã đạt

  /* Biên độ co giãn độ khó, chỉnh được trong Excel.
     Ghìm mạnh so với bản cũ (den .90 hp 1.60): số cũ tính cho người chơi mạnh lên
     411 lần, nay trần chỉ còn ~19 lần. Giữ nguyên là max cây còn khó hơn bản trắng
     — đo được ở lần chạy đầu: max cây thua ở map 12. */
  S: SC.bal('power.scale', { den: 0.45, hp: 0.70, dmg: 0.55, fire: 0.45, spd: 0.30, orbit: 1.10 }),

  /* Hệ số độ khó RIÊNG cho từng biến thể: biến thể mạnh dọn quái thì gặp quái trâu
     hơn, biến thể diệt trùm thì gặp quái đông hơn. Đây là cách cân 8 lối chơi mà
     không phải đụng vào chỉ số của chính chúng — chỉnh ở đây an toàn hơn nhiều.
     [mật độ, máu quái] — 1.0 là trung tính. */
  VAR: SC.bal('power.variant', {
    AAA: [1.10, 1.15], AAB: [1.12, 1.05], ABA: [1.05, 1.05], ABB: [1.00, 1.10],
    BAA: [1.05, 0.95], BAB: [0.95, 1.00], BBA: [1.15, 0.90], BBB: [0.95, 1.00]
  }),

  /* Lực chiến 0-100.
   *
   * Mốc chuẩn của chiều sâu là CẢ BỐN NHÁNH ĐẠT CẤP 6 (24 cấp), không phải trần
   * tuyệt đối của cây. Lý do: hai nhánh công có thêm cấp 7-9, nếu chia cho trần
   * tuyệt đối (30) thì cùng một người chơi, cùng một sức mạnh thật, điểm lại tụt —
   * đo được lúc nâng trần: người ở cấp 5 rớt từ 70 xuống 60 điểm, quái yếu đi theo
   * và giữa game bỗng dưng dễ hẳn dù chẳng ai mạnh lên.
   *
   * Hệ quả có chủ ý: ba cấp cuối của nhánh công KHÔNG làm quái mạnh thêm. Đó chính
   * là chặng hậu chiến dịch — phần thưởng cho việc cày thêm hai vòng là đủ sức hạ
   * trùm cuối, chứ không phải lại một vòng rượt đuổi chỉ số nữa.
   */
  CORE_LV: 6,      // mốc "đi hết một vòng chiến dịch" của mỗi nhánh

  total() {
    const core = this.CORE_LV * SC.TREE_KEYS.length;
    const depth = Math.min(1, SC.Tree.totalLevels() / core);
    const evo = SC.Tree.evo() / 2;
    return Math.round(100 * (this.DEPTH * depth + this.EVO * evo));
  },

  /* 0..1 — dùng nội bộ để nội suy các hệ số bên dưới */
  _t() { return SC.clamp(this.total() / 100, 0, 1); },

  /* SỐ HIỂN THỊ cho người chơi, KHÔNG chốt ở 100.
   *
   * total() phải chốt vì nó là hệ số co giãn độ khó — cho nó chạy tiếp thì cấp vô hạn
   * lại kéo quái mạnh theo, đúng cái bẫy đã gỡ ở system-endless.js. Nhưng chốt cứng thì
   * người chơi đổ hàng trăm nghìn vàng vào cấp 7-20 mà con số trên màn hình đứng im ở
   * 100, nhìn như tiền ném đi.
   *
   * Nên tách: total() lo cân bằng, show() lo phản hồi. Mỗi cấp vượt mốc 24 cộng 4 điểm
   * — con số nhích lên thấy được ngay sau mỗi lần mua. */
  PER_OVER: 4,
  /* ×100 CHỈ Ở PHẦN HIỂN THỊ (22/09/2026): cây kỹ năng toàn số hàng trăm (máu 440,
     sát thương 240/giây) mà lực chiến ghi 143 — nhìn như chỉ số rác. total() vẫn
     0-100 vì nó là hệ số độ khó; đổi thang ở đó là vỡ cả bảng cân bằng. */
  SCALE: 100,

  show() {
    const core = this.CORE_LV * SC.TREE_KEYS.length;
    const over = Math.max(0, SC.Tree.totalLevels() - core);
    // + mỗi 1% thuộc tính ẩn của gara tiến hóa = 1 lực chiến (chỉ phần HIỂN THỊ —
    // total() lo độ khó thì không đụng, cân bằng động của gara tự lo phần đó)
    return (this.total() + over * this.PER_OVER + SC.EvoGarage.totalPct()) * this.SCALE;
  },

  /* chuỗi hiển thị có dấu chấm nghìn, cùng kiểu số vàng (14.300) */
  fmt(n) { return Math.round(n).toLocaleString('vi-VN'); },

  /* hệ số riêng của biến thể đang chạy; chưa thành hình thì trung tính */
  _v(i) {
    const k = SC.Tree.variant();
    const v = k && this.VAR[k];
    return v ? v[i] : 1;
  },

  /* ---------- các mặt độ khó co giãn theo lực chiến ---------- */
  den()   { return (1 + this._t() * this.S.den) * this._v(0); },   // mật độ quái
  // × cân bằng động của gara tiến hóa: tàu mới ngấm dần vào độ khó trong 1-6 màn
  hp()    { return (1 + this._t() * this.S.hp) * this._v(1) * SC.EvoGarage.enemyHpMul(SC.Game.levelId || 1); },
  dmg()   { return (1 + this._t() * this.S.dmg) * SC.EvoGarage.enemyDmgMul(SC.Game.levelId || 1) * this.lateEase(); },

  /* HẠ SÁT THƯƠNG QUÁI CUỐI GAME (22/09/2026, phản hồi "từ màn 51 khó quá"): màn 51
     giảm 10%, trượt tuyến tính tới 15% ở màn 60 rồi giữ 15% cho cả vòng vô tận.
     Chỉ đụng SÁT THƯƠNG (mọi đòn trúng người chơi đều qua dmg()) — máu, mật độ, nhịp
     bắn giữ nguyên, nên màn vẫn dài và đông như cũ, chỉ bớt "một phát bay nửa cây máu". */
  LATE: SC.bal('power.lateDmg', { from: 51, full: 60, start: 0.90, end: 0.85 }),
  /* HẠ MẬT ĐỘ QUÁI CUỐI GAME (22/09/2026, phản hồi "từ màn 49 quá dày"): bớt PHẲNG 5%
     số quái mỗi wave từ màn 49 (cả vòng vô tận). Bản đầu 10%→20% bị hạ lại sau khi
     anh Đức test live: riêng giảm sát thương (LATE) đã đủ dễ thở. Chỉ SỐ CON — máu/đạn
     từng con không đổi. system-waves._buildWave nhân vào. */
  LATE_DEN: SC.bal('power.lateDensity', { from: 49, full: 49, start: 0.95, end: 0.95 }),
  lateDensity() { return this.lateEase(this.LATE_DEN); },

  lateEase(L = this.LATE) {
    const id = SC.Game.levelId || 1;
    if (id < L.from) return 1;
    const k = SC.clamp((id - L.from) / Math.max(1, L.full - L.from), 0, 1);
    return L.start + (L.end - L.start) * k;
  },
  fire()  { return 1 + this._t() * this.S.fire; },                 // nhịp bắn
  spd()   { return 1 + this._t() * this.S.spd; },                  // tốc độ di chuyển
  orbit() { return this._t() * this.S.orbit; },                    // độ cong đạn địch

  /* Bậc danh hiệu — để ở một chỗ duy nhất vì cả rank() lẫn next() đều đọc,
     và lobby dùng next() để nhắc "còn mấy điểm nữa lên hạng". */
  TIERS: [[0, 'TÂN BINH'], [25, 'CỨNG CÁP'], [45, 'THIỆN CHIẾN'], [65, 'TINH NHUỆ'], [85, 'HUYỀN THOẠI']],

  rank() {
    const p = this.total();
    let name = this.TIERS[0][1];
    for (const [need, n] of this.TIERS) if (p >= need) name = n;
    return name;
  },

  /* Bậc kế tiếp: { need, name } — trả null khi đã ở bậc cao nhất */
  next() {
    const p = this.total();
    // need theo thang HIỂN THỊ (×SCALE) — người chơi so với con số lực chiến họ thấy
    for (const [need, name] of this.TIERS) if (p < need) return { need: (need - p) * this.SCALE, name };
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

  /* Chấm từng nhiệm vụ. Ngoài cờ đạt/không còn kèm `miss` — câu nói rõ còn thiếu
     bao nhiêu, để bảng kết quả không chỉ báo trượt mà còn cho biết trượt sát cỡ nào. */
  evaluate(g) {
    return this.active.map(m => {
      const done = !!m.def.check(g, g.player, m.n);
      const got = m.def.got ? m.def.got(g, g.player) : 0;
      return {
        def: m.def,
        n: m.n,
        text: m.def.label(m.n),
        done,
        got,
        miss: (done || !m.def.miss) ? '' : m.def.miss(got, m.n)
      };
    });
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

  /* Số đo safe-area quy về đơn vị ảo, dành cho phía JS (xem SC.UI.moveBoss).
     Phía CSS tự tính lấy bằng env() nên không phụ thuộc hàm này — xem #ui trong
     style.css. Trừ phần khung sân khấu đã hụt sẵn do căn giữa. */
  _syncSafe() {
    const s = this._readSafe(), g = this._gap || 0;
    this.safe.top = Math.max(0, s.top - g) / this.scale;
    this.safe.bottom = Math.max(0, s.bottom - g) / this.scale;
  },

  /* Kiểm tra kích thước cửa sổ mỗi khung hình — bắt được cả trường hợp
     khung xem bị ẩn lúc tải (innerWidth = 0) rồi mới hiện ra sau. */
  poll() {
    const vw = Math.round(window.innerWidth);
    const vh = Math.round(window.visualViewport ? window.visualViewport.height : window.innerHeight);
    if (vw !== this._vw || vh !== this._vh) { this.layout(); return; }
    // iOS báo safe-area MUỘN mà không kèm resize, nên soát lại đều đặn thay vì
    // chỉ tin vào lần đo lúc dựng khung. 20 khung hình một lần là đủ nhạy mà không tốn.
    if ((this._tick = (this._tick || 0) + 1) % 20 === 0) this._syncSafe();
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

    // Khung sân khấu căn giữa nên phía trên đã hụt sẵn ngần này — CSS trừ đi để
    // không né tai thỏ hai lần. Hai biến này là tất cả những gì CSS cần từ JS.
    this._gap = Math.max(0, (vh - cssH) / 2);
    this.ui.style.setProperty('--vscale', this.scale);
    this.ui.style.setProperty('--stage-top', this._gap + 'px');
    this._syncSafe();

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
/* ===== js/system-sprite-art.js ===== */
/* system-sprite-art.js — nạp sprite AI (assets/art-game/*.webp) cho các lớp vẽ
 *
 * VÌ SAO CÓ: bộ art AI thay tạo hình canvas thủ tục, nhưng art thủ tục VẪN GIỮ
 * làm fallback — ảnh chưa tải xong (mạng chậm, offline lần đầu) thì game vẫn
 * chơi được với hình vẽ cũ, không màn hình trống.
 *
 * Cách dùng: SC.SpriteArt.get('enemy', e.type) trả về Image sẵn vẽ hoặc null.
 * Người gọi tự quyết fallback. Không có if (game === ...) — tra theo khoá.
 *
 * BẪY: EnemySprite và ShipArt nướng hình vào canvas đệm rồi cache. Ảnh tải xong
 * SAU khi cache đã dựng thì buffer giữ hình cũ mãi — nên onload phải xoá cache
 * hai chỗ đó để lần vẽ sau nướng lại bằng sprite.
 */
SC.SpriteArt = {
  enabled: true,            // công tắc tổng — tắt để so A/B với art thủ tục
  BASE: 'assets/art-game/',

  /* Khoá khớp e.type (enemy), khoá art của trùm/elite (data-biomes.js) */
  KEYS: {
    enemy: ['chick', 'hen', 'egg', 'dive', 'ufo', 'tank',
      'fly', 'gnat', 'hornet', 'beetle', 'dfly', 'moth', 'sparrow', 'locust',
      'mantis', 'hawk', 'ffly', 'scarab', 'vespa', 'crow', 'cicada', 'owl',
      'stag', 'falcon', 'queen', 'vulture', 'scorp', 'phoenix'],
    boss: ['hen', 'eagle', 'penguin', 'spider', 'phoenix', 'octopus',
      'neonRooster', 'scrapDragon', 'stormEye', 'voidEgg'],
    elite: ['scarecrow', 'scorpion', 'iceBear', 'wasp', 'golem', 'shark',
      'droneEye', 'crusher', 'thunderbird', 'voidPrism'],
    ship: ['player'],
    drone: ['swarm', 'sniper'],
    /* Chỉ đạn của QUÁI. Đạn người chơi giữ thủ tục: màu đạn là tín hiệu nhánh
     * vũ khí, đổi động theo mod — sprite tĩnh làm mất tín hiệu đó. */
    bullet: ['laser', 'arrow', 'dart', 'bounce', 'boomer', 'blast',
      'egg', 'plasma', 'rocket'],
    /* Mèo béo nhảy dù (thay phi công, 21/09/2026) — 3 mẫu rơi ngẫu nhiên,
     * entity-rescue.js chọn skin lúc thả dù */
    rescue: ['cat-fish', 'cat-goggles', 'cat-fish-torn', 'cat-goggles-torn'],   // -torn: dù bị bắn lủng
    /* Quái khắc chế (entity-enemy-counter.js): KHIÊN NGƯỢC = gà bông ôm khiên,
       GIÁP DÀY = tổ ong phun đàn ong (chọn mẫu 21/09/2026) */
    counter: ['guard', 'brute'],
  },

  /* Quái phải CHÚI XUỐNG phía người chơi. Tấm nào AI vẽ đầu hướng lên thì xoay
   * 180 độ lúc nướng buffer. Danh sách chốt bằng mắt trên _contact-sheet.png +
   * _orient-check.png. Không flip: hawk/scorp/tank/fly đã chúi xuống sẵn,
   * chick/ufo nhìn thẳng nên xoay là ngược đầu.
   * 21/09/2026: BỎ crow + beetle khỏi FLIP — art đổi từ côn trùng (đầu hướng lên)
   * sang gà máy/gà minion vẽ NHÌN THẲNG, giữ FLIP là treo ngược đầu gà. */
  FLIP: ['gnat', 'phoenix', 'scarab', 'egg', 'hen', 'cicada',
    'dfly', 'dive', 'falcon', 'ffly', 'hornet', 'locust', 'mantis', 'moth',
    'owl', 'queen', 'sparrow', 'stag', 'vespa', 'vulture'],

  _imgs: {},

  load() {
    for (const kind in this.KEYS) {
      for (const key of this.KEYS[kind]) {
        const img = new Image();
        img.src = this.BASE + kind + '-' + key + '.webp';
        img.onload = () => {
          // xoá cache buffer để nướng lại bằng sprite (xem BẪY ở đầu file)
          if (SC.EnemySprite) SC.EnemySprite._cache = {};
          if (SC.ShipArt) SC.ShipArt._cache = {};
        };
        this._imgs[kind + '-' + key] = img;
      }
    }
  },

  /* Trả Image khi đã tải xong và hợp lệ, ngược lại null để người gọi fallback */
  get(kind, key) {
    if (!this.enabled) return null;
    const img = this._imgs[kind + '-' + key];
    return (img && img.complete && img.naturalWidth) ? img : null;
  },

  flipped(key) { return this.FLIP.indexOf(key) >= 0; },
};

SC.SpriteArt.load();

;
/* ===== js/system-particles.js ===== */
/* system-particles.js — hạt hiệu ứng (nổ, lông gà, tia lửa) + số điểm bay lên */

SC.FX = {
  parts: [],
  texts: [],
  bolts: [],
  rings: [],

  clear() {
    this.parts.length = 0; this.texts.length = 0;
    this.bolts.length = 0; this.rings.length = 0;
  },

  /* Tia sét nối hai điểm — dùng cho hiệu ứng SÉT LAN của đạn.
     Đường gấp khúc sinh sẵn một lần rồi giữ nguyên: nhấp nháy lại từng khung thì
     mắt không đọc được nó đã nảy sang con nào. */
  /* Vòng sáng nở ra rồi tắt — dùng cho cú đạn chạm thân trùm.
     Chỉ một vòng mỏng chứ không phải quả cầu lửa: trùm ăn tới vài chục viên mỗi giây,
     hiệu ứng nào nặng hơn thế là che mất thân trùm và nuốt luôn khung hình. */
  ring(x, y, color, r0, r1, life) {
    this.rings.push({ x, y, c: color, r0, r1, life: life || 0.22, max: life || 0.22 });
  },

  bolt(x0, y0, x1, y1, color) {
    const seg = 5, pts = [];
    for (let i = 0; i <= seg; i++) {
      const t = i / seg, off = (i === 0 || i === seg) ? 0 : SC.rnd(-11, 11);
      pts.push(SC.lerp(x0, x1, t) + off, SC.lerp(y0, y1, t) + off);
    }
    this.bolts.push({ pts, c: color, life: 0.16, max: 0.16 });
  },

  /* Trần số hạt sống cùng lúc. Đo ở map 56 lúc đông quái: hạt dồn lên hơn 1.300 con,
     tốn 1,5ms mỗi khung mà mắt người chẳng phân biệt nổi 400 với 1.300 hạt lửa.
     Chạm trần thì bỏ hạt CŨ NHẤT — hạt mới luôn là thứ người chơi đang nhìn. */
  MAX: 420,

  _room(n) {
    const over = this.parts.length + n - this.MAX;
    if (over > 0) this.parts.splice(0, over);
  },

  /* vụ nổ tròn */
  burst(x, y, color, count = 14, power = 220, size = 3) {
    count = Math.round(count * SC.CFG.fxScale);
    this._room(count);
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
    this._room(count);
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
    if (this.parts.length >= this.MAX) return;   // khói là thứ hy sinh đầu tiên
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
    for (let i = this.bolts.length - 1; i >= 0; i--)
      if ((this.bolts[i].life -= dt) <= 0) this.bolts.splice(i, 1);
    for (let i = this.rings.length - 1; i >= 0; i--)
      if ((this.rings[i].life -= dt) <= 0) this.rings.splice(i, 1);
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
    for (const r of this.rings) {
      const k = SC.clamp(r.life / r.max, 0, 1);
      ctx.globalAlpha = k * 0.9;
      ctx.strokeStyle = r.c;
      ctx.lineWidth = 1 + k * 2.6;                 // mảnh dần khi nở ra
      ctx.beginPath();
      ctx.arc(r.x, r.y, SC.lerp(r.r1, r.r0, k), 0, 6.283);
      ctx.stroke();
    }
    for (const b of this.bolts) {
      ctx.globalAlpha = SC.clamp(b.life / b.max, 0, 1);
      ctx.strokeStyle = b.c; ctx.lineWidth = 2.6; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(b.pts[0], b.pts[1]);
      for (let i = 2; i < b.pts.length; i += 2) ctx.lineTo(b.pts[i], b.pts[i + 1]);
      ctx.stroke();
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
    // Lần chỉnh thứ tư: 0.22 -> 0.15. Bom rơi khá dày ở map đông quái nên chớp nào
    // cũng thấy; ở mức này nó chỉ còn là gợn sáng ở rìa mắt.
    const a = k * k * 0.15;
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

    // Bong bóng nhỏ lại 30% (0.30 -> 0.21 bề ngang màn). Chữ tính theo R nên co theo
    // cùng tỉ lệ, giữ nguyên cân đối. Lý do: bong bóng cũ chiếm gần hết bề ngang,
    // che mất quái đang bay tới đúng lúc vừa nổ bom là lúc màn hình đông nhất.
    const R = SC.W * 0.21 * s;
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
    // đã có ảnh AI (mây vẽ sẵn trong ảnh) thì mây elip vẽ tay chỉ còn làm lớp gần mờ —
    // để nguyên độ đậm là hai kiểu mây chồng nhau, lộ ngay mảng elip giả
    const cloudK = this._art(ctx, b.id) ? 0.4 : 1;

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
      ctx.globalAlpha = c.a * cloudK;
      ctx.fillStyle = b.cloud;
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.s, c.s * 0.42, 0, 0, 6.283);
      ctx.ellipse(c.x + c.s * 0.55, c.y + c.s * 0.1, c.s * 0.62, c.s * 0.3, 0, 0, 6.283);
      ctx.fill();
    }
    ctx.restore();
  },

  /* Nền AI mỗi vùng (assets/art-game/bg-<id>.webp) — lớp XA NHẤT, cuộn chậm hơn đồi
     để còn chiều sâu. Ảnh đã được tools/make-bg-loops.py crossfade đầu-cuối nên xếp
     chồng dọc không lộ đường nối, và đã chặn độ sáng cho tối hơn máy bay.
     Chưa tải xong / thiếu file thì chỉ còn gradient trời — không bao giờ màn đen. */
  ART_SPEED: 18,
  _imgs: {},

  _art(ctx, id) {
    let im = this._imgs[id];
    if (!im) {
      im = this._imgs[id] = new Image();
      im.src = `assets/art-game/bg-${id}.webp`;
    }
    if (!im.complete || !im.naturalWidth) return false;
    const h = Math.ceil(im.naturalHeight * SC.W / im.naturalWidth);
    // Math.floor: toạ độ lẻ làm hai tấm kề nhau hở 1px đường sáng khi cuộn
    const oy = Math.floor((this.scroll * this.ART_SPEED) % h);
    for (let y = oy - h; y < SC.H; y += h) ctx.drawImage(im, 0, y, SC.W, h);
    return true;
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
/* ===== js/entity-bullet-mods.js ===== */
/* entity-bullet-mods.js — ba hiệu ứng gắn lên đạn của người chơi
 *
 * Điểm quan trọng về mặt thiết kế: kiểu đạn cuối cùng KHÔNG do nhánh vũ khí tự quyết,
 * mà do TỔ HỢP với hai nhánh kia. Nhờ vậy chọn khiên hay chọn phi đội cũng thay đổi
 * cảm giác bắn — nếu không thì ba nhánh sẽ chẳng liên quan gì tới nhau và "tổ hợp"
 * chỉ là cái tên.
 *
 *   SÉT LAN    (khiên PHẢN CHIẾU) — trúng địch thì nảy sang 2-3 con gần nhất
 *   DỘI TƯỜNG  (khiên TỪ TRƯỜNG)  — đạn bật khỏi mép màn, phủ được góc chết
 *   ĐẠN DÍ     (phi đội SÁT THỦ)  — đạn bẻ lái nhẹ theo mục tiêu gần nhất
 *
 * Cả ba chỉ mở từ TIẾN HOÁ 1 (cả bốn nhánh đạt cấp 3) — đó là thứ làm cho mốc tiến
 * hoá đáng chờ, thay vì chỉ là một dòng chữ trôi qua.
 */

SC.Mods = {
  CHAIN_R: 150,        // tầm nảy của sét lan
  CHAIN_MUL: 0.5,      // đòn nảy chỉ ăn nửa sát thương
  SEEK_TURN: 2.2,      // rad/giây — bẻ lái nhẹ thôi, không phải hoả tiễn dò tìm
  BOUNCE_MAX: 2,

  /* Gắn hiệu ứng lúc sinh đạn, đọc thẳng từ hướng đã chọn */
  attach(b) {
    const evo = SC.Tree.evo();
    if (evo < 1) return;
    const sh = SC.Tree.path('shield'), dr = SC.Tree.path('drone');
    if (sh === 'B') b.chain = evo >= 2 ? 3 : 2;
    else if (sh === 'A') b.bounce = evo >= 2 ? this.BOUNCE_MAX : 1;
    if (dr === 'B') b.seek = 1;
  },

  /* Gọi mỗi khung cho từng viên đạn ta, TRƯỚC khi cộng vận tốc vào toạ độ */
  update(b, dt, enemies) {
    if (b.seek) {
      const t = SC.Bullets._nearest(b, enemies);
      if (t) {
        const want = SC.angTo(b.x, b.y, t.x, t.y);
        const cur = Math.atan2(b.vy, b.vx);
        let d = want - cur;
        while (d > Math.PI) d -= 6.283;
        while (d < -Math.PI) d += 6.283;
        const na = cur + SC.clamp(d, -this.SEEK_TURN * dt, this.SEEK_TURN * dt);
        const sp = Math.hypot(b.vx, b.vy);
        b.vx = Math.cos(na) * sp; b.vy = Math.sin(na) * sp;
      }
    }
  },

  /* Bật khỏi mép màn. Trả true nếu viên đạn vẫn còn sống sau khi chạm mép. */
  wall(b) {
    if (!b.bounce) return false;
    if (b.x > 6 && b.x < SC.W - 6) return false;
    b.x = SC.clamp(b.x, 7, SC.W - 7);
    b.vx = -b.vx;
    b.bounce--;
    b.bounced = (b.bounced || 0) + 1;      // mỗi lần dội màu nhạt đi, mắt còn theo kịp
    b.life = Math.max(b.life, 0.5);        // nới tầm chút để cú dội có chỗ mà tới đích
    SC.FX.burst(b.x, b.y, '#9ad8ff', 4, 140, 1.4);
    return true;
  },

  /* Trúng địch: sét lan nảy sang các con gần nhất. Đòn nảy KHÔNG kích hoạt nảy tiếp
     (không có b.chain) nên chuỗi luôn hữu hạn — chỗ này mà sơ là sát thương vô hạn. */
  onHit(b, e, g) {
    if (!b.chain) return;
    const hit = [];
    for (const o of g.enemies) {
      if (o.dead || o === e) continue;
      if (SC.dist2(e.x, e.y, o.x, o.y) < this.CHAIN_R * this.CHAIN_R) hit.push(o);
      if (hit.length >= b.chain) break;
    }
    const dmg = Math.max(1, Math.round(b.dmg * this.CHAIN_MUL));
    for (const o of hit) {
      SC.FX.bolt(e.x, e.y, o.x, o.y, '#bfe9ff');
      // Truyền viên đạn gốc vào: nếu không, đòn nảy thành đòn "vô hướng" và xuyên
      // thẳng qua lá chắn của quái KHIÊN NGƯỢC — một lỗ hổng đủ để vô hiệu hoá cả
      // cơ chế khắc chế chỉ bằng cách chọn nhánh khiên phản chiếu.
      if (o.hurt(dmg, b)) SC.Combat.killEnemy(g, o);
    }
    if (hit.length) SC.Audio.hit();
  }
};

;
/* ===== js/entity-foe-bullet.js ===== */
/* entity-foe-bullet.js — sáu loại đạn mới của quái: hành vi và tạo hình
 *
 * Bản cũ chỉ có trứng, plasma và hoả tiễn, nên 60 map chỉ có ba thứ phải né. Sáu loại
 * dưới đây mỗi loại đòi một CÁCH NÉ khác nhau, đó mới là điểm chứ không phải cho đẹp:
 *
 *   laser   nhanh nhất, đi thẳng   -> phải dịch sớm, thấy rồi mới né là muộn
 *   arrow   nhanh, mũi nhọn        -> né ngang được nhưng khe hẹp
 *   dart    chậm, bắn nhiều viên   -> né bằng cách đọc khe giữa chùm
 *   bounce  dội hai mép màn        -> nấp sát mép là chỗ NGUY HIỂM nhất
 *   boomer  bay ra rồi vòng lại    -> né xong đừng vội quay về chỗ cũ
 *   blast   chậm, nổ ra 5 mảnh     -> phải bắn chặn hoặc rời khỏi vùng nổ sớm
 */

SC.FoeBullet = {
  R: { laser: 5, arrow: 6, dart: 5, bounce: 7, boomer: 9, blast: 9 },
  LIFE: { laser: 4, arrow: 4, dart: 5, bounce: 7, boomer: 3.2, blast: 2.6 },

  is(kind) { return this.R[kind] !== undefined; },
  radius(kind) { return this.R[kind] || 6; },
  life(kind) { return this.LIFE[kind] || 6; },

  /* Gọi mỗi khung TRƯỚC khi cộng vận tốc vào toạ độ. Trả false nếu viên đạn đã tự huỷ. */
  update(b, dt, player) {
    switch (b.kind) {
      case 'bounce':
        // dội ở hai mép màn, tối đa 2 lần rồi thôi — dội mãi thì không đọc nổi đường đạn
        if ((b.x < 8 && b.vx < 0) || (b.x > SC.W - 8 && b.vx > 0)) {
          if ((b.bn = (b.bn || 0) + 1) > 2) return true;
          b.x = SC.clamp(b.x, 9, SC.W - 9);
          b.vx = -b.vx;
          SC.FX.burst(b.x, b.y, '#ff9d5c', 4, 130, 1.6);
        }
        break;

      case 'boomer':
        // bay ra 0.85 giây rồi quay ngược lại, nên chỗ vừa né xong lát nữa lại nguy hiểm
        b.bt = (b.bt || 0) + dt;
        if (b.bt > 0.85 && !b.back) { b.back = 1; b.vx = -b.vx * 0.85; b.vy = -b.vy * 0.85; }
        b.rot += dt * 14;
        break;

      case 'blast':
        // nổ khi hết hạn: 5 mảnh plasma toả đều, người chơi phải rời vùng trước lúc đó
        if (b.life - dt <= 0) {
          for (let i = 0; i < 5; i++) {
            const a = (6.283 / 5) * i + b.rot;
            SC.Bullets.spawnFoe(b.x, b.y, Math.cos(a) * 230, Math.sin(a) * 230, 'plasma');
          }
          SC.FX.burst(b.x, b.y, '#ff8a2b', 16, 260, 3);
          SC.Audio.hit();
          return true;
        }
        b.rot += dt * 3;
        break;
    }
    return false;
  },

  /* ---------- tạo hình bằng sprite AI ----------
   * Thay phần THÂN đạn; GIỮ toàn bộ glow và nhấp nháy cảnh báo — chúng là tín
   * hiệu né đạn, không phải trang trí. Quy ước sprite: mũi hướng LÊN trong frame
   * gốc, xoay theo vận tốc bằng đúng góc art cũ dùng. Gồm cả 3 loại đời đầu
   * (egg/plasma/rocket) mà entity-bullet.js chuyển sang đây khi có sprite. */
  drawSprite(ctx, b, img) {
    const a = Math.atan2(b.vy, b.vx) + Math.PI / 2;
    const S = { laser: 46, arrow: 28, dart: 20, bounce: 18, boomer: 22,
      blast: 22, egg: 22, plasma: 15, rocket: 30 };
    const s = S[b.kind] || 20;
    switch (b.kind) {
      case 'laser': SC.draw.glow(ctx, b.x, b.y, 18, '#ff4d7a', .55); break;
      case 'arrow': SC.draw.glow(ctx, b.x, b.y, 13, '#ffb45c', .5); break;
      case 'bounce': SC.draw.glow(ctx, b.x, b.y, 15, '#ff9d5c', .55); break;
      case 'boomer': SC.draw.glow(ctx, b.x, b.y, 20, '#c58cff', .5); break;
      case 'plasma': SC.draw.glow(ctx, b.x, b.y, 13, '#ff3b5c', .6); break;
    }
    ctx.save(); ctx.translate(b.x, b.y);
    let k = 1;
    if (b.kind === 'blast') {
      // giữ nhịp phồng nhanh dần khi sắp nổ — cảnh báo không lời của art cũ
      const near = SC.clamp(1 - b.life / 0.9, 0, 1);
      k = 1 + Math.sin(b.rot * (6 + near * 26)) * (0.12 + near * 0.3);
      SC.draw.glow(ctx, 0, 0, 24 * k, '#ff6b2b', .6);
    } else if (b.kind === 'boomer') ctx.rotate(b.rot);
    // trứng: art cũ là hình oval nên chỉ lắc; sprite mới có mũi rõ ràng nên phải
    // xoay theo chiều rơi trước rồi mới lắc, không thì trứng rơi ngược đầu
    else if (b.kind === 'egg') ctx.rotate(a + b.rot * .3);
    else if (b.kind !== 'bounce' && b.kind !== 'plasma') ctx.rotate(a);
    if (b.kind === 'rocket') SC.draw.glow(ctx, 0, 10, 22, '#ffb45c', .7);  // lửa đuôi
    ctx.drawImage(img, -s / 2 * k, -s / 2 * k, s * k, s * k);
    ctx.restore();
  },

  /* ---------- tạo hình ---------- */
  render(ctx, b) {
    const a = Math.atan2(b.vy, b.vx) + Math.PI / 2;
    switch (b.kind) {
      case 'laser':
        SC.draw.glow(ctx, b.x, b.y, 18, '#ff4d7a', .55);
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(a);
        ctx.fillStyle = 'rgba(255,120,150,.9)'; ctx.fillRect(-2, -20, 4, 40);
        ctx.fillStyle = '#fff'; ctx.fillRect(-1, -16, 2, 32);
        ctx.restore();
        break;

      case 'arrow':
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(a);
        SC.draw.glow(ctx, 0, 0, 13, '#ffb45c', .5);
        ctx.fillStyle = '#ffd08a'; ctx.strokeStyle = 'rgba(10,16,32,.8)'; ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(0, 12); ctx.lineTo(4, -2); ctx.lineTo(0, -12); ctx.lineTo(-4, -2);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.restore();
        break;

      case 'dart':
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(a);
        ctx.fillStyle = '#e0f0ff'; ctx.strokeStyle = 'rgba(10,16,32,.75)'; ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(0, 9); ctx.lineTo(3.2, -4); ctx.lineTo(0, -1.5); ctx.lineTo(-3.2, -4);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.restore();
        break;

      case 'bounce':
        SC.draw.glow(ctx, b.x, b.y, 15, '#ff9d5c', .55);
        ctx.fillStyle = '#ffc48a';
        ctx.strokeStyle = 'rgba(10,16,32,.75)'; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(b.x, b.y, 7, 0, 6.283); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,.7)';
        ctx.beginPath(); ctx.arc(b.x - 2, b.y - 2, 2.4, 0, 6.283); ctx.fill();
        break;

      case 'boomer':
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.rot);
        SC.draw.glow(ctx, 0, 0, 20, '#c58cff', .5);
        ctx.strokeStyle = '#d9b4ff'; ctx.lineWidth = 4.5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.arc(0, 0, 8, -0.5, 2.4); ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,.65)'; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(0, 0, 8, -0.4, 2.2); ctx.stroke();
        ctx.restore();
        break;

      case 'blast': {
        // nhấp nháy nhanh dần khi sắp nổ — cảnh báo đọc được mà không cần chữ
        const near = SC.clamp(1 - b.life / 0.9, 0, 1);
        const pulse = 1 + Math.sin(b.rot * (6 + near * 26)) * (0.12 + near * 0.3);
        SC.draw.glow(ctx, b.x, b.y, 24 * pulse, '#ff6b2b', .6);
        ctx.fillStyle = near > 0.5 ? '#fff0c2' : '#ff8a3f';
        ctx.strokeStyle = 'rgba(10,16,32,.8)'; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(b.x, b.y, 9 * pulse, 0, 6.283); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(60,20,0,.55)';
        ctx.beginPath(); ctx.arc(b.x, b.y, 3.4, 0, 6.283); ctx.fill();
        break;
      }
    }
  }
};

;
/* ===== js/entity-bullet.js ===== */
/* entity-bullet.js — đạn người chơi (kể cả tên lửa dò tìm) và đạn địch */

SC.Bullets = {
  mine: [],   // đạn của người chơi
  foe: [],    // đạn của địch

  clear() { this.mine.length = 0; this.foe.length = 0; },

  /* Trả về chính viên đạn vừa sinh để bên gọi gắn thêm thuộc tính (xuyên, tầm,
     hiệu ứng sét/dội/dí) mà không phải mò lại phần tử cuối mảng. */
  spawnMine(x, y, vx, vy, dmg, kind = 'shot') {
    const b = {
      x, y, vx, vy, dmg, kind, target: null, life: 3,
      r: kind === 'lance' ? 7 : kind === 'laser' ? 6 : 4
    };
    this.mine.push(b);
    return b;
  },

  spawnFoe(x, y, vx, vy, kind = 'egg') {
    const ext = SC.FoeBullet.is(kind);
    const b = {
      x, y, vx, vy, kind, rot: 0,
      r: ext ? SC.FoeBullet.radius(kind) : kind === 'egg' ? 8 : kind === 'rocket' ? 7 : 6,
      // hoả tiễn bay lâu hơn vì lúc đầu nó vọt lên rồi mới vòng xuống
      life: ext ? SC.FoeBullet.life(kind) : kind === 'rocket' ? 4.5 : 6
    };
    this.foe.push(b);
    return b;
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
      SC.Mods.update(b, dt, enemies);
      b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt;
      // Đạn dội tường bật ở mép trái/phải thay vì biến mất
      if (b.bounce) SC.Mods.wall(b);
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

      // sáu loại đạn mới: dội mép, boomerang, đạn nổ... xem entity-foe-bullet.js
      if (SC.FoeBullet.is(b.kind) && SC.FoeBullet.update(b, dt, player)) {
        this.foe.splice(i, 1);
        continue;
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
      // đạn dội mép được phép chạm hai biên, đừng xoá nó ở đó
      const sideOut = b.kind === 'bounce' ? (b.x < -60 || b.x > SC.W + 60)
        : (b.x < -40 || b.x > SC.W + 40);
      if (b.life <= 0 || b.y > SC.H + 30 || b.y < -60 || sideOut)
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
      // Đạn TRÀN ĐẠN có tầm giới hạn: mờ dần ở cuối tầm để người chơi ĐỌC ĐƯỢC
      // vì sao nó tắt, thay vì tưởng game lỗi. Đạn đã dội tường cũng nhạt dần.
      ctx.globalAlpha = Math.min(
        b.ttl ? SC.clamp(b.life / 0.18, 0.15, 1) : 1,
        b.bounced ? 1 - b.bounced * 0.22 : 1
      );
      if (b.kind === 'lance') {
        // giáo năng lượng: dài, mảnh, xuyên qua cả hàng
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(Math.atan2(b.vy, b.vx) + Math.PI / 2);
        SC.draw.glow(ctx, 0, 0, 24, '#5ad0ff', .6);
        const g = ctx.createLinearGradient(0, -26, 0, 18);
        g.addColorStop(0, '#ffffff'); g.addColorStop(0.4, '#7ae8ff'); g.addColorStop(1, 'rgba(90,208,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(0, -26); ctx.lineTo(4.5, 6); ctx.lineTo(0, 18); ctx.lineTo(-4.5, 6);
        ctx.closePath(); ctx.fill();
        ctx.restore();
      } else if (b.kind === 'missile') {
        ctx.fillStyle = '#ffd23f';
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(Math.atan2(b.vy, b.vx) + Math.PI / 2);
        ctx.fillRect(-2.5, -7, 5, 14); ctx.restore();
        SC.draw.glow(ctx, b.x, b.y, 14, '#ff9a2b', .55);
      } else if (b.kind === 'laser') {
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(Math.atan2(b.vy, b.vx) + Math.PI / 2);
        ctx.fillStyle = 'rgba(120,240,255,.9)';
        ctx.fillRect(-3, -16, 6, 32);
        ctx.restore();
        SC.draw.glow(ctx, b.x, b.y, 20, '#3fe0ff', .5);
      } else {
        SC.draw.glow(ctx, b.x, b.y, 15, '#ff8a1f', .65);
        // Lõi đạn vẽ ở chế độ thường để giữ đúng màu cam vàng, và XOAY THEO HƯỚNG BAY:
        // từ khi máy bay bắn được sang hai bên, viên đạn vẽ dọc cứng sẽ nằm ngang thân
        // mà đầu vẫn chĩa lên — nhìn như đạn bay ngang kiểu cua bò.
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        ctx.translate(b.x, b.y); ctx.rotate(Math.atan2(b.vy, b.vx) + Math.PI / 2);
        ctx.fillStyle = '#ff9d1f';
        ctx.beginPath(); ctx.ellipse(0, 3, 3, 10, 0, 0, 6.283); ctx.fill();
        ctx.fillStyle = '#fff3c2';
        ctx.beginPath(); ctx.ellipse(0, -2, 1.8, 5, 0, 0, 6.283); ctx.fill();
        ctx.restore();
      }
    }
    ctx.restore();

    /* đạn địch — có sprite AI thì dùng (kể cả egg/plasma/rocket đời đầu),
       chưa tải xong thì rơi về art thủ tục bên dưới */
    for (const b of this.foe) {
      const img = SC.SpriteArt && SC.SpriteArt.get('bullet', b.kind);
      if (img) {
        SC.FoeBullet.drawSprite(ctx, b, img);
      } else if (SC.FoeBullet.is(b.kind)) {
        SC.FoeBullet.render(ctx, b);
      } else if (b.kind === 'egg') {
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
/* ===== js/entity-enemy-counter.js ===== */
/* entity-enemy-counter.js — ba loại quái khắc chế, thứ giữ cho cây kỹ năng không vỡ
 *
 * Sáu phase trước làm cây ĐA DẠNG. Phần này làm nó KHÔNG VỠ. Bỏ đi thì kết cục vẫn
 * giống bản cũ: chọn xong build là đứng yên bắn.
 *
 *   GIÁP DÀY    máu cao, chậm, chỉ ăn 30% sát thương từ ĐẠN NHỎ
 *               -> khắc tràn đạn và bầy đàn: phải có nguồn sát thương đơn mục tiêu
 *   BẦY MUỖI    12 con nhỏ, nhanh, vây từ hai bên
 *               -> khắc xuyên phá và sát thủ: phải biết dạt ra, dùng khiên/drone dọn
 *   KHIÊN NGƯỢC có lá chắn TRƯỚC MẶT, chỉ ăn đòn từ phía sau hoặc bên sườn
 *               -> khắc MỌI build đứng yên bắn thẳng
 *
 * KHIÊN NGƯỢC là con quan trọng nhất: nó ăn khớp thẳng với cơ chế quay đầu bắn ngược
 * (system-facing.js) và biến "đứng yên bắn" thành lối chơi KHÔNG KHẢ THI, chứ không
 * chỉ là kém tối ưu. Đứng yên thì mọi viên đạn đều đi lên và đều bị chặn.
 */

SC.EnemyCounter = {
  DEF: SC.bal('counterEnemies', {
    brute: { hp: 70, r: 30, spd: 22,  score: 90, drop: .90, fire: 0,   move: 'brute' },
    midge: { hp: 2,  r: 9,  spd: 155, score: 8,  drop: .10, fire: 0,   move: 'midge' },
    // Máu 90 chứ không phải 40: bom nổ diện rộng không đi qua lá chắn nào cả, nên với
    // 40 máu thì bốn quả bom nhặt được trong màn là dọn sạch quái chắn — người chơi
    // đứng yên vẫn qua map mà chẳng phải đổi chỗ đứng lần nào.
    guard: { hp: 90, r: 24, spd: 34,  score: 70, drop: .70, fire: 1.9, move: 'guard' }
  }),
  TYPES: ['brute', 'midge', 'guard'],
  /* Bốn núm chỉnh của cơ chế khắc chế, để trong Excel sheet KhacChe */
  K: SC.bal('counter', { fromLevel: 9, guardFrom: 25, guardMax: 2, arc: 2.75, smallDmg: 7, bruteCut: 0.42 }),
  /* Map nào gặp loại nào. Nửa đầu chiến dịch mỗi map chỉ MỘT loại: gặp cả ba cùng
     lúc là ức chế chứ không phải thử thách, và người chơi cần thời gian học từng con.
     Bỏ qua map trùm — trận trùm đã đủ việc rồi. */
  forLevel(lv) {
    if (lv.id < this.K.fromLevel || lv.boss) return null;
    return this.TYPES[(lv.id / 2 | 0) % 3];
  },

  /* Từ nửa sau chiến dịch, KHIÊN NGƯỢC có mặt ở MỌI map, kể cả map trùm (chỉ ở phần
     wave trước khi trùm ra). Đo được: lối chơi đứng yên chỉ thật sự sụp ở map CÓ con
     này — hai loại kia gây khó chịu nhưng vẫn đứng yên mà qua được; và nếu tha map
     trùm thì một phần ba chiến dịch vẫn là lỗ thủng.
     Trần cố định 2 con: đông hơn là thành bức tường không gỡ nổi, không phải thử thách. */
  guardCount(lv) {
    if (lv.id < this.K.guardFrom) return 0;
    if (this.forLevel(lv) === 'guard') return 0;      // map đó đã tới lượt rồi
    return this.K.guardMax;
  },

  is(type) { return !!this.DEF[type]; },

  /* ---------- lọc sát thương ---------- */
  /* src là viên đạn gây đòn (có vx/vy). Không có src — sát thương từ khiên từ trường,
     từ bom, từ va chạm thân — thì ăn đủ: đó là lối thoát hợp lệ cho các build cận chiến. */
  filter(e, dmg, src) {
    // Cắt 42% chứ không phải 70% như bản đầu: build tràn đạn + bầy đàn KHÔNG có nguồn
    // sát thương đơn mục tiêu nào cả, cắt quá sâu thì nó không còn cách nào ngoài lấy
    // khiên từ trường ra ủi — như vậy là "bắt buộc phải có build đúng", đúng thứ đã
    // hứa là không làm.
    if (e.type === 'brute' && dmg <= this.K.smallDmg)
      return Math.max(1, Math.round(dmg * this.K.bruteCut));

    if (e.type === 'guard' && src && src.vx !== undefined) {
      // Lá chắn phủ nón 140° ở mặt dưới: đạn bay lên trong khoảng ±70° quanh phương
      // thẳng đứng đều bị chặn. Muốn ăn đòn thì phải bắn từ ngang hoặc từ trên xuống.
      //
      // Hai lần chỉnh trước đều hỏng, ghi lại để đừng lặp:
      //  - nón 90° theo VẬN TỐC: đạn dí bẻ lái nên vector cuối nằm ngang -> lọt.
      //  - xét theo VỊ TRÍ lúc chạm: lúc đó viên đạn đã nằm trong thân quái nên
      //    hiệu toạ độ chỉ còn là nhiễu, chặn hay không thành ra ngẫu nhiên.
      if (src.vy < 0 && Math.abs(src.vx) < this.K.arc * -src.vy) {
        e.blocked = 0.14;
        return 0;
      }
    }
    return dmg;
  },

  /* ---------- di chuyển ---------- */
  move(e, dt, player) {
    switch (e.type) {
      case 'brute':                        // ì ạch đi xuống, lắc nhẹ
        e.y += e.spd * dt;
        e.x = e.x0 + Math.sin(e.t * 0.7) * 30;
        /* TỔ ONG (21/09/2026): giáp-dày-trôi-xuống bị chê nhạt — giờ nó là tổ ong
           di động, định kỳ PHUN MỘT ĐÀN ONG toả về phía người chơi (tái dùng quái
           midge, sẵn hành vi vây ép). Trần tổng ong sống chặn spam khi màn có
           nhiều tổ; nhịp đầu 1.6s cho người chơi kịp thấy tổ trước khi ong ra. */
        e.hiveT = (e.hiveT === undefined ? 1.6 : e.hiveT) - dt;
        if (e.hiveT <= 0) {
          e.hiveT = 4.2;
          const song = SC.Game.enemies.filter(x => !x.dead && x.type === 'midge').length;
          const n = Math.min(4, Math.max(0, 9 - song));
          for (let i = 0; i < n; i++) {
            SC.Game.enemies.push(new SC.Enemy('midge',
              e.x + (i - (n - 1) / 2) * 26, e.y + e.r * 0.6, SC.Game.lv));
          }
          if (n) {
            SC.FX.text(e.x, e.y - e.r - 12, 'ĐÀN ONG!', '#ffd23f');
            SC.FX.burst(e.x, e.y + e.r * 0.5, '#ffd23f', 14, 220, 3);
            SC.Audio.wave();
          }
        }
        break;
      case 'midge':                        // vòng từ hai bên rồi ép vào người chơi
        if (e.y < SC.H * 0.34) e.y += e.spd * dt;
        else {
          const a = SC.angTo(e.x, e.y, player.x, player.y);
          e.x += Math.cos(a) * e.spd * 0.85 * dt + Math.sin(e.t * 7) * 40 * dt;
          e.y += Math.sin(a) * e.spd * 0.85 * dt;
        }
        break;
      case 'guard':
        // Xuống lưng chừng rồi ĐỨNG NGUYÊN chắn ngang, chỉ đi qua lại.
        // Không được trôi xuống dù chỉ vài pixel mỗi giây: bản đầu cho nó trôi 6px/s,
        // đo ra người chơi đứng yên vẫn thắng vì sau ~80 giây nó tự bò tới tận nơi rồi
        // chết vì va chạm. Trôi xuống là tự tay vô hiệu hoá cả cơ chế khắc chế.
        if (e.y < SC.H * 0.36) e.y += e.spd * dt;
        else e.y += e.retreat() * dt;
        e.x += e.dir * e.spd * 1.1 * dt;
        if (e.x < 46 || e.x > SC.W - 46) e.dir *= -1;
        break;
    }
    if (e.blocked > 0) e.blocked -= dt;
  },

  /* ---------- tạo hình ---------- */
  render(ctx, e) {
    const r = e.r;
    if (e.type === 'brute') {
      // Sprite TỔ ONG (chọn 21/09/2026 từ 3 mẫu AI) — nhịp phun đàn ong ở move().
      // Ảnh chưa tải thì rơi về hình giáp dày vẽ tay cũ, như mọi sprite khác.
      const img = SC.SpriteArt.get('counter', 'brute');
      if (img) {
        const s = r * 2.6;
        // phập phồng nhẹ theo đồng hồ tổ: sắp phun thì nở ra — người chơi ĐỌC được nhịp
        const nhip = e.hiveT !== undefined && e.hiveT < 0.8 ? 1 + (0.8 - e.hiveT) * 0.12 : 1;
        ctx.drawImage(img, -s * nhip / 2, -s * nhip / 2, s * nhip, s * nhip);
        return;
      }
      SC.draw.ink(ctx, r * 0.11);
      ctx.fillStyle = SC.draw.shade(ctx, r, r, '#3b4a63', '#cfdcee');
      ctx.beginPath(); ctx.ellipse(0, 0, r * .92, r, 0, 0, 6.283); ctx.fill(); ctx.stroke();
      // ba tấm giáp bản to — dấu hiệu "đạn nhỏ vô dụng"
      ctx.fillStyle = '#8d9db8';
      for (let i = -1; i <= 1; i++) {
        SC.draw.roundRect(ctx, -r * .8, i * r * .46 - r * .16, r * 1.6, r * .32, 4);
        ctx.fill(); ctx.stroke();
      }
      ctx.fillStyle = '#ff3b5c';
      ctx.beginPath(); ctx.arc(0, -r * .1, r * .2, 0, 6.283); ctx.fill();
      return;
    }

    if (e.type === 'midge') {
      const flap = 0.5 + Math.sin(e.t * 30) * 0.45;
      ctx.fillStyle = 'rgba(200,255,180,.55)';
      ctx.beginPath(); ctx.ellipse(-r * .9, -r * .2, r * .8, r * .35 * flap, -.5, 0, 6.283); ctx.fill();
      ctx.beginPath(); ctx.ellipse(r * .9, -r * .2, r * .8, r * .35 * flap, .5, 0, 6.283); ctx.fill();
      SC.draw.ink(ctx, r * .2);
      ctx.fillStyle = SC.draw.shade(ctx, r * .6, r, '#4a6b2f', '#c8f08a');
      ctx.beginPath(); ctx.ellipse(0, 0, r * .6, r, 0, 0, 6.283); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#ff3b5c';
      ctx.beginPath(); ctx.arc(0, -r * .55, r * .26, 0, 6.283); ctx.fill();
      return;
    }

    // KHIÊN NGƯỢC — lá chắn ở mặt dưới phải NHÌN LÀ THẤY, nếu không người chơi chỉ
    // thấy "con này bắn mãi không chết" và tưởng game lỗi.
    // Sprite gà bông tím ôm khiên vàng (21/09/2026, chọn từ 4 mẫu AI): khiên TĨNH đã
    // nằm trong ảnh, nên vành thủ tục chỉ còn vẽ lúc CHẶN ĐÒN làm lớp loé phản hồi.
    const img = SC.SpriteArt.get('counter', 'guard');
    if (img) {
      const s = r * 2.7;
      ctx.drawImage(img, -s / 2, -s / 2, s, s);
    } else {
      SC.draw.ink(ctx, r * .12);
      ctx.fillStyle = SC.draw.shade(ctx, r * .85, r * .85, '#5a3f7a', '#e0c9ff');
      ctx.beginPath(); ctx.ellipse(0, -r * .1, r * .78, r * .85, 0, 0, 6.283); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#ffd23f';
      ctx.beginPath(); ctx.arc(0, -r * .25, r * .24, 0, 6.283); ctx.fill();
    }

    const lit = e.blocked > 0 ? 0.95 : 0.5;
    if (!img || e.blocked > 0) {
      ctx.strokeStyle = `rgba(255,214,63,${lit})`;
      ctx.lineWidth = e.blocked > 0 ? 5 : 3.4;
      ctx.beginPath(); ctx.arc(0, 0, r * 1.15, 0.24, Math.PI - 0.24); ctx.stroke();
    }
    if (e.blocked > 0) SC.draw.glow(ctx, 0, r * 1.1, 26, '#ffd23f', 0.7);
  }
};

/* Nhập ba loại này vào bảng quái chung để mọi thứ khác dùng như quái thường */
Object.assign(SC.ENEMY_DEF, SC.EnemyCounter.DEF);

;
/* ===== js/entity-enemy-art-insect.js ===== */
/* entity-enemy-art-insect.js — máy bay chiến đấu tạo hình theo côn trùng
 *
 * Không vẽ 11 con riêng biệt mà dựng theo BỘ PHẬN, đúng cách máy bay người chơi làm:
 *   cánh  0 nhỏ tròn · 1 một đôi hẹp · 2 vỏ cứng · 3 hai đôi dài (chuồn chuồn)
 *   đuôi  0 không · 1 kim nhọn · 2 bụng vằn · 3 đốt nặng
 *   sừng  0/1 — càng kìm chĩa về phía trước
 * Bốn tham số cộng với màu cho ra 11 dáng phân biệt được bằng mắt mà chỉ phải vẽ 9 mảnh.
 *
 * Mũi luôn chĩa XUỐNG (+y) vì quái bay từ trên xuống — nhìn là biết nó đang lao về phía mình.
 */

SC.InsectArt = {
  draw(ctx, r, art, flap, t) {
    const hue = art[1], wing = art[2], tail = art[3], horn = art[4];
    const lit = `hsl(${hue},70%,72%)`, mid = `hsl(${hue},58%,46%)`, dark = `hsl(${hue},55%,24%)`;

    this._wings(ctx, r, wing, hue, flap);
    if (tail) this._tail(ctx, r, tail, lit, mid, dark);

    // thân: bầu dục dài, mũi thuôn về phía dưới
    SC.draw.ink(ctx, r * 0.13);
    ctx.fillStyle = SC.draw.shade(ctx, r * 0.5, r * 0.85, dark, lit);
    ctx.beginPath();
    ctx.moveTo(0, r * 1.0);
    ctx.quadraticCurveTo(r * 0.52, r * 0.2, r * 0.4, -r * 0.7);
    ctx.quadraticCurveTo(0, -r * 1.05, -r * 0.4, -r * 0.7);
    ctx.quadraticCurveTo(-r * 0.52, r * 0.2, 0, r * 1.0);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    // đốt ngực — vạch ngang cho ra chất côn trùng
    ctx.fillStyle = `hsla(${hue},60%,18%,.45)`;
    for (let i = -1; i <= 1; i++) ctx.fillRect(-r * 0.34, i * r * 0.26 - r * 0.03, r * 0.68, r * 0.07);

    if (horn) this._horn(ctx, r, mid, dark);

    // mắt kép — nguồn sáng duy nhất trên thân, để mắt người chơi bắt được hướng nó nhìn
    ctx.fillStyle = '#ff3b5c';
    ctx.beginPath(); ctx.ellipse(-r * 0.22, r * 0.5, r * 0.16, r * 0.2, -0.3, 0, 6.283); ctx.fill();
    ctx.beginPath(); ctx.ellipse(r * 0.22, r * 0.5, r * 0.16, r * 0.2, 0.3, 0, 6.283); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.75)';
    ctx.beginPath(); ctx.arc(-r * 0.26, r * 0.45, r * 0.05, 0, 6.283); ctx.fill();
    ctx.beginPath(); ctx.arc(r * 0.18, r * 0.45, r * 0.05, 0, 6.283); ctx.fill();
  },

  _wings(ctx, r, style, hue, flap) {
    const f = 0.55 + flap * 0.45;          // biên độ đập cánh
    ctx.save();
    ctx.strokeStyle = `hsla(${hue},60%,20%,.5)`; ctx.lineWidth = 1;

    if (style === 2) {                     // vỏ cứng: hai mảnh giáp, không đập
      ctx.fillStyle = `hsl(${hue},52%,38%)`;
      for (const s of [-1, 1]) {
        ctx.beginPath();
        ctx.ellipse(s * r * 0.62, r * 0.05, r * 0.42, r * 0.82, s * 0.18, 0, 6.283);
        ctx.fill(); ctx.stroke();
      }
      ctx.restore();
      return;
    }

    ctx.fillStyle = 'rgba(215,240,255,.42)';
    const pairs = style === 3 ? [[-0.35, 1.35, 0.42], [0.35, 1.05, 0.34]] : [[0, 1.15, 0.4]];
    const len = style === 0 ? 0.72 : 1;
    for (const [oy, lx, ly] of pairs) {
      for (const s of [-1, 1]) {
        ctx.beginPath();
        ctx.ellipse(s * r * lx * 0.62 * len, r * oy, r * lx * 0.55 * len,
          r * ly * f * len, s * 0.42, 0, 6.283);
        ctx.fill(); ctx.stroke();
      }
    }
    ctx.restore();
  },

  _tail(ctx, r, style, lit, mid, dark) {
    SC.draw.ink(ctx, r * 0.11);
    if (style === 1) {                     // kim nhọn
      ctx.fillStyle = mid;
      ctx.beginPath();
      ctx.moveTo(-r * 0.13, -r * 0.6); ctx.lineTo(0, -r * 1.9);
      ctx.lineTo(r * 0.13, -r * 0.6);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      return;
    }
    // bụng: 2 = vằn thon, 3 = đốt nặng
    const long = style === 3 ? 1.55 : 1.35, wide = style === 3 ? 0.46 : 0.34;
    ctx.fillStyle = SC.draw.shade(ctx, r * wide, r * 0.6, dark, lit);
    ctx.beginPath(); ctx.ellipse(0, -r * long * 0.55, r * wide, r * long * 0.55, 0, 0, 6.283);
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = 'rgba(255,214,63,.75)';       // vằn cảnh báo
    for (let i = 0; i < 3; i++)
      ctx.fillRect(-r * wide * 0.9, -r * (0.5 + i * 0.34), r * wide * 1.8, r * 0.12);
  },

  _horn(ctx, r, mid, dark) {
    ctx.fillStyle = mid;
    SC.draw.ink(ctx, r * 0.1);
    for (const s of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(s * r * 0.18, r * 0.85);
      ctx.quadraticCurveTo(s * r * 0.62, r * 1.35, s * r * 0.24, r * 1.62);
      ctx.quadraticCurveTo(s * r * 0.34, r * 1.2, s * r * 0.06, r * 0.95);
      ctx.closePath(); ctx.fill(); ctx.stroke();
    }
  }
};

;
/* ===== js/entity-enemy-art-bird.js ===== */
/* entity-enemy-art-bird.js — máy bay chiến đấu tạo hình theo chim săn mồi
 *
 * Cùng cách dựng theo bộ phận như họ côn trùng, nhưng ngôn ngữ hình khác hẳn để nhìn
 * là phân biệt được ngay: côn trùng thì tròn trịa, nhiều đốt, cánh trong suốt; chim thì
 * góc cạnh, cánh liền khối vuốt nhọn, có mỏ và đuôi xoè.
 *
 *   cánh  0 ngắn · 1 vuốt về sau · 2 bản rộng · 3 dài lượn
 *   đuôi  0 xoè ngắn · 1 chẻ đôi · 2 hình nêm · 3 đuôi dài
 *   mào   0/1
 */

SC.BirdArt = {
  draw(ctx, r, art, flap, t) {
    const hue = art[1], wing = art[2], tail = art[3], crest = art[4];
    const lit = `hsl(${hue},62%,74%)`, mid = `hsl(${hue},50%,44%)`, dark = `hsl(${hue},48%,20%)`;

    this._tail(ctx, r, tail, mid, dark);
    this._wings(ctx, r, wing, hue, flap, mid, dark);

    // thân: hình giọt nước, mũi nhọn chĩa xuống
    SC.draw.ink(ctx, r * 0.13);
    ctx.fillStyle = SC.draw.shade(ctx, r * 0.46, r * 0.95, dark, lit);
    ctx.beginPath();
    ctx.moveTo(0, r * 1.15);
    ctx.quadraticCurveTo(r * 0.46, r * 0.35, r * 0.36, -r * 0.55);
    ctx.quadraticCurveTo(0, -r * 0.95, -r * 0.36, -r * 0.55);
    ctx.quadraticCurveTo(-r * 0.46, r * 0.35, 0, r * 1.15);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    if (crest) {                                  // mào dựng trên đầu
      ctx.fillStyle = mid;
      ctx.beginPath();
      ctx.moveTo(-r * 0.3, -r * 0.6); ctx.lineTo(0, -r * 1.25);
      ctx.lineTo(r * 0.3, -r * 0.6);
      ctx.closePath(); ctx.fill(); ctx.stroke();
    }

    // mỏ — chi tiết nhận dạng mạnh nhất của họ chim
    ctx.fillStyle = '#ffcf5a';
    ctx.beginPath();
    ctx.moveTo(-r * 0.16, r * 0.92); ctx.lineTo(0, r * 1.52); ctx.lineTo(r * 0.16, r * 0.92);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    // mắt sắc, có vệt lông mày làm nó dữ tướng
    ctx.fillStyle = '#0d1524';
    for (const s of [-1, 1]) {
      ctx.beginPath(); ctx.ellipse(s * r * 0.2, r * 0.42, r * 0.13, r * 0.15, 0, 0, 6.283); ctx.fill();
    }
    ctx.fillStyle = '#ff3b5c';
    for (const s of [-1, 1]) {
      ctx.beginPath(); ctx.arc(s * r * 0.2, r * 0.42, r * 0.07, 0, 6.283); ctx.fill();
    }
    ctx.strokeStyle = dark; ctx.lineWidth = r * 0.09;
    ctx.beginPath();
    ctx.moveTo(-r * 0.38, r * 0.22); ctx.lineTo(-r * 0.08, r * 0.36);
    ctx.moveTo(r * 0.38, r * 0.22); ctx.lineTo(r * 0.08, r * 0.36);
    ctx.stroke();
  },

  _wings(ctx, r, style, hue, flap, mid, dark) {
    const span = [0.95, 1.35, 1.5, 1.85][style];
    const chord = [0.62, 0.5, 0.78, 0.44][style];
    const beat = r * 0.16 * flap;                 // vỗ cánh: nhấc mép ngoài lên xuống

    SC.draw.ink(ctx, r * 0.12);
    ctx.fillStyle = SC.draw.shade(ctx, r * span, r * chord, dark, mid);
    for (const s of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(s * r * 0.22, -r * 0.3);
      ctx.quadraticCurveTo(s * r * span * 0.7, -r * chord * 0.5 + beat,
        s * r * span, r * chord * 0.25 + beat);
      ctx.quadraticCurveTo(s * r * span * 0.6, r * chord * 0.6,
        s * r * 0.28, r * 0.42);
      ctx.closePath(); ctx.fill(); ctx.stroke();

      // vệt lông cánh — ba nét, đủ để đọc ra "cánh chim" ở kích thước thật
      ctx.strokeStyle = `hsla(${hue},45%,14%,.5)`; ctx.lineWidth = 1;
      for (let i = 1; i <= 3; i++) {
        const k = i / 4;
        ctx.beginPath();
        ctx.moveTo(s * r * (0.24 + span * 0.6 * k), -r * 0.1 + beat * k);
        ctx.lineTo(s * r * (0.26 + span * 0.55 * k), r * (0.2 + chord * 0.2) + beat * k);
        ctx.stroke();
      }
      SC.draw.ink(ctx, r * 0.12);
    }
  },

  _tail(ctx, r, style, mid, dark) {
    SC.draw.ink(ctx, r * 0.11);
    ctx.fillStyle = mid;
    const L = [0.85, 1.05, 1.25, 1.75][style];
    ctx.beginPath();
    if (style === 1) {                            // chẻ đôi kiểu đuôi én
      ctx.moveTo(-r * 0.3, -r * 0.4);
      ctx.lineTo(-r * 0.5, -r * L); ctx.lineTo(0, -r * (L * 0.62));
      ctx.lineTo(r * 0.5, -r * L); ctx.lineTo(r * 0.3, -r * 0.4);
    } else if (style === 2) {                     // hình nêm
      ctx.moveTo(-r * 0.34, -r * 0.4);
      ctx.lineTo(0, -r * L); ctx.lineTo(r * 0.34, -r * 0.4);
    } else {                                      // xoè quạt (0) hoặc dài (3)
      ctx.moveTo(-r * 0.34, -r * 0.4);
      ctx.lineTo(-r * 0.42, -r * L); ctx.lineTo(r * 0.42, -r * L);
      ctx.lineTo(r * 0.34, -r * 0.4);
    }
    ctx.closePath(); ctx.fill(); ctx.stroke();
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
    case 'hop':                                    // châu chấu: nhảy từng nhịp rồi khựng lại
      this.y += this.spd * (0.35 + Math.max(0, Math.sin(this.t * 3.2)) * 2.1) * dt;
      this.x = this.x0 + Math.sin(this.t * 1.1) * 40;
      break;
    case 'weave':                                  // bướm / phượng: lượn hình số tám
      this.y += this.spd * (0.62 + Math.sin(this.t * 1.6) * 0.38) * dt;
      this.x = this.x0 + Math.sin(this.t * 2.3) * 78 + Math.sin(this.t * 0.9) * 34;
      break;
    default:                                       // quái khắc chế, xem entity-enemy-counter.js
      SC.EnemyCounter.move(this, dt, player);
  }

  // bắn trả
  if (this.def.fire > 0) {
    this.fireT -= dt;
    if (this.fireT <= 0 && this.y > 20 && this.y < SC.H * 0.75) {
      this.fireT = this.def.fire / this.fireMul;
      // 22 loại quái mới khai báo đường đạn riêng: [loại, số viên, độ toả, tốc độ]
      const blt = this.def.blt;
      // tàu phản bội ở vòng vô tận: đổi HÌNH loạt bắn theo class, giữ số viên + tốc độ
      if (this.dz && SC.DefectorSpawn.fire(this, player,
        blt ? blt[1] : this.type === 'tank' ? 3 : 1, blt ? blt[3] : this.type === 'hen' ? 210 : 260)) {
        // đã bắn theo class
      } else if (blt) {
        const [kind, n, spread, sp] = blt;
        const a = SC.angTo(this.x, this.y, player.x, player.y);
        for (let i = 0; i < n; i++) {
          const aa = a + (n === 1 ? 0 : (i / (n - 1) - 0.5) * 2 * spread);
          SC.Bullets.spawnFoe(this.x, this.y + this.r * 0.6,
            Math.cos(aa) * sp, Math.sin(aa) * sp, kind);
        }
      } else if (this.type === 'hen') {
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

/* src = viên đạn gây đòn, có thể không có (khiên từ trường, bom, va chạm thân).
   Quái khắc chế dùng nó để biết đòn đến từ hướng nào — xem entity-enemy-counter.js */
SC.Enemy.prototype.hurt = function (dmg, src) {
  const d = SC.EnemyCounter.filter(this, dmg, src);
  if (d <= 0) return false;
  this.hp -= d;
  this.flash = 0.09;
  return this.hp <= 0;
};

SC.Enemy.prototype.render = function (ctx) {
  // Đường nhanh: dán ảnh đã vẽ sẵn. Đo được vẽ trực tiếp tốn 0,46ms mỗi con — 40 con
  // là vượt trần 16,7ms của một khung hình. Xem entity-enemy-sprite.js.
  if (SC.EnemySprite.cacheable(this)) {
    SC.EnemySprite.draw(ctx, this);
    this._hpBar(ctx);
    return;
  }

  // Quái khắc chế vẽ trạng thái động (lá chắn loé khi chặn đạn) nên không cache được
  ctx.save();
  ctx.translate(this.x, this.y);
  if (this.flash > 0) { ctx.globalCompositeOperation = 'source-over'; ctx.filter = 'brightness(2.6)'; }
  SC.EnemyCounter.render(ctx, this);
  ctx.filter = 'none';
  ctx.restore();
  this._hpBar(ctx);
};

/* thanh máu nhỏ cho quái cứng */
SC.Enemy.prototype._hpBar = function (ctx) {
  if (this.hpMax <= 8 || this.hp >= this.hpMax) return;
  const w = this.r * 2;
  ctx.fillStyle = 'rgba(0,0,0,.5)';
  ctx.fillRect(this.x - w / 2, this.y - this.r - 9, w, 3);
  ctx.fillStyle = '#ff3b5c';
  ctx.fillRect(this.x - w / 2, this.y - this.r - 9, w * (this.hp / this.hpMax), 3);
};

;
/* ===== js/entity-enemy-art-legacy.js ===== */
/* entity-enemy-art-legacy.js — tạo hình 4 loại quái đời đầu
 *
 * Sáu loại gốc (gà con, gà mái, trứng, mũi lao, đĩa bay, xe tăng) không còn nằm trong
 * bể quái của map nào nữa — 22 loại mới ở data-enemy-types.js đã thay hết. Nhưng chúng
 * vẫn được trùm gọi ra làm viện binh, nên phần vẽ phải giữ lại.
 *
 * Tách khỏi entity-enemy.js vì tệp đó đã chạm trần 200 dòng sau khi thêm hệ quái mới.
 */
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
/* ===== js/entity-enemy-sprite.js ===== */
/* entity-enemy-sprite.js — vẽ sẵn quái ra canvas đệm rồi mỗi khung chỉ dán ảnh
 *
 * VÌ SAO CÓ: đo ở map 56 lúc đông quái — vẽ quái tốn 17,9ms cho 39 con (0,46ms mỗi con),
 * trong khi cả khung hình chỉ có 16,7ms để chạy 60fps. Toàn bộ phần còn lại của game
 * (nền, đạn, hạt, máy bay, khiên) cộng lại chưa tới 2ms. Nói cách khác: game giật là
 * do đúng một chỗ này.
 *
 * Nguyên nhân: mỗi con mỗi khung đều dựng lại gradient (createRadialGradient rất đắt)
 * và chạy 20-30 lệnh vẽ đường. Nhân với 40 con là 1.200 lệnh vẽ mỗi khung.
 *
 * CÁCH CHỮA: mỗi loại quái chỉ có MỘT bán kính cố định, và thứ duy nhất động là nhịp
 * đập cánh. Nên vẽ sẵn 6 khung đập cánh cho mỗi loại rồi dùng lại mãi — 22 loại × 6
 * khung = 132 ảnh, dựng một lần lúc gặp lần đầu.
 *
 * Những thứ KHÔNG nướng vào ảnh vì chúng đổi theo từng con: góc xoay (mũi lao),
 * ánh chớp khi trúng đạn, thanh máu.
 */

SC.EnemySprite = {
  FRAMES: 6,          // số khung đập cánh; 6 là đủ mượt mà mắt không thấy giật
  PAD: 2.4,           // ảnh rộng gấp ngần này bán kính, chừa chỗ cho cánh và đuôi
  _cache: {},

  /* Quái khắc chế vẽ trạng thái động (lá chắn loé lên khi chặn được đạn) nên không
     nướng vào ảnh được. Chỉ 2-3 con sống cùng lúc nên chi phí không đáng kể. */
  cacheable(e) { return !SC.EnemyCounter.is(e.type); },

  /* flap nằm trong [-1, 1] -> chọn khung gần nhất */
  frame(flap) {
    return SC.clamp(Math.round((flap + 1) / 2 * (this.FRAMES - 1)), 0, this.FRAMES - 1);
  },

  get(e, fi) {
    // tàu phản bội: cùng loại quái nhưng mỗi chiếc một ảnh -> khoá cache theo tàu
    const key = e.type + '|' + fi + (e.dz ? '|' + e.dz.id : '');
    let c = this._cache[key];
    if (c) return c;

    const dpr = Math.min(2.5, (window.devicePixelRatio || 1) * 1.5);
    const size = e.r * this.PAD * 2;
    c = document.createElement('canvas');
    c.width = c.height = Math.ceil(size * dpr);
    const g = c.getContext('2d');
    g.scale(dpr, dpr);
    g.translate(size / 2, size / 2);

    // dựng lại đúng giá trị flap của khung này rồi gọi chính hàm vẽ thật
    const flap = (fi / (this.FRAMES - 1)) * 2 - 1;
    this._paint(g, e, flap);

    this._cache[key] = c;
    return c;
  },

  _paint(g, e, flap) {
    // Sprite AI có thì dùng, chưa tải xong thì rơi về art thủ tục bên dưới.
    // 0.85: sprite đã trim sát cánh, vẽ full box PAD thì thân to hơn hitbox r
    // rõ rệt — thu lại cho cảm giác va chạm khớp mắt.
    // tàu phản bội (system-defector-spawn.js): ảnh gen mũi hướng LÊN -> xoay 180° cho
    // chúi xuống phía người chơi như mọi quái khác
    if (e.dz) {
      const s = e.r * this.PAD * 2 * 0.95;
      g.save();
      g.rotate(Math.PI);
      g.scale(1 + flap * 0.03, 1 - flap * 0.03);
      g.drawImage(e.dz.img, -s / 2, -s / 2, s, s);
      g.restore();
      return;
    }
    const img = SC.SpriteArt && SC.SpriteArt.get('enemy', e.type);
    if (img) {
      const s = e.r * this.PAD * 2 * 0.85;
      g.save();
      if (SC.SpriteArt.flipped(e.type)) g.rotate(Math.PI);
      // nhịp vỗ cánh giả: bóp nhẹ theo flap để 6 khung cache vẫn khác nhau
      g.scale(1 + flap * 0.05, 1 - flap * 0.05);
      g.drawImage(img, -s / 2, -s / 2, s, s);
      g.restore();
      return;
    }
    const art = e.def.art;
    if (art) {
      (art[0] === 'bird' ? SC.BirdArt : SC.InsectArt).draw(g, e.r, art, flap, 0);
      return;
    }
    // sáu loại đời đầu: gọi lại đúng hàm vẽ cũ, mượn `this` của một con giả
    const fake = { r: e.r, flap, locked: 0, t: 0 };
    const hue = 40;
    switch (e.type) {
      case 'chick': SC.draw.chicken(g, e.r, `hsl(${hue},92%,72%)`, '#ff6b4a', flap); break;
      case 'hen':   SC.draw.chicken(g, e.r, `hsl(${hue - 12},70%,64%)`, '#e33a3a', flap * .6); break;
      case 'egg':   SC.Enemy.prototype._egg.call(fake, g); break;
      case 'dive':  SC.Enemy.prototype._dive.call(fake, g); break;
      case 'ufo':   SC.Enemy.prototype._ufo.call(fake, g); break;
      case 'tank':  SC.Enemy.prototype._tank.call(fake, g); break;
    }
  },

  /* Dán ảnh. Góc xoay và ánh chớp trúng đạn áp ở đây vì chúng đổi theo từng con. */
  draw(ctx, e) {
    const s = this.get(e, this.frame(e.flap));
    const size = e.r * this.PAD * 2;
    ctx.save();
    ctx.translate(e.x, e.y);
    if (e.def.move === 'dive' && e.locked) ctx.rotate(e.locked - Math.PI / 2);
    if (e.flash > 0) ctx.filter = 'brightness(2.6)';
    ctx.drawImage(s, -size / 2, -size / 2, size, size);
    ctx.filter = 'none';
    ctx.restore();
  }
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
    // Sprite AI có thì dùng (trùm và elite chung một đường vẽ, khoá không đụng
    // nhau); chưa tải thì rơi về hàm vẽ thủ tục bên dưới.
    const img = SC.SpriteArt
      && (SC.SpriteArt.get('boss', key) || SC.SpriteArt.get('elite', key));
    if (img) return this._sprite(ctx, img, r, t, phase);
    // gọi qua .call để hàm vẽ vẫn dùng được _eyes dùng chung
    (this[key] || this.hen).call(this, ctx, r, t, phase, hue);
  },

  /* Sprite tĩnh nên bù hai thứ art thủ tục vốn có: nhịp thở (scale nhẹ theo t)
     và tín hiệu nổi điên theo giai đoạn (quầng vàng/đỏ quanh thân). */
  _sprite(ctx, img, r, t, phase) {
    const s = r * 2.9;                       // cánh xoè ngoài bán kính thân
    const b = 1 + Math.sin(t * 2.1) * 0.02;
    ctx.save();
    ctx.scale(b, 1 / b);
    if (phase >= 2) {
      ctx.shadowColor = phase === 3 ? '#ff3b5c' : '#ffd23f';
      ctx.shadowBlur = 26;
    }
    ctx.drawImage(img, -s / 2, -s / 2, s, s);
    ctx.restore();
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
/* ===== js/entity-boss-splats.js ===== */
/* entity-boss-splats.js — vệt mực của chiêu 'BÓNG TỐI' là ĐỊA HÌNH, không phải hình vẽ
 *
 * Bản cũ chỉ vẽ vệt đen che tầm nhìn rồi thôi: người chơi bay xuyên qua thoải mái nên
 * chiêu chỉ gây khó chịu cho mắt chứ không đổi cách đứng. Giờ mỗi vệt là một vùng CẤM
 * trong vài giây — bịt đường lui, ép người chơi phải chọn chỗ đứng trước khi trùm thả.
 *
 * Tách khỏi entity-boss-skills.js vì tệp đó đã 165 dòng và đây là thứ có vòng đời
 * riêng: sống tiếp cả khi trùm đã chết, tự tan, tự va chạm.
 *
 * Toạ độ dùng chung hệ ảo với người chơi (SC.W/SC.H) nên so va chạm thẳng, khỏi quy đổi.
 */

SC.Splats = {
  list: [],

  /* Vệt tan dần ở cuối đời. Chặn đường bằng thứ đã gần trong suốt thì người chơi
     không hiểu vì sao mình không đi được -> hết SOLID là cho bay qua, dù còn thấy mờ. */
  SOLID: 0.86,
  SQUASH: 0.82,        // vệt hơi bẹp theo chiều dọc, khớp với hình đang vẽ
  DMG: 16,             // sát thương khi vệt rơi trúng chỗ đang đứng

  /* Bán kính vệt. Bản đầu để 70-130, phủ tới ~24% khung hình — hồi vệt chỉ là hình vẽ
     che mắt thì không sao, nhưng từ khi nó CHẶN ĐƯỜNG thì chừng đó là bịt lối, chơi
     rất bí. Thu còn khoảng 45% diện tích cũ: vẫn rõ là chướng ngại phải vòng tránh,
     mà không nuốt mất nửa sân. */
  R_MIN: 46, R_MAX: 86,

  clear() { this.list.length = 0; },

  /* Bán kính hiện tại — phần vẽ và phần va chạm PHẢI gọi chung hàm này, để hình
     nhìn thấy với vùng cấm không bao giờ lệch nhau. */
  radiusOf(s) {
    const k = s.t / s.life;
    return s.r * (0.55 + Math.min(1, k * 3) * 0.45);
  },

  solid(s) { return s.t / s.life < this.SOLID; },

  spawn(n, rage, player) {
    for (let i = 0; i < n; i++) {
      const s = {
        x: SC.rnd(40, SC.W - 40), y: SC.rnd(SC.H * 0.25, SC.H * 0.9),
        r: SC.rnd(this.R_MIN, this.R_MAX), t: 0, life: 2.6 + rage * 0.5, seed: SC.rnd(0, 6.28)
      };
      this.list.push(s);
      if (player && !player.dead) this._dropOn(s, player);
    }
  },

  /* Đẩy người chơi ra khỏi một vệt. margin 1 = sát mép, lớn hơn = hất ra xa thêm.
     Trả về true nếu vừa nãy còn nằm trong.
     Dùng chung cho cả lúc vệt rơi trúng đầu lẫn lúc tì vào tường, để hai đường không
     bao giờ tính lệch nhau. */
  _eject(s, p, margin) {
    const rx = this.radiusOf(s) + p.r, ry = rx * this.SQUASH;
    let dx = (p.x - s.x) / rx, dy = (p.y - s.y) / ry;
    let d = Math.hypot(dx, dy);
    if (d >= 1) return false;
    if (d < 1e-4) { dx = 0; dy = 1; d = 1; }        // đúng tâm: hất thẳng xuống
    const k = margin / d;
    let nx = SC.clamp(s.x + dx * rx * k, 18, SC.W - 18);
    let ny = SC.clamp(s.y + dy * ry * k, 40, SC.H - 24);

    // Vệt nằm đè lên mép màn thì lối thoát ngang bị kẹp mất, đẩy xong vẫn còn ở trong
    // — người chơi bị nuốt hẳn vào cục mực đục và không ra được. Đổi sang thoát theo
    // TRỤC DỌC: khung chơi cao gấp mấy lần bán kính vệt nên hướng này luôn còn chỗ.
    if (Math.hypot((nx - s.x) / rx, (ny - s.y) / ry) < 1) {
      // Chọn hướng CÒN CHỖ chứ không phải hướng gần hơn: vệt nằm ở đáy màn thì hướng
      // gần là đi xuống, mà xuống lại đụng mép — đẩy xong vẫn kẹt nguyên trong vệt.
      const len = ry * margin;
      const gan = p.y < s.y ? s.y - len : s.y + len;
      const xa = p.y < s.y ? s.y + len : s.y - len;
      nx = SC.clamp(p.x, 18, SC.W - 18);
      ny = SC.clamp(gan >= 40 && gan <= SC.H - 24 ? gan : xa, 40, SC.H - 24);
    }
    p.x = nx; p.y = ny;
    return true;
  },

  /* Vệt rơi trúng đầu: ăn đòn rồi bị hất văng ra.
     Không cho đứng yên trong vệt — nếu chỉ chặn mà không hất thì người đã ở sẵn bên
     trong lại thành bất khả xâm phạm, ngược hẳn ý đồ.
     Hất dư 12% ra ngoài mép để khung sau không bị hút lại vào ngay. */
  _dropOn(s, player) {
    if (!this._eject(s, player, 1.12)) return;
    if (player.hurt(Math.round(this.DMG * SC.Power.dmg()))) SC.addShake(16, 0.34);
    SC.FX.burst(player.x, player.y, '#7a6bff', 16, 260, 2.4);
    SC.Audio.shield();
  },

  update(dt) {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const s = this.list[i];
      s.t += dt;
      if (s.t >= s.life) this.list.splice(i, 1);
    }
  },

  /* Đẩy người chơi ra khỏi mọi vệt đang đặc.
   *
   * Chỉ nắn VỊ TRÍ, không đụng tới đích bay: đẩy ra theo phương xuyên tâm giữ nguyên
   * thành phần tiếp tuyến, nên người chơi trượt dọc mép vệt thay vì dính cứng — cảm
   * giác đúng như tì vào tường. Sửa cả đích thì máy bay giật về chỗ khác với ngón tay. */
  collide(player) {
    if (!this.list.length || player.dead) return;
    for (const s of this.list) if (this.solid(s)) this._eject(s, player, 1);
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
  /* Số dây của chiêu TÁCH THÂN tính theo MÀN, không theo máu trùm.
     2 dây ở trùm đầu game né quá dễ — đứng giữa là xong. Càng về cuối chiến dịch càng
     thành rèm phải luồn lách. Trần 10 kể cả vòng vô tận: dày hơn nữa thì không còn khe
     nào để lách, hoá ra ép ăn đòn chứ không phải thử tay lái. */
  DAY_MIN: 2, DAY_MAX: 10,
  MAN_DAU: 3, MAN_CUOI: 60,                       // trùm đầu tiên và trùm cuối chiến dịch

  // + 3 chiêu đặc trưng theo tạo hình (entity-boss-signature-skills.js)
  has(kind) { return this.LIST.indexOf(kind) >= 0 || SC.BossSig.has(kind); },
  clear() { SC.Splats.clear(); SC.BossSig.clear(); },

  soDay(b) {
    const id = (b.lv && b.lv.id) || 1;
    const u = (id - this.MAN_DAU) / (this.MAN_CUOI - this.MAN_DAU);
    return SC.clamp(Math.round(this.DAY_MIN + u * (this.DAY_MAX - this.DAY_MIN)),
      this.DAY_MIN, this.DAY_MAX);
  },

  start(b, kind, player) {
    const rage = b.phase;                          // giai đoạn càng cao càng dữ
    // chiêu đặc trưng: module riêng tự dựng vật bay, act chỉ giữ trùm đứng gồng
    if (SC.BossSig.has(kind)) {
      const s = SC.BossSig.start(b, kind, player);
      b.act = { kind, t: 0, dur: s.dur };
      SC.FX.text(b.x, b.y - b.r - 26, s.name, '#ff5c7a');
      SC.Audio.shield();
      return;
    }
    b.act = { kind, t: 0, step: 0, n: 0 };
    const a = b.act;

    if (kind === 'charge') {
      a.dur = 2.0; a.tx = player.x; a.ty = player.y;
      a.x0 = b.x; a.y0 = b.y;
    } else if (kind === 'rocket') {
      a.dur = 1.5; a.left = 2 + rage; a.gap = 0.26;
    } else if (kind === 'boomerang') {
      a.dur = 1.9;
      // Toả đều nửa dưới: 0.15π (chếch phải) tới 0.85π (chếch trái). Một dây thì cho
      // rơi thẳng giữa, khỏi lệch hẳn về một bên.
      const n = this.soDay(b);
      // Độ mở quạt GIÃN THEO SỐ DÂY, không cố định. Để cố định thì 2 dây nằm tít hai
      // bên, đo được 0% dải người chơi bị cấm — dễ hơn cả bản cũ. Ít dây thì chụm lại
      // bổ thẳng xuống, nhiều dây mới xoè hết thành rèm.
      const nua = Math.min(0.35, 0.06 * n) * Math.PI;
      // SO LE TẦM VỚI giữ cho chiêu còn né được khi đông: đo ở 10 dây cùng tầm, khe
      // giữa hai mảnh kề chỉ còn 33px trong khi lách qua cần hơn 76px — thành đòn ép
      // ăn chứ không phải thử tay lái. Ít dây thì KHÔNG so le, cần cả hai cùng bổ sâu.
      const soLe = n >= 4;
      a.parts = [];
      for (let i = 0; i < n; i++) {
        const u = n > 1 ? i / (n - 1) : 0.5;
        a.parts.push({
          ang0: Math.PI * 0.5 + (u - 0.5) * 2 * nua,
          reach: (soLe && i % 2) ? 0.70 : 1,
          side: i % 2 ? 1 : -1, x: 0, y: 0, rot: 0
        });
      }
      a.swing = 0.30;                              // biên đảo qua lại của cả nan quạt
    } else if (kind === 'blind') {
      a.dur = 0.7;
      SC.Splats.spawn(3 + rage, rage, player);
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
    const fn = this['_' + a.kind];               // chiêu đặc trưng không có hàm ở đây
    if (fn) fn.call(this, b, a, dt, player);
    if (a.t >= a.dur) { b.act = null; return false; }
    return true;
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

  /* ---------- tách thân quăng ra thành nan quạt rồi hút về ----------
   *
   * Bản cũ chỉ có 2 mảnh và đặt vị trí bằng hai hàm sin lệch pha, trong đó THÀNH PHẦN
   * DỌC DÙNG CHUNG cho mọi mảnh — thêm mảnh thứ ba vào là nó nằm đè lên mảnh cũ. Muốn
   * lên tới 10 dây thì phải đổi cách đặt: mỗi mảnh giữ một GÓC riêng, cả nan quạt cùng
   * vươn ra rồi cùng thu về, và đảo qua lại quanh trục.
   *
   * Đảo qua lại là phần bắt buộc: nan quạt đứng yên thì người chơi chỉ cần đứng lọt vào
   * một khe là an toàn tuyệt đối suốt chiêu, càng nhiều dây càng dễ vì khe nào cũng như
   * nhau. Có đảo thì khe trôi, buộc phải bám theo. */
  _boomerang(b, a, dt, player) {
    const k = a.t / a.dur;
    const e = Math.sin(Math.PI * k);              // 0 -> vươn xa nhất -> 0, khỏi chia nhánh
    const sweep = Math.sin(6.283 * k) * a.swing;
    const spin = a.t * 7;
    for (const p of a.parts) {
      p.rot = spin * p.side;
      const ang = p.ang0 + sweep;
      // Bán kính ngang KHÁC dọc: quạt hình elip nên mảnh ở góc chếch sát mép vẫn nằm
      // trong khung. Để tròn đều thì mấy mảnh ngoài cùng bay hẳn ra ngoài màn hình.
      const q = e * p.reach;
      p.x = Math.cos(ang) * SC.W * 0.40 * q;
      p.y = Math.sin(ang) * SC.H * 0.70 * q;
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
    const list = SC.Splats.list;
    if (!list.length) return;
    ctx.save();
    for (const s of list) {
      const k = s.t / s.life;
      // bám vào rất nhanh rồi loang ra và tan dần
      const a = k < 0.08 ? k / 0.08 : 1 - (k - 0.08) / 0.92;
      // Bán kính lấy từ SC.Splats: vùng cấm và hình vẽ phải là một, lệch nhau thì
      // người chơi đâm vào tường vô hình hoặc bay xuyên chỗ nhìn thấy rõ là đặc.
      const r = SC.Splats.radiusOf(s);
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
/* ===== js/entity-boss-signature-skills.js ===== */
/* entity-boss-signature-skills.js — 3 chiêu ĐẶC TRƯNG theo tạo hình từng trùm (22/09/2026)
 *
 *   toss  : tháo một bộ phận quăng vào người chơi, dội tường 2-5 lần (nhanh dần mỗi lần
 *           dội) rồi bay về lắp lại. Trúng là ăn đòn rất nặng.
 *   laser : chưởng cột laze. Nháy vạch ngắm trước, khoá hướng, 0.1-0.2s sau mới bắn —
 *           đứng càng gần TÂM tia càng đau. Chưởng bằng miệng / tay / mắt tuỳ con.
 *   peck  : chỉ trùm GIA CẦM. Rụt cổ, mổ tới, phóng cái mỏ bay về phía người chơi —
 *           mỏ bay càng xa càng TO, dính càng gần tâm mỏ càng đau.
 *
 * Vì sao theo tạo hình: 10 trùm dùng chung 12 chiêu rải đạn thì con nào cũng giống con
 * nào. Chiêu đặc trưng lấy từ chính hình dáng con trùm — nhện quăng chân, bạch tuộc
 * quăng xúc tu, gà thì mổ — nhìn con trùm là đoán được nó sắp làm gì.
 *
 * Nối vào khuôn chiêu có kịch bản của entity-boss-skills.js: act giữ trùm đứng yên cho
 * lúc gồng; vật bay (mỏ, bộ phận, tia laze) sống ở `list` riêng nên trùm vẫn đi lại
 * được trong lúc bộ phận còn đang dội tường. Vẽ ở entity-boss-signature-art.js.
 */

SC.BossSig = {
  list: [],

  /* Bộ chiêu + chất liệu từng tạo hình. part = bộ phận bị quăng, from = chỗ phát laze */
  SIG: {
    hen:         { sk: ['peck', 'toss'], part: 'wing' },
    eagle:       { sk: ['peck', 'laser'], part: 'feather', from: 'mouth' },
    penguin:     { sk: ['peck', 'toss'], part: 'booster' },
    spider:      { sk: ['toss', 'laser'], part: 'leg', from: 'eye' },
    phoenix:     { sk: ['peck', 'laser'], part: 'feather', from: 'mouth' },
    octopus:     { sk: ['toss', 'laser'], part: 'tentacle', from: 'hand' },
    neonRooster: { sk: ['peck', 'laser'], part: 'wing', from: 'mouth' },
    scrapDragon: { sk: ['toss', 'laser'], part: 'plate', from: 'mouth' },
    stormEye:    { sk: ['laser', 'toss'], part: 'shard', from: 'eye' },
    voidEgg:     { sk: ['peck', 'laser', 'toss'], part: 'shell', from: 'mouth' },
    // elite: mỗi con MỘT chiêu, chừa đất cho trùm vùng
    scarecrow: { sk: ['toss'], part: 'plate' },  scorpion: { sk: ['toss'], part: 'claw' },
    iceBear: { sk: ['laser'], from: 'mouth' },   wasp: { sk: ['toss'], part: 'stinger' },
    golem: { sk: ['toss'], part: 'rock' },       shark: { sk: ['laser'], from: 'mouth' },
    droneEye: { sk: ['laser'], from: 'eye' },    crusher: { sk: ['toss'], part: 'plate' },
    thunderbird: { sk: ['peck'] },               voidPrism: { sk: ['laser'], from: 'eye' }
  },
  PART_VI: { wing: 'CÁNH GIÁP', feather: 'LÔNG KIẾM', booster: 'TÊN LỬA LƯNG', leg: 'CHÂN NHỆN',
    tentacle: 'XÚC TU', plate: 'MẢNH GIÁP', shard: 'MẢNH MÂY SÉT', shell: 'VỎ TRỨNG',
    claw: 'CÀNG', stinger: 'NGÒI ĐỘC', rock: 'KHỐI ĐÁ' },

  has(kind) { return kind === 'toss' || kind === 'laser' || kind === 'peck'; },
  skillsFor(art) { return (this.SIG[art] && this.SIG[art].sk) || []; },
  clear() { this.list.length = 0; },

  /* 0 = trùm đầu game … 1 = cuối chiến dịch (vòng vô tận kẹp ở 1), cùng thước với
     số dây TÁCH THÂN trong entity-boss-skills.js */
  _u(b) {
    const id = (b.lv && b.lv.id) || 1;
    return SC.clamp((id - 3) / 57, 0, 1);
  },

  /* Gọi từ BossSkills.start. Trả thời lượng act (trùm đứng gồng bao lâu) + tên hô chiêu */
  start(b, kind, player) {
    const sig = this.SIG[b.art] || {}, u = this._u(b);
    if (kind === 'toss') {
      // tốc độ nâng lần 2 (22/09, "dễ né quá"): 260→380 khởi điểm, mỗi lần dội +16-26%
      const a = SC.angTo(b.x, b.y, player.x, player.y), sp = 380 + u * 220;
      this.list.push({ k: 'part', boss: b, part: sig.part || 'plate', x: b.x, y: b.y,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, left: Math.round(2 + u * 3),
        mul: 1.16 + u * 0.10, rot: 0, back: false, hit: false });
      b.missing = true;
      return { dur: 0.45, name: 'QUĂNG ' + (this.PART_VI[sig.part] || 'MẢNH GIÁP') + '!' };
    }
    if (kind === 'laser') {
      const from = sig.from || 'mouth';
      // khó lần 2: nháy ngắn hơn (0.8→0.6s), bám người chơi lâu hơn trước khi khoá,
      // khoảng lặng 0.15→0.08s, tia to hơn
      this.list.push({ k: 'laser', boss: b, from, t: 0, warn: 0.6, gap: 0.15 - u * 0.07, beam: 0.6,
        hw: 30 + u * 16, ang: SC.angTo(b.x, b.y, player.x, player.y), hit: false });
      return { dur: 1.45, name: from === 'hand' ? 'CHƯỞNG LAZE!' : from === 'eye' ? 'NHÃN LAZE!' : 'KHẨU LAZE!' };
    }
    // peck: 2-4 cú mổ liên hoàn theo giai đoạn máu; khó lần 2: mỏ nhanh hơn
    // (380→540) và NGẮM ĐÓN đầu hướng người chơi đang lượn — đứng lượn vòng hết né
    const n = b.phase + 1;
    this.list.push({ k: 'pecker', boss: b, t: 0, n, done: 0, speed: 540 + u * 180 });
    return { dur: 0.6 * n + 0.2, name: 'MỔ XUYÊN GIÁP!' };
  },

  /* Chỗ phát laze theo tạo hình (toạ độ thế giới) */
  origin(o) {
    const b = o.boss;
    if (o.from === 'eye') return { x: b.x, y: b.y - b.r * 0.1 };
    if (o.from === 'hand') {
      const side = Math.cos(o.ang) < 0 ? -1 : 1;
      return { x: b.x + side * b.r * 0.9, y: b.y + b.r * 0.4 };
    }
    return { x: b.x, y: b.y + b.r * 0.4 };
  },

  /* Gọi mỗi khung từ SC.Boss.update — vật bay sống độc lập với act */
  update(b, dt, player) {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const o = this.list[i];
      if (o.boss !== b) { this.list.splice(i, 1); continue; }
      if (this['_' + o.k](o, dt, player)) this.list.splice(i, 1);
    }
  },

  /* ---------- bộ phận dội tường ---------- */
  _part(o, dt, player) {
    const b = o.boss;
    o.rot += dt * 11;
    if (!o.back) {
      o.x += o.vx * dt; o.y += o.vy * dt;
      let doi = false;
      if (o.x < 20 || o.x > SC.W - 20) { o.vx = -o.vx; o.x = SC.clamp(o.x, 20, SC.W - 20); doi = true; }
      if (o.y < 30 || o.y > SC.H - 20) { o.vy = -o.vy; o.y = SC.clamp(o.y, 30, SC.H - 20); doi = true; }
      if (doi) {
        o.vx *= o.mul; o.vy *= o.mul; o.left--;
        SC.FX.burst(o.x, o.y, '#ffd23f', 8, 180, 2.4);
        SC.addShake(3, 0.08);
        if (o.left <= 0) o.back = true;
      }
    } else {                                     // bay về lắp lại, nhanh dần
      const a = SC.angTo(o.x, o.y, b.x, b.y), sp = Math.hypot(o.vx, o.vy) * 1.05;
      o.x += Math.cos(a) * sp * dt; o.y += Math.sin(a) * sp * dt;
      if (SC.dist2(o.x, o.y, b.x, b.y) < (b.r * 0.6) ** 2) { b.missing = false; return true; }
    }
    if (!o.hit && SC.dist2(o.x, o.y, player.x, player.y) < (22 + player.r) ** 2) {
      o.hit = true;                              // một lượt quăng chỉ phạt một lần
      SC.BossSkills._hit(player, 34);
    }
    if (Math.random() < 0.5) SC.FX.trail(o.x, o.y, '#ffb45c');
    return false;
  },

  /* ---------- cột laze ---------- */
  _laser(o, dt, player) {
    o.t += dt;
    const b = o.boss;
    if (o.t < o.warn * 0.8) {                    // bám theo người chơi rồi mới khoá
      const want = SC.angTo(b.x, b.y, player.x, player.y);
      o.ang += Math.atan2(Math.sin(want - o.ang), Math.cos(want - o.ang)) * Math.min(1, dt * 9);
    }
    const on = o.warn + o.gap;
    if (o.t >= on && !o.fired) { o.fired = true; SC.addShake(10, 0.35); SC.Audio.bomb(); }
    if (o.t >= on && o.t < on + o.beam && !o.hit) {
      const p = this.origin(o), cx = Math.cos(o.ang), cy = Math.sin(o.ang);
      const along = (player.x - p.x) * cx + (player.y - p.y) * cy;
      const d = Math.abs((player.x - p.x) * cy - (player.y - p.y) * cx);
      if (along > 0 && d < o.hw + player.r) {
        o.hit = true;
        // gần tâm tia đau gấp ~4 lần mép tia
        SC.BossSkills._hit(player, 10 + 34 * (1 - SC.clamp(d / o.hw, 0, 1)));
      }
    }
    return o.t >= on + o.beam;
  },

  /* ---------- trùm mổ: rụt cổ, lao tới, nhả mỏ ---------- */
  _pecker(o, dt, player) {
    const b = o.boss, CYCLE = 0.6;
    o.t += dt;
    const k = (o.t % CYCLE) / CYCLE;
    b.peckY = k < 0.55 ? -12 * (k / 0.55) : 22 * Math.sin(((k - 0.55) / 0.45) * Math.PI);
    const idx = Math.floor(o.t / CYCLE);
    if (idx > o.done - 1 && k >= 0.6 && o.done < o.n) {
      o.done++;
      // ngắm đón đầu: cộng một nhịp theo hướng tàu đang lao tới (tx/ty là đích bám)
      const lx = player.x + (player.tx - player.x) * 0.5, ly = player.y + (player.ty - player.y) * 0.5;
      const a = SC.angTo(b.x, b.y + b.r * 0.5, lx, ly);
      this.list.push({ k: 'beak', boss: b, x: b.x, y: b.y + b.r * 0.5, x0: b.x, y0: b.y + b.r * 0.5,
        vx: Math.cos(a) * o.speed, vy: Math.sin(a) * o.speed, ang: a, hit: false });
      SC.Audio.shoot();
    }
    if (o.done >= o.n && k > 0.95) { b.peckY = 0; return true; }
    return false;
  },

  _beak(o, dt, player) {
    o.x += o.vx * dt; o.y += o.vy * dt;
    // bay càng xa càng to: 1 lúc nhả -> ~2.6 lần sau nửa màn
    o.sc = 1 + Math.hypot(o.x - o.x0, o.y - o.y0) / 260;
    const R = 16 * o.sc;
    const d = Math.sqrt(SC.dist2(o.x, o.y, player.x, player.y));
    if (!o.hit && d < R + player.r) {
      o.hit = true;
      SC.BossSkills._hit(player, 10 + 26 * (1 - SC.clamp(d / (R + player.r), 0, 1)));
    }
    return o.x < -80 || o.x > SC.W + 80 || o.y < -80 || o.y > SC.H + 80;
  }
};

;
/* ===== js/entity-boss-signature-art.js ===== */
/* entity-boss-signature-art.js — vẽ 3 chiêu đặc trưng (logic ở entity-boss-signature-skills.js)
 *
 * Vẽ ở toạ độ THẾ GIỚI, gọi ngay sau khi SC.Boss.render xong. Nguyên tắc đọc chiêu:
 * mọi đòn nặng phải có dấu hiệu NHÌN THẤY trước — vạch laze nháy, quả cầu tụ lực, cổ
 * rụt lại — người chơi chết vì chậm tay chứ không được chết vì không biết.
 */

SC.BossSigArt = {
  render(b, ctx) {
    for (const o of SC.BossSig.list) {
      if (o.boss !== b) continue;
      if (o.k === 'part') this._part(ctx, o, b);
      else if (o.k === 'laser') this._laser(ctx, o, b);
      else if (o.k === 'beak') this._beak(ctx, o);
    }
  },

  /* Chỗ bộ phận vừa bị tháo trên thân trùm: tia lửa hàn lách tách — nhìn là biết
     con trùm đang "thiếu một mảnh", mảnh đó sẽ quay về. Gọi trong hệ toạ độ trùm. */
  socket(ctx, b) {
    if (!b.missing) return;
    const t = b.t * 20;
    ctx.save();
    ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t);
    ctx.fillStyle = '#ffe28a';
    for (let i = 0; i < 3; i++) {
      const a = t * 0.7 + i * 2.1;
      ctx.beginPath(); ctx.arc(b.r * 0.7 + Math.cos(a) * 5, Math.sin(a) * 5, 2, 0, 6.283); ctx.fill();
    }
    ctx.restore();
  },

  /* bộ phận xoay: lưỡi cong hai đầu nhọn, tô theo màu vùng của trùm */
  _part(ctx, o, b) {
    const S = o.part === 'rock' || o.part === 'shell' ? 20 : 26;
    ctx.save();
    ctx.translate(o.x, o.y); ctx.rotate(o.rot);
    SC.draw.glow(ctx, 0, 0, S * 1.6, `hsla(${b.hue},95%,60%,.9)`, 0.35);
    ctx.fillStyle = `hsl(${b.hue},75%,55%)`;
    ctx.strokeStyle = '#1a1020'; ctx.lineWidth = 2.5;
    ctx.beginPath();
    if (o.part === 'rock' || o.part === 'shell') {           // khối tròn gồ ghề
      for (let i = 0; i < 7; i++) {
        const a = i * 0.8976, R = S * (0.8 + (i % 2) * 0.25);
        i ? ctx.lineTo(Math.cos(a) * R, Math.sin(a) * R) : ctx.moveTo(R, 0);
      }
    } else {                                                  // lưỡi cong kiểu boomerang
      ctx.moveTo(-S, 0);
      ctx.quadraticCurveTo(0, -S * 0.9, S, 0);
      ctx.quadraticCurveTo(0, -S * 0.35, -S, 0);
    }
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
  },

  _laser(ctx, o, b) {
    const p = SC.BossSig.origin(o);
    const L = SC.H * 1.6, cx = Math.cos(o.ang), cy = Math.sin(o.ang);
    const on = o.warn + o.gap;
    ctx.save();
    ctx.lineCap = 'round';

    // quả cầu tụ lực ở miệng/tay/mắt: phình dần suốt lúc ngắm — "anim chưởng"
    const tu = Math.min(1, o.t / on);
    if (o.t < on + o.beam) SC.draw.glow(ctx, p.x, p.y, 10 + tu * 26, '#ff5c7a', 0.5 + tu * 0.4);

    if (o.t < o.warn) {                        // vạch ngắm nháy: báo trước hướng chưởng
      ctx.globalAlpha = Math.sin(o.t * 40) > 0 ? 0.85 : 0.2;
      ctx.strokeStyle = '#ff5c7a'; ctx.lineWidth = 2;
      ctx.setLineDash([10, 8]);
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + cx * L, p.y + cy * L); ctx.stroke();
    } else if (o.t < on) {                     // khoảng lặng 0.1-0.2s: vạch khoá, sáng rực
      ctx.globalAlpha = 1; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + cx * L, p.y + cy * L); ctx.stroke();
    } else {                                   // cột laze: viền đỏ rộng + lõi trắng
      const k = (o.t - on) / o.beam;
      const w = o.hw * 2 * (k < 0.15 ? k / 0.15 : k > 0.8 ? (1 - k) / 0.2 : 1);
      ctx.globalAlpha = 0.55; ctx.strokeStyle = '#ff3b5c'; ctx.lineWidth = w;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + cx * L, p.y + cy * L); ctx.stroke();
      ctx.globalAlpha = 0.95; ctx.strokeStyle = '#fff4f6'; ctx.lineWidth = w * 0.35;
      ctx.stroke();
    }
    ctx.restore();
  },

  /* cái mỏ bay: tam giác vàng cam chĩa theo hướng bay, to dần theo quãng đường */
  _beak(ctx, o) {
    const s = 16 * (o.sc || 1);
    ctx.save();
    ctx.translate(o.x, o.y); ctx.rotate(o.ang);
    SC.draw.glow(ctx, 0, 0, s * 1.4, '#ffb01f', 0.35);
    ctx.fillStyle = '#ffb01f'; ctx.strokeStyle = '#5a2a00'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(s * 1.3, 0); ctx.lineTo(-s * 0.7, -s * 0.7); ctx.lineTo(-s * 0.4, 0); ctx.lineTo(-s * 0.7, s * 0.7);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ffe9a8';                  // gờ sáng trên mỏ cho có khối
    ctx.beginPath(); ctx.moveTo(s * 1.1, -s * 0.05); ctx.lineTo(-s * 0.5, -s * 0.55); ctx.lineTo(-s * 0.3, -s * 0.1);
    ctx.closePath(); ctx.fill();
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
  // + chiêu đặc trưng theo tạo hình (mổ / chưởng laze / quăng bộ phận) — mỗi trùm
  // một bộ riêng, xem SC.BossSig.SIG
  this.atkList = (lv.bossAtk || ['ring', 'aimed', 'eggRain', 'minions'])
    .concat(SC.BossSig.skillsFor(lv.bossArt));
  this.peckY = 0;        // độ rụt/lao cổ của chiêu mổ, chỉ ảnh hưởng hình vẽ
  this.missing = false;  // đang tháo một bộ phận đi quăng

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
  SC.BossSig.update(this, dt, player);          // mỏ, bộ phận, laze bay độc lập với act

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
  ctx.translate(this.x, this.y + (this.peckY || 0));   // peckY: rụt cổ / lao tới khi mổ
  if (this.flash > 0) ctx.filter = 'brightness(2.4)';

  SC.BossSkillArt.local(this, ctx);              // tay, mảnh tách, vòng gồng nộ
  SC.BossSigArt.socket(ctx, this);               // chỗ bộ phận vừa bị tháo đi quăng

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

  if (this.dz) {                                 // tàu phản bội hạng trùm (vô tận)
    ctx.save(); ctx.rotate(Math.PI);             // ảnh mũi hướng lên -> chúi xuống
    SC.BossArt._sprite(ctx, this.dz.img, this.r, this.t, this.phase);
    ctx.restore();
  } else SC.BossArt.draw(this.art, ctx, this.r, this.t, this.phase, this.hue);

  ctx.filter = 'none';
  ctx.restore();
  SC.BossSigArt.render(this, ctx);               // vật bay của chiêu đặc trưng (toạ độ thế giới)
};

;
/* ===== js/system-facing.js ===== */
/* system-facing.js — máy bay tự xoay súng về phía có quái: LÊN, XUỐNG, TRÁI, PHẢI
 *
 * Bản đầu chỉ có hai hướng (lật 180° khi bay lên trên quái). Thiếu hai hướng ngang:
 * quái tạt sườn — mà nhiều loại trong 22 loại mới bay ngang (strafe, weave, muỗi vây
 * hai bên) — thì súng vẫn chĩa dọc, đạn đi trọn hai làn trống.
 *
 * Nay hướng súng là một GÓC (p.aim, radian, 0 = chĩa lên) chọn trong bốn phương, và
 * p.aimAnim quay dần tới đó nên thân máy bay lượn mượt chứ không giật nấc.
 *
 * Hai thứ phải cẩn thận, nếu không sẽ rất khó chịu:
 *   - Phải có vùng chết: quái rải đều bốn phía mà cứ hơn nhau một con là xoay thì
 *     máy bay quay như chong chóng. Dùng NGƯỠNG lệch cộng thời gian chờ giữa hai lần.
 *   - Chỉ đếm quái ĐÁNG BẮN: con đã ra ngoài khung hình không được kéo hướng súng.
 *
 * p.face (-1 lên / 1 xuống) vẫn còn, suy ra từ p.aim, để phần mã cũ đọc nó không vỡ.
 */

SC.Facing = {
  GAP: 90,        // quái phải lệch hơn ngần này pixel mới được tính về một phía
  HOLD: 0.35,     // giây tối thiểu giữa hai lần đổi hướng
  NEED: 1.6,      // hướng mới phải "nặng" gấp ngần này lần mới được đổi
  TURN: 7.0,      // tốc độ quay thân (rad/giây)
  NEAR: 260,      // khoảng cách (px) mà tại đó trọng lượng một con còn một nửa

  /* Bốn phương theo thứ tự: lên · phải · xuống · trái */
  DIRS: [0, Math.PI / 2, Math.PI, -Math.PI / 2],

  reset(p) {
    p.aim = 0; p.aimAnim = 0; p.faceT = 0;
    p.face = -1;
  },

  /* Vector hướng ngắm — dùng chung cho súng, drone và khiên nên ba nơi không lệch nhau */
  vec(p) {
    const a = p.aim || 0;
    return { x: Math.sin(a), y: -Math.cos(a) };
  },

  update(dt, p, enemies, boss) {
    p.faceT = (p.faceT || 0) - dt;

    // Quay dần tới góc đích, đi theo đường ngắn nhất (không quay vòng qua 270°)
    let d = (p.aim || 0) - (p.aimAnim || 0);
    while (d > Math.PI) d -= 6.283;
    while (d < -Math.PI) d += 6.283;
    p.aimAnim = (p.aimAnim || 0) + SC.clamp(d, -this.TURN * dt, this.TURN * dt);

    // ---- TRẬN TRÙM: KHOÁ HƯỚNG VÀO TRÙM ----
    // Trùm gọi viện binh liên tục, mà quái phụ thì ở sát người chơi nên theo cách cân
    // trọng lượng bình thường chúng luôn thắng — súng bị kéo đi lung tung trong khi
    // thứ duy nhất đáng bắn đứng yên một chỗ. Ở đây ngắm THẲNG vào trùm, góc liên tục
    // chứ không bắt vào bốn phương, nên đạn bám sát dù trùm đang lượn.
    if (boss && !boss.dead && boss.y > -60) {
      p.aim = Math.atan2(boss.x - p.x, -(boss.y - p.y));
      p.face = Math.cos(p.aim) < 0 ? 1 : -1;
      return;
    }

    // cân trọng lượng mục tiêu ở bốn phía
    const w = [0, 0, 0, 0];
    const weigh = e => {
      if (!e || e.dead || e.y < -30 || e.y > SC.H + 30) return;   // ngoài khung -> bỏ
      const dx = e.x - p.x, dy = e.y - p.y;
      // trùm nặng gấp 4 con thường: đang đánh trùm thì đừng để lũ quái con kéo súng đi
      let k = e.isBoss ? 4 : 1;
      // CÀNG GẦN CÀNG NẶNG. Không có phần này thì đám quái mới đổ xuống từ mép trên
      // luôn áp đảo, và máy bay gần như không bao giờ quay ngang — đo được chỉ 0-3%
      // thời lượng, tức là tính năng có cũng như không. Một con áp sát bên hông nguy
      // hiểm hơn mười con còn ở tít trên đầu.
      k *= 1 / (1 + Math.sqrt(dx * dx + dy * dy) / this.NEAR);
      // Phương nào trội hơn thì con đó thuộc về phương ấy. So |dx| với |dy| chứ không
      // chia góc đều: quái chếch 45° thì hướng nào cũng bắn tới, không đáng để xoay.
      if (Math.abs(dy) >= Math.abs(dx)) {
        if (dy < -this.GAP) w[0] += k;
        else if (dy > this.GAP) w[2] += k;
      } else {
        if (dx > this.GAP) w[1] += k;
        else if (dx < -this.GAP) w[3] += k;
      }
    };
    for (const e of enemies) weigh(e);
    if (boss && !boss.dead && enemies.indexOf(boss) < 0) weigh(boss);

    if (p.faceT > 0) { p.face = Math.cos(p.aim) < 0 ? 1 : -1; return; }

    // Hướng đang dùng. Vừa hạ trùm xong thì p.aim còn là một góc bất kỳ (chế độ khoá
    // trùm ngắm liên tục), nên phải quy về phương gần nhất trước khi so sánh.
    let cur = this.DIRS.indexOf(p.aim);
    if (cur < 0) {
      cur = 0;
      let bd = 9;
      this.DIRS.forEach((a, i) => {
        let g = Math.abs(a - p.aim);
        if (g > Math.PI) g = 6.283 - g;
        if (g < bd) { bd = g; cur = i; }
      });
      p.aim = this.DIRS[cur];
    }
    let best = cur;
    for (let i = 0; i < 4; i++) if (w[i] > w[best]) best = i;

    if (best !== cur && w[best] > w[cur] * this.NEED && w[best] > 0) {
      p.aim = this.DIRS[best];
      p.faceT = this.HOLD;
      SC.FX.burst(p.x, p.y, '#7ae0ff', 8, 150, 1.6);   // khói xoay, để thấy rõ đã đổi hướng
    }
    // face cũ suy ra từ góc: mã nào chưa chuyển sang p.aim vẫn chạy đúng
    p.face = Math.cos(p.aim) < 0 ? 1 : -1;
  }
};

;
/* ===== js/system-bank.js ===== */
/* system-bank.js — nghiêng cánh khi lách đạn: hẹp thân lại, va chạm hẹp theo
 *
 * Ý tưởng: lượn ngang gấp thì máy bay xoay nghiêng, nhìn từ trên xuống chỉ còn thấy
 * một vạch mỏng. Đó là lúc nó lách được qua khe giữa hai làn đạn.
 *
 * Điều quan trọng làm cho cơ chế này "thật": vùng va chạm phải hẹp ĐÚNG BẰNG phần
 * thân đã hẹp lại. Nếu chỉ hẹp phần vẽ thì người chơi thấy mình lọt khe mà vẫn dính
 * đạn — cảm giác bị ăn gian, tệ hơn là không có gì.
 *
 * Đổi lại, nghiêng thì mất lực nâng: máy bay tụt nhẹ xuống, nên lách liên tục là
 * trôi dần về đáy màn hình. Người chơi phải chọn lúc mà lách.
 */

SC.Bank = {
  /* Nghiêng hết cỡ thì bề ngang còn bao nhiêu. Nhánh GIÁP ghi đè lên p.narrow:
     hạng nặng chỉ hẹp được tới 0.55, cơ động hẹp sâu tới 0.78 — đó là chỗ nhánh
     giáp cộng hưởng với cơ chế lách, thay vì chỉ cho thêm máu. */
  NARROW: 0.68,
  narrow(p) { return (p && p.narrow) || this.NARROW; },
  RATE: 7.0,        // tốc độ nghiêng vào (đơn vị/giây)
  BACK: 4.2,        // tốc độ trả về khi thôi lượn
  VMAX: 620,        // tốc ngang (px/s) coi là nghiêng hết cỡ
  SINK: 26,         // px/giây bị tụt xuống khi nghiêng hết cỡ

  reset(p) { p.bank = 0; p.bankDir = 0; this.grazed = 0; },

  /* Gọi mỗi khung SAU khi máy bay đã chạy xong chuyển động ngang */
  update(dt, p, prevX) {
    const vx = (p.x - prevX) / Math.max(dt, 1e-4);
    // Chỉ tính tốc độ THỰC SỰ ngang. Bám con trỏ theo lerp nên lúc gần tới đích
    // vx tụt nhanh, nghiêng cũng phải nhả ra theo — đó là cái làm nó có nhịp.
    const want = SC.clamp(Math.abs(vx) / this.VMAX, 0, 1);
    const k = want > p.bank ? this.RATE : this.BACK;
    p.bank += SC.clamp(want - p.bank, -k * dt, k * dt);
    if (Math.abs(vx) > 40) p.bankDir = vx > 0 ? 1 : -1;

    // nghiêng thì mất lực nâng -> tụt nhẹ, khiến lách liên tục có cái giá của nó
    if (p.bank > 0.15) p.y = SC.clamp(p.y + this.SINK * p.bank * dt, 40, SC.H - 24);

    // vệt gió ở đầu cánh: chỉ hiện khi nghiêng sâu, để người chơi ĐỌC được trạng thái
    if (p.bank > 0.55 && Math.random() < p.bank * 0.7) {
      const wing = p.r * 1.1 * (1 - p.bank * this.narrow(p));
      SC.FX.trail(p.x + p.bankDir * wing, p.y + SC.rnd(-3, 3), '#bfe9ff');
    }
  },

  /* Hệ số bề ngang hiện tại: 1 = thân đầy, nhỏ hơn = đã nghiêng.
     Dùng chung cho cả phần VẼ lẫn phần VA CHẠM nên hai bên không bao giờ lệch nhau. */
  squeeze(p) { return 1 - (p.bank || 0) * this.narrow(p); },

  /* Va chạm với máy bay: hình BẦU DỤC, hẹp dần theo độ nghiêng.
     Nén trục x rồi so như hình tròn — rẻ, và đúng với hình đang vẽ trên màn. */
  hitPlayer(p, o, mul) {
    const rr = p.r * (mul || 1);
    const dx = (o.x - p.x) / this.squeeze(p);      // nén ngang = thu hẹp bề ngang
    const dy = o.y - p.y;
    const reach = rr + o.r;
    return dx * dx + dy * dy < reach * reach;
  },

  /* ---------- SƯỢT ĐẠN ----------
     Viên đạn đáng lẽ đã trúng nếu không nghiêng cánh, nhưng đã trượt qua.
     Đây mới là thứ tạo ra cảm giác né: người chơi cần THẤY khoảnh khắc mình vừa
     lách được, chứ chỉ mất ít máu hơn thì không ai nhận ra. */
  GRAZE_MIN: 0.3,          // phải nghiêng ít nhất ngần này mới tính
  grazed: 0,

  /* true nếu viên đạn này vừa sượt qua nhờ nghiêng cánh */
  checkGraze(p, b, mul) {
    if (p.bank < this.GRAZE_MIN || b._grz) return false;
    // đã trúng thân đầy chưa? (tính như lúc KHÔNG nghiêng)
    const rr = p.r * (mul || 1) + b.r;
    const dx = b.x - p.x, dy = b.y - p.y;
    if (dx * dx + dy * dy >= rr * rr) return false;
    b._grz = 1;                                    // mỗi viên chỉ tính một lần
    return true;
  },

  /* Phần thưởng cho pha lách: tia sáng ở đúng chỗ sượt + điểm nhỏ.
     Cố ý KHÔNG cho máu hay vàng — thưởng vào tài nguyên thì người chơi sẽ lượn
     liên tục để cày, mà lượn liên tục thì mất hẳn nhịp lên xuống của màn chơi. */
  onGraze(g, p, b) {
    this.grazed++;
    g.score += 15;
    SC.FX.burst(b.x, b.y, '#bfe9ff', 5, 190, 1.7);
    if (this.grazed % 5 === 0) {                   // 5 pha liền mới kêu, đỡ ồn
      SC.FX.text(p.x, p.y - p.r * 2.2, 'LÁCH ĐẸP!', '#bfe9ff');
      SC.Audio.shield();
    }
  }
};

;
/* ===== js/system-gun.js ===== */
/* system-gun.js — súng của người chơi, thay hẳn Player._fire() cũ
 *
 * Bản cũ là chuỗi if (w===1)...else if (w===10) mà mỗi cấp chỉ THÊM TIA, tới cấp 10
 * là 13 tia phủ kín bề ngang — chính nó làm cho đứng yên một chỗ vẫn thắng. Đo được:
 * sát thương/giây từ 16 lên 6.579, gấp 411 lần, trong khi máu chỉ gấp 3.5.
 *
 * Bản này ghìm trần lại còn ~×6 cho phần cây kỹ năng, và bù phần "mạnh lên" bằng
 * ĐÚNG CÔNG CỤ CHO ĐÚNG TÌNH HUỐNG chứ không bằng số:
 *
 *   TRÀN ĐẠN  nhiều tia, đạn yếu, TẦM NGẮN — đạn tắt ở 55% chiều cao màn.
 *             Tầm ngắn là thứ ép người chơi rời khỏi đáy màn. Đây là chi tiết
 *             quan trọng nhất của cả nhánh: nó trả lại yếu tố điều khiển bằng
 *             LUẬT CHƠI, không phải bằng lời khuyên.
 *   XUYÊN PHÁ một tia to, bắn chậm, xuyên cả hàng. Đứng đúng trục là dọn sạch
 *             một cột; đứng sai là chẳng trúng gì.
 */

SC.Gun = {
  SPEED: 780,
  RANGE_A: 0.55,        // TRÀN ĐẠN cấp 1-6: đạn tắt sau 55% chiều cao màn
  RANGE_STEP: 0.045,    // mỗi cấp vượt bảng nới thêm ngần này
  RANGE_MAX: 0.90,

  /* Tầm đạn của TRÀN ĐẠN NỚI RỘNG DẦN từ cấp 7 trở đi.
   *
   * Vì sao: mô phỏng 960 lượt cho thấy ở vòng vô tận nhánh này thua vì CHẾT (27 lượt)
   * chứ không phải vì thiếu sát thương (4 lượt hết giờ) — trong khi nhánh xuyên phá
   * chỉ chết 0-4 lượt. Giới hạn tầm ép người chơi lao vào giữa lưới đạn, mà sát thương
   * và nhịp bắn của quái thì tăng theo vòng còn cái giá phải trả đó thì không đổi.
   *
   * Giữ nguyên 55% cho sáu cấp đầu: đó là chặng dạy người chơi phải tiến lên, và ở
   * chiến dịch nó vẫn thắng 88% nên bài học đó không hỏng. */
  rangeA() {
    const over = Math.max(0, SC.Tree.lv('wpn') - 6);
    return Math.min(this.RANGE_MAX, this.RANGE_A + over * this.RANGE_STEP);
  },

  /* Sơ đồ theo cấp nhánh 1..6. n = số tia, spread = góc lệch giữa hai tia ngoài cùng,
     dmgMul nhân vào sát thương mỗi viên, rateMul nhân vào GIÃN CÁCH (nhỏ = bắn nhanh). */
  A: SC.bal('gun.A', [
    { n: 1, spread: 0,    dmgMul: 1.00, rateMul: 1.00 },
    { n: 2, spread: 0,    dmgMul: 1.00, rateMul: 1.00 },
    { n: 3, spread: 0.13, dmgMul: 1.00, rateMul: 0.96 },
    { n: 3, spread: 0.15, dmgMul: 1.15, rateMul: 0.92 },
    { n: 4, spread: 0.17, dmgMul: 1.15, rateMul: 0.88 },
    { n: 4, spread: 0.23, dmgMul: 1.20, rateMul: 0.82 },
    // Ba cấp hậu chiến dịch: dồn vào SÁT THƯƠNG MỖI VIÊN chứ không rải thêm tia.
    // Thêm tia thì lại quay về bệnh cũ (13 tia phủ kín màn, khỏi cần ngắm); tăng
    // sức mỗi viên thì trùm chết nhanh hơn mà quái thường vẫn phải bắn trúng.
    { n: 5, spread: 0.24, dmgMul: 1.35, rateMul: 0.80 },
    { n: 5, spread: 0.26, dmgMul: 1.55, rateMul: 0.78 },
    { n: 6, spread: 0.28, dmgMul: 1.80, rateMul: 0.75 },
    /* Mốc 10 KHÔNG mua được (bảng giá chỉ có 9 cấp) — nó tồn tại để ĐẶT ĐỘ DỐC cho
       phần nội suy vô hạn, vì tierOf() suy ra bước tăng từ hai hàng cuối.
       Vì sao cần: đo 960 lượt thấy bước sát thương của hướng này chỉ +0,25/cấp trong
       khi hướng xuyên phá +0,80/cấp — lệch 3,2 lần, mà hướng kia còn xuyên thêm 18
       con mỗi phát. Kết quả: ở vòng vô tận hướng tràn đạn tụt còn 38% tỉ lệ thắng.
       Đặt bước +0,80 cho cân, phần bù cho việc không có xuyên nằm ở số tia. */
    { n: 7, spread: 0.30, dmgMul: 2.60, rateMul: 0.73 }
  ]),
  B: SC.bal('gun.B', [
    { n: 1, pierce: 0, dmgMul: 1.00, rateMul: 1.00 },
    { n: 1, pierce: 1, dmgMul: 1.55, rateMul: 1.05 },
    { n: 1, pierce: 2, dmgMul: 2.10, rateMul: 1.10 },
    { n: 1, pierce: 2, dmgMul: 2.70, rateMul: 1.12 },
    { n: 2, pierce: 3, dmgMul: 2.70, rateMul: 1.15 },
    { n: 2, pierce: 4, dmgMul: 3.30, rateMul: 1.15 },
    // Hướng xuyên là hướng diệt trùm, nên ba cấp cuối dốc hơn hẳn hướng tràn đạn —
    // đây đúng là chỗ nó phải toả sáng.
    { n: 2, pierce: 5, dmgMul: 4.20, rateMul: 1.12 },
    { n: 2, pierce: 6, dmgMul: 5.20, rateMul: 1.08 },
    { n: 3, pierce: 7, dmgMul: 6.00, rateMul: 1.05 },
    // Mốc 10 chỉ để neo độ dốc, giống bảng A ở trên. n phải là 4 chứ không phải 3:
    // để 3 là bước tăng số tia thành 0, đo ra sát thương của cả hướng này sụt 4,7 lần.
    { n: 4, pierce: 8, dmgMul: 6.80, rateMul: 1.02 }
  ]),
  RUN: SC.bal('gun.run', { mul: 0.10, every: 3 }),

  /* Sơ đồ đang áp dụng. Chưa rẽ hướng thì dùng mốc TRÀN ĐẠN — nó trung tính nhất. */
  MAX_N: 12,        // trần số tia: đông hơn thì đạn phủ kín màn, khỏi cần ngắm nữa

  /* Chạm trần tia thì phần tia THỪA quy hết sang sát thương mỗi viên.
     Vì sao bắt buộc: mô phỏng 120 màn cho thấy TRÀN ĐẠN tụt còn 50% tỉ lệ thắng ở
     vòng vô tận trong khi XUYÊN PHÁ giữ 85-100% — do sát thương của TRÀN ĐẠN đến từ
     SỐ TIA (bị chặn ở 12) còn của XUYÊN PHÁ đến từ hệ số sát thương (không chặn).
     Người chơi đã trả vàng cho những tia đó thì phải nhận đủ giá trị, chỉ là nhận
     dưới dạng khác. */
  tier() {
    const lv = SC.Tree.lv('wpn'), path = SC.Tree.path('wpn') || 'A';
    const t = SC.Tree.tierOf(this[path], Math.max(1, lv));
    if (t.n <= this.MAX_N) return t;
    return Object.assign({}, t, {
      n: this.MAX_N,
      dmgMul: t.dmgMul * (t.n / this.MAX_N)
    });
  },
  isPierce() { return SC.Tree.path('wpn') === 'B'; },

  /* Cấp vũ khí nhặt trong màn (1..maxWeapon): vòng thưởng NGẮN HẠN, reset mỗi map.
     Đo được: để nó quá nhẹ (×1.4 ở cấp 10) thì nửa đầu game không có cảm giác mạnh
     lên trong màn, mà cây kỹ năng thì chưa kịp mở — vào map là chỉ có cày chậm.
     Nay lên ×1.9 và +3 tia ở cấp 10. Trần tổng: cây ×6 × trong màn ×3.3 ≈ ×19,
     so với ×411 của bản cũ. */
  runMul(w) { return 1 + (w - 1) * this.RUN.mul; },
  runExtra(w) { return Math.floor((w - 1) / this.RUN.every); },

  /* Giãn cách giữa hai loạt */
  interval(p) { return SC.CFG.fireBase * this.tier().rateMul; },

  /* ---------- bắn một loạt ---------- */
  fire(p) {
    const t = this.tier(), pierce = this.isPierce();
    // Bắn theo GÓC ĐANG VẼ (aimAnim) chứ không theo góc đích: người chơi thấy mũi máy
    // bay quay tới đâu thì đạn đi tới đó, kể cả trong lúc đang xoay dở.
    const A = p.aimAnim || 0;
    const sA = Math.sin(A), cA = Math.cos(A);
    const w = p.weapon;
    // nhân thuộc tính ẩn SÁT THƯƠNG SAU khi làm tròn — làm tròn sau thì +1% của
    // đạn 2-4 sát thương mất trắng
    const dmg = Math.max(1, Math.round(2 * t.dmgMul * this.runMul(w))) * SC.EvoGarage.mul('atk');

    // Cả loạt tính là MỘT lần bắn. Loạt bắn vào chỗ trống không có gì để trúng nên
    // không tính vào độ chính xác.
    const hasTarget = SC.Game.enemies.some(e => !e.dead && e.y > -20 && e.y < SC.H);
    const vol = hasTarget ? ++p.volley : -1;
    if (hasTarget) p.shots++;

    const n = t.n + (pierce ? 0 : this.runExtra(w));
    const kind = pierce ? 'lance' : 'shot';
    const half = pierce ? 0.055 : (t.spread || 0);

    for (let i = 0; i < n; i++) {
      // n tia rải đều trong khoảng [-half, +half]; một tia thì đi thẳng
      const k = n === 1 ? 0 : (i / (n - 1)) * 2 - 1;
      const a = A + k * half;                     // góc thật của tia này
      const ox = k * (pierce ? 9 : 7 + n * 2.2);
      // nòng nằm ở mũi máy bay, các tia lệch sang hai bên theo phương VUÔNG GÓC với
      // hướng ngắm — nếu cộng thẳng vào x thì lúc bắn ngang cả loạt đạn xếp chồng nhau
      const b = SC.Bullets.spawnMine(
        p.x + sA * p.r * 1.4 + ox * cA,
        p.y - cA * p.r * 1.4 + ox * sA,
        Math.sin(a) * this.SPEED, -Math.cos(a) * this.SPEED,
        dmg, kind
      );
      if (hasTarget) b.vol = vol;
      if (pierce) b.pierce = (t.pierce || 0) + this.runExtra(w);
      else b.ttl = b.life = (SC.H * this.rangeA()) / this.SPEED;   // TẦM NGẮN, nới dần theo cấp
      SC.Mods.attach(b);
    }
  },

  /* ---------- đo đạc, dùng cho mô phỏng cân bằng ----------
     Sát thương/giây danh nghĩa: giả định mọi tia đều trúng. Với TRÀN ĐẠN con số này
     lạc quan hơn thực tế nhiều vì các tia toả ra và tầm bị cắt. */
  dps(lvOverride, pathOverride, w) {
    const path = pathOverride || SC.Tree.path('wpn') || 'A';
    const lv = lvOverride === undefined ? SC.Tree.lv('wpn') : lvOverride;
    const t = SC.Tree.tierOf(this[path], Math.max(1, lv));
    const ww = w || 1;
    const dmg = Math.max(1, Math.round(2 * t.dmgMul * this.runMul(ww))) * SC.EvoGarage.mul('atk');
    const n = t.n + (path === 'B' ? 0 : this.runExtra(ww));
    return n * dmg / (SC.CFG.fireBase * t.rateMul);
  }
};

;
/* ===== js/system-armor.js ===== */
/* system-armor.js — nhánh GIÁP: đổi DÁNG VÓC và CẢM GIÁC LÁI, không chỉ đổi số máu
 *
 * Bản cũ giáp chỉ là hpMax += lv*25. Đo ở phiên trước: dòng này gần như không rút
 * ngắn thời gian màn (×1.12 so với bản trắng) — người chơi bỏ vàng vào đó là lỗ.
 *
 * Bản này mỗi hướng đổi NĂM thứ cùng lúc, nên hai hướng lái khác hẳn nhau:
 *   HẠNG NẶNG  máu dày, thân to hơn (dễ trúng hơn), bám con trỏ chậm, nghiêng cánh
 *              không hẹp được nhiều — nhưng bất tử sau đòn lâu, chịu được cú thứ hai.
 *   CƠ ĐỘNG    máu mỏng, thân nhỏ, bám con trỏ rất nhanh, nghiêng cánh lách sâu nhất.
 *
 * Cơ động cộng hưởng với cơ chế lách đạn (system-bank.js), hạng nặng cộng hưởng với
 * khiên từ trường. Đó là hai lối chơi thật sự khác nhau, không phải "nhiều máu hơn".
 *
 * GIÁP cố ý KHÔNG nằm trong khoá tra 8 biến thể — xem js/data-variants.js.
 */

SC.Armor = {
  /* hp cộng thêm · hệ số bán kính thân · hệ số bám con trỏ · giây bất tử · độ hẹp tối đa */
  A: SC.bal('armor.A', [
    { hp: 25,  r: 1.00, follow: 1.00, inv: 0.90, narrow: 0.68 },
    { hp: 70,  r: 1.06, follow: 0.96, inv: 0.98, narrow: 0.64 },
    { hp: 115, r: 1.10, follow: 0.93, inv: 1.04, narrow: 0.61 },
    { hp: 160, r: 1.14, follow: 0.90, inv: 1.10, narrow: 0.58 },
    { hp: 205, r: 1.16, follow: 0.87, inv: 1.15, narrow: 0.56 },
    { hp: 250, r: 1.18, follow: 0.85, inv: 1.22, narrow: 0.55 }
  ]),
  B: SC.bal('armor.B', [
    { hp: 25,  r: 1.00, follow: 1.00, inv: 0.90, narrow: 0.68 },
    { hp: 40,  r: 0.97, follow: 1.05, inv: 0.86, narrow: 0.71 },
    { hp: 55,  r: 0.94, follow: 1.10, inv: 0.82, narrow: 0.73 },
    { hp: 70,  r: 0.92, follow: 1.14, inv: 0.78, narrow: 0.75 },
    { hp: 85,  r: 0.90, follow: 1.17, inv: 0.74, narrow: 0.77 },
    { hp: 100, r: 0.88, follow: 1.20, inv: 0.70, narrow: 0.78 }
  ]),

  tier() {
    const lv = SC.Tree.lv('armor');
    if (lv < 1) return { hp: 0, r: 1, follow: 1, inv: SC.CFG.iFrame, narrow: 0.68 };
    const t = SC.Tree.tierOf(this[SC.Tree.path('armor') || 'A'], lv);
    // Bốn chỉ số này phải có trần cứng, nếu không cấp vô hạn sẽ đẻ ra máy bay to bằng
    // nửa màn hoặc nhỏ bằng hạt đậu, bám con trỏ tức thời và bất tử vĩnh viễn.
    return {
      hp: t.hp,
      r: SC.clamp(t.r, 0.72, 1.35),
      follow: SC.clamp(t.follow, 0.6, 1.45),
      inv: SC.clamp(t.inv, 0.55, 1.8),
      narrow: SC.clamp(t.narrow, 0.4, 0.86)
    };
  },

  /* Gọi trong Player.reset(). Đặt thẳng lên máy bay để mọi hệ khác đọc một chỗ. */
  apply(p) {
    const t = this.tier();
    p.hpMax = SC.CFG.playerHP + t.hp;
    p.hp = p.hpMax;
    p.r = SC.CFG.playerRadius * t.r;
    p.follow = SC.CFG.playerFollow * t.follow;
    p.invTime = t.inv;
    p.narrow = t.narrow;      // system-bank.js đọc để biết nghiêng được sâu tới đâu
  }
};

;
/* ===== js/system-shield.js ===== */
/* system-shield.js — nhánh KHIÊN: thôi làm thanh máu thứ hai, bắt đầu có hành vi
 *
 * Bản cũ khiên chỉ là shieldMax = 60 + lv*15, chịu đòn trước máu. Đo được ×1.11 so
 * với bản trắng — mua nó gần như không đổi gì.
 *
 * TỪ TRƯỜNG   vòng khiên rộng dần, tự ĐỐT quái chạm vào. Đổi lại hao bền liên tục
 *             khi có quái trong vùng. Lối chơi: lao vào giữa đám đông mà ủi, và
 *             phải biết lúc nào còn đủ bền để ủi.
 * PHẢN CHIẾU  BẬT NGƯỢC đạn địch — nhưng chỉ đạn đi vào NỬA TRƯỚC theo hướng máy bay
 *             đang quay. Người chơi phải chủ động lái để hứng đạn đúng mặt. Đây là
 *             chỗ có trần kỹ năng cao nhất cả cây, và nó ăn khớp thẳng với cơ chế
 *             quay đầu bắn ngược đã có (system-facing.js).
 *
 * Khiên KHÔNG thu hẹp theo độ nghiêng cánh: nghiêng thì thân nhỏ lại nhưng vòng khiên
 * giữ nguyên. Đánh đổi có chủ ý — lách thì né được đạn nhưng mất lợi thế từ trường.
 */

SC.Shield = {
  /* Hồi bền phải RẤT chậm. Bản đầu để 5-14/giây, đo ra người chơi đứng yên ở đáy màn
     gần như bất tử: hoả lực địch thưa hơn tốc hồi nên khiên không bao giờ cạn, kết
     thúc map 35 vẫn còn 318/350 máu. Khiên là ĐỆM CHỊU ĐÒN, không phải nguồn máu vô hạn. */
  IDLE: SC.bal('shield.idle', 3.0),   // giây phải ngơi trước khi bắt đầu hồi
  CAP: SC.bal('shield.cap', 0.6),     // chỉ tự hồi tới 60% độ bền, còn lại phải nhặt vật phẩm

  /* bền · bán kính (× bán kính thân) · sát thương/giây · hao bền/giây khi đang đốt */
  A: SC.bal('shield.A', [
    { dur: 60,  rad: 1.8, dps: 0,  drain: 0,  regen: 1.5 },
    { dur: 80,  rad: 1.9, dps: 10, drain: 8,  regen: 1.8 },
    { dur: 100, rad: 2.3, dps: 14, drain: 9,  regen: 2.2 },
    { dur: 120, rad: 2.5, dps: 20, drain: 10, regen: 2.6 },
    { dur: 145, rad: 2.9, dps: 26, drain: 11, regen: 3.0 },
    { dur: 175, rad: 3.2, dps: 34, drain: 9,  regen: 4.0 }
  ]),
  /* bền · bán kính · giá mỗi lần bật · hệ số sát thương đạn bật lại · bật được hoả tiễn */
  B: SC.bal('shield.B', [
    { dur: 60,  rad: 1.6, cost: 0,  mul: 0,   rocket: 0, blast: 0, regen: 1.5 },
    { dur: 80,  rad: 1.6, cost: 9,  mul: 1.2, rocket: 0, blast: 0, regen: 1.8 },
    { dur: 100, rad: 1.7, cost: 8,  mul: 1.4, rocket: 0, blast: 0, regen: 2.2 },
    { dur: 120, rad: 1.7, cost: 7,  mul: 1.8, rocket: 0, blast: 0, regen: 2.6 },
    { dur: 145, rad: 1.8, cost: 6,  mul: 2.2, rocket: 1, blast: 0, regen: 3.0 },
    { dur: 175, rad: 1.8, cost: 5,  mul: 2.6, rocket: 1, blast: 1, regen: 4.0 }
  ]),

  kind() { return SC.Tree.path('shield') || 'A'; },
  tier() {
    const lv = SC.Tree.lv('shield'), k = this.kind();
    if (lv < 1) return null;
    const t = SC.Tree.tierOf(this[k], lv);
    return Object.assign({}, t, {
      // bán kính từ trường có trần: rộng quá thì chỉ cần bay ngang là dọn sạch màn
      rad: Math.min(4.2, t.rad),
      // Giá bật đạn phải có SÀN 1. Bảng đi 9→8→7→6→5 nên nội suy tới cấp 11 là 0 và
      // cấp 12 là ÂM — khiên tự hồi bền mỗi lần bật đạn, tức là bật vô hạn miễn phí.
      cost: Math.max(1, t.cost || 0)
    });
  },

  reset(p) {
    const t = this.tier();
    p.shieldMax = t ? t.dur : 60;
    p.shield = t ? t.dur : 0;          // có nhánh khiên là vào màn đã có khiên
    p.shFlash = 0;                     // loé lên khi vừa bật được đạn
    p.shIdle = 0;
  },

  radius(p) {
    const t = this.tier();
    return p.r * (t ? t.rad : 1.8);
  },

  update(dt, p, g) {
    const t = this.tier();
    if (!t || p.dead) return;
    if (p.shFlash > 0) p.shFlash -= dt;

    if (this.kind() === 'A') this._field(dt, p, g, t);
    else this._mirror(dt, p, g, t);

    // Hồi bền khi đã ngơi một lúc, và CHỈ tới 60% — thưởng cho người biết rút ra,
    // nhưng không đủ để nấp một chỗ mà sống mãi. Muốn đầy lại phải nhặt vật phẩm khiên.
    p.shIdle += dt;
    const cap = p.shieldMax * this.CAP;
    if (p.shIdle > this.IDLE && p.shield < cap)
      p.shield = Math.min(cap, p.shield + t.regen * dt);
  },

  /* Giá bền cho mỗi viên đạn địch bị từ trường đốt cháy.
     1,2 chứ không phải 3: để 3 thì ở vòng vô tận (500+ viên trên màn) khiên cháy sạch
     sau chưa tới 160 viên, tức là cơ chế mới gần như không kịp hoạt động. Đổi lại nó
     KHÔNG thu lại được gì, khác với khiên phản chiếu biến đạn thành sát thương. */
  BURN_COST: 1.2,

  /* TỪ TRƯỜNG: đốt theo GIÂY chứ không theo lần chạm, nên quái trâu vẫn phải bắn.
     Đồng thời ĐỐT CHÁY ĐẠN ĐỊCH bay vào vùng.
   *
   * Vì sao thêm phần đốt đạn: mô phỏng cho thấy ở vòng vô tận mọi biến thể dùng khiên
   * TỪ TRƯỜNG đều tụt hẳn so với khiên PHẢN CHIẾU (33% so với 100%). Gốc rễ là vòng
   * vô tận nhân NHỊP BẮN của quái lên — nên thứ nào xoá được đạn thì càng lên cao càng
   * lợi, còn thứ chỉ thêm sát thương thì không. Bản cũ từ trường không đụng gì tới đạn,
   * thành ra một nhánh phòng thủ lại không phòng thủ được đúng mối đe doạ đang lớn dần.
   *
   * Khác PHẢN CHIẾU ở chỗ: phản chiếu BẬT NGƯỢC đạn thành sát thương nhưng chỉ ăn ở
   * nửa trước; từ trường XOÁ đạn ở mọi hướng nhưng không thu lại được gì. */
  _field(dt, p, g, t) {
    if (p.shield <= 0 || !t.dps) return;
    const R = this.radius(p);
    let burning = false;
    for (const e of g.enemies) {
      if (e.dead || SC.dist2(e.x, e.y, p.x, p.y) > (R + e.r) ** 2) continue;
      burning = true;
      e._burn = (e._burn || 0) + t.dps * dt;
      if (e._burn >= 1) {
        const d = Math.floor(e._burn);
        e._burn -= d;
        if (e.hurt(d)) SC.Combat.killEnemy(g, e);
      }
      if (Math.random() < 0.25) SC.FX.trail(e.x + SC.rnd(-6, 6), e.y, '#4dff9f');
    }

    for (let i = SC.Bullets.foe.length - 1; i >= 0; i--) {
      if (p.shield < this.BURN_COST) break;
      const b = SC.Bullets.foe[i];
      if (SC.dist2(b.x, b.y, p.x, p.y) > (R + b.r) ** 2) continue;
      SC.Bullets.foe.splice(i, 1);
      p.shield -= this.BURN_COST;
      p.shIdle = 0;
      p.shFlash = 0.14;
      SC.FX.burst(b.x, b.y, '#4dff9f', 5, 170, 1.8);
    }

    if (burning) {
      p.shield = Math.max(0, p.shield - t.drain * dt);
      p.shIdle = 0;
    }
  },

  /* PHẢN CHIẾU: chỉ ăn đạn đi vào nửa trước theo hướng máy bay đang quay */
  _mirror(dt, p, g, t) {
    if (p.shield <= 0 || !t.mul) return;
    const R = this.radius(p);
    for (let i = SC.Bullets.foe.length - 1; i >= 0; i--) {
      const b = SC.Bullets.foe[i];
      if (b.kind === 'rocket' && !t.rocket) continue;
      if (SC.dist2(b.x, b.y, p.x, p.y) > (R + b.r) ** 2) continue;
      if (!this.canReflect(p, b)) continue;
      if (p.shield < t.cost) break;

      SC.Bullets.foe.splice(i, 1);
      p.shield -= t.cost;
      p.shIdle = 0;
      p.shFlash = 0.22;

      const sp = Math.max(560, Math.hypot(b.vx, b.vy));
      const a = SC.angTo(p.x, p.y, b.x, b.y);
      const nb = SC.Bullets.spawnMine(
        b.x, b.y, Math.cos(a) * sp, Math.sin(a) * sp,
        Math.round(10 * t.mul), 'shot'
      );
      nb.reflected = 1;
      if (t.blast) nb.chain = 2;      // cấp 6: đạn bật lại nổ lan sang con bên cạnh
      SC.FX.burst(b.x, b.y, '#ffd23f', 8, 220, 2.2);
      SC.Audio.shield();
    }
  },

  /* Nửa trước = nửa nằm về phía máy bay đang chĩa. Xét bằng tích vô hướng với vector
     ngắm, nên luật đúng cho cả bốn hướng chứ không chỉ trên/dưới như bản đầu. */
  canReflect(p, b) {
    const v = SC.Facing.vec({ aim: p.aimAnim || 0 });
    return (b.x - p.x) * v.x + (b.y - p.y) * v.y > 0;
  },

  /* TỪ TRƯỜNG giảm sát thương nhận vào khi còn bền.
   *
   * Vì sao: đo ở vòng vô tận, BÃO ĐẠN (tràn đạn + bầy đàn + từ trường) là biến thể
   * DUY NHẤT không có cách nào giảm hoả lực địch — không xuyên để dọn sớm, không bật
   * đạn, không dí. Nó thua 0/3 và cả ba lượt đều là CHẾT, không lượt nào hết giờ.
   * Một trường lực mà không đỡ được gì thì cái tên cũng sai.
   *
   * Chỉ áp cho hướng TỪ TRƯỜNG: hướng PHẢN CHIẾU đã có cách riêng là bật đạn ngược. */
  MITIGATE: 0.22,

  mitigate(p, dmg) {
    if (this.kind() !== 'A' || p.shield <= 0) return dmg;
    const t = this.tier();
    if (!t || !t.dps) return dmg;                 // cấp 1 chưa có từ trường thật
    return Math.max(1, Math.round(dmg * (1 - this.MITIGATE)));
  }
};

;
/* ===== js/system-shield-art.js ===== */
/* system-shield-art.js — vẽ hai loại khiên, nhìn là biết đang chạy hướng nào
 *
 * TỪ TRƯỜNG  vòng dày, có gợn sóng chạy, tông lục — trông như một vùng nóng.
 * PHẢN CHIẾU vòng mỏng ghép từ các mảnh lục giác, ĐẬM HẲN Ở NỬA TRƯỚC để người chơi
 *            đọc được mặt nào đang đỡ được đạn. Không vẽ rõ chỗ đó thì cơ chế
 *            "quay mặt về phía đạn" thành ra đoán mò.
 */

SC.ShieldArt = {
  render(ctx, p) {
    const t = SC.Shield.tier();
    if (!t || p.shield <= 0) return;
    const R = SC.Shield.radius(p);
    const k = p.shield / p.shieldMax;
    ctx.save();
    ctx.translate(p.x, p.y);
    if (SC.Shield.kind() === 'A') this._field(ctx, p, R, k, t);
    else this._mirror(ctx, p, R, k, t);
    ctx.restore();
  },

  _field(ctx, p, R, k, t) {
    // vùng nóng bên trong — mờ, để không che mất máy bay
    const g = ctx.createRadialGradient(0, 0, R * 0.35, 0, 0, R);
    g.addColorStop(0, 'rgba(77,255,159,0)');
    g.addColorStop(0.7, `rgba(77,255,159,${0.05 + k * 0.07})`);
    g.addColorStop(1, `rgba(77,255,159,${0.16 + k * 0.14})`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(0, 0, R, 0, 6.283); ctx.fill();

    // gợn sóng chạy quanh vành: 3 lớp lệch pha, dày lên khi cấp cao
    ctx.lineWidth = 1.4 + (t.dps > 20 ? 1.4 : 0);
    for (let i = 0; i < 3; i++) {
      const ph = p.t * (2.2 + i * 0.7) + i * 2.1;
      ctx.strokeStyle = `rgba(120,255,190,${(0.30 + k * 0.35) * (1 - i * 0.25)})`;
      ctx.beginPath();
      for (let a = 0; a <= 6.30; a += 0.16) {
        const rr = R + Math.sin(a * 6 + ph) * 2.6;
        const x = Math.cos(a) * rr, y = Math.sin(a) * rr;
        a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath(); ctx.stroke();
    }
  },

  _mirror(ctx, p, R, k, t) {
    const flash = p.shFlash > 0 ? p.shFlash / 0.22 : 0;
    // Vector ngắm, để mảnh sáng luôn nằm đúng nửa đang đỡ được đạn — kể cả khi máy
    // bay quay ngang. Vẽ sai chỗ này thì cơ chế "quay mặt về phía đạn" thành đoán mò.
    const v = SC.Facing.vec({ aim: p.aimAnim || 0 });

    // 12 mảnh lục giác quanh vòng; mảnh ở NỬA TRƯỚC sáng gấp ba
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * 6.283 + p.t * 0.4;
      const front = Math.cos(a) * v.x + Math.sin(a) * v.y > 0;
      const al = (front ? 0.55 : 0.16) * (0.4 + k * 0.6) + flash * (front ? 0.4 : 0.1);
      ctx.save();
      ctx.translate(Math.cos(a) * R, Math.sin(a) * R);
      ctx.rotate(a);
      ctx.fillStyle = `rgba(255,214,63,${al})`;
      ctx.strokeStyle = `rgba(255,240,180,${al + 0.2})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      const s = R * 0.30;
      for (let j = 0; j < 6; j++) {
        const b = (j / 6) * 6.283;
        j === 0 ? ctx.moveTo(Math.cos(b) * s, Math.sin(b) * s * 0.5)
          : ctx.lineTo(Math.cos(b) * s, Math.sin(b) * s * 0.5);
      }
      ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.restore();
    }

    if (flash > 0) SC.draw.glow(ctx, 0, 0, R * 2.2 * flash, '#ffd23f', flash * 0.6);
  }
};

;
/* ===== js/entity-ship-art.js ===== */
/* entity-ship-art.js — máy bay dựng theo BỘ PHẬN, không vẽ lại 8 lần
 *
 * thân (3 dáng theo GIÁP) × cánh (2 dáng theo VŨ KHÍ) × hào quang (2 dáng theo KHIÊN)
 * × màu (theo biến thể) — tổ hợp ra 8 dáng phân biệt rõ mà chỉ phải vẽ ~7 mảnh.
 *
 * Toàn bộ được vẽ MỘT LẦN vào canvas đệm khi tổ hợp đổi, mỗi khung chỉ dán ảnh.
 * Vẽ 7 mảnh có gradient mỗi khung hình thì điện thoại tụt khung ngay.
 */

SC.ShipArt = {
  _cache: {},
  PAD: 2.6,             // canvas đệm rộng gấp ngần này bán kính, chừa chỗ cho cánh

  /* Khoá gộp mọi thứ ảnh hưởng tới hình dáng. Đổi khoá là dựng lại sprite. */
  sig(r, evo) {
    return [
      SC.Tree.path('wpn') || '-', SC.Tree.path('drone') || '-',
      SC.Tree.path('shield') || '-', SC.Tree.path('armor') || '-',
      evo, Math.round(r)
    ].join('|');
  },

  draw(ctx, r, tilt) {
    const s = this.sprite(r, SC.Tree.evo());
    const size = r * this.PAD * 2;
    ctx.save();
    ctx.rotate(tilt * 0.32);
    ctx.drawImage(s, -size / 2, -size / 2, size, size);
    ctx.restore();
  },

  /* Sprite theo mức tiến hoá CHỈ ĐỊNH — màn tiến hoá cần vẽ được cả dạng cũ lẫn dạng
     mới cạnh nhau, mà dạng cũ thì trạng thái cây đã không còn mô tả nữa.
     Kho nhớ theo khoá nên hai dạng cùng tồn tại, không đá nhau. */
  sprite(r, evo) {
    const k = this.sig(r, evo);
    if (!this._cache[k]) this._cache[k] = this._build(r, evo);
    return this._cache[k];
  },

  /* ---------- dựng sprite ---------- */
  _build(r, evoArg) {
    const dpr = Math.min(3, (window.devicePixelRatio || 1) * 2);
    const size = r * this.PAD * 2;
    const c = document.createElement('canvas');
    c.width = c.height = Math.ceil(size * dpr);
    const g = c.getContext('2d');
    g.scale(dpr, dpr);
    g.translate(size / 2, size / 2);

    const hue = SC.Variant.hue();
    const evo = evoArg === undefined ? SC.Tree.evo() : evoArg;
    g.strokeStyle = '#16294a'; g.lineWidth = 2; g.lineJoin = 'round';

    this._aura(g, r, hue, evo);

    // Sprite AI thay cánh + thân; hào quang GIỮ vẽ thủ tục vì nó là tín hiệu
    // đọc nhánh khiên/tiến hoá. Nhuộm màu biến thể lên sprite để variant vẫn
    // phân biệt được (sprite tĩnh chỉ có một bản màu gốc).
    const img = SC.SpriteArt && SC.SpriteArt.get('ship', 'player');
    if (img) {
      // 2.3 -> 2.8 (21/09/2026): trên điện thoại tàu bé quá nhìn không ra asset.
      // Chỉ phóng HÌNH — hitbox vẫn theo r, buffer PAD 2.6 (đường kính 5.2r) dư chỗ.
      const s = r * 2.8;
      g.drawImage(img, -s / 2, -s / 2, s, s);
      g.globalCompositeOperation = 'source-atop';
      g.globalAlpha = 0.2;
      g.fillStyle = hue;
      g.fillRect(-size / 2, -size / 2, size, size);
      g.globalAlpha = 1;
      g.globalCompositeOperation = 'source-over';
      return c;
    }

    this._wings(g, r, hue, evo);
    this._body(g, r, hue, evo);
    return c;
  },

  /* Hào quang theo KHIÊN — chỉ hiện từ tiến hoá 1, là dấu hiệu đọc được từ xa */
  _aura(g, r, hue, evo) {
    // Đã thành biến thể thì hào quang là VFX ĐỘNG vẽ mỗi khung (system-aura-vfx.js,
    // 22/09/2026) — nướng thêm bản tĩnh vào đây là hai lớp chồng nhau.
    if (evo < 1 || (SC.AuraFX && SC.Tree.variant())) return;
    const mirror = SC.Tree.path('shield') === 'B';
    g.save();
    g.globalAlpha = evo >= 2 ? 0.55 : 0.32;
    if (mirror) {
      // phản chiếu: bốn tấm chắn góc cạnh
      g.fillStyle = hue;
      for (let i = 0; i < 4; i++) {
        g.save(); g.rotate(i * 1.5708 + 0.785);
        g.beginPath();
        g.moveTo(0, -r * 1.75); g.lineTo(r * 0.42, -r * 1.35);
        g.lineTo(0, -r * 1.15); g.lineTo(-r * 0.42, -r * 1.35);
        g.closePath(); g.fill();
        g.restore();
      }
    } else {
      // từ trường: vành tròn mềm
      g.strokeStyle = hue; g.lineWidth = evo >= 2 ? 4 : 2.5;
      g.beginPath(); g.arc(0, 0, r * 1.6, 0, 6.283); g.stroke();
    }
    g.restore();
    g.strokeStyle = '#16294a'; g.lineWidth = 2;
  },

  /* Cánh theo VŨ KHÍ: tràn đạn = cánh xoè rộng nhiều mấu; xuyên phá = cánh vuốt nhọn */
  _wings(g, r, hue, evo) {
    const w = r * (SC.Tree.path('wpn') === 'B' ? 1.28 : 1.62);
    const h = r * 1.9;
    g.fillStyle = evo >= 1 ? hue : '#89b4e8';
    g.beginPath();
    if (SC.Tree.path('wpn') === 'B') {
      // vuốt nhọn xuôi về sau — dáng của súng bắn xa
      g.moveTo(0, -h * 0.25); g.lineTo(-w, h * 0.62); g.lineTo(-w * 0.34, h * 0.7);
      g.lineTo(0, h * 0.42); g.lineTo(w * 0.34, h * 0.7); g.lineTo(w, h * 0.62);
    } else {
      // xoè rộng, mép có mấu — dáng của súng phun dày
      g.moveTo(0, -h * 0.1); g.lineTo(-w, h * 0.3); g.lineTo(-w * 0.78, h * 0.52);
      g.lineTo(-w * 0.5, h * 0.74); g.lineTo(0, h * 0.45); g.lineTo(w * 0.5, h * 0.74);
      g.lineTo(w * 0.78, h * 0.52); g.lineTo(w, h * 0.3);
    }
    g.closePath(); g.fill(); g.stroke();
  },

  /* Thân theo GIÁP: chưa rẽ = dáng gốc · hạng nặng = mập, vai bè · cơ động = thon dài */
  _body(g, r, hue, evo) {
    const path = SC.Tree.path('armor');
    const h = r * 1.9;
    const wide = path === 'A' ? 0.86 : path === 'B' ? 0.44 : 0.62;
    const nose = path === 'B' ? 1.18 : path === 'A' ? 0.92 : 1;

    const grad = g.createLinearGradient(0, -h * nose, 0, h);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, evo >= 2 ? hue : '#cfe6ff');
    grad.addColorStop(1, '#6f9ad4');
    g.fillStyle = grad;
    g.beginPath();
    g.moveTo(0, -h * nose);
    g.quadraticCurveTo(r * wide, -h * 0.1, r * wide * 0.8, h * 0.75);
    g.lineTo(-r * wide * 0.8, h * 0.75);
    g.quadraticCurveTo(-r * wide, -h * 0.1, 0, -h * nose);
    g.closePath(); g.fill(); g.stroke();

    if (path === 'A') {          // hạng nặng: hai tấm giáp vai
      g.fillStyle = '#5f83b8';
      g.fillRect(-r * 1.02, -r * 0.2, r * 0.3, r * 0.9);
      g.fillRect(r * 0.72, -r * 0.2, r * 0.3, r * 0.9);
      g.strokeRect(-r * 1.02, -r * 0.2, r * 0.3, r * 0.9);
      g.strokeRect(r * 0.72, -r * 0.2, r * 0.3, r * 0.9);
    }

    g.fillStyle = 'rgba(90,225,255,.92)';
    g.beginPath(); g.ellipse(0, -h * 0.28, r * 0.24, r * 0.44, 0, 0, 6.283); g.fill();

    // sọc màu biến thể ở đuôi — chấm nhận dạng cuối cùng
    g.fillStyle = hue;
    g.fillRect(-r * 0.42, h * 0.2, r * 0.84, evo >= 2 ? 5 : 3);
  }
};

;
/* ===== js/system-aura-vfx.js ===== */
/* system-aura-vfx.js — hào quang ĐỘNG theo từng dạng tiến hóa (22/09/2026)
 *
 * Trước đây hào quang nướng TĨNH vào sprite tàu (entity-ship-art._aura): 8 biến thể
 * chỉ có 2 kiểu (vành tròn / 4 tấm vuông), và "LƯỚI SÉT" nhìn chẳng giống sét chút
 * nào. Giờ mỗi biến thể một motif riêng, vẽ MỖI KHUNG ngay quanh tàu — sét phải chớp
 * giật thì mới là sét, ảnh tĩnh không làm được.
 *
 * NHẸ CÓ CHỦ ĐÍCH: trong trận tàu chỉ ~40px, VFX dày là nhoè hết hình tàu và lẫn với
 * đạn địch. Mỗi motif ≤ 6 nét vẽ, alpha thấp; tiến hóa 2 dày hơn tiến hóa 1 một chút.
 *
 * Gọi: SC.AuraFX.draw(ctx, r, t, evo) sau ctx.translate về tâm tàu, TRƯỚC khi vẽ
 * thân tàu (hào quang nằm dưới). Dùng chung cho trận, lobby và màn tiến hóa.
 */

SC.AuraFX = {
  /* số giả ngẫu nhiên ổn định theo seed — sét đổi hình theo nhịp, không theo khung,
     nên nhìn là "xẹt xẹt" chứ không phải nhiễu hạt */
  _r(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); },

  draw(ctx, r, t, evo) {
    if (!evo || evo < 1) return;
    const key = SC.Tree.variant && SC.Tree.variant();
    const fn = key && this[key];
    if (!fn) return;
    const def = SC.VARIANTS[key];
    // nhân theo alpha đang có: tàu đang nhấp nháy bất tử / đang mờ dần ở màn tiến
    // hóa thì hào quang mờ theo, không sáng trơ ra một mình
    const base = ctx.globalAlpha;
    ctx.save();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    fn.call(this, ctx, r, t, (evo >= 2 ? 1 : 0.65) * base, def.hue);
    ctx.restore();
  },

  /* một tia sét gãy khúc từ (x1,y1) tới (x2,y2): nét rộng mờ + lõi trắng mảnh */
  _bolt(ctx, x1, y1, x2, y2, seed, hue, a) {
    const n = 5, dx = x2 - x1, dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len;
    ctx.beginPath(); ctx.moveTo(x1, y1);
    for (let i = 1; i < n; i++) {
      const k = i / n, off = (this._r(seed + i) - 0.5) * len * 0.35;
      ctx.lineTo(x1 + dx * k + nx * off, y1 + dy * k + ny * off);
    }
    ctx.lineTo(x2, y2);
    ctx.globalAlpha = a * 0.55; ctx.strokeStyle = hue; ctx.lineWidth = 4.5; ctx.stroke();
    ctx.globalAlpha = a; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.4; ctx.stroke();
    // chấm lửa điện ở hai đầu — chỗ sét "cắm" vào thân tàu
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(x1, y1, 2, 0, 6.283); ctx.arc(x2, y2, 2, 0, 6.283); ctx.fill();
  },

  /* ---------- 8 motif, khoá = SC.Tree.variant() ---------- */

  /* LƯỚI SÉT: 2-3 tia sét xẹt giữa các điểm trên vành quanh tàu, đổi hình 14 lần/giây,
     thỉnh thoảng tắt hẳn một nhịp — sét thật chớp chứ không cháy liên tục */
  AAB(ctx, r, t, k) {
    // hue biến thể #bfe9ff gần trắng, chìm mất trên nền trời — sét dùng xanh điện
    const hue = '#5fe4ff';
    const beat = Math.floor(t * 14);
    const n = k >= 0.9 ? 3 : 2;
    for (let i = 0; i < n; i++) {
      const s = beat * 7 + i * 31;
      if (this._r(s + 99) < 0.25) continue;
      // bám sát thân (0.85-1.15r): sét phải bò trên vỏ tàu, bay xa là thành vết
      // nứt giữa trời chẳng dính dáng gì tới tàu
      const a1 = this._r(s) * 6.283, a2 = a1 + 0.8 + this._r(s + 1) * 1.3;
      const R1 = r * (0.85 + this._r(s + 2) * 0.3), R2 = r * (0.85 + this._r(s + 3) * 0.3);
      this._bolt(ctx, Math.cos(a1) * R1, Math.sin(a1) * R1,
        Math.cos(a2) * R2, Math.sin(a2) * R2, s, hue, Math.min(1, 0.95 * k + 0.2));
    }
  },

  /* BÃO ĐẠN: tàn lửa quay quanh */
  AAA(ctx, r, t, k, hue) {
    ctx.fillStyle = hue;
    for (let i = 0; i < 6; i++) {
      const a = t * 2.2 + i * 1.047, R = r * (1.35 + Math.sin(t * 3 + i) * 0.12);
      ctx.globalAlpha = (0.35 + 0.35 * Math.sin(t * 6 + i)) * k;
      ctx.beginPath(); ctx.arc(Math.cos(a) * R, Math.sin(a) * R, 2.2, 0, 6.283); ctx.fill();
    }
  },

  /* MƯA KIM: kim sáng xoay quanh, mũi hướng theo chiều quay */
  ABA(ctx, r, t, k, hue) {
    ctx.strokeStyle = hue; ctx.lineWidth = 1.6;
    for (let i = 0; i < 5; i++) {
      const a = -t * 1.6 + i * 1.257, R = r * 1.4;
      ctx.globalAlpha = 0.55 * k;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * R, Math.sin(a) * R);
      ctx.lineTo(Math.cos(a - 0.22) * R, Math.sin(a - 0.22) * R);
      ctx.stroke();
    }
  },

  /* GƯƠNG BẠC: 4 mảnh gương xoay chậm, loé sáng lần lượt */
  ABB(ctx, r, t, k, hue) {
    for (let i = 0; i < 4; i++) {
      ctx.save();
      ctx.rotate(t * 0.6 + i * 1.5708);
      const glint = Math.max(0, Math.sin(t * 2.5 - i * 1.57));
      ctx.globalAlpha = (0.3 + glint * 0.5) * k;
      ctx.fillStyle = glint > 0.8 ? '#ffffff' : hue;
      ctx.beginPath();
      ctx.moveTo(0, -r * 1.6); ctx.lineTo(r * 0.3, -r * 1.35);
      ctx.lineTo(0, -r * 1.2); ctx.lineTo(-r * 0.3, -r * 1.35);
      ctx.closePath(); ctx.fill();
      ctx.restore();
    }
  },

  /* XUYÊN PHÁ: ba vạch chevron chạy từ đuôi lên mũi — cảm giác lao thẳng */
  BAA(ctx, r, t, k, hue) {
    ctx.strokeStyle = hue; ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const p = (t * 1.2 + i / 3) % 1;
      const y = r * 1.3 - p * r * 2.8;
      ctx.globalAlpha = Math.sin(p * Math.PI) * 0.6 * k;
      ctx.beginPath();
      ctx.moveTo(-r * 0.9, y + r * 0.35); ctx.lineTo(0, y); ctx.lineTo(r * 0.9, y + r * 0.35);
      ctx.stroke();
    }
  },

  /* LÔI TIÊU: hai đốm ma trơi bám đuổi nhau quanh tàu, để lại vệt */
  BAB(ctx, r, t, k, hue) {
    ctx.fillStyle = hue;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 4; j++) {
        const a = t * 2.6 + i * 3.14 - j * 0.18;
        const R = r * (1.35 + Math.sin(t * 1.7 + i) * 0.15);
        ctx.globalAlpha = (0.6 - j * 0.14) * k;
        ctx.beginPath(); ctx.arc(Math.cos(a) * R, Math.sin(a) * R, 3 - j * 0.6, 0, 6.283); ctx.fill();
      }
    }
  },

  /* TỬ THẦN: vòng ngắm đỏ xoay chậm với 4 khấc */
  BBA(ctx, r, t, k, hue) {
    ctx.strokeStyle = hue; ctx.lineWidth = 1.6;
    ctx.globalAlpha = (0.35 + 0.15 * Math.sin(t * 4)) * k;
    ctx.rotate(t * 0.5);
    for (let i = 0; i < 4; i++) {
      const a = i * 1.5708;
      ctx.beginPath(); ctx.arc(0, 0, r * 1.45, a + 0.2, a + 1.37); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * r * 1.3, Math.sin(a) * r * 1.3);
      ctx.lineTo(Math.cos(a) * r * 1.6, Math.sin(a) * r * 1.6);
      ctx.stroke();
    }
  },

  /* HƯ KHÔNG: hạt tím bị hút xoáy vào tâm */
  BBB(ctx, r, t, k, hue) {
    ctx.fillStyle = hue;
    for (let i = 0; i < 7; i++) {
      const p = (t * 0.45 + i / 7) % 1;
      const a = i * 0.9 + p * 4;
      const R = r * (1.8 - p * 0.9);
      ctx.globalAlpha = Math.sin(p * Math.PI) * 0.6 * k;
      ctx.beginPath(); ctx.arc(Math.cos(a) * R, Math.sin(a) * R, 2.4 - p * 1.2, 0, 6.283); ctx.fill();
    }
  }
};

;
/* ===== js/entity-player.js ===== */
/* entity-player.js — máy bay bám con trỏ chuột, AUTO SHOOT theo cây kỹ năng
 *
 * Mọi chỉ số sức mạnh đến từ bốn nhánh trong cây (system-tree.js):
 *   GIÁP   -> máu, bán kính thân, độ bám con trỏ, bất tử, độ nghiêng tối đa
 *   KHIÊN  -> độ bền và HÀNH VI của khiên (đốt quái / bật đạn)
 *   VŨ KHÍ -> sơ đồ tia, sát thương, nhịp bắn (system-gun.js)
 *   PHI ĐỘI-> drone (entity-wingman.js)
 * Tệp này chỉ còn lo chuyển động, nhận đòn và vẽ. */

SC.Player = function () {
  this.reset();
};

SC.Player.prototype.reset = function (weapon) {
  this.x = SC.W / 2; this.y = SC.H * 0.78;
  this.tx = this.x; this.ty = this.y;

  // Nhánh GIÁP đặt máu, bán kính thân, độ bám con trỏ, thời gian bất tử và độ nghiêng
  // tối đa — năm thứ cùng lúc, nên hai hướng giáp lái khác hẳn nhau.
  SC.Armor.apply(this);
  // thuộc tính ẩn của gara tiến hóa: +% máu tối đa cộng dồn mọi tàu đã sở hữu
  this.hpMax = Math.round(this.hpMax * SC.EvoGarage.mul('hp'));
  this.hp = this.hpMax;
  SC.Shield.reset(this);
  this.weapon = weapon || 1;      // cấp vũ khí nhặt trong màn, cây kỹ năng lo phần còn lại
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
  SC.Bank.reset(this);             // độ nghiêng cánh: 0 thân đầy, 1 nghiêng hết cỡ
};

/* Con trỏ chuột chính là đích đến của máy bay */
SC.Player.prototype.setTarget = function (x, y) {
  this.tx = SC.clamp(x, 18, SC.W - 18);
  this.ty = SC.clamp(y, 40, SC.H - 24);
};

SC.Player.prototype.update = function (dt) {
  this.t += dt;
  const px = this.x;
  // Độ bám con trỏ do nhánh GIÁP quyết: cơ động lái nhanh hơn 20%, hạng nặng chậm 15%.
  const k = 1 - Math.pow(1 - SC.clamp(this.follow, 0.05, 0.9), dt * 60);
  this.x = SC.lerp(this.x, this.tx, k);
  this.y = SC.lerp(this.y, this.ty, k);
  // Vệt mực của trùm là vùng cấm: nắn lại vị trí NGAY SAU khi bám con trỏ, trước khi
  // đo độ nghiêng cánh — nghiêng phải tính trên quãng thật sự đi được, không thì máy
  // bay nghiêng hẳn sang một bên trong lúc đang tì vào mép vệt mà không nhúc nhích.
  SC.Splats.collide(this);
  this.tilt = SC.clamp((this.x - px) * 0.12, -1, 1);
  // nghiêng cánh lách đạn — phải chạy SAU khi đã dịch chuyển xong mới đo được tốc ngang
  SC.Bank.update(dt, this, px);

  if (this.inv > 0) this.inv -= dt;

  // khói động cơ thoát ra phía ĐUÔI, tức là ngược hướng đang ngắm
  if (Math.random() < 0.6) {
    const v = SC.Facing.vec({ aim: this.aimAnim });
    SC.FX.trail(this.x - v.x * this.r * 1.2 + SC.rnd(-5, 5),
      this.y - v.y * this.r * 1.2 + SC.rnd(-5, 5), '#5ad0ff');
  }

  // ---- AUTO SHOOT ----
  this.fireT -= dt;
  if (this.fireT <= 0) {
    this.fireT = SC.Gun.interval(this);
    SC.Gun.fire(this);
    SC.Audio.shoot();
  }
};

/* THỦNG LƯỚI — một con quái bay lọt qua đáy màn.
 *
 * Đây là đòn bẩy quan trọng nhất chống lối chơi đứng yên. Trước đây quái thoát chỉ
 * là một chỉ số chấm nhiệm vụ, không mất gì — nên nấp ở đáy màn bắn lên là an toàn
 * tuyệt đối: con nào tới gần thì chết, con nào đi lệch làn thì kệ nó bay qua.
 *
 * Giờ mỗi con lọt lưới trừ thẳng máu, KHÔNG qua khiên và KHÔNG có thời gian bất tử —
 * vì nó không phải một cú va chạm mà là hậu quả của việc không giữ nổi phòng tuyến.
 * Không thể phủ hết bề ngang từ một chỗ đứng, nên muốn không thủng lưới là phải di
 * chuyển. Đó chính là yếu tố điều khiển mà bản cũ đánh mất.
 */
SC.Player.prototype.leak = function (e) {
  if (this.dead || e.isBoss) return false;
  const d = Math.max(3, Math.round(this.hpMax * 0.045));
  this.hp -= d;
  SC.FX.text(e.x, SC.H - 40, '-' + d + ' THỦNG LƯỚI', '#ff3b5c');
  SC.FX.burst(e.x, SC.H - 20, '#ff3b5c', 10, 200, 3);
  SC.addShake(6, 0.18);
  SC.Audio.hurt();
  if (this.hp <= 0) { this.hp = 0; this.dead = true; return true; }
  return false;
};

/* Nhận sát thương: khiên chịu trước, sau đó mới trừ máu */
SC.Player.prototype.hurt = function (dmg) {
  if (this.inv > 0 || this.dead) return false;
  this.damaged++;
  dmg = dmg / SC.EvoGarage.mul('armor');    // thuộc tính ẩn GIÁP của gara tiến hóa
  dmg = SC.Shield.mitigate(this, dmg);      // khiên từ trường đỡ bớt, xem system-shield.js
  if (this.shield > 0) {
    this.shield -= dmg * 1.6;
    if (this.shield < 0) this.shield = 0;
    this.shIdle = 0;                    // vừa ăn đòn thì hoãn hồi bền
    SC.FX.burst(this.x, this.y, '#3fe0ff', 12, 200, 3);
  } else {
    this.hp -= dmg;
    SC.FX.burst(this.x, this.y, '#ff3b5c', 16, 260, 3.4);
  }
  this.inv = this.invTime || SC.CFG.iFrame;
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

  // Màn nhảy dù vào trận: phóng cả khối (thân + lửa + khiên xoay) rồi xẹp dần —
  // hệ số do SC.Game.introScale() lo, hitbox không đổi (lúc đó chưa có đạn).
  const isc = SC.Game.introScale ? SC.Game.introScale() : 1;
  if (isc !== 1) ctx.scale(isc, isc);

  // hào quang động của dạng tiến hóa — dưới thân tàu, không xoay theo hướng ngắm
  SC.AuraFX.draw(ctx, this.r, this.t, SC.Tree.evo());

  // Xoay cả thân theo hướng ngắm — lên, xuống, trái, phải. Quay DẦN (aimAnim chạy
  // tới aim) nên nhìn như máy bay lượn vòng, chứ đảo tức thì thì giật và không hiểu
  // chuyện gì vừa xảy ra.
  ctx.save();
  ctx.rotate(this.aimAnim || 0);
  // Nghiêng cánh: nén bề ngang đúng bằng hệ số mà va chạm đang dùng, nên cái người
  // chơi NHÌN THẤY và cái game TÍNH là một. Lệch nhau là mất hết cảm giác lách.
  ctx.scale(SC.Bank.squeeze(this), 1);

  // lửa động cơ
  const f = 1 + Math.sin(this.t * 30) * 0.22;
  SC.draw.glow(ctx, 0, this.r * 1.5, 20 * f, '#5ad0ff', 0.7);
  ctx.fillStyle = 'rgba(140,230,255,.9)';
  ctx.beginPath();
  ctx.moveTo(-5, this.r * 1.1); ctx.lineTo(0, this.r * (1.5 + f * 0.55)); ctx.lineTo(5, this.r * 1.1);
  ctx.closePath(); ctx.fill();

  // hình dáng dựng theo tổ hợp nhánh đã chọn — xem entity-ship-art.js
  SC.ShipArt.draw(ctx, this.r, this.tilt);
  ctx.restore();

  // Vòng khiên vẽ NGOÀI phần đã xoay/nén: khiên không hẹp theo độ nghiêng, đó là
  // đánh đổi có chủ ý (lách thì né được đạn nhưng mất lợi thế của khiên).
  ctx.restore();
  SC.ShieldArt.render(ctx, this);

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
/* ===== js/entity-drone-kinds.js ===== */
/* entity-drone-kinds.js — hai loại drone và hai ĐỘI HÌNH của chúng
 *
 * Bản cũ mọi drone giống hệt nhau, chỉ khác số lượng — đo ra dòng PHI ĐỘI gần như
 * không rút ngắn thời gian màn nào, mua xong chỉ tổ bị quái mạnh lên theo lực chiến.
 *
 * Chỗ nhánh này khác hẳn nhánh vũ khí: nó không đổi cách bắn của người chơi mà
 * ĐỔI VÙNG AN TOÀN. Toả tâm dựng một vành đai quanh mình -> muốn lao vào giữa đám
 * đông. Quét cạnh dọn sạch hai làn biên -> bị đẩy vào lối đánh ở giữa màn. Cả hai
 * đều thay đổi CHỖ NGƯỜI CHƠI MUỐN ĐỨNG, đúng thứ bản cũ đang thiếu.
 */

SC.Drones = {
  /* count/dmg/rate theo cấp 1..6. Tổng sát thương hai hướng xấp xỉ nhau (~50/giây ở
     cấp 6), khác nhau ở CHỖ nó rơi vào: bầy đàn rải mỏng, sát thủ dồn một cục. */
  /* Ba cấp cuối (7-9) tăng SÁT THƯƠNG là chính, số chiếc chỉ nhích thêm một.
     Bầy đàn dừng ở 8 chiếc: đông hơn nữa là vành drone che mất máy bay chính, người
     chơi không còn đọc được mình đang đứng đâu giữa đám đạn.
     22/09/2026 thêm cấp 10-11 = 8 chiếc: 7 chiếc lẻ, vành drone lệch một bên nhìn không
     cân (anh Đức). Nhịp bắn vẫn giảm 0.02s/cấp như ngoại suy cũ: cấp 10 = 8×5/0.18s
     (222/s) ≥ bản cũ 7×5/0.18s (194/s) — người đã vượt cấp 9 không bị tụt. Hai cấp
     cuối cùng n=8 -> ngoại suy GIỮ 8 chiếc, +1 sát thương mỗi cấp (tierOf lấy hiệu
     hai cấp cuối). Nguồn số: balance/sky-chicken-balance.xlsx sheet PhiDoi. */
  A: SC.bal('drones.A', [
    { n: 1, dmg: 2, rate: 0.34 }, { n: 2, dmg: 2, rate: 0.32 }, { n: 3, dmg: 2, rate: 0.30 },
    { n: 4, dmg: 2, rate: 0.28 }, { n: 5, dmg: 2, rate: 0.27 }, { n: 6, dmg: 2, rate: 0.25 },
    { n: 6, dmg: 3, rate: 0.24 }, { n: 7, dmg: 3, rate: 0.22 }, { n: 7, dmg: 4, rate: 0.20 },
    { n: 8, dmg: 5, rate: 0.18 }, { n: 8, dmg: 6, rate: 0.16 }
  ]),
  B: SC.bal('drones.B', [
    { n: 1, dmg: 2, rate: 0.34, pierce: 0 }, { n: 1, dmg: 8, rate: 0.60, pierce: 1 },
    { n: 2, dmg: 8, rate: 0.60, pierce: 1 }, { n: 2, dmg: 11, rate: 0.60, pierce: 2 },
    { n: 2, dmg: 13, rate: 0.58, pierce: 3 }, { n: 2, dmg: 15, rate: 0.55, pierce: 4 },
    { n: 2, dmg: 20, rate: 0.52, pierce: 5 }, { n: 3, dmg: 22, rate: 0.50, pierce: 6 },
    { n: 3, dmg: 28, rate: 0.46, pierce: 7 }
  ]),

  kind() { return SC.Tree.path('drone') || 'A'; },
  /* Trần đọc từ độ dài bảng, KHÔNG chép cứng — đã có lần nâng trần vũ khí lên 10 mà
     quên chỗ tra bảng, thành ra hai cấp cuối mua xong chẳng đổi gì. */
  MAX_N: 10,        // trần số chiếc: đông hơn là vành drone che kín máy bay chính

  /* Chạm trần thì số chiếc THỪA quy sang sát thương, cùng luật với nhánh vũ khí
     (xem system-gun.js) — nếu không, nhánh bầy đàn sẽ đứng yên chỉ số từ cấp ~13
     trong khi nhánh sát thủ vẫn lên đều, và cả hai lệch nhau rất nhanh ở vòng vô tận. */
  tier() {
    const k = this.kind(), lv = SC.Tree.lv('drone');
    if (lv < 1) return null;
    const t = SC.Tree.tierOf(this[k], lv);
    const n = Math.round(t.n);
    const over = n > this.MAX_N ? n / this.MAX_N : 1;
    return Object.assign({}, t, {
      n: Math.min(this.MAX_N, n),
      // thuộc tính ẩn PHI ĐỘI của gara tiến hóa, nhân sau làm tròn (như súng chính)
      dmg: Math.max(1, Math.round(t.dmg * over)) * SC.EvoGarage.mul('drone')
    });
  },

  /* ---------- đội hình: trả về vị trí mong muốn của chiếc thứ i ---------- */

  /* Toả tâm — vòng quanh máy bay, quay chậm. Vành đai này chính là phần thưởng:
     nó dọn đường cho người chơi ủi thẳng vào giữa. */
  orbit(i, n, t, p) {
    const a = t * 1.0 + (i / n) * 6.283;
    const rad = 58 + (n > 3 ? 10 : 0);
    return { x: p.x + Math.cos(a) * rad, y: p.y + Math.sin(a) * rad * 0.72 };
  },

  /* Quét cạnh — bám hai mép màn, chạy dọc lên xuống lệch pha nhau */
  flank(i, n, t, p) {
    const side = i % 2 === 0 ? 1 : -1;
    const x = side < 0 ? 44 : SC.W - 44;
    const y = SC.H * 0.5 + Math.sin(t * 0.75 + i * 2.1) * SC.H * 0.30;
    return { x, y };
  },

  place(i, n, t, p) {
    return this.kind() === 'B' ? this.flank(i, n, t, p) : this.orbit(i, n, t, p);
  },

  /* ---------- chọn mục tiêu ----------
     Bầy đàn nhắm con GẦN NHẤT (dọn vòng ngoài cho người chơi).
     Sát thủ luôn nhắm con MÁU CAO NHẤT — đó là thứ biến nó thành chuyên gia diệt
     trùm, chứ không phải chỉ là "drone bắn đau hơn". */
  /* v = vector hướng ngắm của máy bay chính. Chỉ nhắm con nằm VỀ PHÍA ĐANG CHĨA —
     trước đây chỉ so trục dọc nên khi máy bay quay ngang, drone vẫn lọc theo trên/dưới
     và bỏ qua đúng đám quái đang tạt sườn. */
  target(w, v) {
    const sniper = this.kind() === 'B';
    let best = null, bv = sniper ? -1 : Infinity;
    for (const e of SC.Game.enemies) {
      if (e.dead) continue;
      if ((e.x - w.x) * v.x + (e.y - w.y) * v.y < 20) continue;   // nằm sau lưng
      const val = sniper ? e.hp : SC.dist2(w.x, w.y, e.x, e.y);
      if (sniper ? val > bv : val < bv) { bv = val; best = e; }
    }
    return best;
  },

  /* Drone bắn một phát. Sát thủ bắn giáo xuyên, bầy đàn bắn đạn nhỏ. */
  shoot(w, p) {
    const t = this.tier();
    if (!t) return;
    const A = p.aimAnim || 0;
    const v = SC.Facing.vec({ aim: A });
    const tgt = this.target(w, v);
    const sniper = this.kind() === 'B';
    // Lệch tối đa 35° so với hướng của máy bay chính: còn ra dáng máy bay hộ tống
    // bay theo đội hình, không xoay tự do như pháo phòng không.
    let off = 0;
    if (tgt) {
      let d = Math.atan2(tgt.x - w.x, -(tgt.y - w.y)) - A;
      while (d > Math.PI) d -= 6.283;
      while (d < -Math.PI) d += 6.283;
      off = SC.clamp(d, -0.61, 0.61);
    }
    const a = A + off;
    const sp = sniper ? 900 : 720;
    const b = SC.Bullets.spawnMine(
      w.x + v.x * w.r, w.y + v.y * w.r,
      Math.sin(a) * sp, -Math.cos(a) * sp,
      t.dmg, sniper ? 'lance' : 'shot'
    );
    if (sniper) b.pierce = t.pierce;
    else b.ttl = b.life = (SC.H * 0.62) / sp;    // bầy đàn cũng tầm ngắn, nhưng bớt gắt
    b.wing = true;      // không tính vào độ chính xác của người chơi
  },

  /* ---------- hành vi mở ở TIẾN HOÁ 2 ---------- */

  /* Bầy đàn: chiếc gần nhất lao vào con quái đang áp sát người chơi rồi hồi lại.
     Đây là lúc drone thôi làm nền và trở thành lớp phòng thủ cuối. */
  kamikaze(w, p, dt, g) {
    if (w.dive > 0) {
      w.dive -= dt;
      for (const e of g.enemies)
        if (!e.dead && SC.dist2(w.x, w.y, e.x, e.y) < (e.r + w.r) ** 2) {
          if (e.hurt(14)) SC.Combat.killEnemy(g, e);
          SC.FX.burst(w.x, w.y, '#7ae0ff', 14, 240, 3);
          w.dive = 0; w.cool = 4;
          break;
        }
      return true;
    }
    if ((w.cool -= dt) > 0) return false;
    for (const e of g.enemies) {
      if (e.dead || SC.dist2(e.x, e.y, p.x, p.y) > 130 * 130) continue;
      w.dive = 0.55; w.diveTo = e;
      return true;
    }
    return false;
  }
};

;
/* ===== js/entity-drone-art.js ===== */
/* entity-drone-art.js — vẽ 4 dạng drone: bầy đàn / sát thủ × trước và sau tiến hoá
 *
 * Yêu cầu quan trọng: nhìn là biết đang chạy hướng nào. Bầy đàn nhỏ, tròn, xanh lam,
 * bay thành đàn; sát thủ to, góc cạnh, tím, có nòng dài chĩa thẳng. Khác cả DÁNG lẫn
 * MÀU chứ không chỉ đổi màu — đổi mỗi màu thì ở kích thước thật không ai phân biệt được.
 *
 * Drone vẽ nhỏ hơn máy bay chính và hơi mờ, để 6 chiếc bầy đàn không nuốt mất
 * nhân vật của người chơi.
 */

SC.DroneArt = {
  draw(ctx, w, swarm, evo) {
    ctx.save();
    ctx.translate(w.x, w.y);
    ctx.globalAlpha = 0.92;
    const img = SC.SpriteArt && SC.SpriteArt.get('drone', swarm ? 'swarm' : 'sniper');
    if (img) this._sprite(ctx, img, w, swarm, evo);
    else if (swarm) this._swarm(ctx, w, evo);
    else this._sniper(ctx, w, evo);
    ctx.restore();
  },

  /* Sprite thay thân + cánh; GIỮ các tín hiệu động vì chúng là thông tin gameplay:
     quầng phía sau, vành tiến hoá, mắt ngắm, loé trắng khi bầy đàn lao cản quái. */
  _sprite(ctx, img, w, swarm, evo) {
    const r = w.r;
    SC.draw.glow(ctx, 0, r * 1.1, swarm ? 11 : 15, swarm ? '#5ad0ff' : '#c58cff', 0.5);
    const s = r * 2.6;
    // bập bềnh nhẹ theo thời gian riêng từng chiếc, thay cho cánh rung của art cũ
    ctx.drawImage(img, -s / 2, -s / 2 + Math.sin(w.t * 8) * 1.5, s, s);
    if (evo >= 1) {
      if (swarm) {
        ctx.strokeStyle = `rgba(120,240,255,${0.35 + Math.sin(w.t * 5) * 0.15})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(0, 0, r * 1.35, 0, 6.283); ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(255,90,120,${0.5 + Math.sin(w.t * 8) * 0.35})`;
        ctx.beginPath(); ctx.arc(0, -r * 1.6, 2.4, 0, 6.283); ctx.fill();
      }
    }
    if (swarm && w.dive > 0) SC.draw.glow(ctx, 0, 0, 26, '#ffffff', 0.8);
  },

  /* Bầy đàn — thân tròn nhỏ, hai cánh ngắn rung, vệt sáng khi đã tiến hoá */
  _swarm(ctx, w, evo) {
    const r = w.r;
    const f = 1 + Math.sin(w.t * 26) * 0.25;
    SC.draw.glow(ctx, 0, r * 1.1, 11 * f, '#5ad0ff', 0.55);

    // cánh rung — biên độ theo thời gian nên cả đàn không đập cùng nhịp
    const flap = 0.55 + Math.sin(w.t * 22) * 0.35;
    ctx.fillStyle = 'rgba(150,225,255,.55)';
    ctx.beginPath(); ctx.ellipse(-r * 0.95, 0, r * 0.62, r * 0.3 * flap, -0.4, 0, 6.283); ctx.fill();
    ctx.beginPath(); ctx.ellipse(r * 0.95, 0, r * 0.62, r * 0.3 * flap, 0.4, 0, 6.283); ctx.fill();

    const g = ctx.createLinearGradient(0, -r, 0, r);
    g.addColorStop(0, '#ffffff'); g.addColorStop(0.5, '#a8dcff'); g.addColorStop(1, '#4f86c4');
    ctx.fillStyle = g;
    ctx.strokeStyle = '#16294a'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(0, 0, r * 0.62, r * 0.95, 0, 0, 6.283); ctx.fill(); ctx.stroke();

    ctx.fillStyle = 'rgba(90,225,255,.95)';
    ctx.beginPath(); ctx.ellipse(0, -r * 0.35, r * 0.24, r * 0.36, 0, 0, 6.283); ctx.fill();

    if (evo >= 1) {                    // vành sáng chỉ có sau tiến hoá 1
      ctx.strokeStyle = `rgba(120,240,255,${0.35 + Math.sin(w.t * 5) * 0.15})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(0, 0, r * 1.35, 0, 6.283); ctx.stroke();
    }
    if (w.dive > 0) SC.draw.glow(ctx, 0, 0, 26, '#ffffff', 0.8);
  },

  /* Sát thủ — thân góc cạnh, nòng dài chĩa thẳng lên, tông tím */
  _sniper(ctx, w, evo) {
    const r = w.r;
    SC.draw.glow(ctx, 0, r * 1.2, 15, '#c58cff', 0.5);

    // nòng
    ctx.fillStyle = '#8a6ec4';
    ctx.fillRect(-r * 0.16, -r * 1.9, r * 0.32, r * 1.2);

    // thân hình thoi dẹt
    const g = ctx.createLinearGradient(0, -r * 1.2, 0, r);
    g.addColorStop(0, '#f2e6ff'); g.addColorStop(0.55, '#c9a9f0'); g.addColorStop(1, '#6f4fa8');
    ctx.fillStyle = g;
    ctx.strokeStyle = '#2a1b47'; ctx.lineWidth = 1.2; ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(0, -r * 1.15); ctx.lineTo(r * 0.72, -r * 0.1);
    ctx.lineTo(r * 0.45, r * 0.85); ctx.lineTo(-r * 0.45, r * 0.85);
    ctx.lineTo(-r * 0.72, -r * 0.1);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    // cánh xuôi về sau
    ctx.fillStyle = '#9d7ad0';
    ctx.beginPath();
    ctx.moveTo(-r * 0.6, 0); ctx.lineTo(-r * 1.35, r * 0.75); ctx.lineTo(-r * 0.42, r * 0.6);
    ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(r * 0.6, 0); ctx.lineTo(r * 1.35, r * 0.75); ctx.lineTo(r * 0.42, r * 0.6);
    ctx.closePath(); ctx.fill();

    ctx.fillStyle = 'rgba(255,220,120,.95)';
    ctx.beginPath(); ctx.ellipse(0, -r * 0.3, r * 0.2, r * 0.32, 0, 0, 6.283); ctx.fill();

    if (evo >= 1) {                    // mắt ngắm đỏ khi đã tiến hoá
      ctx.fillStyle = `rgba(255,90,120,${0.5 + Math.sin(w.t * 8) * 0.35})`;
      ctx.beginPath(); ctx.arc(0, -r * 1.9, 2.4, 0, 6.283); ctx.fill();
    }
  }
};

;
/* ===== js/entity-wingman.js ===== */
/* entity-wingman.js — điều phối phi đội: dựng đội hình, bám vị trí, gọi bắn
 *
 * Chỉ số và đội hình nằm ở entity-drone-kinds.js, tạo hình ở entity-drone-art.js.
 * Giữ nguyên tên SC.Wingmen để main.js và entity-player.js không phải sửa theo.
 */

SC.Wingmen = {
  list: [],
  volleyT: 0,          // nhịp đòn xuyên toàn màn của SÁT THỦ ở tiến hoá 2

  spawn(player) {
    this.list.length = 0;
    this.volleyT = 3;
    const t = SC.Drones.tier();
    if (!t) return;
    for (let i = 0; i < t.n; i++) {
      const pos = SC.Drones.place(i, t.n, 0, player);
      this.list.push({
        x: pos.x, y: pos.y, i, r: SC.Drones.kind() === 'B' ? 16 : 11,
        t: SC.rnd(0, 6.28), fireT: 0.09 * i, dive: 0, cool: 0, diveTo: null
      });
    }
  },

  clear() { this.list.length = 0; },

  update(dt, player) {
    const t = SC.Drones.tier();
    if (!t) return;
    const n = this.list.length;
    const evo = SC.Tree.evo();
    const swarm = SC.Drones.kind() === 'A';

    for (const w of this.list) {
      w.t += dt;

      // Tiến hoá 2 của bầy đàn: lao vào cản quái áp sát. Lúc đang lao thì bỏ đội hình.
      const diving = swarm && evo >= 2 && SC.Drones.kamikaze(w, player, dt, SC.Game);
      const pos = diving && w.diveTo && !w.diveTo.dead
        ? { x: w.diveTo.x, y: w.diveTo.y }
        : SC.Drones.place(w.i, n, w.t, player);

      // bám trễ hơn máy bay chính nên khi lượn gấp chúng đuổi theo thành hình cánh cung
      const k = 1 - Math.pow(1 - (diving ? 0.30 : 0.14), dt * 60);
      w.x = SC.lerp(w.x, pos.x, k);
      w.y = SC.lerp(w.y, pos.y, k);

      if (Math.random() < 0.25) SC.FX.trail(w.x, w.y + 10, swarm ? '#7ae0ff' : '#c58cff');

      w.fireT -= dt;
      if (w.fireT <= 0 && !diving) {
        w.fireT = t.rate;
        SC.Drones.shoot(w, player);
      }
    }

    // Tiến hoá 2 của sát thủ: một đòn xuyên chạy suốt màn mỗi 3 giây, theo đúng
    // hướng máy bay chính đang ngắm (kể cả khi đang bắn ngang)
    if (!swarm && evo >= 2 && (this.volleyT -= dt) <= 0) {
      this.volleyT = 3;
      const v = SC.Facing.vec({ aim: player.aimAnim || 0 });
      for (const w of this.list) {
        const b = SC.Bullets.spawnMine(w.x, w.y, v.x * 1250, v.y * 1250, t.dmg * 2, 'lance');
        b.pierce = 99; b.wing = true; b.big = 1;
      }
      SC.Audio.power();
    }
  },

  render(ctx) {
    const swarm = SC.Drones.kind() === 'A';
    const evo = SC.Tree.evo();
    for (const w of this.list) SC.DroneArt.draw(ctx, w, swarm, evo);
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

  /* Hết quái là hết nhịp chơi — dù thả THÊM lúc này chỉ bắt người chơi đứng đợi
     (phàn nàn thật 21/09/2026: cuối màn toàn phải chờ dù rơi). Cắt phần đuôi chưa
     thả, CHỈ GIỮ đúng số còn thiếu cho nhiệm vụ: đã cứu đủ (hoặc dù đang rơi đủ)
     thì không thả thêm chiếc nào; còn thiếu thì vẫn thả (hurry) để khỏi kẹt sao.
     Chiếc "+1 dễ thở" vì vậy chỉ tồn tại KHI CÒN ĐANG ĐÁNH. */
  cutTail(rescued) {
    if (this.toSpawn <= 0) return;
    const need = SC.Missions.rescueTarget();
    this.toSpawn = Math.max(0, Math.min(this.toSpawn, need - rescued - this.list.length));
  },

  /* Waves gọi mỗi khi mở wave mới.
     Trước đây dù thả theo đồng hồ cố định 13 giây nên chiếc cuối thường rơi lúc
     đã dọn sạch quái — đo được nửa màn đứng không. Gắn vào nhịp wave thì dù
     luôn xuất hiện giữa lúc đang đánh. */
  onWave() {
    if (this.toSpawn > 0) this.timer = 0.6;
  },

  /* Skin mèo rơi NGẪU NHIÊN từng chiếc. 22/09/2026 bỏ cat-grey: vẽ trong game
     nhỏ quá nhìn không ra dáng — chỉ giữ 2 con đọc shape rõ (dù xanh, mèo đen ôm cá). */
  SKINS: ['cat-fish', 'cat-goggles'],

  /* DÙ BỊ BẮN LỦNG (22/09/2026, phàn nàn "cứu mèo dễ và đơn điệu"): một số bé bị
     trúng đạn giữa chừng, dù rách, rơi TĂNG TỐC — phải bỏ vị trí lao tới ngay.
     Tỉ lệ 10% → 30% theo độ khó màn: 60% từ nhịp cụm (SIÊU DỄ 0.68 … SIÊU KHÓ 1.62)
     + 40% từ tiến độ chiến dịch. Quyết lúc THẢ (không phải lúc rơi) để một bé chỉ
     gieo xúc xắc một lần. */
  TORN_MIN: 0.10, TORN_MAX: 0.30,
  tornChance() {
    const id = Math.min(SC.TOTAL_LEVELS, SC.Game.levelId || 1);
    const lv = SC.LEVELS[id - 1] || {};
    const c = SC.CHUNK.find(x => x.name === lv.chunk);
    const muls = SC.CHUNK.map(x => x.mul), lo = Math.min(...muls), hi = Math.max(...muls);
    const tChunk = c ? (c.mul - lo) / (hi - lo) : 0.5;
    const t = 0.6 * tChunk + 0.4 * (id - 1) / Math.max(1, SC.TOTAL_LEVELS - 1);
    return this.TORN_MIN + (this.TORN_MAX - this.TORN_MIN) * SC.clamp(t, 0, 1);
  },

  _tha() {
    this.toSpawn--;
    const doomed = Math.random() < this.tornChance();
    this.list.push({
      x: SC.rnd(70, SC.W - 70), y: -40, r: 16,
      t: SC.rnd(0, 6.28), sway: SC.rnd(24, 44), saved: false,
      skin: this.SKINS[(Math.random() * this.SKINS.length) | 0],
      // bị bắn quanh 1/3 màn (±3%). Bản đầu rải 20-50% -> nhiều bé quá nửa map mới
      // lủng, anh Đức test live thấy muộn (22/09/2026)
      cutAt: doomed ? SC.rnd(0.30, 0.36) * SC.H : Infinity, torn: false, vy: 0
    });
    SC.UI.toast('CÓ MÈO RƠI!');
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
      if (!p.torn && p.y > p.cutAt) this._tear(p);
      if (p.torn) {
        // rơi tự do có trần: ~1.5-2 giây từ lúc lủng tới đáy màn — gắt nhưng cứu được
        p.vy = Math.min(this.TORN_VMAX, p.vy + this.TORN_G * dt);
        p.y += p.vy * dt;
      } else p.y += fall * dt;                         // dù rơi chậm
      p.x += Math.sin(p.t * 1.3) * p.sway * (p.torn ? 0.3 : 1) * dt;
      p.x = SC.clamp(p.x, 26, SC.W - 26);

      // phải chạm tận nơi mới cứu được
      if (SC.dist2(p.x, p.y, player.x, player.y) < 34 * 34) {
        onRescue(p.x, p.y);
        this.list.splice(i, 1);
        continue;
      }
      if (p.y > SC.H + 40) {                           // rơi mất
        SC.UI.toast('MẤT MỘT BÉ MÈO');
        this.list.splice(i, 1);
      }
    }
  },

  TORN_G: 520,       // gia tốc rơi sau khi lủng dù (px/s²)
  TORN_VMAX: 360,    // trần tốc rơi — gấp ~6 lần dù lành
  // màu dù của từng skin, cho mảnh vải văng ra đúng màu
  CANOPY: { 'cat-fish': '#ffd23f', 'cat-goggles': '#4db8ff' },

  _tear(p) {
    p.torn = true;
    p.vy = 90;
    SC.FX.burst(p.x, p.y - 34, this.CANOPY[p.skin] || '#fff', 12, 190, 1.2);
    SC.FX.text(p.x, p.y - 58, 'DÙ LỦNG!', '#ff5c7a');
    SC.Audio.alarm();
  },

  render(ctx) {
    for (const p of this.list) {
      // lủng dù thì lắc giật liên hồi thay cho đung đưa êm
      const sway = p.torn ? Math.sin(p.t * 22) * 0.12 : Math.sin(p.t * 1.3) * 0.18;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(sway);

      // vòng sáng cho dễ thấy giữa đạn lửa — lủng dù chuyển ĐỎ: báo động, lao tới ngay
      SC.draw.glow(ctx, 0, 0, 34, p.torn ? '#ff4d6a' : '#4dff9f', p.torn ? 0.6 : 0.4);

      /* Sprite mèo béo nhảy dù — vẽ TO hơn art cũ có chủ ý (91px, +20% lần 2 ngày
         22/09): đây là thứ người chơi phải muốn bay tới cứu, nhỏ quá là bị bỏ rơi.
         Vòng hút r=16 GIỮ NGUYÊN — chỉ phóng hình, không đổi gameplay.
         Ảnh chưa tải xong thì rơi về hình phi công vẽ tay bên dưới. */
      // sprite "dù lủng" riêng (<skin>-torn); chưa có ảnh thì dùng ảnh lành + glow đỏ
      const img = (p.torn && SC.SpriteArt.get('rescue', p.skin + '-torn'))
        || SC.SpriteArt.get('rescue', p.skin);
      if (img) {
        // sprite dù rách (OPT B) dáng DỌC: dải dù phía trên, mèo ở ~70% chiều cao ảnh
        // -> vẽ to hơn + đẩy lên cho THÂN MÈO nằm đúng tâm vòng cứu
        const S = p.torn ? 112 : 91;
        const oy = p.torn ? -S * 0.7 : -S / 2 - 4;
        ctx.drawImage(img, -S / 2, oy, S, S);
        ctx.restore();
        continue;
      }

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
    SC.Defectors.load();                        // một lần mỗi phiên, chạy nền
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
    // × lateDensity: bớt quái từ màn 49 (system-power.js)
    const n = Math.max(4, Math.round(lv.perWave * inten * SC.Power.den() * SC.Power.lateDensity()));
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

    this._mixCounter(lv, inten);
    SC.DefectorSpawn.mix(this.queue, lv, this.index);   // tàu người chơi đã bán, ≤50% wave
    this.lastCount = this.queue.length;
    this.spawning = true;
    this.sinceWave = 0;
  },

  /* Trộn quái khắc chế vào wave. Mỗi map chỉ một loại (xem entity-enemy-counter.js) và
     chỉ từ wave 2 trở đi — wave đầu để người chơi làm quen nhịp map đã. */
  _mixCounter(lv, inten) {
    if (this.index < 2) return;                  // wave đầu để làm quen nhịp map đã
    const type = SC.EnemyCounter.forLevel(lv);
    if (type) {
      // muỗi đi thành bầy đông, hai loại kia đi lẻ vài con
      const n = type === 'midge' ? Math.round(12 * Math.min(1.3, inten)) : 1 + Math.round(inten);
      this._swapIn(type, n);
    }
    // Nửa sau chiến dịch luôn có KHIÊN NGƯỢC kèm theo, dù map đó thuộc lượt loại nào.
    // Nhưng CHẶN TRẦN số con đang sống: chúng không chết được nếu bắn từ dưới lên, nên
    // thả đều mỗi wave là chúng dồn lại thành một bức tường không gỡ nổi — đo được
    // map 45 không bot nào qua nổi vì tới wave 3 đã có 6 con chắn ngang màn.
    const live = SC.Game.enemies.filter(e => !e.dead && e.type === 'guard').length;
    this._swapIn('guard', Math.max(0, SC.EnemyCounter.guardCount(lv) - live));
  },

  /* Thay chỗ của n con thường: giữ nguyên mật độ tổng, chỉ đổi thành phần */
  _swapIn(type, n) {
    for (let i = 0; i < n; i++) {
      const q = this.queue[Math.floor(Math.random() * this.queue.length)];
      if (!q) break;
      q.t = type;
      if (type === 'midge') q.x = i % 2 ? SC.rnd(SC.W - 120, SC.W - 40) : SC.rnd(40, 120);
    }
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
          const e = new SC.Enemy(q.t, q.x, q.y, lv);
          if (q.dz) e.dz = q.dz;
          enemies.push(e);
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
      // Quái khắc chế KHÔNG được rút lui: nếu chúng cũng bỏ chạy thì người chơi chỉ
      // cần đứng đợi 6 giây là xong, và cả cơ chế khắc chế thành vô nghĩa.
      if (this.sinceWave > 6)
        for (const e of enemies) if (!e.isBoss && !SC.EnemyCounter.is(e.type)) e.flee = true;
      return;
    }

    if (lv.boss && !this.bossSpawned) {
      this.bossSpawned = true;

      // Tiếp tế trước trận trùm: map thấp người chơi mới vũ khí cấp 1, sát thương
      // quá yếu nên trận trùm kéo lê. Thả sẵn 2 gói nâng vũ khí cho công bằng.
      SC.Items.drop(SC.W * 0.35, 80, 'power');
      SC.Items.drop(SC.W * 0.65, 80, 'power');

      const boss = new SC.Boss(lv);
      SC.DefectorSpawn.bossify(boss, lv);     // vô tận: có thể là tàu phản bội hạng trùm
      enemies.push(boss);
      SC.Game.boss = boss;
      SC.UI.showBoss(boss.name);
      SC.UI.toast('CẢNH BÁO — ' + boss.name, true);
      SC.addShake(12, 0.6);
      SC.Audio.alarm();
      SC.UI.setWave(this.total + 1, this.total + 1);
    } else {
      this.done = true;
    }
  }
};

;
/* ===== js/system-hit-grid.js ===== */
/* system-hit-grid.js — lưới không gian cho va chạm đạn ↔ quái
 *
 * VÌ SAO CÓ: cách cũ so mọi viên đạn với mọi con quái, tức O(đạn × quái). Ở chiến
 * dịch thì không sao (30 đạn × 25 quái = 750 phép so mỗi khung), nhưng ở vòng vô tận
 * cấp cao có ~200 quái và ~500 đạn = 100.000 phép so mỗi khung — đo được nó TREO HẲN
 * trình duyệt ở map 118 với cây cấp 16.
 *
 * CÁCH CHỮA: chia màn thành lưới ô vuông, mỗi con quái ghi tên vào ô nó nằm. Viên đạn
 * chỉ so với quái trong những ô nó chạm tới. Số phép so tụt về O(đạn × quái-gần), thực
 * tế còn vài con mỗi viên.
 *
 * Ô 72px chọn theo con quái to nhất (bán kính ~31) cộng viên đạn to nhất: một thực thể
 * không bao giờ trải quá hai ô liền nhau, nên quét 3×3 ô quanh viên đạn là chắc chắn
 * không bỏ sót.
 */

SC.HitGrid = {
  CELL: 72,
  _cells: new Map(),
  _cols: 0,

  /* Dựng lại lưới mỗi khung. Rẻ hơn nhiều so với cập nhật từng con khi nó di chuyển,
     và không bao giờ lệch trạng thái. */
  build(enemies) {
    const c = this._cells;
    c.clear();
    this._cols = Math.ceil(SC.W / this.CELL) + 2;
    for (const e of enemies) {
      if (e.dead) continue;
      const k = this._key(e.x, e.y);
      const bucket = c.get(k);
      if (bucket) bucket.push(e); else c.set(k, [e]);
    }
  },

  _key(x, y) {
    const cx = Math.floor(x / this.CELL) + 1;      // +1 để toạ độ âm không đụng ô khác
    const cy = Math.floor(y / this.CELL) + 1;
    return cy * this._cols + cx;
  },

  /* Danh sách quái CÓ THỂ chạm tới điểm (x,y). Trả về mảng dùng lại được — bên gọi
     chỉ đọc, không giữ tham chiếu qua khung sau. */
  _out: [],
  near(x, y) {
    const out = this._out;
    out.length = 0;
    const cx = Math.floor(x / this.CELL) + 1;
    const cy = Math.floor(y / this.CELL) + 1;
    for (let dy = -1; dy <= 1; dy++) {
      const row = (cy + dy) * this._cols;
      for (let dx = -1; dx <= 1; dx++) {
        const b = this._cells.get(row + cx + dx);
        if (b) for (let i = 0; i < b.length; i++) out.push(b[i]);
      }
    }
    return out;
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

    // đạn ta ↔ quái — chỉ so với quái Ở GẦN, xem system-hit-grid.js
    SC.HitGrid.build(g.enemies);
    for (let i = SC.Bullets.mine.length - 1; i >= 0; i--) {
      const b = SC.Bullets.mine[i];
      const near = SC.HitGrid.near(b.x, b.y);
      for (let j = 0; j < near.length; j++) {
        const e = near[j];
        if (e.dead || !SC.hit(b, e)) continue;
        // Đạn xuyên đi qua nhiều con: phải nhớ đã ăn con nào rồi, không thì một viên
        // nằm đè lên quái sẽ trừ máu mỗi khung hình.
        if (b.pierce !== undefined) {
          if (!b.hitSet) b.hitSet = new Set();
          if (b.hitSet.has(e)) continue;
          b.hitSet.add(e);
        }
        // mỗi loạt bắn chỉ ghi nhận trúng một lần; đạn phi đội không có số loạt
        // nên tự động nằm ngoài cách tính độ chính xác
        if (b.vol !== undefined && !p.volleyHit.has(b.vol)) {
          p.volleyHit.add(b.vol);
          p.hits++;
        }
        this.impactFX(b, e);
        SC.Audio.hit();
        // truyền cả viên đạn vào: quái KHIÊN NGƯỢC cần biết đòn đến từ hướng nào
        if (e.hurt(b.dmg, b)) this.killEnemy(g, e);
        SC.Mods.onHit(b, e, g);                  // sét lan nảy sang con bên cạnh
        if (b.kind === 'missile') { SC.FX.burst(b.x, b.y, '#ff9a2b', 20, 300, 4); SC.addShake(5, .16); }
        // Đạn xuyên đi qua được cả HÀNG quái thường, nhưng KHÔNG xuyên qua trùm:
        // thân trùm rộng gần nửa bề ngang màn, cho đạn lọt qua thì nhìn như bắn
        // trượt dù máu vẫn trừ — mất hẳn phản hồi "mình vừa đánh trúng".
        if (b.pierce > 0 && !e.isBoss) { b.pierce--; continue; }
        SC.Bullets.mine.splice(i, 1);
        break;
      }
    }

    // đạn địch ↔ ta
    for (let i = SC.Bullets.foe.length - 1; i >= 0; i--) {
      const b = SC.Bullets.foe[i];
      if (p.dead) continue;
      // vùng va chạm hẹp lại theo độ nghiêng cánh — xem system-bank.js
      if (!SC.Bank.hitPlayer(p, b, 0.8)) {
        // trượt rồi, nhưng có phải nhờ nghiêng cánh không? -> thưởng pha lách
        if (SC.Bank.checkGraze(p, b, 0.8)) SC.Bank.onGraze(g, p, b);
        continue;
      }
      SC.Bullets.foe.splice(i, 1);
      p.hurt(Math.round((b.kind === 'egg' ? 8 : 12) * SC.Power.dmg()));
    }

    // thân quái ↔ ta
    for (const e of g.enemies) {
      if (e.dead || p.dead) continue;
      if (SC.Bank.hitPlayer(p, e, 0.85)) {
        p.hurt(Math.round((e.isBoss ? 22 : 14) * SC.Power.dmg()));
        if (!e.isBoss && e.hurt(9999)) this.killEnemy(g, e);
      }
    }
  },

  /* ---------- hiệu ứng lúc đạn chạm ----------
   *
   * Điểm nổ phải nằm trên BỀ MẶT quái, không phải ở tâm viên đạn. Đạn bay 780-1250
   * px/giây, tức 13-21px mỗi khung, nên tới lúc kiểm va chạm nó thường đã lún khá sâu
   * vào thân — nổ ngay tại đó thì với trùm (bán kính 54-64) vụ nổ nằm lọt trong bụng,
   * nhìn không ra là đã trúng.
   *
   * Trùm ăn tới vài chục viên mỗi giây nên phần nặng (vòng sáng + rung) bị chặn nhịp,
   * còn tia lửa thì viên nào cũng có để không mất phản hồi.
   */
  _ringT: 0,

  impactFX(b, e) {
    const dx = b.x - e.x, dy = b.y - e.y;
    const d = Math.hypot(dx, dy) || 1;
    // lùi về mặt ngoài của quái, nhưng không lùi quá vị trí thật của viên đạn
    const back = Math.min(d, e.r);
    const x = e.x + dx / d * back, y = e.y + dy / d * back;

    if (!e.isBoss) {
      SC.FX.burst(x, y, '#ffe28a', 5, 130, 2);
      return;
    }

    // tia lửa bắn NGƯỢC lại hướng đạn bay tới, cho ra cảm giác nảy khỏi lớp giáp
    SC.FX.burst(x, y, '#fff3c2', 6, 210, 2.2);
    SC.FX.burst(x, y, '#ff9d1f', 4, 260, 2.8);

    if ((this._ringT -= 1 / 60) > 0) return;
    this._ringT = 0.07;
    SC.FX.ring(x, y, 'rgba(255,220,140,.95)', 4, 26, 0.2);
    SC.addShake(3, 0.08);
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

    /* Kẻ địch CUỐI CÙNG của màn gục (trùm cũng đi qua đây) -> nhả mảnh tiến hóa
       nếu màn này có (system-evo-shard.js). e vừa dead=true nên tự loại khỏi some. */
    if (SC.Waves.done && !g.enemies.some(x => !x.dead) && !(g.boss && !g.boss.dead))
      SC.EvoShard.onLastKill(e.x, e.y);

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
      // Giá trị gấp đôi bản đầu: đo được tới map 30 người chơi mới mua nổi 3% cây
      // kỹ năng, mà mục tiêu là 80%. Xem thêm SC.GOLD_DEPTH.
      case 'coin':  g.coin += 6;  g.score += 5;  SC.FX.text(x, y, '+6◈', '#ffd23f');  SC.Audio.coin(); break;
      case 'gem':   g.coin += 30; g.score += 50; SC.FX.text(x, y, '+30◈', '#c58cff'); SC.Audio.gem(); break;
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
      case 'evoShard': SC.EvoShard.award(g, x, y); break;
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
    // Rung và số hạt cũng hạ theo bong bóng: bom nhặt được khá dày ở map đông quái,
    // mỗi lần nổ mà giật cả màn thì chơi lâu rất mỏi.
    SC.addShake(12, .32);
    SC.Input.vibrate(45);
    SC.Audio.bomb();
    SC.FX.burst(g.player.x, g.player.y, '#ff3b5c', 34, 400, 4);
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

    const next = ui.progress.unlocked;
    const lv = SC.levelAt(next);
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
    const endless = SC.Endless.active(lv.id);
    set('nowLabel', endless ? `VÒNG VÔ TẬN ${SC.Endless.cycle(lv.id) + 1}`
      // Nhãn ngắn có chủ ý: ô này chỉ rộng ~198 đơn vị ảo và phải chia chỗ với
      // chip độ khó bên cạnh. "BẮT ĐẦU HÀNH TRÌNH" ở cỡ chữ mới cần 376 -> gãy đôi.
      : done ? 'CHƠI TIẾP' : next === 1 ? 'BẮT ĐẦU' : 'TIẾP THEO');
    set('nowMap', 'MÀN ' + String(lv.id).padStart(2, '0'));
    set('nowBiome', endless
      ? `${biome.name} · khó ×${SC.Endless.mul(lv.id).toFixed(1)}`
      : `${biome.name} · ${lv.stage}/${per}`);

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

    /* ---------- tiến độ sao ----------
       Đếm TẤT CẢ sao, kể cả kiếm ở vòng vô tận, và trần nới theo số màn đã mở
       (xem SC.UI.starMax). Giữ trần 180 thì sang vòng vô tận thanh vượt 100% và
       con số đọc lên thành "191/180". */
    const star = ui.totalStar();
    const max = ui.starMax();
    set('nowStars', star);
    set('nowStarMax', max);
    const fill = id('nowStarFill');
    if (fill) fill.style.width = SC.clamp(star / max * 100, 0, 100).toFixed(1) + '%';

    /* ---------- câu chuyện mảnh tiến hóa thế chỗ số liệu (21/09/2026) ----------
       Kênh có TIẾN HÓA AI: thanh sao + hàng ví bị chê "số trần trụi" — thay bằng
       một dòng kể chuyện mảnh 🧬 (từ đã nhặt, "???" nhá hàng, mảnh kế ở màn nào).
       Kênh không có tính năng (portal công khai) giữ nguyên số liệu cũ. */
    const evoBox = id('nowEvo');
    const evoOn = !!(SC.EvoAI && SC.EvoAI.active());
    document.querySelectorAll('#menuNow .star-track, #menuNow .now-foot')
      .forEach(x => x.classList.toggle('hidden', evoOn));
    if (evoBox) {
      evoBox.classList.toggle('hidden', !evoOn);
      if (evoOn) {
        evoBox.innerHTML = this._evoLine();
        const duBo = SC.EvoAI.ready();
        evoBox.classList.toggle('go', duBo);
        evoBox.onclick = duBo ? () => SC.EvoAIUI.open() : null;
      }
    }

    /* ---------- ví + sức mạnh ---------- */
    this._count('nowPower', SC.Power.show());
    this._count('menuCoin', ui.progress.coin);
    set('nowUpg', SC.Tree.totalLevels());
    set('nowUpgMax', SC.Tree.totalMax());

    const badge = id('shopBadge');
    // Chấm đỏ đậm hơn khi có nhánh đang CHỜ CHỌN HƯỚNG: đó là việc bắt buộc,
    // không phải gợi ý mua thêm.
    if (badge) badge.className = SC.Tree.pendingFork() ? 'dot urgent'
      : SC.Tree.anyAffordable() ? 'dot' : '';

    // dòng phụ dưới logo: số map lấy từ dữ liệu, đổi levelsPerBiome trong Excel là tự đúng
    // Không quảng cáo số map nữa: hết chiến dịch là mở vòng vô tận, con số cố định
    // vừa sai vừa bán hụt thứ hay nhất của game.
    // Ngắn gọn có chủ ý: trên điện thoại dòng này chỉ rộng ~330px thật, chuỗi cũ
    // 42 ký tự bị gãy dòng ngay dưới logo.
    set('logoTag', 'CHIẾN DỊCH · VÔ TẬN · AUTO BẮN');

    this.hookLine(ui, lv, biome, per);
    SC.GarageUI.syncButton();     // nút GARA chỉ hiện ở kênh có tiến hóa
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

    // (2. "sắp lên danh hiệu" đã DỌN LÊN thẻ hồ sơ 22/09/2026 — ui-auth-panel
    //  syncChip hiện thường trực ⚔lực chiến + còn bao nhiêu lên hạng kế)

    // 3. hồ sơ khác trên máy đang đi trước mình
    const me = ui.progress.unlocked;
    const ahead = SC.Profiles.summaries()
      .filter(p => !p.isMe && p.level > me)
      .sort((a, b) => b.level - a.level)[0];
    if (ahead) return `<b>${esc(ahead.name)}</b> đã tới màn <b>${ahead.level}</b>`;

    // 4. có nhánh đang chờ chọn hướng — việc bắt buộc, ưu tiên hơn mọi gợi ý mua
    const fork = SC.Tree.pendingFork();
    if (fork) return `Nhánh <b>${esc(SC.TREE[fork].name)}</b> đang chờ chọn hướng`;

    // 5. đủ vàng nâng cấp -> gọi tên nhánh rẻ nhất mua được cho cụ thể
    const buyable = SC.TREE_KEYS
      .filter(k => SC.Tree.canBuy(k))
      .sort((a, b) => SC.Tree.cost(a) - SC.Tree.cost(b))[0];
    if (buyable) return `Đủ vàng nâng <b>${esc(SC.TREE[buyable].name)}</b>`;

    return '';
  },

  /* Một dòng kể chuyện mảnh: ngắn vì thẻ chỉ rộng ~200 đơn vị ảo. Đủ bộ thì cả
     dòng thành nút bấm mở popup ghép — đường ngắn nhất từ "thấy" tới "làm". */
  _evoLine() {
    const st = SC.EvoAI.st();
    const n = SC.EvoShard.progress();
    const pips = `<span class="frag-pips">${
      [1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</span>`;
    if (n >= 3) return `${pips}🧬 <b>ĐỦ BỘ</b> — bấm ghép chiến đấu cơ mới!`;
    const nextLv = (Math.floor(st.lastLv / 3) + 1) * 3;
    if (n === 0) return `${pips}🧬 Mảnh tiến hóa đầu tiên rơi ở <b>MÀN ${nextLv}</b>`;
    const bo = st.kw.slice(st.kw.length - n);
    const ten = i => bo[i] ? SC.Rank.esc(bo[i].vi.toUpperCase()) : '???';
    return `${pips}🧬 ${ten(0)} · ${ten(1)} · ${ten(2)} — mảnh kế: <b>MÀN ${nextLv}</b>`;
  },

  /* Đếm lên khi số đổi — cho cảm giác vừa kiếm được, không phải con số chết.
     Chỉ chạy khi giá trị khác lần trước, nếu không mỗi lần về menu lại đếm lại. */
  _count(elId, target) {
    const el = document.getElementById(elId);
    if (!el) return;
    const from = this._prev[elId];
    this._prev[elId] = target;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const f = n => SC.Power.fmt(n);      // chấm nghìn cho cả lực chiến ×100 lẫn vàng
    if (from === undefined || from === target || reduce) { el.textContent = f(target); return; }

    clearInterval(el._countT);
    const t0 = performance.now(), span = 450, d = target - from;
    el._countT = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / span);
      el.textContent = f(from + d * (1 - Math.pow(1 - k, 3)));   // ease-out
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
    const lv = SC.levelAt(SC.Game.levelId);

    id('resTitle').textContent = win ? 'HOÀN THÀNH' : 'THẤT BẠI';
    // màu chữ do CSS .res-crest quyết theo lớp win/lose — chữ khối gradient vàng khi
    // thắng, đỏ phẳng khi thua (thua không đáng được huy hiệu lấp lánh)
    id('resTitle').parentElement.classList.toggle('lose', !win);

    // Màn vừa chơi. Dùng tên vùng chứ không dùng lv.name vì lv.name đã kèm số
    // thứ tự trong vùng, ghép vào thành "MÀN 15 · SA MẠC HOÀNG HÔN 5" thừa và gãy dòng.
    id('resLevel').textContent = SC.Endless.label(lv.id) + ' · ' + SC.BIOMES[lv.biome].name;
    const tag = id('resTag');
    tag.classList.toggle('hidden', !lv.boss);
    tag.classList.toggle('final', !!lv.finalBoss);
    if (lv.boss) tag.textContent = lv.finalBoss ? 'TRÙM VÙNG' : 'ELITE';

    /* Thua thì GIẤU HẲN sao và nhiệm vụ.
       Thua là không có sao, nên ba ngôi sao xám và ba dòng gạch ✗ chỉ chiếm chỗ để
       nhắc lại là chẳng được gì. Tệ hơn: cách chấm cũ ép mọi nhiệm vụ thành ✗ khi
       thua, nên bảng hiện "Độ chính xác từ 55%" ✗ ngay trên dòng "Chính xác 95%" —
       nhìn như bảng tính sai. */
    id('resStars').classList.toggle('hidden', !win);
    const mis = id('resMissions');
    mis.classList.toggle('hidden', !win);

    if (win) {
      [...id('resStars').children].forEach((s, i) => s.classList.toggle('on', i < r.stars));
      // Trượt nhiệm vụ thì nói luôn còn thiếu bao nhiêu — đó là lý do để chơi lại.
      mis.innerHTML = r.missions.map(m => `
        <li class="${m.done ? 'ok' : 'no'}">
          <span class="m-ic">${m.def.ic}</span>
          <span class="m-txt">${m.text}${!m.done && m.miss ? `<i>${m.miss}</i>` : ''}</span>
          <b>${m.done ? '✓' : '✗'}</b>
        </li>`).join('');

      /* Tiến độ mảnh tiến hóa (chỉ kênh có tính năng): KHOE từ khóa đã nhặt và
         nhá "???" cho mảnh còn thiếu + nói thẳng mảnh kế rơi ở màn nào — mồi tò mò
         để người chơi đánh thêm một chặng nữa thay vì thoát (yêu cầu 21/09). */
      if (SC.EvoAI.active()) {
        const st = SC.EvoAI.st();
        const n = SC.EvoShard.progress();
        const bo = st.kw.slice(st.kw.length - n);          // bộ 3 đang gom dở
        const ten = i => bo[i] ? SC.Rank.esc(bo[i].vi.toUpperCase()) : '???';
        const chuoi = `${ten(0)} · ${ten(1)} · ${ten(2)}`;
        const nextLv = (Math.floor(st.lastLv / 3) + 1) * 3;
        const sub = n >= 3
          ? `${chuoi} — chiến đấu cơ mới đang chờ ghép!`
          : `${chuoi} — mảnh kế rơi ở màn ${nextLv}`;
        mis.innerHTML += `
        <li class="evo-frag${n >= 3 ? ' full' : ''}">
          <span class="m-ic">🧬</span>
          <span class="m-txt">Mảnh tiến hóa<i>${sub}</i></span>
          <span class="frag-pips">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</span>
          <b>${n >= 3 ? 'ĐỦ BỘ!' : n + '/3'}</b>
        </li>`;
      }
    }

    id('resScore').textContent = r.score;
    id('resKill').textContent = r.kills;
    id('resAcc').textContent = r.acc + '%';

    // Thời gian: chỉ khoe kỷ lục khi thật sự phá được mốc CŨ, không phải lần đầu qua màn
    const t = id('resTime');
    const beat = win && r.record && r.prevBest > 0;
    t.parentElement.classList.toggle('record', beat);
    t.innerHTML = beat
      ? `${r.time}s <em>KỶ LỤC MỚI</em>`
      : (win && r.prevBest && r.prevBest < r.time ? `${r.time}s <i>tốt nhất ${r.prevBest}s</i>` : r.time + 's');

    // Nhuộm bảng theo vùng vừa đánh, cùng hệ màu với lobby và bản đồ hành trình
    const panel = id('scrResult').querySelector('.panel');
    if (panel) panel.style.setProperty('--tint', `hsl(${SC.BIOMES[lv.biome].hue},70%,62%)`);

    // Thua chỉ có đúng một khoản vàng -> bỏ khung hộp, để trần một dòng cho gọn
    const gold = id('resGold');
    gold.innerHTML = this._goldRows(win, r);
    gold.classList.toggle('solo', !win);
    /* Popup bị chê dài (21/09): mặc định GẤP bảng vàng lại còn đúng dòng TỔNG NHẬN,
       bấm vào là xoè chi tiết. Người muốn soi công thức vẫn soi được, người chỉ cần
       con số thì đỡ phải đọc 4 dòng. */
    const canFold = win && gold.children.length > 1;
    gold.classList.toggle('foldable', canFold);
    gold.classList.toggle('fold', canFold);
    gold.onclick = canFold ? () => gold.classList.toggle('fold') : null;

    // Qua map 60 vẫn còn "MÀN TIẾP" — nó dẫn vào vòng vô tận (map 61 = map 1 khó hơn)
    const hasNext = win;
    ui.el.btnResNext.style.display = hasNext ? '' : 'none';

    // Vừa đi hết chiến dịch -> chỗ của MAP TIẾP thành lối vào màn tổng kết.
    // Vẫn cho xem bảng kết quả trước, vì sao và vàng của map cuối cũng phải được đếm.
    id('btnResFinale').classList.toggle('hidden', !r.finale);

    // Đủ 3 sao rồi thì chơi lại không được thêm gì -> bớt một lối thoát cho đỡ rối.
    // Vẫn giữ nút khi MAP TIẾP đang ẩn (màn cuối), không thì hàng nút trống trơn.
    const retry = id('btnResRetry');
    retry.style.display = ((hasNext && r.stars === 3) || r.finale) ? 'none' : '';
    // Thua thì CHƠI LẠI là hành động duy nhất -> nó phải là nút chính, không thể
    // để dạng viền mờ như một lựa chọn phụ.
    retry.classList.toggle('primary', !win);
    retry.classList.toggle('ghost', win);
    id('btnResShop').classList.toggle('glow', SC.Tree.anyAffordable() || !!SC.Tree.pendingFork());
    // chấm đỏ "đủ vàng nâng cấp" trên nút KỸ NĂNG (22/09) — cùng ngôn ngữ với
    // badge ở lobby, người chơi vừa nhận vàng là thấy ngay có việc để tiêu
    const resDot = id('resShopDot');
    if (resDot) resDot.classList.toggle('hidden', !SC.Tree.anyAffordable() && !SC.Tree.pendingFork());

    this._advice(id, win, lv);
    ui.syncMenu();
    ui.showOverlay('result');
  },

  /* Lời khuyên khi thua.
   *
   * Thua mà chỉ hiện "THẤT BẠI" rồi mời chơi lại là đẩy người chơi vào đúng bức tường
   * vừa chặn họ. Cái họ cần biết là: map cũ cày lại được, vàng cày ra thì nâng cây, và
   * nâng xong quay lại là qua. Nên nói thẳng, kèm SỐ MAP CỤ THỂ chứ không nói chung chung.
   */
  _advice(id, win, lv) {
    const el = id('resAdvice');
    if (!el) return;
    el.classList.toggle('hidden', win);
    if (win) return;

    const need = SC.Tree.pendingFork();
    if (need) {
      el.innerHTML = `Nhánh <b>${SC.Rank.esc(SC.TREE[need].name)}</b> đang chờ chọn hướng — `
        + 'chốt xong sẽ mạnh hơn hẳn.';
      return;
    }

    // map cày tốt nhất: map trùm gần nhất đã qua (trùm rơi 16 món, nhiều vàng nhất)
    const done = Object.keys(SC.UI.progress.stars).map(Number)
      .filter(n => n < lv.id).sort((a, b) => b - a);
    const farm = done.find(n => SC.levelAt(n).boss) || done[0];

    const cheapest = SC.TREE_KEYS
      .map(k => ({ k, c: SC.Tree.cost(k) }))
      .filter(x => x.c !== null).sort((a, b) => a.c - b.c)[0];

    const line = farm
      ? `Quay lại <b>màn ${farm}</b> cày vàng rồi nâng cây kỹ năng — `
        + (cheapest ? `nâng <b>${SC.Rank.esc(SC.TREE[cheapest.k].name)}</b> tốn ◈${SC.TreeUI.num(cheapest.c)}.` : 'rồi thử lại.')
      : 'Nâng cây kỹ năng trước khi thử lại — vàng nhặt được vẫn giữ nguyên dù thua.';

    // Đổi build là chiến thuật rẻ nhất khi bí — nói ra ngay đây, đúng lúc họ cần
    // nhất. Từ 21/09/2026 xây lại có phí lũy tiến nên phải nói thật con số.
    const back = SC.Tree.refundAll();
    el.innerHTML = line + (back > 0
      ? `<br>Hoặc <b>xây lại cả cây</b> để đổi lối chơi — hoàn ◈${SC.TreeUI.num(back)}, phí ◈${SC.TreeUI.num(SC.Tree.resetFee())}.`
      : '');
  },

  /* Bóc tách từng khoản vàng thành các dòng riêng cho dễ đọc */
  _goldRows(win, r) {
    const row = (ten, gt, lop) => `<li class="${lop || ''}"><span>${ten}</span><b>${gt}</b></li>`;

    if (!win) return row('Vàng nhặt được', '+' + r.gold, 'tong');
    let out;

    /* Ba khoản cộng dồn, phải tách ĐÚNG BA DÒNG.
       Bản cũ gộp cả hệ số ĐỘ SÂU MAP vào dòng "Thu vàng" nên con số đọc lên vô lý:
       nhặt 198 + thưởng 992 = 1.190, mà dòng "Thu vàng +120%" lại ghi +4.169 —
       gấp hơn ba lần chứ không phải 120%. */
    const depth = r.depth || 1;
    const nhat = Math.round(r.coin * depth);
    out = [row('Vàng nhặt trong màn', '+' + r.coin)];
    if (depth > 1.005) {
      // "Map sâu ×1.15" bị chê khó hiểu (21/09) — nói thẳng luật: màn càng xa
      // vàng nhân càng cao (SC.GOLD_DEPTH, +5%/màn), để người chơi biết cày đâu lời.
      out.push(row(`Màn xa thưởng thêm ×${depth.toFixed(2)}`, '+' + (nhat - r.coin)));
    }
    out.push(row(`Thưởng hoàn thành (${r.stars} sao)`, '+' + r.bonus));

    // phần do dòng nâng cấp THU VÀNG sinh ra, tính trên tổng hai khoản trên
    const themDoNangCap = r.gold - nhat - r.bonus;
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

  /* Kho dùng CHUNG cho cả tạo hồ sơ lẫn khu đổi ảnh đại diện (21/09/2026 mở 8→16:
     bản zingplay.dev không có ảnh Google nên icon là danh tính duy nhất — 8 con chim
     không đủ cho một phòng chơi chung). */
  AVATARS: ['🐔', '🦅', '🐧', '🦉', '🐤', '🦜', '🐦', '🦆',
    '🐱', '🦊', '🐼', '🐸', '🦈', '🐙', '🐲', '🤖'],

  // [{ id, name, avatar, photo? }]
  //   avatar = emoji đã chọn, LUÔN có, là bản dự phòng khi ảnh không tải được
  //   photo  = URL ảnh Google, chỉ có khi người chơi bật "dùng ảnh Google"
  list: [],
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
    if (SC.CloudRoster) SC.CloudRoster.schedule();   // danh sách hồ sơ theo lên mây
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

  /* Bật/tắt dùng ảnh Google làm ảnh đại diện của hồ sơ ĐANG MỞ.
     Lưu hẳn URL vào hồ sơ chứ không đọc lại từ Portal.Auth mỗi lần: nhờ vậy đăng xuất
     rồi vẫn giữ được mặt mình, và mỗi hồ sơ trên máy giữ ảnh riêng của nó. */
  setPhoto(url) {
    const p = this.cur();
    if (!p) return false;
    if (url) p.photo = url; else delete p.photo;
    this.save();
    return true;
  },

  /* Đổi icon đại diện của hồ sơ ĐANG MỞ. Chọn icon nghĩa là muốn DÙNG icon —
     ảnh Google (nếu đang bật) tắt luôn, không thì icon vừa chọn chẳng hiện ra đâu. */
  setAvatar(a) {
    const p = this.cur();
    if (!p || this.AVATARS.indexOf(a) < 0) return false;
    p.avatar = a;
    delete p.photo;
    this.save();
    return true;
  },

  /* tóm tắt mọi hồ sơ: chặng đang đứng, tổng sao, vàng */
  summaries() {
    return this.list.map((p, i) => {
      const pr = this.progressOf(p.id) || {};
      const stars = Object.values(pr.stars || {}).reduce((a, b) => a + b, 0);
      return {
        idx: i, id: p.id, name: p.name, avatar: p.avatar, photo: p.photo || '',
        isMe: i === this.active,
        // không chặn ở 60: vòng vô tận vẫn phải thấy được trên bảng và trên bản đồ
        level: pr.unlocked || 1,
        stars, coin: pr.coin || 0,
        // "đã qua bao nhiêu màn chiến dịch" — chỉ đếm 1..60, dùng cho mốc tốc độ
        cleared: Object.keys(pr.stars || {}).filter(k => k <= SC.TOTAL_LEVELS).length
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

    /* Đổi icon đại diện của hồ sơ đang mở (thay nút "dùng ảnh Google" legacy
       trên bản zingplay.dev — M365 ẩn danh làm gì có ảnh Google) */
    document.getElementById('avaSet').addEventListener('click', e => {
      const b = e.target.closest('button[data-a]');
      if (!b) return;
      SC.Audio.click();
      if (!SC.Profiles.setAvatar(SC.Profiles.AVATARS[+b.dataset.a])) return;
      this.build();
      if (SC.AuthPanel) SC.AuthPanel.sync();   // thẻ tên ở lobby đổi mặt ngay
      SC.UI.syncMenu();
      SC.UI.toast('ĐÃ ĐỔI ẢNH ĐẠI DIỆN');
    });

    on('btnProfNew', () => this.create());
  },

  build() {
    const list = document.getElementById('profList');
    const rows = SC.Profiles.summaries();

    // Khối tài khoản đám mây nằm ngay trên danh sách -> dựng lại cùng lúc,
    // nếu không thì đổi hồ sơ xong dòng "đang sao lưu hồ sơ" vẫn tên cũ.
    if (SC.AuthPanel) SC.AuthPanel.syncCloud();

    list.innerHTML = rows.map(p => `
      <div class="prof-row${p.isMe ? ' me' : ''}" data-idx="${p.idx}">
        <span class="prof-ava">${SC.Ava.ofProfile(p)}</span>
        <div class="prof-mid">
          <b>${SC.Rank.esc(p.name)}${p.isMe ? ' <em>đang chơi</em>' : ''}</b>
          <span>Màn ${p.level} · ★${p.stars} · ◈${p.coin}</span>
        </div>
        ${rows.length > 1 ? '<button class="prof-del icon-btn" title="Xoá hồ sơ" aria-label="Xoá hồ sơ"><svg class="ic" aria-hidden="true"><use href="#i-trash"/></svg></button>' : ''}
      </div>`).join('');

    // khu tạo hồ sơ mới chỉ hiện khi còn chỗ
    const box = document.getElementById('profNewBox');
    box.classList.toggle('hidden', SC.Profiles.full());
    document.getElementById('profFull').classList.toggle('hidden', !SC.Profiles.full());

    document.getElementById('avaPick').innerHTML = SC.Profiles.AVATARS
      .map((a, i) => `<button data-a="${i}"${i === this.pickAvatar ? ' class="on"' : ''}>${a}</button>`)
      .join('');

    // khu đổi ảnh của hồ sơ đang mở: tô sáng icon đang dùng
    const cur = SC.Profiles.cur();
    document.getElementById('avaSet').innerHTML = SC.Profiles.AVATARS
      .map((a, i) => `<button data-a="${i}"${cur && cur.avatar === a && !cur.photo ? ' class="on"' : ''}>${a}</button>`)
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
    // Tàu tiến hóa cũng là của TỪNG hồ sơ — đổi người là đổi tàu (bug 21/09:
    // hồ sơ mới vẫn bay tàu evo của hồ sơ cũ)
    SC.EvoAI.onProfileChange();
    SC.UI.buildMapList();
    SC.UI.syncMenu();
    // Đổi hồ sơ: kéo bản sao lưu của hồ sơ mới rồi mới đẩy (tên + tiến độ lên BXH)
    SC.Cloud.switchProfile();
  }
};

;
/* ===== js/cloud-adapter.js ===== */
/* cloud-adapter.js — Sky Chicken nói cho mã dùng chung biết DỮ LIỆU CỦA NÓ hình dạng thế nào
 *
 * Phần mạng (phiên, hạn giờ, gom lần ghi, hàng đợi khi mất mạng, quy tắc xử lý xung đột)
 * do `shared/portal-cloud.js` lo. File này chỉ khai báo thứ thuộc riêng Sky Chicken.
 *
 * VÌ SAO VẪN GIỮ TÊN `SC.Cloud`: bảy file khác đang gọi `SC.Cloud.markDirty()`, và
 * `ui-rank.js` gọi `SC.Cloud.stats()` / `.playerName()` / `.ORDER`. Mấy thứ sau là của
 * riêng Sky Chicken, không có chỗ trên `Portal.Cloud`. Giữ `SC.Cloud` làm mặt tiền thì
 * phần riêng có chỗ ở đúng của nó, còn phần mạng vẫn đi qua mã chung — thay vì rải
 * `Portal.Cloud.markDirty()` khắp nơi rồi bỏ lại `SC.Cloud.stats()` lửng lơ.
 *
 * Thay cho `system-firebase.js` + `system-auth.js` + `system-cloud-save.js` (388 dòng).
 */

SC.Cloud = {
  /* Firestore chưa dùng được (chưa tạo database, luật chặn…). `ui-auth-panel.js` dò
     một lần lúc khởi động rồi ghi vào đây; `ui-rank.js` đọc để khỏi ngồi chờ hết
     8 giây hạn giờ mới biết là hỏng. */
  blocked: '',

  /* Trạng thái đồng bộ cho chấm màu ở lobby. Đọc như thuộc tính vì `ui-auth-panel.js`
     tra `this.SYNC[SC.Cloud.state]` — đổi thành hàm là hỏng chỗ đó. */
  get state() { return Portal.Cloud.state(); },

  /* Bảng sắp xếp của 3 tab. `ui-rank.js` dùng cả cho bảng nội bộ 3 hồ sơ nên phải
     nằm ở đây, không đẩy vào mã chung được. */
  ORDER: {
    level: ['highestLevel', 'desc'],
    time: ['bestTime', 'asc'],
    stars: ['totalStars', 'desc']
  },

  /* ---------- số liệu rút ra từ tiến độ ---------- */
  /* p mặc định = hồ sơ đang mở; system-rank-all-profiles.js truyền tiến độ hồ sơ khác */
  stats(p = SC.UI.progress) {
    const times = p.times || {};
    let sum = 0, cleared = 0;
    for (let i = 1; i <= SC.TOTAL_LEVELS; i++) {
      if (times[i] > 0) { sum += times[i]; cleared++; }
    }
    return {
      // KHÔNG chặn ở màn 60: vòng vô tận là chỗ người chơi giỏi phân định hơn thua,
      // chặn lại thì ai qua chiến dịch cũng hoà nhau ở đúng một con số.
      highestLevel: p.unlocked || 1,
      totalStars: Object.values(p.stars || {}).reduce((a, b) => a + b, 0),   // cả sao vòng vô tận
      cleared,
      // chỉ tính "thời gian hoàn thành" khi đã qua đủ cả chiến dịch, so kèo mới công bằng
      campaignTime: cleared >= SC.TOTAL_LEVELS ? Math.round(sum) : null
    };
  },

  /* Tên hiện trên bảng xếp hạng là TÊN PHI CÔNG của hồ sơ đang chơi, không phải tên
     tài khoản Google. Một tài khoản có tới 3 hồ sơ, mỗi hồ sơ một hành trình riêng —
     lấy tên Google thì cả ba đều hiện cùng một cái tên, chẳng phân biệt được. */
  playerName() {
    const p = SC.Profiles.cur();
    return ((p && p.name) || (Portal.Auth.user && Portal.Auth.user.name) || 'Phi công').slice(0, 40);
  },

  /* ---------- uỷ quyền sang mã chung ---------- */
  markDirty(delay) {
    Portal.Cloud.markDirty(delay);
    /* Bản zingplay.dev: treo thêm gương tiến độ theo email để sang máy khác còn kéo
       về được (uid anonymous không theo người). Ngoài zingplay.dev là no-op. */
    if (SC.M365Sync) SC.M365Sync.mirror();
  },

  /* MỖI HỒ SƠ MỘT DÒNG BXH (bug 22/09/2026): bản cũ ghi scores/{uid} cho MỌI hồ sơ —
     đổi hồ sơ là đè dòng của hồ sơ kia, cả tài khoản chỉ còn đúng hồ sơ chơi gần nhất.
     Hồ sơ 1 GIỮ scores/{uid} (dòng cũ của mọi người vẫn đúng chủ), hồ sơ 2-3 ghi
     scores/{uid}_p{id}. Luật firestore.rules cho phép đúng hai dạng id này. */
  scoreId(uid, prof = SC.Profiles.cur()) {
    return prof && prof.id !== 1 ? `${uid}_p${prof.id}` : uid;
  },

  /* ĐỔI HỒ SƠ: KÉO bản sao lưu của hồ sơ mới TRƯỚC, rồi mới đẩy (pull tự đẩy khi máy
     nhiều hơn). Bản cũ markDirty(0) đẩy ngay — máy mới mở hồ sơ 2 trắng là đè mất bản
     tốt trên mây của hồ sơ 2. Gương M365 cũng đọc lại theo khoá của hồ sơ mới. */
  switchProfile() {
    Portal.Cloud.snapshotLocal();
    if (Portal.Auth.user) Portal.Cloud.pull();
    if (SC.M365Sync) SC.M365Sync.restore();
  },

  /* Bảng xếp hạng toàn cầu. Đệm 60 giây nằm trong `Portal.Rank`. */
  rank(tab) {
    const [field, dir] = this.ORDER[tab];
    return Portal.Rank.top('scores', field, { dir, limit: 100 }).then(rows => {
      /* KHỬ TRÙNG LẶP M365 (bug thấy trên banga 21/09/2026): uid ẩn danh sống theo
         TRÌNH DUYỆT, nên một người chơi trên 2 máy = 2 dòng cùng m365Email. Bảng đã
         sắp theo thành tích — dòng ĐẦU TIÊN của mỗi email là dòng tốt nhất, các dòng
         sau bỏ khỏi hiển thị (bản ghi trong Firestore vẫn còn, chỉ là không chiếm
         chỗ trên bảng). Dòng không có email (đăng nhập Google, khách) giữ nguyên.
         Lọc xong phải đánh lại pos, không thì bảng hiện 1-2-4-5.
         Khoá = email + TÊN PHI CÔNG (22/09/2026): chỉ theo email thì mọi HỒ SƠ khác
         của cùng một người bị ẩn sạch — cùng tên hồ sơ trên hai máy mới là trùng. */
      const seen = new Set();
      return rows
        .filter(r => {
          const em = (r.m365Email || '').toLowerCase();
          if (!em) return true;
          const k = em + '|' + String(r.name || '').trim().toLowerCase();
          if (seen.has(k)) return false;
          seen.add(k);
          return true;
        })
        .map((r, i) => Object.assign(r, { pos: i + 1 }));
    });
  },

  /* ---------- điểm để so hai bản tiến độ ---------- */
  /* sao trước, rồi màn, rồi vàng */
  _weight(p) {
    if (!p) return -1;
    const st = Object.values(p.stars || {}).reduce((a, b) => a + b, 0);
    return st * 1e6 + (p.unlocked || 1) * 1e3 + Math.min(999, (p.coin || 0) / 100);
  },

  /* Máy chưa chơi gì. Phải xét riêng chứ không dựa vào `_weight`: tiến độ mới tinh
     vẫn có unlocked = 1 nên điểm khác 0, dễ bị hiểu nhầm là "có tiến độ". */
  _empty(p) {
    return !p || ((p.unlocked || 1) <= 1 && !Object.keys(p.stars || {}).length);
  },

  /* nhận tiến độ từ đám mây về máy */
  adopt(cloud) {
    /* GARA LÀ TÀI SẢN — không bao giờ để một bản mây cũ xoá tàu đã ghép (22/09/2026).
       Sổ tàu (owned) + lịch sử tổ hợp (hist) GỘP hai bên theo id, không thay thế. */
    const cu = SC.UI.progress && SC.UI.progress.evo;
    SC.UI.progress = Object.assign(
      { stars: {}, unlocked: 1, coin: 0, upg: {}, missions: {}, times: {} }, cloud);
    if (cu) {
      const moi = SC.UI.progress.evo = SC.UI.progress.evo || {};
      moi.owned = moi.owned || [];
      (cu.owned || []).forEach(o => { if (!moi.owned.some(x => x.id === o.id)) moi.owned.push(o); });
      moi.hist = Array.from(new Set([...(moi.hist || []), ...(cu.hist || [])]));
      if (!moi.equip && cu.equip) moi.equip = cu.equip;
      if (!moi.nick0 && cu.nick0) moi.nick0 = cu.nick0;   // tên riêng tàu nguyên bản
      // tàu đã bán ở MỘT bên thì bán ở cả hai — gộp sổ mây cũ không được hồi sinh nó
      moi.sold = Array.from(new Set([...(moi.sold || []), ...(cu.sold || [])]));
      moi.owned = moi.owned.filter(o => !SC.EvoSell.isSold(moi, o));
    }
    SC.UI.save();
    SC.UI.buildMapList();
    SC.UI.syncMenu();
    if (SC.EvoGarage) SC.EvoGarage.applyEquipped();   // tàu đang chọn theo sổ vừa gộp
    SC.UI.toast('ĐÃ TẢI TIẾN ĐỘ VỀ');
  },

  /* ---------- lắp vào mã chung ---------- */
  init() {
    /* Mã chung báo cho người chơi qua `Portal.toast`; Sky Chicken có kiểu thông báo
       riêng. Gán TRƯỚC init: `adopt` bên dưới có thể chạy ngay khi biết phiên cũ. */
    Portal.toast = text => SC.UI.toast(String(text).toUpperCase());

    Portal.Cloud.init({
      game: 'skychicken',
      userDoc: 'users',
      scoreDoc: 'scores',

      progress: () => SC.UI.progress,

      /* Các trường lên bảng xếp hạng.
       *
       * `hadDoc` và `fsM` do mã chung truyền vào: chưa đi hết chiến dịch thì XOÁ HẲN
       * `bestTime` để không lọt vào bảng tốc độ. Chỉ gọi `deleteField()` khi bản ghi
       * ĐÃ TỒN TẠI — gọi lúc tạo mới thì một số phiên bản SDK ném lỗi, mà lỗi đó nuốt
       * luôn cả hai lệnh ghi trong `Promise.all`. */
      score: (hadDoc, fsM) => {
        const s = SC.Cloud.stats();
        const out = { highestLevel: s.highestLevel, totalStars: s.totalStars };
        if (s.campaignTime !== null) out.bestTime = s.campaignTime;
        // hadDoc nói về dòng của HỒ SƠ 1 (scores/{uid}); dòng hồ sơ 2-3 có thể chưa tồn
        // tại -> không gọi deleteField ở đó (xem lý do ở chú thích trên)
        else if (hadDoc && SC.Profiles.cur().id === 1) out.bestTime = fsM.deleteField();
        /* Bản deploy zingplay.dev: đính email tài khoản domain vào bản ghi điểm.
           uid anonymous sống theo trình duyệt nên email là manh mối gộp/đối chiếu
           sau này. Luật scores/ không khoá danh sách trường — thêm là hợp lệ. */
        if (SC.M365 && SC.M365.info && SC.M365.info.email)
          out.m365Email = SC.M365.info.email.slice(0, 80);
        /* Avatar BXH theo HỒ SƠ, cùng lý với tên (21/09/2026): bản M365 không có
           ảnh Google nên cả bảng ô đen trống. Hồ sơ bật ảnh Google thì giữ URL,
           còn lại đẩy EMOJI — ui-rank phân biệt hai loại bằng tiền tố http. */
        const prof = SC.Profiles.cur();
        if (prof) out.avatar = (prof.photo || prof.avatar || '').slice(0, 300);
        return out;
      },

      scoreId: uid => SC.Cloud.scoreId(uid),
      // sao lưu theo TỪNG HỒ SƠ — xem system-cloud-profile-roster.js
      userId: uid => SC.Cloud.scoreId(uid),
      pick: d => (SC.CloudRoster.accepts(d) ? d.progress : null),
      onDoc: d => SC.CloudRoster.adopt(d.profiles),
      meta: () => SC.CloudRoster.meta(),
      playerName: () => SC.Cloud.playerName(),
      weight: p => SC.Cloud._weight(p),
      isEmpty: p => SC.Cloud._empty(p),
      adopt: cloud => SC.Cloud.adopt(cloud),

      /* Xung đột thì HỎI, không tự ghi đè — hộp thoại đã có sẵn ở `ui-auth-panel.js` */
      askMerge: (local, cloud) => SC.AuthPanel.askMerge(local, cloud)
    });

    /* Đổi trạng thái đồng bộ thì vẽ lại chấm màu ở lobby và khối tài khoản */
    Portal.Cloud.onState(() => SC.AuthPanel.sync());

    /* Hạ ngay một bản tóm tắt cho trang hồ sơ `/game/me/`. Không có dòng này thì người
       đã chơi từ trước bản cập nhật phải qua thêm một màn nữa mới thấy hồ sơ. */
    Portal.Cloud.snapshotLocal();

    return this;
  }
};

;
/* ===== js/system-rank-all-profiles.js ===== */
/* system-rank-all-profiles.js — đưa ĐỦ MỌI HỒ SƠ trên máy lên bảng xếp hạng (22/09/2026)
 *
 * Portal.Cloud chỉ đẩy điểm của hồ sơ ĐANG MỞ (và chỉ khi có gì đổi). Hồ sơ còn lại
 * nằm im trong localStorage: người chơi 3 hồ sơ mà chỉ mở 1 thì 2 hồ sơ kia không bao
 * giờ có dòng BXH — đúng câu hỏi "chơi nhiều profile có lên bxh hết không".
 * Nên mỗi phiên, ngay khi có vé đăng nhập, đẩy một lượt điểm cho MỌI hồ sơ KHÁC hồ sơ
 * đang mở (hồ sơ đang mở đã có Portal.Cloud lo). Id dòng: SC.Cloud.scoreId (hồ sơ 1 =
 * uid, hồ sơ 2-3 = uid_p{id}). Chỉ ghi scores/ — KHÔNG đụng users/{uid} (kho tiến độ).
 */

SC.RankAllProfiles = {
  _uid: '',              // đã đẩy cho uid nào trong phiên này

  init() { Portal.Auth.onChange(u => { if (u) this.push(); }); },

  async push() {
    const u = Portal.Auth.user;
    if (!u || this._uid === u.uid || !Portal.FB.configured()) return;
    this._uid = u.uid;
    try {
      const fb = await Portal.FB.load();
      const { doc, setDoc, serverTimestamp } = fb.fsM;
      const cur = SC.Profiles.cur();
      const email = SC.M365 && SC.M365.info && SC.M365.info.email;
      const jobs = SC.Profiles.list.filter(p => p !== cur).map(p => {
        const pr = SC.Profiles.progressOf(p.id);
        if (SC.Cloud._empty(pr)) return null;            // hồ sơ trắng không chiếm chỗ BXH
        const s = SC.Cloud.stats(pr);
        const row = {
          name: String(p.name || 'Phi công').replace(/[\x00-\x1F<>]/g, '').slice(0, 40),
          avatar: (p.photo || p.avatar || '').slice(0, 300),
          highestLevel: s.highestLevel, totalStars: s.totalStars, updatedAt: serverTimestamp()
        };
        if (s.campaignTime !== null) row.bestTime = s.campaignTime;
        if (email) row.m365Email = email.slice(0, 80);
        return setDoc(doc(fb.db, 'scores', SC.Cloud.scoreId(u.uid, p)), row, { merge: true });
      }).filter(Boolean);
      if (!jobs.length) return;
      await Portal.FB.limit(Promise.all(jobs), 'đẩy điểm các hồ sơ');
      Portal.Rank.clearCache();
    } catch (e) {
      this._uid = '';                                    // lần đổi phiên sau thử lại
      console.warn('[rank] chưa đẩy được điểm các hồ sơ khác:', (e && e.code) || e);
    }
  }
};

;
/* ===== js/system-cloud-profile-roster.js ===== */
/* system-cloud-profile-roster.js — SAO LƯU MÂY THEO TỪNG HỒ SƠ (22/09/2026)
 *
 * BUG CŨ: users/{uid} và gương m365Users/{email} chỉ MỘT bản cho cả tài khoản, đổi hồ
 * sơ là bản đó thành tiến độ hồ sơ vừa mở — sang máy mới chỉ kéo về được hồ sơ chơi
 * gần nhất, 2 hồ sơ kia coi như mất.
 *
 * CÁCH MỚI (cùng quy ước với BXH, SC.Cloud.scoreId):
 *   - hồ sơ 1 = users/{uid} + m365Users/{email} như cũ; hồ sơ 2-3 = ..._p{id}.
 *   - mỗi bản ghi mang `pid` (số hồ sơ). Hồ sơ chỉ nhận bản ĐÚNG pid của mình; bản cũ
 *     chưa có pid coi là của hồ sơ 1 (lệch nhau thì hộp thoại merge HỎI như luật cũ).
 *   - mọi bản ghi mang `profiles` = danh sách hồ sơ {id, name, avatar}: máy mới kéo
 *     bản hồ sơ 1 về là dựng lại đủ hồ sơ, mở hồ sơ nào thì kéo tiến độ hồ sơ đó.
 */

SC.CloudRoster = {
  _t: 0,

  list() {
    return SC.Profiles.list.map(p => ({ id: p.id, name: String(p.name || '').slice(0, 20),
      avatar: String(p.avatar || '').slice(0, 8) }));
  },

  /* bản ghi mây có phải của hồ sơ đang mở không */
  accepts(doc) {
    const id = SC.Profiles.cur().id;
    return doc.pid === undefined ? id === 1 : doc.pid === id;
  },

  /* trường ghi kèm mọi bản sao lưu */
  meta() { return { pid: SC.Profiles.cur().id, profiles: this.list() }; },

  /* Dựng lại hồ sơ có trên mây mà máy này chưa có — GIỮ ĐÚNG id để khoá _p{id} khớp.
     Trùng id mà khác tên (máy này tự tạo riêng) thì để nguyên hồ sơ máy này. */
  adopt(list) {
    if (!Array.isArray(list)) return;
    let them = 0;
    list.forEach(p => {
      if (!p || !(p.id > 0) || SC.Profiles.full()) return;
      if (SC.Profiles.list.some(x => x.id === p.id)) return;
      SC.Profiles.list.push({ id: p.id, name: String(p.name || 'PHI CÔNG').slice(0, 14),
        avatar: p.avatar || SC.Profiles.AVATARS[0] });
      them++;
    });
    if (!them) return;
    SC.Profiles.list.sort((a, b) => a.id - b.id);
    const cur = SC.Profiles.cur();
    SC.Profiles.active = Math.max(0, SC.Profiles.list.indexOf(cur));
    SC.Profiles.save();
    SC.UI.toast(`ĐÃ KHÔI PHỤC ${them} HỒ SƠ TỪ ĐÁM MÂY`);
  },

  /* Danh sách hồ sơ đổi (tạo/xoá/đổi tên/ảnh) -> ghi vào bản của hồ sơ 1 (merge: chỉ
     chạm trường profiles). Gương M365 chưa tồn tại thì luật chặn — bỏ qua, lần treo
     gương sau đã mang profiles. */
  schedule() {
    clearTimeout(this._t);
    this._t = setTimeout(() => this._push(), 3000);
  },

  async _push() {
    if (!Portal.FB.configured() || !Portal.Auth.user) return;
    try {
      const fb = await Portal.FB.load();
      const { doc, setDoc } = fb.fsM;
      const profiles = this.list();
      const jobs = [setDoc(doc(fb.db, 'users', Portal.Auth.user.uid), { profiles }, { merge: true })];
      const key = SC.M365Sync && SC.M365Sync._base();
      if (key) jobs.push(setDoc(doc(fb.db, 'm365Users', key), { profiles }, { merge: true }).catch(() => {}));
      await Portal.FB.limit(Promise.all(jobs), 'lưu danh sách hồ sơ');
    } catch (e) {
      console.warn('[roster] chưa lưu được danh sách hồ sơ:', (e && e.code) || e);
    }
  }
};

;
/* ===== js/ui-auth-panel.js ===== */
/* ui-auth-panel.js — khối đăng nhập ở menu và hộp thoại chọn tiến độ khi lệch nhau */

SC.AuthPanel = {
  _resolve: null,

  init(on) {
    /* Nối adapter TRƯỚC mọi nhánh: nó còn lo cả việc hạ bản tóm tắt xuống máy cho
       trang hồ sơ `/game/me/`, mà việc đó không dính gì tới Firebase. Để sau nhánh
       thoát sớm bên dưới thì cấu hình trống là hồ sơ trắng trơn. */
    SC.Cloud.init();

    // Chưa khai báo Firebase thì vẫn hiện nút, chỉ đổi nhãn và nói rõ còn thiếu gì.
    // Giấu đi thì người dựng game không biết tính năng có tồn tại hay không.
    if (!Portal.FB.configured()) {
      // Bấm vào thì mở bảng hướng dẫn từng bước, đừng chỉ nháy một dòng thông báo
      // rồi thôi — người bấm cần biết còn thiếu đúng những gì.
      on('btnLogin', () => SC.UI.showOverlay('setup'));
      on('btnSetupClose', () => SC.UI.hideOverlay('setup'));
      this.sync();
      return;
    }

    on('btnLogin', () => Portal.Auth.login());
    on('btnLogout', () => Portal.Auth.logout());
    on('btnUsePhoto', () => this.togglePhoto());

    // Kiểm Firestore một lần lúc khởi động. Nếu chưa tạo database thì mọi thao tác
    // lưu/xếp hạng sẽ treo im lặng — thà nói ngay còn hơn để người chơi tưởng đã lưu.
    Portal.FB.probe().then(r => {
      if (r.ok) return;
      SC.Cloud.blocked = r.why;
      console.warn('[firebase] Firestore chưa dùng được:', r.why);
    });

    /* Adapter đã nối ở đầu hàm — phải xong TRƯỚC `Portal.Auth.init()`, vì Auth gọi
       `Portal.Cloud.onUser()` ngay khi nhận ra phiên cũ, lúc đó adapter phải có sẵn. */
    Portal.Auth.onChange(() => this.sync());
    SC.RankAllProfiles.init();   // có vé -> đẩy điểm MỌI hồ sơ trên máy lên BXH
    Portal.Auth.init();
  },

  /* Nhãn trạng thái đồng bộ. Trước chỉ có chấm màu 8px không chữ — người chơi phải
     đoán màu nghĩa là gì. Giờ dùng chung cho cả chấm ở thẻ lobby lẫn dòng chữ ở
     màn hồ sơ, nên hai chỗ không bao giờ nói khác nhau. */
  SYNC: {
    pull: ['đang tải…', 'sync'],
    ok:   ['đã lưu đám mây', 'ok'],
    wait: ['chờ mạng', 'wait'],
    err:  ['lỗi đồng bộ', 'err']
  },

  /* Vẽ lại toàn bộ phần danh tính: thẻ ở lobby + khối tài khoản ở màn hồ sơ */
  sync() {
    this.syncChip();
    this.syncCloud();
  },

  /* ---------- thẻ danh tính ở thanh trên lobby ----------
     Một thẻ duy nhất nói cả 3 việc: đang chơi hồ sơ nào, danh hiệu gì, đã sao lưu chưa.
     Trước đây thẻ hồ sơ và nút Google đứng cạnh nhau, hai avatar nghĩa khác nhau
     mà nhìn như nhau. */
  syncChip() {
    const chip = document.getElementById('btnProfile');
    const cur = SC.Profiles.cur();
    if (!chip || !cur) return;

    const u = Portal.Auth.user;
    // Ảnh đang hiện là ẢNH thật -> emoji xuống huy hiệu góc để vẫn biết hồ sơ nào.
    // Chưa đăng nhập -> huy hiệu là chữ G, thành lời mời đăng nhập luôn.
    const hasPhoto = SC.Ava.lobbyHasPhoto(cur);
    const badge = hasPhoto
      ? `<i class="ava-badge">${cur.avatar}</i>`
      : (u ? '' : '<i class="ava-badge g"><svg class="ic" aria-hidden="true"><use href="#i-google"/></svg></i>');

    const [tip, cls] = u ? (this.SYNC[SC.Cloud.state] || ['', '']) : ['', ''];
    const dot = u ? `<i class="sync-dot ${cls}" title="${tip}"></i>` : '';

    /* Lực chiến + đường lên danh hiệu nằm NGAY TRÊN THẺ HỒ SƠ (22/09/2026):
       trước đó "còn X lực chiến lên Y" là dòng hook trôi nổi dưới nút XUẤT KÍCH —
       navigation sức mạnh phải đứng cùng chỗ với danh hiệu nó dẫn tới. */
    const nx = SC.Power.next();
    // ghi hẳn chữ LỰC CHIẾN (22/09): "⚔84" trơ trọi người chơi không biết là số gì
    // Hai dòng NGẮN thay một dòng dài: thẻ ở lobby chỉ rộng ~170px, sau khi nâng cỡ
    // chữ thì "hạng · lực chiến · mốc kế" chung một dòng là vỡ hoặc tràn đè nút ĐỔI.
    // 2 DÒNG (22/09/2026, anh Đức duyệt): dòng 1 tên + danh hiệu, dòng 2 POWER (+ mốc kế,
    // cắt "…" nếu hẹp). Bản 3 dòng trước đẩy danh hiệu xuống đáy, đọc lệch thứ bậc.
    const P = SC.Power, pw = P.fmt(P.show());
    const moc = nx ? ` · +${P.fmt(nx.need)}→${SC.Rank.esc(nx.name)}` : '';

    chip.innerHTML =
      `<span class="ava-wrap">${SC.Ava.ofLobby(cur)}${badge}</span>` +
      `<span class="prof-txt"><span class="prof-l1"><b>${SC.Rank.esc(cur.name)}</b>` +
      `<em class="prof-title">${P.rank()}</em></span>` +
      `<i class="prof-rank">${dot}POWER ${pw}<em class="pw-next">${moc}</em></i></span><em>ĐỔI</em>`;
    chip.title = `${cur.name} · ${P.rank()} · lực chiến ${pw}`
      + (nx ? ` · còn ${P.fmt(nx.need)} nữa lên ${nx.name}` : '') + (u ? ` · ${tip}` : '');
  },

  /* ---------- khối tài khoản ở màn hồ sơ ---------- */
  syncCloud() {
    const id = s => document.getElementById(s);
    const out = id('cloudOut'), user = id('authUser'), login = id('btnLogin');
    if (!out || !user || !login) return;

    const u = Portal.Auth.user, busy = Portal.Auth.busy;
    out.classList.toggle('hidden', !!u);
    user.classList.toggle('hidden', !u);
    login.disabled = busy;
    const lb = login.querySelector('span');
    if (lb) lb.textContent = busy ? 'ĐANG XỬ LÝ…' : 'ĐĂNG NHẬP GOOGLE';
    if (!u) return;

    id('authName').textContent = u.name;
    // Ảnh tài khoản hỏng thì ngã về chữ cái đầu của tên, không phải con gà mặc định —
    // đây là ô của TÀI KHOẢN, không phải của hồ sơ chơi.
    const chu = SC.Rank.esc((u.name || '?').trim().charAt(0).toUpperCase());
    id('authAvatar').innerHTML = SC.Ava.html(chu, SC.Ava.hi(u.avatar), 'big letter');

    const [tip, cls] = this.SYNC[SC.Cloud.state] || ['', ''];
    id('syncDot').className = 'sync-dot ' + cls;
    id('syncTxt').textContent = tip;

    const cur = SC.Profiles.cur();
    id('cloudScope').textContent = cur ? cur.name : '—';

    this.syncHoSo();

    // Nút bật/tắt dùng ảnh Google cho hồ sơ đang mở.
    // Bản zingplay.dev ẨN HẲN: đăng nhập M365 ẩn danh không có ảnh Google — nút
    // legacy đứng đó mãi ở trạng thái xám là mời người ta bấm vào một thứ vô dụng.
    // Đổi mặt trên bản đó dùng khu ẢNH ĐẠI DIỆN (ui-profile-panel.js, #avaSet).
    const btn = id('btnUsePhoto');
    if (btn) {
      const legacy = SC.M365 && SC.M365.active();
      btn.classList.toggle('hidden', legacy);
      const on = !!(cur && cur.photo);
      btn.classList.toggle('off', !on);
      id('usePhotoLb').textContent = on ? 'ĐANG DÙNG ẢNH GOOGLE' : 'DÙNG ẢNH GOOGLE CHO HỒ SƠ NÀY';
      btn.disabled = !u.avatar;
    }
  },

  /* Đường sang trang hồ sơ chung — nơi xem thành tích cả cổng game.
     Chèn một lần rồi thôi; tự ẩn khi không có portal (chạy ở gốc localhost, mở bằng
     file://) vì lúc đó liên kết sẽ dẫn tới trang 404. */
  syncHoSo() {
    if (document.getElementById('linkHoSo')) return;
    const duong = Portal.duongDanHoSo && Portal.duongDanHoSo();
    if (!duong) return;
    const khoi = document.getElementById('authUser');
    if (!khoi) return;

    const a = document.createElement('a');
    a.id = 'linkHoSo';
    a.className = 'link-hoso';
    a.href = duong;
    a.textContent = 'XEM HỒ SƠ CẢ CỔNG GAME →';
    khoi.appendChild(a);
  },

  /* Bật/tắt ảnh Google cho hồ sơ đang mở. Lưu hẳn URL vào hồ sơ nên đăng xuất rồi
     vẫn giữ được ảnh, và mỗi hồ sơ trên máy có ảnh riêng của nó. */
  togglePhoto() {
    const cur = SC.Profiles.cur(), u = Portal.Auth.user;
    if (!cur || !u || !u.avatar) return;
    SC.Profiles.setPhoto(cur.photo ? '' : u.avatar);
    this.sync();
    if (SC.ProfileUI && document.getElementById('profList')) SC.ProfileUI.build();
    SC.UI.toast(cur.photo ? 'ĐÃ DÙNG ẢNH GOOGLE' : 'ĐÃ VỀ ẢNH MẶC ĐỊNH');
  },

  /* ---------- hộp thoại: giữ bản nào ---------- *
     Chỉ hiện khi tiến độ trên mây NHIỀU HƠN trong máy. Không bao giờ tự quyết. */
  askMerge(local, cloud) {
    const id = s => document.getElementById(s);
    const sum = p => Object.values(p.stars || {}).reduce((a, b) => a + b, 0);
    const line = p => `${SC.Endless.label(p.unlocked || 1)} · ★${sum(p)} · ◈${p.coin || 0}`;

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
    { k: 'level', label: 'MÀN CAO NHẤT', val: r => SC.Rank.lv(r.highestLevel || 1) },
    { k: 'time',  label: 'TỐC ĐỘ',       val: r => SC.Rank.time(r.bestTime) },
    { k: 'stars', label: 'TỔNG SAO',     val: r => '★ ' + (r.totalStars || 0) }
  ],

  /* Ba tab đo ba thứ khác nhau, và ranh giới giữa chúng cần nói rõ — nếu không
     người chơi sẽ tưởng tab Tốc độ cũng tính cả vòng vô tận rồi thấy số của mình
     đứng im mãi mà không hiểu vì sao. */
  TIP: {
    level: () => 'Tính cả vòng vô tận — qua màn ' + SC.TOTAL_LEVELS + ' là bắt đầu tính vòng.',
    time: () => `Tổng thời gian nhanh nhất của ${SC.TOTAL_LEVELS} màn chiến dịch. `
      + 'Phải qua đủ cả chiến dịch mới lên bảng; vòng vô tận không tính vào đây.',
    stars: () => 'Tính cả sao kiếm được ở vòng vô tận.'
  },

  /* Nhãn màn cho bảng: trong chiến dịch thì "Màn 42", sang vòng vô tận thì
     "Vòng 2 · Màn 5" — con số tuyệt đối vẫn là thứ dùng để xếp hạng. */
  lv(n) {
    return SC.Endless && SC.Endless.active(n)
      ? `Vòng ${SC.Endless.cycle(n) + 1} · ${SC.Endless.baseId(n)}`
      : 'Màn ' + n;
  },

  /* Lấy số màn từ dữ liệu, đừng chép cứng — đổi levelsPerBiome trong Excel là
     câu này sai ngay, mà nó lại là câu người chơi đọc nhiều nhất ở tab Tốc độ. */
  EMPTY: {
    level: () => 'Chưa có ai trên bảng',
    time: () => `Chưa ai đi hết ${SC.TOTAL_LEVELS} màn`,
    stars: () => 'Chưa có ai trên bảng'
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
        // thời gian chiến dịch chỉ tính khi hồ sơ đó đã đi hết mọi màn
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

  /* Vẽ NGAY bảng nội bộ rồi mới đi hỏi máy chủ, có kết quả thì thay vào.
     Bản trước hiện "Đang tải…" và ngồi chờ — mà lần hỏi đầu phải nạp SDK rồi mở
     kết nối tới Firestore, mất vài giây; gặp mạng chặn kênh streaming thì đứng
     im vĩnh viễn. Cho xem bảng của máy trước thì màn hình không bao giờ trống. */
  async load() {
    const tab = this.tab;

    // Firestore chưa tạo -> khỏi gọi cho tốn 8 giây chờ hạn giờ
    const chặn = SC.Cloud.blocked;
    this.render(this.localRows(), true, chặn ? 'Máy chủ chưa sẵn sàng' : '',
      Portal.FB.configured() && !chặn);
    if (!Portal.FB.configured() || chặn) return;

    try {
      const rows = await SC.Cloud.rank(tab);
      if (tab !== this.tab) return;                 // người chơi đã đổi tab
      this.render(rows);
    } catch (e) {
      if (tab === this.tab) this.render(this.localRows(), true, Portal.FB.err(e));
    }
  },

  render(rows, isLocal, err, busy) {
    const wrap = document.getElementById('rankList');
    const t = this.TABS.find(x => x.k === this.tab);
    const me = Portal.Auth.user;

    // Chú thích của tab luôn hiện, kể cả khi bảng trống — đó là lúc người chơi
    // thắc mắc "sao mình không có tên" nhiều nhất.
    const tip = `<p class="rank-tip">${this.TIP[this.tab]()}</p>`;
    const banner = tip + (isLocal
      ? `<p class="rank-note small">${err ? this.esc(err) + ' — ' : ''}Bảng của máy này (3 hồ sơ).${
          busy ? ' <i class="rank-busy">đang tải bảng toàn cầu…</i>'
               : ' Đăng nhập để đua toàn cầu.'}</p>`
      : '');

    if (!rows.length) {
      wrap.innerHTML = banner + `<p class="rank-note">${this.EMPTY[this.tab]()}</p>`;
    } else {
      // Top 3 đeo medal AI (đợt 2) thay số; hỏng ảnh thì onerror trả lại con số —
      // cùng chiến thuật fallback với icon cây kỹ năng (ui-tree.js).
      wrap.innerHTML = banner + rows.map(r => `
        <div class="rank-row${r.me || (me && r.uid === SC.Cloud.scoreId(me.uid)) ? ' me' : ''}">
          <span class="rank-pos${r.pos <= 3 ? ' top' : ''}">${r.pos <= 3
            ? `<img src="assets/art-game/ui-badge-medal-${r.pos}.webp" alt="${r.pos}" onerror="if(this.r)this.replaceWith('${r.pos}');else{this.r=1;this.src=this.src}">`
            : r.pos}</span>
          ${r.emoji ? `<span class="rank-av emo">${r.emoji}</span>`
            : /^https?:/.test(r.avatar || '') ? `<img class="rank-av" src="${this.esc(r.avatar)}" alt="">`
            : r.avatar ? `<span class="rank-av emo">${this.esc(r.avatar)}</span>`
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
    } else if (rows.some(r => r.uid === me.uid
        // Dòng của mình có thể đã bị khử-trùng-lặp M365 (uid khác máy nhưng cùng
        // người) — email trùng với dòng đang hiện nghĩa là MÌNH ĐANG TRÊN BẢNG,
        // đừng hiện thêm footer "ngoài bảng" với con số tệ hơn.
        || (SC.M365 && SC.M365.info && SC.M365.info.email && r.m365Email
            && r.m365Email.toLowerCase() === SC.M365.info.email.toLowerCase()))) {
      foot.className = 'rank-me hidden';
    } else {
      const s = SC.Cloud.stats();
      const mine = { highestLevel: s.highestLevel, totalStars: s.totalStars, bestTime: s.campaignTime };
      foot.className = 'rank-me';
      // tên phi công của hồ sơ đang chơi, khớp với tên sẽ hiện trên bảng
      foot.innerHTML = `<span class="rank-pos">—</span>
        <span class="rank-name">${this.esc(SC.Cloud.playerName())} (bạn)</span>
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
/* ui-map-select.js — bản đồ hành trình (saga): 10 vùng, mỗi vùng 6 chặng
 *
 * Các chặng nằm zigzag theo hình sin và được nối bằng một đường SVG, thay cho
 * lưới ô vuông cũ. Mỗi vùng là một khối riêng, đầu và cuối khối cùng toạ độ x
 * nên nhìn liền mạch như một con đường chạy suốt. */

SC.MapSelect = {
  NODE_GAP: 108,      // khoảng cách dọc giữa hai chặng (đơn vị ảo)
  AMP: 150,           // biên độ zigzag
  TOP: 62,            // chừa lề trên để nút không nhô ra khỏi dải nền của vùng
  peek: {},           // vùng khoá nào người chơi đã tự bung ra xem trước

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

    // bản đồ chỉ vẽ 60 chặng chiến dịch nên đếm sao theo đúng phạm vi đó
    ui.el.totalStars.textContent = ui.campaignStar();
    const mx = document.getElementById('maxStars');
    if (mx) mx.textContent = SC.TOTAL_STARS;

    SC.MapJump.build(ui);
    // Phải chạy SAU khi đã dựng xong mọi vùng: offsetTop của một chặng phụ thuộc
    // chiều cao các vùng phía trên, mà vùng khoá giờ có thể đang gập lại.
    this.scrollToCurrent(wrap);
  },

  /* Bản đồ 60 chặng dài hơn chục màn hình, nên mở ra là nhảy thẳng tới
     chặng đang chơi dở thay vì bắt cuộn từ đầu. */
  scrollToCurrent(wrap) {
    // Hết chiến dịch (kể cả đã sang vòng vô tận) thì không còn chặng .next nào.
    // Khi đó phải rơi về chặng đã qua CUỐI CÙNG — bản cũ lấy [0] tức chặng ĐẦU,
    // nên người đi hết 60 màn mở bản đồ ra lại bị ném về map 1.
    const done = wrap.querySelectorAll('.saga-node.done:not(.lock)');
    const node = wrap.querySelector('.saga-node.next')
      || done[done.length - 1]
      || wrap.querySelector('.saga-node');
    if (!node) return;
    wrap.scrollTop = Math.max(0, this.topIn(node, wrap) - wrap.clientHeight / 2);
  },

  /* Khoảng cách từ đỉnh KHUNG CUỘN tới một phần tử.
     Bản cũ cộng tay đúng hai tầng (`node.offsetTop + parent.offsetTop`), tức ngầm
     giả định .saga-path neo thẳng vào khung cuộn. Giả định đó sai: .map-scroll vốn
     không có position nên offsetParent nhảy lên tận .layer, và phép cộng ăn thêm cả
     chiều cao thanh đầu màn — thêm dải chip nhảy vùng nữa là lệch ~110px.
     Đã đặt .map-scroll thành position:relative; vòng lặp này là lớp chặn thứ hai,
     bám đúng chuỗi offsetParent và dừng ngay khi ra khỏi khung cuộn. */
  topIn(el, wrap) {
    let y = 0;
    for (let n = el; n && n !== wrap && wrap.contains(n); n = n.offsetParent) y += n.offsetTop;
    return y;
  },

  /* Toạ độ x của chặng thứ k trong vùng (0..per-1).
     Chu kỳ 4 chặng: giữa -> phải -> giữa -> trái, nên đường đi luôn quét trọn bề
     ngang bất kể vùng dài mấy chặng. Bản cũ dùng sin(k*0.72) tính cho vùng 10 chặng;
     từ khi vùng rút còn 6 chặng nó chỉ đi hết hơn nửa chu kỳ, dồn cả 6 nút về nửa
     phải và bỏ trống hẳn một phần ba bên trái. */
  _x(k) {
    return 270 + Math.sin(k * Math.PI / 2) * this.AMP;
  },

  _region(ui, biome, bi, levels) {
    const per = levels.length;
    const max = per * 3;
    const stars = levels.reduce((s, lv) => s + (ui.progress.stars[lv.id] || 0), 0);
    const open = levels.some(lv => lv.id <= ui.progress.unlocked);
    const perfect = open && stars >= max;
    // Vùng đang chơi dở = vùng chứa chặng kế tiếp.
    // Phải KẸP về trong phạm vi chiến dịch: sang vòng vô tận thì progress.unlocked
    // vượt quá TOTAL_LEVELS (system-endless.js:36), không kẹp thì không vùng nào
    // khớp và viền sáng "đang chơi" im lặng biến mất đúng với người đã đi hết game.
    const here = Math.min(SC.TOTAL_LEVELS, ui.progress.unlocked);
    const current = levels.some(lv => lv.id === here);
    // Vùng chưa mở thì GẬP lại, trừ khi người chơi tự bung ra xem trước.
    // Trước đây mỗi vùng khoá vẫn chiếm ~794px cuộn chỉ để bày 6 ổ khoá giống hệt nhau.
    const collapsed = !open && !this.peek[bi];

    const box = document.createElement('div');
    box.className = 'saga-region' + (collapsed ? ' collapsed' : '')
      + (perfect ? ' perfect' : '') + (current ? ' current' : '');
    box.style.setProperty('--tint', `hsl(${biome.hue},70%,60%)`);
    // nền lấy đúng bảng màu trời của vùng, cuộn qua là thấy đổi cảnh
    box.style.setProperty('--sky0', biome.sky[0]);
    box.style.setProperty('--sky1', biome.sky[1]);
    box.style.setProperty('--sky2', biome.sky[2]);
    // banner AI làm cảnh nền vùng; file thiếu thì CSS chỉ còn lớp gradient trời cũ.
    // BẪY ĐÃ GẶP: url() tương đối trong custom property bị Chrome resolve theo chỗ
    // var() được TIÊU THỤ (css/style.css) -> thành css/assets/... 404 im lặng.
    // Phải đưa URL tuyệt đối dựng từ baseURI của trang.
    const bimg = new URL(`assets/art-game/ui-banner-${biome.id}.webp`, document.baseURI).href;
    box.style.setProperty('--bimg', `url('${bimg}')`);

    // Vùng khoá: tiêu đề thành nút bấm để bung/gập xem trước — thấy trước con trùm
    // sắp phải đánh là một lý do để đi tiếp.
    const head = document.createElement(open ? 'div' : 'button');
    head.className = 'saga-head' + (open ? '' : ' lock');
    head.dataset.bi = bi;
    head.innerHTML = `<b>${biome.name}</b>
      <span>${this._headTag(open, perfect, stars, max)}</span>`;
    if (!open) {
      head.type = 'button';
      head.onclick = () => {
        SC.Audio.click();
        this.peek[bi] = !this.peek[bi];
        box.classList.toggle('collapsed', !this.peek[bi]);
      };
    }
    box.appendChild(head);

    const path = document.createElement('div');
    path.className = 'saga-path';
    path.style.height = (per * this.NODE_GAP + this.TOP + 34) + 'px';
    path.appendChild(this._trail(per));
    levels.forEach((lv, k) => path.appendChild(this._node(ui, lv, k)));
    box.appendChild(path);
    return box;
  },

  /* Nhãn bên phải tiêu đề vùng — mỗi trạng thái một câu, không dùng chung phân số */
  _headTag(open, perfect, stars, max) {
    if (!open) return '<svg class="ic" aria-hidden="true"><use href="#i-lock"/></svg> CHƯA MỞ';
    if (perfect) return '<svg class="ic" aria-hidden="true"><use href="#i-check"/></svg> HOÀN HẢO';
    // chỉ nhắc "còn N" khi đã bắt đầu cày vùng này; vùng chưa đụng tới thì 0/18 là đủ
    const left = max - stars;
    return `★ ${stars}/${max}` + (stars > 0 ? ` · còn ${left}` : '');
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

    /* Sao dựng bằng 3 pip, KHÔNG dùng glyph ★/☆ nữa.
       Bản cũ ghép '★'.repeat(st) + '☆'.repeat(3-st) rồi tô CẢ HAI bằng --acc ở cỡ 9px
       — ở kích thước đó sao rỗng và sao đầy nhìn y hệt nhau, nên chặng chưa chơi hiện
       ra như đã ăn đủ 3 sao, ngược hẳn với con số ở tiêu đề vùng. */
    const pips = [0, 1, 2].map(i => `<i class="${i < st ? 'on' : ''}"></i>`).join('');

    // Số MÀN thật (37, 38… 42), không phải số thứ tự trong vùng: lobby, briefing, bảng
    // kết quả đều gọi "MÀN 42" — bản đồ ghi "6" là người chơi không dò ra được (22/09)
    el.innerHTML = `
      <span class="sn-num">${locked
        ? '<svg class="ic" aria-hidden="true"><use href="#i-lock"/></svg>' : lv.id}</span>
      ${lv.boss ? `<span class="sn-tag">${lv.finalBoss ? 'TRÙM' : 'ELITE'}</span>` : ''}
      ${locked ? '' : `<span class="sn-star">${pips}</span>`}`;

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
    const lv = SC.levelAt(id);
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
/* ===== js/ui-tree.js ===== */
/* ui-tree.js — màn cây kỹ năng: 4 thẻ nhánh, thẻ biến thể, thanh tiến hoá
 *
 * Bản cũ là danh sách dọc 7 dòng, mỗi dòng một nút mua — hình thức đó không diễn tả
 * được cây, và quan trọng hơn là không diễn tả được "chọn cái này là mất cái kia".
 *
 * Ba thứ màn này phải nói rõ, nếu thiếu một thì lựa chọn loại trừ mất hết sức nặng:
 *   1. đang ở đâu trên cây — nhánh nào tới cấp mấy, còn bao xa tới mốc tiến hoá
 *   2. chọn xong được gì mất gì — hộp thoại rẽ nhánh lo phần này (ui-tree-fork.js)
 *   3. tổ hợp hiện tại đang là biến thể nào
 */

SC.TreeUI = {
  init(on) {
    on('btnShop', () => this.open());
    on('btnShop2', () => this.open());
    on('btnResShop', () => { SC.Game.quitToMenu(); this.open(); });
    on('btnTreeBack', () => { SC.UI.show('menu'); SC.UI.syncMenu(); });
    SC.Fork.init(on);
  },

  open() {
    SC.UI.show('tree');
    this.build();
    // Còn nhánh đang chờ chọn hướng thì bật hộp thoại ngay, không cho làm gì khác.
    const k = SC.Tree.pendingFork();
    if (k) SC.Fork.open(k);
  },

  num(n) { return n.toLocaleString('vi-VN'); },

  /* Icon nhánh: ảnh AI theo hướng đã rẽ (wpn-a, wpn-b...), chưa rẽ dùng icon gốc.
     Ảnh lỗi/chưa deploy thì rơi về glyph chữ cũ — không bao giờ ô icon trống. */
  _icon(key, path, glyph) {
    const f = 'assets/art-game/ui-icon-' + key + (path ? '-' + path.toLowerCase() : '') + '.webp';
    return `<div class="shop-ic"><img src="${f}" alt="" loading="lazy"
      onerror="this.parentNode.textContent='${glyph}'"></div>`;
  },

  build() {
    const wrap = document.getElementById('treeList');
    if (!wrap) return;
    wrap.innerHTML = this._variantCard();
    for (const k of SC.TREE_KEYS) wrap.appendChild(this._branch(k));
    wrap.appendChild(this._gold());
    const evo = SC.GarageUI.treeCard();          // mục TIẾN HÓA (chỉ kênh zingplay)
    if (evo) wrap.appendChild(evo);
    wrap.appendChild(this._rebuild());

    document.getElementById('treeCoin').textContent = this.num(SC.UI.progress.coin);
    const pw = document.getElementById('treePower');
    if (pw) {
      pw.querySelector('b').textContent = SC.Power.fmt(SC.Power.show());
      pw.title = 'Lực chiến — ' + SC.Power.rank();
    }
  },

  /* Thẻ trên cùng: biến thể đang chạy + còn mấy nhánh nữa tới mốc tiến hoá */
  _variantCard() {
    const v = SC.Variant.def();
    const ev = SC.Tree.evoProgress();
    const hue = SC.Variant.hue();
    const bar = ev
      ? `<div class="tree-evo"><span>Tiến hoá ${ev.evo}: ${ev.done}/4 nhánh đạt cấp ${ev.need}</span>
         <i><b style="width:${ev.done / 4 * 100}%"></b></i></div>`
      : '<div class="tree-evo done"><span>ĐÃ ĐẠT DẠNG CUỐI</span></div>';

    return `<div class="tree-variant" style="--vh:${hue}">
      <div class="tv-name">${v ? SC.Rank.esc(v.name) : 'CHƯA THÀNH HÌNH'}</div>
      <div class="tv-tag">${v ? SC.Rank.esc(v.tag) : 'Chọn hướng cho cả ba nhánh để lộ biến thể'}</div>
      ${bar}
    </div>`;
  },

  /* ---------- một thẻ nhánh ---------- */
  _branch(key) {
    const d = SC.TREE[key];
    const lv = SC.Tree.lv(key), path = SC.Tree.path(key);
    const p = path ? d.paths[path] : null;
    const cost = SC.Tree.cost(key);
    const afford = SC.Tree.canBuy(key);
    const needFork = SC.Tree.needsFork(key);
    const beyond = SC.Tree.beyond(key);       // đã vượt bảng giá -> cấp vô hạn

    const row = document.createElement('div');
    row.className = 'tree-row' + (beyond ? ' beyond' : '');
    if (p) row.style.setProperty('--vh', p.color);

    // Mô tả: mốc ĐANG có. Vượt bảng thì nói rõ nó vẫn cộng đúng như bước cuối cùng,
    // nếu không người chơi sẽ tưởng mua tiếp là ném vàng đi.
    const tiers = p ? p.tiers : d.paths.A.tiers;
    const desc = lv < 1 ? d.short
      : needFork ? 'Đang chờ chọn hướng đi'
      : lv <= tiers.length ? tiers[lv - 1]
      : tiers[tiers.length - 1] + ` · cộng thêm ${lv - tiers.length} bậc`;

    row.innerHTML = `
      <div class="tree-top">
        ${this._icon(key, path, d.ic)}
        <div class="shop-mid">
          <div class="tree-name">${d.name}${p ? ` <em>${SC.Rank.esc(p.name)}</em>` : ''}${
            beyond ? ` <i class="tree-lv">Lv ${lv}</i>` : ''}</div>
          ${this._track(key, lv, path)}
          <div class="shop-desc">${SC.Rank.esc(desc)}</div>
          ${needFork ? '' : SC.TreeStats.html(key)}
        </div>
        <button class="shop-buy${needFork ? ' fork' : afford ? '' : ' poor'}">${
          needFork ? 'CHỌN' : '◈ ' + this.num(cost)
        }</button>
      </div>`;

    const btn = row.querySelector('.shop-buy');
    btn.onclick = needFork ? () => SC.Fork.open(key) : () => this.buy(key);

    // Nút "đổi hướng có trả phí" của bản trước đã bỏ: từ khi có XÂY LẠI CẢ CÂY miễn
    // phí (hoàn 100% vàng), trả tiền để đổi một nhánh là trả tiền cho thứ vốn đã
    // miễn phí — một cái bẫy trong giao diện chứ không phải một lựa chọn.
    return row;
  },

  /* Chuỗi mốc: đã mua / chỗ rẽ / mốc tiến hoá / chưa mua.
     Vượt bảng thì thôi vẽ chấm — 30 chấm một hàng thì đếm không nổi mà cũng tràn
     màn hình — chỉ ghi con số cộng thêm. */
  _track(key, lv, path) {
    const max = SC.Tree.max(key);
    let s = '<div class="tree-track">';
    for (let i = 1; i <= max; i++) {
      const cls = [i <= lv ? 'on' : '', i === SC.Tree.FORK_LV ? 'fork' : '',
        i === SC.Tree.EVO1 || i === SC.Tree.EVO2 ? 'evo' : ''].filter(Boolean).join(' ');
      s += `<i class="${cls}"></i>`;
    }
    if (lv > max) s += `<b class="tree-plus">+${lv - max}</b>`;
    return s + '</div>';
  },

  /* Nhánh THU VÀNG đứng ngoài cây — không có hướng để rẽ, không tính vào biến thể */
  _gold() {
    const d = SC.TREE_EXTRA.gold, lv = SC.Tree.goldLv(), cost = SC.Tree.goldCost();
    const row = document.createElement('div');
    row.className = 'tree-row extra' + (cost === null ? ' maxed' : '');
    row.innerHTML = `
      <div class="tree-top">
        ${this._icon('gold', null, d.ic)}
        <div class="shop-mid">
          <div class="tree-name">${d.name}</div>
          <div class="tree-track">${
            Array.from({ length: d.max }, (_, i) => `<i class="${i < lv ? 'on' : ''}"></i>`).join('')
          }</div>
          <div class="shop-desc">${d.desc(lv)}</div>
        </div>
        <button class="shop-buy${cost === null ? ' done' : SC.Tree.canBuyGold() ? '' : ' poor'}">${
          cost === null ? 'TỐI ĐA' : '◈ ' + this.num(cost)
        }</button>
      </div>`;
    if (cost !== null) row.querySelector('.shop-buy').onclick = () => this.buyGold();
    return row;
  },

  /* Xây lại cả cây — CÓ PHÍ lũy tiến (xem system-tree.rebuild). Đặt CUỐI danh sách
     và để chữ mờ: nó là lối thoát khi bí, không phải việc làm mỗi lần vào màn này. */
  _rebuild() {
    const back = SC.Tree.refundAll();
    const el = document.createElement('button');
    el.className = 'tree-rebuild' + (back > 0 ? '' : ' poor');
    const pct = Math.round(SC.Tree.resetFeePct() * 100);
    el.innerHTML = back > 0
      ? `XÂY LẠI CẢ CÂY · PHÍ ◈${this.num(SC.Tree.resetFee())} (${pct}%) <em>hoàn ◈${this.num(back)}</em>`
      : 'XÂY LẠI CẢ CÂY · chưa đầu tư gì';
    if (back > 0) el.onclick = () => SC.Fork.confirmRebuild();
    return el;
  },

  /* ---------- mua ---------- */
  buy(key) {
    if (!SC.Tree.buy(key)) {
      SC.Audio.lose();
      SC.UI.toast(SC.Tree.pendingFork() ? 'CHỌN HƯỚNG TRƯỚC ĐÃ' : 'KHÔNG ĐỦ VÀNG');
      return;
    }
    SC.Audio.power();
    SC.Cloud.markDirty();
    SC.UI.toast('NÂNG CẤP ' + SC.TREE[key].name);
    this.build();
    SC.UI.syncMenu();
    // vừa chạm cấp rẽ -> bật hộp thoại ngay, đừng để người chơi phải tự tìm
    if (SC.Tree.needsFork(key)) return SC.Fork.open(key);

    // Vừa chạm mốc tiến hoá -> diễn NGAY tại đây. Trước đây chỉ xếp hàng chờ tới lần
    // vào màn kế tiếp, mà người chơi thì đang đứng ở đúng màn hình vừa tiêu vàng —
    // họ bấm mua, thấy đủ 4 nhánh, rồi chẳng có gì xảy ra cả.
    const evo = SC.Variant.check();
    if (evo) SC.Evolution.open(evo);
  },

  buyGold() {
    if (!SC.Tree.buyGold()) { SC.Audio.lose(); SC.UI.toast('KHÔNG ĐỦ VÀNG'); return; }
    SC.Audio.power();
    SC.Cloud.markDirty();
    SC.UI.toast('NÂNG CẤP THU VÀNG');
    this.build();
    SC.UI.syncMenu();
  }
};

;
/* ===== js/ui-tree-fork.js ===== */
/* ui-tree-fork.js — hộp thoại rẽ nhánh: hai hướng, mạnh/yếu, xác nhận hai lần
 *
 * Đây là chỗ toàn bộ ý tưởng roguelike đứng hay đổ. Nếu người chơi bấm bừa vì không
 * hiểu mình đang đánh đổi cái gì thì lựa chọn loại trừ chỉ còn là phiền phức.
 *
 * Vì vậy mỗi thẻ nêu ĐÚNG MỘT điểm mạnh và ĐÚNG MỘT điểm yếu — điểm yếu là thứ làm
 * cho lựa chọn có thật. Và chốt xong còn bắt xác nhận lần hai, nói thẳng hướng kia
 * sẽ bị khoá với hồ sơ này.
 */

SC.Fork = {
  key: null, pick: null,

  init(on) {
    on('btnForkBack', () => this.close());
  },

  close() {
    SC.UI.hideOverlay('fork');
    this.key = null; this.pick = null;
  },

  /* ---------- chọn hướng ---------- */
  open(key) {
    this.key = key; this.pick = null;
    const d = SC.TREE[key];
    document.getElementById('forkTitle').textContent = d.name + ' — CHỌN HƯỚNG';
    document.getElementById('forkWarn').textContent =
      'Chọn xong KHÔNG đổi lại được miễn phí';

    const box = document.getElementById('forkOpts');
    box.innerHTML = '';
    for (const p of ['A', 'B']) box.appendChild(this._card(key, p));
    SC.UI.showOverlay('fork');
  },

  _card(key, p) {
    const o = SC.TREE[key].paths[p];
    const el = document.createElement('button');
    el.className = 'fork-opt';
    el.style.setProperty('--vh', o.color);
    el.innerHTML = `
      <b>${SC.Rank.esc(o.name)}</b>
      <span class="fk-good">✔ ${SC.Rank.esc(o.good)}</span>
      <span class="fk-bad">✘ ${SC.Rank.esc(o.bad)}</span>`;
    el.onclick = () => { SC.Audio.click(); this.confirm(key, p); };
    return el;
  },

  /* ---------- xác nhận lần hai ---------- */
  confirm(key, p) {
    const d = SC.TREE[key];
    const other = d.paths[p === 'A' ? 'B' : 'A'];
    document.getElementById('forkTitle').textContent = 'CHỐT HƯỚNG?';
    document.getElementById('forkWarn').innerHTML =
      `Chốt <b>${SC.Rank.esc(d.paths[p].name)}</b> cho nhánh ${SC.Rank.esc(d.name)}.<br>`
      + `Hướng <b>${SC.Rank.esc(other.name)}</b> sẽ khoá với hồ sơ này.`;

    const box = document.getElementById('forkOpts');
    box.innerHTML = '';
    const yes = document.createElement('button');
    yes.className = 'fork-opt yes';
    yes.style.setProperty('--vh', d.paths[p].color);
    yes.innerHTML = `<b>CHỐT ${SC.Rank.esc(d.paths[p].name)}</b>`;
    yes.onclick = () => this.apply(key, p);

    const no = document.createElement('button');
    no.className = 'fork-opt no';
    no.innerHTML = '<b>XEM LẠI</b>';
    no.onclick = () => { SC.Audio.click(); this.open(key); };

    box.appendChild(yes); box.appendChild(no);
  },

  apply(key, p) {
    if (!SC.Tree.fork(key, p)) { SC.Audio.lose(); return; }
    SC.Audio.power();
    SC.Cloud.markDirty();
    this.close();
    SC.TreeUI.build();
    SC.UI.syncMenu();
    SC.UI.toast(SC.TREE[key].name + ' → ' + SC.TREE[key].paths[p].name, true);
  },

  /* ---------- đổi hướng có trả giá ---------- */
  confirmReroll(key) {
    const d = SC.TREE[key], cost = SC.Tree.rerollCost(key);
    if (!SC.Tree.canReroll(key)) {
      SC.Audio.lose();
      SC.UI.toast('CẦN ◈ ' + SC.TreeUI.num(cost) + ' ĐỂ ĐỔI HƯỚNG');
      return;
    }
    this.key = key;
    document.getElementById('forkTitle').textContent = 'ĐỔI HƯỚNG?';
    document.getElementById('forkWarn').innerHTML =
      `Nhánh <b>${SC.Rank.esc(d.name)}</b> sẽ về <b>cấp 1</b> và mất hướng đang đi.<br>`
      + `Tốn <b>◈ ${SC.TreeUI.num(cost)}</b> — gấp 3 số vàng đã đầu tư.`;

    const box = document.getElementById('forkOpts');
    box.innerHTML = '';
    const yes = document.createElement('button');
    yes.className = 'fork-opt yes danger';
    yes.innerHTML = `<b>ĐỔI · ◈ ${SC.TreeUI.num(cost)}</b>`;
    yes.onclick = () => this.applyReroll(key);

    const no = document.createElement('button');
    no.className = 'fork-opt no';
    no.innerHTML = '<b>THÔI</b>';
    no.onclick = () => { SC.Audio.click(); this.close(); };

    box.appendChild(yes); box.appendChild(no);
    SC.UI.showOverlay('fork');
  },

  /* ---------- xây lại cả cây (phí lũy tiến — xem system-tree.rebuild) ---------- */
  confirmRebuild() {
    const back = SC.Tree.refundAll();
    const fee = SC.Tree.resetFee();
    const pct = Math.round(SC.Tree.resetFeePct() * 100);
    this.key = null;
    document.getElementById('forkTitle').textContent = 'XÂY LẠI CẢ CÂY?';
    document.getElementById('forkWarn').innerHTML =
      `Hoàn lại <b>◈ ${SC.TreeUI.num(back)}</b> vàng đã đầu tư, `
      + `trừ phí xây lại <b>◈ ${SC.TreeUI.num(fee)}</b> (${pct}% tổng vàng).<br>`
      + 'Phí tăng +2% sau mỗi lần xây lại, trần 30%. '
      + 'Cả bốn nhánh về 0, chọn lại hướng từ đầu. Sao và tiến độ map giữ nguyên.';

    const box = document.getElementById('forkOpts');
    box.innerHTML = '';
    const yes = document.createElement('button');
    yes.className = 'fork-opt yes';
    yes.innerHTML = '<b>XÂY LẠI</b>';
    yes.onclick = () => {
      const r = SC.Tree.rebuild();
      SC.Audio.power();
      SC.Cloud.markDirty();
      this.close();
      SC.TreeUI.build();
      SC.UI.syncMenu();
      SC.UI.toast(`ĐÃ HOÀN ◈${SC.TreeUI.num(r.back)} · PHÍ ◈${SC.TreeUI.num(r.fee)} — CHỌN LẠI HƯỚNG ĐI`, true);
    };

    const no = document.createElement('button');
    no.className = 'fork-opt no';
    no.innerHTML = '<b>THÔI</b>';
    no.onclick = () => { SC.Audio.click(); this.close(); };

    box.appendChild(yes); box.appendChild(no);
    SC.UI.showOverlay('fork');
  },

  applyReroll(key) {
    if (!SC.Tree.reroll(key)) { SC.Audio.lose(); return; }
    SC.Audio.power();
    SC.Cloud.markDirty();
    this.close();
    SC.TreeUI.build();
    SC.UI.syncMenu();
    SC.UI.toast('ĐÃ XOÁ HƯỚNG ' + SC.TREE[key].name);
    // về cấp 1 nên chưa cần chọn lại ngay; mua lên cấp 2 hộp thoại sẽ tự bật
  }
};

;
/* ===== js/system-mastery.js ===== */
/* system-mastery.js — ghi chỉ số tay nghề theo từng biến thể
 *
 * Bốn chỉ số này CỐ Ý KHÔNG cho phần thưởng sức mạnh nào. Thưởng sức mạnh cho việc
 * chơi giỏi là làm người yếu càng yếu — vòng xoáy đó giết chết game nhanh hơn cả
 * việc mất cân bằng. Chúng chỉ để khoe và để tự so với chính mình.
 *
 * Lưu theo TÀI KHOẢN chứ không theo lượt chơi: khám phá là thành tựu của người chơi.
 */

SC.Mastery = {
  /* Bản ghi của một biến thể; tạo khi lần đầu chạm tới */
  rec(key) {
    const c = SC.Variant.seen();
    if (!c[key]) c[key] = { runs: 0, best: 0, graze: 0, clean: 0, combo: 0, maps: 0 };
    return c[key];
  },

  /* Gọi khi hoàn thành một màn. r = kết quả từ SC.Game.finish() */
  record(win, r) {
    const key = SC.Tree.variant();
    if (!key || SC.Tree.evo() < 1) return;      // chưa thành hình thì chưa tính
    const m = this.rec(key);
    m.maps = (m.maps | 0) + 1;
    m.graze = Math.max(m.graze | 0, SC.Bank.grazed | 0);
    m.combo = Math.max(m.combo | 0, r.maxCombo || 0);
    if (win) {
      if (!m.best || r.time < m.best) m.best = r.time;
      if (SC.Game.player.damaged === 0) m.clean = (m.clean | 0) + 1;
    }
    SC.UI.save();
  },

  /* Bốn dòng hiện trong sổ tay */
  lines(key) {
    const m = SC.Variant.seen()[key];
    if (!m) return [];
    return [
      ['Số màn đã chơi', m.maps | 0],
      ['Màn nhanh nhất', m.best ? m.best + 's' : '—'],
      ['Màn không trúng đòn', m.clean | 0],
      ['Chuỗi combo cao nhất', m.combo | 0],
      ['Pha lách nhiều nhất', m.graze | 0]
    ];
  }
};

;
/* ===== js/ui-codex.js ===== */
/* ui-codex.js — sổ tay 8 biến thể, hé lộ dần
 *
 * Đây là màn hình khiến người chơi MUỐN mở hồ sơ mới. Ô chưa mở không để trống trơn
 * mà hé lộ 2 trong 3 mảnh của tổ hợp — đủ để đoán ra mình cần đổi nhánh nào, mà vẫn
 * còn cảm giác khám phá. Hé hết thì hết khám phá, giấu hết thì bế tắc.
 *
 * Ô đã mở xem được đầy đủ, kể cả ĐIỂM YẾU — nói thẳng điểm yếu mới là thứ giúp
 * người chơi hiểu vì sao build của mình vất vả ở một số map.
 */

SC.Codex = {
  init(on) {
    on('btnCodex', () => { SC.UI.show('codex'); this.build(); });
    on('btnCodexBack', () => { SC.UI.show('menu'); SC.UI.syncMenu(); });
  },

  build() {
    const wrap = document.getElementById('codexList');
    if (!wrap) return;
    const seen = SC.Variant.seen();
    const cur = SC.Tree.variant();
    const keys = Object.keys(SC.VARIANTS);

    document.getElementById('codexCount').textContent =
      keys.filter(k => seen[k]).length + '/' + keys.length;

    wrap.innerHTML = '';
    keys.forEach((k, i) => wrap.appendChild(seen[k] ? this._open(k, cur) : this._locked(k, i)));
  },

  _open(k, cur) {
    const v = SC.VARIANTS[k];
    const el = document.createElement('div');
    el.className = 'codex-card' + (k === cur ? ' cur' : '');
    el.style.setProperty('--vh', v.hue);
    el.innerHTML = `
      <div class="cx-head"><b>${SC.Rank.esc(v.name)}</b>${k === cur ? '<em>ĐANG DÙNG</em>' : ''}</div>
      <div class="cx-tag">${SC.Rank.esc(v.tag)}</div>
      <div class="cx-good">✔ ${SC.Rank.esc(v.good)}</div>
      <div class="cx-bad">✘ ${SC.Rank.esc(v.bad)}</div>
      <ul class="cx-stats">${
        SC.Mastery.lines(k).map(([n, val]) => `<li><span>${n}</span><b>${val}</b></li>`).join('')
      }</ul>`;
    return el;
  },

  /* Ô khoá: hé đúng 2 trong 3 mảnh, mảnh thứ ba để dấu hỏi */
  _locked(k, i) {
    const el = document.createElement('div');
    el.className = 'codex-card locked';
    // Giấu mảnh nào thì xoay theo VỊ TRÍ trong lưới, không theo mã của khoá: thử băm
    // từ khoá thì hai ô cạnh nhau ra cùng một gợi ý, đọc lên tưởng lỗi hiển thị.
    const hide = i % 3;
    const parts = SC.VARIANT_PARTS.map((p, i) =>
      i === hide ? '<i>?</i>' : SC.Rank.esc(p[k[i]]));
    el.innerHTML = `
      <div class="cx-head"><b>?????</b></div>
      <div class="cx-tag">Chưa mở — cần tổ hợp:</div>
      <div class="cx-hint">${parts.join(' + ')}</div>`;
    return el;
  }
};

;
/* ===== js/ui-evolution.js ===== */
/* ui-evolution.js — màn TIẾN HOÁ: diễn từ dạng cũ sang dạng mới
 *
 * Trước đây mốc tiến hoá chỉ có một dòng chữ loé lên rồi tắt. Vấn đề: người chơi vừa
 * đổ mấy chục nghìn vàng vào cây mà không hề THẤY mình đổi thành cái gì — phần thưởng
 * lớn nhất của cả hệ thống lại là thứ trôi qua nhanh nhất.
 *
 * Ở đây đặt hai dạng CẠNH NHAU rồi diễn: dạng cũ mờ và co lại, dạng mới nổ ra và
 * sáng lên. Nhìn một lần là hiểu ngay mình vừa nâng cấp cái gì.
 *
 * Ba mảnh cùng đổi được nêu rõ bằng chữ, vì có thứ nhìn không ra: đạn nhận hiệu ứng
 * gì, khiên đổi dáng ra sao, drone thêm hành vi nào.
 */

SC.Evolution = {
  DUR: 2.6,            // tổng thời lượng hoạt cảnh (giây)
  R: 46,               // bán kính máy bay vẽ trong khung

  init(on) {
    on('btnEvoOk', () => this.close());
  },

  /* Mở màn cho mốc `evo` (1 hoặc 2). Ván chơi do main.js giữ nguyên trạng thái. */
  open(evo) {
    this.evo = evo;
    this.t = 0;
    const d = SC.Variant.def();

    document.getElementById('evoStep').textContent = 'TIẾN HOÁ ' + evo;
    document.getElementById('evoName').textContent = d ? d.name : 'DẠNG MỚI';
    document.getElementById('evoName').style.color = SC.Variant.hue();
    document.getElementById('evoTag').textContent = d ? d.tag : '';
    document.getElementById('evoGain').innerHTML = this._gains(evo)
      .map(g => `<li>${SC.Rank.esc(g)}</li>`).join('');

    const c = document.getElementById('evoCanvas');
    this.ctx = c.getContext('2d');
    // vẽ ở độ phân giải thật của màn hình, nếu không máy bay bị rỗ ở màn retina
    const dpr = Math.min(2.5, window.devicePixelRatio || 1);
    c.width = 300 * dpr; c.height = 150 * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    SC.UI.showOverlay('evo');
    SC.Audio.win();
    this._loop();
  },

  close() {
    cancelAnimationFrame(this._raf);
    SC.UI.hideOverlay('evo');
    if (SC.Game.state === 'evo') SC.Game.state = 'play';
    // mở từ màn cây kỹ năng thì dựng lại thẻ biến thể: tên và màu vừa đổi xong
    if (SC.UI.el.tree && !SC.UI.el.tree.classList.contains('hidden')) SC.TreeUI.build();
    SC.UI.syncMenu();
  },

  /* Nói THẲNG cái gì vừa đổi. Nhìn hình chỉ thấy dáng, còn hiệu ứng đạn và hành vi
     drone thì phải đọc mới biết — mà đó lại là phần thay đổi lối chơi nhiều nhất. */
  _gains(evo) {
    const sh = SC.Tree.path('shield'), dr = SC.Tree.path('drone');
    const out = [];
    if (evo === 1) {
      out.push('Máy bay đổi hình theo tổ hợp nhánh đã chọn');
      if (sh === 'B') out.push('Đạn nhận SÉT LAN — trúng địch thì nảy sang 2 con gần nhất');
      else if (sh === 'A') out.push('Đạn nhận DỘI TƯỜNG — bật khỏi mép màn, phủ được góc chết');
      if (dr === 'B') out.push('Đạn nhận ĐẠN DÍ — tự bẻ lái theo mục tiêu gần nhất');
      out.push('Khiên và hào quang đổi dáng theo hướng đã chọn');
    } else {
      out.push('Dạng cuối: thân máy bay nhuộm màu biến thể, hào quang dày lên');
      if (sh === 'B') out.push('Sét lan nảy được 3 con thay vì 2');
      else if (sh === 'A') out.push('Đạn dội tường được 2 lần thay vì 1');
      out.push(dr === 'A'
        ? 'Bầy đàn biết LAO VÀO cản quái áp sát người chơi'
        : 'Sát thủ bắn ĐÒN XUYÊN TOÀN MÀN mỗi 3 giây');
    }
    return out;
  },

  /* ---------- hoạt cảnh ---------- */
  _loop() {
    this._raf = requestAnimationFrame(() => this._loop());
    this.t += 1 / 60;
    const k = SC.clamp(this.t / this.DUR, 0, 1);
    const ctx = this.ctx;
    ctx.clearRect(0, 0, 300, 150);

    // Nhịp: 0-35% giữ dạng cũ · 35-65% chớp sáng chuyển · 65-100% dạng mới nở ra
    const fade = SC.clamp((k - 0.35) / 0.30, 0, 1);
    const grow = SC.clamp((k - 0.55) / 0.45, 0, 1);
    const hue = SC.Variant.hue();

    this._ship(70, 78, this.evo - 1, 1 - fade * 0.75, 1 - fade * 0.25);

    // mũi tên chỉ chiều tiến hoá, sáng dần theo nhịp chuyển
    ctx.save();
    ctx.globalAlpha = 0.3 + fade * 0.7;
    ctx.strokeStyle = hue; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(132, 78); ctx.lineTo(166, 78);
    ctx.moveTo(157, 70); ctx.lineTo(166, 78); ctx.lineTo(157, 86);
    ctx.stroke();
    ctx.restore();

    if (grow > 0) {
      const pop = 1 + Math.sin(Math.min(1, grow * 1.6) * Math.PI) * 0.28;   // nảy một nhịp
      this._ship(230, 78, this.evo, grow, pop);
      if (grow < 0.55) {
        ctx.save();
        ctx.globalAlpha = (1 - grow / 0.55) * 0.9;
        ctx.strokeStyle = hue; ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(230, 78, 20 + grow * 90, 0, 6.283);
        ctx.stroke();
        ctx.restore();
      }
    }

    // KHÔNG dừng vòng vẽ khi diễn xong nữa (22/09/2026): hào quang dạng mới là VFX
    // động (sét xẹt, gương loé…) — dừng là đứng hình đúng lúc người chơi đang ngắm.
    // close() lo cancelAnimationFrame.
  },

  _ship(x, y, evo, alpha, scale) {
    const ctx = this.ctx;
    const s = SC.ShipArt.sprite(this.R, Math.max(0, evo));
    const size = this.R * SC.ShipArt.PAD * 2 * scale;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    SC.AuraFX.draw(ctx, this.R * scale, this.t, evo);
    ctx.globalAlpha = alpha;
    ctx.drawImage(s, -size / 2, -size / 2, size, size);
    ctx.restore();
  }
};

;
/* ===== js/ui-gift.js ===== */
/* ui-gift.js — quà tân thủ: 200 vàng tặng lần đầu mở game
 *
 * Vì sao cần: hồ sơ mới bắt đầu với 0 vàng, mà cấp rẻ nhất trong cây kỹ năng tốn 100.
 * Nghĩa là người chơi mới phải đánh xong ít nhất một map rồi mới được chạm vào hệ
 * thống nâng cấp — trong khi đó chính là thứ thú vị nhất của game. 200 vàng cho phép
 * mua ngay hai cấp và gặp luôn hộp thoại rẽ nhánh ở cấp 2, tức là hiểu được ý đồ
 * "chọn hướng đi" ngay trong vài phút đầu.
 *
 * Chỉ tặng cho hồ sơ THẬT SỰ mới (chưa qua map nào). Người đang chơi dở không nhận
 * — quà rơi vào giữa hành trình thì vô nghĩa, và cũng làm lệch số liệu cân bằng.
 */

SC.Gift = {
  AMOUNT: SC.bal('reward.newbieGift', 200),

  init(on) {
    on('btnGiftOk', () => this.claim());
  },

  /* Hồ sơ mới tinh: chưa nhận quà, chưa qua map nào */
  eligible() {
    const p = SC.UI.progress;
    return !p.gift
      && (p.unlocked | 0) <= 1
      && Object.keys(p.stars || {}).length === 0;
  },

  /* Gọi sau khi lobby đã dựng xong. Chờ một nhịp để người chơi kịp thấy màn hình
     chính trước, quà nổ ra ngay lúc trang vừa hiện thì trông như lỗi. */
  check() {
    if (!this.eligible()) return;
    setTimeout(() => { if (this.eligible()) this.open(); }, 700);
  },

  open() {
    document.getElementById('giftAmount').textContent = this.AMOUNT.toLocaleString('vi-VN');
    SC.EvoStarter.attach(false);      // kênh zingplay: kèm khu chọn tàu AI tân thủ
    SC.UI.showOverlay('gift');
    SC.Audio.gem();
  },

  /* Cộng vàng không đụng UI — tàu tân thủ (ui-evo-starter.js) gọi khi người chơi bấm
     chọn tàu mà chưa bấm NHẬN QUÀ. Trả false nếu đã nhận rồi. */
  grant() {
    const p = SC.UI.progress;
    if (p.gift || !this.eligible()) return false;
    p.gift = 1;                       // đánh dấu trước khi cộng: bấm nhanh hai lần không ăn hai lần
    p.coin = (p.coin | 0) + this.AMOUNT;
    SC.UI.save();
    SC.Cloud.markDirty();
    return true;
  },

  claim() {
    if (SC.EvoStarter.busy) return;   // đang ấp tàu tân thủ — đóng giữa chừng là mất màn nở
    const moi = this.grant();
    SC.UI.hideOverlay('gift');
    if (!moi) return;
    SC.Audio.power();
    SC.UI.syncMenu();
    SC.UI.toast('NHẬN ◈' + this.AMOUNT.toLocaleString('vi-VN'), true);
  }
};

;
/* ===== js/ui-avatar.js ===== */
/* ui-avatar.js — dựng ảnh đại diện dùng chung cho lobby, màn hồ sơ và khối tài khoản
 *
 * Vì sao tách riêng: có 4 chỗ cần vẽ avatar với cùng một luật ngã dự phòng, chép tay
 * 4 lần là 4 cơ hội quên mất một nhánh.
 *
 * Luật xếp lớp: emoji nằm DƯỚI, ảnh đè LÊN. Ảnh hỏng (mất mạng, Google đổi URL,
 * bản cài về máy chạy offline) thì thẻ <img> tự gỡ mình đi và emoji lộ ra — không
 * cần bắt lỗi bằng JS, cũng không bao giờ ra ô trống.
 */

SC.Ava = {
  /* Google trả photoURL đuôi "=s96-c". Trên màn hình DPI cao, 96px vẽ ở 34px vẫn
     ổn nhưng ở màn hồ sơ (56px) thì bệt. Nâng lên 128.
     CHỈ thay khi khớp đúng mẫu — nhà cung cấp khác có dạng URL riêng, ghép bừa
     tham số vào là hỏng ảnh. */
  hi(url) {
    return /=s\d+-c$/.test(url || '') ? url.replace(/=s\d+-c$/, '=s128-c') : (url || '');
  },

  /* Một khối avatar: lớp nền (emoji hoặc chữ cái) + ảnh phủ lên nếu có.
     URL đi qua SC.Rank.esc vì nó được lưu trong localStorage — cùng cách ui-rank.js
     đang xử ảnh của bảng xếp hạng. */
  html(fallback, photo, cls) {
    const img = photo
      ? `<img class="ava-img" src="${SC.Rank.esc(photo)}" alt=""` +
        ` referrerpolicy="no-referrer" onerror="this.remove()">`
      : '';
    return `<span class="ava${cls ? ' ' + cls : ''}">` +
      `<i class="ava-emo">${fallback || '🐔'}</i>${img}</span>`;
  },

  /* Ảnh của một hồ sơ: dùng ảnh Google nếu hồ sơ đã bật, không thì emoji đã chọn */
  ofProfile(p) {
    return this.html(p.avatar, p.photo ? this.hi(p.photo) : '');
  },

  /* Ảnh cho thẻ danh tính ở lobby.
     Thứ tự ưu tiên: ảnh hồ sơ đã lưu > ảnh tài khoản đang đăng nhập > emoji.
     Nhờ nhánh giữa mà đăng nhập xong là thấy mặt mình ngay, chưa cần bật gì thêm. */
  ofLobby(p) {
    const acc = Portal.Auth && Portal.Auth.user ? Portal.Auth.user.avatar : '';
    return this.html(p.avatar, this.hi(p.photo || acc));
  },

  /* Có đang hiện ẢNH (chứ không phải emoji) ở thẻ lobby không —
     dùng để quyết định có cần huy hiệu góc nhắc đang chơi hồ sơ nào hay không. */
  lobbyHasPhoto(p) {
    return !!(p.photo || (Portal.Auth && Portal.Auth.user && Portal.Auth.user.avatar));
  }
};

;
/* ===== js/ui-victory.js ===== */
/* ui-victory.js — màn tổng kết khi đi hết chiến dịch
 *
 * Hiện đúng một lần, ngay sau bảng kết quả của map cuối, khi hồ sơ đã có sao ở
 * ĐỦ mọi màn. Cờ SC.UI.progress.finished giữ lại để lần cày sau không bắn pháo
 * hoa lại từ đầu.
 *
 * Vì sao nút chính dẫn thẳng vào tab TỐC ĐỘ chứ không phải tab mặc định: bảng tốc
 * độ chỉ nhận hồ sơ đã đi hết mọi màn (xem điều kiện bestTime trong ui-rank.js),
 * nên đây đúng là bảng người chơi vừa mới đủ điều kiện góp mặt.
 */

SC.Victory = {
  init(on) {
    // Rời bảng kết quả sang màn tổng kết. quitToMenu() chạy trước để đưa game về
    // trạng thái 'menu' — dọn phi đội, tắt nhạc, đồng bộ lobby. Nếu bỏ qua bước này
    // thì state vẫn kẹt ở 'result', và lúc bấm về lobby sẽ không có máy bay đứng chờ
    // (system-renderer chỉ vẽ SC.LobbyShip khi state === 'menu').
    on('btnResFinale', () => { SC.Game.quitToMenu(); this.show(); });

    on('btnVicRank', () => {
      SC.UI.show('rank');
      SC.Rank.open('time');
    });
    on('btnVicMenu', () => { SC.UI.show('menu'); SC.UI.syncMenu(); });
    on('btnVicLogin', () => Portal.Auth.login());
  },

  /* Tổng thời gian chiến dịch = cộng lần nhanh nhất của từng màn.
     Cùng công thức với ui-rank.js để hai chỗ không bao giờ ra số khác nhau. */
  totalTime() {
    const t = SC.UI.progress.times || {};
    let s = 0;
    for (let i = 1; i <= SC.TOTAL_LEVELS; i++) s += t[i] || 0;
    return Math.round(s);
  },

  show() {
    const id = s => document.getElementById(s);
    const set = (s, v) => { const e = id(s); if (e) e.textContent = v; };
    const p = SC.UI.progress;
    // màn tổng kết chiến dịch -> đếm sao trong phạm vi chiến dịch, không lẫn vòng vô tận
    const star = SC.UI.campaignStar();
    const cur = SC.Profiles.cur();

    set('vicName', cur ? cur.name : 'PHI CÔNG');
    set('vicRank', SC.Power.rank());
    set('vicStars', star);
    set('vicStarMax', SC.TOTAL_STARS);
    set('vicTime', SC.Rank.time(this.totalTime()));
    set('vicPower', SC.Power.fmt(SC.Power.show()));
    set('vicCoin', p.coin || 0);
    set('vicUpg', SC.Tree.totalLevels() + '/' + SC.Tree.totalMax());
    set('vicMaps', SC.TOTAL_LEVELS);

    // Chưa đủ sao thì nói còn thiếu bao nhiêu — đó là lý do để quay lại cày tiếp.
    const left = SC.TOTAL_STARS - star;
    const perfect = id('vicPerfect');
    if (perfect) {
      perfect.classList.toggle('done', left <= 0);
      perfect.innerHTML = left > 0
        ? `Còn <b>${left}</b> sao nữa để đạt hoàn hảo`
        : 'Hoàn hảo tuyệt đối — không sót một sao nào';
    }

    // Chưa đăng nhập thì kỷ lục này chỉ nằm trong máy, nói thẳng ra kẻo phí công.
    const box = id('vicLoginBox');
    if (box) box.classList.toggle('hidden', !!(Portal.Auth && Portal.Auth.user));

    SC.UI.show('victory');
  }
};

;
/* ===== js/data-evo-keywords.js ===== */
/* data-evo-keywords.js — kho từ khóa cho TIẾN HÓA AI (system-evo-ai.js)
 *
 * Bộ 3 từ khóa theo CÔNG THỨC (RECIPES), món chính là CON VẬT + CLASS + (màu/tính
 * cách), vd "bulldog + hiệp sĩ + đỏ tươi" → quái thú dung hợp kiểu bài Yu-Gi-Oh.
 *
 * Mỗi mục có `vi` (hiện cho người chơi) và `en` (ghép vào prompt sinh ảnh —
 * model ảnh ăn tiếng Anh ổn định hơn hẳn, đo thật ở bộ 60 sprite 20/09).
 */

SC.EVO_KW = {
  /* animal / class / trait: pool ở data-evo-keyword-pools-animal-class-trait.js */
  color: [
    { vi: 'đỏ tươi',    en: 'vivid red' },
    { vi: 'xanh neon',  en: 'neon cyan' },
    { vi: 'vàng rực',   en: 'blazing golden yellow' },
    { vi: 'tím mộng',   en: 'electric purple' },
    { vi: 'xanh lá độc',en: 'toxic lime green' },
    { vi: 'cam lửa',    en: 'flaming orange' },
    { vi: 'hồng xung',  en: 'hot pink' },
    { vi: 'trắng băng', en: 'ice white with silver' },
  ],

  /* Thứ tự nhặt MẶC ĐỊNH (bộ chưa có công thức riêng — tương thích tiến độ cũ) */
  ORDER: ['animal', 'trait', 'color'],

  /* CÔNG THỨC bộ 3 (21/09/2026): mỗi bộ mới RNG một công thức — có bộ lai HAI
     con vật, có bộ mang phong cách nghệ thuật riêng. system-evo-ai.award chọn
     lúc nhặt mảnh đầu của bộ và lưu vào progress.evo.recipe. */
  /* 22/09/2026 thêm CÓ TRỌNG SỐ: bộ lai 2 con vật từ 50% xuống 10% — lai 2 con hay
     ra quái lổn nhổn, không đẹp. "Con vật + class" thành món chính (60%). */
  RECIPES: [
    { r: ['animal', 'class', 'color'], w: 3 },
    { r: ['animal', 'class', 'trait'], w: 3 },
    { r: ['animal', 'trait', 'color'], w: 2 },
    { r: ['animal', 'style', 'class'], w: 1 },
    { r: ['animal', 'animal', 'class'], w: 1 },   // dung hợp hiếm — đúng chất fusion
    // dòng MÁY BAY CHIẾN ĐẤU thuần (22/09): ~28% số bộ — data-evo-fighter-jet-prompt.js
    { r: ['frame', 'class', 'color'], w: 3 },
    { r: ['frame', 'style', 'color'], w: 1 },
  ],
  pickRecipe() {
    let x = Math.random() * this.RECIPES.reduce((a, c) => a + c.w, 0);
    for (const c of this.RECIPES) if ((x -= c.w) < 0) return c.r;
    return this.RECIPES[0].r;
  },

  /* Chi tiết sơn/decal CÁ NHÂN (21/09/2026, goal "không ai giống ai"): 2 mục được
     chọn theo hash danh tính + số lần tiến hóa, nhồi vào prompt — hai người cùng
     ra một bộ từ khóa thì tàu vẫn khác nhau ở lớp áo. */
  LIVERY: [
    'diagonal racing stripes on the wings',
    'scattered paw-print decals',
    'a star squadron emblem on the nose',
    'weathered battle scratches and scuffs',
    'iridescent pearl paint finish',
    'hexagon pattern panel accents',
    'checker-tipped twin tail fins',
    'glowing circuit line details along the hull',
    'a big lucky number decal on one wing',
    'flame decal trim along the edges',
  ],

  _hash(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  },

  livery(seed) {
    const h = this._hash(String(seed || ''));
    const n = this.LIVERY.length;
    const a = h % n;
    const b = (a + 1 + ((h >>> 8) % (n - 1))) % n;
    return `${this.LIVERY[a]}, ${this.LIVERY[b]}`;
  },

  /* Nhãn loại để hiện trên toast/popup */
  LABEL: { animal: 'CON VẬT', trait: 'TÍNH CÁCH', color: 'MÀU SẮC', style: 'PHONG CÁCH' },

  roll(type) {
    const pool = this[type];
    const it = pool[(Math.random() * pool.length) | 0];
    return { t: type, vi: it.vi, en: it.en, dna: it.dna };
  },

  /* DNA của một từ khóa bất kỳ loại — kw lưu từ bản cũ có thể thiếu dna, tra lại theo en */
  _dnaKw(k) {
    if (k.dna) return k.dna;
    const it = (this[k.t] || []).find(x => x.en === k.en);
    return it && it.dna ? it.dna : '';
  },

  /* DNA của con vật trong bộ từ khóa — kw cũ (trước khi có dna) tra lại theo en */
  _dnaOf(kws) {
    const a = kws.find(k => k.t === 'animal');
    if (!a) return '';
    if (a.dna) return a.dna;
    const it = this.animal.find(x => x.en === a.en);
    return it ? it.dna : '';
  },

  /* Style phụ cho nút GEN LẠI (21/09/2026): gen lại cùng prompt hay ra kết quả
     na ná bản cũ — model rất "lì". Mỗi style là một cú bẻ lái đủ mạnh để ảnh
     khác hẳn, mà vẫn giữ con vật + tính cách + màu của bộ từ khóa. */
  STYLES: {
    chibi:     { vi: 'CHIBI',     en: 'super-deformed chibi proportions, big head tiny body, ultra cute round shapes' },
    fantasy:   { vi: 'FANTASY',   en: 'high fantasy style, ornate enchanted armor plating, glowing magic runes, mythical wings' },
    mecha:     { vi: 'MECHA',     en: 'heavy mecha style, angular robot armor, hard surface panel lines, military sci-fi greebles' },
    steampunk: { vi: 'STEAMPUNK', en: 'steampunk style, brass and copper plating, exposed spinning gears, rivets and steam pipes' },
    crystal:   { vi: 'PHA LÊ',    en: 'crystalline style, translucent gemstone hull facets, glowing refracted light' },
    origami:   { vi: 'ORIGAMI',   en: 'origami paper-craft style, folded paper facets, crisp geometric creases' },
  },

  /* Prompt sinh ảnh: vibe chốt với GD 21/09/2026 — toon, animal chiến đấu cơ,
     vui vẻ, game, NGẦU (game bắn máy bay phải ngầu một tí). Khung mô tả khớp
     STYLE của bộ sprite hiện tại (tools/gen-assets.mjs) để tàu mới không lạc tông. */
  /* styleBtn = style người chơi BẤM ở nút GEN LẠI — thắng từ khóa style trong bộ
     (lệnh trực tiếp thắng vận may). Bộ lai 2 con vật thì DNA phải giữ CẢ HAI. */
  /* attempt = lượt gen thứ mấy của bộ (1 = lần đầu). 22/09/2026: bộ lai sói + gấu
     trúc ra hẳn một CON THÚ đứng dang tay — nhìn ghê và không giống máy bay trong
     game bắn máy bay dọc. Giờ góc nhìn TOP-DOWN + "là máy bay trước, con vật sau"
     đứng ĐẦU prompt; gen lại (attempt ≥ 2) còn siết chặt hơn nữa. */
  /* VIBE 22/09/2026: art style bài Yu-Gi-Oh (quái thú DUNG HỢP) — khớp đúng cơ chế
     ghép từ khóa, thay cho tông toon hoạt hình cũ. Vẫn là sprite máy bay top-down. */
  VIBE: 'Yu-Gi-Oh! Duel Monsters card illustration art style, epic fusion-monster design, '
    + 'ornate mythic armor with gold trim, dramatic anime inking, intense glowing energy accents',

  prompt(kws, styleBtn, seed, attempt) {
    if (this.isFighter(kws)) return this.fighterPrompt(kws, styleBtn, seed, attempt);
    const animals = kws.filter(k => k.t === 'animal');
    const cls = kws.find(k => k.t === 'class');
    const trait = (kws.find(k => k.t === 'trait') || {}).en;
    const color = (kws.find(k => k.t === 'color') || {}).en;
    const style = styleBtn || (kws.find(k => k.t === 'style') || {}).en;
    const a1 = animals[0] ? animals[0].en : 'rooster';
    const theme = animals.length > 1 ? `a FUSION of a ${a1} and a ${animals[1].en}` : `a ${a1}`;
    const dna = animals.map(a => { const d = this._dnaKw(a); return d ? `${a.en}: ${d}` : ''; })
      .filter(Boolean).join('; ');
    return [
      'top-down view from directly above, vertical shoot-em-up game sprite of a FIGHTER AIRCRAFT, '
        + 'nose pointing up, two wings spread left and right',
      ...(attempt >= 2 ? ['STRICTLY an aircraft silhouette seen from above, never a standing creature, '
        + 'no legs, no arms, no full animal body, no human rider'] : []),
      ...(style && this.STYLES[style] ? [this.STYLES[style].en] : []),
      `the aircraft is themed as ${theme}${cls ? ` ${cls.en} class` : ''}: the animal head forms `
        + 'the nose and cockpit, its features blend into the fuselage, wings and tail',
      ...(dna ? [`recognizable animal DNA built into the plane shape — ${dna}`] : []),
      // class = trang bị HOÁ vào thân tàu, không vẽ thêm người cưỡi
      ...(cls ? [`${cls.en} class gear fused into the aircraft itself (not a rider): ${this._dnaKw(cls)}`] : []),
      ...(seed ? [`unique personal livery: ${this.livery(seed)}`] : []),
      ...(trait ? [`personality: ${trait} — show it clearly in the face and pose`] : []),
      ...(color ? [`dominant color scheme: ${color}`] : []),
      this.VIBE,
      'crisp bold outlines, saturated colors, strong rim light, readable silhouette',
      'top-down view, nose pointing up, symmetrical, centered, single subject',
      'flat transparent background, no scenery, no frame, no text, no watermark',
    ].join(', ');
  },

  /* Drone hộ tống CÙNG THEME với tàu (21/09/2026: tàu ong sọc mà phi đội tím mặc
     định nhìn như đi mượn). Mô tả lặp lại đúng bộ từ khóa + bắt dáng ĐƠN GIẢN:
     drone vẽ ~24px, chi tiết mấy cũng thành nhiễu. */
  dronePrompt(kws, styleBtn) {
    if (this.isFighter(kws)) return this.fighterDronePrompt(kws, styleBtn);
    const animals = kws.filter(k => k.t === 'animal');
    const trait = (kws.find(k => k.t === 'trait') || {}).en;
    const style = styleBtn || (kws.find(k => k.t === 'style') || {}).en;
    const cls = kws.find(k => k.t === 'class');
    const ten = animals.map(a => a.en).join(' and ') || 'rooster';
    const dna = this._dnaOf(kws);
    return [
      ...(style && this.STYLES[style] ? [this.STYLES[style].en] : []),
      `a tiny escort drone, companion of a ${ten}${cls ? ' ' + cls.en + ' class' : ''} themed fighter aircraft`,
      ...(cls ? [`one small ${cls.en} emblem or weapon motif`] : []),
      `same theme: ${ten} motif${trait ? ', ' + trait + ' vibe' : ''}`,
      ...(dna ? [`echo the ${animals[0] ? animals[0].en : 'rooster'} DNA in miniature: ${dna}`] : []),
      ...((kws.find(k => k.t === 'color') || {}).en
        ? [`same dominant color scheme: ${kws.find(k => k.t === 'color').en}`] : []),
      'very simple bold silhouette readable at 24 pixels',
      'Yu-Gi-Oh! Duel Monsters art style in miniature, bold outlines, glowing energy accent',
      'top-down view, nose pointing up, centered, single subject',
      'flat transparent background, no scenery, no frame, no text, no watermark',
    ].join(', ');
  }
};

/* Pool từ khóa PHONG CÁCH cho công thức [animal, style, color] — build từ STYLES
   để nút GEN LẠI và từ khóa dùng chung một bảng mô tả; roll('style') và màn quay
   số (SC.EVO_KW[kw.t]) tự ăn theo vì đây là mảng như animal/trait/color. */
SC.EVO_KW.style = Object.keys(SC.EVO_KW.STYLES)
  .map(k => ({ vi: SC.EVO_KW.STYLES[k].vi, en: k }));

;
/* ===== js/data-evo-keyword-pools-animal-class-trait.js ===== */
/* data-evo-keyword-pools-animal-class-trait.js — POOL từ khóa tiến hóa (nạp SAU
 * data-evo-keywords.js, đắp đè lên SC.EVO_KW)
 *
 * Tách riêng vì pool dài ra theo thời gian (22/09/2026: 12 → 36 con vật, 8 → 24
 * tính cách, thêm hẳn loại CLASS) — logic prompt nằm yên ở file kia.
 *
 * LUẬT GIỮ TƯƠNG THÍCH: `en` là KHOÁ — lịch sử tổ hợp (evo.hist), sổ gara và thuộc
 * tính ẩn (ANIMAL_STAT, băm en) đều tra theo en. Đổi `vi` thoải mái, ĐỪNG đổi `en`
 * của mục đã phát cho người chơi.
 *
 * Vì sao pool to: pool 8 tính cách + chống trùng "không lặp bộ ngay trước" nghĩa là
 * thực tế chỉ còn 5-6 lựa chọn — người chơi thấy "dữ dằn" quay lại liên tục.
 */

Object.assign(SC.EVO_KW, {
  /* `dna` = đặc điểm giải phẫu BẮT BUỘC giữ khi gen (panda phải MẬP...). Biến thể
     cùng loài (gà mái/gà trống, bulldog/corgi) phải có DNA KHÁC HẲN nhau, không thì
     tốn thêm mục mà ảnh ra y hệt. */
  animal: [
    // --- họ nhà gà: nhân vật chính của game, nhiều biến thể nhất ---
    { vi: 'gà trống',   en: 'rooster',        dna: 'proud rooster with a tall red comb, wattle, long arched sickle tail feathers' },
    { vi: 'gà mái',     en: 'hen',            dna: 'round plump mother hen body, small neat comb, soft fluffy feathers, stubby tail' },
    { vi: 'gà con',     en: 'baby chick',     dna: 'tiny round fluffy chick, oversized head, tiny beak, stubby wing nubs' },
    { vi: 'gà chọi',    en: 'fighting gamecock', dna: 'lean muscular gamecock, trimmed comb, sharp leg spurs, battle-scarred feathers' },
    // --- chó mèo ---
    { vi: 'mèo',        en: 'cat',            dna: 'feline face with whiskers, pointed triangular ears, sleek curved body' },
    { vi: 'mèo đen',    en: 'black cat',      dna: 'jet-black sleek cat, glowing slit pupils, arched back, curling tail' },
    { vi: 'bulldog',    en: 'bulldog',        dna: 'wide stocky bulldog body, droopy jowls, underbite with lower fangs, spiked collar' },
    { vi: 'corgi',      en: 'corgi',          dna: 'long low corgi body, huge upright ears, fluffy round butt, stubby short legs' },
    { vi: 'husky',      en: 'husky',          dna: 'husky mask face markings, piercing ice-blue eyes, thick fur ruff, curled tail' },
    { vi: 'shiba',      en: 'shiba inu',      dna: 'smug shiba face, cream cheeks, small triangle ears, tight curled tail' },
    // --- thú dữ ---
    { vi: 'sói',        en: 'wolf',           dna: 'lean wolf snout with fangs, pointed ears, bushy tail' },
    { vi: 'cáo',        en: 'fox',            dna: 'slim fox muzzle, big pointed ears, fluffy bushy tail' },
    { vi: 'sư tử',      en: 'lion',           dna: 'massive flowing lion mane framing the nose, broad muzzle, tufted tail' },
    { vi: 'hổ',         en: 'tiger',          dna: 'bold black tiger stripes, heavy jaw with sabre fangs, muscular shoulders' },
    { vi: 'gấu trúc',   en: 'panda',          dna: 'VERY chubby round panda body with a big belly, black eye patches, round black ears' },
    { vi: 'tê giác',    en: 'rhino',          dna: 'huge armored rhino horn as the nose ram, thick plated hide, heavy bulk' },
    // --- trời, biển, côn trùng ---
    { vi: 'cú mèo',     en: 'owl',            dna: 'huge round owl eyes, flat facial disc, ear tufts' },
    { vi: 'đại bàng',   en: 'eagle',          dna: 'fierce hooked eagle beak, broad feathered wings, sharp talons' },
    { vi: 'dơi',        en: 'bat',            dna: 'membrane bat wings with finger struts, big radar ears, tiny fangs' },
    { vi: 'cá mập',     en: 'shark',          dna: 'streamlined shark body, tall dorsal fin, gill slits, toothy grin' },
    { vi: 'cá kiếm',    en: 'swordfish',      dna: 'long spear bill as the nose, sail-like dorsal fin, crescent tail' },
    { vi: 'bạch tuộc',  en: 'octopus',        dna: 'dome octopus head, multiple curling tentacles as wings or thrusters' },
    { vi: 'ong',        en: 'bee',            dna: 'striped bee abdomen with a stinger tail, translucent double wings' },
    { vi: 'bọ cạp',     en: 'scorpion',       dna: 'segmented scorpion tail arching forward with a stinger, big pincer claws as wings' },
    { vi: 'bọ ngựa',    en: 'praying mantis', dna: 'triangular mantis head, folded scythe forearms as blades, slender body' },
    // --- cổ đại / huyền thoại ---
    { vi: 'khủng long', en: 't-rex dinosaur', dna: 'big t-rex jaws with teeth, tiny front arms, thick powerful tail' },
    { vi: 'thằn lằn bay', en: 'pterodactyl',  dna: 'long crested pterodactyl head, leathery wings, sharp toothed beak' },
    { vi: 'rồng',       en: 'dragon',         dna: 'dragon horns, scaled armor plates, long serpentine tail' },
    { vi: 'phượng hoàng', en: 'phoenix',      dna: 'blazing phoenix plumage, trailing flame tail feathers, crest of fire' },
    { vi: 'kỳ lân',     en: 'unicorn',        dna: 'single spiral horn on the nose, flowing mane, elegant equine head' },
    { vi: 'sư tử đầu chim', en: 'griffin',    dna: 'eagle head and wings fused to a lion body, feathered crest' },
    { vi: 'cửu vĩ hồ',  en: 'nine-tailed fox', dna: 'fox with NINE fanned-out spirit tails, mystic forehead mark' },
    // --- TỨ LINH phương Đông — đúng chất quái thú dung hợp ---
    { vi: 'thanh long', en: 'azure dragon',   dna: 'long serpentine eastern azure dragon, whiskers, antler horns, pearl orb, cloud-scroll fins' },
    { vi: 'bạch hổ',    en: 'white tiger',    dna: 'white tiger with black stripes, divine glowing forehead mark, silver fangs' },
    { vi: 'chu tước',   en: 'vermilion bird', dna: 'vermilion firebird, long ribbon tail plumes, crown crest, burning wing tips' },
    { vi: 'huyền vũ',   en: 'black tortoise', dna: 'massive tortoise shell hull with a serpent coiled around it, snake head tail' },
  ],

  /* CLASS (22/09/2026): "con vật + class" ra tàu có VAI rõ ràng hơn hẳn lai 2 con
     vật (lai 2 con hay ra quái vật lổn nhổn). `dna` = trang bị của class HOÁ THÂN vào
     thân máy bay — vũ khí, giáp, huy hiệu — KHÔNG phải một người cưỡi trên tàu. */
  class: [
    { vi: 'chiến binh', en: 'warrior',     dna: 'heavy battle-axe blades as wing edges, horned war helm cockpit, battle banners' },
    { vi: 'kiếm sĩ',    en: 'swordsman',   dna: 'giant sword forming the fuselage spine, katana-blade wings, sheath-shaped tail' },
    { vi: 'cung thủ',   en: 'archer',      dna: 'wings shaped like a drawn longbow with glowing string, arrow-tipped missile pods, quiver tail' },
    { vi: 'pháp sư',    en: 'mage',        dna: 'wizard hat cockpit canopy, floating spell-rune circles, magic staff cannon with crystal orb' },
    { vi: 'hiệp sĩ',    en: 'paladin knight', dna: 'ornate plate armor hull, holy shield-shaped wings, lance cannon, golden crest' },
    { vi: 'sát thủ',    en: 'ninja assassin', dna: 'stealth matte hull, hooded cockpit, shuriken rotors, twin kunai wing blades' },
    { vi: 'xạ thủ',     en: 'gunslinger',  dna: 'twin revolver-barrel cannons, bandolier ammo belts, cowboy-hat cockpit' },
    { vi: 'giáp sĩ',    en: 'guardian',    dna: 'massive tower-shield armor plates, fortress-like bulky hull, glowing barrier emitters' },
    { vi: 'triệu hồi sư', en: 'summoner',  dna: 'summoning sigil halo, floating spirit orbs orbiting the hull, tome-shaped tail' },
    { vi: 'thánh sứ',   en: 'cleric',      dna: 'radiant halo ring, white-gold feathered angel wings, holy relic emblem' },
    { vi: 'cuồng chiến', en: 'berserker',  dna: 'jagged spiked armor, blood-red war paint, twin chained cleavers, torn cape tail' },
    { vi: 'long kỵ sĩ', en: 'dragoon',     dna: 'dragon-scale knight armor, long jousting spear nose, crested dragon-helm cockpit' },
  ],

  /* KHUNG MÁY BAY (22/09/2026): dòng tàu CHIẾN ĐẤU THUẦN — hiện đại / sci-fi, không con
     vật, style toon 2D shmup như tàu gốc của game (xem EVO_KW.prompt nhánh frame).
     `dna` = đặc điểm khung BẮT BUỘC thấy được từ góc nhìn trên xuống. */
  frame: [
    { vi: 'tàng hình',      en: 'stealth fighter',      dna: 'angular faceted stealth airframe, diamond planform, twin canted tail fins, sharp chined nose' },
    { vi: 'cánh tam giác',  en: 'delta wing interceptor', dna: 'large pure delta wing, long needle nose, single tall tail' },
    { vi: 'cánh xuôi ngược', en: 'forward-swept wing fighter', dna: 'wings swept FORWARD toward the nose, small canards, twin tails' },
    { vi: 'cánh mũi',       en: 'canard delta multirole', dna: 'delta wing with small canard foreplanes near the cockpit, single engine' },
    { vi: 'cánh cụp xòe',   en: 'swing-wing strike jet', dna: 'variable-sweep wings spread wide, twin engines, broad tail' },
    { vi: 'đánh chặn Mach 3', en: 'mach 3 interceptor', dna: 'long slender fuselage, huge twin engine intakes, short trapezoid wings' },
    { vi: 'cánh bay',       en: 'flying wing bomber',   dna: 'tailless blended flying wing, sawtooth trailing edge, no fuselage' },
    { vi: 'hai thân',       en: 'twin-boom fighter',    dna: 'central pod cockpit with two tail booms joined by a rear wing' },
    { vi: 'pháo hạm',       en: 'heavy gunship',        dna: 'wide armored hull, multiple rotary cannons on the nose and wing roots, four engines' },
    { vi: 'phi thuyền plasma', en: 'plasma starfighter', dna: 'X-shaped split wings, glowing plasma engine rings, sleek cockpit bubble' },
    { vi: 'biến hình',      en: 'transforming variable fighter', dna: 'jet fighter with folded robot arms and legs visible along the fuselage, mech details' },
    { vi: 'cánh vòng',      en: 'ring-wing fighter',    dna: 'circular annular ring wing wrapped around the fuselage, rear pusher engine' },
    { vi: 'mẫu hạm drone',  en: 'drone carrier jet',    dna: 'broad lifting body with open docking bays holding mini drones' },
    { vi: 'siêu thanh',     en: 'hypersonic waverider', dna: 'flat wedge waverider hull, scramjet underbody, tiny tip fins' },
  ],

  /* tính cách: mỗi mục phải KHÁC NHAU TRÊN MẶT — hai từ gần nghĩa ra cùng một nét
     mặt là phí một ô pool */
  trait: [
    { vi: 'vui vẻ',       en: 'cheerful, big happy grin' },
    { vi: 'dữ dằn',       en: 'fierce, angry battle face' },
    { vi: 'lạnh lùng',    en: 'cool and composed, confident smirk' },
    { vi: 'tinh nghịch',  en: 'mischievous, playful winking face' },
    { vi: 'kiêu hãnh',    en: 'proud, chin-up heroic look' },
    { vi: 'lì lợm',       en: 'stubborn tough, gritted teeth' },
    { vi: 'bí ẩn',        en: 'mysterious, half-shadowed knowing eyes' },
    { vi: 'hăng máu',     en: 'hot-blooded, burning determined eyes' },
    { vi: 'ngái ngủ',     en: 'sleepy half-closed droopy eyes, relaxed yawn' },
    { vi: 'tự mãn',       en: 'smug, raised eyebrow and cocky grin' },
    { vi: 'hiền lành',    en: 'gentle, soft kind eyes and calm smile' },
    { vi: 'điên loạn',    en: 'maniacal, wild spiral eyes and crazy toothy laugh' },
    { vi: 'uy nghiêm',    en: 'majestic, regal stern gaze like a king' },
    { vi: 'nhút nhát',    en: 'shy, blushing cheeks and nervous sweat drop' },
    { vi: 'tham ăn',      en: 'gluttonous, drooling mouth and hungry eyes' },
    { vi: 'tăng động',    en: 'hyperactive, sparkling excited eyes and open-mouth shout' },
    { vi: 'u sầu',        en: 'melancholic, teary glossy eyes and quiet frown' },
    { vi: 'nham hiểm',    en: 'sinister, narrow scheming eyes and evil grin' },
    { vi: 'dũng mãnh',    en: 'valiant, fearless roaring battle cry' },
    { vi: 'lãnh khốc',    en: 'ruthless, cold dead-calm glowing eyes' },
    { vi: 'ngạo nghễ',    en: 'arrogant, looking down with a sneer' },
    { vi: 'điềm tĩnh',    en: 'zen, serene closed-eye meditation calm' },
    { vi: 'cáu kỉnh',     en: 'grumpy, furrowed brow and pouting scowl' },
    { vi: 'cuồng nộ',     en: 'enraged, veins popping and steam from the nose' },
  ],
});

/* nhãn loại mới cho toast / màn quay số / popup */
SC.EVO_KW.LABEL.class = 'CLASS';
SC.EVO_KW.LABEL.frame = 'KHUNG MÁY';

;
/* ===== js/data-evo-fighter-jet-prompt.js ===== */
/* data-evo-fighter-jet-prompt.js — prompt dòng MÁY BAY CHIẾN ĐẤU THUẦN (22/09/2026)
 *
 * Bộ từ khóa có KHUNG MÁY (frame) thay cho con vật -> tàu hiện đại / sci-fi đúng
 * chuẩn máy bay chiến đấu, style toon 2D shmup như tàu gốc của game (tools/gen-assets
 * STYLE), KHÔNG dùng vibe Yu-Gi-Oh của dòng máy bay thú: vibe đó kéo ra mặt thú, giáp
 * thần thoại — sai hẳn chất "tiêm kích".
 * EVO_KW.prompt / dronePrompt tự rẽ sang đây khi bộ có frame.
 */

Object.assign(SC.EVO_KW, {
  FIGHTER_VIBE: 'premium 2D mobile shoot-em-up game art, clean toon cel-shading, glossy metal panels, '
    + 'crisp bold dark outlines, saturated colors, glowing engine exhaust and subtle neon rim light',

  isFighter(kws) { return kws.some(k => k.t === 'frame') && !kws.some(k => k.t === 'animal'); },

  fighterPrompt(kws, styleBtn, seed, attempt) {
    const fr = kws.find(k => k.t === 'frame');
    const cls = kws.find(k => k.t === 'class');
    const trait = (kws.find(k => k.t === 'trait') || {}).en;
    const color = (kws.find(k => k.t === 'color') || {}).en;
    const style = styleBtn || (kws.find(k => k.t === 'style') || {}).en;
    return [
      'top-down view from directly above, vertical shoot-em-up game sprite of a modern sci-fi FIGHTER JET, '
        + 'nose pointing up, two wings spread left and right',
      ...(attempt >= 2 ? ['STRICTLY a single aircraft silhouette seen from above, clean readable shape'] : []),
      ...(style && this.STYLES[style] ? [this.STYLES[style].en] : []),
      `airframe type: ${fr.en} — ${this._dnaKw(fr)}`,
      // class = bộ vũ khí/giáp của vai trò, gắn lên thân tàu (không có người)
      ...(cls ? [`${cls.en} combat role loadout built into the jet: ${this._dnaKw(cls)}`] : []),
      ...(trait ? [`design attitude inspired by: ${trait} (expressed through shape and decals, no face)`] : []),
      // livery chung có "dấu chân thú" — mẫu 22/09 ra pháo hạm in chân mèo, lạc tông tiêm kích
      ...(seed ? [`unique personal livery: ${this.livery(seed)
        .replace('scattered paw-print decals', 'squadron kill-mark decals')}`] : []),
      ...(color ? [`dominant color scheme: ${color}`] : []),
      this.FIGHTER_VIBE,
      'no animal features, no face, no pilot figure, no text',
      'top-down view, nose pointing up, symmetrical, centered, single subject',
      'flat transparent background, no scenery, no frame, no watermark',
    ].join(', ');
  },

  fighterDronePrompt(kws, styleBtn) {
    const fr = kws.find(k => k.t === 'frame');
    const color = (kws.find(k => k.t === 'color') || {}).en;
    const style = styleBtn || (kws.find(k => k.t === 'style') || {}).en;
    return [
      ...(style && this.STYLES[style] ? [this.STYLES[style].en] : []),
      `a tiny unmanned escort drone matching a ${fr.en} fighter jet, same design language in miniature`,
      ...(color ? [`same dominant color scheme: ${color}`] : []),
      'very simple bold silhouette readable at 24 pixels',
      this.FIGHTER_VIBE,
      'top-down view, nose pointing up, centered, single subject',
      'flat transparent background, no scenery, no frame, no text, no watermark',
    ].join(', ');
  }
});

;
/* ===== js/system-evo-ai.js ===== */
/* system-evo-ai.js — TIẾN HÓA AI: nhặt từ khóa → gen chiến đấu cơ mới → bay bằng nó
 *
 * LUẬT CHƠI (chốt 21/09/2026):
 *   - Cứ mỗi CHÙM 3 MÀN thắng (màn 3, 6, 9…) nhặt được MỘT từ khóa, xoay vòng
 *     CON VẬT → TÍNH CÁCH → MÀU SẮC (data-evo-keywords.js).
 *   - Đủ bộ 3 → popup tiến hóa (ui-evo-ai.js): AI ghép prompt từ bộ từ khóa,
 *     sinh ảnh chiến đấu cơ, người chơi ưng thì DÙNG LUÔN làm máy bay của mình.
 *
 * ĐƯỜNG MẠNG: relay LLM chính thức cho game đã deploy (game-llm-quickstart mục 12):
 *   - *.zingplay.dev gọi https://lite-llm-relay.zingplay.dev KHÔNG token — OAuth
 *     proxy chèn auth. BẮT BUỘC content-type 'text/plain' + credentials 'include'
 *     để browser KHÔNG bắn preflight OPTIONS (preflight không mang cookie → proxy
 *     coi là chưa đăng nhập và chặn). Body vẫn là JSON, chỉ cái nhãn nói dối.
 *   - Game phải được DUYỆT trên Innovation Center, chưa duyệt thì mọi lời gọi trả
 *     403 game_not_registered — hiện thông báo rõ, không phải lỗi code.
 *   - Máy dev: đặt localStorage 'sc.vkmToken' = 'vkm_...' để đi đường dev có token.
 *
 * LƯU TRỮ: từ khóa + số lần tiến hóa nằm trong SC.UI.progress (theo mây như tiến
 * độ thường). ẢNH thì KHÔNG — dataURL vài trăm KB nhét vào users/{uid} là phình
 * doc Firestore vô ích; ảnh sống ở localStorage máy này, đổi máy thì gen lại.
 */

SC.EvoAI = {
  STORE: 'sc.evoShip',           // + '.<id hồ sơ>' — mỗi hồ sơ một tàu (bug 21/09:
  DRAFT: 'sc.evoDraft',          //   key chung làm hồ sơ mới mượn tàu hồ sơ cũ)
  RELAY: 'https://lite-llm-relay.zingplay.dev',
  DEV: 'https://lite-llm-virtualkey-man.zingplay.dev/api/llm',
  CHUNK: 3,                      // mỗi chùm mấy màn thì nhặt 1 từ khóa
  MAX_GEN: 4,                    // 1 gen đầu + tối đa 3 GEN LẠI mỗi bộ từ khóa

  /* LỌC THEO KÊNH (21/09/2026): relay LLM chỉ mở CORS cho *.zingplay.dev, nên trên
     portal công khai (camandaulung.github.io) nút TIẾN HÓA chắc chắn ăn lỗi mạng.
     Tính năng vì vậy chỉ bật ở zingplay.dev (sau SSO) hoặc máy dev có token —
     nơi khác thì im lặng hoàn toàn: không nhặt từ khóa, không popup, người chơi
     portal không biết nó tồn tại. Muốn mở công khai thì phải xin thêm origin vào
     RELAY_ALLOWED_ORIGINS trước, đừng chỉ gỡ gate này. */
  active() {
    if (SC.M365 && SC.M365.active()) return true;
    try { return !!localStorage.getItem('sc.vkmToken'); } catch (e) { return false; }
  },

  /* progress.evo có thể vắng (người chơi cũ, tiến độ từ mây về) — đắp mặc định */
  st() {
    const p = SC.UI.progress;
    if (!p.evo) p.evo = { kw: [], lastLv: 0, n: 0 };
    return p.evo;
  },

  ready() { return this.active() && this.st().kw.length >= 3; },

  /* ---------- hạn mức gen (ảnh tốn tiền thật) ----------
     Số lượt ĐÃ ĐỐT nằm trong progress.evo.rolls và được save NGAY TRƯỚC khi gọi
     mạng — F5 giữa chừng vẫn mất lượt, không reset được bộ đếm (anti-cheat 21/09).
     Tấm gen dở lưu DRAFT nên F5 xong mở popup vẫn còn nguyên tàu chờ quyết. */
  rollsLeft() { return Math.max(0, this.MAX_GEN - (this.st().rolls || 0)); },
  spendRoll() {
    const e = this.st();
    e.rolls = (e.rolls || 0) + 1;
    SC.UI.save();
    SC.Cloud.markDirty();
  },
  /* Khoá lưu THEO HỒ SƠ, cùng triết lý kho tiến độ (skychicken.progress.v1.<id>).
     Hồ sơ chưa nạp (giai đoạn parse script) thì tạm '.0' — init() được hoãn tới
     sau SC.Game.init() nên thực tế luôn có hồ sơ. */
  _sk() { const p = SC.Profiles && SC.Profiles.cur(); return this.STORE + '.' + (p ? p.id : 0); },
  _dk() { const p = SC.Profiles && SC.Profiles.cur(); return this.DRAFT + '.' + (p ? p.id : 0); },

  saveDraft(pack) { try { localStorage.setItem(this._dk(), JSON.stringify(pack)); } catch (e) {} },
  loadDraft() {
    try {
      const raw = localStorage.getItem(this._dk());
      if (!raw) return null;
      // draft đời đầu là chuỗi dataURL trần (chưa có drone) — vẫn đọc được
      return raw.charAt(0) === '{' ? JSON.parse(raw) : { ship: raw, drone: '' };
    } catch (e) { return null; }
  },

  /* Gọi từ system-level-finish khi THẮNG màn. Chỉ màn chia hết cho CHUNK, và mỗi
     màn chỉ phát một lần (cày lại màn cũ không ra thêm — lastLv chặn). */
  /* Cấp một từ khóa cho màn levelId nếu đủ điều kiện. `silent` = roll KÍN —
     kết quả chốt và LƯU ngay (F5 giữa màn gacha không đổi được vận mệnh), nhưng
     tên thì để màn quay số (ui-evo-gacha.js) vén màn cho kịch tính. Trả kw/null. */
  award(levelId, silent) {
    if (!this.active()) return null;     // kênh không gen được thì đừng nhặt từ khóa
    const e = this.st();
    if (levelId % this.CHUNK !== 0 || levelId <= e.lastLv) return null;
    e.lastLv = levelId;
    const kw = this._rollKw(e);
    SC.UI.save();
    if (!silent)
      SC.UI.toast(`TỪ KHÓA TIẾN HÓA: ${kw.vi.toUpperCase()} (${SC.EVO_KW.LABEL[kw.t]}) · ${e.kw.length % 3 || 3}/3`);
    return kw;
  },

  /* Roll + cất MỘT từ khóa theo công thức bộ đang dở. Dùng chung cho mảnh cuối màn
     VÀ phần thưởng bán tàu ở gara (system-evo-garage-sell.js). Chưa save. */
  _rollKw(e) {
    /* Mảnh ĐẦU của một bộ mới -> RNG luôn CÔNG THỨC của bộ (21/09/2026): bộ thường,
       bộ lai hai con vật, hay bộ mang phong cách nghệ thuật — xem SC.EVO_KW.RECIPES. */
    const viTriBo = e.kw.length % 3;
    if (viTriBo === 0)
      e.recipe = SC.EVO_KW.pickRecipe();
    const recipe = e.recipe || SC.EVO_KW.ORDER;
    const type = recipe[viTriBo];
    /* RNG có kiểm soát (21/09/2026, bị bắt quả tang trùng bộ): re-roll tối đa 10
       lần để (1) giá trị không xuất hiện trong BỘ NGAY TRƯỚC — đổi vị liên tục,
       (2) bộ lai thì con vật thứ hai phải KHÁC con thứ nhất, và (3) mảnh CUỐI
       không chốt thành tổ hợp đã từng ghép (progress.evo.hist). Hết 10 lần vẫn
       kẹt thì chấp nhận — thà trùng còn hơn treo. */
    const hist = e.hist || [];
    const truoc = (hist[hist.length - 1] || '').split('|');
    const boDang = e.kw.slice(e.kw.length - viTriBo);
    let kw;
    for (let thu = 0; thu < 10; thu++) {
      kw = SC.EVO_KW.roll(type);
      if (truoc.indexOf(kw.en) >= 0) continue;
      if (boDang.some(k => k.t === type && k.en === kw.en)) continue;   // gà + gà thì lai gì
      if (viTriBo === 2) {
        const to = [boDang[0].en, boDang[1].en, kw.en].join('|');
        if (hist.indexOf(to) >= 0) continue;
      }
      break;
    }
    e.kw.push(kw);
    return kw;
  },

  onWin(levelId) { this.award(levelId, false); },

  /* ---------- sinh ảnh ---------- */
  _endpoint() {
    let tk = '';
    try { tk = localStorage.getItem('sc.vkmToken') || ''; } catch (e) {}
    return tk
      ? { url: this.DEV + '/v1/images/generations', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + tk } }
      // nhãn text/plain + cookie: xem chú thích đầu file, đừng "sửa lại cho đúng"
      : { url: this.RELAY + '/v1/images/generations', headers: { 'content-type': 'text/plain' }, credentials: 'include' };
  },

  /* Mỗi lượt gen ra CẢ BỘ: tàu + drone hộ tống cùng theme (21/09/2026 — tàu mới
     mà phi đội cũ thì lệch tông). Hai ảnh chạy song song, một cái hỏng là hỏng cả
     lượt — thà vậy còn hơn nửa bộ lệch nhau. 2×$0.007/lượt, vẫn trong hạn mức. */
  /* kwsOverride: đúc lại ảnh cho tàu CŨ đã mất ảnh (system-evo-garage-recover.js) */
  async generate(signal, style, kwsOverride) {
    const kws = kwsOverride || this.st().kw.slice(0, 3);
    const ep = this._endpoint();
    /* Seed cá nhân cho lớp áo (livery): danh tính + hồ sơ + số lần tiến hóa —
       cùng bộ từ khóa nhưng khác người/khác lần là tàu khác nhau. */
    const prof = SC.Profiles.cur() || {};
    const seed = ((SC.M365 && SC.M365.info && SC.M365.info.email) || prof.name || 'phi cong')
      + '#' + (prof.id || 0) + '·' + (this.st().n || 0);
    const [ship, drone] = await Promise.all([
      // rolls đã trừ trước khi gọi mạng: 1 = lượt đầu, ≥2 = gen lại -> prompt siết top-down
      this._genOne(ep, SC.EVO_KW.prompt(kws, style, seed, this.st().rolls || 1), signal),
      this._genOne(ep, SC.EVO_KW.dronePrompt(kws, style), signal)
    ]);
    return { ship, drone };
  },

  async _genOne(ep, prompt, signal) {
    const res = await fetch(ep.url, {
      method: 'POST', headers: ep.headers, credentials: ep.credentials,
      body: JSON.stringify({ model: 'gpt-image-2.5-flare', prompt }),
      signal
    });
    const text = await res.text();
    if (!res.ok) {
      let code = '', msg = text.slice(0, 200);
      try { const j = JSON.parse(text); code = j.code || (j.error && j.error.code) || ''; msg = j.message || (j.error && j.error.message) || msg; } catch (e) {}
      if (code === 'game_not_registered')
        throw new Error('Game chưa được duyệt trên Innovation Center — nhờ người vận hành đăng ký origin này');
      throw new Error(msg || ('HTTP ' + res.status));
    }
    const j = JSON.parse(text);
    const b64 = j.data && j.data[0] && j.data[0].b64_json;
    if (!b64) throw new Error('Hạ tầng trả link thay vì ảnh');
    return 'data:image/png;base64,' + b64;
  },

  /* ---------- dùng ảnh làm máy bay ---------- */

  /* Đắp ảnh vào kho sprite rồi xoá cache dựng tàu — ShipArt tự nhuộm màu biến thể
     và vẽ hào quang lên trên, nên mọi tín hiệu của cây kỹ năng vẫn đọc được.
     Drone (nếu có) thay CẢ hai kind swarm/sniper — DroneArt đọc thẳng mỗi khung,
     không có buffer nên khỏi xoá cache gì thêm. */
  _apply(shipUrl, droneUrl) {
    const img = new Image();
    img.onload = () => {
      SC.SpriteArt._imgs['ship-player'] = img;
      if (SC.ShipArt) SC.ShipArt._cache = {};
    };
    img.src = shipUrl;
    if (droneUrl) {
      const di = new Image();
      di.onload = () => {
        SC.SpriteArt._imgs['drone-swarm'] = di;
        SC.SpriteArt._imgs['drone-sniper'] = di;
      };
      di.src = droneUrl;
    }
  },

  /* Người chơi bấm DÙNG LUÔN: lưu cả bộ CHO HỒ SƠ ĐANG MỞ, thay tàu + phi đội,
     ĐỐT bộ từ khóa */
  accept(pack) {
    const e = this.st();
    const kws = e.kw.slice(0, 3);
    const name = kws.map(k => k.vi).join(' ');
    // cất vào GARA (ảnh nén + sổ thuộc tính ẩn) — system-evo-garage.js
    SC.EvoGarage.add(pack, kws);
    this._apply(pack.ship, pack.drone);
    // sổ tổ hợp đã ghép — nguồn cho luật chống trùng ở award(); giữ 20 bộ gần nhất
    e.hist = (e.hist || []).slice(-19);
    e.hist.push(e.kw.slice(0, 3).map(k => k.en).join('|'));
    e.kw.splice(0, 3);
    e.n++;
    e.rolls = 0;                        // bộ từ khóa mới = hạn mức gen mới
    try { localStorage.removeItem(this._dk()); } catch (err) {}
    SC.UI.save();
    SC.Cloud.markDirty();
    SC.UI.toast('TIẾN HÓA HOÀN TẤT: ' + name.toUpperCase());
  },

  /* Trả tàu + phi đội về sprite GỐC (hồ sơ chưa tiến hóa). Tham chiếu ảnh gốc
     chụp một lần ở init — SpriteArt.load() đã tạo sẵn các Image này. */
  restoreDefault() {
    if (!this._orig) return;
    SC.SpriteArt._imgs['ship-player'] = this._orig.ship;
    SC.SpriteArt._imgs['drone-swarm'] = this._orig.swarm;
    SC.SpriteArt._imgs['drone-sniper'] = this._orig.sniper;
    if (SC.ShipArt) SC.ShipArt._cache = {};
  },

  /* Gọi mỗi khi ĐỔI/TẠO/XOÁ hồ sơ (ui-profile-panel._reloadProgress): tàu là của
     từng hồ sơ, đổi người là đổi tàu — bug 21/09: hồ sơ mới toanh vẫn bay tàu evo
     của hồ sơ trước vì key lưu dùng chung. */
  onProfileChange() { SC.EvoGarage.applyEquipped(); },

  /* Khởi động (hoãn 1 tick cho SC.Game.init nạp hồ sơ xong): chụp tham chiếu
     sprite gốc để còn đường quay về, rồi lên tàu của hồ sơ đang mở. Việc di trú
     kho đời trước nằm ở system-evo-garage-recover.js (applyEquipped gọi).
     BẪY ĐÃ SẬP (22/09/2026): bản trước chép thẳng 'sc.evoShip' (PNG gốc 4MB) sang
     key theo hồ sơ — trình duyệt phải giữ HAI bản 8MB, vượt hạn mức 5MB, setItem ném
     lỗi và bị nuốt, gara trắng trơn dù ảnh vẫn còn. Đừng chép ảnh thô giữa hai key. */
  init() {
    this._orig = {
      ship: SC.SpriteArt._imgs['ship-player'],
      swarm: SC.SpriteArt._imgs['drone-swarm'],
      sniper: SC.SpriteArt._imgs['drone-sniper']
    };
    this.onProfileChange();
    return this;
  }
};

/* Chờ DOMContentLoaded chứ KHÔNG setTimeout(0): script này parse TRƯỚC main.js (nơi
   SC.Profiles nạp) và trước cả system-evo-garage.js. Ở máy dev ~100 file nạp rời,
   trình duyệt nhường luồng giữa hai thẻ script nên setTimeout(0) có thể nổ trước khi
   gara kịp định nghĩa -> TypeError, không cứu tàu được (dính 22/09/2026).
   DOMContentLoaded chỉ nổ khi MỌI thẻ script đã chạy xong. */
if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', () => SC.EvoAI.init());
else setTimeout(() => SC.EvoAI.init(), 0);

;
/* ===== js/system-evo-shard.js ===== */
/* system-evo-shard.js — MẢNH TIẾN HÓA rơi từ kẻ địch cuối màn chunk-3
 *
 * Trước đây từ khóa được cộng THẦM lúc tổng kết — người chơi không thấy mình
 * "lượm" gì cả (phàn nàn 21/09/2026). Giờ nó là một ITEM thật: kẻ địch CUỐI CÙNG
 * của màn chia hết cho 3 (kể cả trùm) nổ ra mảnh 🧬 bay về tàu, chữ nổi to,
 * và màn tổng kết hiện tiến độ 1/3 → 3/3. Nhịp thiết kế: 9 màn = đủ bộ = một
 * lần thay áo chiến đấu cơ (tệ nhất 18 màn nếu bỏ lỡ popup).
 *
 * Lưới an toàn: mảnh auto-loot tự hút về tàu nên gần như không thể trượt, nhưng
 * nếu màn kết thúc trước khi nó bay tới nơi thì SC.EvoAI.onWin ở màn tổng kết
 * vẫn cộng bù — mảnh là LỚP TRÌNH DIỄN, sổ sách nằm ở progress.evo.
 */

SC.EvoShard = {
  level: 0,     // màn hiện tại còn mảnh chưa rơi (0 = màn này không có)

  /* main.startLevel gọi. Chỉ màn chia hết CHUNK, chưa từng phát, và kênh bật. */
  onLevelStart(id) {
    this.level = (SC.EvoAI.active() && id % SC.EvoAI.CHUNK === 0
      && id > SC.EvoAI.st().lastLv) ? id : 0;
  },

  /* system-combat.killEnemy gọi khi một kẻ địch gục và KHÔNG còn ai sống —
     kẻ cuối cùng (thường là trùm ở màn 6/12/18…) nhả mảnh ngay tại xác. */
  onLastKill(x, y) {
    if (!this.level) return;
    this.level = 0;
    SC.Items.drop(x, y, 'evoShard');
    SC.FX.text(x, y - 26, 'MẢNH TIẾN HÓA!', '#c58cff');
  },

  justGot: null,   // từ khóa roll KÍN trong màn này, chờ màn quay số vén màn

  /* system-combat.pickup case 'evoShard' — nhặt là roll từ khóa NGAY (chốt sổ,
     F5 không đổi được) nhưng TÊN thì giấu tới màn gacha sau khi thắng. */
  award(g, x, y) {
    this.justGot = SC.EvoAI.award(g.levelId, true) || this.justGot;
    SC.FX.burst(x, y, '#c58cff', 26, 280, 3.6);
    SC.Audio.gem();
    SC.Input.vibrate(40);
  },

  /* Finish (THẮNG) hỏi: màn này có từ khóa cần vén màn không? Gộp luôn trường hợp
     mảnh chưa kịp bay tới nơi lúc màn kết thúc — roll bù tại đây, vẫn kín. */
  takeReveal(levelId) {
    let kw = this.justGot;
    this.justGot = null;
    if (!kw) kw = SC.EvoAI.award(levelId, true);
    return kw;
  },

  /* THUA sau khi đã nhặt mảnh: từ khóa vẫn là của người chơi (đã nhặt mà), nhưng
     không có màn quay số cho trận thua — vén màn bằng toast thường cho xong sổ. */
  flushLose() {
    const kw = this.justGot;
    this.justGot = null;
    if (kw) SC.UI.toast(`TỪ KHÓA TIẾN HÓA: ${kw.vi.toUpperCase()} (${SC.EVO_KW.LABEL[kw.t]})`);
  },

  /* Dòng tiến độ cho màn tổng kết: "Mảnh tiến hóa 2/3". kw dồn theo bộ 3 —
     đủ 3 chưa tiêu thì là 3/3 (ĐỦ BỘ), bộ kế đang nhặt thì đếm phần dư. */
  progress() {
    const n = SC.EvoAI.st().kw.length;
    return n === 0 ? 0 : (n % 3 || 3);
  }
};

/* Mảnh vào bảng vật phẩm với trọng số 0: KHÔNG BAO GIỜ rơi ngẫu nhiên từ quái
   thường (_roll cộng theo w), chỉ SC.Items.drop(..., 'evoShard') chủ động nhả. */
SC.ITEM_DEF.push({ k: 'evoShard', w: 0, c: '#c58cff', ic: '🧬' });

;
/* ===== js/system-evo-garage.js ===== */
/* system-evo-garage.js — GARA chiến đấu cơ tiến hóa + thuộc tính ẩn (22/09/2026)
 *
 * Tàu gen từ AI là TÀI SẢN QUÝ và độc nhất của người chơi, nên:
 *   - mọi tàu từng ghép đều được giữ lại, chọn lại được bất cứ lúc nào (gara);
 *   - mỗi tàu kích hoạt 3 THUỘC TÍNH ẨN (+1% mỗi từ khóa) và CỘNG DỒN qua mọi tàu
 *     đã sở hữu, kể cả khi đang bay tàu khác;
 *   - CÂN BẰNG ĐỘNG: tàu mới làm quái mạnh DẦN lên tương ứng trong 1-6 màn (ngẫu nhiên)
 *     rồi bù hết — người chơi được "phê" một nhịp rồi về đúng nhịp cân bằng cũ.
 *
 * Hai lớp lưu trữ, CỐ Ý tách:
 *   - progress.evo.owned (sổ tàu: từ khóa, chỉ số, màn mở khoá) — nhỏ, theo mây;
 *   - localStorage 'sc.evoGarage.<id hồ sơ>' (ảnh webp đã nén) — nặng, theo máy.
 *   Ảnh gốc PNG 1024px ~1.5MB, nhét nguyên vào localStorage (~5MB) được 3 tàu là hết
 *   chỗ; nén về webp 256px còn ~20-40KB.
 */

SC.EvoGarage = {
  KEY: 'sc.evoGarage',
  STATS: ['hp', 'atk', 'drone', 'armor'],
  STAT_VI: { hp: 'MÁU', atk: 'SÁT THƯƠNG', drone: 'PHI ĐỘI', armor: 'GIÁP' },
  /* con vật + CLASS quyết thuộc tính theo "tính loài / vai" — nhìn tàu là đoán được nó
     mạnh gì. Mục không có ở đây rơi về băm en (statsOf). KHOÁ theo en: đổi là đổi
     thuộc tính tàu người chơi đang có. */
  ANIMAL_STAT: { panda: 'hp', 't-rex dinosaur': 'hp', rooster: 'armor', dragon: 'armor',
    shark: 'atk', wolf: 'atk', eagle: 'atk', cat: 'atk',
    owl: 'drone', octopus: 'drone', bee: 'drone', fox: 'drone',
    hen: 'hp', 'baby chick': 'drone', 'fighting gamecock': 'atk', bulldog: 'armor', corgi: 'hp',
    lion: 'atk', tiger: 'atk', rhino: 'armor', 'black tortoise': 'armor', 'white tiger': 'atk',
    'azure dragon': 'armor', 'vermilion bird': 'atk', phoenix: 'hp', 'nine-tailed fox': 'drone',
    // class
    warrior: 'atk', swordsman: 'atk', archer: 'drone', mage: 'drone', 'paladin knight': 'armor',
    'ninja assassin': 'atk', gunslinger: 'atk', guardian: 'armor', summoner: 'drone',
    cleric: 'hp', berserker: 'hp', dragoon: 'armor',
    // khung máy bay chiến đấu (22/09) — khung không có ở đây thì băm en
    'stealth fighter': 'atk', 'mach 3 interceptor': 'atk', 'heavy gunship': 'hp',
    'drone carrier jet': 'drone', 'flying wing bomber': 'armor', 'transforming variable fighter': 'armor' },

  _k() { const p = SC.Profiles.cur(); return this.KEY + '.' + (p ? p.id : 0); },
  owned() { return (SC.UI.progress.evo && SC.UI.progress.evo.owned) || []; },

  /* 3 từ khóa -> 3 lần +1%: con vật theo tính loài, còn lại theo băm từ khóa */
  statsOf(ens) {
    const s = { hp: 0, atk: 0, drone: 0, armor: 0 };
    ens.forEach(en => { s[this.ANIMAL_STAT[en] || this.STATS[SC.EVO_KW._hash(en) % 4]] += 1; });
    return s;
  },

  /* tổng % của một thuộc tính trên MỌI tàu đã sở hữu */
  pct(stat) { return this.owned().reduce((a, o) => a + ((o.stats && o.stats[stat]) || 0), 0); },
  mul(stat) { return 1 + this.pct(stat) / 100; },
  totalPct() { return this.STATS.reduce((a, s) => a + this.pct(s), 0); },

  /* % đã "ngấm" vào độ khó ở màn lv: mỗi tàu ngấm tuyến tính trong span màn sau khi mở */
  _ramp(stat, lv) {
    return this.owned().reduce((a, o) =>
      a + ((o.stats && o.stats[stat]) || 0) * SC.clamp((lv - o.lv) / (o.span || 1), 0, 1), 0);
  },
  /* sức công của người chơi (súng + một phần phi đội) -> quái trâu hơn tương ứng */
  enemyHpMul(lv) { return (1 + this._ramp('atk', lv) / 100) * (1 + this._ramp('drone', lv) * 0.3 / 100); },
  /* sức thủ (máu + giáp) -> quái đánh đau hơn tương ứng */
  enemyDmgMul(lv) { return (1 + this._ramp('hp', lv) / 100) * (1 + this._ramp('armor', lv) / 100); },

  /* ---------- ảnh trong máy ---------- */
  images() { try { return JSON.parse(localStorage.getItem(this._k()) || '[]'); } catch (e) { return []; } },
  _saveImages(list) {
    try { localStorage.setItem(this._k(), JSON.stringify(list)); return true; }
    catch (e) { return false; }                  // hết chỗ: tàu vẫn có trong sổ, chỉ thiếu ảnh
  },
  /* ảnh bản đẹp ở máy này; không có thì ảnh thu nhỏ trong sổ (theo mây) — xem
     system-evo-garage-recover.js */
  imageOf(id) {
    const im = this.images().find(x => x.id === id);
    if (im) return im;
    const o = this.owned().find(x => x.id === id);
    return o && o.thumb ? { id, ship: o.thumb, drone: '' } : null;
  },

  /* nén dataURL về webp vuông size px — ảnh AI có alpha nên KHÔNG dùng jpeg */
  compress(url, size) {
    return new Promise(res => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = c.height = size;
        c.getContext('2d').drawImage(img, 0, 0, size, size);
        try { res(c.toDataURL('image/webp', 0.86)); } catch (e) { res(url); }
      };
      img.onerror = () => res(url);
      img.src = url;
    });
  },

  /* Ghép xong một bộ: ghi sổ (chỉ số + nhịp cân bằng) rồi cất ảnh nén vào gara */
  async add(pack, kws) {
    const e = SC.EvoAI.st();
    const id = 'e' + Date.now().toString(36);
    const ens = kws.map(k => k.en);
    if (!e.owned) e.owned = [];
    const o = { id, ens, names: kws.map(k => k.vi), stats: this.statsOf(ens),
      lv: SC.UI.progress.unlocked || 1, span: 1 + ((Math.random() * 6) | 0), at: Date.now() };
    e.owned.push(o);
    e.equip = id;
    // ghép lại đúng tổ hợp từng bán -> gỡ khỏi danh sách bán, không thì bị lọc mất
    if (e.sold) e.sold = e.sold.filter(k => k !== ens.join('|'));
    SC.UI.save();
    // ảnh bản đẹp vào máy + ảnh thu nhỏ vào sổ (theo mây) — mất máy vẫn còn tàu
    await SC.EvoRecover.attach(o, pack.ship, pack.drone);
    // trong lúc chờ nén, đồng bộ mây có thể đã thay cả progress — gắn lại tàu vào sổ mới
    const e2 = SC.EvoAI.st();
    if (!e2.owned) e2.owned = [];
    if (!e2.owned.some(x => x.id === id)) { e2.owned.push(o); e2.equip = id; }
    SC.UI.save();
    SC.Cloud.markDirty();
    return id;
  },

  equip(id) {
    const e = SC.EvoAI.st();
    e.equip = id || null;
    SC.UI.save();
    SC.Cloud.markDirty();
    this.applyEquipped();
  },

  /* Lên tàu đang chọn của hồ sơ đang mở; chưa chọn / thiếu ảnh -> tàu nguyên bản */
  applyEquipped() {
    // cứu kho đời trước (nếu còn) TRƯỚC khi lên tàu — xem system-evo-garage-recover.js
    SC.EvoRecover.migrate().catch(() => {}).then(() => {
      const e = SC.UI.progress.evo;
      const im = e && e.equip ? this.imageOf(e.equip) : null;
      if (im) SC.EvoAI._apply(im.ship, im.drone || '');
      else SC.EvoAI.restoreDefault();
      if (SC.GarageUI && SC.UI.el.garage && !SC.UI.el.garage.classList.contains('hidden'))
        SC.GarageUI.build();
    });
  }
};

;
/* ===== js/system-evo-garage-recover.js ===== */
/* system-evo-garage-recover.js — cứu tàu tiến hóa, không để tài sản của người chơi mất
 *
 * Ba lớp, xếp từ rẻ tới đắt:
 *   1. migrate(): dựng sổ gara từ lịch sử tổ hợp (progress.evo.hist, theo mây) + cứu ảnh
 *      từ các kho đời trước ('sc.evoShip' chung, 'sc.evoShip.<id>' theo hồ sơ).
 *   2. thumb: mỗi tàu kèm ảnh thu nhỏ ~10KB NGAY TRONG SỔ -> theo mây + gương M365, đổi
 *      máy hay xoá dữ liệu trình duyệt vẫn còn tàu để bay (system-evo-garage.add ghi).
 *   3. recast(): tàu không còn ảnh ở đâu cả -> đúc lại từ ĐÚNG tổ hợp cũ, miễn phí một
 *      lần mỗi chiếc (thuộc tính ẩn giữ nguyên, chỉ vẽ lại hình).
 *
 * BẪY ĐÃ SẬP (22/09/2026): kho cũ lưu PNG gốc ~4MB; chép sang key mới khi bản cũ còn
 * nằm đó = 8MB > hạn mức 5MB, setItem ném lỗi bị nuốt, gara trắng trơn. Ở đây đọc vào
 * bộ nhớ -> XOÁ key cũ TRƯỚC -> nén -> mới ghi.
 */

SC.EvoRecover = {
  THUMB: 160,        // cạnh ảnh thu nhỏ nằm trong sổ (theo mây)
  TYPES: ['animal', 'frame', 'class', 'trait', 'color', 'style'],   // thêm loại mới thì thêm ở đây

  /* loại từ khóa theo giá trị en — sổ cũ chỉ lưu en, prompt cần biết t */
  _kwOf(en) {
    for (const t of this.TYPES) {
      const it = (SC.EVO_KW[t] || []).find(x => x.en === en);
      if (it) return { t, en, vi: it.vi, dna: it.dna };
    }
    return { t: 'trait', en, vi: en };
  },

  _raw() {
    for (const k of [SC.EvoAI._sk(), SC.EvoAI.STORE]) {
      try { const v = localStorage.getItem(k); if (v) return { k, v }; } catch (e) {}
    }
    return null;
  },

  /* BA LUẬT rút ra từ sự cố 22/09/2026 (cứu hộ bản 1 ghi đè mất ảnh tàu cá mập):
   *   1. Tổ hợp nào trong lịch sử CHƯA có trong sổ thì LUÔN bổ sung — bản 1 chỉ dựng
   *      lại khi sổ trống, sổ có 1 tàu mới là bỏ luôn 3 tàu cũ.
   *   2. Ảnh kho cũ chỉ gắn vào tàu KHỚP TÊN mà CHƯA CÓ ẢNH; không khớp thì lập TÀU MỚI
   *      cho nó. KHÔNG BAO GIỜ đè ảnh của tàu đang có — bản 1 "không khớp thì gắn tàu
   *      cuối" đã xoá ảnh cá mập vừa ghép.
   *   3. Đọc lại SC.EvoAI.st() SAU mỗi lần await: lúc chờ nén ảnh, đồng bộ mây có thể
   *      thay cả SC.UI.progress bằng object mới — ghi vào object cũ là ghi vào hư không.
   */
  _key(ens) { return (ens || []).join('|'); },

  _mergeHist(e) {
    if (!e.owned) e.owned = [];
    let them = 0;
    (e.hist || []).forEach(h => {
      if (e.owned.some(o => this._key(o.ens) === h)) return;
      if (e.sold && e.sold.indexOf(h) >= 0) return;      // đã bán ở gara — đừng hồi sinh
      const ens = h.split('|');
      e.owned.push({ id: 'h' + SC.EVO_KW._hash(h).toString(36), ens,
        names: ens.map(en => this._kwOf(en).vi), stats: SC.EvoGarage.statsOf(ens),
        lv: 0, span: 1, at: 0 });
      them++;
    });
    return them;
  },

  /* tên kho cũ ("cú mèo dữ dằn hồng xung") -> bộ từ khóa, dò theo tên tiếng Việt dài
     nhất trước để "cú mèo" không bị hiểu thành "mèo" */
  _parseName(name) {
    const all = [];
    for (const t of this.TYPES)
      (SC.EVO_KW[t] || []).forEach(x => all.push({ t, en: x.en, vi: x.vi }));
    all.sort((a, b) => b.vi.length - a.vi.length);
    let s = ' ' + String(name || '').toLowerCase() + ' ';
    const ens = [];
    for (const k of all) {
      const v = ' ' + k.vi.toLowerCase() + ' ';
      if (s.includes(v)) { ens.push(k.en); s = s.replace(v, ' '); }
    }
    return ens;
  },

  /* BẢN VÁ MỘT LẦN cho đúng sự cố 22/09/2026 (hồ sơ ducdm trên banga): cứu hộ bản 1
     dán ảnh CÚ MÈO · DỮ DẰN · HỒNG XUNG (tàu đời đầu, trước khi có hist) đè lên tàu
     cá mập vừa ghép id 'emubiy043'. Tách ảnh về đúng chủ, trả cá mập về "chưa có
     ảnh" để ĐÚC LẠI. Khoá theo id cụ thể + cờ fix0922: không đụng dữ liệu ai khác. */
  _fix0922(e) {
    if (e.fix0922) return false;
    e.fix0922 = 1;
    const ca = (e.owned || []).find(o => o.id === 'emubiy043');
    if (!ca || !ca.thumb) return true;
    const ens = ['owl', 'fierce, angry battle face', 'hot pink'];
    const owl = { id: 'Lowl', ens, names: ['cú mèo', 'dữ dằn', 'hồng xung'],
      stats: SC.EvoGarage.statsOf(ens), lv: 0, span: 1, at: 0, thumb: ca.thumb };
    const imgs = SC.EvoGarage.images();
    const im = imgs.find(x => x.id === 'emubiy043');
    if (im) im.id = 'Lowl';
    SC.EvoGarage._saveImages(imgs);
    delete ca.thumb; ca.recast = 0;
    e.owned.unshift(owl);
    if (e.equip === 'emubiy043') e.equip = 'Lowl';
    return true;
  },

  async migrate() {
    const e0 = SC.EvoAI.st();
    const raw = this._raw();
    const fixed = this._fix0922(e0);
    const them = this._mergeHist(e0) + (fixed ? 1 : 0);
    if (!raw) { if (them) { SC.UI.save(); SC.Cloud.markDirty(); } return; }

    // cứu ảnh kho cũ — đọc vào bộ nhớ, XOÁ key TRƯỚC để trả chỗ, rồi mới nén + ghi
    let o = null;
    try { o = JSON.parse(raw.v); } catch (x) {}
    try { localStorage.removeItem(raw.k); } catch (x) {}
    if (!o || !o.dataUrl) { SC.UI.save(); return; }

    const imgs = SC.EvoGarage.images();
    const coAnh = x => imgs.some(i => i.id === x.id) || x.thumb;
    let target = e0.owned.find(x => (x.names || []).join(' ') === o.name && !coAnh(x));
    if (!target) {
      const ens = this._parseName(o.name);
      target = { id: 'L' + Date.now().toString(36), ens,
        names: ens.length ? ens.map(en => this._kwOf(en).vi) : ['TÀU ĐỜI ĐẦU'],
        stats: ens.length ? SC.EvoGarage.statsOf(ens) : { hp: 1, atk: 1, drone: 1, armor: 0 },
        lv: 0, span: 1, at: o.at || 0 };
      e0.owned.push(target);
    }
    await this.attach(target, o.dataUrl, o.droneUrl || '');
    const e = SC.EvoAI.st();                   // luật 3: object có thể đã bị thay
    if (e !== e0) { this._mergeHist(e); if (!e.owned.some(x => x.id === target.id)) e.owned.push(target); }
    if (!e.equip) e.equip = target.id;
    SC.UI.save();
    SC.Cloud.markDirty();
  },

  /* Cất ảnh cho một tàu: bản 256px vào gara máy này + bản thu nhỏ vào sổ (theo mây) */
  async attach(o, ship, drone) {
    const [big, dr, th] = await Promise.all([
      SC.EvoGarage.compress(ship, 256),
      drone ? SC.EvoGarage.compress(drone, 128) : '',
      SC.EvoGarage.compress(ship, this.THUMB)
    ]);
    const list = SC.EvoGarage.images().filter(x => x.id !== o.id);
    list.push({ id: o.id, ship: big, drone: dr });
    SC.EvoGarage._saveImages(list);
    o.thumb = th;
  },

  /* Tàu này đúc lại được không: kênh có tiến hóa, có tổ hợp, chưa đúc lần nào */
  canRecast(o) { return SC.EvoAI.active() && o.ens && o.ens.length && !o.recast; },

  async recast(id) {
    const e = SC.EvoAI.st();
    const o = (e.owned || []).find(x => x.id === id);
    if (!o || !this.canRecast(o)) return false;
    o.recast = 1;                          // đánh dấu TRƯỚC khi gọi mạng: F5 không đúc thêm được
    SC.UI.save();
    let pack;
    try {
      pack = await SC.EvoAI.generate(undefined, undefined, o.ens.map(en => this._kwOf(en)));
    } catch (err) {
      o.recast = 0;                        // lỗi mạng: trả lượt, đây là tài sản của người chơi
      SC.UI.save();
      throw err;
    }
    await this.attach(o, pack.ship, pack.drone);
    SC.UI.save();
    SC.Cloud.markDirty();
    if (e.equip === id) SC.EvoGarage.applyEquipped();
    return true;
  }
};

;
/* ===== js/system-evo-garage-sell.js ===== */
/* system-evo-garage-sell.js — DỌN GARA: bán chiến đấu cơ không ưng (22/09/2026)
 *
 * Bán = mất tàu + mất thuộc tính ẩn của nó (thuộc tính tính động từ sổ owned nên
 * xoá khỏi sổ là tự mất, cân bằng động cũng tự hạ theo). Nhận về: 1 TỪ KHÓA (quay
 * máy gacha như mảnh cuối màn) + 3000 vàng.
 *
 * BẪY PHẢI CHẶN — tàu đã bán tự SỐNG LẠI qua hai đường:
 *   1. EvoRecover._mergeHist dựng lại tàu từ lịch sử tổ hợp (hist) mỗi lần khởi động.
 *   2. cloud-adapter.adopt GỘP sổ mây cũ (còn tàu) với sổ máy.
 * Nên ghi tổ hợp đã bán vào `evo.sold` (theo mây), hai chỗ trên lọc theo nó. Hist thì
 * GIỮ NGUYÊN — nó còn lo chống roll trùng tổ hợp cũ, đúng ý người vừa chê tàu đó.
 * Ghép lại đúng tổ hợp đó (hiếm) thì EvoGarage.add gỡ khỏi sold.
 */

SC.EvoSell = {
  GOLD: 3000,

  key(o) { return (o.ens || []).join('|'); },

  isSold(e, o) { return !!(e.sold && o.ens && e.sold.indexOf(this.key(o)) >= 0); },

  /* bán được: có kênh tiến hóa, không phải tàu nguyên bản (id rỗng), có trong sổ */
  canSell(id) {
    return SC.EvoAI.active() && !!id && SC.EvoGarage.owned().some(o => o.id === id);
  },

  /* Trả từ khóa vừa nhận (để UI diễn gacha) hoặc null nếu không bán được. Mọi thay
     đổi sổ sách chốt + save TRƯỚC khi diễn — F5 giữa màn quay không mất phần thưởng. */
  sell(id) {
    if (!this.canSell(id)) return null;
    const e = SC.EvoAI.st();
    const o = e.owned.find(x => x.id === id);
    const dangBay = e.equip === id;

    // tàu bị bán gia nhập quân địch (kho chung trên mây) — lấy ảnh TRƯỚC khi xoá khỏi gara
    const im = SC.EvoGarage.imageOf(id);
    SC.Defectors.publish(o, im && im.ship);
    e.owned = e.owned.filter(x => x.id !== id);
    if (o.ens && o.ens.length) {
      e.sold = (e.sold || []).filter(k => k !== this.key(o));
      e.sold.push(this.key(o));
    }
    SC.EvoGarage._saveImages(SC.EvoGarage.images().filter(x => x.id !== id));

    SC.UI.progress.coin = (SC.UI.progress.coin || 0) + this.GOLD;
    const kw = SC.EvoAI._rollKw(e);
    SC.UI.save();
    SC.Cloud.markDirty();
    // đang bay đúng chiếc vừa bán -> về tàu nguyên bản (equip tự save + dựng lại sprite)
    if (dangBay) SC.EvoGarage.equip(null);
    return kw;
  }
};

;
/* ===== js/system-defector-grade.js ===== */
/* system-defector-grade.js — CHẤM HẠNG tàu bị bán trước khi nó gia nhập hàng ngũ địch
 *
 * Tàu đẹp, chi tiết, hoành tráng -> đủ tư cách làm TRÙM ở vòng vô tận; tàu đơn giản
 * -> quái thường. Chấm NGAY LÚC BÁN, trên máy người bán, lưu điểm vào tài liệu mây —
 * máy người chơi khác chỉ đọc hạng, không phải tính lại.
 *
 * Chỉ số chính = VÂN CHI TIẾT: tỉ lệ điểm ảnh (trong thân tàu) có độ cong sáng
 * Laplacian > 60 ở khung 192px. Mảng màu phẳng kiểu toon cho ~0, giáp chạm khắc
 * viền vàng cho cao.
 * BẪY ĐÃ ĐO (22/09/2026): bản đầu dùng chênh sáng hai điểm kề nhau ở 96px — bão hoà,
 * drone 128px đơn giản cũng ăn 0.74 ngang tàu Yu-Gi-Oh. Laplacian@192 tách rõ:
 * drone 0.08 · tàu toon cũ 0.25 · tàu gốc 0.35 · tàu Yu-Gi-Oh 0.36-0.54.
 * Phụ: điểm sáng (năng lượng phát quang), độ rực màu, độ phủ khung. Cộng thêm cho
 * linh thú huyền thoại và bộ lai hai con vật (quái dung hợp).
 */

SC.DefectorGrade = {
  BOSS_AT: 0.75,     // mẫu 22/09: bạch hổ 1.01, bulldog 0.77 -> trùm; gà mái 0.74, corgi 0.68, cú toon 0.47 -> quái
  N: 192,
  LEGEND: ['dragon', 'phoenix', 'unicorn', 'griffin', 'nine-tailed fox', 'azure dragon',
    'white tiger', 'vermilion bird', 'black tortoise'],

  /* img: Image đã tải xong. ens: bộ từ khóa (en). Trả { score, tier, f } */
  grade(img, ens) {
    const N = this.N, c = document.createElement('canvas');
    c.width = c.height = N;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0, N, N);
    const d = g.getImageData(0, 0, N, N).data;
    const L = new Float32Array(N * N), op = new Uint8Array(N * N);
    let cnt = 0, bright = 0, srg = 0, syb = 0, qrg = 0, qyb = 0;
    for (let i = 0; i < N * N; i++) {
      const r = d[i * 4], gg = d[i * 4 + 1], b = d[i * 4 + 2];
      L[i] = 0.299 * r + 0.587 * gg + 0.114 * b;
      if (d[i * 4 + 3] < 200) continue;
      op[i] = 1; cnt++;
      if (L[i] > 200) bright++;
      const rg = r - gg, yb = 0.5 * (r + gg) - b;
      srg += rg; syb += yb; qrg += rg * rg; qyb += yb * yb;
    }
    if (!cnt) return { score: 0, tier: 'mob', f: {} };
    let inner = 0, tex = 0;
    for (let y = 1; y < N - 1; y++) for (let x = 1; x < N - 1; x++) {
      const i = y * N + x;
      if (!op[i] || !op[i - 1] || !op[i + 1] || !op[i - N] || !op[i + N]) continue;
      inner++;
      if (Math.abs(4 * L[i] - L[i - 1] - L[i + 1] - L[i - N] - L[i + N]) > 60) tex++;
    }
    const mrg = srg / cnt, myb = syb / cnt;
    const sd = Math.sqrt(Math.max(0, qrg / cnt - mrg * mrg) + Math.max(0, qyb / cnt - myb * myb));
    const f = {
      tex: Math.min(1, (inner ? tex / inner : 0) / 0.5),
      bright: Math.min(1, bright / cnt / 0.15),
      color: Math.min(1, (sd + 0.3 * Math.sqrt(mrg * mrg + myb * myb)) / 150),
      cover: Math.min(1, cnt / (N * N) / 0.4)
    };
    let score = 0.6 * f.tex + 0.15 * f.bright + 0.15 * f.color + 0.1 * f.cover;
    const ks = ens || [];
    if (ks.some(k => this.LEGEND.indexOf(k) >= 0)) score += 0.1;
    if (ks.filter(k => SC.EVO_KW.animal.some(a => a.en === k)).length >= 2) score += 0.05;
    score = +score.toFixed(3);
    return { score, tier: score >= this.BOSS_AT ? 'boss' : 'mob', f };
  }
};

;
/* ===== js/system-defector-pool.js ===== */
/* system-defector-pool.js — KHO TÀU PHẢN BỘI: tàu người chơi bán ở gara gia nhập quân địch
 *
 * Mỗi lần AI đó bán tàu (system-evo-garage-sell.js), tàu được chấm hạng
 * (system-defector-grade.js) rồi đẩy lên Firestore `defectors/{uid}_{idTàu}` — kho
 * CHUNG của mọi người chơi. Máy nào vào trận cũng đọc 60 tàu mới nhất làm quân địch
 * (system-defector-spawn.js).
 *
 * Chỉ kênh có tiến hóa (SC.EvoAI.active, tức zingplay.dev): portal công khai không có
 * gara nên cũng không có tàu phản bội — giữ nguyên nguyên tắc "portal không thấy evo".
 *
 * Tàu CỦA MÌNH bán ra được giữ thêm ở máy (`sc.defectors.mine`, tối đa 8, ảnh 160px):
 *   - thấy ngay tàu mình vừa bán trong trận kế, không phải đợi mây;
 *   - đẩy mây lỗi (mất mạng, luật Firestore chưa dán) thì còn bản chờ, lần nạp sau
 *     đẩy lại. Doc id cố định theo uid+tàu nên đẩy lại không nhân bản.
 * Tài liệu có `seller` = phần trước @ của email (KHÔNG bao giờ cả email) để thỉnh thoảng
 * trùm phản bội khoe "PHẢN ĐỒ CỦA ducdm" — duyệt 22/09/2026.
 */

SC.Defectors = {
  COL: 'defectors',
  LIMIT: 60,
  MINE: 'sc.defectors.mine',
  MINE_MAX: 8,
  pool: [],            // { id, img:Image, tier, score, cls, ens, bird }
  _p: null,

  BIRDS: ['rooster', 'hen', 'baby chick', 'fighting gamecock', 'owl', 'eagle', 'phoenix',
    'vermilion bird', 'pterodactyl', 'griffin'],

  _mine() { try { return JSON.parse(localStorage.getItem(this.MINE) || '[]'); } catch (e) { return []; } },
  _saveMine(l) { try { localStorage.setItem(this.MINE, JSON.stringify(l.slice(-this.MINE_MAX))); } catch (e) {} },

  /* dữ liệu thô (mây hoặc máy) -> mục trong pool, ảnh tải nền; chưa tải xong thì spawn bỏ qua */
  /* khoá theo TÀU: bản máy 'm_<idTàu>' và bản mây '<uid>_<idTàu>' là cùng một chiếc */
  _key(id) { return id.startsWith('m_') ? id.slice(2) : id.slice(id.indexOf('_') + 1); },

  _add(d) {
    if (!d || !d.img || typeof d.img !== 'string') return;
    const k = this._key(String(d.id));
    if (this.pool.some(x => this._key(x.id) === k)) return;
    const img = new Image();
    img.src = d.img;
    const ens = Array.isArray(d.ens) ? d.ens : [];
    this.pool.push({ id: d.id, img, tier: d.tier === 'boss' ? 'boss' : 'mob', score: +d.score || 0,
      at: +d.at || 0,                  // thứ tự bán — trùm phản bội rải map theo thứ tự này
      cls: d.cls || '', ens, names: Array.isArray(d.names) ? d.names : [],
      seller: typeof d.seller === 'string' ? d.seller : '',
      bird: ens.some(e => this.BIRDS.indexOf(e) >= 0) });
  },

  ready(tier) {
    return this.pool.filter(x => x.img.complete && x.img.naturalWidth && (!tier || x.tier === tier));
  },

  /* Nạp một lần mỗi phiên (Waves.start gọi mỗi màn, lần sau trả luôn promise cũ) */
  load() {
    if (this._p) return this._p;
    if (!SC.EvoAI.active()) return (this._p = Promise.resolve());
    this._mine().forEach(d => this._add(d));
    if (!Portal.FB.configured()) return (this._p = Promise.resolve());
    this._p = (async () => {
      try {
        const fb = await this._auth();
        const { collection, query, orderBy, limit, getDocs } = fb.fsM;
        const snap = await Portal.FB.limit(getDocs(query(collection(fb.db, this.COL),
          orderBy('at', 'desc'), limit(this.LIMIT))), 'đọc tàu phản bội');
        snap.forEach(s => this._add(Object.assign({ id: s.id }, s.data())));
        this._retry(fb);
      } catch (e) {
        console.warn('[defectors] chưa đọc được kho tàu phản bội:', (e && e.code) || e);
        this._p = null;                   // lần vào màn sau thử lại
      }
    })();
    return this._p;
  },

  /* vé anonymous của M365 có thể chưa kịp cấp lúc vào màn đầu — đợi tối đa ~8 giây */
  async _auth() {
    const fb = await Portal.FB.load();
    for (let i = 0; i < 16 && !fb.auth.currentUser; i++) await new Promise(r => setTimeout(r, 500));
    if (!fb.auth.currentUser) throw Object.assign(new Error('chưa có vé'), { code: 'no-auth' });
    return fb;
  },

  /* Gọi lúc BÁN (trước khi xoá ảnh khỏi gara). url = ảnh tàu, ưu tiên bản 256px. */
  async publish(o, url) {
    if (!SC.EvoAI.active() || !url) return;
    try {
      const im = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
      const g = SC.DefectorGrade.grade(im, o.ens);
      const cls = (o.ens || []).find(e => SC.EVO_KW.class.some(c => c.en === e)) || '';
      const d = { id: 'm_' + o.id, img: await SC.EvoGarage.compress(url, 192), ens: (o.ens || []).slice(0, 4),
        names: (o.names || []).slice(0, 4).map(n => String(n).slice(0, 24)), cls, tier: g.tier,
        score: g.score, at: Date.now(), up: 0, seller: this._seller() };
      this._add(d);
      const mine = this._mine().filter(x => x.id !== d.id);
      mine.push(d);
      this._saveMine(mine);
      if (Portal.FB.configured()) this._upload(await this._auth(), d).catch(() => {});
    } catch (e) {
      console.warn('[defectors] không đẩy được tàu vừa bán:', (e && e.code) || e);
    }
  },

  /* Tên người bán cho câu "PHẢN ĐỒ CỦA ducdm" (22/09/2026, anh Đức duyệt: lộ tên nội bộ
     cho vui). Chỉ phần trước @ của email M365 — không bao giờ cả email; ngoài M365 thì
     tên hồ sơ. Lọc ký tự điều khiển/thẻ như safeName của portal-cloud. */
  _seller() {
    const em = SC.M365 && SC.M365.info && SC.M365.info.email;
    const s = em ? String(em).split('@')[0] : SC.Cloud.playerName();
    return String(s || '').replace(/[\x00-\x1F<>]/g, '').slice(0, 24);
  },

  async _upload(fb, d) {
    const uid = fb.auth.currentUser.uid;
    const { doc, setDoc } = fb.fsM;
    await Portal.FB.limit(setDoc(doc(fb.db, this.COL, uid + '_' + d.id.slice(2)), {
      img: d.img, ens: d.ens, names: d.names, cls: d.cls, tier: d.tier, score: d.score, at: d.at, by: uid,
      seller: d.seller || ''
    }), 'đẩy tàu phản bội');
    this._saveMine(this._mine().map(x => (x.id === d.id ? Object.assign(x, { up: 1 }) : x)));
  },

  _retry(fb) {
    this._mine().filter(x => !x.up).forEach(d => this._upload(fb, d).catch(e => {
      // doc đã tồn tại (lần trước đẩy xong mà chưa kịp đánh dấu) -> luật chặn update, coi như xong
      if (e && String(e.code).includes('permission'))
        this._saveMine(this._mine().map(x => (x.id === d.id ? Object.assign(x, { up: 1 }) : x)));
    }));
  }
};

;
/* ===== js/system-defector-spawn.js ===== */
/* system-defector-spawn.js — đưa TÀU PHẢN BỘI (system-defector-pool.js) vào trận
 *
 * LUẬT (chốt 22/09/2026):
 *   - Chiến dịch (màn 1-60): tàu phản bội CHỈ là quái thường, mọi hạng. Nó KHOÁC ẢNH
 *     lên đúng con quái nó thế chỗ: giữ máu, tốc, kiểu bay, đường đạn — không đụng cân bằng.
 *   - Vòng vô tận (61+): hạng 'mob' làm quái thường, hạng 'boss' làm TRÙM (thay tạo hình
 *     trùm của map). Đường đạn đổi theo CLASS của tàu (cung thủ bắn tên, pháp sư cầu
 *     plasma...) nhưng GIỮ số viên, tốc độ, nhịp bắn — cân bằng vô tận không đổi.
 *   - TRẦN: tối đa 50% quân một wave. Tỉ lệ động, gieo theo SỐ MAP: mỗi map một "khẩu
 *     vị" cố định (map này nhiều, map kia ít), từng wave dao động quanh mức đó.
 */

SC.DefectorSpawn = {
  CAP: 0.5,
  BOSS_CHANCE: 0.9,    // vòng vô tận: xác suất map trùm được giao tàu phản bội (duyệt 22/09)
  SELLER_CHANCE: 0.35, // xác suất băng tên trùm phản bội khai tên người đã bán nó

  /* RNG gieo theo chuỗi — cùng map cùng wave thì luôn cùng kết quả */
  _r(...k) {
    let h = SC.EVO_KW._hash(k.join('|'));
    h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  },

  /* Waves._buildWave gọi sau khi trộn quái khắc chế. Gắn q.dz cho một phần hàng chờ. */
  mix(queue, lv, wave) {
    const endless = SC.Endless.active(lv.id);
    let pool = SC.Defectors.ready(endless ? 'mob' : null);
    if (endless && !pool.length) pool = SC.Defectors.ready();
    if (!pool.length || !queue.length) return;
    const base = this.CAP * this._r('map', lv.id);
    const share = Math.min(this.CAP, base * (0.5 + this._r('wave', lv.id, wave)));
    // quái khắc chế có cơ chế riêng nhìn bằng hình (khiên, tổ ong) — không khoác áo
    const slots = queue.filter(q => !SC.EnemyCounter.is(q.t));
    let k = Math.floor(queue.length * share);
    while (k-- > 0 && slots.length) {
      const q = slots.splice((Math.random() * slots.length) | 0, 1)[0];
      q.dz = pool[(Math.random() * pool.length) | 0];
    }
  },

  /* Vòng vô tận: thay trùm của map bằng tàu hạng trùm. Giữ máu/chiêu vùng của trùm gốc. */
  /* KHÔNG LẶP (yêu cầu 22/09/2026): mỗi tàu hạng trùm chỉ làm trùm ở ĐÚNG MỘT map.
     Xếp tàu theo lúc bán (cũ trước) rồi rải lần lượt vào các map trùm vô tận được gieo
     trúng (90%): map trùng thứ k nhận tàu thứ k. Tàu bán sau nối ĐUÔI hàng nên map đã
     gán không đổi chủ. Hết tàu thì map sau về trùm gốc.
     Khi pool lớn (vượt số map trùm người ta thực sự chơi tới) nên đổi sang xáo theo
     vòng — ghi chú để cải tiến, chưa cần lúc này. */
  _bossSlot(id) {
    let k = -1;
    for (let i = SC.TOTAL_LEVELS + 1; i <= id; i++)
      if (SC.levelAt(i).boss && this._r('boss', i) < this.BOSS_CHANCE) k++;
    return this._r('boss', id) < this.BOSS_CHANCE ? k : -1;
  },

  bossify(boss, lv) {
    if (!SC.Endless.active(lv.id)) return;
    const pool = SC.Defectors.ready('boss').sort((a, b) => (a.at - b.at) || (a.id < b.id ? -1 : 1));
    const k = this._bossSlot(lv.id);
    if (k < 0 || k >= pool.length) return;
    const dz = pool[k];
    boss.dz = dz;
    const ten = dz.names.length ? dz.names.join(' ').toUpperCase() : 'VÔ DANH';
    // THỈNH THOẢNG (~35%, gieo theo map) khai ra ai đã bán nó — vui vì bất ngờ; lần nào
    // cũng hiện thì thành nhàm và giống bảng tên hơn là trò đùa
    boss.name = dz.seller && this._r('seller', lv.id) < this.SELLER_CHANCE
      ? `PHẢN ĐỒ CỦA ${dz.seller.toUpperCase()} · ${ten}` : 'PHẢN ĐỒ · ' + ten;
    // chiêu mổ chỉ hợp gia cầm — tàu phản bội không phải chim thì mổ đổi thành laze
    if (!dz.bird) boss.atkList = boss.atkList.map(a => (a === 'peck' ? 'laser' : a));
  },

  /* Đường đạn theo class (vô tận). n/sp lấy từ đường đạn GỐC của con quái -> cùng lượng
     đạn, cùng tốc: chỉ đổi hình dạng loạt bắn và loại viên. Trả false = dùng đạn gốc. */
  CLS: {
    archer: 'fan', gunslinger: 'burst', 'ninja assassin': 'burst', mage: 'orb', summoner: 'orb',
    cleric: 'orb', warrior: 'cleave', berserker: 'cleave', swordsman: 'cleave', dragoon: 'cleave',
    'paladin knight': 'cleave', guardian: 'cleave'
  },
  fire(e, player, n, sp) {
    const kind = this.CLS[e.dz.cls];
    if (!kind || !SC.Endless.active(SC.Game.levelId || 1)) return false;
    const a = SC.angTo(e.x, e.y, player.x, player.y), y = e.y + e.r * 0.6;
    for (let i = 0; i < n; i++) {
      const off = n === 1 ? 0 : i / (n - 1) - 0.5;
      if (kind === 'fan')         // mưa tên: quạt hẹp, bay thẳng
        SC.Bullets.spawnFoe(e.x, y, Math.cos(a + off * 0.3) * sp, Math.sin(a + off * 0.3) * sp, 'arrow');
      else if (kind === 'burst')  // loạt liên thanh: cùng hướng, nối đuôi nhau (tốc lệch nhẹ)
        SC.Bullets.spawnFoe(e.x, y, Math.cos(a) * sp * (1 - i * 0.1), Math.sin(a) * sp * (1 - i * 0.1), 'dart');
      else if (kind === 'orb')    // cầu phép: quạt rộng, chậm hơn một nhịp
        SC.Bullets.spawnFoe(e.x, y, Math.cos(a + off * 1.1) * sp * 0.85, Math.sin(a + off * 1.1) * sp * 0.85, 'plasma');
      // chém: quạt vừa, tia laze. KHÔNG dùng 'blast' — nó nổ thêm 5 mảnh = tăng lượng
      // đạn, phá luật "vô tận không đổi cân bằng"
      else
        SC.Bullets.spawnFoe(e.x, y, Math.cos(a + off * 0.5) * sp, Math.sin(a + off * 0.5) * sp, 'laser');
    }
    return true;
  }
};

;
/* ===== js/ui-evo-garage.js ===== */
/* ui-evo-garage.js — màn GARA: nơi KHOE và CHỌN LẠI mọi chiến đấu cơ tiến hóa
 *
 * Tinh thần gara xe: mỗi tàu đứng trên một bệ có đèn rọi, số hiệu riêng, tên tổ hợp
 * và thuộc tính ẩn của nó. Tàu nào cũng độc nhất (RNG chống trùng + livery cá nhân),
 * nên màn này là bộ sưu tập chứ không phải cửa hàng — không có giá, chỉ có "DÙNG".
 *
 * Lối vào: nút GARA ở lobby + thẻ TIẾN HÓA trong cây kỹ năng. Chỉ hiện trên kênh có
 * tính năng tiến hóa (zingplay.dev) — portal công khai không thấy.
 */

SC.GarageUI = {
  init(on) {
    on('btnGarage', () => this.open());
    on('btnGarageBack', () => { SC.UI.show('menu'); SC.UI.syncMenu(); });
    document.getElementById('garList').addEventListener('click', e => {
      const rc = e.target.closest('button[data-recast]');
      if (rc) { this._recast(rc); return; }
      const sb = e.target.closest('button[data-sell]');
      if (sb) { this.sellFlow(sb); return; }
      const b = e.target.closest('button[data-eq]');
      if (!b) {
        // bấm vào phần còn lại của thẻ = mở popup chi tiết, lướt được sang tàu khác
        const card = e.target.closest('.gar-card');
        if (card) { SC.Audio.click(); SC.GarageDetail.open(this.items, +card.dataset.i); }
        return;
      }
      SC.Audio.power();
      SC.EvoGarage.equip(b.dataset.eq || null);
      SC.UI.toast(b.dataset.eq ? 'ĐÃ LÊN TÀU' : 'VỀ TÀU NGUYÊN BẢN');
      this.build();
    });
  },

  /* nút GARA ở lobby chỉ hiện khi kênh có tiến hóa — ui-menu-card gọi mỗi lần sync */
  syncButton() {
    const b = document.getElementById('btnGarage');
    if (b) b.classList.toggle('hidden', !SC.EvoAI.active());
  },

  open() { SC.UI.show('garage'); this.build(); },

  _chips(stats) {
    return SC.EvoGarage.STATS.filter(s => stats && stats[s])
      .map(s => `<i class="gar-chip">+${stats[s]}% ${SC.EvoGarage.STAT_VI[s]}</i>`).join('');
  },

  build() {
    const own = SC.EvoGarage.owned();
    const eq = (SC.UI.progress.evo && SC.UI.progress.evo.equip) || null;
    const imgs = SC.EvoGarage.images();
    document.getElementById('garCount').textContent = own.length;
    document.getElementById('garPerks').innerHTML = SC.EvoGarage.STATS
      .map(s => `<span><b>+${SC.EvoGarage.pct(s)}%</b>${SC.EvoGarage.STAT_VI[s]}</span>`).join('');

    // bệ số 0: tàu nguyên bản — luôn chọn lại được
    const G = SC.EvoAI._orig || {}, src = x => (x && x.src) || '';
    // this.items: dữ liệu thô dùng chung cho thẻ lưới VÀ popup chi tiết (lướt theo đúng thứ tự)
    this.items = [{ id: '', sn: '#00', combo: 'NGUYÊN BẢN', img: src(G.ship),
      drones: [src(G.swarm), src(G.sniper)].filter(Boolean), stats: null }];

    // mới nhất lên đầu — tàu vừa ghép là thứ người chơi muốn ngắm nhất
    own.slice().reverse().forEach((o, ri) => {
      const i = own.length - 1 - ri;
      // bản đẹp ở máy này, không có thì ảnh thu nhỏ trong sổ (theo mây)
      const im = imgs.find(x => x.id === o.id) || (o.thumb ? { ship: o.thumb } : null);
      this.items.push({ id: o.id, o, sn: '#' + String(i + 1).padStart(2, '0'),
        combo: (o.names || []).map(n => String(n).toUpperCase()).join(' · '),
        img: im ? im.ship : '', drones: im && im.drone ? [im.drone] : [], stats: o.stats,
        recast: !im && SC.EvoRecover.canRecast(o) });
    });
    document.getElementById('garList').innerHTML = this.items.map((it, k) => this._card({
      ...it, i: k, name: SC.Rank.esc(SC.GarageDetail.nameOf(it)), on: (eq || '') === it.id,
      chips: it.id ? this._chips(it.stats) : '<i class="gar-chip dim">Tàu xuất xưởng</i>'
    })).join('');
  },

  /* BÁN: chạm lần 1 chỉ LÊN CÒ (nút đổi chữ, 3 giây tự hạ), chạm lần 2 mới bán —
     mất tàu là không lấy lại được, một cú chạm nhầm lúc vuốt không được phép bán. */
  sellFlow(btn) {
    const id = btn.dataset.sell;
    if (btn.dataset.arm !== '1') {
      SC.Audio.click();
      btn.dataset.arm = '1';
      btn.classList.add('armed');
      btn.textContent = `BÁN? +${SC.Power.fmt(SC.EvoSell.GOLD)} ◈ +1 🧬`;
      clearTimeout(btn._t);
      btn._t = setTimeout(() => this.disarm(btn), 3000);
      return;
    }
    this.disarm(btn);
    const kw = SC.EvoSell.sell(id);
    if (!kw) return;
    if (SC.GarageDetail.box) SC.GarageDetail.box.classList.add('hidden');
    SC.Audio.power();
    this.build();
    // quay máy gacha như mảnh cuối màn — sổ sách đã chốt + save trong sell()
    SC.EvoGachaUI.play(kw, () => {
      SC.UI.toast(`ĐÃ BÁN · +${SC.Power.fmt(SC.EvoSell.GOLD)} VÀNG · +1 TỪ KHÓA`);
      this.build();
    });
  },

  disarm(btn) {
    clearTimeout(btn._t);
    btn.dataset.arm = '';
    btn.classList.remove('armed');
    btn.textContent = 'BÁN';
  },

  /* Đúc lại ảnh cho tàu đã mất ảnh — miễn phí 1 lần, ~15 giây, giữ nguyên thuộc tính */
  async _recast(btn) {
    btn.disabled = true;
    btn.textContent = 'ĐANG ĐÚC…';
    try {
      await SC.EvoRecover.recast(btn.dataset.recast);
      SC.UI.toast('ĐÃ ĐÚC LẠI CHIẾN ĐẤU CƠ');
    } catch (e) {
      SC.UI.toast('CHƯA ĐÚC ĐƯỢC — THỬ LẠI SAU');
    }
    this.build();
  },

  _card(c) {
    const hinh = c.img
      ? `<img src="${c.img}" alt="">`
      : c.recast
        ? `<span class="gar-miss">ảnh chưa có<br><button class="btn small gar-recast" data-recast="${c.id}">ĐÚC LẠI</button></span>`
        : '<span class="gar-miss">ảnh đang ở<br>máy khác</span>';
    return `<div class="gar-card${c.on ? ' on' : ''}" data-i="${c.i}">
      <div class="gar-stage">${hinh}<i class="gar-sn">${c.sn}</i>${SC.EvoSell.canSell(c.id)
        ? `<button class="gar-sell" data-sell="${c.id}">BÁN</button>` : ''}</div>
      <b class="gar-name">${c.name}</b>
      <div class="gar-chips">${c.chips}</div>
      <button class="btn ${c.on || !c.img ? 'ghost' : 'primary'} small" data-eq="${c.id}"${c.on || !c.img ? ' disabled' : ''}>
        ${c.on ? 'ĐANG BAY' : c.img ? 'DÙNG' : 'CHƯA CÓ ẢNH'}</button>
    </div>`;
  },

  /* Thẻ TIẾN HÓA trong cây kỹ năng: tổng thuộc tính ẩn + lối vào gara */
  treeCard() {
    if (!SC.EvoAI.active()) return null;
    const row = document.createElement('div');
    row.className = 'tree-row extra evo-tree';
    row.innerHTML = `
      <div class="tree-top">
        <div class="shop-ic">🧬</div>
        <div class="shop-mid">
          <div class="tree-name">TIẾN HÓA <em>${SC.EvoGarage.owned().length} chiến đấu cơ</em></div>
          <div class="gar-chips">${SC.EvoGarage.STATS.map(s =>
            `<i class="gar-chip">+${SC.EvoGarage.pct(s)}% ${SC.EvoGarage.STAT_VI[s]}</i>`).join('')}</div>
          <div class="shop-desc">Thuộc tính ẩn cộng dồn từ mọi chiến đấu cơ đã ghép</div>
        </div>
        <button class="shop-buy gar-open">GARA</button>
      </div>`;
    row.querySelector('.shop-buy').onclick = () => { SC.Audio.click(); this.open(); };
    return row;
  }
};

;
/* ===== js/ui-evo-garage-detail.js ===== */
/* ui-evo-garage-detail.js — popup XEM CHI TIẾT một chiến đấu cơ trong gara
 *
 * Bấm vào thẻ nào ở gara là mở popup gần kín màn hình: tên (đổi được), thuộc tính ẩn,
 * tàu chính đang lượn trên bệ với phi đội bay kèm, và ô riêng khoe phi đội.
 * Vuốt ngang / mũi tên / phím ← → để lướt sang tàu kế — gara là bộ sưu tập, người
 * chơi muốn ngắm hết một lượt chứ không phải đóng-mở từng thẻ.
 *
 * Tên riêng lưu `o.nick` NGAY TRONG SỔ progress.evo.owned (theo mây như tàu); tàu
 * nguyên bản lưu `evo.nick0`. Tên tổ hợp gốc vẫn hiện dòng phụ — đó là "giấy khai
 * sinh" của tàu, thuộc tính ẩn băm từ nó nên không được mất.
 */

SC.GarageDetail = {
  NICK_MAX: 24,
  items: [],
  i: 0,

  _el() {
    if (this.box) return this.box;
    const box = this.box = document.createElement('div');
    box.className = 'gd-wrap hidden';
    box.innerHTML = `
      <div class="gd-pop" role="dialog" aria-modal="true">
        <div class="gd-top">
          <i class="gd-sn"></i>
          <button class="icon-btn gd-x" aria-label="Đóng">✕</button>
        </div>
        <label class="gd-name"><input maxlength="${this.NICK_MAX}" spellcheck="false"
          aria-label="Tên chiến đấu cơ"><span aria-hidden="true">✎</span></label>
        <div class="gd-combo"></div>
        <div class="gd-stage">
          <button class="gd-sell" data-sell="">BÁN</button>
          <button class="gd-nav prev" aria-label="Tàu trước">‹</button>
          <div class="gd-fly"><img class="gd-dr l" alt=""><img class="gd-ship" alt=""><img class="gd-dr r" alt=""></div>
          <div class="gd-miss gar-miss"></div>
          <button class="gd-nav next" aria-label="Tàu sau">›</button>
        </div>
        <div class="gd-dots"></div>
        <div class="gd-row">
          <div class="gd-cell"><em>MÁY BAY CHÍNH</em><img class="gd-mini ship" alt=""></div>
          <div class="gd-cell"><em>PHI ĐỘI</em><div class="gd-mini-dr"></div></div>
        </div>
        <div class="gd-stats"></div>
        <button class="btn primary gd-eq"></button>
      </div>`;
    document.getElementById('scrGarage').appendChild(box);

    const q = s => box.querySelector(s);
    q('.gd-x').onclick = () => this.close();
    box.addEventListener('click', e => { if (e.target === box) this.close(); });
    q('.prev').onclick = () => this.go(-1);
    q('.next').onclick = () => this.go(1);
    q('.gd-eq').onclick = () => this._equip();
    q('.gd-sell').onclick = e => SC.GarageUI.sellFlow(e.currentTarget);
    q('.gd-miss').addEventListener('click', async e => {
      const b = e.target.closest('button[data-recast]');
      if (!b) return;
      await SC.GarageUI._recast(b);      // _recast tự build lại lưới -> items mới có ảnh
      this.items = SC.GarageUI.items;
      this.show(this.i);
    });
    const inp = q('.gd-name input');
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') inp.blur(); e.stopPropagation(); });
    // cả change lẫn blur: chỉ blur thì mất tên khi đóng popup bằng phím/nút không lấy focus
    inp.addEventListener('change', () => this._rename(inp.value));
    inp.addEventListener('blur', () => this._rename(inp.value));

    // vuốt ngang để lướt; bỏ qua khi đang gõ tên (kéo chọn chữ không phải vuốt)
    let x0 = null;
    const pop = q('.gd-pop');
    // BẪY ĐÃ GẶP: kéo trúng <img> là trình duyệt chuyển sang kéo-thả ảnh, nuốt mất
    // pointerup -> vuốt không ăn. CSS tắt pointer-events của ảnh + chặn dragstart.
    pop.addEventListener('dragstart', e => e.preventDefault());
    pop.addEventListener('pointerdown', e => {
      x0 = e.target.closest('input,button') ? null : e.clientX;
    });
    pop.addEventListener('pointerup', e => {
      if (x0 === null) return;
      const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 48) this.go(dx < 0 ? 1 : -1);
    });
    document.addEventListener('keydown', e => {
      if (box.classList.contains('hidden')) return;
      if (e.key === 'ArrowLeft') this.go(-1);
      else if (e.key === 'ArrowRight') this.go(1);
      else if (e.key === 'Escape') this.close();
    });
    return box;
  },

  open(items, i) {
    this.items = items;
    this._el().classList.remove('hidden');
    this.show(i);
  },

  close() {
    if (!this.box) return;
    this._rename(this.box.querySelector('.gd-name input').value);
    this.box.classList.add('hidden');
    SC.GarageUI.build();                 // tên / tàu đang bay có thể vừa đổi
  },

  go(d) {
    const n = this.items.length;
    if (n < 2) return;
    this._rename(this.box.querySelector('.gd-name input').value);   // đang gõ dở mà vuốt đi
    SC.Audio.click();
    this.show((this.i + d + n) % n, d);
  },

  show(i, dir) {
    this.i = i;
    const it = this.items[i], box = this.box, q = s => box.querySelector(s);
    const eq = (SC.UI.progress.evo && SC.UI.progress.evo.equip) || '';
    q('.gd-sn').textContent = `${it.sn} · ${i + 1}/${this.items.length}`;
    q('.gd-name input').value = this.nameOf(it);
    const sell = q('.gd-sell');
    sell.dataset.sell = it.id;
    sell.classList.toggle('hidden', !SC.EvoSell.canSell(it.id));
    SC.GarageUI.disarm(sell);
    // dòng tổ hợp gốc chỉ hiện khi đã đặt tên riêng — trùng tên chính thì thừa
    q('.gd-combo').textContent = this.nameOf(it) === it.combo ? '' : it.combo;
    q('.gd-miss').innerHTML = it.img ? '' : it.recast
      ? `ảnh chưa có<br><button class="btn small gar-recast" data-recast="${it.id}">ĐÚC LẠI</button>`
      : 'ảnh đang ở máy khác';

    const fly = q('.gd-fly');
    fly.classList.remove('in-l', 'in-r');
    void fly.offsetWidth;                // ép reflow để animation trượt vào chạy lại
    if (dir) fly.classList.add(dir > 0 ? 'in-r' : 'in-l');
    const set = (img, src) => { img.src = src || ''; img.style.visibility = src ? '' : 'hidden'; };
    set(q('.gd-ship'), it.img);
    set(q('.gd-mini.ship'), it.img);
    box.querySelectorAll('.gd-dr').forEach(im => set(im, it.drones[0]));
    q('.gd-mini-dr').innerHTML = it.drones.length
      ? it.drones.map(s => `<img src="${s}" alt="">`).join('')
      : '<span class="gar-miss">ảnh đang ở máy khác</span>';

    q('.gd-stats').innerHTML = SC.EvoGarage.STATS.map(s => {
      const v = (it.stats && it.stats[s]) || 0;
      return `<span class="${v ? '' : 'off'}"><b>+${v}%</b>${SC.EvoGarage.STAT_VI[s]}</span>`;
    }).join('');

    const on = eq === it.id, b = q('.gd-eq');
    b.textContent = on ? 'ĐANG BAY' : it.img ? 'DÙNG CHIẾN ĐẤU CƠ NÀY' : 'CHƯA CÓ ẢNH';
    b.disabled = on || !it.img;
    b.className = 'btn gd-eq ' + (b.disabled ? 'ghost' : 'primary');

    q('.gd-dots').innerHTML = this.items.length > 1
      ? this.items.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('') : '';
  },

  /* tên hiển thị: tên riêng người chơi đặt, chưa đặt thì tên tổ hợp */
  nameOf(it) {
    const e = SC.UI.progress.evo || {};
    const nick = it.id ? (it.o && it.o.nick) : e.nick0;
    // BẪY ĐÃ SẬP: bản đầu cắt tên tổ hợp dài (>24 ký tự) rồi lưu thành tên riêng
    // "SÓI · GẤU TRÚC · TINH NG" — tên riêng là khúc đầu của tên tổ hợp = tên cụt, bỏ qua
    if (nick && nick !== it.combo && it.combo.startsWith(nick)) return it.combo;
    return nick || it.combo;
  },

  _rename(v) {
    const it = this.items[this.i];
    if (!it) return;
    const e = SC.EvoAI.st();
    // trim + gộp khoảng trắng; để trống = về tên tổ hợp
    const full = String(v || '').replace(/\s+/g, ' ').trim();
    const o = it.id ? (e.owned || []).find(x => x.id === it.id) : null;
    const cu = it.id ? (o && o.nick) || '' : e.nick0 || '';
    // so với tên tổ hợp TRƯỚC khi cắt — tên tổ hợp được phép dài hơn NICK_MAX
    const moi = full === it.combo ? '' : full.slice(0, this.NICK_MAX);
    if (moi === cu) return;
    if (it.id) { if (!o) return; if (moi) o.nick = moi; else delete o.nick; it.o = o; }
    else if (moi) e.nick0 = moi; else delete e.nick0;
    SC.UI.save();
    SC.Cloud.markDirty();
    SC.UI.toast(moi ? 'ĐÃ ĐỔI TÊN' : 'VỀ TÊN GỐC');
    this.show(this.i);
  },

  _equip() {
    const it = this.items[this.i];
    if (!it || !it.img) return;
    SC.Audio.power();
    SC.EvoGarage.equip(it.id || null);
    SC.UI.toast(it.id ? 'ĐÃ LÊN TÀU' : 'VỀ TÀU NGUYÊN BẢN');
    this.show(this.i);
  }
};

;
/* ===== js/ui-evo-gacha.js ===== */
/* ui-evo-gacha.js — màn QUAY SỐ vén màn từ khóa tiến hóa (yêu cầu 21/09/2026)
 *
 * Nhịp: thắng màn có mảnh 🧬 → overlay này diễn ~3 giây kiểu slot machine (chữ
 * trong pool loại đó chạy nhanh dần chậm) → khoá vào từ ĐÃ ROLL SẴN → bung to +
 * glow ~1.4s → đóng, RỒI MỚI hiện bảng tổng kết (đã có từ mới trong hàng mảnh).
 *
 * Kết quả roll từ lúc NHẶT mảnh giữa trận (system-evo-shard.js) và đã lưu — màn
 * này thuần trình diễn, F5 giữa chừng không đổi được vận mệnh. Chạm để bỏ qua:
 * người cày mỗi tối 20 màn không phải xem đủ 3 giây mỗi lần.
 */

SC.EvoGachaUI = {
  _kw: null,
  _done: null,
  _raf: 0,
  _timer: 0,
  _locked: false,

  init() {
    const scr = document.getElementById('scrGacha');
    if (scr) scr.addEventListener('click', () => {
      SC.Audio.click();
      // đang quay -> nhảy thẳng tới kết quả; xem kết quả rồi -> đóng luôn
      this._locked ? this._finish() : this._reveal(true);
    });
  },

  /* kw = từ khóa đã roll; done = việc phải làm SAU khi màn quay đóng (hiện bảng
     tổng kết…). Overlay tự lo trọn vòng đời của mình. */
  play(kw, done) {
    this._kw = kw;
    this._done = done;
    this._locked = false;
    document.getElementById('gachaType').textContent = 'MẢNH ' + SC.EVO_KW.LABEL[kw.t];
    const reel = document.getElementById('gachaReel');
    reel.classList.remove('lock');
    this._machine(m => { m.classList.remove('lock'); m.classList.add('spin'); });
    SC.UI.showOverlay('gacha');

    const pool = SC.EVO_KW[kw.t].map(x => x.vi.toUpperCase());
    const t0 = performance.now(), DUR = 3000;
    let idx = (Math.random() * pool.length) | 0, last = 0;
    const tick = now => {
      if (this._locked) return;
      const k = Math.min(1, (now - t0) / DUR);
      // slot machine thật: đầu đổi chữ mỗi 40ms, cuối ì ra nửa giây một nhịp
      const gap = 40 + 460 * k * k * k;
      if (now - last >= gap) {
        last = now;
        idx = (idx + 1) % pool.length;
        reel.textContent = pool[idx];
        // gỡ + ép reflow + gắn lại: animation trượt chạy lại mỗi nhịp đổi chữ
        reel.classList.remove('tick'); void reel.offsetWidth; reel.classList.add('tick');
      }
      if (k < 1) this._raf = requestAnimationFrame(tick);
      else this._reveal();
    };
    this._raf = requestAnimationFrame(tick);
  },

  _reveal(skipped) {
    if (this._locked) return;
    this._locked = true;
    cancelAnimationFrame(this._raf);
    const reel = document.getElementById('gachaReel');
    reel.textContent = this._kw.vi.toUpperCase();
    reel.classList.remove('tick');
    reel.classList.add('lock');          // bung scale + glow, xem CSS .gacha-reel.lock
    // máy thôi rung -> mắt dung hợp lóe + vòng năng lượng nổ (CSS .gacha-machine.lock)
    this._machine(m => { m.classList.remove('spin'); void m.offsetWidth; m.classList.add('lock'); });
    SC.Audio.win();
    SC.Input.vibrate(45);
    // bỏ qua giữa chừng vẫn được LIẾC kết quả một nhịp ngắn — đừng nuốt phần thưởng
    this._timer = setTimeout(() => this._finish(), skipped ? 700 : 1400);
  },

  _machine(fn) { const m = document.getElementById('gachaMachine'); if (m) fn(m); },

  _finish() {
    cancelAnimationFrame(this._raf);
    clearTimeout(this._timer);
    this._machine(m => m.classList.remove('spin'));
    SC.UI.hideOverlay('gacha');
    const d = this._done;
    this._done = null;
    if (d) d();
  }
};

;
/* ===== js/ui-evo-ai.js ===== */
/* ui-evo-ai.js — popup TIẾN HÓA AI: khoe bộ 3 từ khóa, gen thử, ưng thì lên tàu
 *
 * Nhịp dùng: mảnh 🧬 rơi ở màn 3×n (system-evo-shard.js) → đủ bộ 3 → popup này đè
 * lên bảng kết quả. Mỗi lượt gen ra CẢ BỘ tàu + drone hộ tống cùng theme (~15 giây,
 * TỐN TIỀN THẬT 2×$0.007/lượt, quota 10$/tháng) nên: không bao giờ gen tự động, và
 * mỗi bộ từ khóa chỉ có MAX_GEN lượt (1 đầu + 3 gen lại — chốt 21/09/2026). Lượt đã
 * đốt nằm trong progress (F5 không reset), bộ gen dở nằm DRAFT localStorage (F5
 * không mất bộ đang chờ quyết). */

SC.EvoAIUI = {
  _pack: null,   // { ship, drone } đang chờ người chơi quyết
  _busy: false,

  init(on) {
    on('btnEvoAiGen', () => this.gen());
    on('btnEvoAiUse', () => this.use());
    on('btnEvoAiLater', () => SC.UI.hideOverlay('evoai'));
    // Gen lại theo STYLE — mỗi nút một cú bẻ lái để kết quả khác hẳn bản cũ
    document.getElementById('evoAiStyles').addEventListener('click', e => {
      const b = e.target.closest('button[data-style]');
      if (!b) return;
      SC.Audio.click();
      this.gen(b.dataset.style);
    });
  },

  open() {
    const kws = SC.EvoAI.st().kw.slice(0, 3);
    document.getElementById('evoAiKws').innerHTML = kws.map(k =>
      `<span class="evoai-kw"><i>${SC.EVO_KW.LABEL[k.t]}</i><b>${SC.Rank.esc(k.vi.toUpperCase())}</b></span>`
    ).join('');
    this._busy = false;
    this._err('');
    this._pack = SC.EvoAI.loadDraft();         // F5 xong vẫn còn bộ chờ quyết
    if (this._pack && this._pack.ship) {
      this._view(this._preview(this._pack));
      this._btns(this._genLabel(), SC.EvoAI.rollsLeft() > 0, true);
    } else {
      this._pack = null;
      // Quả trứng thay text box (21/09): thứ sắp nở ra tàu thì phải trông như
      // một quả trứng đang chờ, không phải một đoạn hướng dẫn sử dụng.
      this._view('<div class="evo-egg">🥚</div>'
        + '<span class="evoai-hint">Bấm TIẾN HÓA để ấp trứng — AI ghép chiến đấu cơ + phi đội (~15 giây)</span>');
      this._btns(this._genLabel(), true, false);
    }
    SC.UI.showOverlay('evoai');
  },

  /* Tàu to giữa khung, drone hộ tống thu nhỏ đậu góc — thấy cả bộ trước khi chốt */
  _preview(pack) {
    return `<img src="${pack.ship}" alt="Chiến đấu cơ tiến hóa">`
      + (pack.drone ? `<img class="evoai-drone" src="${pack.drone}" alt="Drone hộ tống">` : '');
  },

  /* Nhãn nút gen nói luôn còn mấy lượt — hết hạn mức phải NHÌN THẤY chứ không phải
     bấm rồi mới biết không được. */
  _genLabel() {
    const left = SC.EvoAI.rollsLeft();
    if (left >= SC.EvoAI.MAX_GEN) return 'TIẾN HÓA';
    return left > 0 ? `GEN LẠI (CÒN ${left})` : 'HẾT LƯỢT GEN';
  },

  _view(html) { document.getElementById('evoAiView').innerHTML = html; },
  _err(msg) {
    const el = document.getElementById('evoAiErr');
    el.textContent = msg;
    el.classList.toggle('hidden', !msg);
  },
  _btns(genLabel, genEnabled, canUse) {
    const g = document.getElementById('btnEvoAiGen');
    g.textContent = genLabel;
    g.disabled = this._busy || !genEnabled;
    document.getElementById('btnEvoAiUse').classList.toggle('hidden', !canUse);
    /* Hàng style chỉ hiện khi ĐÃ có bản đầu (gen đầu giữ theme gốc cho chuẩn) và
       còn lượt — mỗi nút style tốn một lượt như GEN LẠI thường. */
    const st = document.getElementById('evoAiStyles');
    const stOn = !!this._pack && genEnabled && !this._busy;
    st.classList.toggle('hidden', !stOn);
    st.querySelectorAll('button').forEach(b => { b.disabled = !stOn; });
  },

  async gen(style) {
    if (this._busy) return;
    // Hết hạn mức: chỉ cho "gen vớt" khi KHÔNG còn bộ chờ nào (draft mất do
    // storage đầy) — không thì người chơi kẹt bộ từ khóa vĩnh viễn. Có bộ chờ
    // thì hết lượt là hết, dùng hoặc để sau.
    if (SC.EvoAI.rollsLeft() <= 0 && this._pack) return;
    this._busy = true;
    this._err('');
    // trứng lắc + nứt trong suốt ~15s chờ gen — thay cho dòng chữ đợi chán ngắt
    this._view('<div class="evo-egg hatching">🥚</div>'
      + '<span class="evoai-hint evoai-spin">ĐANG ẤP TRỨNG…</span>');
    this._btns('ĐANG ẤP TRỨNG…', false, false);
    // Trừ lượt TRƯỚC khi gọi mạng — F5 giữa chừng vẫn mất lượt (anti-cheat)
    if (SC.EvoAI.rollsLeft() > 0) SC.EvoAI.spendRoll();
    try {
      const pack = await SC.EvoAI.generate(undefined, style);
      this._pack = pack;
      SC.EvoAI.saveDraft(pack);
      // NỞ: gà con bung ra một nhịp rồi mới lộ tàu — phần thưởng phải có màn chào sân
      this._view('<div class="evo-egg hatch">🐣</div>');
      SC.Audio.win();
      await new Promise(r => setTimeout(r, 550));
      this._view(this._preview(pack));
      this._busy = false;
      this._btns(this._genLabel(), SC.EvoAI.rollsLeft() > 0, true);
    } catch (e) {
      this._busy = false;
      this._view('<div class="evo-egg">🥚</div>'
        + '<span class="evoai-hint">Trứng chưa nở được — thử lại sau</span>');
      this._err((e && e.message) || 'Lỗi mạng');
      // lỗi mạng không hoàn lượt: server có thể ĐÃ gen xong (tiền đã tốn) mà
      // response rơi giữa đường — hoàn lượt là mở đường farm ảnh miễn phí
      this._btns(this._genLabel(), SC.EvoAI.rollsLeft() > 0, false);
    }
  },

  use() {
    if (!this._pack || !this._pack.ship) return;
    SC.EvoAI.accept(this._pack);
    SC.UI.hideOverlay('evoai');
    SC.Audio.win();
    SC.UI.syncMenu();
  }
};

;
/* ===== js/ui-evo-starter.js ===== */
/* ui-evo-starter.js — TÀU AI TÂN THỦ: vào game là được gen ngay 1 chiến đấu cơ (22/09/2026)
 *
 * Chỉ kênh có tiến hóa (zingplay.dev). Nằm TRONG popup quà tân thủ (ui-gift.js): hai
 * lựa chọn MÁY BAY CHIẾN ĐẤU (khung máy + class + màu) hoặc MÁY BAY THÚ (con vật + class
 * + màu). Người chơi zingplay CŨ (đã nhận vàng từ trước) cũng được một lần — popup mở ở
 * chế độ chỉ-có-tàu (`evo-only`).
 *
 * Trạng thái ở progress.evo.starter (theo mây):
 *   (chưa có)          -> mời chọn
 *   { k, kws }         -> ĐANG DỞ: đã chọn + đã roll từ khóa, chưa có tàu (lỗi mạng / F5
 *                         giữa lúc ấp). Chọn lại CÙNG loại thì dùng lại đúng bộ từ khóa —
 *                         F5 liên tục không roll được bộ mới.
 *   'done'             -> đã có tàu, không bao giờ mời nữa.
 * Tàu tân thủ KHÔNG đụng bộ từ khóa đang nhặt (evo.kw) — gen bằng kwsOverride.
 */

SC.EvoStarter = {
  busy: false,
  RECIPE: { fighter: ['frame', 'class', 'color'], beast: ['animal', 'class', 'color'] },

  eligible() { return SC.EvoAI.active() && SC.EvoAI.st().starter !== 'done'; },

  init() {
    const box = document.getElementById('giftEvoPick');
    if (box) box.addEventListener('click', e => {
      const b = e.target.closest('button[data-starter]');
      if (b) this.choose(b.dataset.starter);
    });
  },

  /* Gọi sau Gift.check: hồ sơ không còn quà vàng nhưng chưa có tàu tân thủ */
  check() {
    if (SC.Gift.eligible() || !this.eligible()) return;
    setTimeout(() => {
      const dangMo = !SC.UI.el.gift.classList.contains('hidden');
      if (dangMo || SC.Gift.eligible() || !this.eligible()) return;
      this.attach(true);
      SC.UI.showOverlay('gift');
      SC.Audio.gem();
    }, 900);
  },

  /* Dựng khu chọn tàu trong popup quà. evoOnly = ẩn phần vàng (người chơi cũ) */
  attach(evoOnly) {
    const box = document.querySelector('#scrGift .gift-box');
    const sec = document.getElementById('giftEvo');
    const on = this.eligible();
    box.classList.toggle('evo-only', !!evoOnly && on);
    box.querySelector('h3').textContent = evoOnly && on ? 'QUÀ TIẾN HÓA' : 'QUÀ TÂN THỦ';
    sec.classList.toggle('hidden', !on);
    if (!on) return this._ok('NHẬN QUÀ', true);
    this._view('<div class="evo-egg">🥚</div>');
    this._pick(true);
    this._err('');
    this._ok(evoOnly ? 'ĐỂ SAU' : 'NHẬN QUÀ', true);
  },

  async choose(kind) {
    if (this.busy || !this.eligible() || !this.RECIPE[kind]) return;
    const e = SC.EvoAI.st();
    // đang dở cùng loại -> dùng lại bộ cũ; khác loại / chưa có -> roll bộ mới
    let kws = e.starter && e.starter.k === kind ? e.starter.kws : null;
    if (!kws) kws = this.RECIPE[kind].map(t => SC.EVO_KW.roll(t));
    e.starter = { k: kind, kws };
    SC.Gift.grant();                     // chọn tàu = nhận luôn quà vàng (nếu còn)
    SC.UI.save();
    SC.Cloud.markDirty();

    this.busy = true;
    SC.Audio.click();
    this._pick(false);
    this._err('');
    this._ok('ĐANG ẤP…', false);
    this._view('<div class="evo-egg hatching">🥚</div><span class="evoai-hint evoai-spin">'
      + kws.map(k => SC.Rank.esc(k.vi.toUpperCase())).join(' · ') + '</span>');
    try {
      const pack = await SC.EvoAI.generate(undefined, undefined, kws);
      await SC.EvoGarage.add(pack, kws);              // cất gara + lên tàu luôn
      SC.EvoAI._apply(pack.ship, pack.drone);
      const e2 = SC.EvoAI.st();
      e2.hist = (e2.hist || []).slice(-19);
      e2.hist.push(kws.map(k => k.en).join('|'));
      e2.starter = 'done';
      SC.UI.save();
      SC.Cloud.markDirty();
      this._view('<div class="evo-egg hatch">🐣</div>');
      SC.Audio.win();
      await new Promise(r => setTimeout(r, 550));
      this._view(`<img src="${pack.ship}" alt="Chiến đấu cơ tân thủ">`
        + (pack.drone ? `<img class="evoai-drone" src="${pack.drone}" alt="">` : ''));
      this._ok('BAY THÔI!', true);
      SC.UI.syncMenu();
    } catch (err) {
      this._view('<div class="evo-egg">🥚</div>');
      this._err(((err && err.message) || 'Lỗi mạng') + ' — chọn lại để ấp tiếp');
      this._pick(true);
      this._ok('ĐỂ SAU', true);
    }
    this.busy = false;
  },

  _view(h) { document.getElementById('giftEvoView').innerHTML = h; },
  _pick(on) {
    const p = document.getElementById('giftEvoPick');
    p.classList.toggle('hidden', !on);
    p.querySelectorAll('button').forEach(b => { b.disabled = !on; });
  },
  _err(m) {
    const el = document.getElementById('giftEvoErr');
    el.textContent = m;
    el.classList.toggle('hidden', !m);
  },
  _ok(label, enabled) {
    const b = document.getElementById('btnGiftOk');
    b.textContent = label;
    b.disabled = !enabled;
  }
};

;
/* ===== js/ui-map-jump.js ===== */
/* ui-map-jump.js — dải chip nhảy vùng ở đầu bản đồ hành trình
 *
 * Vì sao có: 10 vùng × 6 chặng trải ra khoảng 8 màn hình cuộn. scrollToCurrent()
 * chỉ cứu được lần mở đầu; muốn quay lại vùng cũ cày nốt sao là phải kéo tay rất lâu,
 * mà lại không biết vùng nào còn thiếu bao nhiêu.
 *
 * Tách khỏi ui-map-select.js để mỗi tệp lo một việc: bên đó dựng đường đi và các
 * chặng, bên này lo mục lục và điều hướng.
 */

SC.MapJump = {
  _io: null,

  /* Dựng lại dải chip. Gọi mỗi lần bản đồ được dựng vì số sao có thể vừa đổi. */
  build(ui) {
    const bar = document.getElementById('sagaJump');
    if (!bar) return;
    const per = SC.LEVELS_PER_BIOME;

    bar.innerHTML = SC.BIOMES.map((b, bi) => {
      const levels = SC.LEVELS.slice(bi * per, (bi + 1) * per);
      const st = levels.reduce((s, lv) => s + (ui.progress.stars[lv.id] || 0), 0);
      const max = per * 3;
      const open = levels.some(lv => lv.id <= ui.progress.unlocked);
      const perfect = open && st >= max;
      return `<button class="sj${open ? '' : ' lock'}${perfect ? ' perfect' : ''}"
        data-bi="${bi}" style="--tint:hsl(${b.hue},70%,60%)">
        <b>${SC.Rank.esc(b.name)}</b>
        <em>${open ? '★ ' + st + '/' + max
          : '<svg class="ic" aria-hidden="true"><use href="#i-lock"/></svg>'}</em>
      </button>`;
    }).join('');

    bar.onclick = e => {
      const b = e.target.closest('button[data-bi]');
      if (!b) return;
      SC.Audio.click();
      this.go(+b.dataset.bi);
    };

    this.watch(ui.el.mapList, bar);
  },

  /* Cuộn tới một vùng.
     KHÔNG dùng scrollIntoView: nó cuộn cả trang chứa game nên làm vỡ khung nhúng
     (xem ghi chú trong quy ước dự án). Tự đặt scrollTop của đúng khung cuộn. */
  go(bi) {
    const wrap = SC.UI.el.mapList;
    const reg = wrap && wrap.children[bi];      // các vùng nằm đúng thứ tự biome
    if (!reg) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Dùng chung phép đo với scrollToCurrent — đọc thẳng reg.offsetTop là dính đúng
    // cái bẫy offsetParent đã mô tả trong SC.MapSelect.topIn
    const top = Math.max(0, SC.MapSelect.topIn(reg, wrap) - 6);
    if (reduce || !wrap.scrollTo) wrap.scrollTop = top;
    else wrap.scrollTo({ top, behavior: 'smooth' });
    this.mark(bi);
  },

  /* Sáng chip của vùng đang xem */
  mark(bi) {
    const bar = document.getElementById('sagaJump');
    if (!bar) return;
    for (const c of bar.children) c.classList.toggle('on', +c.dataset.bi === bi);
  },

  /* Theo dõi vùng nào đang ở giữa tầm nhìn để tự sáng chip tương ứng.
     Thiếu IntersectionObserver (WebView cũ) thì chỉ mất phần sáng chip, bấm nhảy
     vùng vẫn chạy bình thường. */
  watch(wrap, bar) {
    if (this._io) { this._io.disconnect(); this._io = null; }
    if (!wrap || !bar || !window.IntersectionObserver) return;

    this._io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) this.mark(+e.target.dataset.bi);
      }
    }, { root: wrap, rootMargin: '-45% 0px -50% 0px' });

    for (const h of wrap.querySelectorAll('.saga-head')) this._io.observe(h);
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

  /* Cấp vũ khí sẽ mang vào chặng kế — nay chỉ còn do map quyết, cây kỹ năng lo
     phần sơ đồ tia và sát thương (system-gun.js) */
  _weapon() {
    const lv = SC.levelAt(SC.UI.progress.unlocked);
    return lv ? lv.startWeapon : 1;
  },

  /* Chao lượn theo con trỏ ở lobby (21/09/2026): tàu là nhân vật chính, phải
     nghịch được chứ không chỉ ngắm. Chỉ nghe pointermove — không đụng Input của
     ván chơi, không va chạm, rời chuột thì tự trôi về giữa. */
  _mx: null,
  _my: null,
  _xNow: 0,
  _yNow: 0,
  _bindPointer() {
    if (this._bp) return;
    this._bp = 1;
    window.addEventListener('pointermove', e => {
      const c = SC.View.ctx && SC.View.ctx.canvas;
      if (!c) return;
      const rc = c.getBoundingClientRect();
      if (!rc.width) return;
      this._mx = (e.clientX - rc.left) / rc.width * SC.W;
      this._my = (e.clientY - rc.top) / rc.height * SC.H;
    }, { passive: true });
  },

  render(ctx) {
    if (!this.ready) this.layout();
    if (!this.ready) return;
    this._bindPointer();

    // Người dùng bật "giảm chuyển động" thì đứng yên, vẫn thấy đủ máy bay
    const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = still ? 0 : performance.now() / 1000;

    // đích = con trỏ, lượn được CẢ HAI TRỤC (yêu cầu 21/09). X kẹp 1/4..3/4 bề
    // ngang, Y kẹp quanh sân đậu ±90px — đủ nghịch mà không chui vào logo hay nút.
    // Không có con trỏ (điện thoại chưa chạm) thì tự lượn quanh giữa màn.
    const goalX = still ? SC.W / 2
      : this._mx == null ? SC.W / 2 + Math.sin(t * 0.7) * 24
      : SC.clamp(this._mx, SC.W * 0.25, SC.W * 0.75);
    const goalY = still ? this.y
      : this._my == null ? this.y
      : SC.clamp(this._my, this.y - 90, this.y + 90);
    if (!this._xNow) this._xNow = SC.W / 2;
    if (!this._yNow) this._yNow = this.y;
    const truoc = this._xNow;
    this._xNow += (goalX - this._xNow) * 0.08;
    this._yNow += (goalY - this._yNow) * 0.08;

    const cx = this._xNow;
    const cy = this._yNow + (still ? 0 : Math.sin(t * 1.6) * 5);
    // ×3.6 so với lúc chơi (nâng lần 3, 21/09: "+50% nữa"): lobby là ảnh chân dung
    // của tàu; phi đội tự giãn theo vì offset tính theo r
    const r = SC.CFG.playerRadius * 3.6;
    // nghiêng cánh theo hướng đang lướt — cảm giác "lái" thật thay vì trượt ngang
    const tilt = still ? 0 : SC.clamp((this._xNow - truoc) * 0.09, -0.3, 0.3)
      + Math.sin(t * 0.9) * 0.08;

    // Phi đội bay kèm, vẽ trước để nằm dưới máy bay chính. Khoảng cách tính THEO r
    // (fix 21/09/2026): offset cứng 54px thời tàu nhỏ, giờ tàu ×2.4 thì cánh xoè
    // ~1.62r che sạch phi đội. Đặt drone ngoài 1.95r + lùi xuống dưới đuôi cánh.
    const dr = SC.Drones.tier();
    const n = dr ? dr.n : 0;
    const swarm = SC.Drones.kind() === 'A';
    for (let i = 0; i < n; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const ring = Math.floor(i / 2);
      SC.DroneArt.draw(ctx, {
        x: cx + side * (r * 1.95 + ring * 34),
        y: cy + r * 1.05 + ring * 18 + (still ? 0 : Math.sin(t * 2.2 + i) * 4),
        r: swarm ? 11 : 15, t: still ? 0 : t + i
      }, swarm, SC.Tree.evo());
    }

    this._one(ctx, cx, cy, r, tilt);
  },

  /* Máy bay chính, dựng đúng theo tổ hợp nhánh đang chạy — nên mua xong quay ra
     lobby là thấy hình dáng đã đổi ngay, không phải vào màn mới biết. */
  _one(ctx, x, y, r, tilt) {
    ctx.save();
    ctx.translate(x, y);
    const f = 1 + Math.sin(performance.now() / 1000 * 30) * 0.22;
    SC.draw.glow(ctx, 0, r * 1.5, 18 * f, '#5ad0ff', 0.55);
    ctx.fillStyle = 'rgba(140,230,255,.9)';
    ctx.beginPath();
    ctx.moveTo(-5, r * 1.1); ctx.lineTo(0, r * (1.5 + f * 0.5)); ctx.lineTo(5, r * 1.1);
    ctx.closePath(); ctx.fill();
    SC.AuraFX.draw(ctx, r, performance.now() / 1000, SC.Tree.evo());
    SC.ShipArt.draw(ctx, r, tilt);
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
  // tree = cây kỹ năng (system-tree.js); hồ sơ cũ có `upg` sẽ được di trú lúc nạp
  progress: { stars: {}, unlocked: 1, coin: 0, tree: null, missions: {}, times: {} },

  init() {
    const id = s => document.getElementById(s);
    this.el = {
      hud: id('hud'), menu: id('scrMenu'), maps: id('scrMaps'),
      pause: id('scrPause'), result: id('scrResult'), tree: id('scrTree'), brief: id('scrBrief'),
      fork: id('scrFork'), codex: id('scrCodex'), evo: id('scrEvo'), gift: id('scrGift'),
      rank: id('scrRank'), merge: id('scrMerge'), profile: id('scrProfile'), setup: id('scrSetup'),
      evoai: id('scrEvoAI'), gacha: id('scrGacha'), garage: id('scrGarage'),
      options: id('scrOptions'), victory: id('scrVictory'),
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
    SC.TreeMigrate.run();    // hồ sơ cũ: hoàn vàng, dựng cây rỗng, cho chọn lại hướng
    this.buildMapList();
    this.bind();
    SC.Gift.check();          // hồ sơ mới tinh -> mời nhận quà tân thủ
    SC.EvoStarter.check();    // zingplay: người chơi cũ chưa có tàu AI tân thủ -> mời riêng
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
    on('btnResNext', () => SC.Game.startLevel(SC.Game.levelId + 1));   // vượt 60 = vào vòng vô tận
    // Về LOBBY chứ không về bản đồ: lobby mới đã nói rõ chặng kế tiếp là màn nào,
    // nên đó mới là chỗ người chơi muốn quay về sau khi xong một màn.
    on('btnResMenu', () => { this.buildMapList(); SC.Game.quitToMenu(); });
    on('btnInstall', () => SC.PWA.install());
    on('btnUpdate', () => SC.PWA.applyUpdate());
    on('btnMergeCloud', () => SC.AuthPanel.pick('cloud'));
    on('btnMergeLocal', () => SC.AuthPanel.pick('local'));

    SC.AudioUI.bind(on);
    SC.Settings.bind(on);
    SC.TreeUI.init(on);
    SC.Codex.init(on);
    SC.Evolution.init(on);
    SC.EvoAIUI.init(on);
    SC.EvoGachaUI.init();
    SC.GarageUI.init(on);
    SC.Gift.init(on);
    SC.EvoStarter.init();
    SC.Brief.init(on);
    SC.Rank.init(on);
    SC.Victory.init(on);
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
  syncMenu() { SC.MenuCard.sync(this); SC.TreeMigrate.notice(); },

  /* ---------- điều hướng màn hình ---------- */
  show(which) {
    for (const k of ['menu', 'maps', 'pause', 'result', 'tree', 'codex', 'brief', 'rank',
      'profile', 'options', 'victory', 'garage'])
      this.el[k].classList.add('hidden');
    this.el.hud.classList.toggle('hidden', which !== 'game');
    if (this.el[which]) this.el[which].classList.remove('hidden');

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
  /* Sao kiếm trong CHIẾN DỊCH (màn 1-60). Dùng cho mọi chỗ hiện dạng "x/180":
     tổng sao thật có tính cả vòng vô tận nên để nguyên là thanh tiến độ vượt 100%
     và con số đọc lên thành vô lý ("196/180"). */
  campaignStar() {
    let s = 0;
    for (const k in this.progress.stars)
      if (+k <= SC.TOTAL_LEVELS) s += this.progress.stars[k];
    return s;
  },

  /* Sao kiếm ở vòng vô tận — phần dôi ra ngoài chiến dịch */
  bonusStar() { return this.totalStar() - this.campaignStar(); },

  /* Trần sao HIỆN CÓ: nới theo số màn đã mở, không đứng im ở 180.
     Sang vòng vô tận mà giữ trần cũ thì thanh tiến độ vượt 100% và con số đọc lên
     thành vô lý ("191/180"). Mỗi màn đã đi qua đều có 3 sao để lấy, nên trần đúng
     là 3 lần số màn đã mở. */
  starMax() {
    const reached = Math.max(SC.TOTAL_LEVELS, (this.progress.unlocked | 0) - 1);
    return reached * 3;
  },

  totalStar() {
    return Object.values(this.progress.stars).reduce((a, b) => a + b, 0);
  },

  /* ---------- bản đồ hành trình ---------- */
  buildMapList() { SC.MapSelect.build(this); },


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
/* ===== js/ui-hud.js ===== */
/* ui-hud.js — cập nhật thanh trạng thái trong trận: máu, khiên, điểm, wave, trùm…
 *
 * Tách khỏi ui-screens.js vì tệp đó đã vượt trần 200 dòng. Ranh giới tự nhiên: bên
 * kia lo ĐIỀU HƯỚNG MÀN HÌNH và lưu tiến độ, bên này lo những con số nhấp nháy mỗi
 * khung hình. Vẫn gắn thẳng vào SC.UI nên mọi chỗ gọi SC.UI.setHP(...) không đổi.
 */

Object.assign(SC.UI, {
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

  /* Ghim thanh máu ngay dưới chân trùm. #ui có kích thước đúng bằng khung ảo 540×H
     nên toạ độ ảo dùng thẳng làm px, khỏi quy đổi (cùng mẹo với ui-lobby-ship.js).
     Kẹp trong khung để lúc trùm lượn sát mép hay dịch chuyển ra ngoài, thanh máu
     vẫn đọc được chứ không trôi mất. */
  moveBoss(b) {
    const el = this.el.bossBar;
    // Mốc kẹp phải cộng thêm safe-area: trùm bay sát đỉnh màn thì thanh máu đội
    // thẳng lên tai thỏ, mà đó lại đúng lúc cần đọc máu nhất.
    const sf = SC.View.safe;
    el.style.left = SC.clamp(b.x, 100, SC.W - 100) + 'px';
    el.style.top = SC.clamp(b.y + b.r + 12, 60 + sf.top, SC.H - 120 - sf.bottom) + 'px';
    // trùm đang dịch chuyển (warp) thì làm mờ đi cho khớp với thân đang biến mất
    el.style.opacity = b.warp !== undefined && b.warp < 1 ? 0.25 : 1;
  },
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
});

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
        .then(reg => {
          this._reg = reg;
          /* MỞ LẠNH = BẢN MỚI NHẤT (yêu cầu 21/09/2026): F5 không được trình duyệt
             tính là "đóng tab", nên bản SW mới có thể KẸT Ở TRẠNG THÁI CHỜ qua vô số
             lần mở lại — người chơi cứ tưởng mình đã ở bản mới. Vừa boot mà thấy có
             bản chờ thì kích hoạt LUÔN: lúc này còn ở lobby, đổi bản là miễn phí
             (controllerchange bên dưới tải lại trang trong giây đầu tiên). */
          if (reg.waiting && navigator.serviceWorker.controller) {
            this._bootSwap = true;               // đừng chớp nút CẬP NHẬT trong giây swap
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
          this._watchUpdate(reg);
        })
        .catch(() => {});

      // bản mới đã tiếp quản -> tải lại một lần duy nhất
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this._reloading) return;
        this._reloading = true;
        location.reload();
      });

      /* App cài PC hay bị "mở lại từ nền" — không có navigation nào xảy ra nên
         trình duyệt chẳng buồn kiểm tra bản mới. Quay lại thấy tab/app là chủ động
         hỏi máy chủ một lần; có bản mới thì đường chấm-đỏ-bánh-răng lo phần còn lại. */
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && this._reg) this._reg.update().catch(() => {});
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

  /* Nút cập nhật có BA trạng thái NHÌN THẤY ĐƯỢC (phàn nàn thật 21/09/2026: bấm
     mà im lặng là người chơi tưởng lỗi):
       1. đang tải bản mới  -> hiện % (sw-template đếm từng file precache gửi về)
       2. tải xong          -> "CẬP NHẬT NGAY", bấm được
       3. đang áp dụng      -> khoá nút + chốt tự cứu 4 giây
     Chấm đỏ bánh răng sáng suốt cả 1 và 2 — nó báo "có bản mới", kể cả đang tải. */
  _updBtn(label, pct, enabled) {
    const b = document.getElementById('btnUpdate');
    if (!b) return;
    b.classList.remove('hidden');
    b.disabled = !enabled;
    const s = b.querySelector('span');
    if (s) s.textContent = label;
    let bar = b.querySelector('.upd-bar');
    if (!bar) { bar = document.createElement('i'); bar.className = 'upd-bar'; b.appendChild(bar); }
    bar.style.width = Math.round((pct || 0) * 100) + '%';
    bar.classList.toggle('hidden', pct == null);
    this.syncBanner();
  },

  /* Rình bản mới. Không tự đổi bản giữa lúc đang chơi — chỉ mời, người chơi
     bấm mới tải lại. Nút hiện ở menu chứ không chen ngang màn chơi. */
  _watchUpdate(reg) {
    const offer = worker => {
      this.waiting = worker;
      this._updBtn('CẬP NHẬT NGAY', null, true);
      if (SC.Game.state === 'menu') SC.UI.toast('CÓ BẢN CẬP NHẬT MỚI');
    };

    // boot-swap đang tự kích hoạt bản chờ (xem register) thì khỏi mời — trang sắp
    // tải lại trong giây này rồi
    if (reg.waiting && navigator.serviceWorker.controller && !this._bootSwap) offer(reg.waiting);

    reg.addEventListener('updatefound', () => {
      const nw = reg.installing;
      // không có controller = cài LẦN ĐẦU chứ không phải cập nhật — im lặng
      if (!nw || !navigator.serviceWorker.controller) return;
      this._updBtn('ĐANG TẢI BẢN MỚI… 0%', 0, false);
      nw.addEventListener('statechange', () => {
        if (nw.state === 'installed') offer(nw);
        // tải hỏng giữa chừng (mất mạng) -> thu nút về, đừng treo mãi ở x%
        if (nw.state === 'redundant' && !this.waiting) {
          const b = document.getElementById('btnUpdate');
          if (b) b.classList.add('hidden');
          this.syncBanner();
        }
      });
    });

    // sw-template đếm từng file precache và bắn PRECACHE_PROGRESS về đây
    navigator.serviceWorker.addEventListener('message', e => {
      const d = e.data;
      if (!d || d.type !== 'PRECACHE_PROGRESS') return;
      if (!navigator.serviceWorker.controller || this.waiting) return;   // cài lần đầu / đã tải xong
      const k = d.total ? d.done / d.total : 0;
      this._updBtn(`ĐANG TẢI BẢN MỚI… ${Math.round(k * 100)}%`, k, false);
    });
  },

  /* Người chơi đồng ý cập nhật */
  applyUpdate() {
    if (!this.waiting) { location.reload(); return; }
    this._updBtn('ĐANG ÁP DỤNG…', 1, false);
    this.waiting.postMessage({ type: 'SKIP_WAITING' });
    /* CHỐT TỰ CỨU: worker chờ có thể đã CHẾT (deploy dồn dập, bản chờ bị bản mới hơn
       đè thành redundant) — postMessage vào xác thì không bao giờ có controllerchange,
       và "bấm không phản ứng gì" chính là phàn nàn 21/09. Sau 4 giây chưa đổi bản thì
       tải lại thẳng: navigation đi MẠNG TRƯỚC (sw-template) nên vẫn ra bản mới nhất. */
    setTimeout(() => { if (!this._reloading) location.reload(); }, 4000);
  },

  showButton(show) {
    const b = document.getElementById('btnInstall');
    if (b) b.classList.toggle('hidden', !show);
    this.syncBanner();
  },

  _vis(id) {
    const b = document.getElementById(id);
    return !!b && !b.classList.contains('hidden');
  },

  /* Có lời mời nào đang treo không (cài về máy / có bản mới)? */
  anyOffer() { return this._vis('btnInstall') || this._vis('btnUpdate'); },

  /* Băng thông báo trượt lên từ đáy: chỉ hiện ở lobby và chỉ khi có việc để mời.
     Trước đây hai nút này nằm cố định giữa menu, xuất hiện bất chợt là đẩy layout. */
  syncBanner() {
    /* Chấm đỏ trên bánh răng CHỈ báo BẢN CẬP NHẬT, không báo lời mời cài app.
       BUG ĐÃ GẶP (banga.zingplay.dev, 21/09/2026): trên desktop Chrome, site đạt
       chuẩn PWA thì beforeinstallprompt bắn MỌI lần mở trang → lời mời cài luôn
       treo → chấm đỏ sáng vĩnh viễn. Đèn báo lúc nào cũng sáng thì hết là đèn báo.
       Nút CÀI VỀ MÁY vẫn nằm trong màn Cài đặt cho ai muốn tự cài. */
    const dot = document.getElementById('optDot');
    if (dot) dot.classList.toggle('hidden', !this._vis('btnUpdate'));

    const note = document.getElementById('optAppNote');
    if (note) note.classList.toggle('hidden', this.anyOffer());
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
/* ===== js/system-level-finish.js ===== */
/* system-level-finish.js — mọi việc phải làm khi một màn kết thúc
 *
 * Chấm nhiệm vụ -> quy ra sao -> tính vàng (có hệ số độ sâu map và vòng vô tận) ->
 * ghi tiến độ, kỷ lục thời gian, chỉ số tay nghề -> dựng bảng kết quả.
 *
 * Tách khỏi main.js vì tệp đó đã chạm trần 200 dòng, và vì đây là phần LUẬT KINH TẾ
 * của game — nó cần đứng riêng để sửa cân bằng không phải mò trong vòng lặp game.
 */

SC.Finish = {
  run(g, win) {
    g.state = 'result';
    SC.Music.stop();
    win ? SC.Audio.win() : SC.Audio.lose();
    const p = g.player;
    const acc = p.shots ? Math.round(p.hits / p.shots * 100) : 0;
    // sao = số nhiệm vụ phụ hoàn thành (chỉ tính khi thắng)
    const missions = SC.Missions.evaluate(g);
    const sec = Math.round(g.stats.time);
    let prevBest = 0, record = false;
    let stars = 0, bonus = 0, depth = 1;
    const mul = SC.Tree.goldMul();
    // thua vẫn giữ vàng nhặt được, nhưng không có thưởng và không nhân hệ số
    let gold = g.coin;

    if (win) {
      stars = missions.filter(m => m.done).length;
      // map càng sâu trả càng nhiều — xem SC.GOLD_DEPTH. Vòng vô tận cũng ăn theo
      // độ khó của vòng, nếu không thì cày map 61 lại lỗ hơn cày map 60.
      depth = SC.GOLD_DEPTH(g.levelId) * (1 + (SC.Endless.mul(g.levelId) - 1) * 0.6);
      bonus = Math.round(SC.CLEAR_BONUS(stars) * depth);
      gold = Math.round((g.coin * depth + bonus) * mul);

      // sao của map cộng dồn qua nhiều lần chơi: cày lại để lấy nốt nhiệm vụ còn thiếu
      SC.UI.progress.stars[g.levelId] = SC.UI.saveMissions(g.levelId, missions);
      // Không chặn ở map 60 nữa: qua map cuối là mở luôn vòng vô tận (system-endless.js).
      // Sao và kỷ lục thời gian của vòng sau vẫn ghi theo id thật nên bảng xếp hạng
      // chiến dịch (chỉ đọc 1-60) không bị lẫn.
      SC.UI.progress.unlocked = Math.max(SC.UI.progress.unlocked, g.levelId + 1);

      // giữ lần qua màn nhanh nhất -> cộng lại thành thời gian chiến dịch cho bảng xếp hạng
      if (!SC.UI.progress.times) SC.UI.progress.times = {};
      const t = SC.UI.progress.times;
      // đọc kỷ lục CŨ trước khi ghi đè, để bảng kết quả còn khoe được "kỷ lục mới"
      prevBest = t[g.levelId] || 0;
      if (!prevBest || sec < prevBest) { t[g.levelId] = sec; record = true; }

      SC.UI.buildMapList();
    }

    // Chiến dịch hoàn tất = đã có sao ở ĐỦ mọi màn (thắng map nào mới ghi sao map đó).
    // Dùng cùng thước đo với bảng xếp hạng tốc độ, nên hoàn tất ở đây cũng đúng lúc
    // hồ sơ đủ điều kiện lên bảng đó. Cờ lưu lại để lần cày sau không mừng lại từ đầu.
    const finale = win
      && Object.keys(SC.UI.progress.stars).filter(k => k <= SC.TOTAL_LEVELS).length >= SC.TOTAL_LEVELS
      && !SC.UI.progress.finished;
    if (finale) SC.UI.progress.finished = 1;

    SC.UI.progress.coin += gold;
    SC.Mastery.record(win, { time: sec, maxCombo: g.stats.maxCombo });
    // Từ khóa tiến hóa: lấy từ đã roll kín lúc nhặt mảnh (hoặc roll bù nếu mảnh
    // chưa kịp bay tới nơi) TRƯỚC save() để nó đi cùng một lượt ghi tiến độ.
    // Thua thì không có màn quay số — flushLose vén màn bằng toast cho xong sổ.
    const kwReveal = win ? SC.EvoShard.takeReveal(g.levelId) : (SC.EvoShard.flushLose(), null);
    SC.UI.save();
    SC.Cloud.markDirty();          // sao lưu đám mây nếu đã đăng nhập

    const chot = () => {
      SC.UI.showResult(win, {
        stars, score: g.score, kills: g.kills, acc,
        coin: g.coin, bonus, mul, gold, depth, missions,
        time: sec, prevBest, record, finale
      });
      // Đủ bộ 3 từ khóa -> popup tiến hóa đè lên bảng kết quả, đóng là thấy lại bảng
      if (win && SC.EvoAI.ready()) SC.EvoAIUI.open();
    };
    // Có từ khóa mới -> DIỄN màn quay số ~3s trước, xong mới tới bảng tổng kết
    if (kwReveal) SC.EvoGachaUI.play(kwReveal, chot);
    else chot();
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
    this.lv = SC.levelAt(id);        // id > 60 -> map của vòng vô tận, xem system-endless.js
    this.enemies.length = 0; this.boss = null;
    SC.Bullets.clear(); SC.Items.clear(); SC.FX.clear();
    SC.ScreenFX.clear(); SC.BossSkills.clear();
    this.score = 0; this.coin = 0; this.kills = 0; this.spawned = 0;
    this.combo = 1; this.comboT = 0; this.endT = 0;
    this.stats = { escaped: 0, maxCombo: 1, rescued: 0, time: 0 };

    this.player.reset(this.lv.startWeapon);
    /* NHẢY DÙ VÀO TRẬN (chỉnh lần 2, 21/09/2026): 2 giây, HAI PHASE —
       0.5s đầu tàu ĐỨNG KHOE ở giữa màn cỡ lobby (bản 0.9s bị chê "nhìn không rõ"),
       rồi 1.5s thu nhỏ + hạ xuống vị trí trực chiến bằng easing của CHÍNH intro
       (bản đầu nhờ hệ bám con trỏ nên tốc độ tuỳ nhánh giáp -> giật). Bảng mục tiêu
       + wave đầu vào ở mốc 1s. Bất tử phủ trọn intro kèm dư 0.6s cho công bằng. */
    this.player.y = SC.H * 0.45;
    this.introT = this.INTRO.total;
    this._introPanel = false;
    this.player.inv = this.INTRO.total + 0.6;
    SC.EvoShard.onLevelStart(id);      // màn 3×n chưa phát mảnh -> kẻ cuối sẽ nhả 🧬
    SC.Wingmen.spawn(this.player);
    SC.Variant.markSeen();              // ghi vào sổ tay biến thể
    SC.Variant.queue();                 // vừa đủ điều kiện tiến hoá thì xếp hàng chờ diễn
    SC.BG.setBiome(this.lv.biome);
    SC.Waves.start(this.lv);
    SC.Music.start(this.lv.biome);

    // 3 nhiệm vụ cố định của map; chỉ thả dù khi có nhiệm vụ cứu phi công
    const missions = SC.Missions.start(id);
    SC.Rescue.start(SC.Missions.rescueTarget());
    SC.UI.showMissions(missions, SC.Missions.rescueTarget());
    // bảng mục tiêu nấp 0.5s đầu của màn nhảy dù — hiện đúng lúc trận thật bắt đầu
    document.getElementById('missionPanel').classList.add('hidden');

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
    /* Dọn hiệu ứng toàn màn TRƯỚC KHI về lobby (bug thật 21/09/2026): nhặt bom rồi
       thoát ngay là bong bóng "BOM!" còn hạn diễn vài giây, renderer lobby vẫn vẽ
       nốt — nhìn như lobby nổ. startLevel có clear nhưng đường VỀ menu thì chưa ai
       dọn. Dọn cả FX hạt và đạn cho cùng lý do, không riêng gì bong bóng. */
    SC.ScreenFX.clear();
    SC.FX.clear();
    SC.Bullets.clear();
    SC.Items.clear();
    // rung + vệt mực/vật bay chiêu trùm (BossSkills.clear dọn cả Splats lẫn BossSig)
    SC.shake.t = 0; SC.shake.power = 0;
    SC.BossSkills.clear();
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
    /* Rung màn hình giảm dần ở MỌI trạng thái, không chỉ lúc chơi.
       BẪY ĐÃ SẬP (22/09/2026, live): bản cũ chỉ trừ shake.t trong update() — thoát màn
       đúng lúc đang rung (trùm nổ, ăn bom, chết) thì t đóng băng >0, renderer vẫn
       rung, cả lobby giật ±8px mãi không dứt. */
    if (SC.shake.t > 0) { SC.shake.t -= dt; if (SC.shake.t <= 0) { SC.shake.t = 0; SC.shake.power = 0; } }
    this.render(dt);
    requestAnimationFrame(t => this.loop(t));
  },

  /* Nhịp màn nhảy dù: total = trọn anim · hold = phase đứng khoe tàu ·
     gameAt = mốc hiện bảng mục tiêu + thả wave đầu (yêu cầu 21/09: 0.5/1.0/2.0) */
  INTRO: { total: 2.0, hold: 0.5, gameAt: 1.0 },

  /* Hệ số phóng đại tàu: phase khoe giữ nguyên 3.0 (nhìn cho RÕ), phase hạ cánh
     easeOutCubic 3.0 -> 1. Chỉ ảnh hưởng HÌNH VẼ (entity-player.render), hitbox
     giữ nguyên và bất tử phủ trọn intro nên không ai thiệt. */
  introScale() {
    if (!this.introT || this.introT <= 0) return 1;
    const el = this.INTRO.total - this.introT;
    if (el <= this.INTRO.hold) return 3.0;
    const k = Math.min(1, (el - this.INTRO.hold) / (this.INTRO.total - this.INTRO.hold));
    return 1 + 2.0 * Math.pow(1 - k, 3);
  },

  update(dt) {
    const p = this.player;

    /* Màn nhảy dù: intro TỰ dắt tàu bằng easeInOutQuad — không nhờ hệ bám con trỏ
       (tốc độ bám tuỳ nhánh giáp, bản đầu vì thế mà giật). Trước mốc gameAt chỉ có
       nền trôi; từ gameAt trận chạy thật nhưng tàu vẫn do intro dắt nốt tới 2s —
       tx/ty ghi đè mỗi khung để hệ bám không giành lái giữa chừng. */
    if (this.introT > 0) {
      this.introT -= dt;
      const el = this.INTRO.total - this.introT;
      const span = this.INTRO.total - this.INTRO.hold;
      const k = SC.clamp((el - this.INTRO.hold) / span, 0, 1);
      const e2 = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      p.x = SC.W / 2;
      p.y = SC.H * (0.45 + 0.33 * e2);
      p.tx = p.x; p.ty = p.y;
      p.t += dt;                                   // lửa động cơ vẫn thở
      if (!this._introPanel && el >= this.INTRO.gameAt) {
        this._introPanel = true;
        document.getElementById('missionPanel').classList.remove('hidden');
      }
      if (el < this.INTRO.gameAt) { SC.BG.update(dt); return; }
    }

    this.stats.time += dt;
    SC.BG.update(dt);

    // Khoảnh khắc TIẾN HOÁ: dừng hẳn ván, mở màn diễn dạng cũ -> dạng mới (ui-evolution.js),
    // người chơi bấm TIẾP TỤC mới chạy lại. Chỉ diễn khi màn hình đã trống — cắt ngang
    // lúc đang bị vây thì thành ức chế chứ không phải phần thưởng.
    if (SC.Variant.pending && !this.enemies.length && SC.Variant.play()) {
      this.state = 'evo';
      return;
    }

    // quyết hướng súng TRƯỚC khi bắn, nếu không loạt đạn của khung này còn dùng hướng cũ
    SC.Facing.update(dt, p, this.enemies, this.boss);
    p.update(dt);
    SC.Wingmen.update(dt, p);
    SC.Shield.update(dt, p, this);      // khiên đốt quái / bật đạn, tuỳ hướng đã chọn
    SC.Waves.update(dt, this.enemies);

    for (const e of this.enemies) e.update(dt, p, this.lv);
    SC.Bullets.update(dt, this.enemies, p);
    SC.Items.update(dt, p, (k, x, y) => SC.Combat.pickup(this, k, x, y));
    SC.Rescue.update(dt, p, (x, y) => SC.Combat.rescue(this, x, y));
    SC.FX.update(dt);
    SC.ScreenFX.update(dt);
    SC.Splats.update(dt);             // vệt mực tan dần kể cả khi trùm đã chết
    SC.Combat.collide(this);

    // hết combo theo thời gian
    if (this.comboT > 0) { this.comboT -= dt; if (this.comboT <= 0 && this.combo > 1) { this.combo = 1; SC.UI.setCombo(1); } }

    // dọn quái đã chết, đếm riêng con nào thoát khỏi màn hình
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const e = this.enemies[i];
      if (!e.dead) continue;
      // quái lọt qua đáy màn trừ thẳng máu — xem Player.leak()
      if (e.escaped) { this.stats.escaped++; p.leak(e); }
      this.enemies.splice(i, 1);
    }

    if (this.boss) {
      if (this.boss.dead) { this.boss = null; SC.UI.hideBoss(); }
      else {
        SC.UI.setBossHP(Math.max(0, this.boss.hp / this.boss.hpMax));
        SC.UI.moveBoss(this.boss);        // thanh máu bám theo chân trùm
      }
    }

    SC.UI.setHP(p.hp, p.hpMax, p.shield, p.shieldMax);
    SC.UI.setStats(this.score, this.coin);
    SC.UI.setTimer(this.stats.time, SC.Missions.timeTarget());

    // (rung màn hình giảm dần ở loop() — chạy cả ngoài trạng thái chơi)

    // điều kiện kết thúc — chờ dù cuối rơi xong mới tính là hết màn
    // Hết quái thì cắt dù thừa chưa thả (giữ đúng số còn thiếu cho nhiệm vụ),
    // không thì cuối màn nào có giải cứu cũng đứng đợi dù rơi — xem cutTail.
    if (SC.Waves.done) SC.Rescue.cutTail(this.stats.rescued);
    const rescuePending = SC.Rescue.list.length > 0 || SC.Rescue.toSpawn > 0;
    // hết quái thì dù thả nhanh và rơi nhanh, khỏi bắt người chơi đứng đợi
    if (SC.Waves.done && rescuePending) SC.Rescue.hurry = true;
    if (p.dead) { this.endT += dt; if (this.endT > 1.1) this.finish(false); }
    else if (SC.Waves.done && !this.enemies.length && !rescuePending) {
      this.endT += dt;
      if (this.endT > 1.1) this.finish(true);
    }
  },

  /* Kết thúc màn: chấm sao, tính vàng, ghi tiến độ — xem system-level-finish.js */
  finish(win) { SC.Finish.run(this, win); },

  render() { SC.Renderer.draw(this); }
};

SC.Game.init();

;
/* ===== js/system-m365-identity.js ===== */
/* system-m365-identity.js — danh tính tài khoản domain (M365) khi game chạy sau
 * oauth2-proxy trên *.zingplay.dev (bản deploy nội bộ, vd banga.zingplay.dev).
 *
 * BỐI CẢNH: trên hạ tầng zingplay.dev, người dùng ĐÃ đăng nhập M365 ở tầng proxy
 * trước khi thấy game — bắt họ bấm thêm "Đăng nhập Google" là vô lý. Module này:
 *   1. Hỏi oauth2-proxy (`/oauth2/userinfo`, cùng origin, ăn cookie phiên) lấy
 *      email + tên tài khoản domain.
 *   2. Hồ sơ đang mở còn tên mặc định ("PHI CÔNG n") thì đổi thành tên domain —
 *      tên này chính là tên hiện trên BXH (SC.Cloud.playerName đọc tên hồ sơ).
 *   3. Lấy "vé ghi điểm" bằng Firebase ANONYMOUS auth: luật Firestore đòi
 *      request.auth != null, còn danh tính thật nằm ở tên + trường m365Email
 *      trong bản ghi điểm (cloud-adapter.js đính kèm).
 *
 * VÌ SAO KHÔNG đăng nhập Google: user M365 không có phiên Google, và popup Google
 * sau proxy nội bộ vừa thừa vừa dễ bị chặn. Anonymous chỉ cần bật provider
 * "Anonymous" trong Firebase console — không cần thêm authorized domain.
 *
 * GIỚI HẠN: uid anonymous sống theo trình duyệt (IndexedDB), nên uid KHÔNG theo
 * người sang máy khác. Tiến độ giữa các máy được nối lại bằng gương email —
 * xem system-m365-progress-sync.js (bug thật 21/09/2026: đổi máy là về Màn 1).
 * BXH thì khử trùng lặp theo m365Email ở cloud-adapter.rank().
 *
 * Ở máy dev / bản portal GitHub Pages: hostname không khớp → module im lặng,
 * không phát sinh request nào. Hỏng bất kỳ bước nào cũng chỉ console.warn —
 * game không bao giờ vỡ vì thiếu proxy.
 */

SC.M365 = {
  info: null,     // { email, name } — null khi không chạy sau proxy
  status: 'off',  // vết chân từng bước, đọc được qua ?m365debug (soi trên điện thoại)

  /* Chỉ bật trên *.zingplay.dev — nơi chắc chắn có oauth2-proxy đứng trước */
  active() { return /(^|\.)zingplay\.dev$/.test(location.hostname); },

  /* Toast chỉ khi URL có ?m365debug — cách duy nhất soi được luồng này trên
     điện thoại thật, nơi không mở được DevTools. Người chơi thường không thấy gì. */
  _dbg(s) {
    this.status = s;
    if (/m365debug/.test(location.search) && SC.UI && SC.UI.toast) SC.UI.toast('M365: ' + s);
  },

  async init() {
    if (!this.active()) { this._dbg('off — ngoài zingplay.dev'); return; }
    /* Thứ tự: /oauth2/userinfo (nếu platform mở sau này) → /whoami (nginx của game
       echo header forward-auth — đường ĐANG chạy, xem ghi chú trong build-standalone). */
    this.info = (await this._userinfo()) || (await this._whoami());
    if (!this.info) return;                    // proxy không trả — thôi, như khách lạ
    this._dbg('userinfo OK: ' + this.info.name);
    this._nameProfile();
    // vẽ lại thẻ hồ sơ + menu nếu UI đã dựng xong (syncChip mới là chỗ vẽ tên)
    try {
      if (SC.AuthPanel && SC.AuthPanel.syncChip) SC.AuthPanel.syncChip();
      if (SC.UI && SC.UI.syncMenu) SC.UI.syncMenu();
    } catch (e) { /* UI chưa sẵn — reload sau sẽ đúng vì tên đã lưu */ }
    await this._ticket();
  },

  /* oauth2-proxy chuẩn expose /oauth2/userinfo cùng origin, trả JSON có
     email / user / preferredUsername tuỳ bản cấu hình — đọc kiểu phòng thủ.
     redirect:'manual': chưa có phiên thì proxy 302 về sign_in — theo redirect là
     dính CORS chéo origin rồi ném lỗi mù; chặn lại để phân biệt được "bị đá ra
     sign_in" (opaqueredirect) với "endpoint hỏng" khi debug. */
  async _userinfo() {
    try {
      const r = await fetch('/oauth2/userinfo',
        { credentials: 'include', redirect: 'manual', headers: { accept: 'application/json' } });
      if (r.type === 'opaqueredirect' || (r.status >= 300 && r.status < 400)) {
        this._dbg('userinfo bị redirect — cookie phiên không tới được proxy');
        return null;
      }
      if (!r.ok) { this._dbg('userinfo HTTP ' + r.status); return null; }
      const j = await r.json();
      const email = j.email || (typeof j.user === 'string' && j.user.includes('@') ? j.user : '') || '';
      let name = j.preferredUsername || j.preferred_username || j.user || email;
      if (typeof name !== 'string') name = email;
      if (name.includes('@')) name = name.split('@')[0];   // tên tài khoản domain, bỏ đuôi
      if (!email && !name) { this._dbg('userinfo JSON không có email/user'); return null; }
      return { email, name: name || email };
    } catch (e) {
      this._dbg('userinfo lỗi mạng: ' + (e && e.message));
      return null;
    }
  },

  /* /whoami — endpoint của CHÍNH nginx game (xem tools/build-standalone.mjs), trả
     các header danh tính mà tầng forward-auth bơm kèm request. Header vắng = chuỗi
     rỗng, nên gộp fallback hai họ tên header rồi kiểm còn gì thật không. */
  async _whoami() {
    try {
      const r = await fetch('/whoami', { credentials: 'include', headers: { accept: 'application/json' } });
      if (!r.ok) { this._dbg('whoami HTTP ' + r.status); return null; }
      const j = await r.json();
      const email = j.email || j.email2 || '';
      /* ĐO THẬT trên banga: user2 (X-Auth-Request-User) là UUID của Keycloak chứ
         không phải tên người — lấy nó làm tên hiển thị là BXH toàn mã máy. Loại
         mọi giá trị dạng UUID, ưu tiên email (phần trước @ chính là tên domain). */
      const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      let name = [j.preferredUsername, j.user, email, j.user2]
        .find(v => v && !uuid.test(v)) || '';
      if (name.includes('@')) name = name.split('@')[0];
      if (!email && !name) { this._dbg('whoami: header danh tính trống — SSO không bơm xuống backend'); return null; }
      return { email, name: name || email };
    } catch (e) {
      this._dbg('whoami lỗi mạng: ' + (e && e.message));
      return null;
    }
  },

  /* Chỉ đè tên MẶC ĐỊNH (hoặc tên do chính module này đặt trước đây).
     Người chơi đã tự đặt tên thì tôn trọng — tên là của họ. */
  _nameProfile() {
    const p = SC.Profiles.cur();
    if (!p) { this._dbg('hồ sơ chưa nạp — bỏ qua đổi tên'); return; }
    // Tên tài khoản domain để CHỮ THƯỜNG (yêu cầu 21/09/2026 — bản đầu in hoa).
    const ten = this.info.name.toLowerCase().slice(0, 14);   // 14 = maxlength ô đặt tên
    // Bản in hoa cũ do chính module đặt → được phép migrate xuống chữ thường.
    const tenCu = this.info.name.toUpperCase().slice(0, 14);
    if (!/^PHI CÔNG \d+$/.test(p.name) && p.name !== tenCu) {
      this._dbg('giữ tên tự đặt: ' + p.name); return;
    }
    if (p.name === ten) { this._dbg('tên đã đúng: ' + ten); return; }
    p.name = ten;
    SC.Profiles.save();
    this._dbg('đã đổi tên hồ sơ → ' + p.name);
  },

  /* Vé ghi điểm: anonymous session. _attach() nối listener onAuthStateChanged của
     Portal.Auth TRƯỚC khi đăng nhập, nên phiên anonymous đi qua đúng đường ống cũ:
     Portal.Auth.user được gán → Portal.Cloud.onUser → đồng bộ + ghi điểm như thường. */
  async _ticket() {
    if (!Portal.FB.configured()) { this._dbg('Firebase chưa cấu hình'); return; }
    try {
      const fb = await Portal.Auth._attach();
      if (!fb.auth.currentUser) {
        const cred = await fb.authM.signInAnonymously(fb.auth);
        // displayName để Portal.Auth.user.name không rơi về 'Người chơi'
        await fb.authM.updateProfile(cred.user, { displayName: this.info.name })
          .catch(() => { /* chỉ là nhãn phụ, hỏng không sao */ });
      }
      this._dbg('vé ghi điểm OK');
      /* Có vé rồi mới đọc được gương tiến độ theo email (luật đòi đã đăng nhập).
         Không await: kéo tiến độ chạy nền, hỏng cũng không chặn luồng danh tính. */
      if (SC.M365Sync) SC.M365Sync.restore();
    } catch (e) {
      // Thường gặp: provider Anonymous chưa bật trong Firebase console.
      // Game vẫn chạy, BXH rơi về bảng nội bộ của máy — không chặn người chơi.
      this._dbg('vé ghi điểm FAIL: ' + ((e && e.code) || e));
      console.warn('[m365] chưa lấy được vé ghi điểm:', (e && e.code) || e);
    }
  }
};

/* Tự chạy sau khi mọi script đồng bộ đã nạp (file này nằm sau main.js trong
   index.html, build.mjs giữ nguyên thứ tự) — lúc này adapter cloud đã đăng ký. */
setTimeout(() => { SC.M365.init(); }, 0);

/* Mở game LÚC MẤT MẠNG (PWA offline): /whoami lẫn SDK Firebase đều hỏng → danh
   tính chết cả phiên, điểm chơi offline không có đường lên BXH cho tới lần reload.
   Có mạng lại thì làm lại từ đầu — init() tự bỏ qua bước đã xong (tên đã đổi thì
   giữ, ticket thấy currentUser thì không đăng nhập lại, restore có guard riêng).
   Đợi 1.2s cho mạng ổn: sự kiện 'online' hay nổ sớm hơn lúc DNS thật sự thông. */
window.addEventListener('online', () => {
  if (SC.M365.active() && (!SC.M365.info || !Portal.Auth.user))
    setTimeout(() => { SC.M365.init(); }, 1200);
});

;
/* ===== js/system-m365-progress-sync.js ===== */
/* system-m365-progress-sync.js — kéo/đẩy tiến độ theo EMAIL cho bản deploy zingplay.dev
 *
 * BUG THẬT (21/09/2026, banga.zingplay.dev): người chơi Màn 6 ở máy A, mở máy B thì
 * game về Màn 1 dù BXH vẫn hiện "Màn 6". Nguyên nhân: vé ghi điểm là Firebase
 * ANONYMOUS, uid sống theo trình duyệt (IndexedDB) — máy mới là uid mới, users/{uid}
 * trống trơn; tiến độ cũ nằm dưới uid của máy cũ mà luật Firestore chỉ cho chính chủ
 * đọc, nên không đường nào với tới. Đây là "GIỚI HẠN CHẤP NHẬN" ghi ở đầu
 * system-m365-identity.js — giờ cần thật rồi nên chữa.
 *
 * CÁCH CHỮA không cần server: soi GƯƠNG tiến độ vào m365Users/{emailKey} — collection
 * riêng, khoá theo email domain, thứ DUY NHẤT ổn định giữa các máy. Máy nào chơi thì
 * treo gương lên đó sau mỗi lần lưu; máy khác đăng nhập xong đọc gương, thấy tiến độ
 * tốt hơn thì nhận về. Máy này cũng có tiến độ thì HỎI bằng đúng hộp thoại merge sẵn
 * có — giữ quy tắc vàng của portal-cloud.js: KHÔNG BAO GIỜ tự ghi đè.
 *
 * MỨC TIN CẬY: email do /whoami trả về Ở CLIENT — ai sửa client thì khai email nào
 * cũng được, và luật chỉ đòi "đã đăng nhập" (anonymous token không mang email nên
 * luật KHÔNG THỂ kiểm email thật; muốn kiểm phải có server mint custom token). Chấp
 * nhận: cùng mức chống gian lận "chỉ chặn số vô lý" của cả dự án (xem đầu
 * firestore.rules), và danh tính M365 vốn client-claimed từ trước.
 *
 * VÌ SAO KHÔNG SỬA shared/portal-cloud.js: uid-không-ổn-định là đặc thù của riêng
 * bản deploy M365 — theo ranh giới chung/riêng thì thuộc adapter của game. Sửa
 * shared/ còn kéo theo build + deploy lại MỌI game (mỗi game precache shared riêng).
 */

SC.M365Sync = {
  /* Chỉ bật sau khi restore() ĐỌC GƯƠNG THÀNH CÔNG. Đọc hỏng (mất mạng, luật chưa
     dán, hết hạn giờ) thì module NGỦ CẢ PHIÊN — vì không biết gương đang giữ gì,
     ghi bừa là máy tiến-độ-thấp đè mất gương tốt, đúng cái bug đang chữa.
     Tiến độ phiên đó vẫn lưu bình thường ở users/{uid}, chỉ thiếu bản gương. */
  /* Khoá gương ĐÃ đọc thành công (22/09/2026: mỗi hồ sơ một gương — đổi hồ sơ là
     khoá mới, phải đọc gương của hồ sơ đó trước rồi mới được treo đè). */
  _readyKey: '',
  _timer: 0,

  /* Email → id tài liệu Firestore. Chữ thường để "Duc@X" và "duc@x" về một khoá.
     Ngoài zingplay.dev (SC.M365.info = null) trả chuỗi rỗng → cả module im lặng. */
  _base() {
    const e = SC.M365 && SC.M365.info && SC.M365.info.email;
    return e ? e.toLowerCase().replace(/[^a-z0-9@._-]/g, '_').slice(0, 100) : '';
  },
  /* hồ sơ 1 = khoá email như cũ, hồ sơ 2-3 = email_p{id} (system-cloud-profile-roster.js) */
  _key() {
    const b = this._base(), p = SC.Profiles.cur();
    return b && p && p.id !== 1 ? `${b}_p${p.id}` : b;
  },

  /* Portal.Cloud.pull() giữ state 'pull' suốt cả lúc hộp thoại merge của NÓ đang mở.
     Phải đợi nó xong rồi mới restore, vì hai lẽ:
       1. askMerge ép-chốt hộp cũ = 'local' khi bị gọi đè (ui-auth-panel) — hai nguồn
          hỏi song song là câu trả lời thật của người chơi bị nuốt.
       2. local phải chụp SAU khi pull có thể đã adopt, không thì so weight trên đồ cũ.
     Chờ 1 giây đầu cho onAuthStateChanged kịp khởi động pull (thứ tự listener của
     SDK không đảm bảo), trần 12 giây phòng state kẹt — quá trần thì cứ chạy tiếp. */
  _waitPullSettled() {
    return new Promise(res => {
      const t0 = Date.now();
      const thu = () => {
        if ((Date.now() - t0 > 1000 && Portal.Cloud.state() !== 'pull')
          || Date.now() - t0 > 12000) res();
        else setTimeout(thu, 300);
      };
      setTimeout(thu, 1000);
    });
  },

  /* Gọi sau khi có vé anonymous (system-m365-identity._ticket). Có thể bị gọi
     LẠI khi mạng rớt rồi có lại (identity nghe 'online' và init lại) — đã đọc
     gương thành công rồi thì thôi, chạy nữa là hộp thoại merge hiện lặp. */
  async restore() {
    const key = this._key();
    if (key && this._readyKey === key) return;
    if (!key || !Portal.FB.configured()) return;
    await this._waitPullSettled();
    try {
      const fb = await Portal.FB.load();
      const { doc, getDoc } = fb.fsM;
      const snap = await Portal.FB.limit(
        getDoc(doc(fb.db, 'm365Users', key)), 'đọc tiến độ theo email');
      const data = snap.exists() ? snap.data() : null;
      if (data) SC.CloudRoster.adopt(data.profiles);          // máy mới: dựng lại đủ hồ sơ
      // chỉ nhận gương ĐÚNG hồ sơ đang mở (bản cũ chưa có pid = của hồ sơ 1)
      const cloud = data && SC.CloudRoster.accepts(data) ? data.progress : null;
      if (key !== this._key()) return;        // người chơi đổi hồ sơ giữa lúc đọc -> bỏ
      const local = SC.UI.progress;

      if (!cloud || SC.Cloud._empty(cloud)) {
        /* Gương chưa có gì (máy đầu tiên ghé sau bản cập nhật này) —
           _done() bên dưới sẽ treo gương từ tiến độ máy này. */
      } else if (SC.Cloud._empty(local)) {
        SC.Cloud.adopt(cloud);        // máy mới tinh → nhận luôn, không có gì để mất
        SC.Cloud.markDirty(0);        // đẩy lên users/{uid mới} + scores cho BXH
      } else if (SC.Cloud._weight(cloud) > SC.Cloud._weight(local)) {
        const pick = await SC.AuthPanel.askMerge(local, cloud);
        if (pick === 'cloud') { SC.Cloud.adopt(cloud); SC.Cloud.markDirty(0); }
        /* chọn 'local' → _done() treo gương bằng bản máy này, đè bản cũ: đó là
           lựa chọn có chủ đích của người chơi, không phải máy tự quyết */
      }
      this._done(key);
    } catch (e) {
      /* KHÔNG _done() ở đây — xem chú thích cờ _ready. Không toast: người chơi
         không làm gì được với lỗi này, game vẫn chạy như cũ. */
      console.warn('[m365-sync] không đọc được gương tiến độ:', (e && e.code) || e);
    }
  },

  _done(key) {
    this._readyKey = key;
    this.mirror();   // luôn treo gương một lần sau restore — để máy cũ seed gương
  },

  /* Treo gương: ghi tiến độ hiện tại vào m365Users/{key}. cloud-adapter gọi sau mỗi
     markDirty. Gom 3 giây giống portal-cloud.push để đỡ tốn hạn mức miễn phí. */
  mirror() {
    const key = this._key();
    /* Chưa đọc gương thành công thì KHÔNG được ghi: máy trắng/máy yếu ghi trước là
       đè mất gương của máy kia — đúng cái đang cần cứu (xem chú thích _ready). */
    if (!key || this._readyKey !== key) return;
    const p = SC.UI.progress;
    if (SC.Cloud._empty(p)) return;   // máy trắng không có gì đáng treo lên gương
    // chốt pid NGAY LÚC GỌI: đổi hồ sơ trong 3 giây gom thì key cũ + pid mới là lệch
    const meta = SC.CloudRoster.meta();
    clearTimeout(this._timer);
    this._timer = setTimeout(async () => {
      try {
        const fb = await Portal.FB.load();
        if (!fb.auth.currentUser) return;      // luật đòi request.auth != null
        const { doc, setDoc, serverTimestamp } = fb.fsM;
        /* KHÔNG merge:true — setDoc trơn THAY CẢ TÀI LIỆU. merge sẽ gộp đệ quy map
           lồng nhau: progress.stars/times thành UNION khoá cũ + mới trong khi
           unlocked/coin bị đè — gương thành bản lai không của máy nào, weight ảo
           cao vì stars chi phối. Thay nguyên doc thì gương luôn là ảnh thật của
           đúng một máy. (code-review 21/09/2026, lỗi M1) */
        await Portal.FB.limit(setDoc(doc(fb.db, 'm365Users', key), {
          email: (SC.M365.info.email || '').slice(0, 80),
          // lọc như safeName của portal-cloud: tên sẽ có ngày được vẽ ra UI
          name: SC.Cloud.playerName().replace(/[\x00-\x1F<>]/g, '').slice(0, 40),
          progress: p,
          ...meta,                                 // pid + danh sách hồ sơ
          updatedAt: serverTimestamp()
        }), 'lưu tiến độ theo email');
      } catch (e) {
        console.warn('[m365-sync] không treo được gương:', (e && e.code) || e);
      }
    }, 3000);
  }
};

;