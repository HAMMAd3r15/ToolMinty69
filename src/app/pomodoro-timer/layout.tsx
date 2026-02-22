import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Pomodoro Timer — Focus Better, Accomplish More',
    description: 'Boost your focus with the Pomodoro technique. Use our free timer for timed work intervals and refreshing breaks.',
    keywords: ['pomodoro timer', 'focus tool', 'productivity timer', 'time management', 'work interval timer'],
};

export default function PomodoroTimerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/pomodoro-timer')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
