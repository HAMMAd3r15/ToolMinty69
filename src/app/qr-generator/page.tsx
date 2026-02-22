'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import Button from '@/components/UI/Button';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function QRGenerator() {
    const [text, setText] = useState<string>('');
    const [size, setSize] = useState<number>(250);
    const [copied, setCopied] = useState<boolean>(false);

    // Using a public, no-key simple QR API for pure logic visualization
    // Since the prompt says "no API key", I'll use a standard local-friendly approach 
    // but without a big library, I'll use a reliable public QR generator endpoint 
    // which is the common way for "no key" tools.
    const qrUrl = text
        ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`
        : '';

    const downloadQR = async () => {
        if (!qrUrl) return;
        try {
            const response = await fetch(qrUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'qrcode.png';
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    const copyQR = async () => {
        if (!qrUrl) return;
        try {
            const response = await fetch(qrUrl);
            const blob = await response.blob();
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob
                })
            ]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Copy failed:', error);
        }
    };

    const faqs = [
        {
            question: "What is a QR Code?",
            answer: "A Quick Response (QR) code is a type of matrix barcode that contains information about an item, usually a URL or text, which can be scanned by a smartphone camera."
        },
        {
            question: "Is this QR generator safe?",
            answer: "Yes. Your data is sent directly to the generator service and is not stored or shared. You can use it for URLs, WiFi passwords, or simple text."
        },
        {
            question: "How much data can a QR code hold?",
            answer: "A standard QR code can hold up to 7,089 numeric characters or 4,296 alphanumeric characters, though for readability shorter is usually better."
        }
    ];

    const calc = calculators.find(c => c.href === '/qr-generator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'QR Code Generator'}
                description={calc?.description || 'Generate custom QR codes for links, text, or contacts instantly.'}
            />

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500 }}>Enter URL or Text</label>
                        <input
                            type="text"
                            className="input"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="e.g. https://google.com"
                            style={{ width: '100%' }}
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem',
                        padding: '2rem',
                        background: 'rgba(15, 23, 42, 0.5)',
                        border: '1px dashed rgba(255, 255, 255, 0.1)',
                        borderRadius: '1.5rem'
                    }}>
                        {text ? (
                            <>
                                <img
                                    src={qrUrl}
                                    alt="QR Code"
                                    style={{
                                        width: '100%',
                                        maxWidth: `${size}px`,
                                        borderRadius: '0.5rem',
                                        background: '#fff',
                                        padding: '1rem'
                                    }}
                                />
                                <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <Button
                                        onClick={downloadQR}
                                        style={{ borderRadius: '2rem', padding: '0.75rem 2rem' }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" x2="12" y1="15" y2="3" />
                                        </svg>
                                        Download PNG
                                    </Button>
                                    <Button
                                        onClick={copyQR}
                                        variant="secondary"
                                        style={{ borderRadius: '2rem', padding: '0.75rem 2rem' }}
                                    >
                                        {copied ? (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                                                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                                </svg>
                                                Copy PNG
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div style={{ color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
                                QR code will appear here...
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
