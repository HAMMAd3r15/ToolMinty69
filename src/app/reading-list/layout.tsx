import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Reading List Tracker — Organize Your Books',
    description: 'Keep track of your reading progress and organize your literary adventures. Stay committed to your learning goals with our free book tracker.',
    keywords: ['reading list tracker', 'book tracker', 'reading log', 'literary planner', 'reading goals'],
};

export default function ReadingListLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/reading-list')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
