import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Loan Payoff Calculator — Achieve Financial Freedom',
    description: 'Calculate how long it will take to pay off your loans. Explore different repayment strategies and save on interest.',
    keywords: ['loan payoff calculator', 'debt free planner', 'loan repayment', 'financial freedom', 'debt tracker'],
};

export default function LoanPayoffLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/loan-payoff-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
