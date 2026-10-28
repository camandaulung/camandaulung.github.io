/* ===== js/core-namespace.js ===== */
/* core-namespace.js — biến toàn cục duy nhất của game và bus sự kiện tối giản
 *
 * VÌ SAO DÙNG `globalThis` CHỨ KHÔNG `window`:
 * Toàn bộ nhóm core-/data-/state-/rules- phải nạp được vào Node qua `vm` để bộ kiểm
 * và bot mô phỏng chạy không cần trình duyệt. `window` không tồn tại trong Node, còn
 * `globalThis` thì có ở cả hai nơi. Nhờ vậy file này không cần một ngoại lệ nào trong
 * `tools/check-purity.mjs` — luật "không chạm window" giữ được nguyên vẹn, không thủng
 * một lỗ nào để về sau người khác nới thêm.
 *
 * (Các game khác trong repo dùng `window` vì lớp luật của chúng ra đời trước quy ước
 * này. Đừng chép sang đây.)
 */

globalThis.ND = globalThis.ND || {};

ND.bus = (function () {
  const handlers = {};   // 'ten:su-kien' -> [hàm, ...]

  return {
    on(name, fn) {
      (handlers[name] = handlers[name] || []).push(fn);
      return fn;
    },

    off(name, fn) {
      const list = handlers[name];
      if (!list) return;
      const i = list.indexOf(fn);
      if (i >= 0) list.splice(i, 1);
    },

    /* Phát sự kiện.
     *
     * Lặp trên BẢN SAO của danh sách: một hàm nghe có thể gọi `off` cho chính nó ngay
     * trong lúc xử lý (hiệu ứng một lần rất hay làm vậy). Lặp thẳng trên mảng gốc thì
     * việc xoá làm chỉ số trượt và hàm kế tiếp bị bỏ qua — lỗi im lặng, khó lần.
     */
    emit(name, payload) {
      const list = handlers[name];
      if (!list || !list.length) return;
      const snapshot = list.slice();
      for (let i = 0; i < snapshot.length; i++) snapshot[i](payload);
    },

    /* Xoá sạch — gọi khi bắt đầu ván mới để hiệu ứng của ván trước không còn nghe. */
    clear() {
      for (const k in handlers) delete handlers[k];
    }
  };
})();

;
/* ===== js/core-config.js ===== */
/* core-config.js — MỌI hằng số cân bằng của game, một chỗ duy nhất
 *
 * Quy tắc bất di bất dịch: phase 07 (cân bằng) chỉ được sửa file này. Nếu để chỉnh
 * cân bằng mà phải mó vào `rules-*` thì nghĩa là có số ma đã lọt ra ngoài — dọn về đây
 * trước, chỉnh sau. Số rải rác khắp nơi là lý do phổ biến nhất khiến việc cân bằng
 * biến thành đoán mò.
 *
 * Nguồn của mọi con số dưới đây: docs/neon-dash-gdd.md. Chỗ nào GDD giải thích LÝ DO
 * thì ở đây chỉ ghi mục tham chiếu, không chép lại lý luận.
 *
 * Một số hằng số phase 01 chưa dùng tới (booster, chunk) vẫn khai sẵn — để phase sau
 * chỉ việc đọc, và để bảng số của cả game nhìn thấy được ở một màn hình.
 */

ND.CFG = {

  /* ---------- đường và làn (GDD 3.1) ---------- */
  LANES: 3,
  LANE_W: 3.0,             // m, bề rộng một làn
  VIEW_DIST: 70,           // m, tầm nhìn — quyết định thời gian phản ứng
  FOG_NEAR: 45,            // m, sương mù bắt đầu; vật hiện dần chứ không "nhảy vào"
  FOG_FAR: 70,

  /* ---------- camera (GDD 3.2) ---------- */
  CAM: {
    LOOK_AHEAD: 12,        // m, camera nhìn vào NƠI SẮP TỚI, không nhìn vào nhân vật
    NORMAL: { back: 8.5, up: 4.2, fov: 62 },
    SURGE:  { back: 9.5, up: 4.2, fov: 70 },   // FOV làm phần lớn cảm giác nhanh
    JET:    { back: 11.0, up: 8.5, fov: 65 },
    LERP_S: 0.30           // giây, thời gian nội suy khi đổi trạng thái
  },

  /* ---------- tốc độ (GDD 4.1) ---------- */
  SPEED: {
    /* NHỊP ĐÃ ĐƯỢC ĐẨY NHANH sau lượt chơi thử đầu tiên (người chơi báo "pacing chậm").
     *
     * Bản đầu: 12.0 m/s, +0.7 mỗi 150 m -> chạm trần ở 3000 m. Đo ra khoảng cách trung
     * bình giữa hai cụm vật là 19.6 m, tức 1.6 giây ở tốc độ đầu — và phân vị 90 lên tới
     * 42 m, gần 3.5 giây KHÔNG CÓ GÌ. Đó là thứ người chơi đọc ra là "tối thui".
     *
     * Bản này: 14.0 m/s, +0.8 mỗi 120 m -> chạm trần ở 1800 m. Vào ván đã có nhịp ngay,
     * và đoạn giữa ván không còn lê thê. */
    BASE: 14.0,            // m/s lúc xuất phát
    STEP: 0.8,             // m/s cộng thêm mỗi bậc
    STEP_EVERY: 120,       // m, khoảng cách giữa hai bậc
    MAX: 26.0              // m/s trần — xem GDD 4.1 giải thích vì sao phải có trần
  },

  /* ---------- nhân vật (GDD 5.1, 5.2, 5.3, 5.4) ---------- */
  RUNNER: {
    BOX_RUN:   { w: 0.70, h: 1.70, d: 0.60 },
    BOX_SLIDE: { w: 0.70, h: 0.90, d: 1.10 },   // thấp đi VÀ dài ra, xem GDD 5.1

    JUMP_H: 2.2,           // m, đỉnh parabol
    JUMP_T: 0.62,          // s, THỜI GIAN cố định — không đổi theo tốc độ (GDD 5.2)
    FAST_FALL_MUL: 2.6,    // nhấn cúi giữa lúc bay -> rơi nhanh, đường cứu vãn

    SLIDE_T: 0.55,         // s, cúi một nhịp; giữ phím thì kéo dài
    LANE_T: 0.16,          // s, thời gian trượt sang làn khác

    /* BUFFER_T PHẢI LỚN HƠN LANE_T — đây là ràng buộc, không phải số tuỳ chỉnh.
     *
     * Đệm tồn tại để cứu lệnh bấm GIỮA LÚC ĐANG TRƯỢT. Lệnh bấm ngay đầu lần trượt
     * phải sống được tới lúc lần trượt đó xong, tức là ít nhất LANE_T giây. GDD ghi
     * 0.15 < 0.16 nên đệm hết hạn TRƯỚC khi tới lượt dùng — chuỗi "trái rồi trái"
     * vẫn bị nuốt y như không có đệm. Bắt được bằng khẳng định [8] trong check-rules.
     *
     * 0.22 = LANE_T + 0.06 dự phòng cho lệnh bấm hơi sớm trước cả lúc trượt bắt đầu. */
    BUFFER_T: 0.22
  },

  /* ---------- chướng ngại (GDD 6) ---------- */
  OBSTACLE: {
    HANG_Y: 1.15           // m, đáy của dầm treo và ống dài
  },

  /* ---------- BIÊN THA VA CHẠM ----------
   *
   * Hộp va chạm THẬT nhỏ hơn hộp nhìn thấy. Đây là chuẩn của thể loại, không phải ăn
   * gian: người chơi phán đoán bằng mắt trên một cảnh đang lao 20 m/s, nên vài phân sai
   * lệch là chuyện thường. Chết vì "chạm đúng một góc" đọc ra là game hỏng, không đọc ra
   * là mình dở — và đó là kiểu ức chế làm người ta bỏ game.
   *
   * Ba biên, mỗi biên chữa một tình huống người chơi thật sự gặp:
   *
   *   X      lách trái/phải mà cạ nhẹ vào mép vật  -> tha
   *   TOP    nhảy qua mà quẹt mép trên              -> tha (coi như đã lên trên được)
   *   BOTTOM cúi chui mà quẹt mép dưới              -> tha
   *
   * RÀNG BUỘC KHÔNG ĐƯỢC PHÁ: `JUMP_H + FORGIVE_TOP` phải NHỎ HƠN chiều cao tường.
   * Nếu không thì nhảy qua được tường, và cả nhóm chunk "chắn hai làn" mất hết ý nghĩa
   * vì đâu cũng nhảy qua được. `check-rules` khoá ràng buộc này. */
  FORGIVE: {
    X: 0.25,               // m, thu hẹp mỗi bên theo trục ngang
    TOP: 0.30,             // m, quẹt mép trên bấy nhiêu vẫn coi là đã vượt
    BOTTOM: 0.18           // m, quẹt mép dưới bấy nhiêu vẫn coi là đã chui lọt
  },

  /* ---------- chunk và bộ sinh (GDD 7) ---------- */
  CHUNK: {
    LEN: 24,               // m, một chunk
    CELLS: 8,              // ô mỗi chunk -> mỗi ô 3 m
    /* Chunk nghỉ là 24 m HOÀN TOÀN TRỐNG. Cứ 5 chunk một lần (REST_EVERY = 4) thì cộng
     * với khoảng trống hai đầu chunk lân cận, người chơi gặp những quãng 42 m không có
     * gì — đo được ở lượt chơi thử đầu. Giãn ra thành mỗi 7 chunk. */
    REST_EVERY: 6,         // cứ mấy chunk thì chèn một chunk nghỉ
    TIER_AT: [             // mét -> tier tối đa được mở
      { m: 0,    tier: 1 },
      { m: 300,  tier: 2 },
      { m: 800,  tier: 3 },
      { m: 1600, tier: 4 }
    ],
    ACTIVE_BACK: 10,       // m, giữ vật hoạt động phía sau nhân vật
    ACTIVE_AHEAD: 80       // m, và phía trước
  },

  /* ---------- booster (GDD 8) ---------- */
  BOOSTER: {
    JET_MS: 5000,
    SURGE_MS: 4000,
    SMASH_MS: 6000,

    GAP_MIN: 350,          // m, khoảng cách nhỏ nhất giữa hai booster
    GAP_MAX: 550,
    JET_Y: 6.0,            // m, độ cao khi bay
    JET_LAND_S: 1.0,       // s, hạ cánh — VẪN BẤT TỬ suốt lúc này (GDD 8 bước 3)
    SMASH_BONUS: 15,       // m thưởng mỗi khối phá được

    /* Ống dài 15 m tính bằng 3 khối. Nếu tính 1 khối thì phá ống — vật khó nhất — lại
     * lãi bằng phá một cái tường mỏng 0.5 m, và người chơi học được bài học sai. */
    TUBE_BLOCKS: 3,

    STACK_MAX_MUL: 2       // cùng loại cộng dồn, trần = 2x thời lượng gốc
  },

  /* ---------- ngọc neon (GDD 8.5) ---------- */
  SHARD: {
    ARC_MIN: 5,            // viên mỗi cung
    ARC_MAX: 9,
    STEP_M: 2.0,           // m giữa hai viên trong một cung
    Y_FLAT: 1.0,           // độ cao cung ở đoạn nghỉ
    Y_HIGH: 2.2,           // đỉnh cung dẫn mắt LÊN trước rào thấp (bằng đỉnh nhảy)
    Y_LOW: 0.55,           // cung dẫn mắt XUỐNG trước dầm treo (thấp hơn đáy dầm 1.15)
    PICK_DZ: 1.2,          // m, bán kính nhặt theo trục chạy
    PICK_DY: 1.6           // m, dung sai độ cao khi nhặt
  },

  /* ---------- vòng lặp (GDD 9.4) ---------- */
  LOOP: {
    STEP: 1 / 120,         // s, bước thời gian cố định của luật
    MAX_ACC: 0.25          // s, chặn trần bộ dồn — xem core-loop.js giải thích
  },

  /* ---------- chống gian lận (GDD 12.4) ---------- */
  ANTICHEAT: {
    MAX_METERS: 100000,
    SPEED_SLACK: 1.7       // biên cho thưởng phá khối khi đối chiếu mét/thời gian
  },

  /* ---------- màu neon ----------
   * Nền và sương mù PHẢI cùng một màu. Khác nhau thì đường chân trời lộ ra một vệt
   * ranh giới thẳng, phá hẳn ảo giác chiều sâu mà sương mù dựng lên. */
  COLOR: {
    /* Chàm tối, bão hoà thấp (P02 plan art AAA, hướng art A) = dải chân trời của vòm trời (view-sky.js). Sương sáng hơn
     * sẽ ăn màu hành động ở 60 m; đen tuyền cũ làm mọi thứ ngoài đường thành hư không. */
    BG: 0x1d1733,
    FOG: 0x1d1733,

    /* Mặt đường sáng hơn bản đầu (0x11132a → 0x1a1e3d) và vạch làn cũng vậy.
     *
     * Người chơi báo "tối thui". Một phần là do đường trống, nhưng một phần là mặt đường
     * gần như trùng màu nền: chênh lệch cũ chỉ 12/255 nên trên màn thường gần như không
     * thấy đâu là đường, đâu là hư không. */
    ROAD: 0x1a1e3d,
    LANE_LINE: 0x4a63a8,
    RUNG: 0x6f8fd6,        // vạch ngang trên mặt đường — thứ làm mắt đọc được tốc độ

    /* Lề đường đổi màu theo bậc tốc độ — phase 05 dùng, xoay vòng danh sách này.
     * Đây là tín hiệu "đang nhanh cỡ nào" đọc được bằng mắt ngoại vi, không cần
     * rời mắt khỏi đường để liếc HUD.
     * P02 plan art AAA: bậc 0 cũ #00e5ff lệch lam-cúi 5°, bậc 3 cũ #ff4dcd lệch hồng-né 14° → lề sát làn đọc như chướng
     * ngại giả (tools/check-palette.mjs). Thang mới nóng dần về TRẮNG, không về đỏ: bản thử đỏ #ff4d4d qua bloom + tone
     * map ra hồng, đứng sát tường hồng-né là lẫn (r2b). Chàm → tím → tím đậm → oải hương nhạt → trắng nóng. */
    EDGE_STEPS: [0x4d6bff, 0x7f4dff, 0xb04dff, 0xd8c8ff, 0xfff1e8]
  }
};

;
/* ===== js/core-rng.js ===== */
/* core-rng.js — bộ sinh số giả ngẫu nhiên CÓ HẠT GIỐNG
 *
 * VÌ SAO KHÔNG DÙNG `Math.random()`:
 * Đường chạy, thứ tự chunk và vị trí booster đều lấy từ đây. Có hạt giống nghĩa là
 * PHÁT LẠI ĐƯỢC một ván y hệt — thứ duy nhất giúp lần ra lỗi kiểu "đoạn đó không né
 * nổi" mà người chơi báo. `Math.random()` không có cách nào tái hiện.
 *
 * Cũng là điều kiện để bot ở phase 07 so sánh được: đổi một hằng số cân bằng rồi chạy
 * lại 2000 ván trên CÙNG bộ hạt giống thì chênh lệch là do hằng số, không phải do may.
 *
 * Thuật toán: mulberry32 — 32 bit trạng thái, phân bố đủ tốt cho game, ngắn gọn, và
 * quan trọng nhất là cho CÙNG kết quả ở mọi máy (chỉ dùng phép nguyên 32 bit).
 */

ND.Rng = (function () {

  /* Băm chuỗi thành số 32 bit để nhận hạt giống dạng chữ ("test-01") lẫn dạng số. */
  function hashSeed(seed) {
    if (typeof seed === 'number') return seed >>> 0;
    const s = String(seed === undefined || seed === null ? 'neon-dash' : seed);
    let h = 2166136261 >>> 0;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }

  function create(seed) {
    let a = hashSeed(seed);

    /* Số thực trong [0, 1) */
    function next() {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1) >>> 0;
      t = (t ^ (t + Math.imul(t ^ (t >>> 7), t | 61))) >>> 0;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }

    return {
      next,

      /* Số nguyên trong [lo, hi] — HAI ĐẦU ĐỀU LẤY. Ghi rõ vì nhầm đóng/mở khoảng ở
       * chỗ này là lỗi lệch-một kinh điển. */
      int(lo, hi) { return lo + Math.floor(next() * (hi - lo + 1)); },

      /* Số thực trong [lo, hi) */
      range(lo, hi) { return lo + next() * (hi - lo); },

      pick(arr) { return arr[Math.floor(next() * arr.length)]; },

      /* Xáo tại chỗ (Fisher–Yates). Dùng cho túi xáo trộn ở phase 03/04. */
      shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(next() * (i + 1));
          const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
        return arr;
      },

      /* Chụp/khôi phục trạng thái — cần khi muốn phát lại từ giữa ván. */
      state() { return a; },
      setState(v) { a = v >>> 0; }
    };
  }

  return { create, hashSeed };
})();

;
/* ===== js/core-loop.js ===== */
/* core-loop.js — bộ dồn thời gian bước cố định
 *
 * VÌ SAO TÁCH KHỎI requestAnimationFrame:
 * File này chỉ làm phép tính "đã trôi bao lâu thì chạy bao nhiêu bước" — thuần dữ liệu,
 * không chạm trình duyệt. Nhờ vậy nó nạp được vào Node cùng nhóm luật, và bot ở phase 07
 * chạy đúng cái vòng lặp mà người chơi chạy. Phần rAF nằm ở `main.js`.
 *
 * VÌ SAO BƯỚC CỐ ĐỊNH (1/120 s) chứ không dùng thẳng deltaTime:
 * Bước thay đổi làm vật lý nhảy khác nhau trên máy 60Hz và 144Hz — cùng một cú nhảy
 * lại vượt được quãng khác nhau. Với game xếp hạng theo mét thì đó là bất công thẳng
 * thừng. Bước cố định cho mọi máy cùng kết quả.
 */

ND.Loop = (function () {

  function create(opts) {
    const STEP = ND.CFG.LOOP.STEP;
    const MAX_ACC = ND.CFG.LOOP.MAX_ACC;

    let acc = 0;          // thời gian đã trôi mà chưa mô phỏng
    let last = null;      // mốc thời gian lần gọi trước, tính bằng mili giây
    let steps = 0;        // tổng số bước đã chạy, dùng để chẩn đoán

    return {
      /* Gọi mỗi khung hình với mốc thời gian hiện tại (ms).
       * Trả về `alpha` ∈ [0, 1) — phần dư của bộ dồn, để lớp hiển thị NỘI SUY.
       *
       * Không nội suy thì luật chạy 120 Hz mà màn hình vẽ 60 Hz sẽ thấy giật nhẹ đều
       * đặn: mỗi khung hình lấy trạng thái ở một thời điểm hơi lệch so với lúc vẽ.
       */
      advance(nowMs) {
        if (last === null) { last = nowMs; return 0; }

        let dt = (nowMs - last) / 1000;
        last = nowMs;

        /* CHẶN TRẦN BỘ DỒN — đừng bỏ.
         *
         * Chuyển sang tab khác rồi quay lại, trình duyệt tạm dừng rAF nên `dt` có thể
         * là vài chục giây. Không chặn thì vòng dưới chạy hàng nghìn bước trong một
         * khung hình: trang treo cứng vài giây, và nhân vật đã "chạy" qua cả trăm mét
         * mù trong lúc người chơi không hề nhìn.
         *
         * Chặn trần nghĩa là thời gian mất đi bị bỏ luôn — đúng ý muốn: ván tiếp tục
         * từ chỗ đang đứng chứ không tua nhanh.
         */
        if (dt > MAX_ACC) dt = MAX_ACC;
        if (dt < 0) dt = 0;          // đồng hồ nhảy lùi (đổi giờ hệ thống)

        acc += dt;

        while (acc >= STEP) {
          opts.step(STEP);
          acc -= STEP;
          steps++;
        }

        return acc / STEP;
      },

      /* Gọi khi bắt đầu ván mới hoặc sau khi tạm dừng.
       * Không gọi thì lần `advance` kế tiếp thấy một khoảng `dt` khổng lồ. */
      reset() { acc = 0; last = null; },

      stepCount() { return steps; }
    };
  }

  return { create };
})();

;
/* ===== js/core-input.js ===== */
/* core-input.js — hàng đợi lệnh, THUẦN DỮ LIỆU
 *
 * File này KHÔNG biết bàn phím hay màn cảm ứng tồn tại. Nó chỉ nhận những lệnh trừu
 * tượng và giữ cho tới bước mô phỏng kế. Phần nghe sự kiện DOM nằm ở
 * `ui-input-bind.js` (phase 05).
 *
 * Vì sao tách: bot ở phase 07 "bấm nút" bằng đúng những lệnh này, nên nó đi qua y hệt
 * đường đi của người chơi thật. Nếu luật đọc thẳng `keydown` thì bot phải giả lập sự
 * kiện DOM — tức là phải chạy trình duyệt, tức là 2000 ván mô phỏng trở nên bất khả thi.
 *
 * Lệnh tiêu Ở ĐẦU MỖI BƯỚC chứ không xử lý ngay lúc nhận. Nhờ vậy hai lệnh bấm trong
 * cùng một khung hình vẫn vào đúng thứ tự, và kết quả không phụ thuộc việc trình duyệt
 * gọi hàm nghe lúc nào so với vòng lặp.
 */

ND.Input = (function () {

  const HOP_LE = { left: 1, right: 1, jump: 1, slide: 1, 'slide-up': 1 };

  return {
    /* Đẩy một lệnh vào hàng đợi của ván. */
    send(s, cmd) {
      if (!HOP_LE[cmd]) throw new Error('Lệnh không hợp lệ: ' + cmd);
      if (!s.alive) return;
      s.queue.push(cmd);
    },

    /* Tiêu hết hàng đợi. `rules-run` gọi ở đầu mỗi bước.
     *
     * `length = 0` chứ không `s.queue = []`: giữ nguyên mảng cũ nên không cấp phát
     * thêm gì mỗi khung hình (ngân sách "0 cấp phát" ở GDD mục 13). */
    drain(s) {
      const q = s.queue;
      for (let i = 0; i < q.length; i++) {
        const cmd = q[i];
        if (cmd === 'left') ND.Rules.Lane.request(s, -1);
        else if (cmd === 'right') ND.Rules.Lane.request(s, 1);
        else if (cmd === 'jump') ND.Rules.JumpSlide.jump(s);
        else if (cmd === 'slide') ND.Rules.JumpSlide.slideDown(s);
        else if (cmd === 'slide-up') ND.Rules.JumpSlide.slideUp(s);
      }
      q.length = 0;
    }
  };
})();

;
/* ===== js/data-obstacles.js ===== */
/* data-obstacles.js — bốn loại chướng ngại và hộp va chạm của chúng
 *
 * Mỗi loại tồn tại để ÉP ĐÚNG MỘT LỆNH. Đó là điều kiện để cả bốn phím đều có nghĩa —
 * nếu hai loại cùng vượt được bằng một cách thì một trong hai là thừa.
 *
 *   tường   -> chỉ né trái/phải     (cao 2.9 m, nhảy không qua)
 *   rào     -> NHẢY  (hoặc né)      (cao 0.85 m)
 *   dầm     -> CÚI   (hoặc né)      (treo, đáy 1.15 m — nhảy vào là chết)
 *   ống     -> GIỮ CÚI              (dài, một nhịp cúi không đủ)
 *
 * Hộp là AABB (thẳng trục), không dùng lưới đa giác: luật va chạm phải chạy được
 * trong Node không có Three.js.
 *
 * `yBase` là mép DƯỚI của vật. Vật đứng đất có yBase = 0; vật treo có yBase > 0 và
 * khoảng trống bên dưới chính là chỗ để chui.
 */

ND.Data = ND.Data || {};

ND.Data.Obstacles = (function () {

  /* Bề rộng 2.6 m trên làn rộng 3.0 m: chừa 0.2 m mỗi bên. Chừa khe này là có chủ ý —
   * vật chạm sát mép làn thì lúc đang trượt sang làn kế, hộp nhân vật (rộng 0.7 m) va
   * vào vật của làn mình VỪA RỜI trong khi mắt đã thấy mình sang làn mới. Cảm giác
   * "chết oan" đó gần như không giải thích được cho người chơi. */
  const W = 2.6;

  const TYPES = {
    /* TƯỜNG CAO 2.9 m, không phải 2.4 m.
     *
     * Con số này bị ràng buộc bởi biên tha va chạm: nhảy tới đỉnh 2.2 m, cộng biên tha
     * mép trên 0.3 m là 2.5 m. Tường 2.4 m sẽ NHẢY QUA ĐƯỢC, và mọi chunk "chắn hai làn"
     * mất sạch ý nghĩa vì đâu cũng nhảy qua. 2.9 m chừa 0.4 m dư. */
    wall:    { w: W, h: 2.90, d: 0.5,  yBase: 0,    ten: 'tường neon' },
    hurdle:  { w: W, h: 0.85, d: 0.4,  yBase: 0,    ten: 'rào thấp' },
    beam:    { w: W, h: 2.00, d: 0.5,  yBase: 1.15, ten: 'dầm treo' },
    /* ỐNG DÀI 15 m — con số này SUY RA, không chọn theo thẩm mỹ.
     *
     * Ống tồn tại để ép "giữ cúi". Muốn vậy, thời gian nằm trong ống phải dài hơn một
     * nhịp cúi kể cả ở TỐC ĐỘ TRẦN, nếu không thì từ 800 m trở đi (lúc ống bắt đầu
     * xuất hiện) chỉ cần bấm một cái là qua và loại này mất hết lý do tồn tại:
     *
     *     (d + bề dày người khi cúi) / tốc độ trần  >  nhịp cúi
     *     (15 + 1.1) / 26 = 0.62 s  >  0.55 s        (dư 13%)
     *
     * GDD ghi 6 m — sai, ở 15.5 m/s trở lên một nhịp cúi đã đủ vượt. Phát hiện bằng
     * khẳng định [13] trong `tools/check-rules.mjs`, chính nó canh cho con số này. */
    tube:    { w: W, h: 2.00, d: 15.0, yBase: 1.15, ten: 'ống dài' }
  };

  /* ================== TRỤ XOAY ĐÃ BỊ GỠ — ĐỌC TRƯỚC KHI ĐỊNH LÀM LẠI ==================
   *
   * Bản đầu có loại thứ năm: trụ xoay, đảo qua lại giữa hai làn theo chu kỳ 1.4 giây.
   * `tools/check-spawn.mjs` chứng minh nó HỎNG, không phải hỏng dữ liệu mà hỏng thiết kế:
   *
   *   - Trụ NHẢY LÀN TỨC THỜI. Người chơi đang đứng ở làn đích thì trụ hiện ra ngay
   *     trong người, không có cách nào phản ứng.
   *   - Chunk dùng nó đều ghép thêm một tường khoá làn thứ ba (không ghép thì làn thứ ba
   *     luôn an toàn và trụ trở nên vô nghĩa). Hai thứ cộng lại tạo ra những KHOẢNH KHẮC
   *     KHÔNG TỒN TẠI LÀN NÀO AN TOÀN.
   *
   * Quét 28 pha trong chu kỳ: 6/84 tổ hợp (pha × làn vào) chết ở 12 m/s và 3/84 ở 26 m/s
   * — chết từ MỌI làn vào, tức là không có đường sống thật sự.
   *
   * Muốn làm lại cho đúng thì cần đổi CƠ CHẾ chứ không chỉnh số: trụ phải trượt liên tục
   * giữa hai làn (không nhảy cóc) VÀ hẹp lại (~1.5 m thay vì 2.6 m) để lúc ở giữa đường
   * nó không phủ tâm cả hai làn. Đó là việc của một phase riêng, không phải sửa vặt.
   *
   * Bộ giải vẫn giữ tham số `tPha` để quét pha — nó là công cụ đã bắt được lỗi này và sẽ
   * cần lại ngay khi có vật chuyển động đầu tiên. */

  /* Làn của một vật. Hiện mọi loại đều đứng yên nên trả thẳng `lane`; giữ hàm này làm
   * chỗ nối sẵn cho vật chuyển động sau này, để `rules-collision` không phải sửa. */
  function laneOf(ob) {
    return ob.lane;
  }

  return { TYPES, laneOf };
})();

;
/* ===== js/data-boosters.js ===== */
/* data-boosters.js — ba booster, mỗi cái ĐỔI MỘT LUẬT KHÁC NHAU
 *
 * ================== ĐÂY LÀ CHỖ TRẢ LỜI CÂU HỎI (b) CỦA GDD ==================
 *
 * Câu hỏi: ba booster có tạo được ba KIỂU CẢM GIÁC khác nhau không, hay cả ba đều quy
 * về "bất tử vài giây"? Thiết kế trả lời bằng cách cho mỗi cái bỏ qua một luật khác:
 *
 *   PHẢN LỰC  bỏ qua TRỤC Y   — bay ở 6 m, mọi thứ dưới đất thành vô nghĩa
 *   TĂNG TỐC  bỏ qua VA CHẠM  — và đổi luôn giá trị của mét
 *   PHÁ KHỐI  ĐẢO NGƯỢC mục tiêu — suốt ván né vật, giờ 6 giây phải săn vật
 *
 * Hai cái đầu làm người chơi THỤ ĐỘNG (chờ hết giờ). Cái thứ ba bắt họ đổi hẳn cách
 * chơi, nên nó là booster đáng đo nhất ở phase 07.
 *
 * `check-booster.mjs` khối [1] khoá điều kiện cần: không hai loại nào có cùng tập cờ.
 * Cùng tập cờ nghĩa là dù số khác nhau, cảm giác vẫn y hệt.
 */

ND.Data = ND.Data || {};

ND.Data.Boosters = (function () {
  const B = ND.CFG.BOOSTER;

  const TYPES = {
    /* Bay lên cao — không cần cờ bất tử cho pha bay (không vật nào cao tới 6 m), nhưng
     * PHA HẠ CÁNH thì cần: người chơi không điều khiển được thời điểm hết giờ, thả họ
     * rơi thẳng vào tường là chết oan hoàn toàn. Nên cờ bật cho cả hai pha. */
    jet: {
      ms: B.JET_MS, speedMul: 1.0,
      ignoreGround: true, invuln: true, smash: false,
      ten: 'phản lực'
    },

    /* Bất tử là BẮT BUỘC, không phải hào phóng. Ở 26 × 1.6 = 41.6 m/s, tầm nhìn 70 m
     * chỉ cho 1.7 s phản ứng — dưới ngưỡng chơi được. Tăng tốc mà vẫn chết được là
     * trừng phạt người chơi vì đã nhặt được phần thưởng. */
    surge: {
      ms: B.SURGE_MS, speedMul: 1.6,
      ignoreGround: false, invuln: true, smash: false,
      ten: 'tăng tốc'
    },

    /* Nhanh hơn một chút để cảm thấy hung hãn, nhưng không bất tử với mọi thứ — nó chỉ
     * miễn nhiễm với BLOCKER, và đổi va chạm thành điểm. */
    smash: {
      ms: B.SMASH_MS, speedMul: 1.15,
      ignoreGround: false, invuln: false, smash: true,
      ten: 'phá khối'
    }
  };

  const IDS = Object.keys(TYPES);

  return { TYPES, IDS };
})();

;
/* ===== js/data-skins.js ===== */
/* data-skins.js — bốn bộ trang phục, thuần bảng màu
 *
 * Không texture, không file model: nhân vật dựng bằng khối cơ bản nên đổi skin chỉ là
 * đổi ba màu. Bốn skin tốn đúng bốn dòng dữ liệu, không thêm một byte tài nguyên nào.
 *
 * ================== SKIN KHÔNG ĐỔI BẤT KỲ CHỈ SỐ NÀO ==================
 *
 * Không tốc độ, không hộp va chạm, không thời lượng booster. Chỉ có màu.
 *
 * Đây là ràng buộc thiết kế chứ không phải sự lười: bảng xếp hạng so mét giữa mọi người
 * chơi. Skin mà nhanh hơn dù chỉ 1% thì bảng biến thành "ai mở khoá sớm hơn", và mọi
 * số đo cân bằng ở phase 07 mất nghĩa vì mỗi người chơi một luật.
 *
 * Giá tính bằng NGỌC NEON, thứ nhặt dọc đường và không dùng được vào việc gì khác.
 */

ND.Data = ND.Data || {};

ND.Data.Skins = (function () {

  const LIST = [
    { id: 'runner', ten: 'Runner', gia: 0,    than: 0x00e5ff, dau: 0x9af6ff, chan: 0x0090c8 },
    { id: 'ember',  ten: 'Ember',  gia: 200,  than: 0xff6a3d, dau: 0xffc07a, chan: 0xc23a1c },
    { id: 'void',   ten: 'Void',   gia: 600,  than: 0xb14dff, dau: 0xe0b3ff, chan: 0x5a1f8f },

    /* Prism đổi màu theo bậc tốc độ — biến thân nhân vật thành một cái đồng hồ tốc độ
     * mà mắt đọc được ngay giữa lúc đang chạy. Vẫn không đổi chỉ số nào. */
    { id: 'prism',  ten: 'Prism',  gia: 1500, than: 0x7de3ff, dau: 0xffffff, chan: 0x3d6aff, doiMau: true }
  ];

  const BY_ID = {};
  LIST.forEach(s => { BY_ID[s.id] = s; });

  const MAC_DINH = LIST[0];

  /* Đã mở khoá chưa. Mở khoá là VĨNH VIỄN: trừ ngọc một lần rồi thôi, không phải thuê.
   * Danh sách đã mở lưu ở `storage-local`, không lưu ở đây — file này thuần dữ liệu tĩnh. */
  function giaCua(id) {
    const s = BY_ID[id];
    return s ? s.gia : Infinity;
  }

  return { LIST, BY_ID, MAC_DINH, giaCua };
})();

;
/* ===== js/data-chunks.js ===== */
/* data-chunks.js — thư viện đoạn đường khai báo tay
 *
 * VÌ SAO KHÔNG SINH NGẪU NHIÊN TỪNG VẬT: cách đó cho ra đường vừa nhàm vừa nguy hiểm —
 * đa số đoạn trống rỗng, thỉnh thoảng lòi ra ba tường chắn cả ba làn là chết oan. Mọi
 * runner thành công đều dùng thư viện đoạn khai báo tay rồi xáo trộn thứ tự.
 *
 * ================== HÌNH DẠNG MỘT CHUNK ==================
 *
 *   id     tên, chỉ để đọc log
 *   tier   0 = nghỉ (trống), 1..4 = độ khó; bộ sinh chỉ lấy chunk có tier <= tier đang mở
 *   entry  vào chunk này được từ những làn nào
 *   exit   ra khỏi chunk này ở những làn nào
 *   items  [{ t, lane, type }]  — `t` là chỉ số ô 0..7, mỗi ô 3 m
 *
 * `entry`/`exit` KHÔNG khai bừa: `tools/check-chunks.mjs` đối chiếu chúng với kết quả
 * của bộ giải và báo đỏ nếu lệch. Khai sai `exit` là cách âm thầm nhất để phá bất biến
 * nối chunk (bất biến 2, GDD mục 7.3) — bộ sinh tin vào `exit` để chọn chunk kế tiếp.
 *
 * ================== HAI LUẬT ĐẶT VẬT ==================
 *
 * 1. VẬT ĐẦU TIÊN Ở Ô >= 2. Ở ô 1 (z = -4.5 m), tại tốc độ trần người chơi chỉ có
 *    0.15 s để rời làn trong khi một lần trượt tốn 0.16 s — làn vào bị chắn là chết
 *    chắc, không cách nào né. Ô 2 cho 0.27 s, vừa đủ.
 *
 * 2. ỐNG DÀI CHỈ ĐẶT Ở Ô 2..5. Nó dài 15 m nên ở ô ngoài khoảng này sẽ thò ra ngoài
 *    ranh chunk và chồng lên chunk kế — mà chunk kế thì bộ sinh chọn ngẫu nhiên, nên
 *    không ai kiểm được tổ hợp đó.
 *
 * Cả hai luật đều có khẳng định canh trong `check-chunks.mjs`.
 */

