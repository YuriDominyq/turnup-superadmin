"use client"

import { List } from "lucide-react"

type Props = {
    showPreview: boolean
    setShowPreview: (value: boolean) => void
}

export default function ToggleRouteListButton({ showPreview, setShowPreview }: Props) {

    return (
        <button
            onClick={() => setShowPreview(!showPreview)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 flex items-center gap-2 cursor-pointer transition-all shadow-sm"
        >
            <List className="w-4 h-4" />
            {showPreview ? "Hide Route List" : "List of Routes"}
        </button>
    )
}