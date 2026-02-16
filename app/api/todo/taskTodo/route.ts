import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../hello-prisma/lib/prisma"
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const taskName = searchParams.get("taskName");
    const taskStatus = searchParams.get("taskStatus");
    const taskPriority = searchParams.get("taskPriority");

    const tasks = await prisma.task.findMany({
      where: {
        AND: [
          taskName
            ? { taskName: { contains: taskName } }
            : {},
          taskStatus
            ? { taskStatus }
            : {},
          taskPriority
            ? { taskPriority }
            : {},
        ],
      },
      orderBy: {
        taskDate: "desc",
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const task = await prisma.task.create({
      data: {
        taskName: body.taskName,
        taskStatus: body.taskStatus,
        taskPriority: body.taskPriority,
        taskDate: new Date(body.taskDate),
        userID: 1,
      },
    });

    return NextResponse.json(
      { message: "Task created successfully", task },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to create task" },
      { status: 500 }
    );
  }
}



export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updated = await prisma.task.update({
      where: {
        taskID: Number(params.id),
      },
      data: {
        taskName: body.taskName,
        taskStatus: body.taskStatus,
        taskPriority: body.taskPriority,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.task.delete({
      where: {
        taskID: Number(params.id),
      },
    });

    return NextResponse.json({ message: "Task deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete task" },
      { status: 500 }
    );
  }
}
