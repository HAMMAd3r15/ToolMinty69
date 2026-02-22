import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Body Measurement Tracker — Monitor Your Transformation',
    description: 'Log and track your weight, waist, and body dimensions over time. Visualize your fitness journey with our free measurement tool.',
    keywords: ['body measurement tracker', 'weight tracker', 'fitness progress', 'body dimension log', 'health tool'],
};

export default function BodyMeasurementsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/body-measurements')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
