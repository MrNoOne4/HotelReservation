import React from 'react'

interface ToastProps {
    label: React.ReactNode,
    background: React.ReactNode,
    padding: string
    condition: boolean;
    translateTrue: React.ReactNode,
    translateFalse: React.ReactNode,
}

const Toast = ({label, background ,padding, condition ,translateTrue, translateFalse} : ToastProps) => {
  return (
    <div>
        <span className={`fixed ${background} ${condition ? translateTrue: translateFalse} ${padding} text-white border-none bottom-5 right-5 transition-all duration-300 ease-in-out rounded-3xl font-sans`}>
            <p className='text-xs md:text-lg text-center'>{label}</p>
        </span>
    </div>
  )
}

export default Toast
