import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Inflation Calculator — Purchasing Power Over Time',
    description: 'Calculate how the value of money has changed over time with our free Inflation Calculator. Understand purchasing power and price history.',
    keywords: ['inflation calculator', 'purchasing power', 'money value', 'cpi calculator', 'finance tool'],
};

export default function InflationCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/inflation-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
