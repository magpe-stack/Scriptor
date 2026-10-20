/**
 * Scriptor - Service Worker (PWA)
 * Versão: scriptor-v9
 */

const CACHE_NAME = 'scriptor-v9';

// Ficheiros essenciais mantidos em cache para funcionamento offline
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
  './form-phase1.js',
  './form-phase2.js',
  './form-phase3.js',
  './form-phase4.js',
  './form-phase5.js',
  './editor.js',
  './manifest.json',
  './logo.svg',
  './storygenius-capa.svg',
  './ilustra-scriptor.svg',
  './icon-192.png',
  './icon-512.png'
];

// Instalação do Service Worker e armazenamento dos recursos em cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] A guardar os recursos na cache:', CACHE_NAME);
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Ativação e eliminação de caches antigas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] A remover cache antiga:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceção de pedidos de rede (estratégia Cache First com fallback de rede)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
