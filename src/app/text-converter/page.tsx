'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

type Mode = 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'snake';

function toTitleCase(s: string) {
    return s.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}
function toSentenceCase(s: string) {
    return s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
}
function toCamelCase(s: string) {
    return s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
}
function toSnakeCase(s: string) {
    return s.toLowerCase().trim().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
}

export default function TextConverter() {
    const [text, setText] = useState('');
    const [mode, setMode] = useState<Mode>('upper');
    const [copied, setCopied] = useState(false);
    const toolData = calculators.find(c => c.href === '/text-converter');

    const convert = (t: string, m: Mode) => {
        switch (m) {
            case 'upper': return t.toUpperCase();
            case 'lower': return t.toLowerCase();
            case 'title': return toTitleCase(t);
            case 'sentence': return toSentenceCase(t);
            case 'camel': return toCamelCase(t);
            case 'snake': return toSnakeCase(t);
        }
    };

    const result = convert(text, mode);

    const copy = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const modes: { value: Mode; label: string; example: string }[] = [
        { value: 'upper', label: 'UPPERCASE', example: 'HELLO WORLD' },
        { value: 'lower', label: 'lowercase', example: 'hello world' },
        { value: 'title', label: 'Title Case', example: 'Hello World' },
        { value: 'sentence', label: 'Sentence case', example: 'Hello world' },
        { value: 'camel', label: 'camelCase', example: 'helloWorld' },
        { value: 'snake', label: 'snake_case', example: 'hello_world' },
    ];

    const faqs = [
        { question: "What is camelCase?", answer: "CamelCase removes spaces and capitalizes each word except the first. It's widely used in programming (e.g. variable names in JavaScript)." },
        { question: "What is snake_case?", answer: "snake_case replaces spaces with underscores and makes everything lowercase. It's common in Python and database field names." },
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Text Converter'}
                description={toolData?.description || 'Convert text between uppercase, lowercase, title case, camelCase, snake_case and more.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Input Text</label>
                        <textarea
                            className="input"
                            value={text}
                            onChange={e => setText(e.target.value)}
                            placeholder="Type or paste your text here..."
                            rows={5}
                            style={{ resize: 'vertical', fontFamily: 'inherit' }}
                        />
                    </div>

                    {/* Mode Selector */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 500 }}>Conversion Mode</label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {modes.map(m => (
                                <button
                                    key={m.value}
                                    onClick={() => setMode(m.value)}
                                    title={`Example: ${m.example}`}
                                    style={{
                                        padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.82rem', fontWeight: 600,
                                        cursor: 'pointer', transition: 'all 0.2s ease',
                                        background: mode === m.value ? '#2563eb' : 'rgba(255,255,255,0.05)',
                                        color: mode === m.value ? '#fff' : 'var(--color-text-secondary)',
                                        border: mode === m.value ? '1px solid #2563eb' : '1px solid rgba(255,255,255,0.08)',
                                    }}
                                >{m.label}</button>
                            ))}
                        </div>
                    </div>

                    {text && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Result</label>
                            <div style={{
                                padding: '1.25rem',
                                background: 'rgba(37,99,235,0.06)',
                                border: '1px solid rgba(37,99,235,0.2)',
                                borderRadius: '0.75rem',
                                fontFamily: 'monospace',
                                fontSize: '0.95rem',
                                lineHeight: '1.6',
                                color: '#fff',
                                wordBreak: 'break-all',
                                minHeight: '80px'
                            }}>
                                {result}
                            </div>
                            <button
                                onClick={copy}
                                style={{
                                    marginTop: '0.75rem', padding: '0.6rem 1.5rem', borderRadius: '0.75rem',
                                    background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(37,99,235,0.15)',
                                    border: copied ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(37,99,235,0.4)',
                                    color: copied ? '#22c55e' : '#2563eb', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem',
                                    transition: 'all 0.2s ease'
                                }}
                            >{copied ? '✓ Copied!' : '📋 Copy Result'}</button>
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
