import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Productivity Score Calculator — Measure Your Efficiency',
    description: 'Calculate your daily productivity percentage. Evaluate your task completion and optimize your workflow with our free tool.',
    keywords: ['productivity score', 'efficiency calculator', 'work performance', 'task completion', 'productivity tool'],
};

export default function ProductivityScoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/productivity-score')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
