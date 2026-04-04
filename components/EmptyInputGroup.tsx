import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"


export function EmptyInputGroup() {
  return (
<Empty>
      <EmptyHeader>
        <EmptyTitle className="text-center text-2xl text-white">ERROR 404</EmptyTitle>
        <EmptyTitle className=" text-white">No Reservations Yet</EmptyTitle>
        <EmptyDescription>
          You don&apos;t have any upcoming bookings at NovaStay. Start your journey by searching for your perfect stay below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription>
          Need assistance? <a href="/">Contact NovaStay support</a>
        </EmptyDescription>
        <EmptyDescription>
          Or <a href="/">browse available hotels</a> to make your first reservation.
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}
