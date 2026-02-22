import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Hex Converter — Text to Hexadecimal & Back',
    description: 'Convert between text and hexadecimal values. A fast and reliable hex tool for developers and designers.',
    keywords: ['hex converter', 'text to hex', 'hex to text', 'developer tool', 'hex code generator'],
};

export default function HexConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/hex-converter')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
