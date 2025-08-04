"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const checkInsByDay = [
    { day: "Monday", Granada: 5, Homesite: 3, FortuneTowne: 2 },
    { day: "Tuesday", Granada: 4, Homesite: 5, FortuneTowne: 3 },
    { day: "Wednesday", Granada: 6, Homesite: 2, FortuneTowne: 4 },
    { day: "Thursday", Granada: 3, Homesite: 4, FortuneTowne: 5 },
    { day: "Friday", Granada: 4, Homesite: 3, FortuneTowne: 6 },
    { day: "Saturday", Granada: 5, Homesite: 4, FortuneTowne: 2 },
    { day: "Sunday", Granada: 3, Homesite: 5, FortuneTowne: 3 },
];

export default function CheckInDayChart() {
    return (
        <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={checkInsByDay} margin={{ top: 20, right: 30, left: 40, bottom: 40 }}>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <XAxis dataKey="day" interval={0} angle={-30} textAnchor="end" height={60} />
                    <YAxis label={{ value: 'Check-ins', angle: -90, position: 'insideLeft', offset: 10, style: { textAnchor: 'middle' } }} />
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={8} />
                    <Bar dataKey="Granada" fill="#6366f1" isAnimationActive />
                    <Bar dataKey="Homesite" fill="#f59e0b" isAnimationActive />
                    <Bar dataKey="FortuneTowne" fill="#10b981" isAnimationActive />
                </BarChart>
            </ResponsiveContainer>

        </div>
    )
}