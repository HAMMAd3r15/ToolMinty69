'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const INITIAL_SNAKE: Point[] = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
];
const INITIAL_DIRECTION: Direction = 'UP';

export default function SnakeGame() {
    const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
    const [food, setFood] = useState<Point>({ x: 5, y: 5 });
    const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const [speed, setSpeed] = useState(150);
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

    const generateFood = useCallback((currentSnake: Point[]) => {
        let newFood: Point;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
            if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
                break;
            }
        }
        return newFood;
    }, []);

    const moveSnake = useCallback(() => {
        if (gameOver || isPaused) return;

        setSnake(prevSnake => {
            const head = { ...prevSnake[0] };
            switch (direction) {
                case 'UP': head.y -= 1; break;
                case 'DOWN': head.y += 1; break;
                case 'LEFT': head.x -= 1; break;
                case 'RIGHT': head.x += 1; break;
            }

            // Wall collision
            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                setGameOver(true);
                setIsPaused(true);
                return prevSnake;
            }

            // Self collision
            if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                setGameOver(true);
                setIsPaused(true);
                return prevSnake;
            }

            const newSnake = [head, ...prevSnake];

            // Food collision
            if (head.x === food.x && head.y === food.y) {
                setScore(s => s + 10);
                setFood(generateFood(newSnake));
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, gameOver, isPaused, generateFood]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
                case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
                case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
                case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
            }
            if (isPaused && !gameOver && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                setIsPaused(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction, isPaused, gameOver]);

    useEffect(() => {
        if (!isPaused && !gameOver) {
            gameLoopRef.current = setInterval(moveSnake, speed);
        } else {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        }
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [isPaused, gameOver, moveSnake, speed]);

    useEffect(() => {
        if (score > highScore) setHighScore(score);
    }, [score, highScore]);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setFood({ x: 5, y: 5 });
        setScore(0);
        setGameOver(false);
        setIsPaused(false);
    };

    const calc = calculators.find(c => c.href === '/snake-game');
    const faqs = [
        { question: "How record high weights/scores?", answer: "Your high score is tracked during your current browser session. Try to beat your personal best!" },
        { question: "Can I play on mobile?", answer: "Yes! Use the on-screen directional buttons below the game grid to control the snake on touch devices." },
        { question: "How do I speed up?", answer: "You can toggle between Normal and Fast speeds using the speed selector buttons." },
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Snake Game'} description={calc?.description || ''} />

            <div className="card" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 700 }}>
                    <div style={{ color: 'var(--color-secondary)' }}>Score: {score}</div>
                    <div style={{ color: 'var(--color-text-secondary)' }}>High Score: {highScore}</div>
                </div>

                <div style={{
                    position: 'relative',
                    width: '300px',
                    height: '300px',
                    margin: '0 auto',
                    background: 'var(--color-bg)',
                    border: '4px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                }}>
                    {/* Grid */}
                    {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                        const x = i % GRID_SIZE;
                        const y = Math.floor(i / GRID_SIZE);
                        const isSnake = snake.some(s => s.x === x && s.y === y);
                        const isHead = snake[0].x === x && snake[0].y === y;
                        const isFood = food.x === x && food.y === y;

                        return (
                            <div key={i} style={{
                                position: 'absolute',
                                left: `${(x / GRID_SIZE) * 100}%`,
                                top: `${((y / GRID_SIZE) * 100)}%`,
                                width: `${(1 / GRID_SIZE) * 100}%`,
                                height: `${(1 / GRID_SIZE) * 100}%`,
                                background: isHead ? '#6366f1' : isSnake ? '#818cf8' : isFood ? '#ef4444' : 'transparent',
                                borderRadius: isFood ? '50%' : '2px',
                                transition: 'background 0.1s',
                                zIndex: isSnake || isFood ? 1 : 0,
                            }} />
                        );
                    })}

                    {isPaused && !gameOver && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 10 }}>
                            <button onClick={() => setIsPaused(false)} className="btn btn-primary">Start Game</button>
                        </div>
                    )}

                    {gameOver && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 10 }}>
                            <h2 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Game Over</h2>
                            <p style={{ marginBottom: '1rem' }}>Final Score: {score}</p>
                            <button onClick={resetGame} className="btn btn-primary">Try Again</button>
                        </div>
                    )}
                </div>

                {/* Speed Selector */}
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <button onClick={() => setSpeed(150)} className={`btn ${speed === 150 ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Normal</button>
                    <button onClick={() => setSpeed(80)} className={`btn ${speed === 80 ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Fast</button>
                </div>
            </div>

            {/* Mobile Controls */}
            <div className="card" style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={() => direction !== 'DOWN' && setDirection('UP')} className="btn btn-secondary" style={{ width: '60px', height: '50px' }}>↑</button>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => direction !== 'RIGHT' && setDirection('LEFT')} className="btn btn-secondary" style={{ width: '60px', height: '50px' }}>←</button>
                    <button onClick={() => direction !== 'UP' && setDirection('DOWN')} className="btn btn-secondary" style={{ width: '60px', height: '50px' }}>↓</button>
                    <button onClick={() => direction !== 'LEFT' && setDirection('RIGHT')} className="btn btn-secondary" style={{ width: '60px', height: '50px' }}>→</button>
                </div>
            </div>

            <FAQSection items={faqs} />
        </div>
    );
}
