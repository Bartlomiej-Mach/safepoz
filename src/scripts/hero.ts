// Lightweight autoplay carousel with direct slide controls.
export function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;

  const slides = [...hero.querySelectorAll<HTMLElement>('[data-hero-slide]')];
  const dots = [...hero.querySelectorAll<HTMLButtonElement>('[data-hero-dot]')];
  const count = hero.querySelector<HTMLElement>('[data-hero-count]');
  if (slides.length < 2 || !dots.length) return;

  let activeIndex = 0;
  let timer = 0;

  const showSlide = (index: number) => {
    activeIndex = index;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-pressed', String(isActive));
    });
    if (count) count.firstChild!.textContent = `0${activeIndex + 1} `;
  };

  const stop = () => window.clearInterval(timer);
  const start = () => {
    stop();
    timer = window.setInterval(() => showSlide((activeIndex + 1) % slides.length), 6000);
  };

  dots.forEach((dot) =>
    dot.addEventListener('click', () => {
      showSlide(Number(dot.dataset.heroDot));
      start();
    }),
  );

  start();
}
