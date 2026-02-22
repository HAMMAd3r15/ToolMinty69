'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import CustomSelect from '@/components/UI/CustomSelect';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function PaceCalculator() {
    const [hours, setHours] = useState('0');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('0');
    const [distance, setDistance] = useState('');
    const [unit, setUnit] = useState('km');

    const calc = () => {
        const totalSeconds = (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
        const dist = parseFloat(distance);
        if (!dist || dist <= 0 || totalSeconds <= 0) return null;
        const paceSeconds = totalSeconds / dist;
        const paceMin = Math.floor(paceSeconds / 60);
        const paceSec = Math.round(paceSeconds % 60);
        const speedKmh = (dist / (totalSeconds / 3600)).toFixed(2);
        return { pace: `${paceMin}:${paceSec.toString().padStart(2, '0')}`, unit, speedKmh };
    };

    const res = calc();
    const toolData = calculators.find(c => c.href === '/pace-calculator');
    const faqs = [
        { question: "How is pace calculated?", answer: "Pace = Total time (seconds) ÷ Distance. This gives seconds per unit, which is converted to minutes:seconds format." },
        { question: "What is a good running pace?", answer: "For beginners: 8-10 min/km. Intermediate: 5-7 min/km. Advanced runners: under 4 min/km. Elite athletes run under 3 min/km." },
    ];

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Pace Calculator'}
                description={toolData?.description || 'Calculate your running pace per km or mile from your time and distance.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 500 }}>Finish Time</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem' }}>Hours</label>
                                <input type="number" className="input" value={hours} onChange={e => setHours(e.target.value)} placeholder="0" min="0" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem' }}>Minutes</label>
                                <input type="number" className="input" value={minutes} onChange={e => setMinutes(e.target.value)} placeholder="30" min="0" max="59" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem' }}>Seconds</label>
                                <input type="number" className="input" value={seconds} onChange={e => setSeconds(e.target.value)} placeholder="0" min="0" max="59" />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Distance</label>
                            <input type="number" className="input" value={distance} onChange={e => setDistance(e.target.value)} placeholder="e.g. 5" />
                        </div>
                        <CustomSelect label="Unit" value={unit} onChange={setUnit} options={[{ value: 'km', label: 'Kilometers (km)' }, { value: 'mile', label: 'Miles (mi)' }]} />
                    </div>
                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
                            <ResultCard title={`Pace per ${res.unit}`} value={`${res.pace} /${res.unit}`} color="primary" highlight />
                            <ResultCard title="Speed" value={`${res.speedKmh} km/h`} color="secondary" />
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
