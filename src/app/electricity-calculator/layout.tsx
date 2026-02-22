import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Electricity Bill Estimator — Track Your Energy Usage',
    description: 'Estimate your monthly electricity costs based on appliance usage and local rates. Save money by understanding your power consumption.',
    keywords: ['electricity bill calculator', 'energy cost estimator', 'power usage', 'utility bill tool', 'save energy'],
};

export default function ElectricityCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/electricity-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
