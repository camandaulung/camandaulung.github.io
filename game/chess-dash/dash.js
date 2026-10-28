/* dash.js — vẽ dashboard Cờ vua với mèo: KPI, kết quả theo mèo, ván theo ngày, kiểu kết thúc, khung hình máy thật,
 * ván gần nhất. Số tính ở dash-data.js (crunch); file này chỉ lọc, gọi và trình bày.
 * `?demo` = dữ liệu giả (dash-demo.js), không cần đăng nhập — xem bố cục trước khi có ván thật.
 */

(function () {
  const D = CDash.Data, C = CDash.Charts, esc = C.esc, pct = C.pct;
  const $ = id => document.getElementById(id);
  // Ép về số ở MỌI ô số: chuỗi lạ trong log (luật chặn, nhưng dashboard không tin mù) thành '–', không thành HTML
  const num = (v, d = 1) => { if (v == null) return '–'; v = Number(v); return !isFinite(v) ? '–' : Number.isInteger(v) ? String(v) : v.toFixed(d); };
  const DEMO = /[?&]demo\b/.test(location.search);
  const RES = [{ key: 'win', label: 'Người thắng' }, { key: 'loss', label: 'Mèo thắng' }, { key: 'draw', label: 'Hoà' }, { key: 'quit', label: 'Bỏ giữa chừng' }];
  const CH = [{ key: 'portal', label: 'portal' }, { key: 'zingplay', label: 'zingplay.dev' }, { key: 'dev', label: 'máy dev' }];
  const RES_VN = { win: 'Thắng', loss: 'Thua', draw: 'Hoà', quit: 'Bỏ' };
  let rows = [], loadedDays = 0;

  const opt = () => ({ ch: $('fCh').value, quit: $('fQuit').checked, days: +$('fDays').value });

  function kpis(k) {
    const items = [
      [k.games, 'Ván', `${k.players} người chơi`], [pct(k.win), 'Người thắng', $('fQuit').checked ? 'tính cả ván bỏ' : 'trên ván đã xong'],
      [pct(k.quit), 'Bỏ giữa chừng', 'mở ván mới khi ván cũ còn dở'], [num(k.ply, 0), 'Nước (trung vị)', `${num(k.min)} phút`],
      [num(k.hint, 2), 'Gợi ý / ván', `đi lại ${num(k.undo, 2)} / ván`],
      [k.ft95 == null ? '–' : num(k.ft95) + ' ms', 'Khung p95 khi quân trượt', `${pct(k.slow)} ván lỡ nhịp · máy thật`],
      [k.engineFail, 'Ván hỏng engine', 'Stockfish không chạy được']
    ];
    $('kpis').innerHTML = items.map(([v, l, s], i) =>
      `<div class="kpi${i === 6 && k.engineFail ? ' bad' : ''}"><b>${v}</b><span>${l}</span><small>${s}</small></div>`).join('');
  }

  function catTable(cats) {
    $('tblCats').querySelector('tbody').innerHTML = cats.map(c => `<tr>
      <td>${esc(c.name)}</td><td>${num(c.elo, 0)}</td><td>${c.all}</td><td>${c.players}</td><td><b>${pct(c.winRate)}</b></td>
      <td>${pct(c.mix.draw)}</td><td>${pct(c.mix.loss)}</td><td>${pct(c.mix.quit)}</td><td>${num(c.ply, 0)}</td><td>${num(c.min)}</td>
      <td>${num(c.hint, 2)}</td><td>${num(c.undo, 2)}</td><td>${num(c.blun, 2)}</td><td>${num(c.mat, 0)}</td>
      <td class="flags">${c.flags.map(f => `<span class="flag${f.soft ? ' soft' : ''}">${esc(f.t)}</span>`).join('')}</td></tr>`).join('')
      || '<tr><td colspan="15" class="dim">Chưa có ván.</td></tr>';
  }

  function devTable(devs) {
    $('tblDev').querySelector('tbody').innerHTML = devs.map(d => `<tr class="${d.group ? 'grp' : ''}">
      <td>${esc(d.key)}</td><td>${d.n}</td><td>${num(d.ft50)}</td><td>${num(d.ft95)}</td><td>${num(d.p90)}</td>
      <td>${pct(d.slow)}</td><td>${num(d.jank)}</td></tr>`).join('')
      || '<tr><td colspan="7" class="dim">Chưa có ván nào đo khung hình.</td></tr>';
  }

  function recent(list) {
    const t = at => new Date(at).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
    $('tblRecent').querySelector('tbody').innerHTML = list.map(r => `<tr>
      <td>${t(r.at)}</td><td>${esc(r.ch)}</td><td>${esc(D.NAMES[r.cat] || r.cat || '')}</td><td>${r.col === 'b' ? 'Đen' : 'Trắng'}</td>
      <td class="res-${esc(r.res)}">${RES_VN[r.res] || esc(r.res)}</td><td>${esc(D.KIND[r.kind] || r.kind || '')}</td><td>${num(r.ply, 0)}</td><td>${num(r.t / 60)}</td>
      <td>${num(r.hint || 0, 0)}</td><td>${num(r.undo || 0, 0)}</td><td>${r.ft95 == null ? '–' : num(r.ft95)}</td><td>${esc(r.dev || '')}</td></tr>`).join('')
      || '<tr><td colspan="12" class="dim">Chưa có ván.</td></tr>';
  }

  function render() {
    const o = opt(), x = D.crunch(rows, o);
    kpis(x.kpi);
    C.stack100($('cCats'), x.cats.map(c => ({ label: c.name, sub: `Elo ${num(c.elo, 0)} · ${c.all} ván`, parts: c.mix, counts: c.count })), RES);
    C.columns($('cDays'), x.days, CH.filter(s => !o.ch || s.key === o.ch).filter(s => o.ch === 'dev' || s.key !== 'dev'));
    C.hbars($('cKinds'), x.kinds);
    catTable(x.cats); devTable(x.devices); recent(x.recent);
    $('status').textContent = (DEMO ? 'DỮ LIỆU GIẢ (?demo) · ' : '') + `${x.kpi.games} ván trong ${o.days} ngày · tải lúc ` +
      new Date().toLocaleTimeString('vi-VN');
  }

  async function load() {
    const days = +$('fDays').value;
    $('status').textContent = 'Đang tải…';
    try {
      rows = DEMO ? CDash.Demo.rows(days) : await D.load(days);
      loadedDays = days;
      document.body.classList.remove('locked');
      render();
    } catch (e) {
      if (e && e.code === 'not-admin') return gate(e.user);
      $('status').textContent = 'Không tải được: ' + (Portal.FB.err ? Portal.FB.err(e) : e.message);
    }
  }

  /* Chưa có quyền: giấu số, chỉ còn thanh trạng thái + nút đăng nhập (chặn thật ở luật Firestore) */
  function gate(u) {
    document.body.classList.add('locked');
    $('status').innerHTML = u
      ? `Tài khoản <b>${esc(u.email || '?')}</b> không có quyền xem log ván. <button id="btnOut">Đổi tài khoản</button>`
      : 'Đăng nhập Google bằng tài khoản quản trị để xem log ván. <button id="btnIn">Đăng nhập</button>';
    const go = async fn => { try { await fn(); location.reload(); } catch (err) { $('status').append(' ' + Portal.FB.err(err)); } };
    if ($('btnIn')) $('btnIn').onclick = () => go(() => D.login());
    if ($('btnOut')) $('btnOut').onclick = () => go(async () => { await D.logout(); await D.login(); });
  }

  /* Xuất log thô (JSON) để phân tích ngoài dashboard — đúng các bản ghi đang lọc theo kênh */
  function exportRaw() {
    const o = opt(), list = rows.filter(r => (o.ch ? r.ch === o.ch : r.ch !== 'dev'));
    if (!list.length) return void ($('status').textContent = 'Chưa có bản ghi nào để xuất.');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(list, null, 1)], { type: 'application/json' }));
    a.download = `chessRuns-${D.day(Date.now())}-${o.days}d.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  $('fCh').onchange = render;
  $('fQuit').onchange = render;
  $('fDays').onchange = () => (+$('fDays').value > loadedDays ? load() : render());
  $('btnReload').onclick = load;
  $('btnExport').onclick = exportRaw;
  load();
})();
