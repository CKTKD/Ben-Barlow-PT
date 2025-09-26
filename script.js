// Global variables
let slideIndex = 1;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Initialize slideshow
    showSlides(slideIndex);
    
    // Form submission removed - using direct Instagram DM links instead
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .credential-item, .testimonial-card, .gallery-item, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Add theme toggle event listener
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    }
    
    // Handle all Instagram DM buttons
    const dmButtons = document.querySelectorAll('a[href*="instagram.com/benxbarlow"]');
    dmButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            let message = '';
            
            // Customize message based on button context
            if (buttonText.includes('DM for Pricing')) {
                message = 'Hi Ben! I\'m interested in your coaching services. Can you tell me more about pricing?';
            } else if (buttonText.includes('DM "START"')) {
                message = 'START - I\'m ready to begin my transformation journey!';
            } else if (buttonText.includes('Follow')) {
                // Just follow, no DM
                return;
            } else {
                message = 'Hi Ben! I\'d like to learn more about your coaching.';
            }
            
            // Update the href to include the message
            this.href = createInstagramDM(message);
        });
    });
    
    // Add keyboard navigation support
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.body.className = savedTheme;
    } else if (prefersDark) {
        document.body.className = 'dark';
    } else {
        document.body.className = 'light';
    }
    
    updateThemeIcon();
}

function toggleTheme() {
    const currentTheme = document.body.className;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    const isDark = document.body.className === 'dark';
    
    if (isDark) {
        icon.className = 'fas fa-sun';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
}

// Slideshow functionality
function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

function changeSlide(n) {
    slideIndex += n;
    showSlides(slideIndex);
}

function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);
}

// Auto-advance slideshow
setInterval(function() {
    slideIndex++;
    showSlides(slideIndex);
}, 5000);

// Accessibility Features
function initializeAccessibility() {
    // Load saved accessibility settings
    loadAccessibilitySettings();
    
    // Accessibility panel toggle
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const accessibilityPanel = document.getElementById('accessibilityPanel');
    const closeAccessibility = document.getElementById('closeAccessibility');
    
    accessibilityToggle.addEventListener('click', function() {
        accessibilityPanel.classList.toggle('open');
    });
    
    closeAccessibility.addEventListener('click', function() {
        accessibilityPanel.classList.remove('open');
    });
    
    // Font size controls
    const fontButtons = document.querySelectorAll('.font-btn');
    fontButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            fontButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const size = this.dataset.size;
            document.body.className = document.body.className.replace(/font-\w+/g, '');
            if (size !== 'medium') {
                document.body.classList.add(`font-${size}`);
            }
            
            localStorage.setItem('fontSize', size);
        });
    });
    
    // High contrast toggle
    const contrastToggle = document.getElementById('contrastToggle');
    contrastToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        document.body.classList.toggle('high-contrast');
        localStorage.setItem('highContrast', this.classList.contains('active'));
    });
    
    // Focus indicators toggle
    const focusToggle = document.getElementById('focusToggle');
    focusToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        document.body.classList.toggle('enhanced-focus');
        localStorage.setItem('enhancedFocus', this.classList.contains('active'));
    });
    
    // Reduced motion toggle
    const motionToggle = document.getElementById('motionToggle');
    motionToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        document.body.classList.toggle('reduced-motion');
        localStorage.setItem('reducedMotion', this.classList.contains('active'));
    });
    
    // Theme controls
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.dataset.theme;
            if (theme === 'auto') {
                // Auto theme based on system preference
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
                localStorage.setItem('theme', 'auto');
            } else {
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
            }
            updateThemeIcon(theme);
        });
    });
    
    // Reset accessibility
    const resetButton = document.getElementById('resetAccessibility');
    resetButton.addEventListener('click', function() {
        resetAccessibilitySettings();
    });
    
    // Close panel when clicking outside
    const accessibilityHub = document.getElementById('accessibilityHub');
    document.addEventListener('click', function(e) {
        if (!accessibilityHub.contains(e.target)) {
            accessibilityPanel.classList.remove('open');
        }
    });
}

