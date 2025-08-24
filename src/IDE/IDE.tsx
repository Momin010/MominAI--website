import React from 'react';
import { WebContainerProvider } from './WebContainerProvider.tsx';
import AppContent from './AppContent.tsx';

const IDE = () => {
    return (
        <WebContainerProvider>
            <AppContent />
        </WebContainerProvider>
    );
};

export default IDE;
