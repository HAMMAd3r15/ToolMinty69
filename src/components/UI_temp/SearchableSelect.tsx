'use client';

import { useState, useRef, useEffect } from 'react';

interface Item {
    name: string;
    [key: string]: any;
}

interface SearchableSelectProps {
    label: string;
    items: Item[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchableSelect({ label, items, value, onChange, placeholder = "Search..." }: SearchableSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '0.4rem' }}>
                {label}
            </label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="input"
                style={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.75rem 1rem'
                }}
            >
                <span style={{ color: value ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }}>
                    {value || 'Select a city'}
                </span>
                <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>▼</span>
            </div>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    marginTop: '0.5rem',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    overflow: 'hidden',
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                        <input
                            type="text"
                            autoFocus
                            placeholder={placeholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.5rem 0.75rem',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--color-border)',
                                backgroundColor: 'var(--color-bg)',
                                color: 'var(--color-text-primary)',
                                outline: 'none',
                                fontSize: '0.9rem'
                            }}
                        />
                    </div>
                    <div style={{ maxHeight: '250px', overflowY: 'auto' }} className="no-scrollbar">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <div
                                    key={item.name}
                                    onClick={() => {
                                        onChange(item.name);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        cursor: 'pointer',
                                        fontSize: '0.95rem',
                                        color: item.name === value ? 'var(--color-secondary)' : 'var(--color-text-primary)',
                                        backgroundColor: item.name === value ? 'rgba(79, 70, 229, 0.05)' : 'transparent',
                                        transition: 'background-color 0.15s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(79, 70, 229, 0.1)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = item.name === value ? 'rgba(79, 70, 229, 0.05)' : 'transparent'}
                                >
                                    {item.name}
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-tertiary)', fontSize: '0.9rem' }}>
                                No cities found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
