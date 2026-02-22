import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Lucky Number Generator — Free Random Number Picker | ToolMinty',
    description: 'Generate random numbers instantly with our lucky number generator. Set your range, click to generate, and see your history. Fun, fast, and free.',
    alternates: { canonical: '/lucky-number' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/lucky-number')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
