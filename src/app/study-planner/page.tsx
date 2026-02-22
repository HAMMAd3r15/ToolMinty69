'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

type Subject = { name: string; difficulty: string };

export default function StudyPlanner() {
    const [totalHours, setTotalHours] = useState('');
    const [subjects, setSubjects] = useState<Subject[]>([
        { name: 'Subject 1', difficulty: '2' },
        { name: 'Subject 2', difficulty: '1' },
    ]);

    const addSubject = () => setSubjects([...subjects, { name: `Subject ${subjects.length + 1}`, difficulty: '1' }]);
    const removeSubject = (i: number) => setSubjects(subjects.filter((_, idx) => idx !== i));
    const update = (i: number, field: keyof Subject, val: string) => {
        const next = [...subjects];
        next[i] = { ...next[i], [field]: val };
        setSubjects(next);
    };

    const calc = () => {
        const total = parseFloat(totalHours);
        if (isNaN(total) || total <= 0 || subjects.length === 0) return null;
        const totalWeight = subjects.reduce((sum, s) => sum + (parseFloat(s.difficulty) || 1), 0);
        return subjects.map(s => ({
            name: s.name,
            hours: ((parseFloat(s.difficulty) || 1) / totalWeight * total).toFixed(1),
        }));
    };

    const toolData = calculators.find(c => c.href === '/study-planner');

    const plan = calc();
    const faqs = [
        { question: "How are hours allocated?", answer: "Hours are distributed proportional to each subject's difficulty weight. A subject with difficulty 3 gets 3× more hours than one with difficulty 1." },
        { question: "What should difficulty mean?", answer: "Use your own scale — 1 for easy subjects, 2 for medium, 3 for hard. It's your personal assessment that shapes the time split." },
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Study Time Planner'}
                description={toolData?.description || 'Efficiently divide your total study time across subjects based on difficulty.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ maxWidth: '300px' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Total Study Hours Available</label>
                        <input type="number" className="input" value={totalHours} onChange={e => setTotalHours(e.target.value)} placeholder="e.g. 20" />
                    </div>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {subjects.map((s, i) => (
                            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.75rem', alignItems: 'end' }}>
                                <input type="text" className="input" value={s.name} onChange={e => update(i, 'name', e.target.value)} placeholder="Subject name" />
                                <div>
                                    {i === 0 && <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem' }}>Difficulty (1-3)</label>}
                                    <input type="number" className="input" value={s.difficulty} onChange={e => update(i, 'difficulty', e.target.value)} min="1" max="5" style={{ width: '80px' }} />
                                </div>
                                <button onClick={() => removeSubject(i)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.5rem', color: '#ef4444', cursor: 'pointer', padding: '0.5rem 0.75rem', fontWeight: 700 }}>×</button>
                            </div>
                        ))}
                        <button onClick={addSubject} style={{ padding: '0.6rem 1.25rem', background: 'rgba(37,99,235,0.1)', border: '1px dashed rgba(37,99,235,0.4)', borderRadius: '0.75rem', color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}>+ Add Subject</button>
                    </div>
                    {plan && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: '1rem', marginTop: '0.5rem' }}>
                            {plan.map((p, i) => (
                                <ResultCard key={i} title={p.name} value={`${p.hours}h`} color={i % 3 === 0 ? 'primary' : i % 3 === 1 ? 'secondary' : 'accent'} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
