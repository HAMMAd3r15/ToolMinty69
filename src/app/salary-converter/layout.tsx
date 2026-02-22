import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Hourly to Salary Converter — Calculate Yearly Earnings',
    description: 'Translate your hourly wage into yearly, monthly, and weekly salary figures. Perfect for job offers and income planning.',
    keywords: ['salary converter', 'hourly to salary', 'wage calculator', 'income planner', 'pay checker'],
};

export default function SalaryConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/salary-converter')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