ND.Data = ND.Data || {};

ND.Data.Chunks = (function () {

  /* Một hàng chắn cả ba làn — ép đúng một lệnh, không cho né sang bên. */
  const row = (t, type) => [0, 1, 2].map(lane => ({ t, lane, type }));

  /* Chắn hai làn, chừa đúng một làn sống. */
  const gap = (t, laneMo) => [0, 1, 2].filter(l => l !== laneMo).map(lane => ({ t, lane, type: 'wall' }));

  const LIST = [
    /* ---------- tier 0 — chunk nghỉ ----------
     * Chỉ MỘT mẫu là đủ: nó hoàn toàn trống nên bốn bản sao sẽ y hệt nhau. Chỗ tạo
     * khác biệt cho mắt là booster và cung ngọc mà phase 04 rải vào đây. */
    { id: 'rest', tier: 0, entry: [0, 1, 2], exit: [0, 1, 2], items: [] },

    /* ---------- tier 1 — dạy từng loại, nhưng HAI vật mỗi chunk ----------
     *
     * Bản đầu mỗi chunk tier 1 chỉ có MỘT vật ở ô giữa. Cộng với hai đầu chunk trống
     * theo luật (ô 0–1 và ô 7), người chơi gặp những quãng 42 m không có gì — đo được
     * ở lượt chơi thử đầu, và họ đọc ra là "tối thui".
     *
     * Giờ mỗi chunk có vật ở ô 2 và ô 6: cách nhau 12 m, tức 0.86 giây ở tốc độ đầu.
     * Vẫn là nhịp dạy chứ không phải nhịp thử thách — hai vật đều né được bằng cách
     * đứng yên ở một làn an toàn, không bắt nối lệnh. */
    {
      id: 't1-wall-c', tier: 1, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [{ t: 2, lane: 1, type: 'wall' }, { t: 6, lane: 1, type: 'wall' }]
    },
    {
      id: 't1-wall-lr', tier: 1, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [{ t: 2, lane: 0, type: 'wall' }, { t: 6, lane: 2, type: 'wall' }]
    },
    {
      id: 't1-wall-rl', tier: 1, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [{ t: 2, lane: 2, type: 'wall' }, { t: 6, lane: 0, type: 'wall' }]
    },
    {
      id: 't1-hurdle-pair', tier: 1, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [{ t: 2, lane: 1, type: 'hurdle' }, { t: 6, lane: 1, type: 'hurdle' }]
    },
    {
      id: 't1-beam-pair', tier: 1, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [{ t: 2, lane: 1, type: 'beam' }, { t: 6, lane: 1, type: 'beam' }]
    },
    {
      /* Rào một bên, dầm bên kia — dạy rằng màu quyết định lệnh, không phải vị trí. */
      id: 't1-mix', tier: 1, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [{ t: 2, lane: 0, type: 'hurdle' }, { t: 6, lane: 2, type: 'beam' }]
    },
    {
      /* HÀNG DẦM DÀY CẢ BA LÀN — chunk tier 1 DUY NHẤT bắt buộc phải cúi.
       *
       * Vì sao phải có, đo được ở phase 07: trong thư viện cũ, tier 1 không có hàng dày
       * nào bắt cúi cả — sáu chunk tier 1 đều cho né sang bên. Hàng dầm dày đầu tiên nằm
       * ở tier 2 (từ 300 m) và phần lớn ở tier 3–4 (từ 800 m).
       *
       * Mà trung vị của bot Người thường là 630 m, tức đa số người chơi sống gần như trọn
       * đời trong tier 1–2. Kết quả: nút cúi chỉ chiếm 8.9 % số tình huống BẮT BUỘC, dưới
       * mốc 10 % của câu hỏi (a) trong GDD — game có bốn nút nhưng một nút gần như không
       * bao giờ là lối thoát duy nhất trong quãng người ta thật sự chơi.
       *
       * Đặt ở ô 4 (giữa chunk) để hai đầu còn chỗ thở: vào chunk chưa phải cúi ngay, và
       * cúi xong còn 4 ô để đứng dậy trước ranh chunk kế. */
      id: 't1-beam-row', tier: 1, entry: [0, 1, 2], exit: [0, 1, 2],
      items: row(4, 'beam')
    },

    /* ---------- tier 2 — buộc chọn làn, hoặc buộc đúng một lệnh ----------
     *
     * Cụm chính dời từ ô 4 lên ô 2, rồi thêm một vật ở ô 6. Vẫn chỉ đòi tối đa hai lệnh
     * nhưng lấp được quãng trống cuối chunk. */
    {
      id: 't2-gap-c', tier: 2, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [...gap(2, 1), { t: 6, lane: 1, type: 'hurdle' }]
    },
    {
      id: 't2-gap-l', tier: 2, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [...gap(2, 0), { t: 6, lane: 0, type: 'hurdle' }]
    },
    {
      id: 't2-gap-r', tier: 2, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [...gap(2, 2), { t: 6, lane: 2, type: 'hurdle' }]
    },
    {
      id: 't2-hurdle-row', tier: 2, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [...row(2, 'hurdle'), { t: 6, lane: 1, type: 'wall' }]
    },
    {
      /* Vật thứ hai là RÀO chứ không phải tường — làm dày chunk khiến tường vọt lên 67%
       * số chunk, quá trần 65% mà `check-chunks` khối [4] canh. Đổi sang rào vừa kéo
       * tường về 62%, vừa cho ra một chuỗi "cúi rồi nhảy" đúng tầm tier 2. */
      id: 't2-beam-row', tier: 2, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [...row(2, 'beam'), { t: 6, lane: 1, type: 'hurdle' }]
    },
    {
      id: 't2-wall-then-hurdle', tier: 2, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [{ t: 2, lane: 1, type: 'wall' }, ...row(6, 'hurdle')]
    },
    {
      /* Ba tường lệch nhau — không ép lệnh nào cụ thể nhưng bắt phải đọc trước hai vật. */
      id: 't2-stagger', tier: 2, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [{ t: 2, lane: 0, type: 'wall' }, { t: 4, lane: 1, type: 'wall' }, { t: 6, lane: 2, type: 'wall' }]
    },
    {
      id: 't2-beam-then-wall', tier: 2, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [{ t: 2, lane: 1, type: 'beam' }, { t: 6, lane: 1, type: 'wall' }]
    },

    /* ---------- tier 3 — ống dài xuất hiện, bắt đầu ép chuỗi hai lệnh ---------- */
    { id: 't3-tube-c', tier: 3, entry: [0, 1, 2], exit: [0, 1, 2], items: [{ t: 4, lane: 1, type: 'tube' }] },
    {
      /* Ống chắn cả ba làn: loại tình huống DUY NHẤT bắt giữ nút, không bấm một cái là xong. */
      id: 't3-tube-row', tier: 3, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [0, 1, 2].map(lane => ({ t: 4, lane, type: 'tube' }))
    },
    {
      /* Chỗ này từng là hai chunk trụ xoay. Đã gỡ — xem giải thích ở `data-obstacles.js`:
       * trụ nhảy làn tức thời cộng tường khoá làn còn lại tạo ra khoảnh khắc không làn
       * nào an toàn. Thay bằng một chunk ép chuỗi hai lệnh bằng vật đứng yên. */
      id: 't3-wall-then-beam', tier: 3, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [...gap(2, 0), ...row(6, 'beam')]
    },
    {
      id: 't3-hurdle-beam', tier: 3, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [...row(2, 'hurdle'), ...row(6, 'beam')]
    },
    {
      id: 't3-tube-side', tier: 3, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [{ t: 3, lane: 1, type: 'tube' }, { t: 7, lane: 0, type: 'wall' }]
    },
    {
      id: 't3-gap-then-row', tier: 3, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [...gap(2, 1), ...row(6, 'hurdle')]
    },

    /* ---------- tier 4 — chuỗi ba lệnh ---------- */
    {
      /* Nhảy qua rào, RƠI NHANH, rồi cúi chui dầm. Nếu bỏ cơ chế rơi nhanh thì chunk
       * này thành bất khả thi — đó là chủ ý, nó là chỗ chứng minh cơ chế đó cần thiết. */
      id: 't4-jump-fall-slide', tier: 4, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [...row(2, 'hurdle'), ...row(5, 'beam')]
    },
    {
      id: 't4-triple', tier: 4, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [...row(2, 'hurdle'), ...row(4, 'beam'), ...row(7, 'hurdle')]
    },
    {
      /* Cụm chắn hai làn đặt ở ô 6 chứ không ô 7. Ở ô cuối, người chơi buộc phải ở đúng
       * một làn tới tận ranh chunk nên chunk chỉ ra được ở làn đó — bộ giải tính ra
       * `exit` bị bó lại còn [1,2] thay vì cả ba. Chừa một ô trống phía sau để trạng
       * thái kịp trở lại bình thường trước khi sang chunk kế. */
      id: 't4-tube-then-gap', tier: 4, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [{ t: 3, lane: 1, type: 'tube' }, ...gap(6, 2)]
    },
    {
      id: 't4-corridor', tier: 4, entry: [0, 1, 2], exit: [0, 1, 2],
      items: [...gap(2, 1), ...row(5, 'hurdle'), { t: 7, lane: 1, type: 'wall' }]
    }
  ];

  const BY_ID = {};
  LIST.forEach(c => { BY_ID[c.id] = c; });

  const REST_ID = 'rest';

  return { LIST, BY_ID, REST_ID, row, gap };
})();

;
/* ===== js/state-run.js ===== */
/* state-run.js — toàn bộ trạng thái của MỘT lượt chạy, trong một đối tượng phẳng
 *
 * Vì sao phẳng (không lồng nhau, không lớp): đối tượng này bị in ra, so sánh, tuần tự
 * hoá và nhân bản hàng nghìn lần ở phase 07 khi bot chạy mô phỏng. Cấu trúc phẳng thì
 * `JSON.stringify` ra đọc được ngay, và so hai ván lệch nhau chỗ nào chỉ là so từng
 * trường.
 *
 * Mọi trường đều khai ở đây kể cả trường phase sau mới dùng. Thêm trường lúc chạy
 * (`s.abc = 1`) làm engine JS đổi hình dạng đối tượng giữa chừng — vừa chậm vừa khiến
 * hai ván "giống hệt nhau" lại có thứ tự khoá khác nhau khi in ra.
 */

ND.State = ND.State || {};

ND.State.Run = (function () {
  const C = ND.CFG;

  function create(opts) {
    opts = opts || {};
    const lane = opts.lane === undefined ? 1 : opts.lane;

    return {
      /* ---- nguồn ngẫu nhiên ---- */
      seed: opts.seed === undefined ? 'neon-dash' : opts.seed,
      rng: ND.Rng.create(opts.seed),

      /* ---- thời gian và quãng đường ---- */
      t: 0,                                  // giây mô phỏng đã trôi (xác định)
      meters: 0,
      speed: C.SPEED.BASE,
      speedTier: 0,                          // bậc tốc độ hiện tại, để biết lúc lên bậc
      z: 0,                                  // luôn = -meters, xem quy ước trục ở view-scene

      /* ---- vị trí ngang ---- */
      lane,                                  // làn ĐÍCH
      laneFrom: lane,                        // làn xuất phát khi đang trượt
      laneT: 1,                               // tiến độ trượt 0..1; bằng 1 là đã xong
      x: (lane - 1) * C.LANE_W,

      /* ---- tư thế và độ cao ---- */
      pose: 'run',                           // 'run' | 'jump' | 'slide'
      poseT: 0,                              // thời gian đã ở trong tư thế
      y: 0,                                  // độ cao CHÂN nhân vật
      jumpT: 0,                              // thời gian từ lúc rời đất
      ff: null,                              // rơi nhanh: { t0, y0, v0 } hoặc null
      slideHold: false,                      // người chơi đang giữ nút cúi

      /* ---- lệnh ---- */
      queue: [],                             // lệnh chờ tiêu ở bước kế
      buffered: null,                        // MỘT lệnh đổi làn đang đệm
      bufferT: 0,                            // thời gian còn lại của đệm

      /* ---- booster ---- */
      booster: null,                         // id booster đang chạy, hoặc null
      boosterMs: 0,                          // thời gian còn lại của pha chính
      landMs: 0,                             // riêng phản lực: thời gian còn lại của pha hạ cánh
      smashCount: 0,                         // số khối đã phá trong ván
      bonusMeters: 0,                        // mét thưởng từ phá khối — nguồn điểm DUY NHẤT
                                             // không đến từ khoảng cách (GDD 4.2)
      shards: 0,                             // ngọc neon nhặt được, chỉ dùng mở skin

      /* ---- thế giới ---- */
      obstacles: [],                         // vật đang hoạt động quanh nhân vật
      pickups: [],                           // booster + ngọc quanh nhân vật

      /* Bật bộ sinh đường vô tận. MẶC ĐỊNH TẮT, ván thật bật lên.
       *
       * Vì sao không luôn bật: `check-rules` và bộ giải ở phase 03 tự đặt vật vào những
       * chỗ đã tính sẵn để dựng đúng một tình huống. Bộ sinh chạy song song sẽ đổ thêm
       * chunk ngẫu nhiên vào cùng danh sách, và khẳng định "cúi thì chui qua dầm" bỗng
       * đỏ vì một cái tường không ai mời. */
      spawnOn: !!opts.spawn,

      /* Trạng thái bộ sinh. Gom thành một đối tượng con thay vì rải phẳng ra ngoài:
       * nó là một cụm gắn bó, và khi in ván ra để lần lỗi thì thấy nguyên cụm cạnh
       * nhau dễ đọc hơn sáu trường `spawnXxx` lẫn giữa các trường khác. */
      spawn: {
        nextZ: 0,                            // z nơi chunk kế tiếp bắt đầu
        count: 0,                            // đã sinh bao nhiêu chunk
        sinceRest: 0,                        // bao nhiêu chunk kể từ lần nghỉ gần nhất
        lastId: null,
        lastTier: 0,
        lastExit: [0, 1, 2],                 // exit chunk trước — quyết định chunk sau vào được không
        bags: {},                            // tier -> mảng id còn lại trong túi xáo trộn

        nextBoosterAt: 0,                    // mốc mét sớm nhất được đặt booster kế tiếp
        boosterBag: [],                      // túi xáo trộn ba loại booster
        lastBoosterId: null
      },

      /* ---- kết cục ---- */
      alive: true,
      deathReason: null                      // tên loại vật đã đâm vào
    };
  }

  return { create };
})();

;
/* ===== js/rules-speed.js ===== */
/* rules-speed.js — đường cong tốc độ và cộng mét
 *
 * Tốc độ tăng theo BẬC THANG chứ không liên tục:
 *
 *     v(d) = min(26.0,  12.0 + 0.7 * floor(d / 150))
 *
 * Vì sao bậc thang: người chơi CẢM NHẬN ĐƯỢC mỗi lần lên bậc (kèm chớp sáng ở lề
 * đường), còn tăng liên tục thì không ai nhận ra — nó chỉ hiện ra dưới dạng "tự nhiên
 * thấy khó hơn" mà không hiểu vì sao.
 *
 * Vì sao có TRẦN: không trần thì mọi ván đều kết thúc ở đúng cái ngưỡng mà mắt người
 * không theo kịp, và bảng xếp hạng biến thành đo tốc độ phản xạ. Có trần thì thứ phân
 * biệt người giỏi là giữ tập trung lâu và dùng booster khôn — hai thứ thú vị hơn.
 */

ND.Rules = ND.Rules || {};

ND.Rules.Speed = (function () {
  const S = ND.CFG.SPEED;

  /* Bậc hiện tại tại mốc mét — tách riêng để biết lúc nào VỪA lên bậc. */
  function tierAt(meters) {
    return Math.floor(meters / S.STEP_EVERY);
  }

  function at(meters) {
    return Math.min(S.MAX, S.BASE + S.STEP * tierAt(meters));
  }

  function step(s, dt) {
    /* Tính tốc độ TỪ số mét đầu bước rồi mới đi. Tính sau khi đi thì bước đầu tiên
     * sau mỗi mốc bị đi bằng tốc độ của bậc mới — lệch nhỏ nhưng làm hai lần chạy
     * cùng hạt giống lệch nhau nếu bước thời gian đổi. */
    /* Hệ số booster nhân VÀO tốc độ nền, không thay thế nó — nhờ vậy tăng tốc ở cuối
     * ván vẫn nhanh hơn tăng tốc ở đầu ván, đúng như người chơi mong đợi. */
    s.speed = at(s.meters) * ND.Rules.Booster.speedMul(s);
    s.meters += s.speed * dt;
    s.z = -s.meters;

    const tier = tierAt(s.meters);
    if (tier !== s.speedTier) {
      s.speedTier = tier;
      /* Phase 05 nghe sự kiện này để chớp sáng lề đường. Phát từ lớp luật là chấp
       * nhận được vì bus chỉ chuyển dữ liệu, không kéo theo DOM. */
      ND.bus.emit('run:speed-tier', { tier, speed: at(s.meters) });
    }
  }

  return { at, tierAt, step };
})();

;
/* ===== js/rules-lane.js ===== */
/* rules-lane.js — trượt ngang giữa ba làn, kèm đệm MỘT lệnh
 *
 * HAI CHI TIẾT NHỎ QUYẾT ĐỊNH CẢM GIÁC, đừng bỏ cái nào:
 *
 * 1. Hộp va chạm bám `x` THẬT trong lúc trượt, không dịch chuyển tức thời. Nghĩa là
 *    đang ở giữa hai làn thì đâm được vào vật của CẢ HAI bên. Nếu cho nhảy tức thời
 *    sang làn mới thì đổi làn trở thành nút "miễn nhiễm", và mọi tình huống ép chuỗi
 *    lệnh ở phase 03 mất hết sức nặng.
 *
 * 2. Đệm lệnh 0.15 s. Không có nó, chuỗi "trái rồi trái" ở tốc độ cao gần như không
 *    bấm nổi: lệnh thứ hai rơi đúng lúc đang trượt và bị nuốt mất. Người chơi không
 *    kết luận "mình bấm sai nhịp", họ kết luận "game không ăn phím".
 *
 * Chỉ đệm MỘT lệnh. Đệm cả hàng đợi thì bấm loạn ba bốn cái sẽ khiến nhân vật tự trôi
 * qua nhiều làn sau đó — người chơi mất quyền điều khiển đúng vào lúc đang cuống.
 */

ND.Rules = ND.Rules || {};

ND.Rules.Lane = (function () {
  const C = ND.CFG;

  const centerOf = lane => (lane - 1) * C.LANE_W;

  /* easeOutQuad: nhanh lúc đầu, chậm lại khi tới nơi. Đọc ra là "búng sang" chứ không
   * phải "trôi đều" — hợp với động tác né gấp. */
  const ease = t => t * (2 - t);

  /* Bắt đầu một lần trượt. Trả về true nếu thật sự có đổi làn. */
  function start(s, dir) {
    const target = s.lane + dir;
    if (target < 0 || target >= C.LANES) return false;   // ở biên thì đứng yên
    s.laneFrom = s.lane;
    s.lane = target;
    s.laneT = 0;
    return true;
  }

  /* Người chơi bấm trái/phải. `dir` là -1 hoặc +1. */
  function request(s, dir) {
    if (s.laneT >= 1) { start(s, dir); return; }
    /* Đang trượt dở -> đệm. Ô đệm đã có người thì BỎ lệnh mới, không xếp hàng. */
    if (s.buffered === null) {
      s.buffered = dir;
      s.bufferT = C.RUNNER.BUFFER_T;
    }
  }

  function step(s, dt) {
    if (s.laneT < 1) {
      s.laneT += dt / C.RUNNER.LANE_T;
      if (s.laneT >= 1) {
        s.laneT = 1;
        s.x = centerOf(s.lane);              // chốt đúng tâm, tránh sai số dồn lại
      } else {
        const a = centerOf(s.laneFrom), b = centerOf(s.lane);
        s.x = a + (b - a) * ease(s.laneT);
      }
    }

    if (s.buffered !== null) {
      s.bufferT -= dt;
      if (s.laneT >= 1) {
        /* Vừa trượt xong trong CHÍNH bước này thì tiêu luôn lệnh đệm — chờ tới bước
         * sau sẽ thêm một khung hình trễ, đủ để cảm thấy "rít" ở chuỗi hai lệnh. */
        const dir = s.buffered;
        s.buffered = null;
        start(s, dir);
      } else if (s.bufferT <= 0) {
        s.buffered = null;                   // bấm quá sớm thì thôi, đừng nhớ mãi
      }
    }
  }

  return { centerOf, request, start, step };
})();

;
/* ===== js/rules-spawn.js ===== */
/* rules-spawn.js — nối chunk thành đường vô tận
 *
 * BỐN LUẬT (GDD mục 7.4), mỗi luật chữa một bệnh cụ thể:
 *
 * 1. Chỉ lấy chunk có `tier <= tier đang mở`, và `exit` chunk trước phải giao với
 *    `entry` chunk sau. Bỏ điều kiện giao nhau là mở cửa cho bất biến 2 bị phá: hai
 *    chunk đều an toàn riêng lẻ, nối lại thành chết.
 *
 * 2. KHÔNG hai chunk tier >= 3 liền nhau. Hai đoạn nặng dính nhau không khó gấp đôi mà
 *    khó gấp bội — người chơi ra khỏi đoạn một trong tư thế xấu và không kịp đọc đoạn hai.
 *
 * 3. Cứ REST_EVERY chunk chèn một chunk nghỉ. Đây là chỗ mắt được nghỉ, và (phase 04)
 *    là chỗ duy nhất đặt booster.
 *
 * 4. TÚI XÁO TRỘN thay ngẫu nhiên thuần: đổ hết chunk cùng tier vào túi, rút cạn rồi
 *    mới xáo lại. Ngẫu nhiên thuần cho ra chuỗi "cùng một chunk ba lần liên tiếp" khá
 *    thường xuyên, và người chơi đọc đó là lỗi chứ không đọc là may rủi.
 *
 * MẬT ĐỘ KHÔNG TĂNG THEO MÉT. Từ 1600 m tier đã mở hết; sau đó độ khó chỉ tăng nhờ
 * tốc độ. Tăng cả hai thì đường cong dựng đứng và mọi ván kết thúc trong một dải mét
 * rất hẹp — bảng xếp hạng mất hết khả năng phân biệt.
 */

ND.Rules = ND.Rules || {};

ND.Rules.Spawn = (function () {
  const C = ND.CFG;
  const CELL = C.CHUNK.LEN / C.CHUNK.CELLS;

  /* Tier tối đa được mở tại mốc mét. Bảng trong core-config, tra từ dưới lên. */
  function tierAt(meters) {
    const T = C.CHUNK.TIER_AT;
    let tier = T[0].tier;
    for (let i = 0; i < T.length; i++) if (meters >= T[i].m) tier = T[i].tier;
    return tier;
  }

  /* Đổi khai báo chunk thành danh sách vật có z tuyệt đối.
   * Bộ giải ở `tools/lib-solver.mjs` gọi CHÍNH hàm này — nếu nó có bản sao riêng thì
   * bộ kiểm sẽ chứng minh cho một cách đặt vật khác với cách game thật dùng. */
  function emitChunk(chunk, startZ) {
    const out = [];
    for (let i = 0; i < chunk.items.length; i++) {
      const it = chunk.items[i];
      out.push({ type: it.type, lane: it.lane, lane2: it.lane2, z: startZ - (it.t + 0.5) * CELL });
    }
    return out;
  }

  /* Rút một id từ túi của tier. Túi cạn thì đổ lại và xáo. */
  function drawFromBag(s, tier) {
    const bags = s.spawn.bags;
    if (!bags[tier] || !bags[tier].length) {
      bags[tier] = s.rng.shuffle(ND.Data.Chunks.LIST.filter(c => c.tier === tier).map(c => c.id));
    }
    return bags[tier].pop();
  }

  /* Chọn chunk kế tiếp. `meters` là mốc mét nơi chunk này sẽ được chơi. */
  function pick(s, meters) {
    const CH = ND.Data.Chunks;

    if (s.spawn.sinceRest >= C.CHUNK.REST_EVERY) return CH.BY_ID[CH.REST_ID];

    let maxTier = tierAt(meters);
    if (s.spawn.lastTier >= 3) maxTier = Math.min(maxTier, 2);   // luật 2

    /* Chọn tier trước, trọng số bằng chính số tier — tier cao hay ra hơn nên đường
     * vẫn nặng dần, nhưng tier thấp không biến mất hẳn và nhịp có lên có xuống. */
    let tong = 0;
    for (let t = 1; t <= maxTier; t++) tong += t;
    let r = s.rng.next() * tong;
    let tier = 1;
    for (let t = 1; t <= maxTier; t++) { r -= t; if (r <= 0) { tier = t; break; } }

    /* Rút tới khi gặp chunk vào được từ làn ra của chunk trước. Giới hạn số lần rút để
     * không quay vô tận nếu thư viện thiếu chunk tương thích; hết lượt thì dùng chunk
     * nghỉ — nó nhận mọi làn nên luôn nối được. Thà một nhịp nghỉ thừa còn hơn treo máy. */
    for (let lan = 0; lan < 12; lan++) {
      const c = CH.BY_ID[drawFromBag(s, tier)];
      if (!c) continue;
      if (c.entry.some(l => s.spawn.lastExit.indexOf(l) >= 0)) return c;
    }
    return CH.BY_ID[CH.REST_ID];
  }

  /* Sinh thêm chunk cho tới khi phủ hết cửa sổ phía trước, rồi dọn vật đã lùi ra sau.
   * Gọi mỗi bước từ `rules-run`. */
  function ensure(s) {
    const bienTruoc = s.z - C.CHUNK.ACTIVE_AHEAD;

    while (s.spawn.nextZ > bienTruoc) {
      const meters = -s.spawn.nextZ;
      const chunk = pick(s, meters);

      const vat = emitChunk(chunk, s.spawn.nextZ);
      for (let i = 0; i < vat.length; i++) s.obstacles.push(vat[i]);

      ND.Rules.PickupPlace.afterChunk(s, chunk, s.spawn.nextZ);

      s.spawn.lastId = chunk.id;
      s.spawn.lastTier = chunk.tier;
      s.spawn.lastExit = chunk.exit;
      s.spawn.sinceRest = chunk.tier === 0 ? 0 : s.spawn.sinceRest + 1;
      s.spawn.count++;
      s.spawn.nextZ -= C.CHUNK.LEN;
    }

    /* Dọn vật đã ở sau lưng. Không dọn thì danh sách phình vô hạn và vòng kiểm va chạm
     * chậm dần đều suốt ván — kiểu tụt khung hình chỉ lộ ra ở ván dài. */
    const bienSau = s.z + C.CHUNK.ACTIVE_BACK;
    let n = 0;
    while (n < s.obstacles.length && s.obstacles[n].z > bienSau) n++;
    if (n) s.obstacles.splice(0, n);

    ND.Rules.PickupPlace.prune(s);
  }

  return { tierAt, emitChunk, ensure, pick };
})();

;
/* ===== js/rules-pickup-place.js ===== */
/* rules-pickup-place.js — rải booster và ngọc vào thế giới
 *
 * Tách khỏi `rules-spawn.js` vì hai việc khác nhau: bên kia quyết định ĐƯỜNG trông thế
 * nào, bên này quyết định PHẦN THƯỞNG nằm ở đâu. Gộp lại thì `rules-spawn` vượt 200
 * dòng và trộn hai lý do để thay đổi vào một file.
 *
 * ================== VÌ SAO BOOSTER NẰM TRONG CHUNK NGHỈ, NHƯNG LỆCH LÀN ==================
 *
 * Trong chunk nghỉ: đặt giữa một cụm dày thì người chơi hoặc không kịp thấy, hoặc phải
 * chết để lấy. Cả hai đều không phải lựa chọn, mà phần thưởng không có lựa chọn thì
 * không phải phần thưởng.
 *
 * Lệch làn giữa: nếu đặt ngay làn đang chạy thì nhặt được miễn phí, và booster mất hết
 * sức nặng. Lệch làn thì vẫn còn cái giá — phải rời làn an toàn và về kịp trước chunk kế.
 *
 * ================== CUNG NGỌC LÀ NGÔN NGỮ, KHÔNG PHẢI TRANG TRÍ ==================
 *
 * Cung ngọc BAY LÊN trước rào thấp và HẠ XUỐNG trước dầm treo. Mắt đọc được "sắp phải
 * nhảy" từ hình dáng cung ngọc trước khi kịp nhận ra cái rào — đây là cách thể loại này
 * dạy người chơi mà không cần chữ. Đặt ngược lại thì nó dạy sai, tệ hơn là không đặt.
 */

ND.Rules = ND.Rules || {};

ND.Rules.PickupPlace = (function () {
  const C = ND.CFG;
  const CELL = C.CHUNK.LEN / C.CHUNK.CELLS;

  /* Rút loại booster từ túi xáo trộn — không bao giờ ra cùng loại hai lần liên tiếp.
   * Ngẫu nhiên thuần cho ra chuỗi "ba lần tăng tốc liền" khá thường xuyên, và người chơi
   * đọc chuỗi đó là lỗi chứ không đọc là may rủi. */
  function drawBooster(s) {
    const bag = s.spawn.boosterBag;
    if (!bag.length) {
      const moi = s.rng.shuffle(ND.Data.Boosters.IDS.slice());
      /* Túi mới mà mở đầu trùng đuôi túi cũ thì vẫn ra hai lần liên tiếp — đảo hai phần
       * tử đầu là đủ để chặn, mà không phá tính ngẫu nhiên của phần còn lại. */
      if (moi[0] === s.spawn.lastBoosterId && moi.length > 1) {
        const t = moi[0]; moi[0] = moi[1]; moi[1] = t;
      }
      bag.push(...moi);
    }
    const id = bag.shift();
    s.spawn.lastBoosterId = id;
    return id;
  }

  /* Một cung ngọc dọc theo một làn, độ cao theo hàm `yAt(i, n)`. */
  function arc(s, lane, zStart, n, yAt) {
    for (let i = 0; i < n; i++) {
      s.pickups.push({
        kind: 'shard', lane,
        z: zStart - i * C.SHARD.STEP_M,
        y: yAt(i, n),
        taken: false
      });
    }
  }

  /* Gọi mỗi khi bộ sinh vừa đặt xong một chunk. */
  function afterChunk(s, chunk, startZ) {
    const S = C.SHARD;

    /* ---------- booster: chỉ vào chunk nghỉ, và chỉ khi đã đủ xa lần trước ---------- */
    if (chunk.tier === 0) {
      const met = -startZ;
      if (met >= s.spawn.nextBoosterAt) {
        /* Làn bất kỳ TRỪ làn giữa. */
        const lane = s.rng.next() < 0.5 ? 0 : 2;
        s.pickups.push({
          kind: 'boost', id: drawBooster(s), lane,
          z: startZ - C.CHUNK.LEN * 0.5,
          inRest: true, taken: false
        });
        s.spawn.nextBoosterAt = met + s.rng.range(C.BOOSTER.GAP_MIN, C.BOOSTER.GAP_MAX);
      }
      /* Chunk nghỉ luôn có một cung ngọc phẳng — để đoạn nghỉ vẫn có việc cho mắt làm. */
      arc(s, s.rng.int(0, C.LANES - 1), startZ - CELL * 2,
        s.rng.int(S.ARC_MIN, S.ARC_MAX), () => S.Y_FLAT);
      return;
    }

    /* ---------- ngọc dẫn mắt: bám vào vật ĐẦU TIÊN thuộc loại cần dạy ---------- */
    const rao = chunk.items.find(it => it.type === 'hurdle');
    if (rao) {
      /* Cung vòng lên theo đúng parabol nhảy, kết thúc ngay trước rào. Nhặt hết cung
       * nghĩa là đã nhảy đúng nhịp — phần thưởng và lời chỉ dẫn là cùng một thứ. */
      const n = 5;
      const zRao = startZ - (rao.t + 0.5) * CELL;
      arc(s, rao.lane, zRao + n * S.STEP_M, n,
        (i) => S.Y_FLAT + (S.Y_HIGH - S.Y_FLAT) * Math.sin(Math.PI * (i + 1) / (n + 1)));
      return;
    }

    const dam = chunk.items.find(it => it.type === 'beam' || it.type === 'tube');
    if (dam) {
      const n = 5;
      const zDam = startZ - (dam.t + 0.5) * CELL;
      arc(s, dam.lane, zDam + n * S.STEP_M, n, () => S.Y_LOW);
    }
  }

  /* Dọn vật phẩm đã lùi ra sau lưng — cùng lý do với việc dọn chướng ngại. */
  function prune(s) {
    const bienSau = s.z + C.CHUNK.ACTIVE_BACK;
    let n = 0;
    while (n < s.pickups.length && s.pickups[n].z > bienSau) n++;
    if (n) s.pickups.splice(0, n);
  }

  return { afterChunk, prune, drawBooster };
})();

;
/* ===== js/rules-booster.js ===== */
/* rules-booster.js — kích hoạt, đếm ngược, hết hạn, chồng lấn, và nhặt vật phẩm
 *
 * ================== LUẬT CHỒNG LẤN, VÀ VÌ SAO PHẢI LÀ THAY THẾ ==================
 *
 *   khác loại  ->  THAY THẾ (thời gian đặt lại từ đầu)
 *   cùng loại  ->  cộng thời gian, trần = 2x thời lượng gốc
 *
 * Cho phép cộng dồn KHÁC loại sẽ đẻ ra trạng thái "bay + tăng tốc + xuyên" cùng lúc.
 * Không cân bằng nổi, mà cũng không kiểm tự động hết tổ hợp được — số tổ hợp tăng theo
 * luỹ thừa số booster. Cộng dồn CÙNG loại thì vẫn thưởng cho chuỗi may mắn mà không
 * sinh trạng thái mới nào.
 *
 * ================== PHA HẠ CÁNH CỦA PHẢN LỰC ==================
 *
 * Hết thời lượng chính, phản lực KHÔNG tắt ngay: nhân vật hạ dần trong 1 giây và VẪN
 * BẤT TỬ suốt lúc đó. Người chơi không điều khiển được thời điểm hết giờ, nên thả họ
 * rơi thẳng vào một cái tường là kiểu chết mà không ai học được gì.
 */

ND.Rules = ND.Rules || {};

