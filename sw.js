const CACHE_NAME = 'scriptor-v2';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './theory-pt.js',
  './theory-storygenius.js',
  './theory-steps.js',
  './theory-example.js',
  './theory-tips.js',
  './manifest.json',
  './logo.svg',
  './storygenius-capa.svg',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request);
    })
  );
});
