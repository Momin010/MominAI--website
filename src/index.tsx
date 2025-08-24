import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Register the service worker for WebContainer COOP/COEP headers
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
        console.error('Service Worker registration failed:', error);
    });
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Fatal Error: The root element with ID 'root' was not found in the DOM.");
}