import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { GoogleIcon } from './icons.tsx';

// This is a global variable from the Google script in index.html
declare const google: any;

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const SignUpModal = ({ isOpen, onClose, onSuccess }: SignUpModalProps) => {
    const [tokenClient, setTokenClient] = useState(null);
    
    // Initialize Google Auth Client
    useEffect(() => {
        if (isOpen && !tokenClient) {
            try {
                const client = google.accounts.oauth2.initTokenClient({
                    client_id: '601307193094-i9r4kscn6tqkilon3g9c352igtt9ta40.apps.googleusercontent.com',
                    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
                    callback: (response) => {
                        console.log('Google Sign-In Success:', response);
                        // On success, call the onSuccess callback to transition to the IDE
                        onSuccess();
                    },
                });
                setTokenClient(client);
            } catch (error) {
                console.error("Google Client failed to initialize:", error);
            }
        }
    }, [isOpen, tokenClient, onSuccess]);


    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    const handleSubmit = (event) => {
        event.preventDefault();
        onSuccess();
    };

    const handleGoogleSignIn = () => {
        if (tokenClient) {
            tokenClient.requestAccessToken();
        } else {
            console.error('Google token client not available.');
        }
    }

    return createPortal(
        <div 
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000] backdrop-blur-sm p-4"
            style={{ animation: 'fadeIn 0.3s ease' }}
            onClick={onClose}
        >
            <div 
                className="bg-[var(--background-secondary)] p-8 sm:p-10 rounded-2xl border border-[var(--border-color)] w-full max-w-sm relative shadow-2xl text-center"
                style={{ animation: 'scaleIn 0.3s ease' }}
                onClick={e => e.stopPropagation()}
            >
                <button 
                    className="absolute top-4 right-4 bg-transparent border-none text-[var(--gray)] text-2xl cursor-pointer" 
                    onClick={onClose} 
                    aria-label="Close modal"
                >&times;</button>
                
                <h2 className="mb-2 text-2xl font-bold">Create Your Account</h2>
                <p className="text-[var(--gray)] mb-6">Join millions of developers building the future.</p>
                
                <button 
                    className="flex items-center justify-center gap-3 w-full p-3 rounded-lg border border-[var(--border-color)] font-semibold text-base transition-all duration-200 bg-[var(--foreground)] text-black hover:bg-gray-200"
                    onClick={handleGoogleSignIn}
                >
                   <GoogleIcon />
                   <span>Sign up with Google</span>
                </button>

                <div className="flex items-center text-center text-[var(--gray)] my-6 text-xs">
                    <div className="flex-1 border-b border-[var(--border-color)]" />
                    <span className="px-4">OR</span>
                    <div className="flex-1 border-b border-[var(--border-color)]" />
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--background)] text-[var(--foreground)] text-base" type="email" placeholder="Email Address" required aria-label="Email Address" />
                    <input className="p-3 rounded-lg border border-[var(--border-color)] bg-[var(--background)] text-[var(--foreground)] text-base" type="password" placeholder="Password" required aria-label="Password"/>
                    <button type="submit" className="p-3 rounded-lg border-none font-semibold text-base transition-all duration-200 bg-[var(--accent)] text-[var(--foreground)] mt-2 hover:brightness-125">
                        Continue with Email
                    </button>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default SignUpModal;