import React from 'react';
import { Logo } from './icons.tsx';

const Footer = () => {
    const styles = {
        footer: {
            padding: '4rem 2rem',
            borderTop: '1px solid var(--border-color)',
            textAlign: 'center',
        } as React.CSSProperties,
        logoContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' },
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
        <footer style={styles.footer}>
            <div style={styles.logoContainer}>
                <Logo />
                <span>AI Builder</span>
            </div>
            <div style={styles.links}>
                <a href="#features" style={styles.link} onMouseOver={e => e.currentTarget.style.color='var(--foreground)'} onMouseOut={e => e.currentTarget.style.color='var(--gray)'}>Features</a>
                <a href="#testimonials" style={styles.link} onMouseOver={e => e.currentTarget.style.color='var(--foreground)'} onMouseOut={e => e.currentTarget.style.color='var(--gray)'}>Testimonials</a>
                <a href="#pricing" style={styles.link} onMouseOver={e => e.currentTarget.style.color='var(--foreground)'} onMouseOut={e => e.currentTarget.style.color='var(--gray)'}>Pricing</a>
                <a href="#" style={styles.link} onMouseOver={e => e.currentTarget.style.color='var(--foreground)'} onMouseOut={e => e.currentTarget.style.color='var(--gray)'}>Docs</a>
            </div>
            <p style={styles.copyright}>© {new Date().getFullYear()} AI Builder Inc. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
