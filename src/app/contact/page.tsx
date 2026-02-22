import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | ToolMinty',
    description: 'Get in touch with the team at ToolMinty. We welcome your feedback, questions, and suggestions.',
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: 'Contact ToolMinty',
        description: 'Reach out to us for feedback or inquiries.',
        url: 'https://toolminty.com/contact',
        type: 'website',
    },
};

export default function ContactPage() {
    return (
        <article style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            <h1 style={{ color: 'var(--color-primary)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Contact Us</h1>

            <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
                Have questions, suggestions, or feedback? We'd love to hear from you!
                Our goal is to make these tools as helpful as possible, and your input helps us improve.
            </p>

            <div style={{
                backgroundColor: 'var(--color-surface)',
                padding: '2rem',
                borderRadius: '1rem',
                border: '1px solid var(--color-border)',
                marginBottom: '2rem'
            }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Email Us Directly</h2>
                <p style={{ marginBottom: '0.5rem' }}>For all inquiries, please reach out to us at:</p>
                <a
                    href="mailto:jamespotter.designs@gmail.com"
                    style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--color-secondary)',
                        textDecoration: 'none',
                        wordBreak: 'break-all'
                    }}
                >
                    jamespotter.designs@gmail.com
                </a>
            </div>

            <h2 style={{ color: 'var(--color-primary)', fontSize: '1.75rem', marginTop: '2rem', marginBottom: '1rem' }}>Feedback & Suggestions</h2>
            <p style={{ marginBottom: '1.5rem' }}>
                Found a bug? Have an idea for a new calculator? Or just want to say thanks?
                Don't hesitate to drop us an email. We typically respond within 24-48 hours.
            </p>

            <p style={{ marginTop: '3rem', fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
                Thank you for your support!
            </p>
        </article>
    );
}
