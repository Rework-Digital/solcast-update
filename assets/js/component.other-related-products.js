// component.other-related-products.js
export default function initOtherRelatedProductsHeadingMatch() {
  const sections = document.querySelectorAll('.section_component_other-related-products');
  if (!sections.length) return;

  const matchHeadings = (section) => {
    // Get all elements that are either .orp_card-heading OR the h3 in .orp_text-content
    const headings = section.querySelectorAll('.orp_card-heading, .orp_text-content > h3');
    if (!headings.length) return;

    // Reset heights first
    headings.forEach(h => (h.style.height = 'auto'));

    // Find tallest height
    let max = 0;
    headings.forEach(h => {
      const hgt = h.offsetHeight;
      if (hgt > max) max = hgt;
    });

    // Apply the tallest height
    headings.forEach(h => (h.style.height = `${max}px`));
  };

  const runAll = () => sections.forEach(matchHeadings);

  // Initial run (wait for layout/ fonts)
  window.addEventListener('load', runAll);

  // Re-run on resize (debounced)
  let rid;
  window.addEventListener(
    'resize',
    () => {
      clearTimeout(rid);
      rid = setTimeout(runAll, 100);
    },
    { passive: true }
  );
}
