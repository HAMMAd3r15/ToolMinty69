import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    fullWidth?: boolean;
}

export default function Button({
    children,
    variant = 'primary',
    fullWidth = false,
    style,
    ...props
}: ButtonProps) {
    const baseStyle: React.CSSProperties = {
        padding: '0.875rem 1.75rem',
        borderRadius: 'var(--radius-md)',
        fontWeight: 600,
        fontSize: '1rem',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        width: fullWidth ? '100%' : 'auto',
        opacity: props.disabled ? 0.6 : 1,
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: props.disabled ? 'none' : 'var(--shadow-sm)',
        transform: 'translateY(0)',
        letterSpacing: '-0.01em',
        ...style,
    };

    const variantStyles: Record<string, React.CSSProperties> = {
        primary: {
            backgroundColor: 'var(--color-secondary)',
            color: 'white',
            border: '1px solid transparent',
        },
        secondary: {
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
        },
    };

    // Add simple hover effect via style injection or just rely on CSS globally if we added a class. 
    // Since we are using inline styles mostly, we can add a class for hover.

    return (
        <button
            className={variant === 'primary' ? 'btn-primary' : 'btn-secondary'}
            style={{ ...baseStyle, ...variantStyles[variant] }}
            {...props}
        >
            {children}
        </button>
    );
}
