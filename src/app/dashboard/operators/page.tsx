"use client"

import { Calendar, Edit, Mail, MapPin, Phone, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import CreateOperatorModal from "../../../../components/CreateOperatorModal";
import EditOperatorModal from "../../../../components/EditOperatorModal";
import { toast } from "sonner";
import DeleteOperatorModal from "../../../../components/DeleteOperatorModal";

type Operator = {
    id: number;
    name: string;
    email: string
    phone: string
    terminal: string
    created_at: string
}

export default function OperatorsPage() {

    const [operators, setOperators] = useState<Operator[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [operatorToEdit, setOperatorToEdit] = useState<Operator | null>(null)

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [operatorToDelete, setOperatorToDelete] = useState<Operator | null>(null)

    useEffect(() => {
        const mockOperators: Operator[] = [
            {
                id: 1,
                name: "Juan Dela Cruz",
                email: "juan@example.com",
                phone: "09171234567",
                terminal: "Burgos Terminal",
                created_at: "2025-08-02",
            },
            {
                id: 2,
                name: "John Doe",
                email: "johnDoe@example.com",
                phone: "09171234567",
                terminal: "Granada Terminal",
                created_at: "2025-08-01",
            },
        ]
        setOperators(mockOperators)
    }, [])

    const handleCreateOperator = (newOperator: Operator) => {
        setOperators((prev) => [...prev, newOperator])
    }

    const handleDelete = () => {
        if (operatorToDelete) {
            setOperators(prev => prev.filter(op => op.id !== operatorToDelete.id))
            setOperatorToDelete(null)
            setIsDeleteModalOpen(false)
            toast.success("Operator Deleted", {
                icon: "🗑️"
            })
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Operators</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition-transform hover:scale-105 cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    Create Operator
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {operators.map((op) => (
                    <div key={op.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-start space-y-3 transition duration-300 hover:shadow-lg hover:scale-[1.01] animate-fade-in">
                        <div className="w-full flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-blue-800">{op.name}</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setOperatorToEdit(op)
                                        setIsEditModalOpen(true)
                                    }}
                                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => {
                                        setOperatorToDelete(op)
                                        setIsDeleteModalOpen(true)
                                    }}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="text-sm text-gray-700 space-y-1 w-full">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <span>{op.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <span>{op.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span>{op.terminal}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar className="w-4 h-4" />
                                <span>Created on {op.created_at}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {operators.length === 0 && (
                    <p className="text-gray-500 col-span-full text-center">No operators available.</p>
                )}
            </div>


            <CreateOperatorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={handleCreateOperator}
            />

            <EditOperatorModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                operator={operatorToEdit}
                onUpdate={(updated) => {
                    setOperators((prev) =>
                        prev.map((op) => (op.id === updated.id ? updated : op))
                    )
                }}
            />

            <DeleteOperatorModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                operatorName={operatorToDelete?.name || ""}
            />

        </div>
    );
}