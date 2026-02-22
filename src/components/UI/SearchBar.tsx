'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { calculators, Calculator } from '@/utils/calculators';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<Calculator[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (query.trim()) {
            const filtered = calculators.filter(calc =>
                calc.title.toLowerCase().includes(query.toLowerCase()) ||
                calc.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
            ).slice(0, 5);
            setResults(filtered);
            setIsOpen(true);
        } else {
            setResults([]);
            setIsOpen(false);
        }
        setSelectedIndex(-1);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
            handleSearch();
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    const handleSearch = () => {
        if (selectedIndex >= 0) {
            router.push(results[selectedIndex].href);
            setIsOpen(false);
            setQuery('');
        } else if (results.length > 0) {
            router.push(results[0].href);
            setIsOpen(false);
            setQuery('');
        }
    };

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(37, 99, 235, 0.15)',
                borderRadius: '1.25rem',
                padding: '0.45rem',
                boxShadow: '0 0 30px rgba(37, 99, 235, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }} className="search-container">
                <div style={{ paddingLeft: '1.5rem', display: 'flex', alignItems: 'center' }}>
                    <svg
                        style={{
                            width: '24px',
                            height: '24px',
                            color: 'rgba(148, 163, 184, 0.8)'
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search 100+ tools (e.g., 'Mortgage', 'BMI', 'Days until...')"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.trim() && setIsOpen(true)}
                    aria-label="Search for tools"
                    style={{
                        flex: 1,
                        padding: '1.1rem 1.25rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#f8fafc',
                        outline: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 400
                    }}
                />
                <button
                    onClick={handleSearch}
                    aria-label="Execute search"
                    style={{
                        backgroundColor: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.8rem',
                        padding: '0.9rem 2.2rem',
                        fontSize: '1rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
                    }}
                    className="search-button"
                >
                    Search
                </button>
            </div>

            {isOpen && results.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    marginTop: '0.75rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '1rem',
                    boxShadow: 'var(--shadow-lg)',
                    overflow: 'hidden',
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    {results.map((calc, index) => (
                        <div
                            key={calc.href}
                            onClick={() => {
                                router.push(calc.href);
                                setIsOpen(false);
                                setQuery('');
                            }}
                            onMouseEnter={() => setSelectedIndex(index)}
                            style={{
                                padding: '1rem 1.25rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                backgroundColor: index === selectedIndex ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
                                transition: 'background-color 0.15s'
                            }}
                        >
                            <span style={{ fontSize: '1.5rem' }}>{calc.icon}</span>
                            <div>
                                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'white' }}>{calc.title}</div>
                                <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>{calc.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
                .search-container:focus-within {
                    border-color: rgba(37, 99, 235, 0.5);
                    box-shadow: 0 0 25px rgba(37, 99, 235, 0.25);
                }
                .search-button:hover {
                    background-color: #1d4ed8;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
                }
                .search-button:active {
                    transform: translateY(0);
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
