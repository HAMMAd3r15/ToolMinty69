import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Moon Phase Calculator — Current Lunar Cycle',
    description: 'Track the current phase of the moon and discover upcoming lunar events with our free astronomical tool.',
    keywords: ['moon phase calculator', 'lunar cycle', 'new moon', 'full moon', 'astronomy tool'],
};

export default function MoonPhaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/moon-phase-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
