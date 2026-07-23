/* Physiome service worker — app-shell offline support.
 *
 * Strategy:
 *  - Navigations: network-first, fall back to the cached app shell when offline
 *    (so the SPA still boots and can show its own offline states).
 *  - Same-origin static assets (hashed JS/CSS/images/fonts): stale-while-revalidate.
 *  - Cross-origin requests (the Supabase API + auth): pass straight through and
 *    NEVER cache — patient data and tokens must not be persisted here.
 *
 * Bump CACHE_VERSION to force clients onto a fresh cache after a deploy.
 */
const CACHE_VERSION = 'physiome-v2';
const APP_SHELL = '/index.html';
const PRECACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/favicon-48.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/maskable-512.png',
  '/icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  // Precache resiliently: a single missing/failed asset must NOT abort install
  // (a failed cache.addAll would leave the SW uninstalled and block PWA install).
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => Promise.allSettled(PRECACHE.map((url) => cache.add(url))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Cross-origin (Supabase API/auth/storage, any CDN): never touch the cache.
  if (url.origin !== self.location.origin) return;

  // SPA navigations: network-first with an app-shell fallback for offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(APP_SHELL, copy)).catch(() => {});
          return response;
        })
        .catch(() => caches.match(APP_SHELL).then((cached) => cached || caches.match('/'))),
    );
    return;
  }

  // Same-origin static assets: stale-while-revalidate.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy)).catch(() => {});
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});
