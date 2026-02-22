import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Text Analyzer — Deep Insights into Your Content',
    description: 'Analyze word frequency, character counts, and readability scores. Optimize your writing with our free text analysis tool.',
    keywords: ['text analyzer', 'readability checker', 'word frequency', 'writing tool', 'content analysis'],
};

export default function TextAnalyzerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/text-analyzer')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
