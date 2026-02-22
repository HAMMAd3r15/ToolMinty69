'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import CustomSelect from '@/components/UI/CustomSelect';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function MacroCalculator() {
    const [calories, setCalories] = useState<string>('');
    const [goal, setGoal] = useState<string>('maintain');

    const calculateMacros = () => {
        const cal = parseFloat(calories);
        if (isNaN(cal) || cal <= 0) return null;

        let splits;
        switch (goal) {
            case 'cut':
                splits = { protein: 0.40, carbs: 0.30, fat: 0.30 };
                break;
            case 'bulk':
                splits = { protein: 0.30, carbs: 0.50, fat: 0.20 };
                break;
            default: // maintain
                splits = { protein: 0.30, carbs: 0.40, fat: 0.30 };
        }

        const pGrams = (cal * splits.protein) / 4;
        const cGrams = (cal * splits.carbs) / 4;
        const fGrams = (cal * splits.fat) / 9;

        return {
            protein: Math.round(pGrams),
            carbs: Math.round(cGrams),
            fat: Math.round(fGrams)
        };
    };

    const res = calculateMacros();

    const faqs = [
        {
            question: "How are these macros calculated?",
            answer: "We use standard percentage splits based on your goal: Cut (40/30/30), Maintain (30/40/30), and Bulk (30/50/20). Calories are converted to grams using: 4 cals/g for protein and carbs, and 9 cals/g for fat."
        },
        {
            question: "Which goal should I choose?",
            answer: "Choose 'Cut' if you want to lose fat, 'Maintain' to stay at your current weight, and 'Bulk' to gain muscle mass."
        },
        {
            question: "Are these percentages fixed?",
            answer: "These are scientifically-backed starting points, but individual needs can vary. Use these as a solid foundation for your nutrition planning."
        }
    ];

    const calc = calculators.find(c => c.href === '/macro-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Macro Nutrient Calculator'}
                description={calc?.description || 'Calculate your ideal daily protein, carbs, and fat intake based on your calorie goal.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Daily Calorie Goal
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                                placeholder="e.g. 2000"
                            />
                        </div>
                        <CustomSelect
                            label="Your Goal"
                            value={goal}
                            onChange={setGoal}
                            options={[
                                { value: 'cut', label: 'Lose Fat (Cut)' },
                                { value: 'maintain', label: 'Maintain Weight' },
                                { value: 'bulk', label: 'Gain Muscle (Bulk)' }
                            ]}
                        />
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                            <ResultCard title="Protein" value={`${res.protein}g`} color="primary" />
                            <ResultCard title="Carbs" value={`${res.carbs}g`} color="secondary" />
                            <ResultCard title="Fats" value={`${res.fat}g`} color="accent" />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
