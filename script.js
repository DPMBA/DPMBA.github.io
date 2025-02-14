document.addEventListener('DOMContentLoaded', function() {
    //... (Your existing smooth scrolling and sticky header code)...

    // Add this for the active state on navigation links:
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default jump behavior

            navLinks.forEach(otherLink => {
                otherLink.classList.remove('active'); // Remove active class from other links
            });

            this.classList.add('active'); // Add active class to the clicked link

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop, // Use offsetTop for accurate positioning
                    behavior: 'smooth'
                });
            }
        });
    });

    //... (rest of your script.js code)...
});
