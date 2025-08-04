"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const timeSpentData = [
    { terminal: "Granada", time: 135 },
    { terminal: "Homesite", time: 120 },
    { terminal: "FortuneTowne", time: 150 },
]

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
                    layout="vertical"
                    data={timeSpentData}
                    barCategoryGap="30%"
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                >
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis type="number" tickFormatter={formatTime} />
                    <YAxis type="category" dataKey="terminal" tick={{ fontSize: 14 }} width={120} />
                    <Tooltip formatter={(value: number) => formatTime(value)} />
                    <Legend verticalAlign="bottom" height={16} />
                    <Bar dataKey="time" name="Average Time" fill="#6366f1" isAnimationActive animationDuration={800} activeBar={{ fill: '#4338ca' }} barSize={20} />

                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
