'use client';

import { useState } from 'react';
import ResultCard from '@/components/UI/ResultCard';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function DiscountCalculator() {
    const [price, setPrice] = useState<string>('');
    const [discount, setDiscount] = useState<string>('');
    const [tax, setTax] = useState<string>('0');

    const calculateSavings = () => {
        const p = parseFloat(price);
        const d = parseFloat(discount);
        const t = parseFloat(tax) || 0;

        if (isNaN(p) || isNaN(d)) return null;

        const discountAmount = (p * d) / 100;
        const priceAfterDiscount = p - discountAmount;
        const taxAmount = (priceAfterDiscount * t) / 100;
        const finalPrice = priceAfterDiscount + taxAmount;

        return {
            finalPrice: finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            savings: discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            taxAmount: taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
    };

    const res = calculateSavings();

    const faqs = [
        {
            question: "How is the final price calculated?",
            answer: "First, we calculate the discount amount by multiplying the original price by the discount percentage. Then, we subtract this from the original price. Finally, we add any sales tax (calculated on the discounted price) to get the final total."
        },
        {
            question: "Should I include tax before or after discount?",
            answer: "In most regions, sales tax is calculated on the post-discount price. Our calculator follows this standard approach."
        },
        {
            question: "Is this tool free to use?",
            answer: "Yes, all tools on ToolMinty are completely free and require no signup."
        }
    ];

    const calc = calculators.find(c => c.href === '/discount-calculator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Discount Calculator'}
                description={calc?.description || 'Find out exactly how much you\'ll save during a sale.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Original Price
                            </label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }}>$</span>
                                <input
                                    type="number"
                                    className="input"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="0.00"
                                    style={{ width: '100%', paddingLeft: '2rem' }}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Discount (%)
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="number"
                                    className="input"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    placeholder="20"
                                    style={{ width: '100%', paddingRight: '2rem' }}
                                />
                                <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }}>%</span>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>
                                Sales Tax (%) (Optional)
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="number"
                                    className="input"
                                    value={tax}
                                    onChange={(e) => setTax(e.target.value)}
                                    placeholder="0"
                                    style={{ width: '100%', paddingRight: '2rem' }}
                                />
                                <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }}>%</span>
                            </div>
                        </div>
                    </div>

                    {res && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            <ResultCard
                                title="Final Price"
                                value={`$${res.finalPrice}`}
                                color="secondary"
                            />
                            <ResultCard
                                title="You Save"
                                value={`$${res.savings}`}
                                color="accent"
                            />
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
