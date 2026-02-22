'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import CustomSelect from '@/components/UI/CustomSelect';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function CalorieNeedsCalculator() {
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [activity, setActivity] = useState<string>('1.2');

    const calculateCalories = () => {
        const a = parseFloat(age);
        const w = parseFloat(weight);
        const h = parseFloat(height);
        const act = parseFloat(activity);

        if (isNaN(a) || isNaN(w) || isNaN(h)) return null;

        // Mifflin-St Jeor Equation
        let bmr = (10 * w) + (6.25 * h) - (5 * a);
        if (gender === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }

        const tdee = bmr * act;

        return {
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            weightLoss: Math.round(tdee - 500),
            weightGain: Math.round(tdee + 500)
        };
    };

    const res = calculateCalories();

    const faqs = [
        {
            question: "What is the BMR?",
            answer: "Basal Metabolic Rate (BMR) is the number of calories your body needs to maintain basic physiological functions (like breathing and heart rate) at rest."
        },
        {
            question: "How is the activity level used?",
            answer: "We multiply your BMR by an activity factor (TDEE formula) to estimate your total daily energy expenditure based on how much you move."
        },
        {
            question: "Is this accurate for athletes?",
            answer: "The Mifflin-St Jeor formula is widely considered accurate for most people, but body fat percentage can affect results. Highly muscular individuals might need more calories than estimated."
        }
    ];

    const calc = calculators.find(c => c.href === '/calorie-needs');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Calorie Needs Calculator'}
                description={calc?.description || 'Estimate how many calories you burn per day.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Gender</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    onClick={() => setGender('male')}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid var(--color-border)',
                                        backgroundColor: gender === 'male' ? 'var(--color-primary)' : 'var(--color-surface)',
                                        color: gender === 'male' ? 'white' : 'var(--color-text-primary)'
                                    }}
                                >Male</button>
                                <button
                                    onClick={() => setGender('female')}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: '1px solid var(--color-border)',
                                        backgroundColor: gender === 'female' ? 'var(--color-primary)' : 'var(--color-surface)',
                                        color: gender === 'female' ? 'white' : 'var(--color-text-primary)'
                                    }}
                                >Female</button>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Age</label>
                            <input type="number" className="input" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Years" style={{ width: '100%' }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Weight (kg)</label>
                            <input type="number" className="input" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Height (cm)</label>
                            <input type="number" className="input" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 175" style={{ width: '100%' }} />
                        </div>
                    </div>

                    <div>
                        <CustomSelect
                            label="Activity Level"
                            value={activity}
                            onChange={setActivity}
                            options={[
                                { value: "1.2", label: "Sedentary (No exercise)" },
                                { value: "1.375", label: "Lightly Active (1-3 days/week)" },
                                { value: "1.55", label: "Moderately Active (3-5 days/week)" },
                                { value: "1.725", label: "Very Active (6-7 days/week)" },
                                { value: "1.9", label: "Extra Active (Hard work/Sports)" }
                            ]}
                        />
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
                            <ResultCard
                                title="Maintenance (TDEE)"
                                value={`${res.tdee} kcal`}
                                subtitle="Calories to stay at current weight"
                                highlight
                            />
                            <ResultCard
                                title="Basal Metabolic Rate (BMR)"
                                value={`${res.bmr} kcal`}
                                subtitle="Calories burned at rest"
                                color="secondary"
                            />
                            <ResultCard
                                title="Weight Loss"
                                value={`${res.weightLoss} kcal`}
                                subtitle="-0.5kg/week goal"
                                color="success"
                            />
                            <ResultCard
                                title="Weight Gain"
                                value={`${res.weightGain} kcal`}
                                subtitle="+0.5kg/week goal"
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
