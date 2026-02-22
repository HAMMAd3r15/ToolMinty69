import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Comparison Shopping Tool — Find the Best Value',
    description: 'Compare multiple products based on price, quality, and quantity. Make smarter purchasing decisions with our free comparison tool.',
    keywords: ['comparison shopping', 'best value finder', 'price comparison', 'shopping assistant', 'smart shopping'],
};

export default function ComparisonShoppingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/comparison-shopping')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
