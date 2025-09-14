// Animation utilities using GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Global animation settings
export const animationSettings = {
  duration: 1.2,
  ease: "power3.out",
  stagger: 0.1,
};

// Fade in animation
export function fadeIn(element, options = {}) {
  const config = {
    opacity: 0,
    y: 50,
    duration: animationSettings.duration,
    ease: animationSettings.ease,
    ...options
  };
  
  gsap.fromTo(element, 
    { opacity: 0, y: config.y },
    {
      opacity: 1,
      y: 0,
      duration: config.duration,
      ease: config.ease,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
}

// Slide in from left
export function slideInLeft(element, options = {}) {
  const config = {
    x: -100,
    duration: animationSettings.duration,
    ease: animationSettings.ease,
    ...options
  };
  
  gsap.fromTo(element,
    { opacity: 0, x: config.x },
    {
      opacity: 1,
      x: 0,
      duration: config.duration,
      ease: config.ease,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
}

// Slide in from right
export function slideInRight(element, options = {}) {
  const config = {
    x: 100,
    duration: animationSettings.duration,
    ease: animationSettings.ease,
    ...options
  };
  
  gsap.fromTo(element,
    { opacity: 0, x: config.x },
    {
      opacity: 1,
      x: 0,
      duration: config.duration,
      ease: config.ease,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
}

// Scale animation
export function scaleIn(element, options = {}) {
  const config = {
    scale: 0.8,
    duration: animationSettings.duration,
    ease: animationSettings.ease,
    ...options
  };
  
  gsap.fromTo(element,
    { opacity: 0, scale: config.scale },
    {
      opacity: 1,
      scale: 1,
      duration: config.duration,
      ease: config.ease,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
}

// Stagger animation for multiple elements
export function staggerAnimation(elements, options = {}) {
  const config = {
    y: 50,
    stagger: animationSettings.stagger,
    duration: animationSettings.duration,
    ease: animationSettings.ease,
    ...options
  };
  
  gsap.fromTo(elements,
    { opacity: 0, y: config.y },
    {
      opacity: 1,
      y: 0,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
      scrollTrigger: {
        trigger: elements[0],
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
}

// Text reveal animation
export function textReveal(element, options = {}) {
  const config = {
    duration: 1.5,
    ease: "power3.out",
    ...options
  };
  
  // Split text into lines
  const text = element.textContent;
  element.innerHTML = text.split(' ').map(word => 
    `<span class="word" style="display: inline-block; overflow: hidden;">
      <span style="display: inline-block;">${word}</span>
    </span>`
  ).join(' ');
  
  const words = element.querySelectorAll('.word span');
  
  gsap.fromTo(words,
    { y: "100%" },
    {
      y: "0%",
      duration: config.duration,
      ease: config.ease,
      stagger: 0.05,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
}

// Counter animation
export function animateCounter(element, endValue, options = {}) {
  const config = {
    duration: 2,
    ease: "power2.out",
    ...options
  };
  
  const obj = { value: 0 };
  
  gsap.to(obj, {
    value: endValue,
    duration: config.duration,
    ease: config.ease,
    onUpdate: () => {
      element.textContent = Math.round(obj.value) + (config.suffix || '');
    },
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
}

// Hover animations
export function addHoverAnimation(element, options = {}) {
  const config = {
    scale: 1.05,
    duration: 0.3,
    ease: "power2.out",
    ...options
  };
  
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale: config.scale,
      duration: config.duration,
      ease: config.ease
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      duration: config.duration,
      ease: config.ease
    });
  });
}

// Button hover effect
export function addButtonHover(button) {
  const originalBg = getComputedStyle(button).backgroundColor;
  
  button.addEventListener('mouseenter', () => {
    gsap.to(button, {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      duration: 0.3,
      ease: "power2.out"
    });
  });
  
  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      scale: 1,
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  });
}

// Parallax effect
export function addParallax(element, speed = 0.5) {
  gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
}

// Page transition animations
export function pageTransitionIn() {
  const tl = gsap.timeline();
  
  tl.from("main", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out"
  });
  
  return tl;
}

export function pageTransitionOut() {
  const tl = gsap.timeline();
  
  tl.to("main", {
    opacity: 0,
    y: -30,
    duration: 0.5,
    ease: "power3.in"
  });
  
  return tl;
}