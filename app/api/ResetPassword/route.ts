
import { prisma }  from "../../../hello-prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, newPassword, confirmNewPassword, } = body;


    if (!newPassword || !confirmNewPassword) {
      return NextResponse.json(
        { message: "New password and confirmation are required" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmNewPassword) {
      return NextResponse.json({ message: "New passwords do not match" }, { status: 400 });
    }

    const findUser = await prisma.users.findUnique({ where: { GuestEmail: email } });

    if (!findUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }


    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    await prisma.users.update({
      where: { GuestEmail: email },
      data: { GuestPassword: hashedPassword },
    });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (e) {
    return NextResponse.json(
      { message: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    );
  }
}

