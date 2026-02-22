import { Metadata } from 'next';
import AgeAtDateCalculator from './AgeAtDateCalculator';
import FAQSection from '../../components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Age on Specific Date Calculator - Past or Future Age',
    description: 'Find out exactly how old you were or will be on any specific date. Perfect for historical events, future milestones, and planning.',
};

export default function AgeAtDatePage() {
    const faqs = [
        {
            question: "How do I find out how old I was on a specific date?",
            answer: "Simply enter your date of birth and the target date (past or future). Our calculator will determine exactly how old you were (or will be) on that specific day."
        },
        {
            question: "Can I calculate my age for a future date?",
            answer: "Yes! This tool is perfect for planning. You can see exactly how old you will be for an upcoming wedding, graduation, or retirement date."
        },
        {
            question: "Does it account for leap years?",
            answer: "Yes, our algorithm fully accounts for leap years and the specific number of days in each month to ensure complete accuracy."
        }
    ];

    const calc = calculators.find(c => c.href === '/age-at-date');

    return (
        <div>
            <ToolHeader
                title={calc?.title || 'Age on Specific Date'}
                description={calc?.description || 'Find out exactly how old you were or will be on any specific date.'}
            />

            <AgeAtDateCalculator />

            <FAQSection items={faqs} />
        </div>
    );
}
