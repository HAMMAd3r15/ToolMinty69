import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Simple Portfolio Builder — Launch Your Online Presence',
    description: 'Create a clean and polished professional portfolio instantly. Showcase your work and skills with our free online builder.',
    keywords: ['portfolio builder', 'personal webpage', 'career tool', 'freelance portfolio', 'resume builder'],
};

export default function PortfolioBuilderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/portfolio-builder')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
