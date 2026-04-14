import  { prisma }  from "../../../../hello-prisma/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    
  const room = await prisma.rooms.findMany({
    include: {
      bedtypes: true,
      roomtypes: true,
      images: true,
      roomservices: {
        include: {
          service: true
        }
      }
    }
  });

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

