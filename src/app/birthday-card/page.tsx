'use client';

import { useState, useRef } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import Button from '@/components/UI/Button';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import { toPng, toBlob } from 'html-to-image';

const DESIGNS = [
    {
        name: 'Royal Midnight',
        bg: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        text: '#FCD34D',
        accent: '#F59E0B',
        border: '2px solid rgba(252, 211, 77, 0.3)',
        decor: '✨'
    },
    {
        name: 'Rose Blossom',
        bg: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
        text: '#BE185D',
        accent: '#DB2777',
        border: '2px solid rgba(219, 39, 119, 0.2)',
        decor: '🌸'
    },
    {
        name: 'Ocean Breeze',
        bg: 'linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)',
        text: '#0369A1',
        accent: '#0E7490',
        border: '2px solid rgba(14, 116, 144, 0.2)',
        decor: '🌊'
    },
    {
        name: 'Emerald Luxe',
        bg: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)',
        text: '#6EE7B7',
        accent: '#34D399',
        border: '2px solid rgba(110, 231, 183, 0.2)',
        decor: '🍃'
    },
    {
        name: 'Cyber Neon',
        bg: 'linear-gradient(135deg, #000000 0%, #111111 100%)',
        text: '#22D3EE',
        accent: '#818CF8',
        border: '2px solid rgba(34, 211, 238, 0.3)',
        decor: '👾'
    }
];

export default function BirthdayCardGenerator() {
    const [name, setName] = useState('Alex');
    const [message, setMessage] = useState('Hope your day is as amazing as you are!');
    const [designIndex, setDesignIndex] = useState(0);
    const [isExporting, setIsExporting] = useState(false);
    const [copied, setCopied] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const currentDesign = DESIGNS[designIndex];

    const handleDownload = async () => {
        if (!cardRef.current) return;
        setIsExporting(true);
        try {
            const dataUrl = await toPng(cardRef.current, { quality: 1, pixelRatio: 2 });
            const link = document.createElement('a');
            link.download = `birthday-card-${name.toLowerCase()}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Download failed', err);
        } finally {
            setIsExporting(false);
        }
    };

    const handleCopy = async () => {
        if (!cardRef.current) return;
        setIsExporting(true);
        try {
            const blob = await toBlob(cardRef.current, { quality: 1, pixelRatio: 2 });
            if (blob) {
                await navigator.clipboard.write([
                    new ClipboardItem({ [blob.type]: blob })
                ]);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error('Copy failed', err);
        } finally {
            setIsExporting(false);
        }
    };

    const faqs = [
        {
            question: "How do I send this card?",
            answer: "Once you've customized your card, use the 'Download PNG' or 'Copy PNG' buttons. You can then send the high-quality image via WhatsApp, Email, or Social Media instantly."
        },
        {
            question: "Is the image high resolution?",
            answer: "Yes! Our generator exports cards at 2x pixel density, ensuring they look sharp and professional even on high-resolution displays."
        },
        {
            question: "Can I use emojis in my message?",
            answer: "Absolutely! Feel free to add emojis to your message to make it even more personal and fun."
        }
    ];

    const calc = calculators.find(c => c.href === '/birthday-card');

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
            <ToolHeader
                title={calc?.title || 'Birthday Card Generator'}
                description={calc?.description || 'Design and export premium, high-quality birthday cards instantly.'}
            />

            <div className="grid-responsive">
                {/* Controls */}
                <div className="card" style={{ height: 'fit-content' }}>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Recipient Name</label>
                            <input
                                type="text"
                                className="input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter name..."
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Message</label>
                            <textarea
                                className="input"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                style={{ width: '100%', height: '100px', resize: 'none' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Select Theme</label>
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                {DESIGNS.map((d, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setDesignIndex(i)}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            background: d.bg,
                                            border: designIndex === i ? `3px solid var(--color-secondary)` : '2px solid transparent',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            padding: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1rem'
                                        }}
                                        title={d.name}
                                    >
                                        {d.decor}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <Button onClick={handleDownload} disabled={isExporting} fullWidth>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" x2="12" y1="15" y2="3" />
                                </svg>
                                {isExporting ? 'Generating...' : 'Download PNG'}
                            </Button>
                            <Button onClick={handleCopy} variant="secondary" disabled={isExporting} fullWidth>
                                {copied ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                        </svg>
                                        Copy PNG
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div style={{ position: 'sticky', top: '2rem' }}>
                    <div
                        ref={cardRef}
                        style={{
                            width: '100%',
                            aspectRatio: '1.4 / 1',
                            background: currentDesign.bg,
                            color: currentDesign.text,
                            border: currentDesign.border,
                            borderRadius: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            padding: '3rem',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Decorative Background Elements */}
                        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: currentDesign.accent, opacity: 0.1, borderRadius: '50%', filter: 'blur(60px)' }}></div>
                        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: currentDesign.accent, opacity: 0.1, borderRadius: '50%', filter: 'blur(60px)' }}></div>

                        {/* Content */}
                        <div style={{
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.4em',
                            marginBottom: '1rem',
                            fontWeight: 800,
                            color: currentDesign.accent,
                            opacity: 0.9
                        }}>
                            Happy Birthday
                        </div>

                        <div style={{
                            fontSize: '4.5rem',
                            fontWeight: 900,
                            marginBottom: '1.5rem',
                            lineHeight: 1,
                            letterSpacing: '-0.04em',
                            textShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}>
                            {name}
                        </div>

                        <div style={{
                            fontSize: '1.35rem',
                            maxWidth: '450px',
                            lineHeight: 1.5,
                            fontWeight: 500,
                            color: currentDesign.text,
                            opacity: 0.95
                        }}>
                            {message}
                        </div>

                        {/* Floating Icons */}
                        <div style={{ position: 'absolute', top: '2rem', right: '3rem', fontSize: '2.5rem', opacity: 0.4 }}>{currentDesign.decor}</div>
                        <div style={{ position: 'absolute', bottom: '2rem', left: '3rem', fontSize: '2.5rem', opacity: 0.4 }}>✨</div>
                        <div style={{ position: 'absolute', top: '50%', left: '2rem', fontSize: '1.5rem', opacity: 0.2, transform: 'translateY(-50%)' }}>🎈</div>
                        <div style={{ position: 'absolute', top: '50%', right: '2rem', fontSize: '1.5rem', opacity: 0.2, transform: 'translateY(-50%)' }}>🎊</div>
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-text-tertiary)' }}>
                        Preview (High-Res Export Supported)
                    </p>
                </div>
            </div>

            <div style={{ marginTop: '4rem' }}>
                <FAQSection items={faqs} />
            </div>
        </div>
    );
}
