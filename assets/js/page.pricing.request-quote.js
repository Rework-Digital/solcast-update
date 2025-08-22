// component.quote-links.js
let booted = false;

export default function initQuoteLinks() {
  if (booted) return;
  booted = true;

  const SELECTOR = 'a[data-listener="btn-request-quote"]';
  const PROCESSED_ATTR = 'data-quote-init';
  const DEBUG = false; // set true to see logs
  const log = (...a) => DEBUG && console.log('[quote-links]', ...a);

  // Helper: find data-gtm-product/plan on the link or a wrapping element (if authoring varies)
  function getDataFrom(link, key /* 'gtmProduct' | 'gtmPlan' */) {
    if (!link) return null;
    // prefer the link itself
    if (link.dataset && link.dataset[key]) return link.dataset[key];
    // otherwise, walk up a little (stop at section/nav/article/body)
    const wrap = link.closest(`[data-${toKebab(key)}]`);
    return wrap?.dataset?.[key] || null;
  }
  function toKebab(camel) {
    return camel.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
  }

  function buildHref(link) {
    const product = getDataFrom(link, 'gtmProduct');
    const plan    = getDataFrom(link, 'gtmPlan');
    const href    = link.getAttribute('href') || '/';

    if (!product || !plan) {
      log('missing data attributes', { product, plan, el: link });
      return null;
    }

    let url;
    try {
      url = new URL(href, window.location.origin);
    } catch {
      log('bad href; cannot parse', href);
      return null;
    }

    url.searchParams.set('product', product);
    url.searchParams.set('plan', plan);

    // Keep same-origin links relative to avoid origin changes in Webflow previews etc.
    return (url.origin === window.location.origin)
      ? `${url.pathname}${url.search}${url.hash}`
      : url.toString();
  }

  // One-time pass over any existing links
  function scan() {
    document.querySelectorAll(SELECTOR).forEach(link => {
      if (link.getAttribute(PROCESSED_ATTR) === '1') return;

      const newHref = buildHref(link);
      if (newHref) {
        link.setAttribute('href', newHref);
        link.setAttribute(PROCESSED_ATTR, '1');
        log('initialized href', newHref, link);
      }
    });
  }

  // Delegate clicks so dynamic links are always handled, without per-link listeners
  function onClick(e) {
    const link = e.target.closest?.(SELECTOR);
    if (!link) return;

    // If either key is missing or URL params are missing, rebuild and navigate
    const current = link.getAttribute('href') || '';
    const hasProduct = /[?&]product=/.test(current);
    const hasPlan    = /[?&]plan=/.test(current);

    if (!hasProduct || !hasPlan) {
      const rebuilt = buildHref(link);
      if (rebuilt) {
        e.preventDefault();
        log('rebuilt on click ->', rebuilt);
        window.location.href = rebuilt;
      }
    }
  }

  // Initial scan + a few retries for late attribute binding from Webflow
  const start = () => {
    scan();

    let attempt = 0;
    const MAX_RETRIES = 10;
    const retryTimer = setInterval(() => {
      attempt += 1;
      scan();
      if (attempt >= MAX_RETRIES) clearInterval(retryTimer);
    }, 300);

    // Observe DOM additions (e.g., sliders/tabs rendering new links)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const n of m.addedNodes || []) {
          if (n.nodeType !== 1) continue;
          if (n.matches?.(SELECTOR) || n.querySelector?.(SELECTOR)) {
            scan();
            return;
          }
        }
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });

    // Attach the single delegated click handler
    document.addEventListener('click', onClick, true);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}
