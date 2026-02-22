import { Metadata } from 'next';
import DayOfWeekCalculator from './DayOfWeekCalculator';
import FAQSection from '../../components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Day of the Week Calculator - What Day Was It?',
    description: 'Find out the day of the week for any date in history or the future. Was it a Monday or a Saturday? Get the answer instantly.',
};

export default function DayOfWeekPage() {
    const faqs = [
        {
            question: "How far back can I calculate?",
            answer: "You can calculate the day of the week for virtually any date in common history. Our tool uses the Gregorian calendar system for accurate results."
        },
        {
            question: "Can I check a future date?",
            answer: "Yes. You can find out what day of the week a future holiday or birthday will fall on, helping you plan ahead."
        },
        {
            question: "Is this useful for finding my birth day?",
            answer: "Definetely. Many people know their birth date but not the day of the week they were born. This tool solves that mystery instantly."
        }
    ];

    const calc = calculators.find(c => c.href === '/day-of-week');

    return (
        <div>
            <ToolHeader
                title={calc?.title || 'Day of the Week'}
                description={calc?.description || 'Find out exactly what day of the week any date falls on.'}
            />

            <DayOfWeekCalculator />

            <FAQSection items={faqs} />
        </div>
    );
}
