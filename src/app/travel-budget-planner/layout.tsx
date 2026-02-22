import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Travel Budget Planner — Plan Your Next Adventure',
    description: 'Estimate the total cost of your next trip. Log flights, accommodation, and daily spending with our free travel tool.',
    keywords: ['travel budget planner', 'vacation cost', 'trip planner', 'travel expenses', 'adventure budget'],
};

export default function TravelBudgetLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/travel-budget-planner')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
