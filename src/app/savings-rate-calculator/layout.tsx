import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Savings Rate Calculator — Measure Your Financial Progress',
    description: 'Calculate what percentage of your income you are saving. Optimize your budget and reach your goals faster.',
    keywords: ['savings rate calculator', 'saving percentage', 'financial health', 'budget optimization', 'wealth builder'],
};

export default function SavingsRateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/savings-rate-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
