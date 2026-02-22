'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ResultCard from '@/components/UI/ResultCard';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function CharacterCounter() {
    const [text, setText] = useState('');

    const stats = () => {
        const chars = text.length;
        const charsNoSpace = text.replace(/\s/g, '').length;
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim()).length;
        const paragraphs = text.trim() === '' ? 0 : text.split(/\n+/).filter(l => l.trim()).length;
        const readingMins = Math.ceil(words / 200);
        return { chars, charsNoSpace, words, sentences, paragraphs, readingMins };
    };

    const s = stats();
    const hasText = text.length > 0;

    const faqs = [
        { question: "What reading speed is used?", answer: "We use 200 words per minute, which is the average adult reading speed, rounded up to the nearest minute." },
        { question: "How are sentences counted?", answer: "Sentences are split by period, exclamation mark, or question mark. Abbreviations and ellipses may cause slight inaccuracies." },
    ];

    const calc = calculators.find(c => c.href === '/character-counter');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Character Counter'}
                description={calc?.description || 'Instantly count characters, words, and sentences.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <textarea
                        className="input"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Paste or type your text here..."
                        rows={8}
                        style={{ resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.6' }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px,1fr))', gap: '1rem' }}>
                        <ResultCard title="Characters" value={`${s.chars}`} color="primary" />
                        <ResultCard title="No Spaces" value={`${s.charsNoSpace}`} color="secondary" />
                        <ResultCard title="Words" value={`${s.words}`} color="accent" />
                        <ResultCard title="Sentences" value={`${s.sentences}`} color="success" />
                        <ResultCard title="Paragraphs" value={`${s.paragraphs}`} color="primary" />
                        {hasText && <ResultCard title="Reading Time" value={`~${s.readingMins} min`} color="secondary" highlight />}
                    </div>
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
