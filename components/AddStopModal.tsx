"use client"

import { Dialog, Transition } from "@headlessui/react"
import { MapPin, Plus } from "lucide-react"
import { Fragment } from "react"

type AddStopModalProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: () => void
    stopName: string
    setStopName: (name: string) => void
    selectedLatlng: { lat: number, lng: number } | null
}

export default function AddStopModal({
    isOpen,
    onClose,
    onSubmit,
    stopName,
    setStopName,
    selectedLatlng
}: AddStopModalProps) {
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

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95 translate-y-4"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100 translate-y-0"
                            leaveTo="opacity-0 scale-95 translate-y-4"
                        >
                            <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h2"
                                    className="text-lg font-semibold flex items-center gap-2 mb-2"
                                >
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                    Add Stop
                                </Dialog.Title>

                                {selectedLatlng && (
                                    <p className="text-sm text-gray-600 mb-4">
                                        Coordinates: ({selectedLatlng.lat.toFixed(4)}, {selectedLatlng.lng.toFixed(4)})
                                    </p>
                                )}

                                <input
                                    autoFocus
                                    type="text"
                                    value={stopName}
                                    onChange={(e) => setStopName(e.target.value)}
                                    placeholder="Enter stop name"
                                    className="w-full p-2 border rounded mb-3"
                                />

                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm transition cursor-pointer"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={onSubmit}
                                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm transition flex items-center gap-1 cursor-pointer"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Stop
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

