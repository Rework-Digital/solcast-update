/*---------------*/
/* Splide Loader */
/*---------------*/

  // document.addEventListener('DOMContentLoaded', () => {
  //   // Only import & run the init script if the carousel container exists
  //   if (document.querySelector('#slider_logocarousel')) {
  //     import('./component.logoCarousel.js');
  //   }
  // });


  document.addEventListener('DOMContentLoaded', () => {
  const splideElement = document.querySelector('.splide');

  if (splideElement) {
    new Splide('.splide', {
      type: 'loop',
      drag: 'free',
      gap: '2rem',
      autoWidth: true,
      pauseOnHover: true,
      pauseOnFocus: true,
      focusableNodes: 'img',
      autoScroll: {
        speed: 0.8,
      },
      reducedMotion: {
        speed: 0,
        autoplay: 'pause',
      }
    }).mount(window.splide.Extensions);
  }
});