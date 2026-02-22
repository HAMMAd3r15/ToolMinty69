'use client';

import { useState } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';

const TRUTHS = [
    "What’s your biggest fear?",
    "Who was your first crush?",
    "What’s your most embarrassing moment?",
    "What’s your guilty pleasure?",
    "Have you ever lied to get out of trouble?",
    "What’s your biggest insecurity?",
    "What’s your worst habit?",
    "Who do you admire the most?",
    "What’s your dream job?",
    "Have you ever had a crush on a friend?",
    "What’s something you regret?",
    "What’s the most childish thing you still do?",
    "What’s your biggest pet peeve?",
    "What’s a secret talent you have?",
    "Have you ever faked being sick?",
    "What’s the weirdest dream you’ve had?",
    "What’s something you wish you were better at?",
    "Who do you text the most?",
    "What’s your most awkward moment?",
    "What’s a bad habit you’re trying to fix?",
    "Have you ever blamed someone else for something you did?",
    "What’s the most trouble you’ve been in?",
    "What’s your biggest goal right now?",
    "What’s the most embarrassing song you like?",
    "Have you ever ghosted someone?",
    "What’s your most used emoji?",
    "What’s something you’ve never told your parents?",
    "What’s your biggest motivation?",
    "Who here do you trust the most?",
    "If you could change one thing about yourself, what would it be?",
    "Who here would you date if you had to choose?",
    "What’s the biggest lie you’ve ever told?",
    "Have you ever had a crush on someone in this room?",
    "What’s your biggest turn-on?",
    "What’s your biggest turn-off?",
    "Who was your most recent crush?",
    "Have you ever stalked someone online?",
    "What’s the most selfish thing you’ve done?",
    "What’s the most childish argument you’ve had?",
    "Who do you secretly envy?",
    "Have you ever flirted to get something?",
    "What’s your biggest relationship mistake?",
    "What’s something you’ve done that you’d never post online?",
    "Who was your worst heartbreak?",
    "What’s your biggest insecurity in relationships?",
    "Have you ever had feelings for two people at once?",
    "What’s the meanest thing you’ve said to someone?",
    "What’s a secret you hope never comes out?",
    "Have you ever liked someone your friend liked?",
    "What’s your most toxic trait?",
    "Have you ever been jealous for no reason?",
    "What’s your biggest red flag?",
    "Who was your most awkward crush?",
    "Have you ever pretended to like someone?",
    "What’s the most dramatic thing you’ve done for attention?",
    "Have you ever broken someone’s heart?",
    "What’s the worst rumor you’ve spread?",
    "Who do you think likes you but you don’t like back?",
    "What’s your biggest fear in love?",
    "If your ex described you in one word, what would it be?"
];

const DARES = [
    "Sing your favorite song out loud.",
    "Do 15 push-ups.",
    "Dance without music for 30 seconds.",
    "Talk in a funny accent for 2 minutes.",
    "Tell a joke.",
    "Spin around 10 times and walk straight.",
    "Do your best animal impression.",
    "Make a funny face and hold it for 30 seconds.",
    "Speak only in questions for 1 minute.",
    "Pretend to be a robot.",
    "Do a plank for 30 seconds.",
    "Act like a news reporter.",
    "Recite a poem dramatically.",
    "Do your best villain laugh.",
    "Try to whistle a full song.",
    "Pretend the floor is lava for 30 seconds.",
    "Walk like a model across the room.",
    "Imitate someone in the room.",
    "Do 20 jumping jacks.",
    "Act like a baby for 1 minute.",
    "Say the alphabet backwards.",
    "Create a new handshake with someone.",
    "Talk like a pirate for 1 minute.",
    "Do your best superhero pose.",
    "Tell everyone a compliment.",
    "Balance on one leg for 1 minute.",
    "Make up a short rap about someone here.",
    "Attempt a magic trick.",
    "Act like you just won an award.",
    "End with a dramatic bow.",
    "Text your crush “I have something to tell you…” and don’t reply for 10 minutes.",
    "Let someone post a random emoji on your story.",
    "Call a friend and sing them a song.",
    "Do your best seductive walk across the room.",
    "Swap phones with someone for 2 minutes.",
    "Send the last photo in your gallery to someone random.",
    "Let someone change your profile picture for 24 hours.",
    "Act like you’re proposing to someone in the room.",
    "Read your last 5 search history items out loud.",
    "Let someone send a message from your phone.",
    "Do 30 squats while counting loudly.",
    "Talk in slow motion for 2 minutes.",
    "Attempt your most dramatic movie scene.",
    "Let someone draw something on your hand.",
    "Share your most embarrassing photo (if you have one).",
    "Do your best flirty line to someone.",
    "Pretend you’re crying over a soap opera scene.",
    "Let the group choose your Instagram bio for 24 hours.",
    "Try to do a handstand (or attempt it).",
    "Say something bold about your biggest crush.",
    "Do a funny runway walk like a celebrity.",
    "Call someone and tell them you miss them.",
    "Attempt a TikTok-style dance.",
    "Reveal your most recent screenshot.",
    "Speak in rhymes for 3 minutes.",
    "Let someone style your hair however they want.",
    "Tell the person to your left what you really think about them.",
    "Do your best evil mastermind speech.",
    "Act like you’re confessing love in a dramatic movie.",
    "Do a 60-second freestyle rap."
];

