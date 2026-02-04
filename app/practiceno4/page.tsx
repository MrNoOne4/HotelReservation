"use client";
"use strict";

import React from 'react'
import { useState, useEffect, useMemo} from 'react';
import { X } from "lucide-react";
import Toast from "@/components/Toast"
import Modal from "@/components/Modal"
const PracticeNo4 = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    
    const collegeProgramsPH: string[] = [
        "Bachelor of Science in Information Technology (BSIT)",
        "Bachelor of Science in Computer Science (BSCS)",
        "Bachelor of Science in Business Administration (BSBA)",
        "Bachelor of Science in Accountancy (BSA)",
        "Bachelor of Science in Nursing (BSN)", 
        "Bachelor of Science in Civil Engineering (BSCE)",
        "Bachelor of Science in Mechanical Engineering (BSME)",
        "Bachelor of Science in Electrical Engineering (BSEE)",
        "Bachelor of Elementary Education (BEEd)",
        "Bachelor of Secondary Education (BSEd)",
        "Bachelor of Science in Hospitality Management (BSHM)",
        "Bachelor of Science in Tourism Management (BSTM)",
        "Bachelor of Arts in Communication (BACOMM)",
        "Bachelor of Arts in Psychology (AB Psychology)",
        "Bachelor of Science in Criminology (BS Criminology)"
    ];

    interface properties {
        firstName: string,
        middleName: string,
        lastName: string,
        program: string,
        yearLevel: string,
        studentID: number | string,
        gmail: string
    }

    const [form, getForm] = useState<properties>({
        firstName: '',
        middleName: '',
        lastName: '',
        program: '',
        yearLevel: '1st Year',
        studentID: '',
        gmail: ''
    })

    const [students, setStudent] = useState<properties[][]>(
          Array.from({ length: 15 }, () => [])
    )
    
    const [rowStudent, setRowStudent] = useState<properties[]>(students.flat());
        type Row = {
            studentID: number | string;
            program: string;
        };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
    const { name, value } = e.target;

      getForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    
    function handleUpdateSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const find = students.flat().some(item => item.studentID === form.studentID);
        if (find) {
            setToast({
                label: 'Student ID is already in the system it cannot be duplicate',
                condition: true,
                backgroundColor: 'bg-red-500'
            });

             setTimeout(() => setToast(prev => ({ ...prev, condition: false })), 3000);
            return;
        }
        const programIndex = collegeProgramsPH.indexOf(form.program);
        if (programIndex !== -1) {
            setStudent(prev => {
                const newItems = [...prev];
                newItems[programIndex] = [...newItems[programIndex], { ...form }];
                return newItems;
            });
        }
        getForm({
            firstName: '',
            middleName: '',
            lastName: '',
            program: '', 
            yearLevel: '1st Year',
            studentID: '',
            gmail: ''
        })

        setShowForm(false);

        setToast({
            label: 'Student Successfully added',
            condition: true,
            backgroundColor: 'bg-green-500'
        });

        setTimeout(() => setToast(prev => ({ ...prev, condition: false })), 3000);
    }

    const [row, setRow] = useState<Row>({
        studentID: 0,
        program: '',
    });

    const [toast, setToast] = useState({
        label: '',
        condition: false, 
        backgroundColor: ''
    })


    useEffect(() => {
        setRowStudent(students.flat());
    }, [students]);

    const [update, setUpdate] = useState<boolean>(false);
    const [formUpdate, setUpdateForm] = useState<properties>({
            firstName: '',
            middleName: '',
            lastName: '',
            program: '',
            yearLevel: '1st Year',
            studentID: '',
            gmail: ''
    })

    function updateFunction(e: properties) {
        setUpdateForm({...e})
        setRow({
            studentID: Number(e.studentID),
            program: e.program
        })
    }

    function updateHandleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value} =  e.target;
            setUpdateForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function updateHandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        
        e.preventDefault();

        let count: number = 0;
        const find = students.flat().some(item => {
            if (item.studentID === formUpdate.studentID) {
                count++;
            }
            return count > 1
        });

        if (find) {
            setToast({
                label: 'Student ID is already in the system it cannot be Updated',
                condition: true,
                backgroundColor: 'bg-red-500'
            });

            setTimeout(() => setToast(prev => ({ ...prev, condition: false })), 3000);
            return;
        }

        const programIndex = collegeProgramsPH.indexOf(row.program)
        const column = students[programIndex].findIndex(s => String(s.studentID) === String(row.studentID));
        if (column !== -1 && programIndex !== -1) {
            setStudent((prev) => {
                const newItem = [...prev];
                newItem[programIndex][column] = {
                    firstName: formUpdate.firstName,
                    middleName: formUpdate.middleName,
                    lastName: formUpdate.lastName,
                    program: formUpdate.program,
                    yearLevel: formUpdate.yearLevel,
                    studentID: formUpdate.studentID,
                    gmail: formUpdate.gmail
                }
                return newItem
            })
            setToast({
                label: 'Student Info Successfully Updated',
                condition: true,
                backgroundColor: 'bg-green-500'
            });
            setTimeout(() => setToast(prev => ({ ...prev, condition: false })), 3000);
            setUpdate(false);
        }
    }

    const [stateDelete, setStateDelete] = useState<Row>({
        studentID: '',
        program: ''
    })

    const [modalOn, setModalOn] = useState<boolean>(false);
    function deleteInfo() {
        const index = collegeProgramsPH.indexOf(stateDelete.program);
            setStudent(prev => {
                const newItem = [...prev];
                newItem[index] = newItem[index].filter(s => s.studentID !== stateDelete.studentID);
                return newItem;
            });
            setToast({
                label: 'Student Info Successfully Deleted',
                condition: true,
                backgroundColor: 'bg-green-500'
            });
            setTimeout(() => setToast(prev => ({ ...prev, condition: false })), 3000);
            setModalOn(false)
    }
    const [filterValue, setFilterValue] = useState<string>('');

    useEffect(() => {
        if (!filterValue) {
            setRowStudent(students.flat());
            return;
        }
        
        const timerId = setTimeout(() => {
            const items = students.flat().filter(item => String(item.studentID).includes(filterValue));
            setRowStudent(items);
        }, 500)

        return () => clearTimeout(timerId);
    }, [filterValue])

    const [filter, setFilter] = useState({
        yearLevel: '',
        course: ''
    })

    useMemo(() => {
        if (filter.yearLevel === "All Year" && filter.course === "All Program") {
            setRowStudent(students.flat());
            return;
        } 

        if (filter.yearLevel === "All Year") {
            const items = students.flat().filter(item => item.program === filter.course);
            setRowStudent(items);
            return;
        }

        if (filter.course === "All Program") {
            const items = students.flat().filter(item => item.yearLevel === filter.yearLevel);
            setRowStudent(items);
            return;
        }

        const items = students.flat().filter(item => item.yearLevel === filter.yearLevel && item.program === filter.course);
        setRowStudent(items);
        

    }, [filter.yearLevel, filter.course])
    

  return (
    <div className='m-0 p-0 border h-screen w-screen font-sans bg-blue-200 text-black flex justify-center items-center '>
        <div className='h-screen w-screen lg:h-[80vh] lg:w-[60vw] shadow-[0_0_0_1px_rgba(0,0,0,0.05)] lg:rounded-lg bg-white '>
            <div>
                <h1 className='text-center text-lg md:text-md xl:text-2xl mt-3 font-semibold'>Student Record Management System. CREATE, READ UPDATE, DELETE (CRUD)</h1><br/>
                <button className='mx-auto block bg-black hover:bg-[#333333] cursor-pointer text-white font-semibold px-1 py-2.5 lg:px-[0.7rem] lg:py-[0.5rem] rounded-md' onClick={() => setShowForm(prev => !prev)}>Add Students</button>
            </div>
                <hr className='mt-3 w-[95%] block mx-auto'/>
            <div className='flex flex-col 2xl:flex-row justify-between'>
                    <div className='flex flex-col 2xl:flex-row'>
                    <div className='flex gap-1 items-center mt-3 ml-7'>
                        <h5>Year level</h5>
                        <select className='border rounded-xs py-0.5 px-1 text-sm lg:text-lg cursor-pointer' value={filter.yearLevel} onChange={e => {setFilter((prev) => ({
                            ...prev, yearLevel: e.target.value
                        }))}}>
                            <option value={"All Year"}>All Year</option>
                            <option value={"1st Year"}>1st Year</option>
                            <option value={"2nd Year"}>2nd Year</option>
                            <option value={"3rd Year"}>3rd Year</option>
                            <option value={"4th Year"}>4th Year</option>
                        </select>
                    </div>

                    <div className='flex gap-1 items-center mt-3 ml-7'>
                        <h5>Program</h5>
                        <select className='border rounded-xs py-0.5 px-1 text-sm lg:text-md cursor-pointer' value={filter.course} onChange={e => {setFilter((prev) => ({
                            ...prev, course: e.target.value
                        }))}}>
                            <option value={"All Program"}>All Program</option>
                            {collegeProgramsPH.map((e, index) => (
                                <option value={`${e}`} key={`${e}-${index}`}>
                                    {e}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='flex gap-1 items-center mt-3 ml-7 lg:mr-7'>
                    <h5>Search</h5>
                    <input className='border placeholder:ml-7 placeholder:block placeholder:text-sm' placeholder=' Student ID' value={filterValue} onChange={e => setFilterValue(e.target.value)}/>
                </div>
            </div>

           <div className='overflow-scroll'>
                <table className='w-full font-normal border-collapse mt-3 text-left break-words whitespace-normal'>
                <thead className='border-b-1 border-black'>
                    <tr className='text-center'>
                        <th className='px-3 py-5'>#</th>
                        <th className='px-3 py-5'>First Name</th>
                        <th className='px-3 py-5'>Middle Name</th>
                        <th className='px-3 py-5'>Last Name</th>
                        <th className='px-3 py-5'>College Program</th>
                        <th className='px-3 py-5'>Year Level</th>
                        <th className='px-3 py-5'>Student ID</th>
                        <th className='px-3 py-5'>Gmail</th>
                        <th className='px-3 py-5'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {rowStudent.map((element: properties, index: number) => (
                        <tr key={`${element.studentID}-${index}`} className='text-center'>
                                <td className='whitespace-normal break-words'>{index + 1}</td>
                                <td className='whitespace-normal break-words'>{element.firstName}</td>
                                <td className='whitespace-normal break-words'>{element.middleName}</td>
                                <td className='whitespace-normal break-words'>{element.lastName}</td>
                                <td className='whitespace-normal break-words'>{element.program}</td>
                                <td className='whitespace-normal break-words'>{element.yearLevel}</td>
                                <td className='whitespace-normal break-words'>{element.studentID}</td>
                                <td className='whitespace-normal break-words'>{element.gmail}</td>
                                <td className='flex gap-3 mt-3 ml-2 whitespace-normal break-words'>
                                    <button className={`p-[0.5rem] px-[1.125rem] border-none text-[0.875rem] cursor-pointer bg-blue-500 text-white hover:bg-blue-600`} onClick={() => {setUpdate(prev => !prev); updateFunction(element)}} >Update </button>
                                    <button className={`p-[0.5rem] px-[1.125rem] mr-[1rem] border-none text-[0.875rem] cursor-pointer bg-red-500 text-white hover:bg-red-600`} onClick={() => {setModalOn(prev => !prev); setStateDelete({
                                        studentID: element.studentID,
                                        program: element.program
                                    })}} >Delete</button>
                                </td>
                        </tr>
                    ))}

                </tbody>
            </table>
           </div>

            <div>
                 <Toast label={toast.label} background={toast.backgroundColor} padding='py-[0.8rem] px-[2rem]' condition={toast.condition} translateTrue="translate-y-0" translateFalse="translate-y-[200%]"/>
            </div>

            <div>
                <Modal isOpen={modalOn} label='Are you sure you want to delete this?' modalInner='This action cannot be undone' buttonAccept='Continue' methodClose={() => setModalOn(prev => !prev)} methodAccept={() => deleteInfo()}/>
            </div>
        </div>

        <div className={`h-screen w-screen absolute ${showForm ? 'bg-black/50' : 'bg-transparent'} ${showForm ? 'z-[1]' : 'z-[-1]'}`}>
             <div className={`absolute top-1/2 left-1/2 transform ${showForm ? '-translate-y-1/2 ' : '-translate-y-[200%]'} transition-all duration-150 ease-in-out -translate-x-1/2  h-1/2 w-1/2 sm:w-[30vw] lg:w-[25vw] xl:w-[15vw] transform scale-[1.5] bg-white`}>
                    <div className='p-3 relative overflow-hidden'>
                        <div className='flex justify-between items-center'>
                            <h1 className="text-xl">Add student data</h1>
                            <button className='cursor-pointer' title="Close Form" aria-label="Close" onClick={() => {setShowForm(false); 
                                        getForm({
                                            firstName: '',
                                            middleName: '',
                                            lastName: '',
                                            program: '', 
                                            yearLevel: '',
                                            studentID: '',
                                            gmail: ''
                                        })


                            }}><X size={20} color='red'/></button>
                        </div>
                        
                        <form className='flex flex-col gap-5 mt-5' autoComplete="off" onSubmit={e => handleUpdateSubmit(e)}>

                            <div className='relative w-full  transition-all duration-200 ease-in-out'>
                                <input type="text" className="w-full  peer transition-all duration-150 ease-in-out focus:outline-none border-b-1 border-b-black" name="firstName" value={form.firstName} placeholder='' onChange={handleChange} required/>
                                <label className='absolute top-0 left-2 peer-focus:-top-5 transition-all ease-in-out peer-focus:text-sm peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:-top-5'>First Name</label>
                            </div>

                            <div className='relative  w-full transition-all duration-200 ease-in-out'>
                                <input type="text" className="w-full  peer transition-all duration-150 ease-in-out  focus:outline-none border-b border-b-black" name="middleName" value={form.middleName} placeholder='' onChange={handleChange} required/>
                                <label className='absolute top-0 left-2 peer-focus:-top-5 transition-all ease-in-out peer-focus:text-sm peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:-top-5'>Middle Name</label>
                            </div>

                            <div className='relative  w-full  transition-all duration-200 ease-in-out'>
                                <input type="text" className="w-full  peer transition-all duration-150 ease-in-out  focus:outline-none border-b border-b-black" name="lastName" value={form.lastName} placeholder='' onChange={handleChange} required/>
                                <label className='absolute top-0 left-2 peer-focus:-top-5 transition-all ease-in-out peer-focus:text-sm peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:-top-5'>Last Name</label>
                            </div>

                            <div>
                                <h1>Program</h1>
                                <select className='border rounded-xs text-xs w-[99%]' name='program' value={form.program} onChange={handleChange} required>
                                    <option disabled value=''>Student Program</option>
                                    {collegeProgramsPH.map((e, index) => (
                                        <option value={`${e}`} key={`${index}-${e}`}>
                                            {e}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <h5>Year level</h5>
                                <select className='border rounded-xs text-xs w-[99%]' name='yearLevel' value={form.yearLevel} onChange={handleChange} required>
                                    <option value={"1st Year"}>1st Year</option>
                                    <option value={"2nd Year"}>2nd Year</option>
                                    <option value={"3rd Year"}>3rd Year</option>
                                    <option value={"4th Year"}>4th Year</option>
                                </select>
                            </div>

                            <div className='relative bg-white w-full  transition-all duration-200 ease-in-out'>
                                <input type="number" className="w-full  peer transition-all duration-150 ease-in-out focus:outline-none  border-b border-b-black" name="studentID" value={form.studentID} placeholder='' onChange={handleChange} required/>
                                <label className='absolute top-0 left-2 peer-focus:-top-5 transition-all ease-in-out peer-focus:text-sm peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:-top-5'>Student ID</label>
                            </div>

                            <div className='relative bg-white w-full  transition-all duration-200 ease-in-out'>
                                <input type="email" className="w-full  peer transition-all duration-150 ease-in-out focus:outline-none  border-b border-b-black" name="gmail"  value={form.gmail} placeholder='' onChange={handleChange} required/>
                                <label className='absolute top-0 left-2 peer-focus:-top-5 transition-all ease-in-out peer-focus:text-sm peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:-top-5'>Gmail</label>
                            </div>
                            <button className='bg-blue-400 hover:bg-blue-500 cursor-pointer text-white font-semibold'>Submit </button>
                        </form>
                    </div>
             </div>
        </div>


        <div className={`h-screen w-screen absolute ${update ? 'bg-black/50' : 'bg-transparent'} ${update ? 'z-[1]' : 'z-[-1]'}`}>
             <div className={`absolute top-1/2 left-1/2 transform ${update ? '-translate-y-1/2 ' : '-translate-y-[200%]'} transition-all duration-150 ease-in-out -translate-x-1/2  h-1/2 w-1/2 sm:w-[30vw] lg:w-[25vw] xl:w-[15vw] transform scale-[1.5] bg-white`}>
                    <div className='p-3 relative overflow-hidden'>
                        
                        <div className='flex justify-between items-center'>
                            <h1 className="text-xl">Update student data</h1>
                            <button className='cursor-pointer' title="Close Form" aria-label="Close" onClick={() => {setUpdate(false); setUpdateForm({
                                firstName: '',
                                middleName: '',
                                lastName: '',
                                program: '',
                                yearLevel: '',
                                studentID: '',
                                gmail: ''
                            })}}><X size={20} color='red'/></button>
                        </div>
                        
                        <form className='flex flex-col gap-5 mt-5' autoComplete="off" onSubmit={e => updateHandleSubmit(e)}>

                            <div className='relative w-full  transition-all duration-200 ease-in-out'>
                                <input type="text" className="w-full  peer transition-all duration-150 ease-in-out  focus:outline-none  border-b-1 border-b-black" name="firstName" value={formUpdate.firstName} placeholder='' onChange={updateHandleChange} required/>
                                <label className='absolute top-0 left-2 peer-focus:-top-5 transition-all ease-in-out peer-focus:text-sm peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:-top-5'>First Name</label>
                            </div>

                            <div className='relative  w-full transition-all duration-200 ease-in-out'>
                                <input type="text" className="w-full  peer transition-all duration-150 ease-in-out  focus:outline-none border-b border-b-black" name="middleName" value={formUpdate.middleName} placeholder='' onChange={updateHandleChange} required/>
                                <label className='absolute top-0 left-2 peer-focus:-top-5 transition-all ease-in-out peer-focus:text-sm peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:-top-5'>Middle Name</label>
                            </div>

                            <div className='relative  w-full  transition-all duration-200 ease-in-out'>
                                <input type="text" className="w-full  peer transition-all duration-150 ease-in-out  focus:outline-none border-b border-b-black" name="lastName" value={formUpdate.lastName} placeholder='' onChange={updateHandleChange} required/>
                                <label className='absolute top-0 left-2 peer-focus:-top-5 transition-all ease-in-out peer-focus:text-sm peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:-top-5'>Last Name</label>
                            </div>

                            <div>
                                <h1>Program</h1>
                                <select className='border rounded-xs text-xs w-[99%]' name='program' value={formUpdate.program} onChange={updateHandleChange} required>
                                    <option disabled value=''>Student Program</option>
                                    {collegeProgramsPH.map((e, index) => (
                                        <option value={`${e}`} key={`${index}-${e}`}>
                                            {e}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <h5>Year level</h5>
                                <select className='border rounded-xs text-xs w-[99%]' name='yearLevel' value={formUpdate.yearLevel} onChange={updateHandleChange} required>
                                    <option value={"1st Year"}>1st Year</option>
                                    <option value={"2nd Year"}>2nd Year</option>
                                    <option value={"3rd Year"}>3rd Year</option>
                                    <option value={"4th Year"}>4th Year</option>
                                </select>
                            </div>

                            <div className='relative bg-white w-full  transition-all duration-200 ease-in-out'>
                                <input type="number" className="w-full  peer transition-all duration-150 ease-in-out focus:outline-none  border-b border-b-black cursor-not-allowed" name="studentID" value={formUpdate.studentID} placeholder='' onChange={updateHandleChange} required disabled/>
                                <label className='absolute top-0 left-2 peer-focus:-top-5 transition-all ease-in-out peer-focus:text-sm peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:-top-5'>Student ID</label>
                            </div>

                            <div className='relative bg-white w-full  transition-all duration-200 ease-in-out'>
                                <input type="email" className="w-full  peer transition-all duration-150 ease-in-out focus:outline-none  border-b border-b-black" name="gmail"  value={formUpdate.gmail} placeholder='' onChange={updateHandleChange} required/>
                                <label className='absolute top-0 left-2 peer-focus:-top-5 transition-all ease-in-out peer-focus:text-sm peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:-top-5'>Gmail</label>
                            </div>
                            <button className='bg-blue-400 hover:bg-blue-500 cursor-pointer text-white font-semibold'>Update Submit </button>
                        </form>
                    </div>
             </div>
        </div>
    </div>
  )
}

export default PracticeNo4
