"use client"

import { FC } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

type Props = {
    startDate: Date;
    endDate: Date;
    setStartDate: (date: Date) => void;
    setEndDate: (date: Date) => void;
}

const DateRangePicker: FC<Props> = ({ startDate, endDate, setStartDate, setEndDate }) => {
    return (
        <div className="flex flex-wrap items-end gap-6 mb-6 w-full">
            {/* Start Date */}
            <div className="flex flex-col w-full sm:w-64">
                <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1" htmlFor="start-date">
                    <motion.div whileHover={{ rotate: 10 }}>
                        <Calendar className="w-4 h-4 text-indigo-500" />
                    </motion.div>
                    Start Date
                </label>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <DatePicker
                        id="start-date"
                        selected={startDate}
                        onChange={(date) => setStartDate(date as Date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition"
                    />
                </motion.div>
            </div>


            {/* End Date */}
            <div className="flex flex-col w-full sm:w-64">
                <label
                    className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-1"
                    htmlFor="end-date"
                >
                    <motion.div whileHover={{ rotate: -10 }}>
                        <Calendar className="w-4 h-4 text-indigo-500" />
                    </motion.div>
                    End Date
                </label>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <DatePicker
                        id="end-date"
                        selected={endDate}
                        onChange={(date) => setEndDate(date as Date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition"
                    />
                </motion.div>
            </div>
        </div>
    )
}

export default DateRangePicker