import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Memory Card Match — Free Brain Training Puzzle Game | ToolMinty',
    description: 'Test your memory with this free card matching game. Flip cards to find matching pairs in Easy, Medium, or Hard mode. Track moves and time.',
    alternates: { canonical: '/memory-match' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/memory-match')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
