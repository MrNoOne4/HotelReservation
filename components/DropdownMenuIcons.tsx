import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ReactNode } from "react";

type ProfileProperties = {
  avatar?: ReactNode;
  billing?: () => void;
  profile?:() => void;
  logout?: () => void;
} 

export function DropdownMenuIcons({avatar, billing, profile, logout}: ProfileProperties) {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
       <Button  className="cursor-pointer text-white bg-transparent hover:bg-transparent focus:outline-none focus:ring-0 active:ring-0 active:outline-none object-cover  rounded-full">{avatar}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#000000]">
        <DropdownMenuItem variant="destructive" className="cursor-pointer text-white hover:bg-white/20" onClick={() => profile?.()}>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" className="cursor-pointer text-white hover:bg-white/20" onClick={() => billing?.()}>
          <CreditCardIcon />
          My Booking
        </DropdownMenuItem>

        <DropdownMenuSeparator  className="bg-white"/>

        <DropdownMenuItem variant="destructive" className="cursor-pointer text-white hover:bg-white/20" onClick={() => logout?.()}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

