"use client"

import * as React from "react"
import { addDays, format, eachDayOfInterval } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import { Field } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type BookedRange = {
  from: Date
  to: Date
}

type Props = {
  onDateChangeMain?: (range: DateRange | undefined) => void
  bookedRanges?: BookedRange[]  
}

export default function DatePickerWithRange({ onDateChangeMain, bookedRanges = [] }: Props) {

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 1),
  })

  const disabledDates = React.useMemo(() => {
    const dates: Date[] = []
    for (const range of bookedRanges) {
      const days = eachDayOfInterval({ start: range.from, end: range.to })
      dates.push(...days)
    }
    return dates
  }, [bookedRanges])

  return (
    <Field>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="px-2.5 text-center bg-black border-none py-5 w-full text-white font-semibold cursor-pointer hover:bg-[#212121] hover:text-white"
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>{format(date.from, "LLL dd, y")} – {format(date.to, "LLL dd, y")}</>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-3" align="end">
          <div className="text-center mb-2">
            <h5 className="text-sm text-muted-foreground">Select the dates for your stay</h5>
          </div>

          <div className="flex justify-between items-center border rounded-lg text-sm p-2 mb-2">
            <div>
              <p className="text-xs text-muted-foreground">Check-in</p>
              <p className="font-medium">{date?.from ? date.from.toLocaleDateString() : '--'}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Check-out</p>
              <p className="font-medium">{date?.to ? date.to.toLocaleDateString() : '--'}</p>
            </div>
          </div>

          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            numberOfMonths={2}
            onSelect={(dateRange) => {
              if (!dateRange) return
              setDate(dateRange)
              onDateChangeMain?.(dateRange)
            }}
            className="rounded-lg border scale-90 origin-top-left"
            disabled={[
              { before: new Date() },  
              ...disabledDates          
            ]}
          />

          <div className="flex gap-4 text-xs text-muted-foreground mt-2 px-1">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-gray-300 inline-block" /> Unavailable
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-black inline-block" /> Selected
            </span>
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  )
}