/* dash-demo.js — bản ghi GIẢ cho `?demo`: xem bố cục dashboard trước khi có ván thật, và để kiểm trang mà không cần
 * tài khoản quản trị. Cùng hình dạng với bản ghi của games/cat-chess/js/cloud-telemetry.js. Hạt giống cố định → mỗi
 * lần mở ra cùng một bộ số, so ảnh chụp trước / sau được.
 */

window.CDash = window.CDash || {};

CDash.Demo = {
  rows(days) {
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const cats = [['trang', 400, 0.9], ['leo', 500, 0.8], ['muc', 700, 0.62], ['vang', 900, 0.5],
      ['tamthe', 1050, 0.38], ['but', 1250, 0.3], ['bao', 1350, 0.34], ['daika', 1600, 0.12]];
    const devs = ['8/2.6/4/m', '6/3/4/m', '4/2/2/m', '12/1/8/d', '8/1.3/8/d'];
    const out = [];
    for (let i = 0; i < 40 + days * 22; i++) {
      const [cat, elo, p] = cats[Math.min(cats.length - 1, Math.floor(rnd() * rnd() * cats.length * 1.6))];
      const q = rnd(), res = q < 0.1 ? 'quit' : q < 0.1 + p * 0.85 ? 'win' : q < 0.95 ? 'loss' : 'draw';
      const dev = devs[Math.floor(rnd() * devs.length)], phone = /\/m$/.test(dev), slow = dev === '4/2/2/m';
      const ply = res === 'quit' ? 2 + Math.floor(rnd() * 20) : 20 + Math.floor(rnd() * 70);
      const ft95 = Math.round(((phone ? 18 : 12) + rnd() * (slow ? 40 : 14)) * 10) / 10;
      out.push({
        v: 1, ch: rnd() < 0.55 ? 'zingplay' : 'portal', pk: 'p' + Math.floor(rnd() * 60), cat, elo, col: rnd() < 0.8 ? 'w' : 'b',
        res, kind: res === 'quit' ? 'quit' : res === 'draw' ? (rnd() < 0.5 ? 'stalemate' : 'threefold') : rnd() < 0.2 && res === 'loss' ? 'resign' : 'checkmate',
        ply, t: Math.round(ply * (6 + rnd() * 10)), hint: Math.floor(rnd() * rnd() * 5), undo: Math.floor(rnd() * rnd() * 4),
        blun: Math.floor(rnd() * 3), mat: Math.round((rnd() - 0.4) * 14), rs: rnd() < 0.1, fx: true, ef: rnd() < 0.01,
        ft50: phone ? 16.7 : 16.6, ft95, jank: slow ? Math.floor(rnd() * 12) : Math.floor(rnd() * 2), dev,
        at: Date.now() - Math.floor(rnd() * days * 864e5)
      });
    }
    return out;
  }
};
