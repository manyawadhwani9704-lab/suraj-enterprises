/* ═══════════════════════════════════════════
   SURAJ ENTERPRISES — Interactive JS
   ═══════════════════════════════════════════ */

// ── NAVBAR ──
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  highlightActiveNav();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── ACTIVE NAV HIGHLIGHT ──
function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let currentId = '';
  sections.forEach(sec => {
    if (window.scrollY + 120 >= sec.offsetTop) currentId = sec.id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) link.classList.add('active');
  });
}

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = parseFloat(getComputedStyle(entry.target).getPropertyValue('--delay') || '0');
      setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ── ANIMATED COUNTERS ──
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsWrap = document.querySelector('.hero-stats');
if (statsWrap) counterObserver.observe(statsWrap);

// ── FLOATING PARTICLES ──
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = window.innerWidth < 768 ? 12 : 22;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${Math.random() * 100}%;
      bottom: ${Math.random() * -20}%;
      animation-duration:  ${Math.random() * 12 + 8}s;
      animation-delay:     ${Math.random() * 8}s;
      opacity: ${Math.random() * 0.5 + 0.2};
    `;
    container.appendChild(p);
  }
}
createParticles();

// ── PRODUCT TABS ──
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    tabContents.forEach(tc => {
      tc.classList.remove('active');
      // re-trigger reveal animations in the tab
      tc.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        el.classList.remove('visible');
      });
    });

    const target = document.getElementById(`content-${tab}`);
    target.classList.add('active');

    // trigger animations for newly visible tab
    requestAnimationFrame(() => {
      target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 80);
      });
    });
  });
});

// Trigger animations for initially active tab
requestAnimationFrame(() => {
  document.querySelectorAll('#content-dairy .reveal, #content-dairy .reveal-left, #content-dairy .reveal-right').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 80);
  });
});

// ── SPICE CHIP HOVER RIPPLE ──
document.querySelectorAll('.spice-chip').forEach(chip => {
  chip.addEventListener('mouseenter', (e) => {
    chip.style.transform = `scale(1.08) rotate(${(Math.random() - 0.5) * 6}deg)`;
  });
  chip.addEventListener('mouseleave', () => {
    chip.style.transform = '';
  });
});

// ── SMOOTH ANCHOR OFFSET (for fixed navbar) ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

// ── PARALLAX HERO IMAGE ──
const heroImg = document.querySelector('.hero-img');
window.addEventListener('scroll', () => {
  if (!heroImg) return;
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroImg.style.transform = `translateY(${scrolled * 0.08}px)`;
  }
});
