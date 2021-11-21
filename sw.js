const APP_IS_DEPLOYED_ON_GITHUB_PAGES = true;

const CACHE_NAME = 'timer-cache';
const URLS_TO_CACHE = [
  '',
  'index.html',
  'styles/index.css',
  'scripts/index.js',
  'scripts/screenLocker.js',
  'scripts/sounds.js',
  'sounds/start.ogg',
  'sounds/stop.ogg',
  'sounds/end.ogg',
  'images/192x192.png',
  'images/512x512.png'
].map(path => (APP_IS_DEPLOYED_ON_GITHUB_PAGES ? "" : "/") + path);

// Add RxJs CDN
URLS_TO_CACHE.push('https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.1.0/rxjs.umd.js');


self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  event.waitUntil(loadCache());
  // Perform install steps
  // event.waitUntil((async () => {
  //   const cache = await caches.open(CACHE_NAME);
  //   console.log('[Service Worker] Caching all: app shell and content');
  //   await cache.addAll(URLS_TO_CACHE);
  // })());
});

async function loadCache() {
  const cache = await caches.open(CACHE_NAME);
  console.log('[Service Worker] Caching all: app shell and content');
  await cache.addAll(URLS_TO_CACHE);
}

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(eventReq => eventReq || fetch(event.request))
  );
});