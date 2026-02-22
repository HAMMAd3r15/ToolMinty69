import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Word Counter — Accurate Word & Character Count',
    description: 'Count words and characters in real-time. Perfect for essays, social media posts, and professional writing.',
    keywords: ['word counter', 'character count', 'writing tool', 'essay checker', 'text counter'],
};

export default function WordCounterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/word-counter')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
