'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function HalfBirthdayCalculator() {
    const [birthDate, setBirthDate] = useState<string>('');

    const calculateHalfBirthday = () => {
        if (!birthDate) return null;

        const birth = new Date(birthDate);
        if (isNaN(birth.getTime())) return null;

        const half = new Date(birth);
        half.setMonth(half.getMonth() + 6);

        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };

        const now = new Date();
        const nextHalf = new Date(half);
        nextHalf.setFullYear(now.getFullYear());

        if (nextHalf < now) {
            nextHalf.setFullYear(now.getFullYear() + 1);
        }

        const diffTime = nextHalf.getTime() - now.getTime();
        const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
            date: half.toLocaleDateString(undefined, { month: 'long', day: 'numeric' }),
            nextHalfDate: nextHalf.toLocaleDateString(undefined, options),
            daysUntil
        };
    };

    const res = calculateHalfBirthday();

    const faqs = [
        {
            question: "What is a half birthday?",
            answer: "A half birthday is an event that occurs six months before or after a person's birthday."
        },
        {
            question: "How is it calculated?",
            answer: "We simply add six months to your birth date. If your birthday is on the 31st and the 6th month later has fewer days, the date is adjusted accordingly by the browser's date system."
        },
        {
            question: "Why celebrate a half birthday?",
            answer: "It's a popular way for children (or the young at heart) to celebrate if their actual birthday falls on a holiday or during a less convenient season."
        }
    ];

    const calc = calculators.find(c => c.href === '/half-birthday');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Half Birthday Calculator'}
                description={calc?.description || 'Determine your half birthday date and see how many days are left until your next one.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            className="input"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            style={{ width: '100%', cursor: 'pointer' }}
                        />
                    </div>

                    {res && (
                        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <ResultCard
                                title="Your Half Birthday is"
                                value={res.date}
                                subtitle={`Every year on this date.`}
                                color="secondary"
                                highlight={true}
                            />
                            <ResultCard
                                title="Next Occurrence"
                                value={res.nextHalfDate}
                                subtitle={`${res.daysUntil} days to go!`}
                                color="accent"
                            />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
