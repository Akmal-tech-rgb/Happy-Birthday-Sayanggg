// ═══════════════════════════════════════════════════════
//  KONFIGURASI — edit bagian ini saja
// ═══════════════════════════════════════════════════════

const BIRTHDAY = new Date('2026-07-04T00:00:00');

// MODE TESTING
// true  → pakai FAKE_NOW (simulasi waktu)
// false → pakai jam asli komputer
const TESTING  = false;
const FAKE_NOW = new Date('2026-08-16T23:59:52');

const LETTER_TEXT =
`aloooo sayanggggg akuuuu

selamat ulang tahun ya sayanggg hari ini beneran harinya kamu dan aku bersyukur banget bisa jadi salah satu orangg yangg bisa hadirr di hidupp kamuu, jujur aja semenjak ada kamu di hidupku rasanya semua hal tuh jadi jauh lebih baik dan berwarna. Aku ngetik ini beneran ngalir aja dari hati karena kalau disuruh ngungkapin seberapa berartinya kamu buat aku rasanya kata-kata aja gak bakal pernah cukup buat ngejelasinnya, tapi yang jelas aku mau bilang makasiiii banyakkkk ya udaa selalu ada buat aku, udaaa mau nemenin aku, ngertiin aku dengan segala kurangku, dan jadi tempat paling nyaman buat aku pulang setelah ngelewatin hari-hari yang kadang berat banget. Di umur kamu yang baru ini aku cuma bisa doain semoga semua hal baik selalu ngelilingin kamu, semoga segala sesuatu yang lagi kamu usahain bisa jalan lancar, semoga kamu selalu dikasih kesehatan kebahagiaan dan senyum manis kamu itu gak pernah luntur, dan yang paling penting semoga kita bisa terus sama-sama bikin kenangan indah berdua buat waktu yang lama banget. Maaf ya  sayanggg akuu di harii ulang tahunn kamuuu,akunyaa ga adaa disamping kamuu buat nemeninn kamuu,sekalii lagii akuu mintaa maafff yaaa sayangg, please enjoy your special day sayangku karena kamu pantes banget buat dapetin semua kebahagiaan di dunia ini, I love you so much! 🤍`;

const WISHES_TEXT =
`aull yang aku sayangiii...

Di momen yang paling istimewa ini, aku ingin menyampaikan doa-doa tulus dari lubuk hatiku yang paling dalam untukmu. 🌸

Semoga di usiamu yang baru ini, kebahagiaan selalu hadir menyelimuti setiap langkahmu. Semoga senyummu tidak pernah padam, dan tawa kecilmu terus mengisi ruangan manapun kamu berada.

Semoga kesehatanmu selalu terjaga, karena aku ingin kamu bisa menikmati setiap keindahan hidup ini dengan tubuh dan jiwa yang kuat. Jaga dirimu baik-baik, ya. 💛

Semoga semua impian yang kamu simpan, yang kamu ceritakan maupun yang hanya kamu bisikkan dalam doa satu per satu menjadi kenyataan. Aku percaya kamu mampu meraih semuanya.

Semoga orang-orang di sekitarmu selalu mencintaimu dengan tulus, seperti aku yang mencintaimu tanpa syarat. Kamu tidak pernah sendirian. ✨

Selamat ulang tahun, sayanggggg. Terima kasih sudah menjadi bagian terindah dari hidupku. Semoga tahun ini menjadi yang paling indah yang pernah kamu jalani. 🤍`;

// ═══════════════════════════════════════════════════════
const _t0 = Date.now();

function getNow() {
  if (TESTING) return new Date(FAKE_NOW.getTime() + (Date.now() - _t0));
  return new Date();
}

function pad(n) { return String(n).padStart(2, '0'); }

// ═══════════════════════════════════════════════════════
//  PAGE NAVIGATION
// ═══════════════════════════════════════════════════════
function goTo(fromId, toId) {
  const from = document.getElementById(fromId);
  const to   = document.getElementById(toId);
  from.classList.remove('active');
  if (window.stopLeafBurst) window.stopLeafBurst();
  setTimeout(() => to.classList.add('active'), 350);
}

