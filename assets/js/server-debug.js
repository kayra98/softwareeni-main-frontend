// Server Compatibility Debug Script
// Bu script sunucuda çalışma sorunlarını tespit eder

console.log('=== SERVER COMPATIBILITY DEBUG ===');

// 1. jQuery kontrolü
if (typeof jQuery !== 'undefined') {
    console.log('✅ jQuery loaded successfully');
    console.log('jQuery version:', jQuery.fn.jquery);
} else {
    console.error('❌ jQuery not loaded');
}

// 2. FontAwesome kontrolü
setTimeout(function() {
    var faTest = document.createElement('i');
    faTest.className = 'fas fa-bars';
    faTest.style.visibility = 'hidden';
    document.body.appendChild(faTest);
    
    var computed = window.getComputedStyle(faTest, ':before');
    if (computed.content && computed.content !== 'none' && computed.content !== '""') {
        console.log('✅ FontAwesome loaded successfully');
    } else {
        console.error('❌ FontAwesome not loaded properly');
    }
    document.body.removeChild(faTest);
}, 1000);

// 3. CSS dosyalarını kontrol et
function checkCSSFile(href) {
    var link = document.querySelector('link[href="' + href + '"]');
    if (link) {
        console.log('✅ CSS found:', href);
    } else {
        console.error('❌ CSS missing:', href);
    }
}

// Kritik CSS dosyalarını kontrol et
checkCSSFile('./assets/css/bootstrap.min.css');
checkCSSFile('./assets/css/fontawesome-all.min.css');
checkCSSFile('./assets/css/main.css');

// 4. Mobil menü elementi kontrolü
$(document).ready(function() {
    if ($('.mobile-nav-toggler').length) {
        console.log('✅ Mobile menu toggle button found');
    } else {
        console.error('❌ Mobile menu toggle button not found');
    }
    
    if ($('.tgmobile__menu').length) {
        console.log('✅ Mobile menu container found');
    } else {
        console.error('❌ Mobile menu container not found');
    }
    
    // 5. Click event test
    $('.mobile-nav-toggler').on('click', function() {
        console.log('✅ Mobile menu click event fired');
        
        if ($('body').hasClass('mobile-menu-visible')) {
            console.log('✅ Mobile menu class added successfully');
        } else {
            console.error('❌ Mobile menu class not added');
        }
    });
});

// 6. Dosya yolu kontrolü
function checkResourcePath() {
    var baseURL = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
    console.log('Base URL:', baseURL);
    console.log('Current page:', window.location.href);
    
    // Test image load
    var testImg = new Image();
    testImg.onload = function() {
        console.log('✅ Assets path working correctly');
    };
    testImg.onerror = function() {
        console.error('❌ Assets path not working - check server configuration');
    };
    testImg.src = './assets/img/logo/logo-white.png';
}

checkResourcePath();

console.log('=== DEBUG COMPLETE ===');