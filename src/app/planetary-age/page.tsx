'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import DateInput from '@/components/UI/DateInput';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function PlanetaryAgeCalculator() {
    const [dob, setDob] = useState<string>('');

    const calculatePlanetaryAges = () => {
        if (!dob) return null;
        const birth = new Date(dob);
        const now = new Date();
        if (isNaN(birth.getTime())) return null;

        const earthAgeDays = (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24);

        const planets = [
            { name: 'Mercury', icon: '☿️', orbit: 87.97, color: '#9ca3af' },
            { name: 'Venus', icon: '♀️', orbit: 224.7, color: '#fbbf24' },
            { name: 'Mars', icon: '♂️', orbit: 686.98, color: '#ef4444' },
            { name: 'Jupiter', icon: '♃', orbit: 4332.59, color: '#f97316' },
            { name: 'Saturn', icon: '♄', orbit: 10759.22, color: '#eab308' },
            { name: 'Uranus', icon: '⛢', orbit: 30688.5, color: '#22d3ee' },
            { name: 'Neptune', icon: '♆', orbit: 60182, color: '#3b82f6' }
        ];

        return planets.map(p => ({
            ...p,
            age: (earthAgeDays / p.orbit).toFixed(2)
        }));
    };

    const planetaryAges = calculatePlanetaryAges();

    const faqs = [
        {
            question: "Why is my age different on other planets?",
            answer: "A 'year' is defined as the time it takes for a planet to complete one full orbit around the Sun. Since outer planets are much further away, they take significantly longer to orbit."
        },
        {
            question: "Does this account for leap years?",
            answer: "Yes, our calculation is based on the precise orbital period in Earth days, which implicitly accounts for the average length of an Earth year (including leap cycles)."
        },
        {
            question: "What is a 'day' on other planets?",
            answer: "Planetary rotation ('days') also varies wildly. Venus takes 243 Earth days for one rotation, while Jupiter spins so fast a day is only 10 hours long!"
        }
    ];

    const calc = calculators.find(c => c.href === '/planetary-age');

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Age on Other Planets'}
                description={calc?.description || 'Ever wondered how old you\'d be if you lived on Mars or Jupiter? Enter your birthday to find out!'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <DateInput
                        label="Your Date of Birth"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />

                    {planetaryAges && (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1.25rem'
                        }}>
                            {planetaryAges.map(p => (
                                <ResultCard
                                    key={p.name}
                                    title={p.name}
                                    value={`${p.age} years`}
                                    subtitle={`Orbital Period: ${Math.round(p.orbit)} days`}
                                    color="secondary"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
