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

  // Equalize heights to the tallest slide
  const equalizeHeights = () => {
    const slides = document.querySelectorAll(`${selector} .splide__slide`);
    let maxH = 0;

    // reset any previous inline heights
    slides.forEach(slide => {
      slide.style.height = 'auto';
      maxH = Math.max(maxH, slide.offsetHeight);
    });

    // set all slides to that max height
    slides.forEach(slide => {
      slide.style.height = `${maxH}px`;
    });
  };

  // Run on mount, update (e.g. after move), and on resize
  splide.on('mounted updated', equalizeHeights);
  window.addEventListener('resize', equalizeHeights);

  // Immediately equalize once more in case images load late
  window.setTimeout(equalizeHeights, 1000);
}
