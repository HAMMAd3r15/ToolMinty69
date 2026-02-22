import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Coin Flip Simulator — 3D Heads or Tails Online | ToolMinty',
    description: 'Flip a coin online with a realistic 3D animation. Track your heads/tails stats and streaks. Perfect for quick decisions and fair tosses.',
    alternates: { canonical: '/coin-flip' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/coin-flip')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
