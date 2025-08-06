"use client"

import { useState } from "react";
import { subDays } from "date-fns";
import DateRangePicker from "../../../components/DateRangePicker";
import { filterByRange } from "../../../utils/filterDate";
import ChartCard from "../../../components/ChartCard";
import { useRouter } from "next/navigation";
import TimeSpentChart from "../../../components/TimeSpentChart";
import CheckInDayChart from "../../../components/CheckInDayChart";
import CheckInOvertimeChart from "../../../components/CheckInOvertime";
import { checkInsOverTime } from "../../../lib/data";

export default function DashboardPage() {

    const router = useRouter()

    const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 7));
    const [endDate, setEndDate] = useState<Date>(new Date());

    const filteredCheckInsOvertime = filterByRange(checkInsOverTime, startDate, endDate)

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Dashboard</h1>

            <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />

            {/* Average Time Spent */}
            <div className="space-y-6">

                <ChartCard
                    title="Average Time Spent per Terminal"
                    onViewClick={() => router.push("dashboard/times-spent-details")}
                >
                    <TimeSpentChart />
                </ChartCard>

                {/* Total Check-ins by Day */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ChartCard
                        title="Total Check-ins by Day"
                        onViewClick={() => router.push("dashboard/check-ins-day")}
                    >
                        <CheckInDayChart />
                    </ChartCard>

                    {/* Check-ins OverTime*/}
                    <ChartCard
                        title="Check-ins Overtime"
                        onViewClick={() => router.push("dashboard/check-ins-overtime")}
                    >
                        {filteredCheckInsOvertime.length > 0 ? (
                            <div className="h-[350px]">
                                <CheckInOvertimeChart data={filteredCheckInsOvertime} />
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 italic mt-10"> No check-ins recorded for the selected date range.</p>
                        )}
                    </ChartCard>
                </div>
            </div>
        </div>
    );
}