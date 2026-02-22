import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Lorem Ipsum Generator — Professional Placeholder Text',
    description: 'Generate high-quality placeholder text for your designs and layouts. Customize paragraphs and words with our free tool.',
    keywords: ['lorem ipsum generator', 'placeholder text', 'dummy text', 'design tool', 'filler text'],
};

export default function LoremIpsumLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/lorem-ipsum-generator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
