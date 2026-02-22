import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Typing Speed Test — Test Your WPM Online for Free | ToolMinty',
    description: 'Measure how fast you can type with our free online typing test. Get instant WPM (words per minute) and accuracy results. Practice to improve your speed.',
    alternates: { canonical: '/typing-test' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/typing-test')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
