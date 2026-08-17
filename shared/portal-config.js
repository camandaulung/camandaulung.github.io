/* portal-config.js — khai bao du an Firebase, MOT cho duy nhat cho ca cong game
 *
 * Truoc day moi game mot ban sao cua file nay. Doi khoa la phai nho sua N cho —
 * chac chan co lan quen mot.
 *
 * DE TRONG apiKey = moi game van chay binh thuong o che do an danh: nut dang nhap
 * tu an, bang xep hang tu an, tien do van luu trong may. Khong co gi vo.
 *
 * apiKey cua Firebase la khoa CONG KHAI, de trong ma nguon la dung thiet ke —
 * chan truy cap la viec cua luat Firestore, khong phai cua viec giau khoa.
 *
 * Ba viec phai lam tren Console (chi lam MOT LAN cho ca cong game):
 *   1. Authentication > Sign-in method > bat Google
 *   2. Authentication > Settings > Authorized domains > them camandaulung.github.io
 *   3. Firestore > Rules > dan luat cho tung collection cua tung game
 */

window.Portal = window.Portal || {};

Portal.CONFIG = {
  apiKey: 'AIzaSyB73g3D3zRgvfAFX4KCKkEjgVACM93YtbY',
  projectId: 'minigame-5d3ee',
  appId: '1:1098790709614:web:7758724fb27ca7cd80f97f',
  authDomain: 'minigame-5d3ee.firebaseapp.com'
};
