import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Work Hour Calculator — Total Time Tracker',
    description: 'Calculate total hours worked between two times. Ideal for timesheets, freelance billing, and shift tracking.',
    keywords: ['work hour calculator', 'time tracker', 'timesheet tool', 'shift calculator', 'work time'],
};

export default function WorkHourLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/work-hour-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
