import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "../../../../hello-prisma/lib/prisma";

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

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error("Signup API error:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
