// Performance optimization utilities
import { gsap } from 'gsap';

// Viewport detection utility
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Throttle function for performance
export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Debounce function for performance
export function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Optimize animations for mobile
export function optimizeForDevice() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTablet = /iPad|Android|Silk|Kindle|Mobile/.test(navigator.userAgent) && window.innerWidth > 768;
  
  if (isMobile) {
    // Reduce animation complexity on mobile
    gsap.defaults({
      duration: 0.6, // Faster animations
      ease: "power2.out" // Simpler easing
    });
    
    // Disable some heavy animations
    document.body.classList.add('mobile-device');
    
    // Reduce parallax intensity
    const parallaxElements = document.querySelectorAll('[data-scroll-speed]');
    parallaxElements.forEach(el => {
      const currentSpeed = parseFloat(el.getAttribute('data-scroll-speed'));
      el.setAttribute('data-scroll-speed', currentSpeed * 0.5);
    });
  }
  
  return { isMobile, isTablet };
}

// Preload critical animations
export function preloadAnimations() {
  // Preload GSAP timeline for hero section
  const heroTimeline = gsap.timeline({ paused: true });
  
  // Cache frequently used selectors
  const heroElements = {
    title: document.querySelector('.hero h1'),
    subtitle: document.querySelector('.hero .sub-headline'),
    button: document.querySelector('.hero .button-primary'),
    image: document.querySelector('.hero-visual img')
  };
  
  return { heroTimeline, heroElements };
}

// Lazy load animations
export function lazyLoadAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Add animation class when element comes into view
        if (element.hasAttribute('data-lazy-animation')) {
          const animationType = element.getAttribute('data-lazy-animation');
          element.classList.add(`animate-${animationType}`);
          observer.unobserve(element);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  // Observe elements with lazy animation
  document.querySelectorAll('[data-lazy-animation]').forEach(el => {
    observer.observe(el);
  });
}

// Memory cleanup utilities
export function cleanupAnimations() {
  // Kill all GSAP animations on page unload
  window.addEventListener('beforeunload', () => {
    gsap.killTweensOf('*');
    if (window.ScrollTrigger) {
      window.ScrollTrigger.killAll();
    }
  });
}

// FPS monitor
export function monitorFPS() {
  let frames = 0;
  let prevTime = Date.now();
  let fps = 60;
  
  function tick() {
    frames++;
    const time = Date.now();
    
    if (time >= prevTime + 1000) {
      fps = Math.round((frames * 1000) / (time - prevTime));
      
      // Adjust animation quality based on FPS
      if (fps < 30) {
        document.body.classList.add('low-performance');
        // Reduce animation complexity
        gsap.globalTimeline.timeScale(0.8);
      } else if (fps > 50) {
        document.body.classList.remove('low-performance');
        gsap.globalTimeline.timeScale(1);
      }
      
      frames = 0;
      prevTime = time;
    }
    
    requestAnimationFrame(tick);
  }
  
  requestAnimationFrame(tick);
  return { getFPS: () => fps };
}

// Reduce motion for accessibility
export function respectReducedMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Disable animations
    gsap.globalTimeline.timeScale(0.01);
    document.body.classList.add('reduced-motion');
    
    // Disable Locomotive Scroll smooth scrolling
    if (window.locomotiveScroll) {
      window.locomotiveScroll.destroy();
    }
  }
}

// Initialize performance optimizations
export function initPerformanceOptimizations() {
  const deviceInfo = optimizeForDevice();
  preloadAnimations();
  lazyLoadAnimations();
  cleanupAnimations();
  respectReducedMotion();
  
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    monitorFPS();
  }
  
  return deviceInfo;
}

// Critical resource hints
export function addResourceHints() {
  const head = document.head;
  
  // Preload critical assets
  const preloadLinks = [
    { href: '/styles/global.css', as: 'style' },
    { href: '/styles/animations.css', as: 'style' },
    { href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Lato:wght@400;700&display=swap', as: 'style' }
  ];
  
  preloadLinks.forEach(link => {
    const linkEl = document.createElement('link');
    linkEl.rel = 'preload';
    linkEl.href = link.href;
    linkEl.as = link.as;
    head.appendChild(linkEl);
  });
  
  // DNS prefetch for external resources
  const dnsPrefetch = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];
  
  dnsPrefetch.forEach(domain => {
    const linkEl = document.createElement('link');
    linkEl.rel = 'dns-prefetch';
    linkEl.href = domain;
    head.appendChild(linkEl);
  });
}