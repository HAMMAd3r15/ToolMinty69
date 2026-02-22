'use client';

import { useState, useEffect } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';
import Button from '@/components/UI/Button';

interface Measurement {
    id: string;
    date: string;
    weight: number;
    waist: number;
    chest: number;
    arms: number;
}

export default function BodyMeasurementTracker() {
    const [weight, setWeight] = useState<number>(0);
    const [waist, setWaist] = useState<number>(0);
    const [chest, setChest] = useState<number>(0);
    const [arms, setArms] = useState<number>(0);
    const [logs, setLogs] = useState<Measurement[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('calchub_body_measurements');
        if (saved) setLogs(JSON.parse(saved));
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('calchub_body_measurements', JSON.stringify(logs));
        }
    }, [logs, mounted]);

    const addLog = () => {
        const newLog: Measurement = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString(),
            weight,
            waist,
            chest,
            arms
        };
        setLogs([newLog, ...logs]);
        setWeight(0);
        setWaist(0);
        setChest(0);
        setArms(0);
    };

    const deleteLog = (id: string) => {
        setLogs(logs.filter(l => l.id !== id));
    };

    const faqs = [
        {
            question: "Why track measurements instead of just weight?",
            answer: "Weight doesn't distinguish between muscle and fat. Measurements (like waist circumference) are often a better indicator of body composition changes."
        },
        {
            question: "How often should I take measurements?",
            answer: "Once every 2-4 weeks is ideal. Daily tracking isn't recommended as natural fluctuations can be misleading and discouraging."
        },
        {
            question: "Where is the best place to measure waist?",
            answer: "The most consistent measurement is usually taken at the narrowest part of your torso, typically just above the belly button."
        }
    ];

    if (!mounted) return null;

    const calc = calculators.find(c => c.href === '/body-measurements');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Body Measurement Tracker'}
                description={calc?.description || 'Track your fitness progress accurately.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Weight (kg)</label>
                            <input type="number" className="input" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Waist (cm)</label>
                            <input type="number" className="input" value={waist} onChange={(e) => setWaist(parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Chest (cm)</label>
                            <input type="number" className="input" value={chest} onChange={(e) => setChest(parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Arms (cm)</label>
                            <input type="number" className="input" value={arms} onChange={(e) => setArms(parseFloat(e.target.value) || 0)} style={{ width: '100%' }} />
                        </div>
                    </div>

                    <Button onClick={addLog} fullWidth style={{ borderRadius: '2rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                        Log Measurements
                    </Button>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                    <th style={{ padding: '1rem', color: 'var(--color-primary)' }}>Date</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-primary)' }}>Weight</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-primary)' }}>Waist</th>
                                    <th style={{ padding: '1rem', color: 'var(--color-primary)' }}>Chest/Arms</th>
                                    <th style={{ padding: '1rem' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-tertiary)' }}>No logs yet.</td>
                                    </tr>
                                ) : logs.map(log => (
                                    <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <td style={{ padding: '1rem' }}>{log.date}</td>
                                        <td style={{ padding: '1rem', fontWeight: 600, color: '#fff' }}>{log.weight}kg</td>
                                        <td style={{ padding: '1rem' }}>{log.waist}cm</td>
                                        <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.6)' }}>{log.chest} / {log.arms}cm</td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button onClick={() => deleteLog(log.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>×</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
