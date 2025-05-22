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
  }).mount();

  // Equalize heights minus 1px
  const equalizeHeights = () => {
    const slides = document.querySelectorAll(`${selector} .splide__slide`);
    let maxH = 0;

    // reset any previous inline heights and find tallest
    slides.forEach(slide => {
      slide.style.height = 'auto';
      maxH = Math.max(maxH, slide.offsetHeight);
    });

    // apply (maxH - 1px) to all
    const targetH = Math.max(0, maxH - 1);
    slides.forEach(slide => {
      slide.style.height = `${targetH}px`;
    });
  };

  splide.on('mounted updated', equalizeHeights);
  window.addEventListener('resize', equalizeHeights);
  setTimeout(equalizeHeights, 1000);
}