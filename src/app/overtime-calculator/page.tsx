'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function OvertimeCalculator() {
    const [baseRate, setBaseRate] = useState('');
    const [regularHours, setRegularHours] = useState('40');
    const [overtimeHours, setOvertimeHours] = useState('');
    const [multiplier, setMultiplier] = useState('1.5');

    const toolData = calculators.find(c => c.href === '/overtime-calculator');

    const calc = () => {
        const r = parseFloat(baseRate);
        const rh = parseFloat(regularHours);
        const oh = parseFloat(overtimeHours);
        const m = parseFloat(multiplier);
        if (isNaN(r) || isNaN(rh) || isNaN(oh) || isNaN(m)) return null;
        const regularPay = r * rh;
        const overtimePay = r * m * oh;
        const totalPay = regularPay + overtimePay;
        return { regularPay: regularPay.toFixed(2), overtimePay: overtimePay.toFixed(2), totalPay: totalPay.toFixed(2) };
    };

    const res = calc();
    const faqs = [
        { question: "How is overtime calculated?", answer: "Overtime pay = Hourly rate × Overtime multiplier × Overtime hours. The standard multiplier in the US is 1.5× ('time and a half')." },
        { question: "Can I change the multiplier?", answer: "Yes! Some jobs pay double-time (2×) for holidays or excessive hours. Enter any multiplier that applies to your work agreement." },
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Overtime Pay Calculator'}
                description={toolData?.description || 'Calculate your total weekly pay including overtime earnings with any multiplier.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Hourly Rate ($)</label>
                            <input type="number" className="input" value={baseRate} onChange={e => setBaseRate(e.target.value)} placeholder="e.g. 20" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Regular Hours</label>
                            <input type="number" className="input" value={regularHours} onChange={e => setRegularHours(e.target.value)} placeholder="40" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Overtime Hours</label>
                            <input type="number" className="input" value={overtimeHours} onChange={e => setOvertimeHours(e.target.value)} placeholder="e.g. 10" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>OT Multiplier</label>
                            <input type="number" className="input" value={multiplier} onChange={e => setMultiplier(e.target.value)} step="0.5" placeholder="1.5" />
                        </div>
                    </div>
                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                            <ResultCard title="Regular Pay" value={`$${res.regularPay}`} color="secondary" />
                            <ResultCard title="Overtime Pay" value={`$${res.overtimePay}`} color="accent" />
                            <ResultCard title="Total Pay" value={`$${res.totalPay}`} color="primary" highlight />
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
