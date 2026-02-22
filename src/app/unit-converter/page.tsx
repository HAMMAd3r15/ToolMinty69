'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ResultCard from '@/components/UI/ResultCard';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

const UNITS = {
    Length: {
        Meters: 1,
        Kilometers: 0.001,
        Centimeters: 100,
        Inches: 39.3701,
        Feet: 3.28084,
        Miles: 0.000621371
    },
    Weight: {
        Kilograms: 1,
        Grams: 1000,
        Pounds: 2.20462,
        Ounces: 35.274,
        MetricTons: 0.001
    },
    Temperature: {
        Celsius: 'C',
        Fahrenheit: 'F',
        Kelvin: 'K'
    }
};

interface CustomDropdownProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

function CustomDropdown({ options, value, onChange }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ position: 'relative', width: '100%', userSelect: 'none' }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: `1px solid ${isOpen ? 'rgba(99, 102, 241, 0.7)' : 'rgba(255, 255, 255, 0.1)'}`,
                    padding: '0.85rem 1.25rem',
                    borderRadius: '0.85rem',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isOpen ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                }}
            >
                <span>{value}</span>
                <span style={{
                    width: '10px',
                    height: '10px',
                    borderRight: '2px solid rgba(255,255,255,0.5)',
                    borderBottom: '2px solid rgba(255,255,255,0.5)',
                    transform: isOpen ? 'rotate(-135deg)' : 'rotate(45deg)',
                    transition: 'transform 0.3s ease',
                    marginTop: isOpen ? '4px' : '-4px',
                    display: 'inline-block',
                }} />
            </div>

            {isOpen && (
                <>
                    <div
                        onClick={() => setIsOpen(false)}
                        style={{ position: 'fixed', inset: 0, zIndex: 10 }}
                    />
                    <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 0.5rem)',
                        left: 0,
                        right: 0,
                        background: 'rgba(10, 18, 36, 0.97)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '1rem',
                        padding: '0.5rem',
                        zIndex: 100,
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
                        animation: 'ddSlide 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}>
                        {options.map(opt => (
                            <div
                                key={opt}
                                onClick={() => { onChange(opt); setIsOpen(false); }}
                                style={{
                                    padding: '0.75rem 1.25rem',
                                    borderRadius: '0.65rem',
                                    color: value === opt ? '#fff' : 'rgba(255,255,255,0.7)',
                                    background: value === opt ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                                    cursor: 'pointer',
                                    fontWeight: value === opt ? 700 : 400,
                                    fontSize: '0.95rem',
                                    transition: 'all 0.15s ease',
                                    borderLeft: value === opt ? '3px solid rgba(99,102,241,0.8)' : '3px solid transparent',
                                }}
                                onMouseEnter={e => {
                                    if (value !== opt) {
                                        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.06)';
                                        (e.currentTarget as HTMLDivElement).style.color = '#fff';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (value !== opt) {
                                        (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                                        (e.currentTarget as HTMLDivElement).style.color = 'rgba(255,255,255,0.7)';
                                    }
                                }}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                </>
            )}

            <style jsx>{`
                @keyframes ddSlide {
                    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}

export default function UnitConverter() {
    const [category, setCategory] = useState<keyof typeof UNITS>('Length');
    const [value, setValue] = useState<number>(1);
    const [fromUnit, setFromUnit] = useState('Meters');
    const [toUnit, setToUnit] = useState('Kilometers');

    const convert = () => {
        if (isNaN(value)) return 0;
        
        if (category === 'Temperature') {
            let celsius = value;
            if (fromUnit === 'Fahrenheit') celsius = (value - 32) * 5 / 9;
            if (fromUnit === 'Kelvin') celsius = value - 273.15;

            if (toUnit === 'Celsius') return celsius;
            if (toUnit === 'Fahrenheit') return (celsius * 9 / 5) + 32;
            if (toUnit === 'Kelvin') return celsius + 273.15;
            return celsius;
        }

        const rates = UNITS[category] as any;
        const valInBase = value / rates[fromUnit];
        return valInBase * rates[toUnit];
    };

    const result = convert();
    const unitOptions = Object.keys(UNITS[category]);

    const faqs = [
        {
            question: "How accurate is this converter?",
            answer: "We use standard conversion factors for high accuracy. However, for extremely scientific or medical calculations, always cross-reference with primary sources."
        },
        {
            question: "Why use the metric system?",
            answer: "The Metric system (SI) is used by almost every country in the world for its simplicity, as it's based on powers of 10."
        },
        {
            question: "Can I convert currencies here?",
            answer: "Currency conversion requires real-time data which changes every second. This tool focuses on fixed physical units like length and mass."
        }
    ];

    const calc = calculators.find(c => c.href === '/unit-converter');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Universal Unit Converter'}
                description={calc?.description || 'Instant and accurate conversions for length, weight, and temperature.'}
            />

            <div className="card" style={{ marginBottom: '3rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Category</label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {Object.keys(UNITS).map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setCategory(cat as any);
                                        const first = Object.keys(UNITS[cat as keyof typeof UNITS])[0];
                                        const second = Object.keys(UNITS[cat as keyof typeof UNITS])[1];
                                        setFromUnit(first);
                                        setToUnit(second);
                                    }}
                                    style={{
                                        padding: '0.6rem 1.25rem',
                                        borderRadius: '0.75rem',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        border: 'none',
                                        background: category === cat
                                            ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                            : 'rgba(255,255,255,0.05)',
                                        color: '#fff',
                                        boxShadow: category === cat ? '0 4px 15px rgba(99,102,241,0.4)' : 'none',
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Value</label>
                            <input
                                type="number"
                                className="input"
                                value={value}
                                onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                                style={{ width: '100%', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '0.85rem', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem', fontWeight: 500 }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>From</label>
                            <CustomDropdown
                                options={unitOptions}
                                value={fromUnit}
                                onChange={setFromUnit}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>To</label>
                            <CustomDropdown
                                options={unitOptions}
                                value={toUnit}
                                onChange={setToUnit}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <ResultCard
                            title="Result"
                            value={`${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`}
                            highlight
                            color="primary"
                        />
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
