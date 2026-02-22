import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Leap Year Calculator — Find Next Leap Years',
    description: 'Instantly check if a year is a leap year. Explore previous and upcoming leap years with our free chronology tool.',
    keywords: ['leap year calculator', 'is it a leap year', 'calendar tool', 'chronology calculator', 'leap day finder'],
};

export default function LeapYearLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/leap-year-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
