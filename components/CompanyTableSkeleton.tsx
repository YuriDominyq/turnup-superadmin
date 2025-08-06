export default function CompanyTableSkeleton() {
    return (
        <div className="bg-white shadow-md rounded-xl p-4 overflow-x-auto hidden md:block animate-pulse">
            <table className="min-w-[700px] w-full text-sm">
                <thead className="bg-gray-100 text-gray-600">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Company</th>
                        <th className="px-4 py-2">Route</th>
                        <th className="px-4 py-2">Terminal</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(3)].map((_, index) => (
                        <tr key={index} className="even:bg-gray-50">
                            {[...Array(5)].map((_, cellIndex) => (
                                <td key={cellIndex} className="px-4 py-3">
                                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}