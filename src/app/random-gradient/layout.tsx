import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Random Gradient Generator — Free CSS Background Gradients | ToolMinty',
    description: 'Generate beautiful random CSS linear-gradient backgrounds instantly. Choose direction, copy the CSS code, and use in any web project. Free and instant.',
    alternates: { canonical: '/random-gradient' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/random-gradient')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
