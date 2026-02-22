import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Personal Loan Calculator — Evaluate Your Borrowing',
    description: 'Determine your monthly payments and total costs for personal loans. Compare different loan options with our free tool.',
    keywords: ['personal loan calculator', 'loan estimator', 'borrowing tool', 'interest calculator', 'monthly installments'],
};

export default function PersonalLoanLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/personal-loan-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
