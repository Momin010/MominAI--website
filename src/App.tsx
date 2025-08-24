
import React, { useState, useEffect, lazy, Suspense } from 'react';
import CustomCursor from './components/CustomCursor.tsx';
import LandingPage from './components/LandingPage.tsx';
import Loader from './components/Loader.tsx';

const IDE = lazy(() => import('./IDE/App.tsx'));

type View = 'landing' | 'ide';

const App = () => {
    const [view, setView] = useState<View>('landing');
    const [isIdeLoading, setIsIdeLoading] = useState(true);

    const launchIde = async () => {
        const sw = await navigator.serviceWorker.ready;
        if (!sw) {
            console.error('Service worker not ready');
            // Show an error to the user
            return;
        }

        // Check if headers are already set
        const areHeadersSet = window.crossOriginIsolated;
        
        if (areHeadersSet) {
             setView('ide');
        } else {
            const url = new URL(window.location.href);
            url.searchParams.set('ide', 'true');
            
            // Perform a controlled reload
            const channel = new MessageChannel();
            sw.active?.postMessage({ type: 'RELOAD' }, [channel.port2]);
            
            channel.port1.onmessage = () => {
                window.location.href = url.href;
            };
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('ide') === 'true') {
            setView('ide');
            // Clean the URL
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            setIsIdeLoading(false);
        }
    }, []);

    if (isIdeLoading && view === 'landing') {
        return <Loader />;
    }

    return (
        <>
            <CustomCursor />
            {view === 'landing' ? (
                <LandingPage onLaunchIde={launchIde} />
            ) : (
                <Suspense fallback={<Loader />}>
                    <IDE />
                </Suspense>
            )}
        </>
    );
};

export default App;