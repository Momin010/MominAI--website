import React from 'react';

const Testimonials = () => {
    const testimonials = [
        { quote: "This is witchcraft. I built and deployed a full-stack SaaS app in an afternoon. Mind blown.", name: "Jane Doe", company: "CEO at StartupX" },
        { quote: "The development velocity we've achieved is unparalleled. Our team is shipping features 10x faster.", name: "John Smith", company: "CTO at InnovateCorp" },
        { quote: "I was skeptical about AI code generation, but the quality is production-ready. It's a game changer.", name: "Emily White", company: "Lead Engineer at TechGiant" }
    ];

    return (
        <section id="testimonials" className="reveal py-24 px-8 bg-transparent">
            <h2 className="text-center text-[clamp(2rem,5vw,2.5rem)] mb-16">Loved by the world's most innovative teams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {testimonials.map((t, i) => (
                    <div key={i} className="bg-[var(--background)] p-8 rounded-xl border border-[var(--border-color)]">
                        <p className="text-lg leading-relaxed mb-6 italic">"{t.quote}"</p>
                        <div className="flex flex-col">
                            <span className="font-semibold">{t.name}</span>
                            <span className="text-[var(--gray)] text-sm">{t.company}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
