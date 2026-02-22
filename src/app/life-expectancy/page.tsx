'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import CustomSelect from '@/components/UI/CustomSelect';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function LifeExpectancyCalculator() {
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [smoker, setSmoker] = useState<boolean>(false);
    const [exercise, setExercise] = useState<'none' | 'moderate' | 'high'>('moderate');

    const calculateLifespan = () => {
        const currentAge = parseFloat(age);
        if (isNaN(currentAge) || currentAge <= 0) return null;

        // Simple Model
        let baseLifespan = gender === 'male' ? 76.1 : 81.1;

        if (smoker) baseLifespan -= 10;
        if (exercise === 'moderate') baseLifespan += 3;
        if (exercise === 'high') baseLifespan += 5;

        // Can't expect to live less than current age + 5 (optimistic floor)
        const expectedAge = Math.max(currentAge + 5, baseLifespan);
        const yearsRemaining = expectedAge - currentAge;

        return {
            expectedAge: expectedAge.toFixed(1),
            yearsRemaining: yearsRemaining.toFixed(1)
        };
    };

    const res = calculateLifespan();

    const faqs = [
        {
            question: "How accurate is this estimation?",
            answer: "This is a highly simplified model based on general statistical averages. Individual lifespan is influenced by genetics, diet, medicine, and environment."
        },
        {
            question: "What assumptions are made?",
            answer: "We use base life expectancy statistics from common developed nations and apply standard adjustments for well-known lifestyle factors like smoking and exercise."
        },
        {
            question: "How can I improve my life expectancy?",
            answer: "Healthy habits such as regular exercise, a balanced diet, avoiding smoking, and getting regular medical checkups are proven ways to increase longevity."
        }
    ];

    const calc = calculators.find(c => c.href === '/life-expectancy');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Life Expectancy Estimator'}
                description={calc?.description || 'Gain insights into your potential lifespan based on simplified lifestyle factors and habits.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Current Age
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="e.g. 25"
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Gender
                            </label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => setGender('male')}
                                    style={{
                                        flex: 1,
                                        padding: '0.6rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        backgroundColor: gender === 'male' ? 'var(--color-primary)' : 'var(--color-surface)',
                                        color: gender === 'male' ? 'var(--color-on-primary)' : 'var(--color-text-primary)',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Male
                                </button>
                                <button
                                    onClick={() => setGender('female')}
                                    style={{
                                        flex: 1,
                                        padding: '0.6rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        backgroundColor: gender === 'female' ? 'var(--color-primary)' : 'var(--color-surface)',
                                        color: gender === 'female' ? 'var(--color-on-primary)' : 'var(--color-text-primary)',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Female
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Are you a smoker?
                            </label>
                            <button
                                onClick={() => setSmoker(!smoker)}
                                style={{
                                    width: '100%',
                                    padding: '0.6rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: smoker ? 'var(--color-primary)' : 'var(--color-surface)',
                                    color: smoker ? 'var(--color-on-primary)' : 'var(--color-text-primary)',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {smoker ? 'Yes' : 'No'}
                            </button>
                        </div>
                        <div>
                            <CustomSelect
                                label="Exercise Frequency"
                                value={exercise}
                                onChange={(val) => setExercise(val as any)}
                                options={[
                                    { value: "none", label: "Sedentary (None)" },
                                    { value: "moderate", label: "Moderate (1-3 days/week)" },
                                    { value: "high", label: "High (4+ days/week)" }
                                ]}
                            />
                        </div>
                    </div>

                    {res && (
                        <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <ResultCard
                                title="Estimated Lifespan"
                                value={`${res.expectedAge} Years`}
                                color="secondary"
                                highlight={true}
                            />
                            <ResultCard
                                title="Years Remaining"
                                value={`${res.yearsRemaining} Years`}
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
