/*------------------------*/
/* Latest World Map Embed */
/*------------------------*/

function fetchLatestVideoUrl() {
  // Get the div element with class mapEmbed
  const mapEmbedDiv = document.querySelector('.embed-map');
  if (!mapEmbedDiv) {
    return;
  }

  // Define the API URL
  const globalUrl = 'https://api.solcast.com.au/media/global?format=json';

  fetch(globalUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (!data || !data.files || !data.files.length) {
        return;
      }

      // Initialize variables to track the latest date and corresponding video URL
      let latestDate = new Date(0); // Epoch date
      let videoUrl = '';

      // Iterate through each file entry to find the latest date
      data.files.forEach((file) => {
        const fileDate = new Date(file.id); // Assuming 'id' holds the date in YYYY-MM-DD format
        if (fileDate > latestDate) {
          latestDate = fileDate;
          // Find the 1280x720 video URL in the additional_videos array
          const additionalVideo = file.additional_videos.find((video) => video.dimensions === '1280x720');
          if (additionalVideo) {
            // Update video URL if this entry has the latest date
            videoUrl = additionalVideo.video_url;
          }
        }
      });

      // Update the date display if the element is present
      const dateElement = document.getElementById('mapDate');
      if (dateElement) {
        dateElement.setAttribute('data-date', latestDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
      }

      // Check if there is a video element with class 'hero_video' and update its 'src'
      const videoElement = document.querySelector('.hero_video');
      if (videoElement) {
        videoElement.src = videoUrl;
        videoElement.load();
      }
    });
}

document.addEventListener('DOMContentLoaded', () => {
  // Check if there is a div with the class 'map-embed'
  if (document.querySelector('.embed-map')) {
    fetchLatestVideoUrl();
  }
});

/*------------------------------*/
/* StatusPal.io required script */
/*------------------------------*/

window.statuspalWidget = {
  subdomain: 'solcast-com',
  badge: {
    enabled: true,
    selector: '.sp-status', // Optional
    position: 'bottom', // Optional [top | bottom | left | right] - defaults to top.
  },
  banner: {
    enabled: true,
    position: 'bottom-left', // Optional [bottom-left | bottom-right | top-left | top-right], def: bottom-left
    translations: {
      en: {
        lates_updates: 'View latest updates',
        ongoing: 'Ongoing for {{time_diff}}',
      },
    },
  },
  // serviceId: 1, // Optional - Display the status of only one service
};

/*------------------------------*/
/*       Nav Menu               */
/*------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  const MOBILE_BREAKPOINT = 991;
  const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

  const navMenu      = document.querySelector('.nav_menu');
  const hamburger    = document.querySelector('.nav_button');
  const links        = document.querySelectorAll('.nav_top-link-wrap[data-menu]');
  const dropdowns    = document.querySelectorAll('.nav_megamenu_dropdown[data-menu]');
  const backButtons  = document.querySelectorAll('.nav_back');
  const closeButtons = document.querySelectorAll('.nav_close');

  let previousIsMobile = isMobile();

  const closeAllMenus = () => {
    document.documentElement.classList.remove('megamenu-lock');
    links.forEach(link => link.classList.remove('is-active'));
    dropdowns.forEach(dd => dd.classList.remove('is-open', 'is-slide-in', 'is-slide-out'));
  };

  const resetHamburger = () => {
    if (hamburger?.classList.contains('w--open')) {
      hamburger.click(); // simulate toggle to close
    }
  };

  const closeNavMenu = () => {
    navMenu?.classList.remove('is-open');
  };

  const handleClose = () => {
    closeAllMenus();
    closeNavMenu();
    resetHamburger();
  };

  // Top-level link click (mobile): open submenu
  links.forEach(link => {
    const key = link.dataset.menu;
    const dropdown = [...dropdowns].find(dd => dd.dataset.menu === key);
    if (!dropdown) return;

    link.addEventListener('mouseenter', () => {
      if (!isMobile()) {
        closeAllMenus();
        link.classList.add('is-active');
        dropdown.classList.add('is-open');
      }
    });

    dropdown.addEventListener('mouseleave', () => {
      if (!isMobile()) closeAllMenus();
    });

    link.addEventListener('click', (e) => {
      if (!isMobile()) return;
      e.preventDefault();

      closeAllMenus();
      link.classList.add('is-active');
      dropdown.classList.add('is-slide-in');
      document.documentElement.classList.add('megamenu-lock');
    });
  });

  // Back button: slide submenu out
  backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const submenu = btn.closest('.nav_megamenu_dropdown');
      if (submenu) {
        submenu.classList.remove('is-slide-in');
        submenu.classList.add('is-slide-out');
        setTimeout(() => submenu.classList.remove('is-slide-out'), 300);
      }
    });
  });

  // Close button: close everything
  closeButtons.forEach(btn => {
    btn.addEventListener('click', handleClose);
  });

  // Prevent submenu clicks from closing nav
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', e => e.stopPropagation());
  });

  // Escape key: close everything
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') handleClose();
  });

  // Resize handling
  window.addEventListener('resize', () => {
    const currentIsMobile = isMobile();
    if (currentIsMobile !== previousIsMobile) {
      handleClose(); // Reset menus when crossing breakpoint
      previousIsMobile = currentIsMobile;
    }
  });

  // When hamburger is clicked while open, close submenus
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (hamburger.classList.contains('w--open')) {
        closeAllMenus();
      }
    });
  }
});
