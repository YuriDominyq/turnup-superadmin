import { parseISO, isWithinInterval } from "date-fns";
import { CheckInOverTimeData } from "../lib/checkinovertimedata";

export function filterByRange(
  data: CheckInOverTimeData[],
  start: Date,
  end: Date
) {
  return data.filter((entry) => {
    const date = parseISO(entry.day);
    return isWithinInterval(date, { start, end });
  });
}
