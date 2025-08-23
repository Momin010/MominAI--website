import React from 'react';

const Contact = () => {
    const styles = {
        section: {
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '6rem 2rem',
            animation: 'fadeInUp 1s ease-out'
        } as React.CSSProperties,
        h1: {
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            marginBottom: '1rem',
        },
        p: {
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--gray)',
            maxWidth: '600px',
            marginBottom: '3rem',
        },
        contactInfo: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            fontSize: '1.2rem',
            background: 'var(--background-secondary)',
            padding: '2rem 3rem',
            borderRadius: '1rem',
            border: '1px solid var(--border-color)',
        } as React.CSSProperties,
        contactLink: {
            color: 'var(--foreground)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            display: 'inline-block',
            marginLeft: '0.75rem'
        },
        contactRow: {
             opacity: 0, 
             animation: 'fadeInUp 0.5s ease-out forwards' 
        } as React.CSSProperties
    };

    return (
        <section style={styles.section}>
            <h1 style={styles.h1}>Contact Our Sales Team</h1>
            <p style={styles.p}>
                Our team is here to help you find the perfect solution for your needs. Reach out to us via phone or email, and we'll get back to you as soon as possible.
            </p>
            <div style={styles.contactInfo}>
                <div style={{...styles.contactRow, animationDelay: '0.2s'}}>
                    <strong>Phone:</strong> 
                    <a href="tel:+358449291241" style={styles.contactLink} onMouseOver={e => e.currentTarget.style.color='var(--accent)'} onMouseOut={e => e.currentTarget.style.color='var(--foreground)'}>
                        +358 449291241
                    </a>
                </div>
                <div style={{...styles.contactRow, animationDelay: '0.4s'}}>
                    <strong>Email:</strong> 
                    <a href="mailto:momin.aldahdooh@gmail.com" style={styles.contactLink} onMouseOver={e => e.currentTarget.style.color='var(--accent)'} onMouseOut={e => e.currentTarget.style.color='var(--foreground)'}>
                        momin.aldahdooh@gmail.com
                    </a>
                </div>
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

export default Contact;
