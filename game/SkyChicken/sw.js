/* sw-template.js — mẫu service worker, build.mjs sẽ thay hai chỗ đánh dấu
 *
 * Khác bản viết tay trước đây ở hai điểm:
 *   - Tên cache lấy theo hash nội dung nên không phải nhớ tăng số bằng tay
 *   - Có kênh nhận lệnh SKIP_WAITING để game hỏi người chơi trước khi tải lại,
 *     thay vì tự đổi bản giữa lúc đang chơi
 */

const CACHE = 'sky-chicken-c05d5e01';

const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/style-a48eec00.css",
  "./assets/app-8a41da11.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./assets/fonts/chakra-petch-600-latin.woff2",
  "./assets/fonts/chakra-petch-600-viet.woff2",
  "./assets/fonts/chakra-petch-700-latin.woff2",
  "./assets/fonts/chakra-petch-700-viet.woff2",
  "./assets/art-game/bg-dune.webp",
  "./assets/art-game/bg-farm.webp",
  "./assets/art-game/bg-frost.webp",
  "./assets/art-game/bg-magma.webp",
  "./assets/art-game/bg-neon.webp",
  "./assets/art-game/bg-ocean.webp",
  "./assets/art-game/bg-scrap.webp",
  "./assets/art-game/bg-storm.webp",
  "./assets/art-game/bg-toxic.webp",
  "./assets/art-game/bg-void.webp",
  "./assets/art-game/boss-eagle.webp",
  "./assets/art-game/boss-hen.webp",
  "./assets/art-game/boss-neonRooster.webp",
  "./assets/art-game/boss-octopus.webp",
  "./assets/art-game/boss-penguin.webp",
  "./assets/art-game/boss-phoenix.webp",
  "./assets/art-game/boss-scrapDragon.webp",
  "./assets/art-game/boss-spider.webp",
  "./assets/art-game/boss-stormEye.webp",
  "./assets/art-game/boss-voidEgg.webp",
  "./assets/art-game/bossfx-aura.webp",
  "./assets/art-game/bossfx-charge-orb.webp",
  "./assets/art-game/bossfx-ink.webp",
  "./assets/art-game/bossfx-portal.webp",
  "./assets/art-game/bossfx-reticle.webp",
  "./assets/art-game/bossfx-sunburst.webp",
  "./assets/art-game/bosspart-beak.webp",
  "./assets/art-game/bosspart-blade.webp",
  "./assets/art-game/bosspart-fist.webp",
  "./assets/art-game/bosspart-rock.webp",
  "./assets/art-game/bullet-arrow.webp",
  "./assets/art-game/bullet-blast.webp",
  "./assets/art-game/bullet-boomer.webp",
  "./assets/art-game/bullet-bounce.webp",
  "./assets/art-game/bullet-dart.webp",
  "./assets/art-game/bullet-egg.webp",
  "./assets/art-game/bullet-laser.webp",
  "./assets/art-game/bullet-plasma.webp",
  "./assets/art-game/bullet-rocket.webp",
  "./assets/art-game/counter-brute.webp",
  "./assets/art-game/counter-guard.webp",
  "./assets/art-game/decor-dune-cloud.webp",
  "./assets/art-game/decor-dune-prop.webp",
  "./assets/art-game/decor-farm-cloud.webp",
  "./assets/art-game/decor-farm-prop.webp",
  "./assets/art-game/decor-frost-cloud.webp",
  "./assets/art-game/decor-frost-prop.webp",
  "./assets/art-game/decor-magma-cloud.webp",
  "./assets/art-game/decor-magma-prop.webp",
  "./assets/art-game/decor-neon-cloud.webp",
  "./assets/art-game/decor-neon-prop.webp",
  "./assets/art-game/decor-ocean-cloud.webp",
  "./assets/art-game/decor-ocean-prop.webp",
  "./assets/art-game/decor-scrap-cloud.webp",
  "./assets/art-game/decor-scrap-prop.webp",
  "./assets/art-game/decor-storm-cloud.webp",
  "./assets/art-game/decor-storm-prop.webp",
  "./assets/art-game/decor-toxic-cloud.webp",
  "./assets/art-game/decor-toxic-prop.webp",
  "./assets/art-game/decor-void-cloud.webp",
  "./assets/art-game/decor-void-prop.webp",
  "./assets/art-game/drone-sniper.webp",
  "./assets/art-game/drone-swarm.webp",
  "./assets/art-game/elite-crusher.webp",
  "./assets/art-game/elite-droneEye.webp",
  "./assets/art-game/elite-golem.webp",
  "./assets/art-game/elite-iceBear.webp",
  "./assets/art-game/elite-scarecrow.webp",
  "./assets/art-game/elite-scorpion.webp",
  "./assets/art-game/elite-shark.webp",
  "./assets/art-game/elite-thunderbird.webp",
  "./assets/art-game/elite-voidPrism.webp",
  "./assets/art-game/elite-wasp.webp",
  "./assets/art-game/enemy-beetle.webp",
  "./assets/art-game/enemy-chick.webp",
  "./assets/art-game/enemy-cicada.webp",
  "./assets/art-game/enemy-crow.webp",
  "./assets/art-game/enemy-dfly.webp",
  "./assets/art-game/enemy-dive.webp",
  "./assets/art-game/enemy-egg.webp",
  "./assets/art-game/enemy-falcon.webp",
  "./assets/art-game/enemy-ffly.webp",
  "./assets/art-game/enemy-fly.webp",
  "./assets/art-game/enemy-gnat.webp",
  "./assets/art-game/enemy-hawk.webp",
  "./assets/art-game/enemy-hen.webp",
  "./assets/art-game/enemy-hornet.webp",
  "./assets/art-game/enemy-locust.webp",
  "./assets/art-game/enemy-mantis.webp",
  "./assets/art-game/enemy-moth.webp",
  "./assets/art-game/enemy-owl.webp",
  "./assets/art-game/enemy-phoenix.webp",
  "./assets/art-game/enemy-queen.webp",
  "./assets/art-game/enemy-scarab.webp",
  "./assets/art-game/enemy-scorp.webp",
  "./assets/art-game/enemy-sparrow.webp",
  "./assets/art-game/enemy-stag.webp",
  "./assets/art-game/enemy-tank.webp",
  "./assets/art-game/enemy-ufo.webp",
  "./assets/art-game/enemy-vespa.webp",
  "./assets/art-game/enemy-vulture.webp",
  "./assets/art-game/fx-feather.webp",
  "./assets/art-game/fx-fireball-a.webp",
  "./assets/art-game/fx-fireball-b.webp",
  "./assets/art-game/fx-fireball-c.webp",
  "./assets/art-game/fx-hit.webp",
  "./assets/art-game/fx-muzzle.webp",
  "./assets/art-game/fx-shockwave.webp",
  "./assets/art-game/fx-smoke.webp",
  "./assets/art-game/fx-spark.webp",
  "./assets/art-game/item-bomb.webp",
  "./assets/art-game/item-coin.webp",
  "./assets/art-game/item-gem.webp",
  "./assets/art-game/item-heal.webp",
  "./assets/art-game/item-power.webp",
  "./assets/art-game/item-shield.webp",
  "./assets/art-game/rescue-cat-fish-torn.webp",
  "./assets/art-game/rescue-cat-fish.webp",
  "./assets/art-game/rescue-cat-goggles-torn.webp",
  "./assets/art-game/rescue-cat-goggles.webp",
  "./assets/art-game/rig-postChick-bag.webp",
  "./assets/art-game/rig-postChick-body.webp",
  "./assets/art-game/rig-postChick-head.webp",
  "./assets/art-game/rig-postChick-leg.webp",
  "./assets/art-game/rig-postChick-tail.webp",
  "./assets/art-game/rig-postChick-wing.webp",
  "./assets/art-game/ship-player.webp",
  "./assets/art-game/ui-badge-avatar-chick.webp",
  "./assets/art-game/ui-badge-avatar-frame.webp",
  "./assets/art-game/ui-badge-gift-chest.webp",
  "./assets/art-game/ui-badge-medal-1.webp",
  "./assets/art-game/ui-badge-medal-2.webp",
  "./assets/art-game/ui-badge-medal-3.webp",
  "./assets/art-game/ui-badge-star-off.webp",
  "./assets/art-game/ui-badge-star-on.webp",
  "./assets/art-game/ui-badge-trophy-big.webp",
  "./assets/art-game/ui-badge-victory-emblem.webp",
  "./assets/art-game/ui-banner-dune.webp",
  "./assets/art-game/ui-banner-farm.webp",
  "./assets/art-game/ui-banner-frost.webp",
  "./assets/art-game/ui-banner-magma.webp",
  "./assets/art-game/ui-banner-neon.webp",
  "./assets/art-game/ui-banner-ocean.webp",
  "./assets/art-game/ui-banner-scrap.webp",
  "./assets/art-game/ui-banner-storm.webp",
  "./assets/art-game/ui-banner-toxic.webp",
  "./assets/art-game/ui-banner-void.webp",
  "./assets/art-game/ui-frame-bar-boss.webp",
  "./assets/art-game/ui-frame-bar-hp.webp",
  "./assets/art-game/ui-frame-btn-danger.webp",
  "./assets/art-game/ui-frame-btn-ghost.webp",
  "./assets/art-game/ui-frame-btn-primary.webp",
  "./assets/art-game/ui-frame-panel-gold.webp",
  "./assets/art-game/ui-frame-panel.webp",
  "./assets/art-game/ui-frame-plate-boss-name.webp",
  "./assets/art-game/ui-frame-ribbon-boss.webp",
  "./assets/art-game/ui-frame-ribbon-title.webp",
  "./assets/art-game/ui-gacha-machine.webp",
  "./assets/art-game/ui-icon-armor-a.webp",
  "./assets/art-game/ui-icon-armor-b.webp",
  "./assets/art-game/ui-icon-armor.webp",
  "./assets/art-game/ui-icon-back.webp",
  "./assets/art-game/ui-icon-bolt.webp",
  "./assets/art-game/ui-icon-codex.webp",
  "./assets/art-game/ui-icon-combo.webp",
  "./assets/art-game/ui-icon-drone-a.webp",
  "./assets/art-game/ui-icon-drone-b.webp",
  "./assets/art-game/ui-icon-drone.webp",
  "./assets/art-game/ui-icon-gear.webp",
  "./assets/art-game/ui-icon-gold.webp",
  "./assets/art-game/ui-icon-map.webp",
  "./assets/art-game/ui-icon-pause.webp",
  "./assets/art-game/ui-icon-power.webp",
  "./assets/art-game/ui-icon-rescue.webp",
  "./assets/art-game/ui-icon-score.webp",
  "./assets/art-game/ui-icon-shield-a.webp",
  "./assets/art-game/ui-icon-shield-b.webp",
  "./assets/art-game/ui-icon-shield.webp",
  "./assets/art-game/ui-icon-skill.webp",
  "./assets/art-game/ui-icon-sound-off.webp",
  "./assets/art-game/ui-icon-sound-on.webp",
  "./assets/art-game/ui-icon-timer.webp",
  "./assets/art-game/ui-icon-trophy.webp",
  "./assets/art-game/ui-icon-wpn-a.webp",
  "./assets/art-game/ui-icon-wpn-b.webp",
  "./assets/art-game/ui-icon-wpn.webp",
  "./assets/art-game/ui-logo-sky-chicken.webp",
  "./assets/audio/sfx/back-1.mp3",
  "./assets/audio/sfx/bomb-1.mp3",
  "./assets/audio/sfx/boom-big-1.mp3",
  "./assets/audio/sfx/boom-big-2.mp3",
  "./assets/audio/sfx/boss-chain-1.mp3",
  "./assets/audio/sfx/boss-chain-2.mp3",
  "./assets/audio/sfx/boss-roar-1.mp3",
  "./assets/audio/sfx/boss-siren-1.mp3",
  "./assets/audio/sfx/buy-1.mp3",
  "./assets/audio/sfx/click-1.mp3",
  "./assets/audio/sfx/coin-1.mp3",
  "./assets/audio/sfx/coin-2.mp3",
  "./assets/audio/sfx/coin-3.mp3",
  "./assets/audio/sfx/combo-10-1.mp3",
  "./assets/audio/sfx/combo-5-1.mp3",
  "./assets/audio/sfx/confirm-1.mp3",
  "./assets/audio/sfx/evo-magic-1.mp3",
  "./assets/audio/sfx/firework-1.mp3",
  "./assets/audio/sfx/firework-2.mp3",
  "./assets/audio/sfx/gacha-spin-1.mp3",
  "./assets/audio/sfx/gacha-win-1.mp3",
  "./assets/audio/sfx/gem-1.mp3",
  "./assets/audio/sfx/heal-1.mp3",
  "./assets/audio/sfx/heartbeat-1.mp3",
  "./assets/audio/sfx/hit-1.mp3",
  "./assets/audio/sfx/hit-2.mp3",
  "./assets/audio/sfx/hurt-1.mp3",
  "./assets/audio/sfx/hurt-2.mp3",
  "./assets/audio/sfx/laser-charge-1.mp3",
  "./assets/audio/sfx/laser-fire-1.mp3",
  "./assets/audio/sfx/leak-1.mp3",
  "./assets/audio/sfx/peck-1.mp3",
  "./assets/audio/sfx/player-die-1.mp3",
  "./assets/audio/sfx/pop-1.mp3",
  "./assets/audio/sfx/pop-2.mp3",
  "./assets/audio/sfx/pop-3.mp3",
  "./assets/audio/sfx/pop-4.mp3",
  "./assets/audio/sfx/power-up-1.mp3",
  "./assets/audio/sfx/punch-whoosh-1.mp3",
  "./assets/audio/sfx/rescue-1.mp3",
  "./assets/audio/sfx/shield-hit-1.mp3",
  "./assets/audio/sfx/shield-up-1.mp3",
  "./assets/audio/sfx/shoot-1.mp3",
  "./assets/audio/sfx/shoot-2.mp3",
  "./assets/audio/sfx/shoot-3.mp3",
  "./assets/audio/sfx/squawk-1.mp3",
  "./assets/audio/sfx/squawk-2.mp3",
  "./assets/audio/sfx/squawk-3.mp3",
  "./assets/audio/sfx/star-1.mp3",
  "./assets/audio/sfx/tick-1.mp3",
  "./assets/audio/sfx/wave-1.mp3",
  "./assets/audio/music/j-clear-1.mp3",
  "./assets/audio/music/j-lose-1.mp3",
  "./assets/audio/music/m-farm-1.mp3",
  "./assets/audio/music/m-lobby-1.mp3",
  "./assets/audio/voice/v-bomb.mp3",
  "./assets/audio/voice/v-clear.mp3",
  "./assets/audio/voice/v-combo10.mp3",
  "./assets/audio/voice/v-combo5.mp3",
  "./assets/audio/voice/v-finale.mp3",
  "./assets/audio/voice/v-kill.mp3",
  "./assets/audio/voice/v-lose.mp3",
  "./assets/audio/voice/v-power.mp3",
  "./assets/audio/voice/v-rage.mp3",
  "./assets/audio/voice/v-warn.mp3",
  "../../shared/portal-config.js",
  "../../shared/portal-games.js",
  "../../shared/portal-firebase.js",
  "../../shared/portal-auth.js",
  "../../shared/portal-cloud.js",
  "../../shared/portal-rank.js",
  "../../shared/portal-player.js"
];

