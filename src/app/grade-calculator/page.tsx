'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function GradeCalculator() {
    const [earnedPoints, setEarnedPoints] = useState<string>('');
    const [totalPoints, setTotalPoints] = useState<string>('');

    const calculateGrade = () => {
        const earned = parseFloat(earnedPoints);
        const total = parseFloat(totalPoints);

        if (isNaN(earned) || isNaN(total) || total <= 0) return null;

        const percentage = (earned / total) * 100;

        let letterGrade = 'F';
        if (percentage >= 90) letterGrade = 'A';
        else if (percentage >= 80) letterGrade = 'B';
        else if (percentage >= 70) letterGrade = 'C';
        else if (percentage >= 60) letterGrade = 'D';

        return {
            percentage: percentage.toFixed(2),
            letterGrade
        };
    };

    const res = calculateGrade();

    const faqs = [
        {
            question: "How is the grade calculated?",
            answer: "The grade is calculated by dividing the earned points by the total possible points and multiplying by 100 to get a percentage."
        },
        {
            question: "What grading scale is used?",
            answer: "This calculator uses a standard 10-point scale: A (90-100%), B (80-89%), C (70-79%), D (60-69%), and F (below 60%)."
        },
        {
            question: "Can I use this for weighted grades?",
            answer: "This is a simple point-based calculator. For weighted grades, you would need to calculate each category separately based on its weight."
        }
    ];

    const calc = calculators.find(c => c.href === '/grade-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Grade Calculator'}
                description={calc?.description || 'Quickly calculate your final grade percentage and letter grade from your assignment or exam marks.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Earned Points
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={earnedPoints}
                                onChange={(e) => setEarnedPoints(e.target.value)}
                                placeholder="e.g. 85"
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Total Possible Points
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={totalPoints}
                                onChange={(e) => setTotalPoints(e.target.value)}
                                placeholder="e.g. 100"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    {res && (
                        <div style={{ marginTop: '1rem' }}>
                            <ResultCard
                                title={`Your Score: ${res.percentage}%`}
                                value={`Grade: ${res.letterGrade}`}
                                color={res.letterGrade === 'F' ? 'error' : (res.letterGrade === 'A' ? 'success' : 'secondary')}
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
