import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

type AvatarWithBadgeProps = {
  avatar: string; 
  name: string | undefined
}

export function AvatarWithBadge({ avatar, name}: AvatarWithBadgeProps) {
  return (
    <Avatar className="mt-5">
      <AvatarImage src={avatar} alt="@shadcn" /> 
      <AvatarFallback>CN</AvatarFallback>
      <h1 className="text-black text-lg ml-2 font-sans font-light">Hello <strong>{name}</strong></h1>
    </Avatar>
  )
}