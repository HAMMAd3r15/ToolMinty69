import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Habit Tracker — Build Better Routines Today',
    description: 'Build positive habits and stay committed with our free Habit Tracker. Visualize your streaks and transform your daily life.',
    keywords: ['habit tracker', 'streak counter', 'routine builder', 'productivity tool', 'habit builder'],
};

export default function HabitTrackerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/habit-tracker')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
