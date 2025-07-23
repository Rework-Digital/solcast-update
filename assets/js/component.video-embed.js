	// Select the parent div with the class 'section-banner-component-video_wrapper'
  const videoWrapper = document.querySelector('.section-banner-component-video_wrapper');
    
  // Get the div that contains the data-video-src and data-object-fit attributes
  const videoDiv = videoWrapper.querySelector('[data-video-src]');
  
  // Get the value of the data-video-src attribute
  const videoSrc = videoDiv.getAttribute('data-video-src');
    
  // Get the value of the data-object-fit attribute
  const objectFit = videoDiv.getAttribute('data-object-fit');
   
  // Get the video element within that div
  const videoElement = videoDiv.querySelector('video');
    
  // Update the src attribute of the video element with the new video source
  videoElement.setAttribute('src', videoSrc);
    
  // Update the object-fit style property of the video element with the new value from data-object-fit
  videoElement.style.objectFit = objectFit;