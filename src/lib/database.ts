import mysql, { type ResultSetHeader } from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } from '$env/static/private'

console.log(DB_HOST)

export const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
});

export async function SelectQuery<T>(queryString: string): Promise<Partial<T[]>> {
    const [results] = await pool.execute(queryString)
    return results as T[]
}

export async function ModifyQuery(queryString: string): Promise<ResultSetHeader> {
    const [results] = await pool.execute(queryString)
    return results as ResultSetHeader
}
