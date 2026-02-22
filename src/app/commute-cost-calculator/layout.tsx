import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Commute Cost Calculator — Yearly Travel Expense Finder',
    description: 'Discover the true cost of your daily commute. Calculate yearly gas, maintenance, and time costs for your travel.',
    keywords: ['commute cost calculator', 'travel expense', 'work commute', 'gas cost tracker', 'time value'],
};

export default function CommuteCostLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/commute-cost-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
