'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

type Tone = 'Professional' | 'Creative' | 'Minimalist' | 'Funny' | 'Motivation';

export default function BioGenerator() {
    const [name, setName] = useState<string>('');
    const [occupation, setOccupation] = useState<string>('');
    const [hobbies, setHobbies] = useState<string>('');
    const [tone, setTone] = useState<Tone>('Professional');
    const [generatedBio, setGeneratedBio] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    const templates = {
        'Professional': [
            "Hi, I'm {name}. {occupation} passionate about growth and innovation. 🚀",
            "{occupation} based in the digital world. Helping others achieve {hobby1}. 💼",
            "Driven {occupation} | Focus on excellence & efficiency | Let's connect! 🤝"
        ],
        'Creative': [
            "✨ Creating magic as a {occupation}. Lover of {hobby1} & {hobby2}.",
            "Turning ideas into reality. {occupation} by day, {hobby1} enthusiast by night. 🎨",
            "Life is a canvas and I'm the {occupation} painting it. 🌈 {hobby1} + {hobby2}"
        ],
        'Minimalist': [
            "{name} | {occupation}",
            "{occupation} • {hobby1} • Based nowhere",
            "Less is more. {occupation}. 📍"
        ],
        'Funny': [
            "Professional {occupation}. I'm actually a 10/10 at {hobby1}.",
            "I'm here for a good time, not a long time. {occupation} & {hobby1} expert.",
            "Probably thinking about {hobby1}. {occupation} for rent. 🍕"
        ],
        'Motivation': [
            "Dream big. Work hard. Stay humble. {occupation} on a mission. ✨",
            "Better every day. {occupation} | {hobby1} | Growth mindset only. 📈",
            "Inspiring through {occupation}. Be the change you want to see. 🌟"
        ]
    };

    const generateBio = () => {
        const hobbyList = hobbies.split(',').map(s => s.trim()).filter(s => s.length > 0);
        const hobby1 = hobbyList[0] || 'exploring';
        const hobby2 = hobbyList[1] || 'coffee';

        const toneTemplates = templates[tone];
        const randomTemplate = toneTemplates[Math.floor(Math.random() * toneTemplates.length)];

        let bio = randomTemplate
            .replace(/{name}/g, name || 'User')
            .replace(/{occupation}/g, occupation || 'Innovator')
            .replace(/{hobby1}/g, hobby1)
            .replace(/{hobby2}/g, hobby2);

        setGeneratedBio(bio);
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedBio);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const faqs = [
        {
            question: "Why is a good bio important?",
            answer: "Your bio is your digital first impression. It tells people who you are, what you do, and why they should follow or connect with you in just a few seconds."
        },
        {
            question: "What should I include in my bio?",
            answer: "Include your name or brand, what you do (occupation/role), a touch of personality (hobbies), and a call to action or link if applicable."
        },
        {
            question: "Can I use emojis in my bio?",
            answer: "Yes! Emojis help break up text, add personality, and make your bio more visually appealing. However, use them sparingly to keep it professional."
        }
    ];

    const calc = calculators.find(c => c.href === '/bio-generator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Bio Generator'}
                description={calc?.description || 'Create a stunning bio for Instagram, TikTok, or Twitter in seconds.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Name</label>
                            <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. mike" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Occupation</label>
                            <input type="text" className="input" value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="e.g. Web Developer" style={{ width: '100%' }} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Hobbies (comma separated)</label>
                        <input type="text" className="input" value={hobbies} onChange={(e) => setHobbies(e.target.value)} placeholder="e.g. Coding, Hiking, Reading" style={{ width: '100%' }} />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Tone</label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {(Object.keys(templates) as Tone[]).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTone(t)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '2rem',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        backgroundColor: tone === t ? '#2563eb' : 'rgba(30, 41, 59, 0.4)',
                                        color: tone === t ? '#fff' : 'var(--color-text-secondary)',
                                        border: tone === t ? '1px solid #2563eb' : '1px solid rgba(255, 255, 255, 0.05)',
                                    }}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button onClick={generateBio} className="btn btn-primary" style={{ padding: '1rem' }}>Generate Bio</button>

                    {generatedBio && (
                        <div style={{
                            background: 'rgba(15, 23, 42, 0.5)',
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            <div style={{ fontSize: '1.1rem', color: '#fff', whiteSpace: 'pre-wrap' }}>
                                {generatedBio}
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="btn btn-secondary"
                                style={{ alignSelf: 'flex-end', padding: '0.5rem 1rem' }}
                            >
                                {copied ? 'Copied!' : 'Copy Bio'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
