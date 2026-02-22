import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Reaction Time Tester — How Fast Are Your Reflexes? | ToolMinty',
    description: 'Test your reaction time online. Click when the screen turns green and measure your response speed in milliseconds. Compare against average human and gamer benchmarks.',
    alternates: { canonical: '/reaction-time' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/reaction-time')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
