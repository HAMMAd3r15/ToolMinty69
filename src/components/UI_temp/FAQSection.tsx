import React from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    items: FAQItem[];
}

export default function FAQSection({ items }: FAQSectionProps) {
    return (
        <section style={{ marginTop: '4rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {items.map((item, index) => (
                    <details
                        key={index}
                        style={{
                            backgroundColor: 'var(--color-surface)',
                            borderRadius: '0.5rem',
                            padding: '1rem',
                            border: '1px solid var(--color-border)'
                        }}
                    >
                        <summary style={{
                            fontWeight: 600,
                            cursor: 'pointer',
                            color: 'var(--color-primary)',
                            listStyle: 'none' // Attempt to hide default marker, might need css
                        }}>
                            {item.question}
                        </summary>
                        <p style={{ marginTop: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                            {item.answer}
                        </p>
                    </details>
                ))}
            </div>
        </section>
    );
}
