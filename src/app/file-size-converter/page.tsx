import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export default function FileSizeConverterPage() {
    const calc = calculators.find(c => c.href === '/file-size-converter');

    if (!calc) return null;

    return (
        <ToolLayout calculator={calc}>
            <div className="elite-card p-6 text-center">
                <p className="text-gray-400">File Size Converter implementation coming soon.</p>
            </div>
        </ToolLayout>
    );
}
