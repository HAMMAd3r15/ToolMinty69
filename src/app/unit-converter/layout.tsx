import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Unit Converter — Fast Measurement Conversions',
    description: 'Convert between length, weight, temperature, and volume instantly. Supports both metric and imperial units.',
    keywords: ['unit converter', 'measurement converter', 'metric conversion', 'imperial units', 'conversion tool'],
};

export default function UnitConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/unit-converter')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
