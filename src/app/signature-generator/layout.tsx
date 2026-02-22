import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Signature Generator — Create Professional Digital Signatures',
    description: 'Design a stylish and professional digital signature for your documents and emails with our easy-to-use generator.',
    keywords: ['signature generator', 'digital signature', 'e-signature tool', 'email signature', 'professional signing'],
};

export default function SignatureGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/signature-generator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
