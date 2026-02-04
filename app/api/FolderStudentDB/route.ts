import { pool } from "../../../lib/studentDB";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export async function GET () {
    try {
        const [students] = await pool.query<RowDataPacket[] >("SELECT * FROM studentCredentials");
        return NextResponse.json({students}, {status: 200});    

    } catch (error) {
        return NextResponse.json({error: "Error went wrong"}, {status: 500});
    }
}