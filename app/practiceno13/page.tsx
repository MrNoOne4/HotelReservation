import { prisma1 as prisma } from "../../hello-prisma/lib/prisma";
interface Student {
  studentID: number;
  studentName: string;
  studentAGE: number;
  studentGrade: string;
}

export default async function Page() {
  // Fetch all students (server-side)
  const students: Student[] = await prisma.studenttable.findMany();  
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Students List</h1>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Age</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentID}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {student.studentID}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {student.studentName}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {student.studentAGE}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {student.studentGrade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