ND.Rules.Booster = (function () {
  const C = ND.CFG;

  const def = s => (s.booster ? ND.Data.Boosters.TYPES[s.booster] : null);

  function activate(s, id) {
    const T = ND.Data.Boosters.TYPES[id];
    if (!T) throw new Error('Booster không có thật: ' + id);

    if (s.booster === id) {
      s.boosterMs = Math.min(s.boosterMs + T.ms, T.ms * C.BOOSTER.STACK_MAX_MUL);
    } else {
      s.booster = id;
      s.boosterMs = T.ms;
      s.landMs = 0;                      // huỷ pha hạ cánh dở dang của phản lực cũ
    }
    ND.bus.emit('run:booster', { id, ms: s.boosterMs });
  }

  /* Đang miễn nhiễm với va chạm thường? `rules-collision` hỏi hàm này. */
  function invulnerable(s) {
    const T = def(s);
    return !!(T && T.invuln);
  }

  /* Đang phá được khối? */
  function smashing(s) {
    const T = def(s);
    return !!(T && T.smash);
  }

  function speedMul(s) {
    const T = def(s);
    return T ? T.speedMul : 1;
  }

  /* Nhặt vật phẩm nằm quanh nhân vật.
   *
   * Xét theo `x` THẬT chứ không theo chỉ số làn: đang trượt dở giữa hai làn mà vẫn vơ
   * được vật phẩm của làn bên là đúng — người chơi thấy mình đã chạm vào nó. */
  function collect(s) {
    const S = C.SHARD;
    const list = s.pickups;
    for (let i = 0; i < list.length; i++) {
      const p = list[i];
      if (p.taken) continue;

      const dz = s.z - p.z;
      if (dz > S.PICK_DZ || dz < -S.PICK_DZ) continue;
      if (Math.abs(s.x - ND.Rules.Lane.centerOf(p.lane)) > C.LANE_W * 0.5) continue;

      if (p.kind === 'shard') {
        /* Ngọc có độ cao riêng: cung trên cao chỉ nhặt được khi đang bay, cung dưới thấp
         * chỉ nhặt được khi đang chạy hoặc cúi. Nhờ vậy cung ngọc vừa dẫn mắt vừa
         * THƯỞNG cho việc bấm đúng nút — không chỉ là trang trí. */
        if (Math.abs((s.y + 0.85) - p.y) > S.PICK_DY) continue;
        p.taken = true;
        s.shards++;
        ND.bus.emit('run:shard', { total: s.shards });
      } else {
        p.taken = true;
        activate(s, p.id);
      }
    }
  }

  function step(s, dt) {
    collect(s);

    if (!s.booster) return;

    const T = def(s);

    if (s.boosterMs > 0) {
      s.boosterMs -= dt * 1000;
      if (s.boosterMs <= 0) {
        s.boosterMs = 0;
        /* Phản lực chuyển sang hạ cánh; hai loại kia tắt hẳn ngay. */
        if (T.ignoreGround) s.landMs = C.BOOSTER.JET_LAND_S * 1000;
        else { end(s); return; }
      }
    } else if (s.landMs > 0) {
      s.landMs -= dt * 1000;
      if (s.landMs <= 0) { s.landMs = 0; end(s); return; }
    }
  }

  /* Khoá độ cao khi đang bay.
   *
   * TÁCH RIÊNG khỏi `step` vì hai việc phải chạy ở hai chỗ khác nhau trong một bước:
   * `step` chạy TRƯỚC `rules-speed` (nó nhân hệ số tốc độ), còn khoá độ cao phải chạy
   * SAU `rules-jump-slide` — nếu không thì jump-slide kéo `y` về mặt đất ngay sau đó và
   * có đúng một khung hình nhân vật rơi vào giữa cái tường mình đang bay qua. */
  function lockHeight(s) {
    const T = def(s);
    if (!T || !T.ignoreGround) return;
    s.pose = 'run';                          // đang bay thì nhảy/cúi vô nghĩa
    s.y = s.boosterMs > 0
      ? C.BOOSTER.JET_Y
      : C.BOOSTER.JET_Y * (s.landMs / (C.BOOSTER.JET_LAND_S * 1000));
  }

  function end(s) {
    const id = s.booster;
    s.booster = null;
    s.boosterMs = 0;
    s.landMs = 0;
    s.y = 0;
    ND.bus.emit('run:booster-end', { id });
  }

  return { activate, invulnerable, smashing, speedMul, collect, step, lockHeight, end };
})();

;
/* ===== js/rules-jump-slide.js ===== */
/* rules-jump-slide.js — nhảy, cúi, và rơi nhanh
 *
 * NHẢY dùng công thức đóng chứ không tích phân vận tốc:
 *
 *     y(t) = 4H (t/T) (1 - t/T)       H = 2.2 m,  T = 0.62 s
 *
 * Đóng thì đỉnh đúng 2.2 m và chạm đất đúng 0.62 s ở mọi máy, không phụ thuộc sai số
 * dồn của phép cộng dấu phẩy động. Với một game xếp hạng theo mét, "cú nhảy của tôi
 * hơi khác cú nhảy của anh" là thứ không được phép có.
 *
 * T CỐ ĐỊNH THEO THỜI GIAN, không co theo tốc độ. Hệ quả biết trước: ở tốc độ cao một
 * cú nhảy vượt được xa hơn theo mét (7.4 m ở 12 m/s, 16.1 m ở 26 m/s). Đó là chủ ý —
 * giữ T cố định làm cảm giác nhảy nhất quán suốt ván, còn hệ quả trên chỉ khiến vài
 * mẫu chunk DỄ hơn ở cuối ván, không bao giờ khiến chúng bất khả thi. Khẳng định [4]
 * trong `check-rules.mjs` khoá đúng chiều này.
 *
 * RƠI NHANH là đường cứu vãn: nhảy nhầm lúc mà không có cách nào xuống sớm thì cú
 * nhảy sai trở thành án tử chắc chắn — kiểu trừng phạt không dạy người chơi điều gì.
 */

ND.Rules = ND.Rules || {};

ND.Rules.JumpSlide = (function () {
  const R = ND.CFG.RUNNER;
  const H = R.JUMP_H, T = R.JUMP_T;

  /* Vận tốc đầu và gia tốc suy ra từ chính parabol trên — nhờ vậy nhánh rơi nhanh nối
   * liền mạch vào quỹ đạo đang bay, không có cú giật ở chỗ chuyển. */
  const V0 = 4 * H / T;
  const G = 8 * H / (T * T);

  const heightAt = t => 4 * H * (t / T) * (1 - t / T);
  const velocityAt = t => V0 - G * t;

  function jump(s) {
    if (s.pose === 'jump') return;           // không có nhảy đúp
    s.pose = 'jump';
    s.poseT = 0;
    s.jumpT = 0;
    s.ff = null;
    s.y = 0;
  }

  function slideDown(s) {
    s.slideHold = true;
    if (s.pose === 'jump') {
      /* Đang bay: chuyển sang quỹ đạo rơi nhanh, nối từ đúng độ cao và vận tốc hiện
       * tại. Ghi lại một lần rồi thôi — bấm liên tục không rơi nhanh thêm. */
      if (!s.ff) s.ff = { t0: s.jumpT, y0: s.y, v0: velocityAt(s.jumpT) };
      return;
    }
    if (s.pose !== 'slide') { s.pose = 'slide'; s.poseT = 0; }
  }

  function slideUp(s) {
    s.slideHold = false;
  }

  function step(s, dt) {
    s.poseT += dt;

    if (s.pose === 'jump') {
      s.jumpT += dt;
      if (s.ff) {
        const td = s.jumpT - s.ff.t0;
        s.y = s.ff.y0 + s.ff.v0 * td - 0.5 * (G * R.FAST_FALL_MUL) * td * td;
      } else {
        s.y = heightAt(s.jumpT);
      }
      if (s.y <= 0) {
        s.y = 0;
        s.ff = null;
        /* Chạm đất mà vẫn đang giữ nút cúi thì vào cúi NGAY, không mất một nhịp đứng.
         * Thiếu chỗ này thì "nhảy rồi rơi nhanh để chui dầm" không bao giờ kịp. */
        s.pose = s.slideHold ? 'slide' : 'run';
        s.poseT = 0;
        s.jumpT = 0;
      }
      return;
    }

    if (s.pose === 'slide') {
      /* Nhịp tối thiểu SLIDE_T kể cả khi nhả nút sớm: chạm nhẹ một cái vẫn ra một cú
       * cúi trọn vẹn. Không có sàn này thì gõ phím nhanh cho ra cú cúi dài 1 khung
       * hình — vô dụng, mà người chơi lại tưởng mình đã cúi. */
      if (s.poseT >= R.SLIDE_T && !s.slideHold) {
        s.pose = 'run';
        s.poseT = 0;
      }
    }
  }

  return { heightAt, velocityAt, jump, slideDown, slideUp, step, V0, G };
})();

;
/* ===== js/rules-collision.js ===== */
/* rules-collision.js — va chạm hộp thẳng trục (AABB)
 *
 * Vì sao AABB chứ không lưới đa giác: luật phải chạy được trong Node không có Three.js
 * (xem `tools/load-headless.mjs`). Và với chướng ngại hình hộp thì AABB không hề kém
 * chính xác hơn — nó CHÍNH LÀ hình dạng thật.
 *
 * Quy ước: `y` của nhân vật là độ cao CHÂN, còn `yBase` của vật là mép DƯỚI. Nhầm hai
 * cái này với nhau cho ra lỗi kiểu "cúi vẫn đụng dầm" mà nhìn số thì thấy đúng.
 *
 * MỘT CHẠM LÀ CHẾT, không có trạng thái "vấp rồi chậm lại". Prototype tồn tại để đo
 * xem chướng ngại có công bằng không; có vấp thì mọi thiết kế tệ đều bị che đi — người
 * chơi vấp liên tục vẫn chạy tiếp và không ai biết chunk nào đang sai. Một-chạm-là-chết
 * biến mỗi cái chết thành một điểm dữ liệu. (Phương án B ở GDD mục 6.1.)
 */

ND.Rules = ND.Rules || {};

ND.Rules.Collision = (function () {
  const R = ND.CFG.RUNNER;
  const F = ND.CFG.FORGIVE;

  /* Hộp nhân vật theo tư thế. Cúi thì THẤP ĐI VÀ DÀI RA — dài ra là để cúi không trở
   * thành cách vượt rào thấp miễn phí. */
  function boxOf(s) {
    return s.pose === 'slide' ? R.BOX_SLIDE : R.BOX_RUN;
  }

  /* Trả về vật đang chồng lấn, hoặc null.
   *
   * Chỉ xét vật quanh `z` của nhân vật thay vì quét cả danh sách: ở phase 03 danh sách
   * hoạt động có vài chục vật trải trên 90 m, mà chỉ vài mét quanh chân là có thể chạm. */
  function check(s) {
    const rb = boxOf(s);
    const list = s.obstacles;
    const TYPES = ND.Data.Obstacles.TYPES;

    for (let i = 0; i < list.length; i++) {
      const ob = list[i];
      const T = TYPES[ob.type];
      if (!T) continue;

      const halfZ = (rb.d + T.d) * 0.5;
      const dz = s.z - ob.z;
      if (dz > halfZ || dz < -halfZ) continue;          // chưa tới hoặc đã qua hẳn

      /* Từ đây trở xuống đều trừ BIÊN THA (xem khối `FORGIVE` trong `core-config.js`).
       *
       * KHÔNG tha theo trục Z: dọc hướng chạy thì "sắp đâm" và "đã đâm" cách nhau vài
       * phần trăm giây, tha ở đó không ai cảm nhận được mà lại làm vật mỏng như rào và
       * dầm gần như vô hại. */
      const ox = ND.Rules.Lane.centerOf(ND.Data.Obstacles.laneOf(ob, s.t));
      const halfX = (rb.w + T.w) * 0.5 - F.X;
      const dx = s.x - ox;
      if (dx >= halfX || dx <= -halfX) continue;        // lệch làn đủ xa, hoặc chỉ cạ nhẹ

      /* Trục đứng: người chiếm [y, y + cao], vật chiếm [yBase, yBase + cao].
       * Không chạm nhau khi một bên nằm hẳn trên hoặc hẳn dưới bên kia. */
      if (s.y >= T.yBase + T.h - F.TOP) continue;       // lên tới mép trên -> coi như đã vượt
      if (s.y + rb.h <= T.yBase + F.BOTTOM) continue;   // đã chui lọt bên dưới

      return ob;
    }
    return null;
  }

  return { boxOf, check };
})();

;
/* ===== js/rules-run.js ===== */
/* rules-run.js — trọng tài của một bước mô phỏng
 *
 * THỨ TỰ GỌI LÀ PHẦN QUAN TRỌNG NHẤT CỦA FILE NÀY. Không phải sở thích sắp xếp:
 *
 *   1. tiêu lệnh      — ý định của người chơi phải vào TRƯỚC khi bất cứ gì di chuyển,
 *                       nếu không thì lệnh bấm ở khung hình này chỉ có tác dụng ở
 *                       khung hình sau, và cả game trễ một nhịp.
 *   2. tốc độ + mét   — quyết định `z` của bước này.
 *   3. trượt làn      — quyết định `x`.
 *   4. nhảy / cúi     — quyết định `y` và hình dạng hộp va chạm.
 *   5. va chạm        — kiểm SAU CÙNG, khi cả ba toạ độ đã là của bước này. Kiểm sớm
 *                       hơn nghĩa là so vị trí cũ với thế giới mới.
 *
 * Phase 04 chèn `rules-booster` vào giữa bước 1 và 2 (nó đổi hệ số tốc độ) và trước
 * bước 5 (nó quyết định có bỏ qua va chạm không).
 */

ND.Rules = ND.Rules || {};

ND.Rules.Run = (function () {

  function step(s, dt) {
    /* Chết rồi thì đứng im hẳn — không cộng mét, không nhận lệnh. Nếu vẫn cho chạy
     * tiếp thì màn hình kết quả đếm thêm vài mét sau khi người chơi đã đâm, và con số
     * gửi lên bảng xếp hạng không còn là con số họ nhìn thấy lúc chết. */
    if (!s.alive) return;

    s.t += dt;

    ND.Input.drain(s);

    /* Booster chạy TRƯỚC tốc độ (nó nhân hệ số) và trước va chạm (nó quyết định có bỏ
     * qua va chạm không). Đặt sai chỗ thì bước đầu tiên sau khi nhặt vẫn chạy bằng luật cũ. */
    ND.Rules.Booster.step(s, dt);

    ND.Rules.Speed.step(s, dt);

    /* Sinh đường SAU khi biết `z` mới: cửa sổ sinh tính từ vị trí hiện tại. Sinh trước
     * thì mỗi bước thiếu đúng một quãng, và ở tốc độ trần cái thiếu đó đủ để vật hiện
     * ra ngay trước mặt thay vì từ trong sương mù. */
    if (s.spawnOn) ND.Rules.Spawn.ensure(s);

    ND.Rules.Lane.step(s, dt);
    ND.Rules.JumpSlide.step(s, dt);

    /* Bay thì khoá lại độ cao SAU khi nhảy/cúi đã tính xong — đang bay thì hai lệnh đó
     * không có nghĩa gì, và để `rules-jump-slide` kéo `y` xuống trước khi kiểm va chạm
     * sẽ cho ra một khung hình nhân vật rơi vào giữa tường. */
    ND.Rules.Booster.lockHeight(s);

    /* Vòng lặp chứ không kiểm một lần: đang PHÁ KHỐI thì một bước có thể chạm nhiều vật
     * (ống dài nằm ngay sau một cái tường chẳng hạn). Kiểm một lần thì mỗi bước chỉ phá
     * được một cái, và vật thứ hai kịp trôi qua mà không tính điểm. */
    for (let lan = 0; lan < 8; lan++) {
      const hit = ND.Rules.Collision.check(s);
      if (!hit) break;

      if (ND.Rules.Booster.smashing(s)) {
        const khoi = hit.type === 'tube' ? ND.CFG.BOOSTER.TUBE_BLOCKS : 1;
        s.smashCount += khoi;
        s.bonusMeters += khoi * ND.CFG.BOOSTER.SMASH_BONUS;
        /* Gỡ hẳn khỏi thế giới, nếu không nó còn chồng lấn ở bước sau và được tính điểm
         * lặp đi lặp lại cho tới khi trôi qua — vài chục lần cho một cái tường. */
        s.obstacles.splice(s.obstacles.indexOf(hit), 1);
        ND.bus.emit('run:smash', { type: hit.type, blocks: khoi, bonus: s.bonusMeters });
        continue;
      }

      if (ND.Rules.Booster.invulnerable(s)) break;

      s.alive = false;
      s.deathReason = hit.type;
      ND.bus.emit('run:death', { reason: hit.type, meters: s.meters });
      return;
    }
  }

  /* Điểm cuối ván = mét đi được + thưởng phá khối (GDD mục 4.2). */
  function score(s) {
    return Math.floor(s.meters) + s.bonusMeters;
  }

  return { step, score };
})();

;
/* ===== js/view-bootstrap.js ===== */
/* view-bootstrap.js — chờ Three.js sẵn sàng rồi mới khởi động game
 *
 * ================== BẪY LỚN NHẤT CỦA PHASE 01, ĐỌC KỸ ==================
 *
 * Three.js chỉ còn phát hành dạng ES module (bản UMD `three.min.js` đã bị bỏ). Mà mọi
 * file của game này là script THƯỜNG, nối lại bằng thẻ <script>. Hai loại đó nạp khác
 * thứ tự:
 *
 *     <script src="...">          chạy NGAY khi gặp
 *     <script type="module">      luôn HOÃN tới sau khi phân tích xong tài liệu
 *
 * Nghĩa là cầu nối nhập Three LUÔN chạy SAU toàn bộ file game — kể cả khi nó nằm ngay
 * dòng đầu <head>. Nếu `main.js` gọi thẳng `new THREE.Scene()` lúc nạp, lỗi
 * `THREE is not defined` sẽ xuất hiện lúc có lúc không tuỳ tốc độ mạng và tuỳ cache,
 * và gần như không lần ra vì đọc mã thì thấy thứ tự thẻ script "rõ ràng là đúng".
 *
 * Vì vậy: game KHÔNG tự khởi động. Nó đăng ký ở đây, cầu nối trong index.html phát
 * sự kiện, rồi mới chạy.
 *
 * Có thêm CỜ `__NDThreeReady` bên cạnh sự kiện. Sự kiện là thứ dùng một lần: ai nghe
 * muộn hơn lúc phát thì không bao giờ nghe được. Cờ chặn hẳn lớp lỗi đó, giá gần như
 * bằng không.
 */

ND.Bootstrap = (function () {
  let started = false;

  function run(fn) {
    if (started) return;
    started = true;
    fn();
  }

  return {
    /* Gọi `fn` khi Three đã gán vào `globalThis.THREE`, đúng một lần. */
    whenReady(fn) {
      if (globalThis.__NDThreeReady) { run(fn); return; }
      globalThis.addEventListener('nd:three-ready', () => run(fn), { once: true });

      /* Lưới an toàn: 10 giây không thấy Three thì báo cho người chơi biết, thay vì
       * để họ nhìn màn hình đen và tự đoán. Thường là do file third-party thiếu trong
       * bản dựng hoặc mạng chặn — cả hai đều cần nói ra. */
      setTimeout(() => {
        if (started) return;
        const el = document.getElementById('boot-msg');
        if (el) el.textContent = 'Không tải được thư viện đồ hoạ. Thử tải lại trang.';
        console.error('[neon-dash] Three.js không sẵn sàng sau 10s — kiểm tra third-party/.');
      }, 10000);
    }
  };
})();

;
/* ===== js/view-palette.js ===== */
/* view-palette.js — bảng màu hướng art A "đại lộ trên cao, phố đêm synthwave" (P02 plan art AAA, báo cáo AD mục 3)
 *
 * LUẬT (kiểm bằng mắt mỗi vòng chụp):
 * - Hồng `#ff3d9a` / vàng `#ffc93d` / lam `#3ddcff` là MÀU HÀNH ĐỘNG (né / nhảy / cúi): chỉ chướng ngại, decal báo trước
 *   và HUD hướng dẫn được dùng. Không đạo cụ thế giới nào có sắc độ trong ±20° của ba màu đó với độ bão hoà > 50 %.
 * - Ngoại lệ có chứng minh: vòm trời + mặt trời. Đỉnh chướng ngại cao nhất 3,15 m, camera thấp nhất 4,2 m → mọi chướng
 *   ngại chiếu xuống DƯỚI chân trời, trời không bao giờ nằm sau chướng ngại.
 * - Sương gameplay = dải chân trời của vòm (chàm tối, bão hoà thấp). Sương sáng sẽ ăn màu hành động ở 60 m.
 */
ND.View = ND.View || {};

ND.View.Palette = {
  HONG: 0xff3d9a, VANG: 0xffc93d, LAM: 0x3ddcff,

  CHAN_TROI: 0x1d1733,       // = CFG.COLOR.FOG — đổi một thì đổi cả hai
  TROI_GIUA: 0x2a1b52,
  TROI_DINH: 0x07061a,
  MAT_TROI_TREN: 0xffc48a,
  MAT_TROI_DUOI: 0xc2367a,

  CUA_SO_TIM: 0xb9b3ff,      // 80 % cửa sổ
  CUA_SO_HO_PHACH: 0xffd9b0, // 20 %
  DEN_COT: 0xe8ecff,         // đèn cột, vòng làn — trắng lạnh

  MAT_CAU: 0x1a1d33,
  KIM_LOAI_LAN_CAN: 0x23263a,
  THAN_CHUONG_NGAI: 0x14121c,

  /* Thành phố (P04). Biển hiệu tránh ba sắc hành động: tím 259°, cam đỏ 14° (cách hồng 43°, cách vàng 29°), bạc hà 146°
   * (cách lam 45°). Bậc lùi về tím và chàm — màu của "phố", không phải của "luật". */
  THAN_THAP: 0x100d24,
  NOC_THAP: 0x7a5cff,
  BIEN_TIM: 0x9b6bff,
  BIEN_CAM: 0xff6a3d,
  BIEN_BAC_HA: 0x4dff9a,
  BIEN_TRANG: 0xf0e8ff,
  NEN_PHO: 0x0b0918,         // mặt đất thành phố dưới cầu, y = −40
  TROI_BONG_PHO: 0x110c24,   // bóng skyline xa vẽ trên vòm (miễn luật như mọi màu TROI_)

  DEN_BAN_CAU_TROI: 0x5b4fd9,
  DEN_BAN_CAU_DAT: 0x0a0818,
  DEN_HUONG: 0xd9d4ff
};

;
/* ===== js/view-quality.js ===== */
/* view-quality.js — 3 bậc chất lượng Q2 / Q1 / Q0 (quyết định Q6 plan art AAA, AD mục 9)
 *
 * Q2: DPR ≤ 2, bloom ½, MSAA 4 — desktop.   Q1: DPR ≤ 1,5, bloom ¼, MSAA 2 — `(pointer: coarse)` bắt đầu ở đây.
 * Q0: DPR ≤ 1,25, không hậu kỳ (vẽ thẳng), viền phát sáng mạnh hơn bù bloom.
 * Tự hạ MỘT bậc khi trung vị thời gian khung > 40 ms suốt 4 s (trung vị, không p95: một khung tua dài của harness hay
 * một lần GC không được kéo cả ván xuống). Không lưu giữa các lần mở — máy khác giờ khác tải.
 * BẪY đã gặp ở Toy Tower (22/10): bộ tự chỉnh độ phân giải kẹt ở sàn vì chỉ hạ không bao giờ nâng. Ở đây chỉ HẠ, có chủ
 * đích: nâng lại cần đo khi đang ở bậc cao, tức là phải chịu giật để đo. Nút chọn tay (P07) là đường nâng.
 */
ND.View = ND.View || {};

ND.View.Quality = (function () {
  const TIERS = [
    { dpr: 1.25, bloom: 0, samples: 0, trim: 1.25 },
    { dpr: 1.5, bloom: 0.5, samples: 2, trim: 1 },
    { dpr: 2, bloom: 1, samples: 4, trim: 1 }
  ];
  const CUA_SO_MS = 4000, NGUONG_MS = 40;
  const mau = new Float32Array(512);
  let n = 0, tong = 0, tier = 2, tuHa = true;
  const nghe = [];

  /* Bậc khởi đầu. Harness ép bằng `?q=` (bọc hàm này), nên đừng đọc URL ở đây. */
  function pick() {
    const cham = globalThis.matchMedia && globalThis.matchMedia('(pointer: coarse)').matches;
    return cham ? 1 : 2;
  }

  function set(t) {
    tier = Math.max(0, Math.min(2, t));
    n = tong = 0;
    for (const f of nghe) f(TIERS[tier], tier);
  }

  /* main.js gọi mỗi khung với thời gian thật (ms) */
  function tick(dtMs) {
    if (!tuHa || tier === 0 || !(dtMs > 0)) return;
    if (n < mau.length) mau[n++] = dtMs;
    tong += dtMs;
    if (tong < CUA_SO_MS) return;
    const a = Array.prototype.slice.call(mau, 0, n).sort((x, y) => x - y);   // 4 s một lần, không phải mỗi khung
    const giua = a[a.length >> 1];
    n = tong = 0;
    if (giua > NGUONG_MS) {
      console.warn('[neon-dash] trung vị khung ' + giua.toFixed(1) + ' ms > ' + NGUONG_MS + ' → hạ bậc Q' + (tier - 1));
      set(tier - 1);
    }
  }

  return {
    TIERS, pick, set, tick,
    onChange(f) { nghe.push(f); },
    setAuto(v) { tuHa = !!v; },
    get tier() { return tier; },
    get cfg() { return TIERS[tier]; }
  };
})();

;
/* ===== js/view-post.js ===== */
/* view-post.js — chuỗi hậu kỳ: RenderPass (HalfFloat, MSAA) → UnrealBloomPass → OutputPass (P02 plan art AAA, AD mục 9)
 *
 * Bậc Q0 hoặc addon không nạp được → vẽ thẳng `renderer.render`, không composer.
 * BẪY r180:
 * - Vẽ vào render target thì renderer BỎ tone mapping và trả màu tuyến tính → tone map + sRGB xảy ra ở OutputPass. Vật
 *   liệu tự viết (ShaderMaterial) phải viết màu TUYẾN TÍNH và kết bằng `tonemapping_fragment` + `colorspace_fragment`
 *   để Q0 (vẽ thẳng) và Q1/Q2 (composer) ra cùng màu.
 * - Khử răng cưa `antialias: true` chỉ áp cho canvas — qua composer là mất. Render target phải có `samples`.
 * - Composer vẽ nhiều lượt → `renderer.info` tự reset mỗi lượt và chỉ còn số của lượt cuối. Tắt autoReset, reset tay
 *   đầu mỗi khung (census + overlay `?debug` đọc tổng thật).
 * Không dùng "selective bloom" của skill postprocessing: nó vẽ cảnh hai lần, nhân đôi lệnh vẽ. Ngưỡng bloom chọn để chỉ
 * vật phát sáng > ngưỡng nở: viền chướng ngại, lề đường, lõi mặt trời.
 */
ND.View = ND.View || {};

ND.View.Post = (function () {
  /* Bán kính nhỏ: quầng rộng 0,42 ở r2b làm tường hồng thành khối hồng đặc, mất khung — glow che hình là auto-fail */
  const SUC = 0.5, BAN_KINH = 0.2, NGUONG = 0.82;
  let renderer, scene, camera, composer = null, v2 = null;

  function setup(r, s, c) {
    renderer = r; scene = s; camera = c;
    v2 = new THREE.Vector2();
    renderer.info.autoReset = false;
  }

  function build(cfg) {
    if (composer) { composer.dispose(); composer = null; }
    const A = globalThis.ND_ADDONS;
    if (!cfg.bloom || !A) return;
    renderer.getDrawingBufferSize(v2);
    const rt = new THREE.WebGLRenderTarget(v2.x, v2.y, { type: THREE.HalfFloatType, samples: cfg.samples });
    composer = new A.EffectComposer(renderer, rt);
    composer.addPass(new A.RenderPass(scene, camera));
    /* Mip đầu nhỏ đi một nửa thì quầng loang rộng gấp đôi trên màn hình — Q1 cùng sức với Q2 phủ quầng kín khung mobile
     * (r2 m-02, m-11: "glow washes the frame"). Hạ sức theo căn bậc hai của tỉ lệ: Q2 0,5, Q1 ≈ 0,35. */
    const bloom = new A.UnrealBloomPass(new THREE.Vector2(256, 256), SUC * Math.sqrt(cfg.bloom), BAN_KINH, NGUONG);
    /* UnrealBloomPass tự lấy ½ kích thước được giao làm mip đầu → Q2 giao nguyên (bloom ½), Q1 giao một nửa (bloom ¼) */
    const setSize0 = bloom.setSize.bind(bloom);
    bloom.setSize = (w, h) => setSize0(Math.max(2, Math.round(w * cfg.bloom)), Math.max(2, Math.round(h * cfg.bloom)));
    composer.addPass(bloom);
    composer.addPass(new A.OutputPass());
    resize();
  }

  function resize() {
    if (!composer) return;
    renderer.getSize(v2);
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(v2.x, v2.y);
  }

  function render() {
    renderer.info.reset();
    if (composer) composer.render();
    else renderer.render(scene, camera);
  }

  return { setup, build, resize, render, get active() { return !!composer; } };
})();

;
/* ===== js/view-env.js ===== */
/* view-env.js — bản đồ môi trường nướng một lần từ "phòng neon" tự dựng (P02 plan art AAA, AD mục 8)
 *
 * Kim loại không có gì để phản chiếu thì ra đen kịt — thân chướng ngại, lan can, hero đều cần một môi trường. Dựng phòng
 * hộp tối với 4 tấm phát sáng (hồng, lam, tím, trắng) rồi PMREM một lần lúc khởi động: 0 lệnh vẽ mỗi khung, 0 file tải.
 * Không vendor `RoomEnvironment` của addon — PMREMGenerator có sẵn trong lõi.
 */
ND.View = ND.View || {};

ND.View.Env = (function () {
  function build(renderer, scene) {
    const P = ND.View.Palette;
    const room = new THREE.Scene();
    const geos = [], mats = [];
    function tam(w, h, mau, k, x, y, z, rx, ry) {
      const g = new THREE.PlaneGeometry(w, h);
      const m = new THREE.MeshBasicMaterial({ color: new THREE.Color(mau).multiplyScalar(k), side: THREE.DoubleSide });
      const o = new THREE.Mesh(g, m);
      o.position.set(x, y, z);
      o.rotation.set(rx || 0, ry || 0, 0);
      room.add(o);
      geos.push(g); mats.push(m);
    }
    const vo = new THREE.BoxGeometry(12, 12, 12);
    const voMat = new THREE.MeshBasicMaterial({ color: 0x0c0a1e, side: THREE.BackSide });
    room.add(new THREE.Mesh(vo, voMat));
    geos.push(vo); mats.push(voMat);

    tam(3, 7, P.HONG, 2.2, -5.9, 0.5, -1, 0, Math.PI / 2);          // trái
    tam(3, 7, P.LAM, 2.2, 5.9, 0.5, -1, 0, -Math.PI / 2);           // phải
    tam(10, 3, P.TROI_GIUA, 3.0, 0, 5.9, 0, Math.PI / 2, 0);        // trần tím — phản chiếu chủ đạo trên mặt ngang
    tam(4, 1.5, P.DEN_COT, 4.0, 0, 3, -5.9, 0, 0);                  // trắng phía trước — điểm sáng trên mặt cong

    const pm = new THREE.PMREMGenerator(renderer);
    scene.environment = pm.fromScene(room, 0.03).texture;
    scene.environmentIntensity = 0.7;
    pm.dispose();
    geos.forEach(g => g.dispose());
    mats.forEach(m => m.dispose());
  }

  return { build };
})();

;
/* ===== js/view-sky.js ===== */
/* view-sky.js — vòm trời bám camera: gradient chàm, mặt trời sọc synthwave, sao (P02 plan art AAA, AD mục 7)
 *
 * Dải chân trời PHẢI trùng màu sương gameplay (`CFG.COLOR.FOG`): lệch là lộ vệt ranh giới thẳng ở chỗ đường chìm sương.
 * Bán kính 250 < mặt phẳng xa 300: vòm ngoài mặt phẳng xa bị cắt ở không gian clip, `depthTest:false` không cứu được.
 * Mặt trời: tâm cao 10° trên chân trời, bán kính 5° → mép dưới cách chân trời 5° để quầng không loang xuống vùng chướng
 * ngại hiện ra. Màu vòm được phép nằm ngoài luật bảng màu (view-palette.js) vì không bao giờ nằm sau chướng ngại.
 * Màu viết TUYẾN TÍNH (THREE.Color tự đổi từ hex sRGB), kết bằng tone map + colorspace — xem view-post.js.
 */
ND.View = ND.View || {};

