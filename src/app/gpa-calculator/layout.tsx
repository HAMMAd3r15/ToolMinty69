import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'GPA Calculator — Calculate Your Semester & Cumulative GPA',
    description: 'Free online GPA Calculator. Fast and easy way to track your academic performance and calculate your college or high school GPA.',
    keywords: ['gpa calculator', 'grade point average', 'college gpa', 'school grades', 'academic tool'],
};

export default function GPACalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/gpa-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
