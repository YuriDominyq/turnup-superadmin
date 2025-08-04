"use client"

import { useState } from "react"
import DateRangePicker from "../../../../components/DateRangePicker"
import { subDays } from "date-fns"
import { filterByRange } from "../../../../utils/filterDate"
import { checkInsOverTime } from "../../../../lib/data"
import CheckInOvertimeChart from "../../../../components/CheckInOvertime"
import SummaryCard from "../../../../components/SummaryCard"
import { AreaChart, ArrowDown, ArrowUp, BarChart2, BarChart3, CalendarRange, Gauge, Lightbulb, MapPin } from "lucide-react"

export default function CheckInOvertimeDetails() {
    const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 7))
    const [endDate, setEndDate] = useState<Date>(new Date())

    const filteredData = filterByRange(checkInsOverTime, startDate, endDate)

    const totalCheckIns = filteredData.reduce((sum, entry) => {
        return sum + (entry.Granada || 0) + (entry.Homesite || 0) + (entry.FortuneTowne || 0)
    }, 0)

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Check-ins Over Time - Details</h1>
            <p className="text-gray-600 mb-6">
                View check-in trends over time to evaluate terminal activity patterns
            </p>

            {/* Summary */}
            <section className="mt-8 mb-10">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <SummaryCard title="Total Check Ins" value={String(totalCheckIns)} icon={BarChart3} delay={0} />
                    <SummaryCard title="Avg per Day" value={`${filteredData.length > 0 ? Math.round(totalCheckIns / filteredData.length) : 0}`} icon={Gauge} delay={0.1} />
                    <SummaryCard title="Data range" value={`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`} icon={CalendarRange} delay={0.2} />
                    <SummaryCard title="Terminals Tracked" value="3" icon={MapPin} delay={0.3} />
                </div>
            </section>

            <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />

            <div className="mt-6 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:shadow-xl transition">
                {filteredData.length > 0 ? (
                    <div className="h-[350px]">
                        <CheckInOvertimeChart data={filteredData} />
                    </div>
                ) : (
                    <p className="text-center text-gray-500 italic mt-10">
                        No data for selected range
                    </p>
                )}
            </div>


            {/* Insights */}
            <section className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Insights</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-indigo-50 hover:bg-indigo-100 p-4 rounded-lg shadow-sm transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2 text-indigo-700">
                            <AreaChart className="w-4 h-4" />
                            <ArrowUp className="w-4 h-4" />
                            <span className="text-sm font-medium">Most Check-ins</span>
                        </div>
                        <p className="text-lg font-semibold text-indigo-900">Granada</p>
                    </div>

                    <div className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg shadow-sm transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2 text-yellow-700">
                            <AreaChart className="w-4 h-4" />
                            <ArrowDown className="w-4 h-4" />
                            <span className="text-sm font-medium">Least Check-ins</span>
                        </div>
                        <p className="text-lg font-semibold text-yellow-900">Fortune Towne</p>
                    </div>

                    <div className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg shadow-sm col-span-full transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2 text-blue-700">
                            <Lightbulb className="w-4 h-4" />
                            <span className="text-sm font-medium">Suggested Action</span>
                        </div>
                        <p className="text-sm text-blue-900">Increase presence at Fortune Towne on peak days to improve traffic flow and service balance.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}