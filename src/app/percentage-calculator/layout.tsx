import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Percentage Calculator — Quick & Accurate Math Tool',
    description: 'Solve any percentage problem instantly. Calculate percentage increases, decreases, and common math ratios with our free tool.',
    keywords: ['percentage calculator', 'percent tool', 'math calculator', 'percentage increase', 'percentage decrease'],
};

export default function PercentageCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/percentage-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
