import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Calorie Needs Calculator — Personalized Daily Targets',
    description: 'Estimate your daily calorie requirements for weight maintenance, loss, or gain based on your activity level.',
    keywords: ['calorie needs calculator', 'daily calories', 'tdee calculator', 'weight management', 'diet tool'],
};

export default function CalorieNeedsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/calorie-needs')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
