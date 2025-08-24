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
    
    return (
        <div ref={cardRef} className={`relative h-full bg-[var(--background-secondary)] p-8 rounded-xl border text-left ${plan.popular ? 'border-[var(--accent)]' : 'border-[var(--border-color)]'}`} style={{willChange: 'transform'}}>
            <div style={{pointerEvents: 'none'}}>
                {plan.popular && <div className="absolute -top-4 right-6 bg-[var(--accent)] text-[var(--foreground)] px-3 py-1 rounded-full text-xs font-semibold">Most Popular</div>}
                <h3 className="text-xl mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold mb-2">{plan.price}<span className="text-base text-[var(--gray)] font-normal">{plan.price !== 'Custom' && '/mo'}</span></p>
                <p className="text-[var(--gray)] mb-8 min-h-[40px]">{plan.description}</p>
                <ul className="list-none p-0 m-0 mb-8 flex flex-col gap-4">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 feature-item" style={{ animationDelay: `${i * 100}ms` }}><CheckIcon /><span>{feature}</span></li>
                    ))}
                </ul>
            </div>
            <button className={`w-full p-3 rounded-lg border-none cursor-pointer font-semibold text-base transition-all duration-200 ${plan.popular ? 'bg-[var(--accent)] text-[var(--foreground)]' : 'bg-[var(--foreground)] text-[var(--background)]'}`}>
                Get Started
            </button>
        </div>
    );
};

const Pricing = () => {
    const plans = [
        { name: 'Hobby', price: '$0', description: 'For personal projects & experiments.', features: ['1 User', '1 App Deployment', 'Community Support'], popular: false },
        { name: 'Pro', price: '$20', description: 'For professional developers & teams.', features: ['5 Users', 'Unlimited App Deployments', 'Email Support', 'Advanced Analytics'], popular: true },
        { name: 'Enterprise', price: 'Custom', description: 'For large-scale applications.', features: ['Unlimited Users', 'Dedicated Infrastructure', '24/7 Priority Support', 'Custom Integrations'], popular: false },
    ];
    
    return (
        <section id="pricing" className="reveal py-24 px-8 text-center">
             <style>{`
                .reveal.visible .feature-item {
                    opacity: 0;
                    animation: fadeInUp 0.5s ease-out forwards;
                }
            `}</style>
            <h2 className="text-[clamp(2rem,5vw,2.5rem)] mb-4">Fair, transparent pricing</h2>
            <p className="text-[var(--gray)] max-w-2xl mx-auto mb-16">Choose the plan that's right for you. Start for free, and scale to millions.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">
                {plans.map((plan, index) => (
                    <PricingCard key={index} plan={plan} />
                ))}
            </div>
        </section>
    );
}

export default Pricing;
