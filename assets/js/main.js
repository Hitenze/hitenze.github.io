/**
 * Main JavaScript File - Tianshi Xu's Academic Website
 */

// =============== DOM Ready ===============
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    initMobileMenu();
    initSidebarNavScroll();
    initSmoothScroll();
    initActiveNavigation();
    initScrollToTop();
    initAnimations();
});

// =============== Dark Mode Toggle ===============
function initDarkMode() {
    // Create toggle button and add to nav tools if available
    const nav = document.querySelector('nav');
    if (!nav) return;
    const navTools = nav.querySelector('.nav-tools');

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
    toggleBtn.innerHTML = '<span class="icon-sun">☀️</span><span class="icon-moon">🌙</span>';
    (navTools || nav).appendChild(toggleBtn);

    // Get saved preference or use system preference
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        // User has explicitly set a preference
        document.documentElement.classList.add(savedTheme);
    }
    // If no saved preference, CSS will use system preference via @media query

    // Toggle handler
    toggleBtn.addEventListener('click', function() {
        const html = document.documentElement;
        const isDark = html.classList.contains('dark-mode') ||
                      (!html.classList.contains('light-mode') &&
                       window.matchMedia('(prefers-color-scheme: dark)').matches);

        // Remove both classes first
        html.classList.remove('light-mode', 'dark-mode');

        if (isDark) {
            // Switch to light
            html.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            // Switch to dark
            html.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only update if user hasn't set a preference
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            // No need to do anything - CSS handles system preference automatically
            // But we can update aria-label for accessibility
            updateToggleAriaLabel(toggleBtn, e.matches);
        }
    });

    // Set initial aria-label
    const isDark = document.documentElement.classList.contains('dark-mode') ||
                  (!document.documentElement.classList.contains('light-mode') &&
                   window.matchMedia('(prefers-color-scheme: dark)').matches);
    updateToggleAriaLabel(toggleBtn, isDark);
}

function updateToggleAriaLabel(btn, isDark) {
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

// =============== Mobile Menu ===============
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navGroups = document.querySelector('.nav-groups');
    
    if (toggle && navGroups) {
        // Toggle menu on button click
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navGroups.classList.toggle('active');
            
            // Update aria-expanded attribute for accessibility
            const isExpanded = navGroups.classList.contains('active');
            toggle.setAttribute('aria-expanded', isExpanded);
            
            // Change toggle icon
            toggle.innerHTML = isExpanded ? '✕' : '☰';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navGroups.contains(e.target) && !toggle.contains(e.target)) {
                navGroups.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.innerHTML = '☰';
            }
        });
        
        // Close menu when clicking on a link
        const links = navGroups.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navGroups.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.innerHTML = '☰';
            });
        });
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 1099) {
                    navGroups.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.innerHTML = '☰';
                }
            }, 250);
        });
    }
}

// =============== Sidebar Navigation Scroll UX ===============
function initSidebarNavScroll() {
    const navGroups = document.querySelector('.nav-groups');
    if (!navGroups) return;

    const updateScrollState = function() {
        const isDesktop = window.innerWidth >= 1100;
        const hasOverflow = navGroups.scrollHeight > navGroups.clientHeight + 2;
        const atEnd = navGroups.scrollTop + navGroups.clientHeight >= navGroups.scrollHeight - 2;

        navGroups.classList.toggle('is-scrollable', isDesktop && hasOverflow);
        navGroups.classList.toggle('is-scroll-end', !hasOverflow || atEnd);

        if (isDesktop && hasOverflow) {
            navGroups.setAttribute('tabindex', '0');
            navGroups.setAttribute('aria-label', 'Sidebar navigation. Scroll to reveal more links.');
        } else {
            navGroups.removeAttribute('tabindex');
            navGroups.removeAttribute('aria-label');
        }
    };

    navGroups.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', function() {
        window.requestAnimationFrame(updateScrollState);
    });
    window.addEventListener('load', updateScrollState);

    if (window.ResizeObserver) {
        const observer = new ResizeObserver(updateScrollState);
        observer.observe(navGroups);
    }

    navGroups.addEventListener('keydown', function(e) {
        if (!navGroups.classList.contains('is-scrollable')) return;

        let delta = 0;
        if (e.key === 'ArrowDown') delta = 64;
        if (e.key === 'ArrowUp') delta = -64;
        if (e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) delta = navGroups.clientHeight * 0.75;
        if (e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) delta = -navGroups.clientHeight * 0.75;
        if (e.key === 'Home') delta = -navGroups.scrollHeight;
        if (e.key === 'End') delta = navGroups.scrollHeight;

        if (delta !== 0) {
            e.preventDefault();
            navGroups.scrollBy({ top: delta, behavior: 'smooth' });
        }
    });

    window.requestAnimationFrame(updateScrollState);
    window.setTimeout(updateScrollState, 180);
}

// =============== Smooth Scroll ===============
function initSmoothScroll() {
    // Only for internal links with hash
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Calculate offset for top header only (sidebar uses no vertical offset)
                const header = document.querySelector('header');
                const headerOffset = window.innerWidth >= 1100 ? 0 : (header ? header.offsetHeight : 0);
                const targetPosition = target.offsetTop - headerOffset - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

// =============== Active Navigation ===============
function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove any existing active class
        link.classList.remove('active');
        
        // Add active class to current page
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === './')) {
            link.classList.add('active');
        }
    });
}

// =============== Scroll to Top ===============
function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '▲';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: var(--accent-color);
        color: white;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: var(--shadow-md);
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =============== Animations ===============
function initAnimations() {
    // Add fade-in animation to elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections and cards
    const elementsToAnimate = document.querySelectorAll('.section, .card, .publication, .news-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

// =============== Utility Functions ===============

/**
 * Format dates consistently
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // Show confirmation
    showNotification('Copied to clipboard!');
}

/**
 * Show notification message
 */
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary-color);
        color: white;
        padding: 12px 24px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

// =============== Add CSS for animations ===============
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
        }
    }
    
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .scroll-to-top:hover {
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);

// =============== Export functions for use in other scripts ===============
window.siteUtils = {
    formatDate,
    copyToClipboard,
    showNotification
};
