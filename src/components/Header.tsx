

import React, { useState, useEffect } from 'react';
import { MominAILogo } from './icons.tsx';

interface HeaderProps {
    onBuildNowClick: () => void;
    onLoginClick: () => void;
    onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBuildNowClick, onLoginClick, onLogoClick }) => {
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

    const hamburgerLineStyle = (isOpen: boolean, position: 'top' | 'middle' | 'bottom'): React.CSSProperties => ({
        width: '100%',
        height: '2px',
        backgroundColor: 'var(--foreground)',
        borderRadius: '1px',
        transition: 'all 0.3s ease',
        transformOrigin: 'center',
        ...(isOpen && position === 'top' && { transform: 'translateY(7px) rotate(45deg)' }),
        ...(isOpen && position === 'middle' && { opacity: 0, transform: 'scale(0)' }),
        ...(isOpen && position === 'bottom' && { transform: 'translateY(-7px) rotate(-45deg)' }),
    });
    
    const NavLink = ({ href, children }: { href: string, children: React.ReactNode}) => (
        <a href={href} className="relative text-[var(--gray)] hover:text-[var(--foreground)] transition-colors duration-200 py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-[var(--accent)] after:to-[var(--accent-glow)] after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left">
            {children}
        </a>
    );

    return (
        <>
            <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl px-6 py-2 flex justify-between items-center z-[100] bg-[rgba(17,17,17,0.7)] backdrop-blur-lg rounded-full border border-[var(--border-color)] shadow-[0_4px_20px_rgba(0,0,0,0.2),_0_0_20px_rgba(79,70,229,0.25)] transition-all duration-300">
                <a href="#" onClick={(e) => { e.preventDefault(); onLogoClick(); }} className="flex items-center font-semibold text-[var(--foreground)] no-underline">
                    <MominAILogo width={100} height={22} />
                </a>
                
                {/* Desktop Navigation */}
                <nav className="hidden lg:flex gap-6 items-center">
                    <NavLink href="#features">Features</NavLink>
                    <NavLink href="#testimonials">Testimonials</NavLink>
                    <div className="flex gap-4 items-center pl-4">
                        <button onClick={onLoginClick} className="px-4 py-2 rounded-full border border-[var(--border-color)] font-semibold text-sm cursor-pointer transition-all duration-200 bg-transparent text-[var(--foreground)] hover:bg-[var(--gray-dark)]">
                            Login
                        </button>
                        <button onClick={onBuildNowClick} className="px-4 py-2 rounded-full border-none font-semibold text-sm cursor-pointer transition-all duration-200 bg-[var(--accent)] text-[var(--foreground)] hover:brightness-125">
                            Build Now
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button className="lg:hidden flex flex-col justify-around w-6 h-6 bg-transparent border-none z-[1001]" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                    <div style={hamburgerLineStyle(isMenuOpen, 'top')}></div>
                    <div style={hamburgerLineStyle(isMenuOpen, 'middle')}></div>
                    <div style={hamburgerLineStyle(isMenuOpen, 'bottom')}></div>
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[999] flex flex-col justify-center items-center gap-8" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                    <a href="#features" className="text-white no-underline text-3xl font-semibold" onClick={handleLinkClick}>Features</a>
                    <a href="#testimonials" className="text-white no-underline text-3xl font-semibold" onClick={handleLinkClick}>Testimonials</a>
                    <div className="flex flex-col gap-6 items-center mt-8">
                        <button onClick={() => { onLoginClick(); handleLinkClick(); }} className="px-8 py-4 rounded-full border border-[var(--border-color)] text-2xl bg-transparent text-white">
                            Login
                        </button>
                        <button onClick={() => { onBuildNowClick(); handleLinkClick(); }} className="px-8 py-4 rounded-full border-none text-2xl bg-[var(--accent)] text-white">
                            Build Now
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;