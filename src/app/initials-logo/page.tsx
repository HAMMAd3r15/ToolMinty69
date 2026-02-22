'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

const FONTS = [
    { name: 'Modern Sans', family: 'sans-serif' },
    { name: 'Elegant Serif', family: 'serif' },
    { name: 'Playful Mono', family: 'monospace' },
    { name: 'Stylish Script', family: '"Brush Script MT", cursive' },
    { name: 'Classic Garamond', family: '"Garamond", serif' },
    { name: 'Bold Impact', family: '"Impact", sans-serif' }
];

export default function InitialsLogoGenerator() {
    const [initials, setInitials] = useState<string>('JD');
    const [bgColor, setBgColor] = useState<string>('#2563eb');
    const [textColor, setTextColor] = useState<string>('#ffffff');
    const [isRound, setIsRound] = useState<boolean>(true);

    const faqs = [
        {
            question: "How can I use these logos?",
            answer: "These logos are perfect for placeholders, profile pictures, or favicons while you are developing a brand. They represent a clean and minimalist aesthetic."
        },
        {
            question: "Can I download my logo?",
            answer: "Currently, you can take a screenshot of your preferred style. We are working on a direct download feature for future updates."
        },
        {
            question: "What color combinations work best?",
            answer: "High contrast is key. Dark backgrounds with light text (or vice versa) ensure your initials are readable and professional."
        }
    ];

    const calc = calculators.find(c => c.href === '/initials-logo');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Initials Logo Generator'}
                description={calc?.description || 'Design simple and stylish initials-based logos.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Initials</label>
                            <input
                                type="text"
                                className="input"
                                value={initials}
                                onChange={(e) => setInitials(e.target.value.toUpperCase().slice(0, 3))}
                                placeholder="e.g. JD"
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>BG Color</label>
                                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: '100%', height: '42px', padding: '0', border: 'none', background: 'transparent' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Text Color</label>
                                <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} style={{ width: '100%', height: '42px', padding: '0', border: 'none', background: 'transparent' }} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={isRound} onChange={(e) => setIsRound(e.target.checked)} />
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Round Shape</span>
                        </label>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                        gap: '2rem',
                        marginTop: '1rem'
                    }}>
                        {FONTS.map((font, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{
                                    width: '120px',
                                    height: '120px',
                                    margin: '0 auto 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: bgColor,
                                    color: textColor,
                                    borderRadius: isRound ? '50%' : '1rem',
                                    fontSize: '2.5rem',
                                    fontWeight: 700,
                                    fontFamily: font.family,
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                                }}>
                                    {initials || '??'}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>{font.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
