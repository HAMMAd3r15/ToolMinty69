import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Epoch Converter — Unix Timestamp Finder',
    description: 'Convert Unix timestamps to human-readable dates and back. Essential tool for developers and server admins.',
    keywords: ['epoch converter', 'unix timestamp', 'time tool', 'developer utility', 'date converter'],
};

export default function EpochConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/epoch-converter')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
