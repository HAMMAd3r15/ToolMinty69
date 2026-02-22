import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Daily Spending Limit — Smart Budgeting Tool',
    description: 'Calculate how much you can spend per day to stay within your monthly budget. Simple and effective financial planning.',
    keywords: ['daily spending limit', 'budgeting tool', 'personal finance', 'spending tracker', 'money management'],
};

export default function DailySpendingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/daily-spending-limit')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
