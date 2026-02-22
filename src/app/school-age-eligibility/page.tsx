'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import DateInput from '@/components/UI/DateInput';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function SchoolAgeEligibilityCalculator() {
    const [dob, setDob] = useState<string>('');
    const [cutoffDate, setCutoffDate] = useState<string>(`${new Date().getFullYear()}-09-01`);
    const [minAge, setMinAge] = useState<string>('5');

    const calculateEligibility = () => {
        if (!dob || !cutoffDate) return null;

        const birth = new Date(dob);
        const cutoff = new Date(cutoffDate);
        const ageLimit = parseInt(minAge);

        if (isNaN(birth.getTime()) || isNaN(cutoff.getTime()) || isNaN(ageLimit)) return null;

        // Calculate age at cutoff date
        let ageAtCutoff = cutoff.getFullYear() - birth.getFullYear();
        const m = cutoff.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && cutoff.getDate() < birth.getDate())) {
            ageAtCutoff--;
        }

        const isEligible = ageAtCutoff >= ageLimit;

        return {
            ageAtCutoff,
            isEligible,
            yearsWait: ageLimit - ageAtCutoff
        };
    };

    const res = calculateEligibility();

    const faqs = [
        {
            question: "What is a 'cutoff date'?",
            answer: "The cutoff date is the date by which a child must have reached a certain age to be eligible for enrollment in a specific grade level. Common cutoff dates are September 1st or January 1st."
        },
        {
            question: "Does this apply to all schools?",
            answer: "No, eligibility rules vary significantly by country, state, and even individual school districts. Always check with your local education department for official requirements."
        },
        {
            question: "What if my child is just a few days short?",
            answer: "Some districts allow for 'early entry' assessments if a child's birthday is very close to the cutoff, but this usually requires specialized testing."
        }
    ];

    const calc = calculators.find(c => c.href === '/school-age-eligibility');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'School Age Eligibility Calculator'}
                description={calc?.description || 'Quickly check if your child meets the age requirements for school admission based on your local cutoff date.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <DateInput
                        label="Child's Date of Birth"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Cutoff Date</label>
                            <input
                                type="date"
                                className="input"
                                value={cutoffDate}
                                onChange={(e) => setCutoffDate(e.target.value)}
                                style={{ width: '100%', appearance: 'auto' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Required Age (Min)</label>
                            <input
                                type="number"
                                className="input"
                                value={minAge}
                                onChange={(e) => setMinAge(e.target.value)}
                                placeholder="e.g. 5"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            <ResultCard
                                title="Admission Status"
                                value={res.isEligible ? 'Eligible for Admission' : 'Not Yet Eligible'}
                                subtitle={`Age at cutoff: ${res.ageAtCutoff} years old`}
                                highlight
                                color={res.isEligible ? 'success' : 'error'}
                            />
                            {!res.isEligible && res.yearsWait > 0 && (
                                <div style={{
                                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                                    padding: '1.25rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid rgba(239, 68, 68, 0.1)',
                                    fontSize: '0.9rem',
                                    color: 'var(--color-text-secondary)'
                                }}>
                                    <strong>Note:</strong> Your child will likely be eligible in <strong>{res.yearsWait} year{res.yearsWait > 1 ? 's' : ''}</strong> based on this cutoff.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
