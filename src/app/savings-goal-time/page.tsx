'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function SavingsGoalTimeCalculator() {
    const [targetAmount, setTargetAmount] = useState<string>('');
    const [currentSavings, setCurrentSavings] = useState<string>('0');
    const [monthlyContribution, setMonthlyContribution] = useState<string>('');

    const calculateTime = () => {
        const target = parseFloat(targetAmount);
        const current = parseFloat(currentSavings) || 0;
        const monthly = parseFloat(monthlyContribution);

        if (isNaN(target) || isNaN(monthly) || monthly <= 0 || target <= current) return null;

        const remainingGoal = target - current;
        const monthsRequired = Math.ceil(remainingGoal / monthly);
        const years = Math.floor(monthsRequired / 12);
        const months = monthsRequired % 12;

        let timeString = '';
        if (years > 0) {
            timeString = `${years} year${years > 1 ? 's' : ''} and ${months} month${months !== 1 ? 's' : ''}`;
        } else {
            timeString = `${months} month${months !== 1 ? 's' : ''}`;
        }

        return {
            monthsRequired,
            timeString,
            remainingGoal: remainingGoal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
    };

    const res = calculateTime();

    const faqs = [
        {
            question: "Does this include interest?",
            answer: "This is a basic calculator that doesn't account for compound interest. For long-term goals, interest can significantly shorten the time required."
        },
        {
            question: "How can I reach my goal faster?",
            answer: "The two most effective ways are to increase your monthly contribution or find ways to earn interest/returns on your savings."
        },
        {
            question: "Why use this instead of a complex planner?",
            answer: "This tool provides a quick, 'back of the napkin' estimate to help you understand if your current saving pace is realistic for your goals."
        }
    ];

    const calc = calculators.find(c => c.href === '/savings-goal-time');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Savings Goal Time'}
                description={calc?.description || 'Find out exactly how long it will take to reach your financial milestones based on your monthly savings pace.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Target Savings Goal
                            </label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }}>$</span>
                                <input
                                    type="number"
                                    className="input"
                                    value={targetAmount}
                                    onChange={(e) => setTargetAmount(e.target.value)}
                                    placeholder="e.g. 10,000"
                                    style={{ width: '100%', paddingLeft: '2rem' }}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Current Savings
                            </label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }}>$</span>
                                <input
                                    type="number"
                                    className="input"
                                    value={currentSavings}
                                    onChange={(e) => setCurrentSavings(e.target.value)}
                                    placeholder="e.g. 1,000"
                                    style={{ width: '100%', paddingLeft: '2rem' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                            Monthly Contribution
                        </label>
                        <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }}>$</span>
                            <input
                                type="number"
                                className="input"
                                value={monthlyContribution}
                                onChange={(e) => setMonthlyContribution(e.target.value)}
                                placeholder="e.g. 500"
                                style={{ width: '100%', paddingLeft: '2rem' }}
                            />
                        </div>
                    </div>

                    {res && (
                        <div style={{ marginTop: '1rem' }}>
                            <ResultCard
                                title="Time to Reach Goal"
                                value={res.timeString}
                                subtitle={`Remaining to save: $${res.remainingGoal}`}
                                color="primary"
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
