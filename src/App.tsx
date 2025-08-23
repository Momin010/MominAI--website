import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor.tsx';
import LandingPage from './components/LandingPage.tsx';
import IDE from './components/IDE/index.tsx';

const App = () => {
    const [isIDEView, setIDEView] = useState(false);

    useEffect(() => {
        // On initial load, check the URL to see which view to render.
        const params = new URLSearchParams(window.location.search);
        if (params.get('ide') === 'true') {
            setIDEView(true);
        }
    }, []);
    
    // Manage body scroll based on the current view
    useEffect(() => {
        document.body.style.overflow = isIDEView ? 'hidden' : 'auto';
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