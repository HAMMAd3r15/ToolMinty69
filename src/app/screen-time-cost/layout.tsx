import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Screen Time Cost — Discover the Value of Your Time',
    description: 'Find out how much your app usage really costs. Calculate the monetary value of your screen time with our free tool.',
    keywords: ['screen time calculator', 'cost of time', 'app usage cost', 'productivity tracker', 'time value'],
};

export default function ScreenTimeCostLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/screen-time-cost')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
