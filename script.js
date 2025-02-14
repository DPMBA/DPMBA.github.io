document.addEventListener('DOMContentLoaded', function() {

    // Smooth Scrolling
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

    // Initialize Swiper (Testimonials Carousel)
    var swiper = new Swiper('.swiper-container', {
       slidesPerView: 1,
        spaceBetween: 30,
        loop: true, // Enable looping
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

     // Typewriter Effect (Hero Title)
    const heroTitleSpan = document.querySelector('.typewriter');
      if (heroTitleSpan){
            const typewriter = new Typewriter(heroTitleSpan, {
            loop: true,
            delay: 65, // Adjust typing speed
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

        // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section'); // Or more specific selectors
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in'); // Add a class for animation, define in CSS
            }
        });
    }, {
        threshold: 0.2 // Adjust as needed
    });

    sections.forEach(section => {
        observer.observe(section);
    });

});
