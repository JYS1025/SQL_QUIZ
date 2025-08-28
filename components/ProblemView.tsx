
import React, { useState, useEffect } from 'react';
import { Problem } from '../types';
import { SCHEMA } from '../constants/databaseSchema';

interface ProblemViewProps {
    problem: Problem;
    onSubmit: (sql: string) => void;
    onNextProblem: () => void;
    onGiveUp: () => void;
    isCorrect: boolean;
    isAnswerShown: boolean;
}

export const ProblemView: React.FC<ProblemViewProps> = ({ problem, onSubmit, onNextProblem, onGiveUp, isCorrect, isAnswerShown }) => {
    const [sql, setSql] = useState('');

    useEffect(() => {
        setSql('');
    }, [problem]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(sql);
    };

    const isProblemFinished = isCorrect || isAnswerShown;

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-cyan-400 mb-2">Problem</h2>
                <p className="text-slate-300 whitespace-pre-wrap">{problem.description}</p>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">Database Schema</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {Object.entries(SCHEMA).map(([tableName, columns]) => (
                        <div key={tableName}>
                            <p className="font-bold text-slate-300">{tableName}</p>
                            <p className="text-slate-400 font-mono text-xs">{columns.join(', ')}</p>
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-lg shadow-lg">
                <label htmlFor="sql-editor" className="block text-lg font-semibold text-cyan-400 mb-2">
                    Your Query
                </label>
                <textarea
                    id="sql-editor"
                    value={sql}
                    onChange={(e) => setSql(e.target.value)}
                    className="w-full h-48 p-3 bg-slate-900 border border-slate-600 rounded-md text-slate-200 font-mono focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:bg-slate-800"
                    placeholder="SELECT * FROM instructor;"
                    disabled={isProblemFinished}
                />
                <div className="mt-4">
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed"
                            disabled={isProblemFinished}
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={onGiveUp}
                            className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed"
                            disabled={isProblemFinished}
                        >
                            Show Answer
                        </button>
                    </div>
                    {isProblemFinished && (
                         <button
                            type="button"
                            onClick={onNextProblem}
                            className="w-full mt-4 bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            Next Problem
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
