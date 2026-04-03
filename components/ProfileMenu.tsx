import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ReactNode } from "react"
import { UserIcon, CreditCardIcon, LogOutIcon } from 'lucide-react' // make sure icons are imported

type ProfileProperties = {
  avatar?: ReactNode;
  billing?: () => void;
  profile?:() => void;
  logout?: () => void;
} 


export function ProfileMenu({ avatar, billing, profile, logout }: ProfileProperties) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer text-white bg-transparent hover:bg-transparent focus:outline-none focus:ring-0 active:ring-0 object-cover rounded-full"
        >
          {avatar}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="center"
        className="w-50 mt-3 border-none bg-[#000000] p-2 rounded-md shadow-lg"
      >
        <button
          className="flex items-center w-full px-3 py-2 text-white hover:bg-white/20 rounded-md cursor-pointer"
          onClick={() => profile?.()}
        >
          <UserIcon className="mr-2 h-4 w-4" />
          Profile
        </button>

        <button
          className="flex items-center w-full px-3 py-2 text-white hover:bg-white/20 rounded-md mt-1 cursor-pointer"
          onClick={() => billing?.()}
        >
          <CreditCardIcon className="mr-2 h-4 w-4" />
          My Booking
        </button>

        <div className="border-t border-white/20 my-1" />

        <button
          className="flex items-center w-full px-3 py-2 text-white hover:bg-white/20 rounded-md cursor-pointer"
          onClick={() => logout?.()}
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Log out
        </button>
      </PopoverContent>
    </Popover>
  )
}