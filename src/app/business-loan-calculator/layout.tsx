import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Business Loan Calculator — Plan Your Company Growth',
    description: 'Estimate payments for business financing. Understand the cost of capital and plan your expansion with our professional tool.',
    keywords: ['business loan calculator', 'company financing', 'growth planning', 'commercial loan estimator', 'finance tool'],
};

export default function BusinessLoanLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/business-loan-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
