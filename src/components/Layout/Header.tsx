import Link from 'next/link';

export default function Header() {
    return (
        <header style={{
            height: 'var(--header-height)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--color-bg)',
            zIndex: 10,
            transition: 'background-color 0.2s, border-color 0.2s'
        }}>
            <div style={{
                width: '100%',
                maxWidth: 'var(--max-width)',
                padding: '0 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link href="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        fontSize: '1.5rem',
                        fontWeight: 900,
                        color: 'var(--color-text-primary)',
                        whiteSpace: 'nowrap',
                        letterSpacing: '-0.04em',
                        textDecoration: 'none'
                    }}>
                        ToolMinty
                    </Link>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} aria-label="Main Navigation">
                        <Link href="/" style={{ color: 'rgba(248, 250, 252, 0.8)', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }} className="nav-link">Tools</Link>
                        <Link href="/about" style={{ color: 'rgba(248, 250, 252, 0.8)', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }} className="nav-link">About</Link>
                        <Link href="/contact" style={{ color: 'rgba(248, 250, 252, 0.8)', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }} className="nav-link">Contact</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
