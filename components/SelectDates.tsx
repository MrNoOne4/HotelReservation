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

export function SelectDates() {
  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button variant="outline" className="bg-black border-none w-full text-white font-semibold cursor-pointer hover:bg-[#212121] hover:text-white">Select Dates</Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-full border-none bg-transparent ">
            <CalendarRangeCalendarMultiMonthDemo/>
      </PopoverContent>
    </Popover>
  )
}
