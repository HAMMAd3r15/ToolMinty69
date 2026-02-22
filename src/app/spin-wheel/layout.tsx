import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Spin the Wheel — Random Decision Wheel & Picker | ToolMinty',
    description: 'Create a custom spin wheel for random decisions, giveaways, and games. Add your own options and watch the wheel spin with a smooth animation.',
    alternates: { canonical: '/spin-wheel' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/spin-wheel')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
