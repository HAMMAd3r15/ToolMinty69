'use client';

import { useState, useCallback } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';

const WORDS = [
    'PLANET', 'FOREST', 'BRIDGE', 'CASTLE', 'GUITAR', 'JUNGLE', 'ROCKET', 'SPIDER',
    'TOMATO', 'WINTER', 'FALCON', 'BUTTER', 'DRAGON', 'MARBLE', 'PENCIL', 'SILVER',
    'CANDLE', 'ORANGE', 'PURPLE', 'LIZARD', 'TEMPLE', 'BOTTLE', 'CACTUS', 'TUNNEL',
    'ABACUS', 'ACTION', 'ANCHOR', 'ARROWS', 'BANNER', 'BASKET', 'BEACON', 'BUTTON',
    'CAMERA', 'CANYON', 'CIRCLE', 'DANCER', 'DESERT', 'DOLLAR', 'EAGLES', 'ENERGY',
    'ENGINE', 'FLOWER', 'FOSSIL', 'FRIDGE', 'GALAXY', 'GARDEN', 'GLOVES', 'HAMMER',
    'HARBOR', 'HUNTER', 'IMPACT', 'INSECT', 'JACKET', 'JOKERS', 'KERNEL', 'KETTLE',
    'KNIGHT', 'LEGEND', 'MAGNET', 'MONKEY', 'NATURE', 'NEPHEW', 'OCEANS', 'OYSTER',
    'PARADE', 'PARROT', 'QUARTZ', 'QUIVER', 'RABBIT', 'REASON', 'SAFARI', 'SAILOR',
    'TARGET', 'TICKET', 'UNIQUE', 'URCHIN', 'VALLEY', 'VESSEL', 'WALNUT', 'WINDOW',
    'YACHTS', 'YELLOW', 'ZEPHYR', 'ZODIAC'
];

const MAX_WRONG = 6;
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function pickWord() { return WORDS[Math.floor(Math.random() * WORDS.length)]; }

function HangmanSVG({ wrong }: { wrong: number }) {
    return (
        <svg viewBox="0 0 200 220" width="200" height="220" style={{ display: 'block', margin: '0 auto' }}>
            {/* Gallows */}
            <line x1="20" y1="210" x2="180" y2="210" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <line x1="60" y1="210" x2="60" y2="20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <line x1="60" y1="20" x2="130" y2="20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <line x1="130" y1="20" x2="130" y2="45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* Head */}
            {wrong >= 1 && <circle cx="130" cy="60" r="16" stroke="#ef4444" strokeWidth="3" fill="none" />}
            {/* Body */}
            {wrong >= 2 && <line x1="130" y1="76" x2="130" y2="130" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />}
            {/* Left arm */}
            {wrong >= 3 && <line x1="130" y1="90" x2="105" y2="115" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />}
            {/* Right arm */}
            {wrong >= 4 && <line x1="130" y1="90" x2="155" y2="115" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />}
            {/* Left leg */}
            {wrong >= 5 && <line x1="130" y1="130" x2="105" y2="165" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />}
            {/* Right leg */}
            {wrong >= 6 && <line x1="130" y1="130" x2="155" y2="165" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />}
        </svg>
    );
}

