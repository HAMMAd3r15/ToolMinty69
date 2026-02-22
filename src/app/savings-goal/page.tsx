import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export default function SavingsGoalPage() {
    const calc = calculators.find(c => c.href === '/savings-goal');

    if (!calc) return null;

    return (
        <ToolLayout calculator={calc}>
            <div className="elite-card p-6 text-center">
                <p className="text-gray-400">Savings Goal Calculator implementation coming soon or mapping to existing tool.</p>
            </div>
        </ToolLayout>
    );
}
