'use client';

import { useState } from 'react';
import { calculateRetirementInfo, RetirementInfo } from '../../utils/dateCalculations';
import Button from '../../components/UI/Button';
import ResultCard from '../../components/UI/ResultCard';
import DateInput from '../../components/UI/DateInput';

export default function RetirementCalculator() {
    const [dob, setDob] = useState('');
    const [retirementAge, setRetirementAge] = useState<number>(65);
    const [result, setResult] = useState<RetirementInfo | null>(null);

    const handleCalculate = () => {
        if (!dob || !retirementAge) return;
        const info = calculateRetirementInfo(new Date(dob), retirementAge);
        setResult(info);
    };

    return (
        <div>
            <div style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <DateInput
                    label="Date of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                        Desired Retirement Age
                    </label>
                    <input
                        type="number"
                        value={retirementAge}
                        onChange={(e) => setRetirementAge(parseInt(e.target.value) || 0)}
                        className="input"
                        placeholder="e.g. 65"
                    />
                </div>
                <Button onClick={handleCalculate} disabled={!dob || !retirementAge} fullWidth>
                    Calculate Retirement
                </Button>
            </div>

            {result && (
                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <ResultCard
                        title="Your Retirement Date"
                        value={result.retirementDate}
                        highlight
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <ResultCard
                            title="Time Remaining"
                            value={`${result.yearsToRetire}y, ${result.monthsToRetire}m, ${result.daysToRetire}d`}
                        />
                        <ResultCard
                            title="Total Working Years"
                            value={`${result.totalWorkingYears} years`}
                            subtitle="Approximate career span"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
