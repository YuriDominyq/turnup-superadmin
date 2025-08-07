"use client"

import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface AddRouteFormProps {
    routeName: string;
    setRouteName: Dispatch<SetStateAction<string>>
    handleAddRoute: () => void
}

export default function AddRouteForm({ routeName, setRouteName, handleAddRoute }: AddRouteFormProps) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (!routeName.trim()) return;

                console.log("Route Name Submitted:", routeName);
            }}
        >
            <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="routeName"
            >
                Route Name
            </label>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={routeName}
                    onChange={(e) => setRouteName(e.target.value)}
                    placeholder="e.g Granada to Burgos"
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />

                <button
                    onClick={handleAddRoute}
                    className={`px-4 py-2 rounded-lg text-white transition flex items-center gap-2 ${!routeName.trim()
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                        }`}
                    disabled={!routeName.trim()}
                >
                    <Plus className="w-4 h-4" />
                    Add
                </button>
            </div>
        </form>
    );

}