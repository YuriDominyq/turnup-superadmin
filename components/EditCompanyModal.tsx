"use client"

import { Dialog, Transition } from "@headlessui/react"
import { X } from "lucide-react"
import { Fragment, useEffect, useState } from "react"
import { FiEdit2 } from "react-icons/fi"
import { toast } from "sonner"

type Props = {
    isOpen: boolean
    onClose: () => void
    onUpdate: (id: number, name: string, route: string, terminal: string) => void
    company: {
        id: number
        name: string
        route: string
        terminal: string
    } | null
}

export default function EditCompanyModal({ isOpen, onClose, onUpdate, company }: Props) {
    const [name, setName] = useState("")
    const [route, setRoute] = useState("")
    const [terminal, setTerminal] = useState("")

    useEffect(() => {
        if (company) {
            setName(company.name)
            setRoute(company.route)
            setTerminal(company.terminal)
        }
    }, [company])

    const handleSubmit = () => {
        if (!name || !route || !terminal || !company) return

        try {
            onUpdate(company.id, name, route, terminal)
            onClose()
            toast.success("Update company successfully!", {
                icon: "🟢",
            })
        } catch (error) {
            console.error(error)
            toast.error("Error updating company.", {
                icon: "❌"
            })
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-out duration-300"
                        enterFrom="opacity-0 scale-95 translate-y-4"
                        enterTo="opacity-100 scale-100 translate-y-0"
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100 scale-100 translate-y-0"
                        leaveTo="opacity-0 scale-95 translate-y-4"
                    >
                        <Dialog.Panel className="bg-white rounded-lg w-full max-w-md p-6 space-y-4 shadow-lg">
                            <div className="flex justify-between items-center">
                                <Dialog.Title className="flex items-center gap-2 text-lg font-bold">
                                    <FiEdit2 className="w-5 h-5 text-blue-900" />
                                    Edit Company
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
                                />
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={handleSubmit}
                                    disabled={!name || !route || !terminal}
                                    className={`px-4 py-2 rounded text-white shadow ${!name || !route || !terminal ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 cursor-pointer"}`}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}