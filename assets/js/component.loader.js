/*---------------*/
/* Splide Loader */
/*---------------*/

  // document.addEventListener('DOMContentLoaded', () => {
  //   // Only import & run the init script if the carousel container exists
  //   if (document.querySelector('#slider_logocarousel')) {
  //     import('./component.logoCarousel.js');
  //   }
  // });


//   document.addEventListener('DOMContentLoaded', () => {
//   const splideElement = document.querySelector('#slider_logocarousel');

//   if (splideElement) {
//     new Splide('#slider_logocarousel', {
//       type: 'loop',
//       drag: 'free',
//       gap: '2rem',
//       autoWidth: true,
//       pauseOnHover: true,
//       pauseOnFocus: true,
//       focusableNodes: 'img',
//       autoScroll: {
//         speed: 0.8,
//       },
//       reducedMotion: {
//         speed: 0,
//         autoplay: 'pause',
//       }
//     }).mount(window.splide.Extensions);
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
  console.group('[Splide Logo Carousel] Init');
  const selector = '#slider_logocarousel';
  const splideElement = document.querySelector(selector);

  if (!splideElement) {
    console.warn(`[Splide Logo Carousel] No element found for selector "${selector}". Aborting.`);
    console.groupEnd();
    return;
  }

  console.log('[Splide Logo Carousel] Element found:', splideElement);

  const settings = {
    type          : 'loop',
    drag          : 'free',
    gap           : '2rem',
    autoWidth     : true,
    pauseOnHover  : true,
    pauseOnFocus  : true,
    focusableNodes: 'img',
    autoScroll    : { speed: 0.8 },
    reducedMotion : { speed: 0, autoplay: 'pause' },
  };
  console.log('[Splide Logo Carousel] Settings:', settings);

  try {
    const splide = new Splide(selector, settings);
    console.log('[Splide Logo Carousel] Splide instance created:', splide);

    splide.mount(window.splide.Extensions);
    console.log('[Splide Logo Carousel] Mounted with Extensions:', window.splide.Extensions);
  }
  catch (err) {
    console.error('[Splide Logo Carousel] Error while initializing Splide:', err);
  }

  console.groupEnd();
});
