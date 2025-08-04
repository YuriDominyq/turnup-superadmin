"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Trash2 } from "lucide-react";
import { Fragment } from "react"

export default function ConfirmDeleteModal({
    isOpen,
    onClose,
    onConfirm,
    companyName,
}: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    companyName: string
}) {
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

                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-out duration-300"
                        enterFrom="opacity-0 scale-95 translate-y-4"
                        enterTo="opacity-100 scale-100 translate-y-0"
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100 scale-100 translate-y-0"
                        leaveTo="opacity-0 scale-95 translate-y-4"
                    >
                        <Dialog.Panel className="bg-white w-full max-w-sm rounded-xl p-6 shadow-lg">
                            <Dialog.Title className="flex items-center gap-2 text-lg font-bold text-red-600">
                                <Trash2 className="w-5 h-5" />
                                Delete Company
                            </Dialog.Title>
                            <div className="mt-2 text-gray-700">
                                Are you sure you want to delete {" "}
                                <span className="font-semibold">{companyName}</span>? This action cannot be undone.
                            </div>

                            <div className="mt-6 flex justify-end gap-2">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={onConfirm}
                                    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
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