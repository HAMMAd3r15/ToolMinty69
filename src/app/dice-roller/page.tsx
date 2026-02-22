'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';

type Die = { id: number; value: number; rolling: boolean };

const DIE_DOTS: Record<number, [number, number][]> = {
    1: [[50, 50]],
    2: [[25, 25], [75, 75]],
    3: [[25, 25], [50, 50], [75, 75]],
    4: [[25, 25], [75, 25], [25, 75], [75, 75]],
    5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
    6: [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]],
};

function DiceFace({ value, sides, rolling }: { value: number; sides: number; rolling: boolean }) {
    if (sides === 6 && DIE_DOTS[value]) {
        const dots = DIE_DOTS[value];
        return (
            <div style={{
                width: '80px', height: '80px', borderRadius: '14px',
                background: 'linear-gradient(145deg, #f8fafc, #e2e8f0)',
                border: '2px solid #cbd5e1',
                boxShadow: rolling
                    ? '0 0 20px rgba(99,102,241,0.6), 0 4px 12px rgba(0,0,0,0.2)'
                    : '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.8)',
                position: 'relative', transition: 'box-shadow 0.3s',
                animation: rolling ? 'diceRoll 0.3s ease-in-out infinite alternate' : 'diceSettle 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}>
                {dots.map(([x, y], i) => (
                    <div key={i} style={{
                        position: 'absolute', width: '14px', height: '14px', borderRadius: '50%',
                        background: '#1e293b', left: `${x}%`, top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                    }} />
                ))}
            </div>
        );
    }
    return (
        <div style={{
            width: '80px', height: '80px', borderRadius: '14px',
            background: 'linear-gradient(145deg, #6366f1, #4f46e5)',
            border: '2px solid rgba(99,102,241,0.6)',
            boxShadow: rolling ? '0 0 20px rgba(99,102,241,0.8)' : '0 4px 12px rgba(99,102,241,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.75rem', fontWeight: 900, color: '#fff',
            animation: rolling ? 'diceRoll 0.2s ease-in-out infinite alternate' : 'diceSettle 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}>{value}</div>
    );
}

export default function DiceRoller() {
    const [numDice, setNumDice] = useState(2);
    const [sides, setSides] = useState(6);
    const [dice, setDice] = useState<Die[]>([]);
    const [isRolling, setIsRolling] = useState(false);
    const [rollHistory, setRollHistory] = useState<number[]>([]);

    const roll = () => {
        if (isRolling) return;
        setIsRolling(true);
        const initDice: Die[] = Array.from({ length: numDice }, (_, i) => ({ id: i, value: 1, rolling: true }));
        setDice(initDice);

        const interval = setInterval(() => {
            setDice(prev => prev.map(d => ({ ...d, value: Math.floor(Math.random() * sides) + 1 })));
        }, 80);

        setTimeout(() => {
            clearInterval(interval);
            const finalDice: Die[] = Array.from({ length: numDice }, (_, i) => ({
                id: i, value: Math.floor(Math.random() * sides) + 1, rolling: false,
            }));
            setDice(finalDice);
            const total = finalDice.reduce((s, d) => s + d.value, 0);
            setRollHistory(prev => [total, ...prev].slice(0, 8));
            setIsRolling(false);
        }, 800);
    };

    const total = dice.reduce((s, d) => s + d.value, 0);
    const calc = calculators.find(c => c.href === '/dice-roller');
    const faqs = [
        { question: "What dice types are available?", answer: "You can roll standard D6 dice (with visual dot faces) or custom dice with any number of sides (D4, D8, D10, D12, D20, D100 — or any custom value)." },
        { question: "How many dice can I roll at once?", answer: "You can roll between 1 and 10 dice simultaneously, making it perfect for board games, RPGs, and tabletop games." },
        { question: "Is it truly random?", answer: "Yes — each die result is independently generated using Math.random(), providing a statistically fair roll every time." },
    ];

    const sideOptions = [4, 6, 8, 10, 12, 20, 100];

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Dice Roller'} description={calc?.description || ''} />

            <div className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Number of Dice</label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {[1, 2, 3, 4, 5, 6].map(n => (
                                <button key={n} onClick={() => setNumDice(n)} style={{
                                    padding: '0.5rem 0.9rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '1rem',
                                    background: numDice === n ? 'var(--color-secondary)' : 'var(--color-bg)',
                                    color: numDice === n ? '#fff' : 'var(--color-text-primary)',
                                    border: `1px solid ${numDice === n ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                                    cursor: 'pointer', transition: 'all 0.2s',
                                }}>{n}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dice Type</label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {sideOptions.map(s => (
                                <button key={s} onClick={() => setSides(s)} style={{
                                    padding: '0.5rem 0.6rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.85rem',
                                    background: sides === s ? 'var(--color-secondary)' : 'var(--color-bg)',
                                    color: sides === s ? '#fff' : 'var(--color-text-primary)',
                                    border: `1px solid ${sides === s ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                                    cursor: 'pointer', transition: 'all 0.2s',
                                }}>D{s}</button>
                            ))}
                        </div>
                    </div>
                </div>

                <button onClick={roll} disabled={isRolling} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginBottom: '2rem' }}>
                    🎲 {isRolling ? 'Rolling...' : 'Roll Dice!'}
                </button>

                {dice.length > 0 && (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                            {dice.map(d => (
                                <DiceFace key={d.id} value={d.value} sides={sides} rolling={isRolling} />
                            ))}
                        </div>
                        {!isRolling && dice.length > 1 && (
                            <div style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)' }}>
                                Total: <span style={{ fontWeight: 900, fontSize: '1.5rem', color: 'var(--color-secondary)' }}>{total}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {rollHistory.length > 1 && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '0.75rem' }}>Recent Totals</h3>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {rollHistory.map((t, i) => (
                            <span key={i} style={{ padding: '0.3rem 0.9rem', borderRadius: '2rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)', fontWeight: 700, fontSize: '1rem', opacity: 1 - i * 0.1 }}>{t}</span>
                        ))}
                    </div>
                </div>
            )}

            <FAQSection items={faqs} />
            <style jsx>{`
                @keyframes diceRoll {
                    from { transform: rotate(-8deg) scale(0.95); }
                    to   { transform: rotate(8deg) scale(1.05); }
                }
                @keyframes diceSettle {
                    from { transform: scale(0.8); }
                    to   { transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
