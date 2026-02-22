'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ResultCard from '@/components/UI/ResultCard';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function HabitStreakCounter() {
    const [days, setDays] = useState<number>(30);
    const [consistency, setConsistency] = useState<number>(80);

    const lostDays = Math.round(days * (1 - (consistency / 100)));
    const actualDays = days - lostDays;

    const faqs = [
        {
            question: "What is the 21/90 rule?",
            answer: "It's a popular theory that it takes 21 days to build a habit and 90 days to build a lifestyle. Consistency is key during these periods."
        },
        {
            question: "How do I deal with a broken streak?",
            answer: "Don't 'double down' on missing. The most important rule is: Never miss twice. Getting back on track immediately prevents a slip-up from becoming a new habit."
        },
        {
            question: "Why does consistency matter more than intensity?",
            answer: "Small actions performed daily build neural pathways more effectively than massive occasional efforts. It's the 'compound effect' of habit building."
        }
    ];

    const calc = calculators.find(c => c.href === '/habit-streak');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Habit Streak Counter'}
                description={calc?.description || 'Visualize how many days you\'ve stuck to your habits.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Period (Days)</label>
                        <input type="number" className="input" value={days} onChange={(e) => setDays(parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Estimated Consistency (%)</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={consistency}
                            onChange={(e) => setConsistency(parseFloat(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                        />
                        <div style={{ textAlign: 'center', marginTop: '0.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{consistency}% Consistent</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <ResultCard title="Days Won" value={`${actualDays} Days`} color="primary" highlight />
                        <ResultCard title="Days Missed" value={`${lostDays} Days`} color="accent" />
                    </div>

                    <div style={{
                        marginTop: '1rem',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                    }}>
                        {[...Array(Math.min(days, 100))].map((_, i) => (
                            <div key={i} style={{
                                width: '14px',
                                height: '14px',
                                borderRadius: '3px',
                                background: i < actualDays ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                                opacity: i < actualDays ? 1 : 0.3
                            }} />
                        ))}
                    </div>
                    {days > 100 && <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>Showing first 100 days visualization</p>}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
