'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

type Item = { label: string; amount: string };

const defaultAssets: Item[] = [
    { label: 'Cash & Savings', amount: '' },
    { label: 'Investments', amount: '' },
    { label: 'Property Value', amount: '' },
    { label: 'Vehicle(s)', amount: '' },
];

const defaultLiabilities: Item[] = [
    { label: 'Mortgage Balance', amount: '' },
    { label: 'Car Loans', amount: '' },
    { label: 'Credit Card Debt', amount: '' },
    { label: 'Other Loans', amount: '' },
];

export default function NetWorthCalculator() {
    const [assets, setAssets] = useState<Item[]>(defaultAssets);
    const [liabilities, setLiabilities] = useState<Item[]>(defaultLiabilities);

    const sum = (items: Item[]) => items.reduce((acc, i) => acc + (parseFloat(i.amount) || 0), 0);

    const totalAssets = sum(assets);
    const totalLiabilities = sum(liabilities);
    const netWorth = totalAssets - totalLiabilities;
    const hasInput = assets.some(a => a.amount) || liabilities.some(l => l.amount);

    const updateItem = (list: Item[], setList: (v: Item[]) => void, idx: number, val: string) => {
        const next = [...list];
        next[idx] = { ...next[idx], amount: val };
        setList(next);
    };

    const faqs = [
        { question: "What is net worth?", answer: "Net worth = Total Assets − Total Liabilities. A positive net worth means your assets outweigh your debts." },
        { question: "How often should I calculate this?", answer: "Financial experts recommend checking your net worth quarterly or at a minimum annually to track your financial progress." },
    ];

    const calc = calculators.find(c => c.href === '/net-worth-calculator');

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Net Worth Calculator'}
                description={calc?.description || 'Get a clear picture of your financial health by calculating total assets minus liabilities.'}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem', color: '#22c55e' }}>✅ Assets</h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {assets.map((a, i) => (
                            <div key={i}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 500 }}>{a.label} ($)</label>
                                <input type="number" className="input" value={a.amount} onChange={e => updateItem(assets, setAssets, i, e.target.value)} placeholder="0" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem', color: '#ef4444' }}>❌ Liabilities</h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {liabilities.map((l, i) => (
                            <div key={i}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 500 }}>{l.label} ($)</label>
                                <input type="number" className="input" value={l.amount} onChange={e => updateItem(liabilities, setLiabilities, i, e.target.value)} placeholder="0" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {hasInput && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
                    <ResultCard title="Total Assets" value={`$${totalAssets.toLocaleString()}`} color="success" />
                    <ResultCard title="Total Liabilities" value={`$${totalLiabilities.toLocaleString()}`} color="accent" />
                    <ResultCard title="Net Worth" value={`$${netWorth.toLocaleString()}`} color={netWorth >= 0 ? 'primary' : 'accent'} highlight />
                </div>
            )}
            <FAQSection items={faqs} />
        </div>
    );
}
