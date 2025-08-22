(function initQuoteLinks() {
  const SELECTOR = 'a[data-listener="btn-request-quote"]';
  const PROCESSED_ATTR = 'data-quote-init';

  const buttons = document.querySelectorAll(SELECTOR);

  buttons.forEach(button => {
    if (button.getAttribute(PROCESSED_ATTR) === '1') return;
    button.setAttribute(PROCESSED_ATTR, '1');

    button.addEventListener('click', (e) => {
      const product = button.dataset.gtmProduct;
      const plan    = button.dataset.gtmPlan;
      const href    = button.getAttribute('href') || '/';

      if (!product || !plan) return;

      try {
        const url = new URL(href, window.location.origin);
        url.searchParams.set('product', product);
        url.searchParams.set('plan', plan);

        e.preventDefault();
        window.location.href = url.pathname + url.search + url.hash;
      } catch (err) {
        console.error('[quote-links] invalid URL', err);
      }
    });
  });
})();
