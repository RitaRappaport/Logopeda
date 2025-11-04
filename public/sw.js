const CACHE = 'df-cache-v1';
const ASSETS = ['/', '/index.html', '/manifest.webmanifest'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  e.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const res = await fetch(request, { mode: 'no-cors' });
      return res;
    } catch (err) {
      return cached || Response.error();
    }
  })());
});