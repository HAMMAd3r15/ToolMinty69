'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

type Mode = 'pomodoro' | 'short' | 'long';

const DEFAULT_DURATIONS: Record<Mode, number> = {
    pomodoro: 25,
    short: 5,
    long: 15,
};

const MODE_CONFIG: Record<Mode, { label: string; color: string; glow: string }> = {
    pomodoro: { label: 'Pomodoro', color: '#6366f1', glow: 'rgba(99,102,241,0.35)' },
    short: { label: 'Short Break', color: '#10b981', glow: 'rgba(16,185,129,0.35)' },
    long: { label: 'Long Break', color: '#f59e0b', glow: 'rgba(245,158,11,0.35)' },
};

export default function PomodoroTimer() {
    const [durations, setDurations] = useState<Record<Mode, number>>(DEFAULT_DURATIONS);
    const [mode, setMode] = useState<Mode>('pomodoro');
    const [timeLeft, setTimeLeft] = useState(durations.pomodoro * 60);
    const [isActive, setIsActive] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [tempDurations, setTempDurations] = useState(durations);
    const [sessionsCompleted, setSessionsCompleted] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const totalSeconds = durations[mode] * 60;
    const progress = 1 - timeLeft / totalSeconds;
    const cfg = MODE_CONFIG[mode];

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    const switchMode = useCallback((newMode: Mode, newDurations = durations) => {
        setIsActive(false);
        setMode(newMode);
        setTimeLeft(newDurations[newMode] * 60);
    }, [durations]);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(durations[mode] * 60);
    };

    const saveSettings = () => {
        setDurations(tempDurations);
        setIsActive(false);
        setTimeLeft(tempDurations[mode] * 60);
        setShowSettings(false);
    };

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            setSessionsCompleted(n => n + 1);
            // Browser notification
            if (typeof window !== 'undefined' && Notification.permission === 'granted') {
                new Notification(`${cfg.label} complete!`, {
                    body: `Time for a ${mode === 'pomodoro' ? 'break' : 'work session'}!`,
                    icon: '/favicon.ico',
                });
            }
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [isActive, timeLeft]);

    // Request notification permission
    useEffect(() => {
        if (typeof window !== 'undefined' && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    // SVG ring
    const RADIUS = 110;
    const CIRC = 2 * Math.PI * RADIUS;
    const dash = CIRC * (1 - progress);

    const faqs = [
        {
            question: "What is the Pomodoro Technique?",
            answer: "The Pomodoro Technique is a time management method that breaks work into 25-minute focused intervals separated by short breaks."
        },
        {
            question: "Why does 25 minutes work best?",
            answer: "25 minutes is long enough to make significant progress but short enough not to feel overwhelming, creating a sense of urgency."
        },
        {
            question: "When should I take a long break?",
            answer: "After completing four Pomodoros, take a long break (15–30 min) to fully recharge before your next set."
        }
    ];

    const calc = calculators.find(c => c.href === '/pomodoro-timer');

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Pomodoro Timer'}
                description={calc?.description || 'Boost productivity by breaking work into focused intervals.'}
            />

            <div className="card" style={{ marginBottom: '3rem', background: 'rgba(15,23,42,0.6)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', padding: '2.5rem 2rem' }}>

                {/* ── Mode tabs ── */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                    {(Object.keys(MODE_CONFIG) as Mode[]).map(m => (
                        <button
                            key={m}
                            onClick={() => switchMode(m)}
                            style={{
                                padding: '0.55rem 1.35rem',
                                borderRadius: '99px',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                                border: mode === m ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                background: mode === m
                                    ? `linear-gradient(135deg, ${MODE_CONFIG[m].color}, ${MODE_CONFIG[m].color}cc)`
                                    : 'rgba(30,41,59,0.4)',
                                color: mode === m ? '#fff' : 'rgba(255,255,255,0.5)',
                                boxShadow: mode === m ? `0 6px 20px ${MODE_CONFIG[m].glow}` : 'none',
                            }}
                        >
                            {MODE_CONFIG[m].label}
                        </button>
                    ))}
                </div>

                {/* ── Clock ── */}
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <div style={{
                        fontSize: '7rem',
                        fontWeight: 900,
                        color: '#fff',
                        letterSpacing: '-0.05em',
                        lineHeight: 1,
                        fontVariantNumeric: 'tabular-nums',
                    }}>
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* ── Sessions counter ── */}
                {sessionsCompleted > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem', marginBottom: '1.5rem' }}>
                        {Array.from({ length: Math.min(sessionsCompleted, 8) }).map((_, i) => (
                            <span key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: cfg.color, opacity: 0.7 }} />
                        ))}
                    </div>
                )}

                {/* ── Controls ── */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                    {/* Start / Pause */}
                    <button
                        onClick={() => setIsActive(a => !a)}
                        style={{
                            padding: '0.9rem 3rem',
                            borderRadius: '0.9rem',
                            fontSize: '1.15rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                            border: 'none',
                            background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}bb)`,
                            color: '#fff',
                            boxShadow: `0 10px 28px ${cfg.glow}`,
                            transition: 'all 0.3s ease',
                            letterSpacing: '0.02em',
                            minWidth: '140px',
                        }}
                    >
                        {isActive ? 'Pause' : 'Start'}
                    </button>

                    {/* Reset */}
                    <button
                        onClick={resetTimer}
                        title="Reset"
                        style={{
                            width: '48px', height: '48px',
                            borderRadius: '50%',
                            border: '1px solid rgba(255,255,255,0.12)',
                            background: 'rgba(30,41,59,0.5)',
                            color: 'rgba(255,255,255,0.7)',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(30,41,59,0.5)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)'; }}
                    >
                        ↺
                    </button>

                    {/* Settings */}
                    <button
                        onClick={() => { setTempDurations(durations); setShowSettings(s => !s); }}
                        title="Settings"
                        style={{
                            width: '48px', height: '48px',
                            borderRadius: '50%',
                            border: '1px solid rgba(255,255,255,0.12)',
                            background: showSettings ? 'rgba(99,102,241,0.2)' : 'rgba(30,41,59,0.5)',
                            color: showSettings ? '#818cf8' : 'rgba(255,255,255,0.7)',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        ⚙
                    </button>
                </div>

                {/* ── Settings panel ── */}
                {showSettings && (
                    <div style={{
                        marginTop: '2rem',
                        padding: '1.5rem',
                        background: 'rgba(15,23,42,0.8)',
                        borderRadius: '1.25rem',
                        border: '1px solid rgba(255,255,255,0.07)',
                        animation: 'fadeIn 0.25s ease',
                        textAlign: 'left',
                    }}>
                        <div style={{ fontWeight: 700, color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
                            Custom Durations (minutes)
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                            {(Object.keys(MODE_CONFIG) as Mode[]).map(m => (
                                <div key={m}>
                                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', color: MODE_CONFIG[m].color, fontWeight: 700 }}>
                                        {MODE_CONFIG[m].label}
                                    </label>
                                    <input
                                        type="number"
                                        min={1} max={120}
                                        value={tempDurations[m]}
                                        onChange={e => setTempDurations(d => ({ ...d, [m]: Math.max(1, parseInt(e.target.value) || 1) }))}
                                        style={{
                                            width: '100%',
                                            background: 'rgba(30,41,59,0.6)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '0.65rem',
                                            padding: '0.6rem 0.85rem',
                                            color: '#fff',
                                            fontSize: '1rem',
                                            fontWeight: 700,
                                            textAlign: 'center',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={saveSettings}
                            style={{
                                width: '100%',
                                padding: '0.7rem',
                                borderRadius: '0.75rem',
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                color: '#fff',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.95rem',
                            }}
                        >
                            Save & Apply
                        </button>
                    </div>
                )}
            </div>

            <FAQSection items={faqs} />

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
