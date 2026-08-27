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
    BG: 0x05060f,
    FOG: 0x05060f,

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
     * rời mắt khỏi đường để liếc HUD. */
    EDGE_STEPS: [0x00e5ff, 0x4d5bff, 0xb14dff, 0xff4dcd, 0xff6a3d]
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

  function init(canvasEl) {
    canvas = canvasEl;

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    /* Chặn trần tỉ lệ điểm ảnh ở 2. Điện thoại đời mới báo devicePixelRatio 3–4, dựng
     * hình ở độ phân giải đó tốn gấp 4 lần mà mắt gần như không phân biệt được. */
    renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 2));

    scene = new THREE.Scene();
    scene.background = new THREE.Color(CFG.COLOR.BG);
    /* Nền và sương mù cùng màu — khác nhau thì lộ vệt ranh giới ở đường chân trời. */
    scene.fog = new THREE.Fog(CFG.COLOR.FOG, CFG.FOG_NEAR, CFG.FOG_FAR);

    const c = CFG.CAM.NORMAL;
    cam.back = c.back; cam.up = c.up; cam.fov = c.fov;
    camera = new THREE.PerspectiveCamera(c.fov, 1, 0.1, CFG.VIEW_DIST + 30);

    /* Hai đèn, không bóng. Cường độ cao vì Three từ r155 dùng đơn vị vật lý. */
    const hemi = new THREE.HemisphereLight(0x8899ff, 0x0a0a16, 2.2);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xbfd0ff, 1.4);
    dir.position.set(-4, 12, 6);
    scene.add(dir);

    resize();
    globalThis.addEventListener('resize', resize);
    return { scene, renderer, camera };
  }

  function resize() {
    const w = canvas.clientWidth || globalThis.innerWidth;
    const h = canvas.clientHeight || globalThis.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
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

  function render() { renderer.render(scene, camera); }

  /* Số đo hiệu năng — gọi tay từ console hoặc bằng `?debug`. */
  function stats() {
    const i = renderer.info;
    return { calls: i.render.calls, triangles: i.render.triangles, geometries: i.memory.geometries };
  }

  return {
    init, resize, setMode, follow, applyShake, render, stats,
    get scene() { return scene; },
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

  let segments = [];                   // { group, z }
  let edgeMats = [];                   // để đổi màu theo bậc tốc độ (phase 05)
  let headZ = 0;                       // z của mép xa nhất đã dựng

  function build(scene) {
    /* Hình học dùng chung — dựng một lần, mọi đoạn tham chiếu tới. */
    const roadGeo = new THREE.BoxGeometry(ROAD_W, 0.4, SEG_LEN);
    const edgeGeo = new THREE.BoxGeometry(0.18, 0.5, SEG_LEN);
    const lineGeo = new THREE.BoxGeometry(0.06, 0.02, SEG_LEN);

    const roadMat = new THREE.MeshStandardMaterial({
      color: CFG.COLOR.ROAD, roughness: 0.85, metalness: 0.1
    });
    /* Lề và vạch làn dùng MeshBasicMaterial: chúng PHÁT sáng chứ không NHẬN sáng.
     * Dùng vật liệu nhận sáng ở đây thì lề sẽ tối dần theo khoảng cách tới đèn và
     * trông như bẩn chứ không như neon. */
    const lineMat = new THREE.MeshBasicMaterial({ color: CFG.COLOR.LANE_LINE });

    /* Vạch ngang: rộng gần hết mặt đường, mỏng, và mờ hơn vạch làn — nó là nhịp nền chứ
     * không phải thông tin cần đọc, nên không được cạnh tranh với chướng ngại. */
    const rungGeo = new THREE.BoxGeometry(ROAD_W * 0.92, 0.02, 0.22);
    const rungMat = new THREE.MeshBasicMaterial({
      color: CFG.COLOR.RUNG, transparent: true, opacity: 0.5, depthWrite: false
    });

    for (let i = 0; i < SEG_COUNT; i++) {
      const g = new THREE.Group();

      const road = new THREE.Mesh(roadGeo, roadMat);
      road.position.y = -0.2;          // mặt trên của hộp nằm đúng y = 0
      g.add(road);

      /* Mỗi đoạn một vật liệu lề RIÊNG. Tốn thêm chút, nhưng nhờ vậy phase 05 chuyển
       * màu dần từ đoạn này sang đoạn kia được, thay vì cả con đường đổi màu chớp một
       * cái — chuyển dần đọc được là "đang tăng tốc", chớp một cái đọc được là lỗi. */
      const edgeMat = new THREE.MeshBasicMaterial({ color: CFG.COLOR.EDGE_STEPS[0] });
      edgeMats.push(edgeMat);

      const eL = new THREE.Mesh(edgeGeo, edgeMat);
      eL.position.set(-ROAD_W / 2 - 0.09, 0.05, 0);
      g.add(eL);

      const eR = new THREE.Mesh(edgeGeo, edgeMat);
      eR.position.set(ROAD_W / 2 + 0.09, 0.05, 0);
      g.add(eR);

      /* Hai vạch chia ba làn, đặt ở ranh giới giữa các làn. */
      for (let k = 0; k < CFG.LANES - 1; k++) {
        const line = new THREE.Mesh(lineGeo, lineMat);
        line.position.set(-ROAD_W / 2 + CFG.LANE_W * (k + 1), 0.01, 0);
        g.add(line);
      }

      /* VẠCH NGANG — thứ làm mắt ĐỌC ĐƯỢC TỐC ĐỘ.
       *
       * Không có chúng, mặt đường là một dải màu đồng đều: nhân vật lao 20 m/s mà nền
       * dưới chân trông như đứng yên, và người chơi báo "tối thui". Vạch ngang trôi qua
       * đều đặn là tín hiệu duy nhất cho biết mình đang đi nhanh cỡ nào — chính là thứ
       * mọi game đua xe dùng, và lý do đường cao tốc có vạch đứt.
       *
       * Bốn vạch mỗi đoạn, cách nhau 6 m. Đủ dày để đọc ở tốc độ trần (26 m/s cho ~4
       * vạch mỗi giây) mà không thành sọc rằn ở tốc độ đầu. */
      for (let k = 0; k < 4; k++) {
        const rung = new THREE.Mesh(rungGeo, rungMat);
        rung.position.set(0, 0.012, SEG_LEN / 2 - 3 - k * 6);
        g.add(rung);
      }

      const z = -i * SEG_LEN;
      g.position.z = z;
      scene.add(g);
      segments.push({ group: g, z });
    }

    headZ = -(SEG_COUNT - 1) * SEG_LEN;
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
        s.group.position.z = s.z;
      }
    }
  }

  /* Đổi màu lề — `main.js` gọi khi lên bậc tốc độ. */
  function setEdgeColor(hex) {
    for (let i = 0; i < edgeMats.length; i++) edgeMats[i].color.setHex(hex);
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
      s.group.position.z = s.z;
    }
    setEdgeColor(CFG.COLOR.EDGE_STEPS[0]);
  }

  /* Chỉ dùng để chẩn đoán và cho bộ kiểm — trả z của từng đoạn. */
  const zList = () => segments.map(s => s.z);

  return { build, update, reset, setEdgeColor, zList, SEG_LEN, SEG_COUNT };
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
 * Pool sẵn theo từng loại, không bao giờ `new` trong ván. Hình học dùng chung một khối
 * đơn vị rồi co giãn — nhờ vậy cả game chỉ có một BoxGeometry cho mọi chướng ngại.
 */

