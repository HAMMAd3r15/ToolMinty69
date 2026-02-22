import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Holiday Budget Planner — Stress-Free Festive Planning',
    description: 'Plan your holiday gifts, travel, and food expenses. Stay on budget this festive season with our free planner.',
    keywords: ['holiday budget planner', 'christmas budget', 'festive spending', 'gift planner', 'seasonal budget'],
};

export default function HolidayBudgetLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/holiday-budget-planner')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
