import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor.tsx';
import LandingPage from './components/LandingPage.tsx';
import IDE from './IDE/App.tsx';
import Loader from './components/Loader.tsx';
import Dashboard from './components/Dashboard.tsx';

const App = () => {
    // A single state to manage which view is active: landing, dashboard, loader, or the IDE.
    const [view, setView] = useState<'landing' | 'dashboard' | 'loading' | 'ide'>('landing');

    useEffect(() => {
        // This effect runs once on initial load to determine the correct view from the URL.
        const params = new URLSearchParams(window.location.search);
        if (params.get('ide') === 'true') {
            // If '?ide=true' is in the URL, start the loading sequence for the IDE.
            setView('loading');
            const timer = setTimeout(() => {
                // After 4 seconds, switch from the loader to the IDE.
                setView('ide');
            }, 4000);
            // Clean up the timer if the component unmounts.
            return () => clearTimeout(timer);
        } else if (params.get('dashboard') === 'true') {
            // If '?dashboard=true' is in the URL, show the user's dashboard.
            setView('dashboard');
        }
        else {
            // If the URL doesn't specify a view, show the landing page.
            setView('landing');
        }
    }, []);

    // This effect manages the styles of the root HTML element based on the current view.
    useEffect(() => {
        const rootEl = document.getElementById('root');
        if (!rootEl) return;

        if (view === 'ide') {
            document.body.classList.add('ide-view');
        } else {
            document.body.classList.remove('ide-view');
        }

        if (view === 'ide' || view === 'loading' || view === 'dashboard') {
            // For the IDE, loader, and dashboard, constrain the root to the viewport height and prevent overflow.
            rootEl.style.height = '100vh';
            rootEl.style.overflow = 'hidden';
        } else {
            // For the landing page, allow the root to grow with its content and scroll.
            rootEl.style.height = 'auto';
            rootEl.style.overflow = 'visible';
        }

        // Cleanup function to reset styles when the component unmounts.
        return () => {
            document.body.classList.remove('ide-view');
            if (rootEl) {
                rootEl.style.height = 'auto';
                rootEl.style.overflow = 'visible';
            }
        };
    }, [view]);

    // Navigate to the dashboard view on successful login. This causes a full page reload.
    const handleLoginSuccess = () => {
        window.location.href = '/?dashboard=true';
    };

    // Navigate back to the landing page on logout. This also reloads the page.
    const handleLogout = () => {
        window.location.href = '/';
    };

    // A helper function to render the correct component based on the current view state.
    const renderContent = () => {
        switch (view) {
            case 'loading':
                return <Loader />;
            case 'ide':
                return <IDE onLogout={handleLogout} />;
            case 'dashboard':
                return <Dashboard onLogout={handleLogout} />;
            case 'landing':
            default:
                return <LandingPage onLoginSuccess={handleLoginSuccess} />;
        }
    };

    return (
        <>
            <CustomCursor />
            {renderContent()}
        </>
    );
};

export default App;