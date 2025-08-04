"use client"

import React from "react";

type ChartCardProps = {
    title: string
    children: React.ReactNode
    extra?: React.ReactNode
    onViewClick?: () => void
}

export default function ChartCard({ title, children, extra, onViewClick }: ChartCardProps) {
    return (
        <div className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-4 hover:shadow-xl transition">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{title}</h2>
                <div className="flex items-center gap-2">
                    {extra}
                    {onViewClick && (
                        <button
                            onClick={onViewClick}
                            className="text-sm text-indigo-600 hover:underline font-medium cursor-pointer"
                        >
                            View
                        </button>
                    )}
                </div>
            </div>
            <div className="w-full h-[300px] sm:h-[350px]">{children}</div>
        </div>
    )
}