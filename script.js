// ===== 다크 모드 토글 =====
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function currentTheme() {
  const set = root.getAttribute('data-theme');
  if (set) return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

themeToggle.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// ===== 모바일 메뉴 =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

function setMenu(open) {
  navMenu.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
}

menuToggle.addEventListener('click', () => setMenu(!navMenu.classList.contains('open')));
navMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

// ===== 스크롤 시 네비게이션 테두리 =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ===== 스크롤 등장 애니메이션 =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ===== 현재 보고 있는 섹션 메뉴 강조 =====
const menuLinks = navMenu.querySelectorAll('a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      menuLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));

// ===== 푸터 연도 =====
document.getElementById('year').textContent = new Date().getFullYear();
