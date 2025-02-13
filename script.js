document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1 // Adjust as needed
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});
