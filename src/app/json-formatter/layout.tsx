import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'JSON Formatter — Pretty Print & Validate JSON',
    description: 'Format and validate your JSON data instantly. Make complex JSON strings readable and error-free with our free tool.',
    keywords: ['json formatter', 'pretty print json', 'json validator', 'developer tool', 'data formatting'],
};

export default function JSONFormatterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/json-formatter')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
