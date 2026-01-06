// script.js - Premium Construction Website - Enhanced Version
// Last Updated: 2026-01-06

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== GLOBAL VARIABLES =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const backToTopBtn = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    
    // ===== ENHANCED MOBILE NAVIGATION WITH DROPDOWN FIX =====
    function initMobileNavigation() {
        if (!mobileMenuBtn || !mainNav || !mobileOverlay) return;
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking overlay
        mobileOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Handle dropdown menus on mobile
        const dropdownToggles = document.querySelectorAll('.has-dropdown > .nav-link');
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const parent = this.parentElement;
                    const dropdown = parent.querySelector('.dropdown');
                    
                    // Close all other dropdowns
                    dropdowns.forEach(d => {
                        if (d !== dropdown) {
                            d.style.maxHeight = '0';
                            d.style.opacity = '0';
                            d.style.visibility = 'hidden';
                        }
                    });
                    
                    // Toggle current dropdown
                    if (dropdown.style.maxHeight && dropdown.style.maxHeight !== '0px') {
                        dropdown.style.maxHeight = '0';
                        dropdown.style.opacity = '0';
                        dropdown.style.visibility = 'hidden';
                    } else {
                        dropdown.style.maxHeight = dropdown.scrollHeight + 'px';
                        dropdown.style.opacity = '1';
                        dropdown.style.visibility = 'visible';
                        dropdown.style.transform = 'translateY(0)';
                    }
                    
                    // Toggle arrow rotation
                    const arrow = this.querySelector('.dropdown-arrow');
                    if (arrow) {
                        arrow.style.transform = dropdown.style.maxHeight !== '0px' ? 'rotate(180deg)' : 'rotate(0deg)';
                    }
                }
            });
        });
        
        // Close dropdowns when clicking links
        const dropdownLinks = document.querySelectorAll('.dropdown a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    const dropdown = this.closest('.dropdown');
                    if (dropdown) {
                        dropdown.style.maxHeight = '0';
                        dropdown.style.opacity = '0';
                        dropdown.style.visibility = 'hidden';
                    }
                    closeMobileMenu();
                }
            });
        });
        
        // Close mobile menu when clicking regular nav links
        const navLinks = document.querySelectorAll('#mainNav a:not(.has-dropdown > a)');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });
        
        // Reset dropdowns on window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768) {
                    // Reset mobile styles for desktop
                    dropdowns.forEach(dropdown => {
                        dropdown.style.maxHeight = '';
                        dropdown.style.opacity = '';
                        dropdown.style.visibility = '';
                        dropdown.style.transform = '';
                    });
                    
                    const arrows = document.querySelectorAll('.dropdown-arrow');
                    arrows.forEach(arrow => {
                        arrow.style.transform = '';
                    });
                    
                    closeMobileMenu();
                }
            }, 250);
        });
    }
    
    // Close mobile menu function
    function closeMobileMenu() {
        if (mainNav) mainNav.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ===== ENHANCED TYPEWRITER EFFECT =====
    function initTypewriter() {
        const typewriterElement = document.getElementById('typewriterText');
        if (!typewriterElement) return;
        
        const texts = [
            "Building South Sudan's Future",
            "Quality Construction Since 2010",
            "Trusted Engineering Experts",
            "Affordable Building Solutions",
            "Local Expertise, Global Standards"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        const typingSpeed = 80;
        const deletingSpeed = 50;
        const pauseDuration = 2000;
        let animationId;
        
        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (!isPaused) {
                if (!isDeleting && charIndex <= currentText.length) {
                    // Typing
                    typewriterElement.textContent = currentText.substring(0, charIndex);
                    charIndex++;
                    animationId = setTimeout(typeWriter, typingSpeed);
                } else if (isDeleting && charIndex >= 0) {
                    // Deleting
                    typewriterElement.textContent = currentText.substring(0, charIndex);
                    charIndex--;
                    animationId = setTimeout(typeWriter, deletingSpeed);
                } else if (!isDeleting && charIndex > currentText.length) {
                    // Finished typing, pause then start deleting
                    isPaused = true;
                    animationId = setTimeout(() => {
                        isPaused = false;
                        isDeleting = true;
                        typeWriter();
                    }, pauseDuration);
                } else if (isDeleting && charIndex < 0) {
                    // Finished deleting, move to next text
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    charIndex = 0;
                    animationId = setTimeout(typeWriter, 500);
                }
            }
        }
        
        // Start the typewriter effect
        setTimeout(() => {
            typewriterElement.style.opacity = '1';
            typeWriter();
        }, 1000);
        
        // Pause on hover
        typewriterElement.addEventListener('mouseenter', function() {
            clearTimeout(animationId);
        });
        
        typewriterElement.addEventListener('mouseleave', function() {
            typeWriter();
        });
    }
    
    // ===== ENHANCED BACK TO TOP BUTTON =====
    function initBackToTop() {
        if (!backToTopBtn) return;
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add pulse animation every 30 seconds
        setInterval(() => {
            if (backToTopBtn.classList.contains('visible') && 
                window.pageYOffset > 500) {
                backToTopBtn.classList.add('pulse');
                setTimeout(() => {
                    backToTopBtn.classList.remove('pulse');
                }, 1000);
            }
        }, 30000);
    }
    
    // ===== ENHANCED SMOOTH SCROLLING =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#" or if it's a dropdown toggle
                if (href === '#' || this.classList.contains('has-dropdown')) {
                    return;
                }
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    closeMobileMenu();
                    
                    // Calculate header height for offset
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + 
                                         window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ===== ENHANCED PROJECTS FILTER =====
    function initProjectsFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (filterBtns.length === 0 || projectCards.length === 0) return;
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.style.transform = 'scale(1)';
                });
                
                // Add active class to clicked button with animation
                this.classList.add('active');
                this.style.transform = 'scale(1.05)';
                
                const filterValue = this.getAttribute('data-filter');
                let visibleCount = 0;
                
                // Filter projects with animation
                projectCards.forEach((card, index) => {
                    const categories = card.getAttribute('data-category');
                    const shouldShow = filterValue === 'all' || 
                                     (categories && categories.includes(filterValue));
                    
                    // Add delay for staggered animation
                    const delay = index * 50;
                    
                    setTimeout(() => {
                        if (shouldShow) {
                            card.style.display = 'block';
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            
                            // Animate in
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                            
                            visibleCount++;
                        } else {
                            // Animate out
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }, delay);
                });
                
                // Show message if no projects found
                setTimeout(() => {
                    showNoProjectsMessage(visibleCount === 0);
                }, projectCards.length * 50 + 300);
            });
        });
    }
    
    function showNoProjectsMessage(show) {
        let message = document.querySelector('.no-projects-message');
        
        if (show && !message) {
            message = document.createElement('div');
            message.className = 'no-projects-message fade-in';
            message.innerHTML = `
                <div class="no-projects-content">
                    <i class="fas fa-search"></i>
                    <h3>No Projects Found</h3>
                    <p>Try selecting a different filter or check back later for new projects.</p>
                </div>
            `;
            
            const projectsGrid = document.querySelector('.projects-grid');
            if (projectsGrid) {
                projectsGrid.parentNode.insertBefore(message, projectsGrid.nextSibling);
                
                // Add CSS for message
                if (!document.querySelector('#noProjectsStyle')) {
                    const style = document.createElement('style');
                    style.id = 'noProjectsStyle';
                    style.textContent = `
                        .no-projects-message {
                            text-align: center;
                            padding: 3rem;
                            background: var(--light);
                            border-radius: 12px;
                            margin: 2rem auto;
                            max-width: 600px;
                            border: 2px dashed var(--gray-light);
                        }
                        .no-projects-content i {
                            font-size: 3rem;
                            color: var(--primary);
                            margin-bottom: 1rem;
                        }
                        .no-projects-content h3 {
                            color: var(--secondary);
                            margin-bottom: 0.5rem;
                        }
                        .no-projects-content p {
                            color: var(--gray);
                        }
                    `;
                    document.head.appendChild(style);
                }
            }
        } else if (!show && message) {
            message.remove();
        }
    }
    
    // ===== ENHANCED STICKY HEADER =====
    function initStickyHeader() {
        const header = document.querySelector('header');
        if (!header) return;
        
        let lastScrollTop = 0;
        let isScrolling;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Clear our timeout throughout the scroll
            window.clearTimeout(isScrolling);
            
            // Set a timeout to run after scrolling ends
            isScrolling = setTimeout(function() {
                header.classList.remove('scrolling');
            }, 66);
            
            header.classList.add('scrolling');
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
                
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    // Scrolling down
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.classList.remove('scrolled');
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // ===== ENHANCED SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        if (fadeElements.length === 0) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Add staggered animation for cards in grid
                    if (entry.target.closest('.values-grid') || 
                        entry.target.closest('.services-preview-grid') ||
                        entry.target.closest('.projects-preview-grid')) {
                        const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                        entry.target.style.animationDelay = (index * 0.1) + 's';
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // ===== ENHANCED FORM VALIDATION =====
    function initFormValidation() {
        if (!contactForm) return;
        
        // Add loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm()) {
                // Show loading state
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual AJAX call)
                setTimeout(() => {
                    showFormMessage('success', 'Thank you! Your message has been sent. We will contact you within 24 hours.');
                    contactForm.reset();
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
    
    function validateForm() {
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        let isValid = true;
        const value = field.value.trim();
        
        // Clear previous error
        clearFieldError(field);
        
        // Check required fields
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    function clearFieldError(field) {
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
    
    function showFormMessage(type, message) {
        // Remove existing messages
        const existingMessages = contactForm.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    // ===== ENHANCED IMAGE LAZY LOADING =====
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Load image
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        
                        // Add loaded class for animation
                        img.addEventListener('load', function() {
                            this.classList.add('loaded');
                        });
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
    
    // ===== ENHANCED STATS COUNTER =====
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.about-stat-number');
        if (statNumbers.length === 0) return;
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const targetValue = statNumber.textContent.trim();
                    
                    // Check what type of value we have
                    if (targetValue.includes('+')) {
                        const numericValue = parseInt(targetValue);
                        animateNumber(statNumber, 0, numericValue, 2000, '+');
                    } else if (targetValue.includes('%')) {
                        const numericValue = parseInt(targetValue);
                        animateNumber(statNumber, 0, numericValue, 2000, '%');
                    } else {
                        const numericValue = parseInt(targetValue);
                        animateNumber(statNumber, 0, numericValue, 2000);
                    }
                    
                    observer.unobserve(statNumber);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    function animateNumber(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = suffix === '+' ? `${currentValue}+` : 
                                suffix === '%' ? `${currentValue}%` : 
                                currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    }
    
    // ===== ENHANCED HOVER EFFECTS FOR DESKTOP =====
    function initHoverEffects() {
        if (window.innerWidth > 768) {
            const dropdowns = document.querySelectorAll('.has-dropdown');
            
            dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('.nav-link');
                const dropdownMenu = dropdown.querySelector('.dropdown');
                const arrow = link.querySelector('.dropdown-arrow');
                
                dropdown.addEventListener('mouseenter', function() {
                    dropdownMenu.style.opacity = '1';
                    dropdownMenu.style.visibility = 'visible';
                    dropdownMenu.style.transform = 'translateY(0)';
                    if (arrow) arrow.style.transform = 'rotate(180deg)';
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(10px)';
                    if (arrow) arrow.style.transform = 'rotate(0deg)';
                });
            });
        }
    }
    
    // ===== INITIALIZE EVERYTHING =====
    function initAll() {
        initMobileNavigation();
        initTypewriter();
        initBackToTop();
        initSmoothScroll();
        initProjectsFilter();
        initStickyHeader();
        initScrollAnimations();
        initFormValidation();
        initLazyLoading();
        initStatsCounter();
        initHoverEffects();
        
        // Add loaded class to body for CSS transitions
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
        
        // Keyboard shortcuts
        initKeyboardShortcuts();
    }
    
    // ===== KEYBOARD SHORTCUTS =====
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Escape key closes mobile menu
            if (e.key === 'Escape' && mainNav && mainNav.classList.contains('active')) {
                closeMobileMenu();
            }
            
            // Space/Enter key for dropdown toggle on mobile
            if (e.key === 'Enter' || e.key === ' ') {
                const focused = document.activeElement;
                if (focused && focused.classList.contains('has-dropdown') && window.innerWidth <= 768) {
                    e.preventDefault();
                    focused.click();
                }
            }
        });
    }
    
    // ===== WINDOW LOAD EVENT =====
    window.addEventListener('load', function() {
        // Add fade-in effect for all content
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // Initialize any additional features after page load
        if (window.innerWidth <= 768) {
            // Add touch event for better mobile interaction
            document.querySelectorAll('.dropdown a').forEach(link => {
                link.addEventListener('touchend', function() {
                    closeMobileMenu();
                });
            });
        }
    });
    
    // Start the application
    initAll();
    
    // ===== GLOBAL FUNCTIONS =====
    // Make some functions available globally if needed
    window.closeMobileMenu = closeMobileMenu;
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    // Debounce function for resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            initHoverEffects();
        }, 250);
    });
    
    // ===== CUSTOM CSS ADDITIONS =====
    // Add dynamic CSS for enhanced features
    if (!document.querySelector('#dynamicStyles')) {
        const style = document.createElement('style');
        style.id = 'dynamicStyles';
        style.textContent = `
            /* Enhanced animations */
            .back-to-top.pulse {
                animation: pulse 1s ease-in-out;
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            /* Form messages */
            .form-message {
                padding: 1rem;
                margin-bottom: 1.5rem;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                animation: slideDown 0.3s ease;
            }
            
            .form-message.success {
                background: #c6f6d5;
                color: #22543d;
                border: 1px solid #9ae6b4;
            }
            
            .form-message.error {
                background: #fed7d7;
                color: #742a2a;
                border: 1px solid #fc8181;
            }
            
            .form-message i {
                font-size: 1.25rem;
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Header scroll effects */
            header.scrolled {
                background: rgba(255, 255, 255, 0.98) !important;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
            }
            
            header.scrolling {
                transition: transform 0.3s ease !important;
            }
            
            /* Enhanced error states */
            .form-control.error {
                border-color: var(--accent) !important;
                background: #fff5f5;
            }
            
            .error-message {
                color: var(--accent);
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: none;
            }
            
            .error-message.show {
                display: block;
                animation: fadeIn 0.3s ease;
            }
            
            /* Body fade in */
            body {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            body.loaded {
                opacity: 1;
            }
            
            /* Image loading */
            img:not(.loaded) {
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            img.loaded {
                opacity: 1;
            }
            
            /* Mobile dropdown enhancements */
            @media (max-width: 768px) {
                .dropdown {
                    transition: all 0.3s ease !important;
                }
                
                .has-dropdown.active .dropdown-arrow {
                    transform: rotate(180deg) !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
});
