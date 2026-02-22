'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function ScreenTimeCost() {
    const [dailyHours, setDailyHours] = useState('');
    const [hourlyWage, setHourlyWage] = useState('');

    const calc = () => {
        const h = parseFloat(dailyHours);
        if (isNaN(h) || h <= 0) return null;
        const perYear = h * 365;
        const perMonth = (perYear / 12).toFixed(0);
        const wage = parseFloat(hourlyWage);
        const moneyCost = !isNaN(wage) && wage > 0 ? (h * 365 * wage).toFixed(2) : null;
        return { perYear: Math.round(perYear).toLocaleString(), perMonth, moneyCost };
    };

    const res = calc();
    const faqs = [
        { question: "How is time wasted calculated?", answer: "Daily hours × 365 = yearly hours wasted. We divide by 12 for the monthly figure." },
        { question: "How is money cost calculated?", answer: "Time wasted × your hourly income rate. This shows the opportunity cost of screen time." },
    ];

    const toolData = calculators.find(c => c.href === '/screen-time-cost');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Screen Time Cost'}
                description={toolData?.description || 'Discover how much time and money you spend on apps and screens each year.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Daily Screen Time (hours)</label>
                            <input type="number" className="input" value={dailyHours} onChange={e => setDailyHours(e.target.value)} placeholder="e.g. 4" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Your Hourly Rate ($ optional)</label>
                            <input type="number" className="input" value={hourlyWage} onChange={e => setHourlyWage(e.target.value)} placeholder="e.g. 25" />
                        </div>
                    </div>
                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
                            <ResultCard title="Hours/Year" value={`${res.perYear}h`} color="accent" highlight />
                            <ResultCard title="Hours/Month" value={`${res.perMonth}h`} color="secondary" />
                            {res.moneyCost && <ResultCard title="Opportunity Cost" value={`$${res.moneyCost}`} color="primary" highlight />}
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
