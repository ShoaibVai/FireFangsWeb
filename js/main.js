document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

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

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize Vanilla Tilt on Cards
    VanillaTilt.init(document.querySelectorAll(".member-card, .about-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.05
    });

    // --- GSAP Animations ---

    // Hero Section Animation
    const heroTl = gsap.timeline();
    heroTl.from('.navbar', { y: -100, opacity: 0, duration: 1, ease: 'power3.out' })
          .from('.title-wrapper', { scale: 0.5, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.5')
          .from('.tagline', { y: 20, opacity: 0, duration: 0.8 }, '-=0.3')
          .from('.cta-buttons .btn', { y: 20, opacity: 0, stagger: 0.2, duration: 0.8 }, '-=0.5');

    // About Section Animation
    gsap.from('.about-section .section-title', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1
    });

    gsap.from('.about-card', {
        scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Roster Section Animation
    gsap.from('.roster-section .section-title', {
        scrollTrigger: {
            trigger: '.roster-section',
            start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1
    });

    gsap.from('.member-card', {
        scrollTrigger: {
            trigger: '.roster-grid',
            start: 'top 75%',
        },
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Contact Section Animation
    gsap.from('.contact-section', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 85%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1
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
