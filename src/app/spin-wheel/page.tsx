'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';

const COLORS = [
    '#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6',
    '#ef4444', '#8b5cf6', '#14b8a6', '#f97316', '#06b6d4',
];

function drawWheel(canvas: HTMLCanvasElement, options: string[], rotation: number) {
    const ctx = canvas.getContext('2d')!;
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const radius = cx - 10;
    const arc = (2 * Math.PI) / options.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    options.forEach((opt, i) => {
        const startAngle = i * arc + rotation;
        const endAngle = startAngle + arc;
        // Slice
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Text
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(startAngle + arc / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${Math.min(14, 80 / options.length + 8)}px Inter, sans-serif`;
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.shadowBlur = 3;
        const text = opt.length > 14 ? opt.slice(0, 12) + '…' : opt;
        ctx.fillText(text, radius - 14, 5);
        ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 3;
    ctx.stroke();
}

export default function SpinWheel() {
    const [options, setOptions] = useState<string[]>(['Option 1', 'Option 2', 'Option 3', 'Option 4']);
    const [newOption, setNewOption] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [rotation, setRotation] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number | null>(null);
    const rotRef = useRef(0);

    const draw = useCallback((rot: number) => {
        if (canvasRef.current && options.length > 0) {
            drawWheel(canvasRef.current, options, rot);
        }
    }, [options]);

    useEffect(() => { draw(rotation); }, [draw, rotation, options]);

    const spin = () => {
        if (isSpinning || options.length < 2) return;
        setIsSpinning(true);
        setResult(null);
        const totalSpins = 8 + Math.random() * 5;
        const targetAngle = totalSpins * 2 * Math.PI;
        const duration = 4000 + Math.random() * 1500;
        const startTime = performance.now();
        const startRot = rotRef.current;

        const animate = (now: number) => {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - t, 4);
            const currentRot = startRot + targetAngle * ease;
            rotRef.current = currentRot;
            draw(currentRot);

            if (t < 1) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                const normalRot = currentRot % (2 * Math.PI);
                const arc = (2 * Math.PI) / options.length;
                // Needle is at top (270 deg = -Math.PI/2), find which slice is under it
                const pointerAngle = (2 * Math.PI - normalRot - Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI);
                const idx = Math.floor(pointerAngle / arc) % options.length;
                setResult(options[idx]);
                setIsSpinning(false);
            }
        };
        rafRef.current = requestAnimationFrame(animate);
    };

    const addOption = () => {
        if (newOption.trim() && options.length < 10) {
            setOptions(prev => [...prev, newOption.trim()]);
            setNewOption('');
            setResult(null);
        }
    };

    const removeOption = (i: number) => {
        setOptions(prev => prev.filter((_, idx) => idx !== i));
        setResult(null);
    };

    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const updateOption = (i: number, val: string) => {
        const newOptions = [...options];
        newOptions[i] = val;
        setOptions(newOptions);
        setResult(null);
    };

    const calc = calculators.find(c => c.href === '/spin-wheel');
    const faqs = [
        { question: "How many options can I add?", answer: "You can add up to 10 custom options. Each gets its own color slice on the wheel." },
        { question: "Can I rename an option?", answer: "Yes! Simply click on any option name in the list to edit it. Press Enter or click away to save." },
        { question: "How is the result determined?", answer: "A random total rotation angle is generated before spinning. The physics-based deceleration then determines which slice lands under the pointer." },
    ];

    return (
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Spin the Wheel'} description={calc?.description || ''} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
                {/* Wheel */}
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
                        {/* Pointer */}
                        <div style={{
                            position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)',
                            width: '0', height: '0',
                            borderLeft: '12px solid transparent', borderRight: '12px solid transparent',
                            borderTop: '28px solid #ef4444', zIndex: 10, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                        }} />
                        <canvas ref={canvasRef} width={300} height={300} style={{ borderRadius: '50%', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }} />
                    </div>

                    {result && !isSpinning && (
                        <div style={{ padding: '1rem', background: 'rgba(99,102,241,0.1)', borderRadius: '1rem', border: '2px solid rgba(99,102,241,0.3)', marginBottom: '1rem', animation: 'spinResult 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>🎯 Winner!</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>{result}</div>
                        </div>
                    )}

                    <button onClick={spin} disabled={isSpinning || options.length < 2} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
                        {isSpinning ? '🎡 Spinning...' : '🎡 Spin the Wheel!'}
                    </button>
                </div>

                {/* Options Panel */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <h3 style={{ marginBottom: '0' }}>Options</h3>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input className="input" value={newOption} onChange={e => setNewOption(e.target.value)} onKeyDown={e => e.key === 'Enter' && addOption()} placeholder="Add option..." style={{ flex: 1, padding: '0.6rem 0.8rem', fontSize: '0.9rem' }} />
                        <button onClick={addOption} disabled={!newOption.trim() || options.length >= 10} style={{ padding: '0.6rem 1rem', background: 'var(--color-secondary)', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '1.1rem' }}>+</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '350px', overflowY: 'auto' }}>
                        {options.map((opt, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                                {editingIndex === i ? (
                                    <input
                                        autoFocus
                                        className="input"
                                        value={opt}
                                        onChange={e => updateOption(i, e.target.value)}
                                        onBlur={() => setEditingIndex(null)}
                                        onKeyDown={e => e.key === 'Enter' && setEditingIndex(null)}
                                        style={{ flex: 1, padding: '0.2rem 0.4rem', fontSize: '0.9rem', border: '1px solid var(--color-secondary)' }}
                                    />
                                ) : (
                                    <span
                                        onClick={() => setEditingIndex(i)}
                                        title="Click to rename"
                                        style={{ flex: 1, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}
                                    >
                                        {opt}
                                    </span>
                                )}
                                {options.length > 2 && (
                                    <button onClick={() => removeOption(i)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.2rem', flexShrink: 0 }}>×</button>
                                )}
                            </div>
                        ))}
                    </div>
                    {options.length < 2 && <div style={{ fontSize: '0.8rem', color: 'var(--color-error)' }}>Add at least 2 options to spin.</div>}
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', textAlign: 'center', marginTop: '0.5rem' }}>
                        💡 Tip: Click an option name to rename it.
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <FAQSection items={faqs} />
            </div>
            <style jsx>{`
                @keyframes spinResult {
                    from { transform: scale(0.8); opacity: 0; }
                    to   { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
