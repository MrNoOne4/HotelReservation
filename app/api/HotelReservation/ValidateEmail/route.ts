import { NextRequest, NextResponse } from "next/server";
import  { prisma }  from "../../../../hello-prisma/lib/prisma";

export async function POST(req: NextRequest) {
  return validateEmail(req);
}

export async function GET(req: NextRequest) {
  return validateEmail(req);
}

async function validateEmail(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) return NextResponse.json({ message: "Email required" }, { status: 400 });

    const find = await prisma.users.findFirst({ where: { 
      GuestEmail: email
     } });

    if (find) {
      return NextResponse.json({ message: "Please login using the provider's auth", user: false }, { status: 401 });
    }

    return NextResponse.json({ message: "User not found", user: true }, {status: 200});
  } catch (e) {
    return NextResponse.json({ message: e instanceof Error ? e.message : "Unknown error" }, { status: 500 });
  }
}