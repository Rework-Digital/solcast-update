export default function initPricingTabsIndicator() {
  const menu = document.querySelector('.pricing_table_tab-menu');
  const indicator = document.querySelector('.pricing_table-tabs-indicator');

  if (!menu || !indicator) return;

  function moveIndicator(link) {
    const linkRect = link.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const offset = linkRect.left - menuRect.left + menu.scrollLeft;

    indicator.style.width = `${linkRect.width}px`;
    indicator.style.transform = `translateX(${offset}px)`;
  }

  // Move indicator inside menu once (so it can align using bottom: 0)
  if (indicator.parentElement !== menu) {
    menu.appendChild(indicator);
  }

  // Initial alignment
  const current = menu.querySelector('.pricing_table_tab-link.w--current');
  if (current) moveIndicator(current);

  // On tab click
  menu.addEventListener('click', (e) => {
    const link = e.target.closest('.pricing_table_tab-link');
    if (!link) return;

    setTimeout(() => {
      const active = menu.querySelector('.pricing_table_tab-link.w--current') || link;
      moveIndicator(active);
    }, 10);
  });

  // Reposition on resize
  window.addEventListener('resize', () => {
    const active = menu.querySelector('.pricing_table_tab-link.w--current');
    if (active) moveIndicator(active);
  });
}
