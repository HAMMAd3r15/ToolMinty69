import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Habit Streak Counter — Track Your Winning Days',
    description: 'Maintain your discipline and visualize your progress with our free Habit Streak Counter. Build long-term habits with ease.',
    keywords: ['habit streak counter', 'discipline tracker', 'consistency tool', 'habit builder', 'productivity streak'],
};

export default function HabitStreakLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/habit-streak')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
