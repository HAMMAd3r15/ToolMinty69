import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Simple QR Generator — Create Custom QR Codes Instantly',
    description: 'Create unique QR codes for your links or text with our secure, locally-running tool. Perfect for flyers, business cards, and more.',
    keywords: ['qr generator', 'custom qr code', 'link to qr', 'qr code tool', 'offline qr generator'],
};

export default function QRGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/qr-generator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
