import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'SQL Formatter — Beautify & Validate Queries',
    description: 'Format your SQL queries for better readability. Support for multiple dialects and instant validation.',
    keywords: ['sql formatter', 'query beautifier', 'database tool', 'sql validator', 'developer tool'],
};

export default function SQLFormatterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/sql-formatter')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
