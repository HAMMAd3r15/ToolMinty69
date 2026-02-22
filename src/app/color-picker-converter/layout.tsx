import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Color Picker & Converter — Design & Hex Tool',
    description: 'Find the perfect colors and convert between HEX, RGB, and HSL. Essential tool for designers and front-end developers.',
    keywords: ['color picker', 'hex converter', 'design tool', 'rgb to hex', 'frontend utility'],
};

export default function ColorPickerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/color-picker-converter')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
