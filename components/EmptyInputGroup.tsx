import { SearchIcon } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

import { Kbd } from "@/components/ui/kbd"

export function EmptyInputGroup() {
  return (
<Empty>
      <EmptyHeader>
        <EmptyTitle className="text-center text-2xl">ERROR 404</EmptyTitle>
        <EmptyTitle>No Reservations Yet</EmptyTitle>
        <EmptyDescription>
          You don&apos;t have any upcoming bookings at NovaStay. Start your journey by searching for your perfect stay below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription>
          Need assistance? <a href="/practiceno1/userPage">Contact NovaStay support</a>
        </EmptyDescription>
        <EmptyDescription>
          Or <a href="/practiceno1/userPage">browse available hotels</a> to make your first reservation.
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}
