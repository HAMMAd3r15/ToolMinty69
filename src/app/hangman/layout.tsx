import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Hangman — Free Online Word Guessing Game | ToolMinty',
    description: 'Play Hangman online for free. Guess the hidden word letter by letter before the hangman is complete. A classic vocabulary and word guessing game.',
    alternates: { canonical: '/hangman' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/hangman')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
