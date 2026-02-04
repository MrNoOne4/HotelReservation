"use client";
"use strict";

import React from 'react'
import { useEffect, useState } from 'react';

const StudentDb = () => {
  interface studentProp {
    studentID: number;
    studentFirstName: string;
    studentMiddleName: string;
    studentLastName: string;
    studentAge: number;
  }

  const [students, setStudents] = useState<studentProp[]>([]);

  useEffect(() => {
     try {
      const fetchStudents = async () => {
        const response = await fetch('/api/FolderStudentDB');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setStudents(data.students);
      }

     fetchStudents();
     } catch (error) {
        console.log("Error fetching students:", error);
     }


  }, []);


  return (
    <div className='flex h-screen justify-center items-center flex-col'>
      <h1 className='text-3xl font-bold underline'>Student Database Page</h1>
      <div>
          <table className='w-1/2'>
            <thead>
              <tr>
                <th className='border px-4 py-2'>studentID</th>
                <th className='border px-4 py-2'>studentFirstName</th>
                <th className='border px-4 py-2'>studentMiddleName</th>
                <th className='border px-4 py-2'>studentLastName</th>
                <th className='border px-4 py-2'>studentAge</th>
              </tr>
            </thead>

            <tbody>
              {students.map((students) => (
                <tr key={students.studentID}>
                  <td className='border px-4 py-2'>{students.studentID}</td>
                  <td className='border px-4 py-2'>{students.studentFirstName}</td>
                  <td className='border px-4 py-2'>{students.studentMiddleName}</td>
                  <td className='border px-4 py-2'>{students.studentLastName}</td>
                  <td className='border px-4 py-2'>{students.studentAge}</td>
                </tr>
              ))}
            </tbody>

          </table>
      </div>

    </div>
  )
}

export default StudentDb;