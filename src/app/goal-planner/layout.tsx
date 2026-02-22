import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Goal Planner — Transform Dreams into Reality',
    description: 'Break down your big goals into actionable steps. Track your progress and achieve success with our free goal planning tool.',
    keywords: ['goal planner', 'milestone tracker', 'productivity tool', 'success planning', 'goal setting'],
};

export default function GoalPlannerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/goal-planner')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
