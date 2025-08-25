import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal.ts';
import Header from './Header.tsx';
import Hero from '../sections/Hero.tsx';
import Logos from '../sections/Logos.tsx';
import Features from '../sections/Features.tsx';
import Testimonials from '../sections/Testimonials.tsx';
import Pricing from '../sections/Pricing.tsx';
import Footer from './Footer.tsx';
import SignUpModal from './SignUpModal.tsx';

interface LandingPageProps {
    onLoginSuccess: () => void;
}

const LandingPage = ({ onLoginSuccess }: LandingPageProps) => {
    useScrollReveal();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLoginSuccess = () => {
        setIsModalOpen(false);
        onLoginSuccess();
    };

    return (
        <>
            <Header 
                onBuildNowClick={() => setIsModalOpen(true)} 
                onLoginClick={() => setIsModalOpen(true)} 
            />
            <SignUpModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleLoginSuccess}
            />
            
            <main>
                <Hero onBuildNowClick={() => setIsModalOpen(true)} />
                <Logos />
                <Features />
                <Testimonials />
                <Pricing onHobbyClick={() => setIsModalOpen(true)} />
            </main>
            
            <Footer />
        </>
    );
};

export default LandingPage;