ND.View = ND.View || {};

ND.View.Obstacle = (function () {
  const C = ND.CFG;

  const MAU = {
    wall:   { than: 0x2a0d2e, vien: 0xff3d9a },   // hồng — né sang bên
    hurdle: { than: 0x33270a, vien: 0xffc93d },   // vàng — nhảy
    beam:   { than: 0x0c2a33, vien: 0x3ddcff },   // lam — cúi
    tube:   { than: 0x0c2a33, vien: 0x3ddcff }    // lam — cúi, và giữ
  };

  const MOI_LOAI = 10;          // đủ cho cửa sổ 90 m; chunk dày nhất có 3 vật cùng ô
  const pools = {};             // type -> [{ than, vien }]

  function build(scene) {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const geoVien = new THREE.BoxGeometry(1, 1, 1);

    for (const type of Object.keys(ND.Data.Obstacles.TYPES)) {
      const m = MAU[type] || MAU.wall;
      pools[type] = [];
      for (let i = 0; i < MOI_LOAI; i++) {
        /* Hai lớp: khối đặc tối bên trong, khung dây sáng bọc ngoài. Chỉ khung dây thì
         * nhìn xuyên qua được và mất cảm giác đặc; chỉ khối đặc thì chìm nghỉm vào nền
         * tối. Hai lớp cho ra đúng thứ neon: viền rực, ruột sâu. */
        const than = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: m.than }));
        const vien = new THREE.Mesh(geoVien, new THREE.MeshBasicMaterial({ color: m.vien, wireframe: true }));
        than.visible = vien.visible = false;
        scene.add(than, vien);
        pools[type].push({ than, vien });
      }
    }
  }

  /* Gán danh sách vật đang hoạt động vào pool. Vượt pool thì bỏ qua — vật ở xa nhất
   * không hiện, mà xa nhất thì đằng nào cũng chìm trong sương mù. */
  function update(list) {
    const dung = {};
    for (const type in pools) dung[type] = 0;

    for (let i = 0; i < list.length; i++) {
      const ob = list[i];
      const pool = pools[ob.type];
      if (!pool) continue;
      const n = dung[ob.type];
      if (n >= pool.length) continue;
      dung[ob.type] = n + 1;

      const T = ND.Data.Obstacles.TYPES[ob.type];
      const x = ND.Rules.Lane.centerOf(ND.Data.Obstacles.laneOf(ob));
      const y = T.yBase + T.h / 2;

      const p = pool[n];
      p.than.visible = p.vien.visible = true;
      p.than.scale.set(T.w, T.h, T.d);
      p.than.position.set(x, y, ob.z);
      /* Khung dây phình ra một chút để nó nằm NGOÀI khối đặc. Cùng kích thước thì hai
       * mặt trùng nhau và GPU chọn ngẫu nhiên mặt nào ở trên — ra vệt lốm đốm chạy loạn
       * khi camera đổi góc. */
      p.vien.scale.set(T.w * 1.01, T.h * 1.01, T.d * 1.005);
      p.vien.position.set(x, y, ob.z);
    }

    for (const type in pools) {
      const pool = pools[type];
      for (let i = dung[type]; i < pool.length; i++) {
        pool[i].than.visible = pool[i].vien.visible = false;
      }
    }
  }

  return { build, update, MAU };
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

  let root, hip, legL, legR, armL, armR, shadow;
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
    shadow.material.opacity = 0.45 * (1 - cao * 0.8);
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
 */

