import React from 'react';
import { Calculator } from '@/utils/calculators';
import { safeJsonLd } from '@/utils/security';

interface ToolLayoutProps {
    children: React.ReactNode;
    calculator: Calculator;
}

export default function ToolLayout({ children, calculator }: ToolLayoutProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': calculator.title,
        'description': calculator.description,
        'applicationCategory': calculator.category === 'Finance' ? 'BusinessApplication' : 'EducationalApplication',
        'operatingSystem': 'Any',
        'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
            />
            {children}
        </>
    );
}
