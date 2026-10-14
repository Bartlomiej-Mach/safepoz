// Handles the fixed header state and accessible mobile navigation.
export function initNavbar() {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-nav-menu]');

  if (!header || !toggle || !menu) return;

  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Otwórz menu');
    menu.classList.remove('is-open');
    document.body.classList.remove('nav-is-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Otwórz menu' : 'Zamknij menu');
    menu.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('nav-is-open', !isOpen);
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}
