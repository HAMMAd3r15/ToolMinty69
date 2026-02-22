'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

// ── Types ───────────────────────────────────────────────────────────────────
type SlotType = 'study' | 'short-break' | 'lunch' | 'long-break';

interface TimeSlot {
    startMin: number;   // minutes from midnight
    endMin: number;
    type: SlotType;
    subject?: string;
}

interface DaySchedule {
    day: string;
    slots: TimeSlot[];
}

// ── Helpers ─────────────────────────────────────────────────────────────────
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SUBJECT_PALETTE = [
    { bg: 'rgba(99,102,241,0.18)', border: 'rgba(99,102,241,0.5)', text: '#a5b4fc' },
    { bg: 'rgba(16,185,129,0.18)', border: 'rgba(16,185,129,0.5)', text: '#6ee7b7' },
    { bg: 'rgba(245,158,11,0.18)', border: 'rgba(245,158,11,0.5)', text: '#fcd34d' },
    { bg: 'rgba(239,68,68,0.18)', border: 'rgba(239,68,68,0.5)', text: '#fca5a5' },
    { bg: 'rgba(236,72,153,0.18)', border: 'rgba(236,72,153,0.5)', text: '#f9a8d4' },
    { bg: 'rgba(59,130,246,0.18)', border: 'rgba(59,130,246,0.5)', text: '#93c5fd' },
    { bg: 'rgba(20,184,166,0.18)', border: 'rgba(20,184,166,0.5)', text: '#99f6e4' },
    { bg: 'rgba(168,85,247,0.18)', border: 'rgba(168,85,247,0.5)', text: '#d8b4fe' },
    { bg: 'rgba(251,146,60,0.18)', border: 'rgba(251,146,60,0.5)', text: '#fdba74' },
    { bg: 'rgba(34,197,94,0.18)', border: 'rgba(34,197,94,0.5)', text: '#86efac' },
    { bg: 'rgba(14,165,233,0.18)', border: 'rgba(14,165,233,0.5)', text: '#7dd3fc' },
    { bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.15)', text: '#e2e8f0' },
];

const BREAK_STYLE = { bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)', text: 'rgba(255,255,255,0.3)' };
const LUNCH_STYLE = { bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.18)', text: '#fdba74' };

