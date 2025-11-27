document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fire Embers Effect
    const fireContainer = document.querySelector('.fire-particles');
    if (fireContainer) {
        createEmbers(fireContainer);
    }
});

function createEmbers(container) {
    const emberCount = 50;
    
    for (let i = 0; i < emberCount; i++) {
        const ember = document.createElement('div');
        ember.classList.add('ember');
        
        // Random positioning and animation properties
        const size = Math.random() * 5 + 2;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;
        
        ember.style.width = `${size}px`;
        ember.style.height = `${size}px`;
        ember.style.left = `${left}%`;
        ember.style.animationDuration = `${duration}s`;
        ember.style.animationDelay = `${delay}s`;
        
        container.appendChild(ember);
    }
}
