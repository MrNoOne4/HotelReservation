"use client";
"use strict";

import { X } from "lucide-react";
import {useState, useEffect} from "react";

const TodoList = () => {
  const [taskName, setTaskName] = useState<string>('');
  const [formToggle, setFormToggle] = useState<boolean>(true);

  return (
    <div className="m-0 p-0 box-border bg-white flex justify-center font-sans text-black h-screen">
      <div className="border border-black rounded-md w-[80%] my-10 auto relative inset-0">
          <section>
            <div className="mt-10  ">
              <hr className="md:mx-30 mx-10" />
                <h1 className="text-center lg:text-3xl p-10 text-lg">TodoList Crud using Next.Js MySQL</h1>
              <hr className="md:mx-30 mx-10" />
            </div>

              <div className="flex justify-evenly items-center mt-6">
                    <button className="cursor-pointer bg-green-400 hover:bg-green-500 px-6 py-2 text-white rounded-full" onClick={() => setFormToggle(true)}>Add List</button>
                    <button className="cursor-pointer bg-blue-400 hover:bg-blue-500 px-6 py-2 text-white rounded-full">View Finish task</button>
              </div>

              <div >
                  <div className="flex gap-6 p-10 items-center justify-start">
                    <section className=" relative ">
                        <input type="text" className="w-50 pr-5  border-b outline-none ml-3 peer" placeholder="" value={taskName} onChange={e => setTaskName(e.target.value)}/>
                        <label className="font-semibold absolute left-3 top-0 transition-all duration-250 ease-in-out peer-focus:-top-5 peer-not-placeholder-shown:-top-5 peer-focus:text-sm peer-not-placeholder-shown:text-sm">TaskName </label>
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

          <section className={`h-screen w-screen transition-all duration-75 ease-in ${formToggle ? "z-50" : "z-[-1]"} bg-black/50 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center`}>
            <form className="w-100 h-150 border-gray-600 bg-white ">
              <div className="flex justify-end">
                    <button type="button" className="cursor-pointer mt-10 mr-10" onClick={() => setFormToggle(false)}><X size={30} color="red"/></button>
              </div>

              
            </form>
          </section>
      </div>
    </div>
  );
}

export default TodoList;