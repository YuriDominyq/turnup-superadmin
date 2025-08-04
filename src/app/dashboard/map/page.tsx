"use client";

import { DrawingManager, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useCallback, useState } from "react";

import type { Libraries } from "@react-google-maps/api";

const containerStyle = {
    width: '100%',
    height: '400px'
}

const center = {
    lat: 10.6676,
    lng: 122.9456
}

type Route = {
    name: string;
    stops?: { lat: number; lng: number; name: string }[];
    path: { lat: number; lng: number }[];
}

const libraries: Libraries = ['drawing'];

export default function MapPage() {

    const setMap = useState<google.maps.Map | null>(null)[1];
    const [routeCoords, setRouteCoords] = useState<{ lat: number; lng: number }[] | null>(null)
    const [routeName, setRouteName] = useState<string>("");
    const [routes, setRoutes] = useState<Route[]>([]);
    const [stops, setStops] = useState<{ lat: number; lng: number; name: string }[]>([]);
    const [selectedLatlng, setSelectedLatLng] = useState<{ lat: number; lng: number } | null>(null);
    const [stopName, setStopName] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editStopIndex, setEditStopIndex] = useState<number | null>(null);
    const [editedName, setEditedName] = useState("");
    const [editingRouteIndex, setEditingRouteIndex] = useState<number | null>(null);

    const [polylineRef, setPolylineRef] = useState<google.maps.Polyline | null>(null);

    const handleOverlayComplete = useCallback((e: google.maps.drawing.OverlayCompleteEvent) => {
        if (e.type === window.google.maps.drawing.OverlayType.POLYLINE) {
            const polyline = e.overlay as google.maps.Polyline;
            const path = polyline.getPath().getArray().map((latlng) => ({
                lat: latlng.lat(),
                lng: latlng.lng()
            }))


            setRouteCoords(path);
            setPolylineRef(polyline);
        }
    }, [])

    const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
        const lat = e.latLng?.lat();
        const lng = e.latLng?.lng();

        if (lat && lng) {
            setSelectedLatLng({ lat, lng })
            setIsModalOpen(true);
        }
    }, [])

    const handleAddRoute = () => {
        const trimmedRouteName = routeName.trim();
        if (!trimmedRouteName || stops.length === 0 || !routeCoords) return

        const newRoute: Route = {
            name: trimmedRouteName,
            stops: [...stops],
            path: [...routeCoords]
        }

        setRoutes((prev) => [...prev, newRoute]);

        setRouteName("");
        setStops([]);
        setRouteCoords(null);

        if (polylineRef) {
            polylineRef.setMap(null);
            setPolylineRef(null);
        }
    }

    const handleAddStop = () => {
        if (!stopName.trim() || !selectedLatlng) return;

        setStops((prev) => [...prev, { ...selectedLatlng, name: stopName }]);
        setStopName("");
        setSelectedLatLng(null);
    }

    return (
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={libraries}>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Route Creator</h1>

                {/* Route Name Input */}
                <form onSubmit={(e) => {
                    e.preventDefault()
                    if (!routeName.trim()) return

                    console.log("Route Name Submitted:", routeName.trim());
                }}>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="routeName">Route Name</label>

                    <div className="flex gap-2">
                        <input
                            id="routeName"
                            type="text"
                            value={routeName}
                            onChange={(e) => setRouteName(e.target.value)}
                            placeholder="e.g Granada to Burgos"
                            className="flex-1 p-2 border rounded shadow-sm"
                        />


                        <button
                            onClick={handleAddRoute}
                            className={`px-4 py-2 rounded text-white ${!routeName.trim() ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'} mt-2`}
                            disabled={!routeName.trim()}
                        >
                            ➕ Add
                        </button>
                    </div>
                    {!routeName.trim() && (
                        <p className="flex items-center text-red-600 text-sm mt-1 gap-1 transition-opacity duration-300 opacity-100">
                            <span className="text-lg">⚠️</span>
                            Route name is required
                        </p>
                    )}
                </form>


                {/* Google Maps */}

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={13}
                    onLoad={(mapInstance) => setMap(mapInstance)}
                    onClick={handleMapClick}
                >

                    {typeof window !== "undefined" && window.google && window.google.maps && window.google.maps.drawing && (
                        <DrawingManager
                            onOverlayComplete={handleOverlayComplete}
                            options={{
                                drawingControl: true,
                                drawingControlOptions: {
                                    position: window.google.maps.ControlPosition.TOP_CENTER,
                                    drawingModes: [window.google.maps.drawing.OverlayType.POLYLINE],
                                },
                                polylineOptions: {
                                    strokeColor: '#2979FF',
                                    strokeWeight: 8,
                                },
                            }}
                        />
                    )}

                    {/* Stop Marker */}
                    {stops.map((stop, i) => (
                        <Marker
                            key={i}
                            position={{ lat: stop.lat, lng: stop.lng }}
                            label={(i + 1).toString()}
                            title={stop.name}
                        />
                    ))}

                    {/* Temp marker */}

                    {selectedLatlng && (
                        <Marker
                            position={selectedLatlng}
                            icon={{
                                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                            }}
                        />
                    )}
                </GoogleMap>

                {/* Add Stop Form */}

                {isModalOpen && selectedLatlng && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="bg-white backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-lg w-full max-w-sm">
                            <h2 className="text-lg font-semibold mb-2">🛑 Add Stop</h2>
                            <p className="text-sm text-gray-600 mb-4">
                                Coordinates: ({selectedLatlng.lat.toFixed(4)}, {selectedLatlng.lng.toFixed(4)})
                            </p>

                            <input
                                type="text"
                                value={stopName}
                                onChange={(e) => setStopName(e.target.value)}
                                placeholder="Enter stop name"
                                className="w-full p-2 border rounded mb-3"
                            />

                            <div className="flex justify-end gap-2">

                                <button
                                    onClick={() => {
                                        setIsModalOpen(false)
                                        setStopName("")
                                        setSelectedLatLng(null)
                                    }}
                                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer"
                                >
                                    ❌ Cancel
                                </button>

                                <button
                                    onClick={handleAddStop}
                                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                                >
                                    ➕ Add Stop
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {/* List of Routes */}
                <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {showPreview ? "Hide Route List" : "📋 List of Routes"}
                </button>

                {/* Clear Routes */}
                <button
                    disabled={!routeName && stops.length === 0 && !routeCoords}
                    onClick={() => {
                        setStops([]);
                        setRouteCoords(null);
                        setRouteName("");

                        if (polylineRef) {
                            polylineRef.setMap(null);
                            setPolylineRef(null);
                        }
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ml-2 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    🧼 Clear Route
                </button>

                {showPreview && routes.length > 0 && (
                    <div className="p-4 bg-gray-100 rounded shadow space-y-4">
                        <h2 className="text-lg font-semibold">✅ Submitted Routes</h2>

                        {routes.map((route, routeIndex) => (
                            <div key={routeIndex} className="space-y-2">

                                <p><strong>Route Name:</strong> {route.name || <em className="text-gray-500">Unnamed</em>}</p>
                                <p><strong>Total Stops:</strong> {route.stops?.length}</p>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white rounded shadow">
                                        <thead className="bg-green-100 text-green-800">
                                            <tr>
                                                <th className="px-4 py-2 text-left">#</th>
                                                <th className="px-4 py-2 text-left">Stop Name</th>
                                                <th className="px-4 py-2 text-left">Latitude</th>
                                                <th className="px-4 py-2 text-left">Longitude</th>
                                                <th className="px-4 py-2 text-left">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {route.stops && route.stops.map((stop, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-4 py-2">{index + 1}</td>
                                                    <td className="px-4 py-2">{stop.name}</td>
                                                    <td className="px-4 py-2 text-sm text-gray-700">{stop.lat.toFixed(4)}</td>
                                                    <td className="px-4 py-2 text-sm text-gray-700">{stop.lng.toFixed(4)}</td>
                                                    <td className="px-4 py-2 space-x-2">
                                                        {/* Edit */}

                                                        <button
                                                            onClick={() => {
                                                                setEditStopIndex(index)
                                                                setEditingRouteIndex(routeIndex);
                                                                setEditedName(stop.name);
                                                                setIsEditModalOpen(true);
                                                            }}
                                                            className="text-blue-600 hover:underline text-sm cursor-pointer"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                const updatedRoutes = [...routes]
                                                                updatedRoutes[routeIndex].stops = route.stops?.filter((_, idx) => idx !== index) || []
                                                                setRoutes(updatedRoutes)
                                                            }}
                                                            className="text-red-600 hover:underline text-sm cursor-pointer"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {isEditModalOpen && editStopIndex !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="bg-white backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-lg w-full max-w-sm">
                            <h2 className="text-lg font-semibold mb-4">✏️ Edit Stop</h2>

                            <input
                                type="text"
                                className="w-full p-2 border rounded bg-white bg-opacity-80"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                placeholder="Enter new stop name"
                            />

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                        setEditStopIndex(null);
                                        setEditedName("");
                                    }}
                                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        if (editedName.trim() !== "" && editingRouteIndex !== null && editStopIndex !== null) {
                                            const updatedRoutes = [...routes];
                                            updatedRoutes[editingRouteIndex].stops![editStopIndex].name = editedName.trim()
                                            setRoutes(updatedRoutes);
                                        }

                                        setIsEditModalOpen(false);
                                        setEditStopIndex(null);
                                        setEditedName("");
                                        setEditingRouteIndex(null);
                                    }}
                                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </LoadScript>
    );
}