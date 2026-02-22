import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Daily Planner Printable — Design Your Perfect Day',
    description: 'Design and print your own custom daily schedule. Organize your tasks and priorities with our professional online planner.',
    keywords: ['daily planner printable', 'schedule designer', 'task manager', 'productivity tool', 'planner template'],
};

export default function DailyPlannerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/daily-planner')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
