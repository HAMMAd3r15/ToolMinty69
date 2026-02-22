'use client';

import { useState, useCallback } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';

function randomHex() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase();
}

type GradientDir = 'to right' | 'to bottom right' | 'to bottom' | 'to bottom left' | 'to left' | '135deg' | '45deg';

const DIRECTIONS: { label: string; value: GradientDir }[] = [
    { label: '→', value: 'to right' },
    { label: '↘', value: 'to bottom right' },
    { label: '↓', value: 'to bottom' },
    { label: '↙', value: 'to bottom left' },
    { label: '←', value: 'to left' },
    { label: '↗', value: '45deg' },
    { label: '↖', value: '135deg' },
];

export default function RandomGradient() {
    // Use fixed colors for initial state to avoid hydration mismatch
    const [colors, setColors] = useState<string[]>(['#4F46E5', '#6366F1']);
    const [direction, setDirection] = useState<GradientDir>('to right');
    const [copied, setCopied] = useState(false);
    const [animKey, setAnimKey] = useState(0);

    const gradient = `linear-gradient(${direction}, ${colors.join(', ')})`;
    const cssCode = `background: ${gradient};`;

    const generate = () => {
        setColors([randomHex(), randomHex()]);
        setAnimKey(k => k + 1);
    };

    const generateTriple = () => {
        setColors([randomHex(), randomHex(), randomHex()]);
        setAnimKey(k => k + 1);
    };

    const copy = useCallback(() => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }, [cssCode]);

    const calc = calculators.find(c => c.href === '/random-gradient');
    const faqs = [
        { question: "What is a CSS linear-gradient?", answer: "A linear-gradient is a CSS function that creates smooth color transitions along a line. It's widely used for backgrounds, buttons, and text effects." },
        { question: "How do I use the generated CSS?", answer: "Click the 'Copy CSS' button and paste it into your stylesheet. The code works in all modern browsers and CSS preprocessors." },
        { question: "Can I generate 3-color gradients?", answer: "Yes! Click 'Three Colors' to generate a gradient with three color stops, creating a more complex and dynamic effect." },
    ];

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Random Gradient Generator'} description={calc?.description || ''} />

            {/* Preview */}
            <div key={animKey} style={{
                height: '200px', borderRadius: '1.5rem', background: gradient,
                marginBottom: '1.5rem', boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                animation: 'gradientFade 0.5s ease-out',
            }} />

            <div className="card" style={{ marginBottom: '1.5rem' }}>
                {/* Direction Picker */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, color: 'var(--color-text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Direction</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {DIRECTIONS.map(d => (
                            <button key={d.value} onClick={() => setDirection(d.value)} style={{
                                width: '40px', height: '40px', borderRadius: '0.5rem', fontWeight: 700, fontSize: '1.1rem',
                                background: direction === d.value ? 'var(--color-secondary)' : 'var(--color-bg)',
                                color: direction === d.value ? '#fff' : 'var(--color-text-primary)',
                                border: `1px solid ${direction === d.value ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                                cursor: 'pointer', transition: 'all 0.2s',
                            }}>{d.label}</button>
                        ))}
                    </div>
                </div>

                {/* Color Swatches */}
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {colors.map((c, i) => (
                        <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                            <div style={{ height: '50px', borderRadius: '0.75rem', background: c, marginBottom: '0.4rem', border: '2px solid var(--color-border)' }} />
                            <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.9rem' }}>{c}</div>
                        </div>
                    ))}
                </div>

                {/* CSS Code */}
                <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', fontFamily: 'monospace', fontSize: '0.9rem', wordBreak: 'break-all' }}>
                    {cssCode}
                </div>

                {/* Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                    <button onClick={generate} className="btn btn-primary">🎨 Two Colors</button>
                    <button onClick={generateTriple} className="btn btn-secondary">🌈 Three Colors</button>
                    <button onClick={copy} className="btn btn-secondary">{copied ? '✓ Copied!' : '📋 Copy CSS'}</button>
                </div>
            </div>

            <FAQSection items={faqs} />
            <style jsx>{`
                @keyframes gradientFade {
                    from { opacity: 0; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
