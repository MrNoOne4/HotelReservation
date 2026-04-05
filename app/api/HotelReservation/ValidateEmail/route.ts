import { NextRequest, NextResponse } from "next/server";
import  { prisma }  from "../../../../hello-prisma/lib/prisma";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
  return validateEmail(req);
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  const action = url.searchParams.get("action");

  if (action === "validateEmail") return validateEmail(req);
  if (action === "changePassword") {
    const user = await prisma.users.findFirst({ where: { GuestEmail: String(email) } });
    if (user?.GuestPassword === null) {
      return NextResponse.json({ message: "User registered with provider's auth, please login using the provider", havePassword: false }, { status: 401 });
    }
    return NextResponse.json({ message: "User registered with email and password, please login using email and password", havePassword: true }, { status: 200 });
  }

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

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, action, currentpassword, newPassword } = body;

    if (action === "changePassword") {
      if (!currentpassword || !newPassword) {
        return NextResponse.json({ message: "Current password and new password are required" }, { status: 400 });
      }

      const findacc = await prisma.users.findUnique({ where: { GuestEmail: email } });
      if (!findacc) return NextResponse.json({ message: "User not found" }, { status: 404 });

      const compare = await bcryptjs.compare(currentpassword, findacc.GuestPassword);
      if (!compare) return NextResponse.json({ message: "Current password is incorrect" }, { status: 401 });

      const hashedPassword = await bcryptjs.hash(newPassword, 10);
      await prisma.users.update({
        where: { GuestEmail: email },
        data: { GuestPassword: hashedPassword },
      });

      return NextResponse.json({ message: "Password updated successfully" });
    }
    return NextResponse.json({ message: "Invalid action" }, { status: 400 });

  } catch (e) {
    return NextResponse.json(
      { message: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}



