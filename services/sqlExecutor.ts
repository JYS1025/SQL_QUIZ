
import { SCHEMA, SAMPLE_DATA } from '../constants/databaseSchema';
import type { QueryResult } from '../types';
import type { Database, SqlJsStatic } from 'sql.js';


declare global {
    interface Window {
        initSqlJs: (config: { locateFile: (file: string) => string }) => Promise<SqlJsStatic>;
    }
}

let db: Database | null = null;

export const initializeDatabase = async (): Promise<Database> => {
    if (db) {
        return db;
    }
    
    const SQL = await window.initSqlJs({
        locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
    });

    db = new SQL.Database();

    // Create schema
    Object.keys(SCHEMA).forEach(tableName => {
        const columns = SCHEMA[tableName].join(', ');
        const createTableSql = `CREATE TABLE ${tableName} (${columns});`;
        db!.run(createTableSql);
    });

    // Populate with sample data
    SAMPLE_DATA.forEach(insertSql => {
        try {
            db!.run(insertSql);
        } catch (e) {
            console.error(`Failed to execute insert: ${insertSql}`, e);
        }
    });

    return db;
};

export const executeQuery = async (dbInstance: Database, query: string): Promise<{ results: QueryResult[] | null, error: string | null }> => {
    try {
        const results = dbInstance.exec(query);
        return { results: results as QueryResult[], error: null };
    } catch (e) {
        const err = e as Error;
        return { results: null, error: err.message };
    }
};

const normalizeResults = (results: QueryResult[] | null | undefined): string => {
    if (!results || results.length === 0) {
        return '[]';
    }
    const data = results[0].values;
    const columns = results[0].columns;
    
    const stringifiedRows = data.map(row => {
        const obj: {[key: string]: any} = {};
        columns.forEach((col, i) => {
            obj[col] = row[i];
        });
        return JSON.stringify(obj);
    });
    
    stringifiedRows.sort();
    return JSON.stringify(stringifiedRows);
};

export const compareResults = (res1: QueryResult[] | null | undefined, res2: QueryResult[] | null | undefined): boolean => {
    return normalizeResults(res1) === normalizeResults(res2);
};
