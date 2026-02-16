import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "../../../../hello-prisma/lib/prisma";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { firstName, lastName, gmail, password } = body;

        const user = await prisma.todolistaccount.findFirst({
            where: { gmail }
        });

        if (user) {
            return NextResponse.json(
                { error: "If it’s your Gmail, try “Forgot password” or “Sign in” to access the account already linked." },
                { status: 401 }
            );
        }

        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!regex.test(password)) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 number, and 1 special character." },
                { status: 400 }
            );
        }

        const hash = await bcryptjs.hash(password, 10);

        await prisma.todolistaccount.create({
            data: { firstName, lastName, gmail, userPassword: hash }
        });

            const findUser = await prisma.todolistaccount.findFirst({
                where: { gmail: gmail },
            });

            if (!findUser) {
                return NextResponse.json(
                    { error: "Failed to create user account" },
                    { status: 500 }
                );
            }

            const token = jwt.sign({ userID: findUser.userID }, process.env.JWT_SECRET!, { expiresIn: "1d" });
            const response = NextResponse.json({ success: true }, { status: 200 });
        
            response.cookies.set("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              path: "/",
              maxAge: 60 * 60 * 24,
              sameSite: "lax",
            });
        
            return response;
        
        
    } catch (error) {
        console.error("Signup API error:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
