import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor.tsx';
import LandingPage from './components/LandingPage.tsx';
import IDE from './components/IDE/index.tsx';
import Loader from './components/Loader.tsx';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    // Manage body scroll based on the current view
    useEffect(() => {
        if (isLoading || isAuthenticated) {
            document.body.style.overflow = 'hidden';
        } else {
            // LandingPage is visible, allow scrolling.
            // The Header component will still manage overflow for its mobile menu.
            document.body.style.overflow = 'auto';
        }
    }, [isLoading, isAuthenticated]);


    const handleLoginSuccess = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsAuthenticated(true);
            setIsLoading(false);
        }, 6000); // 6-second loader
    };
    
    const handleLogout = () => {
        setIsAuthenticated(false);
    }

    return (
        <>
            <CustomCursor />
            {isLoading ? (
                <Loader />
            ) : isAuthenticated ? (
                <IDE onLogout={handleLogout} />
            ) : (
                <LandingPage onLoginSuccess={handleLoginSuccess} />
            )}
        </>
    );
};

export default App;