export default function initProductPreselect() {
  const productSelect = document.querySelector('select[data-preselect]');

  if (!productSelect) {
    console.warn('[formPreselect] No select element found with data-preselect attribute.');
    return;
  }

  const preselectValue = productSelect.getAttribute('data-preselect');

  if (!preselectValue) {
    console.warn('[formPreselect] data-preselect attribute is empty.');
    return;
  }

  const matchingOption = Array.from(productSelect.options).find(
    (opt) => opt.value === preselectValue
  );

  if (matchingOption) {
    productSelect.value = preselectValue;
    console.log(`[formPreselect] Preselected product: "${preselectValue}"`);
  } else {
    console.warn(`[formPreselect] No matching option for value: "${preselectValue}"`);
  }
}
