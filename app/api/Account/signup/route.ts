import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../../lib/accounts";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const account = await request.json();

    const { firstName, lastName, gender, email, password, birthDate } = account;
    if (!firstName || !lastName || !gender || !email || !password || !birthDate) {
      return NextResponse.json({success: false, error: "Missing fields" }, { status: 400 });
    }

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let hashedPassword;
    if (passwordRegex.test(password)) {
        hashedPassword = await bcryptjs.hash(password, 10);
    } else {
      return NextResponse.json({success: false, error: "Password must "})
    }

    // Calculate age safely
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) {
      return NextResponse.json({success: false, error: "Invalid birthDate" }, { status: 400 });
    }
    const age = new Date().getFullYear() - birth.getFullYear();

    if (age < 18) {
      return NextResponse.json({success: false, error: "This service is only available to users 18 and older"}, {status: 400})
    }

    const [rows] = await pool.query(
      "INSERT INTO users (first_name, last_name, age, gender, email, password_hash) VALUES (?, ?, ?, ?, ?, ?)",
      [firstName, lastName, age, gender, email, hashedPassword]
    );

    return NextResponse.json({success: true, message: "User created", userId: (rows as any).insertId }, { status: 201 });
  } catch (error) {
    console.error("API signup error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
