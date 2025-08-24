import React, { useEffect, lazy, Suspense, useState } from 'react';
import Loader from './IDE/components/Loader.tsx';

const IDE = lazy(() => import('./IDE/App.tsx'));

const App = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const launchIde = async () => {
            // If headers are already set, we're good to go.
            if (window.crossOriginIsolated) {
                setIsReady(true);
                return;
            }

            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('ide') === 'true') {
                // We've been reloaded by the service worker.
                // Clean the URL and mark as ready.
                window.history.replaceState({}, document.title, window.location.pathname);
                setIsReady(true);
            } else {
                // This is the first load. We need to trigger a reload via the service worker
                // to get the necessary COOP/COEP headers.
                try {
                    const swReg = await navigator.serviceWorker.ready;
                    if (!swReg.active) {
                        // This can happen on the very first load if the SW isn't activated yet.
                        // A hard reload is the simplest solution for the user.
                        console.error('Service worker not active. Reloading the page to activate it.');
                        window.location.reload();
                        return;
                    }
                    
                    const url = new URL(window.location.href);
                    url.searchParams.set('ide', 'true');
                    
                    // Use a MessageChannel to know when the service worker is done processing the message
                    // before we navigate.
                    const channel = new MessageChannel();
                    swReg.active.postMessage({ type: 'RELOAD' }, [channel.port2]);
                    
                    channel.port1.onmessage = () => {
                        window.location.href = url.href;
                    };

                } catch (error) {
                    console.error('Service worker readiness error:', error);
                    alert('Could not prepare the development environment. Please check your browser settings and try again.');
                }
            }
        };

        launchIde();
    }, []);

    // Show a loader until the environment is confirmed to be ready.
    if (!isReady) {
        return <Loader />;
    }

    // Render the IDE once headers are set.
    return (
        <Suspense fallback={<Loader />}>
            <IDE />
        </Suspense>
    );
};

export default App;
