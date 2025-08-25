import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GoogleIcon } from './icons.tsx';

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const SignUpModal = ({ isOpen, onClose, onSuccess }: SignUpModalProps) => {
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSuccess();
    };

    return createPortal(
        <div 
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000] backdrop-blur-sm p-4"
            style={{ animation: 'fadeIn 0.3s ease' }}
            onClick={onClose}
        >
            <div 
                className="bg-[#101010] p-8 rounded-2xl w-full max-w-sm relative shadow-2xl text-center"
                style={{ animation: 'scaleIn 0.3s ease' }}
                onClick={e => e.stopPropagation()}
            >
                <button 
                    className="absolute top-4 right-4 bg-transparent border-none text-[var(--gray)] text-2xl cursor-pointer hover:text-white transition-colors" 
                    onClick={onClose} 
                    aria-label="Close modal"
                >&times;</button>
                
                <h2 className="mb-2 text-2xl font-bold">Create Your Account</h2>
                <p className="text-[var(--gray)] mb-6 text-sm">Join millions of developers building the future.</p>
                
                <button 
                    className="flex items-center justify-center gap-3 w-full p-2.5 rounded-lg border border-[var(--border-color)] font-semibold text-sm transition-all duration-200 bg-white text-black hover:bg-gray-200"
                    onClick={onSuccess}
                >
                   <GoogleIcon />
                   <span>Sign up with Google</span>
                </button>

                <div className="flex items-center text-center text-[var(--gray)] my-6 text-xs uppercase">
                    <div className="flex-1 border-b border-[var(--border-color)]" />
                    <span className="px-4">OR</span>
                    <div className="flex-1 border-b border-[var(--border-color)]" />
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--background-secondary)] text-[var(--foreground)] text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] outline-none" type="email" placeholder="Email Address" required aria-label="Email Address" />
                    <input className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--background-secondary)] text-[var(--foreground)] text-sm placeholder:text-gray-500 focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] outline-none" type="password" placeholder="Password" required aria-label="Password"/>
                    <button type="submit" className="p-3 rounded-lg border-none font-semibold text-sm transition-all duration-200 bg-[var(--accent)] text-[var(--accent-text)] mt-2 hover:brightness-110">
                        Continue with Email
                    </button>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default SignUpModal;