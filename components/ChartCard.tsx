"use client"

import { BarChart3 } from "lucide-react";
import React from "react";

type ChartCardProps = {
    title: string
    children: React.ReactNode
    extra?: React.ReactNode
    onViewClick?: () => void
}

export default function ChartCard({ title, children, extra, onViewClick }: ChartCardProps) {
    return (
        <div className="bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5">
                <div className="flex items-center gap-2 text-neutral-800">
                    <BarChart3 className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-xl font-semibold">{title}</h2>
                </div>
                <div className="flex items-center gap-3 text-sm">
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
            <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">{children}</div>
        </div>
    )
}