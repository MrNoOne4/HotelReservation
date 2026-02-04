import { NextResponse, NextRequest } from "next/server";
import { pool } from "../../../lib/studentDB";


export async function GET() {
    try {
        const [users] = await pool.query("SELECT * FROM users");
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error went wrong" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const {name, email, role, userStatus} = await req.json();
    try {
        const [users] = await pool.query("INSERT INTO users (name, email, role, userStatus) VALUES (?, ?, ?, ?)", [name, email, role, userStatus]);
        return NextResponse.json({ message: "User added successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Error went wrong" }, { status: 500 });
    }
}