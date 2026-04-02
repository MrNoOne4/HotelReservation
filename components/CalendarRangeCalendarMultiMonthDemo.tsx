'use client'

import { useState } from 'react'
import { type DateRange } from 'react-day-picker'
import { Calendar } from '@/components/ui/calendar'

const CalendarRangeCalendarMultiMonthDemo = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: (() => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1) // add 1 day
      return tomorrow
    })()
  })

  return (
    <div className='text-black'>
      <div className="text-center">
        <h1 className='font-semibold'>Book an appointment</h1>
        <h5>Select the dates for your appointment</h5>
      </div>
      <Calendar
        mode='range'
        defaultMonth={dateRange?.from}
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={2}
        className='rounded-lg border'
      />
    </div>
  )
}

export default CalendarRangeCalendarMultiMonthDemo