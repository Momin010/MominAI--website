import React, { useState } from 'react';

const Logos = () => {
    const logos = ["Stripe", "Vercel", "Netlify", "GitHub", "Figma", "Notion"];
    const [isHovered, setIsHovered] = useState(false);
    
    const styles = {
        section: {
            padding: '2rem 0',
            textAlign: 'center',
            overflow: 'hidden',
        } as React.CSSProperties,
        p: {
            color: 'var(--gray)',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.8rem',
        } as React.CSSProperties,
        scroller: {
            display: 'flex',
            width: 'max-content',
            animation: 'scroll 30s linear infinite',
            animationPlayState: isHovered ? 'paused' : 'running',
        } as React.CSSProperties,
        logo: {
            color: 'var(--gray)',
            fontSize: '1.5rem',
            margin: '0 2rem',
            whiteSpace: 'nowrap',
            fontFamily: 'monospace',
        },
        mask: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, var(--background) 0%, transparent 10%, transparent 90%, var(--background) 100%)',
            pointerEvents: 'none',
        } as React.CSSProperties
    };
    
    return (
        <section style={styles.section} className="reveal">
            <p style={styles.p}>Trusted by the next generation of builders</p>
            <div 
                style={{overflow: 'hidden', position: 'relative'}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div style={styles.scroller}>
                    {[...logos, ...logos].map((logo, i) => ( // Duplicate for seamless scroll
                        <div key={i} style={styles.logo}>{logo}</div>
                    ))}
                </div>
                <div style={styles.mask}></div>
            </div>
            <style>{`
                @keyframes scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
};

export default Logos;