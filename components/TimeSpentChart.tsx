"use client"

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const timeSpentData = [
    { terminal: "Granada", value: 135 },
    { terminal: "Homesite", value: 120 },
    { terminal: "FortuneTowne", value: 150 }
]

const COLORS = ["#6366f1", "#f59e0b", "#10b981"];

const formatTime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs > 0 ? `${hrs}h` : ""}${mins}m`
}

export default function TimeSpentChart() {
    return (
        <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={timeSpentData}
                    barCategoryGap="30%"
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                >
                    <XAxis dataKey="terminal" tick={{ fontSize: 14 }} />
                    <YAxis type="number" tickFormatter={formatTime} />

                    <Tooltip
                        formatter={(value: number) => [formatTime(value), "Time Spent"]}
                        labelFormatter={(label) => `Terminal: ${label}`}

                    />

                    <Bar dataKey="value" isAnimationActive>
                        {timeSpentData.map((_, index) =>
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        )}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
