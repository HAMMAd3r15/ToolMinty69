import { Metadata } from 'next';
import DaysUntilCalculator from './DaysUntilCalculator';
import FAQSection from '../../components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Days Until Calculator - Count Days Remaining',
    description: 'Calculate exactly how many days are left until a future date or how many days have passed since a past event. Perfect for countdowns and anniversaries.',
};

export default function DaysUntilPage() {
    const faqs = [
        {
            question: "Can I use this for countdowns?",
            answer: "Yes! Enter any future date—like a vacation, wedding, or holiday—to see exactly how many days are remaining."
        },
        {
            question: "Does it calculate days since a past event?",
            answer: "Absolutely. If you enter a past date, the tool will flip to show you how many days have elapsed since that event, making it great for tracking sobriety, anniversaries, or project milestones."
        },
        {
            question: "Is the calculation inclusive of today?",
            answer: "The calculation counts the full days between today and the target date. It does not typically include the target date itself in the 'days remaining' count, similar to how you would say 'tomorrow is 1 day away'."
        }
    ];

    const calc = calculators.find(c => c.href === '/days-until');

    return (
        <div>
            <ToolHeader
                title={calc?.title || 'Days Until / Since'}
                description={calc?.description || 'Count exactly how many days are left until a future date or passed since an event.'}
            />

            <DaysUntilCalculator />

            <FAQSection items={faqs} />
        </div>
    );
}
