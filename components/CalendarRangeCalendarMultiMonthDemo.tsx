'use client'

import { useState } from 'react'

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"


type Props = {
  onDateChange?: (range: DateRange | undefined) => void
}

const CalendarRangeCalendarMultiMonthDemo = ({ onDateChange }: Props) => {
  // const [dateRange, setDateRange] = useState<DateRange>({
  //   from: new Date(),
  //   to: new Date(new Date().setDate(new Date().getDate() + 1)),
  // })

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays( new Date(new Date().setDate(new Date().getDate() + 1)), 0),
  })


  return (
    <div className="text-black block mx-auto overflow-hidden bg-white p-2 rounded-md">
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
            {date?.from ? date.from.toLocaleDateString() : '--'}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Check-out</p>
          <p className="font-medium">
            {date?.to ? date.to.toLocaleDateString() : '--'}
          </p>
        </div>
      </div>

      <Calendar
        mode="range"
        selected={date}            
        onSelect={(range) => {
          if (!range) return
          setDate(range)           
          onDateChange?.(range)
        }}
        numberOfMonths={2}
        className="rounded-lg border"
        disabled={{ before: new Date() }}
      />

      {/* <Calendar
        mode="range"
        defaultMonth={date?.from}
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
      /> */}
    </div>
  )
}

export default CalendarRangeCalendarMultiMonthDemo