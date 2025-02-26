document.addEventListener('DOMContentLoaded', function() {
  // Page Loader
  const loader = document.querySelector('.loader');
  if (loader) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        loader.classList.add('hidden');
      }, 800);
    });
  }
  
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Change icon based on menu state
      const icon = this.querySelector('.material-icons');
      if (navLinks.classList.contains('active')) {
        icon.textContent = 'close';
      } else {
        icon.textContent = 'menu';
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navLinks && navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.mobile-toggle')) {
      navLinks.classList.remove('active');
      if (mobileToggle) {
        const icon = mobileToggle.querySelector('.material-icons');
        icon.textContent = 'menu';
      }
    }
  });

  // Smooth Scrolling for Navigation
  const allNavLinks = document.querySelectorAll('a[href^="#"]');
  allNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (mobileToggle) {
          const icon = mobileToggle.querySelector('.material-icons');
          icon.textContent = 'menu';
        }
      }
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Sticky Header with Shrink Effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  });

  // Section Animation on Scroll
  const sections = document.querySelectorAll('.section');
  
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px'
  });
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Testimonials Slider (if using Swiper.js)
  if (typeof Swiper !== 'undefined') {
    const testimonialsSwiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }

  // Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic form validation
      let isValid = true;
      const formControls = this.querySelectorAll('.form-control');
      
      formControls.forEach(control => {
        if (!control.value.trim()) {
          isValid = false;
          control.classList.add('error');
        } else {
          control.classList.remove('error');
        }
      });
      
      if (isValid) {
        // Here you would typically send the form data to a server
        // For demo purposes, show success message
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        setTimeout(() => {
          this.reset();
          submitBtn.textContent = 'Message Sent!';
          
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }, 2000);
        }, 1500);
      }
    });
  }
});
