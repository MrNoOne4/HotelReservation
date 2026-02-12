import { pool } from "../../../lib/studentDB";
import { NextRequest, NextResponse } from "next/server";
// import {prisma} from "../../hello-prisma/lib/prisma"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const yearLevel = searchParams.get("yearLevel");
        const program = searchParams.get("program");
        const search = searchParams.get("search");

        let query = "SELECT * FROM students WHERE 1=1"; 
        const params: (string | number)[] = [];

        if (yearLevel && yearLevel !== "All Year Level") {
            query += " AND yearLevel = ?";
            params.push(yearLevel);
        }

        if (program && program !== "All Program") {
            query += " AND collegeProgram = ?";
            params.push(program);
        }

        if (search && search.trim() !== "") {
            const searchTerm = `%${search.trim()}%`;
            query += " AND (firstName LIKE ? OR middleName LIKE ? OR lastName LIKE ? OR studentID LIKE ?)";
            params.push(searchTerm, searchTerm, searchTerm, searchTerm);
        }

        query += " LIMIT 10";

        const [rows] = await pool?.execute(query, params);
        return NextResponse.json({ students: rows }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST (request: NextRequest) {
    try {
        const formData = await request.formData();

        const firstName = formData.get("firstName") as string;
        const middleName = formData.get("middleName") as string;
        const lastName = formData.get("lastName") as string;
        const collegeProgram = formData.get("collegeProgram") as string;
        const yearLevel = formData.get("yearLevel") as string;
        const studentID = formData.get("studentID") as string;
        const gmail = formData.get("gmail") as string;
        const profilePicture = formData.get("profilePicture") as string;

        if (isNaN(Number(studentID))) {
            return NextResponse.json({ message: "Student ID must be a number" }, { status: 400 });
        }

        const [studentIDExists] = await pool?.execute("SELECT COUNT(*) as count FROM students WHERE studentID = ?", [studentID]);

        if ((studentIDExists as any)[0].count > 0) {
            return NextResponse.json({ message: "Student ID already exists. Enter another one" }, { status: 400 });
        }
        const [rows] = await pool?.execute("INSERT INTO students (firstName, middleName, lastName, collegeProgram, yearLevel, studentID, gmail, studentProfile) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [firstName, middleName, lastName, collegeProgram, yearLevel, studentID, gmail, profilePicture]);

        
        if (rows) {
            return NextResponse.json({ success: true, message: "Student added successfully" }, { status: 200 });
        }



    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const formData = await request.formData();
        const firstName = formData.get("firstName") as string;
        const middleName = formData.get("middleName") as string;
        const lastName = formData.get("lastName") as string;
        const collegeProgram = formData.get("collegeProgram") as string;
        const yearLevel = formData.get("yearLevel") as string;
        const studentID = formData.get("studentID") as string;
        const gmail = formData.get("gmail") as string;

        if (isNaN(Number(studentID))) {
            return NextResponse.json({ message: "Student ID must be a number" }, { status: 400 });
        }

        const [result] = await pool?.execute(
            "UPDATE students SET firstName = ?, middleName = ?, lastName = ?, collegeProgram = ?, yearLevel = ?, gmail = ? WHERE studentID = ?",
            [firstName, middleName, lastName, collegeProgram, yearLevel, gmail, studentID]
        );

        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ message: "Student not found or no changes made" }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: "Student updated successfully" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE (request: NextRequest) {
    try {
        const  searchParams  = await request.json();

        const [rows] = await pool?.execute("DELETE FROM students WHERE studentID = ?", [searchParams.studentID]);
        return NextResponse.json({ message: "Student ID  " + searchParams.studentID + ' Successfully deleted'}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}