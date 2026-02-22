'use client';

import { useState, useRef, useEffect } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function SignatureGenerator() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.lineCap = 'round';
                ctx.lineWidth = 3;
            }
        }
    }, []);

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.beginPath();
        }
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();

        // Calculate the scale between CSS size and internal canvas size
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;

        ctx.strokeStyle = color;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const clear = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const download = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'signature.png';
            link.href = url;
            link.click();
        }
    };

    const faqs = [
        {
            question: "Is this signature legally binding?",
            answer: "This tool provides an image of your signature. Use it for informal documents or as a watermark. For legal contracts, we recommend using dedicated E-signature services like DocuSign."
        },
        {
            question: "Is my signature saved on your servers?",
            answer: "No. The drawing happens entirely in your browser. We have no access to your canvas data."
        },
        {
            question: "What format is the download?",
            answer: "The signature is downloaded as a high-quality PNG with a transparent background, so you can overlay it on any document easily."
        }
    ];

    const calc = calculators.find(c => c.href === '/signature-generator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Signature Generator'}
                description={calc?.description || 'Create professional digital signatures instantly.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Ink Color:</label>
                            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ border: 'none', background: 'transparent', width: '40px', height: '40px', cursor: 'pointer' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button onClick={clear} className="btn-secondary" style={{ padding: '0.6rem 1.2rem' }}>Clear Canvas</button>
                            <button
                                onClick={download}
                                style={{
                                    padding: '0.6rem 1.5rem',
                                    background: '#2563eb',
                                    color: '#fff',
                                    borderRadius: '0.5rem',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                                    cursor: 'pointer'
                                }}
                            >
                                Download PNG
                            </button>
                        </div>
                    </div>

                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={400}
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseMove={draw}
                        onMouseOut={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchEnd={stopDrawing}
                        onTouchMove={draw}
                        style={{
                            width: '100%',
                            height: 'auto',
                            background: '#fff',
                            borderRadius: '1rem',
                            cursor: 'crosshair',
                            touchAction: 'none',
                            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1)'
                        }}
                    />
                </div>
            </div>

            <FAQSection items={faqs} />

            <style jsx>{`
                .btn-secondary {
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-size: 0.85rem;
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
}
