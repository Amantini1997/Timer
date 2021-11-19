var CACHE_NAME = 'timer-cache';
var URLs_TO_CACHE = [
  '',
  'sounds/start.ogg',
  'sounds/stop.ogg',
  'sounds/end.ogg',
  'styles/index.css',
  'scripts/index.js',
  'scripts/screenLocker.js',
  'scripts/sounds.js',
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
  console.log('[Service Worker] Install');
  // Perform install steps
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(URLs_TO_CACHE);
  })());
});

self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetch');
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(URLs_TO_CACHE);
  })());
});