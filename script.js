document.addEventListener('DOMContentLoaded', function() {
  // Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
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

  // Initialize Swiper for Testimonials Carousel
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Typewriter Effect for the Hero Title
  const heroTitleSpan = document.querySelector('.typewriter');
  if (heroTitleSpan) {
    const typewriter = new Typewriter(heroTitleSpan, {
      loop: true,
      delay: 65,
    });
    typewriter
      .typeString('Dharmanshu H. Poshiya')
      .pauseFor(1500)
      .deleteAll()
      .typeString('Sales Professional')
      .pauseFor(1500)
      .deleteAll()
      .typeString('Engineer')
      .pauseFor(1500)
      .start();
  }

  // Intersection Observer for Section Animations (if you add animation classes)
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(section => observer.observe(section));
});
