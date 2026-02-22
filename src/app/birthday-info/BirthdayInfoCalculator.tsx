'use client';

import { useState } from 'react';
import { getBirthdayInfo, BirthdayInfo } from '../../utils/dateCalculations';
import Button from '../../components/UI/Button';
import ResultCard from '../../components/UI/ResultCard';
import DateInput from '../../components/UI/DateInput';

export default function BirthdayInfoCalculator() {
    const [dob, setDob] = useState('');
    const [result, setResult] = useState<BirthdayInfo | null>(null);

    const handleCalculate = () => {
        if (!dob) return;
        const info = getBirthdayInfo(new Date(dob));
        setResult(info);
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
                    Get Birthday Info
                </Button>
            </div>

            {result && (
                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <ResultCard
                        title="Day You Were Born"
                        value={result.dayBorn}
                        highlight
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <ResultCard
                            title="Next Birthday In"
                            value={`${result.daysToNextBirthday} days`}
                        />
                        <ResultCard
                            title="Zodiac Sign"
                            value={result.zodiac || 'Unknown'}
                        />
                    </div>
                    <ResultCard
                        title="Fun Fact"
                        value="Did you know?"
                        subtitle={result.funFact}
                    />
                </div>
            )}
        </div>
    );
}
