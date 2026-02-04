import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../lib/accounts";

export async function GET(req: NextRequest) {
    const {email, password} = await req.json();

    if (!email || !password) {
        return NextResponse.json({Error: "Input Email and password"}, {status: 500})
    }
}