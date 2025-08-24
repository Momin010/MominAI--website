import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-transparent text-center">
            <div 
                className="border-4 border-[rgba(255,255,255,0.2)] border-l-[var(--accent)] rounded-full w-12 h-12"
                style={{ animation: 'spin 1s linear infinite' }}
            ></div>
            <p className="mt-6 text-[var(--gray)] text-lg font-medium">Setting up your environment...</p>
        </div>
    );
};

export default Loader;
