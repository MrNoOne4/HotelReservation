import { prisma } from "../../../../hello-prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const room = await prisma.rooms.findMany({
      include: {
        bedtype: true,
        roomtype: true,
        images: true,
        roomamenities: {
          include: {
            amenity: true
          }
        }
      }
    });

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}