import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Debt Payoff Calculator — Plan Your Freedom',
    description: 'Visualize your path to financial freedom. Calculate how long it will take to pay off your credit cards and loans with our free tool.',
    keywords: ['debt payoff calculator', 'debt free tracker', 'credit card payoff', 'loan payoff', 'finance tool'],
};

export default function DebtPayoffLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/debt-payoff-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
