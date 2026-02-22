import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Secure Password Generator — Protect Your Accounts',
    description: 'Create strong, random, and secure passwords instantly. Protect your digital life with our free, local-running security tool.',
    keywords: ['password generator', 'secure password', 'random password', 'security tool', 'password builder'],
};

export default function PasswordGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const calc = calculators.find(c => c.href === '/password-generator')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
