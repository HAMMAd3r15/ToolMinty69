import { Metadata } from 'next';
import BirthdayInfoCalculator from './BirthdayInfoCalculator';
import FAQSection from '../../components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Birthday Information Calculator - Zodiac & Day Born',
    description: 'Discover fun facts about your birth date. Find out the day you were born, your zodiac sign, and days until your next birthday.',
};

export default function BirthdayInfoPage() {
    const faqs = [
        {
            question: "What information will this show me?",
            answer: "It reveals the specific day of the week you were born on, your Western Zodiac sign, and a live countdown of days remaining until your next birthday."
        },
        {
            question: "Is the Zodiac sign accurate?",
            answer: "Yes, it determines your Zodiac sign based on standard tropical astrology dates."
        },
        {
            question: "Is this data private?",
            answer: "Completely. We do not store your birth date. All calculations happen right here in your browser."
        }
    ];

    const calc = calculators.find(c => c.href === '/birthday-info');

    return (
        <div>
            <ToolHeader
                title={calc?.title || 'Birthday Information'}
                description={calc?.description || 'Discover fun facts and countdowns for your special day.'}
            />

            <BirthdayInfoCalculator />

            <FAQSection items={faqs} />
        </div>
    );
}
