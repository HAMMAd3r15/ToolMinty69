import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'BMR Calculator — Calculate Your Basal Metabolic Rate',
    description: 'Discover your Basal Metabolic Rate (BMR) instantly. Understand your daily resting calorie burn for better weight management.',
    keywords: ['bmr calculator', 'basal metabolic rate', 'calorie burn', 'metabolism tool', 'health calculator'],
};

export default function BMRCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/bmr-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
