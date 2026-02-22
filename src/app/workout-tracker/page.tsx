'use client';

import { useState, useEffect } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

interface WorkoutLog {
    id: string;
    date: string;
    exercise: string;
    weight: number;
    sets: number;
    reps: number;
}

export default function WorkoutTracker() {
    const [exercise, setExercise] = useState('');
    const [weight, setWeight] = useState<number>(0);
    const [sets, setSets] = useState<number>(0);
    const [reps, setReps] = useState<number>(0);
    const [logs, setLogs] = useState<WorkoutLog[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('calchub_workout_logs');
        if (saved) setLogs(JSON.parse(saved));
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('calchub_workout_logs', JSON.stringify(logs));
        }
    }, [logs, mounted]);

    const addLog = () => {
        if (!exercise) return;
        const newLog: WorkoutLog = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
            exercise,
            weight,
            sets,
            reps
        };
        setLogs([newLog, ...logs]);
        setExercise('');
        setWeight(0);
        setSets(0);
        setReps(0);
    };

    const deleteLog = (id: string) => {
        setLogs(logs.filter(l => l.id !== id));
    };

    const faqs = [
        {
            question: "Why should I track my lifts?",
            answer: "Tracking allows you to ensure 'progressive overload', which is the gradual increase of weight, frequency, or number of repetitions in your strength training routine."
        },
        {
            question: "How do I measure progress?",
            answer: "Look for trends over weeks. Even if the weight doesn't increase, doing more reps or sets with the same weight is a clear sign of progress."
        },
        {
            question: "Should I track every single set?",
            answer: "At the minimum, track your 'top set' (the heaviest set). Tracking all work sets provides a better picture of your total training volume."
        }
    ];

    if (!mounted) return null;

    const calc = calculators.find(c => c.href === '/workout-tracker');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Workout Progress Tracker'}
                description={calc?.description || 'Keep a digital log of your strength gains.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Exercise Name</label>
                            <input type="text" className="input" value={exercise} onChange={(e) => setExercise(e.target.value)} placeholder="e.g. Bench Press" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Weight (kg/lbs)</label>
                            <input type="number" className="input" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Sets</label>
                            <input type="number" className="input" value={sets} onChange={(e) => setSets(parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Reps</label>
                            <input type="number" className="input" value={reps} onChange={(e) => setReps(parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                        </div>
                    </div>

                    <button onClick={addLog} className="btn btn-primary" style={{ padding: '1rem' }}>Log Workout</button>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <th style={{ padding: '1rem', color: 'var(--color-primary)' }}>Date</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-primary)' }}>Exercise</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-primary)' }}>Stats</th>
                                    <th style={{ padding: '1rem' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-tertiary)' }}>No entries yet.</td>
                                    </tr>
                                ) : logs.map(log => (
                                    <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{log.date}</td>
                                        <td style={{ padding: '1rem', fontWeight: 600, color: '#fff' }}>{log.exercise}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ color: '#fff' }}>{log.weight}kg</span>
                                            <span style={{ color: 'rgba(255,255,255,0.4)', marginLeft: '0.5rem' }}>{log.sets}×{log.reps}</span>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button onClick={() => deleteLog(log.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>×</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
