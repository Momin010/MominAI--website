import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const SignUpModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

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
            cursor: 'pointer',
        } as React.CSSProperties,
        h2: { marginBottom: '0.5rem' },
        p: { color: 'var(--gray)', marginBottom: '2rem' },
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
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'all 0.2s ease',
            backgroundColor: 'var(--accent)',
            color: 'var(--foreground)',
            marginTop: '1rem'
        }
    };

    return createPortal(
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <button style={styles.closeButton} onClick={onClose} aria-label="Close modal">&times;</button>
                <h2 style={styles.h2}>Create Your Account</h2>
                <p style={styles.p}>Join millions of developers building the future.</p>
                <form style={styles.form} onSubmit={e => e.preventDefault()}>
                    <input style={styles.input} type="email" placeholder="Email Address" required />
                    <input style={styles.input} type="password" placeholder="Password" required />
                    <button type="submit" style={styles.button} onMouseOver={e => e.currentTarget.style.filter='brightness(1.2)'} onMouseOut={e => e.currentTarget.style.filter='brightness(1)'}>Continue</button>
                </form>
            </div>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            `}</style>
        </div>,
        document.body
    );
};

export default SignUpModal;
