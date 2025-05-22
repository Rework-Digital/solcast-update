// component.testimonial.js
export default function initTestimonial() {
  console.log('[testimonial] init');
  new Splide('#slider_testimonial', {
    perPage          : 3,
    perMove          : 1,
    focus            : 0,
    type             : 'slide',
    gap              : '22px',
    pagination       : false,
    speed            : 600,
    dragAngleThreshold: 30,
    autoWidth        : false,
    rewind           : false,
    waitForTransition: false,
    updateOnMove     : true,
    trimSpace        : true,
    autoHeight       : false,
    breakpoints: {
      991: { perPage: 2, gap: '22px' },
      767: { perPage: 1, gap: '16px' },
      479: { perPage: 1, gap: '12px' },
    }
  }).mount();
}
