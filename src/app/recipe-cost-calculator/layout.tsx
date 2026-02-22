import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Recipe Cost Calculator — Professional Kitchen Tool',
    description: 'Calculate the total cost and per-serving price of your recipes. Essential for home cooks, caterers, and restaurant owners.',
    keywords: ['recipe cost calculator', 'food pricing tool', 'kitchen math', 'serving cost', 'cooking budget'],
};

export default function RecipeCostLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/recipe-cost-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
