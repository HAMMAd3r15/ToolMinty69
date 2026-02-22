import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Tic Tac Toe — Play Online vs AI or 2 Players | ToolMinty',
    description: 'Play classic Tic Tac Toe online for free. Challenge the unbeatable Minimax AI or play against a friend in 2-player mode. Tracks scores across rounds.',
    alternates: { canonical: '/tic-tac-toe' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/tic-tac-toe')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
