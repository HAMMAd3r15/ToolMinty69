import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Profit Margin Calculator — Business Pricing Tool',
    description: 'Calculate gross profit margin, markup, and net profit for your products. Essential tool for small business owners and freelancers.',
    keywords: ['profit margin calculator', 'markup calculator', 'business finance', 'pricing tool', 'margin checker'],
};

export default function ProfitMarginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/profit-margin-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
