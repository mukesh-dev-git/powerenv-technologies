// Main animation initialization script
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  fadeIn, 
  slideInLeft, 
  slideInRight, 
  scaleIn, 
  staggerAnimation, 
  textReveal, 
  animateCounter, 
  addHoverAnimation, 
  addButtonHover,
  addParallax,
  pageTransitionIn 
} from './animations.js';
import { initLocomotiveScroll, updateLocomotiveScroll } from './locomotive.js';
import { initEnhancedInteractions } from './enhanced-interactions.js';
import { initPerformanceOptimizations, addResourceHints } from './performance.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize everything when DOM is loaded
export function initializeAnimations() {
  try {
    // Add resource hints for performance
    addResourceHints();
    
    // Initialize performance optimizations
    const deviceInfo = initPerformanceOptimizations();
    
    // Initialize Locomotive Scroll first
    const locomotiveScroll = initLocomotiveScroll();
    
    // Store reference globally for other modules
    window.locomotiveScroll = locomotiveScroll;
    
    // If Locomotive Scroll failed to initialize, use regular scrolling
    if (!locomotiveScroll) {
      console.warn('Using fallback scrolling without Locomotive');
      document.body.style.overflow = 'auto';
      const container = document.querySelector('[data-scroll-container]');
      if (container) {
        container.style.height = 'auto';
        container.style.overflow = 'visible';
      }
    }
    
    // Initialize page transition
    pageTransitionIn();
    
    // Hero section animations
    initHeroAnimations();
    
    // Section animations
    initSectionAnimations();
    
    // Interactive elements
    initInteractiveElements();
    
    // Counter animations
    initCounterAnimations();
    
    // Parallax effects (only if Locomotive is working)
    if (locomotiveScroll) {
      initParallaxEffects();
    } else {
      // Use fallback scroll animations
      initFallbackScrollAnimations();
    }
    
    // Enhanced interactions
    initEnhancedInteractions();
    
    // Update Locomotive Scroll after all animations are set up
    setTimeout(() => {
      if (locomotiveScroll) {
        updateLocomotiveScroll();
      }
    }, 100);
    
  } catch (error) {
    console.error('Error during animation initialization:', error);
    // Ensure basic functionality works
    document.body.style.overflow = 'auto';
  }
}

function initHeroAnimations() {
  const heroTitle = document.querySelector('.hero h1');
  const heroSubtitle = document.querySelector('.hero .sub-headline');
  const heroButton = document.querySelector('.hero .button-primary');
  const heroImage = document.querySelector('.hero-visual img');
  
  if (heroTitle) {
    textReveal(heroTitle, { delay: 0.2 });
  }
  
  if (heroSubtitle) {
    fadeIn(heroSubtitle, { delay: 0.5, y: 30 });
  }
  
  if (heroButton) {
    fadeIn(heroButton, { delay: 0.8, y: 20 });
    addButtonHover(heroButton);
  }
  
  if (heroImage) {
    scaleIn(heroImage, { delay: 1, scale: 0.9 });
  }
}

function initSectionAnimations() {
  // Problem section
  const problemSection = document.querySelector('.problem-section');
  if (problemSection) {
    const statNumber = problemSection.querySelector('.stat-number');
    const statLabel = problemSection.querySelector('.stat-label');
    const textColumn = problemSection.querySelector('.text-column');
    
    if (statNumber) slideInLeft(statNumber);
    if (statLabel) slideInLeft(statLabel, { delay: 0.2 });
    if (textColumn) slideInRight(textColumn);
  }
  
  // Solution section
  const solutionSection = document.querySelector('.solution-section');
  if (solutionSection) {
    const solutionTitle = solutionSection.querySelector('h2');
    const solutionCards = solutionSection.querySelectorAll('.solution-card');
    
    if (solutionTitle) fadeIn(solutionTitle);
    if (solutionCards.length > 0) {
      staggerAnimation(solutionCards, { y: 60, stagger: 0.2 });
    }
  }
  
  // Animate all sections with fade-in class
  const fadeInElements = document.querySelectorAll('.fade-in');
  fadeInElements.forEach(element => {
    fadeIn(element);
  });
  
  // Animate all headings
  const headings = document.querySelectorAll('h2, h3');
  headings.forEach(heading => {
    fadeIn(heading, { y: 30 });
  });
  
  // Animate all paragraphs
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(paragraph => {
    fadeIn(paragraph, { y: 20, delay: 0.2 });
  });
}

function initInteractiveElements() {
  // Add hover animations to cards
  const cards = document.querySelectorAll('.solution-card, .card, .feature-card');
  cards.forEach(card => {
    addHoverAnimation(card, { scale: 1.03 });
  });
  
  // Add hover animations to all buttons
  const buttons = document.querySelectorAll('.button-primary, .button-secondary, .btn');
  buttons.forEach(button => {
    addButtonHover(button);
  });
  
  // Add hover animations to links
  const links = document.querySelectorAll('a:not(.button-primary):not(.button-secondary)');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, { scale: 1.05, duration: 0.2 });
    });
    
    link.addEventListener('mouseleave', () => {
      gsap.to(link, { scale: 1, duration: 0.2 });
    });
  });
}

function initCounterAnimations() {
  // Animate stat numbers
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => {
    const text = stat.textContent;
    const number = parseInt(text.replace(/[^\d]/g, ''));
    const suffix = text.replace(/[\d]/g, '');
    
    if (number) {
      animateCounter(stat, number, { suffix: suffix });
    }
  });
}

function initParallaxEffects() {
  // Add parallax to hero images
  const heroImages = document.querySelectorAll('.hero-visual img, .hero-image');
  heroImages.forEach(image => {
    addParallax(image, 0.3);
  });
  
  // Add parallax to background elements
  const bgElements = document.querySelectorAll('.bg-element, .background-image');
  bgElements.forEach(element => {
    addParallax(element, 0.5);
  });
}

// Navigation smooth scroll
export function initSmoothNavigation() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        if (window.locomotiveScroll) {
          window.locomotiveScroll.scrollTo(targetElement);
        } else {
          // Fallback smooth scroll
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// Fallback scroll animations (without Locomotive)
export function initFallbackScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Add reveal class for CSS animations
        element.classList.add('revealed');
        
        // Apply GSAP animations
        if (element.classList.contains('fade-in')) {
          gsap.fromTo(element, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
          );
        }
        
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  // Observe all animated elements
  document.querySelectorAll('.fade-in, [data-scroll]').forEach(el => {
    observer.observe(el);
  });
}

// Refresh animations on window resize
export function refreshAnimations() {
  ScrollTrigger.refresh();
  updateLocomotiveScroll();
}

// Initialize on page load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    initSmoothNavigation();
  });
  
  window.addEventListener('resize', refreshAnimations);
}