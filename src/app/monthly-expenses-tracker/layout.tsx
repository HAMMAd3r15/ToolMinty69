import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Monthly Expenses Tracker — Visualize Your Spending',
    description: 'Log and analyze your monthly spending habits. Categorize your expenses and take control of your financial life.',
    keywords: ['expense tracker', 'spending log', 'personal finance', 'monthly budget', 'financial tracker'],
};

export default function MonthlyExpensesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/monthly-expenses-tracker')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
