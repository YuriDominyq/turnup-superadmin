"use client"

import { useEffect, useState } from "react";
import { subDays } from "date-fns";
import DateRangePicker from "../../../components/DateRangePicker";
import { filterByRange } from "../../../utils/filterDate";
import ChartCard from "../../../components/ChartCard";
import { useRouter } from "next/navigation";
import TimeSpentChart from "../../../components/TimeSpentChart";
import CheckInDayChart from "../../../components/CheckInDayChart";
import CheckInOvertimeChart from "../../../components/CheckInOvertime";
import { checkInsOverTime } from "../../../lib/data";
import { motion } from "framer-motion";
import SkeletonLoader from "../../../components/SkeletonLoader";


export default function DashboardPage() {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false);

    const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 7));
    const [endDate, setEndDate] = useState<Date>(new Date());

    const filteredCheckInsOvertime = filterByRange(checkInsOverTime, startDate, endDate)

    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => setIsLoading(false), 1000)
        return () => clearTimeout(timer);
    }, [startDate, endDate]);

    console.log("Original Data:", checkInsOverTime);
    console.log("Filtered Data:", filteredCheckInsOvertime);
    console.log("Start:", startDate, "End:", endDate);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <h1 className="text-4xl sm:text-3xl font-extrabold mb-6 text-gray-900 tracking-tight">Dashboard</h1>

                <div className="w-full md:w-auto">
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />
                </div>
            </div>

            {/* Average Time Spent */}
            <div className="flex flex-col gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <ChartCard
                        title="Average Time Spent per Terminal"
                        onViewClick={() => router.push("dashboard/times-spent-details")}
                    >
                        <div className="min-h-[350px] sm:h-[400px]">
                            {isLoading ? (
                                <SkeletonLoader />
                            ) :
                                <TimeSpentChart />
                            }
                        </div>
                    </ChartCard>
                </motion.div>

                {/* Total Check-ins by Day */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <ChartCard
                            title="Total Check-ins by Day"
                            onViewClick={() => router.push("dashboard/check-ins-day")}
                        >
                            <div className="min-h-[350px] sm:h-[400px]">
                                {isLoading ? (
                                    <SkeletonLoader />
                                ) :
                                    <CheckInDayChart />
                                }
                            </div>
                        </ChartCard>
                    </motion.div>

                    {/* Check-ins OverTime*/}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >

                        <ChartCard
                            title="Check-ins Overtime"
                            onViewClick={() => router.push("dashboard/check-ins-overtime")}
                        >
                            <div className="h-[350px] sm:h-[400px]">
                                {isLoading ? (
                                    <SkeletonLoader />
                                ) : filteredCheckInsOvertime.length > 0 ? (

                                    <CheckInOvertimeChart data={filteredCheckInsOvertime} />
                                ) : (
                                    <div className="flex justify-center items-center h-full">
                                        <p className="text-center text-gray-500 italic mt-10">
                                            No check-ins available for the selected date range.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </ChartCard>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}