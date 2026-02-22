import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Water Intake Calculator — Optimize Your Hydration',
    description: 'Calculate your ideal daily water intake based on your weight and activity level. Stay hydrated and healthy with our free tool.',
    keywords: ['water intake calculator', 'hydration calculator', 'daily water needs', 'health tool', 'fitness calculator'],
};

export default function WaterIntakeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/water-intake')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
