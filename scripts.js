/* scripts.js */
document.addEventListener('DOMContentLoaded', function() {
    // Sliding text animation
    const texts = document.querySelectorAll('.sliding-text p');
    let index = 0;

    function slideText() {
        texts.forEach((text, idx) => {
            text.style.display = idx === index ? 'block' : 'none';
        });
        index = (index + 1) % texts.length;
    }

    setInterval(slideText, 3000); // Change text every 3 seconds
    slideText(); // Initial call to display the first text

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('floating-animation');
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    }, observerOptions);

    // Observe both About Us and Specialists sections
    const sections = document.querySelectorAll('#about, #specialist');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Enhanced navigation handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Special handling for home button
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            // Handle other navigation links
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                targetSection.classList.add('floating-animation');
            }
        });
    });

    // Optional: Add hover effect sound for specialist cards
    const specialistCards = document.querySelectorAll('.specialist-card');
    specialistCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // You can add a subtle hover sound here if desired
            // const hoverSound = new Audio('path-to-sound-file.mp3');
            // hoverSound.play();
        });
    });
});