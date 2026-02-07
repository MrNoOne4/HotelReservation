import mysql, { Pool } from "mysql2/promise";

export const pool: Pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE2,
  port: Number(process.env.MYSQL_PORT),
});

