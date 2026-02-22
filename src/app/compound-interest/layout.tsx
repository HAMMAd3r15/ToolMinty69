import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Compound Interest Calculator — Visualize Wealth Growth',
    description: 'Free Compound Interest Calculator. See how your savings and investments grow over time with the power of compounding.',
    keywords: ['compound interest calculator', 'investment calculator', 'savings growth', 'financial planner', 'wealth calculator'],
};

export default function CompoundInterestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/compound-interest')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
