
export interface Problem {
    id: number;
    description: string;
    query: string;
}

export interface IncorrectAnswer {
    problem: Problem;
    incorrectQuery: string;
}

export interface QueryResult {
    columns: string[];
    values: any[][];
}
