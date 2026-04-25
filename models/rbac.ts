import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "../hello-prisma/lib/prisma";

export async function requireRole(allowedRoles: string[]) {
  const session = await getServerSession()

  if (!session?.user)
    return NextResponse.json({ message: "Not logged in" }, { status: 401 })

  const dbUser = await prisma.users.findUnique({
    where:  { Email: session.user.email! },
    select: { IsVerified: true, Role: true }
  })

  if (!dbUser?.IsVerified)
    return NextResponse.json(
      { message: "Your account has been disabled." },
      { status: 403 }
    )

  if (!allowedRoles.includes(dbUser.Role))
    return NextResponse.json({ message: "Access denied" }, { status: 403 })

  return null  // passed — proceed
}