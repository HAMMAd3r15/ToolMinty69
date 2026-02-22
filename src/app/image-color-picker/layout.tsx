import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Image Color Picker — Extract HEX & RGB from Any Photo | ToolMinty',
    description: 'Pick exact colors from any image. Upload a photo, hover to preview, and click to extract the precise HEX and RGB color code. All processing is done locally in your browser.',
    alternates: { canonical: '/image-color-picker' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/image-color-picker')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
