import React, { useState, useEffect } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal.ts';
import Header from './components/Header.tsx';
import Hero from './sections/Hero.tsx';
import Logos from './sections/Logos.tsx';
import Features from './sections/Features.tsx';
import Testimonials from './sections/Testimonials.tsx';
import Pricing from './sections/Pricing.tsx';
import Footer from './components/Footer.tsx';
import SignUpModal from './components/SignUpModal.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import Contact from './sections/Contact.tsx';

const App = () => {
    useScrollReveal();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [route, setRoute] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash);
            window.scrollTo(0, 0);
        };
        
        handleHashChange(); // Set initial route

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const styles = {
        main: {
            display: 'flex',
            flexDirection: 'column',
        } as React.CSSProperties
    };
    return (
        <>
            <CustomCursor />
            <Header onBuildNowClick={handleOpenModal} />
            
            {route === '#contact' ? (
                <Contact />
            ) : (
                <main style={styles.main}>
                    <Hero onBuildNowClick={handleOpenModal} />
                    <Logos />
                    <Features />
                    <Testimonials />
                    <Pricing />
                </main>
            )}
            
            <Footer />
            <SignUpModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
};

export default App;