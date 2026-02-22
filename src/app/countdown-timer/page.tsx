'use client';

import { useState, useEffect } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function CountdownTimer() {
    const [targetDate, setTargetDate] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

    useEffect(() => {
        if (!targetDate) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(targetDate).getTime();
            const distance = target - now;

            if (distance < 0) {
                setTimeLeft(null);
                clearInterval(interval);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const faqs = [
        {
            question: "How do I set the time for the countdown?",
            answer: "Most browsers support a date-time picker. Click the input field to select the exact day and time you want to count down to."
        },
        {
            question: "Can I use this for my wedding or vacation?",
            answer: "Absolutely! This tool is perfect for tracking any future event like holidays, birthdays, or project deadlines."
        },
        {
            question: "Will the timer keep running if I close the tab?",
            answer: "The timer runs live while the page is open. If you close the tab and return later, it will automatically recalculate the time remaining from the current moment."
        }
    ];

    const calc = calculators.find(c => c.href === '/countdown-timer');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Countdown Timer Tool'}
                description={calc?.description || 'Create a live countdown to any future date.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 600 }}>
                            Target Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            className="input"
                            value={targetDate}
                            onChange={(e) => {
                                // Ensure the selected date is in the future
                                const selectedDate = new Date(e.target.value);
                                const now = new Date();
                                if (selectedDate >= now) {
                                    setTargetDate(e.target.value);
                                }
                            }}
                            style={{ width: '100%', maxWidth: '350px', margin: '0 auto', display: 'block', textAlign: 'center', appearance: 'auto' }}
                        />
                    </div>

                    {timeLeft && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                            gap: '1rem',
                            marginTop: '1rem'
                        }}>
                            <ResultCard title="Days" value={timeLeft.days} color="primary" highlight />
                            <ResultCard title="Hours" value={timeLeft.hours} color="secondary" />
                            <ResultCard title="Minutes" value={timeLeft.minutes} color="accent" />
                            <ResultCard title="Seconds" value={timeLeft.seconds} color="success" />
                        </div>
                    )}

                    {!timeLeft && targetDate && (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.25rem' }}>
                            ✨ The event has arrived or the date is in the past!
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
