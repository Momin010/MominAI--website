

import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.ts';
import Header from './Header.tsx';
import Hero from '../sections/Hero.tsx';
import Logos from '../sections/Logos.tsx';
import Features from '../sections/Features.tsx';
import Testimonials from '../sections/Testimonials.tsx';
import Footer from './Footer.tsx';
import SignUpModal from './SignUpModal.tsx';
import Contact from '../sections/Contact.tsx';

interface LandingPageProps {
    onLoginSuccess: () => void;
}

const LandingPage = ({ onLoginSuccess }: LandingPageProps) => {
    useScrollReveal();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState<'main' | 'contact'>('main');

    const handleLoginSuccess = () => {
        setIsModalOpen(false);
        onLoginSuccess();
    };

    const styles = {
        main: {
            display: 'flex',
            flexDirection: 'column',
        } as React.CSSProperties
    };

    return (
        <>
            <Header 
                onBuildNowClick={() => setIsModalOpen(true)} 
                onLoginClick={() => setIsModalOpen(true)} 
                onLogoClick={() => setCurrentView('main')}
            />
             <SignUpModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleLoginSuccess}
            />
            
            <main style={styles.main}>
                {currentView === 'main' ? (
                    <>
                        <Hero onBuildNowClick={() => setIsModalOpen(true)} onContactSalesClick={() => setCurrentView('contact')} />
                        <Logos />
                        <Features />
                        <Testimonials />
                    </>
                ) : (
                    <Contact />
                )}
            </main>
            
            <Footer />
        </>
    );
};

export default LandingPage;