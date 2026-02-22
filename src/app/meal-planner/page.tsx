'use client';

import { useState } from 'react';
import FAQSection from '@/components/UI/FAQSection';

const MEALS = {
    Breakfast: ['Oatmeal with Berries', 'Avocado Toast', 'Greek Yogurt Parfait', 'Scrambled Eggs on Toast', 'Protein Smoothie'],
    Lunch: ['Chicken Quinoa Bowl', 'Tuna Salad Wrap', 'Lentil Soup', 'Turkey Sandwich', 'Roasted Veggie Salad'],
    Dinner: ['Grilled Salmon with Asparagus', 'Beef Stir-fry', 'Chickpea Curry', 'Baked Tofu with Broccoli', 'Pasta Primavera'],
    Snack: ['Apple with Almond Butter', 'Handful of Walnuts', 'Cottage Cheese', 'Carrot Sticks with Hummus']
};

export default function MealPlanner() {
    const [plan, setPlan] = useState<{ [key: string]: string[] }>({});

    const generatePlan = () => {
        const newPlan: { [key: string]: string[] } = {};
        ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach(day => {
            newPlan[day] = [
                MEALS.Breakfast[Math.floor(Math.random() * MEALS.Breakfast.length)],
                MEALS.Lunch[Math.floor(Math.random() * MEALS.Lunch.length)],
                MEALS.Dinner[Math.floor(Math.random() * MEALS.Dinner.length)]
            ];
        });
        setPlan(newPlan);
    };

    const faqs = [
        {
            question: "Can I customize the meal database?",
            answer: "In this version, we provide a curated list of healthy and accessible meals. Future updates may allow you to save your own favorite recipes."
        },
        {
            question: "How do I use this for grocery shopping?",
            answer: "Generate your plan, then head over to our 'Grocery List Builder' to add the ingredients you'll need for these meals."
        },
        {
            question: "What if I have dietary restrictions?",
            answer: "The current list contains a mix of options. If a suggestion doesn't fit your diet, feel free to swap it with a similar meal you enjoy."
        }
    ];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Weekly Meal Planner</h1>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '3rem' }}>
                Stop stressing about 'what's for dinner'. Get a randomized, balanced meal plan for the week.
            </p>

            <div className="card" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <button onClick={generatePlan} className="btn btn-primary" style={{ padding: '1rem' }}>Generate Weekly Plan</button>

                    {Object.keys(plan).length > 0 && (
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {Object.entries(plan).map(([day, meals]) => (
                                <div key={day} style={{
                                    background: 'rgba(30, 41, 59, 0.4)',
                                    padding: '1.5rem',
                                    borderRadius: '1rem',
                                    border: '1px solid rgba(255, 255, 255, 0.05)'
                                }}>
                                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '1px solid rgba(37, 99, 235, 0.3)', paddingBottom: '0.5rem' }}>
                                        {day}
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '0.25rem' }}>Breakfast</div>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{meals[0]}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '0.25rem' }}>Lunch</div>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{meals[1]}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '0.25rem' }}>Dinner</div>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{meals[2]}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
