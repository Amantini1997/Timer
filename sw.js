var CACHE_NAME = 'timer-cache';
var urlsToCache = [
  '',
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
  // Perform install steps
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

self.addEventListener('fetch', event => {
  console.log('[Service Worker] Install');
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});