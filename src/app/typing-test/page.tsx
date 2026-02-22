'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

const TEXT_POOLS: Record<Difficulty, string[]> = {
    Easy: [
        "the small cat runs very fast in warm sun",
        "i like fresh air and clean water every day",
        "birds fly across the blue sky all day long",
        "the happy dog plays with kids in the yard",
        "we eat good food and drink cold water daily",
        "she has bright eyes and a kind warm smile",
        "kids love to play games and laugh all day",
        "rain makes the green grass look fresh and soft",
        "this clean room feels calm and nice today",
        "he drinks warm milk and feels very happy now",
        "the tall tree gives cool shade on hot days",
        "they walk back home slow and talk all night",
        "i feel calm happy and safe at home today",
        "stars shine bright in the dark sky at night",
        "fresh air helps the body feel good and strong"
    ],
    Medium: [
        "The weather changed quickly, and the sky grew dark.",
        "Learning new skills takes time, patience, and focus.",
        "Before sunset, we finished the important work.",
        "She typed carefully, because accuracy mattered today.",
        "The meeting ended early, which surprised everyone.",
        "Reading daily improves focus, memory, and clarity.",
        "He walked faster, trying to catch the late bus.",
        "Sometimes progress feels slow, but it still counts.",
        "The project required effort, planning, and teamwork.",
        "Music can change moods, thoughts, and energy levels.",
        "After lunch, productivity dropped slightly.",
        "Practice helps improve speed, confidence, and control.",
        "The task looked simple, yet required attention.",
        "Small mistakes happen, so review your work.",
        "Success often comes after consistent effort."
    ],
    Hard: [
        "“Innovation,” she said, “requires discipline, curiosity, and risk-taking.” Without preparation, even brilliant ideas collapse.",
        "In 2024, consider this question: why do 75% of startups fail? The answer isn’t simple — execution matters more than inspiration.",
        "Psychological resilience isn’t built overnight; it’s forged through adversity, repetition, and deliberate discomfort.",
        "“Success isn’t accidental,” he whispered. It’s engineered through consistency, accountability, and relentless refinement.",
        "Entrepreneurship demands strategic foresight, emotional control, and adaptability — without them, momentum disappears quickly.",
        "During the presentation, data contradicted assumptions; however, leadership adjusted direction immediately.",
        "She paused, then asked, “Are we optimizing for speed — or sustainability?” Silence filled the room.",
        "Complex systems fail when communication breaks down, especially under pressure, deadlines, and uncertainty.",
        "At 3:47 a.m., exhaustion clouded judgment — yet determination refused to surrender.",
        "“Perfection is impossible,” the mentor noted, “but measurable improvement is always achievable.”",
        "Rapid decision-making, when unsupported by evidence, often produces expensive, irreversible consequences.",
        "The algorithm’s unpredictability exposed critical vulnerabilities, forcing an immediate architectural redesign.",
        "Failure isn’t the opposite of progress; it’s frequently the price of meaningful experimentation.",
        "Numbers don’t lie — but interpretation can mislead, especially when bias shapes perception.",
        "He sighed, closed the laptop, and muttered, “There’s still more to learn… always.”"
    ]
};

const TIME_LIMITS: Record<Difficulty, number> = {
    Easy: 60,
    Medium: 45,
    Hard: 30
};

function countErrors(original: string, typed: string): number {
    let errors = 0;
    for (let i = 0; i < typed.length; i++) {
        if (typed[i] !== original[i]) errors++;
    }
    return errors;
}

