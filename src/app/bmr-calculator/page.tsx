'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import CustomSelect from '@/components/UI/CustomSelect';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function BMRCalculator() {
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState<string>('male');

    const calculateBMR = () => {
        const w = parseFloat(weight);
        const h = parseFloat(height);
        const a = parseInt(age);

        if (isNaN(w) || isNaN(h) || isNaN(a)) return null;

        // Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
            bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
        } else {
            bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
        }

        return Math.round(bmr);
    };

    const bmr = calculateBMR();

    const faqs = [
        {
            question: "What is BMR?",
            answer: "Basal Metabolic Rate (BMR) is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions, such as breathing and circulation, while at rest."
        },
        {
            question: "How accurate is this?",
            answer: "We use the Mifflin-St Jeor equation, which is currently considered the most accurate formula for predicting BMR in healthy adults."
        }
    ];

    const calc = calculators.find(c => c.href === '/bmr-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'BMR Calculator'}
                description={calc?.description || 'Calculate your Basal Metabolic Rate.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Weight (kg)</label>
                            <input type="number" className="input" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Height (cm)</label>
                            <input type="number" className="input" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 175" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Age</label>
                            <input type="number" className="input" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 25" />
                        </div>
                        <CustomSelect
                            label="Gender"
                            value={gender}
                            onChange={setGender}
                            options={[
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' }
                            ]}
                        />
                    </div>

                    {bmr && (
                        <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                            <ResultCard title="Daily Resting Calories" value={`${bmr} kcal`} color="primary" highlight />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
