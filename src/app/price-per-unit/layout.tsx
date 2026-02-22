import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Price Per Unit Calculator — Compare Deals Effortlessly',
    description: 'Find the best value by comparing prices per unit, ounce, or liter. Save money on every shopping trip.',
    keywords: ['price per unit', 'unit price calculator', 'shopping deals', 'comparison tool', 'save money'],
};

export default function PricePerUnitLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/price-per-unit')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
