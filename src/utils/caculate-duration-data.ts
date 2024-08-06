import dayjs from "dayjs"

export function calculateDuration(startDate: string, endDate?: string): string {
  const start = dayjs(startDate)
  const end = endDate ? dayjs(endDate) : dayjs()

  const diffYears = end.diff(start, "year")
  const adjustedStart = start.add(diffYears, "year")

  const diffMonths = end.diff(adjustedStart, "month")

  return `${diffYears} years, ${diffMonths} months`
}
