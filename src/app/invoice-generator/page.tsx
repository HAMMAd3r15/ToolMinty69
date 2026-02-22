'use client';

import { useState, useEffect } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

import { escapeHtml } from '@/utils/security';

interface Item {
    description: string;
    quantity: string;
    price: string;
}

export default function InvoiceGenerator() {
    const [items, setItems] = useState<Item[]>([{ description: '', quantity: '1', price: '' }]);
    const [businessName, setBusinessName] = useState('');
    const [clientName, setClientName] = useState('');
    const [taxRate, setTaxRate] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');

    useEffect(() => {
        setInvoiceNumber(new Date().getTime().toString().slice(-6));
        setInvoiceDate(new Date().toLocaleDateString());
    }, []);

    const addItem = () => {
        setItems([...items, { description: '', quantity: '1', price: '' }]);
    };

    const updateItem = (index: number, field: keyof Item, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const subtotal = items.reduce((acc, item) => acc + ((parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0)), 0);
    const tax = subtotal * ((parseFloat(taxRate) || 0) / 100);
    const total = subtotal + tax;

    const printInvoice = () => {
        const printWindow = window.open('', '_blank', 'width=850,height=1100');
        if (!printWindow) return;

        const itemRows = items.map(item => {
            const lineTotal = ((parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0)).toFixed(2);
            return `
                <tr>
                    <td style="padding:0.75rem 0;border-bottom:1px solid #f1f5f9;">${escapeHtml(item.description || '')}</td>
                    <td style="padding:0.75rem 0;border-bottom:1px solid #f1f5f9;text-align:center;">${escapeHtml(item.quantity)}</td>
                    <td style="padding:0.75rem 0;border-bottom:1px solid #f1f5f9;text-align:right;">${escapeHtml(item.price)}</td>
                    <td style="padding:0.75rem 0;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:600;">$${lineTotal}</td>
                </tr>`;
        }).join('');

        printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Invoice #INV-${escapeHtml(invoiceNumber)}</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #334155; padding: 2.5rem; }
        @page { margin: 1cm; }
    </style>
</head>
<body>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:2rem;">
        <div>
            <div style="font-size:2rem;font-weight:800;color:#1e293b;">${escapeHtml(businessName) || 'YOUR BUSINESS NAME'}</div>
            <div style="margin-top:0.4rem;color:#64748b;font-size:0.9rem;">Invoice #INV-${escapeHtml(invoiceNumber)}</div>
        </div>
        <div style="text-align:right;">
            <div style="font-size:2.5rem;font-weight:900;color:#2563eb;">INVOICE</div>
            <div style="color:#64748b;">Date: ${escapeHtml(invoiceDate)}</div>
        </div>
    </div>

    <div style="margin-bottom:2rem;">
        <div style="font-weight:800;color:#1e293b;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.4rem;">Bill To:</div>
        <div style="color:#475569;white-space:pre-line;">${escapeHtml(clientName || '')}</div>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:2rem;">
        <thead>
            <tr style="border-bottom:2px solid #e2e8f0;text-align:left;">
                <th style="padding:0.75rem 0;color:#444;">Description</th>
                <th style="padding:0.75rem 0;color:#444;text-align:center;width:100px;">Qty</th>
                <th style="padding:0.75rem 0;color:#444;text-align:right;width:150px;">Price</th>
                <th style="padding:0.75rem 0;color:#444;text-align:right;width:150px;">Total</th>
            </tr>
        </thead>
        <tbody>${itemRows}</tbody>
    </table>

    <div style="display:flex;justify-content:flex-end;">
        <div style="width:280px;">
            <div style="display:flex;justify-content:space-between;padding:0.4rem 0;">
                <span style="color:#64748b;">Subtotal:</span>
                <span style="font-weight:600;">$${subtotal.toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:0.4rem 0;">
                <span style="color:#64748b;">Tax (${escapeHtml(taxRate || '0')}%):</span>
                <span style="font-weight:600;">$${tax.toFixed(2)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding:0.75rem 0;margin-top:0.5rem;border-top:2px solid #1e293b;">
                <span style="font-weight:800;font-size:1.1rem;">Total:</span>
                <span style="font-weight:800;font-size:1.1rem;color:#2563eb;">$${total.toFixed(2)}</span>
            </div>
        </div>
    </div>

    <div style="margin-top:3rem;border-top:1px solid #f1f5f9;padding-top:1.5rem;color:#94a3b8;font-size:0.85rem;text-align:center;">
        Thank you for your business!
    </div>
</body>
</html>`);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => { printWindow.print(); printWindow.close(); }, 300);
    };

    const faqs = [
        {
            question: "Is this invoice legal?",
            answer: "This generator provides a professional layout for billing. However, tax requirements vary by country. Always ensure your invoices meet local legal and tax standards."
        },
        {
            question: "Can I save my invoices?",
            answer: "Currently, we don't store data on our servers for your privacy. You can print your invoice or save it as a PDF using your browser's print function."
        },
        {
            question: "How do I add a logo?",
            answer: "This is a simplified version. For now, you can print the invoice and use your own letterhead or stamp."
        }
    ];

    const calc = calculators.find(c => c.href === '/invoice-generator');

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="no-print">
                <ToolHeader
                    title={calc?.title || 'Invoice Generator'}
                    description={calc?.description || 'Generate professional invoices for your small business.'}
                />
            </div>

            <div className="card invoice-container" style={{
                background: '#fff',
                color: '#334155',
                padding: '3rem',
                borderRadius: '0',
                boxShadow: '0 0 40px rgba(0,0,0,0.1)',
            }}>
                <div className="invoice-header-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem' }}>
                    <div style={{ flex: 1 }}>
                        <input
                            type="text"
                            placeholder="YOUR BUSINESS NAME"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            style={{
                                fontSize: '2rem',
                                fontWeight: 800,
                                border: 'none',
                                width: '100%',
                                color: '#1e293b',
                                outline: 'none'
                            }}
                        />
                        <div style={{ marginTop: '0.5rem', color: '#64748b', fontSize: '0.9rem' }}>Invoice #INV-{invoiceNumber}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#2563eb' }}>INVOICE</div>
                        <div style={{ color: '#64748b' }}>Date: {invoiceDate}</div>
                    </div>
                </div>

                <div className="invoice-bill-to" style={{ marginBottom: '4rem' }}>
                    <div style={{ fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bill To:</div>
                    <textarea
                        placeholder="Client Name & Address"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        style={{
                            width: '300px',
                            border: 'none',
                            fontSize: '1rem',
                            color: '#475569',
                            outline: 'none',
                            resize: 'none',
                            minHeight: '80px'
                        }}
                    />
                </div>

                <table className="invoice-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '4rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                            <th style={{ padding: '1rem 0', fontWeight: 700, color: '#444' }}>Description</th>
                            <th style={{ padding: '1rem 0', fontWeight: 700, color: '#444', textAlign: 'center', width: '100px' }}>Qty</th>
                            <th style={{ padding: '1rem 0', fontWeight: 700, color: '#444', textAlign: 'right', width: '150px' }}>Price</th>
                            <th style={{ padding: '1rem 0', fontWeight: 700, color: '#444', textAlign: 'right', width: '150px' }}>Total</th>
                            <th className="no-print" style={{ width: '50px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1rem 0' }}>
                                    <input
                                        type="text"
                                        placeholder="Item description"
                                        value={item.description}
                                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                                        style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1rem' }}
                                    />
                                </td>
                                <td style={{ padding: '1rem 0' }}>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                                        onBlur={(e) => { const n = parseFloat(e.target.value); updateItem(index, 'quantity', isNaN(n) ? '0' : String(n)); }}
                                        style={{ width: '100%', border: 'none', outline: 'none', textAlign: 'center', fontSize: '1rem' }}
                                    />
                                </td>
                                <td style={{ padding: '1rem 0' }}>
                                    <input
                                        type="number"
                                        value={item.price}
                                        onChange={(e) => updateItem(index, 'price', e.target.value)}
                                        onBlur={(e) => { const n = parseFloat(e.target.value); updateItem(index, 'price', isNaN(n) ? '' : String(n)); }}
                                        style={{ width: '100%', border: 'none', outline: 'none', textAlign: 'right', fontSize: '1rem' }}
                                    />
                                </td>
                                <td style={{ padding: '1rem 0', textAlign: 'right', fontWeight: 600 }}>
                                    ${((parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0)).toFixed(2)}
                                </td>
                                <td className="no-print" style={{ textAlign: 'right' }}>
                                    <button onClick={() => removeItem(index)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>×</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="no-print" style={{ marginBottom: '4rem' }}>
                    <button onClick={addItem} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>+ Add Item</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: '300px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                            <span style={{ color: '#64748b' }}>Subtotal:</span>
                            <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', alignItems: 'center' }}>
                            <span style={{ color: '#64748b' }}>Tax (%):</span>
                            <input
                                type="number"
                                value={taxRate}
                                onChange={(e) => setTaxRate(e.target.value)}
                                onBlur={(e) => { const n = parseFloat(e.target.value); setTaxRate(isNaN(n) ? '' : String(n)); }}
                                placeholder="0"
                                style={{ width: '60px', textAlign: 'right', border: 'none', borderBottom: '1px solid #e2e8f0', outline: 'none', fontWeight: 600 }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', marginTop: '1rem', borderTop: '2px solid #1e293b' }}>
                            <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>Total:</span>
                            <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#2563eb' }}>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="invoice-thank-you" style={{ marginTop: '3rem', borderTop: '1px solid #f1f5f9', paddingTop: '2rem', color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center' }}>
                    Thank you for your business!
                </div>
            </div>

            <div className="no-print" style={{ textAlign: 'center', marginTop: '3rem' }}>
                <button onClick={printInvoice} className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                    Print / Save as PDF
                </button>
            </div>

            <div className="no-print" style={{ marginTop: '4rem' }}>
                <FAQSection items={faqs} />
            </div>

            <style jsx>{`
                @media print {
                    /* Hide site chrome */
                    header, nav, footer { display: none !important; }
                    /* Hide everything except invoice */
                    body * { visibility: hidden !important; }
                    .invoice-container,
                    .invoice-container * { visibility: visible !important; }
                    /* Pin invoice to top of page */
                    .invoice-container {
                        position: fixed !important;
                        top: 0 !important;
                        left: 0 !important;
                        width: 100% !important;
                        box-shadow: none !important;
                        margin: 0 !important;
                        border-radius: 0 !important;
                        padding: 1.5rem 2rem !important;
                        min-height: unset !important;
                    }
                    /* Tighten spacing */
                    .invoice-header-row { margin-bottom: 1.5rem !important; }
                    .invoice-bill-to   { margin-bottom: 1rem !important; }
                    .invoice-table     { margin-bottom: 1rem !important; }
                    .invoice-thank-you { margin-top: 1.5rem !important; }
                    /* Input/textarea text always visible when printing */
                    input, textarea { color: #1e293b !important; background: transparent !important; }
                    .no-print { display: none !important; }
                    @page { margin: 0.5cm; }
                }
                .btn-secondary {
                    background: #f1f5f9;
                    color: #475569;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                .btn-secondary:hover {
                    background: #e2e8f0;
                }
            `}</style>
        </div>
    );
}
