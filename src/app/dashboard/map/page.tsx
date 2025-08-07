"use client";

import { LoadScript } from "@react-google-maps/api";
import { useCallback, useState } from "react";

import type { Libraries } from "@react-google-maps/api";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import AddRouteForm from "../../../../components/AddRouteForm";
import RouteMap from "../../../../components/RouteMap";
import AddStopModal from "../../../../components/AddStopModal";
import ToggleRouteListButton from "../../../../components/ToggleRouteListButton";
import ClearRouteButton from "../../../../components/ClearRouteButton";
import { motion, AnimatePresence } from "framer-motion";

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

        try {
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

            toast.success("Route Added successfully", {
                icon: "🎉"
            })
        } catch (error) {
            console.error("Error adding route:", error);
            toast.error("Failed to add route. Please try again.", {
                icon: "❌",
            });
        }
    }

    const handleAddStop = () => {
        if (!stopName.trim() || !selectedLatlng) return;

        setStops((prev) => [...prev, { ...selectedLatlng, name: stopName }]);
        setStopName("");
        setSelectedLatLng(null);
        setIsModalOpen(false)
    }

    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            libraries={libraries}
        >
            <div className="space-y-6 px-4 md:px-8 py-4 max-w-6xl mx-auto">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Route Creator</h1>

                {/* Route Name Input */}
                <AddRouteForm
                    routeName={routeName}
                    setRouteName={setRouteName}
                    handleAddRoute={handleAddRoute}
                />

                {/* Google Maps */}

                <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
                    <RouteMap
                        containerStyle={containerStyle}
                        center={center}
                        setMap={setMap}
                        stops={stops}
                        selectedLatLng={selectedLatlng}
                        handleMapClick={handleMapClick}
                        handleOverlayComplete={handleOverlayComplete}
                    />
                </div>

                {/* Add Stop Form */}
                <AddStopModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setStopName("")
                        setSelectedLatLng(null)
                    }}
                    onSubmit={handleAddStop}
                    stopName={stopName}
                    setStopName={setStopName}
                    selectedLatlng={selectedLatlng}
                />

                <div className="flex gap-2">
                    {/* List of Routes */}
                    <ToggleRouteListButton
                        showPreview={showPreview}
                        setShowPreview={setShowPreview}
                    />

                    {/* Clear Routes */}
                    <ClearRouteButton
                        routeName={routeName}
                        stops={stops}
                        routeCoords={routeCoords}
                        setRouteName={setRouteName}
                        setStops={setStops}
                        setRouteCoords={setRouteCoords}
                        polylineRef={polylineRef}
                        setPolylineRef={setPolylineRef}
                    />
                </div>

                <AnimatePresence>

                    {showPreview && routes.length > 0 && (
                        <motion.div
                            key="route-list"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 bg-gray-100 rounded shadow space-y-4"
                        >
                            <h2 className="text-lg font-semibold">Submitted Routes</h2>

                            {routes.map((route, routeIndex) => (
                                <div key={routeIndex} className="space-y-2">

                                    <p><strong>Route Name:</strong> {route.name || <em className="text-gray-500">Unnamed</em>}</p>
                                    <p><strong>Total Stops:</strong> {route.stops?.length}</p>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                            <thead className="bg-green-100 text-green-800 text-xs uppercase tracking-wide">
                                                <tr>
                                                    <th className="px-4 py-3">#</th>
                                                    <th className="px-4 py-2 text-left">Latitude</th>
                                                    <th className="px-4 py-3">Stop Name</th>
                                                    <th className="px-4 py-3">Longitude</th>
                                                    <th className="px-4 py-3">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {route.stops && route.stops.map((stop, index) => (
                                                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
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
                                                                className="p-2 rounded-full hover:bg-blue-100 text-blue-600  transition duration-200 cursor-pointer"
                                                                aria-label="Edit"
                                                            >
                                                                <Pencil size={18} strokeWidth={2} />
                                                            </button>

                                                            <button
                                                                onClick={() => {
                                                                    const updatedRoutes = [...routes]
                                                                    updatedRoutes[routeIndex].stops = route.stops?.filter((_, idx) => idx !== index) || []
                                                                    setRoutes(updatedRoutes)

                                                                    toast.success("Stop deleted!", { icon: "🗑️" });
                                                                }}
                                                                className="p-2 rounded-full hover:bg-red-100 text-red-600  transition duration-200 cursor-pointer"
                                                                aria-label="Delete"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {isEditModalOpen && editStopIndex !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="bg-white backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-2xl w-full max-w-sm">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Pencil className="w-5 h-5" />
                                Edit Stop
                            </h2>

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
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        if (editedName.trim() !== "" && editingRouteIndex !== null && editStopIndex !== null) {
                                            const updatedRoutes = [...routes];
                                            updatedRoutes[editingRouteIndex].stops![editStopIndex].name = editedName.trim()
                                            setRoutes(updatedRoutes);
                                            toast.success("Stop name updated!", {
                                                icon: "✏️",
                                            });
                                        }

                                        setIsEditModalOpen(false);
                                        setEditStopIndex(null);
                                        setEditedName("");
                                        setEditingRouteIndex(null);
                                    }}
                                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer transition"
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