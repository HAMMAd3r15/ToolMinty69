import { Metadata } from 'next';
import ToolLayout from '@/components/Layout/ToolLayout';
import { calculators } from '@/utils/calculators';

export const metadata: Metadata = {
    title: 'Truth or Dare Generator — Fun Party Game Prompts | ToolMinty',
    description: 'Get random truth questions and dare challenges for your next party or get-together. Dozens of fun, PG-13 prompts for teens and adults alike.',
    alternates: { canonical: '/truth-or-dare' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const calc = calculators.find(c => c.href === '/truth-or-dare')!;
    return <ToolLayout calculator={calc}>{children}</ToolLayout>;
}
