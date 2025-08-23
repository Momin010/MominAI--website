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
        // On success, call the onSuccess callback to transition to the IDE
        onSuccess();
    };

    const handleGoogleSignIn = () => {
        if (tokenClient) {
            tokenClient.requestAccessToken();
        } else {
            console.error('Google token client not available.');
        }
    }

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)',
            animation: 'fadeIn 0.3s ease',
            padding: '1rem'
        } as React.CSSProperties,
        modal: {
            background: 'var(--background-secondary)',
            padding: '2rem 2.5rem',
            borderRadius: '1rem',
            border: '1px solid var(--border-color)',
            width: '100%',
            maxWidth: '400px',
            position: 'relative',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            animation: 'scaleIn 0.3s ease',
            textAlign: 'center',
        } as React.CSSProperties,
        closeButton: {
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--gray)',
            fontSize: '1.5rem',
        } as React.CSSProperties,
        h2: { marginBottom: '0.5rem', fontSize: '1.5rem' },
        p: { color: 'var(--gray)', marginBottom: '1.5rem' },
        form: { display: 'flex', flexDirection: 'column', gap: '1rem' } as React.CSSProperties,
        input: {
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
            fontSize: '1rem',
        },
        button: {
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'all 0.2s ease',
            backgroundColor: 'var(--accent)',
            color: 'var(--foreground)',
            marginTop: '0.5rem'
        },
        googleButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--border-color)',
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'all 0.2s ease',
            backgroundColor: 'var(--foreground)',
            color: '#000',
            width: '100%',
        } as React.CSSProperties,
        divider: {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: 'var(--gray)',
            margin: '1.5rem 0',
            fontSize: '0.8rem',
        } as React.CSSProperties,
        dividerLine: {
            flex: 1,
            borderBottom: '1px solid var(--border-color)',
        } as React.CSSProperties,
        dividerText: {
            padding: '0 1rem'
        } as React.CSSProperties,
    };

    return createPortal(
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} className="signup-modal" onClick={e => e.stopPropagation()}>
                <button style={styles.closeButton} onClick={onClose} aria-label="Close modal">&times;</button>
                <>
                    <h2 style={styles.h2}>Create Your Account</h2>
                    <p style={styles.p}>Join millions of developers building the future.</p>
                    
                    <button style={styles.googleButton} onClick={handleGoogleSignIn} onMouseOver={e => e.currentTarget.style.backgroundColor='#f0f0f0'} onMouseOut={e => e.currentTarget.style.backgroundColor='var(--foreground)'}>
                       <GoogleIcon />
                       <span>Sign up with Google</span>
                    </button>

                    <div style={styles.divider}>
                        <div style={styles.dividerLine} />
                        <span style={styles.dividerText}>OR</span>
                        <div style={styles.dividerLine} />
                    </div>

                    <form style={styles.form} onSubmit={handleSubmit}>
                        <input style={styles.input} type="email" placeholder="Email Address" required aria-label="Email Address" />
                        <input style={styles.input} type="password" placeholder="Password" required aria-label="Password"/>
                        <button type="submit" style={styles.button} onMouseOver={e => e.currentTarget.style.filter='brightness(1.2)'} onMouseOut={e => e.currentTarget.style.filter='brightness(1)'}>Continue with Email</button>
                    </form>
                </>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @media (max-width: 480px) {
                    .signup-modal {
                        padding: 1.5rem;
                    }
                }
            `}</style>
        </div>,
        document.body
    );
};

export default SignUpModal;