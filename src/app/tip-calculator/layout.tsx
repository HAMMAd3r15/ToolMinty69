import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Tip Calculator — Fast & Easy Gratuity Finder',
    description: 'Quickly calculate the perfect tip and split the bill among friends. Accurate and simple tool for dining out.',
    keywords: ['tip calculator', 'gratuity tool', 'bill splitter', 'dining tools', 'restaurant tip'],
};

export default function TipCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/tip-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
