export default function initGTMTracking() {
  const trackedElements = document.querySelectorAll('[data-tracking="gtm-enabled"]');

  if (!trackedElements.length) {
    console.warn('[GTM] No elements found with data-tracking="gtm-enabled"');
    return;
  }

  trackedElements.forEach(element => {
    const eventName = element.getAttribute('data-tracking-event-name')?.trim();

    if (!eventName) {
      console.warn('[GTM] Skipping element with no data-tracking-event-name:', element);
      return;
    }

    console.log(`[GTM] Listener attached for event: "${eventName}"`);

    element.addEventListener('click', () => {
      console.log(`[GTM] "${eventName}" triggered. Extracting data...`);

      const email = document.querySelector('input[name="email"]')?.value || '';
      const phone = document.querySelector('input[name="phone"]')?.value || '';

      // Only include product if the select exists
      const productSelect = document.querySelector('select[name="product"]');
      const product = productSelect ? productSelect.value : undefined;

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
