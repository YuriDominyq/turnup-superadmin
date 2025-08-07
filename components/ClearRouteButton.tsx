"use client"

import { Eraser } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import { toast } from "sonner"

type Stop = {
    lat: number;
    lng: number;
    name: string
}


type Props = {
    routeName: string
    stops: Stop[]
    routeCoords: google.maps.LatLngLiteral[] | null
    setRouteName: Dispatch<SetStateAction<string>>
    setStops: Dispatch<SetStateAction<Stop[]>>
    setRouteCoords: Dispatch<SetStateAction<google.maps.LatLngLiteral[] | null>>
    polylineRef: google.maps.Polyline | null
    setPolylineRef: Dispatch<SetStateAction<google.maps.Polyline | null>>
}

export default function ClearRouteButton({
    routeName,
    stops,
    routeCoords,
    setRouteName,
    setStops,
    setRouteCoords,
    polylineRef,
    setPolylineRef,
}: Props) {
    const isDisabled = !routeName && stops.length === 0 && !routeCoords

    const handleClear = () => {
        setStops([])
        setRouteCoords(null)
        setRouteName("")

        if (polylineRef) {
            polylineRef.setMap(null)
            setPolylineRef(null)
        }

        toast.success("Route Cleared", {
            icon: "✅"
        })
    }

    return (
        <button
            disabled={isDisabled}
            onClick={handleClear}
            className={`mt-4 px-4 py-2 rounded flex items-center gap-2 font-medium shadow-sm transition-all duration-150 ${isDisabled
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
                }`}
        >
            <Eraser className="w-4 h-4" />
            Clear Route
        </button>
    )
}