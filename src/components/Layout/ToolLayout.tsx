import React from 'react';
import { Calculator } from '@/utils/calculators';
import { safeJsonLd } from '@/utils/security';

interface ToolLayoutProps {
    children: React.ReactNode;
    calculator?: Calculator;
}

export default function ToolLayout({ children, calculator }: ToolLayoutProps) {
    const title = calculator?.title || 'ToolMinty — Free Online Tools';
    const description = calculator?.description || 'Professional-grade digital tools for productivity, finance, and health.';
    const category = calculator?.category || 'Utility';

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': title,
        'description': description,
        'applicationCategory': category === 'Finance' ? 'BusinessApplication' : 'EducationalApplication',
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
