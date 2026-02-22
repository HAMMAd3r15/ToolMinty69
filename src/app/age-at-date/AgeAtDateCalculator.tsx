'use client';

import { useState } from 'react';
import { calculateExactAge, AgeResult } from '../../utils/dateCalculations';
import Button from '../../components/UI/Button';
import ResultCard from '../../components/UI/ResultCard';
import DateInput from '../../components/UI/DateInput';

export default function AgeAtDateCalculator() {
    const [dob, setDob] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [result, setResult] = useState<AgeResult | null>(null);

    const handleCalculate = () => {
        if (!dob || !targetDate) return;
        const age = calculateExactAge(new Date(dob), new Date(targetDate));
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
                <DateInput
                    label="Target Date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                />
                <Button onClick={handleCalculate} disabled={!dob || !targetDate} fullWidth>
                    Calculate Age
                </Button>
            </div>

            {result && (
                <div style={{ marginTop: '2rem' }}>
                    <ResultCard
                        title="Age on Date"
                        value={`${result.years} years, ${result.months} months, ${result.days} days`}
                        highlight
                    />
                    <ResultCard
                        title="Total Days Difference"
                        value={result.totalDays.toLocaleString()}
                    />
                </div>
            )}
        </div>
    );
}
