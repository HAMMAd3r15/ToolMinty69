import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Dice Roller — Virtual Multi-Sided Dice Simulator | ToolMinty',
    description: 'Roll virtual dice online. Support for D4, D6, D8, D10, D12, D20, and D100. Choose the number of dice and roll for your favorite games.',
    alternates: { canonical: '/dice-roller' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/dice-roller')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
