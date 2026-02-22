import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Speed Calculator — Calculate Velocity Instantly',
    description: 'Find the speed of any object based on distance and time. Supports kilometers per hour, miles per hour, and more.',
    keywords: ['speed calculator', 'velocity calculator', 'distance time speed', 'physics tool', 'speed checker'],
};

export default function SpeedCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/speed-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
