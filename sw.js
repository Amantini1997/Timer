var CACHE_NAME = 'timer-cache';
var urlsToCache = [
  '',
  'styles/index.css',
  'scripts/index.js',
  'images/192x192.png',
  'images/512x512.png'
];

// USE OUTSIDE GITHUB PAGES
// var urlsToCache = [
//   '/',
//   '/styles/index.css',
//   '/scripts/index.js'
// ];


self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
          console.log('Opened cache');
          return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
          // Cache hit - return response
          return response || fetch(event.request);
      }
    )
  );
});