'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

const TAGS: Record<string, string[]> = {
    Tech: ['coding', 'webdev', 'ai', 'programming', 'javascript', 'softwaredevelopment', 'techlife', 'developer', 'machinelearning', 'openai', 'cloudcomputing', 'devops', 'reactjs', 'python', 'cybersecurity'],
    Fitness: ['workout', 'gym', 'fitness', 'fitnessmotivation', 'bodybuilding', 'personaltrainer', 'weightloss', 'healthylifestyle', 'training', 'gains', 'powerlifting', 'crossfit', 'cardio', 'workoutmotivation', 'fitfam'],
    Travel: ['travel', 'wanderlust', 'travelgram', 'exploretheworld', 'adventure', 'travelphotography', 'backpacking', 'bucketlist', 'instatravel', 'vacation', 'travelblogger', 'roadtrip', 'solotravel', 'explore', 'travellife'],
    Business: ['entrepreneur', 'entrepreneurship', 'startup', 'business', 'marketing', 'growthmindset', 'leadership', 'success', 'smallbusiness', 'branding', 'b2b', 'hustle', 'ceo', 'investingyourself', 'businessowner'],
    Food: ['foodie', 'food', 'instafood', 'foodphotography', 'homecooking', 'recipe', 'foodlover', 'yummy', 'foodblogger', 'eats', 'delicious', 'mealprep', 'healthyfood', 'cooking', 'foodstagram'],
    Fashion: ['fashion', 'style', 'ootd', 'fashionblogger', 'streetstyle', 'mensfashion', 'womensfashion', 'outfitoftheday', 'fashionista', 'lookbook', 'aesthetic', 'styleblogger', 'trending', 'fashionweek', 'designer'],
    Photography: ['photography', 'photo', 'photographer', 'photooftheday', 'portrait', 'landscape', 'naturephotography', 'streetphotography', 'canonphotography', 'lightroom', 'nikon', 'mobilephotography', 'golden hour', 'editingskills', 'photoshoot'],
    Music: ['music', 'musician', 'newmusic', 'hiphop', 'rnb', 'pop', 'musicproducer', 'songwriter', 'studio', 'beats', 'spotify', 'playlist', 'musiclover', 'livemusic', 'producer'],
    Beauty: ['beauty', 'makeup', 'skincare', 'beautytips', 'makeuptutorial', 'glam', 'glow', 'selfcare', 'cosmetics', 'beautyinfluencer', 'skincareroutine', 'makeuplover', 'eyeshadow', 'lipstick', 'naturalskincare'],
    Sports: ['sports', 'football', 'basketball', 'soccer', 'cricket', 'athlete', 'sportsmotivation', 'training', 'teamwork', 'sportslife', 'champions', 'nba', 'nfl', 'fifa', 'gameday'],
    Gaming: ['gaming', 'gamer', 'videogames', 'twitch', 'ps5', 'xbox', 'pcgaming', 'esports', 'gamedev', 'fps', 'rpg', 'streamer', 'retrogaming', 'gamingcommunity', 'gameplay'],
    Finance: ['personalfinance', 'investing', 'money', 'stockmarket', 'crypto', 'wealthbuilding', 'financialliteracy', 'savingmoney', 'budgeting', 'passiveincome', 'realestate', 'dividends', 'frugalliving', 'moneymanagement', 'invest'],
    Health: ['health', 'mentalhealth', 'wellness', 'mindfulness', 'meditation', 'nutrition', 'healthyliving', 'anxiety', 'selfhealing', 'therapy', 'holistichealth', 'healthcoach', 'sleep', 'stressrelief', 'mindset'],
    Education: ['education', 'learning', 'study', 'student', 'studytips', 'knowledge', 'teacher', 'school', 'studygram', 'productivity', 'elearning', 'homeschool', 'tutoring', 'studymotivation', 'college'],
    Art: ['art', 'artwork', 'artist', 'digitalart', 'illustration', 'drawing', 'painting', 'sketchbook', 'artofinstagram', 'contemporaryart', 'procreate', 'design', 'creative', 'artlover', 'instaart'],
    Nature: ['nature', 'naturephotography', 'outdoors', 'hiking', 'mountains', 'ocean', 'wildlife', 'earthpix', 'sunset', 'trees', 'environment', 'getoutside', 'forest', 'landscape', 'conservation'],
    Parenting: ['parenting', 'mom', 'dad', 'momlife', 'toddler', 'newborn', 'kids', 'family', 'parenthood', 'momsofinstagram', 'dadlife', 'baby', 'kidsofinstagram', 'playdate', 'parentingtips'],
    Pets: ['pets', 'dog', 'cat', 'dogsofinstagram', 'catsofinstagram', 'puppy', 'kitten', 'petlover', 'petsofinstagram', 'dogoftheday', 'animallovers', 'fluffydog', 'rescuedog', 'adoptdontshop', 'cutepets'],
    Motivation: ['motivation', 'inspire', 'success', 'mindset', 'goals', 'hustle', 'positivevibes', 'believe', 'growth', 'dailymotivation', 'discipline', 'consistency', 'grind', 'focusedongoals', 'nevergiveup'],
    DIY: ['diy', 'handmade', 'craft', 'homedecor', 'upcycle', 'crafting', 'diyprojects', 'makersgonnamake', 'doityourself', 'woodworking', 'sewing', 'crochet', 'repurpose', 'creative', 'homemade'],
};

