"use client"

import { DrawingManager, GoogleMap, Marker } from "@react-google-maps/api";

type Stop = {
    name: string;
    lat: number;
    lng: number;
}

type Props = {
    containerStyle: React.CSSProperties
    center: google.maps.LatLngLiteral
    setMap: (map: google.maps.Map | null) => void
    stops: Stop[]
    selectedLatLng: google.maps.LatLngLiteral | null
    handleMapClick: (event: google.maps.MapMouseEvent) => void
    handleOverlayComplete: (event: google.maps.drawing.OverlayCompleteEvent) => void
}

export default function RouteMap({
    containerStyle,
    center,
    setMap,
    stops,
    selectedLatLng,
    handleMapClick,
    handleOverlayComplete
}: Props) {
    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onLoad={(mapInstance) => setMap(mapInstance)}
            onClick={handleMapClick}
        >
            {typeof window !== "undefined" &&
                window.google &&
                window.google.maps &&
                window.google.maps.drawing && (
                    <DrawingManager
                        onOverlayComplete={handleOverlayComplete}
                        options={{
                            drawingControl: true,
                            drawingControlOptions: {
                                position: window.google.maps.ControlPosition.TOP_CENTER,
                                drawingModes: [window.google.maps.drawing.OverlayType.POLYLINE]
                            },
                            polylineOptions: {
                                strokeColor: "#2979FF",
                                strokeWeight: 8
                            }
                        }}
                    />
                )}

            {stops.map((stop, i) => (
                <Marker
                    key={i}
                    position={{ lat: stop.lat, lng: stop.lng }}
                    label={(i + 1).toString()}
                    title={stop.name}
                />
            ))}

            {selectedLatLng && (
                <Marker
                    position={selectedLatLng}
                    icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                    }}
                />
            )}
        </GoogleMap>
    )
}