'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import DateInput from '@/components/UI/DateInput';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function PregnancyDueDateCalculator() {
    const [lmpDate, setLmpDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const calculateDueDate = () => {
        if (!lmpDate) return null;

        const date = new Date(lmpDate);
        if (isNaN(date.getTime())) return null;

        // Naegele's rule is common (LMP + 7 days - 3 months + 1 year)
        // Simple version: LMP + 280 days
        const dueDate = new Date(date);
        dueDate.setDate(dueDate.getDate() + 280);

        const today = new Date();
        const diffTime = Math.abs(today.getTime() - date.getTime());
        const weeksPregnant = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));

        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        return {
            dueDate: dueDate.toLocaleDateString(undefined, options),
            weeks: weeksPregnant,
            daysLeft: Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
            zodiac: getZodiac(dueDate)
        };
    };

    const getZodiac = (date: Date) => {
        const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
        const signs = ["Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"];
        let month = date.getMonth();
        let day = date.getDate();
        if (month === 0 && day <= 20) return signs[0];
        if (day < days[month]) return signs[month];
        return signs[(month + 1) % 12];
    };

    const res = calculateDueDate();

    const faqs = [
        {
            question: "How accurate is the due date?",
            answer: "Only about 4% of babies are born on their exact due date. Most babies arrive between 37 and 42 weeks of pregnancy."
        },
        {
            question: "What if I don't know my LMP?",
            answer: "If you're unsure of your last menstrual period, an ultrasound (usually performed in the first trimester) is the most accurate way for a doctor to estimate your due date."
        },
        {
            question: "How many weeks is a full-term pregnancy?",
            answer: "A pregnancy is considered 'full term' at 39 weeks. Delivery between 37 weeks and 38 weeks 6 days is 'early term'."
        }
    ];

    const calc = calculators.find(c => c.href === '/pregnancy-due-date');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Pregnancy Due Date Calculator'}
                description={calc?.description || 'Estimate your expected delivery date and track how far along you are in your journey.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <DateInput
                        label="First Day of Last Period (LMP)"
                        value={lmpDate}
                        onChange={(e) => setLmpDate(e.target.value)}
                    />

                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                            <ResultCard
                                title="Estimated Due Date"
                                value={res.dueDate}
                                subtitle={res.daysLeft > 0 ? `${res.daysLeft} days remaining` : 'Your baby is due!'}
                                highlight
                                color="primary"
                            />
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <ResultCard
                                    title="Current Progress"
                                    value={`~${res.weeks} Weeks`}
                                    subtitle="Approximate pregnancy week"
                                    color="secondary"
                                />
                                <ResultCard
                                    title="Baby's Likely Zodiac"
                                    value={res.zodiac}
                                    color="accent"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
