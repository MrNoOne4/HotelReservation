import { prisma } from "../../../../hello-prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    const room = await prisma.rooms.findMany({
      where: category && category !== "All"
        ? {
            RoomTypeId: Number(category),
          }
        : undefined, 
          
      include: {
        bedtype: true,
        roomtype: true,
        images: true,
        roomamenities: {
          include: {
            amenity: true,
          },
        },
      },

      orderBy: {
        RoomId: "desc",
      },
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