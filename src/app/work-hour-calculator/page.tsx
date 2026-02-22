'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function WorkHourCalculator() {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [breakMinutes, setBreakMinutes] = useState('0');

    const calc = () => {
        if (!startTime || !endTime) return null;
        const [sh, sm] = startTime.split(':').map(Number);
        const [eh, em] = endTime.split(':').map(Number);
        let startTotalMins = sh * 60 + sm;
        let endTotalMins = eh * 60 + em;
        if (endTotalMins <= startTotalMins) endTotalMins += 24 * 60; // Handle overnight
        const workMins = endTotalMins - startTotalMins - (parseInt(breakMinutes) || 0);
        if (workMins <= 0) return null;
        const hours = Math.floor(workMins / 60);
        const mins = workMins % 60;
        return { time: `${hours}h ${mins}m`, decimal: (workMins / 60).toFixed(2) };
    };

    const toolData = calculators.find(c => c.href === '/work-hour-calculator');

    const res = calc();
    const faqs = [
        { question: "Does this handle overnight shifts?", answer: "Yes. If the end time is earlier than the start time, we automatically assume the shift crosses midnight." },
        { question: "How are breaks handled?", answer: "Enter total break time in minutes. This will be subtracted from the total shift duration." },
    ];

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Work Hour Calculator'}
                description={toolData?.description || 'Calculate exact hours worked between clock-in and clock-out, minus breaks.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Start Time</label>
                            <input type="time" className="input" value={startTime} onChange={e => setStartTime(e.target.value)} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>End Time</label>
                            <input type="time" className="input" value={endTime} onChange={e => setEndTime(e.target.value)} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Break (minutes)</label>
                            <input type="number" className="input" value={breakMinutes} onChange={e => setBreakMinutes(e.target.value)} placeholder="0" min="0" />
                        </div>
                    </div>
                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
                            <ResultCard title="Hours Worked" value={res.time} color="primary" highlight />
                            <ResultCard title="Decimal Hours" value={`${res.decimal}h`} color="secondary" />
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