/* MÃ BĂM TỪNG FILE (12/10/2026) — cập nhật CHỈ TẢI FILE ĐỔI. Trước đây đổi tên cache là tải
 * lại TRỌN 254 file (~12MB ảnh + âm thanh) dù mỗi bản phát hành chỉ đổi vài file JS/CSS —
 * mà từ nay bản mới được tải NGAY ở màn hình vào game (system-auto-update.js), người chơi
 * ngồi chờ thanh %. Cache cũ giữ bảng băm ở HASH_KEY; file nào băm trùng thì chép thẳng từ
 * cache cũ (không qua mạng). Cache cũ chưa có bảng băm (trước đợt này) -> tải đủ một lần. */
const HASHES = {"./":"fb72e17e","./index.html":"fb72e17e","./manifest.webmanifest":"a17db0d9","./assets/style-a48eec00.css":"a48eec00","./assets/app-8a41da11.js":"8a41da11","./icons/icon-192.png":"b7541efa","./icons/icon-512.png":"b0a7a5e3","./icons/icon-maskable-512.png":"155cd776","./assets/fonts/chakra-petch-600-latin.woff2":"a5888696","./assets/fonts/chakra-petch-600-viet.woff2":"0d405c8e","./assets/fonts/chakra-petch-700-latin.woff2":"ce5095dc","./assets/fonts/chakra-petch-700-viet.woff2":"156613c5","./assets/art-game/bg-dune.webp":"97ff1e2a","./assets/art-game/bg-farm.webp":"293aa9a7","./assets/art-game/bg-frost.webp":"c2d81c63","./assets/art-game/bg-magma.webp":"b081e500","./assets/art-game/bg-neon.webp":"9545b51b","./assets/art-game/bg-ocean.webp":"1d727c0b","./assets/art-game/bg-scrap.webp":"1bcee21e","./assets/art-game/bg-storm.webp":"ee51c3ff","./assets/art-game/bg-toxic.webp":"3029ffa6","./assets/art-game/bg-void.webp":"6e6eae15","./assets/art-game/boss-eagle.webp":"f136043a","./assets/art-game/boss-hen.webp":"eb502e4d","./assets/art-game/boss-neonRooster.webp":"3300873f","./assets/art-game/boss-octopus.webp":"2700f482","./assets/art-game/boss-penguin.webp":"cda03e7e","./assets/art-game/boss-phoenix.webp":"658eda8f","./assets/art-game/boss-scrapDragon.webp":"eb368dce","./assets/art-game/boss-spider.webp":"ea716a2b","./assets/art-game/boss-stormEye.webp":"d5db1632","./assets/art-game/boss-voidEgg.webp":"aa63efd1","./assets/art-game/bossfx-aura.webp":"6993e05b","./assets/art-game/bossfx-charge-orb.webp":"80826c3b","./assets/art-game/bossfx-ink.webp":"94934812","./assets/art-game/bossfx-portal.webp":"2d30c76f","./assets/art-game/bossfx-reticle.webp":"d0643c51","./assets/art-game/bossfx-sunburst.webp":"dd7f5179","./assets/art-game/bosspart-beak.webp":"4ec89cbc","./assets/art-game/bosspart-blade.webp":"9e9717aa","./assets/art-game/bosspart-fist.webp":"d89c7310","./assets/art-game/bosspart-rock.webp":"f14a7765","./assets/art-game/bullet-arrow.webp":"f24797b5","./assets/art-game/bullet-blast.webp":"be8e66c5","./assets/art-game/bullet-boomer.webp":"09a6adbd","./assets/art-game/bullet-bounce.webp":"4ea04c07","./assets/art-game/bullet-dart.webp":"c4fd888f","./assets/art-game/bullet-egg.webp":"afddfab8","./assets/art-game/bullet-laser.webp":"6b38b1f5","./assets/art-game/bullet-plasma.webp":"6c504397","./assets/art-game/bullet-rocket.webp":"c1953fd4","./assets/art-game/counter-brute.webp":"dc6342e3","./assets/art-game/counter-guard.webp":"760d32e6","./assets/art-game/decor-dune-cloud.webp":"ad5e2660","./assets/art-game/decor-dune-prop.webp":"087cf816","./assets/art-game/decor-farm-cloud.webp":"19101e1c","./assets/art-game/decor-farm-prop.webp":"ee1acb91","./assets/art-game/decor-frost-cloud.webp":"c6aa3ea1","./assets/art-game/decor-frost-prop.webp":"76e4cae3","./assets/art-game/decor-magma-cloud.webp":"2ae7d372","./assets/art-game/decor-magma-prop.webp":"08dca26f","./assets/art-game/decor-neon-cloud.webp":"10b06490","./assets/art-game/decor-neon-prop.webp":"2e3e745a","./assets/art-game/decor-ocean-cloud.webp":"b1fc18b2","./assets/art-game/decor-ocean-prop.webp":"383ce061","./assets/art-game/decor-scrap-cloud.webp":"f013a81f","./assets/art-game/decor-scrap-prop.webp":"7341ecdc","./assets/art-game/decor-storm-cloud.webp":"7e5cf76b","./assets/art-game/decor-storm-prop.webp":"b05d7dbc","./assets/art-game/decor-toxic-cloud.webp":"ae0a7712","./assets/art-game/decor-toxic-prop.webp":"a7180b4d","./assets/art-game/decor-void-cloud.webp":"f65c11da","./assets/art-game/decor-void-prop.webp":"9a38264e","./assets/art-game/drone-sniper.webp":"49e29807","./assets/art-game/drone-swarm.webp":"dd93130d","./assets/art-game/elite-crusher.webp":"18f35e0d","./assets/art-game/elite-droneEye.webp":"739cd951","./assets/art-game/elite-golem.webp":"0ce8b174","./assets/art-game/elite-iceBear.webp":"912fea49","./assets/art-game/elite-scarecrow.webp":"9a57fca2","./assets/art-game/elite-scorpion.webp":"b88bc1f9","./assets/art-game/elite-shark.webp":"dd16a0c1","./assets/art-game/elite-thunderbird.webp":"d4ba119e","./assets/art-game/elite-voidPrism.webp":"b9f5bad3","./assets/art-game/elite-wasp.webp":"6b2229c7","./assets/art-game/enemy-beetle.webp":"4bb0a095","./assets/art-game/enemy-chick.webp":"957a5f23","./assets/art-game/enemy-cicada.webp":"8a4b75cb","./assets/art-game/enemy-crow.webp":"3173ba18","./assets/art-game/enemy-dfly.webp":"997c85bb","./assets/art-game/enemy-dive.webp":"ced32825","./assets/art-game/enemy-egg.webp":"885c7581","./assets/art-game/enemy-falcon.webp":"d5c1f3f7","./assets/art-game/enemy-ffly.webp":"10cb70c9","./assets/art-game/enemy-fly.webp":"8badd40e","./assets/art-game/enemy-gnat.webp":"6ba8a987","./assets/art-game/enemy-hawk.webp":"94f6bab4","./assets/art-game/enemy-hen.webp":"dcb59efe","./assets/art-game/enemy-hornet.webp":"5cf55160","./assets/art-game/enemy-locust.webp":"4318d13f","./assets/art-game/enemy-mantis.webp":"6fca481a","./assets/art-game/enemy-moth.webp":"27fe483d","./assets/art-game/enemy-owl.webp":"a5366b52","./assets/art-game/enemy-phoenix.webp":"34b6fef2","./assets/art-game/enemy-queen.webp":"246f8539","./assets/art-game/enemy-scarab.webp":"85f0c14f","./assets/art-game/enemy-scorp.webp":"4240ff8a","./assets/art-game/enemy-sparrow.webp":"c44f553a","./assets/art-game/enemy-stag.webp":"9f9103dd","./assets/art-game/enemy-tank.webp":"ece82529","./assets/art-game/enemy-ufo.webp":"d58ce902","./assets/art-game/enemy-vespa.webp":"b2790527","./assets/art-game/enemy-vulture.webp":"e6185722","./assets/art-game/fx-feather.webp":"b5d20179","./assets/art-game/fx-fireball-a.webp":"0494fa20","./assets/art-game/fx-fireball-b.webp":"0aefe613","./assets/art-game/fx-fireball-c.webp":"dc4cc1a8","./assets/art-game/fx-hit.webp":"2563cfd9","./assets/art-game/fx-muzzle.webp":"08f54905","./assets/art-game/fx-shockwave.webp":"d3c4378e","./assets/art-game/fx-smoke.webp":"c94ddb27","./assets/art-game/fx-spark.webp":"eefb0bd7","./assets/art-game/item-bomb.webp":"fce3bb02","./assets/art-game/item-coin.webp":"38414d6a","./assets/art-game/item-gem.webp":"7ae84f4f","./assets/art-game/item-heal.webp":"cafd1cd0","./assets/art-game/item-power.webp":"be79ed6f","./assets/art-game/item-shield.webp":"cd42f9b0","./assets/art-game/rescue-cat-fish-torn.webp":"3d5e0abc","./assets/art-game/rescue-cat-fish.webp":"4558e948","./assets/art-game/rescue-cat-goggles-torn.webp":"9323a6db","./assets/art-game/rescue-cat-goggles.webp":"4724a748","./assets/art-game/rig-postChick-bag.webp":"b361d7ca","./assets/art-game/rig-postChick-body.webp":"25e4fe52","./assets/art-game/rig-postChick-head.webp":"5e292aee","./assets/art-game/rig-postChick-leg.webp":"92d79c99","./assets/art-game/rig-postChick-tail.webp":"0e7bf716","./assets/art-game/rig-postChick-wing.webp":"c5ee0a8c","./assets/art-game/ship-player.webp":"2b590bd2","./assets/art-game/ui-badge-avatar-chick.webp":"0062e025","./assets/art-game/ui-badge-avatar-frame.webp":"fee4c798","./assets/art-game/ui-badge-gift-chest.webp":"005ed378","./assets/art-game/ui-badge-medal-1.webp":"753482de","./assets/art-game/ui-badge-medal-2.webp":"9f8d3183","./assets/art-game/ui-badge-medal-3.webp":"a02f554d","./assets/art-game/ui-badge-star-off.webp":"73ebe081","./assets/art-game/ui-badge-star-on.webp":"b8c74bc9","./assets/art-game/ui-badge-trophy-big.webp":"2002ca4b","./assets/art-game/ui-badge-victory-emblem.webp":"5e95d398","./assets/art-game/ui-banner-dune.webp":"c82f5b1b","./assets/art-game/ui-banner-farm.webp":"4abaaaf7","./assets/art-game/ui-banner-frost.webp":"e0df41d8","./assets/art-game/ui-banner-magma.webp":"74971d48","./assets/art-game/ui-banner-neon.webp":"ca75bcdb","./assets/art-game/ui-banner-ocean.webp":"a10b5d21","./assets/art-game/ui-banner-scrap.webp":"db3fc72e","./assets/art-game/ui-banner-storm.webp":"45701eb4","./assets/art-game/ui-banner-toxic.webp":"feae1c8b","./assets/art-game/ui-banner-void.webp":"c377a55b","./assets/art-game/ui-frame-bar-boss.webp":"2866d961","./assets/art-game/ui-frame-bar-hp.webp":"f63c0ca4","./assets/art-game/ui-frame-btn-danger.webp":"0c25d8b9","./assets/art-game/ui-frame-btn-ghost.webp":"d4276d9a","./assets/art-game/ui-frame-btn-primary.webp":"b7180889","./assets/art-game/ui-frame-panel-gold.webp":"a021b206","./assets/art-game/ui-frame-panel.webp":"0818bbc8","./assets/art-game/ui-frame-plate-boss-name.webp":"f64efe41","./assets/art-game/ui-frame-ribbon-boss.webp":"da15e6ae","./assets/art-game/ui-frame-ribbon-title.webp":"f0817d28","./assets/art-game/ui-gacha-machine.webp":"84ad94db","./assets/art-game/ui-icon-armor-a.webp":"82c2341f","./assets/art-game/ui-icon-armor-b.webp":"0856f5db","./assets/art-game/ui-icon-armor.webp":"7c8cbc42","./assets/art-game/ui-icon-back.webp":"55221989","./assets/art-game/ui-icon-bolt.webp":"3e3889c1","./assets/art-game/ui-icon-codex.webp":"1eb3b368","./assets/art-game/ui-icon-combo.webp":"68613185","./assets/art-game/ui-icon-drone-a.webp":"a3031f97","./assets/art-game/ui-icon-drone-b.webp":"9b1c6d4d","./assets/art-game/ui-icon-drone.webp":"7ebbaac7","./assets/art-game/ui-icon-gear.webp":"c0f93a33","./assets/art-game/ui-icon-gold.webp":"4ed883f0","./assets/art-game/ui-icon-map.webp":"5bde274a","./assets/art-game/ui-icon-pause.webp":"6aaa165b","./assets/art-game/ui-icon-power.webp":"48f6e034","./assets/art-game/ui-icon-rescue.webp":"da97122e","./assets/art-game/ui-icon-score.webp":"fc48d338","./assets/art-game/ui-icon-shield-a.webp":"840a262f","./assets/art-game/ui-icon-shield-b.webp":"0c9737e9","./assets/art-game/ui-icon-shield.webp":"6cb4378c","./assets/art-game/ui-icon-skill.webp":"b6d2ba19","./assets/art-game/ui-icon-sound-off.webp":"a6124340","./assets/art-game/ui-icon-sound-on.webp":"f9aff521","./assets/art-game/ui-icon-timer.webp":"0d167294","./assets/art-game/ui-icon-trophy.webp":"7a50ffec","./assets/art-game/ui-icon-wpn-a.webp":"d8829ae1","./assets/art-game/ui-icon-wpn-b.webp":"1d0b8f83","./assets/art-game/ui-icon-wpn.webp":"86b0b83a","./assets/art-game/ui-logo-sky-chicken.webp":"d2254615","./assets/audio/sfx/back-1.mp3":"35492112","./assets/audio/sfx/bomb-1.mp3":"d6171de2","./assets/audio/sfx/boom-big-1.mp3":"dac5ff13","./assets/audio/sfx/boom-big-2.mp3":"c517e992","./assets/audio/sfx/boss-chain-1.mp3":"89d23cc1","./assets/audio/sfx/boss-chain-2.mp3":"965a4f9e","./assets/audio/sfx/boss-roar-1.mp3":"3f1f6b84","./assets/audio/sfx/boss-siren-1.mp3":"9bddb655","./assets/audio/sfx/buy-1.mp3":"df9dbdfd","./assets/audio/sfx/click-1.mp3":"dc078bff","./assets/audio/sfx/coin-1.mp3":"4395464b","./assets/audio/sfx/coin-2.mp3":"7970caec","./assets/audio/sfx/coin-3.mp3":"d013c1a2","./assets/audio/sfx/combo-10-1.mp3":"a0547812","./assets/audio/sfx/combo-5-1.mp3":"7a3d3e49","./assets/audio/sfx/confirm-1.mp3":"523548ad","./assets/audio/sfx/evo-magic-1.mp3":"b677b95e","./assets/audio/sfx/firework-1.mp3":"82bb86ed","./assets/audio/sfx/firework-2.mp3":"5861d2c6","./assets/audio/sfx/gacha-spin-1.mp3":"518b5848","./assets/audio/sfx/gacha-win-1.mp3":"bbf49307","./assets/audio/sfx/gem-1.mp3":"a08b3fca","./assets/audio/sfx/heal-1.mp3":"edfffad9","./assets/audio/sfx/heartbeat-1.mp3":"edf8d461","./assets/audio/sfx/hit-1.mp3":"0e96d73a","./assets/audio/sfx/hit-2.mp3":"32c20f2e","./assets/audio/sfx/hurt-1.mp3":"4d31d104","./assets/audio/sfx/hurt-2.mp3":"aef96521","./assets/audio/sfx/laser-charge-1.mp3":"fe5bd4aa","./assets/audio/sfx/laser-fire-1.mp3":"784d803e","./assets/audio/sfx/leak-1.mp3":"f386d835","./assets/audio/sfx/peck-1.mp3":"c60afd58","./assets/audio/sfx/player-die-1.mp3":"31072e5e","./assets/audio/sfx/pop-1.mp3":"45d12134","./assets/audio/sfx/pop-2.mp3":"104ea261","./assets/audio/sfx/pop-3.mp3":"9205df03","./assets/audio/sfx/pop-4.mp3":"a633c66a","./assets/audio/sfx/power-up-1.mp3":"a960863f","./assets/audio/sfx/punch-whoosh-1.mp3":"32bc8717","./assets/audio/sfx/rescue-1.mp3":"6a759fa9","./assets/audio/sfx/shield-hit-1.mp3":"20d05c76","./assets/audio/sfx/shield-up-1.mp3":"5e976b36","./assets/audio/sfx/shoot-1.mp3":"e34f68d0","./assets/audio/sfx/shoot-2.mp3":"733a7ff5","./assets/audio/sfx/shoot-3.mp3":"598d8bf6","./assets/audio/sfx/squawk-1.mp3":"be4f47cf","./assets/audio/sfx/squawk-2.mp3":"52c14b2e","./assets/audio/sfx/squawk-3.mp3":"e08cdafa","./assets/audio/sfx/star-1.mp3":"95d408de","./assets/audio/sfx/tick-1.mp3":"156a0985","./assets/audio/sfx/wave-1.mp3":"53a9c14a","./assets/audio/music/j-clear-1.mp3":"83aa3ad3","./assets/audio/music/j-lose-1.mp3":"cca3daf6","./assets/audio/music/m-farm-1.mp3":"77a68e18","./assets/audio/music/m-lobby-1.mp3":"c69cee2a","./assets/audio/voice/v-bomb.mp3":"bf6d7af4","./assets/audio/voice/v-clear.mp3":"66ca1689","./assets/audio/voice/v-combo10.mp3":"aae1e927","./assets/audio/voice/v-combo5.mp3":"23204d38","./assets/audio/voice/v-finale.mp3":"b006dedf","./assets/audio/voice/v-kill.mp3":"e46f8e14","./assets/audio/voice/v-lose.mp3":"2534d1d6","./assets/audio/voice/v-power.mp3":"92fae5a4","./assets/audio/voice/v-rage.mp3":"d5071144","./assets/audio/voice/v-warn.mp3":"713a09c1","../../shared/portal-config.js":"497a1b50","../../shared/portal-games.js":"b5b50311","../../shared/portal-firebase.js":"e907ff28","../../shared/portal-auth.js":"9ad35ac0","../../shared/portal-cloud.js":"b3abb424","../../shared/portal-rank.js":"378ac62e","../../shared/portal-player.js":"86f8faf3"};
const HASH_KEY = './__shell-hashes.json';

