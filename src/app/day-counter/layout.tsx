import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Day Counter — Days Between Dates Tool',
    description: 'Calculate the exact number of days between two specific dates. Perfect for event planning, project tracking, and more.',
    keywords: ['day counter', 'days between dates', 'date duration', 'event countdown', 'chronology tool'],
};

export default function DayCounterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/day-counter')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
