import React from 'react';
import { MominAILogo } from './icons.tsx';

const Footer = () => {
    const styles = {
        footer: {
            padding: '4rem 2rem',
            borderTop: '1px solid var(--border-color)',
            textAlign: 'center',
        } as React.CSSProperties,
        logoContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' },
        links: {
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '2rem',
        },
        link: {
            color: 'var(--gray)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
        },
        copyright: {
            color: 'var(--gray)',
            fontSize: '0.9rem',
        }
    };

    return (
        <>
            <style>{`
                @media (max-width: 480px) {
                    .footer-links {
                        flex-direction: column;
                        gap: 1.5rem;
                    }
                    .footer-section {
                        padding: 3rem 1rem;
                    }
                }
            `}</style>
            <footer style={styles.footer} className="footer-section">
                <div style={styles.logoContainer}>
                    <MominAILogo width={141} height={32} />
                </div>
                <div style={styles.links} className="footer-links">
                    <a href="#features" style={styles.link} onMouseOver={e => e.currentTarget.style.color='var(--foreground)'} onMouseOut={e => e.currentTarget.style.color='var(--gray)'}>Features</a>
                    <a href="#testimonials" style={styles.link} onMouseOver={e => e.currentTarget.style.color='var(--foreground)'} onMouseOut={e => e.currentTarget.style.color='var(--gray)'}>Testimonials</a>
                    <a href="#pricing" style={styles.link} onMouseOver={e => e.currentTarget.style.color='var(--foreground)'} onMouseOut={e => e.currentTarget.style.color='var(--gray)'}>Pricing</a>
                    <a href="#" style={styles.link} onMouseOver={e => e.currentTarget.style.color='var(--foreground)'} onMouseOut={e => e.currentTarget.style.color='var(--gray)'}>Docs</a>
                </div>
                <p style={styles.copyright}>© {new Date().getFullYear()} MominAI Inc. All rights reserved.</p>
            </footer>
        </>
    );
}

export default Footer;