// ═══════════════════════════════════════════════════════
//  MINI // ═══════════════════════════════════════════════════════
//  MINI PLAYER — musik dengan visualizer bar
// ═══════════════════════════════════════════════════════
(function () {
  const BAR_COUNT = 12;
  const TICK_MS   = 420;
  const MIN_H = 3, MAX_H = 22;
  const MIN_DUR = 0.22, MAX_DUR = 0.65;

  const bgMusic = document.getElementById('bgMusic');
  const btnPlay = document.getElementById('btnPlay');
  const vizWrap = document.getElementById('vizWrap');

  bgMusic.volume = 0.5;

  const playlist = [
    'https://www.dropbox.com/scl/fi/gbad49l8skqj071mc0rge/Music_1-mp3cut.net-1.mp3?rlkey=iccikwd4kcvva1byum2z7irlj&st=psd2m5l7&raw=1',
    'https://www.dropbox.com/scl/fi/wgds4b36kova3l32z5hpd/Music2.mp3?rlkey=0daz4kb2eqiq0ua7nmymfwzto&st=cqx81mzi&raw=1',
    'https://www.dropbox.com/scl/fi/6y069qs6gnxkg5aocnhup/Music3.mp3?rlkey=mp42jbctjss309x6nhuliykgu&st=rss01cd7&raw=1',
  ];
  let currentTrack = 0;

  function loadTrack(index) {
    bgMusic.src = playlist[index];
    bgMusic.load();
  }

  // PERBAIKAN: Gunakan event 'ended' agar perpindahan lagu otomatis
  bgMusic.addEventListener('ended', function () {
    if (!isPlaying) return;
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    bgMusic.play().catch(function(err) {
      console.log("Transisi musik gagal: ", err);
    });
  });

  const bars = Array.from({ length: BAR_COUNT }, () => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    vizWrap.appendChild(bar);
    return bar;
  });

  function rand(min, max) { return min + Math.random() * (max - min); }
  function setBarProps(bar) {
    bar.style.setProperty('--h',   `${rand(MIN_H, MAX_H).toFixed(1)}px`);
    bar.style.setProperty('--dur', `${rand(MIN_DUR, MAX_DUR).toFixed(3)}s`);
  }
  function randomizeViz() { bars.forEach(setBarProps); }

  function startBars() {
    randomizeViz();
    bars.forEach((bar, i) => {
      bar.style.animationDelay = `${(i * 0.03).toFixed(2)}s`;
      bar.classList.add('animating');
    });
  }
  function stopBars() {
    bars.forEach(bar => {
      bar.classList.remove('animating');
      bar.style.height = '3px';
    });
  }

  let isPlaying = false;
  let vizTick   = null;

  function play() {
    if (isPlaying) return;
    isPlaying = true;
    if (!bgMusic.src || bgMusic.src === window.location.href) {
      loadTrack(currentTrack);
    }
    bgMusic.play().catch(() => {});

    btnPlay.classList.add('hidden');
    
    requestAnimationFrame(() => {
      vizWrap.classList.add('visible');
      startBars();
      vizTick = setInterval(randomizeViz, TICK_MS);
    });
  }

  function pause() {
    if (!isPlaying) return;
    isPlaying = false;
    bgMusic.pause();
    clearInterval(vizTick);
    vizTick = null;
    stopBars();
    vizWrap.classList.remove('visible');
    btnPlay.classList.remove('hidden');
  }

  loadTrack(currentTrack);

  btnPlay.addEventListener('click', play);
  vizWrap.addEventListener('click', pause);
  vizWrap.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pause(); }
  });
})();


// ═══════════════════════════════════════════════════════
//  UNLOCK GIFT BUTTON
// ═══════════════════════════════════════════════════════
function unlockGift() {
  const btn  = document.getElementById('giftBtn');
  const msg  = document.getElementById('unlockMsg');
  const hint = document.getElementById('hint');

  btn.disabled = false;
  btn.classList.replace('locked', 'unlocked');
  msg.classList.add('show');
  hint.textContent = 'Klik tombol untuk membuka hadiahmu 🎁';
}

// ═══════════════════════════════════════════════════════
//  COUNTDOWN
// ═══════════════════════════════════════════════════════
let timer = null;

function tick() {
  const diff = BIRTHDAY - getNow();

  if (diff <= 0) {
    clearInterval(timer);
    ['days','hours','minutes','seconds'].forEach(id =>
      document.getElementById(id).textContent = '00'
    );
    unlockGift();
    return;
  }

  document.getElementById('days').textContent    = pad(Math.floor(diff / 86400000));
  document.getElementById('hours').textContent   = pad(Math.floor((diff % 86400000) / 3600000));
  document.getElementById('minutes').textContent = pad(Math.floor((diff % 3600000)  / 60000));
  document.getElementById('seconds').textContent = pad(Math.floor((diff % 60000)    / 1000));
}

