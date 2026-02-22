import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Exact Age Calculator — Calculate Your Precise Age',
    description: 'Calculate your exact age in years, months, and days. Find out how many days you have been alive and when your next birthday is.',
    keywords: ['age calculator', 'exact age', 'birthday finder', 'chronology tool', 'life tracker'],
};

export default function ExactAgeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/exact-age')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
