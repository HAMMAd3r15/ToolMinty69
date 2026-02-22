'use client';

import { useState, useEffect } from 'react';
import { calculateTimezoneDiff, majorCities, TimezoneDiff } from '../../utils/timezoneUtils';
import Button from '../../components/UI/Button';
import ResultCard from '../../components/UI/ResultCard';
import SearchableSelect from '../../components/UI/SearchableSelect';

export default function TimezoneCalculator() {
    const [city1Name, setCity1Name] = useState('London, UK');
    const [city2Name, setCity2Name] = useState('New York, USA');
    const [result, setResult] = useState<TimezoneDiff | null>(null);

    const handleCalculate = () => {
        const c1 = majorCities.find(c => c.name === city1Name);
        const c2 = majorCities.find(c => c.name === city2Name);
        if (!c1 || !c2) return;

        const diff = calculateTimezoneDiff(c1, c2);
        setResult(diff);
    };

    // Auto-calculate on initial load
    useEffect(() => {
        handleCalculate();
    }, []);

    return (
        <div>
            <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem', alignItems: 'end' }}>
                    <SearchableSelect
                        label="Base City"
                        items={majorCities}
                        value={city1Name}
                        onChange={setCity1Name}
                        placeholder="Search base city..."
                    />
                    <SearchableSelect
                        label="Target City"
                        items={majorCities}
                        value={city2Name}
                        onChange={setCity2Name}
                        placeholder="Search target city..."
                    />
                </div>

                <Button onClick={handleCalculate} fullWidth>
                    Calculate Difference
                </Button>
            </div>

            {result && (
                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <ResultCard
                        title="Time Difference"
                        value={result.diffHours}
                        highlight
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <ResultCard
                            title={`Time in ${result.city1Name}`}
                            value={result.time1}
                        />
                        <ResultCard
                            title={`Time in ${result.city2Name}`}
                            value={result.time2}
                        />
                    </div>
                    <ResultCard
                        title="Standard Overlap"
                        value={result.workingOverlap}
                        subtitle="Shared hours between 9 AM and 5 PM"
                    />
                </div>
            )}
        </div>
    );
}
