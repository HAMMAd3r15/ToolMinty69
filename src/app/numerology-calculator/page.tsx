'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';

const letterValues: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

const meanings: Record<number, string> = {
    1: 'Leadership & Independence — You are a natural born leader.',
    2: 'Cooperation & Balance — You work best in partnerships.',
    3: 'Creativity & Communication — You have a gift for expression.',
    4: 'Stability & Discipline — You value hard work and order.',
    5: 'Freedom & Adventure — You crave variety and change.',
    6: 'Responsibility & Nurturing — You are caring and compassionate.',
    7: 'Introspection & Wisdom — You seek truth and knowledge.',
    8: 'Power & Ambition — You are driven by material success.',
    9: 'Humanitarianism & Compassion — You are here to serve humanity.',
};

function reduce(n: number): number {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
        n = String(n).split('').reduce((a, d) => a + parseInt(d), 0);
    }
    return n;
}

export default function NumerologyCalculator() {
    const [name, setName] = useState('');

    const calc = () => {
        const clean = name.toUpperCase().replace(/[^A-Z]/g, '');
        if (!clean) return null;
        const total = clean.split('').reduce((sum, ch) => sum + (letterValues[ch] || 0), 0);
        const num = reduce(total);
        return { num, meaning: meanings[num] || 'Master Number — You carry extraordinary potential.' };
    };

    const res = calc();
    const faqs = [
        { question: "How is numerology calculated?", answer: "Each letter A–Z is assigned a number 1–9 (cyclically). All letter values in your name are summed, then reduced to a single digit by repeatedly summing digits." },
        { question: "What are master numbers?", answer: "11, 22, and 33 are 'master numbers' in numerology and are not reduced further. They represent higher spiritual potential." },
    ];

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Name Numerology</h1>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '3rem' }}>
                Discover your numerology number and what it reveals about your personality.
            </p>
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Your Full Name</label>
                        <input type="text" className="input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. John Smith" />
                    </div>
                    {res && (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <ResultCard title="Your Numerology Number" value={`${res.num}`} color="primary" highlight />
                            <div style={{ padding: '1.25rem', borderRadius: '1rem', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: 'var(--color-text-primary)', lineHeight: '1.6' }}>
                                🔮 <strong>{res.meaning}</strong>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
