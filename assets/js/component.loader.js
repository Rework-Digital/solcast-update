// component.loader.js
document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('#slider_logoCarousel')) return;

  // Build a URL relative to this module's location:
  const moduleUrl = new URL('./component.logoCarousel.js', import.meta.url);

  import(moduleUrl)
    .then(module => {
      // If your carousel file exports a default init function:
      module.default?.();
      console.log('[loader] logoCarousel module loaded');
    })
    .catch(err => {
      console.error('[loader] failed to load logoCarousel:', err);
    });
});


// component.loader.js
document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('#slider_testimonial')) return;

  // Build a URL relative to this module's location:
  const moduleUrl = new URL('./component.testimonial.js', import.meta.url);

  import(moduleUrl)
    .then(module => {
      // If your carousel file exports a default init function:
      module.default?.();
      console.log('[loader] logoCarousel module loaded');
    })
    .catch(err => {
      console.error('[loader] failed to load testimonial:', err);
    });
});

