import React, { useState } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal.ts';
import Header from './components/Header.tsx';
import Hero from './sections/Hero.tsx';
import Logos from './sections/Logos.tsx';
import Features from './sections/Features.tsx';
import Testimonials from './sections/Testimonials.tsx';
import Pricing from './sections/Pricing.tsx';
import Footer from './components/Footer.tsx';
import SignUpModal from './components/SignUpModal.tsx';

const App = () => {
    useScrollReveal();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const styles = {
        main: {
            display: 'flex',
            flexDirection: 'column',
        } as React.CSSProperties
    };
    return (
        <main style={styles.main}>
            <Header onBuildNowClick={handleOpenModal} />
            <Hero onBuildNowClick={handleOpenModal} />
            <Logos />
            <Features />
            <Testimonials />
            <Pricing />
            <Footer />
            <SignUpModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </main>
    );
};

export default App;
