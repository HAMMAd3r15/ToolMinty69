'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

const EXERCISES = {
    'Full Body': [
        'Pushups', 'Squats', 'Plank', 'Lunges', 'Jumping Jacks',
        'Burpees', 'High Knees', 'Mountain Climbers', 'Jump Squats', 'Tricep Dips'
    ],
    'Upper Body': [
        'Pushups', 'Pullups', 'Dips', 'Shoulder Press', 'Bicep Curls',
        'Tricep Pushdowns', 'Lateral Raises', 'Pike Pushups', 'Diamond Pushups', 'Rear Delt Fly'
    ],
    'Lower Body': [
        'Squats', 'Lunges', 'Deadlifts', 'Calf Raises', 'Glute Bridges',
        'Sumo Squats', 'Step-Ups', 'Jump Squats', 'Leg Press', 'Hip Thrusts'
    ],
    'Core': [
        'Plank', 'Crunches', 'Leg Raises', 'Russian Twists', 'Mountain Climbers',
        'Bicycle Crunches', 'Hollow Hold', 'Side Plank', 'V-Ups', 'Dead Bug'
    ],
};

const INTENSITY_OPTIONS = [
    { value: 'Easy', label: 'Easy (3 Exercises)', color: '#4ade80' },
    { value: 'Medium', label: 'Medium (5 Exercises)', color: '#fbbf24' },
    { value: 'Hard', label: 'Hard (7 Exercises)', color: '#f87171' },
];

interface CustomDropdownProps {
    options: { value: string; label: string; color?: string }[];
    value: string;
    onChange: (value: string) => void;
}

function CustomDropdown({ options, value, onChange }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selected = options.find(o => o.value === value) || options[0];

    return (
        <div style={{ position: 'relative', width: '100%', userSelect: 'none' }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: `1px solid ${isOpen ? 'rgba(99,102,241,0.7)' : 'rgba(255,255,255,0.1)'}`,
                    padding: '0.85rem 1.25rem',
                    borderRadius: '0.85rem',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isOpen ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    gap: '0.75rem',
                }}
            >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    {selected.color && (
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: selected.color, flexShrink: 0 }} />
                    )}
                    {selected.label}
                </span>
                <span style={{
                    width: '9px', height: '9px',
                    borderRight: '2px solid rgba(255,255,255,0.5)',
                    borderBottom: '2px solid rgba(255,255,255,0.5)',
                    transform: isOpen ? 'rotate(-135deg)' : 'rotate(45deg)',
                    transition: 'transform 0.3s ease',
                    marginTop: isOpen ? '4px' : '-4px',
                    display: 'inline-block',
                    flexShrink: 0,
                }} />
            </div>

            {isOpen && (
                <>
                    <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 10 }} />
                    <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 0.5rem)',
                        left: 0, right: 0,
                        background: 'rgba(10, 18, 36, 0.97)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '1rem',
                        padding: '0.5rem',
                        zIndex: 100,
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
                        animation: 'ddSlide 0.2s cubic-bezier(0.16,1,0.3,1)',
                    }}>
                        {options.map(opt => (
                            <div
                                key={opt.value}
                                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                                style={{
                                    padding: '0.75rem 1.1rem',
                                    borderRadius: '0.65rem',
                                    color: value === opt.value ? '#fff' : 'rgba(255,255,255,0.7)',
                                    background: value === opt.value ? 'rgba(99,102,241,0.2)' : 'transparent',
                                    cursor: 'pointer',
                                    fontWeight: value === opt.value ? 700 : 400,
                                    fontSize: '0.95rem',
                                    transition: 'all 0.15s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.65rem',
                                    borderLeft: value === opt.value ? '3px solid rgba(99,102,241,0.8)' : '3px solid transparent',
                                }}
                                onMouseEnter={e => {
                                    if (value !== opt.value) {
                                        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.06)';
                                        (e.currentTarget as HTMLDivElement).style.color = '#fff';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (value !== opt.value) {
                                        (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                                        (e.currentTarget as HTMLDivElement).style.color = 'rgba(255,255,255,0.7)';
                                    }
                                }}
                            >
                                {opt.color && (
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: opt.color, flexShrink: 0 }} />
                                )}
                                {opt.label}
                            </div>
                        ))}
                    </div>
                </>
            )}

            <style jsx>{`
                @keyframes ddSlide {
                    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0)   scale(1);    }
                }
            `}</style>
        </div>
    );
}

