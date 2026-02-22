'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function TextEncryption() {
    const [text, setText] = useState<string>('');
    const [shift, setShift] = useState<number>(3);
    const [result, setResult] = useState<string>('');

    const caesarCipher = (str: string, amount: number, decrypt: boolean = false) => {
        if (amount < 0) return caesarCipher(str, amount + 26);
        if (decrypt) amount = (26 - (amount % 26)) % 26;

        return str.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                let base = (code >= 65 && code <= 90) ? 65 : 97;
                return String.fromCharCode(((code - base + amount) % 26) + base);
            }
            return char;
        }).join('');
    };

    const handleEncrypt = () => {
        setResult(caesarCipher(text, shift, false));
    };

    const handleDecrypt = () => {
        setResult(caesarCipher(text, shift, true));
    };

    const faqs = [
        {
            question: "What is a Caesar Cipher?",
            answer: "The Caesar Cipher is one of the simplest and oldest encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is 'shifted' a certain number of places down the alphabet."
        },
        {
            question: "Is this tool secure for real secrets?",
            answer: "No. The Caesar Cipher is very easy to break and is intended for educational and fun purposes. For real security, use modern encryption like AES or RSA."
        },
        {
            question: "What is an encryption 'key'?",
            answer: "In this tool, the 'shift' value acts as the key. Both the sender and the receiver must know the shift value to encrypt and decrypt the message correctly."
        }
    ];

    const calc = calculators.find(c => c.href === '/text-encryption');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Text Encryption Tool'}
                description={calc?.description || 'Encrypt and decrypt messages using Caesar Cipher logic.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Message</label>
                        <textarea
                            className="input"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter message to encrypt or decrypt..."
                            style={{ width: '100%', minHeight: '120px', resize: 'vertical', padding: '1rem' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Shift Value (Key): {shift}</label>
                        <input
                            type="range"
                            min="1"
                            max="25"
                            value={shift}
                            onChange={(e) => setShift(parseInt(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <button onClick={handleEncrypt} className="btn btn-primary" style={{ padding: '1rem' }}>Encrypt</button>
                        <button onClick={handleDecrypt} className="btn btn-secondary" style={{ padding: '1rem' }}>Decrypt</button>
                    </div>

                    {result && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Result</label>
                            <div style={{
                                background: 'rgba(15, 23, 42, 0.5)',
                                padding: '1.5rem',
                                borderRadius: '1rem',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                fontSize: '1.1rem',
                                color: 'var(--color-primary)',
                                wordBreak: 'break-all',
                                fontFamily: 'monospace'
                            }}>
                                {result}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