if (getNow() >= BIRTHDAY) {
  ['days','hours','minutes','seconds'].forEach(id =>
    document.getElementById(id).textContent = '00'
  );
  unlockGift();
} else {
  tick();
  timer = setInterval(tick, 1000);
}

document.getElementById('giftBtn').addEventListener('click', function () {
  if (this.disabled) return;
  goTo('page1', 'pageGift');
});

// ═══════════════════════════════════════════════════════
//  GIFT BOX — CANVAS ANIMATION
// ═══════════════════════════════════════════════════════
(function () {
  const cv   = document.getElementById('giftCanvas');
  const giftCtx  = cv.getContext('2d');
  const hint = document.getElementById('giftHint');
  const W = cv.width, H = cv.height;

  let floatY    = 0;
  let lidY      = 0;
  let lidAlpha  = 1;
  let shakeX    = 0;
  let shakeT    = 0;
  let phase     = 'idle';
  let particles = [];
  let opened    = false;
  let raf;

  const EMOJIS = ['✨','🌸','💛','⭐','🎀','✦','🤍'];

  function spawnParticles() {
    particles = EMOJIS.map((e, i) => {
      const angle = (i / EMOJIS.length) * Math.PI * 2 - Math.PI / 2;
      const speed = 2.2 + Math.random() * 1.8;
      return {
        emoji: e, x: W / 2, y: H / 2 - 40,
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 2,
        alpha: 1, life: 1, size: 18 + Math.random() * 8
      };
    });
  }

  function drawBox(ox, oy) {
    const bx = ox + 30, by = oy + 130, bw = 200, bh = 130;
    giftCtx.shadowColor = 'rgba(0,0,0,0.5)'; giftCtx.shadowBlur = 24; giftCtx.shadowOffsetY = 10;
    const gBody = giftCtx.createLinearGradient(bx, by, bx + bw, by + bh);
    gBody.addColorStop(0, '#6b0f2b');
    gBody.addColorStop(0.5, '#4a0a1e');
    gBody.addColorStop(1, '#2d0512');
    giftCtx.fillStyle = gBody; giftCtx.beginPath(); giftCtx.roundRect(bx, by, bw, bh, [0, 0, 6, 6]); giftCtx.fill();
    giftCtx.shadowBlur = 0; giftCtx.shadowOffsetY = 0;
    giftCtx.strokeStyle = 'rgba(201,168,124,0.35)'; giftCtx.lineWidth = 1; giftCtx.beginPath(); giftCtx.roundRect(bx, by, bw, bh, [0, 0, 6, 6]); giftCtx.stroke();
    const gRibV = giftCtx.createLinearGradient(bx + bw/2 - 12, 0, bx + bw/2 + 12, 0);
    gRibV.addColorStop(0, '#e91e63'); gRibV.addColorStop(0.4, '#f48fb1'); gRibV.addColorStop(0.5, '#fce4ec'); gRibV.addColorStop(0.6, '#f48fb1'); gRibV.addColorStop(1, '#e91e63');
    giftCtx.fillStyle = gRibV; giftCtx.fillRect(bx + bw/2 - 12, by, 24, bh);
    const gRibH = giftCtx.createLinearGradient(0, by + 44, 0, by + 68);
    gRibH.addColorStop(0, '#e91e63'); gRibH.addColorStop(0.4, '#f48fb1'); gRibH.addColorStop(0.5, '#fce4ec'); gRibH.addColorStop(0.6, '#f48fb1'); gRibH.addColorStop(1, '#e91e63');
    giftCtx.fillStyle = gRibH; giftCtx.fillRect(bx, by + 44, bw, 24);
    const gCross = giftCtx.createRadialGradient(bx + bw/2, by + 56, 0, bx + bw/2, by + 56, 18);
    gCross.addColorStop(0, 'rgba(242,232,217,0.6)'); gCross.addColorStop(1, 'rgba(242,232,217,0)');
    giftCtx.fillStyle = gCross; giftCtx.fillRect(bx + bw/2 - 12, by + 44, 24, 24);
  }

  function drawLid(ox, oy, lidy, lalpha) {
    giftCtx.globalAlpha = lalpha;
    const lx = ox + 22, ly = oy + 86 + lidy, lw = 216, lh = 44;
    giftCtx.shadowColor = 'rgba(0,0,0,0.4)'; giftCtx.shadowBlur = 16; giftCtx.shadowOffsetY = 6;
    const gLid = giftCtx.createLinearGradient(lx, ly, lx + lw, ly + lh);
    gLid.addColorStop(0, '#7d1035'); gLid.addColorStop(0.5, '#56091f'); gLid.addColorStop(1, '#350310');
    giftCtx.fillStyle = gLid; giftCtx.beginPath(); giftCtx.roundRect(lx, ly, lw, lh, [5, 5, 0, 0]); giftCtx.fill();
    giftCtx.shadowBlur = 0; giftCtx.shadowOffsetY = 0;
    giftCtx.strokeStyle = 'rgba(201,168,124,0.4)'; giftCtx.lineWidth = 1; giftCtx.beginPath(); giftCtx.roundRect(lx, ly, lw, lh, [5, 5, 0, 0]); giftCtx.stroke();
    const gRib = giftCtx.createLinearGradient(lx + lw/2 - 12, 0, lx + lw/2 + 12, 0);
    gRib.addColorStop(0, '#e91e63'); gRib.addColorStop(0.4, '#f48fb1'); gRib.addColorStop(0.5, '#fce4ec'); gRib.addColorStop(0.6, '#f48fb1'); gRib.addColorStop(1, '#e91e63');
    giftCtx.fillStyle = gRib; giftCtx.fillRect(lx + lw/2 - 12, ly, 24, lh);
    drawBow(ox + W/2 - 8, ly - 10);
    giftCtx.globalAlpha = 1;
  }

  function drawBow(cx, cy) {
    giftCtx.save(); giftCtx.translate(cx - 8, cy + 6); giftCtx.rotate(-0.18);
    const gTailL = giftCtx.createLinearGradient(0, 0, 0, 22); gTailL.addColorStop(0, '#f48fb1'); gTailL.addColorStop(1, '#c2185b');
    giftCtx.fillStyle = gTailL; giftCtx.fillRect(-5, 0, 10, 22); giftCtx.restore();
    giftCtx.save(); giftCtx.translate(cx + 8, cy + 6); giftCtx.rotate(0.18);
    const gTailR = giftCtx.createLinearGradient(0, 0, 0, 22); gTailR.addColorStop(0, '#f48fb1'); gTailR.addColorStop(1, '#c2185b');
    giftCtx.fillStyle = gTailR; giftCtx.fillRect(-5, 0, 10, 22); giftCtx.restore();
    giftCtx.save(); giftCtx.translate(cx, cy);
    const gBL = giftCtx.createRadialGradient(-22, -14, 2, -16, -10, 28); gBL.addColorStop(0, '#f2e8d9'); gBL.addColorStop(0.5, '#f48fb1'); gBL.addColorStop(1, '#e91e63');
    giftCtx.fillStyle = gBL; giftCtx.beginPath(); giftCtx.ellipse(-22, -12, 26, 16, -0.45, 0, Math.PI * 2); giftCtx.fill(); giftCtx.restore();
    giftCtx.save(); giftCtx.translate(cx, cy);
    const gBR = giftCtx.createRadialGradient(22, -14, 2, 16, -10, 28); gBR.addColorStop(0, '#fce4ec'); gBR.addColorStop(0.5, '#f48fb1'); gBR.addColorStop(1, '#e91e63');
    giftCtx.fillStyle = gBR; giftCtx.beginPath(); giftCtx.ellipse(22, -12, 26, 16, 0.45, 0, Math.PI * 2); giftCtx.fill(); giftCtx.restore();
    const gK = giftCtx.createRadialGradient(cx, cy - 4, 0, cx, cy - 4, 12); gK.addColorStop(0, '#fce4ec'); gK.addColorStop(0.5, '#f48fb1'); gK.addColorStop(1, '#c2185b');
    giftCtx.fillStyle = gK; giftCtx.beginPath(); giftCtx.ellipse(cx, cy - 4, 12, 9, 0, 0, Math.PI * 2); giftCtx.fill();
    giftCtx.fillStyle = 'rgba(255,255,255,0.35)'; giftCtx.beginPath(); giftCtx.ellipse(cx - 3, cy - 7, 5, 3, -0.4, 0, Math.PI * 2); giftCtx.fill();
  }

  function drawParticles() {
    particles.forEach(p => {
      giftCtx.globalAlpha = p.alpha; giftCtx.font = `${p.size}px serif`; giftCtx.textAlign = 'center'; giftCtx.textBaseline = 'middle'; giftCtx.fillText(p.emoji, p.x, p.y);
    });
    giftCtx.globalAlpha = 1; giftCtx.textAlign = 'left'; giftCtx.textBaseline = 'alphabetic';
  }

  function render(t) {
    giftCtx.clearRect(0, 0, W, H);
    if (phase === 'idle') floatY = Math.sin(t * 0.0015) * 10;
    const ox = shakeX, oy = floatY;
    const gShadow = giftCtx.createRadialGradient(W/2, H - 14, 4, W/2, H - 14, 70);
    gShadow.addColorStop(0, 'rgba(201,168,124,0.18)'); gShadow.addColorStop(1, 'rgba(201,168,124,0)');
    giftCtx.fillStyle = gShadow; giftCtx.beginPath(); giftCtx.ellipse(W/2, H - 14, 70, 10, 0, 0, Math.PI * 2); giftCtx.fill();
    drawBox(ox, oy);
    if (lidAlpha > 0) drawLid(ox, oy, lidY, lidAlpha);
    drawParticles();
    if (shakeT > 0) { shakeT--; shakeX = Math.sin(shakeT * 1.2) * 5 * (shakeT / 18); }
    if (phase === 'open') { lidY -= 4.5; lidAlpha = Math.max(0, lidAlpha - 0.035); }
    particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.life -= 0.018; p.alpha = Math.max(0, p.life); });
    raf = requestAnimationFrame(render);
  }

  raf = requestAnimationFrame(render);

  cv.addEventListener('click', function () {
    if (opened) return;
    opened = true; hint.style.opacity = '0';
    phase  = 'shake'; shakeT = 18;
    setTimeout(() => { phase = 'open'; spawnParticles(); }, 350);
    setTimeout(() => {
      goTo('pageGift', 'page2');
      setTimeout(() => { opened = false; phase = 'idle'; lidY = 0; lidAlpha = 1; particles = []; hint.style.opacity = '1'; }, 900);
    }, 1600);
  });
})();

