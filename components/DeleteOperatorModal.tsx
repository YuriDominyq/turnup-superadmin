"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Trash2, X } from "lucide-react"
import { Fragment } from "react"

type Props = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    operatorName: string
}

export default function DeleteOperatorModal({ isOpen, onClose, onConfirm, operatorName }: Props) {
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
                        <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
                            <div className="flex justify-between items-center mb-4">
                                <Dialog.Title className="text-lg font-bold text-red-600 flex items-center gap-2">
                                    <Trash2 className="w-5 h-5" />
                                    Delete Operator
                                </Dialog.Title>
                                <button onClick={onClose} className="cursor-pointer">
                                    <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                                </button>
                            </div>

                            <p className="text-gray-700 mb-4">
                                Are you sure you want to delete <strong>{operatorName}</strong>? This action cannot be undone
                            </p>

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={onConfirm}
                                    className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}