// Filters city links by region and query, with a mobile expand control.
export function initCityFilter() {
  const root = document.querySelector<HTMLElement>('[data-city-area]');
  if (!root) return;

  const items = [...root.querySelectorAll<HTMLElement>('[data-city-item]')];
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-region]')];
  const search = root.querySelector<HTMLInputElement>('[data-city-search]');
  const count = root.querySelector<HTMLElement>('[data-city-count]');
  const list = root.querySelector<HTMLElement>('[data-city-list]');
  const expand = root.querySelector<HTMLButtonElement>('[data-city-expand]');
  const empty = root.querySelector<HTMLElement>('[data-city-empty]');
  if (!search || !list || !expand || !count || !empty) return;

  root.classList.add('has-filter');
  let region = 'slask';
  let expanded = false;
  const isMobile = () => window.matchMedia('(max-width: 639px)').matches;
  const cityWord = (value: number) => {
    if (value % 10 === 1 && value % 100 !== 11) return 'miasto';
    if (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 12 || value % 100 > 14)) {
      return 'miasta';
    }
    return 'miast';
  };

  const render = () => {
    const query = search.value.trim().toLocaleLowerCase('pl');
    const matching = items.filter((item) => {
      const visible =
        (region === 'polska' || item.dataset.region === 'slask') &&
        item.dataset.name?.includes(query);
      item.hidden = !visible;
      return visible;
    });

    if (isMobile() && !expanded && query.length === 0) {
      matching.forEach((item, index) => {
        item.hidden = index >= 12;
      });
    }

    count.textContent = `${matching.length} ${cityWord(matching.length)}`;
    empty.hidden = matching.length > 0;
    expand.hidden = !isMobile() || matching.length <= 12 || query.length > 0;
    expand.setAttribute('aria-expanded', String(expanded));
    list.classList.toggle('is-expanded', isMobile() && expanded);
    expand.firstChild!.textContent = expanded ? 'Pokaż mniej ' : 'Pokaż wszystkie miasta ';
    list.setAttribute('aria-labelledby', `tab-${region}`);
  };

  tabs.forEach((tab) =>
    tab.addEventListener('click', () => {
      region = tab.dataset.region ?? 'slask';
      expanded = false;
      tabs.forEach((entry) => {
        const selected = entry === tab;
        entry.classList.toggle('is-active', selected);
        entry.setAttribute('aria-selected', String(selected));
        entry.tabIndex = selected ? 0 : -1;
      });
      render();
    }),
  );

  tabs.forEach((tab, index) =>
    tab.addEventListener('keydown', (event) => {
      const nextIndex =
        event.key === 'ArrowRight'
          ? (index + 1) % tabs.length
          : event.key === 'ArrowLeft'
            ? (index - 1 + tabs.length) % tabs.length
            : event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? tabs.length - 1
                : -1;
      if (nextIndex < 0) return;
      event.preventDefault();
      tabs[nextIndex].focus();
      tabs[nextIndex].click();
    }),
  );

  search.addEventListener('input', render);
  expand.addEventListener('click', () => {
    expanded = !expanded;
    render();
  });
  window.addEventListener('resize', render, { passive: true });
  render();
}
