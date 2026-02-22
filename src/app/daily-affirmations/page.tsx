'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

const AFFIRMATIONS = [
    // Self-Worth & Identity
    "I am enough exactly as I am.",
    "I belong in every room I enter.",
    "My potential is limitless.",
    "I trust my ability to navigate challenges.",
    "I am the architect of my own life.",
    "I choose to be proud of myself today.",
    "My voice and my ideas matter.",
    "I do not need permission to be myself.",
    "I am worthy of respect and kindness.",
    "I celebrate my small wins as much as the big ones.",
    "I am resilient, strong, and brave.",
    "I trust my intuition.",
    "I am constantly evolving into a better version of myself.",
    "I deserve the good things that come my way.",
    "I carry myself with grace and confidence.",
    // Focus & Productivity
    "I am focused, persistent, and organized.",
    "I have everything I need to succeed today.",
    "I prioritize my tasks with ease and clarity.",
    "My mistakes are just data points for growth.",
    "I am in control of how I spend my time.",
    "I work with purpose and intention.",
    "I am capable of achieving my goals.",
    "Every step I take is moving me forward.",
    "I am disciplined and dedicated to my craft.",
    "I choose to see opportunities where others see obstacles.",
    // Peace & Mindset
    "I am at peace with my past.",
    "I inhale calm and exhale stress.",
    "My mind is clear and my heart is open.",
    "I am grounded in the present moment.",
    "I release the need to control the uncontrollable.",
    "I am a sanctuary of peace.",
    "I choose to respond rather than react.",
    "Today, I choose joy over worry.",
    "I am safe, I am loved, and I am whole.",
    "I allow myself the space to just be.",
    // Health & Energy
    "My body is capable of amazing things.",
    "I nourish my body with healthy choices.",
    "I am grateful for the breath in my lungs.",
    "I listen to what my body needs today.",
    "I am full of energy and vitality.",
    "Every cell in my body is vibrant and healthy.",
    "I treat my body with the love it deserves.",
    "My sleep is restful and restorative.",
    "I am becoming stronger every day.",
    "I move my body because it feels good to do so.",
    // Abundance & Success
    "I am a magnet for success.",
    "Abundance flows to me in expected and unexpected ways.",
    "I am open to receiving all the wealth life offers.",
    "I am worthy of financial freedom.",
    "My hard work is paying off.",
    "I create my own luck.",
    "The universe is conspiring in my favor.",
    "I am grateful for the abundance I already have.",
    "I see opportunities for growth everywhere.",
    "My success is inevitable.",
    // Relationships
    "I attract healthy and supportive relationships.",
    "I am a source of love and light for others.",
    "I set boundaries that protect my energy.",
    "I am surrounded by people who lift me up.",
    "I communicate my needs clearly and kindly.",
    "I am worthy of deep, meaningful connections.",
    "I choose to see the best in others.",
    "I am a loyal and loving friend.",
    "I forgive myself and others to move forward.",
    "I am loved more than I realize.",
    // Creativity & Growth
    "I am a creative being with unique ideas.",
    "I allow my curiosity to lead the way.",
    "I am not afraid to try new things.",
    "My creativity knows no bounds.",
    "I am a lifelong learner.",
    "I embrace the messy middle of the creative process.",
    "My perspective is a gift to the world.",
    "I am open to new ways of thinking.",
    "I trust the timing of my life.",
    "Today is a fresh start and a new beginning.",
    // Originals
    "I am capable of achieving anything I set my mind to.",
    "I choose to be positive and happy today.",
    "I embrace challenges as opportunities to grow.",
    "I am in control of my own happiness.",
    "I radiate confidence, grace, and strength.",
    "I am proud of who I am becoming.",
];

export default function DailyAffirmations() {
    const [index, setIndex] = useState(0);

    const nextAffirmation = () => setIndex((index + 1) % AFFIRMATIONS.length);

    const faqs = [
        {
            question: "Do affirmations really work?",
            answer: "Positive affirmations can help re-train your brain to focus on constructive thoughts, reducing stress and increasing self-confidence over time."
        },
        {
            question: "How often should I use them?",
            answer: "Consistency is key. Many people find success starting their day with one powerful affirmation to set a positive tone for the next 12-16 hours."
        },
        {
            question: "Can I write my own?",
            answer: "Absolutely! The best affirmations are personal. Use these as inspiration to create statements that resonate with your specific goals and values."
        }
    ];

    const calc = calculators.find(c => c.href === '/daily-affirmations');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Daily Affirmation Generator'}
                description={calc?.description || 'Start your day with purpose and positivity.'}
            />

            <div className="card" style={{
                marginBottom: '3rem',
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>✨</div>
                <div key={index} style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#fff',
                    marginBottom: '3rem',
                    lineHeight: 1.4,
                    animation: 'fadeInText 0.6s ease-out'
                }}>
                    "{AFFIRMATIONS[index]}"
                </div>
                <button onClick={nextAffirmation} className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>Next Affirmation</button>
            </div>

            <FAQSection items={faqs} />
            <style jsx>{`
                @keyframes fadeInText {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
