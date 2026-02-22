import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Birthday Card Generator — Create Personalized Cards',
    description: 'Design and export high-quality birthday cards instantly. Celebrate your loved ones with specialized messages and designs.',
    keywords: ['birthday card generator', 'custom greeting cards', 'card maker', 'birthday tool', 'printable cards'],
};

export default function BirthdayCardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/birthday-card')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
