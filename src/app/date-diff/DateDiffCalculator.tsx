'use client';

import { useState } from 'react';
import { calculateDateDifference, AgeResult } from '../../utils/dateCalculations';
import Button from '../../components/UI/Button';
import ResultCard from '../../components/UI/ResultCard';
import DateInput from '../../components/UI/DateInput';

export default function DateDiffCalculator() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [result, setResult] = useState<AgeResult | null>(null);

    const handleCalculate = () => {
        if (!startDate || !endDate) return;
        const diff = calculateDateDifference(new Date(startDate), new Date(endDate));
        setResult(diff);
    };

    return (
        <div>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <DateInput
                    label="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <DateInput
                    label="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <Button onClick={handleCalculate} disabled={!startDate || !endDate} fullWidth>
                    Calculate Difference
                </Button>
            </div>

            {result && (
                <div style={{ marginTop: '2rem' }}>
                    <ResultCard
                        title="Time Difference"
                        value={`${result.years} years, ${result.months} months, ${result.days} days`}
                        highlight
                    />
                    <ResultCard
                        title="Total Days"
                        value={result.totalDays.toLocaleString()}
                    />
                </div>
            )}
        </div>
    );
}
