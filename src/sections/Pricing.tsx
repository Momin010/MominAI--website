import React from 'react';
import { CheckIcon } from '../components/icons.tsx';
import { useTilt } from '../hooks/useTilt.ts';

interface PricingCardProps {
    plan: {
        name: string;
        price: string;
        description: string;
        features: string[];
        popular: boolean;
    };
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
    const cardRef = useTilt({ max: 10 });
    
    const styles = {
        card: {
            background: 'var(--background-secondary)',
            padding: '2rem',
            borderRadius: '0.75rem',
            border: '1px solid',
            borderColor: plan.popular ? 'var(--accent)' : 'var(--border-color)',
            textAlign: 'left',
            position: 'relative',
            height: '100%',
            willChange: 'transform'
        } as React.CSSProperties,
        popularBadge: {
            position: 'absolute',
            top: '-1rem',
            right: '1.5rem',
            background: 'var(--accent)',
            color: 'var(--foreground)',
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.8rem',
            fontWeight: 600,
        } as React.CSSProperties,
        planName: { fontSize: '1.25rem', marginBottom: '0.5rem' },
        planPrice: { fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' },
        planDescription: { color: 'var(--gray)', marginBottom: '2rem', minHeight: '40px' },
        featureList: { listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' } as React.CSSProperties,
        featureItem: { display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0, animation: 'fadeInUp 0.5s ease-out forwards' } as React.CSSProperties,
        button: (isPopular: boolean): React.CSSProperties => ({
            width: '100%',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '1rem',
            transition: 'all 0.2s ease',
            backgroundColor: isPopular ? 'var(--accent)' : 'var(--foreground)',
            color: isPopular ? 'var(--foreground)' : 'var(--background)',
        })
    };
    
    return (
        <div ref={cardRef} style={styles.card}>
            <div style={{pointerEvents: 'none'}}>
                {plan.popular && <div style={styles.popularBadge}>Most Popular</div>}
                <h3 style={styles.planName}>{plan.name}</h3>
                <p style={styles.planPrice}>{plan.price}<span style={{fontSize: '1rem', color: 'var(--gray)'}}>{plan.price !== 'Custom' && '/mo'}</span></p>
                <p style={styles.planDescription}>{plan.description}</p>
                <ul style={styles.featureList}>
                    {plan.features.map((feature, i) => (
                        <li key={i} style={{...styles.featureItem, animationDelay: `${i * 100}ms`}}><CheckIcon /><span>{feature}</span></li>
                    ))}
                </ul>
            </div>
            <button style={styles.button(plan.popular)}>Get Started</button>
        </div>
    );
};

const Pricing = () => {
    const plans = [
        { name: 'Hobby', price: '$0', description: 'For personal projects & experiments.', features: ['1 User', '1 App Deployment', 'Community Support'], popular: false },
        { name: 'Pro', price: '$20', description: 'For professional developers & teams.', features: ['5 Users', 'Unlimited App Deployments', 'Email Support', 'Advanced Analytics'], popular: true },
        { name: 'Enterprise', price: 'Custom', description: 'For large-scale applications.', features: ['Unlimited Users', 'Dedicated Infrastructure', '24/7 Priority Support', 'Custom Integrations'], popular: false },
    ];
    
    const styles = {
        section: { padding: '6rem 2rem', textAlign: 'center' } as React.CSSProperties,
        h2: { fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '1rem' },
        p: { color: 'var(--gray)', maxWidth: '600px', margin: '0 auto 4rem auto' },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto',
            alignItems: 'stretch',
        },
    };

    return (
        <section id="pricing" style={styles.section} className="reveal">
            <h2 style={styles.h2}>Fair, transparent pricing</h2>
            <p style={styles.p}>Choose the plan that's right for you. Start for free, and scale to millions.</p>
            <div style={styles.grid}>
                {plans.map((plan, index) => (
                    <PricingCard key={index} plan={plan} />
                ))}
            </div>
             <style>{`
                .reveal.visible .feature-item {
                    opacity: 0;
                    animation: fadeInUp 0.5s ease-out forwards;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                 @media (max-width: 768px) {
                    #pricing {
                        padding: 4rem 1rem;
                    }
                 }
            `}</style>
        </section>
    );
}

export default Pricing;