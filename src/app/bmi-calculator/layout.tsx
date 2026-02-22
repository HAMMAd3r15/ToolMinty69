import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'BMI Calculator — Check Your Body Mass Index Online',
    description: 'Calculate your Body Mass Index (BMI) instantly. Understand your weight category and healthy range with our free health tool.',
    keywords: ['bmi calculator', 'body mass index', 'health tool', 'weight checker', 'fitness calculator'],
};

export default function BMICalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/bmi-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
