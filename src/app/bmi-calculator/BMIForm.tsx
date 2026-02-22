'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function BMIForm() {
    const calc = calculators.find(c => c.href === '/bmi-calculator');
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

    const calculateBMI = () => {
        const w = parseFloat(weight);
        const h = parseFloat(height);

        if (isNaN(w) || isNaN(h) || h <= 0 || w <= 0) return null;

        let bmi = 0;
        if (unit === 'metric') {
            const heightInMeters = h / 100;
            bmi = w / (heightInMeters * heightInMeters);
        } else {
            bmi = (w / (h * h)) * 703;
        }

        let category = '';
        let color: 'primary' | 'secondary' | 'accent' = 'primary';

        if (bmi < 18.5) {
            category = 'Underweight';
            color = 'accent';
        } else if (bmi < 25) {
            category = 'Normal weight';
            color = 'secondary';
        } else if (bmi < 30) {
            category = 'Overweight';
            color = 'primary';
        } else {
            category = 'Obese';
            color = 'primary';
        }

        return {
            value: bmi.toFixed(1),
            category,
            color
        };
    };

    const res = calculateBMI();

    const faqs = [
        {
            question: "What is BMI?",
            answer: "Body Mass Index (BMI) is a measurement of a person's leanness or corpulence based on their height and weight, and is intended to quantify tissue mass. It is widely used as a general indicator of whether a person has a healthy body weight for their height."
        },
        {
            question: "Is BMI accurate for everyone?",
            answer: "BMI is a general tool and doesn't account for muscle mass, bone density, or overall body composition. Athletes and individuals with high muscle mass may have a high BMI despite having low body fat."
        },
        {
            question: "What are the BMI categories?",
            answer: "Underweight: < 18.5, Normal weight: 18.5–24.9, Overweight: 25–29.9, Obese: 30 or greater."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'BMI Calculator'}
                description={calc?.description || 'Calculate your Body Mass Index.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={() => setUnit('metric')}
                            style={{
                                padding: '0.6rem 1.25rem',
                                borderRadius: '2rem',
                                border: '1px solid var(--color-border)',
                                backgroundColor: unit === 'metric' ? 'var(--color-primary)' : 'var(--color-surface)',
                                color: unit === 'metric' ? 'var(--color-on-primary)' : 'var(--color-text-primary)',
                                cursor: 'pointer',
                                fontWeight: 500,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Metric (kg/cm)
                        </button>
                        <button
                            onClick={() => setUnit('imperial')}
                            style={{
                                padding: '0.6rem 1.25rem',
                                borderRadius: '2rem',
                                border: '1px solid var(--color-border)',
                                backgroundColor: unit === 'imperial' ? 'var(--color-primary)' : 'var(--color-surface)',
                                color: unit === 'imperial' ? 'var(--color-on-primary)' : 'var(--color-text-primary)',
                                cursor: 'pointer',
                                fontWeight: 500,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Imperial (lb/in)
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder={`e.g. ${unit === 'metric' ? '70' : '154'}`}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Height ({unit === 'metric' ? 'cm' : 'inches'})
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder={`e.g. ${unit === 'metric' ? '175' : '69'}`}
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    {res && (
                        <div style={{ marginTop: '1rem' }}>
                            <ResultCard
                                title={`Your BMI is ${res.value}`}
                                value={res.category}
                                color={res.color}
                            />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