interface CustomDropdownProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

function CustomDropdown({ options, value, onChange }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ position: 'relative', userSelect: 'none', minWidth: '140px' }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'rgba(30, 41, 59, 0.5)',
                    border: `1px solid ${isOpen ? 'rgba(99, 102, 241, 0.7)' : 'rgba(255, 255, 255, 0.1)'}`,
                    padding: '0.75rem 1.25rem',
                    borderRadius: '0.85rem',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isOpen ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    gap: '0.75rem',
                }}
            >
                <span>{value}</span>
                <span style={{
                    width: '8px',
                    height: '8px',
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
                    <div
                        onClick={() => setIsOpen(false)}
                        style={{ position: 'fixed', inset: 0, zIndex: 10 }}
                    />
                    <div style={{
                        position: 'absolute',
                        top: 'calc(100% + 0.5rem)',
                        left: 0,
                        right: 0,
                        minWidth: '100%',
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
                                    padding: '0.7rem 1.1rem',
                                    borderRadius: '0.65rem',
                                    color: value === opt ? '#fff' : 'rgba(255,255,255,0.7)',
                                    background: value === opt ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                                    cursor: 'pointer',
                                    fontWeight: value === opt ? 700 : 400,
                                    fontSize: '0.95rem',
                                    transition: 'all 0.15s ease',
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

export default function HashtagGenerator() {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState<string>('Tech');
    const [result, setResult] = useState<string[]>([]);
    const [copied, setCopied] = useState(false);

    const generateTags = () => {
        const base = TAGS[category];
        const kw = keyword.trim().toLowerCase().replace(/\s+/g, '');
        const finalTags = [...base.map(t => `#${t}`)];
        if (kw) finalTags.unshift(`#${kw}`);
        setResult(finalTags);
    };

    const copyAll = () => {
        navigator.clipboard.writeText(result.join(' '));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const faqs = [
        {
            question: "How many hashtags should I use?",
            answer: "For Instagram, 3-5 high-quality tags are often better than 30 random ones. For Twitter/X, keep it to 1-2."
        },
        {
            question: "Why use hashtags?",
            answer: "Hashtags categorize your content and help users who aren't following you discover your posts through search and 'explore' pages."
        },
        {
            question: "Are these tags trending?",
            answer: "These are evergreen niche tags that consistently perform well in their respective categories."
        }
    ];

    const calc = calculators.find(c => c.href === '/hashtag-generator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Smart Hashtag Generator'}
                description={calc?.description || 'Boost your social media reach with relevant hashtags.'}
            />

            <div className="card" style={{ marginBottom: '3rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <input
                            className="input"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && generateTags()}
                            placeholder="Topic keyword..."
                            style={{
                                flex: 1,
                                minWidth: '160px',
                                background: 'rgba(30, 41, 59, 0.5)',
                                borderRadius: '0.85rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#fff',
                                fontSize: '1rem',
                            }}
                        />
                        <CustomDropdown
                            options={Object.keys(TAGS)}
                            value={category}
                            onChange={(v) => setCategory(v)}
                        />
                        <button
                            onClick={generateTags}
                            className="btn-primary"
                            style={{
                                padding: '0.75rem 1.75rem',
                                borderRadius: '0.85rem',
                                fontWeight: 700,
                                fontSize: '1rem',
                                boxShadow: '0 8px 20px rgba(79,70,229,0.35)',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Generate
                        </button>
                    </div>

                    {result.length > 0 && (
                        <div style={{
                            background: 'rgba(30, 41, 59, 0.4)',
                            padding: '1.75rem',
                            borderRadius: '1.25rem',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.75rem',
                            alignItems: 'flex-start'
                        }}>
                            {result.map((tag, i) => (
                                <span key={i} style={{
                                    color: 'var(--color-primary)',
                                    fontWeight: 700,
                                    fontSize: '1.05rem',
                                    background: 'rgba(99,102,241,0.1)',
                                    padding: '0.3rem 0.75rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid rgba(99,102,241,0.2)',
                                }}>
                                    {tag}
                                </span>
                            ))}
                            <button
                                onClick={copyAll}
                                style={{
                                    width: '100%',
                                    marginTop: '0.75rem',
                                    background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
                                    border: `1px solid ${copied ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.1)'}`,
                                    color: copied ? '#4ade80' : '#fff',
                                    padding: '0.65rem',
                                    borderRadius: '0.75rem',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {copied ? '✓ Copied!' : 'Copy All'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
