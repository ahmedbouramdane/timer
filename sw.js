const CACHE_NAME = 'timer-app-v1';
const ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './css/bootstrap.min.css',
    './css/all.min.css',
    './js/main.js',
    './js/settings.js',
    './js/bootstrap.bundle.min.js',
    './js/all.min.js',
    './imgs/icon.png',
    './audio/alarm1.mp3',
    './audio/alarm2.mp3',
    './audio/alarm3.mp3',
    './audio/alarm4.mp3',
    './audio/alarm5.mp3',
    './audio/alarm6.mp3',
    './audio/alarm7.mp3'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache !== CACHE_NAME)
                .map(cache => caches.delete(cache))
            );
        })
    );
});
