'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';

export default function CoinFlip() {
    const [result, setResult] = useState<'heads' | 'tails' | null>(null);
    const [isFlipping, setIsFlipping] = useState(false);
    const [flipKey, setFlipKey] = useState(0);
    const [stats, setStats] = useState({ heads: 0, tails: 0, streak: 0, lastSide: null as 'heads' | 'tails' | null });

    const flip = () => {
        if (isFlipping) return;
        setIsFlipping(true);
        setFlipKey(k => k + 1);
        setTimeout(() => {
            const side = Math.random() < 0.5 ? 'heads' : 'tails';
            setResult(side);
            setStats(prev => {
                const newStreak = prev.lastSide === side ? prev.streak + 1 : 1;
                return {
                    heads: prev.heads + (side === 'heads' ? 1 : 0),
                    tails: prev.tails + (side === 'tails' ? 1 : 0),
                    streak: newStreak,
                    lastSide: side,
                };
            });
            setIsFlipping(false);
        }, 900);
    };

    const total = stats.heads + stats.tails;
    const calc = calculators.find(c => c.href === '/coin-flip');
    const faqs = [
        { question: "Is this coin fair?", answer: "Absolutely. Each flip has a true 50/50 probability using JavaScript's Math.random(), with no bias towards either side." },
        { question: "Why does the statistics section show imbalanced results?", answer: "Short-run variance is normal! In statistics, small sample sizes often deviate from 50/50. The more you flip, the closer it gets to 50%." },
        { question: "Can I use this for settling bets?", answer: "Yes! Our virtual coin flip is just as fair as a real coin and is great for quick decisions between friends." },
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Coin Flip Simulator'} description={calc?.description || ''} />

            <div className="card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                {/* Coin */}
                <div style={{ perspective: '600px', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                    <div key={flipKey} style={{
                        width: '160px', height: '160px', position: 'relative', transformStyle: 'preserve-3d',
                        animation: isFlipping ? 'coinFlip 0.9s cubic-bezier(0.4,0,0.6,1) forwards' : 'none',
                    }}>
                        {/* Heads face */}
                        <div style={{
                            position: 'absolute', inset: 0, borderRadius: '50%',
                            background: 'linear-gradient(145deg, #f5d060, #d4a017)',
                            boxShadow: '0 8px 32px rgba(212,160,23,0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '4rem', backfaceVisibility: 'hidden',
                            transform: result === 'tails' && !isFlipping ? 'rotateY(180deg)' : 'rotateY(0deg)',
                        }}>👑</div>
                        {/* Tails face */}
                        <div style={{
                            position: 'absolute', inset: 0, borderRadius: '50%',
                            background: 'linear-gradient(145deg, #c0c0c0, #808080)',
                            boxShadow: '0 8px 32px rgba(128,128,128,0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '4rem', backfaceVisibility: 'hidden',
                            transform: result === 'tails' && !isFlipping ? 'rotateY(0deg)' : 'rotateY(180deg)',
                        }}>⭐</div>
                    </div>
                </div>

                {result && !isFlipping && (
                    <div style={{ marginBottom: '1.5rem', animation: 'fadeSlideUp 0.3s ease-out' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 900, color: result === 'heads' ? '#f5d060' : '#c0c0c0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{result}</div>
                        {stats.streak > 1 && <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>🔥 {stats.streak} {result} in a row!</div>}
                    </div>
                )}
                {!result && !isFlipping && <div style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Click to flip!</div>}
                {isFlipping && <div style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>Flipping...</div>}

                <button onClick={flip} disabled={isFlipping} className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                    🪙 Flip Coin
                </button>
            </div>

            {total > 0 && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>📊 Session Stats ({total} flips)</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(245,208,96,0.1)', borderRadius: '0.75rem', border: '1px solid rgba(245,208,96,0.3)' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f5d060' }}>{stats.heads}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Heads ({total > 0 ? ((stats.heads / total) * 100).toFixed(1) : 0}%)</div>
                        </div>
                        <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(192,192,192,0.1)', borderRadius: '0.75rem', border: '1px solid rgba(192,192,192,0.3)' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#a0a0a0' }}>{stats.tails}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Tails ({total > 0 ? ((stats.tails / total) * 100).toFixed(1) : 0}%)</div>
                        </div>
                    </div>
                    {total > 1 && (
                        <div style={{ marginTop: '1rem', height: '8px', borderRadius: '4px', background: 'var(--color-border)', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${(stats.heads / total) * 100}%`, background: 'linear-gradient(90deg, #f5d060, #d4a017)', borderRadius: '4px', transition: 'width 0.5s ease' }} />
                        </div>
                    )}
                </div>
            )}

            <FAQSection items={faqs} />
            <style jsx>{`
                @keyframes coinFlip {
                    0%   { transform: rotateY(0deg); }
                    100% { transform: rotateY(1800deg); }
                }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
