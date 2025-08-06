"use client"

import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import { toast } from "sonner";
import { Operator } from "../lib/type";



type Props = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (newOperator: Operator) => void
};

export default function CreateOperatorModal({ isOpen, onClose, onCreate }: Props) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        terminal: "",
    })


    const handleSubmit = () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(09\d{9}|\+639\d{9})$/

        if (!form.name.trim() || !form.email.trim()) {
            toast.error("Name and email are required!")
            return
        }

        if (!emailRegex.test(form.email)) {
            toast.error("Invalid email format!", {
                icon: "⚠️",
            })
            return
        }

        if (!phoneRegex.test(form.phone)) {
            toast.error("Invalid phone number format! Use 09XXXXXXXXX or +639XXXXXXXXX", {
                icon: "⚠️",
            })
            return
        }

        const newOperator: Operator = {
            id: Date.now(),
            name: form.name,
            email: form.email,
            phone: form.phone,
            terminal: form.terminal,
            created_at: new Date().toISOString().split("T")[0]
        }

        onCreate(newOperator)
        setForm({ name: "", email: "", phone: "", terminal: "" })
        onClose()

        toast.success("Operator Created!", {
            icon: "🎉",
        })
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
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <FiUserPlus className="w-4 h-4" />
                                    <Dialog.Title className="text-lg font-bold">Create Operator</Dialog.Title>
                                </div>
                                <button onClick={onClose} className="cursor-pointer">
                                    <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
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
                                    onClick={handleSubmit}
                                    disabled={!form.name || !form.email}
                                    className={`px-4 py-2 rounded text-white shadow ${!form.name || !form.email ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}`}
                                >
                                    Save Operator
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}