'use client';

import { useState, useEffect } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

interface Habit {
    id: string;
    name: string;
    completedDays: string[]; // ISO date strings
}

export default function HabitTracker() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [newHabit, setNewHabit] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('calchub_habits');
        if (saved) setHabits(JSON.parse(saved));
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('calchub_habits', JSON.stringify(habits));
        }
    }, [habits, mounted]);

    const addHabit = () => {
        if (!newHabit.trim()) return;
        const habit: Habit = {
            id: Date.now().toString(),
            name: newHabit.trim(),
            completedDays: []
        };
        setHabits([...habits, habit]);
        setNewHabit('');
    };

    const toggleHabit = (habitId: string) => {
        const today = new Date().toISOString().split('T')[0];
        setHabits(habits.map(h => {
            if (h.id === habitId) {
                const isCompleted = h.completedDays.includes(today);
                return {
                    ...h,
                    completedDays: isCompleted
                        ? h.completedDays.filter(d => d !== today)
                        : [...h.completedDays, today]
                };
            }
            return h;
        }));
    };

    const deleteHabit = (id: string) => {
        setHabits(habits.filter(h => h.id !== id));
    };

    const calculateStreak = (completedDays: string[]) => {
        if (completedDays.length === 0) return 0;
        const sorted = [...completedDays].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
        let streak = 0;
        let current = new Date();
        current.setHours(0, 0, 0, 0);

        // Check if last completion was today or yesterday
        const lastDate = new Date(sorted[0]);
        lastDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor((current.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays > 1) return 0;

        for (let i = 0; i < sorted.length; i++) {
            const date = new Date(sorted[i]);
            date.setHours(0, 0, 0, 0);

            const expected = new Date(current);
            expected.setDate(current.getDate() - i);
            expected.setHours(0, 0, 0, 0);

            if (date.getTime() === expected.getTime()) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    };

    const faqs = [
        {
            question: "Why should I track my habits?",
            answer: "Tracking provides visual proof of your progress, which triggers a dopamine release and makes you more likely to repeat the behavior the next day."
        },
        {
            question: "Is my data safe?",
            answer: "Yes. Your habit data is stored locally in your browser's 'localStorage'. It never leaves your computer and is only accessible by you."
        },
        {
            question: "What makes a habit stick?",
            answer: "Consistency is more important than intensity. Start small (e.g., 5 minutes of reading) and use a streak counter like this one to stay motivated."
        }
    ];

    if (!mounted) return null;

    const toolData = calculators.find(c => c.href === '/habit-tracker');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Daily Habit Tracker'}
                description={toolData?.description || 'Build better routines and maintain consistent streaks.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            type="text"
                            className="input"
                            value={newHabit}
                            onChange={(e) => setNewHabit(e.target.value)}
                            placeholder="Enter a new habit (e.g. Drink 2L water)"
                            style={{ flex: 1 }}
                        />
                        <button onClick={addHabit} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Add</button>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {habits.length === 0 ? (
                            <div style={{ textAlign: 'center', color: 'var(--color-text-tertiary)', padding: '2rem' }}>
                                No habits added yet. Start by adding one above!
                            </div>
                        ) : habits.map(habit => {
                            const today = new Date().toISOString().split('T')[0];
                            const isDoneToday = habit.completedDays.includes(today);
                            const streak = calculateStreak(habit.completedDays);

                            return (
                                <div key={habit.id} style={{
                                    background: 'rgba(30, 41, 59, 0.4)',
                                    padding: '1.25rem',
                                    borderRadius: '1rem',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                        <div
                                            onClick={() => toggleHabit(habit.id)}
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '50%',
                                                border: `2px solid ${isDoneToday ? '#10b981' : 'rgba(255,255,255,0.2)'}`,
                                                background: isDoneToday ? '#10b981' : 'transparent',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {isDoneToday && '✓'}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, color: '#fff', fontSize: '1.05rem', textDecoration: isDoneToday ? 'line-through' : 'none', opacity: isDoneToday ? 0.6 : 1 }}>
                                                {habit.name}
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                🔥 {streak} Day Streak
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => deleteHabit(habit.id)}
                                        style={{ background: 'none', border: 'none', color: 'rgba(239, 68, 68, 0.5)', cursor: 'pointer', padding: '0.5rem' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
