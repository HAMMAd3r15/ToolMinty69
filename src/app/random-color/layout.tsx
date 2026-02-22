import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Random Color Generator — HEX, RGB & HSL Color Picker | ToolMinty',
    description: 'Generate beautiful random colors and palettes instantly. Get HEX, RGB, and HSL codes, and create harmonious 5-color palettes for your designs.',
    alternates: { canonical: '/random-color' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/random-color')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
