import React, { useEffect, useRef } from 'react';

const Hero = ({ onBuildNowClick }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!sectionRef.current) return;
            const { clientX, clientY, currentTarget } = e;
            const { left, top, width, height } = currentTarget.getBoundingClientRect();
            const x = (clientX - left) / width;
            const y = (clientY - top) / height;
            const moveX = (x - 0.5) * 40;
            const moveY = (y - 0.5) * 40;
            sectionRef.current.style.setProperty('--move-x', `${moveX}px`);
            sectionRef.current.style.setProperty('--move-y', `${moveY}px`);
        };
        
        const currentSection = sectionRef.current;
        if (currentSection) {
            currentSection.addEventListener('mousemove', handleMouseMove);
        }
        
        return () => {
            if (currentSection) {
                currentSection.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);


    const styles = {
        section: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 1rem',
            position: 'relative',
        } as React.CSSProperties,
        gridBackground: {
            position: 'absolute',
            top: '-10%', left: '-10%', width: '120%', height: '120%',
            background: `
                linear-gradient(90deg, var(--gray-dark) 1px, transparent 1px),
                linear-gradient(0deg, var(--gray-dark) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)',
            zIndex: -1,
            opacity: 0.2,
            transition: 'transform 0.1s linear',
            transform: 'translate(var(--move-x, 0), var(--move-y, 0))',
        } as React.CSSProperties,
        h1: {
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 800,
            marginBottom: '1rem',
            background: 'linear-gradient(90deg, #fff, #aaa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'fadeInUp 1s ease-out',
        },
        p: {
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--gray)',
            maxWidth: '600px',
            marginBottom: '2rem',
            animation: 'fadeInUp 1s ease-out 0.2s',
            animationFillMode: 'backwards',
        },
        buttons: {
            display: 'flex',
            gap: '1rem',
            animation: 'fadeInUp 1s ease-out 0.4s',
            animationFillMode: 'backwards',
        },
        button: {
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'all 0.2s ease',
        },
        buildButton: {
            backgroundColor: 'var(--foreground)',
            color: 'var(--background)',
        },
        contactButton: {
            backgroundColor: 'transparent',
            color: 'var(--foreground)',
            border: `1px solid var(--border-color)`,
        }
    };

    return (
        <section ref={sectionRef} style={styles.section}>
            <div style={styles.gridBackground}></div>
            <h1 style={styles.h1}>Conceive. Generate. Deploy.</h1>
            <p style={styles.p}>The AI platform for building and deploying production-grade applications and websites in seconds. Go from idea to live URL instantly.</p>
            <div style={styles.buttons}>
                <button onClick={onBuildNowClick} style={{...styles.button, ...styles.buildButton}} onMouseOver={e => e.currentTarget.style.transform='scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform='scale(1)'}>Build Now</button>
                <button style={{...styles.button, ...styles.contactButton}} onMouseOver={e => e.currentTarget.style.backgroundColor='var(--gray-dark)'} onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>Contact Sales</button>
            </div>
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
};

export default Hero;