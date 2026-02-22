import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Break-Even Calculator — Sales Goal Finder',
    description: 'Find your break-even point in units or dollars. Understand when your business will start making a profit with our free financial tool.',
    keywords: ['break-even calculator', 'break-even point', 'business planning', 'sales goals', 'finance tool'],
};

export default function BreakEvenLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/break-even-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
