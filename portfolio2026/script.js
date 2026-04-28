// ============================================
//  PORTFOLIO — JULIA NUNES VILELA
//  script.js
// ============================================

// --- CURSOR PERSONALIZADO ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Follower com lag suave
function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Efeito hover nos links
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '14px';
    cursor.style.height = '14px';
    cursor.style.background = '#db2777';
    follower.style.width  = '48px';
    follower.style.height = '48px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '8px';
    cursor.style.height = '8px';
    cursor.style.background = '#ec4899';
    follower.style.width  = '32px';
    follower.style.height = '32px';
  });
});

// --- NAV SCROLL ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// --- REVEAL ON SCROLL ---
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger: cada elemento aparece um pouquinho depois do anterior
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Adiciona delay sequencial para elementos dentro do mesmo pai
revealEls.forEach((el) => {
  revealObserver.observe(el);
});

// Stagger automático para grupos
document.querySelectorAll('.skill-group, .project-card, .contato-item').forEach((parent) => {
  const reveals = parent.querySelectorAll ? [] : [];
});

// Stagger por seção
['skills-grid', 'projects-grid', 'contato-links', 'hero-cta'].forEach(cls => {
  const container = document.querySelector('.' + cls);
  if (!container) return;
  const children = container.querySelectorAll('.reveal, .skill-group, .project-card, .contato-item');
  children.forEach((el, i) => {
    el.style.transitionDelay = (i * 0.1) + 's';
  });
});

// --- SMOOTH SCROLL NOS LINKS DO NAV ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      const navH = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- REVEAL IMEDIATO DO HERO ---
window.addEventListener('load', () => {
  const heroReveals = document.querySelectorAll('.hero .reveal');
  heroReveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 300 + i * 180);
  });
});