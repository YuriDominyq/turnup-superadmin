"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

type SummaryCardProps = {
    title: string
    value: string
    icon: LucideIcon
    delay?: number
}

export default function SummaryCard({ title, value, icon: Icon, delay = 0 }: SummaryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow p-4 hover:shadow-lg transition"
        >
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                    <Icon className="w-5 h-5" />
                </div>
                <p className="text-sm text-gray-500">{title}</p>
            </div>
            <p className="text-xl font-bold text-gray-800">{value}</p>
        </motion.div>
    )
}