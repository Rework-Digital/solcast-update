export default function initGTMTracking() {
  const trackedElements = document.querySelectorAll('[data-tracking="gtm-enabled"]');

  if (!trackedElements.length) {
    console.warn('[GTM] No elements found with data-tracking="gtm-enabled"');
    return;
  }

  trackedElements.forEach(element => {
    element.addEventListener('click', () => {
      // Find the nearest parent with data-tracking-event-name
      const formWrapper = element.closest('[data-tracking-event-name]');
      const eventName = formWrapper?.getAttribute('data-tracking-event-name')?.trim();

      if (!eventName) {
        console.warn('[GTM] Could not find event name for element:', element);
        return;
      }

      console.log(`[GTM] Event "${eventName}" triggered for tracked element`);

      // Limit scope to the parent form
      const scopedForm = element.closest('form');
      if (!scopedForm) {
        console.warn('[GTM] No form found for element:', element);
        return;
      }

      // Extract scoped form values
      const emailInput   = scopedForm.querySelector('input[name="email"]');
      const phoneInput   = scopedForm.querySelector('input[name="phone"]');
      const productSelect = scopedForm.querySelector('select[name="product"]');

      const email   = emailInput?.value || '';
      const phone   = phoneInput?.value || '';
      const product = productSelect?.value || '';

      const dataLayerPayload = {
        event: eventName,
        email
      };

      if (phone)   dataLayerPayload.phone = phone;
      if (product) dataLayerPayload.product = product;

      console.log('[GTM] Pushing to dataLayer:', dataLayerPayload);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(dataLayerPayload);
    });
  });
}
