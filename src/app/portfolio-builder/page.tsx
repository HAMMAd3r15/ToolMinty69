'use client';

import { useState, useRef } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import { toBlob } from 'html-to-image';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

export default function PortfolioBuilder() {
    const [name, setName] = useState('Alex Doe');
    const [title, setTitle] = useState('Full Stack Developer');
    const [about, setAbout] = useState('Passionate about building beautiful, high-performance web applications using modern technologies.');
    const [skills, setSkills] = useState('React, Next.js, TypeScript, Node.js');
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');
    const previewRef = useRef<HTMLDivElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCopyImage = async () => {
        if (!previewRef.current) return;

        setCopyStatus('copying');
        try {
            const blob = await toBlob(previewRef.current, {
                cacheBust: true,
                backgroundColor: '#0a0a0b',
                style: {
                    borderRadius: '0'
                }
            });

            if (blob) {
                await navigator.clipboard.write([
                    new ClipboardItem({
                        [blob.type]: blob
                    })
                ]);
                setCopyStatus('success');
                setTimeout(() => setCopyStatus('idle'), 2000);
            }
        } catch (err) {
            console.error('Failed to copy image:', err);
            setCopyStatus('error');
            setTimeout(() => setCopyStatus('idle'), 2000);
        }
    };

    const faqs = [
        {
            question: "Why do I need a portfolio?",
            answer: "A portfolio is a visual proof of your skills. It allows potential employers or clients to see what you're capable of beyond just reading a list on a resume."
        },
        {
            question: "What makes a good portfolio?",
            answer: "Focus on your best work, explain the 'Why' behind your projects, and make sure your contact information is easy to find."
        },
        {
            question: "How do I use my profile picture?",
            answer: "Click the 'Upload' button in the Portfolio Data section. Your image is processed locally in your browser and is never uploaded to a server."
        },
        {
            question: "How does 'Copy as Image' work?",
            answer: "It captures your portfolio card and saves it to your clipboard. You can then paste it directly into emails, chats, or social media posts."
        }
    ];

    const calc = calculators.find(c => c.href === '/portfolio-builder');

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Quick Portfolio Builder'}
                description={calc?.description || 'Instantly visualize a clean and professional personal portfolio.'}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
                {/* Editor Side */}
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Portfolio Data</h3>
                    <div style={{ display: 'grid', gap: '1.25rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.85rem', fontWeight: 600 }}>Profile Picture</label>

                            {!profilePic ? (
                                <label style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    padding: '2rem',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '2px dashed rgba(255, 255, 255, 0.1)',
                                    borderRadius: '1rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    textAlign: 'center'
                                }} className="upload-box">
                                    <div style={{ fontSize: '1.5rem' }}>📸</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                                        <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Click to upload</span> or drag and drop<br />
                                        <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>PNG, JPG or GIF</span>
                                    </div>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                                </label>
                            ) : (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    borderRadius: '1rem',
                                    border: '1px solid rgba(255, 255, 255, 0.05)'
                                }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        border: '2px solid var(--color-primary)'
                                    }}>
                                        <img src={profilePic} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Image uploaded</div>
                                        <button
                                            onClick={() => setProfilePic(null)}
                                            style={{ background: 'none', border: 'none', color: '#ff4444', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}
                                        >
                                            Remove image
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Full Name</label>
                            <input className="input" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Job Title</label>
                            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>About Me</label>
                            <textarea className="input" value={about} onChange={(e) => setAbout(e.target.value)} style={{ width: '100%', height: '80px', resize: 'none' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Skills (comma separated)</label>
                            <input className="input" value={skills} onChange={(e) => setSkills(e.target.value)} style={{ width: '100%' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '2.5rem' }}>
                        <button
                            onClick={handleCopyImage}
                            disabled={copyStatus === 'copying'}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: copyStatus === 'copying' ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                border: 'none',
                                background: copyStatus === 'success' ? '#10b981' : copyStatus === 'error' ? '#ef4444' : '#2563eb',
                                color: '#ffffff',
                                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {copyStatus === 'copying' ? 'Capturing...' :
                                copyStatus === 'success' ? 'Copied to Clipboard!' :
                                    copyStatus === 'error' ? 'Failed to Copy' : 'Copy as Image'}
                        </button>
                    </div>
                </div>

                {/* Preview Side */}
                <div ref={previewRef} style={{
                    background: '#0a0a0b',
                    borderRadius: '1.5rem',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    position: 'relative',
                    minHeight: '600px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        height: '250px',
                        background: 'linear-gradient(rgba(37, 99, 235, 0.2), #0a0a0b)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem',
                        flexShrink: 0
                    }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            minWidth: '120px',
                            minHeight: '120px',
                            borderRadius: '50%',
                            background: '#2563eb',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2.5rem',
                            fontWeight: 900,
                            color: '#fff',
                            boxShadow: '0 0 30px rgba(37, 99, 235, 0.4)',
                            overflow: 'hidden',
                            border: '4px solid rgba(255, 255, 255, 0.1)',
                            flexShrink: 0
                        }}>
                            {profilePic ? (
                                <img src={profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                name[0]?.toUpperCase() || '?'
                            )}
                        </div>
                        <h2 style={{ margin: 0, color: '#fff', fontSize: '1.75rem', textAlign: 'center' }}>{name}</h2>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{title}</span>
                    </div>

                    <div style={{ padding: '3rem', flex: 1 }}>
                        <section style={{ marginBottom: '3rem' }}>
                            <h4 style={{ color: '#fff', borderLeft: '3px solid var(--color-primary)', paddingLeft: '1rem', marginBottom: '1rem' }}>About</h4>
                            <p style={{ color: 'var(--color-text-tertiary)', lineHeight: 1.7 }}>{about}</p>
                        </section>

                        <section>
                            <h4 style={{ color: '#fff', borderLeft: '3px solid var(--color-primary)', paddingLeft: '1rem', marginBottom: '1rem' }}>Skills</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {skills.split(',').map((skill, i) => (
                                    <span key={i} style={{
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '0.5rem',
                                        fontSize: '0.8rem',
                                        color: '#fff',
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}>
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255, 255, 255, 0.1)', fontSize: '0.75rem' }}>
                        generated by calchub
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '4rem' }}>
                <FAQSection items={faqs} />
            </div>

            <style jsx>{`
                .upload-box:hover {
                    background: rgba(255, 255, 255, 0.06) !important;
                    border-color: var(--color-primary) !important;
                }
            `}</style>
        </div>
    );
}
