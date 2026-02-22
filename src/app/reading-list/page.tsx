'use client';

import { useState, useEffect } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

interface Book {
    id: string;
    title: string;
    author: string;
    status: 'Reading' | 'Completed' | 'To Read';
}

interface CustomDropdownProps {
    options: { value: string, label: string }[];
    value: string;
    onChange: (value: any) => void;
    style?: React.CSSProperties;
}

function CustomDropdown({ options, value, onChange, style }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(o => o.value === value);

    return (
        <div className="custom-dropdown-container" style={{ position: 'relative', ...style }}>
            <div
                className={`custom-dropdown-header ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedOption?.label}</span>
                <span className="chevron"></span>
            </div>

            {isOpen && (
                <>
                    <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />
                    <div className="custom-dropdown-options">
                        {options.map(option => (
                            <div
                                key={option.value}
                                className={`custom-dropdown-option ${value === option.value ? 'selected' : ''}`}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                </>
            )}

            <style jsx>{`
                .custom-dropdown-container {
                    width: 100%;
                    user-select: none;
                }
                .custom-dropdown-header {
                    background: rgba(30, 41, 59, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 0.75rem 1.25rem;
                    border-radius: 0.75rem;
                    color: #fff;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .custom-dropdown-header:hover {
                    border-color: var(--color-secondary);
                    background: rgba(30, 41, 59, 0.6);
                }
                .custom-dropdown-header.open {
                    border-color: var(--color-secondary);
                }
                .chevron {
                    width: 10px;
                    height: 10px;
                    border-right: 2px solid rgba(255, 255, 255, 0.5);
                    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
                    transform: rotate(45deg);
                    transition: all 0.3s ease;
                    margin-top: -4px;
                }
                .custom-dropdown-header.open .chevron {
                    transform: rotate(-135deg);
                    margin-top: 4px;
                }
                .custom-dropdown-options {
                    position: absolute;
                    top: calc(100% + 0.5rem);
                    left: 0;
                    right: 0;
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 1rem;
                    padding: 0.5rem;
                    z-index: 1000;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
                    animation: dropdownSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .custom-dropdown-option {
                    padding: 0.75rem 1rem;
                    border-radius: 0.6rem;
                    color: rgba(255, 255, 255, 0.8);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 0.95rem;
                }
                .custom-dropdown-option:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                }
                .custom-dropdown-option.selected {
                    background: var(--color-secondary);
                    color: #fff;
                }
                .dropdown-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 999;
                }
                @keyframes dropdownSlide {
                    from { opacity: 0; transform: translateY(-10px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}

export default function ReadingListTracker() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState<'Reading' | 'Completed' | 'To Read'>('To Read');
    const [books, setBooks] = useState<Book[]>([]);
    const [mounted, setMounted] = useState(false);

    const statusOptions = [
        { value: 'To Read', label: 'To Read' },
        { value: 'Reading', label: 'Reading' },
        { value: 'Completed', label: 'Completed' }
    ];

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('calchub_reading_list');
        if (saved) setBooks(JSON.parse(saved));
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('calchub_reading_list', JSON.stringify(books));
        }
    }, [books, mounted]);

    const addBook = () => {
        if (!title) return;
        const newBook: Book = {
            id: Date.now().toString(),
            title,
            author,
            status
        };
        setBooks([...books, newBook]);
        setTitle('');
        setAuthor('');
        setStatus('To Read');
    };

    const updateStatus = (id: string, newStatus: 'Reading' | 'Completed' | 'To Read') => {
        setBooks(books.map(b => b.id === id ? { ...b, status: newStatus } : b));
    };

    const removeBook = (id: string) => {
        setBooks(books.filter(b => b.id !== id));
    };

    const faqs = [
        {
            question: "How many books should I read a year?",
            answer: "There is no 'right' number. Focus on quality and consistency. Even reading 10 pages a day adds up to several books a year."
        },
        {
            question: "Why should I keep a reading list?",
            answer: "Keeping a list helps you visualize your progress, remember what you've read, and prioritize the books you want to read next."
        },
        {
            question: "What if I don't finish a book?",
            answer: "It's okay to drop a book that doesn't interest you. You can move it to 'Completed' with a note, or just remove it from your list to make room for something better."
        }
    ];

    if (!mounted) return null;

    const calc = calculators.find(c => c.href === '/reading-list');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Reading List Tracker'}
                description={calc?.description || 'Keep track of your reading journey.'}
            />

            <div className="card" style={{ marginBottom: '3rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>Book Title</label>
                            <input type="text" className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Atomic Habits" style={{ background: 'rgba(30, 41, 59, 0.4)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>Author</label>
                            <input type="text" className="input" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. James Clear" style={{ background: 'rgba(30, 41, 59, 0.4)', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>Status</label>
                        <CustomDropdown
                            options={statusOptions}
                            value={status}
                            onChange={setStatus}
                        />
                    </div>

                    <button onClick={addBook} className="btn-primary" style={{
                        padding: '1.2rem',
                        borderRadius: '1rem',
                        fontWeight: 700,
                        fontSize: '1rem',
                        boxShadow: '0 10px 20px rgba(79, 70, 229, 0.3)',
                        transition: 'all 0.3s'
                    }}>Add to Registry</button>

                    <div style={{ display: 'grid', gap: '1.25rem', marginTop: '1rem' }}>
                        {books.length === 0 ? (
                            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '3rem', border: '2px dashed rgba(255,255,255,0.05)', borderRadius: '1.5rem' }}>Your literary journey starts here. Add your first book!</div>
                        ) : books.map(book => (
                            <div key={book.id} style={{
                                background: 'rgba(30, 41, 59, 0.3)',
                                padding: '1.5rem',
                                borderRadius: '1.5rem',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'transform 0.2s ease'
                            }}>
                                <div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>{book.title}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>by {book.author || 'Unknown Author'}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <CustomDropdown
                                        options={statusOptions}
                                        value={book.status}
                                        onChange={(val) => updateStatus(book.id, val)}
                                        style={{ minWidth: '150px' }}
                                    />
                                    <button onClick={() => removeBook(book.id)} style={{
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        border: 'none',
                                        color: '#ef4444',
                                        width: '35px',
                                        height: '35px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.2rem',
                                        transition: 'all 0.2s'
                                    }}>×</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
