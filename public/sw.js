// public/sw.js

self.addEventListener('install', (event) => {
  // Activate the new service worker as soon as it's installed.
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  // Take control of all clients as soon as the service worker is activated.
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // For all requests, fetch from the network and add the necessary headers
  // for cross-origin isolation. This is a security requirement for using
  // SharedArrayBuffer, which WebContainers rely on.
  event.respondWith(
    (async () => {
      // Fetch the original request.
      const response = await fetch(event.request);

      // Create a new response with the required headers.
      // We can't modify the original response, so we clone it.
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');
      newHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp');

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    })()
  );
});
