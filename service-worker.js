// Self Learners · CSS 2027 — service worker
// Bump CACHE when you change any file so users get the new version.
const CACHE = 'sl-cache-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './page-login.html',
  './page-edu.html',
  './page-schedule.html',
  './page-syllabus.html',
  './page-papers.html',
  './page-eligibility.html'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS).catch(() => {}))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;

  // Never intercept non-GET
  if (req.method !== 'GET') return;

  // Never cache Google Sheets / cross-origin data requests
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) {
    return; // let the network handle it directly
  }

  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).catch(() => {
        // Only fall back to index.html for top-level document navigations
        if (req.destination === 'document') {
          return caches.match('./index.html');
        }
        return new Response('', { status: 503, statusText: 'Offline' });
      });
    })
  );
});