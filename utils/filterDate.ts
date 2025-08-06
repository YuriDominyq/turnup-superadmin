import { parseISO, isWithinInterval } from "date-fns";
import { CheckInOverTimeData } from "../lib/checkinovertimedata";

export function filterByRange(
  data: CheckInOverTimeData[],
  start: Date,
  end: Date
) {
  return data.filter((entry) => {
    const date = parseISO(entry.day);
    console.log("Parsed Date:", date, "Valid:", !isNaN(date.getTime())); // 👈
    return isWithinInterval(date, { start, end });
  });
}
