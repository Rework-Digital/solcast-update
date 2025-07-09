export default function initProductPreselect() {
  const productSelect = document.querySelector('select[data-preselect]');

  if (!productSelect) return;

  const preselectValue = productSelect.getAttribute('data-preselect');

  if (preselectValue) {
    const optionExists = Array.from(productSelect.options).some(
      (opt) => opt.value === preselectValue
    );

    if (optionExists) {
      productSelect.value = preselectValue;
    } else {
      console.warn(`[productSelect] No matching option for: "${preselectValue}"`);
    }
  }
}

// GTM Tracking Script
function initGTMProductTracking({ email, phone, product }) {
  console.log('[GTM] Initialising product tracking...');
  console.log('[GTM] Data to be pushed:', { email, phone, product });

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'product_form_submit',
    email: email,
    phone: phone,
    product: product
  });

  console.log('[GTM] Data successfully pushed to dataLayer.');
}

// Set up the click listener
document.addEventListener('DOMContentLoaded', function () {
  console.log('[GTM] DOM fully loaded. Initialising click listeners...');

  const links = document.querySelectorAll('[data-tracking="product-cta-form"]');

  if (links.length === 0) {
    console.warn('[GTM] No elements found with [data-tracking="product-cta-form"].');
    return;
  }

  links.forEach(link => {
    console.log('[GTM] Click listener attached to:', link);

    link.addEventListener('click', function () {
      console.log('[GTM] Link clicked. Attempting to extract form values...');

      const email = document.querySelector('input[name="Email"]')?.value || '';
      const phone = document.querySelector('input[name="Phone"]')?.value || '';
      const product = document.querySelector('input[name="Product"]')?.value || '';

      if (!email && !phone && !product) {
        console.warn('[GTM] No form values found. Check input name attributes.');
      }

      // Call your GTM function with the values
      initGTMProductTracking({ email, phone, product });
    });
  });
});