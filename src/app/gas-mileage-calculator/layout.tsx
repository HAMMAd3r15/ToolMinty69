import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Gas Mileage Calculator — Fuel Efficiency Tracker',
    description: 'Calculate your vehicle\'s fuel efficiency in MPG or L/100km. Monitor your car\'s performance and save on gas.',
    keywords: ['gas mileage calculator', 'fuel efficiency', 'mpg calculator', 'car performance', 'save on gas'],
};

export default function GasMileageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/gas-mileage-calculator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
