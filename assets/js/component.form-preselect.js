export default function initProductPreselect() {
  const productSelect = document.querySelector('select[data-preselect]');
  if (!productSelect) return;

  const preselectValue = productSelect.getAttribute('data-preselect');
  if (!preselectValue) return;

  const matchingOption = Array.from(productSelect.options).find(
    (opt) => opt.value === preselectValue
  );

  if (matchingOption) {
    productSelect.value = preselectValue;
  }
}


// ****** Preselects USA in Forms ****** //

export default function preselectCountryUSA() {
  // Get all forms on the page
  const forms = document.querySelectorAll('form');
  if (!forms.length) return;

  forms.forEach(form => {
    // Find all selects with ID containing "country" (case-insensitive)
    const selects = form.querySelectorAll('select[id*="country" i]');
    selects.forEach(select => {
      // Find the option that matches "United States of America"
      const usaOption = Array.from(select.options).find(
        opt => opt.text.trim().toLowerCase() === 'united states of america'
      );

      if (usaOption) {
        select.value = usaOption.value;
        // Trigger change event in case any listeners are attached
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });
}
