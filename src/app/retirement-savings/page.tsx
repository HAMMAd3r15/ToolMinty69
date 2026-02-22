'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function RetirementSavingsCalculator() {
    const [annualIncome, setAnnualIncome] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [retirementAge, setRetirementAge] = useState<string>('65');

    const calculateGoal = () => {
        const income = parseFloat(annualIncome);
        if (isNaN(income) || income <= 0) return null;

        // 4% Rule Approximation: Multiply desired annual income by 25
        const goal = income * 25;

        return {
            goal: goal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
            monthlySavingsNeeded: (goal / Math.max(1, (parseFloat(retirementAge) - parseFloat(age || '0')) * 12)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
        };
    };

    const res = calculateGoal();

    const faqs = [
        {
            question: "What is the 25x Rule?",
            answer: "The 25x rule is a rule of thumb that suggests you need to save 25 times your desired annual retirement income to safely withdraw 4% each year without running out of money (the 4% rule)."
        },
        {
            question: "Does this account for inflation?",
            answer: "This is a simplified model. In reality, you should adjust your desired income for inflation and consider investment returns pre- and post-retirement."
        },
        {
            question: "How can I reach my goal faster?",
            answer: "Increasing your savings rate, lowering your retirement expenses, or achieving higher investment returns can all help you reach your retirement goal sooner."
        }
    ];

    const calc = calculators.find(c => c.href === '/retirement-savings');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Retirement Savings Goal'}
                description={calc?.description || 'Determine how much you need to save to enjoy a comfortable retirement based on your desired lifestyle.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Desired Annual Income in Retirement
                            </label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }}>$</span>
                                <input
                                    type="number"
                                    className="input"
                                    value={annualIncome}
                                    onChange={(e) => setAnnualIncome(e.target.value)}
                                    placeholder="e.g. 50,000"
                                    style={{ width: '100%', paddingLeft: '2rem' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Current Age (Optional)
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="e.g. 30"
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Planned Retirement Age
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={retirementAge}
                                onChange={(e) => setRetirementAge(e.target.value)}
                                placeholder="e.g. 65"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    {res && (
                        <div style={{ marginTop: '1rem' }}>
                            <ResultCard
                                title="Your Retirement Goal"
                                value={`$${res.goal}`}
                                subtitle={age ? `Approx. $${res.monthlySavingsNeeded}/month needed (no interest)` : "Total savings required for 4% safe withdrawal rate."}
                                color="secondary"
                                highlight={true}
                            />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
