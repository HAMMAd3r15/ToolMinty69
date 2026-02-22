import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Discount Calculator — Find Sale Savings Instantly',
    description: 'Calculate final prices and total savings with our free Discount Calculator. Perfect for shopping and sales.',
    keywords: ['discount calculator', 'sale calculator', 'shopping tool', 'price checker', 'savings calculator'],
};

export default function DiscountCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/discount-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
