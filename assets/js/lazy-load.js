// Lazy Loading Implementation
(function() {
    'use strict';
    
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('lazy-loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('lazy-loaded');
        });
    }
})();

// Optimize image loading with proper srcset
function optimizeImages() {
    const images = document.querySelectorAll('img:not([data-optimized])');
    images.forEach(img => {
        // Add loading="lazy" for native lazy loading support
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Mark as optimized
        img.setAttribute('data-optimized', 'true');
    });
}

// Run on DOM content loaded
document.addEventListener('DOMContentLoaded', optimizeImages);