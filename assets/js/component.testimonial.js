/*------------------------------*/
/* Testimonial Slider Settings  */
/*------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  const splideElement = document.querySelector('#splide__testimonial');

  if (splideElement) {
    new Splide('#splide__testimonial', {
      type: 'slide',
      drag: 'free',
      gap: '2rem',
      perPage: 3,
      perMove: 1,
      snap: true,
      autoWidth: false,
      autoplay: true,
      interval: 2000,
      pagination: true,
      pauseOnHover: true,
      pauseOnFocus: true,
      focusableNodes: 'img',
      reducedMotion: {
        speed: 0,
        autoplay: 'pause',
      }
    }).mount(window.splide.Extensions);
  }
});
