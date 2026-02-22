'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function SalaryConverter() {
    const [hourly, setHourly] = useState('');
    const [hoursPerWeek, setHoursPerWeek] = useState('40');

    const toolData = calculators.find(c => c.href === '/salary-converter');

    const calc = () => {
        const h = parseFloat(hourly);
        const hpw = parseFloat(hoursPerWeek);
        if (isNaN(h) || isNaN(hpw) || h <= 0 || hpw <= 0) return null;
        const weekly = h * hpw;
        const monthly = (weekly * 52) / 12;
        const yearly = weekly * 52;
        return {
            weekly: weekly.toFixed(2),
            monthly: monthly.toFixed(2),
            yearly: yearly.toFixed(2),
        };
    };

    const res = calc();

    const faqs = [
        { question: "How is annual salary calculated?", answer: "Annual salary = Hourly rate × Hours per week × 52 weeks. Monthly is annual ÷ 12." },
        { question: "Does this include overtime?", answer: "No. This calculator assumes you work the same hours every week with no overtime. Use the Overtime Pay Calculator for overtime earnings." },
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Hourly to Salary Converter'}
                description={toolData?.description || 'Convert your hourly wage to weekly, monthly, and annual salary instantly.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Hourly Rate ($)</label>
                            <input type="number" className="input" value={hourly} onChange={e => setHourly(e.target.value)} placeholder="e.g. 25" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Hours per Week</label>
                            <input type="number" className="input" value={hoursPerWeek} onChange={e => setHoursPerWeek(e.target.value)} placeholder="40" />
                        </div>
                    </div>
                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                            <ResultCard title="Weekly Pay" value={`$${res.weekly}`} color="accent" />
                            <ResultCard title="Monthly Pay" value={`$${res.monthly}`} color="secondary" />
                            <ResultCard title="Annual Salary" value={`$${res.yearly}`} color="primary" highlight />
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
