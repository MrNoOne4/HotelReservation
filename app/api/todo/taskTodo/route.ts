import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../hello-prisma/lib/prisma"
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {

    interface JwtPayload {
      userID: number; 
    }

    const token = request.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const taskStatus = searchParams.get("taskStatus");
    const taskPriority = searchParams.get("taskPriority");
    const taskName = searchParams.get("taskName");

    // Build the Prisma 'where' object dynamically
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const taskId = decoded.userID

    const where: any = { userID: taskId, taskFinish: false };

    if (taskStatus && taskStatus !== "Select Status") {
      where.taskStatus = taskStatus;
    }

    if (taskPriority && taskPriority !== "Select Priority") {
      where.taskPriority = taskPriority;
    }

    if (taskName && taskName.trim() !== "") {
      const searchTerm = taskName.trim();
      where.OR = [
        { taskName: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

  const userTask = await prisma.task.findMany({
      where,
      take: 10,
      select: {
        taskID: true,
        taskName: true,
        taskStatus: true,
        taskPriority: true,
        taskDate: true,
    },
  });

    return NextResponse.json({ userTask }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    interface JwtPayload {
      userID: number; 
    }
    const { taskName, taskStatus, taskPriority, taskDate } = await request.json();

    if (!taskName || !taskStatus || !taskPriority || !taskDate || taskStatus === "Select Status" || taskPriority === "Select Priority" ) {
        return NextResponse.json({ message: "All field are required to fill up" }, { status: 401 });
    }
    

    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const taskId = decoded.userID

    const userTask = await prisma.task.create({
      data: {
         userID: taskId,
         taskName: taskName,
         taskStatus: taskStatus,
         taskPriority: taskPriority,
         taskDate: taskDate,
      }
    })

    return NextResponse.json(
      { message: "Task created successfully", userTask},
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



export async function PUT(request: NextRequest) {
  try {
    const {taskName, taskStatus,taskPriority,taskDate,taskID, condition} = await request.json();
    
    if (!taskName || !taskStatus || !taskPriority || !taskDate || taskStatus === "Select Status" || taskPriority === "Select Priority" ) {
        return NextResponse.json({ message: "All field are required to fill up" }, { status: 401 });
    }
    
    if (condition === "All") {
      const updated = await prisma.task.update({
        where: {
          taskID: Number(taskID),
        },
        data: {
          taskName: taskName,
          taskStatus: taskStatus,
          taskPriority: taskPriority,
          taskDate: taskDate
        },
      });
    return NextResponse.json({message: "Task successfully updated"}, {status: 200});
    } else {
      const updated = await prisma.task.update({
        where: {
          taskID: Number(taskID),
        },
        data: {
          taskFinish: true
        },
      });
          return NextResponse.json({message: "Task successfully updated"}, {status: 200});

    }

  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const  params  = await request.json();
    await prisma.task.delete({
      where: {
        taskID: params,
      },
    });

      return NextResponse.json({ message:'Task  Successfully deleted'}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete task" },
      { status: 500 }
    );
  }
}
