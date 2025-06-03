// component.testimonial.js
export default function initTestimonial() {
  console.log('[testimonial] init');

  const selector = '#slider_testimonial';
  const splide = new Splide(selector, {
    type        : 'loop',
    perPage     : 3,
    perMove     : 1,
    gap         : '22px',
    autoplay    : true,
    interval    : 6000,
    pauseOnHover: true,
    pauseOnFocus: true,
    pagination  : false,
    drag        : 'free',
    snap        : true,
    trimSpace   : true,
    speed       : 600,
    arrows      : true,
    breakpoints : {
      991: { perPage: 2, gap: '22px' },
      767: { perPage: 1, gap: '16px' },
      479: { perPage: 1, gap: '12px' },
    },
  });

  // **Progress bar setup**
  const bar = splide.root.querySelector('.my-slider-progress-bar');

  splide.on('mounted move', () => {
    const end = splide.Components.Controller.getEnd() + 1;
    const ratio = (splide.index + 1) / end;
    bar.style.width = `${100 * ratio}%`;
  });

  splide.mount();
}
