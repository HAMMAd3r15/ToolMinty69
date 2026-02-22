'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';

function toHex(n: number) {
    return n.toString(16).padStart(2, '0').toUpperCase();
}

export default function ImageColorPicker() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [pickedColor, setPickedColor] = useState<{ hex: string; r: number; g: number; b: number } | null>(null);
    const [palette, setPalette] = useState<string[]>([]);
    const [copied, setCopied] = useState<string | null>(null);
    const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
    const [hoverColor, setHoverColor] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleImageLoad = (src: string) => {
        const img = new Image();
        img.onload = () => {
            const canvas = canvasRef.current!;
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0);
        };
        img.src = src;
    };

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = e => {
            const src = e.target?.result as string;
            setImageUrl(src);
            setPickedColor(null);
            setPalette([]);
            setTimeout(() => handleImageLoad(src), 50);
        };
        reader.readAsDataURL(file);
    };

    const getColorAtPos = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const canvas = canvasRef.current;
        const imgEl = imageRef.current;
        const container = containerRef.current;
        if (!canvas || !imgEl || !container) return null;
        const rect = imgEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const ctx = canvas.getContext('2d')!;
        const pixel = ctx.getImageData(Math.floor(x * scaleX), Math.floor(y * scaleY), 1, 1).data;
        return { hex: `#${toHex(pixel[0])}${toHex(pixel[1])}${toHex(pixel[2])}`, r: pixel[0], g: pixel[1], b: pixel[2] };
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const color = getColorAtPos(e);
        if (color) {
            setHoverColor(color.hex);
            const rect = containerRef.current!.getBoundingClientRect();
            setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const color = getColorAtPos(e);
        if (color) {
            setPickedColor(color);
            setPalette(prev => prev.includes(color.hex) ? prev : [color.hex, ...prev].slice(0, 8));
        }
    };

    const copy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 1500);
    };

    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            if (!items) return;
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    const file = items[i].getAsFile();
                    if (file) handleFile(file);
                }
            }
        };
        window.addEventListener('paste', handlePaste);
        return () => window.removeEventListener('paste', handlePaste);
    }, []);

    const calc = calculators.find(c => c.href === '/image-color-picker');
    const faqs = [
        { question: "How do I pick a color?", answer: "Upload any image, then hover over it to preview colors. Click anywhere on the image to extract the exact HEX and RGB values of that pixel." },
        { question: "Can I paste an image directly?", answer: "Yes! You can use Ctrl+V (or Cmd+V) to paste an image directly from your clipboard without needing to save it first." },
        { question: "Are my images stored anywhere?", answer: "No! All image processing happens entirely in your browser using the HTML5 Canvas API. Your images never leave your device." },
        { question: "How do I save multiple colors?", answer: "Every time you click on the image, the picked color is added to your palette history at the bottom. You can copy any saved color." },
    ];

    return (
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Image Color Picker'} description={calc?.description || ''} />

            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {!imageUrl ? (
                <div className="card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <label style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        padding: '3rem', border: '2px dashed var(--color-border)', borderRadius: '1rem',
                        cursor: 'pointer', gap: '1rem', transition: 'border-color 0.2s',
                    }} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.type.startsWith('image/')) handleFile(f); }}>
                        <div style={{ fontSize: '3rem' }}>🖼️</div>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Drop image, click to upload, or paste (Ctrl+V)</div>
                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Supports JPG, PNG, GIF, WebP</div>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                    </label>
                </div>
            ) : (
                <>
                    <div className="card" style={{ marginBottom: '1.5rem', padding: '1rem', textAlign: 'center' }}>
                        <div ref={containerRef} style={{
                            position: 'relative',
                            cursor: 'crosshair',
                            borderRadius: '0.75rem',
                            display: 'inline-block',
                            maxWidth: '100%'
                        }}
                            onMouseMove={handleMouseMove} onClick={handleClick}
                            onMouseLeave={() => { setHoverColor(null); setCursorPos(null); }}>
                            <img ref={imageRef} src={imageUrl} alt="Uploaded" style={{
                                display: 'block',
                                maxWidth: '100%',
                                height: 'auto',
                                maxHeight: '60vh',
                                borderRadius: '0.75rem',
                                background: 'var(--color-bg)'
                            }} />
                            {cursorPos && hoverColor && (
                                <div style={{
                                    position: 'absolute',
                                    top: cursorPos.y - 10,
                                    left: cursorPos.x + 15,
                                    transform: 'translateY(-100%)',
                                    background: 'rgba(0,0,0,0.85)',
                                    borderRadius: '0.6rem',
                                    padding: '0.4rem 0.7rem',
                                    pointerEvents: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backdropFilter: 'blur(8px)',
                                    zIndex: 10,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: hoverColor, border: '1px solid rgba(255,255,255,0.2)' }} />
                                    <span style={{ fontFamily: 'monospace', color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>{hoverColor}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {pickedColor && (
                        <div className="card" style={{ marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '1rem', background: pickedColor.hex, flexShrink: 0, border: '2px solid var(--color-border)', boxShadow: `0 8px 24px ${pickedColor.hex}60` }} />
                                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    {[
                                        { label: 'HEX', value: pickedColor.hex },
                                        { label: 'RGB', value: `rgb(${pickedColor.r}, ${pickedColor.g}, ${pickedColor.b})` },
                                    ].map(({ label, value }) => (
                                        <div key={label} onClick={() => copy(value)} style={{ padding: '0.6rem 0.8rem', borderRadius: '0.6rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)', cursor: 'pointer' }}>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginBottom: '0.2rem', fontWeight: 600 }}>{label}</div>
                                            <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.85rem' }}>{value}</div>
                                            {copied === value && <div style={{ fontSize: '0.7rem', color: 'var(--color-success)' }}>Copied!</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {palette.length > 0 && (
                        <div className="card" style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ marginBottom: '0.75rem' }}>🎨 Picked Colors</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {palette.map((c, i) => (
                                    <div key={i} title={c} onClick={() => copy(c)} style={{
                                        width: '48px', height: '48px', borderRadius: '0.6rem', background: c, cursor: 'pointer',
                                        border: '2px solid var(--color-border)', position: 'relative',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s',
                                    }}>
                                        {copied === c && <div style={{ fontSize: '1rem', color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>✓</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button onClick={() => setImageUrl(null)} className="btn btn-secondary" style={{ marginBottom: '2rem', width: '100%' }}>← Upload New Image</button>
                </>
            )}

            <FAQSection items={faqs} />
        </div>
    );
}
