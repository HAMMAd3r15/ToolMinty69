'use client';

import { useState, useRef, useEffect } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

/* ── Elite Custom Dropdown ─────────────────────────────────────── */
function GradeSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} style={{ position: 'relative', userSelect: 'none' }}>
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '90px', padding: '0.65rem 0.9rem',
                    background: 'var(--color-surface)',
                    border: `1px solid ${open ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.95rem', fontWeight: 600,
                    cursor: 'pointer', gap: '0.4rem',
                    boxShadow: open ? 'var(--shadow-input-focus)' : 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    outline: 'none',
                }}
            >
                <span>{value}</span>
                <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
                >
                    <path d="M2 4l4 4 4-4" stroke="var(--color-text-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {open && (
                <div style={{
                    position: 'absolute', top: 'calc(100% + 6px)', left: 0,
                    minWidth: '90px', zIndex: 1000,
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                    animation: 'eliteDropIn 0.15s cubic-bezier(0.16,1,0.3,1)',
                }}>
                    {options.map(opt => (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => { onChange(opt); setOpen(false); }}
                            style={{
                                display: 'block', width: '100%', textAlign: 'left',
                                padding: '0.55rem 0.9rem',
                                fontSize: '0.9rem', fontWeight: opt === value ? 700 : 400,
                                color: opt === value ? 'var(--color-secondary)' : 'var(--color-text-primary)',
                                background: opt === value ? 'rgba(99,102,241,0.12)' : 'transparent',
                                border: 'none', cursor: 'pointer',
                                transition: 'background 0.12s, color 0.12s',
                                borderLeft: opt === value ? '3px solid var(--color-secondary)' : '3px solid transparent',
                            }}
                            onMouseEnter={e => { if (opt !== value) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(99,102,241,0.06)'; }}
                            onMouseLeave={e => { if (opt !== value) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

const dropdownKeyframes = `
@keyframes eliteDropIn {
  from { opacity: 0; transform: translateY(-6px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)   scale(1);    }
}`;

type Course = { name: string; grade: string; credits: string };

const gradeToPoints: Record<string, number> = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0,
};

export default function GPAForm() {
    const [courses, setCourses] = useState<Course[]>([
        { name: 'Course 1', grade: 'A', credits: '3' },
        { name: 'Course 2', grade: 'B+', credits: '3' },
    ]);

    const addCourse = () => setCourses([...courses, { name: `Course ${courses.length + 1}`, grade: 'A', credits: '3' }]);
    const removeCourse = (i: number) => setCourses(courses.filter((_, idx) => idx !== i));
    const update = (i: number, field: keyof Course, val: string) => {
        const next = [...courses];
        next[i] = { ...next[i], [field]: val };
        setCourses(next);
    };

    const calc = () => {
        let totalPoints = 0, totalCredits = 0;
        for (const c of courses) {
            const pts = gradeToPoints[c.grade];
            const cr = parseFloat(c.credits);
            if (pts !== undefined && !isNaN(cr) && cr > 0) {
                totalPoints += pts * cr;
                totalCredits += cr;
            }
        }
        if (totalCredits === 0) return null;
        return { gpa: (totalPoints / totalCredits).toFixed(2), totalCredits };
    };

    const res = calc();
    const grades = Object.keys(gradeToPoints);
    const faqs = [
        { question: "How is GPA calculated?", answer: "GPA = Sum of (Grade Points × Credit Hours) ÷ Total Credit Hours. Each letter grade corresponds to a point value on the 4.0 scale." },
        { question: "What is a good GPA?", answer: "3.7+ is typically considered excellent (Summa/Magna Cum Laude), 3.0–3.7 is good, and below 2.0 may be academically at-risk." },
    ];

    const calcInfo = calculators.find(c => c.href === '/gpa-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <style>{dropdownKeyframes}</style>
            <ToolHeader
                title={calcInfo?.title || 'GPA Calculator'}
                description={calcInfo?.description || 'Calculate your Grade Point Average from your courses, grades, and credit hours.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {courses.map((c, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '0.75rem', alignItems: 'end' }}>
                            <div>
                                {i === 0 && <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 500 }}>Course Name</label>}
                                <input type="text" className="input" value={c.name} onChange={e => update(i, 'name', e.target.value)} placeholder="e.g. Math 101" />
                            </div>
                            <div>
                                {i === 0 && <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 500 }}>Grade</label>}
                                <GradeSelect value={c.grade} onChange={v => update(i, 'grade', v)} options={grades} />
                            </div>
                            <div>
                                {i === 0 && <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 500 }}>Credits</label>}
                                <input type="number" className="input" value={c.credits} onChange={e => update(i, 'credits', e.target.value)} style={{ width: '70px' }} />
                            </div>
                            <button onClick={() => removeCourse(i)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.5rem', color: '#ef4444', cursor: 'pointer', padding: '0.5rem 0.75rem', fontWeight: 700, marginTop: i === 0 ? '1.4rem' : 0 }}>×</button>
                        </div>
                    ))}
                    <button onClick={addCourse} style={{ padding: '0.6rem 1.25rem', background: 'rgba(37,99,235,0.1)', border: '1px dashed rgba(37,99,235,0.4)', borderRadius: '0.75rem', color: '#2563eb', cursor: 'pointer', fontWeight: 600, marginTop: '0.5rem' }}>
                        + Add Course
                    </button>
                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem', marginTop: '1rem' }}>
                            <ResultCard title="GPA (4.0 Scale)" value={res.gpa} color="primary" highlight />
                            <ResultCard title="Total Credits" value={`${res.totalCredits}`} color="secondary" />
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
