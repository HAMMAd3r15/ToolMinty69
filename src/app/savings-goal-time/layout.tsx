import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Savings Goal Time Calculator — Reach Your Targets Faster',
    description: 'Calculate how long it will take to reach your savings goal. Plan your financial future with our free savings duration tool.',
    keywords: ['savings goal calculator', 'savings time', 'financial planning', 'wealth builder', 'savings tracker'],
};

export default function SavingsGoalTimeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/savings-goal-time')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
