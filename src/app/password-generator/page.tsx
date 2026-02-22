'use client';

import { useState, useEffect } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function PasswordGenerator() {
    const [length, setLength] = useState<number>(16);
    const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
    const [password, setPassword] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    const generatePassword = () => {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let chars = lowercase;
        if (includeUppercase) chars += uppercase;
        if (includeNumbers) chars += numbers;
        if (includeSymbols) chars += symbols;

        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            generatedPassword += chars[randomIndex];
        }
        setPassword(generatedPassword);
        setCopied(false);
    };

    useEffect(() => {
        generatePassword();
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const faqs = [
        {
            question: "What makes a password strong?",
            answer: "A strong password is typically at least 12 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols. Randomness is the most important factor."
        },
        {
            question: "Is this generator secure?",
            answer: "Yes. This tool runs entirely in your browser using local JavaScript logic. Your generated passwords are never sent to a server or stored anywhere."
        },
        {
            question: "How often should I change my passwords?",
            answer: "Security experts now recommend using long, unique passwords for every account and changing them only if you suspect a breach, rather than on a fixed schedule."
        }
    ];

    const calc = calculators.find(c => c.href === '/password-generator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Password Generator'}
                description={calc?.description || 'Create strong, random, and secure passwords instantly.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.5)',
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem'
                    }}>
                        <code style={{
                            fontSize: '1.5rem',
                            color: 'var(--color-primary)',
                            wordBreak: 'break-all',
                            fontFamily: 'monospace'
                        }}>
                            {password}
                        </code>
                        <button
                            onClick={copyToClipboard}
                            className="btn btn-primary"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', minWidth: '80px' }}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>Password Length: {length}</label>
                            </div>
                            <input
                                type="range"
                                min="4"
                                max="50"
                                value={length}
                                onChange={(e) => setLength(parseInt(e.target.value))}
                                style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
                                <span style={{ fontSize: '0.9rem' }}>Uppercase Letters</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
                                <span style={{ fontSize: '0.9rem' }}>Numbers</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
                                <span style={{ fontSize: '0.9rem' }}>Symbols</span>
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={generatePassword}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '1rem' }}
                    >
                        Generate New Password
                    </button>
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
