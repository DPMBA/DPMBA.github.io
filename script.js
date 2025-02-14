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

    // Skill Bubble Hover Effect
    const skillBubbles = document.querySelectorAll('.skill-bubble');
    const skillDescription = document.querySelector('.skill-description');

    skillBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            const description = this.dataset.description;
            skillDescription.textContent = description;
            skillDescription.style.opacity = 1;
              // Calculate position relative to the bubble
            const rect = bubble.getBoundingClientRect();
            //Centers it
            skillDescription.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
            skillDescription.style.top = `${rect.bottom + window.scrollY + 10px`; // 10px gap
        });

        bubble.addEventListener('mouseleave', function() {
            skillDescription.style.opacity = 0;
        });
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

    // Ripple Effect
    document.querySelectorAll('.ripple-element').forEach(el => {
        el.addEventListener('click', function(e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');

            // Get click position relative to the element
            let rect = el.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            el.appendChild(ripple);

            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

        // Intersection Observer for section animations (Optional - Add if you want subtle fade-ins)
    const sections = document.querySelectorAll('.section'); // Or more specific selectors
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in'); // Add a class for animation
            }
        });
    }, {
        threshold: 0.2 // Adjust as needed
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});
