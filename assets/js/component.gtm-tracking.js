export default function initGTMTracking() {
  const links = document.querySelectorAll('[data-tracking="product-cta-form"]');

  if (!links.length) {
    console.warn('[GTM] No elements found with [data-tracking="product-cta-form"]');
    return;
  }

  links.forEach(link => {
    console.log('[GTM] Click listener attached to:', link);

    link.addEventListener('click', () => {
      const email = document.querySelector('input[name="email"]')?.value || '';
      const phone = document.querySelector('input[name="phone"]')?.value || '';
      const product = document.querySelector('input[name="product"]')?.value || '';

      if (!email && !phone && !product) {
        console.warn('[GTM] No form values found.');
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'product_form_submit',
        email,
        phone,
        product
      });

      console.log('[GTM] Data pushed to dataLayer:', { email, phone, product });
    });
  });
}
