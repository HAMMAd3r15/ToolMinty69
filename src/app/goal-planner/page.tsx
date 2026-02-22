'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

interface Milestone {
    label: string;
    deadline: string;
}

export default function GoalPlanner() {
    const [goal, setGoal] = useState('');
    const [deadline, setDeadline] = useState('');
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const toolData = calculators.find(c => c.href === '/goal-planner');

    const calculateMilestones = () => {
        if (!goal || !deadline) return;

        const targetDate = new Date(deadline);
        const today = new Date();
        const diffTime = targetDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 0) return;

        const mList: Milestone[] = [];
        const types = ['Initial Research', 'Foundations Build', 'Halfway Point', 'Final Polish', 'Launch/Completion'];

        types.forEach((type, i) => {
            const daysToAdd = Math.floor((diffDays / types.length) * (i + 1));
            const date = new Date();
            date.setDate(today.getDate() + daysToAdd);
            mList.push({
                label: type,
                deadline: date.toLocaleDateString()
            });
        });

        setMilestones(mList);
    };

    const faqs = [
        {
            question: "Why break goals into milestones?",
            answer: "Large goals can feel overwhelming. Milestones break the journey into manageable steps, making it easier to maintain momentum and track progress."
        },
        {
            question: "How far in the future should I set my deadline?",
            answer: "Be realistic but ambitious. 'Parkinson's Law' states that work expands to fill the time available for its completion, so a firm, reasonable deadline is usually best."
        },
        {
            question: "What if I miss a milestone deadline?",
            answer: "Don't panic! Use it as a learning point to adjust your pace or strategy. Persistence is more important than perfection."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Goal Breakdown Planner'}
                description={toolData?.description || 'Turn your big dreams into actionable weekly steps and milestones.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Your Big Goal</label>
                            <input
                                type="text"
                                className="input"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                placeholder="e.g. Launch a personal website"
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Deadline</label>
                            <input
                                type="date"
                                className="input"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    <button onClick={calculateMilestones} className="btn btn-primary" style={{ padding: '1rem' }}>Generate Breakdown</button>

                    {milestones.length > 0 && (
                        <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid rgba(37, 99, 235, 0.3)' }}>
                            {milestones.map((m, i) => (
                                <div key={i} style={{ position: 'relative', marginBottom: '2.5rem' }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '-2.6rem',
                                        top: '0.2rem',
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        background: '#2563eb',
                                        boxShadow: '0 0 10px rgba(37, 99, 235, 0.5)'
                                    }} />
                                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{m.label}</div>
                                    <div style={{ color: 'var(--color-text-tertiary)', fontSize: '0.9rem' }}>Target: {m.deadline}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
