const roster = [
  {
    nickname: "TL-KATAA_69",
    realName: "MD ADOR",
    avatar: "./assets/ador.jpeg",
    country: "🇧🇩",
    join: "05-12-2024",
    matches: 101,
    eliminations: 412,
    assists: 497,
    highest: 13,
    favoriteWeapon: "M590 / Trogon",
    role: "1st Rusher / Primary Rusher",
  },
  {
    nickname: "TL-FASTER_89",
    realName: "SAHED RAHMAN",
    avatar: "./assets/sahed.jpeg",
    country: "🇧🇩",
    join: "03-11-2025",
    matches: 96,
    eliminations: 201,
    assists: 280,
    highest: 9,
    favoriteWeapon: "M590 / MAG-7",
    role: "2nd Rusher / Secondary Rusher",
  },
  {
    nickname: "TL-PYTHON",
    realName: "SOHEL AHMED",
    avatar: "./assets/sohel.jpeg",
    country: "🇧🇩",
    join: "26-12-2025",
    matches: null,
    eliminations: null,
    assists: null,
    highest: null,
    favoriteWeapon: "M590 / MAG-7",
    role: "All-Rounder / All",
  },
  {
    nickname: "TL-RAPTOR_89",
    realName: "PARVEJ KHAN",
    avatar: "./assets/parvej.jpeg",
    country: "🇧🇩",
    join: "01-02-2022",
    matches: 60,
    eliminations: 138,
    assists: 410,
    highest: 8,
    favoriteWeapon: "Trogon / Winchester",
    role: "Supporter / Management + Founder",
  },
  {
    nickname: "TL-FLASH_69",
    realName: "EMON AHMED",
    avatar: "./assets/emon.jpeg",
    country: "🇧🇩",
    join: "03-10-2025",
    matches: 70,
    eliminations: 198,
    assists: 291,
    highest: 9,
    favoriteWeapon: "M590 / AC80",
    role: "2nd & 1st Rusher / Backup",
  },
  {
    nickname: "TL-FLIXER_44",
    realName: "KHADIMUL",
    avatar: "./assets/khadimul.jpeg",
    country: "🇧🇩",
    join: "03-11-2023",
    matches: 80,
    eliminations: 178,
    assists: 298,
    highest: 11,
    favoriteWeapon: "AWM / VSK-94",
    role: "2nd Rusher & Sniper / Manager",
  },
  {
    nickname: "TL-JUBAYER",
    realName: "JUBAYER AHMED",
    avatar: "./assets/jubayer.jpeg",
    country: "🇧🇩",
    join: "26-12-2025",
    matches: null,
    eliminations: null,
    assists: null,
    highest: null,
    favoriteWeapon: "AC80 / MAG-7",
    role: "Supporter / Backup",
  },
  {
    nickname: "TL-MAHI_GOD",
    realName: "MD XAHID KHAN",
    avatar: "./assets/xahid.jpeg",
    country: "🇧🇩",
    join: "05-11-2025",
    matches: 50,
    eliminations: 113,
    assists: 260,
    highest: 6,
    favoriteWeapon: "AWM / VSK-94",
    role: "Sniper / Backup & Management",
  },
];

const safeNum = (v) => Number.isFinite(v) ? v : null;
const displayVal = (v) => Number.isFinite(v) ? v : "--";

const rosterGrid = document.querySelector('.roster-grid');

