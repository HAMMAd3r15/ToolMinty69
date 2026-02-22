'use client';

import Link from 'next/link';
import { useState } from 'react';
import { calculators, Calculator } from '@/utils/calculators';
import SearchBar from '@/components/UI/SearchBar';

interface ToolGridProps {
    calculators: Calculator[];
}

export default function ToolGrid({ calculators: initialCalculators }: ToolGridProps) {
    const [activeCategory, setActiveCategory] = useState<'All' | 'Health' | 'Finance' | 'Fun' | 'Utility' | 'Chronology'>('All');

    const categories = ['All', 'Chronology', 'Finance', 'Health', 'Utility', 'Fun'];

    const filteredCalculators = (activeCategory === 'All'
        ? initialCalculators
        : initialCalculators.filter(c => c.category === activeCategory))
        .sort((a, b) => {
            if (a.isPopular && !b.isPopular) return -1;
            if (!a.isPopular && b.isPopular) return 1;
            return 0;
        });

    const popularTools = initialCalculators.filter(c => c.isPopular).slice(0, 10);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {/* Hero Section */}
            <section style={{
                textAlign: 'center',
                paddingTop: '3rem',
                paddingBottom: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
            }}>
                {/* Heading */}
                <div style={{ maxWidth: '1000px' }}>
                    <h1 style={{
                        fontSize: 'min(5.5rem, 11vw)',
                        fontWeight: 900,
                        color: 'var(--color-text-primary)',
                        letterSpacing: '-0.05em',
                        lineHeight: 0.95,
                        margin: 0
                    }}>
                        Calculators for <br />
                        <span style={{
                            color: '#2563eb',
                            textShadow: '0 0 40px rgba(37, 99, 235, 0.5)',
                            display: 'inline-block'
                        }}>everything.</span> Simple. Free.
                    </h1>
                </div>

                {/* Subheading */}
                <p style={{
                    maxWidth: '800px',
                    lineHeight: '1.4',
                    color: 'var(--color-text-tertiary)',
                    fontSize: '1.25rem',
                    margin: 0,
                    fontWeight: 500,
                    opacity: 0.9
                }}>
                    Fast, accurate, and completely free tools for your daily calculations. <br />
                    From mortgages to health metrics.
                </p>

                {/* Search Section */}
                <div style={{ width: '100%', maxWidth: '800px', marginTop: '1rem' }}>
                    <SearchBar />

                    {/* Popular Tags */}
                    <div style={{
                        marginTop: '2.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.85rem',
                        flexWrap: 'wrap'
                    }}>
                        <span style={{
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            color: 'var(--color-text-tertiary)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            marginRight: '0.25rem',
                            opacity: 0.7
                        }}>Popular:</span>
                        {popularTools.map((tool) => (
                            <Link
                                key={tool.title}
                                href={tool.href}
                                style={{
                                    fontSize: '0.8rem',
                                    padding: '0.6rem 1.25rem',
                                    backgroundColor: 'rgba(30, 41, 59, 0.4)',
                                    backdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '2rem',
                                    color: 'var(--color-text-primary)',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                }}
                                className="popular-tag"
                            >
                                {tool.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
                marginBottom: '1rem'
            }}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat as any)}
                        style={{
                            padding: '0.5rem 1.25rem',
                            borderRadius: '2rem',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            backgroundColor: activeCategory === cat ? '#2563eb' : 'rgba(30, 41, 59, 0.4)',
                            color: activeCategory === cat ? '#fff' : 'var(--color-text-secondary)',
                            border: activeCategory === cat ? '1px solid #2563eb' : '1px solid rgba(255, 255, 255, 0.05)',
                            boxShadow: activeCategory === cat ? '0 0 20px rgba(37, 99, 235, 0.3)' : 'none'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid Section */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                padding: '1rem 0'
            }}>
                {filteredCalculators.map((calc) => (
                    <Link key={calc.href} href={calc.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                        <div
                            style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.25rem',
                                padding: '2rem',
                                background: 'rgba(30, 41, 59, 0.3)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                borderRadius: '1.5rem',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            className="elite-tool-card"
                        >
                            {/* Badges Container */}
                            <div style={{
                                position: 'absolute',
                                top: '1.25rem',
                                right: '1.25rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                alignItems: 'flex-end',
                                zIndex: 2
                            }}>
                                {/* New Badge */}
                                {calc.isNew && (
                                    <div style={{
                                        background: 'linear-gradient(45deg, #2563eb, #6366f1)',
                                        color: '#fff',
                                        fontSize: '0.65rem',
                                        fontWeight: 900,
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '0.5rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        boxShadow: '0 4px 10px rgba(37, 99, 235, 0.4)',
                                    }}>
                                        New
                                    </div>
                                )}
                                {/* Popular Badge */}
                                {calc.isPopular && (
                                    <div style={{
                                        background: 'linear-gradient(45deg, #f59e0b, #ef4444)',
                                        color: '#fff',
                                        fontSize: '0.65rem',
                                        fontWeight: 900,
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '0.5rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        boxShadow: '0 4px 10px rgba(245, 158, 11, 0.4)',
                                    }}>
                                        Popular
                                    </div>
                                )}
                            </div>

                            {/* Icon Container */}
                            <div style={{
                                fontSize: '2.25rem',
                                width: '60px',
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(37, 99, 235, 0.1)',
                                borderRadius: '1rem',
                                border: '1px solid rgba(37, 99, 235, 0.2)'
                            }}>
                                {calc.icon}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <h2 style={{
                                    fontSize: '1.15rem',
                                    fontWeight: 700,
                                    margin: 0,
                                    color: '#fff',
                                    letterSpacing: '-0.02em'
                                }}>
                                    {calc.title}
                                </h2>
                                <p style={{
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.6',
                                    margin: 0,
                                    fontWeight: 400
                                }}>
                                    {calc.description}
                                </p>
                            </div>

                            {/* Arrow Decoration */}
                            <div className="card-arrow" style={{
                                position: 'absolute',
                                bottom: '1.5rem',
                                right: '1.5rem',
                                opacity: 0,
                                transition: 'all 0.3s ease',
                                transform: 'translateX(-10px)'
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <style jsx>{`
        .elite-tool-card:hover {
          transform: translateY(-10px) scale(1.02);
          background: rgba(30, 41, 59, 0.5);
          border-color: rgba(37, 99, 235, 0.4);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 25px -5px rgba(37, 99, 235, 0.2);
        }
        .elite-tool-card:hover .card-arrow {
          opacity: 0.8;
          transform: translateX(0);
          color: #2563eb;
        }
      `}</style>
        </div>
    );
}
