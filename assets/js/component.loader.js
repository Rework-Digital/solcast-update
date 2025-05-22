/*---------------*/
/* Splide Loader */
/*---------------*/

  document.addEventListener('DOMContentLoaded', () => {
    // Only import & run the init script if the carousel container exists
    if (document.querySelector('#slider_logoCarousel')) {
      import('./component.logoCarousel.js');
    }
  });


    document.addEventListener('DOMContentLoaded', () => {
    // Only import & run the init script if the carousel container exists
    if (document.querySelector('#slider_testimonial')) {
      import('./component.testimonial.js');
    }
  });