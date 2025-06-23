/*  component.pricingTabsIndicator.js
   ------------------------------------------------------------ */
export default function initPricingTabsIndicator() {
  const menu      = document.querySelector('.pricing_table_tab-menu');
  const indicator = document.querySelector('.pricing_table-tabs-indicator');
  if (!menu || !indicator) return;  // bail if not on page

  /* ------------------------------------------------------------
     core: move the indicator under a given <a>
  ------------------------------------------------------------ */
  const moveIndicator = (link) => {
    if (!link) return;
    const linkRect = link.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    const offset   = linkRect.left - menuRect.left + menu.scrollLeft;

    indicator.style.width     = `${linkRect.width}px`;
    indicator.style.transform = `translateX(${offset}px)`;
  };

  /* ------------------------------------------------------------
     1️⃣ set-up – place indicator inside menu for easy positioning
  ------------------------------------------------------------ */
  if (indicator.parentElement !== menu) menu.appendChild(indicator);

  /* ------------------------------------------------------------
     2️⃣ helper – find the tab that is actually active (.w--current)
  ------------------------------------------------------------ */
  const getActiveTab = () =>
    menu.querySelector('.pricing_table_tab-link.w--current');

  /* ------------------------------------------------------------
     3️⃣ align on load
  ------------------------------------------------------------ */
  moveIndicator(getActiveTab());

  /* ------------------------------------------------------------
     4️⃣ hover behaviour
  ------------------------------------------------------------ */
  menu.addEventListener('mouseenter', (e) => {
    const link = e.target.closest('.pricing_table_tab-link');
    if (link) moveIndicator(link);
  }, true); // use capture so it fires as soon as link is entered

  menu.addEventListener('mouseover', (e) => {
    const link = e.target.closest('.pricing_table_tab-link');
    if (link) moveIndicator(link);
  });

  menu.addEventListener('mouseleave', () => {
    moveIndicator(getActiveTab());   // snap back to the active tab
  });

  /* ------------------------------------------------------------
     5️⃣ click handling – after Webflow swaps .w--current
  ------------------------------------------------------------ */
  menu.addEventListener('click', (e) => {
    const link = e.target.closest('.pricing_table_tab-link');
    if (!link) return;
    setTimeout(() => moveIndicator(getActiveTab() || link), 10);
  });

  /* ------------------------------------------------------------
     6️⃣ keep it correct on resize
  ------------------------------------------------------------ */
  window.addEventListener('resize', () => moveIndicator(getActiveTab()));
}