ND.View.Sky = (function () {
  let mesh = null, uni = null;

  const VERT = [
    'varying vec3 vDir;',
    'void main() {',
    '  vDir = position;',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n');

  const FRAG = [
    'uniform vec3 uHorizon, uMid, uZenith, uSunTop, uSunBot, uBong;',
    'uniform float uTime;',
    'varying vec3 vDir;',
    'float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }',
    'void main() {',
    '  vec3 d = normalize(vDir);',
    '  float h = d.y;',
    '  vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.22, h));',
    '  col = mix(col, uZenith, smoothstep(0.22, 0.75, h));',
    // quầng thành phố: dải sáng tím mảnh ngay trên chân trời — nằm SAU skyline nên chỉ còn viền sáng trên nóc bóng nhà
    '  col += uMid * 0.9 * exp(-abs(h - 0.01) * 60.0);',
    // skyline xa (P04): bóng nhà cao ≤ 2,9° — mép dưới mặt trời ở 5° nên không bao giờ che mặt trời. Hai tầng: dãy thấp
    // dày + tháp nhọn thưa. Cửa sổ ô 1/500 rad (~1,7 px trên mobile) — nhỏ hơn thì lấp lánh răng cưa khi xoay camera.
    '  float az = atan(d.x, -d.z);',
    '  float hb = 0.004 + 0.03 * hash(vec2(floor(az * 90.0), 3.0)) * (0.35 + 0.65 * hash(vec2(floor(az * 21.0), 9.0)));',
    '  hb = max(hb, 0.05 * step(0.86, hash(vec2(floor(az * 34.0), 5.0))));',
    '  vec2 cs = vec2(az, h) * 500.0;',
    '  float cuaSo = step(0.88, hash(floor(cs))) * step(0.35, fract(cs.x)) * step(0.35, fract(cs.y));',
    '  col = mix(col, uBong + uSunTop * 0.22 * cuaSo, step(h, hb) * step(-0.05, h));',
    '  vec3 sd = normalize(vec3(0.0, 0.17365, -0.98481));',            // 10° trên chân trời, thẳng hướng chạy
    '  float ang = acos(clamp(dot(d, sd), -1.0, 1.0));',
    '  float R = 0.08727;',                                              // 5°
    '  col += uSunBot * 0.55 * exp(-max(ang - R, 0.0) * 9.0) * step(0.0, h);',
    '  if (ang < R) {',
    '    float t = clamp((d.y - (sd.y - R)) / (2.0 * R), 0.0, 1.0);',
    '    vec3 sc = mix(uSunBot, uSunTop, t) * 1.7;',
    // sọc ngang khoét nửa dưới, dày dần về đáy, trôi xuống chậm — mặt trời "chạy" cùng người chơi
    '    float band = fract((1.0 - t) * 7.0 + uTime * 0.18);',
    '    float khe = mix(0.0, 0.5, clamp((0.58 - t) / 0.58, 0.0, 1.0));',
    '    float vien = smoothstep(R, R * 0.96, ang);',
    '    col = mix(col, sc, vien * step(khe, band));',
    '  }',
    '  vec2 g = vec2(atan(d.x, -d.z), asin(h)) * 140.0;',
    '  float r = hash(floor(g));',
    '  float sao = step(0.986, r) * smoothstep(0.14, 0.0, length(fract(g) - 0.5)) * smoothstep(0.1, 0.35, h);',
    '  col += vec3(0.75, 0.8, 1.0) * sao * (0.6 + 0.4 * sin(uTime * 2.0 + r * 60.0));',
    '  gl_FragColor = vec4(col, 1.0);',
    '  #include <tonemapping_fragment>',
    '  #include <colorspace_fragment>',
    '}'
  ].join('\n');

  function build(scene) {
    const P = ND.View.Palette;
    uni = {
      uHorizon: { value: new THREE.Color(ND.CFG.COLOR.FOG) },
      uMid: { value: new THREE.Color(P.TROI_GIUA) },
      uZenith: { value: new THREE.Color(P.TROI_DINH) },
      uSunTop: { value: new THREE.Color(P.MAT_TROI_TREN) },
      uSunBot: { value: new THREE.Color(P.MAT_TROI_DUOI) },
      uBong: { value: new THREE.Color(P.TROI_BONG_PHO) },
      uTime: { value: 0 }
    };
    mesh = new THREE.Mesh(new THREE.SphereGeometry(250, 48, 24), new THREE.ShaderMaterial({
      uniforms: uni, vertexShader: VERT, fragmentShader: FRAG,
      side: THREE.BackSide, depthWrite: false, fog: false
    }));
    mesh.renderOrder = -10;
    mesh.frustumCulled = false;
    mesh.userData.nhom = 'troi';
    scene.add(mesh);
  }

  /* Bám vị trí camera (không bám hướng) → trời đứng yên như ở vô cực */
  function update(camera, t) {
    mesh.position.copy(camera.position);
    uni.uTime.value = t;
  }

  return { build, update };
})();

;
/* ===== js/view-fade-passed.js ===== */
/* view-fade-passed.js — làm tan phần chướng ngại đã ở SAU nhân vật, tính theo từng điểm ảnh trên trục z thế giới
 *
 * Lỗi 1 (r0 d-09-late, r0b d-10-tube): ống dài 15 m, cửa sổ giữ vật phía sau (ACTIVE_BACK 10 m) dài hơn khoảng camera
 * lùi (8,5 m) → nóc ống phía sau che kín hero suốt lúc trong ống và cả lúc vừa ra.
 * Tính theo VẬT (ẩn cả instance) thì ống mất luôn khúc phía trước còn đang phải cúi. Tính theo ĐIỂM ẢNH: phần có
 * z > runnerZ + 0,3 tan dần, hết hẳn ở + 1,5. Mốc 0,3 từ tính tia nhìn: tia từ camera (lùi 8,5, cao ~4,2) tới đầu hero
 * cắt đáy nóc ống (y 1,15) ở ~+0,3 m — phần nóc trước mốc không che đầu.
 * ALPHA-TO-COVERAGE thay vì trong suốt: vẫn ghi độ sâu, khỏi sắp xếp vật trong suốt; MSAA (composer Q1/Q2, canvas
 * `antialias` ở Q0) biến alpha thành tỉ lệ mẫu phủ → mờ dần mịn. Bản r2 bỏ điểm ảnh theo nhiễu (dither) — ảnh dừng hình
 * lộ khung lỗ chỗ quanh hero, người chấm trừ cả Obstacles lẫn Lighting. Vật liệu cộng sáng (decal) chỉ cần alpha.
 * Hộp va chạm không đổi.
 */
ND.View = ND.View || {};

ND.View.FadePassed = (function () {
  const uniform = { value: 0 };
  const BAT_DAU = 0.3, DAI = 1.2;

  /* Chèn vào shader đang biên dịch — view-materials.js gọi thẳng khi vật liệu còn chèn thêm thứ khác (viền fresnel) */
  function inject(sh) {
    sh.uniforms.uNdRunnerZ = uniform;
    sh.vertexShader = 'varying float vNdWz;\n' + sh.vertexShader.replace('#include <project_vertex>', [
      '#include <project_vertex>',
      'vec4 ndW = vec4(transformed, 1.0);',
      '#ifdef USE_INSTANCING',
      '  ndW = instanceMatrix * ndW;',
      '#endif',
      'vNdWz = (modelMatrix * ndW).z;'
    ].join('\n'));
    sh.fragmentShader = 'uniform float uNdRunnerZ;\nvarying float vNdWz;\n' + sh.fragmentShader.replace('void main() {', [
      'void main() {',
      '  float ndA = 1.0 - clamp((vNdWz - uNdRunnerZ - ' + BAT_DAU.toFixed(2) + ') / ' + DAI.toFixed(2) + ', 0.0, 1.0);',
      '  if (ndA <= 0.0) discard;'
    ].join('\n')).replace('#include <opaque_fragment>', 'diffuseColor.a *= ndA;\n#include <opaque_fragment>');
  }

  /* Vật liệu ĐỤC phải bật `alphaToCoverage` (three bỏ định nghĩa OPAQUE → alpha tới được GPU); thiếu cờ này alpha bị ép
   * về 1 và phần đã qua lại che hero như lỗi 1. */
  function patch(mat) {
    if (!mat.transparent) mat.alphaToCoverage = true;
    mat.onBeforeCompile = inject;
    mat.customProgramCacheKey = () => 'nd-fade-passed';
    return mat;
  }

  return { uniform, inject, patch };
})();

;
/* ===== js/view-materials.js ===== */
/* view-materials.js — thư viện vật liệu theo VAI (P02 plan art AAA, AD mục 8)
 *
 * Mỗi bề mặt lấy vật liệu theo vai (thân chướng ngại, viền, mặt cầu…) thay vì tự `new` màu rời — đổi hướng art là sửa
 * một chỗ. Viền dùng màu > 1 (tuyến tính) để vượt ngưỡng bloom; bậc Q0 không có bloom thì nhân thêm `trim` của bậc
 * (view-quality.js) để viền vẫn rực.
 * Mọi vật liệu chướng ngại đi qua `ND.View.FadePassed.inject` (tan phần đã qua sau nhân vật) — một onBeforeCompile duy
 * nhất cho cả fade lẫn viền fresnel, vì gán onBeforeCompile hai lần là lần sau đè lần trước.
 */
ND.View = ND.View || {};

ND.View.Mat = (function () {
  const vien = [];             // [{ mat, hex, L }] — tính lại màu khi đổi bậc chất lượng
  const K_TOI_DA = 4.5;

  /* Đẩy màu vai lên ĐỘ SÁNG tuyến tính L (không nhân một hệ số chung). Cùng hệ số ×2, hồng chỉ sáng 0,54 còn vàng 1,26
   * → ngưỡng bloom 0,82 (view-post.js) chỉ cho vàng và lam nở, hồng-né đứng trơ (đo ở r2a). Chặn trên 4,5 vì hồng
   * tối nhất: đẩy cao hơn thì tone map bạc lõi thành trắng. Bậc Q0 không bloom nhân thêm `trim` của bậc.
   * Hạ được, không chỉ nâng: lề bậc 4 trắng nóng sáng sẵn 0,88 > ngưỡng → nở phủ mặt cầu (r3a) dù lề đặt L = 0,7. */
  function hdr(hex, L, out) {
    out.setHex(hex);
    const lum = 0.2126 * out.r + 0.7152 * out.g + 0.0722 * out.b;
    const q = (ND.View.Quality && ND.View.Quality.cfg.trim) || 1;
    return out.multiplyScalar(Math.min(K_TOI_DA, L * q / lum));
  }

  /* Viền phát sáng màu vai (hồng/vàng/lam) */
  function trim(hex, L, fade) {
    const m = new THREE.MeshBasicMaterial({ color: hdr(hex, L, new THREE.Color()) });
    vien.push({ mat: m, hex, L });
    if (fade) ND.View.FadePassed.patch(m);
    return m;
  }

  /* Thân chướng ngại: kim loại tối nhám vừa + ánh vai 10 % + viền fresnel màu vai — khối đọc được hình kể cả khi viền
   * nằm ngoài khung, và mặt kim loại bắt phản chiếu phòng neon (view-env.js) thay cho mảng đen phẳng. */
  function obstacleBody(vaiHex) {
    const P = ND.View.Palette;
    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color(P.THAN_CHUONG_NGAI).lerp(new THREE.Color(vaiHex), 0.1),
      roughness: 0.35, metalness: 0.6, alphaToCoverage: true   // tan phần đã qua — view-fade-passed.js
    });
    /* 0,55 mũ 3: P02 dùng 0,85 mũ 2,5 → mặt trên nằm ngang nhìn từ camera cao gần như tiếp tuyến → fresnel ≈ 1, nóc
     * ống thành một mảng lam phẳng (r2c) che mất sườn */
    const rim = { value: new THREE.Color(vaiHex).multiplyScalar(0.55) };
    m.onBeforeCompile = sh => {
      ND.View.FadePassed.inject(sh);
      sh.uniforms.uNdRim = rim;
      sh.fragmentShader = 'uniform vec3 uNdRim;\n' + sh.fragmentShader.replace('#include <emissivemap_fragment>', [
        '#include <emissivemap_fragment>',
        'totalEmissiveRadiance += uNdRim * pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 3.0);'
      ].join('\n'));
    };
    m.customProgramCacheKey = () => 'nd-obstacle-body';
    return m;
  }

  /* Mặt cầu: albedo + phát sáng từ canvas (view-road-texture.js) — vạch làn và vạch ngang nướng vào texture, bớt 2 lệnh
   * vẽ so với InstancedMesh riêng. Kim loại 0,3 để mặt cầu ánh tím của trần phòng neon thay vì màu nhựa phẳng. */
  function roadDeck(tex) {
    return new THREE.MeshStandardMaterial({
      color: 0xffffff, map: tex.albedo, emissive: 0xffffff, emissiveMap: tex.glow, emissiveIntensity: 1,
      roughness: 0.55, metalness: 0.3
    });
  }

  ND.View.Quality.onChange(() => {
    for (const v of vien) hdr(v.hex, v.L, v.mat.color);
  });

  return { hdr, trim, obstacleBody, roadDeck };
})();

;
/* ===== js/view-road-texture.js ===== */
/* view-road-texture.js — texture mặt cầu vẽ bằng canvas: tấm panel, khe nối 6 m, vạch làn đứt, vạch ngang, mũi tên làn
 *
 * Một tấm phủ ĐÚNG một đoạn đường 24 m × rộng 9 m (mặt trên BoxGeometry: u theo x, v = 1 ở đầu xa −z → hàng TRÊN của
 * canvas là phía trước, mũi tên vẽ chỉ lên là chỉ hướng chạy). Vạch phải trúng ranh giới làn từng cm → vẽ thủ tục, không
 * ảnh AI. Ngẫu nhiên bằng bộ sinh riêng có hạt cố định — không `state.rng` (lớp hiển thị không được rút số của luật).
 * Vạch ngang giữ nhịp 6 m của bản cũ: chúng là tín hiệu tốc độ (GDD §7), không phải trang trí.
 */
ND.View = ND.View || {};

ND.View.RoadTexture = (function () {
  const W = 512, H = 1024;
  const ROAD_M = 9, LEN_M = 24;
  const px = m => m / ROAD_M * W, py = m => m / LEN_M * H;

  function build(renderer) {
    let r = 7;
    const nn = () => (r = (r * 16807) % 2147483647) / 2147483647;

    const a = document.createElement('canvas');
    a.width = W; a.height = H;
    const ca = a.getContext('2d');
    ca.fillStyle = '#1a1d33';
    ca.fillRect(0, 0, W, H);
    /* Tấm panel 3 m × 6 m, độ sáng lệch nhẹ từng tấm → mặt cầu có chất liệu, không phải một mảng màu */
    for (let lan = 0; lan < 3; lan++) {
      for (let k = 0; k < 4; k++) {
        const v = 26 + Math.floor(nn() * 8);
        ca.fillStyle = 'rgb(' + v + ',' + (v + 3) + ',' + (v + 24) + ')';
        ca.fillRect(px(lan * 3) + 2, py(k * 6) + 2, px(3) - 4, py(6) - 4);
      }
    }
    for (let i = 0; i < 2600; i++) {             // hạt nhám
      const v = nn() < 0.5 ? 'rgba(0,0,0,0.18)' : 'rgba(150,160,230,0.07)';
      ca.fillStyle = v;
      ca.fillRect(nn() * W, nn() * H, 2, 2);
    }
    ca.fillStyle = '#0b0c18';                    // khe nối mỗi 6 m
    for (let k = 0; k <= 4; k++) ca.fillRect(0, py(k * 6) - 2, W, 4);
    const vai = ca.createLinearGradient(0, 0, W, 0);   // tối dần ra mép → mặt cầu có độ cong, mắt dồn vào giữa
    vai.addColorStop(0, 'rgba(0,0,0,0.45)'); vai.addColorStop(0.12, 'rgba(0,0,0,0)');
    vai.addColorStop(0.88, 'rgba(0,0,0,0)'); vai.addColorStop(1, 'rgba(0,0,0,0.45)');
    ca.fillStyle = vai;
    ca.fillRect(0, 0, W, H);

    const g = document.createElement('canvas');
    g.width = W; g.height = H;
    const cg = g.getContext('2d');
    cg.fillStyle = '#000';
    cg.fillRect(0, 0, W, H);
    /* Vạch chia làn: đứt 4 m / hở 2 m, có quầng mềm. Màu chàm-lam của bản cũ (không trùng lam hành động — bão hoà thấp) */
    for (const x of [px(3), px(6)]) {
      for (let k = 0; k < 4; k++) {
        cg.fillStyle = 'rgba(80,104,190,0.35)';
        cg.fillRect(x - 7, py(k * 6 + 1), 14, py(4));
        cg.fillStyle = '#7d93e0';
        cg.fillRect(x - 3, py(k * 6 + 1), 6, py(4));
      }
    }
    /* Vạch ngang mờ ở giữa mỗi tấm (z = 3, 9, 15, 21 m) — nhịp nền đọc tốc độ */
    cg.fillStyle = 'rgba(111,143,214,0.42)';
    for (let k = 0; k < 4; k++) cg.fillRect(px(0.36), py(k * 6 + 3) - 5, W - px(0.72), 10);
    /* Vạch vai đường mảnh sát mép, tím nhạt */
    cg.fillStyle = 'rgba(150,140,255,0.5)';
    cg.fillRect(px(0.22), 0, 4, H);
    cg.fillRect(W - px(0.22) - 4, 0, 4, H);
    /* Mũi tên làn mỗi đoạn một lần, giữa mỗi làn — chỉ hướng chạy (hàng trên canvas = phía trước) */
    cg.strokeStyle = 'rgba(160,150,255,0.45)';
    cg.lineWidth = 9;
    for (let lan = 0; lan < 3; lan++) {
      const cx = px(lan * 3 + 1.5), cy = py(13.5);
      for (const d of [0, 46]) {
        cg.beginPath();
        cg.moveTo(cx - 34, cy + 30 + d); cg.lineTo(cx, cy - 6 + d); cg.lineTo(cx + 34, cy + 30 + d);
        cg.stroke();
      }
    }

    const ani = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    const tex = c => {
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = ani;
      return t;
    };
    return { albedo: tex(a), glow: tex(g) };
  }

  return { build };
})();

;
/* ===== js/view-scene.js ===== */
/* view-scene.js — cảnh, ánh sáng, sương mù, camera đuôi
 *
 * QUY ƯỚC TRỤC dùng thống nhất cả game:
 *     -Z là hướng chạy tới.   z của nhân vật = -(số mét đã đi).
 *     +X sang phải.           tâm làn = (làn - 1) * LANE_W  ->  -3, 0, +3
 *     +Y lên.                 mặt đường y = 0.
 * Camera đứng phía SAU nhân vật, tức là z LỚN HƠN z của nhân vật.
 *
 * KHÔNG DÙNG BẢN ĐỒ BÓNG. Bóng đổ thật là thứ đắt nhất trong cảnh này và gần như
 * không thấy trên nền neon tối. Bóng của nhân vật được giả bằng một đĩa mờ dưới chân
 * (phase 05). Toàn bộ cảm giác neon đến từ vật liệu phát sáng cộng sương mù, không
 * đến từ đèn.
 *
 * Ngân sách hiệu năng (GDD mục 13): <= 120 lệnh vẽ, <= 40 000 tam giác, 0 cấp phát
 * mỗi khung hình. Số đo thật in ra console khi thêm `?debug` vào địa chỉ.
 */

ND.View = ND.View || {};

ND.View.Scene = (function () {
  const CFG = ND.CFG;

  let renderer, scene, camera, canvas;
  let camMode = 'NORMAL';     // NORMAL | SURGE | JET
  let cam = { back: 0, up: 0, fov: 0 };   // giá trị đang nội suy, tái dùng, không cấp phát
  let dongHo = 0, daLamNong = false;

  function init(canvasEl) {
    canvas = canvasEl;

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    /* Chặn trần tỉ lệ điểm ảnh ở 2. Điện thoại đời mới báo devicePixelRatio 3–4, dựng
     * hình ở độ phân giải đó tốn gấp 4 lần mà mắt gần như không phân biệt được. */
    renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 2));
    /* Neutral thay ACES (P02 plan art AAA): ACES đẩy hồng hành động ngả cam và lam ngả trắng khi viền > 1; Neutral giữ
     * sắc độ ba màu hành động. Tone map xảy ra ở OutputPass khi có composer — xem view-post.js. */
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.0;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(CFG.COLOR.BG);
    /* Nền và sương mù cùng màu — khác nhau thì lộ vệt ranh giới ở đường chân trời. */
    scene.fog = new THREE.Fog(CFG.COLOR.FOG, CFG.FOG_NEAR, CFG.FOG_FAR);

    const c = CFG.CAM.NORMAL;
    cam.back = c.back; cam.up = c.up; cam.fov = c.fov;
    /* Mặt phẳng xa 300 (P02, cũ: tầm nhìn + 30 = 100) chỉ để thấy vòm trời bán kính 250 và tháp phố (P04). Chướng
     * ngại sau 70 m vẫn chìm hẳn trong sương gameplay 45 → 70 m — cửa sổ phản ứng không đổi. */
    camera = new THREE.PerspectiveCamera(c.fov, 1, 0.1, 300);

    /* Hai đèn, không bóng (GDD §13). Bán cầu trời tím; đèn hướng từ SAU-TRÊN camera chiếu tới trước → soi lưng hero và
     * mặt trước chướng ngại, đúng hai thứ người chơi nhìn. Viền sáng làm bằng fresnel trong vật liệu, không thêm đèn. */
    const P = ND.View.Palette;
    scene.add(new THREE.HemisphereLight(P.DEN_BAN_CAU_TROI, P.DEN_BAN_CAU_DAT, 1.1));
    const dir = new THREE.DirectionalLight(P.DEN_HUONG, 1.4);
    dir.position.set(-3, 12, 10);
    scene.add(dir);

    ND.View.Env.build(renderer, scene);
    ND.View.Sky.build(scene);
    ND.View.Post.setup(renderer, scene, camera);
    ND.View.Quality.onChange(cfg => {
      renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, cfg.dpr));
      resize();
      ND.View.Post.build(cfg);
    });
    ND.View.Quality.set(ND.View.Quality.pick());
    globalThis.addEventListener('resize', resize);
    return { scene, renderer, camera };
  }

  function resize() {
    const w = canvas.clientWidth || globalThis.innerWidth;
    const h = canvas.clientHeight || globalThis.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    ND.View.Post.resize();
  }

  /* Đổi trạng thái camera. Phase 04 gọi khi booster bật/tắt. */
  function setMode(mode) {
    if (CFG.CAM[mode]) camMode = mode;
  }

  /* Cập nhật camera theo vị trí nhân vật.
   *
   * Nội suy theo hằng số thời gian chứ không theo tỉ lệ cố định mỗi khung hình: cùng
   * một dòng `a += (b - a) * 0.1` sẽ chạy nhanh gấp đôi trên màn 120Hz so với 60Hz.
   * Công thức mũ dưới đây cho cùng tốc độ hội tụ ở mọi tần số khung hình.
   */
  function follow(runnerX, runnerY, runnerZ, dt) {
    const t = CFG.CAM[camMode];
    const k = 1 - Math.exp(-dt / (CFG.CAM.LERP_S / 3));
    dongHo += dt;

    cam.back += (t.back - cam.back) * k;
    cam.up += (t.up - cam.up) * k;

    if (Math.abs(cam.fov - t.fov) > 0.01) {
      cam.fov += (t.fov - cam.fov) * k;
      camera.fov = cam.fov;
      camera.updateProjectionMatrix();
    }

    /* Camera bám X của nhân vật nhưng CHỈ MỘT PHẦN (0.55). Bám hoàn toàn thì đổi làn
     * mất hết cảm giác dịch chuyển — cả thế giới trôi ngang trong khi nhân vật đứng
     * yên giữa màn hình. Bám một phần giữ được cả hai: thấy mình dịch, mà vẫn thấy
     * đường phía trước. */
    camera.position.set(runnerX * 0.55, cam.up + runnerY * 0.35, runnerZ + cam.back);
    camera.lookAt(runnerX * 0.3, runnerY * 0.5 + 1.0, runnerZ - CFG.CAM.LOOK_AHEAD);
  }

  /* Rung màn: xê dịch camera một chút SAU khi `follow` đã đặt chỗ.
   *
   * Dịch camera chứ không dịch cả cảnh — dịch cảnh thì đường và nhân vật lệch nhau và
   * nhân vật trông như trượt khỏi mặt đường. Chỉ đụng x/y, không đụng z: rung theo chiều
   * sâu làm mọi vật giật tới lui trong sương mù, đọc ra là lỗi chứ không phải va đập. */
  function applyShake(dx, dy) {
    if (!dx && !dy) return;
    camera.position.x += dx;
    camera.position.y += dy;
  }

  function render() {
    if (!daLamNong) { daLamNong = true; lamNong(); }
    ND.View.Sky.update(camera, dongHo);
    ND.View.Post.render();
  }

  /* Biên dịch MỌI shader ngay khung đầu (lúc màn chờ), kể cả vật đang ẩn (booster, mảnh nổ, vòng làn): `compile` bỏ qua
   * vật ẩn, và lần hiện đầu tiên giữa ván khựng 3–4 s trên ANGLE (bẫy Toy Tower 19/10). */
  function lamNong() {
    const an = [];
    scene.traverse(o => { if (!o.visible) { an.push(o); o.visible = true; } });
    renderer.compile(scene, camera);
    for (const o of an) o.visible = false;
  }

  /* Số đo hiệu năng — gọi tay từ console hoặc bằng `?debug`. */
  function stats() {
    const i = renderer.info;
    return {
      calls: i.render.calls, triangles: i.render.triangles, geometries: i.memory.geometries,
      dpr: renderer.getPixelRatio(), w: renderer.domElement.width, h: renderer.domElement.height
    };
  }

  return {
    init, resize, setMode, follow, applyShake, render, stats,
    get scene() { return scene; },
    get renderer() { return renderer; },
    get camera() { return camera; }
  };
})();

;
/* ===== js/view-track.js ===== */
/* view-track.js — mặt đường vô tận bằng POOL, không bao giờ tạo vật thể mới
 *
 * Ý tưởng: dựng sẵn N đoạn đường, nối đuôi nhau dọc trục -Z. Đoạn nào lùi ra sau
 * camera thì DỜI ra đầu hàng phía trước thay vì huỷ đi rồi tạo lại. Người chơi thấy
 * một con đường bất tận, còn bộ nhớ thì đứng yên.
 *
 * VÌ SAO PHẢI POOL NGAY TỪ PHASE 01 chứ không "tối ưu sau":
 * Tạo/huỷ hình học mỗi khung hình vừa tốn CPU vừa làm bộ dọn rác chạy giữa ván — biểu
 * hiện là khựng đều đặn vài giây một lần, đúng loại lỗi hiệu năng dễ đổ nhầm cho GPU
 * và tốn cả buổi để tìm. Ngân sách "0 cấp phát mỗi khung hình" ở GDD mục 13 bắt đầu từ đây.
 *
 * Hình học và vật liệu dùng CHUNG cho mọi đoạn — chỉ vị trí là khác. Nhờ vậy 12 đoạn
 * chỉ tốn vài hình học chứ không phải 12 bộ.
 */

ND.View = ND.View || {};

ND.View.Track = (function () {
  const CFG = ND.CFG;

  const SEG_LEN = CFG.CHUNK.LEN;       // m, một đoạn đường = một chunk

  /* SỐ ĐOẠN suy ra từ luật tái dùng, không chọn bừa.
   *
   * Điều kiện dời là `z - camZ > SEG_LEN`, dời thì lùi SEG_COUNT * SEG_LEN. Nên dải
   * đường luôn phủ đúng `SEG_COUNT * SEG_LEN - SEG_LEN` mét TRƯỚC camera.
   * Cần phủ ít nhất `ACTIVE_AHEAD` (80 m, cửa sổ sinh chướng ngại ở phase 03) cộng
   * khoảng lùi của camera:
   *     (SEG_COUNT - 1) * 24  >=  80 + 11   ->  SEG_COUNT >= 4.8  ->  lấy 6 cho dư.
   *
   * Bản đầu đặt 12 vì đoán, đo ra thấy đường trải tận 264 m trước camera trong khi
   * tầm nhìn chỉ 70 m — hơn một nửa số đoạn nằm ngoài sương mù, chỉ tồn tại để bị
   * loại khỏi khung nhìn mỗi khung hình. */
  const SEG_COUNT = 6;

  const ROAD_W = CFG.LANES * CFG.LANE_W;

  let segments = [];                   // { z } — chỉ còn số; hình nằm trong 2 InstancedMesh
  let road, edges;
  let m4, mau;                         // dùng lại mỗi lần dời đoạn — 0 cấp phát mỗi khung
  let doi = false;                     // có đoạn vừa dời → đẩy ma trận lên GPU một lần
  /* Độ sáng tuyến tính của lề DƯỚI ngưỡng bloom 0,82 (view-post.js): lề chạy suốt chiều dài đường, cho nở là quầng phủ
   * kín mặt cầu và nhuộm màu lên chướng ngại (r2b). Rực nhờ màu bão hoà, không nhờ quầng. */
  const EDGE_L = 0.7;

  /* ============ VÌ SAO INSTANCEDMESH (P01 plan art AAA) ============
   * Bản trước: 6 đoạn × 9 Mesh = 54 Mesh → ~36–54 lệnh vẽ cho MỘT mặt phẳng, nguồn lệnh vẽ số một của cả cảnh
   * (GD phát hiện 1). GDD §13 ghi "gộp InstancedMesh cho khối đường" từ đầu mà mã chưa làm. Mặt cầu + lề thành 2
   * InstancedMesh = 2 lệnh vẽ, bất kể bao nhiêu đoạn (P02: vạch làn, vạch ngang nướng vào texture mặt cầu,
   * view-road-texture.js). Đoạn vẫn dời bằng phép chia
   * dư y như cũ; chỉ khác là dời = ghi lại ma trận instance thay vì đổi `group.position`.
   * `frustumCulled = false`: hình cầu bao của InstancedMesh tính một lần từ vị trí instance lúc đầu, dời đoạn
   * xong nó không tự tính lại → cả con đường bị loại khỏi khung nhìn. Đằng nào cả 6 đoạn cũng quanh camera. */
  function build(scene) {
    m4 = new THREE.Matrix4();
    mau = new THREE.Color();
    const roadGeo = new THREE.BoxGeometry(ROAD_W, 0.4, SEG_LEN);
    const edgeGeo = new THREE.BoxGeometry(0.18, 0.5, SEG_LEN);
    const roadMat = ND.View.Mat.roadDeck(ND.View.RoadTexture.build(ND.View.Scene.renderer));
    /* Lề dùng MeshBasicMaterial: PHÁT sáng chứ không NHẬN sáng — vật liệu nhận sáng làm lề tối dần theo khoảng cách
     * tới đèn và trông như bẩn chứ không như neon. Màu nằm ở instanceColor (trắng × màu instance). */
    const edgeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    road = new THREE.InstancedMesh(roadGeo, roadMat, SEG_COUNT);
    edges = new THREE.InstancedMesh(edgeGeo, edgeMat, SEG_COUNT * 2);
    for (const im of [road, edges]) {
      im.frustumCulled = false;
      im.userData.nhom = 'duong';
      scene.add(im);
    }
    for (let i = 0; i < SEG_COUNT; i++) {
      segments.push({ z: -i * SEG_LEN });
      place(i);
    }
    setEdgeColor(CFG.COLOR.EDGE_STEPS[0]);
    flush();
  }

  /* Ghi ma trận cho mọi phần của đoạn i theo `segments[i].z` */
  function place(i) {
    const z = segments[i].z;
    road.setMatrixAt(i, m4.makeTranslation(0, -0.2, z));           // mặt trên của hộp nằm đúng y = 0
    edges.setMatrixAt(i * 2, m4.makeTranslation(-ROAD_W / 2 - 0.09, 0.05, z));
    edges.setMatrixAt(i * 2 + 1, m4.makeTranslation(ROAD_W / 2 + 0.09, 0.05, z));
    doi = true;
  }

  function flush() {
    if (!doi) return;
    doi = false;
    road.instanceMatrix.needsUpdate = edges.instanceMatrix.needsUpdate = true;
  }

  /* Gọi mỗi khung hình. Ép mọi đoạn đường về đúng dải quanh camera.
   *
   * ============ VÌ SAO DÙNG PHÉP CHIA DƯ, KHÔNG DÙNG "LÙI MỘT BƯỚC" ============
   *
   * BẪY ĐÃ GẶP THẬT — người chơi báo "art vẫn gen thiếu đường ở một số đoạn", ảnh chụp
   * cho thấy chướng ngại và nhân vật trôi trong hư không, KHÔNG có mặt đường nào.
   *
   * Bản đầu chỉ dời đoạn nào TỤT LẠI PHÍA SAU:
   *
   *     if (s.z - camZ > SEG_LEN) s.z -= SEG_COUNT * SEG_LEN;
   *
   * Đúng trong một ván chạy liên tục, nhưng SAI ngay khi camera NHẢY LÙI — mà camera
   * nhảy lùi mỗi lần vào ván mới: `vanMoi()` dựng trạng thái ở z = 0, trong khi các đoạn
   * đường vẫn nằm nguyên chỗ ván trước bỏ lại. Lúc đó `s.z - camZ` là số ÂM nên điều kiện
   * không bao giờ đúng, và đường kẹt ở phía trước cho tới khi người chơi chạy đủ xa để
   * đuổi kịp — có thể là hàng trăm mét không có đường.
   *
   * Tệ hơn: VÁN NỀN chạy sau menu cũng đẩy đường đi. Ngồi ở màn chờ càng lâu thì lúc bấm
   * CHẠY càng mất nhiều đường. Đó là lý do lỗi này trông "lúc có lúc không".
   *
   * Phép chia dư đưa đoạn về đúng dải trong MỘT bước, không cần biết nó lệch bao xa và
   * lệch về phía nào. Đây là loại sửa đóng hẳn một lớp lỗi thay vì vá một trường hợp:
   * camera nhảy kiểu gì — vào ván mới, tua nhanh, đổi chế độ — đường vẫn đúng ngay khung
   * hình kế tiếp.
   *
   * Dải đích: `(camZ - chuKy + SEG_LEN, camZ + SEG_LEN]`. Ngưỡng +SEG_LEN chứ không phải
   * 0 để việc dời xảy ra hoàn toàn ngoài tầm mắt — dời ngay khi mép chạm camera thì người
   * chơi thấy đoạn đường biến mất ngay bên rìa màn hình.
   *
   * Sáu đoạn cách nhau đúng SEG_LEN và dải rộng đúng `chuKy = 6 × SEG_LEN`, nên chúng lát
   * kín dải không hở, không chồng — bất kể đã bị dời bao nhiêu lần.
   */
  function update(camZ) {
    const chuKy = SEG_COUNT * SEG_LEN;
    for (let i = 0; i < segments.length; i++) {
      const s = segments[i];
      const k = Math.ceil((s.z - camZ - SEG_LEN) / chuKy);
      if (k !== 0) {
        s.z -= k * chuKy;
        place(i);
      }
    }
    flush();
  }

  /* Đổi màu lề — `view-fx-bind.js` gọi khi lên bậc tốc độ. */
  function setEdgeColor(hex) {
    ND.View.Mat.hdr(hex, EDGE_L, mau);
    for (let i = 0; i < SEG_COUNT * 2; i++) edges.setColorAt(i, mau);
    edges.instanceColor.needsUpdate = true;
  }

  /* Đặt lại về đầu ván: xếp đoạn đường quanh `camZ` và trả màu lề về bậc 0.
   *
   * `update` đã tự xử lý được mọi cú nhảy nên hàm này không bắt buộc cho tính đúng đắn.
   * Nhưng gọi nó lúc vào ván mới thì đường đã đúng chỗ NGAY KHUNG HÌNH ĐẦU, khỏi phụ
   * thuộc vào việc `update` có kịp chạy trước lần vẽ đầu tiên hay không. Màu lề cũng phải
   * trả về bậc 0 — không thì ván mới mở đầu bằng màu của bậc tốc độ ván trước. */
  function reset(camZ) {
    for (let i = 0; i < segments.length; i++) {
      const s = segments[i];
      s.z = camZ + SEG_LEN - i * SEG_LEN;
      place(i);
    }
    flush();
    setEdgeColor(CFG.COLOR.EDGE_STEPS[0]);
  }

  /* Chỉ dùng để chẩn đoán và cho bộ kiểm — trả z của từng đoạn. */
  const zList = () => segments.map(s => s.z);

  return { build, update, reset, setEdgeColor, zList, SEG_LEN, SEG_COUNT };
})();

;
/* ===== js/view-geo.js ===== */
/* view-geo.js — gộp nhiều hình thành MỘT BufferGeometry (một lệnh vẽ)
 *
 * Không vendor BufferGeometryUtils của Three chỉ để gộp hộp: addon nhập `'three'` trần → cần import map, kéo theo cả
 * quyết định nạp addon (để dành cho P02). Hộp đủ đơn giản để tự nối mảng.
 */
ND.View = ND.View || {};

ND.View.Geo = (function () {
  /* specs: [[rộng, cao, sâu, tâmX, tâmY, tâmZ], …] */
  function mergeBoxes(specs) {
    const pos = [], nor = [], uv = [], idx = [];
    for (const [w, h, d, x, y, z] of specs) {
      const g = new THREE.BoxGeometry(w, h, d);
      g.translate(x, y, z);
      const base = pos.length / 3;
      pos.push(...g.attributes.position.array);
      nor.push(...g.attributes.normal.array);
      uv.push(...g.attributes.uv.array);
      for (const i of g.index.array) idx.push(base + i);
      g.dispose();
    }
    const out = new THREE.BufferGeometry();
    out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    out.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
    out.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    out.setIndex(idx);
    return out;
  }

  /* Khung 12 thanh quanh hộp w×h×d, thanh dày t, nằm NGOÀI mặt hộp nửa bề dày — cùng mặt phẳng với khối đặc thì GPU
   * chọn ngẫu nhiên mặt nào ở trên, ra vệt lốm đốm khi camera đổi góc. Thay cho `wireframe: true`: khung dây của
   * BoxGeometry vẽ cả đường chéo tam giác, đọc ra là "bản debug" (r0, mọi người chấm đều nêu). */
  function boxFrame(w, h, d, t) {
    const X = w / 2, Y = h / 2, Z = d / 2, W = w + t * 2, H = h + t * 2, D = d + t * 2;
    const s = [];
    for (const a of [-1, 1]) {
      for (const b of [-1, 1]) {
        s.push([W, t, t, 0, a * (Y + t / 2), b * (Z + t / 2)]);   // dọc x
        s.push([t, H, t, a * (X + t / 2), 0, b * (Z + t / 2)]);   // dọc y
        s.push([t, t, D, a * (X + t / 2), b * (Y + t / 2), 0]);   // dọc z
      }
    }
    return mergeBoxes(s);
  }

  /* Gộp hình BẤT KỲ (P03 họ chướng ngại: lăng trụ vát + hộp + thanh xiên). Chỉ giữ position + normal: vật liệu chướng
   * ngại không dùng texture. Hình có index thì bung ra trước — trộn hình có và không có index không nối mảng được.
   * `them`: tên thuộc tính 1 thành phần mà MỌI hình đều có (vd. `aNdG` vai từng mảnh của tháp, view-world-towers.js). */
  function merge(geos, them) {
    let n = 0;
    const flat = geos.map(g => { const f = g.index ? g.toNonIndexed() : g; n += f.attributes.position.count; return f; });
    const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3);
    const ex = (them || []).map(t => [t, new Float32Array(n)]);
    let o = 0;
    for (const f of flat) {
      for (const [t, a] of ex) a.set(f.attributes[t].array, o / 3);
      pos.set(f.attributes.position.array, o);
      nor.set(f.attributes.normal.array, o);
      o += f.attributes.position.array.length;
    }
    for (const g of geos) g.dispose();
    for (const f of flat) f.dispose();
    const out = new THREE.BufferGeometry();
    out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    for (const [t, a] of ex) out.setAttribute(t, new THREE.BufferAttribute(a, 1));
    return out;
  }

  const box = (w, h, d, x, y, z) => new THREE.BoxGeometry(w, h, d).translate(x, y, z);

  /* Lăng trụ: đa giác pts [[x,y],…] trong mặt x-y, đùn dày d theo z, tâm z = z0 */
  function prismZ(pts, d, z0) {
    const g = new THREE.ExtrudeGeometry(new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y))),
      { depth: d, bevelEnabled: false });
    return g.translate(0, 0, (z0 || 0) - d / 2);
  }

  /* Lăng trụ: đa giác pts [[z,y],…] (mặt cắt dọc chiều chạy), đùn rộng w theo x, tâm x = 0. Xoay −90° quanh y đưa
   * trục x của hình phẳng về z và trục đùn về x. */
  function prismX(pts, w) {
    return prismZ(pts, w, 0).rotateY(-Math.PI / 2);
  }

  /* Thanh dày t × sâu dz nối hai điểm trong mặt x-y, mặt trước ở z — chevron, mép vát */
  function seg(x1, y1, x2, y2, t, dz, z) {
    const dx = x2 - x1, dy = y2 - y1;
    return new THREE.BoxGeometry(Math.hypot(dx, dy) + t, t, dz)
      .rotateZ(Math.atan2(dy, dx)).translate((x1 + x2) / 2, (y1 + y2) / 2, z);
  }

  return { mergeBoxes, boxFrame, merge, box, prismZ, prismX, seg };
})();

