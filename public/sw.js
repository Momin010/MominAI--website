// public/sw.js

// Import the Sucrase transpiler for on-the-fly TSX/JSX compilation
self.importScripts('https://cdn.jsdelivr.net/npm/sucrase@3.35.0/dist/index.js');

// A simple in-memory file system for the service worker
const files = new Map();

// A helper function to guess the MIME type from a filename
const getMimeType = (filename) => {
    if (filename.endsWith('.html')) return 'text/html';
    if (filename.endsWith('.css')) return 'text/css';
    if (['.js', '.mjs', '.tsx', '.jsx'].some(ext => filename.endsWith(ext))) {
        return 'application/javascript';
    }
    if (filename.endsWith('.json')) return 'application/json';
    if (filename.endsWith('.png')) return 'image/png';
    if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return 'image/jpeg';
    if (filename.endsWith('.svg')) return 'image/svg+xml';
    return 'text/plain';
};

// Listen for messages from the main thread (the React app)
self.addEventListener('message', (event) => {
    // Expecting an array of file objects: { name: string, content: string }
    if (event.data && event.data.type === 'UPDATE_FILES') {
        files.clear(); // Clear old files
        event.data.files.forEach(file => {
            // The paths in the generated code will be relative, so we add a leading '/'
            const path = file.name.startsWith('/') ? file.name : `/${file.name}`;
            files.set(path, {
                content: file.content,
                mimeType: getMimeType(file.name)
            });
        });
        console.log('Service Worker updated with new files:', Array.from(files.keys()));
    }
});

// Intercept fetch requests
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    const pathname = url.pathname;

    // The iframe will request '/preview.html'. We serve 'index.html' content for it.
    const servePath = pathname.startsWith('/preview.html') ? '/index.html' : pathname;

    if (files.has(servePath)) {
        event.respondWith(
            (async () => {
                const file = files.get(servePath);
                let content = file.content;
                let mimeType = file.mimeType;
                
                const isTranspilable = servePath.endsWith('.tsx') || servePath.endsWith('.jsx');

                if (isTranspilable && self.sucrase) {
                    try {
                        content = self.sucrase.transform(content, {
                            transforms: ["typescript", "jsx"],
                            jsxRuntime: "automatic",
                            production: true,
                        }).code;
                        mimeType = 'application/javascript';
                    } catch (e) {
                        console.error(`Error transpiling ${servePath}:`, e);
                        // Display error in the preview itself for easier debugging
                        content = `
                            document.body.style.fontFamily = "monospace";
                            document.body.style.backgroundColor = "#111";
                            document.body.style.color = "white";
                            document.body.style.padding = "1rem";
                            document.body.innerHTML = \`
                                <h2>Transpilation Error</h2>
                                <p>Failed to compile ${servePath}</p>
                                <pre style="color:red; white-space: pre-wrap; word-wrap: break-word;">${e.message}</pre>
                                <hr>
                                <h3>Original Code:</h3>
                                <pre style="white-space: pre-wrap; word-wrap: break-word;">${file.content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
                            \`;
                        `;
                        mimeType = 'text/html'; // Serve the error as an HTML page
                    }
                }
                
                return new Response(content, {
                    headers: { 'Content-Type': mimeType }
                });
            })()
        );
    } else {
        // For any other request, let it pass through to the network
        // This is important for fetching libraries from esm.sh etc.
        return;
    }
});

// Activate the new service worker immediately
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});