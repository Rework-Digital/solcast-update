/*------------------------------*/
/* Testimonial Slider Settings  */
/*------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  const splideElement = document.querySelector('#splide__testimonial');

  if (splideElement) {
    new Splide('#splide__testimonial', {
      perPage: 3,
      perMove: 1,
      focus: 0, // 0 = left and 'center' = center
      type: 'slide', // 'loop' or 'slide'
      gap: '22px', // space between slides
      arrows: slider, // 'slider' or false
      pagination: false, // 'slider' or false
      speed : 600, // transition speed in miliseconds
      dragAngleThreshold: 30, // default is 30
      autoWidth: false, // for cards with differing widths
      rewind : false, // go back to beginning when reach end
      waitForTransition : false,
      updateOnMove : true,
      trimSpace: true, // true removes empty space from end of list
      autoHeight: false,
      breakpoints: {
        991: {
          // Tablet
          perPage: 2.5,
          gap: '22px',
        },
        767: {
          // Mobile Landscape
          perPage: 1.5,
          gap: '16px',
        },
        479: {
          // Mobile Portrait
          perPage: 1,
          gap: '12px',
        }
      }
    }).mount(window.splide.Extensions);
  }
});
