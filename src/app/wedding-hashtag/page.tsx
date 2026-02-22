'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function WeddingHashtagGenerator() {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [year, setYear] = useState('2026');
    const [hashtags, setHashtags] = useState<string[]>([]);

    const generateHashtags = () => {
        if (!name1 || !name2) return;
        const n1 = name1.trim().replace(/\s+/g, '');
        const n2 = name2.trim().replace(/\s+/g, '');
        const y = year.trim();

        const results = [
            `#${n1}And${n2}`,
            `#${n1}Plus${n2}`,
            `#The${n1}And${n2}s`,
            `#${n1}Heart${n2}`,
            `#${n1}${n2}${y}`,
            `#HappilyEver${n1}`,
            `#${n1}Squared`,
            `#Team${n1}${n2}`
        ];
        setHashtags(results);
    };

    const faqs = [
        {
            question: "When should I choose my wedding hashtag?",
            answer: "The best time is as soon as you have your date! You can use it for your Save-the-Dates, wedding website, and social media announcements."
        },
        {
            question: "What makes a good wedding hashtag?",
            answer: "A good hashtag is unique, easy to remember, and personal to the couple. Capitalize the first letter of each word to make it easier for guests to read."
        },
        {
            question: "How do I check if my hashtag is taken?",
            answer: "Search for the hashtag on Instagram and Facebook. If there are already thousands of posts, you might want to add your year or a specific keyword to make it unique to your day."
        }
    ];

    const calc = calculators.find(c => c.href === '/wedding-hashtag');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Wedding Hashtag Generator'}
                description={calc?.description || 'Find the perfect personal hashtag to capture memories.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', gap: '1rem' }}>
                        <input className="input" placeholder="Partner 1 Name" value={name1} onChange={(e) => setName1(e.target.value)} />
                        <input className="input" placeholder="Partner 2 Name" value={name2} onChange={(e) => setName2(e.target.value)} />
                        <input className="input" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
                    </div>
                    <button onClick={generateHashtags} className="btn btn-primary" style={{ padding: '1rem' }}>Generate Wedding Tags</button>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                        {hashtags.map((tag, i) => (
                            <div key={i} style={{
                                background: 'rgba(30, 41, 59, 0.4)',
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                color: 'var(--color-primary)',
                                fontWeight: 700,
                                textAlign: 'center',
                                cursor: 'pointer'
                            }}
                                onClick={() => {
                                    navigator.clipboard.writeText(tag);
                                    alert(`Copied ${tag}!`);
                                }}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
