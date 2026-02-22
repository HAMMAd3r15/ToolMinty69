import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'ROI Calculator — Calculate Return on Investment',
    description: 'Easily calculate the profitability of your investments. Determine your return on investment percentage and total gains.',
    keywords: ['roi calculator', 'return on investment', 'profitability tool', 'investment analysis', 'finance tool'],
};

export default function ROICalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/roat-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
