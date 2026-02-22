'use client';

import { useState, useCallback } from 'react';
import ToolHeader from '@/components/UI/ToolHeader';
import FAQSection from '@/components/UI/FAQSection';
import { calculators } from '@/utils/calculators';

type Square = 'X' | 'O' | null;
type GameMode = '2player' | 'vs-computer';

const WINNING_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

function calculateWinner(squares: Square[]): { winner: Square; line: number[] } | null {
    for (const [a, b, c] of WINNING_LINES) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: [a, b, c] };
        }
    }
    return null;
}

function getBestMove(squares: Square[], player: Square): number {
    const opponent = player === 'O' ? 'X' : 'O';
    const minimax = (sq: Square[], isMax: boolean): number => {
        const w = calculateWinner(sq);
        if (w) return w.winner === player ? 10 : -10;
        if (sq.every(Boolean)) return 0;
        const scores = sq.map((s, i) => {
            if (s) return isMax ? -Infinity : Infinity;
            const next = [...sq]; next[i] = isMax ? player : opponent;
            return minimax(next, !isMax);
        });
        return isMax ? Math.max(...scores) : Math.min(...scores);
    };
    let best = -Infinity, bestIdx = -1;
    squares.forEach((s, i) => {
        if (!s) {
            const next = [...squares]; next[i] = player;
            const score = minimax(next, false);
            if (score > best) { best = score; bestIdx = i; }
        }
    });
    return bestIdx;
}

export default function TicTacToe() {
    const [mode, setMode] = useState<GameMode>('vs-computer');
    const [squares, setSquares] = useState<Square[]>(Array(9).fill(null));
    const [isX, setIsX] = useState(true);
    const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });
    const [lastMoved, setLastMoved] = useState<number | null>(null);

    const winResult = calculateWinner(squares);
    const isDraw = !winResult && squares.every(Boolean);
    const isComputerTurn = mode === 'vs-computer' && !isX && !winResult && !isDraw;

    const handleClick = useCallback((i: number) => {
        if (squares[i] || winResult || isDraw || isComputerTurn) return;
        const next = [...squares];
        next[i] = isX ? 'X' : 'O';
        setSquares(next);
        setLastMoved(i);
        setIsX(!isX);

        if (mode === 'vs-computer') {
            const w = calculateWinner(next);
            const d = !w && next.every(Boolean);
            if (!w && !d) {
                setTimeout(() => {
                    const aiMove = getBestMove(next, 'O');
                    if (aiMove !== -1) {
                        const ai = [...next]; ai[aiMove] = 'O';
                        const aiW = calculateWinner(ai);
                        setSquares(ai);
                        setLastMoved(aiMove);
                        setIsX(true);
                        if (aiW) setScore(s => ({ ...s, O: s.O + 1 }));
                        else if (ai.every(Boolean)) setScore(s => ({ ...s, draws: s.draws + 1 }));
                    }
                }, 300);
            } else if (w) setScore(s => ({ ...s, [w.winner!]: s[w.winner as 'X' | 'O'] + 1 }));
            else if (d) setScore(s => ({ ...s, draws: s.draws + 1 }));
        } else {
            const w = calculateWinner(next);
            const d = !w && next.every(Boolean);
            if (w) setScore(s => ({ ...s, [w.winner!]: s[w.winner as 'X' | 'O'] + 1 }));
            else if (d) setScore(s => ({ ...s, draws: s.draws + 1 }));
        }
    }, [squares, isX, winResult, isDraw, isComputerTurn, mode]);

    const reset = () => {
        setSquares(Array(9).fill(null));
        setIsX(true);
        setLastMoved(null);
    };

    const status = winResult
        ? `🏆 ${winResult.winner} wins!`
        : isDraw ? "🤝 It's a draw!"
            : isComputerTurn ? '🤖 Computer thinking...'
                : `${isX ? 'X' : 'O'}'s turn`;

    const calc = calculators.find(c => c.href === '/tic-tac-toe');
    const faqs = [
        { question: "How does the AI work?", answer: "The computer uses the Minimax algorithm, which evaluates all possible future moves to play perfectly. It's essentially unbeatable when it goes first!" },
        { question: "Can I play against a friend?", answer: "Yes! Switch to '2 Player' mode and take turns on the same device." },
        { question: "Is there a score tracker?", answer: "Yes — your X, O, and draw scores are tracked across rounds until you refresh the page." },
    ];

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ToolHeader title={calc?.title || 'Tic Tac Toe'} description={calc?.description || ''} />

            {/* Mode Selector */}
            <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                {(['vs-computer', '2player'] as GameMode[]).map(m => (
                    <button key={m} onClick={() => { setMode(m); reset(); setScore({ X: 0, O: 0, draws: 0 }); }} style={{
                        flex: 1, padding: '0.75rem', borderRadius: '0.75rem', fontWeight: 700,
                        background: mode === m ? 'var(--color-secondary)' : 'var(--color-bg)',
                        color: mode === m ? '#fff' : 'var(--color-text-primary)',
                        border: `1px solid ${mode === m ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                        cursor: 'pointer', transition: 'all 0.2s',
                    }}>{m === 'vs-computer' ? '🤖 vs Computer' : '👥 2 Players'}</button>
                ))}
            </div>

            {/* Score */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {[
                    { label: 'X', value: score.X, color: '#6366f1' },
                    { label: 'Draws', value: score.draws, color: 'var(--color-text-secondary)' },
                    { label: 'O', value: score.O, color: '#ec4899' },
                ].map(({ label, value, color }) => (
                    <div key={label} style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--color-surface)', borderRadius: '0.75rem', border: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '1.6rem', fontWeight: 900, color }}>{value}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{label}</div>
                    </div>
                ))}
            </div>

            {/* Board */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 700, fontSize: '1.1rem', color: winResult ? 'var(--color-secondary)' : 'var(--color-text-primary)' }}>{status}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', maxWidth: '320px', margin: '0 auto' }}>
                    {squares.map((sq, i) => {
                        const isWinLine = winResult?.line.includes(i);
                        const isLast = i === lastMoved;
                        return (
                            <button key={i} onClick={() => handleClick(i)} style={{
                                aspectRatio: '1', fontSize: '2.5rem', fontWeight: 900, borderRadius: '1rem',
                                background: isWinLine ? 'rgba(99,102,241,0.2)' : 'var(--color-bg)',
                                border: `2px solid ${isWinLine ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                                color: sq === 'X' ? '#6366f1' : '#ec4899',
                                cursor: sq || winResult || isDraw || isComputerTurn ? 'default' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s',
                                animation: isLast && sq ? 'squarePop 0.3s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
                            }}>{sq}</button>
                        );
                    })}
                </div>
                <button onClick={reset} className="btn btn-secondary" style={{ width: '100%', marginTop: '1.25rem', padding: '0.75rem' }}>
                    🔄 New Game
                </button>
            </div>

            <FAQSection items={faqs} />
            <style jsx>{`
                @keyframes squarePop {
                    from { transform: scale(0.5); opacity: 0.5; }
                    to   { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
