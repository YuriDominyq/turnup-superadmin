import { parseISO, isWithinInterval } from "date-fns";

export function filterByRange(data: { day: string }[], start: Date, end: Date) {
  return data.filter((entry) => {
    const date = parseISO(entry.day);
    return isWithinInterval(date, { start, end });
  });
}
