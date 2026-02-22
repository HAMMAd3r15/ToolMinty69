import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Case Converter — Text Transformation Tool',
    description: 'Easily convert text between Title Case, Sentence Case, UPPERCASE, and lowercase. Save time on text formatting.',
    keywords: ['case converter', 'text formatter', 'title case tool', 'sentence case', 'text styling'],
};

export default function CaseConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/case-converter')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
