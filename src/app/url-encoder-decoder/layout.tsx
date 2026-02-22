import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'URL Encoder & Decoder — Prepare Links for the Web',
    description: 'Safely encode or decode URLs to ensure they work across browsers and servers. Fast and secure developer utility.',
    keywords: ['url encoder', 'url decoder', 'link tool', 'developer utility', 'web encoding'],
};

export default function URLEncoderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/url-encoder-decoder')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
