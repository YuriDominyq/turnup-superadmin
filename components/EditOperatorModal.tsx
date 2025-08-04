"use client"

import { Fragment, useEffect, useState } from "react";
import type { Operator } from "../lib/type"
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { FiEdit2 } from "react-icons/fi";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    operator: Operator | null;
    onUpdate: (updated: Operator) => void
}

export default function EditOperatorModal({ isOpen, onClose, operator, onUpdate }: Props) {
    const [form, setForm] = useState({ name: "", email: "", phone: "", terminal: "" })

    useEffect(() => {
        if (operator) {
            setForm({
                name: operator.name,
                email: operator.email,
                phone: operator.phone,
                terminal: operator.terminal,
            })
        }
    }, [operator])

    if (!operator) return null

    const handleUpdate = () => {

        try {
            const updatedOperator: Operator = {
                ...operator,
                ...form,
            }
            onUpdate(updatedOperator)
            onClose()
            toast.success("Updated Operator", {
                icon: "🟢"
            })
        } catch (error) {
            console.error(error)
            toast.error("Error Updated Operator", {
                icon: "❌"
            })
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                        <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <FiEdit2 className="w-5 h-5" />
                                    <Dialog.Title className="text-lg font-bold">Edit Operator</Dialog.Title>
                                </div>
                                <button onClick={onClose} className="cursor-pointer">
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full border rounded px-3 py-2"
                                    />

                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full border rounded px-3 py-2"
                                    />

                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full border rounded px-3 py-2"
                                    />

                                    <label htmlFor="terminal" className="block text-sm font-medium text-gray-700">
                                        Terminal
                                    </label>
                                    <input
                                        id="terminal"
                                        type="text"
                                        value={form.terminal}
                                        onChange={(e) => setForm({ ...form, terminal: e.target.value })}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={handleUpdate}
                                    disabled={!form.name.trim() || !form.email.trim()}
                                    className={`px-4 py-2 rounded text-white shadow ${!form.name.trim() || !form.email.trim() ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 cursor-pointer"}`}
                                >
                                    Update Operator
                                </button>
                            </div>
                        </Dialog.Panel>

                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}