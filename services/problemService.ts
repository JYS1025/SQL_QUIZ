
import { Problem } from '../types';
import { PROBLEMS } from '../constants/problems';

export const getRandomProblem = (excludeIds: number[]): Problem | null => {
    const availableProblems = PROBLEMS.filter(p => !excludeIds.includes(p.id));
    if (availableProblems.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * availableProblems.length);
    return availableProblems[randomIndex];
};
