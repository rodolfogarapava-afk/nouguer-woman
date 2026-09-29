const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const siteNav = document.querySelector('[data-site-nav]');

const savedTheme = localStorage.getItem('nogueira-theme');
if (savedTheme === 'noir') root.dataset.theme = 'noir';

function syncThemeLabel() {
  if (!themeToggle) return;
  const isNoir = root.dataset.theme === 'noir';
  themeToggle.textContent = isNoir ? 'OFF' : 'NOIR';
  themeToggle.setAttribute('aria-label', isNoir ? 'Usar fundo off-white' : 'Usar fundo preto');
}

syncThemeLabel();

themeToggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'noir' ? 'off' : 'noir';
  root.dataset.theme = next;
  localStorage.setItem('nogueira-theme', next);
  syncThemeLabel();
});

menuToggle?.addEventListener('click', () => {
  const open = siteNav?.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(Boolean(open)));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && siteNav?.classList.contains('is-open')) {
    siteNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.focus();
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));

const filterButtons = document.querySelectorAll('[data-filter]');
const articleCards = document.querySelectorAll('[data-category]');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    articleCards.forEach((card) => {
      const matches = filter === 'tous' || card.dataset.category === filter;
      card.hidden = !matches;
    });
  });
});

document.querySelectorAll('[data-article-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.getAttribute('aria-controls'));
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    button.textContent = expanded ? 'Lire la note' : 'Fermer';
    target.hidden = expanded;
  });
});

const socialStatus = document.querySelector('[data-social-status]');

document.querySelectorAll('[data-social-placeholder]').forEach((button) => {
  button.addEventListener('click', () => {
    const network = button.dataset.socialPlaceholder;
    if (!socialStatus) return;
    socialStatus.textContent = `${network} da Nouguer — perfil oficial em breve.`;
    socialStatus.classList.add('is-active');
  });
});