export default function Hangman() {
    const [word, setWord] = useState(pickWord);
    const [guessed, setGuessed] = useState<Set<string>>(new Set());
    const [score, setScore] = useState({ wins: 0, losses: 0 });

    const wrong = [...guessed].filter(l => !word.includes(l)).length;
    const isWon = word.split('').every(l => guessed.has(l));
    const isLost = wrong >= MAX_WRONG;
    const isOver = isWon || isLost;

    const guess = useCallback((letter: string) => {
        if (isOver || guessed.has(letter)) return;
        const next = new Set(guessed).add(letter);
        setGuessed(next);
        const wonNow = word.split('').every(l => next.has(l));
        const wrongNow = [...next].filter(l => !word.includes(l)).length;
        if (wonNow) setScore(s => ({ ...s, wins: s.wins + 1 }));
        else if (wrongNow >= MAX_WRONG) setScore(s => ({ ...s, losses: s.losses + 1 }));
    }, [guessed, isOver, word]);

    const newGame = () => {
        setWord(pickWord());
        setGuessed(new Set());
    };

    const calc = calculators.find(c => c.href === '/hangman');
    const faqs = [
        { question: "How does Hangman work?", answer: "Guess letters one by one to figure out the hidden word. Each wrong guess adds a body part to the hangman. You lose after 6 wrong guesses." },
        { question: "Where do the words come from?", answer: "Words are randomly selected from a curated list of common English words, all 6 letters long for balanced difficulty." },
        { question: "Is there a hint system?", answer: "Not currently — the challenge is to guess purely from the letter spaces and what you've guessed so far. See how few wrong guesses you can make!" },
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Hangman'} description={calc?.description || ''} />

            {/* Score */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--color-surface)', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10b981' }}>{score.wins}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Wins</div>
                </div>
                <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--color-surface)', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ef4444' }}>{score.losses}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Losses</div>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                {/* Hangman Drawing */}
                <div style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                    <HangmanSVG wrong={wrong} />
                </div>

                {/* Attempts */}
                <div style={{ marginBottom: '1.25rem', color: wrong >= 4 ? '#ef4444' : 'var(--color-text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>
                    {MAX_WRONG - wrong} attempt{MAX_WRONG - wrong !== 1 ? 's' : ''} remaining
                </div>

                {/* Word Display */}
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    {word.split('').map((letter, i) => (
                        <div key={i} style={{
                            width: '44px', height: '54px', borderBottom: `3px solid ${isLost && !guessed.has(letter) ? '#ef4444' : 'var(--color-secondary)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.6rem', fontWeight: 900,
                            color: isLost && !guessed.has(letter) ? '#ef4444' : 'var(--color-text-primary)',
                            animation: guessed.has(letter) && word.includes(letter) ? 'letterReveal 0.3s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
                        }}>
                            {guessed.has(letter) || (isLost && !guessed.has(letter)) ? letter : ''}
                        </div>
                    ))}
                </div>

                {/* Result Banner */}
                {isOver && (
                    <div style={{ padding: '1rem', borderRadius: '0.75rem', marginBottom: '1rem', background: isWon ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', border: `2px solid ${isWon ? '#10b981' : '#ef4444'}`, animation: 'resultBanner 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
                        <div style={{ fontWeight: 800, fontSize: '1.2rem', color: isWon ? '#10b981' : '#ef4444' }}>{isWon ? '🎉 You got it!' : `😔 The word was "${word}"`}</div>
                    </div>
                )}

                <button onClick={newGame} className={`btn ${isOver ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.7rem 2rem' }}>
                    {isOver ? '🎮 Play Again' : '🔀 New Word'}
                </button>
            </div>

            {/* Keyboard */}
            {!isOver && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                        {ALPHABET.map(letter => {
                            const isGuessed = guessed.has(letter);
                            const isCorrect = isGuessed && word.includes(letter);
                            const isWrong = isGuessed && !word.includes(letter);
                            return (
                                <button key={letter} onClick={() => guess(letter)} disabled={isGuessed} style={{
                                    width: '40px', height: '40px', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.95rem', cursor: isGuessed ? 'default' : 'pointer',
                                    background: isCorrect ? 'rgba(16,185,129,0.2)' : isWrong ? 'rgba(239,68,68,0.15)' : 'var(--color-bg)',
                                    color: isCorrect ? '#10b981' : isWrong ? '#ef4444' : 'var(--color-text-primary)',
                                    border: `1px solid ${isCorrect ? '#10b981' : isWrong ? '#ef4444' : 'var(--color-border)'}`,
                                    opacity: isGuessed ? 0.6 : 1, transition: 'all 0.15s',
                                }}>{letter}</button>
                            );
                        })}
                    </div>
                </div>
            )}

            <FAQSection items={faqs} />
            <style jsx>{`
                @keyframes letterReveal {
                    from { transform: scale(0.5) translateY(-10px); opacity: 0; }
                    to   { transform: scale(1) translateY(0); opacity: 1; }
                }
                @keyframes resultBanner {
                    from { transform: scale(0.9); opacity: 0; }
                    to   { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
