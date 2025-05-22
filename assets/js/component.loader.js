/*---------------*/
/* Splide Loader */
/*---------------*/

  document.addEventListener('DOMContentLoaded', () => {
    // Only import & run the init script if the carousel container exists
    if (document.querySelector('#slider_logoCarousel')) {
      import('./component.logoCarousel.js')
      .then(module => {
      // assume module.default or module.initLogoCarousel runs the init
      module.default?.();
      console.log('[loader] logoCarousel module loaded');
    })
    .catch(err => console.error('[loader] failed to load logoCarousel:', err));
}
  });


