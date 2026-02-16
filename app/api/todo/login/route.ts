import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "../../../../hello-prisma/lib/prisma";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.todolistaccount.findFirst({
      where: { gmail: email },
    });

    if (!user) {
      return NextResponse.json({ error: "Address Not Found" }, { status: 401 });
    }

    const isValid = await bcryptjs.compare(password, user.userPassword);

    if (!isValid) {
      return NextResponse.json({ error: "Password Don't Match" }, { status: 401 });
    }

    const token = jwt.sign({ userID: user.userID }, process.env.JWT_SECRET!, { expiresIn: "1d" });
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
    console.error("Login API error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
