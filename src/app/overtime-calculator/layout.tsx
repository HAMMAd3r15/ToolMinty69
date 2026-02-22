import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Overtime Pay Calculator — Calculate Your Extra Earnings',
    description: 'Calculate your total pay including overtime hours. Understand your earnings with various multipliers and hourly rates.',
    keywords: ['overtime calculator', 'overtime pay', 'salary checker', 'wage calculator', 'extra hours'],
};

export default function OvertimeCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/overtime-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
