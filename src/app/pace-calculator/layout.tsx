import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Pace Calculator — Running & Training Tool',
    description: 'Calculate your running pace for any distance. Perfect for marathon training, 5K prep, and fitness tracking.',
    keywords: ['pace calculator', 'running pace', 'training tool', 'marathon calculator', 'fitness tracker'],
};

export default function PaceCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/pace-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
