'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

interface Milestone {
    age: number;
    title: string;
}

export default function LifeTimeline() {
    const [birthYear, setBirthYear] = useState<number>(new Date().getFullYear() - 25);
    const [milestones, setMilestones] = useState<Milestone[]>([
        { age: 1, title: 'First Steps' },
        { age: 5, title: 'Started School' },
        { age: 18, title: 'Graduated' }
    ]);

    const addMilestone = () => {
        setMilestones([...milestones, { age: 0, title: '' }].sort((a, b) => a.age - b.age));
    };

    const updateMilestone = (index: number, field: keyof Milestone, value: any) => {
        const newList = [...milestones];
        newList[index] = { ...newList[index], [field]: value };
        setMilestones(newList.sort((a, b) => a.age - b.age));
    };

    const removeMilestone = (index: number) => {
        setMilestones(milestones.filter((_, i) => i !== index));
    };

    const faqs = [
        {
            question: "Why should I visualize my life timeline?",
            answer: "Seeing your life as a series of milestones provides perspective on how far you've come and helps you plan where you want to go next."
        },
        {
            question: "What is a 'Memento Mori'?",
            answer: "It's a Latin phrase meaning 'remember that you must die'. It's a philosophical tool used to remind people to live their life to the fullest by recognizing its finite nature."
        },
        {
            question: "How do I save this timeline?",
            answer: "You can screenshot your timeline once it's complete. It's a great piece for a personal journal or a digital 'about me' page."
        }
    ];

    const calc = calculators.find(c => c.href === '/life-timeline');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Life Timeline Visualizer'}
                description={calc?.description || 'Map out your key life events on a visual timeline.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Birth Year</label>
                        <input type="number" className="input" value={birthYear} onChange={(e) => setBirthYear(parseInt(e.target.value) || 0)} style={{ width: '150px' }} />
                    </div>

                    <div style={{ position: 'relative', paddingLeft: '3rem', borderLeft: '2px solid rgba(255, 255, 255, 0.1)' }}>
                        {milestones.map((m, i) => (
                            <div key={i} style={{ position: 'relative', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                                <div style={{
                                    position: 'absolute',
                                    left: '-3.7rem',
                                    top: '0.5rem',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: '#2563eb',
                                    border: '4px solid var(--color-bg-primary)',
                                    zIndex: 1
                                }} />
                                <input
                                    type="number"
                                    className="input"
                                    value={m.age}
                                    placeholder="Age"
                                    onChange={(e) => updateMilestone(i, 'age', parseInt(e.target.value) || 0)}
                                    style={{ width: '80px', padding: '0.5rem' }}
                                />
                                <input
                                    type="text"
                                    className="input"
                                    value={m.title}
                                    placeholder="Event description"
                                    onChange={(e) => updateMilestone(i, 'title', e.target.value)}
                                    style={{ flex: 1, padding: '0.5rem' }}
                                />
                                <button onClick={() => removeMilestone(i)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>×</button>
                            </div>
                        ))}
                        <button onClick={addMilestone} className="btn-secondary" style={{ marginLeft: '-1.5rem', marginBottom: '1rem' }}>+ Add Event</button>
                    </div>

                    <div style={{ textAlign: 'center', color: 'var(--color-text-tertiary)', fontSize: '0.8rem' }}>
                        Timeline starts at {birthYear} (Age 0)
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />

            <style jsx>{`
                .btn-secondary {
                    background: rgba(37, 99, 235, 0.1);
                    color: #fff;
                    border: 1px solid rgba(37, 99, 235, 0.2);
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-size: 0.85rem;
                }
            `}</style>
        </div>
    );
}
