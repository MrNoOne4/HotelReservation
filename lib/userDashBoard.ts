import mysql2 from "mysql2/promise";

let pool: mysql2.Pool | null = null;

if (!pool) {
    pool = mysql2.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE1,
        port: Number(process.env.MYSQL_PORT),
    })
}

export { pool };