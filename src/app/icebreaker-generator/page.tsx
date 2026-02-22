'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';
import ToolHeader from '@/components/UI/ToolHeader';
import { calculators } from '@/utils/calculators';

const QUESTIONS = [
    "If you could instantly master any skill, what would it be?",
    "What’s the most interesting place you’ve ever visited?",
    "If you could live in any fictional world, which one would you choose?",
    "What’s one hobby you’ve always wanted to try?",
    "If your life had a theme song, what would it be?",
    "What’s your favorite way to spend a free weekend?",
    "If you could have dinner with any historical figure, who would it be?",
    "What’s a small thing that always makes your day better?",
    "Are you more of a morning person or night owl?",
    "What’s the best advice you’ve ever received?",
    "If you could travel anywhere right now, where would you go?",
    "What’s one food you could eat forever and never get tired of?",
    "If you won the lottery, what’s the first thing you’d do?",
    "What’s a movie or show you can rewatch anytime?",
    "Do you prefer mountains, beaches, or cities?",
    "What’s one goal you’re currently working toward?",
    "If you could switch lives with someone for a day, who would it be?",
    "What’s your favorite childhood memory?",
    "What’s one thing on your bucket list?",
    "If you had a time machine, would you go to the past or future?",
    "What’s your favorite season and why?",
    "If you could learn any language instantly, which one would it be?",
    "What’s your go-to comfort food?",
    "What’s one habit you’re proud of?",
    "Do you prefer texting or calling?",
    "What’s a random fun fact about you?",
    "If you could have any superpower, what would it be?",
    "What’s your dream job?",
    "What’s the best gift you’ve ever received?",
    "What’s one thing that always makes you laugh?",
    "If you could relive one day of your life, which would it be?",
    "What’s your favorite app on your phone?",
    "Do you prefer coffee or tea?",
    "What motivates you the most?",
    "If you had to describe yourself in three words, what would they be?",
    "What’s your favorite type of music?",
    "What’s a skill you think everyone should learn?",
    "What’s your favorite holiday and why?",
    "What’s something new you learned recently?",
    "If you could start a business, what would it be about?",
    "What’s your biggest pet peeve?",
    "If you could instantly visit space, would you go?",
    "What’s your favorite board game or video game?",
    "What’s a book that changed your perspective?",
    "Do you prefer working alone or in a team?",
    "What’s your favorite way to relax?",
    "If you could meet your future self, what would you ask?",
    "What’s your favorite dessert?",
    "What’s one thing you’re grateful for today?",
    "If you could try any extreme sport, what would it be?",
    "What’s your favorite social media platform?",
    "What’s the most spontaneous thing you’ve ever done?",
    "If you had a personal mascot, what would it be?",
    "What’s your favorite outdoor activity?",
    "What’s one movie that always makes you emotional?",
    "If you could live in any era, which would you choose?",
    "What’s your favorite quote?",
    "What’s a talent you wish you had?",
    "What’s your favorite way to celebrate achievements?",
    "What’s one thing you’d like to improve this year?",
    "If you could only use one app for a week, which would it be?",
    "What’s your favorite snack?",
    "What’s a dream destination on your travel list?",
    "If you had to teach something, what would it be?",
    "What’s your favorite way to stay productive?",
    "What’s one random skill you have?",
    "If you could redesign your room, what theme would you choose?",
    "What’s your favorite type of weather?",
    "What’s something that always inspires you?",
    "If you could make one positive change in the world, what would it be?",
    "If you could have dinner with anyone from history, who would it be?",
    "What is your most used emoji?",
    "What's the best piece of advice you've ever received?",
    "If you could have any superpower, what would it be?",
    "What is the first thing you'd buy if you won the lottery?",
    "What's your favorite way to spend a rainy afternoon?",
    "What is one thing you can't live without?",
    "If you could travel anywhere right now, where would you go?",
    "What's your go-to karaoke song?",
    "What's the most interesting thing you've learned recently?"
];

export default function IcebreakerGenerator() {
    const [index, setIndex] = useState(0);

    const nextQuestion = () => {
        let next;
        do {
            next = Math.floor(Math.random() * QUESTIONS.length);
        } while (next === index);
        setIndex(next);
    };

    const faqs = [
        {
            question: "When should I use these questions?",
            answer: "Icebreakers are perfect for the first 5 minutes of a meeting, a first date, or even during dinner with family to spark interesting conversations."
        },
        {
            question: "What makes a good icebreaker?",
            answer: "A good icebreaker is open-ended, inclusive, and neutral enough that everyone feels comfortable answering, yet specific enough to be interesting."
        },
        {
            question: "How do I deal with silence after a question?",
            answer: "Don't be afraid of a few seconds of silence! It means people are thinking. You can also volunteer to answer first to get the ball rolling."
        }
    ];

    const calc = calculators.find(c => c.href === '/icebreaker-generator');

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ToolHeader
                title={calc?.title || 'Random Icebreaker Questions'}
                description={calc?.description || 'Kill the awkward silence and spark connections.'}
            />

            <div className="card" style={{
                marginBottom: '3rem',
                textAlign: 'center',
                padding: '5rem 2rem',
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '2.5rem',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{
                    fontSize: '1rem',
                    color: 'var(--color-secondary)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    marginBottom: '2.5rem',
                    letterSpacing: '0.4em',
                    opacity: 0.8
                }}>Your Question</div>

                <div key={index} style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: '#fff',
                    marginBottom: '4rem',
                    lineHeight: 1.3,
                    maxWidth: '600px',
                    animation: 'slideUpBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    textShadow: '0 10px 20px rgba(0,0,0,0.3)'
                }}>
                    {QUESTIONS[index]}
                </div>

                <button onClick={nextQuestion} className="btn-primary" style={{
                    padding: '1.25rem 4rem',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    borderRadius: '1.25rem',
                    boxShadow: '0 15px 30px rgba(79, 70, 229, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>Spark Conversation</button>
            </div>

            <FAQSection items={faqs} />
            <style jsx>{`
                @keyframes slideUpBounce {
                    0% { opacity: 0; transform: translateY(30px) scale(0.95); filter: blur(10px); }
                    60% { opacity: 1; transform: translateY(-10px) scale(1.02); filter: blur(0); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}
