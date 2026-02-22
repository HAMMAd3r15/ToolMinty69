'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

const categories = [
    { label: 'Venue & Catering', key: 'venue', placeholder: '8000' },
    { label: 'Photography & Video', key: 'photo', placeholder: '3000' },
    { label: 'Flowers & Decoration', key: 'decor', placeholder: '2000' },
    { label: 'Music / DJ / Band', key: 'music', placeholder: '1500' },
    { label: 'Wedding Dress & Suit', key: 'attire', placeholder: '2500' },
    { label: 'Invitations & Stationery', key: 'invites', placeholder: '400' },
    { label: 'Honeymoon', key: 'honeymoon', placeholder: '5000' },
    { label: 'Other', key: 'other', placeholder: '1000' },
];

export default function WeddingBudget() {
    const [values, setValues] = useState<Record<string, string>>({});
    const update = (key: string, val: string) => setValues(prev => ({ ...prev, [key]: val }));
    const total = categories.reduce((sum, c) => sum + (parseFloat(values[c.key]) || 0), 0);
    const hasInput = Object.values(values).some(v => v);

    const faqs = [
        { question: "What is the average US wedding cost?", answer: "The average US wedding costs around $23,000–$30,000, but costs vary widely by region, guest count, and choices." },
    ];

    const calcData = calculators.find(c => c.href === '/wedding-budget');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calcData?.title || 'Wedding Budget Tool'}
                description={calcData?.description || 'Estimate your total wedding costs by entering expenses across major categories.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    {categories.map(c => (
                        <div key={c.key}>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 500 }}>{c.label} ($)</label>
                            <input type="number" className="input" value={values[c.key] || ''} onChange={e => update(c.key, e.target.value)} placeholder={c.placeholder} />
                        </div>
                    ))}
                </div>
                {hasInput && (
                    <ResultCard title="Total Wedding Budget" value={`$${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} color="primary" highlight />
                )}
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
