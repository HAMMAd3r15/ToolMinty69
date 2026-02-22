import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Mortgage Payoff Calculator — Save on Interest',
    description: 'Calculate how making extra payments can shorten your mortgage and save you thousands in interest. Plan your debt-free future.',
    keywords: ['mortgage payoff calculator', 'early repayment', 'home loan tool', 'save interest', 'mortgage reduction'],
};

export default function MortgagePayoffLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/mortgage-payoff-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
