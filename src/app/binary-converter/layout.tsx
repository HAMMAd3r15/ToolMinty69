import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Binary Converter — Text to Binary & Back',
    description: 'Convert text to binary code and binary to text instantly. Essential developer tool for encoding and decoding.',
    keywords: ['binary converter', 'text to binary', 'binary to text', 'developer tool', 'encoding tool'],
};

export default function BinaryConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/binary-converter')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
