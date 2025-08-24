import React from 'react';

const Contact = () => {
    return (
        <section 
            id="contact-section" 
            className="min-h-[80vh] flex flex-col justify-center items-center text-center py-24 px-8"
            style={{ animation: 'fadeInUp 1s ease-out' }}
        >
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold mb-4">Contact Our Sales Team</h1>
            <p className="text-[clamp(1rem,2vw,1.25rem)] text-[var(--gray)] max-w-2xl mb-12">
                Our team is here to help you find the perfect solution for your needs. Reach out to us via phone or email, and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col gap-6 text-lg bg-[var(--background-secondary)] p-8 sm:p-12 rounded-2xl border border-[var(--border-color)]">
                <div style={{ animation: 'fadeInUp 0.5s ease-out 0.2s backwards' }}>
                    <strong>Phone:</strong> 
                    <a href="tel:+358449291241" className="text-[var(--foreground)] no-underline transition-colors duration-200 hover:text-[var(--accent)] inline-block ml-3">
                        +358 449291241
                    </a>
                </div>
                <div style={{ animation: 'fadeInUp 0.5s ease-out 0.4s backwards' }}>
                    <strong>Email:</strong> 
                    <a href="mailto:momin.aldahdooh@gmail.com" className="text-[var(--foreground)] no-underline transition-colors duration-200 hover:text-[var(--accent)] inline-block ml-3">
                        momin.aldahdooh@gmail.com
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