function loadAccessibilitySettings() {
    // Font size
    const fontSize = localStorage.getItem('fontSize') || 'medium';
    const fontButtons = document.querySelectorAll('.font-btn');
    fontButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.size === fontSize) {
            btn.classList.add('active');
        }
    });
    if (fontSize !== 'medium') {
        document.body.classList.add(`font-${fontSize}`);
    }
    
    // High contrast
    const highContrast = localStorage.getItem('highContrast') === 'true';
    const contrastToggle = document.getElementById('contrastToggle');
    if (highContrast) {
        contrastToggle.classList.add('active');
        document.body.classList.add('high-contrast');
    }
    
    // Enhanced focus
    const enhancedFocus = localStorage.getItem('enhancedFocus') === 'true';
    const focusToggle = document.getElementById('focusToggle');
    if (enhancedFocus) {
        focusToggle.classList.add('active');
        document.body.classList.add('enhanced-focus');
    }
    
    // Reduced motion
    const reducedMotion = localStorage.getItem('reducedMotion') === 'true';
    const motionToggle = document.getElementById('motionToggle');
    if (reducedMotion) {
        motionToggle.classList.add('active');
        document.body.classList.add('reduced-motion');
    }
}

function resetAccessibilitySettings() {
    // Reset all settings
    localStorage.removeItem('fontSize');
    localStorage.removeItem('highContrast');
    localStorage.removeItem('enhancedFocus');
    localStorage.removeItem('reducedMotion');
    localStorage.removeItem('theme');
    
    // Reset UI
    document.body.className = '';
    document.documentElement.setAttribute('data-theme', 'light');
    
    // Reset buttons
    document.querySelectorAll('.font-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.font-btn[data-size="medium"]').classList.add('active');
    
    document.getElementById('contrastToggle').classList.remove('active');
    document.getElementById('focusToggle').classList.remove('active');
    document.getElementById('motionToggle').classList.remove('active');
    
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.theme-btn[data-theme="light"]').classList.add('active');
    
    // Show notification
    showNotification('Accessibility settings reset to defaults', 'info');
}

// Form submission handler removed - using direct Instagram DM links instead

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 1rem;
        box-shadow: var(--shadow-heavy);
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-message {
        color: var(--text-primary);
        font-size: 0.9rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: all 0.3s ease;
    }
    
    .notification-close:hover {
        background: var(--bg-secondary);
        color: var(--text-primary);
    }
    
    .notification-success {
        border-left: 4px solid #10b981;
    }
    
    .notification-error {
        border-left: 4px solid #ef4444;
    }
    
    .notification-info {
        border-left: 4px solid var(--accent-color);
    }
`;
document.head.appendChild(notificationStyles);

// Utility functions
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

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopButton.className = 'scroll-to-top';
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    background: var(--accent-color);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-medium);
    transition: all 0.3s ease;
`;

scrollToTopButton.addEventListener('click', scrollToTop);
document.body.appendChild(scrollToTopButton);

// Show/hide scroll to top button
window.addEventListener('scroll', debounce(function() {
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.display = 'flex';
    } else {
        scrollToTopButton.style.display = 'none';
    }
}, 100));

// Add hover effect to scroll to top button
scrollToTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = 'var(--shadow-heavy)';
});

scrollToTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = 'var(--shadow-medium)';
});

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
    }
}, true);

// Console welcome message
console.log(`
%cBB COACHING - Ben Barlow
%cPersonal Trainer & Online Coach
%cWebsite by Cursor AI Assistant

Ready to transform your body? DM "START" on Instagram!
`, 
'color: #3b82f6; font-size: 20px; font-weight: bold;',
'color: #64748b; font-size: 14px;',
'color: #94a3b8; font-size: 12px;'
);

// Enhanced Instagram DM functionality
function createInstagramDM(message) {
    const instagramUrl = 'https://www.instagram.com/benxbarlow';
    const encodedMessage = encodeURIComponent(message);
    return `${instagramUrl}?text=${encodedMessage}`;
}

// Add click handlers for Instagram DM buttons
document.addEventListener('DOMContentLoaded', function() {
    // Handle all Instagram DM buttons
    const dmButtons = document.querySelectorAll('a[href*="instagram.com/benxbarlow"]');
    
    dmButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            let message = '';
            
            // Customize message based on button context
            if (buttonText.includes('DM for Pricing')) {
                message = 'Hi Ben! I\'m interested in your coaching services. Can you tell me more about pricing?';
            } else if (buttonText.includes('DM "START"')) {
                message = 'START - I\'m ready to begin my transformation journey!';
            } else if (buttonText.includes('Follow')) {
                // Just follow, no DM
                return;
            } else {
                message = 'Hi Ben! I\'d like to learn more about your coaching.';
            }
            
            // Update the href to include the message
            this.href = createInstagramDM(message);
        });
    });
    
});
