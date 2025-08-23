import React from 'react';

const Loader = () => {
    const styles = {
        loaderContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: 'transparent',
            textAlign: 'center',
        } as React.CSSProperties,
        spinner: {
            border: '4px solid rgba(255, 255, 255, 0.2)',
            borderLeftColor: 'var(--accent)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            animation: 'spin 1s linear infinite',
        } as React.CSSProperties,
        text: {
            marginTop: '1.5rem',
            color: 'var(--gray)',
            fontSize: '1.2rem',
            fontWeight: 500,
        }
    };

    return (
        <div style={styles.loaderContainer}>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
            <div style={styles.spinner}></div>
            <p style={styles.text}>Setting up your environment...</p>
        </div>
    );
};

export default Loader;