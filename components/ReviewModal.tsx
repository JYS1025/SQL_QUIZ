
import React from 'react';
import { IncorrectAnswer } from '../types';

interface ReviewModalProps {
    incorrectAnswers: IncorrectAnswer[];
    onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ incorrectAnswers, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" 
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 w-full max-w-4xl max-h-[90vh] rounded-lg shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-cyan-400">Review Incorrect Answers</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
                </div>
                
                <div className="overflow-y-auto p-6 space-y-6">
                    {incorrectAnswers.length === 0 ? (
                        <p className="text-slate-400 text-center">No incorrect answers yet. Keep practicing!</p>
                    ) : (
                        incorrectAnswers.map(({ problem, incorrectQuery }, index) => (
                            <div key={index} className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                                <p className="font-semibold text-slate-300 mb-2">
                                    <span className="text-cyan-500">Q:</span> {problem.description}
                                </p>
                                <div>
                                    <p className="text-sm font-semibold text-yellow-400">Your Answer:</p>
                                    <pre className="bg-slate-800 p-2 mt-1 rounded text-sm text-yellow-200 font-mono overflow-x-auto">
                                        <code>{incorrectQuery}</code>
                                    </pre>
                                </div>
                                <div className="mt-3">
                                    <p className="text-sm font-semibold text-green-400">Correct Answer:</p>
                                    <pre className="bg-slate-800 p-2 mt-1 rounded text-sm text-green-200 font-mono overflow-x-auto">
                                        <code>{problem.query}</code>
                                    </pre>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
