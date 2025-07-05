// JavaScript for Krishna Khanna's Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.reveal-item', {
            delay: 200,
            distance: '50px',
            origin: 'bottom',
            interval: 100,
            duration: 1000,
            easing: 'ease-out'
        });
    }

    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = document.querySelectorAll('.nav-link, .mobile-nav-link');

    function updateActiveNavLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    const skillsPanel = document.querySelector('.skills-panel');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-gray-900/95');
            navbar.classList.remove('bg-gray-900/90');
            if (skillsPanel) {
                skillsPanel.classList.add('scrolled');
            }
        } else {
            navbar.classList.remove('bg-gray-900/95');
            navbar.classList.add('bg-gray-900/90');
            if (skillsPanel) {
                skillsPanel.classList.remove('scrolled');
            }
        }
    }

    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbar();
        animateOnScroll();
    });

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.reveal-item, .timeline-item, .skill-item, .service-card, .project-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    }

    // Initialize animations on page load
    setTimeout(animateOnScroll, 100);



    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Typing animation for hero text
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing animation for hero section
    const heroTitle = document.querySelector('#home h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }

    // Skill bars animation
    function animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('revealed');
            }, index * 200);
        });
    }

    // Trigger skill bar animation when skills section is in view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }

    // Parallax effect for floating elements
    function parallaxEffect() {
        const floatingElements = document.querySelectorAll('.absolute.top-20, .absolute.bottom-20');
        const scrolled = window.pageYOffset;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    // Add parallax effect on scroll
    window.addEventListener('scroll', parallaxEffect);

    // Download resume functionality
    const downloadResumeBtn = document.querySelector('a[href="#"]');
    if (downloadResumeBtn && downloadResumeBtn.textContent.includes('Download Resume')) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Resume download feature will be implemented soon!', 'info');
        });
    }

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02) translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove loading screen if exists
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
        
        // Arrow keys for navigation (optional)
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            const currentSection = getCurrentSection();
            const nextSection = getNextSection(currentSection);
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            const currentSection = getCurrentSection();
            const prevSection = getPreviousSection(currentSection);
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Helper functions for keyboard navigation
    function getCurrentSection() {
        const scrollPos = window.scrollY + 100;
        for (let section of sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                return section;
            }
        }
        return sections[0];
    }

    function getNextSection(currentSection) {
        const currentIndex = Array.from(sections).indexOf(currentSection);
        return sections[currentIndex + 1] || null;
    }

    function getPreviousSection(currentSection) {
        const currentIndex = Array.from(sections).indexOf(currentSection);
        return sections[currentIndex - 1] || null;
    }

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll events
    const throttledUpdateNavbar = throttle(updateNavbar, 16);
    const throttledParallaxEffect = throttle(parallaxEffect, 16);
    
    window.removeEventListener('scroll', updateNavbar);
    window.removeEventListener('scroll', parallaxEffect);
    window.addEventListener('scroll', throttledUpdateNavbar);
    window.addEventListener('scroll', throttledParallaxEffect);

    // Opening screen functionality
    const openingScreen = document.getElementById('opening-screen');
    const greetingMain = document.querySelector('.greeting-main');
    const greetingSubs = document.querySelectorAll('.greeting-sub');
    
    // Main greeting cycling
    const mainGreetings = ['Hello', 'नमस्ते', 'السلام علیکم', 'Hola', 'Bonjour'];
    let currentMainIndex = 0;
    
    function cycleMainGreeting() {
        greetingMain.style.opacity = '0';
        greetingMain.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            currentMainIndex = (currentMainIndex + 1) % mainGreetings.length;
            greetingMain.textContent = mainGreetings[currentMainIndex];
            greetingMain.style.opacity = '1';
            greetingMain.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Start cycling main greeting after initial animations
    setTimeout(() => {
        setInterval(cycleMainGreeting, 2500);
    }, 4000);
    
    // Transition to main portfolio after 6 seconds
    setTimeout(() => {
        openingScreen.classList.add('fade-out');
        setTimeout(() => {
            openingScreen.style.display = 'none';
        }, 1000);
    }, 6000);
    
    // Allow clicking to skip opening screen
    openingScreen.addEventListener('click', () => {
        openingScreen.classList.add('fade-out');
        setTimeout(() => {
            openingScreen.style.display = 'none';
        }, 1000);
    });

    // Initialize everything
    updateActiveNavLink();
    updateNavbar();
    animateOnScroll();
}); 