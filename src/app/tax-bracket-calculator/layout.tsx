import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Tax Bracket Calculator — Find Your Marginal Rate',
    description: 'Estimate your tax bracket and marginal tax rate. Understand how much of your next dollar goes to taxes.',
    keywords: ['tax bracket calculator', 'marginal tax rate', 'income tax tool', 'finance planner', 'tax estimator'],
};

export default function TaxBracketLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/tax-bracket-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
