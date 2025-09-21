// Server-Compatible Mobile Menu Handler
// Bu script sunucu ortamında hamburger menü sorunlarını çözer

(function() {
    'use strict';
    
    console.log('Server-compatible mobile menu handler loading...');
    
    // Utility functions
    function addClass(element, className) {
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += ' ' + className;
        }
    }
    
    function removeClass(element, className) {
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
    
    function hasClass(element, className) {
        if (element.classList) {
            return element.classList.contains(className);
        } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    }
    
    // Mobile menu functionality
    function initMobileMenu() {
        console.log('Initializing server-compatible mobile menu...');
        
        var body = document.body || document.getElementsByTagName('body')[0];
        var mobileToggler = document.querySelector('.mobile-nav-toggler');
        var mobileMenu = document.querySelector('.tgmobile__menu');
        var closeBtn = document.querySelector('.tgmobile__menu .close-btn');
        var backdrop = document.querySelector('.tgmobile__menu-backdrop');
        
        // Check if elements exist
        if (!mobileToggler) {
            console.error('Mobile toggler not found');
            return;
        }
        
        if (!mobileMenu) {
            console.error('Mobile menu not found');
            return;
        }
        
        console.log('Mobile menu elements found successfully');
        
        // Copy menu content
        var mainMenu = document.querySelector('.tgmenu__wrap .tgmenu__main-menu');
        var mobileMenuOuter = document.querySelector('.tgmobile__menu-outer');
        
        if (mainMenu && mobileMenuOuter && !mobileMenuOuter.innerHTML.trim()) {
            mobileMenuOuter.innerHTML = mainMenu.innerHTML;
            console.log('Menu content copied to mobile menu');
        }
        
        // Toggle menu function
        function toggleMenu(show) {
            if (show) {
                addClass(body, 'mobile-menu-visible');
                console.log('Mobile menu opened');
            } else {
                removeClass(body, 'mobile-menu-visible');
                console.log('Mobile menu closed');
            }
        }
        
        // Event handlers
        function handleToggleClick(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu toggle clicked');
            
            var isVisible = hasClass(body, 'mobile-menu-visible');
            toggleMenu(!isVisible);
            return false;
        }
        
        function handleCloseClick(e) {
            e.preventDefault();
            console.log('Mobile menu close clicked');
            toggleMenu(false);
        }
        
        // Bind events - multiple methods for compatibility
        
        // Method 1: Standard event listeners
        mobileToggler.addEventListener('click', handleToggleClick);
        mobileToggler.addEventListener('touchend', function(e) {
            e.preventDefault();
            handleToggleClick(e);
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', handleCloseClick);
            closeBtn.addEventListener('touchend', handleCloseClick);
        }
        
        if (backdrop) {
            backdrop.addEventListener('click', handleCloseClick);
            backdrop.addEventListener('touchend', handleCloseClick);
        }
        
        // Method 2: onclick as fallback
        mobileToggler.onclick = handleToggleClick;
        
        if (closeBtn) {
            closeBtn.onclick = handleCloseClick;
        }
        
        if (backdrop) {
            backdrop.onclick = handleCloseClick;
        }
        
        // Method 3: Add inline event handlers as ultimate fallback
        mobileToggler.setAttribute('onclick', 'document.body.classList.toggle("mobile-menu-visible"); return false;');
        
        console.log('Mobile menu event handlers bound successfully');
        
        // CSS fallback styles
        var style = document.createElement('style');
        style.textContent = `
            .mobile-nav-toggler {
                cursor: pointer !important;
                user-select: none !important;
                -webkit-tap-highlight-color: transparent !important;
            }
            .mobile-nav-toggler:hover {
                opacity: 0.8 !important;
            }
            .mobile-menu-visible .tgmobile__menu {
                transform: translateX(0) !important;
                visibility: visible !important;
            }
            .mobile-menu-visible .tgmobile__menu-backdrop {
                opacity: 1 !important;
                visibility: visible !important;
            }
            .mobile-menu-visible {
                overflow: hidden !important;
            }
        `;
        document.head.appendChild(style);
        
        console.log('Mobile menu CSS fallback styles added');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
    
    // Fallback initialization
    window.addEventListener('load', function() {
        setTimeout(initMobileMenu, 500);
    });
    
    // Export for manual initialization
    window.initServerMobileMenu = initMobileMenu;
    
    console.log('Server-compatible mobile menu handler loaded');
    
})();