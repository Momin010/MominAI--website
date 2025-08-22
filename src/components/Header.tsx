import React, { useState, useEffect } from 'react';
import { Logo } from './icons.tsx';

const Header = ({ onBuildNowClick }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const styles = {
        header: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 100,
            transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border-bottom-color 0.3s ease',
            backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            borderBottom: scrolled ? `1px solid var(--border-color)` : '1px solid transparent',
        } as React.CSSProperties,
        logoContainer: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--foreground)', textDecoration: 'none' },
        nav: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
        navLink: { color: 'var(--gray)', textDecoration: 'none', transition: 'color 0.2s ease' },
        buttons: { display: 'flex', gap: '1rem' },
        button: {
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'all 0.2s ease',
        },
        loginButton: {
            backgroundColor: 'transparent',
            color: 'var(--foreground)',
        },
        buildButton: {
            backgroundColor: 'var(--accent)',
            color: 'var(--foreground)',
            boxShadow: `0 0 15px var(--accent-glow)`,
        },
    };

    return (
        <header style={styles.header}>
            <a href="#" style={styles.logoContainer}>
                <Logo />
                <span>AI Builder</span>
            </a>
            <nav style={styles.nav}>
                <a href="#features" style={styles.navLink} onMouseOver={e => e.currentTarget.style.color='var(--foreground)'} onMouseOut={e => e.currentTarget.style.color='var(--gray)'}>Features</a>
                <a href="#testimonials" style={styles.navLink} onMouseOver={e => e.currentTarget.style.color='var(--foreground)'} onMouseOut={e => e.currentTarget.style.color='var(--gray)'}>Testimonials</a>
                <a href="#pricing" style={styles.navLink} onMouseOver={e => e.currentTarget.style.color='var(--foreground)'} onMouseOut={e => e.currentTarget.style.color='var(--gray)'}>Pricing</a>
            </nav>
            <div style={styles.buttons}>
                <button style={{...styles.button, ...styles.loginButton}} onMouseOver={e => e.currentTarget.style.backgroundColor='var(--gray-dark)'} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Login</button>
                <button onClick={onBuildNowClick} style={{...styles.button, ...styles.buildButton}} onMouseOver={e => e.currentTarget.style.filter='brightness(1.2)'} onMouseOut={e => e.currentTarget.style.filter='brightness(1)'}>Build Now</button>
            </div>
        </header>
    );
};

export default Header;
