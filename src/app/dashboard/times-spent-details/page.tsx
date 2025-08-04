"use client"

import { ArrowDown, ArrowUp, BarChart2, Clock, Gauge, Lightbulb, MapPin } from "lucide-react"
import TimeSpentChart from "../../../../components/TimeSpentChart"
import SummaryCard from "../../../../components/SummaryCard"

export default function TimeSpentDetailsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Terminal Time Allocation</h1>
            <p className="text-gray-600 mt-1 mb-6">Explore the average driver time spent per terminal to identify route inefficiencies and balance scheduling</p>


            {/* Summary Section */}

            <section className="mb-10 mt-8">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <SummaryCard title="Total Time" value="6h 45m" icon={Clock} delay={0} />
                    <SummaryCard title="Avg Time / Terminal" value="2h 15m" icon={Gauge} delay={0.1} />
                    <SummaryCard title="Most Consistent" value="Homesite" icon={BarChart2} delay={0.2} />
                    <SummaryCard title="Terminals Tracked" value="3" icon={MapPin} delay={0.3} />
                </div>
            </section>

            <h2 className="text-lg font-semibold mb-4">Average Time Spent Chart</h2>
            <div className="bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-4 hover:shadow-xl transition mt-8">
                <TimeSpentChart />
            </div>

            {/* Insights Section */}
            <section className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Insights</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-indigo-50 hover:bg-indigo-100 p-4 rounded-lg shadow-sm transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2 text-indigo-700">
                            <Clock className="w-4 h-4" />
                            <ArrowUp className="w-4 h-4" />
                            <span className="text-sm font-medium">Highest Average Time</span>
                        </div>
                        <p className="text-lg font-semibold text-indigo-900">Fortune Towne</p>
                    </div>

                    <div className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg shadow-sm transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2 text-yellow-700">
                            <Clock className="w-4 h-4" />
                            <ArrowDown className="w-4 h-4" />
                            <span className="text-sm font-medium">Lowest Average Time</span>
                        </div>
                        <p className="text-lg font-semibold text-yellow-900">Homesite</p>
                    </div>

                    <div className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg shadow-sm col-span-full transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2 text-blue-700">
                            <Lightbulb className="w-4 h-4" />
                            <span className="text-sm font-medium">Suggested Action</span>
                        </div>
                        <p className="text-sm text-blue-900">Balance time spent by optimizing delays at Granada</p>
                    </div>
                </div>

            </section>

        </div>
    )
}