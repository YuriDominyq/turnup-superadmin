"use client"

import { ArrowDown, ArrowUp, BarChart2, CalendarDays, Lightbulb, MapPin } from "lucide-react"
import CheckInDayChart from "../../../../components/CheckInDayChart"
import SummaryCard from "../../../../components/SummaryCard"

export default function CheckInsByDayDetails() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Driver Check-ins per Day</h1>
            <p>Review weekly check-in activity trends to identify terminal usage and improve driver distribution.</p>

            {/* Summary */}

            <section className="mt-8 mb-10">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <SummaryCard title="Total Check-ins" value="28" icon={BarChart2} delay={0} />
                    <SummaryCard title="Avg / Terminal" value="9.3" icon={CalendarDays} delay={0.1} />
                    <SummaryCard title="Most Active Day" value="Wednesday" icon={ArrowUp} delay={0.2} />
                    <SummaryCard title="Terminals Tracked" value="3" icon={MapPin} delay={0.3} />
                </div>
            </section>

            <div className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-4 hover:shadow-xl transition mt-2">
                <CheckInDayChart />
            </div>


            {/* Insights */}
            <section className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Insights</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-indigo-50 hover:bg-indigo-100 p-4 rounded-lg shadow-sm transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2 text-indigo-700">
                            <BarChart2 className="w-4 h-4" />
                            <ArrowUp className="w-4 h-4" />
                            <span className="text-sm font-medium">Most Check-ins</span>
                        </div>
                        <p className="text-lg font-semibold text-indigo-900">Granada</p>
                    </div>

                    <div className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg shadow-sm transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2 text-yellow-700">
                            <BarChart2 className="w-4 h-4" />
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
                        <p className="text-sm text-blue-900">Increase driver availability at Fortune Towne on weekends.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}