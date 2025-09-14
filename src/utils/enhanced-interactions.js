// Enhanced Interactions and Micro-animations
import { gsap } from 'gsap';

// Magnetic Button Effect
export function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.button-magnetic');
  
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    });
  });
}

// Custom Cursor (Optional)
export function initCustomCursor() {
  if (window.innerWidth > 768) { // Only on desktop
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
    });
    
    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    });
  }
}

// Image Reveal Animations
export function initImageReveals() {
  const images = document.querySelectorAll('.image-reveal');
  
  images.forEach(image => {
    gsap.set(image, { opacity: 0 });
    
    gsap.to(image, {
      opacity: 1,
      duration: 0.1,
      scrollTrigger: {
        trigger: image,
        start: "top 90%",
        onEnter: () => {
          image.classList.add('revealed');
        }
      }
    });
  });
}

// Text Split Animations
export function initTextSplitAnimations() {
  const textElements = document.querySelectorAll('.text-split');
  
  textElements.forEach(element => {
    const text = element.textContent;
    const words = text.split(' ');
    
    element.innerHTML = words.map(word => 
      `<span class="word">${word.split('').map(char => 
        `<span class="char">${char}</span>`
      ).join('')}</span>`
    ).join(' ');
    
    const chars = element.querySelectorAll('.char');
    
    gsap.fromTo(chars, 
      { y: "100%" },
      {
        y: "0%",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
}

// Card Tilt Effect
export function initCardTilts() {
  const cards = document.querySelectorAll('.card-tilt');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  });
}

// Smooth Page Transitions
export function initPageTransitions() {
  // Handle internal link transitions
  const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="#"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const locomotiveScroll = window.locomotiveScroll;
          if (locomotiveScroll) {
            locomotiveScroll.scrollTo(target);
          }
        }
        return;
      }
      
      // For page transitions
      if (href.startsWith('/')) {
        e.preventDefault();
        
        gsap.to('main', {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: "power3.in",
          onComplete: () => {
            window.location.href = href;
          }
        });
      }
    });
  });
}

// Number Counter Animation
export function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-counter]');
  
  counters.forEach(counter => {
    const endValue = parseInt(counter.getAttribute('data-counter'));
    const obj = { value: 0 };
    
    gsap.to(obj, {
      value: endValue,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        counter.textContent = Math.round(obj.value);
      },
      scrollTrigger: {
        trigger: counter,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });
}

// Initialize all enhanced interactions
export function initEnhancedInteractions() {
  initMagneticButtons();
  // initCustomCursor(); // Uncomment if you want custom cursor
  initImageReveals();
  initTextSplitAnimations();
  initCardTilts();
  initPageTransitions();
  initCounterAnimations();
}

// Performance monitoring
export function initPerformanceMonitoring() {
  // Monitor frame rate
  let frames = 0;
  let prevTime = Date.now();
  
  function tick() {
    frames++;
    const time = Date.now();
    
    if (time >= prevTime + 1000) {
      const fps = Math.round((frames * 1000) / (time - prevTime));
      
      // Log warning if FPS drops below 30
      if (fps < 30) {
        console.warn(`Low FPS detected: ${fps}fps`);
      }
      
      frames = 0;
      prevTime = time;
    }
    
    requestAnimationFrame(tick);
  }
  
  requestAnimationFrame(tick);
}

// Initialize on DOM load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initEnhancedInteractions();
    initPerformanceMonitoring();
  });
}