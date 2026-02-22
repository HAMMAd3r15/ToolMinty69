'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';
import ToolHeader from '@/components/UI/ToolHeader';

export default function SpeedCalculator() {
    const [distance, setDistance] = useState('');
    const [time, setTime] = useState('');
    const [distUnit, setDistUnit] = useState('km');
    const [timeUnit, setTimeUnit] = useState('hours');
    const toolData = calculators.find(c => c.href === '/speed-calculator');

    const calc = () => {
        const d = parseFloat(distance);
        const t = parseFloat(time);
        if (isNaN(d) || isNaN(t) || d <= 0 || t <= 0) return null;
        let distKm = d;
        if (distUnit === 'miles') distKm = d * 1.60934;
        if (distUnit === 'm') distKm = d / 1000;
        let timeHours = t;
        if (timeUnit === 'minutes') timeHours = t / 60;
        if (timeUnit === 'seconds') timeHours = t / 3600;
        const speedKmh = distKm / timeHours;
        return { kmh: speedKmh.toFixed(2), mph: (speedKmh / 1.60934).toFixed(2), ms: (speedKmh / 3.6).toFixed(2) };
    };

    const res = calc();
    const faqs = [
        { question: "What is the formula?", answer: "Speed = Distance ÷ Time. Our calculator automatically converts units so you can use km, miles, or meters." },
    ];

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Speed Calculator'}
                description={toolData?.description || 'Calculate speed in km/h, mph, and m/s from distance and time.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Distance</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input type="number" className="input" value={distance} onChange={e => setDistance(e.target.value)} placeholder="e.g. 100" style={{ flex: 1 }} />
                                <select className="input" value={distUnit} onChange={e => setDistUnit(e.target.value)} style={{ width: '80px', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }}>
                                    <option value="km">km</option>
                                    <option value="miles">mi</option>
                                    <option value="m">m</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Time</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input type="number" className="input" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 1" style={{ flex: 1 }} />
                                <select className="input" value={timeUnit} onChange={e => setTimeUnit(e.target.value)} style={{ width: '100px', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }}>
                                    <option value="hours">Hours</option>
                                    <option value="minutes">Minutes</option>
                                    <option value="seconds">Seconds</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: '1rem' }}>
                            <ResultCard title="Speed (km/h)" value={`${res.kmh}`} color="primary" highlight />
                            <ResultCard title="Speed (mph)" value={`${res.mph}`} color="secondary" />
                            <ResultCard title="Speed (m/s)" value={`${res.ms}`} color="accent" />
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
