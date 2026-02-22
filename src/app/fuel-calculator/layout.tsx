import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Fuel Cost Calculator — Plan Your Trip Expenses',
    description: 'Estimate your trip gas costs based on distance, fuel efficiency, and gas prices. Perfect for road trip planning.',
    keywords: ['fuel cost calculator', 'gas calculator', 'trip expense', 'road trip planner', 'fuel efficiency'],
};

export default function FuelCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/fuel-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