export default function RandomWorkoutGenerator() {
    const [intensity, setIntensity] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
    const [focus, setFocus] = useState<keyof typeof EXERCISES>('Full Body');
    const [workout, setWorkout] = useState<{ name: string; reps: string }[]>([]);

    const intensityColor = INTENSITY_OPTIONS.find(o => o.value === intensity)?.color || '#fff';

    const generateWorkout = () => {
        const list = EXERCISES[focus];
        const count = intensity === 'Easy' ? 3 : intensity === 'Medium' ? 5 : 7;
        const reps = intensity === 'Easy' ? '10-12' : intensity === 'Medium' ? '15-20' : '25-30';
        const shuffled = [...list].sort(() => 0.5 - Math.random());
        setWorkout(
            shuffled.slice(0, Math.min(count, shuffled.length))
                .map(name => ({ name, reps: focus === 'Core' ? '45s' : reps }))
        );
    };

    const calc = calculators.find(c => c.href === '/random-workout');

    const faqs = [
        {
            question: "Is this workout suitable for beginners?",
            answer: "Yes! Choose the 'Easy' intensity to start. Always listen to your body and stop if you feel sharp pain."
        },
        {
            question: "How long should I rest between sets?",
            answer: "For 'Easy' intensity, rest 60-90 seconds. For 'Hard', try to keep rest between 30-45 seconds to keep your heart rate up."
        },
        {
            question: "Do I need any equipment?",
            answer: "Most of these exercises are bodyweight-only, making them perfect for home workouts. You can add weights to increase difficulty if you have them."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Random Workout Generator'}
                description={calc?.description || 'No plan? No problem. Get a randomized workout tailored to your time and focus.'}
            />

            <div className="card" style={{ marginBottom: '3rem', background: 'rgba(15,23,42,0.6)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>

                    {/* ── Selectors ── */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                Intensity
                            </label>
                            <CustomDropdown
                                options={INTENSITY_OPTIONS}
                                value={intensity}
                                onChange={(v) => setIntensity(v as 'Easy' | 'Medium' | 'Hard')}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                Focus Area
                            </label>
                            <CustomDropdown
                                options={Object.keys(EXERCISES).map(f => ({ value: f, label: f }))}
                                value={focus}
                                onChange={(v) => setFocus(v as keyof typeof EXERCISES)}
                            />
                        </div>
                    </div>

                    {/* ── Generate btn ── */}
                    <button
                        onClick={generateWorkout}
                        style={{
                            padding: '1.1rem',
                            borderRadius: '1rem',
                            fontWeight: 800,
                            fontSize: '1.05rem',
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px rgba(99,102,241,0.4)',
                            transition: 'all 0.3s ease',
                            letterSpacing: '0.02em',
                        }}
                    >
                        ⚡ Generate Workout
                    </button>

                    {/* ── Workout list ── */}
                    {workout.length > 0 && (
                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                            {workout.map((w, i) => (
                                <div key={i} style={{
                                    background: 'rgba(30,41,59,0.4)',
                                    padding: '1.1rem 1.5rem',
                                    borderRadius: '1rem',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    animation: 'fadeRow 0.4s ease backwards',
                                    animationDelay: `${i * 0.06}s`,
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                        <span style={{
                                            width: '28px', height: '28px', borderRadius: '50%',
                                            background: `${intensityColor}22`,
                                            color: intensityColor,
                                            fontWeight: 800, fontSize: '0.8rem',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>{i + 1}</span>
                                        <span style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem' }}>{w.name}</span>
                                    </div>
                                    <div style={{
                                        background: `${intensityColor}22`,
                                        padding: '0.35rem 0.9rem',
                                        borderRadius: '99px',
                                        color: intensityColor,
                                        fontWeight: 800,
                                        fontSize: '0.9rem',
                                    }}>
                                        {w.reps}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />

            <style jsx>{`
                @keyframes fadeRow {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
