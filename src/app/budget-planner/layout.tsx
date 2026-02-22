import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Budget Planner — Take Control of Your Finances',
    description: 'Free online Budget Planner. Track your income and expenses, set savings goals, and manage your monthly budget with ease.',
    keywords: ['budget planner', 'expense tracker', 'budgeting tool', 'personal finance', 'savings goal'],
};

export default function BudgetPlannerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/budget-planner')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
