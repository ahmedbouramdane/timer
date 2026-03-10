const CACHE_NAME = 'timer-app-v2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './css/style.css',
    './css/bootstrap.min.css',
    './css/bootstrap-bootswatch.min.css',
    './css/all.min.css',
    './js/main.js',
    './js/settings.js',
    './js/i18n.js',
    './js/bootstrap.bundle.min.js',
    './js/all.min.js',
    './imgs/icon.png',
    './imgs/apee.png',
    './imgs/lydex.png',
    './audio/alarm1.mp3',
    './audio/alarm2.mp3',
    './audio/alarm3.mp3',
    './audio/alarm4.mp3',
    './audio/alarm5.mp3',
    './audio/alarm6.mp3',
    './audio/alarm7.mp3'
];

// Install Event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('SW: Pre-caching all assets');
            return cache.addAll(ASSETS);
        })
        .then(() => self.skipWaiting())
    );
});

// Activate Event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache !== CACHE_NAME && cache !== 'timer-fonts-cache')
                .map(cache => {
                    console.log('SW: Clearing old cache', cache);
                    return caches.delete(cache);
                })
            );
        })
        .then(() => self.clients.claim())
    );
});

// Fetch Event
self.addEventListener('fetch', event => {
    const url = event.request.url;

    // Handle Google Fonts (Dynamic Caching / Cache First)
    if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
        event.respondWith(
            caches.open('timer-fonts-cache').then(cache => {
                return cache.match(event.request).then(response => {
                    return response || fetch(event.request).then(networkResponse => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    } else {
        // Standard Strategy: Cache with Network Fallback
        event.respondWith(
            caches.match(event.request)
            .then(response => {
                return response || fetch(event.request).catch(() => {
                    // Fail gracefully if both fail
                    return null;
                });
            })
        );
    }
});
