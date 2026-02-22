'use client';

import { useState, useRef, useEffect } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

type Phase = 'idle' | 'waiting' | 'ready' | 'result' | 'toosoon';

const PHASE_CONFIG = {
    idle: { bg: 'linear-gradient(135deg, #1e293b, #334155)', text: '#94a3b8', label: 'Click to Start' },
    waiting: { bg: 'linear-gradient(135deg, #7f1d1d, #991b1b)', text: '#fca5a5', label: 'Wait for green...' },
    ready: { bg: 'linear-gradient(135deg, #064e3b, #065f46)', text: '#6ee7b7', label: 'CLICK NOW!' },
    result: { bg: 'linear-gradient(135deg, #1e293b, #334155)', text: '#818cf8', label: '' },
    toosoon: { bg: 'linear-gradient(135deg, #78350f, #92400e)', text: '#fbbf24', label: '⚠️ Too soon! Click to try again.' },
};

function getRating(ms: number) {
    if (ms < 150) return { emoji: '⚡', label: 'Superhuman!', color: '#f59e0b' };
    if (ms < 200) return { emoji: '🚀', label: 'Blazing Fast', color: '#10b981' };
    if (ms < 250) return { emoji: '🎯', label: 'Excellent', color: '#6366f1' };
    if (ms < 300) return { emoji: '👍', label: 'Good', color: '#3b82f6' };
    if (ms < 400) return { emoji: '😐', label: 'Average', color: '#f59e0b' };
    return { emoji: '🐢', label: 'Keep Practicing', color: '#ef4444' };
}

export default function ReactionTime() {
    const [phase, setPhase] = useState<Phase>('idle');
    const [reactionTime, setReactionTime] = useState<number | null>(null);
    const [history, setHistory] = useState<number[]>([]);
    const startTimeRef = useRef<number>(0);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleClick = () => {
        if (phase === 'idle' || phase === 'result' || phase === 'toosoon') {
            setPhase('waiting');
            setReactionTime(null);
            const delay = 2000 + Math.random() * 3000;
            timerRef.current = setTimeout(() => {
                setPhase('ready');
                startTimeRef.current = performance.now();
            }, delay);
        } else if (phase === 'waiting') {
            if (timerRef.current) clearTimeout(timerRef.current);
            setPhase('toosoon');
        } else if (phase === 'ready') {
            const elapsed = performance.now() - startTimeRef.current;
            const ms = Math.round(elapsed);
            setReactionTime(ms);
            setHistory(prev => [ms, ...prev].slice(0, 10));
            setPhase('result');
        }
    };

    useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

    const avgTime = history.length > 0 ? Math.round(history.reduce((a, b) => a + b, 0) / history.length) : null;
    const bestTime = history.length > 0 ? Math.min(...history) : null;
    const cfg = PHASE_CONFIG[phase];
    const rating = reactionTime ? getRating(reactionTime) : null;

    const calc = calculators.find(c => c.href === '/reaction-time');
    const faqs = [
        { question: "What is an average reaction time?", answer: "The average human reaction time to a visual stimulus is around 200-250ms. Elite athletes and gamers often achieve 150-180ms." },
        { question: "What affects reaction time?", answer: "Fatigue, caffeine, practice, and age all influence reaction time. Younger people and practiced gamers tend to react faster." },
        { question: "How can I improve my score?", answer: "Practice regularly, ensure you're well-rested, and avoid distractions. Competitive gamers train specifically to reduce their reaction time." },
    ];

    if (!calc) return null;

    return (
        <ToolLayout calculator={calc}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <ToolHeader title={calc.title} description={calc.description} />

                {/* Main Test Area */}
                <div onClick={handleClick} style={{
                    height: '280px', borderRadius: '1.5rem', background: cfg.bg,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', userSelect: 'none', marginBottom: '1.5rem',
                    boxShadow: phase === 'ready' ? '0 0 60px rgba(52,211,153,0.5)' : '0 8px 32px rgba(0,0,0,0.3)',
                    transition: 'background 0.15s ease, box-shadow 0.15s ease', gap: '0.75rem',
                }}>
                    {phase === 'result' && rating ? (
                        <>
                            <div style={{ fontSize: '3rem' }}>{rating.emoji}</div>
                            <div style={{ fontSize: '4rem', fontWeight: 900, color: rating.color, fontFamily: 'monospace', letterSpacing: '-0.02em' }}>{reactionTime}<span style={{ fontSize: '1.5rem', marginLeft: '0.2rem' }}>ms</span></div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: rating.color }}>{rating.label}</div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Click to try again</div>
                        </>
                    ) : (
                        <>
                            <div style={{ fontSize: '2.5rem' }}>{phase === 'waiting' ? '🔴' : phase === 'ready' ? '🟢' : phase === 'toosoon' ? '⚠️' : '👆'}</div>
                            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: cfg.text, textAlign: 'center' }}>{phase === 'idle' ? 'Click to Start Test' : cfg.label}</div>
                        </>
                    )}
                </div>

                {/* Stats */}
                {history.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--color-surface)', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10b981' }}>{bestTime}ms</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Best Time</div>
                        </div>
                        <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--color-surface)', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#6366f1' }}>{avgTime}ms</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Average ({history.length} tests)</div>
                        </div>
                    </div>
                )}

                {history.length > 1 && (
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '0.75rem' }}>History</h3>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                            {history.map((t, i) => (
                                <span key={i} style={{ padding: '0.3rem 0.8rem', borderRadius: '2rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'monospace', opacity: 1 - i * 0.08 }}>{t}ms</span>
                            ))}
                        </div>
                    </div>
                )}

                <FAQSection items={faqs} />
            </div>
        </ToolLayout>
    );
}
