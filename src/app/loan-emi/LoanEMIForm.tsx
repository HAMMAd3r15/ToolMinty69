'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import CustomSelect from '@/components/UI/CustomSelect';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function LoanEMIForm() {
    const [loanAmount, setLoanAmount] = useState<string>('');
    const [interestRate, setInterestRate] = useState<string>('');
    const [tenure, setTenure] = useState<string>('');
    const [tenureType, setTenureType] = useState<'years' | 'months'>('years');

    const calculateEMI = () => {
        const p = parseFloat(loanAmount);
        const annualRate = parseFloat(interestRate);
        let n = parseFloat(tenure);

        if (isNaN(p) || isNaN(annualRate) || isNaN(n) || p <= 0 || n <= 0) return null;

        if (tenureType === 'years') n = n * 12;

        const r = annualRate / 12 / 100;

        let emi: number;
        if (r === 0) {
            emi = p / n;
        } else {
            emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        }
        const totalPayment = emi * n;
        const totalInterest = totalPayment - p;

        return {
            emi: Math.round(emi).toLocaleString(),
            totalInterest: Math.round(totalInterest).toLocaleString(),
            totalPayment: Math.round(totalPayment).toLocaleString()
        };
    };

    const res = calculateEMI();

    const faqs = [
        {
            question: "What is an EMI?",
            answer: "EMI stands for Equated Monthly Installment. It is a fixed amount of money that a borrower pays to a lender at a specified date each calendar month."
        },
        {
            question: "How does interest rate affect EMI?",
            answer: "A higher interest rate increases your EMI and the total interest paid over the life of the loan. Even a small change in rate can have a large impact on long-term loans like mortgages."
        },
        {
            question: "Can I pay off my loan early?",
            answer: "Most loans allow for 'pre-payment' or 'foreclosure', which can significantly reduce the total interest you pay. However, some lenders may charge a pre-payment penalty."
        }
    ];

    const calc = calculators.find(c => c.href === '/loan-emi');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Loan EMI Calculator'}
                description={calc?.description || 'Calculate your monthly loan repayments, total interest, and total amount payable.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Loan Amount ($)</label>
                        <input type="number" className="input" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="e.g. 250000" style={{ width: '100%' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Annual Interest Rate (%)</label>
                            <input type="number" className="input" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g. 6.5" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Loan Tenure</label>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                                <input type="number" className="input" value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="30" style={{ flex: 1 }} />
                                <CustomSelect
                                    value={tenureType}
                                    onChange={(val) => setTenureType(val as any)}
                                    options={[
                                        { value: "years", label: "Years" },
                                        { value: "months", label: "Months" }
                                    ]}
                                    containerStyle={{ width: '130px' }}
                                />
                            </div>
                        </div>
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gap: '1.25rem' }}>
                            <ResultCard
                                title="Monthly EMI"
                                value={`$${res.emi}`}
                                highlight
                                color="primary"
                            />
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                                <ResultCard
                                    title="Total Interest"
                                    value={`$${res.totalInterest}`}
                                    color="secondary"
                                />
                                <ResultCard
                                    title="Total Repayment"
                                    value={`$${res.totalPayment}`}
                                    color="accent"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
