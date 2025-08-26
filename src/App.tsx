


import React, { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor.tsx';
import LandingPage from './components/LandingPage.tsx';
import IDE from './IDE/App.tsx';
import Loader from './components/Loader.tsx';
import Dashboard from './components/Dashboard.tsx';
import CheckoutPage from './components/CheckoutPage.tsx';
import MobileNotSupported from './components/MobileNotSupported.tsx';

type View = 'landing' | 'dashboard' | 'loading' | 'ide' | 'checkout' | 'mobile-not-supported';

const App = () => {
    const [view, setView] = useState<View>('landing');
    const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const plan = params.get('checkout');
        const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;

        if (params.get('ide') === 'true') {
            if (isMobile) {
                setView('mobile-not-supported');
            } else {
                setView('loading');
                const timer = setTimeout(() => {
                    setView('ide');
                }, 4000);
                return () => clearTimeout(timer);
            }
        } else if (params.get('dashboard') === 'true') {
            setView('dashboard');
        } else if (plan) {
            setCheckoutPlan(plan);
            setView('checkout');
        } else {
            setView('landing');
        }
    }, []);

    useEffect(() => {
        const rootEl = document.getElementById('root');
        if (!rootEl) return;

        if (view === 'ide' || view === 'mobile-not-supported') {
            document.body.classList.add('ide-view');
        } else {
            document.body.classList.remove('ide-view');
        }

        if (['ide', 'loading', 'dashboard', 'checkout', 'mobile-not-supported'].includes(view)) {
            rootEl.style.height = '100vh';
            rootEl.style.overflow = 'hidden';
        } else {
            rootEl.style.height = 'auto';
            rootEl.style.overflow = 'visible';
        }

        return () => {
            document.body.classList.remove('ide-view');
            if (rootEl) {
                rootEl.style.height = 'auto';
                rootEl.style.overflow = 'visible';
            }
        };
    }, [view]);

    const handleLoginSuccess = () => {
        window.location.href = '/?dashboard=true';
    };

    const handleLogout = () => {
        window.location.href = '/';
    };

    const renderContent = () => {
        switch (view) {
            case 'loading':
                return <Loader />;
            case 'ide':
                return <IDE onLogout={handleLogout} />;
            case 'mobile-not-supported':
                return <MobileNotSupported />;
            case 'dashboard':
                return <Dashboard onLogout={handleLogout} />;
            case 'checkout':
                return <CheckoutPage plan={checkoutPlan} />;
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