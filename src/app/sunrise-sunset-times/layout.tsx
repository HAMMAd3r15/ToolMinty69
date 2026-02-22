import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Sunrise & Sunset Times — Global Sunlight Tool',
    description: 'Find exact sunrise and sunset times for any location on Earth. Plan your outdoor activities with precision.',
    keywords: ['sunrise times', 'sunset tracker', 'golden hour', 'astronomy tool', 'sunlight calculator'],
};

export default function SunriseSunsetLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/sunrise-sunset-times')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
