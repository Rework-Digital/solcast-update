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
