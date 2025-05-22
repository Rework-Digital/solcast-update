// component.testimonial.js
export default function initTestimonial() {
  console.log('[testimonial] init');
  new Splide('#slider_testimonial', {
    type          : 'loop',   // or 'loop' if you want it to wrap
    perPage       : 3,
    perMove       : 1,
    gap           : '22px',
    speed         : 600,
    autoplay      : true,
    interval      : 12000,
    pauseOnHover  : true,
    pauseOnFocus  : true,
    pagination    : false,
    drag          : 'free',
    snap          : true,
    trimSpace     : false,
    autoHeight    : false,
    updateOnMove  : true,
    height        : '100%',
    breakpoints: {
      991: { perPage: 2, gap: '22px' },
      767: { perPage: 1, gap: '16px' },
      479: { perPage: 1, gap: '12px' },
    },
  }).mount(); 
}
