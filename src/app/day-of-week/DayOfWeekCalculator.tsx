'use client';

import { useState } from 'react';
import { getDayOfWeek } from '../../utils/dateCalculations';
import Button from '../../components/UI/Button';
import ResultCard from '../../components/UI/ResultCard';
import DateInput from '../../components/UI/DateInput';

export default function DayOfWeekCalculator() {
    const [date, setDate] = useState('');
    const [result, setResult] = useState<string>('');

    const handleCalculate = () => {
        if (!date) return;
        const day = getDayOfWeek(new Date(date));
        setResult(day);
    };

    return (
        <div>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <DateInput
                    label="Select Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <Button onClick={handleCalculate} disabled={!date} fullWidth>
                    Find Day of Week
                </Button>
            </div>

            {result && (
                <div style={{ marginTop: '2rem' }}>
                    <ResultCard
                        title="Day of the Week"
                        value={result}
                        highlight
                    />
                </div>
            )}
        </div>
    );
}
