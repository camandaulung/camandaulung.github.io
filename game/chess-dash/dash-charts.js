/* dash-charts.js — ba kiểu biểu đồ HTML thuần cho chess-dash (không Chart.js: ba kiểu này chỉ là thanh, chia theo %
 * thì CSS làm thẳng, khỏi nạp ~200 KB từ CDN).
 *
 * Luật vẽ (skill dataviz): màu theo SERIES, thứ tự slot cố định (--s1…--s4 trong dash.css); khe 2 px giữa các khúc;
 * chữ luôn mang màu chữ, không mang màu series; mỗi khúc có tooltip khi rê. Bảng số bên dưới là lối đọc thay thế.
 */

window.CDash = window.CDash || {};

CDash.Charts = (function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pct = v => (v == null ? '–' : Math.round(v * 100) + '%');
  let tip = null;

  /* Một tooltip cho cả trang, đi theo con trỏ; nội dung đọc từ data-tip của phần tử đang rê.
     BẪY: `dataset` GIẢI MÃ thực thể của thuộc tính rồi mới vào innerHTML — chữ từ log (ai cũng ghi được, vd `cat`) phải
     esc HAI lớp: esc(chữ) trong HTML của tooltip, rồi tipAttr() esc cả chuỗi khi nhét vào thuộc tính. */
  const tipAttr = html => `data-tip="${esc(html)}"`;
  function bindTips(root) {
    if (!tip) { tip = document.createElement('div'); tip.className = 'tip'; tip.hidden = true; document.body.appendChild(tip); }
    root.addEventListener('pointermove', e => {
      const t = e.target.closest('[data-tip]');
      if (!t || !root.contains(t)) { tip.hidden = true; return; }
      tip.innerHTML = t.dataset.tip;
      tip.hidden = false;
      const w = tip.offsetWidth, x = Math.min(e.clientX + 14, innerWidth - w - 8);
      tip.style.left = Math.max(8, x) + 'px';
      tip.style.top = (e.clientY + 16) + 'px';
    });
    root.addEventListener('pointerleave', () => { tip.hidden = true; });
  }

  /* Legend luôn có khi ≥ 2 series: danh tính không bao giờ chỉ bằng màu */
  const legend = series => '<div class="legend">' + series.map((s, i) =>
    `<span><i class="sw s${i + 1}"></i>${esc(s.label)}</span>`).join('') + '</div>';

  return {
    /* Thanh 100 % chồng theo hàng. rows: [{ label, sub, parts: {key: share}, counts: {key: n} }], series: [{key, label}] */
    stack100(el, rows, series) {
      el.innerHTML = legend(series) + rows.map(r => {
        const segs = series.map((s, i) => {
          const v = r.parts[s.key] || 0;
          if (!v) return '';
          const lab = v >= 0.09 ? `<b>${pct(v)}</b>` : '';
          return `<span class="seg s${i + 1}" style="flex:${v}" ${tipAttr(`<b>${esc(r.label)}</b> · ${esc(s.label)} ${pct(v)} (${r.counts[s.key] || 0} ván)`)}>${lab}</span>`;
        }).join('');
        return `<div class="srow"><div class="slab">${esc(r.label)}<small>${esc(r.sub || '')}</small></div><div class="sbar">${segs || '<span class="empty">chưa có ván</span>'}</div></div>`;
      }).join('');
      bindTips(el);
    },

    /* Cột chồng theo ngày. days: [{ day, by: {key: n} }]. Trục y một vạch giữa + đỉnh: nhìn ra "nhiều / ít" là đủ */
    columns(el, days, series) {
      const tot = d => series.reduce((s, x) => s + (d.by[x.key] || 0), 0);
      const max = Math.max(1, ...days.map(tot)), step = Math.max(1, Math.ceil(days.length / 10));
      const cols = days.map((d, i) => {
        const t = tot(d), segs = series.map((s, j) => {
          const v = d.by[s.key] || 0;
          return v ? `<span class="cseg s${j + 1}" style="height:${v / max * 100}%"></span>` : '';
        }).join('');
        const tipTxt = `<b>${d.day}</b> · ${t} ván` + series.map(s => d.by[s.key] ? `<br>${esc(s.label)}: ${d.by[s.key]}` : '').join('');
        return `<div class="col" ${tipAttr(tipTxt)}><div class="cstack">${segs}</div><span class="cx">${i % step === 0 || i === days.length - 1 ? d.day.slice(5) : ''}</span></div>`;
      }).join('');
      el.innerHTML = legend(series) + `<div class="cols"><div class="grid"><span>${max}</span><span>${Math.round(max / 2)}</span></div>${cols}</div>`;
      bindTips(el);
    },

    /* Thanh ngang một series (đếm). items: [{ label, n, share }] */
    hbars(el, items) {
      const max = Math.max(1, ...items.map(x => x.n));
      el.innerHTML = items.length ? items.map(x =>
        `<div class="hrow" ${tipAttr(`<b>${esc(x.label)}</b> · ${x.n} ván (${pct(x.share)})`)}><span class="hlab">${esc(x.label)}</span>` +
        `<span class="htrack"><span class="hbar s1" style="width:${x.n / max * 100}%"></span></span><span class="hval">${x.n} · ${pct(x.share)}</span></div>`
      ).join('') : '<p class="dim">Chưa có ván.</p>';
      bindTips(el);
    },
    esc, pct
  };
})();