;
/* ===== js/view-obstacle-shapes.js ===== */
/* view-obstacle-shapes.js — hình riêng cho bốn vai chướng ngại (P03 plan art AAA, báo cáo AD mục 5)
 *
 * Mỗi loại trả về HAI hình: `body` (thân kim loại tối) và `trim` (viền phát sáng màu hành động) — hai InstancedMesh, hai
 * lệnh vẽ mỗi loại, như P01. Hình đặt tâm ở gốc, đúng kích thước hộp dữ liệu (`data-obstacles.js`), không co giãn.
 *
 * LUẬT DỰNG (GD P03, AD mục 5) — phá là "chết oan":
 * - Hình phủ kín hộp va chạm, chỉ viền được nhô ra ngoài hộp ≤ 0,03 m.
 * - Rào KHÔNG hở gầm: gầm hở đọc ra là "chui được".
 * - Dầm, ống KHÔNG cột đỡ trong làn, KHÔNG cáp treo lên trên — người bay ở 6 m sẽ "xuyên cáp".
 * - Chữ ký đọc từ 60 m: tường = chữ nhật cao + hai mép dọc sáng + chevron chỉ RA hai bên; rào = thấp, vệt sáng trên
 *   đỉnh, chevron ▲; dầm = dải sáng MÉP DƯỚI + chevron ▼; ống = mặt trước như dầm + sườn sáng mỗi 1,5 m (độ dài là
 *   thứ phân biệt ống với dầm, vì cùng màu lam-cúi).
 */
ND.View = ND.View || {};

ND.View.ObstacleShapes = (function () {
  const G = () => ND.View.Geo;
  const N = 0.02;              // m, viền nhô khỏi mặt — nằm trên mặt, không trùng mặt (trùng là lốm đốm z-fight)

  /* Chevron: mũi tên hai nét, đỉnh ở (cx + dx, cy + dy), hai chân lùi về (cx − dx, cy ± h) hoặc xoay theo hướng */
  function chevron(cx, cy, hx, hy, dir, t, z) {
    const S = G().seg;
    if (dir === 'trai' || dir === 'phai') {
      const s = dir === 'trai' ? -1 : 1;
      return [S(cx - s * hx, cy + hy, cx + s * hx, cy, t, N, z), S(cx + s * hx, cy, cx - s * hx, cy - hy, t, N, z)];
    }
    const s = dir === 'len' ? 1 : -1;
    return [S(cx - hx, cy - s * hy, cx, cy + s * hy, t, N, z), S(cx, cy + s * hy, cx + hx, cy - s * hy, t, N, z)];
  }

  /* TƯỜNG 2,6 × 2,9 × 0,5 — khiên chắn: tấm vát hai vai trên, hai trụ bên có dải sáng dọc, chân đế */
  function wall() {
    const g = G(), b = g.box;
    const body = [
      g.prismZ([[-1.1, -1.45], [1.1, -1.45], [1.1, 1.1], [0.8, 1.4], [-0.8, 1.4], [-1.1, 1.1]], 0.36, 0),
      b(0.2, 2.9, 0.5, -1.2, 0, 0), b(0.2, 2.9, 0.5, 1.2, 0, 0),
      b(2.2, 0.2, 0.5, 0, -1.35, 0)
    ];
    const zf = 0.18 + N / 2;
    const trim = [
      b(0.07, 2.5, N, -1.2, 0.05, 0.25 + N / 2), b(0.07, 2.5, N, 1.2, 0.05, 0.25 + N / 2),
      g.seg(-1.1, 1.1, -0.8, 1.4, 0.06, N, zf), g.seg(-0.8, 1.4, 0.8, 1.4, 0.06, N, zf), g.seg(0.8, 1.4, 1.1, 1.1, 0.06, N, zf),
      b(2.2, 0.05, N, 0, -1.25, 0.25 + N / 2),
      ...chevron(-0.35, 0.25, 0.16, 0.28, 'trai', 0.09, zf), ...chevron(-0.72, 0.25, 0.16, 0.28, 'trai', 0.09, zf),
      ...chevron(0.35, 0.25, 0.16, 0.28, 'phai', 0.09, zf), ...chevron(0.72, 0.25, 0.16, 0.28, 'phai', 0.09, zf)
    ];
    return { body: g.merge(body), trim: g.merge(trim) };
  }

  /* RÀO 2,6 × 0,85 × 0,4 — gờ nêm: mặt trước xiên, thanh sáng trên đỉnh, hai trụ đầu có đèn (đèn nháy theo trim) */
  function hurdle() {
    const g = G(), b = g.box;
    const body = [
      g.prismX([[-0.2, -0.425], [0.2, -0.425], [0.2, -0.2], [0.0, 0.3], [-0.2, 0.3]], 2.3),
      b(0.15, 0.85, 0.4, -1.225, 0, 0), b(0.15, 0.85, 0.4, 1.225, 0, 0)
    ];
    /* Chevron ▲ nằm trên mặt xiên: dựng đứng ở z = 0 rồi nghiêng theo mặt (21,8° so với phương đứng) */
    const tren = [];
    for (const cx of [-0.75, 0, 0.75]) tren.push(...chevron(cx, 0, 0.22, 0.1, 'len', 0.08, 0));
    const nghieng = Math.atan2(0.2, 0.5);
    const mat = g.merge(tren).rotateX(-nghieng).translate(0, 0.05 + 0.004, 0.1 + 0.011);
    const trim = [
      b(2.3, 0.07, 0.24, 0, 0.335, -0.06),
      b(0.17, 0.1, 0.4 + N, -1.225, 0.37, 0), b(0.17, 0.1, 0.4 + N, 1.225, 0.37, 0),
      b(2.3, 0.04, N, 0, -0.22, 0.2 + N / 2),
      mat
    ];
    return { body: g.merge(body), trim: g.merge(trim) };
  }

  /* DẦM 2,6 × 2,0 × 0,5 (đáy 1,15 m) — thanh từ trường: tấm vát hai góc dưới, hai đầu chụp có bầu phát, dải sáng
   * MÉP DƯỚI dày nhất — đó là câu "cúi dưới vạch này" */
  function beamFront(zf) {
    const g = G();
    const tr = [
      g.seg(-1.1, -0.78, -0.88, -1.0, 0.08, N, zf), g.seg(-0.88, -0.99, 0.88, -0.99, 0.11, N, zf),
      g.seg(0.88, -1.0, 1.1, -0.78, 0.08, N, zf),
      g.box(2.2, 0.05, N, 0, 0.96, zf)
    ];
    for (const cx of [-0.6, 0, 0.6]) tr.push(...chevron(cx, 0.15, 0.22, 0.12, 'xuong', 0.09, zf));
    return tr;
  }

  function beam() {
    const g = G(), b = g.box;
    const body = [
      g.prismZ([[-1.1, -0.78], [-0.88, -1.0], [0.88, -1.0], [1.1, -0.78], [1.1, 1.0], [-1.1, 1.0]], 0.34, 0),
      b(0.2, 2.0, 0.5, -1.2, 0, 0), b(0.2, 2.0, 0.5, 1.2, 0, 0)
    ];
    const trim = beamFront(0.17 + N / 2);
    for (const x of [-1.2, 1.2]) {
      for (const y of [-0.55, 0.55]) {
        trim.push(new THREE.CylinderGeometry(0.08, 0.08, N, 10).rotateX(Math.PI / 2).translate(x, y, 0.25 + N / 2));
      }
    }
    return { body: g.merge(body), trim: g.merge(trim) };
  }

  /* ỐNG 2,6 × 2,0 × 15 (đáy 1,15 m) — trần ống dẫn: mặt trước như dầm (cùng câu "cúi"), mái + hai váy hở đáy,
   * sườn sáng mỗi 1,5 m bọc ngoài, dải sáng chạy suốt hai mép váy = "giữ cúi" */
  function tube() {
    const g = G(), b = g.box;
    const ZF = 7.5;
    const body = [
      b(2.6, 0.32, 15, 0, 0.84, 0),
      b(0.14, 1.68, 15, -1.23, -0.16, 0), b(0.14, 1.68, 15, 1.23, -0.16, 0),
      b(2.32, 1.9, 0.12, 0, -0.05, ZF - 0.06)
    ];
    const trim = beamFront(ZF + N / 2);
    for (let k = 0; k < 10; k++) {
      const z = -6.75 + 1.5 * k;
      trim.push(b(2.6 + N * 2, N, 0.1, 0, 1.0 + N / 2, z));
      trim.push(b(N, 2.0, 0.1, -1.3 - N / 2, 0, z), b(N, 2.0, 0.1, 1.3 + N / 2, 0, z));
    }
    trim.push(b(0.08, 0.06, 15, -1.23, -0.97, 0), b(0.08, 0.06, 15, 1.23, -0.97, 0));
    return { body: g.merge(body), trim: g.merge(trim) };
  }

  const BUILD = { wall, hurdle, beam, tube };

  /* Loại lạ (thêm vào data mà quên dựng hình) → hộp khung như P01, để vẫn thấy được thay vì tàng hình */
  function build(type, T) {
    if (BUILD[type]) return BUILD[type]();
    return { body: new THREE.BoxGeometry(T.w, T.h, T.d), trim: G().boxFrame(T.w, T.h, T.d, 0.07) };
  }

  return { build };
})();

;
/* ===== js/view-obstacle-decal.js ===== */
/* view-obstacle-decal.js — dấu báo trước vẽ trên mặt đường cho từng chướng ngại (P03 plan art AAA, AD mục 5)
 *
 * Tường: ◀ ▶ hồng 4–8 m trước vật ("né ra hai bên"). Rào: ▲ vàng 4–8 m trước ("nhảy"). Dầm: vũng sáng lam NGAY DƯỚI
 * dầm. Ống: vũng sáng lam dài suốt 15 m — vệt kéo dài chính là chữ "giữ".
 * Dấu đi CÙNG chướng ngại (cùng danh sách vật đang hoạt động) → không thấy được trước 70 m. Thêm tín hiệu trước 70 m là
 * nới cửa sổ phản ứng = đổi cân bằng (GD P03).
 * Một InstancedMesh cho cả 4 loại: atlas canvas 4 ô, mỗi instance chọn ô bằng thuộc tính `aO`. Cộng màu (additive), độ
 * sáng dưới ngưỡng bloom — dấu là chữ trên đường, không phải đèn.
 */
ND.View = ND.View || {};

ND.View.ObstacleDecal = (function () {
  const O = 128;
  /* [ô atlas, độ lệch z so với tâm vật (+ = phía người chơi), dài (m), độ sáng] */
  const KIEU = {
    wall:   [0, 6, 3, 0.55],
    hurdle: [1, 6, 3, 0.55],
    beam:   [2, 0, 2.6, 0.4],
    tube:   [3, 0, 15.5, 0.32]
  };
  const SO = 40;
  let im, aO, m4, mau;

  function veAtlas() {
    const c = document.createElement('canvas');
    c.width = O * 4; c.height = O;
    const g = c.getContext('2d');
    g.strokeStyle = '#fff'; g.lineWidth = 11; g.lineJoin = 'miter';
    const net = pts => { g.beginPath(); g.moveTo(pts[0], pts[1]); g.lineTo(pts[2], pts[3]); g.lineTo(pts[4], pts[5]); g.stroke(); };
    /* ô 0: ◀ ▶ (hàng trên canvas = phía trước) */
    for (const s of [-1, 1]) for (const k of [0, 1]) {
      const x = 64 + s * (22 + k * 22);
      net([x - s * 14, 34, x + s * 14, 64, x - s * 14, 94]);
    }
    /* ô 1: ▲ ▲ */
    for (const k of [0, 1]) net([O + 30, 84 - k * 30, O + 64, 50 - k * 30, O + 98, 84 - k * 30]);
    /* ô 2, 3: vũng sáng đậm ở giữa ngang, mờ ra hai mép. Ô 2 (vũng ngắn dưới dầm) mềm thêm hai đầu theo chiều dài.
     * Không dùng `destination-in`: phép ghép đó xoá luôn mọi ô ngoài vùng vẽ. */
    const ngang = x0 => {
      const n = g.createLinearGradient(x0, 0, x0 + O, 0);
      n.addColorStop(0, 'rgba(255,255,255,0)'); n.addColorStop(0.5, 'rgba(255,255,255,0.9)'); n.addColorStop(1, 'rgba(255,255,255,0)');
      return n;
    };
    for (let y = 0; y < O; y += 4) {
      const v = (y + 2) / O;
      g.globalAlpha = Math.min(1, Math.min(v, 1 - v) / 0.3);
      g.fillStyle = ngang(2 * O);
      g.fillRect(2 * O, y, O, 4);
    }
    g.globalAlpha = 1;
    g.fillStyle = ngang(3 * O);
    g.fillRect(3 * O, 0, O, O);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }

  function build(scene) {
    m4 = new THREE.Matrix4(); mau = new THREE.Color();
    const geo = new THREE.PlaneGeometry(2.4, 1).rotateX(-Math.PI / 2);
    aO = new THREE.InstancedBufferAttribute(new Float32Array(SO), 1);
    geo.setAttribute('aO', aO);
    const mat = new THREE.MeshBasicMaterial({
      map: veAtlas(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    });
    mat.onBeforeCompile = sh => {
      ND.View.FadePassed.inject(sh);
      sh.vertexShader = 'attribute float aO;\n' + sh.vertexShader.replace('#include <uv_vertex>',
        '#include <uv_vertex>\nvMapUv.x = (vMapUv.x + aO) * 0.25;');
    };
    mat.customProgramCacheKey = () => 'nd-obstacle-decal';
    im = new THREE.InstancedMesh(geo, mat, SO);
    for (let i = 0; i < SO; i++) im.setColorAt(i, mau.setRGB(1, 1, 1));   // instanceColor phải có trước lần biên dịch
    im.frustumCulled = false;
    im.userData.nhom = 'chuong-ngai';
    im.count = 0;
    im.visible = false;
    scene.add(im);
  }

  function update(list) {
    let n = 0;
    for (let i = 0; i < list.length && n < SO; i++) {
      const ob = list[i], K = KIEU[ob.type];
      if (!K) continue;
      m4.makeScale(1, 1, K[2]).setPosition(ND.Rules.Lane.centerOf(ND.Data.Obstacles.laneOf(ob)), 0.015, ob.z + K[1]);
      im.setMatrixAt(n, m4);
      im.setColorAt(n, mau.setHex(ND.View.Obstacle.MAU[ob.type]).multiplyScalar(K[3]));
      aO.array[n] = K[0];
      n++;
    }
    im.count = n;
    im.visible = n > 0;
    im.instanceMatrix.needsUpdate = true;
    im.instanceColor.needsUpdate = true;
    aO.needsUpdate = true;
  }

  return { build, update };
})();

;
/* ===== js/view-obstacle.js ===== */
/* view-obstacle.js — pool chướng ngại, mỗi loại một hình và một MÀU cố định
 *
 * ================== MÀU MÃ HOÁ HÀNH ĐỘNG PHẢI LÀM ==================
 *
 *   HỒNG   -> né sang bên   (tường)
 *   VÀNG   -> nhảy          (rào thấp)
 *   LAM    -> cúi           (dầm treo, ống dài)
 *
 * Đây không phải chọn màu cho đẹp. Ở 60 m, trong sương mù, hình dáng đã nhoè nhưng màu
 * thì còn đọc được — nên màu là thứ người chơi thật sự phản ứng theo. Gắn màu với HÀNH
 * ĐỘNG (chứ không với loại vật) nghĩa là người chơi học một lần rồi dùng mãi: thấy vàng
 * là ngón tay đã đi lên trước khi kịp nhận ra đó là cái rào.
 *
 * Ống dài dùng cùng màu lam với dầm treo vì cùng đòi cúi; phân biệt hai cái bằng ĐỘ DÀI,
 * thứ đọc được ngay cả khi màu trùng.
 *
 * P01 plan art AAA: mỗi loại 2 InstancedMesh (khối đặc + khung) = 8 lệnh vẽ cho mọi chướng ngại, thay vì
 * 4 loại × 10 pool × 2 Mesh = tới 80 lệnh vẽ và 80 vật liệu (GD phát hiện 2). Hình học dựng theo ĐÚNG kích thước
 * từng loại (không co giãn một khối đơn vị): co giãn thì thanh khung của ống dài 15 m dày theo trục z gấp 15 lần.
 */
ND.View = ND.View || {};

ND.View.Obstacle = (function () {
  const P = ND.View.Palette;
  const MAU = { wall: P.HONG, hurdle: P.VANG, beam: P.LAM, tube: P.LAM };   // né · nhảy · cúi · cúi và giữ
  const MOI_LOAI = 10;          // đủ cho cửa sổ 90 m; chunk dày nhất có 3 vật cùng ô
  /* Nhịp báo trước (AD mục 5): viền nháy 2 Hz khi mặt trước của vật cách người chơi 45 → 20 m — đúng quãng mắt phải
   * quyết định. Chỉ đổi ĐỘ SÁNG qua instanceColor, không đổi lúc vật hiện (cửa sổ phản ứng giữ nguyên 70 m).
   * `prefers-reduced-motion` → không nháy. */
  const NHAY_XA = 45, NHAY_GAN = 20, NHAY_HZ = 2, NHAY_THEM = 0.8;
  const loai = {};              // type -> { than, vien } (InstancedMesh)
  let m4, sang, nhayTat = false;

  function build(scene) {
    m4 = new THREE.Matrix4();
    sang = new THREE.Color();
    nhayTat = !!(globalThis.matchMedia && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches);
    for (const type of Object.keys(ND.Data.Obstacles.TYPES)) {
      const T = ND.Data.Obstacles.TYPES[type];
      const m = MAU[type] || MAU.wall;
      /* Hai lớp: thân kim loại tối có viền fresnel màu vai + viền phát sáng màu hành động (view-materials.js). Chỉ viền
       * thì nhìn xuyên qua được; chỉ thân thì chìm vào nền tối. P03: hình riêng từng vai (view-obstacle-shapes.js). */
      const hinh = ND.View.ObstacleShapes.build(type, T);
      const than = new THREE.InstancedMesh(hinh.body, ND.View.Mat.obstacleBody(m), MOI_LOAI);
      const vien = new THREE.InstancedMesh(hinh.trim, ND.View.Mat.trim(m, 1.2, true), MOI_LOAI);
      for (let i = 0; i < MOI_LOAI; i++) vien.setColorAt(i, sang.setRGB(1, 1, 1));   // trước lần biên dịch đầu
      for (const im of [than, vien]) {
        /* Hình cầu bao của InstancedMesh không tự tính lại khi instance dời → bị loại khỏi khung nhìn sai */
        im.frustumCulled = false;
        im.userData.nhom = 'chuong-ngai';
        im.count = 0;
        im.visible = false;
        scene.add(im);
      }
      loai[type] = { than, vien };
    }
    ND.View.ObstacleDecal.build(scene);
  }

  /* Gán danh sách vật đang hoạt động vào instance. Vượt pool thì bỏ qua — vật ở xa nhất không hiện, mà xa nhất thì
   * đằng nào cũng chìm trong sương mù. `runnerZ` cho lớp làm tan phần đã qua (view-fade-passed.js). */
  function update(list, runnerZ, t) {
    const nhip = nhayTat ? 0 : NHAY_THEM * (0.5 + 0.5 * Math.sin(t * NHAY_HZ * 2 * Math.PI));
    ND.View.FadePassed.uniform.value = runnerZ;
    for (const type in loai) loai[type].than.count = 0;
    for (let i = 0; i < list.length; i++) {
      const ob = list[i];
      const L = loai[ob.type];
      if (!L || L.than.count >= MOI_LOAI) continue;
      const T = ND.Data.Obstacles.TYPES[ob.type];
      m4.makeTranslation(ND.Rules.Lane.centerOf(ND.Data.Obstacles.laneOf(ob)), T.yBase + T.h / 2, ob.z);
      L.than.setMatrixAt(L.than.count, m4);
      L.vien.setMatrixAt(L.than.count, m4);
      const cach = runnerZ - (ob.z + T.d / 2);            // tới MẶT TRƯỚC — ống dài 15 m tính từ cửa vào
      const k = cach <= NHAY_XA && cach >= NHAY_GAN ? 1 + nhip : 1;
      L.vien.setColorAt(L.than.count, sang.setRGB(k, k, k));
      L.than.count++;
    }
    for (const type in loai) {
      const L = loai[type];
      L.vien.count = L.than.count;
      L.than.visible = L.vien.visible = L.than.count > 0;
      L.than.instanceMatrix.needsUpdate = L.vien.instanceMatrix.needsUpdate = true;
      L.vien.instanceColor.needsUpdate = true;
    }
    ND.View.ObstacleDecal.update(list);
  }

  return { build, update, MAU };
})();

;
/* ===== js/view-world-kit.js ===== */
/* view-world-kit.js — đồ nghề chung của lớp thế giới (P04 plan art AAA, AD mục 7): sương riêng + hàm băm vị trí
 *
 * SƯƠNG HAI TẦNG. Sương gameplay 45 → 70 m giữ nguyên cho đường + chướng ngại (cửa sổ phản ứng, GDD §3). Tháp, biển,
 * cổng dùng sương RIÊNG 60 → 260 m: dùng chung sương gameplay thì mọi thứ quá 70 m chìm hẳn — thế giới thành hư không
 * (World 0 điểm ở r0). Vật thế giới đặt `fog: false` rồi tự trộn về màu chân trời theo độ sâu, TRƯỚC tone map (màu
 * tuyến tính) để Q0 vẽ thẳng và Q1/Q2 qua composer ra cùng màu.
 * BĂM VỊ TRÍ. Tháp/biển/cổng chọn biến thể theo số hiệu ô trên trục z → đi lùi rồi tới lại vẫn gặp đúng tòa nhà cũ, và
 * KHÔNG rút số từ `state.rng` (lớp hiển thị rút số là đổi chuỗi chướng ngại của ván).
 */
ND.View = ND.View || {};

ND.View.WorldKit = (function () {
  const GAN = 60, XA = 260;
  const mauSuong = { value: null };

  /* `cong` = vật liệu cộng sáng (biển hiệu): trộn về màu sương là CỘNG thêm màu sương → ở xa thành tấm chữ nhật sáng
   * hơn nền. Vật cộng sáng phải tắt dần về đen thay vì về màu sương. */
  function injectFog(sh, cong) {
    if (!mauSuong.value) mauSuong.value = new THREE.Color(ND.CFG.COLOR.FOG);
    sh.uniforms.uNdWFog = mauSuong;
    sh.vertexShader = 'varying float vNdWD;\n' + sh.vertexShader.replace('#include <project_vertex>',
      '#include <project_vertex>\nvNdWD = -mvPosition.z;');
    const f = 'smoothstep(' + GAN.toFixed(1) + ', ' + XA.toFixed(1) + ', vNdWD)';
    sh.fragmentShader = 'uniform vec3 uNdWFog;\nvarying float vNdWD;\n' + sh.fragmentShader.replace(
      '#include <tonemapping_fragment>',
      (cong ? 'gl_FragColor.rgb *= 1.0 - ' + f + ';' : 'gl_FragColor.rgb = mix(gl_FragColor.rgb, uNdWFog, ' + f + ');') +
      '\n#include <tonemapping_fragment>');
  }

  /* Vật liệu chỉ cần sương thế giới. Tháp, biển, kết cấu tự gọi injectFog trong onBeforeCompile riêng. */
  function patch(mat, key) {
    mat.fog = false;
    mat.onBeforeCompile = sh => injectFog(sh, false);
    mat.customProgramCacheKey = () => 'nd-wfog-' + key;
    return mat;
  }

  /* Băm số nguyên → [0, 1). `muoi` tách các thuộc tính của cùng một ô (cao, rộng, biến thể…) */
  function hash(k, hang, muoi) {
    let h = Math.imul(k | 0, 374761393) ^ Math.imul(hang | 0, 668265263) ^ Math.imul(muoi | 0, 2246822519);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }

  function hideAll(ims) { for (const im of ims) { im.count = 0; } }

  function finish(ims) {
    for (const im of ims) {
      im.visible = im.count > 0;
      im.instanceMatrix.needsUpdate = true;
      if (im.instanceColor) im.instanceColor.needsUpdate = true;
    }
  }

  /* InstancedMesh của thế giới: khung nhìn tự loại sai khi instance dời (bẫy P01) → tắt; nhóm cho census */
  function im(geo, mat, n, nhom) {
    const m = new THREE.InstancedMesh(geo, mat, n);
    m.frustumCulled = false;
    m.userData.nhom = nhom || 'the-gioi';
    m.count = 0;
    m.visible = false;
    return m;
  }

  return { GAN, XA, injectFog, patch, hash, hideAll, finish, im };
})();

;
/* ===== js/view-world-ground.js ===== */
/* view-world-ground.js — mặt phố dưới cầu cạn, y = −40: lưới đại lộ tím mờ + đèn xe chạy (P04 plan art AAA, AD mục 7
 * "quầng thành phố dưới cầu")
 *
 * Khoảng đen hai bên mặt cầu (r0–r2: "đường trôi trong hư không") là chỗ camera nhìn XUỐNG qua mép cầu. Vẽ lên vòm trời
 * thì không có thị sai — phố đứng yên trong khi đường trôi, đọc ra là phông dán. Nên dùng một tấm phẳng thật bám camera,
 * họa tiết tính theo TỌA ĐỘ THẾ GIỚI → trôi đúng tốc độ, sâu đúng 40 m.
 * Một tấm 640 × 640 (2 tam giác, 1 lệnh vẽ). Độ sáng đại lộ thấp, dưới ngưỡng bloom: phố là nền, không phải đèn.
 * Đèn xe màu hổ phách nhạt (bão hoà 31 %) — dưới ngưỡng luật bảng màu, không đọc nhầm thành vàng-nhảy.
 */
ND.View = ND.View || {};

ND.View.WorldGround = (function () {
  const DAY = -40, CO = 640;
  let mesh, uni;

  const VERT = [
    'varying vec3 vWP;',
    'varying float vD;',
    'void main() {',
    '  vec4 wp = modelMatrix * vec4(position, 1.0);',
    '  vWP = wp.xyz;',
    '  vec4 mv = viewMatrix * wp;',
    '  vD = -mv.z;',
    '  gl_Position = projectionMatrix * mv;',
    '}'
  ].join('\n');

  const FRAG = [
    'uniform vec3 uNen, uPho, uXe, uSuong;',
    'uniform float uTime;',
    'varying vec3 vWP;',
    'varying float vD;',
    'void main() {',
    '  vec2 p = vWP.xz;',
    '  vec2 o = vec2(26.0, 34.0);',                                   // đại lộ dọc mỗi 26 m theo x, phố ngang mỗi 34 m theo z
    '  vec2 dl = abs(fract(p / o + 0.5) - 0.5) * o;',                 // mét tới phố gần nhất theo từng trục
    '  vec2 aa = fwidth(p) * 1.5;',
    '  vec2 ph = 1.0 - smoothstep(vec2(1.2) - aa, vec2(3.2) + aa, dl);',
    '  vec3 col = uNen + uPho * max(ph.x, ph.y);',
    // đèn xe trên đại lộ dọc: đoạn sáng 1,6 m mỗi 20 m, chạy 16 m/s, mỗi đại lộ lệch pha
    '  float xe = step(0.92, fract(p.y * 0.05 + uTime * 0.8 + floor(p.x / o.x + 0.5) * 0.37));',
    '  col += uXe * xe * (1.0 - smoothstep(0.4, 1.2 + aa.x, dl.x));',
    '  col = mix(col, uSuong, smoothstep(60.0, 260.0, vD));',
    '  gl_FragColor = vec4(col, 1.0);',
    '  #include <tonemapping_fragment>',
    '  #include <colorspace_fragment>',
    '}'
  ].join('\n');

  function build(scene) {
    const P = ND.View.Palette;
    uni = {
      uNen: { value: new THREE.Color(P.NEN_PHO) },
      uPho: { value: ND.View.Mat.hdr(P.NOC_THAP, 0.18, new THREE.Color()) },
      uXe: { value: ND.View.Mat.hdr(P.CUA_SO_HO_PHACH, 0.6, new THREE.Color()) },
      uSuong: { value: new THREE.Color(ND.CFG.COLOR.FOG) },
      uTime: { value: 0 }
    };
    mesh = new THREE.Mesh(new THREE.PlaneGeometry(CO, CO).rotateX(-Math.PI / 2),
      new THREE.ShaderMaterial({ uniforms: uni, vertexShader: VERT, fragmentShader: FRAG, fog: false }));
    mesh.frustumCulled = false;
    mesh.userData.nhom = 'the-gioi';
    scene.add(mesh);
  }

  /* Tâm tấm đặt 200 m trước camera: phía sau chỉ cần 120 m, phía trước phủ quá mặt phẳng xa 300 m */
  function update(camZ, t) {
    mesh.position.set(0, DAY, camZ - 200);
    uni.uTime.value = t;
  }

  return { build, update };
})();

;
/* ===== js/view-world-towers.js ===== */
/* view-world-towers.js — tháp thành phố hai bên cầu cạn (P04 plan art AAA, AD mục 7 lớp giữa)
 *
 * Ba biến thể (tấm, bậc lùi, đôi) × một vật liệu = 3 lệnh vẽ cho ~85 tòa. Hình đơn vị cao 1, đáy ở y = 0; mỗi instance
 * co giãn theo (rộng, cao, sâu) băm từ số hiệu ô — xem view-world-kit.js vì sao băm thay vì rút số ngẫu nhiên.
 * Cửa sổ vẽ trong shader theo TỌA ĐỘ THẾ GIỚI (ô 1,8 × 3,2 m, ~28 % sáng) chứ không theo UV: tháp co giãn ×100 theo chiều cao thì
 * cửa sổ theo UV dài 100 lần. `fwidth` làm mềm mép ô và ở xa trộn về độ sáng trung bình — không thì cửa sổ lấp lánh
 * răng cưa khi chạy (MSAA không chữa được nhiễu trong shader).
 * Đáy y = −40: mặt cầu là cầu CẠN, thành phố nằm dưới. Mặt trong hàng gần nhất cách tâm đường ≥ 10 m — ngoài hành
 * lang x ∈ [−5, 5] (GD P04), không gì của thành phố được đọc nhầm thành chướng ngại.
 */
ND.View = ND.View || {};

ND.View.WorldTowers = (function () {
  const DAY = -40, TRUOC = 270, SAU = 20, MOI = 90;
  /* [x tâm min, max, rộng min, max, sâu min, max, đỉnh min, max (m trên mặt cầu), ô z, tỉ lệ bỏ trống]
   * Hàng gần có nóc từ −14 m: nhìn XUỐNG mái nhà mới đọc ra "cầu cạn trên phố". r4a cho hàng gần cao 8–32 m → hai vách
   * nhà kín hai bên, thành hẻm phố chứ không còn là cầu cao. */
  const HANG = [
    [15, 22, 6, 10, 8, 14, -14, 16, 18, 0.2],
    [30, 44, 9, 14, 10, 16, 6, 48, 22, 0.12],
    [52, 84, 12, 20, 12, 20, 30, 100, 28, 0.1]
  ];
  const meshes = [];
  let m4, uThoiGian;

  /* Mảnh hình + vai: 0 thân (có cửa sổ), 1 nóc sáng, 2 đèn ăng-ten nháy */
  function manh(w, h, d, x, y, z, vai) {
    const g = ND.View.Geo.box(w, h, d, x, y, z);
    g.setAttribute('aNdG', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count).fill(vai), 1));
    return g;
  }

  const BIEN_THE = [
    () => [manh(1, 0.9, 1, 0, 0.45, 0, 0), manh(0.84, 0.012, 0.84, 0, 0.906, 0, 1), manh(0.05, 0.05, 0.05, 0, 0.96, 0, 0),
      manh(0.06, 0.012, 0.06, 0, 0.99, 0, 2)],
    () => [manh(1, 0.6, 1, 0, 0.3, 0, 0), manh(0.74, 0.26, 0.74, 0, 0.73, 0, 0), manh(0.76, 0.01, 0.76, 0, 0.605, 0, 1),
      manh(0.46, 0.1, 0.46, 0, 0.91, 0, 0), manh(0.48, 0.01, 0.48, 0, 0.865, 0, 1), manh(0.05, 0.012, 0.05, 0, 0.98, 0, 2)],
    () => [manh(0.52, 1.0, 1, -0.24, 0.5, 0, 0), manh(0.46, 0.68, 0.84, 0.27, 0.34, 0, 0), manh(0.54, 0.01, 1.02, -0.24, 0.85, 0, 1),
      manh(0.06, 0.012, 0.06, -0.24, 0.994, 0, 2)]
  ];

  function vatLieu() {
    const P = ND.View.Palette;
    const m = new THREE.MeshLambertMaterial({ color: P.THAN_THAP, fog: false });
    const u = {
      uWinA: { value: new THREE.Color(P.CUA_SO_TIM) }, uWinB: { value: new THREE.Color(P.CUA_SO_HO_PHACH) },
      uCrown: { value: ND.View.Mat.hdr(P.NOC_THAP, 0.35, new THREE.Color()) },
      uBlink: { value: ND.View.Mat.hdr(P.DEN_COT, 1.4, new THREE.Color()) }, uTime: uThoiGian
    };
    m.onBeforeCompile = sh => {
      ND.View.WorldKit.injectFog(sh);
      Object.assign(sh.uniforms, u);
      sh.vertexShader = 'attribute float aNdG;\nvarying float vNdG;\nvarying vec3 vNdWP, vNdWN;\nvarying vec2 vNdSeed;\n' +
        sh.vertexShader.replace('#include <project_vertex>', [
          '#include <project_vertex>',
          'vec4 ndP = vec4(transformed, 1.0);', 'mat3 ndM = mat3(modelMatrix);', 'vNdSeed = vec2(0.0);',
          '#ifdef USE_INSTANCING', 'ndP = instanceMatrix * ndP;', 'ndM = ndM * mat3(instanceMatrix);',
          'vNdSeed = instanceMatrix[3].xz;', '#endif',
          'vNdWP = (modelMatrix * ndP).xyz;', 'vNdWN = normalize(ndM * objectNormal);', 'vNdG = aNdG;'
        ].join('\n'));
      sh.fragmentShader = 'uniform vec3 uWinA, uWinB, uCrown, uBlink;\nuniform float uTime;\nvarying float vNdG;\n' +
        'varying vec3 vNdWP, vNdWN;\nvarying vec2 vNdSeed;\n' +
        sh.fragmentShader.replace('#include <emissivemap_fragment>', [
          '#include <emissivemap_fragment>',
          'if (vNdG > 1.5) {',
          '  totalEmissiveRadiance += uBlink * step(0.55, fract(uTime * 0.6 + fract(vNdSeed.y * 0.013)));',
          '} else if (vNdG > 0.5) {',
          '  totalEmissiveRadiance += uCrown;',
          '} else if (abs(vNdWN.y) < 0.5) {',
          '  vec2 o = (abs(vNdWN.x) > 0.5 ? vNdWP.zy : vNdWP.xy) / vec2(1.8, 3.2);',
          '  vec2 f = fract(o), aa = fwidth(o) + 1e-4;',
          '  vec2 lo = smoothstep(vec2(0.3, 0.32) - aa, vec2(0.3, 0.32) + aa, f);',
          '  vec2 hi = 1.0 - smoothstep(vec2(0.7, 0.74) - aa, vec2(0.7, 0.74) + aa, f);',
          '  float r = fract(sin(dot(floor(o) + vNdSeed * 0.37, vec2(12.9898, 78.233))) * 43758.5453);',
          '  vec3 mc = mix(uWinA, uWinB, step(0.82, fract(r * 7.13))) * (0.35 + 0.45 * fract(r * 3.7)) * step(0.72, r);',
          '  totalEmissiveRadiance += mix(mc * lo.x * lo.y * hi.x * hi.y, uWinA * 0.06, clamp(max(aa.x, aa.y) * 1.5, 0.0, 1.0));',
          '}'
        ].join('\n'));
    };
    m.customProgramCacheKey = () => 'nd-world-tower';
    return m;
  }

  function build(scene) {
    m4 = new THREE.Matrix4();
    uThoiGian = { value: 0 };
    const mat = vatLieu();
    for (const f of BIEN_THE) {
      const im = ND.View.WorldKit.im(ND.View.Geo.merge(f(), ['aNdG']), mat, MOI);
      meshes.push(im);
      scene.add(im);
    }
  }

  /* Thông số tòa ở ô k của hàng `h`, phía `ben` (−1 trái, 1 phải). Trả false nếu ô bỏ trống (khoảng quảng trường).
   * view-world-signs.js dùng lại để treo biển đúng mặt tòa hàng gần. */
  function slot(h, ben, k, out) {
    const H = HANG[h], hs = ND.View.WorldKit.hash, hang = h * 2 + (ben > 0 ? 1 : 0);
    if (hs(k, hang, 1) < H[9]) return false;
    out.w = H[2] + hs(k, hang, 2) * (H[3] - H[2]);
    out.d = H[4] + hs(k, hang, 3) * (H[5] - H[4]);
    out.x = ben * (H[0] + hs(k, hang, 4) * (H[1] - H[0]));
    out.z = (k + 0.5) * H[8] + (hs(k, hang, 5) - 0.5) * (H[8] - out.d) * 0.6;
    out.top = H[6] + hs(k, hang, 6) * (H[7] - H[6]);
    out.bt = Math.floor(hs(k, hang, 7) * BIEN_THE.length);
    return true;
  }

  const o = {};
  function update(camZ, t) {
    uThoiGian.value = t;
    ND.View.WorldKit.hideAll(meshes);
    for (let h = 0; h < HANG.length; h++) {
      const o8 = HANG[h][8];
      const k0 = Math.floor((camZ - TRUOC) / o8), k1 = Math.ceil((camZ + SAU) / o8);
      for (const ben of [-1, 1]) {
        for (let k = k0; k <= k1; k++) {
          if (!slot(h, ben, k, o)) continue;
          const im = meshes[o.bt];
          if (im.count >= MOI) continue;
          im.setMatrixAt(im.count++, m4.makeScale(o.w, o.top - DAY, o.d).setPosition(o.x, DAY, o.z));
        }
      }
    }
    ND.View.WorldKit.finish(meshes);
  }

  return { build, update, slot, HANG };
})();

