/*---------------*/
/* Splide Loader */
/*---------------*/

  document.addEventListener('DOMContentLoaded', () => {
    // Only import & run the init script if the carousel container exists
    if (document.querySelector('#slider_logocarousel')) {
      import('./component.logoCarousel.js');
    }
  });
