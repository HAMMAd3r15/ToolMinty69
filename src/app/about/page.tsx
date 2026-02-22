import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - ToolMinty',
    description: 'Learn more about ToolMinty and our mission to provide simple, accurate, and free online calculators.',
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'About ToolMinty',
        description: 'Providing fast, accurate, and free online calculators for everyone.',
        url: 'https://toolminty.com/about',
        type: 'website',
    },
};

export default function AboutPage() {
    return (
        <article style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
            <h1 style={{ color: 'var(--color-primary)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>About Us</h1>

            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
                Welcome to <strong>Age & Date Calculators</strong>, your reliable destination for simple, fast, and accurate time-related tools.
                Whether you're curious about your exact age, planning for an upcoming event, or needing to calculate the difference between two dates,
                we've built these tools to provide instant answers with ease.
            </p>

            <h2 style={{ color: 'var(--color-primary)', fontSize: '1.75rem', marginTop: '2rem', marginBottom: '1rem' }}>Our Mission</h2>
            <p style={{ marginBottom: '1.5rem' }}>
                Our mission is to simplify date and time calculations. We believe that utility tools should be straightforward,
                accessible, and provide value without unnecessary complexity. We are constantly working to improve our existing tools
                and develop new ones to meet your needs.
            </p>

            <h2 style={{ color: 'var(--color-primary)', fontSize: '1.75rem', marginTop: '2rem', marginBottom: '1rem' }}>Why Choose Our Tools?</h2>
            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                <li><strong>Accuracy:</strong> Our algorithms are carefully designed to handle leap years, varying month lengths, and timezones.</li>
                <li><strong>Simplicity:</strong> No signups, no complex forms—just enter your dates and get your results instantly.</li>
                <li><strong>Privacy-Focused:</strong> Most of our calculations happen locally in your browser, keeping your data private.</li>
            </ul>

            <p style={{ marginTop: '3rem', fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
                Thank you for using Age & Date Calculators. We hope you find our tools helpful!
            </p>
        </article>
    );
}
