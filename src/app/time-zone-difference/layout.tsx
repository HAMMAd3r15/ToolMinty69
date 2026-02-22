import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Time Zone Difference — Global Meeting Planner',
    description: 'Calculate the time difference between any two cities worldwide. Plan meetings and calls across time zones with ease.',
    keywords: ['time zone converter', 'time difference calculator', 'global clock', 'world time tool', 'meeting planner'],
};

export default function TimeZoneDifferenceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/time-zone-difference')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
