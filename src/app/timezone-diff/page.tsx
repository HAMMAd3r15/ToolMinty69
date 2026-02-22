import { Metadata } from 'next';
import TimezoneCalculator from './TimezoneCalculator';
import FAQSection from '../../components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Time Zone Difference Calculator - Compare City Times',
    description: 'Calculate the time difference between any two major cities in the world. See current times, time offsets, and working hour overlaps for global collaboration.',
};

export default function TimezoneDiffPage() {
    const faqs = [
        {
            question: "How is the time difference calculated?",
            answer: "The tool uses the international standard IANA Time Zone database to retrieve current offsets for each city, accounting for Daylight Saving Time (DST) automatically."
        },
        {
            question: "What does 'Standard Overlap' mean?",
            answer: "It calculates the number of hours where both cities share a typical 9:00 AM to 5:00 PM workday. This is helpful for scheduling international meetings or remote work syncs."
        },
        {
            question: "How do I find a city in the list?",
            answer: "With over 200 global cities available, we've included a search bar in the selector. Simply click the city name and start typing to filter the list instantly."
        },
        {
            question: "Is this tool mobile-friendly?",
            answer: "Yes, all our calculators are designed to be fully responsive and work seamlessly on phones, tablets, and desktops."
        }
    ];

    const calc = calculators.find(c => c.href === '/timezone-diff');

    return (
        <div>
            <ToolHeader
                title={calc?.title || 'Time Zone Difference'}
                description={calc?.description || 'Compare city times and find working hour overlaps.'}
            />

            <TimezoneCalculator />

            <FAQSection items={faqs} />
        </div>
    );
}