function toHHMM(min: number) {
    const h = Math.floor(min / 60) % 24;
    const m = min % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function durationLabel(mins: number) {
    if (mins < 60) return `${mins}m`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

// ── Generator ────────────────────────────────────────────────────────────────
function buildSchedule(subList: string[], sessionMins: number, shortBreak: number, lunchAt: number, lunchDur: number, startMin: number, endMin: number): DaySchedule[] {
    return DAYS.map(day => {
        const slots: TimeSlot[] = [];
        let cursor = startMin;
        let sessionIdx = 0;
        let pomodorCount = 0;

        while (cursor + sessionMins <= endMin) {
            // Lunch break
            if (cursor <= lunchAt && cursor + sessionMins > lunchAt) {
                // Insert lunch before next session if we'd overlap
                if (cursor < lunchAt) {
                    // stub — skip to lunch
                }
                slots.push({ startMin: lunchAt, endMin: lunchAt + lunchDur, type: 'lunch' });
                cursor = lunchAt + lunchDur;
                continue;
            }
            if (cursor >= lunchAt && cursor < lunchAt + lunchDur) {
                cursor = lunchAt + lunchDur;
                continue;
            }

            const subject = subList[sessionIdx % subList.length];
            sessionIdx = (sessionIdx + 1) % subList.length === 0 ? sessionIdx + 1 : sessionIdx + 1;
            pomodorCount++;

            slots.push({ startMin: cursor, endMin: cursor + sessionMins, type: 'study', subject });
            cursor += sessionMins;

            // After every 2 sessions add a short break (or long break after 4)
            if (pomodorCount % 4 === 0) {
                const breakDur = shortBreak * 2; // long break
                if (cursor + breakDur <= endMin) {
                    slots.push({ startMin: cursor, endMin: cursor + breakDur, type: 'long-break' });
                    cursor += breakDur;
                }
            } else if (cursor < endMin) {
                if (cursor + shortBreak <= endMin) {
                    slots.push({ startMin: cursor, endMin: cursor + shortBreak, type: 'short-break' });
                    cursor += shortBreak;
                }
            }
        }

        return { day, slots };
    });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function StudyTimetable() {
    const [subjects, setSubjects] = useState('');
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('17:00');
    const [sessionMins, setSessionMins] = useState(50);
    const [shortBreak, setShortBreak] = useState(10);
    const [lunchTime, setLunchTime] = useState('13:00');
    const [lunchDur, setLunchDur] = useState(30);
    const [timetable, setTimetable] = useState<DaySchedule[]>([]);
    const [colorMap, setColorMap] = useState<Record<string, typeof SUBJECT_PALETTE[0]>>({});
    const [expandedDay, setExpandedDay] = useState<string | null>(null);

    const toMinutes = (t: string) => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };

    const generateTimetable = () => {
        const subList = subjects.split(',').map(s => s.trim()).filter(Boolean);
        if (subList.length === 0) return;

        const map: Record<string, typeof SUBJECT_PALETTE[0]> = {};
        subList.forEach((s, i) => { map[s] = SUBJECT_PALETTE[i % SUBJECT_PALETTE.length]; });
        setColorMap(map);

        const schedule = buildSchedule(
            subList, sessionMins, shortBreak,
            toMinutes(lunchTime), lunchDur,
            toMinutes(startTime), toMinutes(endTime)
        );
        setTimetable(schedule);
        setExpandedDay(null);
    };

    // Weekly subject totals
    const weeklyTotals = Object.keys(colorMap).map(sub => ({
        subject: sub,
        totalMin: timetable.reduce((acc, d) =>
            acc + d.slots.filter(s => s.subject === sub).reduce((a, s) => a + (s.endMin - s.startMin), 0), 0),
        color: colorMap[sub],
    }));

    const faqs = [
        {
            question: "How should I use this timetable?",
            answer: "Fill in your start/end time, session length, and subjects. The generator builds a real hourly schedule with short breaks and a lunch break automatically."
        },
        {
            question: "Why short breaks between sessions?",
            answer: "Research shows that 5–10 minute breaks after focused work improve retention and reduce mental fatigue. This is the basis of the Pomodoro and spaced-practice techniques."
        },
        {
            question: "Should I study on weekends?",
            answer: "Consistency beats intensity. Lighter weekend sessions focused on review are more effective than cramming everything into weekdays."
        }
    ];

    const toolData = calculators.find(c => c.href === '/study-timetable');

    return (
        <div style={{ maxWidth: '940px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Study Timetable Generator'}
                description={toolData?.description || 'Build a real daily schedule with time slots, breaks, and lunch.'}
            />

            {/* ── Settings card ── */}
            <div className="card" style={{ marginBottom: '2rem', background: 'rgba(15,23,42,0.6)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'grid', gap: '1.25rem' }}>

                    {/* Subjects */}
                    <div>
                        <label style={labelStyle}>Subjects (comma separated)</label>
                        <input
                            type="text" className="input"
                            value={subjects} onChange={e => setSubjects(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && generateTimetable()}
                            placeholder="Math, Physics, History, English..."
                            style={inputStyle}
                        />
                    </div>

                    {/* Row 1: times */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: '1rem' }}>
                        <div>
                            <label style={labelStyle}>Start Time</label>
                            <input type="time" className="input" value={startTime} onChange={e => setStartTime(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>End Time</label>
                            <input type="time" className="input" value={endTime} onChange={e => setEndTime(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Lunch Time</label>
                            <input type="time" className="input" value={lunchTime} onChange={e => setLunchTime(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                            <label style={labelStyle}>Lunch Duration (min)</label>
                            <input type="number" className="input" value={lunchDur} min={0} max={120} onChange={e => setLunchDur(parseInt(e.target.value) || 30)} style={{ ...inputStyle, textAlign: 'center' }} />
                        </div>
                    </div>

                    {/* Row 2: durations */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: '1rem', alignItems: 'end' }}>
                        <div>
                            <label style={labelStyle}>Session Length (min)</label>
                            <input type="number" className="input" value={sessionMins} min={15} max={180} onChange={e => setSessionMins(parseInt(e.target.value) || 50)} style={{ ...inputStyle, textAlign: 'center' }} />
                        </div>
                        <div>
                            <label style={labelStyle}>Short Break (min)</label>
                            <input type="number" className="input" value={shortBreak} min={0} max={60} onChange={e => setShortBreak(parseInt(e.target.value) || 10)} style={{ ...inputStyle, textAlign: 'center' }} />
                        </div>
                        <button
                            onClick={generateTimetable}
                            style={{
                                padding: '0.9rem', borderRadius: '0.85rem', fontWeight: 800,
                                fontSize: '0.95rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                color: '#fff', border: 'none', cursor: 'pointer',
                                boxShadow: '0 8px 24px rgba(99,102,241,0.4)', whiteSpace: 'nowrap',
                            }}
                        >
                            ✦ Generate Timetable
                        </button>
                    </div>
                </div>
            </div>

            {timetable.length > 0 && (
                <>
                    {/* ── Subject legend ── */}
                    <div style={{
                        display: 'flex', gap: '0.6rem', flexWrap: 'wrap',
                        marginBottom: '1.5rem', padding: '1rem 1.5rem',
                        background: 'rgba(15,23,42,0.6)', borderRadius: '1.5rem',
                        border: '1px solid rgba(255,255,255,0.05)',
                        alignItems: 'center',
                    }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: '0.25rem' }}>Weekly total</span>
                        {weeklyTotals.map(({ subject, totalMin, color }) => (
                            <div key={subject} style={{
                                display: 'flex', alignItems: 'center', gap: '0.45rem',
                                background: color.bg, border: `1px solid ${color.border}`,
                                padding: '0.4rem 0.8rem', borderRadius: '99px',
                            }}>
                                <span style={{ fontWeight: 700, color: color.text, fontSize: '0.85rem' }}>{subject}</span>
                                <span style={{ fontWeight: 500, color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem' }}>{durationLabel(totalMin)}</span>
                            </div>
                        ))}
                        {/* Break legend */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', background: BREAK_STYLE.bg, border: `1px solid ${BREAK_STYLE.border}`, padding: '0.4rem 0.8rem', borderRadius: '99px' }}>
                            <span style={{ fontWeight: 600, color: BREAK_STYLE.text, fontSize: '0.82rem' }}>☕ Break</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', background: LUNCH_STYLE.bg, border: `1px solid ${LUNCH_STYLE.border}`, padding: '0.4rem 0.8rem', borderRadius: '99px' }}>
                            <span style={{ fontWeight: 600, color: LUNCH_STYLE.text, fontSize: '0.82rem' }}>🍽 Lunch</span>
                        </div>
                    </div>

                    {/* ── Day rows ── */}
                    <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '3rem' }}>
                        {timetable.map((dayData, i) => {
                            const isExpanded = expandedDay === dayData.day;
                            const studySlots = dayData.slots.filter(s => s.type === 'study');
                            const totalStudyMin = studySlots.reduce((a, s) => a + (s.endMin - s.startMin), 0);

                            return (
                                <div key={i} style={{
                                    background: 'rgba(15,23,42,0.6)', borderRadius: '1.25rem',
                                    border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden',
                                    animation: 'fadeRow 0.4s ease backwards', animationDelay: `${i * 0.04}s`,
                                }}>
                                    {/* Header row — always visible */}
                                    <div
                                        onClick={() => setExpandedDay(isExpanded ? null : dayData.day)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '1rem',
                                            padding: '0.9rem 1.25rem', cursor: 'pointer',
                                            transition: 'background 0.15s',
                                        }}
                                    >
                                        {/* Day name */}
                                        <div style={{ minWidth: '52px' }}>
                                            <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>{DAY_SHORT[i]}</div>
                                            <div style={{ fontWeight: 400, color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>
                                                {DAYS[i].slice(DAY_SHORT[i].length)}
                                            </div>
                                        </div>

                                        {/* Swimlane strip */}
                                        <div style={{ flex: 1, display: 'flex', gap: '3px', height: '36px', alignItems: 'stretch', overflow: 'hidden', borderRadius: '0.5rem' }}>
                                            {dayData.slots.map((slot, j) => {
                                                const dur = slot.endMin - slot.startMin;
                                                if (slot.type === 'study') {
                                                    const color = colorMap[slot.subject!] || SUBJECT_PALETTE[0];
                                                    return (
                                                        <div key={j} title={`${slot.subject} · ${toHHMM(slot.startMin)}–${toHHMM(slot.endMin)}`} style={{
                                                            flex: dur, background: color.bg, border: `1px solid ${color.border}`,
                                                            borderRadius: '0.35rem', display: 'flex', alignItems: 'center',
                                                            justifyContent: 'center', overflow: 'hidden',
                                                            minWidth: '0',
                                                        }}>
                                                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: color.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 4px' }}>
                                                                {slot.subject}
                                                            </span>
                                                        </div>
                                                    );
                                                }
                                                if (slot.type === 'lunch') {
                                                    return <div key={j} style={{ flex: dur, background: LUNCH_STYLE.bg, border: `1px solid ${LUNCH_STYLE.border}`, borderRadius: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '0' }}>
                                                        <span style={{ fontSize: '0.7rem', color: LUNCH_STYLE.text }}>🍽</span>
                                                    </div>;
                                                }
                                                return <div key={j} style={{ flex: dur, background: BREAK_STYLE.bg, borderRadius: '0.35rem', minWidth: '0' }} />;
                                            })}
                                        </div>

                                        {/* Summary */}
                                        <div style={{ textAlign: 'right', minWidth: '60px' }}>
                                            <div style={{ fontWeight: 700, color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>{durationLabel(totalStudyMin)}</div>
                                            <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)' }}>{studySlots.length} sessions</div>
                                        </div>

                                        {/* Chevron */}
                                        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s', flexShrink: 0 }}>▼</span>
                                    </div>

                                    {/* Expanded slot list */}
                                    {isExpanded && (
                                        <div style={{ padding: '0 1.25rem 1rem', display: 'grid', gap: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                                            {dayData.slots.map((slot, j) => {
                                                const dur = slot.endMin - slot.startMin;
                                                if (slot.type === 'study') {
                                                    const color = colorMap[slot.subject!] || SUBJECT_PALETTE[0];
                                                    return (
                                                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.85rem', background: color.bg, border: `1px solid ${color.border}`, borderRadius: '0.75rem', marginTop: j === 0 ? '0.75rem' : 0 }}>
                                                            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', minWidth: '130px', fontVariantNumeric: 'tabular-nums' }}>
                                                                {toHHMM(slot.startMin)} – {toHHMM(slot.endMin)}
                                                            </span>
                                                            <span style={{ fontWeight: 700, color: color.text, flex: 1 }}>{slot.subject}</span>
                                                            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>{durationLabel(dur)}</span>
                                                        </div>
                                                    );
                                                }
                                                if (slot.type === 'lunch') {
                                                    return (
                                                        <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.85rem', background: LUNCH_STYLE.bg, border: `1px solid ${LUNCH_STYLE.border}`, borderRadius: '0.75rem' }}>
                                                            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', minWidth: '130px' }}>{toHHMM(slot.startMin)} – {toHHMM(slot.endMin)}</span>
                                                            <span style={{ fontWeight: 700, color: LUNCH_STYLE.text, flex: 1 }}>🍽 Lunch Break</span>
                                                            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>{durationLabel(dur)}</span>
                                                        </div>
                                                    );
                                                }
                                                const isLong = slot.type === 'long-break';
                                                return (
                                                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.4rem 0.85rem', borderRadius: '0.75rem' }}>
                                                        <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.2)', minWidth: '130px' }}>{toHHMM(slot.startMin)} – {toHHMM(slot.endMin)}</span>
                                                        <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)', flex: 1 }}>☕ {isLong ? 'Long Break' : 'Short Break'}</span>
                                                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)' }}>{durationLabel(dur)}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

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

// ── Tiny style helpers ───────────────────────────────────────────────────────
const labelStyle: React.CSSProperties = {
    display: 'block', marginBottom: '0.55rem',
    fontSize: '0.78rem', fontWeight: 700,
    color: 'rgba(255,255,255,0.45)',
    textTransform: 'uppercase', letterSpacing: '0.1em',
};
const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(30,41,59,0.5)',
    borderRadius: '0.85rem',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
};
