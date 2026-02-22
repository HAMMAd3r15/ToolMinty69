'use client';

import { useState, useEffect } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function UsernameGenerator() {
    const [name, setName] = useState<string>('');
    const [usernames, setUsernames] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const prefixes = ['The', 'Real', 'Official', 'Its', 'Mr', 'Ms', 'Dr', 'Agent', 'Pixel', 'Sonic', 'Hyper', 'Meta', 'Zen', 'Cyber'];
    const suffixes = ['Official', 'Prime', 'HQ', 'Dev', 'Design', 'Art', 'Gaming', 'Fitness', 'Vlogs', 'World', 'Space', 'Labs', 'Pro'];
    const adjectives = ['Cool', 'Swift', 'Epic', 'Brave', 'Smart', 'Happy', 'Neon', 'Golden', 'Silver', 'Mystic', 'Silent', 'Wild'];

    const generateUsernames = () => {
        const base = name.trim() || 'User';
        const list: string[] = [];

        // Simple combinations
        list.push(`${base}${Math.floor(Math.random() * 999)}`);
        list.push(`${base}_${adjectives[Math.floor(Math.random() * adjectives.length)]}`);
        list.push(`${prefixes[Math.floor(Math.random() * prefixes.length)]}${base}`);
        list.push(`${base}${suffixes[Math.floor(Math.random() * suffixes.length)]}`);
        list.push(`${adjectives[Math.floor(Math.random() * adjectives.length)]}${base}${Math.floor(Math.random() * 99)}`);
        list.push(`_${base}_`);
        list.push(`${base}.${suffixes[Math.floor(Math.random() * suffixes.length)]}`);
        list.push(`${prefixes[Math.floor(Math.random() * prefixes.length)]}_${base}`);
        list.push(`${base}${Math.floor(Math.random() * 90) + 10}`);
        list.push(`I_Am_${base}`);

        setUsernames(list);
    };

    useEffect(() => {
        generateUsernames();
    }, []);

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const faqs = [
        {
            question: "How do I choose a good username?",
            answer: "A good username is memorable, relatively short, and reflects your brand or personality. Avoid using too many numbers or complex special characters if you want people to find you easily."
        },
        {
            question: "Why should I use a username generator?",
            answer: "Generators help you find creative variations that might already be taken on popular platforms. They combine adjectives, prefixes, and suffixes to give you a unique identity."
        },
        {
            question: "Are these usernames unique?",
            answer: "They are generated using random combinations, but availability depends on the platform (Instagram, TikTok, Twitter, etc.). Always check the platform before committing to a name."
        }
    ];

    const calc = calculators.find(c => c.href === '/username-generator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Username Generator'}
                description={calc?.description || 'Find the perfect handle for your social media profiles.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Enter your name or keyword</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                type="text"
                                className="input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. mike"
                                style={{ flex: 1 }}
                            />
                            <button onClick={generateUsernames} className="btn btn-primary">Generate</button>
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '1rem'
                    }}>
                        {usernames.map((u, i) => (
                            <div
                                key={i}
                                onClick={() => copyToClipboard(u, i)}
                                style={{
                                    background: 'rgba(30, 41, 59, 0.4)',
                                    padding: '1rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                className="username-item"
                            >
                                <span style={{ fontWeight: 600, color: '#fff' }}>{u}</span>
                                {copiedIndex === i && (
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'var(--color-primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        fontWeight: 700
                                    }}>
                                        Copied!
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />

            <style jsx>{`
                .username-item:hover {
                    background: rgba(37, 99, 235, 0.1);
                    border-color: rgba(37, 99, 235, 0.4);
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    );
}
