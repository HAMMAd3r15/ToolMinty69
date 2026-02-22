'use client';

import { useState, useCallback, useEffect } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';

function hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function hexToHsl(hex: string) {
    let { r, g, b } = hexToRgb(hex);
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function randomHex() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase();
}

function isLight(hex: string) {
    const { r, g, b } = hexToRgb(hex);
    return (r * 0.299 + g * 0.587 + b * 0.114) > 128;
}

function hslToHex(h: number, s: number, l: number) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

type PaletteItem = { hex: string; locked: boolean };
type HarmonyMode = 'random' | 'monochromatic' | 'analogous' | 'complementary' | 'triadic';

export default function RandomColorGenerator() {
    const [color, setColor] = useState<string>('#4F46E5');
    const [harmony, setHarmony] = useState<HarmonyMode>('random');
    const [palette, setPalette] = useState<PaletteItem[]>([
        { hex: '#4F46E5', locked: false },
        { hex: '#6366F1', locked: false },
        { hex: '#818CF8', locked: false },
        { hex: '#A5B4FC', locked: false },
        { hex: '#C7D2FE', locked: false },
    ]);
    const [copied, setCopied] = useState<string | null>(null);

    const generateColor = useCallback(() => {
        const c = randomHex();
        setColor(c);
        // If we generate a new main color, we might want to refresh the palette too if not locked
        // For now, let's keep them separate or link them via a "Generate All" button
    }, []);

    const generatePalette = useCallback((currentBase: string, mode: HarmonyMode) => {
        const { h, s, l } = hexToHsl(currentBase);
        const newPalette: PaletteItem[] = [...palette];

        for (let i = 0; i < 5; i++) {
            if (newPalette[i]?.locked) continue;

            let newHex = '';
            // Add a bit of jitter to make the palette feel "fresh" on every generation
            const jitter = (Math.random() - 0.5) * 10;
            const sJitter = (Math.random() - 0.5) * 10;

            if (mode === 'random') {
                newHex = randomHex();
            } else if (mode === 'monochromatic') {
                const newL = Math.max(10, Math.min(90, l + (i - 2) * 15 + jitter));
                newHex = hslToHex(h, Math.max(0, Math.min(100, s + sJitter)), newL);
            } else if (mode === 'analogous') {
                const newH = (h + (i - 2) * 20 + jitter + 360) % 360;
                newHex = hslToHex(newH, Math.max(0, Math.min(100, s + sJitter)), Math.max(10, Math.min(90, l + jitter / 2)));
            } else if (mode === 'complementary') {
                if (i === 0) newHex = currentBase;
                else if (i === 1) newHex = hslToHex(h, Math.max(0, s - 20 + jitter), Math.min(100, l + 20 + jitter));
                else if (i === 2) newHex = hslToHex((h + 180 + jitter) % 360, s, l);
                else if (i === 3) newHex = hslToHex((h + 180 + jitter) % 360, s, Math.max(0, l - 20 + jitter));
                else newHex = hslToHex((h + 180 + jitter) % 360, Math.max(0, s - 20 + jitter), l);
            } else if (mode === 'triadic') {
                if (i === 0) newHex = currentBase;
                else if (i === 1) newHex = hslToHex((h + 120 + jitter) % 360, s, l);
                else if (i === 2) newHex = hslToHex((h + 120 + jitter) % 360, s, Math.max(10, l - 20 + jitter));
                else if (i === 3) newHex = hslToHex((h + 240 + jitter) % 360, s, l);
                else newHex = hslToHex((h + 240 + jitter) % 360, s, Math.max(10, l - 20 + jitter));
            }

            newPalette[i] = { hex: newHex, locked: false };
        }
        setPalette(newPalette);
    }, [palette]);

    // Auto-update palette when mode or base color changes
    useEffect(() => {
        generatePalette(color, harmony);
    }, [color, harmony]);

    const toggleLock = (index: number) => {
        const next = [...palette];
        next[index].locked = !next[index].locked;
        setPalette(next);
    };

    const copy = useCallback((text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 1500);
    }, []);

    const rgb = hexToRgb(color);
    const hslCurrent = hexToHsl(color);
    const textColor = isLight(color) ? '#111' : '#fff';
    const calc = calculators.find(c => c.href === '/random-color');

    const faqs = [
        { question: "What are color harmonies?", answer: "Color harmonies are sets of colors that follow specific mathematical relationships on the color wheel, like Complementary (opposites) or Analogous (neighbors), ensuring they look great together." },
        { question: "How does the locking feature work?", answer: "Click the lock icon on any color in your palette. When you generate a new palette, locked colors will remain unchanged, allowing you to build around colors you love." },
        { question: "What is HSL vs HEX?", answer: "HEX is a representation of RGB values. HSL stands for Hue, Saturation, and Lightness, which is often easier for designers to adjust and understand color relationships." },
    ];

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Elite Random Color Generator'} description={calc?.description || ''} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Main Color Area */}
                    <div style={{
                        flex: 1, minHeight: '300px', borderRadius: '2rem', background: color,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        position: 'relative', overflow: 'hidden', boxShadow: `0 30px 60px ${color}40`,
                        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}>
                        <div style={{ textAlign: 'center', color: textColor, zIndex: 1 }}>
                            <div style={{ fontSize: '1rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 600, marginBottom: '0.5rem' }}>Active Color</div>
                            <div style={{ fontSize: '4.5rem', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '-0.02em' }}>{color}</div>
                            <button onClick={() => copy(color)} className="elite-copy-btn" style={{ color: textColor, border: `1px solid ${textColor}40`, background: `${textColor}10` }}>
                                {copied === color ? '✓' : '📋 Copy Hex'}
                            </button>
                        </div>
                    </div>

                    {/* Quick Info Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        {[
                            { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
                            { label: 'HSL', value: `hsl(${hslCurrent.h}, ${hslCurrent.s}%, ${hslCurrent.l}%)` },
                        ].map(({ label, value }) => (
                            <div key={label} onClick={() => copy(value)} style={{
                                padding: '1.25rem', borderRadius: '1.25rem', background: 'var(--color-surface)',
                                border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.2s', position: 'relative'
                            }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)', opacity: 0.5, textTransform: 'uppercase', marginBottom: '0.25rem' }}>{label}</div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem', fontFamily: 'monospace' }}>{value}</div>
                                {copied === value && <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--color-success)', fontSize: '0.7rem' }}>Copied!</div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Control Panel */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Harmony Mode</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {(['random', 'monochromatic', 'analogous', 'complementary', 'triadic'] as HarmonyMode[]).map(m => (
                                <button key={m} onClick={() => setHarmony(m)} style={{
                                    padding: '0.8rem 1rem', borderRadius: '0.75rem', textAlign: 'left',
                                    background: harmony === m ? 'var(--color-secondary)' : 'var(--color-bg)',
                                    color: harmony === m ? '#fff' : 'var(--color-text-primary)',
                                    border: `1px solid ${harmony === m ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                                    cursor: 'pointer', transition: 'all 0.2s', fontWeight: 600, textTransform: 'capitalize'
                                }}>{m}</button>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <button onClick={generateColor} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>✨ New Base Color</button>
                        <button onClick={() => generatePalette(color, harmony)} className="btn btn-secondary" style={{ width: '100%', padding: '1rem' }}>🎨 Generate Palette</button>
                    </div>
                </div>
            </div>

            {/* Elite Palette Section */}
            <div className="card" style={{ padding: '2rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <h3 style={{ margin: 0 }}>Smart Color Palette</h3>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)' }}>
                        Space/Click to randomize • Toggle lock to save
                    </div>
                </div>

                <div style={{ display: 'flex', height: '280px', gap: '1rem' }}>
                    {palette.map((item, i) => {
                        const isC = isLight(item.hex);
                        const cTextColor = isC ? '#111' : '#fff';
                        return (
                            <div key={i} style={{
                                flex: 1, borderRadius: '1.5rem', background: item.hex,
                                position: 'relative', display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '1.5rem',
                                transition: 'all 0.3s ease', boxShadow: `0 10px 30px ${item.hex}30`,
                                overflow: 'hidden'
                            }}>
                                {/* Details on Hover */}
                                <div className="palette-controls" style={{
                                    display: 'flex', flexDirection: 'column', gap: '1rem',
                                    color: cTextColor, alignItems: 'center', zIndex: 2
                                }}>
                                    <button onClick={() => toggleLock(i)} style={{
                                        background: 'none', border: 'none', cursor: 'pointer', color: cTextColor,
                                        fontSize: '1.4rem', opacity: item.locked ? 1 : 0.3, transition: 'opacity 0.2s'
                                    }}>
                                        {item.locked ? '🔒' : '🔓'}
                                    </button>
                                    <div style={{ fontWeight: 900, fontSize: '0.9rem', fontFamily: 'monospace', cursor: 'pointer' }} onClick={() => copy(item.hex)}>
                                        {copied === item.hex ? 'COPIED' : item.hex}
                                    </div>
                                </div>

                                {/* Click to set as base */}
                                <button onClick={() => setColor(item.hex)} style={{
                                    position: 'absolute', top: '1rem', right: '1rem',
                                    background: `${cTextColor}20`, border: `1px solid ${cTextColor}40`,
                                    width: '32px', height: '32px', borderRadius: '50%', color: cTextColor,
                                    cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }} title="Set as base">🎯</button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <FAQSection items={faqs} />

            <style jsx>{`
                .elite-copy-btn {
                    margin-top: 1rem;
                    padding: 0.5rem 1.25rem;
                    border-radius: 100px;
                    font-size: 0.875rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .elite-copy-btn:hover {
                    transform: scale(1.05);
                    background: rgba(255,255,255,0.2) !important;
                }
                .palette-controls button:hover {
                    opacity: 1 !important;
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
}
