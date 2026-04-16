// Language Translation System
let currentLang = 'en';

const translations = {
    en: 'EN',
    es: 'ES'
};

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update language button
    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = translations[lang];
    }
    
    // Update all elements with translation attributes
    const translatableElements = document.querySelectorAll('[data-en][data-es]');
    translatableElements.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-en-placeholder][data-es-placeholder]');
    placeholderElements.forEach(element => {
        const placeholder = element.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
    
    // Update select options
    const selectOptions = document.querySelectorAll('option[data-en][data-es]');
    selectOptions.forEach(option => {
        const translation = option.getAttribute(`data-${lang}`);
        if (translation) {
            option.textContent = translation;
        }
    });
    
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Language toggle button
const langBtn = document.getElementById('langBtn');
if (langBtn) {
    langBtn.addEventListener('click', function() {
        const newLang = currentLang === 'en' ? 'es' : 'en';
        switchLanguage(newLang);
    });
}

// Load saved language preference
window.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    if (savedLang !== 'en') {
        switchLanguage(savedLang);
    }
});

// Loading Screen
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !service || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(function() {
        // Create email content
        const emailContent = `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Service: ${service}
            Message: ${message}
        `;
        
        // Create mailto link
        const subject = encodeURIComponent('Insurance Quote Request - ' + service);
        const body = encodeURIComponent(emailContent);
        const mailtoLink = `mailto:mrodriguez@sebandainsurance.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        showNotification('Thank you for your inquiry! Your email client has been opened to send your message.', 'success');
    }, 1000);
});

// Notification System
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(function() {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(function() {
        notification.style.transform = 'translateX(100%)';
        setTimeout(function() {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .feature, .about-text, .contact-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroLeft = document.querySelector('.hero-left');
    const heroRight = document.querySelector('.hero-right');
    const waves = document.querySelectorAll('.wave');
    
    if (heroLeft) {
        heroLeft.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (heroRight) {
        heroRight.style.transform = `translateY(${scrolled * 0.6}px)`;
    }
    
    waves.forEach((wave, index) => {
        const speed = 0.5 + (index * 0.1);
        wave.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Floating Cards Animation
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    // Add random animation delay
    card.style.animationDelay = `${index * 2}s`;
    
    // Add hover effect with mouse movement
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Service Cards Hover Effect
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Counter Animation for Statistics (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1600);
    }

    // Animate hero stats on load
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat, index) => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/\d/g, '');
        
        setTimeout(() => {
            animateCounter(stat, number, 2000);
            setTimeout(() => {
                stat.textContent = text;
            }, 2000);
        }, 2000 + (index * 200));
    });

    // Animate hero badge
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        heroBadge.style.opacity = '0';
        heroBadge.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            heroBadge.style.transition = 'all 0.6s ease';
            heroBadge.style.opacity = '1';
            heroBadge.style.transform = 'translateY(0)';
        }, 1000);
    }

    // Animate hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'scale(0.9)';
        setTimeout(() => {
            heroImage.style.transition = 'all 0.8s ease';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'scale(1)';
        }, 1200);
    }

    // Animate floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 1400 + (index * 200));
    });
});

// Add smooth reveal animation for sections
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-revealed');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Add CSS for section reveal
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    section.section-revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Phone number click tracking
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('Phone number clicked:', this.textContent);
    });
});

// Email click tracking
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('Email clicked:', this.textContent);
    });
});

// Social media link tracking
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('Social media link clicked:', this.querySelector('span').textContent);
    });
});

// Form field focus effects
const formInputs = document.querySelectorAll('input, select, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add CSS for form focus effects
const formStyle = document.createElement('style');
formStyle.textContent = `
    .form-group.focused input,
    .form-group.focused select,
    .form-group.focused textarea {
        border-color: #059669;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
`;
document.head.appendChild(formStyle);

// Lazy loading for images (if any images are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Error handling for JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Service worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}
