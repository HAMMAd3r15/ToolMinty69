'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

type Strength = 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong';

const colors: Record<Strength, string> = {
    'Very Weak': '#ef4444',
    'Weak': '#f97316',
    'Fair': '#eab308',
    'Strong': '#22c55e',
    'Very Strong': '#2563eb',
};

export default function PasswordStrength() {
    const [password, setPassword] = useState('');

    const analyze = (pwd: string) => {
        const checks = {
            length: pwd.length >= 8,
            longLength: pwd.length >= 12,
            uppercase: /[A-Z]/.test(pwd),
            lowercase: /[a-z]/.test(pwd),
            numbers: /[0-9]/.test(pwd),
            special: /[^A-Za-z0-9]/.test(pwd),
        };
        const score = Object.values(checks).filter(Boolean).length;
        let strength: Strength;
        if (score <= 1) strength = 'Very Weak';
        else if (score <= 2) strength = 'Weak';
        else if (score <= 3) strength = 'Fair';
        else if (score <= 4) strength = 'Strong';
        else strength = 'Very Strong';
        return { checks, score, strength };
    };

    const res = password ? analyze(password) : null;
    const maxScore = 6;

    const faqs = [
        { question: "Is my password stored anywhere?", answer: "Absolutely not. All checking happens locally in your browser using JavaScript. Your password is never sent to any server." },
        { question: "What makes a strong password?", answer: "At least 12 characters with a mix of uppercase, lowercase, numbers, and special characters (e.g. !@#$). Avoid common words or predictable patterns." },
    ];

    const criteriaList = [
        { key: 'length', label: 'At least 8 characters' },
        { key: 'longLength', label: 'At least 12 characters' },
        { key: 'uppercase', label: 'Contains uppercase letter' },
        { key: 'lowercase', label: 'Contains lowercase letter' },
        { key: 'numbers', label: 'Contains a number' },
        { key: 'special', label: 'Contains a special character (!@#...)' },
    ];

    const calc = calculators.find(c => c.href === '/password-strength');

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Password Strength Checker'}
                description={calc?.description || 'Instantly evaluate your password security.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Enter Password to Check</label>
                        <input
                            type="text"
                            className="input"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Type a password..."
                            style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}
                            autoComplete="off"
                        />
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {/* Strength bar */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Strength</span>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: colors[res.strength] }}>{res.strength}</span>
                                </div>
                                <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${(res.score / maxScore) * 100}%`,
                                        background: colors[res.strength],
                                        borderRadius: '4px',
                                        transition: 'all 0.4s ease',
                                        boxShadow: `0 0 10px ${colors[res.strength]}66`
                                    }} />
                                </div>
                            </div>

                            {/* Criteria checklist */}
                            <div style={{ display: 'grid', gap: '0.6rem' }}>
                                {criteriaList.map(c => (
                                    <div key={c.key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <span style={{ fontSize: '1rem', color: (res.checks as any)[c.key] ? '#22c55e' : '#ef4444' }}>
                                            {(res.checks as any)[c.key] ? '✓' : '✗'}
                                        </span>
                                        <span style={{ fontSize: '0.875rem', color: (res.checks as any)[c.key] ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }}>
                                            {c.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