ND.View = ND.View || {};

ND.View.Fx = (function () {
  const SO_VET = 26;
  const SO_MANH = 40;

  let vets = [], manhs = [], dungManh = 0;
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
    const geoVet = new THREE.BoxGeometry(0.05, 0.05, 1);
    const matVet = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55 });
    for (let i = 0; i < SO_VET; i++) {
      const m = new THREE.Mesh(geoVet, matVet);
      m.visible = false;
      scene.add(m);
      vets.push({ mesh: m, x: 0, y: 0, z: 0 });
    }

    const geoManh = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    for (let i = 0; i < SO_MANH; i++) {
      const m = new THREE.Mesh(geoManh, new THREE.MeshBasicMaterial({ color: 0xffffff }));
      m.visible = false;
      scene.add(m);
      manhs.push({ mesh: m, vx: 0, vy: 0, vz: 0, life: 0 });
    }
  }

  /* Nổ tại chỗ vừa phá khối. */
  function burst(x, y, z, mau) {
    for (let k = 0; k < 10; k++) {
      const p = manhs[dungManh];
      dungManh = (dungManh + 1) % SO_MANH;      // vòng tròn: quá tay thì đè lên mảnh cũ nhất
      p.mesh.visible = true;
      p.mesh.material.color.setHex(mau);
      p.mesh.position.set(x, y, z);
      p.mesh.scale.setScalar(0.6 + nn() * 0.8);
      p.vx = (nn() - 0.5) * 9;
      p.vy = 1.5 + nn() * 7;
      p.vz = (nn() - 0.5) * 9;
      p.life = 0.55;
    }
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
    for (let i = 0; i < vets.length; i++) {
      const v = vets[i];
      if (!bat) { v.mesh.visible = false; continue; }
      if (!v.mesh.visible) {
        v.mesh.visible = true;
        v.x = (nn() - 0.5) * 16;
        v.y = 0.2 + nn() * 6;
        v.z = camZ - 20 - nn() * 45;
      }
      /* Vệt trôi VỀ PHÍA camera nhanh hơn cả tốc độ chạy — chính chênh lệch đó tạo cảm
       * giác vượt lên chứ không phải bản thân tốc độ. */
      v.z += (s.speed * 1.9) * dt;
      if (v.z > camZ + 4) v.mesh.visible = false;      // qua vai rồi thì thả về pool
      v.mesh.position.set(v.x, v.y, v.z);
      v.mesh.scale.z = 2.5 + s.speed * 0.12;
    }

    /* ---- mảnh nổ ---- */
    for (let i = 0; i < manhs.length; i++) {
      const p = manhs[i];
      if (p.life <= 0) { if (p.mesh.visible) p.mesh.visible = false; continue; }
      p.life -= dt;
      p.vy -= 26 * dt;                                  // rơi xuống
      p.mesh.position.x += p.vx * dt;
      p.mesh.position.y += p.vy * dt;
      p.mesh.position.z += p.vz * dt;
      p.mesh.rotation.x += dt * 7;
      p.mesh.rotation.y += dt * 5;
      p.mesh.scale.multiplyScalar(1 - dt * 1.4);        // teo dần thay cho mờ dần
      if (p.life <= 0) p.mesh.visible = false;
    }

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
    manhs.forEach(p => { p.life = 0; p.mesh.visible = false; });
    vets.forEach(v => { v.mesh.visible = false; });
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
      ND.View.Fx.burst(s.x, s.y + 1.0, s.z - 1.5, mau ? mau.vien : 0xffffff);
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
    if (!Portal.Auth || !Portal.Auth.user) { nhan('Đăng nhập để xem bảng xếp hạng.'); return; }

    const cua = tabHienTai;
    dangTai = true;
    nhan('Đang tải…');

    try {
      const truong = cua === 'week' ? 'weekMeters' : 'bestMeters';
      const opts = { limit: SO_DONG };
      if (cua === 'week') opts.where = ['weekStart', '==', ND.CloudAdapter.tuanNay()];

      const rows = await Portal.Rank.top('dashScores', truong, opts);
      if (cua !== tabHienTai) return;            // người chơi đã đổi tab trong lúc chờ

      const co = rows.filter(r => (r[truong] || 0) > 0);
      if (!co.length) {
        nhan(cua === 'week'
          ? 'Tuần này chưa ai chạy. Chạy một ván là đứng đầu bảng.'
          : 'Chưa có ai trên bảng.');
        return;
      }

      body.textContent = '';
      const uid = Portal.Auth.user.uid;
      for (const r of co) {
        const d = document.createElement('div');
        d.className = 'rank-dong' + (r.uid === uid ? ' minh' : '');

        const pos = document.createElement('span');
        pos.className = 'rank-pos';
        pos.textContent = '#' + r.pos;           // `pos`, KHÔNG phải `rank`

        const ten = document.createElement('span');
        ten.className = 'rank-ten';
        ten.textContent = r.name || 'Người chạy';   // textContent, không innerHTML

        const so = document.createElement('span');
        so.className = 'rank-so';
        so.textContent = soDep(r[truong] || 0) + ' m';

        d.append(pos, ten, so);
        body.appendChild(d);
      }
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
  let root, elTieuDe, elSo, elPhu, elNut, elSkin, elSlotXepHang, elToast;
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

    elPhu = document.createElement('div');
    elPhu.className = 'man-phu';

    elNut = document.createElement('button');
    elNut.className = 'man-nut';
    elNut.type = 'button';

    /* `pointerdown` chứ không `click`: trên di động `click` đến sau ~100 ms và nút cảm
     * giác lờ đờ. Đây là thứ người chơi bấm nhiều nhất, nên nó phải nhạy nhất. */
    elNut.addEventListener('pointerdown', e => { e.preventDefault(); batDau(); });
    elNut.addEventListener('click', e => e.preventDefault());

    elSkin = document.createElement('div');
    elSkin.className = 'skin-hang';

    elSlotXepHang = document.createElement('div');
    elSlotXepHang.id = 'slot-xephang';

    hop.append(elTieuDe, elSo, elPhu, elNut, elSkin, elSlotXepHang);
    root.appendChild(hop);
    parent.appendChild(root);

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
    elPhu.textContent = kyLuc > 0
      ? 'Kỷ lục ' + soDep(kyLuc) + ' m  ·  ◈ ' + soDep(ND.Store.wallet().shards)
      : '← → đổi làn · ↑ nhảy · ↓ cúi (giữ để trượt dài)';
    elNut.textContent = 'CHẠY';
    veSkin();
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

    /* Nói RÕ điểm đến từ đâu khi có thưởng phá khối — nếu không người chơi thấy con số
     * lớn hơn số mét mình vừa nhìn trên HUD và tưởng game tính sai. */
    const phan = [];
    if (s.bonusMeters > 0) phan.push(soDep(Math.floor(s.meters)) + ' m chạy + ' + soDep(s.bonusMeters) + ' m phá khối');
    if (s.shards > 0) phan.push('◈ ' + soDep(s.shards));
    if (!moi && kyLuc > 0) phan.push('kỷ lục ' + soDep(kyLuc) + ' m');
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

  /* ---------- chọn skin ---------- */
  function veSkin() {
    elSkin.textContent = '';
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
      /* Skin chưa mở thì hiện GIÁ chứ không hiện tên: người chơi cần biết còn thiếu bao
       * nhiêu ngọc, chứ tên thì đằng nào cũng đọc được ở ô đã mở. */
      nhan.textContent = daMo ? sk.ten : '◈ ' + soDep(sk.gia);

      b.append(cham, nhan);
      b.addEventListener('pointerdown', e => { e.preventDefault(); bamSkin(sk); });
      elSkin.appendChild(b);
    }
  }

  function bamSkin(sk) {
    if (!ND.Store.daMo(sk.id)) {
      if (!ND.Store.muaSkin(sk.id)) {
        const thieu = sk.gia - ND.Store.wallet().shards;
        toast('Còn thiếu ◈ ' + soDep(thieu));
        return;
      }
      toast('Đã mở ' + sk.ten);
    }
    ND.Store.chonSkin(sk.id);
    ND.View.Runner.applySkin(ND.Store.skinDangMac());
    ND.CloudAdapter.luu();
    veSkin();
    moChoi();
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

  return { build, moChoi, moChet, setKyLuc, toast, veSkin };
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
    ND.View.Obstacle.build(scene);
    ND.View.Pickup.build(scene);
    ND.View.Fx.build(scene);
    ND.View.Runner.build(scene);

    const ui = document.getElementById('ui');
    ND.UI.Hud.build(ui);
    ND.UI.Screens.build(ui, vanMoi);
    ND.UI.InputBind.bind(canvas);

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
      ND.View.Obstacle.update(state.obstacles);
      ND.View.Pickup.update(state.pickups, tView);

      ND.View.Scene.follow(x, y, z, dtThuc || ND.CFG.LOOP.STEP);
      ND.View.Track.update(ND.View.Scene.camera.position.z);

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