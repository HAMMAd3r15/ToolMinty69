import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Grocery List Builder — Effortless Shopping Prep',
    description: 'Organize your shopping with our free Grocery List Builder. Sort items by category and store aisle for a faster trip.',
    keywords: ['grocery list builder', 'shopping list', 'meal prep tool', 'organic checklist', 'shopping planner'],
};

export default function GroceryListLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/grocery-list')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
