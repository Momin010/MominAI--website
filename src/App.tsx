import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage.tsx';
import IDE from './IDE/App.tsx';
import Loader from './components/Loader.tsx';
import Dashboard from './components/Dashboard.tsx';
import CheckoutPage from './components/CheckoutPage.tsx';
import MobileNotSupported from './components/MobileNotSupported.tsx';

type View = 'landing' | 'dashboard' | 'loading' | 'ide' | 'checkout' | 'mobile-not-supported';

interface ScriptConfig {
  src: string;
  views: string[];
  async?: boolean;
  defer?: boolean;
}

const useExternalScripts = (view: View) => {
  useEffect(() => {
    const SCRIPT_CONFIG: Record<string, ScriptConfig> = {
      tailwindcss: { src: 'https://cdn.tailwindcss.com', views: ['landing', 'dashboard', 'checkout'] },
      stripe: { src: 'https://js.stripe.com/v3/', views: ['landing', 'checkout'] },
      supabase: { src: 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.0/dist/umd/supabase.min.js', views: ['dashboard', 'landing', 'checkout'] },
      google: { src: 'https://accounts.google.com/gsi/client', views: ['landing'], async: true, defer: true },
    };

    // Clean up all managed scripts before adding new ones
    document.querySelectorAll('[data-managed-script="true"]').forEach(el => el.remove());

    Object.entries(SCRIPT_CONFIG).forEach(([key, config]) => {
      if (config.views.includes(view)) {
        const scriptId = `external-script-${key}`;
        if (!document.getElementById(scriptId)) {
          const script = document.createElement('script');
          script.id = scriptId;
          script.src = config.src;
          script.setAttribute('data-managed-script', 'true');
          if (config.async) script.async = true;
          if (config.defer) script.defer = true;
          document.body.appendChild(script);
        }
      }
    });

  }, [view]);
};

// Determines the initial view synchronously to avoid race conditions.
const getInitialView = (): View => {
    const params = new URLSearchParams(window.location.search);
    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;

    if (params.get('ide') === 'true') {
        return isMobile ? 'mobile-not-supported' : 'loading';
    }
    if (params.get('dashboard') === 'true') {
        return 'dashboard';
    }
    if (params.get('checkout')) {
        return 'checkout';
    }
    return 'landing';
};

const App = () => {
    const [view, setView] = useState<View>(getInitialView);
    const [checkoutPlan, setCheckoutPlan] = useState<string | null>(() => {
        if (getInitialView() === 'checkout') {
            const params = new URLSearchParams(window.location.search);
            return params.get('checkout');
        }
        return null;
    });

    useExternalScripts(view);

    useEffect(() => {
        // This effect now only handles transitions *after* the initial load.
        if (view === 'loading') {
            const timer = setTimeout(() => {
                setView('ide');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [view]);

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
            {renderContent()}
        </>
    );
};

export default App;