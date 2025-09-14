// Simplified initialization without Locomotive Scroll
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Simple scroll-triggered animations
export function initSimpleAnimations() {
  console.log('Initializing simple animations...');
  
  // Hero animations
  const heroTitle = document.querySelector('.hero h1');
  const heroSubtitle = document.querySelector('.hero .sub-headline');
  const heroButton = document.querySelector('.hero .button-primary');
  
  if (heroTitle) {
    gsap.fromTo(heroTitle, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
    );
  }
  
  if (heroSubtitle) {
    gsap.fromTo(heroSubtitle,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    );
  }
  
  if (heroButton) {
    gsap.fromTo(heroButton,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power3.out" }
    );
  }
  
  // Scroll-triggered animations for other sections
  const sections = document.querySelectorAll('section:not(.hero)');
  sections.forEach((section, index) => {
    gsap.fromTo(section,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
  
  // Card animations
  const cards = document.querySelectorAll('.solution-card, .step-card');
  cards.forEach((card, index) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
  
  // Simple hover effects
  const buttons = document.querySelectorAll('.button-primary');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, { scale: 1.05, duration: 0.3 });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, { scale: 1, duration: 0.3 });
    });
  });
  
  console.log('Simple animations initialized successfully!');
}

// Initialize everything
export function initializeSimple() {
  // Ensure normal scrolling
  document.body.style.overflow = 'auto';
  const container = document.querySelector('[data-scroll-container]');
  if (container) {
    container.style.height = 'auto';
    container.style.overflow = 'visible';
  }
  
  // Page entrance animation
  gsap.fromTo('main',
    { opacity: 0 },
    { opacity: 1, duration: 0.8, ease: "power3.out" }
  );
  
  // Initialize simple animations
  initSimpleAnimations();
}