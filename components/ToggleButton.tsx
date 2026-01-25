import React from 'react'

interface props  {
    method: () => void,
}   
const ToggleButton = ({ method }: props) => {

  return (
    <div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input 
            type="checkbox" 
            className="peer sr-only" 
            onChange={method} 
            />
            <div className="w-14 h-7 bg-gray-300 rounded-full shadow-inner transition-colors duration-300 peer-checked:bg-green-500"></div>
            <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 peer-checked:translate-x-7"></span>
        </label>
    </div>
  )
}

export default ToggleButton
