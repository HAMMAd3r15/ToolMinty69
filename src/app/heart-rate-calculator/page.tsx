'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function HeartRateCalculator() {
    const [age, setAge] = useState<string>('');

    const calculateZones = () => {
        const a = parseInt(age);
        if (isNaN(a) || a <= 0 || a > 120) return null;

        const maxHR = 220 - a;
        return {
            max: maxHR,
            fatBurn: { min: Math.round(maxHR * 0.50), max: Math.round(maxHR * 0.70) },
            cardio: { min: Math.round(maxHR * 0.70), max: Math.round(maxHR * 0.85) },
            peak: { min: Math.round(maxHR * 0.85), max: maxHR }
        };
    };

    const zones = calculateZones();

    const faqs = [
        {
            question: "What is Max HR?",
            answer: "Target Maximum Heart Rate (Max HR) is the highest number of times your heart can safely beat in one minute during exercise. A common formula is 220 minus your age."
        },
        {
            question: "What are heart rate zones?",
            answer: "Zones are ranges of heart intensity. Fat Burn (50-70%) is great for endurance, Cardio (70-85%) improves fitness, and Peak (85%+) is for maximum performance."
        }
    ];

    const calc = calculators.find(c => c.href === '/heart-rate-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Target Heart Rate Calculator'}
                description={calc?.description || 'Determine your optimal heart rate zones for different types of exercise and intensity.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ maxWidth: '300px', margin: '0 auto', width: '100%' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, textAlign: 'center' }}>
                            Your Age
                        </label>
                        <input
                            type="number"
                            className="input"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="e.g. 25"
                            style={{ textAlign: 'center' }}
                        />
                    </div>

                    {zones && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <ResultCard title="Max Heart Rate" value={`${zones.max} BPM`} color="primary" highlight />
                            <ResultCard title="Fat Burn (50-70%)" value={`${zones.fatBurn.min}-${zones.fatBurn.max} BPM`} color="secondary" />
                            <ResultCard title="Cardio (70-85%)" value={`${zones.cardio.min}-${zones.cardio.max} BPM`} color="accent" />
                            <ResultCard title="Peak (85%+)" value={`${zones.peak.min}-${zones.peak.max} BPM`} color="success" />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
