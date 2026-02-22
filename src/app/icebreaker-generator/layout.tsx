import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Random Icebreaker Questions — Spark Meaningful Conversations',
    description: 'Find the perfect conversation starter for social events or meetings. Our free tool provides creative icebreakers for any occasion.',
    keywords: ['icebreaker questions', 'conversation starters', 'social tools', 'networking icebreakers', 'fun questions'],
};

export default function IcebreakerGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/icebreaker-generator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
