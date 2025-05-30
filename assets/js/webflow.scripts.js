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

/*-----------------------------------------------------------------*/
/* Function to check if any dropdown link matches the current page */
/*-----------------------------------------------------------------*/

function updateCurrentLink() {
  const navDropdowns = document.querySelectorAll('.nav_dropdown');

  navDropdowns.forEach((dropdown) => {
    const links = dropdown.querySelectorAll('.nav_dropdown-list .nav_menu_link');
    links.forEach((link) => {
      if (link.href === window.location.href) {
        dropdown.querySelector('.nav_menu_link.is-heading').classList.add('w--current');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', updateCurrentLink);