;
/* ===== js/view-world-signs.js ===== */
/* view-world-signs.js — biển hiệu holo treo trên mặt trong của hàng tháp gần (P04 plan art AAA, AD mục 7 lớp giữa)
 *
 * KHÔNG CHỮ (AD): tia sét, đầu mèo, tinh thể, mặt trời sọc — chữ ở 26 m/s là nhiễu, và chữ tiếng Anh lạc giọng portal.
 * Bốn hình vẽ bằng canvas lúc chạy (0 byte tải, không cần sinh ảnh AI): nét trắng trên nền trong, màu đến từ
 * instanceColor. Cộng sáng, nên sương thế giới tắt dần về ĐEN (WorldKit.injectFog với `cong`).
 * Biển nằm trên mặt tòa ở |x| ≥ 9,9 — chiếu lên màn hình ở NGOÀI dải làn, không bao giờ nằm sau chướng ngại.
 * Màu chỉ lấy từ bảng thành phố (tím / cam đỏ / bạc hà / trắng) — bộ kiểm bảng màu đã soát ba sắc hành động.
 */
ND.View = ND.View || {};

ND.View.WorldSigns = (function () {
  const O = 128, SO = 28, TRUOC = 270, SAU = 20, TI_LE = 0.5;
  let im, aO, m4, q, s3, p3, mau, mauBien, TRUC_DUNG;
  const o = {};

  function veAtlas() {
    const c = document.createElement('canvas');
    c.width = O * 4; c.height = O * 2;
    const g = c.getContext('2d');
    g.strokeStyle = '#fff'; g.lineWidth = 7; g.lineJoin = 'round'; g.lineCap = 'round';
    const vien = x => { g.strokeRect(x + 8, 8, O - 16, O * 2 - 16); };
    const net = pts => { g.beginPath(); g.moveTo(pts[0], pts[1]); for (let i = 2; i < pts.length; i += 2) g.lineTo(pts[i], pts[i + 1]); g.stroke(); };
    /* ô 0: tia sét */
    vien(0); net([76, 40, 44, 132, 70, 132, 52, 216, 90, 112, 64, 112, 80, 40]);
    /* ô 1: đầu mèo — nối với linh vật mèo đen của portal */
    vien(O); net([O + 30, 150, O + 30, 92, O + 44, 70, O + 56, 96, O + 72, 96, O + 84, 70, O + 98, 92, O + 98, 150, O + 30, 150]);
    g.fillStyle = '#fff'; g.fillRect(O + 48, 118, 9, 9); g.fillRect(O + 72, 118, 9, 9);
    /* ô 2: tinh thể ◈ — ký hiệu ngọc của HUD. KHÔNG dùng chevron/tam giác: ▲ ▼ « » là chữ hành động trên chướng ngại
     * (r4a: biển chồng chevron tím đọc ra "nhảy") */
    vien(2 * O); net([2 * O + 64, 40, 2 * O + 108, 128, 2 * O + 64, 216, 2 * O + 20, 128, 2 * O + 64, 40]);
    net([2 * O + 64, 96, 2 * O + 80, 128, 2 * O + 64, 160, 2 * O + 48, 128, 2 * O + 64, 96]);
    /* ô 3: mặt trời sọc thu nhỏ — vọng lại mặt trời trên vòm */
    vien(3 * O);
    g.beginPath(); g.arc(3 * O + 64, 104, 38, 0, Math.PI * 2); g.stroke();
    for (let k = 0; k < 3; k++) net([3 * O + 28 + k * 6, 164 + k * 18, 3 * O + 100 - k * 6, 164 + k * 18]);
    /* Sọc quét ngang mờ = chất "holo"; xoá bằng alpha để không chạm ô khác */
    g.globalCompositeOperation = 'destination-out'; g.fillStyle = 'rgba(0,0,0,0.35)';
    for (let y = 0; y < O * 2; y += 6) g.fillRect(0, y, O * 4, 2);
    g.globalCompositeOperation = 'source-over';
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }

  function build(scene) {
    const P = ND.View.Palette;
    m4 = new THREE.Matrix4(); q = new THREE.Quaternion(); s3 = new THREE.Vector3(); p3 = new THREE.Vector3();
    mau = new THREE.Color(); TRUC_DUNG = new THREE.Vector3(0, 1, 0);
    mauBien = [P.BIEN_TIM, P.BIEN_CAM, P.BIEN_BAC_HA, P.BIEN_TRANG].map(h => ND.View.Mat.hdr(h, 0.9, new THREE.Color()));
    const geo = new THREE.PlaneGeometry(1, 1);
    aO = new THREE.InstancedBufferAttribute(new Float32Array(SO), 1);
    geo.setAttribute('aO', aO);
    const mat = new THREE.MeshBasicMaterial({
      map: veAtlas(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, fog: false
    });
    mat.onBeforeCompile = sh => {
      ND.View.WorldKit.injectFog(sh, true);
      sh.vertexShader = 'attribute float aO;\n' + sh.vertexShader.replace('#include <uv_vertex>',
        '#include <uv_vertex>\nvMapUv.x = (vMapUv.x + aO) * 0.25;');
    };
    mat.customProgramCacheKey = () => 'nd-world-sign';
    im = ND.View.WorldKit.im(geo, mat, SO);
    for (let i = 0; i < SO; i++) im.setColorAt(i, mau.setRGB(1, 1, 1));   // instanceColor phải có trước lần biên dịch
    scene.add(im);
  }

  /* Chỉ hàng tháp gần (hàng 0) mang biển, cứ khoảng một nửa số tòa. Kích thước, độ cao, hình, màu đều băm từ ô. */
  function update(camZ) {
    const K = ND.View.WorldKit, T = ND.View.WorldTowers, hs = K.hash, H = T.HANG[0];
    im.count = 0;
    const k0 = Math.floor((camZ - TRUOC) / H[8]), k1 = Math.ceil((camZ + SAU) / H[8]);
    for (const ben of [-1, 1]) {
      for (let k = k0; k <= k1 && im.count < SO; k++) {
        if (!T.slot(0, ben, k, o)) continue;
        const hang = ben > 0 ? 1 : 0;
        if (hs(k, hang, 11) > TI_LE) continue;
        /* Độ cao trải từ −25 m (dưới mặt cầu — lấp khoảng tối hai bên đường nhìn từ camera) tới sát nóc tòa */
        const w = 2.6 + hs(k, hang, 12) * 1.6, h = w * 2;
        const y = -25 + hs(k, hang, 13) * Math.max(0, o.top - h - 2 + 25);
        /* Tấm phẳng mặc định nhìn +z; quay quanh trục đứng cho nhìn VỀ PHÍA ĐƯỜNG (trái nhìn +x, phải nhìn −x) */
        q.setFromAxisAngle(TRUC_DUNG, ben > 0 ? -Math.PI / 2 : Math.PI / 2);
        p3.set(o.x - ben * (o.w / 2 + 0.06), y + h / 2, o.z + (hs(k, hang, 14) - 0.5) * Math.max(0, o.d - w));
        im.setMatrixAt(im.count, m4.compose(p3, q, s3.set(w, h, 1)));
        im.setColorAt(im.count, mauBien[Math.floor(hs(k, hang, 15) * 4)]);
        aO.array[im.count] = Math.floor(hs(k, hang, 16) * 4);
        im.count++;
      }
    }
    aO.needsUpdate = true;
    K.finish([im]);
  }

  return { build, update };
})();

;
/* ===== js/view-world-gates.js ===== */
/* view-world-gates.js — cổng tốc độ mỗi 120 m và cầu monorail cắt ngang mỗi 240–360 m (P04 plan art AAA, AD mục 7)
 *
 * LUẬT HÀNH LANG: không gì nằm trong x ∈ [−5, 5], y ∈ [0, 12]. Phản lực bay ở y = 6 và camera phản lực ở
 * 8,5 + 6 × 0,35 = 10,6 m (`view-scene.js` cộng 35 % độ cao nhân vật). GD ghi trần 10 m vì chỉ tính 8,5 — r4 xà cổng ở
 * 10,6 m đi XUYÊN camera, dải sáng phủ kín đỉnh khung mobile (m-05-jet). Nên xà cổng từ y = 13,2; cầu monorail từ 14;
 * cột cổng ở |x| ≥ 6,1. Cột và xà là HAI InstancedMesh riêng để bộ kiểm hành lang (dev-census.js) soi hộp bao từng
 * phần — gộp lại thì hộp bao của cả cổng trùm hành lang dù không phần nào nằm trong đó.
 * Cột cổng và trụ cầu cắm xuống y = −40 (mặt phố): đó là trụ của cầu cạn, không phải cột đứng trên hư không.
 * Một vật liệu cho mọi kết cấu: kim loại tối + dải phát sáng chọn theo thuộc tính `aNdG` (1 = màu bậc tốc độ, 2 = tím
 * nóc phố, 3 = cửa sổ tàu). Dải cổng đổi theo bậc như lề đường (AD: "trời và tháp KHÔNG đổi — một bối cảnh").
 */
ND.View = ND.View || {};

ND.View.WorldGates = (function () {
  const NHIP_CONG = 120, NHIP_CAU = 300, TRUOC = 270, SAU = 20;
  const X_COT = 6.4, DAY = -40;
  let cot, xa, tru, dam, tau, m4, uBac, bacCu = -1;

  function manh(w, h, d, x, y, z, vai) {
    const g = ND.View.Geo.box(w, h, d, x, y, z);
    g.setAttribute('aNdG', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count).fill(vai), 1));
    return g;
  }
  const gop = parts => ND.View.Geo.merge(parts, ['aNdG']);

  function vatLieu() {
    const P = ND.View.Palette;
    const m = new THREE.MeshStandardMaterial({ color: P.KIM_LOAI_LAN_CAN, roughness: 0.45, metalness: 0.7, fog: false });
    const u = {
      uBac: uBac, uNoc: { value: ND.View.Mat.hdr(P.NOC_THAP, 1.1, new THREE.Color()) },
      uCuaTau: { value: ND.View.Mat.hdr(P.DEN_COT, 0.9, new THREE.Color()) }
    };
    m.onBeforeCompile = sh => {
      ND.View.WorldKit.injectFog(sh, false);
      Object.assign(sh.uniforms, u);
      sh.vertexShader = 'attribute float aNdG;\nvarying float vNdG;\n' +
        sh.vertexShader.replace('#include <project_vertex>', '#include <project_vertex>\nvNdG = aNdG;');
      sh.fragmentShader = 'uniform vec3 uBac, uNoc, uCuaTau;\nvarying float vNdG;\n' +
        sh.fragmentShader.replace('#include <emissivemap_fragment>', [
          '#include <emissivemap_fragment>',
          'if (vNdG > 2.5) totalEmissiveRadiance += uCuaTau;',
          'else if (vNdG > 1.5) totalEmissiveRadiance += uNoc;',
          'else if (vNdG > 0.5) totalEmissiveRadiance += uBac;'
        ].join('\n'));
    };
    m.customProgramCacheKey = () => 'nd-world-gate';
    return m;
  }

  function build(scene) {
    const K = ND.View.WorldKit;
    m4 = new THREE.Matrix4();
    uBac = { value: new THREE.Color() };
    const mat = vatLieu();
    /* Cột phía PHẢI, gốc ở mặt phố: thân + dải sáng mặt trong từ 8,6 m lên đỉnh (thấp hơn để tối — sát làn thì bớt chói) */
    const cao = 15 - DAY;
    cot = K.im(gop([manh(0.6, cao, 0.8, 0, cao / 2, 0, 0), manh(0.04, 6.4, 0.3, -0.32, 11.8 - DAY, 0, 1)]), mat, 8);
    /* Xà: vát 45° hai vai (hình chung của khiên tường + HUD), dải sáng mặt dưới + mặt trước */
    xa = K.im(gop([
      manh(2 * X_COT + 0.6, 1.4, 0.8, 0, 13.9, 0, 0), manh(2 * X_COT - 1.6, 0.4, 0.8, 0, 14.8, 0, 0),
      manh(2 * X_COT - 0.6, 0.06, 0.3, 0, 13.17, 0, 1), manh(2 * X_COT - 2.2, 0.1, 0.04, 0, 14.0, 0.42, 1)
    ]), mat, 4);
    /* Cầu monorail: trụ đôi ở ±9, dầm ngang 180 m ở y 14, dải tím mặt dưới; tàu 3 toa chạy ngang */
    tru = K.im(gop([manh(1.2, 14 - DAY, 1.2, 0, (14 - DAY) / 2, 0, 0)]), mat, 8);
    dam = K.im(gop([manh(180, 1.2, 1.6, 0, 14.6, 0, 0), manh(180, 0.08, 0.5, 0, 13.98, 0, 2)]), mat, 2);
    const toa = [];
    for (let i = 0; i < 3; i++) {
      toa.push(manh(9.6, 2.2, 2.0, i * 10 - 10, 16.5, 0, 0), manh(9.2, 0.5, 2.04, i * 10 - 10, 16.8, 0, 3));
    }
    tau = K.im(gop(toa), mat, 2);
    scene.add(cot, xa, tru, dam, tau);
  }

  function update(camZ, t, bac) {
    const K = ND.View.WorldKit, E = ND.CFG.COLOR.EDGE_STEPS;
    if (bac !== bacCu) { bacCu = bac; ND.View.Mat.hdr(E[Math.min(bac, E.length - 1)], 1.2, uBac.value); }
    K.hideAll([cot, xa, tru, dam, tau]);
    for (let k = Math.floor((camZ - TRUOC) / NHIP_CONG); k <= Math.ceil((camZ + SAU) / NHIP_CONG); k++) {
      const z = k * NHIP_CONG - 60;
      for (const ben of [-1, 1]) {
        m4.makeRotationY(ben > 0 ? 0 : Math.PI).setPosition(ben * X_COT, DAY, z);
        cot.setMatrixAt(cot.count++, m4);
      }
      xa.setMatrixAt(xa.count++, m4.makeTranslation(0, 0, z));
    }
    for (let k = Math.floor((camZ - TRUOC) / NHIP_CAU); k <= Math.ceil((camZ + SAU) / NHIP_CAU); k++) {
      /* Lệch ±60 m theo băm để nhịp cầu không đều như máy đếm (AD: mỗi 240–360 m) */
      const z = k * NHIP_CAU + (K.hash(k, 9, 1) - 0.5) * 120;
      for (const ben of [-1, 1]) tru.setMatrixAt(tru.count++, m4.makeTranslation(ben * 9, DAY, z));
      dam.setMatrixAt(dam.count++, m4.makeTranslation(0, 0, z));
      /* Tàu băng ngang 22 m/s, chiều theo băm; đồng hồ hiển thị nên đóng băng cùng harness */
      const chieu = K.hash(k, 9, 2) < 0.5 ? -1 : 1;
      const x = ((t * 22 + K.hash(k, 9, 3) * 400) % 400) - 200;
      tau.setMatrixAt(tau.count++, m4.makeTranslation(chieu * x, 0, z));
    }
    K.finish([cot, xa, tru, dam, tau]);
  }

  return { build, update };
})();

;
/* ===== js/view-world-near.js ===== */
/* view-world-near.js — lớp gần của cầu cạn: vai cầu + lan can (mỗi 3 m) và cột đèn cong mỗi 24 m so le
 * (P04 plan art AAA, AD mục 7 lớp gần)
 *
 * Mặt đường chỉ rộng 9 m (±4,5, `view-track.js`) và lề sáng ở ±4,5…4,68 — ngoài đó là hư không. Nên mỗi khúc 3 m mang
 * theo một tấm VAI CẦU (4,68 → 6,1) cùng dày 0,4 với mặt đường + dầm biên bên dưới: lan can và cột đèn phải đứng trên
 * cái gì đó, không thì đọc ra là lơ lửng.
 * Lớp gần dùng SƯƠNG GAMEPLAY (45 → 70 m), không dùng sương thế giới: đèn cột trắng ở 100 m nằm trên màn hình ngay sau
 * vùng chướng ngại hiện ra — "không có gì sáng nằm sau chướng ngại" (AD mục 7). Chìm cùng mặt đường là đúng.
 * Lan can + vai cầu thuộc nhóm `duong` (là mép đường, nằm trong hành lang ±5 m có chủ đích); cột đèn thuộc nhóm
 * `the-gioi`, mép trong ở |x| ≥ 5,04 — bộ kiểm hành lang (dev-census.js) soi đúng nhóm này.
 * Vị trí tính lại từ z camera mỗi khung (≤ 70 instance) thay vì pool chia dư: không có trạng thái để lệch khi camera nhảy
 * lùi lúc vào ván mới (bẫy GDD §7.7).
 */
ND.View = ND.View || {};

ND.View.WorldNear = (function () {
  const X_LAN_CAN = 4.95, NHIP_TRU = 3, X_COT = 5.75, NHIP_COT = 24;
  const TRUOC = 84, SAU = 8, SO_TRU = 70, SO_COT = 12;
  let tru, cot, den, m4;

  function build(scene) {
    const g = ND.View.Geo, P = ND.View.Palette, K = ND.View.WorldKit;
    m4 = new THREE.Matrix4();
    const kimLoai = new THREE.MeshStandardMaterial({ color: P.KIM_LOAI_LAN_CAN, roughness: 0.4, metalness: 0.7 });
    /* Dựng cho phía PHẢI (vai cầu chìa về +x), gốc ở chân trụ. Một instance phủ đúng 3 m: trụ + tay vịn + nẹp chân tới
     * trụ kế + tấm vai cầu + dầm biên. */
    tru = K.im(g.merge([
      g.box(0.1, 1.05, 0.1, 0, 0.525, 0),
      g.box(0.07, 0.07, NHIP_TRU, 0, 1.02, -NHIP_TRU / 2),
      g.box(0.05, 0.05, NHIP_TRU, 0, 0.45, -NHIP_TRU / 2),
      g.box(1.42, 0.4, NHIP_TRU, 0.44, -0.2, -NHIP_TRU / 2),
      g.box(0.35, 1.4, NHIP_TRU, 0.98, -1.1, -NHIP_TRU / 2)
    ]), kimLoai, SO_TRU, 'duong');
    /* Cột đèn: thân đứng 7,6 m, tay vươn VÀO phía đường dừng ở |x| = 5,04 (ngoài hành lang), chụp đèn trắng lạnh */
    cot = K.im(g.merge([
      g.box(0.16, 7.6, 0.16, 0, 3.8, 0),
      g.seg(0, 7.0, -0.35, 7.55, 0.12, 0.12, 0),
      g.box(0.3, 0.1, 0.1, -0.5, 7.55, 0)
    ]), kimLoai, SO_COT);
    den = K.im(g.box(0.42, 0.08, 0.26, -0.5, 7.46, 0),
      new THREE.MeshBasicMaterial({ color: ND.View.Mat.hdr(P.DEN_COT, 1.3, new THREE.Color()) }), SO_COT);
    scene.add(tru, cot, den);
  }

  /* Phía trái xoay 180° quanh trục đứng — xoay chứ không lật dấu tỉ lệ: lật làm đảo chiều tam giác, mặt trước thành
   * mặt sau bị loại. Xoay thì khúc lan can trái phủ [3k, 3k + 3] thay vì [3k − 3, 3k]: vẫn liền, chỉ lệch pha. */
  function datBen(ben, x, z) {
    return m4.makeRotationY(ben > 0 ? 0 : Math.PI).setPosition(ben * x, 0, z);
  }

  function update(camZ) {
    const K = ND.View.WorldKit;
    K.hideAll([tru, cot, den]);
    for (let k = Math.floor((camZ - TRUOC) / NHIP_TRU); k <= Math.ceil((camZ + SAU) / NHIP_TRU); k++) {
      for (const ben of [-1, 1]) {
        if (tru.count < SO_TRU) tru.setMatrixAt(tru.count++, datBen(ben, X_LAN_CAN, k * NHIP_TRU));
      }
    }
    /* So le: trái ở 24k, phải ở 24k + 12 */
    for (let k = Math.floor((camZ - TRUOC) / NHIP_COT); k <= Math.ceil((camZ + SAU) / NHIP_COT); k++) {
      for (const ben of [-1, 1]) {
        if (cot.count >= SO_COT) break;
        datBen(ben, X_COT, k * NHIP_COT + (ben > 0 ? NHIP_COT / 2 : 0));
        cot.setMatrixAt(cot.count++, m4);
        den.setMatrixAt(den.count++, m4);
      }
    }
    K.finish([tru, cot, den]);
  }

  return { build, update };
})();

;
/* ===== js/view-world.js ===== */
/* view-world.js — một cửa cho lớp thế giới P04: main.js chỉ gọi build/update ở đây
 *
 * Mọi lớp tính vị trí lại từ z camera mỗi khung (không pool chia dư, không trạng thái) → vào ván mới, tua harness hay camera
 * nhảy lùi đều đúng ngay khung sau, khỏi cần `reset`. Đồng hồ là `tView` của main.js (đồng hồ hiển thị) — harness đóng
 * băng nó, nên tàu, đèn nháy, xe dưới phố đứng đúng pha khi chụp.
 */
ND.View = ND.View || {};

ND.View.World = (function () {
  function build(scene) {
    const V = ND.View;
    V.WorldGround.build(scene);
    V.WorldTowers.build(scene);
    V.WorldSigns.build(scene);
    V.WorldGates.build(scene);
    V.WorldNear.build(scene);
  }

  function update(camZ, t, bac) {
    const V = ND.View;
    V.WorldGround.update(camZ, t);
    V.WorldTowers.update(camZ, t);
    V.WorldSigns.update(camZ);
    V.WorldGates.update(camZ, t, bac);
    V.WorldNear.update(camZ);
  }

  return { build, update };
})();

;
/* ===== js/view-pickup.js ===== */
/* view-pickup.js — booster và ngọc
 *
 * BA BOOSTER PHẢI PHÂN BIỆT ĐƯỢC TỪ 60 M, và không chỉ bằng màu — ở khoảng đó màu đã
 * ngả về màu sương mù. Nên mỗi loại một HÌNH riêng:
 *
 *   phản lực  hình nón chúc xuống   (đọc ra: đẩy lên)
 *   tăng tốc  hình chóp nhọn tới trước (đọc ra: lao đi)
 *   phá khối  khối lập phương gồ ghề  (đọc ra: đập vỡ)
 *
 * Nếu ba cái chỉ khác màu thì người chơi phải chờ tới lúc gần mới biết mình sắp nhận
 * gì — mà quyết định "có đáng đổi làn để lấy không" phải ra TỪ XA mới kịp.
 *
 * NGỌC dùng InstancedMesh: một ván có tới vài chục viên trong tầm nhìn cùng lúc. Mỗi
 * viên một Mesh là vài chục lệnh vẽ cho thứ trang trí — InstancedMesh gói tất cả vào
 * MỘT lệnh vẽ.
 */

ND.View = ND.View || {};

ND.View.Pickup = (function () {
  const MAU = { jet: 0x00ffa8, surge: 0xffd23d, smash: 0xff5c5c };
  const MOI_LOAI = 4;           // cửa sổ 90 m hiếm khi có quá 1 booster, 4 là dư dả
  const SO_NGOC = 64;

  let pools = {};               // id -> [Mesh]
  let ngoc, dummy;

  function hinhCua(id) {
    /* `ConeGeometry(r, h, số cạnh)` — số cạnh thấp có chủ ý: khối ít mặt hợp tông neon
     * hình học của cả game, mà lại rẻ. */
    if (id === 'jet') return new THREE.ConeGeometry(0.45, 0.9, 4);
    if (id === 'surge') return new THREE.ConeGeometry(0.4, 1.0, 3);
    return new THREE.BoxGeometry(0.75, 0.75, 0.75);
  }

  function build(scene) {
    for (const id of ND.Data.Boosters.IDS) {
      const geo = hinhCua(id);
      pools[id] = [];
      for (let i = 0; i < MOI_LOAI; i++) {
        const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: MAU[id] }));
        /* Phản lực chúc mũi xuống: mũi nhọn chỉ xuống đất thì mắt đọc ra lực đẩy lên. */
        if (id === 'jet') m.rotation.z = Math.PI;
        if (id === 'surge') m.rotation.x = -Math.PI / 2;   // chóp nằm ngang, chỉ về phía trước
        m.visible = false;
        scene.add(m);
        pools[id].push(m);
      }
    }

    ngoc = new THREE.InstancedMesh(
      new THREE.OctahedronGeometry(0.22, 0),
      new THREE.MeshBasicMaterial({ color: 0x7de3ff }),
      SO_NGOC
    );
    /* Ma trận đổi mỗi khung hình nên báo cho Three biết, nếu không nó chỉ tải lên GPU
     * một lần rồi thôi và mọi viên ngọc đứng im tại chỗ dựng ban đầu. */
    ngoc.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    ngoc.count = 0;
    ngoc.frustumCulled = false;   // hộp bao của instanced mesh không tự cập nhật
    scene.add(ngoc);

    dummy = new THREE.Object3D();
  }

  function update(list, t) {
    const dung = {};
    for (const id in pools) dung[id] = 0;
    let nNgoc = 0;

    for (let i = 0; i < list.length; i++) {
      const p = list[i];
      if (p.taken) continue;
      const x = ND.Rules.Lane.centerOf(p.lane);

      if (p.kind === 'shard') {
        if (nNgoc >= SO_NGOC) continue;
        dummy.position.set(x, p.y, p.z);
        dummy.rotation.set(t * 1.2, t * 1.8, 0);
        dummy.updateMatrix();
        ngoc.setMatrixAt(nNgoc++, dummy.matrix);
        continue;
      }

      const pool = pools[p.id];
      if (!pool || dung[p.id] >= pool.length) continue;
      const m = pool[dung[p.id]++];
      m.visible = true;
      /* Nhấp nhô nhẹ và xoay chậm — vật đứng im trong một thế giới đang lao vụt thì mắt
       * bỏ qua nó. Chuyển động là thứ kéo được sự chú ý. */
      m.position.set(x, 1.35 + Math.sin(t * 2.5 + p.z * 0.1) * 0.18, p.z);
      m.rotation.y = t * 1.6;
    }

    ngoc.count = nNgoc;
    ngoc.instanceMatrix.needsUpdate = true;

    for (const id in pools) {
      for (let i = dung[id]; i < pools[id].length; i++) pools[id][i].visible = false;
    }
  }

  return { build, update, MAU };
})();

;
/* ===== js/view-runner.js ===== */
/* view-runner.js — nhân vật dựng bằng khối cơ bản, ba tư thế
 *
 * Không dùng file model, không texture: toàn bộ là hộp phát sáng. Đổi skin (phase 06)
 * chỉ là đổi bảng màu, nên bốn skin không tốn thêm một byte tài nguyên nào.
 *
 * ================== BƯỚC CHÂN ĐẾM THEO MÉT, KHÔNG THEO ĐỒNG HỒ ==================
 *
 * `pha = mét * K` chứ không `pha = giây * K`. Nhờ vậy bước chân TỰ nhanh lên khi tốc độ
 * tăng, đúng tỉ lệ, không cần một dòng nào chỉnh theo tốc độ. Đếm theo đồng hồ thì ở
 * 26 m/s nhân vật trông như đang trượt băng — chân đi thong thả trong khi thế giới lao vụt.
 *
 * ================== BÓNG GIẢ ==================
 *
 * Một đĩa tối dưới chân thay cho bản đồ bóng thật. Bóng thật là thứ đắt nhất trong cảnh
 * này và gần như không thấy trên nền neon tối. Nhưng KHÔNG THỂ BỎ HẲN: thiếu bóng thì
 * lúc đang bay người chơi không đọc được mình đang ở trên làn nào, và tiếp đất thành
 * đoán mò. Đĩa co lại và mờ đi theo độ cao chính là thông tin đó.
 */

ND.View = ND.View || {};

ND.View.Runner = (function () {
  const C = ND.CFG;

  /* Skin đọc từ `ND.Store` (thứ người chơi đã chọn), không đọc từ `ND.Data.Skins` trực
   * tiếp — bảng skin là dữ liệu tĩnh thuần, nó không biết ai đang mặc gì. */
  const skinHienTai = () =>
    (ND.Store && ND.Store.skinDangMac && ND.Store.skinDangMac()) || ND.Data.Skins.MAC_DINH;

  let root, hip, legL, legR, armL, armR, shadow, ring;
  let mats = [];

  function hop(w, h, d, mau, y, x) {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshBasicMaterial({ color: mau })
    );
    m.position.set(x || 0, y, 0);
    mats.push(m.material);
    return m;
  }

  function build(scene) {
    const skin = skinHienTai();

    root = new THREE.Group();

    /* Thân, đầu, tay treo trên một nhóm đặt ở HÔNG (y = 0.62). Xoay nhóm này là cả
     * nửa trên nghiêng theo, không phải xoay từng mảnh. */
    hip = new THREE.Group();
    hip.position.y = 0.62;
    hip.add(hop(0.50, 0.62, 0.34, skin.than, 0.31));
    hip.add(hop(0.34, 0.30, 0.30, skin.dau, 0.78));

    armL = new THREE.Group(); armL.position.set(-0.32, 0.55, 0);
    armL.add(hop(0.13, 0.50, 0.15, skin.chan, -0.25));
    armR = new THREE.Group(); armR.position.set(0.32, 0.55, 0);
    armR.add(hop(0.13, 0.50, 0.15, skin.chan, -0.25));
    hip.add(armL, armR);

    /* Chân xoay quanh hông nên phải là nhóm có gốc Ở HÔNG, còn khối chân lệch xuống
     * dưới gốc đó. Đặt khối ngay tại gốc thì chân quay quanh chính giữa mình — trông
     * như hai que gạt nước. */
    legL = new THREE.Group(); legL.position.set(-0.14, 0.62, 0);
    legL.add(hop(0.16, 0.62, 0.18, skin.chan, -0.31));
    legR = new THREE.Group(); legR.position.set(0.14, 0.62, 0);
    legR.add(hop(0.16, 0.62, 0.18, skin.chan, -0.31));

    root.add(hip, legL, legR);
    scene.add(root);

    shadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.5, 16),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.45, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    scene.add(shadow);

    /* Vòng đánh dấu làn dưới chân khi bay (P01, lỗi 2 — r0 d-05-jet): ở 6 m đĩa bóng còn opacity 0,09, người chơi mất
     * dấu mình đang ở làn nào để canh chỗ hạ cánh. Màu trắng lạnh của đèn, không lấy màu hành động hồng/vàng/lam. */
    ring = new THREE.Mesh(
      new THREE.RingGeometry(0.46, 0.6, 32),
      new THREE.MeshBasicMaterial({ color: 0xe8ecff, transparent: true, opacity: 0, depthWrite: false })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.visible = false;
    scene.add(ring);

    return root;
  }

  /* Cập nhật theo trạng thái. `x/y/z` truyền vào là giá trị ĐÃ NỘI SUY, không lấy thẳng
   * từ `state` — xem `main.js`. */
  function update(s, x, y, z) {
    root.position.set(x, y, z);

    const pha = s.meters * 1.55;
    const dangBay = s.booster === 'jet';

    if (s.pose === 'slide') {
      /* Ngả hẳn ra sau, chân duỗi thẳng — đọc ra là "đang trượt" chứ không phải "đang
       * ngồi". Ngồi xổm nhìn giống đứng lùn, và ở tốc độ cao không ai phân biệt được. */
      root.rotation.x = -1.15;
      hip.rotation.x = 0;
      legL.rotation.x = legR.rotation.x = 0.15;
      armL.rotation.x = armR.rotation.x = -0.5;

    } else if (s.pose === 'jump' || dangBay) {
      root.rotation.x = 0;
      hip.rotation.x = 0.22;                    // chúi người tới trước
      legL.rotation.x = -0.95; legR.rotation.x = -0.55;   // co chân, lệch nhau cho có dáng
      armL.rotation.x = -1.5; armR.rotation.x = -1.2;

    } else {
      root.rotation.x = 0;
      hip.rotation.x = 0.10;
      const sw = Math.sin(pha) * 0.95;
      legL.rotation.x = sw;
      legR.rotation.x = -sw;
      armL.rotation.x = -sw * 0.7;              // tay ngược pha với chân cùng bên
      armR.rotation.x = sw * 0.7;
    }

    /* Bóng luôn nằm trên MẶT ĐƯỜNG, không bám theo `y` của nhân vật — đó là toàn bộ
     * công dụng của nó. Co và mờ dần theo độ cao để đọc được đang cao bao nhiêu. */
    const cao = Math.min(y / C.BOOSTER.JET_Y, 1);
    shadow.position.set(x, 0.02, z);
    shadow.scale.setScalar(1 - cao * 0.65);
    /* Sàn 0,3: bóng là tín hiệu độ cao DUY NHẤT gắn với mặt đường — tắt gần hết thì không còn biết mình cao bao nhiêu */
    shadow.material.opacity = Math.max(0.3, 0.45 * (1 - cao * 0.8));
    /* Chỉ khi cao hơn đỉnh nhảy thường (2,2 m): vòng là tín hiệu hạ cánh của phản lực, không phải của mỗi cú nhảy */
    ring.visible = y > C.RUNNER.JUMP_H + 0.3;
    if (ring.visible) {
      ring.position.set(x, 0.025, z);
      ring.material.opacity = 0.75 * cao;
    }
  }

  /* Đổi skin lúc đang chạy — phase 06 gọi từ màn chọn skin. */
  function applySkin(skin) {
    if (!skin) return;
    const thu = [skin.than, skin.dau, skin.chan, skin.chan, skin.chan, skin.chan];
    for (let i = 0; i < mats.length; i++) mats[i].color.setHex(thu[i] || skin.than);
  }

  return { build, update, applySkin };
})();

