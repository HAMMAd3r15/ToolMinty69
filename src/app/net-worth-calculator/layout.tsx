import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Net Worth Calculator — Track Your Personal Wealth',
    description: 'Get a clear picture of your financial health. Calculate your total net worth by balancing your assets and liabilities.',
    keywords: ['net worth calculator', 'wealth tracker', 'personal finance', 'asset liability calculator', 'financial health'],
};

export default function NetWorthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/net-worth-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
