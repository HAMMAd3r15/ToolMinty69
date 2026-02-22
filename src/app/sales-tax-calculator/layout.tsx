import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Sales Tax Calculator — Local & Regional Tax Tool',
    description: 'Calculate sales tax for your purchases or business transactions. Simple and accurate tool for any tax rate.',
    keywords: ['sales tax calculator', 'tax estimator', 'shopping tool', 'business tax', 'tax rate calculator'],
};

export default function SalesTaxLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/sales-tax-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
