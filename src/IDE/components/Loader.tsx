

import React from 'react';

interface LoaderProps {
    log: string[];
}

const Loader: React.FC<LoaderProps> = ({ log }) => {
    const lastLog = log[log.length - 1] || 'Setting up your environment...';
    
    return (
        <div className="flex flex-col justify-center items-center h-full w-full bg-transparent text-center">
            <div 
                className="border-4 border-[var(--gray-dark)] border-l-[var(--accent)] rounded-full w-12 h-12 animate-spin"
            ></div>
            <p className="mt-6 text-[var(--gray)] text-lg font-medium animate-pulse">
                {lastLog}
            </p>
        </div>
    );
};

export default Loader;