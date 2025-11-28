document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugin
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            if (navLinks && hamburger) {
                navLinks.classList.remove('nav-active');
                hamburger.classList.remove('toggle');
            }

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize Vanilla Tilt on Cards (only on non-touch devices)
    if (typeof VanillaTilt !== 'undefined' && !('ontouchstart' in window)) {
        VanillaTilt.init(document.querySelectorAll(".member-card, .about-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.05
        });
    }

    // --- GSAP Animations ---
    if (typeof gsap === 'undefined') {
        // If GSAP not loaded, ensure all elements are visible
        document.querySelectorAll('.member-card, .about-card, .section-title, .contact-section').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    // Ensure elements are visible by default (in case ScrollTrigger fails)
    gsap.set('.member-card, .about-card, .roster-section .section-title, .about-section .section-title, .contact-section, .ignite-stats .stat-card, .timeline-item', {
        opacity: 1,
        y: 0,
        scale: 1
    });

    // Hero Section Animation
    const heroTl = gsap.timeline();
    heroTl.from('.navbar', { y: -100, opacity: 0, duration: 1, ease: 'power3.out' })
          .from('.title-wrapper', { scale: 0.5, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.5')
          .from('.tagline', { y: 20, opacity: 0, duration: 0.8 }, '-=0.3')
          .from('.hero-copy', { y: 20, opacity: 0, duration: 0.8 }, '-=0.4')
          .from('.cta-buttons .btn', { y: 20, opacity: 0, stagger: 0.15, duration: 0.7 }, '-=0.5')
          .from('.hero-meta div', { y: 30, opacity: 0, stagger: 0.1, duration: 0.6 }, '-=0.4')
          .from('.command-card', { x: 60, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.6');

    // About Section Animation
    gsap.fromTo('.about-section .section-title', 
        { y: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
            },
            y: 0,
            opacity: 1,
            duration: 1
        }
    );

    gsap.fromTo('.ignite-stats .stat-card', 
        { y: 60, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.ignite-stats',
                start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.7,
            ease: 'power2.out'
        }
    );

    gsap.fromTo('.about-card', 
        { y: 100, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 80%',
            },
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out'
        }
    );

    gsap.fromTo('.timeline-item', 
        { x: -40, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top 80%',
            },
            x: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.7
        }
    );

    // Roster Section Animation
    gsap.fromTo('.roster-section .section-title', 
        { y: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.roster-section',
                start: 'top 80%',
            },
            y: 0,
            opacity: 1,
            duration: 1
        }
    );

    gsap.fromTo('.member-card', 
        { y: 100, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.roster-grid',
                start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out'
        }
    );

    // Contact Section Animation
    gsap.fromTo('.contact-section .contact-panel', 
        { scale: 0.9, opacity: 0 },
        {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 85%',
            },
            scale: 1,
            opacity: 1,
            duration: 1
        }
    );

    // Fire Embers Effect
    const fireContainer = document.querySelector('.fire-particles');
    if (fireContainer) {
        createEmbers(fireContainer);
    }

    // Initialize Background Music
    initBackgroundMusic();
});

// Background Music with Auto-play
function initBackgroundMusic() {
    const audio = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    
    if (!audio || !musicToggle || !musicIcon) return;
    
    let isPlaying = false;
    
    // Set initial volume
    audio.volume = 0.5;
    
    // Function to start music
    const startMusic = () => {
        audio.play().then(() => {
            isPlaying = true;
            musicToggle.classList.add('playing');
            musicIcon.classList.remove('fa-volume-xmark');
            musicIcon.classList.add('fa-volume-high');
        }).catch(err => {
            console.log('Autoplay prevented, user interaction required');
        });
    };
    
    // Try to autoplay
    startMusic();
    
    // Also try on first user interaction
    const enableOnInteraction = () => {
        if (!isPlaying) {
            startMusic();
        }
        document.removeEventListener('click', enableOnInteraction);
        document.removeEventListener('scroll', enableOnInteraction);
        document.removeEventListener('touchstart', enableOnInteraction);
    };
    
    document.addEventListener('click', enableOnInteraction, { once: true });
    document.addEventListener('scroll', enableOnInteraction, { once: true });
    document.addEventListener('touchstart', enableOnInteraction, { once: true });
    
    // Toggle music on button click
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            musicToggle.classList.remove('playing');
            musicIcon.classList.remove('fa-volume-high');
            musicIcon.classList.add('fa-volume-xmark');
        } else {
            audio.play();
            isPlaying = true;
            musicToggle.classList.add('playing');
            musicIcon.classList.remove('fa-volume-xmark');
            musicIcon.classList.add('fa-volume-high');
        }
    });
}

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
