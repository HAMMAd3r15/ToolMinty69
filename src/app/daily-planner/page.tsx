'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

const HOURS = [
    '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM',
    '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM',
    '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'
];

export default function DailyPlanner() {
    const calc = calculators.find(c => c.href === '/daily-planner');
    const [date, setDate] = useState({ d: '', m: '', y: '' });
    const [activeDay, setActiveDay] = useState(0);
    const [weather, setWeather] = useState(0);
    const [schedule, setSchedule] = useState(Array(HOURS.length).fill(''));
    const [checks, setChecks] = useState(Array(HOURS.length).fill(false));
    const [goals, setGoals] = useState(['', '', '', '']);
    const [todos, setTodos] = useState(Array(10).fill(''));
    const [notes, setNotes] = useState('');

    const faqs = [
        {
            question: "Why should I plan my day on paper?",
            answer: "Physical writing increases cognitive engagement and helps you commit to your tasks. It also reduces digital distractions."
        },
        {
            question: "What should I put in 'Priorities'?",
            answer: "These are your 'Big Rocks'—the 2 or 3 most important tasks that, if completed, would make the day feel like a success."
        },
        {
            question: "How do I save it as a PDF?",
            answer: "Click the 'Print / Save PDF' button. In the print dialog, select 'Save as PDF' from the destination list."
        }
    ];

    const printPlanner = () => window.print();

    // Theme Colors
    const COLORS = {
        bg: '#fbf7ef',
        accent: '#5e8474',
        accentLight: 'rgba(94, 132, 116, 0.15)',
        text: '#5e8474',
        border: '#d6dfd0',
        white: '#ffffff',
        yellow: '#f4c542'
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>
            {/* Standard Tool Header - Hidden during print */}
            <div className="no-print">
                <ToolHeader
                    title={calc?.title || 'Daily Planner'}
                    description={calc?.description || 'Design and print your own custom daily schedule.'}
                />
            </div>

            {/* Control Bar - Keep the Print button near the canvas */}
            <div className="no-print" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <button onClick={printPlanner} className="btn-primary" style={{
                    padding: '1rem 3.5rem',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
                    transition: 'all 0.3s'
                }}>
                    Download & Print
                </button>
            </div>

            {/* Planner Sheet - STRICT A4 Constraint */}
            <div className="planner-canvas" style={{
                background: COLORS.bg,
                color: COLORS.text,
                padding: '2rem 2.5rem',
                borderRadius: '0',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                width: '595px',
                height: '842px',
                margin: '0 auto',
                fontFamily: "'Quicksand', 'Fredoka', sans-serif",
                position: 'relative',
                overflow: 'hidden',
                boxSizing: 'border-box'
            }}>
                {/* Header Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <div style={{ fontSize: '3.5rem', lineHeight: '0.9', fontWeight: 900, color: COLORS.accent, letterSpacing: '-1.5px' }}>
                            Daily<br />Planner
                        </div>
                    </div>

                    <div style={{ display: 'grid', gap: '0.8rem', alignContent: 'start' }}>
                        {/* Date Input */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end', fontSize: '1.2rem', fontWeight: 700 }}>
                            <span style={{ color: COLORS.accent, opacity: 0.8 }}>date:</span>
                            <div style={{ display: 'flex', gap: '0.2rem', borderBottom: `1.5px solid ${COLORS.accent}` }}>
                                <input type="text" maxLength={2} value={date.d} onChange={e => setDate({ ...date, d: e.target.value })} style={{ width: '25px', border: 'none', background: 'transparent', textAlign: 'center', outline: 'none', fontSize: '1.1rem', color: COLORS.accent }} placeholder="/" />
                                <span style={{ color: COLORS.accent }}>/</span>
                                <input type="text" maxLength={2} value={date.m} onChange={e => setDate({ ...date, m: e.target.value })} style={{ width: '25px', border: 'none', background: 'transparent', textAlign: 'center', outline: 'none', fontSize: '1.1rem', color: COLORS.accent }} placeholder="/" />
                                <span style={{ color: COLORS.accent }}>/</span>
                                <input type="text" maxLength={4} value={date.y} onChange={e => setDate({ ...date, y: e.target.value })} style={{ width: '50px', border: 'none', background: 'transparent', textAlign: 'center', outline: 'none', fontSize: '1.1rem', color: COLORS.accent }} placeholder="202X" />
                            </div>
                        </div>

                        {/* Day Scroller */}
                        <div style={{
                            background: COLORS.accent,
                            borderRadius: '50px',
                            padding: '0.15rem 0.6rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: '#fff',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            boxShadow: '0 3px 6px rgba(0,0,0,0.1)'
                        }}>
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                <div
                                    key={i}
                                    onClick={() => setActiveDay(i)}
                                    style={{
                                        width: '22px',
                                        height: '22px',
                                        lineHeight: '22px',
                                        textAlign: 'center',
                                        borderRadius: '50%',
                                        background: activeDay === i ? 'rgba(255,255,255,0.3)' : 'transparent',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Weather Row */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem', fontSize: '1.2rem' }}>
                            {['☀️', '🌤️', '🌧️', '⛈️', '❄️', '🌬️', '🌨️'].map((w, i) => (
                                <span
                                    key={i}
                                    onClick={() => setWeather(i)}
                                    style={{
                                        cursor: 'pointer',
                                        opacity: weather === i ? 1 : 0.2,
                                        transform: weather === i ? 'scale(1.1)' : 'scale(1)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {w}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.5rem', height: 'calc(100% - 150px)' }}>
                    {/* Schedule Table */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '70px 40px 1fr', gap: '0.3rem', marginBottom: '0.8rem' }}>
                            <div style={{ background: COLORS.accent, color: '#fff', textAlign: 'center', padding: '0.3rem', borderRadius: '50px', fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase' }}>Time</div>
                            <div style={{ background: COLORS.accent, color: '#fff', textAlign: 'center', padding: '0.3rem', borderRadius: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '0.8rem' }}>✓</span>
                            </div>
                            <div style={{ background: COLORS.accent, color: '#fff', textAlign: 'center', padding: '0.3rem', borderRadius: '50px', fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase' }}>Activity</div>
                        </div>

                        <div style={{ border: `1.2px solid ${COLORS.border}`, borderRadius: '8px', overflow: 'hidden', flexGrow: 1 }}>
                            {HOURS.map((hour, i) => (
                                <div key={i} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '70px 40px 1fr',
                                    borderBottom: i === HOURS.length - 1 ? 'none' : `1.2px solid ${COLORS.border}`,
                                    alignItems: 'center',
                                    height: 'calc(100% / 19)'
                                }}>
                                    <div style={{ padding: '0.2rem', textAlign: 'center', fontSize: '0.7rem', fontWeight: 700, color: COLORS.accent, borderRight: `1.2px solid ${COLORS.border}` }}>
                                        {hour}
                                    </div>
                                    <div style={{ padding: '0.2rem', display: 'flex', justifyContent: 'center', borderRight: `1.2px solid ${COLORS.border}` }}>
                                        <div
                                            onClick={() => {
                                                const n = [...checks];
                                                n[i] = !n[i];
                                                setChecks(n);
                                            }}
                                            style={{
                                                width: '14px',
                                                height: '14px',
                                                border: `1.5px solid ${COLORS.accent}`,
                                                borderRadius: '50%',
                                                cursor: 'pointer',
                                                background: checks[i] ? COLORS.accent : 'transparent'
                                            }}
                                        />
                                    </div>
                                    <div style={{ padding: '0.2rem 0.5rem' }}>
                                        <input
                                            type="text"
                                            value={schedule[i]}
                                            onChange={e => {
                                                const n = [...schedule];
                                                n[i] = e.target.value;
                                                setSchedule(n);
                                            }}
                                            style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '0.85rem' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: '1.2rem', height: '100%' }}>
                        {/* Today's Goal */}
                        <div>
                            <div style={{ background: COLORS.accent, color: '#fff', textAlign: 'center', padding: '0.5rem', borderRadius: '50px', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.8rem', width: '70%', margin: '0 auto 0.8rem' }}>Today's Goal</div>
                            <div style={{ border: `2px solid ${COLORS.accent}`, borderRadius: '20px', padding: '0.8rem', display: 'grid', gap: '0.6rem' }}>
                                {goals.map((goal, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                                        <div style={{ width: '10px', height: '10px', background: COLORS.yellow, borderRadius: '50%', flexShrink: 0 }} />
                                        <input
                                            type="text"
                                            value={goal}
                                            onChange={e => {
                                                const n = [...goals];
                                                n[i] = e.target.value;
                                                setGoals(n);
                                            }}
                                            style={{ border: 'none', borderBottom: `1.2px solid ${COLORS.border}`, width: '100%', background: 'transparent', outline: 'none', fontSize: '0.85rem' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* To-Do Lists */}
                        <div>
                            <div style={{ background: COLORS.accent, color: '#fff', textAlign: 'center', padding: '0.5rem', borderRadius: '50px', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.8rem', width: '70%', margin: '0 auto 0.8rem' }}>To-Do Lists</div>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                {todos.map((todo, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                                        <div style={{ width: '14px', height: '14px', border: `1.8px solid ${COLORS.accent}`, borderRadius: '3px', flexShrink: 0 }} />
                                        <input
                                            type="text"
                                            value={todo}
                                            onChange={e => {
                                                const n = [...todos];
                                                n[i] = e.target.value;
                                                setTodos(n);
                                            }}
                                            style={{ border: 'none', borderBottom: `1.2px solid ${COLORS.border}`, width: '100%', background: 'transparent', outline: 'none', fontSize: '0.85rem' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Notes Section */}
                        <div style={{
                            background: COLORS.accent,
                            borderRadius: '20px',
                            padding: '1.2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            color: '#fff',
                            minHeight: '150px'
                        }}>
                            <div style={{ background: '#fff', color: COLORS.accent, textAlign: 'center', padding: '0.2rem 1.2rem', borderRadius: '50px', fontWeight: 800, fontSize: '0.65rem', textTransform: 'uppercase', alignSelf: 'center', marginBottom: '0.8rem' }}>Notes</div>
                            <textarea
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                style={{
                                    flexGrow: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    outline: 'none',
                                    resize: 'none',
                                    fontSize: '0.85rem',
                                    lineHeight: '1.8',
                                    backgroundImage: `linear-gradient(transparent, transparent calc(1.8em - 1px), rgba(255,255,255,0.15) calc(1.8em - 1px), rgba(255,255,255,0.15) 1.8em)`,
                                    backgroundSize: '100% 1.8em'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQs */}
            <div className="no-print" style={{ marginTop: '3rem' }}>
                <FAQSection items={faqs} />
            </div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap');
                
                @media print {
                    .no-print, header, footer, nav, .container > div:first-child { display: none !important; }
                    body { background: white !important; padding: 0 !important; margin: 0 !important; }
                    main { padding: 0 !important; margin: 0 !important; }
                    .planner-canvas { 
                        box-shadow: none !important; 
                        margin: 0 auto !important; 
                        width: 595px !important;
                        height: 842px !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        page-break-after: avoid;
                        page-break-before: avoid;
                    }
                }
                
                input::placeholder { color: rgba(94, 132, 116, 0.3) !important; }
                
                .btn-primary {
                    background: #2563eb;
                    color: white;
                    border: none;
                    transition: all 0.2s;
                }
                .btn-primary:hover {
                    background: #1d4ed8;
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    );
}