// ═══════════════════════════════════════════════════════
//  TOMBOL NAVIGASI
// ═══════════════════════════════════════════════════════
document.getElementById('readBtn').addEventListener('click', function () {
  goTo('page2', 'page3');
  setTimeout(startTyping, 700);
});

document.getElementById('memoriesBtn').addEventListener('click', function () {
  goTo('page3', 'page4');
});

document.getElementById('videoBtn').addEventListener('click', function () {
  goTo('page4', 'page5');
});

// ═══════════════════════════════════════════════════════
//  TYPING ANIMATION & AUTO SCROLL
// ═══════════════════════════════════════════════════════
var typing3Generation = 0;

function startTyping() {
  const el     = document.getElementById('typedText');
  const cursor = document.getElementById('cursor');
  const sign   = document.getElementById('sign');
  const page3  = document.getElementById('page3');

  typing3Generation++;
  const myGen = typing3Generation;

  el.textContent = '';
  cursor.classList.remove('done');
  sign.classList.remove('show');
  page3.scrollTop = 0;

  const chars = Array.from(LETTER_TEXT);
  let i = 0;

  function typeNext() {
    if (myGen !== typing3Generation) return;
    if (i >= chars.length) {
      cursor.classList.add('done');
      setTimeout(() => {
        if (myGen !== typing3Generation) return;
        sign.classList.add('show');
        page3.scrollTop = page3.scrollHeight;
      }, 400);
      return;
    }
    const ch = chars[i++];
    el.textContent += ch;
    page3.scrollTop = page3.scrollHeight;

    let delay = Math.random() * 30 + 22;
    if (ch === '\n') delay = 200;
    else if (ch === '.' || ch === ',' || ch === '!') delay = 120;
    setTimeout(typeNext, delay);
  }
  typeNext();
}

