/* dash.js — vẽ dashboard cân bằng từ số liệu Dash.Data.crunch() */

Dash.UI = {
  rows: [],
  charts: {},
  $: id => document.getElementById(id),

  pct: v => (v == null ? '—' : Math.round(v * 100) + '%'),
  num: (v, d = 0) => (v == null ? '—' : (+v).toLocaleString('vi-VN', { maximumFractionDigits: d })),
  esc: s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])),

  async init() {
    ['fCh', 'fQuit'].forEach(id => this.$(id).addEventListener('change', () => this.draw()));
    this.$('fDays').addEventListener('change', () => this.reload());
    this.$('btnReload').addEventListener('click', () => this.reload());
    Chart.defaults.color = '#9fb3d9';
    Chart.defaults.borderColor = 'rgba(120,160,255,.12)';
    Chart.defaults.font.family = 'system-ui, sans-serif';
    await this.reload();
  },

  async reload() {
    const st = this.$('status');
    st.textContent = 'Đang tải log trận…';
    try {
      this.rows = await Dash.Data.load(+this.$('fDays').value);
      st.textContent = `${this.rows.length.toLocaleString('vi-VN')} bản ghi · cập nhật ${new Date().toLocaleTimeString('vi-VN')}`
        + (this.rows.length >= Dash.Data.LIMIT ? ' · CHẠM TRẦN — thu hẹp khoảng thời gian' : '');
      this.draw();
    } catch (e) {
      if (e && e.code === 'not-admin') return this._gate(e.user);
      st.textContent = 'Không tải được: ' + Portal.FB.err(e);
      console.error(e);
    }
  },

  /* chưa đăng nhập / không phải quản trị: chặn cả trang, chỉ còn nút đăng nhập */
  _gate(u) {
    document.body.classList.add('locked');
    this.$('status').innerHTML = u
      ? `Tài khoản <b>${this.esc(u.email || u.displayName || '?')}</b> không có quyền xem log trận.
         <button id="btnOut">ĐỔI TÀI KHOẢN</button>`
      : 'Trang dành cho quản trị. <button id="btnIn">ĐĂNG NHẬP GOOGLE</button>';
    const go = async fn => { try { await fn(); location.reload(); } catch (err) { this.$('status').append(' ' + Portal.FB.err(err)); } };
    if (this.$('btnIn')) this.$('btnIn').onclick = () => go(() => Dash.Data.login());
    if (this.$('btnOut')) this.$('btnOut').onclick = () => go(async () => { await Dash.Data.logout(); await Dash.Data.login(); });
  },

  draw() {
    const d = Dash.Data.crunch(this.rows, { ch: this.$('fCh').value, quit: this.$('fQuit').checked });
    this._kpis(d.kpi);
    this._winChart(d.levels);
    this._waveChart(d.waves);
    this._hard(d.hard);
    this._table(d.levels);
  },

  _kpis(k) {
    const box = (lb, v, cls = '') => `<div class="kpi ${cls}"><b>${v}</b><span>${lb}</span></div>`;
    this.$('kpis').innerHTML = box('Số trận', this.num(k.runs)) + box('Người chơi', this.num(k.players))
      + box('Tỉ lệ thắng', this.pct(k.win), k.win < 0.5 ? 'bad' : k.win > 0.85 ? 'good' : '')
      + box('Giây / trận', this.num(k.time)) + box('Bỏ ngang', this.pct(k.quit))
      + box('Màn cao nhất', k.maxLv > 60 ? 'Vô tận ' + k.maxLv : k.maxLv || '—');
  },

  _chart(id, cfg) {
    if (this.charts[id]) this.charts[id].destroy();
    this.charts[id] = new Chart(this.$(id), cfg);
  },

  _winChart(levels) {
    const L = levels;
    this._chart('cWin', {
      data: {
        labels: L.map(l => l.key),
        datasets: [
          { type: 'bar', label: 'Thắng %', yAxisID: 'y', data: L.map(l => Math.round(l.win * 100)),
            backgroundColor: L.map(l => l.win < 0.5 ? '#ff5c7a' : l.win > 0.9 ? '#4dff9f' : '#ffd23f') },
          { type: 'line', label: 'Số trận', yAxisID: 'y2', data: L.map(l => l.n),
            borderColor: '#7ae0ff', backgroundColor: '#7ae0ff', pointRadius: 2, tension: .25 }
        ]
      },
      options: {
        maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
        scales: { y: { min: 0, max: 100, title: { display: true, text: 'thắng %' } },
          y2: { position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: 'trận' } } }
      }
    });
  },

  _waveChart(waves) {
    const keys = Object.keys(waves).sort((a, b) => (a === 'TRÙM') - (b === 'TRÙM') || a.localeCompare(b, 'vi', { numeric: true }));
    this._chart('cWave', {
      type: 'bar',
      data: { labels: keys, datasets: [{ label: 'Số trận thua', data: keys.map(k => waves[k]),
        backgroundColor: keys.map(k => (k === 'TRÙM' ? '#ff8a2b' : '#c58cff')) }] },
      options: { maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
  },

  _hard(list) {
    this.$('hard').innerHTML = list.length
      ? list.map(l => `<li><b>Màn ${this.esc(l.key)}</b> <i>${this.esc(l.chunk)}</i>
          <span class="${l.win < 0.5 ? 'bad' : ''}">thắng ${this.pct(l.win)}</span> · ${l.n} trận · máu còn ${this.pct(l.hpWin)}</li>`).join('')
      : '<li class="dim">Chưa đủ dữ liệu (cần ≥ 5 trận/màn)</li>';
  },

  _table(levels) {
    this.$('tbl').querySelector('tbody').innerHTML = levels.map(l => `<tr>
      <td><b>${this.esc(l.key)}</b></td><td>${this.esc(l.chunk)}</td><td>${l.n}</td><td>${l.players}</td>
      <td class="${l.win < 0.5 ? 'bad' : l.win > 0.9 ? 'good' : ''}">${this.pct(l.win)}</td>
      <td>${this.pct(l.quit)}</td><td>${this.num(l.tWin)}</td><td>${this.pct(l.hpWin)}</td>
      <td>${this.num(l.hits, 1)}</td><td>${this.num(l.bombs, 1)}</td><td>${this.num(l.esc, 1)}</td>
      <td>${this.num(l.pw)}</td><td>${this.num(l.evo)}</td></tr>`).join('')
      || '<tr><td colspan="13" class="dim">Chưa có log trận trong khoảng này</td></tr>';
  }
};

Dash.UI.init();
