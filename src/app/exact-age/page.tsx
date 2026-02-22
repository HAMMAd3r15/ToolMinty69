import { Metadata } from 'next';
import ExactAgeCalculator from './ExactAgeCalculator';
import FAQSection from '../../components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function ExactAgePage() {
    const faqs = [
        {
            question: "How does the Exact Age Calculator work?",
            answer: "Our calculator takes your date of birth and compares it to the current date (or a specific date you choose). It accounts for leap years and the varying number of days in each month to give you a precise answer in years, months, and days."
        },
        {
            question: "Is this age calculator accurate?",
            answer: "Yes, this tool is designed to be 100% accurate. It uses precise calendar logic to ensure that leap days and specific month lengths are correctly factored into your total age."
        },
        {
            question: "Can I calculate someone else's age?",
            answer: "Absolutely. You can enter any date of birth to find out the exact age of a friend, family member, or historical figure."
        },
        {
            question: "Does this calculator store my birth date?",
            answer: "No. We respect your privacy. All calculations are performed instantly on your device, and no personal data is ever stored or sent to a server."
        }
    ];

    const calc = calculators.find(c => c.href === '/exact-age');

    return (
        <div>
            <ToolHeader
                title={calc?.title || 'Exact Age Calculator'}
                description={calc?.description || 'Calculate your precise age in years, months, and days.'}
            />

            <ExactAgeCalculator />

            <FAQSection items={faqs} />
        </div>
    );
}
