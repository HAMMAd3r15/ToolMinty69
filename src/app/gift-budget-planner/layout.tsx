import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Gift Budget Planner — Thoughtful & Financial Planning',
    description: 'Manage your gift spending for birthdays, weddings, and holidays. Keep track of your thoughtful gestures with our free tool.',
    keywords: ['gift budget planner', 'gift list builder', 'spending tracker', 'holiday gifts', 'budget tool'],
};

export default function GiftBudgetLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/gift-budget-planner')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
