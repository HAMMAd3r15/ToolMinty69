import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Markdown Previewer — Real-time Editor & Viewer',
    description: 'Write and preview Markdown in real-time. See your formatted content instantly with our free, professional previewer.',
    keywords: ['markdown previewer', 'markdown editor', 'md viewer', 'writing tool', 'web editor'],
};

export default function MarkdownPreviewerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/markdown-previewer')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
