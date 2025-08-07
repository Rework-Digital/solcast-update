// component-orp-heading-match.js
export default function initORPHeadingMatch() {
  const sections = document.querySelectorAll('.section_component_other-related-products');
  if (!sections.length) return;

  const matchInSection = (section) => {
    const headings = section.querySelectorAll('.orp_card-heading');
    if (!headings.length) return;

    // Reset first
    headings.forEach(h => (h.style.height = 'auto'));

    // Find tallest
    let max = 0;
    headings.forEach(h => {
      const hgt = h.offsetHeight;
      if (hgt > max) max = hgt;
    });

    // Apply
    headings.forEach(h => (h.style.height = `${max}px`));
  };

  const runAll = () => sections.forEach(matchInSection);

  // Initial pass (use rAF to ensure fonts/layout are ready)
  requestAnimationFrame(runAll);

  // Re-run on resize (debounced)
  let rid;
  window.addEventListener('resize', () => {
    clearTimeout(rid);
    rid = setTimeout(runAll, 120);
  }, { passive: true });

  // Optional: observe content changes inside each section
  sections.forEach(section => {
    const mo = new MutationObserver(() => matchInSection(section));
    mo.observe(section, { childList: true, subtree: true });
  });
}
