// splide-logo-settings.js
 if (splideElement) {
    new Splide('#slider_logoCarousel', {
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
  };