import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Retirement Savings Goal — Plan for Your Future',
    description: 'Determine exactly how much you need to save for a comfortable retirement. Free financial planning tool for your golden years.',
    keywords: ['retirement savings calculator', 'pension planner', 'retirement goals', 'savings calculator', 'future wealth'],
};

export default function RetirementSavingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/retirement-savings')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
