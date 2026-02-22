import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Invoice Generator — Create Professional Invoices Instantly',
    description: 'Generate and download professional invoices for your business or freelance work. Simple, free, and secure online tool.',
    keywords: ['invoice generator', 'billing tool', 'freelance invoice', 'business billing', 'free invoice maker'],
};

export default function InvoiceGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/invoice-generator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
