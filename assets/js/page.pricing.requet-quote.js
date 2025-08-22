// component.quote-links.js
let initialized = false;

export default function initQuoteLinks() {
  if (initialized) return;
  initialized = true;

  const SELECTOR = 'a[data-listener="btn-request-quote"]';
  const PROCESSED_ATTR = 'data-quote-init';

  function buildHref(link) {
    const product = link.dataset.gtmProduct;
    const plan = link.dataset.gtmPlan;
    const href = link.getAttribute('href') || '/';
    if (!product || !plan) return null;
    let url; try { url = new URL(href, window.location.origin); } catch { return null; }
    url.searchParams.set('product', product);
    url.searchParams.set('plan', plan);
    return (url.origin === window.location.origin)
      ? `${url.pathname}${url.search}${url.hash}`
      : url.toString();
  }

  function processLink(link) {
    if (link.getAttribute(PROCESSED_ATTR) === '1') return;

    const newHref = buildHref(link);
    if (newHref) {
      link.setAttribute('href', newHref);
      link.setAttribute(PROCESSED_ATTR, '1');
    }

    // Avoid duplicate binding on hot reloads
    if (link.dataset.quoteBound === '1') return;
    link.dataset.quoteBound = '1';

    link.addEventListener('click', (e) => {
      const current = link.getAttribute('href') || '';
      const needsProduct = !/[?&]product=/.test(current);
      const needsPlan = !/[?&]plan=/.test(current);
      if (needsProduct || needsPlan) {
        const rebuilt = buildHref(link);
        if (rebuilt) {
          e.preventDefault();
          window.location.href = rebuilt;
        }
      }
    }, { capture: true });
  }

  function scan() {
    document.querySelectorAll(SELECTOR).forEach(processLink);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scan, { once: true });
  } else {
    scan();
  }

  let attempt = 0;
  const MAX_RETRIES = 10;
  const retryTimer = setInterval(() => {
    attempt += 1;
    scan();
    if (attempt >= MAX_RETRIES) clearInterval(retryTimer);
  }, 300);

  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const n of m.addedNodes || []) {
        if (n.nodeType === 1 && (n.matches?.(SELECTOR) || n.querySelector?.(SELECTOR))) {
          scan();
          return;
        }
      }
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
}
