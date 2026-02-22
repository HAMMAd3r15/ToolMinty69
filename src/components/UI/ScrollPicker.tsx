'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ScrollPickerProps {
    items: { label: string; value: string | number }[];
    value: string | number;
    onChange: (value: string | number) => void;
    height?: number; // Total height of the picker
    itemHeight?: number; // Height of each item
}

export default function ScrollPicker({
    items,
    value,
    onChange,
    height = 200,
    itemHeight = 40
}: ScrollPickerProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const isScrolling = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const spacerHeight = (height - itemHeight) / 2;

    // Local state for smooth visual updates independent of parent state
    const [activeIndex, setActiveIndex] = useState(() => {
        return Math.max(0, items.findIndex(item => item.value === value));
    });

    // Sync local state when external value changes (and not scrolling)
    useEffect(() => {
        if (!isScrolling.current) {
            const index = items.findIndex(item => item.value === value);
            if (index !== -1) {
                setActiveIndex(index);
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = index * itemHeight;
                }
            }
        }

        // Cleanup timeout on unmount
        return () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [value, items, itemHeight]);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        isScrolling.current = true;

        // Calculate active index immediately for smooth visual feedback
        const scrollTop = scrollRef.current.scrollTop;
        const index = Math.round(scrollTop / itemHeight);
        const safeIndex = Math.max(0, Math.min(index, items.length - 1));

        // Update visual state immediately
        if (safeIndex !== activeIndex) {
            setActiveIndex(safeIndex);
        }

        // Debounce the actual commit
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        scrollTimeoutRef.current = setTimeout(() => {
            isScrolling.current = false;

            // Commit change
            const selectedItem = items[safeIndex];
            if (selectedItem && selectedItem.value !== value) {
                onChange(selectedItem.value);
            }
        }, 150); // Slightly longer debounce to ensure settle
    };

    return (
        <div
            style={{
                height: height,
                position: 'relative',
                userSelect: 'none',
                width: '100%'
            }}
        >
            {/* Highlight Bar */}
            <div style={{
                position: 'absolute',
                top: (height - itemHeight) / 2,
                left: 0,
                right: 0,
                height: itemHeight,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                pointerEvents: 'none',
                zIndex: 1
            }} />

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                style={{
                    height: '100%',
                    overflowY: 'auto',
                    scrollSnapType: 'y mandatory',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    position: 'relative',
                    zIndex: 2,
                    paddingTop: spacerHeight,
                    paddingBottom: spacerHeight,
                    boxSizing: 'border-box'
                }}
                className="no-scrollbar"
            >
                {items.map((item, index) => {
                    // Calculate distance for smoother scaling
                    const isActive = index === activeIndex;

                    return (
                        <div
                            key={item.value}
                            style={{
                                height: itemHeight,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                scrollSnapAlign: 'center', // Changed to center for better alignment
                                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                                fontSize: isActive ? '1.1rem' : '0.9rem',
                                fontWeight: isActive ? 600 : 400,
                                transition: 'transform 0.1s ease-out, opacity 0.1s ease-out', // Faster transition
                                opacity: isActive ? 1 : 0.4,
                                transform: isActive ? 'scale(1.1)' : 'scale(0.95)',
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                // Allow click to select
                                if (scrollRef.current) {
                                    scrollRef.current.scrollTo({
                                        top: index * itemHeight,
                                        behavior: 'smooth'
                                    });
                                }
                            }}
                        >
                            {item.label}
                        </div>
                    );
                })}
            </div>

            {/* Gradient Overlays */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: spacerHeight,
                background: 'linear-gradient(to bottom, var(--color-bg) 0%, transparent 100%)', // Match bg exactly
                pointerEvents: 'none',
                zIndex: 3
            }} />
            <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0, height: spacerHeight,
                background: 'linear-gradient(to top, var(--color-bg) 0%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 3
            }} />
        </div>
    );
}
