
import React, { useEffect, lazy, Suspense, useState } from 'react';
import Loader from './IDE/components/Loader.tsx';
import LandingPage from './components/LandingPage.tsx';

const IDE = lazy(() => import('./IDE/App.tsx'));

const App = () => {
    const [isLaunchingIde, setIsLaunchingIde] = useState(false);
    const [isIdeReady, setIsIdeReady] = useState(false);

    const handleLaunchIde = () => {
        setIsLaunchingIde(true);
    };
    
    useEffect(() => {
        if (!isLaunchingIde) return;

        const prepareIdeEnvironment = async () => {
            if (window.crossOriginIsolated) {
                setIsIdeReady(true);
                return;
            }

            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('ide') === 'true') {
                window.history.replaceState({}, document.title, window.location.pathname);
                setIsIdeReady(true);
            } else {
                try {
                    const swReg = await navigator.serviceWorker.ready;
                    if (!swReg.active) {
                        console.error('Service worker not active. Reloading the page to activate it.');
                        window.location.reload();
                        return;
                    }
                    
                    const url = new URL(window.location.href);
                    url.searchParams.set('ide', 'true');
                    
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

        prepareIdeEnvironment();
    }, [isLaunchingIde]);

    if (isLaunchingIde) {
        if (!isIdeReady) {
            return <Loader />;
        }
        return (
            <Suspense fallback={<Loader />}>
                <IDE />
            </Suspense>
        );
    }
    
    return <LandingPage onLaunchIde={handleLaunchIde} />;
};

export default App;
