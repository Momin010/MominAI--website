import React from 'react';
import { MominAILogo } from './icons';

const MobileNotSupported: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-transparent text-center p-8">
            <div className="mb-8">
                <MominAILogo />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-white">Desktop Experience Required</h1>
            <p className="text-lg text-gray-400 max-w-md mb-8">
                The MominAI development environment is a powerful tool that requires a desktop browser for the best experience.
            </p>
            <a 
                href="/" 
                className="px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 bg-[var(--accent)] text-[var(--accent-text)] hover:brightness-110 no-underline"
            >
                Back to Homepage
            </a>
        </div>
    );
};

export default MobileNotSupported;