import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor.tsx';
import LandingPage from './components/LandingPage.tsx';
import IDE from './components/IDE/index.tsx';
import Loader from './components/Loader.tsx';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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