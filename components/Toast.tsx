import React from 'react'

interface ToastProps {
    label: React.ReactNode,
    background: string,
    padding: string
    condition: boolean;
    translateTrue: React.ReactNode,
    translateFalse: React.ReactNode,
}

const Toast = ({label, background ,padding, condition ,translateTrue, translateFalse} : ToastProps) => {
  return (
    <div>
        <span className={`fixed ${background} ${condition ? translateTrue: translateFalse} ${padding} text-white border-none bottom-[1.25rem] right-[1.25rem] transition-all duration-300 ease-in-out rounded-3xl font-sans`}>
            <p>{label}</p>
        </span>
    </div>
  )
}

export default Toast
