import React, { useState, useEffect } from 'react';
import { MominAILogo } from './icons.tsx';

interface HeaderProps {
    onBuildNowClick: () => void;
}

const Header = ({ onBuildNowClick }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isMenuOpen]);

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    const styles = {
        header: {
            position: 'fixed',
            top: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 2rem)',
            maxWidth: '1100px',
            padding: '0.50rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 100,
            backgroundColor: 'rgba(17, 17, 17, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '5rem',
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2), 0 0 20px rgba(79, 70, 229, 0.25)',
            transition: 'top 0.3s ease, box-shadow 0.3s ease',
        } as React.CSSProperties,
        logoContainer: { display: 'flex', alignItems: 'center', fontWeight: 600, color: 'var(--foreground)', textDecoration: 'none' },
        nav: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
        navLink: { 
            position: 'relative',
            color: 'var(--gray)', 
            textDecoration: 'none', 
            transition: 'color 0.2s ease',
            padding: '0.25rem 0' 
        } as React.CSSProperties,
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
        hamburger: {
            width: '24px',
            height: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            background: 'transparent',
            border: 'none',
            zIndex: 1001
        } as React.CSSProperties,
        hamburgerLine: (isOpen: boolean, position: 'top' | 'middle' | 'bottom'): React.CSSProperties => ({
            width: '100%',
            height: '2px',
            backgroundColor: 'var(--foreground)',
            borderRadius: '1px',
            transition: 'all 0.3s ease',
            transformOrigin: 'center',
            ...(isOpen && position === 'top' && { transform: 'translateY(7px) rotate(45deg)' }),
            ...(isOpen && position === 'middle' && { opacity: 0, transform: 'scale(0)' }),
            ...(isOpen && position === 'bottom' && { transform: 'translateY(-7px) rotate(-45deg)' }),
        }),
        mobileMenu: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            animation: 'fadeIn 0.3s ease-out'
        } as React.CSSProperties,
        mobileNavLink: {
            color: 'var(--foreground)',
            textDecoration: 'none',
            fontSize: '2rem',
            fontWeight: 600
        } as React.CSSProperties
    };

    return (
        <>
        <style>{`
            .nav-link::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, var(--accent), var(--accent-glow));
                transform: scaleX(0);
                transform-origin: right;
                transition: transform 0.3s ease-out;
            }
            .nav-link:hover {
                color: var(--foreground);
            }
            .nav-link:hover::after {
                transform: scaleX(1);
                transform-origin: left;
            }

            .desktop-nav, .desktop-buttons {
                display: flex;
            }
            .mobile-menu-button {
                display: none;
            }

            @media (max-width: 860px) {
                .desktop-nav {
                    display: none;
                }
                .desktop-buttons {
                    display: none;
                }
                .mobile-menu-button {
                    display: flex;
                }
            }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
        <header style={styles.header}>
            <a href="#" style={styles.logoContainer}>
                <MominAILogo width={100} height={22} />
            </a>
            <nav style={styles.nav} className="desktop-nav">
                <a href="#features" className="nav-link" style={styles.navLink}>Features</a>
                <a href="#testimonials" className="nav-link" style={styles.navLink}>Testimonials</a>
                <a href="#pricing" className="nav-link" style={styles.navLink}>Pricing</a>
            </nav>
            <div style={styles.buttons} className="desktop-buttons">
                <button style={{...styles.button, ...styles.loginButton}} onMouseOver={e => e.currentTarget.style.backgroundColor='var(--gray-dark)'} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Login</button>
                <button onClick={onBuildNowClick} style={{...styles.button, ...styles.buildButton}} onMouseOver={e => e.currentTarget.style.filter='brightness(1.2)'} onMouseOut={e => e.currentTarget.style.filter='brightness(1)'}>Build Now</button>
            </div>
            <button className="mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)} style={styles.hamburger} aria-label="Toggle menu">
                <div style={styles.hamburgerLine(isMenuOpen, 'top')}></div>
                <div style={styles.hamburgerLine(isMenuOpen, 'middle')}></div>
                <div style={styles.hamburgerLine(isMenuOpen, 'bottom')}></div>
            </button>
        </header>

        {isMenuOpen && (
            <div style={styles.mobileMenu}>
                <a href="#features" style={styles.mobileNavLink} onClick={handleLinkClick}>Features</a>
                <a href="#testimonials" style={styles.mobileNavLink} onClick={handleLinkClick}>Testimonials</a>
                <a href="#pricing" style={styles.mobileNavLink} onClick={handleLinkClick}>Pricing</a>
                <button onClick={() => { onBuildNowClick(); handleLinkClick(); }} style={{...styles.button, ...styles.buildButton, padding: '1rem 2rem', fontSize: '1.5rem', marginTop: '2rem'}}>Build Now</button>
            </div>
        )}
        </>
    );
};

export default Header;
