import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | ToolMinty',
    description: 'Terms of Service for ToolMinty — online calculators and digital tools.',
    alternates: {
        canonical: '/terms',
    },
    openGraph: {
        title: 'Terms of Service - ToolMinty',
        description: 'The terms and conditions for using ToolMinty.',
        url: 'https://toolminty.com/terms',
        type: 'website',
    },
};

export default function TermsPage() {
    return (
        <article style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>Terms of Service</h1>
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h2>1. Acceptance of Terms</h2>
            <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>2. Use License</h2>
            <p>
                Permission is granted to temporarily view the materials (information or software) on Age & Date Calculators for personal, non-commercial transitory viewing only.
            </p>

            <h2>3. Disclaimer</h2>
            <p>
                The materials on Age & Date Calculators are provided &quot;as is&quot;.
                We make no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
                Further, we do not guarantee the accuracy of results, although we strive for precision.
                Do not use these calculations for critical legal, medical, or financial decisions.
            </p>

            <h2>4. Limitations</h2>
            <p>
                In no event shall Age & Date Calculators be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.
            </p>
        </article>
    );
}
