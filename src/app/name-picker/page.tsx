'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';

export default function NamePicker() {
    const [input, setInput] = useState('');
    const [picked, setPicked] = useState<string | null>(null);
    const [history, setHistory] = useState<string[]>([]);

    const getNames = () => input.split('\n').map(n => n.trim()).filter(Boolean);

    const pick = () => {
        const names = getNames();
        if (names.length === 0) return;
        const chosen = names[Math.floor(Math.random() * names.length)];
        setPicked(chosen);
        setHistory(prev => [chosen, ...prev.slice(0, 9)]);
    };

    const faqs = [
        { question: "Is the selection truly random?", answer: "Yes! We use JavaScript's Math.random() which is a pseudo-random number generator, giving every name an equal probability of being picked." },
        { question: "Can I add duplicates to increase odds?", answer: "Absolutely. Adding a name multiple times will proportionally increase its chance of being selected." },
    ];

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Random Name Picker</h1>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '3rem' }}>
                Enter a list of names and let the randomizer pick a winner instantly.
            </p>
            <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Names (one per line)</label>
                        <textarea
                            className="input"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Alice&#10;Bob&#10;Charlie&#10;Diana"
                            rows={6}
                            style={{ resize: 'vertical', fontFamily: 'inherit' }}
                        />
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginTop: '0.5rem' }}>{getNames().length} name(s) entered</p>
                    </div>
                    <button
                        onClick={pick}
                        disabled={getNames().length === 0}
                        style={{
                            padding: '1rem', borderRadius: '0.75rem', background: getNames().length > 0 ? 'linear-gradient(135deg, #2563eb, #6366f1)' : 'rgba(255,255,255,0.05)',
                            color: '#fff', border: 'none', fontWeight: 700, fontSize: '1.05rem', cursor: getNames().length > 0 ? 'pointer' : 'not-allowed',
                            transition: 'all 0.3s ease', letterSpacing: '0.02em'
                        }}
                    >🎲 Pick a Random Name</button>
                    {picked && (
                        <div style={{ textAlign: 'center', padding: '2rem', background: 'rgba(37,99,235,0.1)', borderRadius: '1rem', border: '1px solid rgba(37,99,235,0.3)' }}>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', marginBottom: '0.5rem' }}>🎉 Selected:</p>
                            <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>{picked}</p>
                        </div>
                    )}
                    {history.length > 1 && (
                        <div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)', marginBottom: '0.5rem' }}>Recent picks:</p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {history.slice(1).map((h, i) => (
                                    <span key={i} style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', color: 'var(--color-text-secondary)' }}>{h}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
