import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Layout/Header';
import JsonLd from '@/components/SEO/JsonLd';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://toolminty.com'),
  title: {
    default: 'ToolMinty — Free Online Calculators & Professional Digital Tools',
    template: '%s | ToolMinty'
  },
  description: 'Simple, fast, and free online calculators for age, finance, health, and productivity. Professional-grade tools designed for clarity and speed.',
  keywords: ['online calculators', 'free tools', 'age finder', 'loan emi', 'percentage calculator', 'unit converter', 'bmi calculator'],
  authors: [{ name: 'ToolMinty' }],
  creator: 'ToolMinty',
  publisher: 'ToolMinty',
  openGraph: {
    title: 'ToolMinty — Free Online Calculators & Digital Tools',
    description: 'The complete hub for fast, accurate, and professional online calculators.',
    url: 'https://toolminty.com',
    siteName: 'ToolMinty',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ToolMinty — Free Online Calculators & Digital Tools',
    description: 'The complete hub for fast, accurate, and professional online calculators.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/',
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ToolMinty",
  "url": "https://toolminty.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={inter.className}>
        <JsonLd data={websiteSchema} />
        <ThemeProvider>
          <Header />

          <main className="container" style={{ padding: '3rem 1.5rem', minHeight: 'calc(100vh - var(--header-height) - 100px)' }}>
            {children}
          </main>

          <footer style={{
            borderTop: '1px solid var(--color-border)',
            padding: '4rem 1.5rem',
            marginTop: 'auto',
            backgroundColor: 'var(--color-surface)',
            transition: 'background-color 0.2s, border-color 0.2s'
          }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
              <div>
                <h3 style={{ color: 'var(--color-text-primary)', marginBottom: '1.25rem', fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.04em' }}>ToolMinty</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Your professional hub for free, fast, and accurate online calculators. Precision tools for finance, health, and productivity.
                </p>
              </div>
              <div>
                <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '1.25rem', fontWeight: 700, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Popular Tools</h4>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <li><Link href="/loan-emi" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Loan EMI Calculator</Link></li>
                  <li><Link href="/bmi-calculator" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>BMI Calculator</Link></li>
                  <li><Link href="/compound-interest" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Compound Interest</Link></li>
                  <li><Link href="/exact-age" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Age Calculator</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '1.25rem', fontWeight: 700, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categories</h4>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <li><Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Finance Tools</Link></li>
                  <li><Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Health Calculators</Link></li>
                  <li><Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Productivity tools</Link></li>
                  <li><Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Developer Utilities</Link></li>
                </ul>
              </div>
              <div>
                <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '1.25rem', fontWeight: 700, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</h4>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <li><Link href="/about" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>About Us</Link></li>
                  <li><Link href="/contact" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Contact</Link></li>
                  <li><Link href="/privacy" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Privacy Policy</Link></li>
                  <li><Link href="/terms" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="container" style={{ margin: '4rem auto 0', textAlign: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '2.5rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
              <p>&copy; {new Date().getFullYear()} ToolMinty. Built for clarity, accuracy, and speed.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
