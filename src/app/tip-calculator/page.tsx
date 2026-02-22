'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function TipCalculator() {
    const [bill, setBill] = useState('');
    const [tipPct, setTipPct] = useState('15');
    const [people, setPeople] = useState('1');

    const toolData = calculators.find(c => c.href === '/tip-calculator');

    const calc = () => {
        const b = parseFloat(bill);
        const t = parseFloat(tipPct) / 100;
        const p = parseInt(people) || 1;
        if (isNaN(b) || b <= 0) return null;
        const tip = b * t;
        const total = b + tip;
        return {
            tip: tip.toFixed(2),
            total: total.toFixed(2),
            perPerson: (total / p).toFixed(2),
            tipPerPerson: (tip / p).toFixed(2),
        };
    };

    const res = calc();

    const faqs = [
        { question: "What is a standard tip?", answer: "In the US, 15–18% is standard, 20% is generous, and 25%+ is exceptional. For takeout or counter service, 10% is common." },
        { question: "Is tip calculated before or after tax?", answer: "Etiquette varies, but most people calculate tip on the pre-tax subtotal. Our calculator uses the bill amount you enter, so enter whatever you prefer." },
    ];

    const presets = ['10', '15', '18', '20', '25'];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Tip Calculator'}
                description={toolData?.description || 'Split any bill fairly and calculate the perfect tip in seconds.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Bill Amount ($)</label>
                            <input type="number" className="input" value={bill} onChange={e => setBill(e.target.value)} placeholder="e.g. 50.00" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Number of People</label>
                            <input type="number" className="input" value={people} onChange={e => setPeople(e.target.value)} placeholder="1" min="1" />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 500 }}>Tip Percentage</label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                            {presets.map(p => (
                                <button key={p} onClick={() => setTipPct(p)} style={{
                                    padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                                    background: tipPct === p ? '#2563eb' : 'rgba(255,255,255,0.05)',
                                    color: tipPct === p ? '#fff' : 'var(--color-text-secondary)',
                                    border: tipPct === p ? '1px solid #2563eb' : '1px solid rgba(255,255,255,0.08)',
                                    transition: 'all 0.2s ease'
                                }}>{p}%</button>
                            ))}
                            <input
                                type="number" className="input" value={tipPct}
                                onChange={e => setTipPct(e.target.value)} placeholder="Custom"
                                style={{ width: '90px', padding: '0.4rem 0.75rem' }}
                            />
                        </div>
                    </div>
                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                            <ResultCard title="Tip Amount" value={`$${res.tip}`} color="accent" />
                            <ResultCard title="Total Bill" value={`$${res.total}`} color="primary" highlight />
                            <ResultCard title="Per Person" value={`$${res.perPerson}`} color="secondary" highlight />
                            <ResultCard title="Tip Per Person" value={`$${res.tipPerPerson}`} color="success" />
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
