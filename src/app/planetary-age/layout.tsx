import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Planetary Age Calculator — How Old Are You in Space?',
    description: 'Discover your age on Mars, Jupiter, Venus, and other planets in our solar system. A fun and educational space age tool.',
    keywords: ['planetary age calculator', 'age on mars', 'space age', 'astronomy tool', 'fun calculator'],
};

export default function PlanetaryAgeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/planetary-age')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
