"use client"

import { useEffect, useState } from "react";
import { Company, createCompany, deleteCompany, getCompanies, updateCompany } from "../../../../lib/companies";
import ConfirmDeleteModal from "../../../../components/ConfirmDeleteModal";
import Spinner from "../../../../components/Spinner";
import { Edit, Plus, Trash2 } from "lucide-react";
import AddCompanyModal from "../../../../components/CreateCompanyModal";
import EditCompanyModal from "../../../../components/EditCompanyModal";
import { toast } from "sonner";

export default function CompanyPage() {

    const [companies, setCompanies] = useState<Company[]>([])
    const [searchRoute, setSearchRoute] = useState("")

    const [showAddModal, setShowAddModal] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

    const [showEditModal, setShowEditModal] = useState(false)
    const [editingCompany, setEditingCompany] = useState<Company | null>(null)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            try {
                setIsLoading(true)
                const data = await getCompanies()
                setCompanies(data)
            } catch (error) {
                console.error("Error Loading companies", error)
                toast.error("Error Loading companies data")
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [])

    const filteredCompanies = companies.filter((company) =>
        company.route.toLowerCase().includes(searchRoute.toLowerCase())
    )

    const confirmDeleteCompany = async () => {
        if (!selectedCompany) return

        try {
            await deleteCompany(selectedCompany.id)
            const data = await getCompanies()
            setCompanies(data)
            setSelectedCompany(null)
            setShowDeleteModal(false)
            toast.success("Company deleted successfully!", {
                icon: "🗑️",
            })
        } catch (error) {
            console.error(error)
            toast.error("Error deleting company.", {
                icon: "❌",
            })
        }

    }

    const handleAddCompany = async (name: string, route: string, terminal: string) => {
        try {
            const newCompany: Company = {
                id: Date.now(),
                name,
                route,
                terminal
            }
            await createCompany(newCompany)
            const data = await getCompanies();
            setCompanies(data)
            setShowAddModal(false)
            toast.success("Company added successfully!", {
                icon: "🎉",
            })
        } catch (error) {
            console.error(error)
            toast.error("Error added company.", {
                icon: "❌"
            })
        }
    }

    const handleEditClick = (company: Company) => {
        setEditingCompany(company)
        setShowEditModal(true)
    }

    const handleDeleteClick = (company: Company) => {
        setSelectedCompany(company)
        setShowDeleteModal(true)
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-6">

            {isLoading && (
                <div className="flex justify-center items-center py-12">
                    <Spinner size={40} />
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Jeepney Companies in Bacolod City</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full md:w-auto transition-transform hover:scale-105 cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    Create Company
                </button>
            </div>

            <input
                type="text"
                placeholder="Search by route..."
                value={searchRoute}
                onChange={(e) => setSearchRoute(e.target.value)}
                className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />


            {/* Mobile View */}

            {!isLoading && (
                <>
                    <div className="space-y-4 md:hidden">
                        {filteredCompanies.map((company) => (
                            <div key={company.id} className="bg-white shadow rounded-lg p-4 flex flex-col gap-2">

                                <div className="text-lg font-semibold text-gray-800">
                                    {company.name}
                                </div>

                                <div className="text-sm text-gray-600">
                                    <strong>Route:</strong> {company.route}
                                </div>

                                <div className="text-sm text-gray-600">
                                    <strong>Terminal:</strong> {company.terminal}
                                </div>

                                <div className="flex gap-3 mt-2">
                                    <button
                                        onClick={() => handleEditClick(company)}
                                        className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>

                                    <button
                                        onClick={() => handleDeleteClick(company)}
                                        className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table View */}
                    <div className="bg-white shadow-md rounded-xl p-4 overflow-x-auto hidden md:block">
                        <table className="min-w-[700px] text-sm text-left w-full">
                            <thead className="bg-blue-100 text-blue-800 font-semibold sticky top-0 shadow-sm z-10">
                                <tr>
                                    <th className="px-5 py-3 text-left border-b hidden md:table-cell">ID</th>
                                    <th className="px-4 py-2 text-left border-b">Company Name</th>
                                    <th className="px-4 py-2 text-left border-b">Route</th>
                                    <th className="px-4 py-2 text-left border-b">Terminal</th>
                                    <th className="px-4 py-2 border-b text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCompanies.map((company) => (
                                    <tr key={company.id} className="even:bg-gray-50 hover:bg-blue-50 transition-colors duration-200 ease-in-out">
                                        <td className="px-5 py-3 text-gray-700 border-b hidden md:table-cell">{company.id}</td>
                                        <td className="px-5 py-3 text-gray-700 border-b">{company.name}</td>
                                        <td className="px-5 py-3 text-gray-700 border-b"><span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">{company.route}</span></td>
                                        <td className="px-5 py-3 text-gray-700 border-b"><span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">{company.terminal}</span></td>
                                        <td className="px-5 py-3 border-b space-x-2 text-center">
                                            <button
                                                onClick={() => handleEditClick(company)}
                                                className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>

                                            <button
                                                onClick={() => handleDeleteClick(company)}
                                                className="px-3 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                                {!isLoading && filteredCompanies.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center text-gray-500 py-8 italic">
                                            No companies found for that route
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            <AddCompanyModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleAddCompany}
            />


            <EditCompanyModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onUpdate={async (id, name, route, terminal) => {
                    await updateCompany(id, { name, route, terminal })
                    const data = await getCompanies()
                    setCompanies(data)
                    setShowEditModal(false)
                    setEditingCompany(null)
                }}
                company={editingCompany}
            />

            {selectedCompany && (
                <ConfirmDeleteModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={confirmDeleteCompany}
                    companyName={selectedCompany.name}
                />
            )}


        </div>
    );
}