// ═══════════════════════════════════════════════════════
//  PARTIKEL — BACKGROUND (bintang + emoji jatuh)
// ═══════════════════════════════════════════════════════
const bgCanvas = document.getElementById('particles');
const bgCtx    = bgCanvas.getContext('2d');
let W, H;

function resize() {
  W = bgCanvas.width  = window.innerWidth;
  H = bgCanvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const stars = Array.from({ length: 100 }, () => ({
  x:     Math.random(), y: Math.random(),
  r:     0.4 + Math.random() * 1.3,
  alpha: 0.15 + Math.random() * 0.7,
  phase: Math.random() * Math.PI * 2,
  freq:  0.0004 + Math.random() * 0.0006,
}));

const drops = Array.from({ length: 28 }, () => ({
  x:        Math.random() * window.innerWidth,
  y:        Math.random() * window.innerHeight,
  size:     8 + Math.random() * 14,
  alpha:    0.08 + Math.random() * 0.18,
  vy:       0.4 + Math.random() * 0.9,
  sway:     Math.random() * Math.PI * 2,
  swaySpeed:0.008 + Math.random() * 0.016,
  rot:      Math.random() * Math.PI * 2,
  rotSpeed: (Math.random() - 0.5) * 0.03,
  colorIdx: Math.floor(Math.random() * 4)
}));

const leafColors = [
  [233, 30,  99],   // --gold  #e91e63
  [244, 143, 177],  // --gold2 #f48fb1
  [252, 228, 236],  // --cream #fce4ec
  [233, 30,  99],   // repeat gold for weight
];

function drawLeaf(ctx, x, y, size, rot, alpha, colorIdx) {
  const [r, g, b] = leafColors[colorIdx];
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  // simple leaf shape: two quadratic curves
  ctx.moveTo(0, -size);
  ctx.quadraticCurveTo( size * 0.8,  -size * 0.2, 0,  size);
  ctx.quadraticCurveTo(-size * 0.8,  -size * 0.2, 0, -size);
  ctx.fillStyle = `rgba(${r},${g},${b},1)`;
  ctx.fill();
  // midrib line
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(0,  size);
  ctx.strokeStyle = `rgba(${r},${g},${b},0.4)`;
  ctx.lineWidth = 0.6;
  ctx.stroke();
  ctx.restore();
}

function draw(t) {
  bgCtx.clearRect(0, 0, W, H);

  stars.forEach(s => {
    const a = s.alpha * (0.4 + 0.6 * Math.sin(t * s.freq + s.phase));
    bgCtx.beginPath();
    bgCtx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
    bgCtx.fillStyle = `rgba(242,232,217,${a})`;
    bgCtx.fill();
  });

  drops.forEach(d => {
    drawLeaf(bgCtx, d.x + Math.sin(d.sway) * 18, d.y, d.size, d.rot, d.alpha, d.colorIdx);
    d.y    += d.vy;
    d.sway += d.swaySpeed;
    d.rot  += d.rotSpeed;
    if (d.y > H + 20) { d.y = -20; d.x = Math.random() * W; }
  });
  bgCtx.globalAlpha = 1;

  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);


// ═══════════════════════════════════════════════════════
//  LEAF BURST — aktif saat foto 14/14 (harus di atas page4)
// ═══════════════════════════════════════════════════════
(function () {
  var bc  = document.getElementById('leafBurst');
  var bx  = bc.getContext('2d');
  var bW, bH;
  var burstLeaves = [];
  var burstActive = false;
  var burstRaf    = null;
  var spawnTimer  = 0;

  function resizeBurst() {
    bW = bc.width  = window.innerWidth;
    bH = bc.height = window.innerHeight;
  }
  resizeBurst();
  window.addEventListener('resize', resizeBurst);

  var burstColors = ['#e91e63','#f48fb1','#fce4ec','#c2185b','#f06292'];

  function spawnLeaf() {
    return {
      x: Math.random() * bW, y: -20,
      size: 10 + Math.random() * 18,
      alpha: 0.75 + Math.random() * 0.25,
      vy: 1.2 + Math.random() * 2,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.015 + Math.random() * 0.025,
      swayAmp: 20 + Math.random() * 30,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.06,
      color: burstColors[Math.floor(Math.random() * burstColors.length)]
    };
  }

  function drawBurstLeaf(leaf) {
    bx.save();
    bx.translate(leaf.x + Math.sin(leaf.sway) * leaf.swayAmp, leaf.y);
    bx.rotate(leaf.rot);
    bx.globalAlpha = leaf.alpha;
    bx.beginPath();
    bx.moveTo(0, -leaf.size);
    bx.quadraticCurveTo( leaf.size * 0.85, -leaf.size * 0.15, 0,  leaf.size);
    bx.quadraticCurveTo(-leaf.size * 0.85, -leaf.size * 0.15, 0, -leaf.size);
    bx.fillStyle = leaf.color;
    bx.fill();
    bx.beginPath();
    bx.moveTo(0, -leaf.size * 0.8);
    bx.lineTo(0,  leaf.size * 0.8);
    bx.strokeStyle = 'rgba(255,255,255,0.35)';
    bx.lineWidth = 0.8;
    bx.stroke();
    bx.restore();
  }

  function burstLoop() {
    if (!burstActive) return;
    bx.clearRect(0, 0, bW, bH);
    spawnTimer++;
    if (spawnTimer % 4 === 0) {
      for (var i = 0; i < 3; i++) burstLeaves.push(spawnLeaf());
    }
    if (burstLeaves.length > 120) burstLeaves.splice(0, burstLeaves.length - 120);
    burstLeaves.forEach(function (leaf) {
      drawBurstLeaf(leaf);
      leaf.y    += leaf.vy;
      leaf.sway += leaf.swaySpeed;
      leaf.rot  += leaf.rotSpeed;
    });
    burstLeaves = burstLeaves.filter(function (l) { return l.y < bH + 30; });
    burstRaf = requestAnimationFrame(burstLoop);
  }

  window.startLeafBurst = function () {
    if (burstActive) return;
    burstActive = true; burstLeaves = []; spawnTimer = 0;
    bc.style.opacity = '1';
    burstRaf = requestAnimationFrame(burstLoop);
    // otomatis berhenti setelah 4 detik
    setTimeout(function () { window.stopLeafBurst(); }, 4000);
  };

  window.stopLeafBurst = function () {
    burstActive = false;
    bc.style.opacity = '0';
    if (burstRaf) cancelAnimationFrame(burstRaf);
    setTimeout(function () { bx.clearRect(0, 0, bW, bH); burstLeaves = []; }, 500);
  };
})();

// ═══════════════════════════════════════════════════════
//  PAGE 4 — PHOTO CAROUSEL
// ═══════════════════════════════════════════════════════
(function () {
  var viewport = document.getElementById('p4Viewport');
  var track    = document.getElementById('p4Track');
  var counter  = document.getElementById('p4Counter');
  var dotsWrap = document.getElementById('p4Dots');
  var slides   = Array.from(document.querySelectorAll('.p4-slide'));
  var total    = slides.length;
  var current  = 0;
  var startX   = 0;
  var diffX    = 0;
  var dragging = false;

  // Build dots
  var dots = slides.map(function (_, i) {
    var d = document.createElement('span');
    d.className = 'p4-dot' + (i === 0 ? ' active' : '');
    dotsWrap.appendChild(d);
    return d;
  });

  function goSlide(index) {
    current = (index + total) % total;
    track.style.transform = 'translateX(-' + (current * viewport.offsetWidth) + 'px)';
    counter.textContent   = (current + 1) + ' / ' + total;
    dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
    // trigger leaf burst on last slide (index 13 = foto 14/14)
    if (current === total - 1) startLeafBurst();
    else stopLeafBurst();
  }

  // Touch
  viewport.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX; diffX = 0; dragging = true;
    track.style.transition = 'none';
  }, { passive: true });

  viewport.addEventListener('touchmove', function (e) {
    if (!dragging) return;
    diffX = e.touches[0].clientX - startX;
    track.style.transform = 'translateX(' + (-(current * viewport.offsetWidth) + diffX) + 'px)';
  }, { passive: true });

  viewport.addEventListener('touchend', function () {
    dragging = false;
    track.style.transition = 'transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94)';
    if (diffX < -50)      goSlide(current + 1);
    else if (diffX > 50)  goSlide(current - 1);
    else                  goSlide(current);
  });

  // Mouse drag
  viewport.addEventListener('mousedown', function (e) {
    startX = e.clientX; diffX = 0; dragging = true;
    track.style.transition = 'none';
  });

  window.addEventListener('mousemove', function (e) {
    if (!dragging) return;
    diffX = e.clientX - startX;
    track.style.transform = 'translateX(' + (-(current * viewport.offsetWidth) + diffX) + 'px)';
  });

  window.addEventListener('mouseup', function () {
    if (!dragging) return;
    dragging = false;
    track.style.transition = 'transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94)';
    if (diffX < -60)      goSlide(current + 1);
    else if (diffX > 60)  goSlide(current - 1);
    else                  goSlide(current);
  });

  goSlide(0);
})();

