'use client'

import { useEffect, useState } from 'react'
import { type DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'
import { toast } from "sonner"

const CalendarRangeCalendarMultiMonthDemo = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [isSaved, setIsSaved] = useState(false)

  // Load saved date range or default to today + tomorrow
  useEffect(() => {
    const saved = localStorage.getItem('savedDateRange')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const from = parsed.from ? new Date(parsed.from) : undefined
        const to = parsed.to ? new Date(parsed.to) : undefined
        if (!isNaN(from?.getTime() ?? NaN) && !isNaN(to?.getTime() ?? NaN)) {
          setDateRange({ from, to })
        }
      } catch {
        console.warn('Failed to parse savedDateRange')
      }
    } else {
      const today = new Date()
      const tomorrow = new Date()
      tomorrow.setDate(today.getDate() + 1)
      setDateRange({ from: today, to: tomorrow })
    }
  }, [])

  const handleSave = () => {
    if (dateRange) {
      localStorage.setItem('savedDateRange', JSON.stringify(dateRange))
      setIsSaved(true)
    }
  }

  if (!dateRange || isSaved) return null

  return (
    <div className="text-black block mx-auto overflow-hidden bg-white p-2  rounded-md">
      <div className="text-center mb-4">
        <h1 className="font-semibold text-lg">Book an appointment</h1>
        <h5 className="text-sm text-muted-foreground">
          Select the dates for your appointment
        </h5>
      </div>

      <div className="flex justify-between items-center mb-4 p-3 border rounded-lg">
        <div>
          <p className="text-xs text-muted-foreground">Check-in</p>
          <p className="font-medium">
            {dateRange?.from ? dateRange.from.toLocaleDateString() : '--'}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Check-out</p>
          <p className="font-medium">
            {dateRange?.to ? dateRange.to.toLocaleDateString() : '--'}
          </p>
        </div>
      </div>

      <Calendar
        mode="range"
        defaultMonth={dateRange?.from}
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={2}
        className="rounded-lg border"
        disabled={{ before: new Date() }}
      />

      <div className="flex justify-end mt-4 ">
        <button
          onClick={handleSave}
          className="bg-black text-white py-3 px-5 rounded-md cursor-pointer overflow-hidden"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default CalendarRangeCalendarMultiMonthDemo