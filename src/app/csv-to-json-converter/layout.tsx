import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'CSV to JSON Converter — Data Migration Tool',
    description: 'Convert your CSV data into clean JSON format instantly. Secure, local-running tool for developers and data analysts.',
    keywords: ['csv to json', 'data converter', 'migration tool', 'developer utility', 'csv parser'],
};

export default function CSVToJSONLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/csv-to-json-converter')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
