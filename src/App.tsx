import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor.tsx';
import LandingPage from './components/LandingPage.tsx';
import IDE from './IDE/App.tsx';

const App = () => {
    const [isIDEView, setIDEView] = useState(false);

    useEffect(() => {
        // On initial load, check the URL to see which view to render.
        const params = new URLSearchParams(window.location.search);
        if (params.get('ide') === 'true') {
            setIDEView(true);
        }
    }, []);
    
    // Manage root element styles to contain the view and control scrolling.
    useEffect(() => {
        const rootEl = document.getElementById('root');
        if (!rootEl) return;

        if (isIDEView) {
            // For the IDE, constrain the root to the viewport height and prevent overflow.
            rootEl.style.height = '100vh';
            rootEl.style.overflow = 'hidden';
        } else {
            // For the landing page, allow the root to grow with its content.
            rootEl.style.height = 'auto';
            rootEl.style.overflow = 'visible';
        }

        // Cleanup function to reset styles when the component unmounts.
        return () => {
            if (rootEl) {
                rootEl.style.height = 'auto';
                rootEl.style.overflow = 'visible';
            }
        };
    }, [isIDEView]);


    const handleLoginSuccess = () => {
        // Navigate to the IDE view. This causes a full page reload,
        // allowing the service worker to apply the correct security headers.
        window.location.href = '/?ide=true';
    };
    
    const handleLogout = () => {
        // Navigate back to the landing page. This also reloads the page.
        window.location.href = '/';
    }

    return (
        <>
            <CustomCursor />
            {isIDEView ? (
                <IDE onLogout={handleLogout} />
            ) : (
                <LandingPage onLoginSuccess={handleLoginSuccess} />
            )}
        </>
    );
};

export default App;