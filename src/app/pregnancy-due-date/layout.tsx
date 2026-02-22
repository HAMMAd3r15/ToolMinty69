import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Pregnancy Due Date Calculator — Track Your Journey',
    description: 'Estimate your due date and follow your pregnancy milestones with our free, accurate calculator based on your last period or conception date.',
    keywords: ['pregnancy due date calculator', 'due date estimator', 'baby countdown', 'maternity tool', 'pregnancy tracker'],
};

export default function PregnancyDueDateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/pregnancy-due-date')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
