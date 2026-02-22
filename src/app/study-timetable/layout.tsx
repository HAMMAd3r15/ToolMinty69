import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Study Timetable Generator — Organize Your Week',
    description: 'Automatically generate a professional study timetable. Organize your week and stay on top of your subjects with our free generator.',
    keywords: ['study timetable', 'schedule generator', 'academic planner', 'study tool', 'weekly schedule'],
};

export default function StudyTimetableLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/study-timetable')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
