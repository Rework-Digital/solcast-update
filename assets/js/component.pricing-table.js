// component.pricingTabsIndicator.js
// export default function initPricingTabsIndicator() {
//   const wrappers = document.querySelectorAll('.pricing_table-wrapper');
//   if (!wrappers.length) return;

//   const instances = [];

//   wrappers.forEach(wrap => {
//     const menu      = wrap.querySelector('.pricing_table_tab-menu');
//     const indicator = wrap.querySelector('.pricing_table-tabs-indicator');
//     if (!menu || !indicator) return;

//     if (indicator.parentElement !== menu) menu.appendChild(indicator);

//     const links  = Array.from(menu.querySelectorAll('.pricing_table_tab-link'));
//     let cache    = [];

//     const measure = () => {
//       const mRect = menu.getBoundingClientRect();
//       cache = links.map(l => {
//         const r = l.getBoundingClientRect();
//         return { link: l, w: r.width, x: r.left - mRect.left + menu.scrollLeft };
//       });
//     };

//     const move = ({ w, x }) =>
//       requestAnimationFrame(() => {
//         indicator.style.width     = `${w}px`;
//         indicator.style.transform = `translateX(${x}px)`;
//       });

//     const active = () =>
//       cache.find(o => o.link.classList.contains('w--current')) || cache[0];

//     measure();
//     move(active());

//     menu.addEventListener(
//       'pointerenter',
//       e => {
//         const l = e.target.closest('.pricing_table_tab-link');
//         if (l) move(cache.find(o => o.link === l));
//       },
//       true
//     );
//     menu.addEventListener('pointerleave', () => move(active()));
//     menu.addEventListener('click', e => {
//       if (e.target.closest('.pricing_table_tab-link'))
//         setTimeout(() => move(active()), 0);
//     });
//     menu.addEventListener(
//       'scroll',
//       () => {
//         const mRect = menu.getBoundingClientRect();
//         cache.forEach(o => {
//           const r = o.link.getBoundingClientRect();
//           o.x = r.left - mRect.left + menu.scrollLeft;
//         });
//         move(active());
//       },
//       { passive: true }
//     );

//     instances.push({ measure, active, move });
//   });

//   let rid;
//   window.addEventListener(
//     'resize',
//     () => {
//       clearTimeout(rid);
//       rid = setTimeout(() => {
//         instances.forEach(i => {
//           i.measure();
//           i.move(i.active());
//         });
//       }, 120);
//     },
//     { passive: true }
//   );
// }

  Webflow.push(function () {
    function moveTabIndicator(tabName) {
      document.querySelectorAll('.pricing_table-wrapper').forEach(wrap => {
        const menu = wrap.querySelector('.pricing_table_tab-menu');
        const indicator = menu?.querySelector('.pricing_table-tabs-indicator');
        if (!menu || !indicator) return;

        const links = Array.from(menu.querySelectorAll('.pricing_table_tab-link'));
        const mRect = menu.getBoundingClientRect();
        const cache = links.map(l => {
          const r = l.getBoundingClientRect();
          return { link: l, w: r.width, x: r.left - mRect.left + menu.scrollLeft };
        });

        const active = cache.find(o => o.link.classList.contains('w--current')) || cache[0];
        if (active) {
          indicator.style.width = `${active.w}px`;
          indicator.style.transform = `translateX(${active.x}px)`;
        }
      });
    }

    function changeTabFromHash() {
      const tabName = window.location.hash.substr(1);
      const $tabEl = $('[data-w-tab="' + tabName + '"]');
      if ($tabEl.length) {
        $tabEl.click();

        // Delay to allow Webflow to apply .w--current
        setTimeout(() => moveTabIndicator(tabName), 50);
      }
    }

    // On page load
    if (window.location.hash) {
      changeTabFromHash();
    }

    // On manual hash change (internal navigation)
    $(window).on('hashchange', changeTabFromHash);

    // Update URL hash and move indicator when user clicks a tab
    $('[data-w-tab]').on('click', function () {
      const tabName = $(this).data('w-tab');
      history.pushState({}, '', '#' + tabName);

      // Move indicator immediately after click
      setTimeout(() => moveTabIndicator(tabName), 0);
    });
  });