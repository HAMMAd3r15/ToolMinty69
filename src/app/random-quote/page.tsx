'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

const QUOTES = [
    { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
    { text: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
    { text: "I never dreamed about success. I worked for it.", author: "Estée Lauder" },
    { text: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "If you’re going through hell, keep going.", author: "Winston Churchill" },
    { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
    { text: "Whatever you are, be a good one.", author: "Abraham Lincoln" },
    { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
    { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
    { text: "I can accept failure, everyone fails at something. But I can’t accept not trying.", author: "Michael Jordan" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
    { text: "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.", author: "Bruce Lee" },
    { text: "Impossible is nothing.", author: "Muhammad Ali" },
    { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
    { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
    { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { text: "Make each day your masterpiece.", author: "John Wooden" },
    { text: "If opportunity doesn’t knock, build a door.", author: "Milton Berle" },
    { text: "Don’t count the days, make the days count.", author: "Muhammad Ali" },
    { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
    { text: "Fall seven times, stand up eight.", author: "Japanese Proverb" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "It’s never too late to be what you might have been.", author: "George Eliot" },
    { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
    { text: "Pain is temporary. Quitting lasts forever.", author: "Lance Armstrong" },
    { text: "With great power comes great responsibility.", author: "Uncle Ben" },
    { text: "Do, or do not. There is no try.", author: "Yoda" },
    { text: "Why do we fall? So that we can learn to pick ourselves up.", author: "Alfred Pennyworth" },
    { text: "Hope is a good thing, maybe the best of things, and no good thing ever dies.", author: "Andy Dufresne" },
    { text: "Just keep swimming.", author: "Dory" },
    { text: "To infinity and beyond!", author: "Buzz Lightyear" },
    { text: "I can do this all day.", author: "Steve Rogers" },
    { text: "I am Iron Man.", author: "Tony Stark" },
    { text: "I am going to be the Hokage.", author: "Naruto Uzumaki" },
    { text: "I am the hope of the universe!", author: "Goku" },
    { text: "Plus Ultra!", author: "All Might" },
    { text: "If you can’t do something, then don’t. Just believe in someone who can.", author: "Erwin Smith" },
    { text: "I will become stronger.", author: "Tanjiro Kamado" },
    { text: "No matter how deep the night, it always turns to day.", author: "Brook" },
    { text: "If you don’t take risks, you can’t create a future.", author: "Monkey D. Luffy" },
    { text: "I don’t know what tomorrow holds. That’s why I can be happy today.", author: "Natsu Dragneel" },
    { text: "You have no enemies.", author: "Thors" },
    { text: "Dreams are not what you see in sleep, dreams are things which do not let you sleep.", author: "A.P.J. Abdul Kalam" },
    { text: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
    { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
    { text: "Small daily improvements are the key to staggering long-term results.", author: "Robin Sharma" },
    { text: "Success is how high you bounce when you hit bottom.", author: "George S. Patton" },
    { text: "The best way out is always through.", author: "Robert Frost" },
    { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
    { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Don’t be pushed by your problems. Be led by your dreams.", author: "Ralph Waldo Emerson" },
    { text: "Winning isn’t everything, but wanting to win is.", author: "Vince Lombardi" },
    { text: "Champions keep playing until they get it right.", author: "Billie Jean King" },
    { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
    { text: "The harder you work for something, the greater you’ll feel when you achieve it.", author: "Anonymous" },
    { text: "Push yourself, because no one else is going to do it for you.", author: "Anonymous" },
    { text: "Don’t limit your challenges. Challenge your limits.", author: "Anonymous" },
    { text: "Great things never come from comfort zones.", author: "Anonymous" },
    { text: "Wake up with determination. Go to bed with satisfaction.", author: "Anonymous" },
    { text: "Success doesn’t just find you. You have to go out and get it.", author: "Anonymous" },
    { text: "Don’t stop when you’re tired. Stop when you’re done.", author: "Anonymous" },
    { text: "Little things make big days.", author: "Anonymous" },
    { text: "It’s going to be hard, but hard does not mean impossible.", author: "Anonymous" },
    { text: "Dream it. Wish it. Do it.", author: "Anonymous" },
    { text: "Stay positive. Work hard. Make it happen.", author: "Anonymous" },
    { text: "Don’t wait for opportunity. Create it.", author: "Anonymous" },
    { text: "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.", author: "Anonymous" },
    { text: "Believe in yourself and all that you are.", author: "Christian D. Larson" },
    { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" },
    { text: "Work hard in silence, let your success be your noise.", author: "Frank Ocean" },
    { text: "Strive for progress, not perfection.", author: "Anonymous" },
    { text: "The comeback is always stronger than the setback.", author: "Anonymous" },
    { text: "You are stronger than you think.", author: "Anonymous" },
    { text: "Don’t quit. Suffer now and live the rest of your life as a champion.", author: "Muhammad Ali" },
    { text: "What we think, we become.", author: "Buddha" },
    { text: "Happiness depends upon ourselves.", author: "Aristotle" },
    { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson" },
    { text: "Success is getting what you want. Happiness is wanting what you get.", author: "Dale Carnegie" },
    { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin" },
    { text: "It’s kind of fun to do the impossible.", author: "Walt Disney" },
    { text: "All our dreams can come true, if we have the courage to pursue them.", author: "Walt Disney" },
    { text: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
    { text: "You learn more from failure than from success.", author: "Anonymous" },
    { text: "Be so good they can’t ignore you.", author: "Steve Martin" },
    { text: "Everything you want is out there waiting for you to ask.", author: "Jack Canfield" },
    { text: "Act without expectation.", author: "Lao Tzu" },
    { text: "Keep going. Everything you need will come to you at the perfect time.", author: "Anonymous" }
];

export default function RandomQuoteGenerator() {
    const [index, setIndex] = useState(0);

    const nextQuote = () => {
        setIndex(Math.floor(Math.random() * QUOTES.length));
    };

    const faqs = [
        {
            question: "Who uses these quotes?",
            answer: "Quotes are used by writers, speakers, and anyone looking for a boost in motivation or a fresh perspective on a difficult day."
        },
        {
            question: "Why do quotes inspire us?",
            answer: "Quotes often distill complex life lessons into a single, powerful sentence. They remind us that we aren't alone in our struggles."
        },
        {
            question: "Can I use these for social media?",
            answer: "Absolutely! These quotes are perfect for captions, stories, or just to share with a friend who needs a little inspiration."
        }
    ];

    const calc = calculators.find(c => c.href === '/random-quote');

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1rem' }}>
            <ToolHeader
                title={calc?.title || 'Random Quote Generator'}
                description={calc?.description || 'Fuel your ambition with wisdom from history.'}
            />

            <div className="elite-quote-card" style={{
                marginBottom: '4rem',
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                padding: '5rem 4rem 4rem',
                borderRadius: '3rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
                overflow: 'hidden'
            }}>
                {/* Decorative Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-5%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                    zIndex: 0
                }} />

                {/* Redesigned Quote Icon */}
                <div style={{
                    fontSize: '10rem',
                    position: 'absolute',
                    top: '-1rem',
                    left: '1rem',
                    opacity: 0.15,
                    color: 'var(--color-primary)',
                    fontFamily: 'serif',
                    lineHeight: 1,
                    zIndex: 0
                }}>&ldquo;</div>

                <div key={index} style={{ position: 'relative', zIndex: 1, animation: 'quoteAppear 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    <p style={{
                        fontSize: '2.2rem',
                        fontWeight: 800,
                        color: '#fff',
                        marginBottom: '2.5rem',
                        lineHeight: 1.4,
                        letterSpacing: '-0.02em',
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}>
                        {QUOTES[index].text}
                    </p>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        marginBottom: '3rem'
                    }}>
                        <div style={{ height: '1px', width: '30px', background: 'var(--color-primary)', opacity: 0.5 }} />
                        <span style={{
                            fontSize: '1.1rem',
                            color: 'var(--color-primary)',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.3em'
                        }}>
                            {QUOTES[index].author}
                        </span>
                        <div style={{ height: '1px', width: '30px', background: 'var(--color-primary)', opacity: 0.5 }} />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                    <button onClick={nextQuote} className="elite-btn primary">
                        Refresh Inspiration
                    </button>
                </div>
            </div>

            <FAQSection items={faqs} />

            <style jsx>{`
                .elite-btn {
                    padding: 1.2rem 2.5rem;
                    border-radius: 100px;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 200px;
                }

                .elite-btn.primary {
                    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
                    color: white;
                    box-shadow: 0 10px 25px rgba(79, 70, 229, 0.4);
                }

                .elite-btn.primary:hover {
                    transform: translateY(-5px) scale(1.02);
                    box-shadow: 0 15px 35px rgba(79, 70, 229, 0.5);
                }

                .elite-btn.secondary {
                    background: rgba(255, 255, 255, 0.05);
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                }

                .elite-btn.secondary:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: rgba(255, 255, 255, 0.2);
                    transform: translateY(-3px);
                }

                .elite-btn.copied {
                    background: rgba(34, 197, 94, 0.2);
                    border-color: #22c55e;
                    color: #4ade80;
                }

                @keyframes quoteAppear {
                    from { 
                        opacity: 0;
                        transform: translateY(20px) scale(0.98);
                        filter: blur(10px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0) scale(1);
                        filter: blur(0);
                    }
                }

                @media (max-width: 640px) {
                    .elite-quote-card {
                        padding: 3rem 1.5rem 2.5rem;
                        border-radius: 2rem;
                    }
                    p { font-size: 1.5rem !important; }
                    .elite-btn { width: 100%; padding: 1rem; }
                    div[style*="display: flex"] { flex-direction: column; }
                }
            `}</style>
        </div>
    );
}
