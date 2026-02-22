'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function SleepCalculator() {
    const [time, setTime] = useState<string>('');

    const calculateSleep = () => {
        if (!time) return null;

        const [hours, minutes] = time.split(':').map(Number);
        const wakeTime = new Date();
        wakeTime.setHours(hours, minutes, 0);

        const cycles = [6, 5, 4, 3]; // Cycles of 90 mins
        return cycles.map(c => {
            const bedTime = new Date(wakeTime.getTime() - (c * 90 + 15) * 60000); // 90 min cycles + 15 mins to fall asleep
            return bedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        });
    }

    const suggestTimes = calculateSleep();

    const faqs = [
        {
            question: "How do sleep cycles work?",
            answer: "The average human sleep cycle is about 90 minutes. Waking up at the end of a cycle, rather than in the middle of one, helps you feel more refreshed."
        },
        {
            question: "What is the 14-15 minute rule?",
            answer: "Most people take about 14-15 minutes to fall asleep once they hit the pillow. Our calculator includes this buffer in its suggestions."
        }
    ];

    const calc = calculators.find(c => c.href === '/sleep-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Ideal Sleep Calculator'}
                description={calc?.description || 'Find the perfect time to go to bed based on when you need to wake up, utilizing natural sleep cycles.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ maxWidth: '300px', margin: '0 auto', width: '100%' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, textAlign: 'center' }}>
                            I want to wake up at
                        </label>
                        <input
                            type="time"
                            className="input"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            style={{ textAlign: 'center' }}
                        />
                    </div>

                    {suggestTimes && (
                        <div>
                            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#fff' }}>Recommended Bedtimes:</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                                <ResultCard title="9 Hours (Best)" value={suggestTimes[0]} color="primary" highlight />
                                <ResultCard title="7.5 Hours (Good)" value={suggestTimes[1]} color="secondary" />
                                <ResultCard title="6 Hours (Fair)" value={suggestTimes[2]} color="accent" />
                                <ResultCard title="4.5 Hours" value={suggestTimes[3]} color="success" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
