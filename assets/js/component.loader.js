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

  const loadExternalScript = (src, label) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        console.log(`[loader] ${label} external script loaded`);
        resolve();
      };
      script.onerror = () => {
        console.error(`[loader] failed to load external script: ${label}`);
        reject();
      };
      document.head.appendChild(script);
    });
  };

  const loadExternalCSS = (href, label, nonce = '') => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      if (nonce) {
        link.nonce = nonce;
      }
      link.onload = () => {
        console.log(`[loader] ${label} stylesheet loaded`);
        resolve();
      };
      link.onerror = () => {
        console.error(`[loader] failed to load stylesheet: ${label}`);
        reject();
      };
      document.head.appendChild(link);
    });
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
    loadModule('component.v-tabs.indicator.js', 'vertice tabs');
  }

  if (document.querySelector('.component_form-preselect')) {
    loadModule('component.form-preselect.js', 'form preselect');
  }

  if (document.querySelector('[data-tracking="gtm-enabled"]')) {
    loadModule('component.gtm-tracking.js', 'GTM tracking');
  }

  if (document.querySelector('.accuracy-tool-wrapper')) {
    loadExternalScript('https://api.mapbox.com/mapbox-gl-js/v3.5.1/mapbox-gl.js', 'mapbox-gl');
    loadModule('accuracy-tool.js', 'accuracy tool');
  }

  if (document.querySelector('.pricing_table-tabs-indicator')) {
    loadModule('component.pricing-table.js', 'pricing tabs indicator');
  }

  if (document.querySelector('.latest-world-map')) {
    loadModule('component.worldmap.js', 'latest world map');
  }

  if (document.querySelector('.section-banner-component-video_wrapper')) {
    loadModule('component.video-embed.js', 'video-embed');
  }

  if (document.querySelector('.div-mapbox')) {
    loadExternalScript('https://api.mapbox.com/mapbox-gl-js/v3.5.1/mapbox-gl.js', 'mapbox-gl');
    loadModule('mapbox.config.lta.js', 'mapbox-config');
    loadModule('mapboxSetup.js', 'mapbox-setup');
    loadExternalCSS('https://api.mapbox.com/mapbox-gl-js/v3.5.1/mapbox-gl.css', 'Mapbox CSS', 'e1659894ea52');
    loadExternalCSS('https://solcast.com/static/assets/css/mapbox-gradients.css', 'Mapbox Gradients');
    loadExternalCSS('https://solcast.com/static/assets/css/mapbox-styles.css', 'Mapbox Styles');
  }
});