"use client";
"use strict";

import { X } from "lucide-react";
import {useState, useEffect, useRef} from "react";


const TodoList = () => {
  const [taskName, setTaskName] = useState<string>('');
  const [formToggle, setFormToggle] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const divContainer = useRef<HTMLDivElement>(null);
  const formShake = useRef<HTMLFormElement> (null);

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


  return (
    <div className="box-border flex justify-center h-screen p-0 m-0 font-sans text-black bg-white">
      <div className="border border-black rounded-md w-[80%] my-10 auto relative inset-0">
          <section>
            <div className="mt-10 ">
              <hr className="mx-10 md:mx-30" />
                <h1 className="p-10 text-lg text-center lg:text-3xl">TodoList Crud using Next.Js MySQL</h1>
              <hr className="mx-10 md:mx-30" />
            </div>

              <div className="flex items-center mt-6 justify-evenly">
                    <button className="px-6 py-2 text-white bg-green-400 rounded-full cursor-pointer hover:bg-green-500" onClick={() => setFormToggle(true)}>Add List</button>
                    <button className="px-6 py-2 text-white bg-blue-400 rounded-full cursor-pointer hover:bg-blue-500" onClick={handleLogout}>View Finish task</button>
              </div>

              <div >
                  <div className="flex items-center justify-start gap-6 p-10">
                    <section className="relative ">
                        <input type="text" className="pr-5 ml-3 border-b outline-none w-50 peer" placeholder="" value={taskName} onChange={e => setTaskName(e.target.value)}/>
                        <label className="absolute top-0 font-semibold transition-all ease-in-out left-3 duration-250 peer-focus:-top-5 peer-not-placeholder-shown:-top-5 peer-focus:text-sm peer-not-placeholder-shown:text-sm">TaskName </label>
                        <button type="button" className={`absolute right-0 ${taskName.length === 0 ? "cursor-not-allowed" : "cursor-pointer"}`} title="Clear Input Field" onClick={() => setTaskName('')} disabled={taskName.length === 0}><X size={20} color="red"/></button>
                    </section>
                    
                    <section>
                      <label className="font-semibold" htmlFor="Status">Status:</label>
                      <select className="ml-2" id="Status">
                        <option value={"Pending"} defaultValue={"Select Status"} >Select Status</option>
                        <option value={"Pending"}>Pending</option>
                        <option value={"Progress"}>Progress</option>
                        <option value={"Completed"}>Completed</option>
                      </select>
                    </section>

                    <section>
                      <label className="font-semibold" htmlFor="Priority">Priority: </label>
                      <select className="ml-2" id="Priority">
                        <option value={""} defaultValue={"Select Priority"} >Select Priority</option>
                        <option value={"Low"}>Low</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"High"}>High</option>
                    </select>
                  </section>
                  </div>

                  <div className="grid grid-cols-5 gap-5">

                  </div>
              </div>
          </section>

          <section className={`h-screen w-screen transition-all duration-75 ease-in ${formToggle ? "z-50" : "z-[-1]"} bg-black/50 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center`} >
            <div ref={divContainer}>
              <form className="bg-white border-gray-600 w-100 h-150 " ref={formShake}>
                <div className="flex justify-end mb-4">
                      <button type="button" className="mt-10 mr-10 cursor-pointer" onClick={() => setFormToggle(false)}><X size={30} color="red"/></button>
                </div>

                <hr/>
                <h1 className="my-2 text-2xl font-semibold text-center">Add Task</h1>
                <hr/>


              </form>
            </div>
          </section>
      </div>
    </div>
  );
}

export default TodoList;