import React from 'react';
import { CodeIcon, DeployIcon, ScaleIcon } from '../components/icons.tsx';
import { useTilt } from '../hooks/useTilt.ts';

interface FeatureCardProps {
    feature: {
        icon: React.ReactNode;
        title: string;
        description: string;
    };
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
    const cardRef = useTilt();

    return (
        <div 
            ref={cardRef}
            className="group relative bg-[rgba(17,17,17,0.5)] p-8 rounded-xl border border-[var(--border-color)] text-left overflow-hidden hover:border-[var(--accent)]"
            style={{ willChange: 'transform' }}
        >
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,var(--accent-glow)_0%,transparent_40%)] opacity-0 group-hover:opacity-50 transition-opacity duration-400 ease-in-out" style={{ animation: 'rotateGlow 5s linear infinite' }}></div>
            <div className="relative z-[2] pointer-events-none">
               <div className="mb-4 text-[var(--accent)]">{feature.icon}</div>
               <h3 className="text-xl mb-2">{feature.title}</h3>
               <p className="text-[var(--gray)] leading-relaxed">{feature.description}</p>
            </div>
        </div>
    );
};


const Features = () => {
    const features = [
        { icon: <CodeIcon />, title: "Instant Code Generation", description: "Describe your app in plain English and watch our AI write clean, efficient code in real-time." },
        { icon: <DeployIcon />, title: "One-Click Deployment", description: "Go from concept to a globally deployed application on our serverless infrastructure with a single click." },
        { icon: <ScaleIcon />, title: "Infinite Scalability", description: "Built on a robust, auto-scaling backend, your application is ready for millions of users from day one." },
    ];
    
    return (
        <section id="features" className="reveal py-24 px-8 text-center">
            <h2 className="text-[clamp(2rem,5vw,2.5rem)] mb-4">Develop at the speed of thought.</h2>
            <p className="text-[var(--gray)] max-w-2xl mx-auto mb-16">Our platform is engineered for velocity. Stop writing boilerplate and start focusing on what makes your application unique.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} />
                ))}
            </div>
        </section>
    );
};

export default Features;
