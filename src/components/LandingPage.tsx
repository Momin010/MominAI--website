import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.ts';
import Header from './Header.tsx';
import Hero from '../sections/Hero.tsx';
import Logos from '../sections/Logos.tsx';
import Features from '../sections/Features.tsx';
import Testimonials from '../sections/Testimonials.tsx';
import Pricing from '../sections/Pricing.tsx';
import Footer from './Footer.tsx';
import SignUpModal from './SignUpModal.tsx';
import Contact from '../sections/Contact.tsx';

interface LandingPageProps {
    onLoginSuccess: () => void;
}

const LandingPage = ({ onLoginSuccess }: LandingPageProps) => {
    useScrollReveal();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [route, setRoute] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            const currentHash = window.location.hash;
            setRoute(currentHash);
            
            // Scroll to top for main page or contact page
            if (currentHash === '#contact' || currentHash === '' || currentHash === '#') {
                document.querySelector('#root > div')?.scrollTo(0, 0);
            }
        };
        
        handleHashChange();

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleBuildNow = () => {
        // For simplicity, we'll just go to the IDE. 
        // In a real app, you might open the modal first.
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
            <Header onBuildNowClick={handleBuildNow} />
            
            {route === '#contact' ? (
                <Contact />
            ) : (
                <main style={styles.main}>
                    <Hero onBuildNowClick={handleBuildNow} />
                    <Logos />
                    <Features />
                    <Testimonials />
                    <Pricing />
                </main>
            )}
            
            <Footer />
            <SignUpModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onSuccess={onLoginSuccess}
            />
        </>
    );
};

export default LandingPage;
