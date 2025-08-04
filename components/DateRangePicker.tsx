"use client"

import { FC } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

type Props = {
    startDate: Date;
    endDate: Date;
    setStartDate: (date: Date) => void;
    setEndDate: (date: Date) => void;
}

const DateRangePicker: FC<Props> = ({ startDate, endDate, setStartDate, setEndDate }) => {
    return (
        <div className="flex flex-wrap items-end gap-4 mb-6">
            {/* Start Date */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1" htmlFor="start-date">Start Date</label>
                <DatePicker
                    id="start-date"
                    selected={startDate}
                    onChange={(date) => setStartDate(date as Date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>


            {/* End Date */}
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1" htmlFor="end-date">End Date</label>
                <DatePicker
                    id="end-date"
                    selected={endDate}
                    onChange={(date) => setEndDate(date as Date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
        </div>
    )
}

export default DateRangePicker