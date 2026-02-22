'use client';

import { useState } from 'react';
import Button from '../../components/UI/Button';
import ResultCard from '../../components/UI/ResultCard';
import DateInput from '../../components/UI/DateInput';

interface DaysUntilResult {
    days: number;
    isFuture: boolean;
    isToday: boolean;
}

export default function DaysUntilCalculator() {
    const [targetDate, setTargetDate] = useState('');
    const [result, setResult] = useState<DaysUntilResult | null>(null);

    const handleCalculate = () => {
        if (!targetDate) return;
        const target = new Date(targetDate);
        const now = new Date();
        // Reset time to midnight for accurate day calculation
        now.setHours(0, 0, 0, 0);
        target.setHours(0, 0, 0, 0);

        const diffTime = target.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setResult({
            days: Math.abs(diffDays),
            isFuture: diffDays >= 0,
            isToday: diffDays === 0
        });
    };

    return (
        <div>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <DateInput
                    label="Target Date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                />
                <Button onClick={handleCalculate} disabled={!targetDate} fullWidth>
                    Calculate Days
                </Button>
            </div>

            {result && (
                <div style={{ marginTop: '2rem' }}>
                    {result.isToday ? (
                        <ResultCard
                            title="Result"
                            value="It is Today!"
                            highlight
                        />
                    ) : (
                        <ResultCard
                            title={result.isFuture ? "Days Remaining" : "Days Since"}
                            value={`${result.days} days`}
                            subtitle={result.isFuture ? "Until the date" : "Since the date"}
                            highlight
                        />
                    )}
                </div>
            )}
        </div>
    );
}
