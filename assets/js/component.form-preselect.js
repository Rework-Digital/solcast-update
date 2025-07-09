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
