import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Investment Returns Calculator — Project Your Wealth',
    description: 'Estimate your future investment returns based on contributions, expected rate of return, and time. Plan your financial growth.',
    keywords: ['investment returns calculator', 'roi calculator', 'wealth projection', 'financial planner', 'savings growth'],
};

export default function InvestmentReturnsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/investment-returns')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
