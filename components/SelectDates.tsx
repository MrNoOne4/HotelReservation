import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import  CalendarRangeCalendarMultiMonthDemo  from "@/components/CalendarRangeCalendarMultiMonthDemo";
import { Calendar } from 'lucide-react';
import {  DateRange } from 'react-day-picker';
import { useState } from "react";
import DatePickerWithRange from "@/components/DatePickerWithRange";

type Props = {
  onDateChangeMain?: (range: DateRange | undefined) => void
}


export function SelectDates({onDateChangeMain}: Props) {
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>()

  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button variant="outline" className="bg-black border-none py-5 w-full text-white font-semibold cursor-pointer hover:bg-[#212121] hover:text-white">
          <Calendar/>
            { selectedRange ? `${selectedRange.from?.toLocaleDateString()} - ${selectedRange.to?.toLocaleDateString()}` : "Select Dates" }
          </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-full border-none bg-transparent ">
             {/* <CalendarRangeCalendarMultiMonthDemo
              onDateChange={(range) => {
                setSelectedRange(range);
                onDateChangeMain?.(range);
              }}
             /> */}

             <DatePickerWithRange/>
      </PopoverContent>
    </Popover>
  )
}
