import React, { useState } from 'react';
import { CodeIcon, DeployIcon, ScaleIcon } from '../components/icons.tsx';

const Features = () => {
    const features = [
        { icon: <CodeIcon />, title: "Instant Code Generation", description: "Describe your app in plain English and watch our AI write clean, efficient code in real-time." },
        { icon: <DeployIcon />, title: "One-Click Deployment", description: "Go from concept to a globally deployed application on our serverless infrastructure with a single click." },
        { icon: <ScaleIcon />, title: "Infinite Scalability", description: "Built on a robust, auto-scaling backend, your application is ready for millions of users from day one." },
    ];
    
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const styles = {
        section: {
            padding: '6rem 2rem',
            textAlign: 'center',
        } as React.CSSProperties,
        h2: {
            fontSize: '2.5rem',
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
        card: (isHovered) => ({
            background: 'rgba(17, 17, 17, 0.5)',
            padding: '2rem',
            borderRadius: '0.75rem',
            border: '1px solid var(--border-color)',
            textAlign: 'left',
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.3s ease, border-color 0.3s ease',
            transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
            borderColor: isHovered ? 'var(--accent)' : 'var(--border-color)',
        } as React.CSSProperties),
        glow: (isHovered) => ({
             position: 'absolute',
             top: '-50%', left: '-50%',
             width: '200%', height: '200%',
             background: `radial-gradient(circle, var(--accent-glow) 0%, transparent 40%)`,
             opacity: isHovered ? 0.5 : 0,
             transition: 'opacity 0.4s ease',
             animation: 'rotateGlow 5s linear infinite',
        } as React.CSSProperties),
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
        <section id="features" style={styles.section} className="reveal">
            <h2 style={styles.h2}>Develop at the speed of thought.</h2>
            <p style={styles.p}>Our platform is engineered for velocity. Stop writing boilerplate and start focusing on what makes your application unique.</p>
            <div style={styles.grid}>
                {features.map((feature, index) => (
                    <div 
                        key={index} 
                        style={styles.card(hoveredIndex === index)} 
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div style={styles.glow(hoveredIndex === index)}></div>
                        <div style={{position: 'relative', zIndex: 2}}>
                           <div style={styles.icon}>{feature.icon}</div>
                           <h3 style={styles.h3}>{feature.title}</h3>
                           <p style={styles.cardP}>{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <style>{`
                 @keyframes rotateGlow {
                     from { transform: rotate(0deg); }
                     to { transform: rotate(360deg); }
                 }
            `}</style>
        </section>
    );
};

export default Features;
