'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';

export default function LuckyNumberGenerator() {
    const [min, setMin] = useState<number>(1);
    const [max, setMax] = useState<number>(100);
    const [result, setResult] = useState<number | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [history, setHistory] = useState<number[]>([]);

    const generate = () => {
        if (min >= max) return;
        setIsGenerating(true);
        setResult(null);
        let count = 0;
        const interval = setInterval(() => {
            setResult(Math.floor(Math.random() * (max - min + 1)) + min);
            count++;
            if (count >= 15) {
                clearInterval(interval);
                const final = Math.floor(Math.random() * (max - min + 1)) + min;
                setResult(final);
                setHistory(prev => [final, ...prev].slice(0, 10));
                setIsGenerating(false);
            }
        }, 60);
    };

    const calc = calculators.find(c => c.href === '/lucky-number');
    const faqs = [
        { question: "Is the number truly random?", answer: "Yes! We use JavaScript's cryptographic-quality Math.random() to generate an unbiased number within your chosen range." },
        { question: "What can I use this for?", answer: "Lotteries, raffle draws, picking a random item from a list, settling disputes, or just having fun with lucky numbers." },
        { question: "Can I generate multiple numbers?", answer: "Click the button multiple times to generate several numbers. Your last 10 results are shown in the history section." },
    ];

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Lucky Number Generator'} description={calc?.description || ''} />

            <div className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Minimum</label>
                        <input type="number" className="input" value={min} onChange={e => setMin(Number(e.target.value))} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Maximum</label>
                        <input type="number" className="input" value={max} onChange={e => setMax(Number(e.target.value))} />
                    </div>
                </div>
                {min >= max && <p style={{ color: 'var(--color-error)', fontSize: '0.875rem', marginBottom: '1rem' }}>⚠️ Minimum must be less than maximum.</p>}
                <button
                    onClick={generate}
                    disabled={isGenerating || min >= max}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem', letterSpacing: '0.03em' }}
                >
                    {isGenerating ? '🎰 Rolling...' : '🍀 Generate Lucky Number'}
                </button>

                {result !== null && (
                    <div style={{ textAlign: 'center', marginTop: '2rem', padding: '2.5rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(167,139,250,0.1))', borderRadius: '1.5rem', border: '2px solid rgba(99,102,241,0.4)', animation: 'luckyPop 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
                        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-secondary)', fontWeight: 700, marginBottom: '0.5rem' }}>Your Lucky Number</div>
                        <div style={{ fontSize: '5rem', fontWeight: 900, background: 'linear-gradient(135deg, #818cf8, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1, transition: 'all 0.05s' }}>{result}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>Between {min} and {max}</div>
                    </div>
                )}
            </div>

            {history.length > 1 && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>🕑 Recent History</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {history.map((n, i) => (
                            <span key={i} style={{ padding: '0.4rem 1rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '2rem', fontWeight: 700, opacity: 1 - i * 0.08, fontSize: '0.95rem' }}>{n}</span>
                        ))}
                    </div>
                </div>
            )}

            <FAQSection items={faqs} />
            <style jsx>{`
                @keyframes luckyPop {
                    from { transform: scale(0.75); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