function renderRoster() {
  const maxMatches = Math.max(...roster.map(r => safeNum(r.matches) ?? 0), 1);
  rosterGrid.innerHTML = '';

  roster.forEach(player => {
    const matchPct = Number.isFinite(player.matches) ? Math.min(100, Math.round((player.matches / maxMatches) * 100)) : 0;
    const elimPct = Number.isFinite(player.eliminations) ? Math.min(100, Math.round((player.eliminations / (maxMatches * 10)) * 100)) : 0;
    const assistPct = Number.isFinite(player.assists) ? Math.min(100, Math.round((player.assists / (maxMatches * 6)) * 100)) : 0;

    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-header">
        <img class="avatar" src="${player.avatar}" alt="${player.realName}" loading="lazy" />
        <div class="names">
          <h3 class="nickname">${player.nickname}</h3>
          <p class="real-name">${player.realName}</p>
        </div>
      </div>
      <div class="info-strip">
        <span>${player.country}</span>
        <span>Joined: ${player.join}</span>
      </div>
      <div class="stats-box">
        <h4>Career Stats</h4>
        <div class="stat-line">
          <span>Matches</span>
          <span>${displayVal(player.matches)}</span>
        </div>
        <div class="bar" style="--stat-value:${matchPct}"><span></span></div>
        <div class="stat-line">
          <span>Eliminations</span>
          <span>${displayVal(player.eliminations)}</span>
        </div>
        <div class="bar" style="--stat-value:${elimPct}"><span></span></div>
        <div class="stat-line">
          <span>Assists</span>
          <span>${displayVal(player.assists)}</span>
        </div>
        <div class="bar" style="--stat-value:${assistPct}"><span></span></div>
        <div class="stat-line highest">
          <span>Highest Elims</span>
          <span>${displayVal(player.highest)}</span>
        </div>
      </div>
      <div class="loadout">
        <div><strong>Role:</strong> ${player.role}</div>
        <div><strong>Favorite Weapon:</strong> ${player.favoriteWeapon}</div>
      </div>
    `;
    rosterGrid.appendChild(card);
  });
}

function setupMusic() {
  const audio = document.getElementById('bg-music');
  const toggle = document.getElementById('music-toggle');
  let engaged = false;

  const engage = async () => {
    try {
      audio.volume = 0.35;
      await audio.play();
      engaged = true;
      toggle.textContent = '🔇 Mute Audio';
      toggle.classList.add('active');
    } catch (err) {
      console.warn('Playback blocked by browser gesture requirement:', err);
    }
  };

  toggle.addEventListener('click', async () => {
    if (!engaged) {
      await engage();
      return;
    }
    if (audio.paused) {
      await audio.play();
      toggle.textContent = '🔇 Mute Audio';
    } else {
      audio.pause();
      toggle.textContent = '🔊 Engage Audio';
    }
  });

  document.addEventListener('pointerdown', () => {
    if (!engaged) engage();
  }, { once: true });
}

function heroIntro() {
  if (typeof anime === 'undefined') return;
  anime.timeline({ easing: 'easeOutExpo' })
    .add({ targets: '.glitch', translateY: [26, 0], opacity: [0, 1], duration: 900 })
    .add({ targets: '.hero .subtitle', translateY: [16, 0], opacity: [0, 1], duration: 600 }, '-=420')
    .add({ targets: '.hero .cta', translateY: [14, 0], opacity: [0, 1], delay: anime.stagger(80), duration: 500 }, '-=320')
    .add({ targets: '.hero .stat', translateY: [16, 0], opacity: [0, 1], delay: anime.stagger(90), duration: 520 }, '-=320')
    .add({ targets: '.hero-logo-wrap', scale: [0.92, 1], opacity: [0, 1], duration: 720 }, '-=520');
}

function setupScrollAnims() {
  const items = document.querySelectorAll('[data-animate]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('animate-in');

      if (typeof anime !== 'undefined') {
        const cards = entry.target.querySelectorAll('.card');
        const blocks = entry.target.querySelectorAll('.history-block');
        const targets = cards.length ? cards : blocks;
        if (targets.length) {
          anime({
            targets,
            translateY: [20, 0],
            opacity: [0, 1],
            delay: anime.stagger(90),
            duration: 700,
            easing: 'easeOutQuad',
          });
        }
      }
      io.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  items.forEach(el => io.observe(el));
}

function setupCardHover() {
  if (typeof anime === 'undefined') return;
  rosterGrid.addEventListener('pointerenter', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    anime.remove(card);
    anime({ targets: card, translateY: -4, scale: 1.01, duration: 240, easing: 'easeOutQuad' });
  }, true);

  rosterGrid.addEventListener('pointerleave', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    anime.remove(card);
    anime({ targets: card, translateY: 6, scale: 1, duration: 260, easing: 'easeOutQuad' });
  }, true);
}

function setupTilt() {
  const wrap = document.querySelector('.hero-logo-wrap');
  if (!wrap || typeof anime === 'undefined') return;

  wrap.addEventListener('pointermove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    anime.remove(wrap);
    anime({
      targets: wrap,
      rotateX: y * 6,
      rotateY: -x * 6,
      duration: 240,
      easing: 'easeOutQuad'
    });
  });

  wrap.addEventListener('pointerleave', () => {
    anime.remove(wrap);
    anime({ targets: wrap, rotateX: 0, rotateY: 0, duration: 360, easing: 'easeOutQuad' });
  });
}

function init() {
  renderRoster();
  setupMusic();
  setupScrollAnims();
  setupCardHover();
  setupTilt();
  heroIntro();
}

document.addEventListener('DOMContentLoaded', init);
