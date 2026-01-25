import React from 'react'

interface Modal {
    isOpen: React.ReactNode,
    label: string,
    modalInner: string
    buttonAccept: string,
    methodClose: () => void,
    methodAccept: () => void
}

const Modal = ({isOpen, label, modalInner,buttonAccept, methodClose, methodAccept} : Modal) => {
  return (
    <div className={`${isOpen ? 'opacity-100' : 'opacity-0'} ${isOpen ? 'z-[999999]' : 'z-[-1]'} fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-black transition-[opacity_z] duration-300 ease-in-out`}>
        <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg overflow-auto flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">{label}</h2>
            <p className="text-base sm:text-xl mb-4 text-center">{modalInner}</p>
            <section className='flex flex-row gap-3 sm:gap-5 w-full justify-center'>
                <button  className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"  onClick={methodAccept}> {buttonAccept}</button>
                <button  className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"  onClick={methodClose}> Close </button>
            </section>
        </div>
    </div>
  )
}

export default Modal
