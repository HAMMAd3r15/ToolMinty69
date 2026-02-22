'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function DogAgeCalculator() {
    const [dogAge, setDogAge] = useState<string>('');

    const calculateHumanAge = () => {
        const age = parseFloat(dogAge);
        if (isNaN(age) || age < 0) return null;

        let humanAge = 0;
        if (age <= 2) {
            humanAge = age * 10.5;
        } else {
            humanAge = 21 + (age - 2) * 4;
        }

        return humanAge.toFixed(1);
    };

    const res = calculateHumanAge();

    const faqs = [
        {
            question: "Is 1 dog year equal to 7 human years?",
            answer: "The '7-year rule' is a common myth. In reality, dogs age much faster in their first two years. Our calculator uses a more accurate formula where the first two years equal 10.5 human years each."
        },
        {
            question: "Does breed size matter?",
            answer: "Yes, breed size significantly impacts aging. Large breeds tend to have shorter lifespans and age faster in later years compared to smaller breeds. This calculator provides a general average."
        },
        {
            question: "When is a dog considered a senior?",
            answer: "Most dogs are considered seniors around age 7, though for giant breeds it can be as early as 5, and for toy breeds as late as 10."
        }
    ];

    const calc = calculators.find(c => c.href === '/dog-age-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Dog Age Calculator'}
                description={calc?.description || 'Quickly convert your dog\'s age into human years.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 600 }}>
                            How old is your dog (years)?
                        </label>
                        <input
                            type="number"
                            className="input"
                            value={dogAge}
                            onChange={(e) => setDogAge(e.target.value)}
                            placeholder="e.g. 5"
                            style={{ width: '100%', maxWidth: '300px', margin: '0 auto', textAlign: 'center', fontSize: '1.25rem', padding: '1rem' }}
                            min="0"
                            step="0.1"
                        />
                    </div>

                    {res && (
                        <div style={{ marginTop: '1rem' }}>
                            <ResultCard
                                title="Equivalent Human Age"
                                value={`${res} years old`}
                                subtitle="Based on accurate canine maturation rates"
                                highlight
                                color="primary"
                            />
                        </div>
                    )}

                    <div style={{
                        backgroundColor: 'rgba(37, 99, 235, 0.05)',
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(37, 99, 235, 0.1)',
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)'
                    }}>
                        <strong>💡 Fun Fact:</strong> The oldest dog ever recorded was Bluey, an Australian Cattle Dog who lived to be 29 years and 5 months old!
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
