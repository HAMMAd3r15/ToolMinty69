'use client';

import { useState, useRef } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

interface GroceryItem {
    id: string;
    item: string;
    category: string;
    qty: number;
}

const CATEGORIES = ['Produce', 'Dairy', 'Meat', 'Bakery', 'Frozen', 'Pantry', 'Household', 'Other'];

const CATEGORY_COLORS: Record<string, string> = {
    Produce: '#22c55e',
    Dairy: '#60a5fa',
    Meat: '#f87171',
    Bakery: '#fb923c',
    Frozen: '#818cf8',
    Pantry: '#fbbf24',
    Household: '#34d399',
    Other: '#94a3b8',
};

interface CustomDropdownProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

function CustomDropdown({ options, value, onChange }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ position: 'relative', userSelect: 'none', minWidth: '130px' }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: `1px solid ${isOpen ? 'rgba(99, 102, 241, 0.7)' : 'rgba(255, 255, 255, 0.1)'}`,
                    padding: '0.75rem 1.1rem',
                    borderRadius: '0.85rem',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isOpen ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    gap: '0.65rem',
                    whiteSpace: 'nowrap',
                }}
            >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: CATEGORY_COLORS[value] || '#94a3b8', flexShrink: 0 }} />
                    {value}
                </span>
                <span style={{
                    width: '8px', height: '8px',
                    borderRight: '2px solid rgba(255,255,255,0.5)',
                    borderBottom: '2px solid rgba(255,255,255,0.5)',
                    transform: isOpen ? 'rotate(-135deg)' : 'rotate(45deg)',
                    transition: 'transform 0.3s ease',
                    marginTop: isOpen ? '3px' : '-3px',
                    display: 'inline-block',
                    flexShrink: 0,
                }} />
            </div>

            {isOpen && (
                <>
                    <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 10 }} />
                    <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 0.5rem)',
                        left: 0,
                        right: 0,
                        minWidth: '160px',
                        background: 'rgba(10, 18, 36, 0.97)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '1rem',
                        padding: '0.5rem',
                        zIndex: 100,
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
                        animation: 'ddSlide 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}>
                        {options.map(opt => (
                            <div
                                key={opt}
                                onClick={() => { onChange(opt); setIsOpen(false); }}
                                style={{
                                    padding: '0.65rem 1rem',
                                    borderRadius: '0.65rem',
                                    color: value === opt ? '#fff' : 'rgba(255,255,255,0.7)',
                                    background: value === opt ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                                    cursor: 'pointer',
                                    fontWeight: value === opt ? 700 : 400,
                                    fontSize: '0.9rem',
                                    transition: 'all 0.15s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.65rem',
                                    borderLeft: value === opt ? '3px solid rgba(99,102,241,0.8)' : '3px solid transparent',
                                }}
                                onMouseEnter={e => {
                                    if (value !== opt) {
                                        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.06)';
                                        (e.currentTarget as HTMLDivElement).style.color = '#fff';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (value !== opt) {
                                        (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                                        (e.currentTarget as HTMLDivElement).style.color = 'rgba(255,255,255,0.7)';
                                    }
                                }}
                            >
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: CATEGORY_COLORS[opt] || '#94a3b8', flexShrink: 0 }} />
                                {opt}
                            </div>
                        ))}
                    </div>
                </>
            )}

            <style jsx>{`
                @keyframes ddSlide {
                    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}

// ── hex → [r, g, b] ─────────────────────────────────────────────────────────
function hexToRgb(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

export default function GroceryList() {
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('Produce');
    const [qty, setQty] = useState(1);
    const [items, setItems] = useState<GroceryItem[]>([]);
    const [downloading, setDownloading] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);

    const addItem = () => {
        if (!itemName.trim()) return;
        setItems([...items, { id: Date.now().toString(), item: itemName.trim(), category, qty }]);
        setItemName('');
        setQty(1);
    };

    const removeItem = (id: string) => setItems(items.filter(i => i.id !== id));

    const groupedItems = CATEGORIES.reduce((acc, cat) => {
        const filtered = items.filter(i => i.category === cat);
        if (filtered.length > 0) acc[cat] = filtered;
        return acc;
    }, {} as Record<string, GroceryItem[]>);

    // ── PNG export (plain canvas — no extra library needed) ──────────────────
    const downloadAsPng = () => {
        if (items.length === 0) return;
        setDownloading(true);

        const PAD = 40;
        const COL_W = 340;
        const COLS = 2;
        const ROW_H = 36;
        const CAT_H = 60;
        const TITLE_H = 80;
        const BOTTOM_H = 50;

        const groups = CATEGORIES.filter(c => groupedItems[c]);
        const CARD_H = (cat: string) => CAT_H + groupedItems[cat].length * ROW_H + 28;

        // Layout in 2 columns
        let col0H = 0, col1H = 0;
        const positions: { cat: string; col: number; y: number }[] = [];
        groups.forEach(cat => {
            const h = CARD_H(cat);
            if (col0H <= col1H) { positions.push({ cat, col: 0, y: col0H }); col0H += h + 16; }
            else { positions.push({ cat, col: 1, y: col1H }); col1H += h + 16; }
        });
        const contentH = Math.max(col0H, col1H);
        const CANVAS_W = PAD * 2 + COL_W * COLS + 20;
        const CANVAS_H = TITLE_H + PAD + contentH + BOTTOM_H + PAD;

        const canvas = document.createElement('canvas');
        const DPR = 2;
        canvas.width = CANVAS_W * DPR;
        canvas.height = CANVAS_H * DPR;
        const ctx = canvas.getContext('2d')!;
        ctx.scale(DPR, DPR);

        // Background
        const bg = ctx.createLinearGradient(0, 0, CANVAS_W, CANVAS_H);
        bg.addColorStop(0, '#0a1224');
        bg.addColorStop(1, '#0f1729');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        // Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🛒  Grocery List', CANVAS_W / 2, 50);

        // Subtitle
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.fillText(`${items.length} item${items.length !== 1 ? 's' : ''} • ${groups.length} categories`, CANVAS_W / 2, 72);

        // Cards
        positions.forEach(({ cat, col, y }) => {
            const x = PAD + col * (COL_W + 20);
            const baseY = TITLE_H + PAD + y;
            const cardH = CARD_H(cat);
            const color = CATEGORY_COLORS[cat] || '#94a3b8';
            const [r, g, b] = hexToRgb(color);

            // Card bg
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(x, baseY, COL_W, cardH, 16);
            ctx.fillStyle = 'rgba(30,41,59,0.6)';
            ctx.fill();
            ctx.strokeStyle = `rgba(${r},${g},${b},0.25)`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();

            // Category dot + label
            ctx.beginPath();
            ctx.arc(x + 22, baseY + 30, 5, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.fillStyle = color;
            ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(cat.toUpperCase(), x + 34, baseY + 34);

            // Divider
            ctx.beginPath();
            ctx.moveTo(x + 16, baseY + CAT_H - 10);
            ctx.lineTo(x + COL_W - 16, baseY + CAT_H - 10);
            ctx.strokeStyle = `rgba(${r},${g},${b},0.15)`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Items
            groupedItems[cat].forEach((item, idx) => {
                const iy = baseY + CAT_H + idx * ROW_H + 8;
                // Diamond bullet
                ctx.save();
                ctx.translate(x + 26, iy + 8);
                ctx.rotate(Math.PI / 4);
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.6;
                ctx.fillRect(-5, -5, 10, 10);
                ctx.restore();

                // Name
                ctx.fillStyle = 'rgba(255,255,255,0.9)';
                ctx.globalAlpha = 1;
                ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText(item.item, x + 44, iy + 14);

                // Qty badge
                const qtyLabel = `×${item.qty}`;
                ctx.fillStyle = `rgba(${r},${g},${b},0.2)`;
                const qx = x + COL_W - 50;
                ctx.beginPath();
                ctx.roundRect(qx, iy, 38, 22, 6);
                ctx.fill();
                ctx.fillStyle = color;
                ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(qtyLabel, qx + 19, iy + 15);
            });
        });

        // Footer watermark
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Generated with ToolMinty Grocery List Builder', CANVAS_W / 2, CANVAS_H - 16);

        // Download
        const link = document.createElement('a');
        link.download = 'grocery-list.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        setDownloading(false);
    };

    const faqs = [
        {
            question: "Why categorize my grocery list?",
            answer: "Categorizing your list by department (e.g., Produce, Dairy) saves time in the store by preventing you from running back and forth between aisles."
        },
        {
            question: "Can I save this list?",
            answer: "Yes! Hit 'Download PNG' to save a clean, printable image of your full list — perfect for screenshotting or printing."
        },
        {
            question: "What items go in 'Pantry'?",
            answer: "Pantry items usually include dry goods like rice, pasta, canned beans, spices, and baking supplies."
        }
    ];

    const calc = calculators.find(c => c.href === '/grocery-list');

    return (
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Grocery List Builder'}
                description={calc?.description || 'Organize your shopping by category for a faster experience.'}
            />

            <div className="card" style={{ marginBottom: '3rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {/* ── Input row ── */}
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        {/* Name */}
                        <input
                            type="text"
                            className="input"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addItem()}
                            placeholder="Add item..."
                            style={{
                                flex: 1, minWidth: '140px',
                                background: 'rgba(30, 41, 59, 0.5)',
                                borderRadius: '0.85rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#fff',
                            }}
                        />

                        {/* Quantity */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.85rem', padding: '0 0.25rem' }}>
                            <button
                                onClick={() => setQty(q => Math.max(1, q - 1))}
                                style={{ width: '32px', height: '32px', borderRadius: '0.6rem', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >−</button>
                            <span style={{ color: '#fff', fontWeight: 700, minWidth: '28px', textAlign: 'center', fontSize: '1rem' }}>{qty}</span>
                            <button
                                onClick={() => setQty(q => q + 1)}
                                style={{ width: '32px', height: '32px', borderRadius: '0.6rem', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >+</button>
                        </div>

                        {/* Category */}
                        <CustomDropdown options={CATEGORIES} value={category} onChange={setCategory} />

                        {/* Add */}
                        <button
                            onClick={addItem}
                            style={{
                                padding: '0.75rem 1.75rem',
                                borderRadius: '0.85rem',
                                fontWeight: 700,
                                fontSize: '1rem',
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 8px 20px rgba(79,70,229,0.35)',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            Add
                        </button>
                    </div>

                    {/* ── List ── */}
                    <div ref={listRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                        {Object.keys(groupedItems).length === 0 ? (
                            <div style={{
                                gridColumn: '1/-1',
                                textAlign: 'center',
                                color: 'rgba(255,255,255,0.2)',
                                padding: '3rem',
                                border: '2px dashed rgba(255,255,255,0.06)',
                                borderRadius: '1.5rem',
                                fontSize: '1rem',
                            }}>
                                🛒 Your list is empty — start adding items!
                            </div>
                        ) : Object.entries(groupedItems).map(([cat, list]) => (
                            <div key={cat} style={{
                                background: 'rgba(30, 41, 59, 0.4)',
                                padding: '1.25rem',
                                borderRadius: '1.25rem',
                                border: `1px solid ${CATEGORY_COLORS[cat]}22`,
                                boxShadow: `0 4px 20px ${CATEGORY_COLORS[cat]}11`,
                            }}>
                                <div style={{
                                    fontWeight: 800,
                                    color: CATEGORY_COLORS[cat] || '#94a3b8',
                                    fontSize: '0.78rem',
                                    textTransform: 'uppercase',
                                    marginBottom: '0.75rem',
                                    letterSpacing: '0.15em',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: CATEGORY_COLORS[cat] }} />
                                    {cat}
                                    <span style={{ marginLeft: 'auto', fontWeight: 500, opacity: 0.5, textTransform: 'none', letterSpacing: 0, fontSize: '0.75rem' }}>
                                        {list.length} item{list.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                                <div style={{ display: 'grid', gap: '0.4rem' }}>
                                    {list.map(i => (
                                        <div key={i.id} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            color: 'rgba(255,255,255,0.85)',
                                            padding: '0.35rem 0',
                                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                                        }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                                                <span style={{ color: CATEGORY_COLORS[cat], opacity: 0.6, fontSize: '0.7rem' }}>◆</span>
                                                {i.item}
                                            </span>
                                            {/* Qty badge */}
                                            <span style={{
                                                background: `${CATEGORY_COLORS[cat]}22`,
                                                color: CATEGORY_COLORS[cat],
                                                fontWeight: 700,
                                                fontSize: '0.8rem',
                                                padding: '0.15rem 0.55rem',
                                                borderRadius: '99px',
                                                marginRight: '0.5rem',
                                                minWidth: '30px',
                                                textAlign: 'center',
                                            }}>×{i.qty}</span>
                                            <button onClick={() => removeItem(i.id)} style={{
                                                color: '#f87171',
                                                background: 'rgba(239,68,68,0.1)',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '24px',
                                                height: '24px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                fontSize: '1rem',
                                                transition: 'background 0.2s',
                                                flexShrink: 0,
                                            }}>×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── Download ── */}
                    {items.length > 0 && (
                        <button
                            onClick={downloadAsPng}
                            disabled={downloading}
                            style={{
                                padding: '0.85rem',
                                borderRadius: '1rem',
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                background: downloading ? 'rgba(255,255,255,0.05)' : 'rgba(34,197,94,0.12)',
                                color: downloading ? 'rgba(255,255,255,0.4)' : '#4ade80',
                                border: '1px solid rgba(34,197,94,0.25)',
                                cursor: downloading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                            }}
                        >
                            {downloading ? '⏳ Generating…' : '⬇️ Download List as PNG'}
                        </button>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