;
/* ===== js/view-fx.js ===== */
/* view-fx.js — vệt tốc độ, mảnh nổ, rung màn
 *
 * Tất cả bằng POOL. Hiệu ứng là chỗ dễ cấp phát bừa nhất: mỗi vụ nổ `new` mười mảnh
 * nghe thì nhỏ, nhưng phá khối bắn ra hàng chục vụ trong sáu giây, và bộ dọn rác chạy
 * ngay giữa lúc màn hình đang đông nhất. Đó là kiểu khựng mà người chơi đổ cho "máy yếu".
 *
 * VỆT TỐC ĐỘ chỉ bật khi TĂNG TỐC. Nó là nửa còn lại của cảm giác nhanh — nửa kia là
 * FOV ở `view-scene.js`. Riêng tốc độ thật (×1.6) thì mắt gần như không nhận ra, vì
 * không có gì đứng yên gần camera để so sánh.
 *
 * P01 plan art AAA: vệt và mảnh mỗi thứ MỘT InstancedMesh (2 lệnh vẽ) thay cho 26 + 40 Mesh, 41 vật liệu — lúc phá
 * khối, riêng hiệu ứng đã đẩy cảnh lên 116–119 lệnh vẽ, sát trần 120 (r0b d-07). Màu mảnh nằm ở instanceColor.
 * Phần tử đang tắt ghi ma trận co về 0 thay vì đổi `visible` từng cái.
 */

ND.View = ND.View || {};

ND.View.Fx = (function () {
  const SO_VET = 26;
  const SO_MANH = 40;

  let vets = [], manhs = [], dungManh = 0;
  let vetIM, manhIM, m4, m0, q, e, v3, s3, col;
  let shakeT = 0, shakeBien = 0;
  let rng = 1;

  /* Ngẫu nhiên riêng cho hiệu ứng — KHÔNG dùng `state.rng`.
   * Lớp hiển thị mà rút số từ nguồn ngẫu nhiên của luật thì mỗi máy vẽ ra số lần khác
   * nhau (tuỳ tần số khung hình) và dãy số của luật lệch đi — mất tính phát lại được. */
  function nn() {
    rng = (rng * 16807) % 2147483647;
    return rng / 2147483647;
  }

  function build(scene) {
    m4 = new THREE.Matrix4(); m0 = new THREE.Matrix4().makeScale(0, 0, 0);
    q = new THREE.Quaternion(); e = new THREE.Euler(); v3 = new THREE.Vector3(); s3 = new THREE.Vector3();
    col = new THREE.Color(0xffffff);

    vetIM = new THREE.InstancedMesh(new THREE.BoxGeometry(0.05, 0.05, 1),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, depthWrite: false }), SO_VET);
    manhIM = new THREE.InstancedMesh(new THREE.BoxGeometry(0.3, 0.3, 0.3),
      new THREE.MeshBasicMaterial({ color: 0xffffff }), SO_MANH);
    for (let i = 0; i < SO_VET; i++) { vetIM.setMatrixAt(i, m0); vets.push({ on: false, x: 0, y: 0, z: 0 }); }
    /* setColorAt TRƯỚC lần vẽ đầu: instanceColor phải có sẵn lúc biên dịch shader, gán sau là shader không đọc */
    for (let i = 0; i < SO_MANH; i++) {
      manhIM.setMatrixAt(i, m0);
      manhIM.setColorAt(i, col);
      manhs.push({ x: 0, y: 0, z: 0, rx: 0, ry: 0, s: 1, vx: 0, vy: 0, vz: 0, life: 0 });
    }
    for (const im of [vetIM, manhIM]) {
      im.frustumCulled = false;
      im.userData.nhom = 'fx';
      im.visible = false;
      scene.add(im);
    }
  }

  function burst(x, y, z, mau) {
    col.setHex(mau);
    for (let k = 0; k < 10; k++) {
      const i = dungManh;
      const p = manhs[i];
      dungManh = (dungManh + 1) % SO_MANH;      // vòng tròn: quá tay thì đè lên mảnh cũ nhất
      manhIM.setColorAt(i, col);
      p.x = x; p.y = y; p.z = z; p.rx = p.ry = 0;
      p.s = 0.6 + nn() * 0.8;
      p.vx = (nn() - 0.5) * 9;
      p.vy = 1.5 + nn() * 7;
      p.vz = (nn() - 0.5) * 9;
      p.life = 0.55;
    }
    manhIM.instanceColor.needsUpdate = true;
    shake(0.08, 0.13);
  }

  function shake(giay, bien) {
    /* Rung mới KHÔNG cộng dồn vào rung cũ — lấy cái mạnh hơn. Cộng dồn thì phá liền
     * năm khối sẽ làm màn hình giật đến mức không đọc nổi đường phía trước. */
    shakeT = Math.max(shakeT, giay);
    shakeBien = Math.max(shakeBien, bien);
  }

  /* Gọi mỗi khung hình. Trả về độ lệch camera do rung. */
  function update(s, dt, camX, camY, camZ) {
    /* ---- vệt tốc độ ---- */
    const bat = s.booster === 'surge';
    q.identity();
    for (let i = 0; i < vets.length; i++) {
      const v = vets[i];
      if (!bat) { if (v.on) { v.on = false; vetIM.setMatrixAt(i, m0); } continue; }
      if (!v.on) {
        v.on = true;
        v.x = (nn() - 0.5) * 16;
        v.y = 0.2 + nn() * 6;
        v.z = camZ - 20 - nn() * 45;
      }
      /* Vệt trôi VỀ PHÍA camera nhanh hơn cả tốc độ chạy — chính chênh lệch đó tạo cảm
       * giác vượt lên chứ không phải bản thân tốc độ. */
      v.z += (s.speed * 1.9) * dt;
      if (v.z > camZ + 4) { v.on = false; vetIM.setMatrixAt(i, m0); continue; }   // qua vai rồi thì thả về pool
      vetIM.setMatrixAt(i, m4.compose(v3.set(v.x, v.y, v.z), q, s3.set(1, 1, 2.5 + s.speed * 0.12)));
    }
    vetIM.visible = bat;
    vetIM.instanceMatrix.needsUpdate = true;

    /* ---- mảnh nổ ---- */
    let conManh = false;
    for (let i = 0; i < manhs.length; i++) {
      const p = manhs[i];
      if (p.life <= 0) continue;
      p.life -= dt;
      p.vy -= 26 * dt;                                  // rơi xuống
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
      p.rx += dt * 7; p.ry += dt * 5;
      p.s *= 1 - dt * 1.4;                              // teo dần thay cho mờ dần
      if (p.life <= 0) { manhIM.setMatrixAt(i, m0); continue; }
      conManh = true;
      q.setFromEuler(e.set(p.rx, p.ry, 0));
      manhIM.setMatrixAt(i, m4.compose(v3.set(p.x, p.y, p.z), q, s3.set(p.s, p.s, p.s)));
    }
    manhIM.visible = conManh;
    manhIM.instanceMatrix.needsUpdate = true;

    /* ---- rung màn ---- */
    let dx = 0, dy = 0;
    if (shakeT > 0) {
      shakeT -= dt;
      const suc = Math.max(shakeT, 0) * shakeBien * 12;
      dx = (nn() - 0.5) * suc;
      dy = (nn() - 0.5) * suc;
      if (shakeT <= 0) shakeBien = 0;
    }
    return { dx, dy };
  }

  function reset() {
    shakeT = shakeBien = 0;
    manhs.forEach((p, i) => { p.life = 0; manhIM.setMatrixAt(i, m0); });
    vets.forEach((v, i) => { v.on = false; vetIM.setMatrixAt(i, m0); });
    vetIM.visible = manhIM.visible = false;
  }

  return { build, update, burst, shake, reset };
})();

;
/* ===== js/view-fx-bind.js ===== */
/* view-fx-bind.js — dịch SỰ KIỆN LUẬT thành HIỆU ỨNG NHÌN THẤY
 *
 * Lớp luật phát sự kiện thuần dữ liệu (`run:smash`, `run:speed-tier`…) và không biết gì
 * về màu sắc hay rung màn. File này là chỗ duy nhất nối hai bên lại.
 *
 * Tách khỏi `main.js` vì hai lý do: `main.js` chạm trần 200 dòng, và việc "sự kiện nào
 * cho ra hiệu ứng gì" là một mối quan tâm riêng — sửa hiệu ứng thì không nên phải mở file
 * chứa vòng lặp game.
 *
 * Nhận `getState` chứ không nhận `state`: ván mới thay hẳn đối tượng trạng thái, nên giữ
 * tham chiếu trực tiếp là sau ván đầu tiên mọi hiệu ứng nổ ở toạ độ của ván cũ.
 */

ND.View = ND.View || {};

ND.View.FxBind = (function () {

  function bind(getState, onDeath) {
    /* Lề đường đổi màu theo bậc tốc độ — tín hiệu đọc được bằng mắt ngoại vi, không phải
     * rời mắt khỏi đường để liếc HUD. */
    ND.bus.on('run:speed-tier', e => {
      const bang = ND.CFG.COLOR.EDGE_STEPS;
      ND.View.Track.setEdgeColor(bang[Math.min(e.tier, bang.length - 1)]);
      ND.View.Fx.shake(0.05, 0.05);
    });

    /* Nổ ngay trước mặt nhân vật, lấy màu của chính loại vật vừa phá — nhờ vậy người chơi
     * đọc được mình vừa phá cái gì mà không cần nhìn kỹ. */
    ND.bus.on('run:smash', e => {
      const s = getState();
      const mau = ND.View.Obstacle.MAU[e.type];
      ND.View.Fx.burst(s.x, s.y + 1.0, s.z - 1.5, mau || 0xffffff);
    });

    ND.bus.on('run:booster', () => ND.View.Fx.shake(0.15, 0.18));
    ND.bus.on('run:death', onDeath);
  }

  return { bind };
})();

;
/* ===== js/ui-hud.js ===== */
/* ui-hud.js — số mét, thanh booster, số ngọc
 *
 * HUD là DOM chứ không vẽ trong canvas. Lý do: chữ trong WebGL cần texture chữ hoặc thư
 * viện riêng, mà cả hai đều đắt hơn nhiều so với một thẻ `<div>` mà trình duyệt đã biết
 * cách vẽ sắc nét ở mọi tỉ lệ điểm ảnh.
 *
 * CẬP NHẬT CÓ ĐIỀU KIỆN. Số mét đổi mỗi khung hình, nhưng số ngọc thì hàng giây mới đổi
 * một lần. Ghi `textContent` khi giá trị KHÔNG đổi vẫn bắt trình duyệt tính lại bố cục —
 * 60 lần mỗi giây cho ba phần tử, đủ để thấy trên máy yếu. Nên mỗi ô nhớ giá trị cũ.
 *
 * Dùng `textContent`, KHÔNG `innerHTML` — kể cả với số do mình sinh ra. Giữ thói quen
 * rẻ hơn nhiều so với việc rà lại toàn bộ khi phase 06 đưa tên người chơi vào đây.
 */

ND.UI = ND.UI || {};

ND.UI.Hud = (function () {
  let root, elMet, elBoostWrap, elBoostTen, elBoostBar, elNgoc, elThuong;
  let cuMet = -1, cuNgoc = -1, cuBoost = null, cuThuong = -1;

  /* Nhóm nghìn bằng khoảng trắng hẹp: "1 234 m". Dấu phẩy dễ đọc nhầm thành số thập
   * phân khi số nhảy liên tục. */
  const soDep = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  function build(parent) {
    root = document.createElement('div');
    root.id = 'hud';

    elMet = document.createElement('div');
    elMet.className = 'hud-met';
    root.appendChild(elMet);

    elThuong = document.createElement('div');
    elThuong.className = 'hud-thuong';
    root.appendChild(elThuong);

    elBoostWrap = document.createElement('div');
    elBoostWrap.className = 'hud-boost';
    elBoostTen = document.createElement('div');
    elBoostTen.className = 'hud-boost-ten';
    const track = document.createElement('div');
    track.className = 'hud-boost-track';
    elBoostBar = document.createElement('div');
    elBoostBar.className = 'hud-boost-bar';
    track.appendChild(elBoostBar);
    elBoostWrap.appendChild(elBoostTen);
    elBoostWrap.appendChild(track);
    root.appendChild(elBoostWrap);

    elNgoc = document.createElement('div');
    elNgoc.className = 'hud-ngoc';
    root.appendChild(elNgoc);

    parent.appendChild(root);
  }

  function update(s) {
    const met = Math.floor(s.meters);
    if (met !== cuMet) { cuMet = met; elMet.textContent = soDep(met) + ' m'; }

    if (s.bonusMeters !== cuThuong) {
      cuThuong = s.bonusMeters;
      elThuong.textContent = s.bonusMeters > 0 ? '+' + soDep(s.bonusMeters) + ' m phá khối' : '';
    }

    if (s.shards !== cuNgoc) { cuNgoc = s.shards; elNgoc.textContent = '◈ ' + soDep(s.shards); }

    if (s.booster !== cuBoost) {
      cuBoost = s.booster;
      elBoostWrap.classList.toggle('hien', !!s.booster);
      if (s.booster) {
        const T = ND.Data.Boosters.TYPES[s.booster];
        elBoostTen.textContent = T.ten.toUpperCase();
        const mau = ND.View.Pickup.MAU[s.booster];
        elBoostTen.style.color = '#' + mau.toString(16).padStart(6, '0');
        elBoostBar.style.background = '#' + mau.toString(16).padStart(6, '0');
      }
    }

    if (s.booster) {
      /* Thanh gộp cả pha hạ cánh của phản lực: nó vẫn là thời gian còn được bảo vệ, và
       * thấy thanh tụt về 0 rồi mới hết là đúng thứ người chơi cần biết. */
      const T = ND.Data.Boosters.TYPES[s.booster];
      const tong = T.ms + (T.ignoreGround ? ND.CFG.BOOSTER.JET_LAND_S * 1000 : 0);
      const con = s.boosterMs + s.landMs;
      elBoostBar.style.width = Math.max(0, Math.min(100, 100 * con / tong)) + '%';
    }
  }

  function show(v) { root.style.display = v ? '' : 'none'; }

  function reset() { cuMet = cuNgoc = cuThuong = -1; cuBoost = null; }

  return { build, update, show, reset };
})();

;
/* ===== js/storage-local.js ===== */
/* storage-local.js — lưu tiến độ ở máy, và CHẶN số vô lý ngay tại nguồn
 *
 * Ba nhóm dữ liệu, một khoá localStorage:
 *   record  kỷ lục và thống kê   (thứ đi lên bảng xếp hạng)
 *   wallet  ngọc neon
 *   prefs   skin đang mặc, skin đã mở
 *
 * ================== CHỊU ĐƯỢC DỮ LIỆU HỎNG ==================
 *
 * Mọi lần đọc đều bọc `try/catch` và ngã về mặc định. localStorage hỏng vì đủ thứ lý
 * do ngoài tầm với: người dùng sửa tay, tiện ích mở rộng ghi đè, bản cũ của game để lại
 * hình dạng khác. Ném lỗi ra ngoài thì trang trắng và người chơi mất sạch — mà thứ mất
 * chỉ là vài con số, không đáng đánh đổi.
 *
 * ================== CHẶN GIAN LẬN NGAY TẠI NGUỒN ==================
 *
 * Kiểm tính hợp lý Ở ĐÂY chứ không ở lúc gửi lên mây. Chặn ở nguồn thì số vô lý không
 * bao giờ lọt vào kỷ lục, nên cũng không có gì để gửi. Chặn ở lúc gửi thì máy vẫn hiện
 * kỷ lục giả cho chính người chơi xem — nghĩa là gian lận vẫn "thành công" một nửa.
 */

ND.Store = (function () {
  const KHOA = 'neon-dash.v1';
  const AC = ND.CFG.ANTICHEAT;

  const MAC_DINH = () => ({
    record: { bestMeters: 0, bestRunMs: 0, totalRuns: 0, totalSmash: 0, weekStart: 0, weekMeters: 0 },
    wallet: { shards: 0 },
    prefs: { skin: 'runner', moKhoa: ['runner'] }
  });

  let data = null;

  function doc() {
    if (data) return data;
    data = MAC_DINH();
    try {
      const raw = globalThis.localStorage.getItem(KHOA);
      if (raw) {
        const j = JSON.parse(raw);
        /* Gộp từng nhóm chứ không thay cả cục: bản lưu cũ thiếu trường mới thì trường
         * đó vẫn có giá trị mặc định thay vì thành `undefined` rồi lan ra khắp nơi. */
        if (j.record) Object.assign(data.record, j.record);
        if (j.wallet) Object.assign(data.wallet, j.wallet);
        if (j.prefs) Object.assign(data.prefs, j.prefs);
        if (!Array.isArray(data.prefs.moKhoa) || !data.prefs.moKhoa.length) data.prefs.moKhoa = ['runner'];
      }
    } catch (e) {
      console.warn('[neon-dash] dữ liệu lưu hỏng, dùng mặc định:', e && e.message);
      data = MAC_DINH();
    }
    return data;
  }

  function ghi() {
    try {
      globalThis.localStorage.setItem(KHOA, JSON.stringify(doc()));
    } catch (e) {
      /* Hết dung lượng hoặc chế độ riêng tư chặn ghi. Game vẫn chạy được, chỉ là không
       * nhớ giữa hai lần mở — báo một lần rồi thôi, đừng làm phiền mỗi ván. */
      console.warn('[neon-dash] không lưu được:', e && e.message);
    }
  }

  /* Mét tối đa có thể đạt trong `ms` mili giây.
   *
   * Tốc độ trần 26 m/s, nhân biên 1.7 cho phần thưởng phá khối (thứ cộng mét mà không
   * cần đi quãng đường tương ứng). Vượt con số này thì hoặc đồng hồ sai, hoặc ai đó vừa
   * sửa biến trong console — cả hai đều không nên vào kỷ lục. */
  const tranHopLy = ms => AC.SPEED_SLACK * ND.CFG.SPEED.MAX * (ms / 1000) + 50;

  return {
    record: () => doc().record,
    wallet: () => doc().wallet,
    prefs: () => doc().prefs,

    /* Ghi nhận một ván vừa kết thúc. Trả về `true` nếu đây là kỷ lục mới. */
    ghiVan(s, runMs) {
      const d = doc();
      const diem = ND.Rules.Run.score(s);

      if (diem > tranHopLy(runMs) || diem > AC.MAX_METERS) {
        console.warn('[neon-dash] điểm không hợp lý, bỏ qua:', diem, 'trong', runMs, 'ms');
        return false;
      }

      d.record.totalRuns++;
      d.record.totalSmash += s.smashCount;
      d.wallet.shards += s.shards;

      /* Sang tuần mới thì ĐẶT LẠI kỷ lục tuần trước khi so. Nhờ vậy không cần công việc
       * dọn dẹp định kỳ nào — mỗi máy tự dọn phần của mình đúng lúc cần. */
      const tuan = ND.CloudAdapter.tuanNay();
      if (d.record.weekStart !== tuan) { d.record.weekStart = tuan; d.record.weekMeters = 0; }
      if (diem > d.record.weekMeters) d.record.weekMeters = diem;

      const moi = diem > d.record.bestMeters;
      if (moi) { d.record.bestMeters = diem; d.record.bestRunMs = Math.round(runMs); }

      ghi();
      return moi;
    },

    /* Mở khoá skin. Trả về `true` nếu trừ ngọc thành công. */
    muaSkin(id) {
      const d = doc();
      if (d.prefs.moKhoa.indexOf(id) >= 0) return true;      // đã có rồi
      const gia = ND.Data.Skins.giaCua(id);
      if (d.wallet.shards < gia) return false;
      d.wallet.shards -= gia;
      d.prefs.moKhoa.push(id);
      ghi();
      return true;
    },

    daMo: id => doc().prefs.moKhoa.indexOf(id) >= 0,

    chonSkin(id) {
      if (!ND.Data.Skins.BY_ID[id] || !this.daMo(id)) return false;
      doc().prefs.skin = id;
      ghi();
      return true;
    },

    skinDangMac() {
      return ND.Data.Skins.BY_ID[doc().prefs.skin] || ND.Data.Skins.MAC_DINH;
    },

    /* Nhận tiến độ từ đám mây (mã dùng chung gọi qua `adopt`). */
    nhanTuMay(p) {
      const d = doc();
      if (p && p.record) Object.assign(d.record, p.record);
      if (p && p.wallet) Object.assign(d.wallet, p.wallet);
      if (p && p.prefs) Object.assign(d.prefs, p.prefs);
      if (!Array.isArray(d.prefs.moKhoa) || !d.prefs.moKhoa.length) d.prefs.moKhoa = ['runner'];
      ghi();
    },

    tatCa: () => doc(),
    ghi
  };
})();

;
/* ===== js/cloud-adapter.js ===== */
/* cloud-adapter.js — khai báo cho mã dùng chung biết DỮ LIỆU CỦA NEON DASH hình gì
 *
 * Toàn bộ phần mạng (phiên đăng nhập, hạn giờ, gom lần ghi, hàng đợi khi mất mạng) do
 * `shared/portal-cloud.js` lo. File này chỉ khai những thứ thuộc riêng game.
 *
 * ================== THỨ TỰ BỐN LỜI GỌI CUỐI FILE LÀ BẮT BUỘC ==================
 *
 *   1. `Portal.toast = ...`        PHẢI trước init — `adopt()` gọi toast, mà mã chung
 *                                  có thể chạy adopt ngay khi nhận ra phiên đăng nhập cũ
 *   2. `Portal.Cloud.init(...)`
 *   3. `Portal.Cloud.snapshotLocal()`  hạ một bản tóm tắt xuống máy cho trang hồ sơ
 *                                  /game/me/; thiếu thì thẻ game ở đó TRỐNG TRƠN cho
 *                                  tới khi người chơi ghi điểm lần đầu
 *   4. `Portal.Auth.init()`        cuối cùng mới khởi động đăng nhập
 *
 * ================== MỐC TUẦN LÀ SỐ, KHÔNG PHẢI CHUỖI ==================
 *
 * `weekStart` là mili giây của 00:00 thứ Hai UTC, không phải "2026-W34". Luật Firestore
 * so sánh được số nhưng không tính nổi số tuần ISO — mà mốc tuần PHẢI kiểm được ở phía
 * máy chủ, nếu không ai cũng khai một mốc tương lai và chiếm bảng tuần vĩnh viễn.
 *
 * Dùng UTC chứ không giờ máy: giờ máy khác nhau thì hai người cùng tuần lại ra hai mốc
 * khác nhau, và bảng tuần vỡ thành nhiều nhóm nhỏ không ai gặp ai.
 */

ND.CloudAdapter = (function () {
  const NGAY = 86400000;

  function tuanNay() {
    const d = new Date();
    const thu = d.getUTCDay();                 // 0 = Chủ nhật, 1 = thứ Hai...
    const lech = (thu + 6) % 7;                // số ngày kể từ thứ Hai gần nhất
    const mocNgay = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    return mocNgay - lech * NGAY;
  }

  /* Chấm điểm một bản tiến độ để so máy này với đám mây. `bestMeters` chỉ tăng nên bản
   * cao hơn chắc chắn là bản mới hơn. */
  function weight(p) {
    if (!p || !p.record) return -1;
    return p.record.bestMeters || 0;
  }

  /* Máy này chưa chơi ván nào. Phải xét riêng chứ không dựa vào `weight`: hồ sơ mới tinh
   * vẫn có bestMeters = 0, mà 0 cũng là điểm hợp lệ của người vừa chết ở mét đầu tiên. */
  function isEmpty(p) {
    return !p || !p.record || !(p.record.totalRuns > 0);
  }

  function init() {
    if (typeof Portal === 'undefined' || !Portal.Cloud) return;   // chạy lẻ, không có portal

    Portal.toast = text => ND.UI.Screens.toast(text);

    Portal.Cloud.init({
      game: 'dash',
      userDoc: 'dashUsers',
      scoreDoc: 'dashScores',

      /* Tiến độ đầy đủ — ghi vào dashUsers, chỉ chính chủ đọc được. */
      progress: () => ({
        record: ND.Store.record(),
        wallet: ND.Store.wallet(),
        prefs: ND.Store.prefs()
      }),

      /* Các trường lên bảng công khai — ghi vào dashScores. CHỈ những trường này. */
      score: () => {
        const r = ND.Store.record();
        const tuan = tuanNay();
        /* Kỷ lục tuần của tuần CŨ thì gửi 0, đừng gửi số cũ kèm mốc mới — làm vậy là
         * mang thành tích tuần trước sang tuần này. */
        const cungTuan = r.weekStart === tuan;
        return {
          bestMeters: Math.round(r.bestMeters || 0),
          totalRuns: r.totalRuns || 0,
          bestRunMs: Math.round(r.bestRunMs || 0),
          weekStart: tuan,
          weekMeters: cungTuan ? Math.round(r.weekMeters || 0) : 0
        };
      },

      playerName: () => (Portal.Auth && Portal.Auth.user && Portal.Auth.user.name) || 'Người chạy',

      weight,
      isEmpty,

      adopt: p => {
        ND.Store.nhanTuMay(p);
        ND.UI.Screens.setKyLuc(ND.Store.record().bestMeters);
      },

      /* Máy và đám mây đều có tiến độ mà không bên nào trội hẳn. Chọn bản CHẠY XA HƠN —
       * đây là game đo mét, nên "xa hơn" là thước đo tự nhiên và người chơi không bao giờ
       * thấy kỷ lục của mình tụt xuống. */
      askMerge: (local, cloud) => Promise.resolve(weight(cloud) > weight(local) ? 'cloud' : 'local')
    });

    Portal.Cloud.snapshotLocal();
    Portal.Auth.init();
  }

  /* Gọi sau mỗi ván. Đây là THỨ DUY NHẤT kích hoạt việc lưu lên mây — khai adapter xong
   * mà quên gọi thì không có gì đi đâu cả. Nó tự gom nhiều lần gọi liền nhau, tự kiểm
   * đăng nhập, nên cứ gọi thoải mái. */
  function luu() {
    if (typeof Portal !== 'undefined' && Portal.Cloud) Portal.Cloud.markDirty();
  }

  return { init, luu, tuanNay, weight, isEmpty };
})();

;
/* ===== js/ui-rank-panel.js ===== */
/* ui-rank-panel.js — bảng xếp hạng hai tab: Mọi thời và Tuần này
 *
 * ================== BA BẪY ĐÃ CÓ TIỀN LỆ TRONG REPO ==================
 *
 * 1. `Portal.Rank.top()` trả về trường **`pos`**, KHÔNG phải `rank`. Panel cờ vua từng
 *    đọc `row.rank` và hiện `#undefined` cho mọi người — lỗi im lặng, không ném gì cả.
 *
 * 2. Phải gọi `Portal.Rank.clearCache()` sau khi điểm của mình vừa đổi. Bộ đệm 60 giây
 *    khiến người chơi lập kỷ lục xong mở bảng vẫn thấy số cũ và tưởng game hỏng.
 *
 * 3. Tên người chơi đưa vào DOM bằng `textContent`, TUYỆT ĐỐI không `innerHTML` — đó là
 *    chuỗi do người khác đặt, và nó đi thẳng từ máy chủ vào trang của mọi người.
 *
 * Bảng tuần rỗng (đầu tuần, chưa ai chơi) phải hiện lời nhắn tử tế chứ không phải một
 * khoảng trắng — trống trơn thì người chơi đọc ra là hỏng.
 */

ND.UI = ND.UI || {};

ND.UI.RankPanel = (function () {
  const SO_DONG = 20;

  let root, tabs, body;
  let tabHienTai = 'all';
  let dangTai = false;

  const soDep = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  function build(parent) {
    root = document.createElement('div');
    root.className = 'rank';

    tabs = document.createElement('div');
    tabs.className = 'rank-tabs';
    [['all', 'MỌI THỜI'], ['week', 'TUẦN NÀY']].forEach(([id, nhan]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'rank-tab';
      b.textContent = nhan;
      b.addEventListener('pointerdown', e => { e.preventDefault(); chonTab(id); });
      b.dataset.tab = id;
      tabs.appendChild(b);
    });

    body = document.createElement('div');
    body.className = 'rank-body';

    root.append(tabs, body);
    parent.appendChild(root);
    chonTab('all');
  }

  function chonTab(id) {
    tabHienTai = id;
    for (const b of tabs.children) b.classList.toggle('chon', b.dataset.tab === id);
    tai();
  }

  function nhan(text) {
    body.textContent = '';
    const d = document.createElement('div');
    d.className = 'rank-nhan';
    d.textContent = text;
    body.appendChild(d);
  }

  async function tai() {
    if (typeof Portal === 'undefined' || !Portal.Rank) { nhan('Bảng xếp hạng cần kết nối mạng.'); return; }
    if (!Portal.Auth || !Portal.Auth.available()) { nhan('Bảng xếp hạng chưa bật.'); return; }
    /* KHÔNG bắt đăng nhập mới được XEM bảng: luật Firestore cho đọc công khai
     * (allow read: if true), giống mọi game khác trong cổng. Bản trước chặn ở đây
     * làm bảng thành trang trắng với người chưa đăng nhập — trong khi không có
     * nổi một nút đăng nhập nào trên màn. Đăng nhập chỉ cần khi GHI điểm. */

    const cua = tabHienTai;
    dangTai = true;
    nhan('Đang tải…');

    try {
      const truong = cua === 'week' ? 'weekMeters' : 'bestMeters';

      /* Tab tuần LỌC Ở PHÍA NÀY theo mốc tuần, vì `Portal.Rank.top` không nhận điều
       * kiện where (bản trước truyền `opts.where` và nó bị BỎ QUA IM LẶNG — tab tuần
       * trộn lẫn thành tích các tuần cũ). Lọc server cần composite index của
       * Firestore; khi nào bảng đông mới đáng trả giá đó.
       *
       * Tab tuần lấy RỘNG HƠN rồi mới lọc: đầu tuần mới, top-20 thô toàn bản ghi
       * tuần cũ (weekMeters chỉ về 0 khi chính chủ chơi lại) — lấy đúng 20 rồi lọc
       * thì người chơi tuần này rơi hết ra ngoài và bảng báo "chưa ai chạy" sai. */
      const rows = await Portal.Rank.top('dashScores', truong,
        { limit: cua === 'week' ? 100 : SO_DONG });
      if (cua !== tabHienTai) return;            // người chơi đã đổi tab trong lúc chờ

      const tuan = ND.CloudAdapter.tuanNay();
      const co = rows
        .filter(r => (r[truong] || 0) > 0 && (cua !== 'week' || r.weekStart === tuan))
        .slice(0, SO_DONG);
      if (!co.length) {
        nhan(cua === 'week'
          ? 'Tuần này chưa ai chạy. Chạy một ván là đứng đầu bảng.'
          : 'Chưa có ai trên bảng.');
        return;
      }

      body.textContent = '';
      const uid = Portal.Auth.user ? Portal.Auth.user.uid : null;
      co.forEach((r, i) => {
        const d = document.createElement('div');
        d.className = 'rank-dong' + (r.uid === uid ? ' minh' : '');

        const pos = document.createElement('span');
        pos.className = 'rank-pos';
        /* Tab tuần đánh số lại theo danh sách ĐÃ LỌC — `r.pos` là thứ hạng trong
         * danh sách trộn mọi tuần, dùng nó thì bảng tuần hiện #1 #4 #9 đầy lỗ hổng.
         * (`pos`, KHÔNG phải `rank` — bẫy số 4 trong CLAUDE.md.) */
        pos.textContent = '#' + (cua === 'week' ? i + 1 : r.pos);

        const ten = document.createElement('span');
        ten.className = 'rank-ten';
        ten.textContent = r.name || 'Người chạy';   // textContent, không innerHTML

        const so = document.createElement('span');
        so.className = 'rank-so';
        so.textContent = soDep(r[truong] || 0) + ' m';

        d.append(pos, ten, so);
        body.appendChild(d);
      });
    } catch (e) {
      if (cua !== tabHienTai) return;
      console.warn('[neon-dash] không tải được bảng:', e && e.message);
      nhan('Không tải được bảng xếp hạng.');
    } finally {
      dangTai = false;
    }
  }

  /* Gọi sau khi điểm của mình vừa đổi — nếu không, bộ đệm 60 giây của mã dùng chung sẽ
   * trả lại đúng bảng cũ và kỷ lục mới không thấy đâu. */
  function lamMoi() {
    if (typeof Portal !== 'undefined' && Portal.Rank) Portal.Rank.clearCache();
    tai();
  }

  return { build, lamMoi, tai };
})();

;
/* ===== js/ui-portal-return.js ===== */
/* ui-portal-return.js — nút quay về cổng game, góc trên trái
 *
 * TỰ ẨN khi không có portal. Game chạy ở ba nơi khác nhau:
 *   - camandaulung.github.io/game/NeonDash  -> có portal ở /game/, hiện nút
 *   - dev-server / mở file lẻ               -> không có portal, ẩn nút
 *
 * Nút dẫn tới nơi không có gì còn tệ hơn là không có nút (bài học từ cờ vua,
 * xem games/cat-chess/js/ui-portal-return.js).
 *
 * Nút GẮN VÀO GỐC MÀN CHỜ (#man) chứ không gắn vào #ui: nhờ vậy nó tự biến mất
 * khi ván bắt đầu (màn chờ ẩn đi) — đang chạy mà bấm nhầm "về cổng" là mất ván.
 */

ND.UI = ND.UI || {};

