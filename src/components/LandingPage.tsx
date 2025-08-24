
import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.ts';
import Header from './Header.tsx';
import Hero from '../sections/Hero.tsx';
import Logos from '../sections/Logos.tsx';
import Features from '../sections/Features.tsx';
import Testimonials from '../sections/Testimonials.tsx';
import Pricing from '../sections/Pricing.tsx';
import Footer from './Footer.tsx';
import Contact from '../sections/Contact.tsx';
import SignUpModal from './SignUpModal.tsx';

interface LandingPageProps {
    onLaunchIde: () => void;
}

const LandingPage = ({ onLaunchIde }: LandingPageProps) => {
    useScrollReveal();
    const [route, setRoute] = useState(window.location.hash);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleHashChange = () => {
            const currentHash = window.location.hash;
            setRoute(currentHash);
            
            if (currentHash === '#contact') {
                 // specific logic for contact page if needed
            } else if (currentHash === '' || currentHash === '#') {
                window.scrollTo(0, 0);
            }
        };
        
        handleHashChange();

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);
    
    const handleLoginSuccess = () => {
        setIsModalOpen(false);
        onLaunchIde();
    };

    const styles = {
        main: {
            display: 'flex',
            flexDirection: 'column',
        } as React.CSSProperties
    };

    return (
        <>
            <Header onBuildNowClick={() => setIsModalOpen(true)} onLoginClick={() => setIsModalOpen(true)} />
             <SignUpModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleLoginSuccess}
            />
            
            {route === '#contact' ? (
                <main style={styles.main}>
                     <Contact />
                </main>
            ) : (
                <main style={styles.main}>
                    <Hero onBuildNowClick={() => setIsModalOpen(true)} />
                    <Logos />
                    <Features />
                    <Testimonials />
                    <Pricing />
                </main>
            )}
            
            <Footer />
        </>
    );
};

export default LandingPage;