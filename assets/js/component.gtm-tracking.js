export default function initGTMTracking() {
  const trackedElements = document.querySelectorAll('[data-tracking="gtm-enabled"]');
  if (!trackedElements.length) return;

  trackedElements.forEach(element => {
    element.addEventListener('click', () => {
      const formWrapper = element.closest('[data-tracking-event-name]');
      const eventName = formWrapper?.getAttribute('data-tracking-event-name')?.trim();
      if (!eventName) return;

      const scopedForm = element.closest('form');
      if (!scopedForm) return;

      const emailInput = scopedForm.querySelector('input[name="email"]');
      const phoneInput = scopedForm.querySelector('input[name="phone"]');
      const productSelect = scopedForm.querySelector('select[name="product"]');

      const email = emailInput?.value || '';
      const phone = phoneInput?.value || '';
      const product = productSelect?.value || '';

      const dataLayerPayload = {
        event: eventName,
        email
      };

      if (phone) dataLayerPayload.phone = phone;
      if (product) dataLayerPayload.product = product;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(dataLayerPayload);
    });
  });
}
