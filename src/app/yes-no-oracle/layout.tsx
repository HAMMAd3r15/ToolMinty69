import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Yes or No Oracle — Instant Random Decision Maker | ToolMinty',
    description: 'Stop indecision with the Yes or No Oracle. Ask a question and get a definitive animated answer from the digital crystal ball.',
    alternates: { canonical: '/yes-no-oracle' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/yes-no-oracle')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
