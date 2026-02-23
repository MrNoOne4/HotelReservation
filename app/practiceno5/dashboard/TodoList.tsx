"use client";
"use strict";

import { Menu, X, PlusSquare, ClipboardList, LogOut} from "lucide-react";
import {useState, useEffect, useRef, ChangeEvent} from "react";
import Toast from "@/components/Toast";
import Modal from "@/components/Modal";

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
    taskDate: string
  }

    interface filterFormProps {
      taskName: string,
      taskStatus: string,
      taskPriority: string,
  }

  interface updateFormProps {
    taskName: string,
    taskStatus: string,
    taskPriority: string,
    taskDate: string,
    taskID?: 0,
    condition?: string,
  }

  const [taskForm, setTaskForm] = useState<formProps>({
        taskName: '',
        taskStatus: '',
        taskPriority: '',
        taskDate: ''
  })

  const [updateForm,setUpdateForm] = useState<updateFormProps>({
        taskName: '',
        taskStatus: '',
        taskPriority: '',
        taskDate: '',
        taskID: 0,
        condition: "All",
  })

    const [filterForm, setFilterFormForm] = useState<filterFormProps>({
        taskName: '',
        taskStatus: '',
        taskPriority: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setTaskForm(prev => ({...prev, [name]: value}))
  }

  const updateHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setUpdateForm(prev => ({...prev, [name]: value}))
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
        taskDate: ''
    })
  }

    const resetUpdateTaskForm = () => {
    setUpdateForm({
        taskName: '',
        taskStatus: '',
        taskPriority: '',
        taskDate: ''
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
    taskDate: string; 
  }

  const [task, setTask] = useState<Task[]>([]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const req = await fetch ('/api/todo/taskTodo', {
      method: "POST",
      body: JSON.stringify(taskForm),
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

    fetchTask();
    setForm(false);
    resetTaskForm();
  }

    const updateHandleSubmit = async (e: (React.FormEvent)) => {
      e.preventDefault();

      const req = await fetch ('/api/todo/taskTodo', {
        method: "PUT",
        body: JSON.stringify(updateForm),
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

      fetchTask();
      setUpdateTask(false);
      resetUpdateTaskForm();
  }

      const clickUpdateHandleSubmit = async (taskName: string, taskStatus: string, taskPriority: string, taskDate: string, index: number) => {
        setUpdateForm({
          taskName: taskName,
          taskStatus: taskStatus,
          taskPriority: taskPriority,
          taskDate: taskDate,
          taskID: index
        })
      const req = await fetch ('/api/todo/taskTodo', {
        method: "PUT",
        body: JSON.stringify(updateForm),
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

      fetchTask();
      setUpdateTask(false);
      resetUpdateTaskForm();
  }

  

  const fetchTask = async () => {
    try {
      const params = new URLSearchParams({
          taskName: filterForm.taskName || '',
          taskStatus: filterForm.taskStatus || '',
          taskPriority: filterForm.taskPriority || '',
        })

      const res = await fetch(`/api/todo/taskTodo?${params.toString()}`, {
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

       setTask(data.userTask)
        
    } catch (error) {
      console.error("Oops something went wrong while fetching students data", error);
    }
  }

    const [taskId, setTaskId] = useState<number>(0);
    const [modal, setModal] = useState<boolean>(false);
    const [updateTask, setUpdateTask] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => { fetchTask()}, 300);
        return () => clearTimeout(timer);
    }, [filterForm.taskName, filterForm.taskPriority, filterForm.taskStatus]);

    const openDeleteModal = (index: number) => {
      setModal(true);
      setTaskId(index);
    }

    const confirmDelete = async () => {
      const request = await fetch ('/api/todo/taskTodo', {
        method: "DELETE",
        body: JSON.stringify(taskId),
          headers: {
          "Content-Type": "application/json"
        }
      })

      const result = await request.json();
      if (!request.ok) {
         setFailedToast({show: true, message: result.message });
            setTimeout(() => {
                setFailedToast({show: false, message: result.message});
            }, 2000);
          return;
      }

     setSuccessToast({show: true, message: result.message });
        setTimeout(() => {
            setSuccessToast({show: false, message: result.message});
        }, 2000);
        fetchTask();
        setModal(false);
    }


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

        <div className="grid w-screen h-screen grid-cols-1 ml-0 2xl:gap-50 2xl:ml-10 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 overflow-y-scroll  ">
          {task?.map((e, index: number) => (
            <div className=" mx-auto max-h-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 my-4 " key={`${index}-${e.taskName}`}>
              <div className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-3">
                <h2 className="text-lg font-bold">Task Report</h2>
              </div>
              <div className="px-6 py-4 space-y-2">
  
    
              <p>
                <span className="font-medium mr-2">Task name:</span>
                <span className="inline-block  text-sm font-semibold text-white bg-yellow-500 rounded-full mr-2 px-4 py-1">{e.taskName}</span>
              </p>

              <p>
                <span className="font-medium mr-2">Status:</span>
                <span className="inline-block text-sm font-semibold text-white bg-yellow-500 rounded-full mr-2 px-4 py-1">{e.taskStatus}</span>
              </p>

              <p>
                <span className="font-medium mr-2">Priority:</span>
                <span className="inline-block text-sm font-semibold text-white bg-red-500 rounded-full mr-2 px-4 py-1">{e.taskPriority}</span>
              </p>

              <p><span className="font-medium">Deadline:</span> {e.taskDate}</p>
            </div>

            <div className="px-6 py-4 flex gap-2">
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer px-6 py-4" onClick={() => { clickUpdateHandleSubmit(e.taskName, e.taskStatus, e.taskPriority, e.taskDate, e.taskID)}}>Finish</button>
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer px-6 py-4" onClick={() => {setUpdateTask(true), setUpdateForm({
                taskName: e.taskName,
                taskStatus: e.taskStatus,
                taskPriority: e.taskPriority,
                taskDate: e.taskDate,
                taskID: e.taskID,
                condition: "All"
              })}}>Edit</button>
              <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200 cursor-pointer px-6 py-4" onClick={() => openDeleteModal(e.taskID)}>Remove</button>
            </div>
          </div>
              ))}
            </div>
      </div>


    <section
      className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-200 ease-in-out
        ${form ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className={`relative bg-white w-72 md:w-96 p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out
          ${form ? "translate-y-0 scale-100" : "-translate-y-full scale-95"}`}
      >
        <button
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
          onClick={() => {
            setForm(false);
            resetTaskForm();
          }}
        >
          <X color="black" />
        </button>

        <h1 className="text-2xl font-semibold text-center mb-6">Add Task</h1>
        <form method="POST" onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Task Name"
            className="block w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={taskForm.taskName}
            name="taskName"
            onChange={handleChange}
            required
          />

          <select
            className="block w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={taskForm.taskStatus}
            name="taskStatus"
            onChange={handleChange}
            required
          >
            {["Select Status","Select Status", "Pending", "In Progress", "Completed"].map((status, idx) => (
              <option key={idx} value={status} disabled={idx === 0} hidden={idx === 0}>
               {status}
              </option>
            ))}
          </select>

          <select
            className="block w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={taskForm.taskPriority}
            name="taskPriority"
            onChange={handleChange}
            required
          >
            {["Select Priority","Select Priority","Low Priority", "Medium Priority", "High Priority"].map((priority, idx) => (
              <option key={idx} value={priority} disabled={idx === 0} hidden={idx === 0}>
                {priority}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            className="block w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={taskForm.taskDate}
            name="taskDate"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 active:bg-blue-600 transition cursor-pointer"
          >
            Submit Task
          </button>
        </form>
      </div>
    </section>

    <section className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-200 ease-in-out ${formFilter ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      <div className={`relative bg-white  p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out  ${formFilter ? "translate-y-0 scale-100" : "-translate-y-full scale-95"} p-6`}>
        <button className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 transition cursor-pointer" onClick={() => {setFormFilter(false);resetTaskFilterForm(); }} >
          <X color="black" />
        </button>

        <h1 className="text-2xl font-semibold text-center mb-6">Filter Task</h1>
        <form method="GET" className="space-y-4">
          <input placeholder="Task Name" className="block w-70 px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400" value={filterForm.taskName} name="taskName" onChange={filterHandleChange}  />

          <select
            className="block w-70 px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filterForm.taskStatus}
            name="taskStatus"
            onChange={filterHandleChange}
            
          >
            {["", "Pending", "In Progress", "Completed"].map((status, idx) => (
              <option
                key={idx}
                value={status}
                disabled={idx === 0}
                hidden={idx === 0}
              >
                {idx === 0 ? "Select Status" : status}
              </option>
            ))}
          </select>

          <select
            className="block w-70 px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filterForm.taskPriority}
            name="taskPriority"
            onChange={filterHandleChange}
            
          >
            {["", "Low Priority", "Medium Priority", "High Priority"].map(
              (priority, idx) => (
                <option
                  key={idx}
                  value={priority}
                  disabled={idx === 0}
                  hidden={idx === 0}
                >
                  {idx === 0 ? "Select Priority" : priority}
                </option>
              )
            )}
          </select>

          <button
            type="submit"
            className="w-60 mx-auto block py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 active:bg-blue-600 transition cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </section>

        <section
      className={`fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs transition-opacity duration-200 ease-in-out
        ${updateTask ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className={`relative bg-white w-72 md:w-96 p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out
          ${updateTask ? "translate-y-0 scale-100" : "-translate-y-full scale-95"}`}
      >
        <button
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
          onClick={() => {
            setUpdateTask(false);
            resetUpdateTaskForm();
          }}
        >
          <X color="black" />
        </button>

        <h1 className="text-2xl font-semibold text-center mb-6">Edit Task </h1>
        <form method="POST" onSubmit={updateHandleSubmit} className="space-y-4">
          <input
            placeholder="Task Name"
            className="block w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={updateForm.taskName}
            name="taskName"
            onChange={updateHandleChange}
            required
          />

          <select
            className="block w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={updateForm.taskStatus}
            name="taskStatus"
            onChange={updateHandleChange}
            required
          >
            {["Select Status","Select Status", "Pending", "In Progress", "Completed"].map((status, idx) => (
              <option key={idx} value={status} disabled={idx === 0} hidden={idx === 0}>
               {status}
              </option>
            ))}
          </select>

          <select
            className="block w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={updateForm.taskPriority}
            name="taskPriority"
            onChange={updateHandleChange}
            required
          >
            {["Select Priority","Select Priority","Low Priority", "Medium Priority", "High Priority"].map((priority, idx) => (
              <option key={idx} value={priority} disabled={idx === 0} hidden={idx === 0}>
                {priority}
              </option>
            ))}
          </select>

          <input
            type="datetime-local"
            className="block w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={updateForm.taskDate}
            name="taskDate"
            onChange={updateHandleChange}
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 active:bg-blue-600 transition cursor-pointer"
          >
            Update Task
          </button>
        </form>
      </div>
    </section>

      <Toast label={failedToast.message} background="bg-[#FF0000]" padding='py-[0.8rem] px-[2rem]' condition={failedToast.show} translateTrue="translate-y-0" translateFalse="translate-y-[200%]"/>
      <Toast label={successToast.message} background="bg-[#90EE90]" padding='py-[0.8rem] px-[2rem]' condition={successToast.show} translateTrue="translate-y-0" translateFalse="translate-y-[200%]"/>
      <Modal isOpen={modal} label="Are you sure you want to delete this task?" modalInner="The action cannot be undone." methodClose={() => setModal(false)} buttonAccept="Delete" methodAccept={() => confirmDelete()}/>
        
    </div>
  );
}

export default TodoList;