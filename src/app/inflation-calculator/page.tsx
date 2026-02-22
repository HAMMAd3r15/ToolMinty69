'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function InflationCalculator() {
    const [amount, setAmount] = useState<string>('');
    const [rate, setRate] = useState<string>('3');
    const [years, setYears] = useState<string>('10');

    const calculateInflation = () => {
        const p = parseFloat(amount);
        const r = parseFloat(rate) / 100;
        const n = parseFloat(years);

        if (isNaN(p) || isNaN(r) || isNaN(n)) return null;

        const futureValue = p * Math.pow(1 + r, n);
        const purchasingPower = p / Math.pow(1 + r, n);

        return {
            futureValue: futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            purchasingPower: purchasingPower.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
    };

    const res = calculateInflation();

    const faqs = [
        {
            question: "How does inflation work?",
            answer: "Inflation is the rate at which the general level of prices for goods and services is rising. As inflation rises, every dollar you own buys a smaller percentage of a good or service."
        },
        {
            question: "What is 'Purchasing Power'?",
            answer: "It shows what your current amount of money will be worth in the future. For example, $100 today might only buy $70 worth of goods in 10 years if inflation stays at 3%."
        }
    ];

    const calc = calculators.find(c => c.href === '/inflation-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Inflation Calculator'}
                description={calc?.description || 'See how the value of your money changes over time due to inflation.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Starting Amount ($)</label>
                            <input type="number" className="input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 1000" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Annual Inflation (%)</label>
                            <input type="number" className="input" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g. 3" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Number of Years</label>
                            <input type="number" className="input" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g. 10" />
                        </div>
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <ResultCard title="Future Monthly Cost" value={`$${res.futureValue}`} color="primary" />
                            <ResultCard title="Future Purchasing Power" value={`$${res.purchasingPower}`} color="secondary" highlight />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
