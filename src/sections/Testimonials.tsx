import React from 'react';

const Testimonials = () => {
    const testimonials = [
        { quote: "This is witchcraft. I built and deployed a full-stack SaaS app in an afternoon. Mind blown.", name: "Jane Doe", company: "CEO at StartupX" },
        { quote: "The development velocity we've achieved is unparalleled. Our team is shipping features 10x faster.", name: "John Smith", company: "CTO at InnovateCorp" },
        { quote: "I was skeptical about AI code generation, but the quality is production-ready. It's a game changer.", name: "Emily White", company: "Lead Engineer at TechGiant" }
    ];

    const styles = {
        section: { padding: '6rem 2rem', backgroundColor: 'transparent' } as React.CSSProperties,
        h2: { textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '4rem' } as React.CSSProperties,
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        card: {
            background: 'var(--background)',
            padding: '2rem',
            borderRadius: '0.75rem',
            border: '1px solid var(--border-color)',
        },
        quote: {
            fontSize: '1.1rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
            fontStyle: 'italic',
        },
        author: { display: 'flex', flexDirection: 'column' } as React.CSSProperties,
        name: { fontWeight: 600 },
        company: { color: 'var(--gray)', fontSize: '0.9rem' },
    };
    
    return (
        <section id="testimonials" style={styles.section} className="reveal">
             <style>{`
                @media (max-width: 768px) {
                    #testimonials {
                        padding: 4rem 1rem;
                    }
                }
            `}</style>
            <h2 style={styles.h2}>Loved by the world's most innovative teams</h2>
            <div style={styles.grid}>
                {testimonials.map((t, i) => (
                    <div key={i} style={styles.card}>
                        <p style={styles.quote}>"{t.quote}"</p>
                        <div style={styles.author}>
                            <span style={styles.name}>{t.name}</span>
                            <span style={styles.company}>{t.company}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;