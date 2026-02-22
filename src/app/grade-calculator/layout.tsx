import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Grade Calculator — Determine Your Final Grade Needs',
    description: 'Calculate what you need on your final exam to reach your target grade. Easy-to-use grade planning tool.',
    keywords: ['grade calculator', 'exam calculator', 'final grade needs', 'study planner', 'grading tool'],
};

export default function GradeCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/grade-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