ND.UI.PortalReturn = (function () {
  /* Đường dẫn cha, hoặc null nếu đang ở gốc. Nhận biết portal bằng cách so tên
   * thư mục đang đứng với bảng khai báo — cùng cách với `Portal.duongDanHoSo`:
   * ở máy dev thư mục là `neon-dash` (tên mã nguồn), không có trong bảng nên ẩn. */
  function duongVeCong() {
    if (location.protocol === 'file:') return null;
    if (typeof Portal === 'undefined' || !Portal.GAMES) return null;

    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length && parts[parts.length - 1].indexOf('.') >= 0) parts.pop();
    if (!parts.length) return null;

    const thuMuc = parts[parts.length - 1];
    if (!Portal.GAMES.some(g => g.thuMuc === thuMuc)) return null;
    return '../';
  }

  function build(parent) {
    const duong = duongVeCong();
    if (!duong) return;

    const a = document.createElement('a');
    a.className = 'portal-return';
    a.href = duong;
    a.textContent = '‹ Cổng game';
    parent.appendChild(a);
  }

  return { build };
})();

;
/* ===== js/ui-auth-box.js ===== */
/* ui-auth-box.js — khu đăng nhập Google trong màn chờ
 *
 * Trước đây game GỌI `Portal.Auth.init()` nhưng KHÔNG có nút đăng nhập nào — bảng
 * xếp hạng hiện "Đăng nhập để xem" mà người chơi không có cách nào đăng nhập. Khu
 * này bịt đúng lỗ đó, theo mẫu của cờ vua (games/cat-chess/js/ui-rank-panel.js).
 *
 * NGUYÊN TẮC của cả cổng: KHÔNG bắt đăng nhập mới chơi được. Vào là chạy ngay;
 * đăng nhập chỉ cần khi muốn lên bảng xếp hạng hoặc giữ tiến độ khi đổi máy.
 *
 * Vẽ lại theo `Portal.Auth.onChange` — mỗi lần trạng thái đổi (đăng nhập xong,
 * đăng xuất, đang xử lý) là vẽ lại cả khu, không giữ trạng thái DOM riêng.
 * Tên người chơi đưa vào DOM bằng `textContent`, không `innerHTML`.
 */

ND.UI = ND.UI || {};

ND.UI.AuthBox = (function () {
  let root;

  function build(parent) {
    root = document.createElement('div');
    root.className = 'auth-box';
    parent.appendChild(root);

    if (typeof Portal === 'undefined' || !Portal.Auth || !Portal.Auth.available()) {
      const p = document.createElement('div');
      p.className = 'auth-nhan';
      p.textContent = 'Bảng xếp hạng chưa bật. Kỷ lục vẫn lưu trong máy.';
      root.appendChild(p);
      return;
    }

    Portal.Auth.onChange(ve);
  }

  function ve(u) {
    root.textContent = '';

    if (u) {
      const ten = document.createElement('span');
      ten.className = 'auth-ten';
      ten.textContent = u.name;                    // textContent, không innerHTML

      const thoat = document.createElement('button');
      thoat.type = 'button';
      thoat.className = 'auth-nut auth-nut-phu';
      thoat.textContent = 'Đăng xuất';
      /* `click` chứ không `pointerdown`: vuốt cuộn trang bắt đầu trên nút mà cũng
       * đăng xuất thì quá tệ. Độ trễ ~100ms không thành vấn đề với hành động hiếm —
       * `pointerdown` chỉ dành cho nút CHẠY, thứ cần nhạy nhất (xem ui-screens.js). */
      thoat.addEventListener('click', () => Portal.Auth.logout());

      root.append(ten, thoat);
    } else {
      const nhan = document.createElement('span');
      nhan.className = 'auth-nhan';
      nhan.textContent = 'Đăng nhập để lên bảng xếp hạng';

      const vao = document.createElement('button');
      vao.type = 'button';
      vao.className = 'auth-nut';
      vao.textContent = Portal.Auth.busy ? 'Đang xử lý…' : 'Đăng nhập Google';
      vao.disabled = !!Portal.Auth.busy;
      /* `click` — cùng lý do với nút đăng xuất; thêm nữa popup Google mở từ
       * `pointerdown` dễ bị trình chặn popup coi là không do người dùng bấm. */
      vao.addEventListener('click', () => Portal.Auth.login());

      root.append(nhan, vao);
    }

    /* Đường sang trang hồ sơ chung — nơi xem thành tích cả cổng game.
     * Tự ẩn khi không có portal: nút dẫn tới trang 404 còn tệ hơn không có nút. */
    const hoSo = Portal.duongDanHoSo && Portal.duongDanHoSo();
    if (hoSo) {
      const a = document.createElement('a');
      a.className = 'auth-hoso';
      a.href = hoSo;
      a.textContent = 'Hồ sơ cả cổng game →';
      root.appendChild(a);
    }
  }

  return { build };
})();

;
/* ===== js/ui-skin-row.js ===== */
/* ui-skin-row.js — hàng chọn skin ở màn chờ (tách khỏi ui-screens.js, P01 plan art AAA, vì file đó vượt 200 dòng)
 *
 * Skin chưa mở hiện GIÁ chứ không hiện tên: người chơi cần biết còn thiếu bao nhiêu ngọc, tên thì đọc được ở ô đã mở.
 */
ND.UI = ND.UI || {};

ND.UI.SkinRow = (function () {
  let el = null, onDoi = null;
  const soDep = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  /* `doi` gọi sau khi đổi skin thành công — màn chờ vẽ lại dòng phụ (số ngọc vừa bị trừ) */
  function build(parent, doi) {
    el = document.createElement('div');
    el.className = 'skin-hang';
    parent.appendChild(el);
    onDoi = doi;
    return el;
  }

  function ve() {
    el.textContent = '';
    const dangMac = ND.Store.prefs().skin;

    for (const sk of ND.Data.Skins.LIST) {
      const daMo = ND.Store.daMo(sk.id);
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'skin-o' + (sk.id === dangMac ? ' chon' : '') + (daMo ? '' : ' khoa');

      const cham = document.createElement('span');
      cham.className = 'skin-cham';
      cham.style.background = '#' + sk.than.toString(16).padStart(6, '0');

      const nhan = document.createElement('span');
      nhan.className = 'skin-nhan';
      nhan.textContent = daMo ? sk.ten : '◈ ' + soDep(sk.gia);

      b.append(cham, nhan);
      /* `click` chứ không `pointerdown`: bấm skin có thể TRỪ NGỌC THẬT (mua), mà
       * `pointerdown` thì vuốt cuộn bắt đầu trên ô skin cũng kích hoạt. Nhạy 100ms
       * chỉ đáng đổi ở nút CHẠY — không đáng đổi bằng ngọc của người chơi. */
      b.addEventListener('click', () => bam(sk));
      el.appendChild(b);
    }
  }

  function bam(sk) {
    if (!ND.Store.daMo(sk.id)) {
      if (!ND.Store.muaSkin(sk.id)) {
        const thieu = sk.gia - ND.Store.wallet().shards;
        ND.UI.Screens.toast('Còn thiếu ◈ ' + soDep(thieu));
        return;
      }
      ND.UI.Screens.toast('Đã mở ' + sk.ten);
    }
    ND.Store.chonSkin(sk.id);
    ND.View.Runner.applySkin(ND.Store.skinDangMac());
    ND.CloudAdapter.luu();
    ve();
    if (onDoi) onDoi();
  }

  return { build, ve };
})();

;
/* ===== js/ui-screens.js ===== */
/* ui-screens.js — màn chờ và màn chết
 *
 * Hai màn, một khuôn: cùng một khối `<div>` được điền lại nội dung. Hai khối riêng thì
 * mọi thay đổi kiểu dáng phải sửa hai chỗ, và sớm muộn chúng lệch nhau.
 *
 * Màn chờ có thêm hàng chọn skin và bảng xếp hạng hai tab; màn chết chỉ có kết quả và
 * nút chơi lại. Cố ý: lúc vừa chết người ta muốn chạy lại ngay, không muốn phải lướt qua
 * một bảng dài rồi mới tìm thấy nút.
 */

ND.UI = ND.UI || {};

ND.UI.Screens = (function () {
  let root, elTieuDe, elSo, elKyLuc, elPhu, elNut, elSkin, elSlotXepHang, elToast;
  let toastT = 0;
  let onPlay = null;
  let kyLuc = 0;                 // nạp từ `ND.Store` lúc khởi động, xem `setKyLuc`

  const soDep = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  function build(parent, playCb) {
    onPlay = playCb;

    root = document.createElement('div');
    root.id = 'man';

    const hop = document.createElement('div');
    hop.className = 'man-hop';

    elTieuDe = document.createElement('div');
    elTieuDe.className = 'man-tieude';

    elSo = document.createElement('div');
    elSo.className = 'man-so';

    /* Dòng kỷ lục RIÊNG, luôn có mặt ở cả màn chờ lẫn màn chết. Trước đây kỷ lục
     * lẫn trong dòng phụ cỡ chữ nhỏ — người chơi phản hồi là "không thấy kỷ lục". */
    elKyLuc = document.createElement('div');
    elKyLuc.className = 'man-kyluc';

    elPhu = document.createElement('div');
    elPhu.className = 'man-phu';

    elNut = document.createElement('button');
    elNut.className = 'man-nut';
    elNut.type = 'button';

    /* `pointerdown` chứ không `click`: trên di động `click` đến sau ~100 ms và nút cảm
     * giác lờ đờ. Đây là thứ người chơi bấm nhiều nhất, nên nó phải nhạy nhất. */
    elNut.addEventListener('pointerdown', e => { e.preventDefault(); batDau(); });
    elNut.addEventListener('click', e => e.preventDefault());

    elSlotXepHang = document.createElement('div');
    elSlotXepHang.id = 'slot-xephang';

    hop.append(elTieuDe, elSo, elKyLuc, elPhu, elNut);
    elSkin = ND.UI.SkinRow.build(hop, moChoi);
    hop.appendChild(elSlotXepHang);
    root.appendChild(hop);
    parent.appendChild(root);

    /* Nút về cổng gắn vào GỐC màn chờ (không vào hộp giữa): tự ẩn khi ván chạy,
     * và tự vắng mặt khi chạy ngoài portal — xem ui-portal-return.js. */
    ND.UI.PortalReturn.build(root);

    /* Khu đăng nhập nằm NGAY TRÊN bảng xếp hạng: bảng cần đăng nhập mới ghi được,
     * để nút ngay cạnh thì lời nhắn "Đăng nhập để..." mới có chỗ mà làm theo. */
    ND.UI.AuthBox.build(elSlotXepHang);
    ND.UI.RankPanel.build(elSlotXepHang);

    /* Toast dùng chung cho cả mã portal (`Portal.toast`) lẫn game. Đặt ở đây vì nó là
     * lớp trên cùng và không bao giờ bị màn hình che. */
    elToast = document.createElement('div');
    elToast.className = 'toast';
    parent.appendChild(elToast);

    /* Space và Enter cũng bắt đầu ván — người chơi bàn phím không phải với tay ra chuột.
     * Chỉ nghe khi màn đang hiện, nếu không Space lúc đang chạy sẽ vừa nhảy vừa restart. */
    globalThis.addEventListener('keydown', e => {
      if (root.style.display === 'none') return;
      if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); batDau(); }
    });
  }

  function batDau() {
    root.style.display = 'none';
    if (onPlay) onPlay();
  }

  function moChoi() {
    elTieuDe.textContent = 'NEON DASH';
    elSo.textContent = '';
    /* Kỷ lục có dòng riêng, to và luôn hiện — dòng phụ dành cho hướng dẫn và ngọc.
     * Trước đây hai thứ nhét chung một dòng nhỏ nên chơi cả tuần vẫn "không thấy
     * kỷ lục đâu". */
    elKyLuc.textContent = kyLuc > 0 ? 'KỶ LỤC  ' + soDep(kyLuc) + ' m' : '';
    /* Màn cảm ứng không có phím mũi tên — r0 người chấm mobile đọc dòng gợi ý phím là "UI desktop bê nguyên sang" */
    const cham = globalThis.matchMedia && globalThis.matchMedia('(pointer: coarse)').matches;
    elPhu.textContent = (cham ? 'vuốt ← → đổi làn · ↑ nhảy · ↓ cúi' : '← → đổi làn · ↑ nhảy · ↓ cúi (giữ để trượt dài)')
      + (ND.Store.wallet().shards > 0 ? '  ·  ◈ ' + soDep(ND.Store.wallet().shards) : '');
    elNut.textContent = 'CHẠY';
    ND.UI.SkinRow.ve();
    elSkin.style.display = '';
    elSlotXepHang.style.display = '';
    ND.UI.RankPanel.tai();
    root.style.display = '';
  }

  /* `tt` = { moi, kyLucCu } do `main.js` truyền xuống.
   *
   * Màn hình KHÔNG tự tính "có phải kỷ lục mới không". `ND.Store` mới là nơi quyết định —
   * nó có thể TỪ CHỐI một ván vì số vô lý, và lúc đó ván đó không phải kỷ lục dù điểm
   * hiện trên màn có cao đến đâu. Hai nơi cùng tính ra hai câu trả lời khác nhau. */
  function moChet(s, tt) {
    tt = tt || {};
    const diem = ND.Rules.Run.score(s);
    const moi = !!tt.moi;

    elTieuDe.textContent = moi ? 'KỶ LỤC MỚI' : 'HẾT LƯỢT';
    elSo.textContent = soDep(diem) + ' m';

    /* Kỷ lục luôn có mặt trên màn chết, dòng riêng. `kyLuc` lúc này đã được main.js
     * cập nhật (setKyLuc chạy TRƯỚC moChet) nên ván lập kỷ lục hiện đúng số mới. */
    elKyLuc.textContent = kyLuc > 0 ? 'KỶ LỤC  ' + soDep(kyLuc) + ' m' : '';

    /* Nói RÕ điểm đến từ đâu khi có thưởng phá khối — nếu không người chơi thấy con số
     * lớn hơn số mét mình vừa nhìn trên HUD và tưởng game tính sai. */
    const phan = [];
    if (s.bonusMeters > 0) phan.push(soDep(Math.floor(s.meters)) + ' m chạy + ' + soDep(s.bonusMeters) + ' m phá khối');
    if (s.shards > 0) phan.push('◈ ' + soDep(s.shards));
    /* Ván bị từ chối vì số vô lý: nói thẳng ra. Im lặng thì người chơi thấy điểm cao mà
     * kỷ lục không nhúc nhích và kết luận game hỏng. */
    if (!moi && diem > kyLuc) phan.push('không ghi nhận được ván này');
    elPhu.textContent = phan.join('  ·  ');

    elNut.textContent = 'CHẠY LẠI';
    /* Màn chết KHÔNG hiện hàng skin và bảng xếp hạng: vừa chết thì người ta muốn bấm
     * chạy lại ngay. Đẩy nút xuống dưới một bảng hai mươi dòng là cách chắc chắn để
     * biến một cú bấm thành một lần cuộn trang. */
    elSkin.style.display = 'none';
    elSlotXepHang.style.display = 'none';
    root.style.display = '';
  }

  /* ---------- toast ---------- */
  function toast(text) {
    if (!elToast) return;
    elToast.textContent = text;
    elToast.classList.add('hien');
    clearTimeout(toastT);
    toastT = setTimeout(() => elToast.classList.remove('hien'), 2600);
  }

  /* PHASE-06 gọi để nạp kỷ lục đã lưu. */
  function setKyLuc(v) { kyLuc = v || 0; }

  return { build, moChoi, moChet, setKyLuc, toast };
})();

;
/* ===== js/ui-debug-overlay.js ===== */
/* ui-debug-overlay.js — số đo hiệu năng hiện NGAY TRÊN MÀN khi mở `?debug` (P01 plan art AAA)
 *
 * Điện thoại không xem được console (GD phát hiện 24): chụp màn hình máy thật là có hàng "máy thật" cho bảng ngân sách
 * của plan. Chỉ đọc — không đổi luật, không đổi điểm. Không có `?debug` thì không tạo gì, không chạy gì.
 * Vòng rAF RIÊNG, không móc vào frame() của main.js: đo đúng nhịp trình duyệt trao khung, kể cả khi ván đứng ở menu.
 */
ND.UI = ND.UI || {};

ND.UI.DebugOverlay = (function () {
  const CUA_SO_MS = 5000;
  const N = 1024;                          // đủ cho 5 s ở 144 Hz; vòng tròn, không cấp phát mỗi khung
  const dt = new Float32Array(N), luc = new Float64Array(N);
  let el = null, i = 0, last = 0, veLuc = 0;

  function build(parent) {
    if (!/[?&]debug\b/.test(globalThis.location.search)) return;
    el = document.createElement('div');
    el.className = 'debug-hud';
    parent.appendChild(el);
    requestAnimationFrame(tick);
  }

  function tick(now) {
    requestAnimationFrame(tick);
    if (last) { dt[i] = now - last; luc[i] = now; i = (i + 1) % N; }
    last = now;
    if (now - veLuc < 500) return;         // vẽ chữ 2 lần/giây — DOM mỗi khung tự nó làm tụt khung
    veLuc = now;

    const a = [];
    for (let k = 0; k < N; k++) if (luc[k] && now - luc[k] <= CUA_SO_MS) a.push(dt[k]);
    a.sort((x, y) => x - y);
    const p = q => (a.length ? a[Math.min(a.length - 1, Math.floor(a.length * q))] : 0).toFixed(1);
    const s = ND.View.Scene.stats();
    el.textContent = s.calls + ' lệnh vẽ · ' + s.triangles + ' tam giác\n'
      + 'p50 ' + p(0.5) + ' · p95 ' + p(0.95) + ' ms (5 s, ' + a.length + ' khung)\n'
      + 'DPR ' + s.dpr + ' · ' + s.w + '×' + s.h;
  }

  return { build };
})();

;
/* ===== js/ui-input-bind.js ===== */
/* ui-input-bind.js — bàn phím và cảm ứng, dịch thành lệnh trừu tượng
 *
 * Đây là NỬA DOM của việc nhận lệnh; nửa kia là `core-input.js` (thuần dữ liệu, không
 * biết bàn phím tồn tại). Tách vậy để bot ở phase 07 "bấm nút" bằng đúng những lệnh
 * này mà không cần trình duyệt.
 *
 * ================== BA BẪY BẮT BUỘC XỬ LÝ, KHÔNG PHẢI TUỲ CHỌN ==================
 *
 * 1. `preventDefault` cho mũi tên và Space. Thiếu là mỗi lần nhảy trang cuộn xuống một
 *    đoạn, và người chơi tưởng game giật.
 *
 * 2. Bỏ qua `e.repeat`. Giữ phím trái làm trình duyệt bắn keydown liên tục ~30 lần/giây;
 *    không lọc thì mỗi lần giữ là một tràng lệnh đổi làn, nhân vật trôi sang biên và
 *    dính ở đó.
 *
 * 3. `touch-action: none` trên canvas (đặt ở CSS). Thiếu thì vuốt lên để nhảy sẽ kéo
 *    trang, vuốt xuống để cúi sẽ kích hoạt "kéo để tải lại" của trình duyệt di động.
 *
 * Cúi là lệnh DUY NHẤT có nhấn/nhả riêng: ống dài buộc phải giữ. Ba lệnh kia tức thời.
 */

ND.UI = ND.UI || {};

ND.UI.InputBind = (function () {
  const PHIM = {
    ArrowLeft: 'left', KeyA: 'left',
    ArrowRight: 'right', KeyD: 'right',
    ArrowUp: 'jump', KeyW: 'jump', Space: 'jump',
    ArrowDown: 'slide', KeyS: 'slide'
  };

  /* Ngưỡng vuốt. 28 px là quãng ngắn nhất mà ngón tay còn phân biệt được với một cú
   * chạm run tay; 400 ms là mốc dài nhất mà người ta còn coi là "vuốt" chứ không phải
   * "đặt tay lên rồi kéo". */
  const NGUONG_PX = 28;
  const TOI_DA_MS = 400;

  let state = null, canvas = null, gan = false;
  let t0 = 0, x0 = 0, y0 = 0, dangCui = false, daVuot = false;

  const gui = cmd => { if (state && state.alive) ND.Input.send(state, cmd); };

  function onKeyDown(e) {
    const cmd = PHIM[e.code];
    if (!cmd) return;
    e.preventDefault();
    if (e.repeat) return;
    gui(cmd);
  }

  function onKeyUp(e) {
    if (PHIM[e.code] !== 'slide') return;
    e.preventDefault();
    gui('slide-up');
  }

  function onDown(e) {
    const t = e.changedTouches ? e.changedTouches[0] : e;
    t0 = e.timeStamp; x0 = t.clientX; y0 = t.clientY;
    daVuot = false;
  }

  function onMove(e) {
    if (daVuot) return;
    const t = e.changedTouches ? e.changedTouches[0] : e;
    const dx = t.clientX - x0, dy = t.clientY - y0;
    if (Math.abs(dx) < NGUONG_PX && Math.abs(dy) < NGUONG_PX) return;
    if (e.timeStamp - t0 > TOI_DA_MS) return;

    daVuot = true;
    /* Trục nào trội hơn thì thắng. Không có bước này thì vuốt chéo bắn ra hai lệnh, mà
     * ngón cái người ta vuốt chéo gần như luôn luôn. */
    if (Math.abs(dx) > Math.abs(dy)) {
      gui(dx > 0 ? 'right' : 'left');
    } else if (dy < 0) {
      gui('jump');
    } else {
      gui('slide');
      dangCui = true;                  // giữ tiếp cho tới khi nhả tay
    }
  }

  function onUp() {
    /* Chạm rồi nhả mà không đủ quãng: coi là chạm giữ để cúi nếu đã đủ lâu, còn không
     * thì bỏ qua. Nhờ vậy "đặt ngón xuống rồi giữ" cũng là một cách cúi trên di động,
     * không bắt buộc phải vuốt. */
    if (dangCui) { gui('slide-up'); dangCui = false; }
  }

  /* `bind` gọi một lần lúc khởi động; `setState` gọi lại mỗi ván mới.
   * Tách hai việc để không chồng chất hàm nghe sau mỗi lần chơi lại — rò rỉ kiểu đó chỉ
   * lộ ra sau chục ván, dưới dạng mỗi lệnh chạy nhiều lần. */
  function bind(canvasEl) {
    if (gan) return;
    gan = true;
    canvas = canvasEl;

    globalThis.addEventListener('keydown', onKeyDown, { passive: false });
    globalThis.addEventListener('keyup', onKeyUp, { passive: false });

    canvas.addEventListener('touchstart', onDown, { passive: true });
    canvas.addEventListener('touchmove', onMove, { passive: true });
    canvas.addEventListener('touchend', onUp, { passive: true });

    /* Chuột: để thử nhanh trên máy tính mà không cần bàn phím. */
    canvas.addEventListener('pointerdown', e => { if (e.pointerType !== 'touch') onDown(e); });
    canvas.addEventListener('pointermove', e => { if (e.pointerType !== 'touch' && e.buttons) onMove(e); });
    canvas.addEventListener('pointerup', e => { if (e.pointerType !== 'touch') onUp(e); });
  }

  function setState(s) {
    state = s;
    dangCui = false;
    daVuot = false;
  }

  return { bind, setState };
})();

;
/* ===== js/ui-pwa.js ===== */
/* ui-pwa.js — đăng ký service worker
 *
 * ================== KHUNG BUILD KHÔNG LÀM HỘ VIỆC NÀY ==================
 *
 * `build.mjs` sinh ra `dist/sw.js` và chèn `window.ND_SW="sw.js"` vào index.html, nhưng
 * việc ĐĂNG KÝ nằm ở mã game. Sky Chicken để ở `system-pwa.js`, cờ vua ở
 * `ui-update-notice.js` — game này để ở đây.
 *
 * Bẫy đã ghi trong `shared/README.md`: bỏ bước này thì game chạy ngon ở máy, tắt máy chủ
 * là TRẮNG HOÀN TOÀN. Bảng kiểm thêm game mới từng bỏ sót đúng chỗ này hai lần, và cả
 * hai lần đều không có dấu hiệu gì cho tới lúc mất mạng — có `sw.js` nằm trong thư mục
 * nhưng không ai đăng ký nó.
 *
 * Bản chạy bằng dev-server không có `ND_SW`, nên module tự tắt và không đi tìm `sw.js`
 * để rồi nhận 404.
 */

ND.UI = ND.UI || {};

ND.UI.Pwa = (function () {

  function dangKy() {
    if (!('serviceWorker' in navigator) || !globalThis.ND_SW) return;

    navigator.serviceWorker.register(globalThis.ND_SW).catch(() => {});

    /* Bản mới chiếm quyền thì tải lại một lần. `daTaiLai` chặn vòng lặp: không có nó,
     * một service worker cứ chiếm quyền lại sẽ quay trang liên tục trước mặt người chơi
     * và họ không bao giờ vào được game. */
    let daTaiLai = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (daTaiLai) return;
      daTaiLai = true;
      location.reload();
    });
  }

  return { dangKy };
})();

;
/* ===== js/main.js ===== */
/* main.js — nối vòng lặp thời gian với lớp dựng hình
 *
 * File này là NƠI DUY NHẤT được phép gọi requestAnimationFrame. Lý do ở đầu
 * `core-loop.js`: bộ dồn thời gian phải thuần dữ liệu để bot ở phase 07 chạy được đúng
 * vòng lặp mà người chơi chạy.
 *
 * ================== VÌ SAO PHẢI NỘI SUY KHI VẼ ==================
 *
 * Luật chạy 120 bước/giây, màn hình vẽ 60 (hoặc 144). Hai nhịp không chia hết cho nhau,
 * nên vẽ thẳng trạng thái hiện tại thì mỗi khung hình lấy một thời điểm hơi lệch — biểu
 * hiện là rung lăn tăn đều đặn, thấy rõ nhất ở vật đứng gần.
 *
 * Cách chữa: nhớ vị trí TRƯỚC bước cuối, rồi pha trộn với vị trí sau theo `alpha` (phần
 * dư của bộ dồn). Chỉ nội suy ba con số x/y/z — tư thế và mọi thứ khác lấy nguyên.
 */

ND.main = (function () {
  let loop, state, canvas;
  let truoc = { x: 0, y: 0, z: 0 };      // vị trí trước bước mô phỏng cuối cùng
  let tView = 0;                          // đồng hồ riêng của lớp hiển thị (xoay vật phẩm)

  /* BA CHẾ ĐỘ, không phải một cờ bật/tắt.
   *
   * BẪY ĐÃ GẶP THẬT (người chơi báo): bản đầu chỉ có cờ `dangChoi`, và ván nền chạy sau
   * menu được hồi sinh bằng điều kiện `!dangChoi && !alive`. Nhưng `chet()` đặt
   * `dangChoi = false` NGAY TRƯỚC đó — nên đúng khung hình sau khi người chơi chết, ván
   * VỪA KẾT THÚC của họ lại lọt vào đúng điều kiện hồi sinh:
   *
   *     chết -> hồi sinh -> chạy tiếp -> đâm blocker -> chết -> hồi sinh -> ...
   *
   * Mỗi vòng phát lại `run:death`, nên `moChet()` bị gọi lại liên tục và số mét trên màn
   * kết quả cứ tăng vô tận. Nhân vật thì trông như xuyên qua mọi chướng ngại.
   *
   * Hai trạng thái "không chơi" hoàn toàn khác nhau — nền menu thì PHẢI hồi sinh cho cảnh
   * còn trôi, ván đã kết thúc thì TUYỆT ĐỐI không. Một cờ nhị phân không phân biệt nổi
   * hai thứ đó; ba chế độ thì có. */
  const MENU = 'menu', CHOI = 'choi', KET_THUC = 'ket-thuc';
  let cheDo = MENU;

  function stepGame(dt) {
    truoc.x = state.x; truoc.y = state.y; truoc.z = state.z;
    ND.Rules.Run.step(state, dt);
  }

  function vanMoi() {
    /* Hạt giống lấy theo đồng hồ hiển thị — mỗi ván một đường khác. Đây là chỗ DUY NHẤT
     * trong game được phép làm vậy: `state.rng` bên trong vẫn hoàn toàn xác định theo
     * hạt giống, nên một ván đã bắt đầu vẫn phát lại được. */
    state = ND.State.Run.create({ seed: 'nd-' + Math.floor(tView * 1000), spawn: true });
    truoc.x = state.x; truoc.y = state.y; truoc.z = state.z;
    loop.reset();

    /* XẾP LẠI ĐƯỜNG NGAY LÚC NÀY. Ván mới bắt đầu ở z = 0, còn các đoạn đường thì đang
     * nằm ở chỗ ván trước — hoặc ván nền sau menu — bỏ lại, có thể cách hàng trăm mét.
     * `Track.update` tự kéo về được, nhưng gọi thẳng ở đây thì khung hình ĐẦU TIÊN đã
     * đúng, khỏi phụ thuộc thứ tự chạy. */
    ND.View.Scene.follow(state.x, state.y, state.z, 1);
    ND.View.Track.reset(ND.View.Scene.camera.position.z);

    ND.View.Fx.reset();
    ND.UI.Hud.reset();
    ND.UI.Hud.show(true);
    ND.UI.InputBind.setState(state);
    cheDo = CHOI;
  }

  function chet() {
    /* Chốt cửa: mỗi ván chỉ ghi nhận ĐÚNG MỘT cái chết. Kể cả về sau ai đó làm
     * `run:death` phát nhiều lần, màn kết quả cũng không bị ghi đè lần hai. */
    if (cheDo !== CHOI) return;
    cheDo = KET_THUC;
    ND.View.Fx.shake(0.25, 0.35);
    ND.UI.Hud.show(false);

    /* Thời lượng ván lấy từ `state.t` — ĐỒNG HỒ MÔ PHỎNG, không phải đồng hồ hiển thị.
     *
     * BẪY ĐÃ GẶP: bản đầu đo bằng `tView`, thứ chỉ nhích khi có khung hình được vẽ. Chốt
     * chống gian lận (mét <= tốc độ trần x thời gian) vì thế đem số mét THẬT chia cho một
     * khoảng thời gian có thể bằng 0, và từ chối sạch mọi ván tử tế.
     *
     * `state.t` là chính cái đồng hồ đã sinh ra số mét đó, nên tỉ số mét/thời gian đúng
     * bằng tốc độ trung bình — đúng thứ chốt này muốn chặn. Nó cũng chạy được trong Node,
     * nên bot ở phase 07 đi qua đúng đường mà người chơi đi. */
    const kyLucCu = ND.Store.record().bestMeters;
    const kyLucMoi = ND.Store.ghiVan(state, state.t * 1000);

    /* Truyền KẾT QUẢ xuống màn hình thay vì để nó tự tính lại.
     *
     * BẪY ĐÃ GẶP: bản đầu ghi vào kho TRƯỚC rồi mới gọi `setKyLuc`, nên màn hình so điểm
     * với kỷ lục ĐÃ BAO GỒM chính ván vừa rồi — `12 > 12` là sai, và ván lập kỷ lục đầu
     * tiên luôn hiện "HẾT LƯỢT". Kho quyết định, màn hình chỉ hiển thị. */
    ND.UI.Screens.setKyLuc(ND.Store.record().bestMeters);
    ND.UI.Screens.moChet(state, { moi: kyLucMoi, kyLucCu });

    /* Chỉ đẩy lên mây khi thật sự có gì mới. Ván thường cũng đổi `totalRuns` nên vẫn
     * đáng lưu, nhưng làm mới bảng xếp hạng thì chỉ cần khi kỷ lục đổi. */
    ND.CloudAdapter.luu();
    if (kyLucMoi) ND.UI.RankPanel.lamMoi();
  }

  function start() {
    canvas = document.getElementById('game');
    const { scene } = ND.View.Scene.init(canvas);

    ND.View.Track.build(scene);
    ND.View.World.build(scene);
    ND.View.Obstacle.build(scene);
    ND.View.Pickup.build(scene);
    ND.View.Fx.build(scene);
    ND.View.Runner.build(scene);

    const ui = document.getElementById('ui');
    ND.UI.Hud.build(ui);
    ND.UI.Screens.build(ui, vanMoi);
    ND.UI.InputBind.bind(canvas);
    ND.UI.DebugOverlay.build(ui);

    /* Ván nền cho màn chờ: có cảnh trôi phía sau menu, nhưng không ai điều khiển. */
    state = ND.State.Run.create({ seed: 'menu', spawn: true });
    loop = ND.Loop.create({ step: stepGame });
    ND.View.FxBind.bind(() => state, chet);

    /* Nạp kỷ lục đã lưu TRƯỚC khi vẽ màn chờ, nếu không lần mở đầu tiên luôn hiện hướng
     * dẫn thay vì kỷ lục dù người chơi đã chơi cả tuần. */
    ND.UI.Screens.setKyLuc(ND.Store.record().bestMeters);
    ND.View.Runner.applySkin(ND.Store.skinDangMac());
    ND.CloudAdapter.init();

    ND.UI.Hud.show(false);
    ND.UI.Screens.moChoi();

    ND.UI.Pwa.dangKy();

    const boot = document.getElementById('boot-msg');
    if (boot) boot.remove();

    const debug = globalThis.location && globalThis.location.search.indexOf('debug') >= 0;
    let debugAt = 0, lastMs = 0;

    function frame(nowMs) {
      requestAnimationFrame(frame);

      const dtThuc = lastMs ? Math.min((nowMs - lastMs) / 1000, 0.25) : 0;
      lastMs = nowMs;
      tView += dtThuc;
      ND.View.Quality.tick(dtThuc * 1000);

      const alpha = loop.advance(nowMs);

      /* Hồi sinh CHỈ cho ván nền sau menu — nhân vật đứng chết sau menu trông như game
       * treo. Ván đã kết thúc thì để yên: người chơi cần nhìn đúng chỗ mình chết, và số
       * mét trên màn kết quả phải đứng im. */
      if (cheDo === MENU && !state.alive) { state.alive = true; state.deathReason = null; }

      const x = truoc.x + (state.x - truoc.x) * alpha;
      const y = truoc.y + (state.y - truoc.y) * alpha;
      const z = truoc.z + (state.z - truoc.z) * alpha;

      ND.View.Scene.setMode(state.booster === 'jet' ? 'JET'
        : state.booster === 'surge' ? 'SURGE' : 'NORMAL');

      ND.View.Runner.update(state, x, y, z);
      ND.View.Obstacle.update(state.obstacles, z, tView);
      ND.View.Pickup.update(state.pickups, tView);

      ND.View.Scene.follow(x, y, z, dtThuc || ND.CFG.LOOP.STEP);
      ND.View.Track.update(ND.View.Scene.camera.position.z);
      ND.View.World.update(ND.View.Scene.camera.position.z, tView, state.speedTier);

      const rung = ND.View.Fx.update(state, dtThuc, x, y, ND.View.Scene.camera.position.z);
      ND.View.Scene.applyShake(rung.dx, rung.dy);

      if (cheDo === CHOI) ND.UI.Hud.update(state);
      ND.View.Scene.render();

      if (debug && nowMs - debugAt > 2000) {
        debugAt = nowMs;
        const st = ND.View.Scene.stats();
        console.log('[neon-dash] lệnh vẽ', st.calls, '· tam giác', st.triangles,
          '· mét', state.meters.toFixed(0), '· m/s', state.speed.toFixed(1),
          '· vật', state.obstacles.length, '· vật phẩm', state.pickups.length);
      }
    }
    requestAnimationFrame(frame);
  }

  return { start, get state() { return state; } };
})();

/* Không khởi động ngay — chờ cầu nối trong index.html nạp xong Three.
 * Vì sao bắt buộc phải chờ: xem đầu `view-bootstrap.js`. */
ND.Bootstrap.whenReady(ND.main.start);

;