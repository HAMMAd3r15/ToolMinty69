import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Study Planner — Optimize Your Learning Schedule',
    description: 'Plan your study sessions and manage your academic time effectively. Divide hours across subjects with our free study tool.',
    keywords: ['study planner', 'learning schedule', 'academic tool', 'education planning', 'study hours'],
};

export default function StudyPlannerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/study-planner')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
