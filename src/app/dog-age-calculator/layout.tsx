import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Dog Age Calculator — Human Years to Dog Years',
    description: 'Calculate your dog\'s age in human years accurately based on their size and breed category. Understand your pet\'s life stage.',
    keywords: ['dog age calculator', 'dog years to human years', 'pet health', 'animal age tool', 'canine age'],
};

export default function DogAgeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/dog-age-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
