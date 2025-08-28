
import React from 'react';

interface HeaderProps {
    onReviewClick: () => void;
    incorrectCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onReviewClick, incorrectCount }) => {
    return (
        <header className="max-w-7xl mx-auto flex justify-between items-center pb-4 border-b border-slate-700">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                <span className="text-cyan-400">SQL</span> Practice Zone
            </h1>
            <button
                onClick={onReviewClick}
                className="relative bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
                Review Incorrect ({incorrectCount})
            </button>
        </header>
    );
};
