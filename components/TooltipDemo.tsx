import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info, Square } from 'lucide-react';


export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline"><Info/></Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Password change not allowed for this user</p>
      </TooltipContent>
    </Tooltip>
  )
}
