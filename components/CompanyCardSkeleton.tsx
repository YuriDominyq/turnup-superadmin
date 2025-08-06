export default function CompanyCardSkeleton() {
    return (
        <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-2 animate-pulse">
            <div className="h-5 bg-gray-300 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />

            <div className="flex gap-2 mt-2">
                <div className="h-8 w-8 bg-gray-300 rounded" />
                <div className="h-8 w-8 bg-gray-300 rounded" />
            </div>
        </div>
    )
}