export default function TruthOrDare() {
    const [type, setType] = useState<'truth' | 'dare' | null>(null);
    const [prompt, setPrompt] = useState<string | null>(null);
    const [history, setHistory] = useState<{ type: string; text: string }[]>([]);
    const [animKey, setAnimKey] = useState(0);

    const getPrompt = (t: 'truth' | 'dare') => {
        const pool = t === 'truth' ? TRUTHS : DARES;
        const idx = Math.floor(Math.random() * pool.length);
        const text = pool[idx];
        setType(t);
        setPrompt(text);
        setAnimKey(k => k + 1);
        setHistory(prev => [{ type: t, text }, ...prev].slice(0, 6));
    };

    const calc = calculators.find(c => c.href === '/truth-or-dare');
    const faqs = [
        { question: "How many prompts are there?", answer: "There are 60 unique truth prompts and 60 unique dare prompts, totaling 120 challenges. The selection is randomized each time so you get a fresh experience every game." },
        { question: "Can I skip a prompt?", answer: "Simply click the button again to generate a new prompt. There's no limit on how many times you can generate." },
        { question: "Is this appropriate for all ages?", answer: "Our prompts are designed to be fun and appropriate for teenagers and adults at parties or social gatherings. All content is PG-13 friendly." },
    ];

    return (
        <div style={{ maxWidth: '650px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Truth or Dare Generator'} description={calc?.description || ''} />

            {/* Choice Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <button onClick={() => getPrompt('truth')} style={{
                    padding: '2rem', borderRadius: '1.25rem', fontWeight: 800, fontSize: '1.4rem', cursor: 'pointer',
                    background: type === 'truth' ? 'linear-gradient(135deg, #3730a3, #6366f1)' : 'var(--color-surface)',
                    color: type === 'truth' ? '#fff' : 'var(--color-text-primary)',
                    border: `2px solid ${type === 'truth' ? '#6366f1' : 'var(--color-border)'}`,
                    transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                    boxShadow: type === 'truth' ? '0 8px 32px rgba(99,102,241,0.4)' : 'none',
                }}>
                    <span style={{ fontSize: '2.5rem' }}>🤔</span>
                    <span>TRUTH</span>
                </button>
                <button onClick={() => getPrompt('dare')} style={{
                    padding: '2rem', borderRadius: '1.25rem', fontWeight: 800, fontSize: '1.4rem', cursor: 'pointer',
                    background: type === 'dare' ? 'linear-gradient(135deg, #7f1d1d, #ef4444)' : 'var(--color-surface)',
                    color: type === 'dare' ? '#fff' : 'var(--color-text-primary)',
                    border: `2px solid ${type === 'dare' ? '#ef4444' : 'var(--color-border)'}`,
                    transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                    boxShadow: type === 'dare' ? '0 8px 32px rgba(239,68,68,0.4)' : 'none',
                }}>
                    <span style={{ fontSize: '2.5rem' }}>🔥</span>
                    <span>DARE</span>
                </button>
            </div>

            {/* Result Card */}
            {prompt && (
                <div key={animKey} className="card" style={{
                    marginBottom: '1.5rem', textAlign: 'center', padding: '2rem',
                    borderColor: type === 'truth' ? '#6366f1' : '#ef4444',
                    borderWidth: '2px', animation: 'promptReveal 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                }}>
                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: type === 'truth' ? '#6366f1' : '#ef4444', marginBottom: '1rem' }}>
                        {type === 'truth' ? '🤔 TRUTH' : '🔥 DARE'}
                    </div>
                    <div style={{ fontSize: '1.2rem', lineHeight: 1.6, fontWeight: 600 }}>{prompt}</div>
                    <button onClick={() => getPrompt(type!)} className="btn btn-secondary" style={{ marginTop: '1.5rem', padding: '0.6rem 1.5rem' }}>
                        🔀 New {type === 'truth' ? 'Truth' : 'Dare'}
                    </button>
                </div>
            )}

            {/* History */}
            {history.length > 1 && (
                <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '0.75rem' }}>Recent Prompts</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {history.slice(1).map((h, i) => (
                            <div key={i} style={{ padding: '0.75rem', borderRadius: '0.6rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)', display: 'flex', gap: '0.6rem', alignItems: 'flex-start', opacity: 0.7 }}>
                                <span style={{ fontSize: '0.8rem', padding: '0.15rem 0.5rem', borderRadius: '0.3rem', background: h.type === 'truth' ? 'rgba(99,102,241,0.15)' : 'rgba(239,68,68,0.15)', color: h.type === 'truth' ? '#6366f1' : '#ef4444', fontWeight: 700, flexShrink: 0 }}>{h.type.toUpperCase()}</span>
                                <span style={{ fontSize: '0.85rem' }}>{h.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <FAQSection items={faqs} />
            <style jsx>{`
                @keyframes promptReveal {
                    from { transform: scale(0.92) translateY(10px); opacity: 0; }
                    to   { transform: scale(1) translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
