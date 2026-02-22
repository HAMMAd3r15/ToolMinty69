import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Rock Paper Scissors — Play Online vs Computer | ToolMinty',
    description: 'Play Rock Paper Scissors against the computer online. Fun animated game with score tracking, instant results, and a classic best-of-all experience.',
    alternates: { canonical: '/rock-paper-scissors' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/rock-paper-scissors')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
