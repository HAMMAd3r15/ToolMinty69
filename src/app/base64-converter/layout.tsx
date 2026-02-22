import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Base64 Converter — Secure Encoding & Decoding',
    description: 'Encode and decode Base64 strings. Perfect for handling data transmission and safe text representation.',
    keywords: ['base64 converter', 'base64 encode', 'base64 decode', 'developer tool', 'data encoding'],
};

export default function Base64ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/base64-converter')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
