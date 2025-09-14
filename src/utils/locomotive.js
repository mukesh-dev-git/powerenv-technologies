// Locomotive Scroll setup and configuration
import LocomotiveScroll from 'locomotive-scroll';

let locomotiveScroll = null;

export function initLocomotiveScroll() {
  // Check if element exists
  const scrollContainer = document.querySelector('[data-scroll-container]');
  if (!scrollContainer) {
    console.warn('Locomotive Scroll container not found');
    return null;
  }

  try {
    // Initialize Locomotive Scroll
    locomotiveScroll = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true,
      multiplier: 1,
      class: 'is-reveal',
      scrollbarContainer: false,
      gestureDirection: 'vertical',
      touchMultiplier: 2,
      firefoxMultiplier: 100,
      lerp: 0.1, // Smooth scrolling intensity
      smartphone: {
        smooth: false, // Disable smooth scroll on mobile for better performance
        breakpoint: 767
      },
      tablet: {
        smooth: true,
        breakpoint: 1024
      }
    });

    // Update ScrollTrigger when Locomotive Scroll updates
    locomotiveScroll.on('scroll', () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.update();
      }
    });

    // Sync Locomotive Scroll with GSAP ScrollTrigger
    if (window.ScrollTrigger) {
      window.ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
          return arguments.length 
            ? locomotiveScroll.scrollTo(value, 0, 0) 
            : locomotiveScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          };
        },
        pinType: scrollContainer.style.transform 
          ? 'transform' 
          : 'fixed'
      });

      // Refresh ScrollTrigger and Locomotive Scroll on window resize
      window.ScrollTrigger.addEventListener('refresh', () => {
        if (locomotiveScroll) locomotiveScroll.update();
      });
      window.ScrollTrigger.refresh();
    }

    console.log('Locomotive Scroll initialized successfully');
    document.body.classList.add('locomotive-initialized');
    return locomotiveScroll;

  } catch (error) {
    console.error('Error initializing Locomotive Scroll:', error);
    // Fallback to regular scrolling
    document.body.classList.add('locomotive-failed');
    document.body.style.overflow = 'auto';
    const container = document.querySelector('[data-scroll-container]');
    if (container) {
      container.style.height = 'auto';
      container.style.overflow = 'visible';
    }
    return null;
  }
}

export function destroyLocomotiveScroll() {
  if (locomotiveScroll) {
    locomotiveScroll.destroy();
    locomotiveScroll = null;
  }
}

export function updateLocomotiveScroll() {
  if (locomotiveScroll) {
    locomotiveScroll.update();
  }
}

export function scrollToElement(target, options = {}) {
  if (locomotiveScroll) {
    locomotiveScroll.scrollTo(target, {
      offset: 0,
      duration: 1000,
      easing: [0.25, 0.0, 0.35, 1.0],
      disableLerp: false,
      ...options
    });
  }
}

export function getLocomotiveScrollInstance() {
  return locomotiveScroll;
}