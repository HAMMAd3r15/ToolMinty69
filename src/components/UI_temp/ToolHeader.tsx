import React from 'react';

interface ToolHeaderProps {
    title: string;
    description: string;
}

export default function ToolHeader({ title, description }: ToolHeaderProps) {
    return (
        <div className="no-print" style={{
            textAlign: 'center',
            marginBottom: '4rem',
            maxWidth: '900px',
            margin: '0 auto 4rem'
        }}>
            <h1 style={{
                fontSize: '3rem',
                fontWeight: 900,
                marginBottom: '1.5rem',
                color: '#ffffff',
                letterSpacing: '-0.02em',
                lineHeight: 1.1
            }}>
                {title}
            </h1>
            <p style={{
                textAlign: 'center',
                color: '#ffffff',
                marginBottom: '0',
                fontSize: '1.2rem',
                lineHeight: '1.8',
                opacity: 0.9,
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                {description}
            </p>
        </div>
    );
}
