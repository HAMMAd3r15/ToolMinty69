'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function AgeWeeksDaysCalculator() {
    const [birthDate, setBirthDate] = useState<string>('');

    const calculateAgeDetails = () => {
        if (!birthDate) return null;

        const birth = new Date(birthDate);
        const now = new Date();

        if (isNaN(birth.getTime())) return null;

        const diffTime = now.getTime() - birth.getTime();
        if (diffTime < 0) return null;

        const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const remainingDays = totalDays % 7;

        return {
            totalDays: totalDays.toLocaleString(),
            totalWeeks: totalWeeks.toLocaleString(),
            remainingDays,
            weeksAndDays: `${totalWeeks.toLocaleString()} weeks and ${remainingDays} days`
        };
    };

    const res = calculateAgeDetails();

    const faqs = [
        {
            question: "How is the total age calculated?",
            answer: "We count every single day between your birth date and today, accounting for leap years and different month lengths."
        },
        {
            question: "Why would I want to know my age in weeks?",
            answer: "It's a fun way to look at your life milestones from a different perspective than just years and months."
        },
        {
            question: "Is this synchronized with my exact birth time?",
            answer: "This calculator uses the date only. It assumes a birth at the start of the day in your local time zone."
        }
    ];

    const calc = calculators.find(c => c.href === '/age-weeks-days');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Age in Weeks & Days'}
                description={calc?.description || 'Ever wondered exactly how many weeks or days old you are? Discover your age in total duration.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                            Select Your Date of Birth
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
                                title="Total Age in Weeks"
                                value={`${res.totalWeeks} Weeks`}
                                subtitle={res.remainingDays > 0 ? `Plus ${res.remainingDays} days` : 'Exactly'}
                                color="secondary"
                                highlight={true}
                            />
                            <ResultCard
                                title="Total Age in Days"
                                value={`${res.totalDays} Days`}
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
