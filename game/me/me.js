/* me.js — trang hồ sơ: gom thành tích mọi game trong cổng về một chỗ
 *
 * HAI NGUỒN DỮ LIỆU, CỐ Ý TÁCH RỜI:
 *
 *   THÀNH TÍCH  đọc từ localStorage (`portal.summary.{game}`), do mã chung hạ xuống
 *               sau mỗi mốc lưu. Luôn có, kể cả chưa đăng nhập, kể cả mất mạng.
 *
 *   THỨ HẠNG    hỏi Firestore, chỉ khi đã đăng nhập. Hỏng thì bỏ trống, KHÔNG làm
 *               hỏng phần thành tích — hai thứ này không được kéo nhau xuống.
 *
 * TRANG NÀY KHÔNG BIẾT GÌ VỀ TỪNG GAME. Mọi thứ riêng của game đều đọc từ
 * `shared/portal-games.js`. Thêm game mới = thêm một dòng ở đó, không sửa file này.
 * Nếu thấy mình sắp viết `if (game.id === 'chess')` ở đây thì đã đi sai.
 */

(function () {
  const $ = s => document.querySelector(s);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;   // luôn textContent, không innerHTML
    return n;
  };

  /* ---------- đọc bản tóm tắt trong máy ---------- */
  function tomTat(gameId) {
    try {
      const raw = localStorage.getItem('portal.summary.' + gameId);
      if (!raw) return null;
      const o = JSON.parse(raw);
      return o && o.fields ? o : null;
    } catch (e) { return null; }
  }

  /* ---------- định dạng ---------- */
  function soDep(v) { return (v || 0).toLocaleString('vi-VN'); }

  function thoiGian(s) {
    const h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, ss = Math.floor(s % 60);
    const p = n => String(n).padStart(2, '0');
    return h ? h + ':' + p(m) + ':' + p(ss) : m + ':' + p(ss);
  }

  function giaTri(tc, fields) {
    const v = fields[tc.khoa];
    if (v === undefined || v === null) return '—';
    return tc.donVi === 'giây' ? thoiGian(v) : soDep(v);
  }

  function khiNao(ms) {
    const phut = Math.round((Date.now() - ms) / 60000);
    if (phut < 2) return 'vừa xong';
    if (phut < 60) return phut + ' phút trước';
    const gio = Math.round(phut / 60);
    if (gio < 24) return gio + ' giờ trước';
    return new Date(ms).toLocaleDateString('vi-VN');
  }

  /* ---------- một thẻ game ---------- */
  function theGame(g) {
    const t = tomTat(g.id);
    const card = el('article', 'game' + (t ? '' : ' trong'));

    const dau = el('div', 'game-dau');
    dau.appendChild(el('span', 'game-icon', g.bieuTuong || '🎮'));
    dau.appendChild(el('h2', 'game-ten', g.ten));
    card.appendChild(dau);

    if (!t) {
      card.appendChild(el('p', 'game-trong', 'Chưa chơi game này lần nào.'));
    } else {
      const grid = el('div', 'chi-so');
      g.tieuChi.forEach(tc => {
        const o = el('div', 'o');
        o.appendChild(el('span', 'o-nhan', tc.nhan));
        o.appendChild(el('b', 'o-val', giaTri(tc, t.fields)));
        if (tc.chinh) o.appendChild(el('span', 'o-hang', ''));   // chỗ điền thứ hạng
        grid.appendChild(o);
      });
      card.appendChild(grid);
      card.appendChild(el('p', 'game-khi', 'Cập nhật ' + khiNao(t.at)));
    }

    /* Đường dẫn ghép tại đây, không lấy sẵn từ file khai báo: file đó không biết
       trang gọi đang nằm ở đâu. Từ /game/me/ ra /game/{thuMuc}/. */
    const a = el('a', 'btn', t ? 'Chơi tiếp' : 'Chơi thử');
    a.href = '../' + g.thuMuc + '/';
    card.appendChild(a);

    card.dataset.game = g.id;
    return card;
  }

  /* ---------- thứ hạng: chỉ tiêu chí chính, chỉ khi đã đăng nhập ---------- */
  async function napHang(g) {
    const t = tomTat(g.id);
    if (!t) return;
    const tc = g.tieuChi.find(x => x.chinh);
    if (!tc) return;
    const v = t.fields[tc.khoa];
    if (v === undefined || v === null) return;

    const hang = await Portal.Rank.positionOf(g.scoreDoc, tc.khoa, v, { dir: tc.dir || 'desc' });
    const o = document.querySelector('[data-game="' + g.id + '"] .o-hang');
    if (!o) return;
    /* `null` = chưa tạo index, hoặc mất mạng. Để trống chứ đừng ghi "#null" —
       và tuyệt đối đừng ghi "#1", người chơi sẽ tin là thật. */
    if (hang === null) { o.textContent = ''; return; }
    o.textContent = 'hạng #' + hang;
    o.classList.add('co');
  }

  /* ---------- phần danh tính ở đầu trang ---------- */

  /* `Portal.Auth.onChange` bắn NHIỀU LẦN cho cùng một lần đăng nhập: một lần lúc đăng
     ký, một lần khi `busy` bật, một lần khi Firebase báo có phiên, một lần khi `busy`
     tắt. Ba lần cuối đều có `user`, nên nếu hỏi thứ hạng ở mỗi lần thì một lần mở
     trang tốn gấp đôi số lượt đọc mà kết quả giống hệt nhau. Nhớ uid đã hỏi rồi. */
  let uidDaHoiHang = null;

  function veDanhTinh(u) {
    const auth = $('#auth');
    auth.textContent = '';

    if (!Portal.Auth.available()) {
      $('#phu').textContent = 'Thành tích lưu trong máy này';
      return;
    }

    if (u) {
      $('#ten').textContent = u.name;
      $('#phu').textContent = 'Thành tích đã đồng bộ với tài khoản';
      const av = $('#ava');
      av.textContent = '';
      if (u.avatar) {
        const img = new Image();
        img.src = u.avatar; img.alt = '';
        img.onerror = () => { av.textContent = (u.name || '?').trim().charAt(0).toUpperCase(); };
        av.appendChild(img);
      } else {
        av.textContent = (u.name || '?').trim().charAt(0).toUpperCase();
      }

      const out = el('button', 'btn btn-nho', 'Đăng xuất');
      out.type = 'button';
      out.onclick = () => Portal.Auth.logout();
      auth.appendChild(out);

      if (uidDaHoiHang !== u.uid) {
        uidDaHoiHang = u.uid;
        Portal.GAMES.forEach(g => napHang(g));
      }
    } else {
      $('#ten').textContent = 'Khách';
      $('#phu').textContent = 'Thành tích lưu trong máy này — đăng nhập để giữ khi đổi máy';
      $('#ava').textContent = '?';

      const vao = el('button', 'btn btn-chinh', Portal.Auth.busy ? 'Đang xử lý…' : 'Đăng nhập Google');
      vao.type = 'button';
      vao.disabled = !!Portal.Auth.busy;
      vao.onclick = () => Portal.Auth.login();
      auth.appendChild(vao);

      // đăng xuất rồi thì xoá hết thứ hạng cũ, đừng để số của phiên trước nằm lại
      uidDaHoiHang = null;
      document.querySelectorAll('.o-hang').forEach(o => {
        o.textContent = ''; o.classList.remove('co');
      });
    }
  }

  /* ---------- khởi động ---------- */
  const ds = $('#ds');
  Portal.GAMES.forEach(g => ds.appendChild(theGame(g)));

  Portal.toast = text => {                 // mã chung báo lỗi đăng nhập qua đây
    const b = el('div', 'toast', text);
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 3500);
  };

  Portal.Auth.onChange(veDanhTinh);
  Portal.Auth.init();
})();
