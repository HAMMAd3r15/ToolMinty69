import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Car Payment Calculator — Auto Loan Estimator',
    description: 'Estimate your monthly car payments and total interest based on loan amount, term, and interest rate. Plan your next vehicle purchase.',
    keywords: ['car payment calculator', 'auto loan estimator', 'vehicle finance', 'monthly payments', 'car loan tool'],
};

export default function CarPaymentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/car-payment-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
