'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function AgeVerificationCalculator() {
    const [birthDate, setBirthDate] = useState<string>('');
    const [requiredAge, setRequiredAge] = useState<string>('18');

    const checkAge = () => {
        if (!birthDate) return null;

        const birth = new Date(birthDate);
        const now = new Date();
        if (isNaN(birth.getTime())) return null;

        let age = now.getFullYear() - birth.getFullYear();
        const m = now.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
            age--;
        }

        const requiredAgeNum = parseInt(requiredAge) || 0;
        const isOldEnough = age >= requiredAgeNum;

        return {
            age,
            isOldEnough
        };
    };

    const res = checkAge();

    const faqs = [
        {
            question: "How is the age verified?",
            answer: "The tool compares the provided birth date with the current date to calculate the exact age in years."
        },
        {
            question: "What is the legal age in my country?",
            answer: "Legal ages vary by country and region. In many countries, 18 is the standard age of majority, but some jurisdictions use 21 for specific activities."
        },
        {
            question: "Is my birth date saved?",
            answer: "No. This tool operates entirely on your device. Your birth date is processed locally and is never sent to any server."
        }
    ];

    const calc = calculators.find(c => c.href === '/age-verification');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Age Verification Tool'}
                description={calc?.description || 'Quickly check if someone meets a specific age requirement based on their date of birth.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                className="input"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                style={{ width: '100%', cursor: 'pointer' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Required Age
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={requiredAge}
                                onChange={(e) => setRequiredAge(e.target.value)}
                                placeholder="e.g. 18"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    {res && (
                        <div style={{ marginTop: '1rem' }}>
                            <ResultCard
                                title={res.isOldEnough ? "Verification Passed" : "Verification Failed"}
                                value={res.isOldEnough ? "Access Allowed" : "Underage"}
                                subtitle={`The person is currently ${res.age} years old.`}
                                color={res.isOldEnough ? 'success' : 'error'}
                                highlight={true}
                            />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
