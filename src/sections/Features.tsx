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

const FeatureCard = ({ feature }: FeatureCardProps) => {
    const cardRef = useTilt();

    const styles = {
        card: {
            background: 'rgba(17, 17, 17, 0.5)',
            padding: '2rem',
            borderRadius: '0.75rem',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            position: 'relative',
            overflow: 'hidden',
            willChange: 'transform' // performance optimization
        } as React.CSSProperties,
        glow: {
             position: 'absolute',
             top: '-50%', left: '-50%',
             width: '200%', height: '200%',
             background: `radial-gradient(circle, var(--accent-glow) 0%, transparent 40%)`,
             opacity: 0,
             transition: 'opacity 0.4s ease',
             animation: 'rotateGlow 5s linear infinite',
        } as React.CSSProperties,
        icon: {
            marginBottom: '1rem',
            color: 'var(--accent)',
        },
        h3: {
            fontSize: '1.25rem',
            marginBottom: '0.5rem',
        },
        cardP: {
            color: 'var(--gray)',
            lineHeight: 1.6,
        },
    };

    return (
        <div 
            ref={cardRef}
            style={styles.card} 
            className="feature-card"
        >
            <div style={styles.glow} className="card-glow"></div>
            <div style={{position: 'relative', zIndex: 2, pointerEvents: 'none'}}>
               <div style={styles.icon}>{feature.icon}</div>
               <h3 style={styles.h3}>{feature.title}</h3>
               <p style={styles.cardP}>{feature.description}</p>
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
    
    const styles = {
        section: {
            padding: '6rem 2rem',
            textAlign: 'center',
        } as React.CSSProperties,
        h2: {
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            marginBottom: '1rem',
        },
        p: {
            color: 'var(--gray)',
            maxWidth: '600px',
            margin: '0 auto 4rem auto',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
    };

    return (
        <section id="features" style={styles.section} className="reveal">
            <h2 style={styles.h2}>Develop at the speed of thought.</h2>
            <p style={styles.p}>Our platform is engineered for velocity. Stop writing boilerplate and start focusing on what makes your application unique.</p>
            <div style={styles.grid}>
                {features.map((feature, index) => (
                    <FeatureCard key={index} feature={feature} />
                ))}
            </div>
            <style>{`
                 @keyframes rotateGlow {
                     from { transform: rotate(0deg); }
                     to { transform: rotate(360deg); }
                 }
                 .feature-card:hover > .card-glow {
                     opacity: 0.5;
                 }
                 .feature-card:hover {
                     border-color: var(--accent);
                 }
                 @media (max-width: 768px) {
                    #features {
                        padding: 4rem 1rem;
                    }
                 }
            `}</style>
        </section>
    );
};

export default Features;
