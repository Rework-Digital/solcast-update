window.addEventListener('DOMContentLoaded', function () {
  var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_form', 'utm_content'];

  function getCookieValue(name) {
    var match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  utmKeys.forEach(function (key) {
    var value = getCookieValue(key);
    if (!value) return;

    var input = document.getElementById(key);
    if (!input) return;

    input.value = value;
  });

  // Check for utm_url input and populate with relative URL
  var utmUrlInput = document.getElementById('utm_url');
  if (utmUrlInput) {
    var relativeUrl = window.location.pathname + window.location.search + window.location.hash;
    utmUrlInput.value = relativeUrl;
  }
});