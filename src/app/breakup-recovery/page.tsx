'use client';

import { useState, useEffect } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ResultCard from '@/components/UI/ResultCard';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function BreakupCountdown() {
    const [breakupDate, setBreakupDate] = useState<string>('');
    const [daysPassed, setDaysPassed] = useState<number | null>(null);

    const calculateDays = () => {
        if (!breakupDate) return;
        const start = new Date(breakupDate);
        const today = new Date();
        const diff = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        setDaysPassed(diff >= 0 ? diff : 0);
    };

    const faqs = [
        {
            question: "Why track days after a breakup?",
            answer: "The 'No Contact' rule is a popular method for healing. Tracking your progress helps you see that you are surviving and moving forward one day at a time."
        },
        {
            question: "When does it get easier?",
            answer: "Healing isn't linear. Some days will be harder than others, but research suggests that most people start feeling a significant shift after 3 months (90 days) of focus on self-care."
        },
        {
            question: "What should I do during this time?",
            answer: "Focus on re-discovering yourself. Start a new hobby, spend time with friends, and prioritize your mental and physical health. You are your own best project."
        }
    ];

    const calc = calculators.find(c => c.href === '/breakup-recovery');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Breakup Recovery Tracker'}
                description={calc?.description || 'One day at a time. Track your healing journey.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>When was your last day together?</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input type="date" className="input" value={breakupDate} onChange={(e) => setBreakupDate(e.target.value)} style={{ flex: 1 }} />
                            <button onClick={calculateDays} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Track Progress</button>
                        </div>
                    </div>

                    {daysPassed !== null && (
                        <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease-out' }}>
                            <ResultCard
                                title="Strength Since Day 1"
                                value={`${daysPassed} Days Strong`}
                                highlight
                                color="primary"
                            />
                            <div style={{ marginTop: '2rem', color: 'var(--color-text-tertiary)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                {daysPassed < 30 ? "The first month is the hardest. You're doing brave work." :
                                    daysPassed < 90 ? "You're building momentum. Keep focusing on you." :
                                        "Look at that progress! You have come so far."}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
