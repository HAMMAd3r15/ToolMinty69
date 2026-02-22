'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import CustomSelect from '@/components/UI/CustomSelect';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function CompoundInterestForm() {
    const [principal, setPrincipal] = useState<string>('');
    const [rate, setRate] = useState<string>('');
    const [years, setYears] = useState<string>('');
    const [frequency, setFrequency] = useState<string>('12');

    const calculateInterest = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(years);
        const n = parseInt(frequency);

        if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n)) return null;

        const amount = p * Math.pow((1 + r / n), (n * t));
        const totalInterest = amount - p;

        return {
            totalAmount: amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            interestEarned: totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            contributions: p.toLocaleString()
        };
    };

    const res = calculateInterest();

    const faqs = [
        {
            question: "What is compound interest?",
            answer: "Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods."
        },
        {
            question: "How often should I compound?",
            answer: "The more frequent the compounding (e.g., daily instead of annually), the faster your investment grows. Common frequencies are monthly (12) or quarterly (4)."
        },
        {
            question: "Does this account for monthly deposits?",
            answer: "This is a basic compound interest calculator for a lump sum investment. It does not currently account for additional monthly contributions."
        }
    ];

    const calc = calculators.find(c => c.href === '/compound-interest');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Compound Interest Calculator'}
                description={calc?.description || 'Calculate how your investments grow over time.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Initial Investment ($)</label>
                            <input type="number" className="input" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g. 5000" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Annual Interest Rate (%)</label>
                            <input type="number" className="input" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g. 7" style={{ width: '100%' }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Time Period (Years)</label>
                            <input type="number" className="input" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g. 10" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <CustomSelect
                                label="Compounding Frequency"
                                value={frequency}
                                onChange={setFrequency}
                                options={[
                                    { value: "1", label: "Annually" },
                                    { value: "2", label: "Semi-Annually" },
                                    { value: "4", label: "Quarterly" },
                                    { value: "12", label: "Monthly" },
                                    { value: "365", label: "Daily" }
                                ]}
                            />
                        </div>
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            <ResultCard
                                title="Final Balance"
                                value={`$${res.totalAmount}`}
                                subtitle={`Total interest earned: $${res.interestEarned}`}
                                highlight
                                color="primary"
                            />
                            <ResultCard
                                title="Principal Investment"
                                value={`$${res.contributions}`}
                                color="secondary"
                            />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
