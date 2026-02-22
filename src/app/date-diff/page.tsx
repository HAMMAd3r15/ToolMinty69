import { Metadata } from 'next';
import DateDiffCalculator from './DateDiffCalculator';
import FAQSection from '../../components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Date Difference Calculator - Days Between Two Dates',
    description: 'Calculate the specific time duration between two dates. Find out the number of years, months, and days between any two points in time.',
};

export default function DateDiffPage() {
    const faqs = [
        {
            question: "What does the Date Difference Calculator do?",
            answer: "It calculates the total duration between a start date and an end date, breaking it down into years, months, and days, as well as the total count of days."
        },
        {
            question: "Are the end dates included in the calculation?",
            answer: "By default, this calculator measures the duration *between* the days. It effectively counts the full 24-hour periods that have elapsed."
        },
        {
            question: "Can I calculate time between historical dates?",
            answer: "Yes, you can check the time elapsed between any two dates in history, making it useful for historians, students, or genealogists."
        }
    ];

    const calc = calculators.find(c => c.href === '/date-diff');

    return (
        <div>
            <ToolHeader
                title={calc?.title || 'Date Difference Calculator'}
                description={calc?.description || 'Calculate the specific time duration between two dates.'}
            />

            <DateDiffCalculator />

            <FAQSection items={faqs} />
        </div>
    );
}
