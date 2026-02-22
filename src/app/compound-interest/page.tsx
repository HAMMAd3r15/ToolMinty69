import { Metadata } from 'next';
import { calculators } from '@/utils/calculators';
import CompoundInterestForm from './CompoundInterestForm';

export async function generateMetadata(): Promise<Metadata> {
    const calcInfo = calculators.find(c => c.href === '/compound-interest');

    if (!calcInfo) return {};

    return {
        title: calcInfo.title,
        description: calcInfo.description,
        keywords: calcInfo.keywords,
        alternates: {
            canonical: calcInfo.href,
        },
        openGraph: {
            title: `${calcInfo.title} | ToolMinty`,
            description: calcInfo.description,
            url: `https://toolminty.com${calcInfo.href}`,
            type: 'website',
        },
    };
}

export default function CompoundInterestPage() {
    return <CompoundInterestForm />;
}
