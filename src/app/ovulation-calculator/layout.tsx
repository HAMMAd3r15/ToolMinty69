import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Ovulation Calculator — Find Your Most Fertile Days',
    description: 'Track your menstrual cycle and identify your fertile window with our free Ovulation Calculator. Plan your pregnancy journey with confidence.',
    keywords: ['ovulation calculator', 'fertility tracker', 'fertile window', 'pregnancy planning', 'menstrual cycle tool'],
};

export default function OvulationCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/ovulation-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
