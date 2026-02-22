import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Week Number Calculator — Current Week Finder',
    description: 'Find out the current week number or calculate the week number for any specific date on the calendar.',
    keywords: ['week number calculator', 'current week', 'iso week number', 'calendar week', 'chronology tool'],
};

export default function WeekNumberLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/week-number-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