export default function TypingTest() {
    const [difficulty, setDifficulty] = useState<Difficulty>('Easy');
    const [text, setText] = useState(TEXT_POOLS['Easy'][0]);
    const [typed, setTyped] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState<number | null>(null);
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [isRunning, setIsRunning] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const finishGame = useCallback(() => {
        const now = Date.now();
        setEndTime(now);
        setIsRunning(false);
    }, []);

    // Timer
    useEffect(() => {
        let t: ReturnType<typeof setInterval>;
        if (isRunning && !endTime) {
            t = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(t);
                        finishGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(t);
    }, [isRunning, endTime, finishGame]);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        if (!startTime && val.length > 0) {
            setStartTime(Date.now());
            setIsRunning(true);
        }
        if (val.length <= text.length) {
            setTyped(val);
            if (val === text) finishGame();
        }
    };

    // Compute final WPM when done
    useEffect(() => {
        if (endTime && startTime) {
            const minutes = (endTime - startTime) / 60000;
            const words = typed.trim().split(/\s+/).length;
            setWpm(Math.round(words / Math.max(minutes, 0.01)));
            const errors = countErrors(text, typed);
            setAccuracy(Math.round(((typed.length - errors) / Math.max(typed.length, 1)) * 100));
        }
    }, [endTime, startTime, typed, text]);

    const reset = useCallback((level?: Difficulty) => {
        const targetLevel = level || difficulty;
        const pool = TEXT_POOLS[targetLevel];
        const idx = Math.floor(Math.random() * pool.length);

        setText(pool[idx]);
        setTyped('');
        setStartTime(null);
        setEndTime(null);
        setWpm(null);
        setAccuracy(null);
        setTimeLeft(TIME_LIMITS[targetLevel]);
        setIsRunning(false);
        if (level) setDifficulty(level);
        setTimeout(() => inputRef.current?.focus(), 50);
    }, [difficulty]);

    const isDone = !!endTime;
    const progress = Math.min(typed.length / text.length, 1);
    const liveWpm = startTime && !isDone && typed.length > 0
        ? Math.round((typed.trim().split(/\s+/).length / ((Date.now() - startTime) / 60000)))
        : null;

    const calc = calculators.find(c => c.href === '/typing-test');
    const faqs = [
        { question: "What are the difficulty levels?", answer: "Easy (60s) uses simple lowercase words. Medium (45s) adds capitals and basic punctuation. Hard (30s) features long words, numbers, and symbols with tight time pressure." },
        { question: "How is WPM calculated?", answer: "WPM (Words Per Minute) is calculated by taking the number of words typed and dividing it by the time taken. A standard 'word' is usually considered 5 characters." },
        { question: "Can I use external keyboards?", answer: "Absolutely! The tool works with any physical or virtual keyboard, making it perfect for both desktop and mobile practice." },
    ];

    return (
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Typing Speed Test'} description={calc?.description || ''} />

            {/* Difficulty Selector */}
            <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(level => (
                    <button
                        key={level}
                        onClick={() => reset(level)}
                        className={`btn ${difficulty === level ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
                    >
                        {level}
                    </button>
                ))}
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {[
                    { label: 'WPM', value: isDone ? wpm : liveWpm ?? '—', color: '#6366f1' },
                    { label: 'Accuracy', value: isDone && accuracy !== null ? `${accuracy}%` : '—', color: '#10b981' },
                    { label: 'Time Left', value: `${timeLeft}s`, color: timeLeft < 10 ? '#ef4444' : '#f59e0b' },
                    { label: 'Difficulty', value: difficulty, color: difficulty === 'Hard' ? '#ef4444' : '#6366f1' },
                ].map(({ label, value, color }) => (
                    <div key={label} style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--color-surface)', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '1.4rem', fontWeight: 900, color }}>{value}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                    </div>
                ))}
            </div>

            <div className="card" style={{ marginBottom: '1.5rem', position: 'relative' }}>
                {/* Progress Bar */}
                <div style={{ height: '4px', background: 'var(--color-bg)', borderRadius: '2px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress * 100}%`, background: 'var(--color-secondary)', transition: 'width 0.1s', borderRadius: '2px' }} />
                </div>

                {/* Text Display */}
                <div style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '1.25rem',
                    lineHeight: 1.8,
                    marginBottom: '1.5rem',
                    padding: '1.5rem',
                    background: 'var(--color-bg)',
                    borderRadius: '0.75rem',
                    userSelect: 'none',
                    minHeight: '120px'
                }}>
                    {text.split('').map((char, i) => {
                        let color = 'var(--color-text-tertiary)';
                        let bg = 'transparent';
                        let decoration = 'none';

                        if (i < typed.length) {
                            const isCorrect = typed[i] === char;
                            color = isCorrect ? '#10b981' : '#ef4444';
                            if (!isCorrect) {
                                bg = 'rgba(239,68,68,0.15)';
                                decoration = 'underline';
                            }
                        } else if (i === typed.length) {
                            bg = 'rgba(99,102,241,0.25)';
                            color = 'var(--color-text-primary)';
                        }
                        return (
                            <span key={i} style={{
                                color,
                                background: bg,
                                borderRadius: '2px',
                                transition: 'all 0.1s',
                                textDecoration: decoration,
                                borderLeft: i === typed.length ? '2px solid #6366f1' : 'none',
                                marginLeft: i === typed.length ? '-2px' : '0'
                            }}>
                                {char}
                            </span>
                        );
                    })}
                </div>

                {/* Input Area */}
                {!isDone ? (
                    <textarea
                        ref={inputRef}
                        value={typed}
                        onChange={handleInput}
                        placeholder="Click here and start typing..."
                        disabled={timeLeft === 0}
                        style={{
                            width: '100%', minHeight: '100px', resize: 'none', fontFamily: '"JetBrains Mono", monospace', fontSize: '1.1rem',
                            padding: '1rem', borderRadius: '0.75rem', background: 'var(--color-bg)',
                            border: '2px solid var(--color-border)', color: 'var(--color-text-primary)',
                            outline: 'none', lineHeight: 1.6, transition: 'border-color 0.2s',
                            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                        }}
                        onFocus={(e) => e.target.parentElement?.setAttribute('style', 'border-color: var(--color-secondary)')}
                        spellCheck={false}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                    />
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '2.5rem 1.5rem',
                        background: 'rgba(99,102,241,0.1)',
                        borderRadius: '1.25rem',
                        animation: 'resultPop 0.6s cubic-bezier(0.34,1.56,0.64,1)',
                        border: '2px solid rgba(99,102,241,0.2)'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                            {accuracy && accuracy > 90 ? '🏆' : '🏁'}
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-secondary)', margin: '0.5rem 0' }}>{wpm} WPM</h2>
                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                            {accuracy}% Accuracy • {difficulty} Mode
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                            <button onClick={() => reset()} className="btn btn-primary" style={{ padding: '0.8rem 2.5rem' }}>Try Again</button>
                            <button onClick={() => setEndTime(null)} className="btn btn-secondary" style={{ padding: '0.8rem 1.5rem' }}>Review Text</button>
                        </div>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button onClick={() => reset()} className="btn btn-secondary" style={{ flex: 1 }}>🔀 New Text</button>
                <button onClick={() => { setTyped(''); setStartTime(null); setEndTime(null); setTimeLeft(TIME_LIMITS[difficulty]); setIsRunning(false); }} className="btn btn-secondary" style={{ flex: 1 }}>🧹 Reset</button>
            </div>

            <FAQSection items={faqs} />
            <style jsx>{`
                @keyframes resultPop {
                    from { transform: scale(0.9) translateY(20px); opacity: 0; }
                    to   { transform: scale(1) translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
