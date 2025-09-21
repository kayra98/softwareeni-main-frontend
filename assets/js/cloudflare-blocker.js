// Cloudflare Beacon Blocker
// Bu script Cloudflare'in otomatik olarak eklediği beacon script'ini engeller

(function() {
    'use strict';
    
    // Cloudflare beacon script'ini engelle
    function blockCloudflareBeacon() {
        // MutationObserver ile DOM değişikliklerini izle
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Cloudflare beacon script'ini tespit et ve kaldır
                        if (node.tagName === 'SCRIPT' && 
                            (node.src && node.src.includes('cloudflareinsights.com'))) {
                            console.log('Cloudflare beacon script blocked:', node.src);
                            node.remove();
                        }
                        
                        // Alt elementlerde de kontrol et
                        const scripts = node.querySelectorAll ? node.querySelectorAll('script[src*="cloudflareinsights.com"]') : [];
                        scripts.forEach(function(script) {
                            console.log('Cloudflare beacon script blocked:', script.src);
                            script.remove();
                        });
                    }
                });
            });
        });
        
        // DOM'u izlemeye başla
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
        
        // Sayfa yüklendiğinde mevcut script'leri kontrol et
        document.addEventListener('DOMContentLoaded', function() {
            const existingScripts = document.querySelectorAll('script[src*="cloudflareinsights.com"]');
            existingScripts.forEach(function(script) {
                console.log('Existing Cloudflare beacon script blocked:', script.src);
                script.remove();
            });
        });
    }
    
    // CSP (Content Security Policy) engelleme
    function blockWithCSP() {
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = "script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none';";
        
        // Head'e CSP meta tag'i ekle
        const head = document.head || document.getElementsByTagName('head')[0];
        if (head) {
            head.appendChild(meta);
        }
    }
    
    // Network request'leri engelle (eğer fetch API varsa)
    function blockNetworkRequests() {
        if (typeof fetch !== 'undefined') {
            const originalFetch = window.fetch;
            window.fetch = function(...args) {
                const url = args[0];
                if (typeof url === 'string' && url.includes('cloudflareinsights.com')) {
                    console.log('Blocked Cloudflare beacon request:', url);
                    return Promise.reject(new Error('Blocked by beacon blocker'));
                }
                return originalFetch.apply(this, args);
            };
        }
        
        // XMLHttpRequest'leri de engelle
        if (typeof XMLHttpRequest !== 'undefined') {
            const originalOpen = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function(method, url, ...args) {
                if (typeof url === 'string' && url.includes('cloudflareinsights.com')) {
                    console.log('Blocked Cloudflare beacon XHR:', url);
                    throw new Error('Blocked by beacon blocker');
                }
                return originalOpen.apply(this, [method, url, ...args]);
            };
        }
    }
    
    // Tüm engellemeleri aktif et
    blockCloudflareBeacon();
    blockWithCSP();
    blockNetworkRequests();
    
    console.log('Cloudflare Beacon Blocker activated');
    
})();