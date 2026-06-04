// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animate links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            links.forEach(link => link.style.animation = '');
        });
    });

    // Dynamic Years of Experience
    const startYear = 2023;
    const currentYear = new Date().getFullYear();
    const expYears = currentYear - startYear + 1;
    const expElement = document.getElementById('exp-years');
    if (expElement) {
        expElement.textContent = `${expYears}+`;
    }

    // Dynamic Copyright Year
    const copyrightYearElement = document.getElementById('copyright-year');
    if (copyrightYearElement) {
        copyrightYearElement.textContent = currentYear;
    }

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .about-text, .stat-item, .skill-category, .project-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add CSS class for animation via JS to keep logic centralized
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
    // Theme Switcher Logic
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const systemMedia = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (isDark) => {
        if (isDark) {
            htmlElement.setAttribute('data-theme', 'dark');
            if (metaThemeColor) metaThemeColor.setAttribute('content', '#020617');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            if (metaThemeColor) metaThemeColor.setAttribute('content', '#f8fafc');
        }
    };

    // Apply saved theme or system preference
    if (savedTheme) {
        applyTheme(savedTheme === 'dark');
    } else {
        applyTheme(systemMedia.matches);
    }

    // Listen for system theme changes if no explicit user preference is saved
    systemMedia.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches);
        }
    });

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            applyTheme(newTheme === 'dark');
            localStorage.setItem('theme', newTheme);
        });
    }
});