// ═══════════════════════════════════════════════════════
//  PAGE 5 — VIDEO SLIDER
// ═══════════════════════════════════════════════════════
(function () {
  var viewport = document.getElementById('p5Viewport');
  var track    = document.getElementById('p5Track');
  var counter  = document.getElementById('p5Counter');
  var dots     = Array.from(document.querySelectorAll('.p5-dot'));
  var videos   = Array.from(document.querySelectorAll('.p5-video'));
  var overlays = Array.from(document.querySelectorAll('.p5-play-overlay'));
  var playBtns = Array.from(document.querySelectorAll('.p5-play-btn'));
  var total    = videos.length;
  var current  = 0;
  var startX   = 0;
  var diffX    = 0;
  var dragging = false;

  function goSlide(index) {
    var prevVideo = videos[current];
    // Only try to pause if it's actually playing
    if (!prevVideo.paused) {
      prevVideo.pause();
    }
    overlays[current].classList.remove('hidden');

    current = (index + total) % total;
    track.style.transform = 'translateX(-' + (current * viewport.offsetWidth) + 'px)';
    counter.textContent   = (current + 1) + ' / ' + total;
    dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
  }

  playBtns.forEach(function (btn, i) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var vid = videos[i];
      if (vid.paused) {
        vid.play().then(function() {
          overlays[i].classList.add('hidden');
        }).catch(function(err) {
          console.log('Video play failed:', err);
        });
      } else {
        vid.pause();
        overlays[i].classList.remove('hidden');
      }
    });
  });

  // Allow clicking the video itself to pause
  videos.forEach(function (vid, i) {
    vid.addEventListener('click', function () {
      if (!vid.paused) {
        vid.pause();
        overlays[i].classList.remove('hidden');
      }
    });
  });

  videos.forEach(function (vid, i) {
    vid.addEventListener('ended', function () { overlays[i].classList.remove('hidden'); });
  });

  /* Touch swipe */
  viewport.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX; diffX = 0; dragging = true;
    track.style.transition = 'none';
  }, { passive: true });

  viewport.addEventListener('touchmove', function (e) {
    if (!dragging) return;
    diffX = e.touches[0].clientX - startX;
    track.style.transform = 'translateX(' + (-(current * viewport.offsetWidth) + diffX) + 'px)';
  }, { passive: true });

  viewport.addEventListener('touchend', function () {
    dragging = false;
    track.style.transition = 'transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94)';
    if (diffX < -50) goSlide(current + 1);
    else if (diffX > 50) goSlide(current - 1);
    else goSlide(current);
  });

  /* Mouse drag */
  viewport.addEventListener('mousedown', function (e) {
    startX = e.clientX; diffX = 0; dragging = true;
    track.style.transition = 'none';
  });

  window.addEventListener('mousemove', function (e) {
    if (!dragging) return;
    diffX = e.clientX - startX;
    track.style.transform = 'translateX(' + (-(current * viewport.offsetWidth) + diffX) + 'px)';
  });

  window.addEventListener('mouseup', function () {
    if (!dragging) return;
    dragging = false;
    track.style.transition = 'transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94)';
    if (diffX < -60) goSlide(current + 1);
    else if (diffX > 60) goSlide(current - 1);
    else goSlide(current);
  });

  goSlide(0);
})();


