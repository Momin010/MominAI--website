

import React, { useEffect, useRef } from 'react';

interface HeroProps {
    onBuildNowClick: () => void;
    onContactSalesClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBuildNowClick, onContactSalesClick }) => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!sectionRef.current) return;
            const { clientX, clientY } = e;
            const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
            const x = (clientX - left) / width;
            const y = (clientY - top) / height;
            const moveX = (x - 0.5) * 40;
            const moveY = (y - 0.5) * 40;
            sectionRef.current.style.setProperty('--move-x', `${moveX}px`);
            sectionRef.current.style.setProperty('--move-y', `${moveY}px`);
        };
        
        document.addEventListener('mousemove', handleMouseMove as EventListener);
        
        return () => {
            document.removeEventListener('mousemove', handleMouseMove as EventListener);
        };
    }, []);

    return (
        <section 
            ref={sectionRef} 
            className="min-h-screen flex flex-col justify-center items-center text-center p-8 relative"
        >
            <div 
                className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[linear-gradient(90deg,var(--gray-dark)_1px,transparent_1px),linear-gradient(0deg,var(--gray-dark)_1px,transparent_1px)] [background-size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] z-[-1] opacity-20 transition-transform duration-100 ease-linear"
                style={{ transform: 'translate(var(--move-x, 0), var(--move-y, 0))' }}
            ></div>
            <h1 
                className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                style={{ animation: 'fadeInUp 1s ease-out' }}
            >
                Conceive. Generate. Deploy.
            </h1>
            <p 
                className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--gray)] max-w-2xl mb-8"
                style={{ animation: 'fadeInUp 1s ease-out 0.2s backwards' }}
            >
                The AI platform for building and deploying production-grade applications and websites in seconds. Go from idea to live URL instantly.
            </p>
            <div 
                className="flex flex-col sm:flex-row gap-4"
                style={{ animation: 'fadeInUp 1s ease-out 0.4s backwards' }}
            >
                <button onClick={onBuildNowClick} className="px-6 py-3 rounded-lg border-none font-semibold text-base transition-all duration-200 bg-[var(--accent)] text-[var(--foreground)] hover:brightness-125 hover:scale-105 active:scale-100">
                    Start Building Now
                </button>
                <button onClick={onContactSalesClick} className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 bg-transparent text-[var(--foreground)] border border-[var(--border-color)] no-underline hover:bg-[var(--gray-dark)] hover:scale-105 active:scale-100">
                    Contact Sales
                </button>
            </div>
        </section>
    );
};

export default Hero;