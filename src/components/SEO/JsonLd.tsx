import React from 'react';
import { safeJsonLd } from '@/utils/security';

interface JsonLdProps {
    data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
        />
    );
}
