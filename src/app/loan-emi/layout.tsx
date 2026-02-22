import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Loan EMI Calculator — Calculate Monthly Repayments & Interest',
    description: 'Free online Loan EMI Calculator. Calculate your monthly installments, total interest payable, and total amount for home, car, or personal loans.',
    keywords: ['loan emi calculator', 'mortgage calculator', 'loan repayment', 'interest calculator', 'monthly installments'],
};

export default function LoanEMILayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/loan-emi')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
