"use client";
"use strict";

import { Menu, X, PlusSquare, ClipboardList, LogOut} from "lucide-react";
import {useState, useEffect, useRef, ChangeEvent} from "react";
import Toast from "@/components/Toast";

const TodoList = () => {
  const [formToggle, setFormToggle] = useState<boolean>(false);
  const divContainer = useRef<HTMLDivElement>(null);
  const formShake = useRef<HTMLFormElement> (null);
  const [sidebar, setSideBar] = useState<boolean>(false)
  const [form, setForm] = useState<boolean>(false);
  const [formFilter, setFormFilter] = useState<boolean>(false);

  const handleLogout = async () => {
    await fetch("/api/todo/logout", {
      method: "POST",
    });

  window.location.href = "/practiceno5/login";
};
  
  useEffect(() => {
    const debounce = (func: (event: MouseEvent) => void, delay: number) => {
      let timer: ReturnType<typeof setTimeout>;
      return (event: MouseEvent) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(event), delay);
      };
    };

    const handleClick = (event: MouseEvent) => {
      if (formToggle && divContainer.current && !divContainer.current.contains(event.target as Node)) {
        formShake.current?.classList.add("shake");
        setTimeout(() => {
          formShake.current?.classList.remove("shake");
        }, 500);
      }
    };

    const debouncedClick = debounce(handleClick, 200);
    document.addEventListener("click", debouncedClick);

    return () => {
      document.removeEventListener("click", debouncedClick);
    };
  }, [formToggle]);

  interface formProps {
    taskName: string,
    taskStatus: string,
    taskPriority: string,
    taskDate: number
  }

    interface filterFormProps {
      taskName: string,
      taskStatus: string,
      taskPriority: string,
  }

  const [taskForm, setTaskForm] = useState<formProps>({
        taskName: '',
        taskStatus: '',
        taskPriority: '',
        taskDate: 0
  })

    const [FilterForm, setFilterFormForm] = useState<filterFormProps>({
        taskName: '',
        taskStatus: '',
        taskPriority: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setTaskForm(prev => ({...prev, [name]: value}))
  }
  
  const filterHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setFilterFormForm(prev => ({...prev, [name]: value}))
  }

  const resetTaskForm = () => {
    setTaskForm({
        taskName: '',
        taskStatus: '',
        taskPriority: '',
        taskDate: 0
    })
  }
    const [failedToast, setFailedToast] = useState<{show: boolean; message: string}>({show: false, message: ""});
    const [successToast, setSuccessToast] = useState<{show: boolean; message: string}>({show: false, message: ""});

  const resetTaskFilterForm = () => {
    setFilterFormForm({
        taskName: '',
        taskStatus: '',
        taskPriority: '',
    })
  }
   interface Task {
    taskName: string;
    taskStatus: string;
    taskPriority: string;
    taskDate: Date; 
  }


  const [task, setTask] = useState<Task[]>([]);
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const req = await fetch ('/api/todo/taskTodo', {
      method: "POST",
      body: JSON.stringify({taskForm}),
      headers: {
          "Content-Type": "application/json"
        }
    })

    const data = await req.json();

    if (!req.ok) {
        setFailedToast({show: true, message: data.message });
        setTimeout(() => {
            setFailedToast({show: false, message: data.message});
        }, 2000);
        return;
    }
    setTask(data.tasks);
    setSuccessToast({show: true, message: data.message });
    setTimeout(() => {
        setSuccessToast({show: false, message: data.message});
    }, 2000);

    resetTaskForm();
    fetchTask();
  }

  const fetchTask = async () => {
    try {
      const params = new URLSearchParams({
          taskName: FilterForm.taskName || '',
          taskStatus: FilterForm.taskPriority || '',
          taskPriority: FilterForm.taskStatus || '',
        })

        const res = await fetch (`/api/todo/taskTodo?${params.toString}`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          setFailedToast({show: true, message: data.message });
          setTimeout(() => {
              setFailedToast({show: false, message: data.message});
          }, 2000);
          return;
        }

        setTask(data);

        
    } catch (error) {
      console.error("Oops something went wrong while fetching students data", error);
    }
  }

    useEffect(() => {
        const timer = setTimeout(() => { fetchTask()}, 300);
        return () => clearTimeout(timer);
    }, [FilterForm.taskName, FilterForm.taskPriority, FilterForm.taskStatus]);
  
  return (
    <div className="box-border h-screen p-0 m-0 overflow-hidden font-sans text-black bg-white">
      <div className="flex">
        <section className={`flex flex-col w-60 items-start md:items-end h-screen transition-all duration-300 ease-in bg-white text-black border-r flex-start absolute lg:relative text-center md:translate-x-0 -translate-x-100 ${sidebar ? 'translate-x-0' : '-translate-x-100'}`}>
            <div>
              <div className="flex gap-2 mx-3 mt-4">
                <h1 className="text-2xl font-semibold">Todo List Task</h1>
                <button className="block cursor-pointer md:hidden" onClick={() => setSideBar(prev => !prev)}><X size={25}/></button>
              </div>
              
              <div>
                <button className="flex items-center w-full gap-2 px-4 py-2 text-lg text-green-500 cursor-pointer hover:bg-black/50" onClick={() => setForm(true)}> <PlusSquare size={18} />Add task</button>
                <button className="flex items-center w-full gap-2 px-4 py-2 text-lg cursor-pointer text-violet-500 hover:bg-black/50" onClick={() => setFormFilter(true)}> <PlusSquare size={18} />Filter Task</button>
                <button className="flex items-center w-full gap-2 px-4 text-lg text-blue-500 cursor-pointer hover:bg-black/50"> <ClipboardList size={18} />View Finish Task</button>
                <button className="flex items-center w-full gap-2 px-4 mt-1 text-lg text-red-500 cursor-pointer hover:bg-black/50" onClick={handleLogout}> <LogOut size={18} />Logout</button>
              </div>
            </div>
            
        </section>
        
        <div className="block bg-black/90 sm:hidden">
            <button className="m-5 cursor-pointer" onClick={() => setSideBar(prev => !prev)}><Menu color="white"/></button>
        </div>

        <div className="grid w-screen h-screen grid-cols-1 gap-2 ml-0 2xl:gap-10 2xl:ml-10 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 overflow-y-sc">

        </div>
      </div>


      <section className={`h-screen w-screen bg-black/50 absolute z-99999999 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${form ? 'z-auto' : 'z-[-1]'}  transition-all duration-200 ease-in-out`}>
            <div className={`absolute transition-all duration-200 ease-in-out -translate-x-1/2 ${form ? '-translate-y-1/2' : '-translate-y-100'} bg-white w-60 z-99999999 top-1/2 left-1/2 h-100 md:scale-[1.3] scale-[1]`}>
              <div className="flex justify-end ">
                  <button className="absolute p-2 m-2 cursor-pointer -top-2 -right-2" onClick={() => {setForm(false), resetTaskForm()}}><X color="black"/></button>
              </div>

              <form method="POST" onSubmit={handleSubmit}>
                  <h1 className="mt-4 mb-4 text-2xl font-semibold text-center">Add task</h1>
                  
                  <div className="mb-4">
                    <input placeholder="Task Name" className="block py-1 pl-4 mx-auto border w-[90%] rounded-sm" value={taskForm.taskName} name="taskName" onChange={handleChange} required/>
                  </div>
                  
                  <div className="mb-4 ">
                    <select className="block py-1 pl-4 mx-auto border w-[90%] rounded-sm" value={taskForm.taskStatus} name="taskStatus" onChange={handleChange} required>
    
                      {Array.from({length: 4}).map((e, index: number) => (
                        index === 0 ? <option defaultValue={"Select Status"} value={""} key={`${index}${""}`}>Select Status</option> : index === 1 ?
                        <option value={"Pending"} key={`${index}-Pending`}>Pending</option> : index === 2 ? <option value={"In Progress"} key={`${index}-InProgress`}>In Progress</option>
                        : <option value={"Completed"} key={`${index}-Completed`}>In Completed</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4 ">
                    <select className="block py-1 pl-4 mx-auto border w-[90%] rounded-sm" value={taskForm.taskPriority} name="taskPriority" onChange={handleChange} required>
                      {Array.from({length: 4}).map((e, index: number) => (
                        index === 0 ? <option defaultValue={"Select Priority"} value={""} key={`${index}${""}`}>Select Priority</option> : index === 1 ?
                        <option value={"Low Priority"} key={`${index}-Low Priority`}>Low Priority</option> : index === 2 ? <option value={"Medium Priority"} key={`${index}-Medium Priority`}>Medium Priority</option>
                        : <option value={"High Priority"} key={`${index}-High Priority`}>High Priority</option>
                      ))}
                      
                    </select>
                  </div>

                  <div className="mb-4">
                    <input type="datetime-local"  className="block py-1 pl-4 mx-auto border w-[90%] rounded-sm" value={taskForm.taskDate} name="taskDate" onChange={handleChange} required/>
                  </div>

                  <div className="mt-5">
                    <button className="block py-2 mx-auto text-white bg-blue-400 rounded-full cursor-pointer w-50 active:bg-blue-500 hover:bg-blue-500">Submit Task</button>
                  </div>
              </form>
            </div>
      </section>


            <section className={`h-screen w-screen bg-black/50 absolute z-99999999 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${formFilter ? 'z-auto' : 'z-[-1]'}  transition-all duration-200 ease-in-out`}>
            <div className={`absolute transition-all duration-200 ease-in-out -translate-x-1/2 ${formFilter ? '-translate-y-1/2' : '-translate-y-100'} bg-white w-60 z-99999999 top-1/2 left-1/2 h-100 md:scale-[1.3] scale-[1]`}>
              <div className="flex justify-end ">
                  <button className="absolute p-2 m-2 cursor-pointer -top-2 -right-2" onClick={() => {setFormFilter(false), resetTaskFilterForm()}}><X color="black"/></button>
              </div>

              <form method="GET">
                  <h1 className="mt-4 mb-4 text-2xl font-semibold text-center">Filter task</h1>
                  <div className="mb-4">
                    <input placeholder="Task Name" className="block py-1 pl-4 mx-auto border w-[90%] rounded-sm" value={FilterForm.taskName} name="taskName" onChange={filterHandleChange} required/>
                  </div>
                  
                  <div className="mb-4 ">
                    <select className="block py-1 pl-4 mx-auto border w-[90%] rounded-sm" value={FilterForm.taskStatus} name="taskStatus" onChange={filterHandleChange} required>
    
                      {Array.from({length: 4}).map((e, index: number) => (
                        index === 0 ? <option defaultValue={"Select Status"} value={""} key={`${index}${""}`}>Select Status</option> : index === 1 ?
                        <option value={"Pending"} key={`${index}-Pending`}>Pending</option> : index === 2 ? <option value={"In Progress"} key={`${index}-InProgress`}>In Progress</option>
                        : <option value={"Completed"} key={`${index}-Completed`}>In Completed</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4 ">
                    <select className="block py-1 pl-4 mx-auto border w-[90%] rounded-sm" value={FilterForm.taskPriority} name="taskPriority" onChange={filterHandleChange} required>
                      {Array.from({length: 4}).map((e, index: number) => (
                        index === 0 ? <option defaultValue={"Select Priority"} value={""} key={`${index}${""}`}>Select Priority</option> : index === 1 ?
                        <option value={"Low Priority"} key={`${index}-Low Priority`}>Low Priority</option> : index === 2 ? <option value={"Medium Priority"} key={`${index}-Medium Priority`}>Medium Priority</option>
                        : <option value={"High Priority"} key={`${index}-High Priority`}>High Priority</option>
                      ))}
                      
                    </select>
                  </div>

                    <div className="mt-5">
                      <button className="block py-2 mx-auto text-white bg-blue-400 rounded-full cursor-pointer w-50 active:bg-blue-500 hover:bg-blue-500">Submit</button>
                  </div>
              </form>


            </div>
      </section>
            <Toast label={failedToast.message} background="bg-[#FF0000]" padding='py-[0.8rem] px-[2rem]' condition={failedToast.show} translateTrue="translate-y-0" translateFalse="translate-y-[200%]"/>
            <Toast label={successToast.message} background="bg-[#90EE90]" padding='py-[0.8rem] px-[2rem]' condition={successToast.show} translateTrue="translate-y-0" translateFalse="translate-y-[200%]"/>
    </div>
  );
}

export default TodoList;