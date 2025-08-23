import React, { useState } from 'react';
import LandingPage from './components/LandingPage.tsx';
import IDE from './components/IDE.tsx';
import CustomCursor from './components/CustomCursor.tsx';

const App = () => {
    const [showIDE, setShowIDE] = useState(false);

    const handleLoginSuccess = () => {
        setShowIDE(true);
    };

    return (
        <>
            <CustomCursor />
            <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                {showIDE ? (
                    <div style={{
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        padding: '2rem', 
                        height: '100%'
                    }}>
                        <IDE />
                    </div>
                ) : (
                    <LandingPage onLoginSuccess={handleLoginSuccess} />
                )}
            </div>
        </>
    );
};

export default App;
