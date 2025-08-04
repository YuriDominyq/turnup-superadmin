"use client"

export default function Spinner({ size = 40 }: { size?: number }) {
    return (
        <div
            className="animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
            style={{ width: size, height: size }}
        />
    )
}