import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'VAT Calculator — Fast Value Added Tax Finder',
    description: 'Quickly add or remove VAT from your prices. Supports multiple rates and international requirements.',
    keywords: ['vat calculator', 'tax tool', 'value added tax', 'price inclusive of vat', 'business tool'],
};

export default function VATCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/vat-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
