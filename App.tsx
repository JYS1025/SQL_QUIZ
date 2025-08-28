
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ProblemView } from './components/ProblemView';
import { ResultView, ResultState } from './components/ResultView';
import { ReviewModal } from './components/ReviewModal';
import { initializeDatabase, executeQuery, compareResults } from './services/sqlExecutor';
import { getRandomProblem } from './services/problemService';
import { Problem, IncorrectAnswer } from './types';
import type { Database } from 'sql.js';


const App: React.FC = () => {
    const [db, setDb] = useState<Database | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
    const [lastResult, setLastResult] = useState<ResultState>({ status: 'idle' });
    const [incorrectAnswers, setIncorrectAnswers] = useState<IncorrectAnswer[]>([]);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [problemHistory, setProblemHistory] = useState<number[]>([]);

    const loadNewProblem = useCallback(() => {
        const newProblem = getRandomProblem(problemHistory);
        setCurrentProblem(newProblem);
        setLastResult({ status: 'idle' });
        if (newProblem) {
            setProblemHistory(prev => [...prev, newProblem.id]);
        }
    }, [problemHistory]);

    useEffect(() => {
        const initDb = async () => {
            try {
                const database = await initializeDatabase();
                setDb(database);
                loadNewProblem();
            } catch (err) {
                console.error("Database initialization failed:", err);
                setError("Failed to initialize the database. Please refresh the page.");
            } finally {
                setIsLoading(false);
            }
        };
        initDb();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (userSql: string) => {
        if (!db || !currentProblem) return;

        setLastResult({ status: 'loading' });

        try {
            const userResult = await executeQuery(db, userSql);
            const correctResult = await executeQuery(db, currentProblem.query);

            if (userResult.error) {
                setLastResult({ status: 'error', message: userResult.error, userResult: null, correctResult: null });
                setIncorrectAnswers(prev => [...prev, { problem: currentProblem, incorrectQuery: userSql }]);
                return;
            }

            const isCorrect = compareResults(userResult.results, correctResult.results);

            if (isCorrect) {
                setLastResult({ status: 'correct', userResult: userResult.results, correctResult: correctResult.results });
            } else {
                setLastResult({ status: 'incorrect', userResult: userResult.results, correctResult: correctResult.results });
                setIncorrectAnswers(prev => [...prev, { problem: currentProblem, incorrectQuery: userSql }]);
            }
        } catch (e) {
            const err = e as Error;
            setLastResult({ status: 'error', message: err.message, userResult: null, correctResult: null });
            setIncorrectAnswers(prev => [...prev, { problem: currentProblem, incorrectQuery: userSql }]);
        }
    };

    const handleGiveUp = async () => {
        if (!db || !currentProblem) return;

        setLastResult({ status: 'loading' });

        try {
            const correctResult = await executeQuery(db, currentProblem.query);
            setLastResult({
                status: 'revealed',
                correctResult: correctResult.results,
            });
            setIncorrectAnswers(prev => [...prev, { problem: currentProblem, incorrectQuery: '-- GAVE UP --' }]);
        } catch (e) {
            const err = e as Error;
            setLastResult({ status: 'error', message: err.message });
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
            <Header onReviewClick={() => setIsReviewModalOpen(true)} incorrectCount={incorrectAnswers.length} />
            <main className="max-w-7xl mx-auto mt-6">
                {isLoading && <p className="text-center text-lg text-cyan-400">Initializing Database & Loading Problem...</p>}
                {error && <p className="text-center text-lg text-red-500">{error}</p>}
                
                {!isLoading && !error && currentProblem && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ProblemView 
                            problem={currentProblem} 
                            onSubmit={handleSubmit}
                            onNextProblem={loadNewProblem}
                            onGiveUp={handleGiveUp}
                            isCorrect={lastResult.status === 'correct'}
                            isAnswerShown={lastResult.status === 'revealed'}
                        />
                        <ResultView result={lastResult} />
                    </div>
                )}
                 {!isLoading && !error && !currentProblem && (
                    <div className="text-center p-8 bg-slate-800 rounded-lg">
                        <p className="text-xl text-slate-300">You've completed all available questions!</p>
                        <p className="text-slate-400 mt-2">Check your review section for past attempts.</p>
                    </div>
                )}
            </main>
            {isReviewModalOpen && (
                <ReviewModal 
                    incorrectAnswers={incorrectAnswers} 
                    onClose={() => setIsReviewModalOpen(false)}
                />
            )}
        </div>
    );
};

export default App;
