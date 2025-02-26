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

  // Scroll to top button
  const scrollTopBtn = document.getElementById('scroll-top');
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Typewriter effect for hero section
  const typewriterElement = document.querySelector('.typewriter');
  if (typewriterElement) {
    const textArray = JSON.parse(typewriterElement.getAttribute('data-text'));
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
      const currentText = textArray[textIndex];
      
      if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typingSpeed = 300; // Pause before typing next string
      }
      
      setTimeout(type, typingSpeed);
    }
    
    if (textArray.length) {
      setTimeout(type, 1000);
    }
  }

  // Custom cursor follower
  const cursor = document.querySelector('.cursor-follower');
  if (cursor) {
    document.addEventListener('mousemove', function(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', function() {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    
    document.addEventListener('mouseup', function() {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  }

  // Stats counter animation
  const statItems = document.querySelectorAll('.stat-item');
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('.stat-number');
        const finalValue = parseInt(entry.target.getAttribute('data-value'));
        
        let currentValue = 0;
        const increment = finalValue / 50; // Divide animation into 50 steps
        
        const counter = setInterval(() => {
          currentValue += increment;
          
          if (currentValue >= finalValue) {
            clearInterval(counter);
            statNumber.textContent = finalValue;
          } else {
            statNumber.textContent = Math.floor(currentValue);
          }
        }, 30);
        
        statsObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  statItems.forEach(statItem => {
    statsObserver.observe(statItem);
  });

  // Skill progress bars animation
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressValue = entry.target.getAttribute('data-progress') + '%';
        entry.target.style.setProperty('--progress', progressValue);
        entry.target.classList.add('animate');
        
        skillsObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  skillBars.forEach(skillBar => {
    skillsObserver.observe(skillBar);
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

  // Theme toggle functionality
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('.material-icons');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-theme');
      icon.textContent = 'light_mode';
    } else {
      icon.textContent = 'dark_mode';
    }
    
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      
      if (document.body.classList.contains('dark-theme')) {
        icon.textContent = 'light_mode';
        localStorage.setItem('theme', 'dark');
      } else {
        icon.textContent = 'dark_mode';
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // Particles background in hero section (if using particles.js)
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-container', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#4285F4' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#4285F4', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        }
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
