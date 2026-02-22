import React from 'react';

interface ResultCardProps {
    title: string;
    value: string | number | React.ReactNode;
    subtitle?: string;
    highlight?: boolean;
    color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
}

export default function ResultCard({
    title,
    value,
    subtitle,
    highlight = false,
    color = 'primary'
}: ResultCardProps) {
    const getColorValue = (colorName: string) => {
        switch (colorName) {
            case 'primary': return 'var(--color-primary)';
            case 'secondary': return 'var(--color-secondary)';
            case 'accent': return 'var(--color-accent)';
            case 'success': return '#10b981';
            case 'warning': return '#f59e0b';
            case 'error': return '#ef4444';
            default: return 'var(--color-primary)';
        }
    };

    const activeColor = getColorValue(color);

    return (
        <div
            className="result-card"
            style={{
                background: highlight
                    ? `linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(30, 41, 59, 0.4) 100%)`
                    : 'rgba(30, 41, 59, 0.4)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: highlight
                    ? `1px solid rgba(37, 99, 235, 0.3)`
                    : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '1.25rem',
                padding: '1.75rem',
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: highlight
                    ? '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 20px -5px rgba(37, 99, 235, 0.2)'
                    : '0 10px 30px -10px rgba(0, 0, 0, 0.3)',
                cursor: 'default',
            }}
        >
            {/* Glossy Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            }} />

            <h3 style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: highlight ? '#60a5fa' : 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                margin: 0,
                opacity: 0.8
            }}>
                {title}
            </h3>

            <div style={{
                fontSize: highlight ? '2.75rem' : '2.25rem',
                fontWeight: 900,
                color: activeColor,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                margin: '0.25rem 0',
                textShadow: highlight ? `0 0 30px ${activeColor}40` : 'none',
            }}>
                {value}
            </div>

            {subtitle && (
                <p style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    margin: 0,
                    fontWeight: 500,
                    lineHeight: 1.4
                }}>
                    {subtitle}
                </p>
            )}

            {/* Accent light */}
            {highlight && (
                <div style={{
                    position: 'absolute',
                    bottom: '-20%',
                    right: '-10%',
                    width: '100px',
                    height: '100px',
                    background: activeColor,
                    filter: 'blur(60px)',
                    opacity: 0.15,
                    pointerEvents: 'none'
                }} />
            )}
        </div>
    );
}
