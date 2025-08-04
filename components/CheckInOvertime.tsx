"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type Props = {
    data: {
        day: string
        Granada: number
        Homesite: number
        FortuneTowne: number
    }[]
}

export default function CheckInOvertimeChart({ data }: Props) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                <CartesianGrid stroke="#eee" />
                <XAxis dataKey="day" interval={0} angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip formatter={(value) => `${value} check-ins`} />
                <Legend verticalAlign="bottom" height={8} wrapperStyle={{ marginTop: 8 }} />
                <Area type="basis" dataKey="Granada" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Granada" fill="#6366f1" fillOpacity={0.2} isAnimationActive={true} animationDuration={800} />
                <Area type="basis" dataKey="Homesite" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Homesite" fill="#f59e0b" fillOpacity={0.2} isAnimationActive={true} animationDuration={800} />
                <Area type="basis" dataKey="FortuneTowne" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Fortune Towne" fill="#10b981" fillOpacity={0.2} isAnimationActive={true} animationDuration={800} />
            </AreaChart>
        </ResponsiveContainer>
    )
}