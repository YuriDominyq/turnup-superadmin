"use client"

import { Dialog, Transition } from "@headlessui/react"
import { X } from "lucide-react"
import { Fragment, useState } from "react"
import { BsFillBriefcaseFill } from "react-icons/bs"


type Props = {
    isOpen: boolean
    onClose: () => void
    onSave: (name: string, route: string, terminal: string) => void
}


export default function AddCompanyModal({ isOpen, onClose, onSave }: Props) {
    const [name, setName] = useState("")
    const [route, setRoute] = useState("")
    const [terminal, setTerminal] = useState("")

    const handleSubmit = () => {
        if (!name || !route || !terminal) return

        onSave(name, route, terminal)
        setName("")
        setRoute("")
        setTerminal("")
        onClose()
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" onClose={onClose} className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95 translate-y-4"
                        enterTo="opacity-100 scale-100 translate-y-0"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100 translate-y-0"
                        leaveTo="opacity-0 scale-95 translate-y-4"
                    >
                        <Dialog.Panel className="bg-white rounded-lg w-full max-w-md p-6 space-y-4 shadow-lg transition-all">
                            <div className="flex justify-between items-center">
                                <Dialog.Title className="flex items-center gap-2 text-lg font-bold text-gray-900">
                                    <BsFillBriefcaseFill className="w-5 h-5 text-gray-900" />
                                    Add Company
                                </Dialog.Title>
                                <button onClick={onClose} className="cursor-pointer">
                                    <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Name
                                </label>
                                <input
                                    id="companyName"
                                    type="text"
                                    placeholder="Company Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                    autoFocus
                                />

                                <label htmlFor="route" className="block text-sm font-medium text-gray-700 mb-1">
                                    Route
                                </label>
                                <input
                                    id="route"
                                    type="text"
                                    placeholder="Route"
                                    value={route}
                                    onChange={(e) => setRoute(e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                    autoFocus
                                />

                                <label htmlFor="terminal" className="block text-sm font-medium text-gray-700 mb-1">
                                    Terminal
                                </label>
                                <input
                                    id="terminal"
                                    type="text"
                                    placeholder="Terminal"
                                    value={terminal}
                                    onChange={(e) => setTerminal(e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                    autoFocus
                                />
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={handleSubmit}
                                    disabled={!name || !route || !terminal}
                                    className={`px-4 py-2 rounded text-white shadow ${!name || !route || !terminal ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}`}
                                >
                                    Save
                                </button>
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}