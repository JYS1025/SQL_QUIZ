
import React from 'react';
import type { QueryResult } from '../types';

export interface ResultState {
    status: 'idle' | 'loading' | 'correct' | 'incorrect' | 'error' | 'revealed';
    message?: string;
    userResult?: QueryResult[] | null;
    correctResult?: QueryResult[] | null;
}

interface ResultViewProps {
    result: ResultState;
}

const ResultTable: React.FC<{ data: QueryResult[], title: string }> = ({ data, title }) => {
    if (!data || data.length === 0 || (data[0] && data[0].values.length === 0)) {
        return (
            <div>
                <h4 className="font-semibold text-slate-300 mb-2">{title}</h4>
                <p className="text-slate-400 italic">Query returned no results.</p>
            </div>
        );
    }

    const { columns, values } = data[0];

    return (
        <div>
            <h4 className="font-semibold text-slate-300 mb-2">{title}</h4>
            <div className="overflow-x-auto rounded-md border border-slate-600">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-slate-700">
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i} className="p-2 font-medium">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-slate-800">
                        {values.map((row, i) => (
                            <tr key={i} className="border-t border-slate-700">
                                {row.map((val, j) => (
                                    <td key={j} className="p-2 font-mono text-xs">{val === null ? 'NULL' : String(val)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export const ResultView: React.FC<ResultViewProps> = ({ result }) => {
    return (
        <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-cyan-400 mb-4">Result</h2>
            
            {result.status === 'idle' && <p className="text-slate-400">Submit your query to see the result.</p>}
            {result.status === 'loading' && <p className="text-cyan-400">Executing query...</p>}

            {result.status === 'correct' && (
                <div className="space-y-4">
                    <div className="p-4 bg-green-900/50 border border-green-500 rounded-lg">
                        <h3 className="text-xl font-bold text-green-400">Correct!</h3>
                        <p className="text-green-300">Well done. Your query produced the expected result.</p>
                    </div>
                    {result.userResult && <ResultTable data={result.userResult} title="Your Output" />}
                </div>
            )}

            {result.status === 'incorrect' && (
                 <div className="space-y-6">
                    <div className="p-4 bg-yellow-900/50 border border-yellow-500 rounded-lg">
                        <h3 className="text-xl font-bold text-yellow-400">Incorrect</h3>
                        <p className="text-yellow-300">Your query produced a different result. Compare your output with the expected output below.</p>
                    </div>
                    {result.userResult && <ResultTable data={result.userResult} title="Your Output" />}
                    {result.correctResult && <ResultTable data={result.correctResult} title="Expected Output" />}
                </div>
            )}
            
            {result.status === 'error' && (
                <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg">
                    <h3 className="text-xl font-bold text-red-400">SQL Error</h3>
                    <p className="text-red-300 mt-2 font-mono bg-slate-900 p-2 rounded">{result.message}</p>
                </div>
            )}

            {result.status === 'revealed' && (
                 <div className="space-y-6">
                    <div className="p-4 bg-blue-900/50 border border-blue-500 rounded-lg">
                        <h3 className="text-xl font-bold text-blue-400">Answer Revealed</h3>
                        <p className="text-blue-300">Here is the expected output for the correct query.</p>
                    </div>
                    {result.correctResult && <ResultTable data={result.correctResult} title="Expected Output" />}
                </div>
            )}
        </div>
    );
};
