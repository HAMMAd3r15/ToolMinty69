import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Party Budget Planner — Event Expense Tracker',
    description: 'Organize your next event without breaking the bank. Track speakers, venue, and catering costs with our free party planner.',
    keywords: ['party budget planner', 'event cost tracker', 'party planning', 'celebration budget', 'event planner'],
};

export default function PartyBudgetLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/party-budget-planner')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
