'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function AgeGapCalculator() {
    const [age1, setAge1] = useState('');
    const [age2, setAge2] = useState('');

    const calc = () => {
        const a = parseInt(age1);
        const b = parseInt(age2);
        if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return null;
        const gap = Math.abs(a - b);
        const older = Math.max(a, b);
        const younger = Math.min(a, b);
        const halfPlusSeven = Math.floor(older / 2) + 7;
        const acceptable = younger >= halfPlusSeven;
        return { gap, halfPlusSeven, acceptable, older, younger };
    };

    const res = calc();
    const toolData = calculators.find(c => c.href === '/age-gap-calculator');
    const faqs = [
        { question: "What is the 'half your age + 7' rule?", answer: "A popular social rule that suggests the minimum socially acceptable age for a partner is your age divided by 2, plus 7. It's a cultural guideline, not a scientific rule." },
        { question: "Is this scientifically accurate?", answer: "No, this calculator uses a common social heuristic for entertainment. Relationship compatibility depends on many personal factors." },
    ];

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Age Gap Calculator'}
                description={toolData?.description || 'Calculate the age difference between two people and see compatibility insights.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Person 1 Age</label>
                            <input type="number" className="input" value={age1} onChange={e => setAge1(e.target.value)} placeholder="e.g. 30" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Person 2 Age</label>
                            <input type="number" className="input" value={age2} onChange={e => setAge2(e.target.value)} placeholder="e.g. 25" />
                        </div>
                    </div>
                    {res && (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
                                <ResultCard title="Age Gap" value={`${res.gap} years`} color="primary" highlight />
                                <ResultCard title="Min. Age (½+7 rule)" value={`${res.halfPlusSeven} years`} color="secondary" />
                            </div>
                            <div style={{
                                padding: '1.25rem',
                                borderRadius: '1rem',
                                background: res.acceptable ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                                border: `1px solid ${res.acceptable ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                                textAlign: 'center',
                                fontWeight: 600,
                                color: res.acceptable ? '#22c55e' : '#ef4444',
                            }}>
                                {res.acceptable
                                    ? `✅ Within the social guideline (½+7 rule)`
                                    : `⚠️ Below the ½+7 social guideline for the older person (${res.older})`}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
