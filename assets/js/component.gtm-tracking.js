export default function initGTMTracking() {
  const trackedElements = document.querySelectorAll('[data-tracking="gtm-enabled"]');
  console.log(`[GTM Tracking] Found ${trackedElements.length} tracked element(s).`);
  if (!trackedElements.length) return;

  trackedElements.forEach(element => {
    element.addEventListener('click', (e) => {
      console.log('[GTM Tracking] Click detected on tracked element:', element);

      const scopedForm = element.closest('form');
      if (!scopedForm) {
        console.warn('[GTM Tracking] No form found for this element.');
        return;
      }

      console.log('[GTM Tracking] Checking form validity...');
      if (!scopedForm.checkValidity()) {
        console.warn('[GTM Tracking] Form is invalid — GTM event NOT fired.');
        return; // Let browser show validation errors
      }

      const formWrapper = element.closest('[data-tracking-event-name]');
      const eventName = formWrapper?.getAttribute('data-tracking-event-name')?.trim();
      if (!eventName) {
        console.warn('[GTM Tracking] No event name found — GTM event NOT fired.');
        return;
      }

      const emailInput = scopedForm.querySelector('input[name="email"]');
      const phoneInput = scopedForm.querySelector('input[name="phone"]');
      const productSelect = scopedForm.querySelector('select[name="product"]');

      const emailAdr = emailInput?.value.trim() || '';
      const phoneNo = phoneInput?.value.trim() || '';
      const productType = productSelect?.value.trim() || '';

      const dataLayerPayload = {
        event: eventName,
        email: emailAdr,
        phone: phoneNo,
        product: productType
      };

      console.log('[GTM Tracking] Pushing to dataLayer:', dataLayerPayload);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(dataLayerPayload);

      console.log('[GTM Tracking] GTM event fired successfully.');
    });
  });
}
