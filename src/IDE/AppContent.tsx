import React from 'react';
import { useWebContainer } from './WebContainerProvider.tsx';
import Loader from '../components/Loader.tsx';
// The rest of your IDE components will be imported here
// For now, we'll just show the status.

const AppContent = () => {
    const { isLoading, error, serverUrl } = useWebContainer();

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center bg-red-900/50 text-white p-4">
                <h2 className="text-2xl font-bold mb-4">Error</h2>
                <p className="text-center mb-4">Could not initialize the development environment.</p>
                <pre className="bg-black/50 p-4 rounded-lg text-sm max-w-2xl overflow-auto">{error}</pre>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen flex flex-col p-4 bg-transparent">
             <div className="flex-grow flex items-center justify-center">
                 <iframe src={serverUrl || ''} className="w-full h-full rounded-lg border-2 border-gray-700 bg-white" />
            </div>
        </div>
    );
};


export default AppContent;
