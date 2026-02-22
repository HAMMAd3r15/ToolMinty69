import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Workout Progress Tracker — Log Your Strength Journey',
    description: 'Track your sets, reps, and weights for every workout. Monitor your strength gains and stay motivated with our free fitness tracker.',
    keywords: ['workout progress tracker', 'gym log', 'strength tracker', 'fitness journal', 'weightlifting tracker'],
};

export default function WorkoutTrackerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/workout-tracker')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
