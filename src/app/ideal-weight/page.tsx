'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function IdealWeightCalculator() {
    const [height, setHeight] = useState<string>('');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

    const calculateIdealWeight = () => {
        const h = parseFloat(height);
        if (isNaN(h) || h <= 0) return null;

        let heightInInches = 0;
        if (unit === 'metric') {
            heightInInches = h / 2.54;
        } else {
            heightInInches = h;
        }

        const inchesOver5Feet = Math.max(0, heightInInches - 60);

        // Devine Formula
        let idealWeightKg = 0;
        if (gender === 'male') {
            idealWeightKg = 50 + 2.3 * inchesOver5Feet;
        } else {
            idealWeightKg = 45.5 + 2.3 * inchesOver5Feet;
        }

        const weightInLbs = idealWeightKg * 2.20462;

        return {
            kg: idealWeightKg.toFixed(1),
            lbs: weightInLbs.toFixed(1)
        };
    };

    const res = calculateIdealWeight();

    const faqs = [
        {
            question: "What is the Devine Formula?",
            answer: "The Devine formula is a widely used method to estimate ideal body weight, primarily used for medication dosing and clinical purposes. It was developed in 1974 by Dr. B.J. Devine."
        },
        {
            question: "Is this weight right for everyone?",
            answer: "No. Ideal weight is a statistical estimate. It doesn't account for muscle mass, bone density, or individual body types."
        },
        {
            question: "Should I use Metric or Imperial?",
            answer: "You can use whichever you are more comfortable with. Metric uses centimeters, while Imperial uses inches."
        }
    ];

    const calc = calculators.find(c => c.href === '/ideal-weight');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Ideal Weight Calculator'}
                description={calc?.description || 'Estimate your healthy weight range based on your height and gender using the clinical Devine formula.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => setGender('male')}
                            style={{
                                padding: '0.6rem 1.25rem',
                                borderRadius: '2rem',
                                border: '1px solid var(--color-border)',
                                backgroundColor: gender === 'male' ? 'var(--color-primary)' : 'var(--color-surface)',
                                color: gender === 'male' ? 'var(--color-on-primary)' : 'var(--color-text-primary)',
                                cursor: 'pointer',
                                fontWeight: 500,
                                transition: 'all 0.2s ease',
                                fontSize: '0.9rem'
                            }}
                        >
                            Male
                        </button>
                        <button
                            onClick={() => setGender('female')}
                            style={{
                                padding: '0.6rem 1.25rem',
                                borderRadius: '2rem',
                                border: '1px solid var(--color-border)',
                                backgroundColor: gender === 'female' ? 'var(--color-primary)' : 'var(--color-surface)',
                                color: gender === 'female' ? 'var(--color-on-primary)' : 'var(--color-text-primary)',
                                cursor: 'pointer',
                                fontWeight: 500,
                                transition: 'all 0.2s ease',
                                fontSize: '0.9rem'
                            }}
                        >
                            Female
                        </button>
                    </div>

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
                            Metric (cm)
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
                            Imperial (in)
                        </button>
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

                    {res && (
                        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <ResultCard
                                title="Ideal Weight (Metric)"
                                value={`${res.kg} kg`}
                                color="secondary"
                            />
                            <ResultCard
                                title="Ideal Weight (Imperial)"
                                value={`${res.lbs} lbs`}
                                color="accent"
                            />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
