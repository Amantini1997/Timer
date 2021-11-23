// const APP_IS_DEPLOYED_ON_GITHUB_PAGES = false;

const CACHE_NAME = 'timer-cache';
const ASSETS_TO_CACHE = [
  './',
  './index.html',

  './styles/index.css',

  './scripts/index.js',
  './scripts/screenLocker.js',
  './scripts/sounds.js',
  './scripts/pwa.js',
  './scripts/timerWorker.js',

  './sounds/start.ogg',
  './sounds/stop.ogg',
  './sounds/end.ogg',

  './images/192x192.png',
  './images/512x512.png',

  './favicon.ico',
  './manifest.webmanifest',

  'https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.1.0/rxjs.umd.js'
]

// .map(path => (APP_IS_DEPLOYED_ON_GITHUB_PAGES ? "./" : "/") + path);

// Add RxJs from CDN
// ASSETS_TO_CACHE.push('https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.1.0/rxjs.umd.js');

self.addEventListener('install', event => {
  console.log('Service worker installed, preparing to cache assets');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching shell assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheRes => cacheRes || fetch(event.request))
  );
});