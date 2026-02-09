"use strict";
"use client";

import {X} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Toast from "../../components/Toast";
import Modal from "../../components/Modal";

const StudentManagement = () => {

    const collegeProgramsPH: string[] = [
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


    interface Student {
        firstName: string;
        middleName: string;
        lastName: string;
        collegeProgram: string;
        yearLevel: string;
        studentID: string;
        gmail: string;
        profilePicture:  string;
    }

    const [form, setForm] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);

    const [students, setStudents] = useState<Student>({
        firstName: "",
        middleName: "",
        lastName: "",
        collegeProgram: "",
        yearLevel: "",
        studentID: "",
        gmail: "",
        profilePicture: ""
    });


    const [studentsList, setStudentsList] = useState<Student[]>([]);
    const [failedToast, setFailedToast] = useState<{show: boolean; message: string}>({show: false, message: ""});
    const [successToast, setSuccessToast] = useState<{show: boolean; message: string}>({show: false, message: ""});
    const [setprofile, viewProfile] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
         setStudents(prev => ({...prev, [name]: value}));
         
        if (type === "file") {
            const file = e.target.files?.[0];
            if (!file) {
                setFailedToast({show: true, message: "No file selected. Please choose a profile picture."});
                setTimeout(() => {
                    setFailedToast({show: false, message: ""});
                }, 2000)
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setStudents(prev => ({...prev, profilePicture: reader.result as string}));
            }
            reader.readAsDataURL(file);
        }
    }



    const updateHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;

         setUpdateStudentData(prev => ({...prev, [name]: value}));

        if (type === "file")  {
            const file = e.target.files?.[0];
            if (!file) {
                setFailedToast({show: true, message: "No file selected. Please choose a profile picture."});
                setTimeout(() => {
                    setFailedToast({show: false, message: ""});
                }, 2000)
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setUpdateStudentData(prev => ({...prev, profilePicture: reader.result as string}));
            }

            reader.readAsDataURL(file);
        }
    }

    const [id, getID] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!students.profilePicture) {
            setFailedToast({
                show: true,
                message: "Please select a profile picture"
            });
            setTimeout(() => {
                setFailedToast({show: false, message: "Please select a profile picture"});
            }, 2000);

            return;
        }

            const formData = new FormData();
            formData.append("firstName", students.firstName);
            formData.append("middleName", students.middleName);
            formData.append("lastName", students.lastName);
            formData.append("collegeProgram", students.collegeProgram);
            formData.append("yearLevel", students.yearLevel);
            formData.append("studentID", students.studentID);
            formData.append("gmail", students.gmail);
            formData.append("profilePicture", students.profilePicture);
            

        const res = await fetch("/api/studentApi", {
                method: "POST",
                body: formData,
            });
            
            const data = await res.json();

            if (!res.ok) {  
                setFailedToast({show: true, message: data.message });
                setTimeout(() => {
                    setFailedToast({show: false, message: data.message});
                }, 2000);
                return;
            }

            setSuccessToast({show: true, message: data.message });
            setTimeout(() => {
                setSuccessToast({show: false, message: data.message});
            }, 2000);
                
            setStudents({
                firstName: "",
                middleName: "",
                lastName: "",
                collegeProgram: "",
                yearLevel: "",
                studentID: "",
                gmail: "",
                profilePicture: ""
            })
            setForm(form => !form);

            fetchStudents();
        }

        const [yearLevelFilter, setYearLevelFilter] = useState<string>("All Year Level");
        const [programFilter, setProgramFilter] = useState<string>("All Program");
        const [searchQuery, setSearchQuery] = useState<string>("");

            
    const fetchStudents = async () => {
        try {
            const params = new URLSearchParams({
                yearLevel: yearLevelFilter || "",
                program: programFilter || "",
                search: searchQuery || "",
            });

            const res = await fetch (`/api/studentApi?${params.toString()}`, {
                method: "GET",
            });
  
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            const data = await res.json();
            setStudentsList(data.students);
        } catch (error) {
            console.error("Oops something went wrong while fetching students data", error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => { fetchStudents()}, 300);
        return () => clearTimeout(timer);
    }, [yearLevelFilter, programFilter, searchQuery]);

    const [studentProfile, setStudentProfile] = useState<Student | null>({
        firstName: "",
        middleName: "",
        lastName: "",
        collegeProgram: "",
        yearLevel: "",
        studentID: "",
        gmail: "",
        profilePicture: ""
    });

    const setViewProfile = (student: Student[], index: number) => {
            viewProfile(true);
            setStudentProfile({
                firstName: student[index].firstName,
                middleName: student[index].middleName,
                lastName: student[index].lastName,
                collegeProgram: student[index].collegeProgram,
                yearLevel: student[index].yearLevel,
                studentID: student[index].studentID,
                gmail: student[index].gmail,
                profilePicture: student[index].profilePicture
         });
    }

    const deleteStudent = async (studentID: string) => {
        const res = await fetch("/api/studentApi", {
            method: "DELETE",
            body: JSON.stringify({ studentID }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        if (!res.ok) {
            setFailedToast({show: true, message: data.message });
            setTimeout(() => {
                setFailedToast({show: false, message: data.message});
            }, 2000);
            return;
        }
                
        setSuccessToast({show: true, message: data.message });
        setTimeout(() => {
            setSuccessToast({show: false, message: data.message});
        }, 2000);
        fetchStudents();
    }

    const openModal = (studentID: string) => {
        setModal(true);
        getID(studentID);
    }

    const acceptDelete = () => {
        deleteStudent(id);
        setModal(false);
    }

    const [update, setUpdate] = useState<boolean>(false);

    
const [updateStudentData, setUpdateStudentData] = useState<Student>({
    firstName: "",
    middleName: "",
    lastName: "",
    collegeProgram: "",
    yearLevel: "",
    studentID: "",
    gmail: "",
    profilePicture: ""
});


    
    const updateStudent = async (e: React.FormEvent) => {
        e.preventDefault();
            const formdata = new FormData();
            formdata.append("firstName", updateStudentData.firstName);
            formdata.append("middleName", updateStudentData.middleName);
            formdata.append("lastName", updateStudentData.lastName);
            formdata.append("collegeProgram", updateStudentData.collegeProgram);
            formdata.append("yearLevel", updateStudentData.yearLevel);
            formdata.append("studentID", updateStudentData.studentID);
            formdata.append("gmail", updateStudentData.gmail);
            formdata.append("profilePicture", updateStudentData.profilePicture);

            const data = await fetch("/api/studentApi", {
                method : "PUT",
                body: formdata
            });

            const res = await data.json();
            if (!data.ok) {
                setFailedToast({show: true, message: res.message });
                setTimeout(() => {
                    setFailedToast({show: false, message: res.message});
                }, 2000);
                return;
            }

            setSuccessToast({show: true, message: res.message });
            setTimeout(() => {
                setSuccessToast({show: false, message: res.message});
            }, 2000);

            setUpdate(false);
            setUpdateStudentData({
                firstName: "",
                middleName: "",
                lastName: "",
                collegeProgram: "",
                yearLevel: "",
                studentID: "",
                gmail: "",
                profilePicture: ""
             });

             fetchStudents();
        }    
         


    return (
        <div className="box-border flex justify-center p-0 m-0 font-sans text-black bg-blue-200 over">
            <div className={`relative inset-0 p-10 ${form ? "overflow-hidden" : "overflow-y-auto"} h-screen bg-white rounded-sm `}>
                <h1 className="text-lg font-semibold text-center md:text-xl">Student Record Management System. CREATE, READ, UPDATE, DELETE</h1>
                <div className="mt-4">
                    <button  onClick={() => setForm(prev => !prev)} className="block px-4 py-2 mx-auto text-white bg-black rounded-md cursor-pointer">Add students</button>
                </div>
                <hr className="p-3 m-2 mt-3"></hr>

                <div className="flex flex-col gap-6 p-0 lg:flex-row lg:justify-between lg:items-center lg:p-10">
                    <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
                        <label className="mr-10">Year Level 
                            <select className="p-1 ml-2 border" value={yearLevelFilter} onChange={e => setYearLevelFilter(e.target.value)}>
                                <option defaultValue="All">All Year Level</option>
                                <option value="1st Year" >1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                            </select>
                        </label>

                        <label className="flex mr-10 text-center">Program 
                            <select className="p-1 ml-2 truncate border max-w-55" value={programFilter} onChange={e => setProgramFilter(e.target.value)} required>
                                <option value="" defaultValue="Select Program" >All Program</option>
                                <option className="p-1 ml-2 truncate border max-w-55">Bachelor of Science in Information Technology (BSIT)</option>
                                {collegeProgramsPH.map(e => (
                                    <option key={e} value={e}>{e}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="">Search</label>
                        <input type="text" className="p-1 ml-2 border" value={searchQuery} placeholder="Search by name or ID" onChange={e => setSearchQuery(e.target.value)}/>
                    </div>
                </div>

                <hr className="p-3 m-2 mt-3"></hr>
                <div className={`p-10 ${form ? "overflow-hidden" : "overflow-x-auto"}`}>
                    <table className="w-full text-center border border-collapse border-gray-400">
                        <thead>
                            <tr>
                                <th className="p-2 border">ID</th>
                                <th className="p-2 border">First Name</th>
                                <th className="p-2 border">Middle Name</th>
                                <th className="p-2 border">Last Name</th>
                                <th className="p-2 border">College Program</th>
                                <th className="p-2 border">Year Level</th>
                                <th className="p-2 border">Student ID</th>
                                <th className="p-2 border">Gmail</th>
                                <th className="p-2 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsList.map((student, index) => (
                                <tr key={index}>
                                    <td className="p-2 border">{index + 1}</td>
                                    <td className="p-2 border">{student.firstName}</td>
                                    <td className="p-2 border">{student.middleName}</td>
                                    <td className="p-2 border">{student.lastName}</td>
                                    <td className="p-2 border">{student.collegeProgram}</td>
                                    <td className="p-2 border">{student.yearLevel}</td>
                                    <td className="p-2 border">{student.studentID}</td>
                                    <td className="p-2 border">{student.gmail}</td>
                                    <td className="flex gap-4 p-2 border">
                                        <button className="px-3 py-1 mr-2 text-white bg-blue-500 rounded-sm cursor-pointer" onClick={() => {
                                            setUpdate(prev => !prev),
                                            setUpdateStudentData({
                                                firstName: student.firstName,
                                                middleName: student.middleName,
                                                lastName: student.lastName,
                                                collegeProgram: student.collegeProgram,
                                                yearLevel: student.yearLevel,
                                                studentID: student.studentID,
                                                gmail: student.gmail,
                                                profilePicture: student.profilePicture
                                            })
                                        }}>Edit</button>
                                        <button className="px-3 py-1 text-white bg-red-500 rounded-sm cursor-pointer" onClick={() => openModal(student?.studentID)}>Delete</button>
                                        <button className="px-3 py-1 text-white bg-green-500 rounded-sm cursor-pointer" onClick={() => setViewProfile(studentsList, index)}>View Profile</button>
                                    </td>   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={`inset-0 absolute  bg-black/50 flex items-center justify-center z-50 text-black transition-[opacity_z] duration-300 ease-in-out transform ${form ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <form method="POST" className={`p-3 md:p-10 border-none justify-center border bg-white transform duration-300 ease-in-out rounded-md ${form ? "translate-y-0" : "-translate-y-[200%]"}`} autoComplete="off" onSubmit={handleSubmit}>
                    <div className="flex justify-end">
                        <button type="button" className="cursor-pointer" onClick={() => {setForm(form => !form), 
                            setStudents({
                                firstName: "",
                                middleName: "",
                                lastName: "",
                                collegeProgram: "",
                                yearLevel: "",
                                studentID: "",
                                gmail: "",
                                profilePicture: ""
                            })
                        }}><X size={40}/></button>
                    </div>
                    <h1 className="mb-5 text-2xl font-semibold text-center">Add Student </h1>
                    <div className="flex items-center justify-between mt-6">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="p-1 ml-2 border-b outline-none" id="firstName" value={students.firstName} name="firstName" onChange={handleChange} required/>
                    </div>

                    <div className="flex items-center justify-between mt-6 ">
                        <label htmlFor="middleName">Middle Name</label>
                        <input type="text" className="p-1 ml-2 border-b outline-none" id="middleName" value={students.middleName} name="middleName" onChange={handleChange} required/>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="p-1 ml-2 border-b outline-none" id="lastName"  value={students.lastName} name="lastName" onChange={handleChange} required/>
                    </div>

                    <div className="flex items-center mt-6">
                        <label className="mr-8">College<br/>Program</label>
                            <select className="p-1 ml-2 truncate border max-w-55" value={students.collegeProgram} name="collegeProgram" onChange={handleChange} required>
                                <option value="" defaultValue="Select Program" disabled>Select Program</option>
                                <option>Bachelor of Science in Information Technology (BSIT)</option>
                                {collegeProgramsPH.map(e => (
                                    <option key={e} value={e}>{e}</option>
                                ))}
                            </select>
                    </div>
                    <div className="flex items-center mt-6">
                        <label className="mr-8" htmlFor="studentYear">Year Level</label>
                        <select className="p-1 truncate border w-55" id="studentYear" value={students.yearLevel} name="yearLevel" onChange={handleChange} required>
                            <option value="" defaultValue="Select Year Level" disabled>Select Year Level</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <label>Student ID</label>
                        <input type="text" className="p-1 ml-2 border-b outline-none" value={students.studentID} name="studentID" onChange={handleChange} required/>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <label>Gmail</label>
                        <input type="email" className="p-1 ml-2 border-b outline-none" value={students.gmail} name="gmail" onChange={handleChange} required/>
                    </div>


                     <div className="mt-6">
                       <div className="flex items-center justify-between">
                            <label>Profile Picture</label>
                                <input id="fileInput" type="file" className="hidden" accept="image/*" name="profilePicture" onChange={handleChange} />
                            <label htmlFor="fileInput" className="p-2.5 border border-black inline-block cursor-pointer ml-7" >Select Profile Picture</label>
                       </div>
                        <div className="truncate max-w-50">
                        </div>
                    </div>

                    <button className="block px-10 py-2 mx-auto mt-4 text-xl font-semibold text-white bg-green-500 rounded-sm cursor-pointer">Submit</button>
                </form>
             </div>

             <div className={`inset-0 absolute bg-black/50 flex items-center justify-center z-50 text-black transition-[opacity_z] duration-300 ease-in-out transform ${setprofile ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`p-10 border-none justify-center flex-col border bg-white transform duration-300 ease-in-out rounded-md ${setprofile  ? "translate-y-0" : "-translate-y-[200%]"}`} >
                        <button type="button" className="cursor-pointer" onClick={() => viewProfile(prev => !prev)}><X size={40}/></button>
                        <div className="flex justify-end"><img src={ studentProfile?.profilePicture ? studentProfile.profilePicture.startsWith("data:") ? studentProfile.profilePicture : `data:image/png;base64,${studentProfile.profilePicture}` : "/placeholder.png" } alt="Profile picture" className="w-1/2 h-1/2" />
                        <p>Name: {studentProfile?.firstName} {studentProfile?.middleName} {studentProfile?.lastName}</p>
    
                         </div>
                </div>
             </div>

            <div className={`inset-0 absolute bg-black/50 flex items-center justify-center z-50 text-black transition-[opacity_z] duration-300 ease-in-out transform ${update ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <form method="POST" className={`p-3 md:p-10  border-none justify-center border bg-white transform duration-300 ease-in-out rounded-md ${update ? "translate-y-0" : "-translate-y-[200%]"}`} autoComplete="off" onSubmit={updateStudent}>
                    <div className="flex justify-end">
                        <button type="button" className="cursor-pointer" onClick={() => {setUpdate(prev => !prev), 
                            setUpdateStudentData({
                                firstName: "",
                                middleName: "",
                                lastName: "",
                                collegeProgram: "",
                                yearLevel: "",
                                studentID: "",
                                gmail: "",
                                profilePicture: ""
                            })
                        }}><X size={40}/></button>
                    </div>
                    <h1 className="mb-5 text-2xl font-semibold text-center">Update Student </h1>
                    <div className="flex items-center justify-between mt-6">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="p-1 ml-2 border-b outline-none" id="firstName" value={updateStudentData.firstName} name="firstName" onChange={updateHandleChange} required/>
                    </div>

                    <div className="flex items-center justify-between mt-6 ">
                        <label htmlFor="middleName">Middle Name</label>
                        <input type="text" className="p-1 ml-2 border-b outline-none" id="middleName" value={updateStudentData.middleName} name="middleName" onChange={updateHandleChange} required/>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="p-1 ml-2 border-b outline-none" id="lastName"  value={updateStudentData.lastName} name="lastName" onChange={updateHandleChange} required/>
                    </div>

                    <div className="flex items-center mt-6">
                        <label className="mr-8">College<br/>Program</label>
                            <select className="p-1 ml-2 truncate border max-w-55" value={updateStudentData.collegeProgram} name="collegeProgram" onChange={updateHandleChange} required>
                                <option value="" defaultValue="Select Program" disabled>Select Program</option>
                                <option>Bachelor of Science in Information Technology (BSIT)</option>
                                {collegeProgramsPH.map(e => (
                                    <option key={e} value={e}>{e}</option>
                                ))}
                            </select>
                    </div>
                    <div className="flex items-center mt-6">
                        <label className="mr-8" htmlFor="studentYear">Year Level</label>
                        <select className="p-1 truncate border w-55" id="studentYear" value={updateStudentData.yearLevel} name="yearLevel" onChange={updateHandleChange} required>
                            <option value="" defaultValue="Select Year Level" disabled>Select Year Level</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <label>Student ID</label>
                        <input type="text" className="p-1 ml-2 border-b outline-none cursor-not-allowed" value={updateStudentData.studentID} name="studentID" onChange={updateHandleChange} disabled/>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <label>Gmail</label>
                        <input type="email" className="p-1 ml-2 border-b outline-none" value={updateStudentData.gmail} name="gmail" onChange={updateHandleChange} required/>
                    </div>


                    <button className="block px-10 py-2 mx-auto mt-4 text-xl font-semibold text-white bg-green-500 rounded-sm cursor-pointer">Update </button>
                </form>
             </div>

            <Modal isOpen={modal} label="Student Profile" modalInner={"Are you sure do you want to delete this student?"} buttonAccept="Yes" methodClose={() => setModal(() => false)} methodAccept={() => acceptDelete()}/>
            <Toast label={failedToast.message} background="bg-[#FF0000]" padding='py-[0.8rem] px-[2rem]' condition={failedToast.show} translateTrue="translate-y-0" translateFalse="translate-y-[200%]"/>
            <Toast label={successToast.message} background="bg-[#90EE90]" padding='py-[0.8rem] px-[2rem]' condition={successToast.show} translateTrue="translate-y-0" translateFalse="translate-y-[200%]"/>

        </div>
    )
}

export default StudentManagement;