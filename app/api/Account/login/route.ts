import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../../lib/accounts";
import bcryptjs from "bcryptjs";

export async function POST (userRequest: NextRequest) {
    interface user {
        id: number;
        email: string;
        password_hash: string;
        first_name: string;
        last_name: string;
        age: number;
        gender: string;
        created_at: Date;
    }

    try {
        const {email, password} = await userRequest.json();

        if (email === "Admin@gmail.com" && password === "Admin123") {
            return NextResponse.json({ success: true, message: "Admin login successful" }, { status: 200 });
        }

        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        const [rows] = await pool.execute<user[]>("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }

        const user = rows[0];

        const isvalidPassword = await bcryptjs.compare(password, user.password_hash);

        if (isvalidPassword) {
            return NextResponse.json({ success: true, message: "Login successful" }, { status: 200 });
        }
        
        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });

    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}