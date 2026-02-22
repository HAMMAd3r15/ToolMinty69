import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid var(--color-border)',
            padding: '2rem 1rem',
            marginTop: 'auto',
            backgroundColor: 'var(--color-surface)'
        }}>
            <div style={{
                maxWidth: 'var(--max-width)',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)'
            }}>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms of Service</Link>
                </div>
                <p>&copy; {new Date().getFullYear()} Age & Date Calculators. All rights reserved.</p>
            </div>
        </footer>
    );
}
