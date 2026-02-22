'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ResultCard from '@/components/UI/ResultCard';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

interface Entry {
    label: string;
    amount: number;
}

export default function BudgetPlanner() {
    const [income, setIncome] = useState<Entry[]>([{ label: 'Salary', amount: 0 }]);
    const [expenses, setExpenses] = useState<Entry[]>([{ label: 'Rent', amount: 0 }]);

    const addEntry = (type: 'income' | 'expense') => {
        if (type === 'income') {
            setIncome([...income, { label: '', amount: 0 }]);
        } else {
            setExpenses([...expenses, { label: '', amount: 0 }]);
        }
    };

    const updateEntry = (type: 'income' | 'expense', index: number, field: keyof Entry, value: any) => {
        if (type === 'income') {
            const newList = [...income];
            newList[index] = { ...newList[index], [field]: value };
            setIncome(newList);
        } else {
            const newList = [...expenses];
            newList[index] = { ...newList[index], [field]: value };
            setExpenses(newList);
        }
    };

    const removeEntry = (type: 'income' | 'expense', index: number) => {
        if (type === 'income') {
            setIncome(income.filter((_, i) => i !== index));
        } else {
            setExpenses(expenses.filter((_, i) => i !== index));
        }
    };

    const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const balance = totalIncome - totalExpenses;

    const faqs = [
        {
            question: "What is the 50/30/20 rule?",
            answer: "It's a common budgeting goal where 50% of income goes to Needs, 30% to Wants, and 20% to Savings or Debt repayment. Use this planner to see where you stand."
        },
        {
            question: "How often should I update my budget?",
            answer: "Once a month is usually enough to track major changes, but checking weekly can help you stay on track with smaller daily expenses."
        },
        {
            question: "Should I include savings as an expense?",
            answer: "Many people treat savings as a 'fixed expense' that they pay to themselves first. This ensures they hit their goals before spending on 'wants'."
        }
    ];

    const calc = calculators.find(c => c.href === '/budget-planner');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Budget Planner Sheet'}
                description={calc?.description || 'Track your income and expenses to visualize health.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '3rem' }}>
                    {/* Income Section */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0, color: '#10b981' }}>Monthly Income</h3>
                            <button onClick={() => addEntry('income')} className="btn-secondary">+ Add Income</button>
                        </div>
                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                            {income.map((item, i) => (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 150px auto', gap: '1rem', alignItems: 'center' }}>
                                    <input type="text" className="input" value={item.label} onChange={(e) => updateEntry('income', i, 'label', e.target.value)} placeholder="Source" />
                                    <input type="number" className="input" value={item.amount} onChange={(e) => updateEntry('income', i, 'amount', parseFloat(e.target.value) || 0)} placeholder="Amount" />
                                    <button onClick={() => removeEntry('income', i)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>×</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Expenses Section */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0, color: '#ef4444' }}>Monthly Expenses</h3>
                            <button onClick={() => addEntry('expense')} className="btn-secondary">+ Add Expense</button>
                        </div>
                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                            {expenses.map((item, i) => (
                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 150px auto', gap: '1rem', alignItems: 'center' }}>
                                    <input type="text" className="input" value={item.label} onChange={(e) => updateEntry('expense', i, 'label', e.target.value)} placeholder="Category" />
                                    <input type="number" className="input" value={item.amount} onChange={(e) => updateEntry('expense', i, 'amount', parseFloat(e.target.value) || 0)} placeholder="Amount" />
                                    <button onClick={() => removeEntry('expense', i)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>×</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary Results */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <ResultCard title="Total Income" value={`$${totalIncome.toFixed(0)}`} color="secondary" />
                        <ResultCard title="Total Expenses" value={`$${totalExpenses.toFixed(0)}`} color="accent" />
                        <ResultCard title="Net Balance" value={`$${balance.toFixed(0)}`} highlight color={balance >= 0 ? 'primary' : 'accent'} />
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />

            <style jsx>{`
                .btn-secondary {
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 0.4rem 0.8rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-size: 0.85rem;
                }
            `}</style>
        </div>
    );
}
