// component.loader.js
document.addEventListener('DOMContentLoaded', () => {
  // Helper to dynamically import a module in the same folder
  const loadModule = async (fileName, label) => {
    const url = new URL(`./${fileName}`, import.meta.url);
    try {
      const module = await import(url);
      console.log(`[loader] ${label} module loaded from ${url}`);
      // If your module exports a default init function, call it:
      module.default?.();
    } catch (err) {
      console.error(`[loader] failed to load ${label}:`, err);
    }
  };

  // Logo carousel
  if (document.querySelector('#slider_logoCarousel')) {
    loadModule('component.logoCarousel.js', 'logoCarousel');
  }

  // Testimonial slider
  if (document.querySelector('#slider_testimonial')) {
    loadModule('component.testimonial.js', 'testimonial');
  }
});
