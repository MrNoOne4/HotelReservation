"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from 'react'

type Props = {
  onDateChangeMain?: (range: DateRange | undefined) => void
}


export default function DatePickerWithRange ({onDateChangeMain}: Props) {
  
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays( new Date(new Date().setDate(new Date().getDate() + 1)), 0),
  })

  return (
    
    <Field >

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-range"
            className=" px-2.5  text-center bg-black border-none py-5 w-full text-white font-semibold cursor-pointer hover:bg-[#212121] hover:text-white"
          >

            
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-3" align="end">
          
          <div className="text-center ">
              <h5 className="text-sm text-muted-foreground">
                Select the dates for your appointment
              </h5>
          </div>

          

          <div className="flex justify-between items-center border rounded-lg text-sm">
            <div>
              <p className="text-xs ">Check-in</p>
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
            defaultMonth={date?.from}
            selected={date}
            numberOfMonths={2}
             onSelect={(dateRange) => {
                if (!dateRange) return
                setDate(dateRange)           
                onDateChangeMain?.(dateRange)
            }}
            className="rounded-lg border scale-90 origin-top-left "
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}