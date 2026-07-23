// Registers the Physiome service worker for PWA / offline support.
// Kept out of the render path and guarded so a failed registration (or an
// unsupported browser / dev server) never breaks the app.
export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  if (!import.meta.env.PROD) return; // avoid caching during local dev

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        // When a new SW is waiting, activate it on next load automatically.
        registration.addEventListener('updatefound', () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.addEventListener('statechange', () => {
            if (installing.state === 'installed' && navigator.serviceWorker.controller) {
              registration.waiting?.postMessage('SKIP_WAITING');
            }
          });
        });
      })
      .catch((err) => console.warn('Service worker registration failed:', err));
  });
}
