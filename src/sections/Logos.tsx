import React, { useState } from 'react';

const Logos = () => {
    const logos = ["Stripe", "Vercel", "Netlify", "GitHub", "Figma", "Notion"];
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <section className="reveal py-8 sm:py-8 text-center overflow-hidden">
            <p className="text-[var(--gray)] mb-8 uppercase tracking-widest text-xs px-4">
                Trusted by the next generation of builders
            </p>
            <div 
                className="relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div 
                    className="flex w-max"
                    style={{ 
                        animation: 'scroll 30s linear infinite',
                        animationPlayState: isHovered ? 'paused' : 'running',
                     }}
                >
                    {[...logos, ...logos].map((logo, i) => (
                        <div key={i} className="text-[var(--gray)] text-2xl mx-8 whitespace-nowrap font-mono">{logo}</div>
                    ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-transparent to-[var(--background)] pointer-events-none"></div>
            </div>
        </section>
    );
};

export default Logos;
