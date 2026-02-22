'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function FuelCalculator() {
    const [distance, setDistance] = useState('');
    const [mileage, setMileage] = useState('');
    const [fuelPrice, setFuelPrice] = useState('');

    const calc = () => {
        const d = parseFloat(distance);
        const m = parseFloat(mileage);
        const p = parseFloat(fuelPrice);
        if (isNaN(d) || isNaN(m) || isNaN(p) || m <= 0) return null;
        const liters = d / m;
        const cost = liters * p;
        const costPer100km = (100 / m) * p;
        return { liters: liters.toFixed(2), cost: cost.toFixed(2), costPer100km: costPer100km.toFixed(2) };
    };

    const res = calc();
    const faqs = [
        { question: "How is fuel cost calculated?", answer: "Fuel used = Distance ÷ Mileage (km per liter). Total cost = Fuel used × Price per liter." },
    ];

    const toolData = calculators.find(c => c.href === '/fuel-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={toolData?.title || 'Fuel Cost Calculator'}
                description={toolData?.description || 'Calculate trip fuel expenses based on distance, fuel efficiency, and price.'}
            />
            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Distance (km)</label>
                            <input type="number" className="input" value={distance} onChange={e => setDistance(e.target.value)} placeholder="e.g. 300" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Fuel Efficiency (km/L)</label>
                            <input type="number" className="input" value={mileage} onChange={e => setMileage(e.target.value)} placeholder="e.g. 15" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Price per Liter ($)</label>
                            <input type="number" className="input" value={fuelPrice} onChange={e => setFuelPrice(e.target.value)} placeholder="e.g. 1.50" step="0.01" />
                        </div>
                    </div>
                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
                            <ResultCard title="Total Fuel Used" value={`${res.liters}L`} color="secondary" />
                            <ResultCard title="Total Trip Cost" value={`$${res.cost}`} color="primary" highlight />
                            <ResultCard title="Cost per 100km" value={`$${res.costPer100km}`} color="accent" />
                        </div>
                    )}
                </div>
            </div>
            <FAQSection items={faqs} />
        </div>
    );
}
