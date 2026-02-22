import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Snake Game — Play Classic Retro Snake Online | ToolMinty',
    description: 'Play the classic retro Snake game online. Control the snake, eat food, and grow longer without hitting the walls or yourself. Free and fun arcade game.',
    alternates: { canonical: '/snake-game' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/snake-game')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
