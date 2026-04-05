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
        <p>  Account updates for users registered via the custom sign-up are limited to password changes. Please contact support for modifications to other account information.
</p>
      </TooltipContent>
    </Tooltip>
  )
}
