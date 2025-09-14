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
    // Enhanced hero title with power-up effect
    gsap.fromTo(heroTitle, 
      { opacity: 0, y: 50, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 1.2, 
        delay: 0.2, 
        ease: "power3.out",
        onStart: () => {
          // Add electric glow effect
          heroTitle.style.textShadow = '0 0 20px rgba(44, 165, 141, 0.5)';
          setTimeout(() => {
            heroTitle.style.textShadow = 'none';
          }, 1000);
        }
      }
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
  
  // Enhanced hover effects with power theme
  const buttons = document.querySelectorAll('.button-primary');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, { 
        scale: 1.05, 
        duration: 0.3,
        boxShadow: '0 8px 25px rgba(44, 165, 141, 0.4), 0 0 20px rgba(44, 165, 141, 0.2)'
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, { 
        scale: 1, 
        duration: 0.3,
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
      });
    });
    
    // Add click effect with electric pulse
    button.addEventListener('click', (e) => {
      const rect = button.getBoundingClientRect();
      const pulse = document.createElement('div');
      pulse.style.cssText = `
        position: absolute;
        left: ${e.clientX - rect.left}px;
        top: ${e.clientY - rect.top}px;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
      `;
      
      button.style.position = 'relative';
      button.appendChild(pulse);
      
      gsap.to(pulse, {
        width: '100px',
        height: '100px',
        x: '-50px',
        y: '-50px',
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        onComplete: () => {
          if (pulse.parentNode) pulse.parentNode.removeChild(pulse);
        }
      });
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
  
  // Page entrance animation with power-up effect
  gsap.fromTo('main',
    { opacity: 0, scale: 0.95 },
    { 
      opacity: 1, 
      scale: 1, 
      duration: 1.2, 
      ease: "power3.out",
      onStart: () => {
        // Add a subtle flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(44, 165, 141, 0.1), transparent);
          pointer-events: none;
          z-index: 9998;
        `;
        document.body.appendChild(flash);
        
        gsap.fromTo(flash, 
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              document.body.removeChild(flash);
            }
          }
        );
      }
    }
  );
  
  // Initialize simple animations with enhanced timing
  setTimeout(() => {
    initSimpleAnimations();
  }, 300);
}