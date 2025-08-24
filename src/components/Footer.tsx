import React from 'react';
import { MominAILogo } from './icons.tsx';

const Footer = () => {
    return (
        <footer className="py-16 px-8 border-t border-[var(--border-color)] text-center">
            <div className="flex justify-center items-center mb-8">
                <MominAILogo width={141} height={32} />
            </div>
            <div className="flex justify-center flex-col sm:flex-row gap-8 sm:gap-8 mb-8">
                <a href="#features" className="text-[var(--gray)] no-underline transition-colors duration-200 hover:text-[var(--foreground)]">Features</a>
                <a href="#testimonials" className="text-[var(--gray)] no-underline transition-colors duration-200 hover:text-[var(--foreground)]">Testimonials</a>
                <a href="#" className="text-[var(--gray)] no-underline transition-colors duration-200 hover:text-[var(--foreground)]">Docs</a>
            </div>
            <p className="text-[var(--gray)] text-sm">© {new Date().getFullYear()} MominAI Inc. All rights reserved.</p>
        </footer>
    );
}

export default Footer;