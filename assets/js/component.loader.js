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

  if (document.querySelector('.testimonial-slider_component')) {
    loadModule('component.testimonial.js', 'testimonial');
  }

  if (document.querySelector('.script_loader-counter')) {
    loadModule('component.counter.js', 'counter');
  }

  if (document.querySelector('.component_verticle-tabs')) {
    loadModule('component.v-tabs.indicator.js', 'v-tabs');
  }

  if (document.querySelector('.component_form-preselect')) {
    loadModule('component.form-preselect.js', 'form preselect');
  }

    if (document.querySelector('.accuracy-tool-wrapper')) {
    loadModule('accuracy-tool.js', 'accuracy tool');
    loadModule('https://api.mapbox.com/mapbox-gl-js/v3.5.1/mapbox-gl.css', 'mapbox-gl');
  }

});