// ═══════════════════════════════════════════════════════
//  PAGE 5 → PAGE 6 BUTTON
// ═══════════════════════════════════════════════════════
document.getElementById('wishesBtn').addEventListener('click', function () {
  goTo('page5', 'page6');
  setTimeout(startTyping6, 450);
});

// ═══════════════════════════════════════════════════════
//  PAGE 6 — TYPING EFFECT (wishes letter)
// ═══════════════════════════════════════════════════════
var typing6Generation = 0;

function startTyping6() {
  var el     = document.getElementById('typedText6');
  var cursor = document.getElementById('cursor6');
  var sign   = document.getElementById('sign6');
  var page6  = document.getElementById('page6');

  // Batalkan instance typing sebelumnya
  typing6Generation++;
  var myGen = typing6Generation;

  el.textContent = '';
  cursor.classList.remove('done');
  sign.classList.remove('show');
  page6.scrollTop = 0;

  var chars = Array.from(WISHES_TEXT); // handle emoji dengan benar
  var i = 0;

  function typeNext() {
    if (myGen !== typing6Generation) return; // instance lama, berhenti
    if (i >= chars.length) {
      cursor.classList.add('done');
      setTimeout(function () {
        if (myGen !== typing6Generation) return;
        sign.classList.add('show');
        page6.scrollTop = page6.scrollHeight;
      }, 400);
      return;
    }
    var ch = chars[i++];
    el.textContent += ch;
    page6.scrollTop = page6.scrollHeight;

    var delay = Math.random() * 30 + 22;
    if (ch === '\n') delay = 200;
    else if (ch === '.' || ch === ',' || ch === '!') delay = 120;
    setTimeout(typeNext, delay);
  }
  typeNext();
}

// ═══════════════════════════════════════════════════════
//  PAGE 6 → PAGE 3 RESTART BUTTON
// ═══════════════════════════════════════════════════════
document.getElementById('restartBtn').addEventListener('click', function () {
  goTo('page6', 'page4');
});
