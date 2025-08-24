import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Register the service worker for WebContainer COOP/COEP headers
if ('serviceWorker' in navigator) {
    // Use .register() without .then() for a fire-and-forget registration
    navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('Service Worker registration failed:', error);
    });
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
