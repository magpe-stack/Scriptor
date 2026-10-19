const CACHE_NAME = 'scriptor-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './theory-pt.js',
  './theory-storygenius.js',
  './manifest.json',
  './logo.svg',
  './icon-192.png',
  './icon-512.png'
];

// Instalação do Service Worker e Caching dos Recursos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Ativação e Limpeza de Caches Antigos
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

// Estratégia de Fetch: Cache First, depois Network
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
