// component.loader.js
document.addEventListener('DOMContentLoaded', () => {
  const loadModule = async (fileName, label) => {
    const url = new URL(`./${fileName}`, import.meta.url);
    try {
      const module = await import(url);
      console.log(`[loader] ${label} module loaded from ${url}`);
      module.default?.();  // call the init function
    }
    catch (err) {
      console.error(`[loader] failed to load ${label}:`, err);
    }
  };

  if (document.querySelector('#slider_logoCarousel')) {
    loadModule('component.logoCarousel.js', 'logoCarousel');
  }

  if (document.querySelector('#slider_testimonial')) {
    loadModule('component.testimonial.js', 'testimonial');
  }
});
