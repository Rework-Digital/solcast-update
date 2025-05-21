/*------------------------------*/
/* Testimonial Slider Settings  */
/*------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  const splideElement = document.querySelector('#splide__testimonial');

  if (splideElement) {
    new Splide('#splide__testimonial', {
      type: 'loop',
      drag: 'free',
      gap: '2rem',
      autoWidth: true,
      pauseOnHover: true,
      pauseOnFocus: true,
      focusableNodes: 'img',
      autoScroll: {
        speed: 10,
      },
      reducedMotion: {
        speed: 0,
        autoplay: 'pause',
      }
    }).mount(window.splide.Extensions);
  }
});
