'use client';

import { useState } from 'react';
import { calculateExactAge, AgeResult } from '../../utils/dateCalculations';
import Button from '../../components/UI/Button';
import ResultCard from '../../components/UI/ResultCard';
import DateInput from '../../components/UI/DateInput';

export default function ExactAgeCalculator() {
    const [dob, setDob] = useState('');
    const [result, setResult] = useState<AgeResult | null>(null);

    const handleCalculate = () => {
        if (!dob) return;
        const age = calculateExactAge(new Date(dob));
        setResult(age);
    };

    return (
        <div>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <DateInput
                    label="Date of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />
                <Button onClick={handleCalculate} disabled={!dob} fullWidth>
                    Calculate Age
                </Button>
            </div>

            {result && (
                <div style={{ marginTop: '2rem' }}>
                    <ResultCard
                        title="Your Exact Age"
                        value={`${result.years} years, ${result.months} months, ${result.days} days`}
                        highlight
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <ResultCard
                            title="Total Days Lived"
                            value={result.totalDays.toLocaleString()}
                        />
                        <ResultCard
                            title="Next Birthday In"
                            value={`${result.daysToNextBirthday} days`}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