/* Báo tiến độ tải về cho trang (21/09/2026): người chơi bấm cập nhật mà không thấy
 * gì nhúc nhích là tưởng game lỗi. Trang nghe PRECACHE_PROGRESS để vẽ thanh %.
 * matchAll kèm includeUncontrolled vì lúc INSTALL bản mới chưa cầm trịch trang nào. */
function baoTienDo(done, total) {
  self.clients.matchAll({ includeUncontrolled: true }).then(cs =>
    cs.forEach(cl => cl.postMessage({ type: 'PRECACHE_PROGRESS', done, total })));
}

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      // nạp từng file để một file lỗi không làm hỏng cả mẻ
      //
      // `cache: 'reload'` BẮT BUỘC — đừng bỏ đi. `c.add(u)` thường sẽ lấy qua HTTP
      // cache của trình duyệt. GitHub Pages trả index.html kèm `max-age=600`, nên bản
      // mới vừa cài có thể cache nhầm index.html CŨ — trong khi assets/app-<hash>.js
      // tên mới nên luôn tải tươi. Cache mới = HTML cũ + assets mới, mà HTML cũ trỏ
      // tới tên file đã bị xoá cả ở cache lẫn trên máy chủ → 404.
      // Đã xảy ra thật trên bản phát hành của cờ vua.
      .then(async c => {
        // cache cũ có bảng băm thì dùng lại được file trùng băm
        const olds = (await caches.keys()).filter(k => k !== CACHE && k.startsWith('sky-chicken-'));
        let oldCache = null, oldHashes = {};
        for (const k of olds) {
          const oc = await caches.open(k), h = await oc.match(HASH_KEY);
          if (h) { oldCache = oc; oldHashes = await h.json().catch(() => ({})); break; }
        }
        let done = 0;
        const tick = () => { done++; if (done % 5 === 0 || done === SHELL.length) baoTienDo(done, SHELL.length); };
        await Promise.all(SHELL.map(async u => {
          try {
            if (oldCache && HASHES[u] && oldHashes[u] === HASHES[u]) {
              const hit = await oldCache.match(u);
              if (hit) { await c.put(u, hit); return; }
            }
            await c.add(new Request(u, { cache: 'reload' }));
          } catch (e) { /* một file lỗi không làm hỏng cả mẻ */ }
          finally { tick(); }
        }));
        await c.put(HASH_KEY, new Response(JSON.stringify(HASHES), { headers: { 'content-type': 'application/json' } }));
      })
    // KHÔNG gọi skipWaiting ở đây: trang quyết lúc đổi bản (màn tải lúc vào game, hoặc
    // lobby nếu bản mới tải xong giữa phiên — system-auto-update.js), không bao giờ giữa trận
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Game gửi lệnh này khi người chơi đồng ý cập nhật */
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;
  /* DANH TÍNH SSO KHÔNG BAO GIỜ ĐƯỢC CACHE (12/10/2026): /whoami từng đi nhánh stale-while-
     revalidate bên dưới -> hết phiên vẫn trả danh tính cũ (cổng gen ảnh tưởng còn phiên), và đổi
     tài khoản M365 trên cùng trình duyệt thì lần mở đầu đọc EMAIL NGƯỜI TRƯỚC (gương tiến độ ghi
     nhầm khoá). Để thẳng ra mạng. */
  if (/^\/(whoami|oauth2\/)/.test(new URL(req.url).pathname)) return;

  /* TRANG (HTML) thì MẠNG TRƯỚC, cache chỉ để dự phòng khi mất mạng.
     Các file assets/*-<hash>.* thì stale-while-revalidate là đúng: tên đã chứa hash nội
     dung nên không bao giờ đổi nghĩa. Nhưng HTML thì tên cố định, và nó là chỗ DUY NHẤT
     ghi tên các file kia — trả bản cũ ra là trỏ tới tên file không còn tồn tại. */
  if (req.mode === 'navigate') {
    e.respondWith(
      /* `cache: 'reload'` ở đây cũng BẮT BUỘC, cùng lý do với bước precache. `fetch(req)`
         thường VẪN đi qua HTTP cache của trình duyệt; GitHub Pages đặt max-age=600 cho
         HTML nên trong 10 phút sau khi phát hành, "mạng trước" vẫn có thể nhận về
         index.html CŨ — trỏ tới tên file đã bị xoá khỏi máy chủ. */
      fetch(new Request(req.url, { cache: 'reload', credentials: 'same-origin' }))
        .then(res => {
          if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
          return res;
        })
        .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  // stale-while-revalidate: trả cache ngay cho nhanh, tải bản mới ở nền
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(req).then(cached => {
        const fresh = fetch(req)
          .then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; })
          .catch(() => cached);          // mất mạng: dùng lại bản đã lưu
        return cached || fresh;
      })
    )
  );
});
