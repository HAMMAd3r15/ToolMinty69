import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Bill Splitter — Split Expenses with Friends',
    description: 'Easily divide restaurant bills, rent, and other shared expenses among multiple people with our free splitting tool.',
    keywords: ['bill splitter', 'expense divider', 'shared costs', 'splitting tool', 'friend expenses'],
};

export default function BillSplitterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/bill-splitter')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
