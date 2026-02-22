'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

const MORSE_CODE_MAP: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
};

const REVERSE_MORSE_CODE_MAP = Object.fromEntries(
    Object.entries(MORSE_CODE_MAP).map(([k, v]) => [v, k])
);

export default function MorseCodeConverter() {
    const [text, setText] = useState<string>('');
    const [morse, setMorse] = useState<string>('');

    const convertToMorse = (val: string) => {
        setText(val);
        const encoded = val.toUpperCase().split('').map(char => MORSE_CODE_MAP[char] || char).join(' ');
        setMorse(encoded);
    };

    const convertToText = (val: string) => {
        setMorse(val);
        const decoded = val.split(' ').map(code => REVERSE_MORSE_CODE_MAP[code] || code).join('');
        setText(decoded);
    };

    const faqs = [
        {
            question: "What is Morse Code?",
            answer: "Morse code is a method used in telecommunication to encode text characters as standardized sequences of two different signal durations, called dots and dashes."
        },
        {
            question: "Who invented Morse Code?",
            answer: "It was developed in the early 1830s by Samuel Morse and Alfred Vail as a way to send messages over telegraph wires."
        },
        {
            question: "Is Morse Code still used today?",
            answer: "While no longer a requirement for most communications, it remains popular among amateur radio operators and is still used in some aviation and navigational contexts."
        }
    ];

    const calc = calculators.find(c => c.href === '/morse-code');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Morse Code Converter'}
                description={calc?.description || 'Translate text to Morse code and vice versa instantly.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Normal Text</label>
                        <textarea
                            className="input"
                            value={text}
                            onChange={(e) => convertToMorse(e.target.value)}
                            placeholder="Type text here..."
                            style={{ width: '100%', minHeight: '120px', resize: 'vertical', padding: '1rem' }}
                        />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--color-primary)', fontSize: '1.5rem' }}>⇅</div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Morse Code (. and -)</label>
                        <textarea
                            className="input"
                            value={morse}
                            onChange={(e) => convertToText(e.target.value)}
                            placeholder="Type morse code here (use spaces between letters)..."
                            style={{
                                width: '100%',
                                minHeight: '120px',
                                resize: 'vertical',
                                padding: '1rem',
                                letterSpacing: '0.2em',
                                fontFamily: 'monospace'
                            }}
                        />
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
