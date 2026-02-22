'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

const MILESTONES = [
    { age: 16, title: 'Freedom & Driving', desc: 'In many places, this represents the first taste of true independence.' },
    { age: 18, title: 'Legal Adulthood', desc: 'The threshold to adult rights, responsibilities, and new horizons.' },
    { age: 21, title: 'Full Rites of Passage', desc: 'Often celebrated as the completion of the transition into early adulthood.' },
    { age: 30, title: 'The Decade of Impact', desc: 'Turning 30 is often seen as entering a phase of deeper stability and focus.' },
    { age: 40, title: 'Prime Time', desc: 'A mid-life milestone where experience and energy often reach a perfect balance.' },
    { age: 50, title: 'Golden Era', desc: 'Celebrating a half-century of life experiences and wisdom.' }
];

export default function AgeMilestones() {
    const [age, setAge] = useState<number>(25);

    const nextMilestone = MILESTONES.find(m => m.age > age);
    const yearsToNext = nextMilestone ? nextMilestone.age - age : null;

    const faqs = [
        {
            question: "Why focus on milestones?",
            answer: "Milestones help us look forward to the future with excitement rather than anxiety, seeing each age as a new chapter with its own unique advantages."
        },
        {
            question: "What if I missed a milestone?",
            answer: "It's never too late to celebrate or achieve what a milestone represents. Growth isn't restricted by a calendar."
        },
        {
            question: "Is age just a number?",
            answer: "While 'age is just a number', our society often uses it to signal new opportunities. Use these numbers as catalysts for reflection, not as limits."
        }
    ];

    const calc = calculators.find(c => c.href === '/age-milestones');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Age Milestone Reminder'}
                description={calc?.description || 'Look ahead to your next big life chapter.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <label style={{ display: 'block', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>Your Current Age</label>
                        <input type="number" className="input" value={age} onChange={(e) => setAge(parseFloat(e.target.value) || 0)} style={{ width: '120px', fontSize: '2rem', textAlign: 'center' }} />
                    </div>

                    {nextMilestone ? (
                        <div style={{
                            background: 'rgba(30, 41, 59, 0.4)',
                            padding: '2.5rem',
                            borderRadius: '1.5rem',
                            border: '1px solid rgba(37, 99, 235, 0.2)',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Coming up in {yearsToNext} years</div>
                            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: '1rem' }}>{nextMilestone.age}: {nextMilestone.title}</div>
                            <p style={{ color: 'var(--color-text-tertiary)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>{nextMilestone.desc}</p>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-tertiary)' }}>
                            You've passed the standard major milestones. Every year now is a legendary accomplishment!
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                        {MILESTONES.map((m, i) => (
                            <div key={i} style={{
                                padding: '1rem',
                                background: age >= m.age ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)',
                                border: `1px solid ${age >= m.age ? '#10b981' : 'rgba(255,255,255,0.05)'}`,
                                borderRadius: '0.75rem',
                                textAlign: 'center',
                                opacity: age >= m.age ? 0.6 : 1
                            }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: age >= m.age ? '#10b981' : '#fff' }}>{m.age}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)' }}>{m.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
